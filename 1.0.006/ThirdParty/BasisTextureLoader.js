/**
 * @author Don McCurdy / https://www.donmccurdy.com
 * @author Austin Eng / https://github.com/austinEng
 * @author Shrek Shao / https://github.com/shrekshao
 */

/**
 * Loader for Basis Universal GPU Texture Codec.
 *
 * Basis Universal is a "supercompressed" GPU texture and texture video
 * compression system that outputs a highly compressed intermediate file format
 * (.basis) that can be quickly transcoded to a wide variety of GPU texture
 * compression formats.
 *
 * This loader parallelizes the transcoding process across a configurable number
 * of web workers, before transferring the transcoded compressed texture back
 * to the main thread.
 */

THREE.BasisTextureLoader = (function () {
	function BasisTextureLoader(manager) {

		THREE.Loader.call( this, manager );

		this.transcoderPath = '';
		this.transcoderBinary = null;
		this.transcoderPending = null;

		this.workerLimit = 4;
		this.workerPool = [];
		this.workerNextTaskID = 1;
		this.workerSourceURL = '';

		this.workerConfig = {
			//PC 是6
			//iOS 是8
			//Android 是10
			format: THREE.basisConfig.format,
			astcSupported: THREE.basisConfig.astcSupported,
			etcSupported: THREE.basisConfig.etcSupported,
			dxtSupported: THREE.basisConfig.dxtSupported,
			pvrtcSupported: THREE.basisConfig.pvrtcSupported,
		};

	}

	BasisTextureLoader.prototype = Object.assign( Object.create( THREE.Loader.prototype ), {

		constructor: BasisTextureLoader,
	
		setTranscoderPath: function ( path ) {
	
			this.transcoderPath = path;
	
			return this;
	
		},
	
		setWorkerLimit: function ( workerLimit ) {
	
			this.workerLimit = workerLimit;
	
			return this;
	
		},
	
		detectSupport: function ( renderer ) {
	
			var config = this.workerConfig;
	
			config.bc7Supported = !! renderer.extensions.get( 'EXT_texture_compression_bptc' );
			config.astcSupported = !! renderer.extensions.get( 'WEBGL_compressed_texture_astc' );
			config.etcSupported = !! renderer.extensions.get( 'WEBGL_compressed_texture_etc1' );
			config.dxtSupported = !! renderer.extensions.get( 'WEBGL_compressed_texture_s3tc' );
			config.pvrtcSupported = !! renderer.extensions.get( 'WEBGL_compressed_texture_pvrtc' )
				|| !! renderer.extensions.get( 'WEBKIT_WEBGL_compressed_texture_pvrtc' );
	
			if ( config.astcSupported ) {
	
				config.format = BasisTextureLoader.BASIS_FORMAT.cTFASTC_4x4;
	
			} else if ( config.bc7Supported ) {
	
				config.format = BasisTextureLoader.BASIS_FORMAT.cTFBC7_M6_OPAQUE_ONLY;    
	
			} else if ( config.dxtSupported ) {
	
				config.format = BasisTextureLoader.BASIS_FORMAT.cTFBC3;
	
			} else if ( config.etcSupported ) {
				alert(config.format);
				config.format = BasisTextureLoader.BASIS_FORMAT.cTFETC1;
	
			} else if ( config.pvrtcSupported ) {
	
				config.format = this.useAlpha ? BasisTextureLoader.BASIS_FORMAT.cTFPVRTC1_4_RGBA : BasisTextureLoader.BASIS_FORMAT.cTFPVRTC1_4_RGB;
		
			} else {
	
				throw new Error( 'THREE.BasisTextureLoader: No suitable compressed texture format found.' );
	
			}
	
			return this;
	
		},
	
		load: function ( url, onLoad, onProgress, onError ) {
	
			var loader = new THREE.FileLoader( this.manager );
	
			loader.setResponseType( 'arraybuffer' );
	
			loader.load( url, function( buffer ) {
	
				this._createTexture( buffer )
					.then( onLoad )
					.catch( onError );
	
			}, onProgress, onError );
	
		},
		createCompressTextureData: function(buffer){
			var that = this;
			return that._createCompressTextureData(buffer);
		},

		_createCompressTextureData: function ( buffer ) {
	
			var worker;
			var taskID;
	
			var taskCost = buffer.byteLength;

			var that = this;
	
			var texturePending = this._allocateWorker( taskCost )
				.then( function( _worker ) {
	
					worker = _worker;
					taskID = that.workerNextTaskID ++;
	
					return new Promise( function( resolve, reject ) {
	
						worker._callbacks[ taskID ] = { resolve, reject };
	
						worker.postMessage( { type: 'transcode', id: taskID, buffer }, [ buffer ] );
	
					} );
	
				} )
				.then( function( message ) {
	
					var config = that.workerConfig;

	
					var { width, height, mipmaps, format } = message;
	
					var texture;
	
					switch ( format ) {
	
						case BasisTextureLoader.BASIS_FORMAT.cTFASTC_4x4:
							texture = new THREE.CompressedTexture( mipmaps, width, height, THREE.RGBA_ASTC_4x4_Format );
							break;
						case BasisTextureLoader.BASIS_FORMAT.cTFBC7_M6_OPAQUE_ONLY:
							texture = new THREE.CompressedTexture( mipmaps, width, height, THREE.BasisTextureLoader.COMPRESSED_RGBA_BPTC_UNORM );
							break;
						case BasisTextureLoader.BASIS_FORMAT.cTFBC1:
						case BasisTextureLoader.BASIS_FORMAT.cTFBC3:
							texture = new THREE.CompressedTexture( mipmaps, width, height, BasisTextureLoader.DXT_FORMAT_MAP[ config.format ], THREE.UnsignedByteType );
							break;
						case BasisTextureLoader.BASIS_FORMAT.cTFETC1:
							texture = new THREE.CompressedTexture( mipmaps, width, height, THREE.RGB_ETC1_Format );
							break;
						case BasisTextureLoader.BASIS_FORMAT.cTFPVRTC1_4_RGB:
							texture = new THREE.CompressedTexture( mipmaps, width, height, THREE.RGB_PVRTC_4BPPV1_Format );
							break;
						case BasisTextureLoader.BASIS_FORMAT.cTFPVRTC1_4_RGBA:
							texture = new THREE.CompressedTexture( mipmaps, width, height, THREE.RGBA_PVRTC_4BPPV1_Format );
							break;
						default:
							throw new Error( 'THREE.BasisTextureLoader: No supported format available.' );
	
					}
	
					texture.minFilter = mipmaps.length === 1 ? THREE.LinearFilter : THREE.LinearMipmapLinearFilter;
					texture.magFilter = THREE.LinearFilter;
					texture.generateMipmaps = false;
					texture.needsUpdate = true;
	
					return texture;
	
				} );
	
			texturePending
				.finally( function() {
	
					if ( worker && taskID ) {
	
						worker._taskLoad -= taskCost;
						delete worker._callbacks[ taskID ];
	
					}
	
				} );
	
			return texturePending;
	
		},
	
		/**
		 * @param  {ArrayBuffer} buffer 这是 .basis data
		 * @return {Promise<THREE.CompressedTexture>}
		 */
		_createTexture: function ( buffer ) {
	
			var worker;
			var taskID;
	
			var taskCost = buffer.byteLength;
	
			var texturePending = this._allocateWorker( taskCost )
				.then( function( _worker )  {
	
					worker = _worker;
					taskID = this.workerNextTaskID ++;
	
					return new Promise( function( resolve, reject ) {
	
						worker._callbacks[ taskID ] = { resolve, reject };
	
						worker.postMessage( { type: 'transcode', id: taskID, buffer }, [ buffer ] );
	
					} );
	
				} )
				.then( function( message ) {
	
					var config = this.workerConfig;
	
					var { width, height, mipmaps, format } = message;
	
					var texture;
	
					switch ( format ) {
	
						case BasisTextureLoader.BASIS_FORMAT.cTFASTC_4x4:
							texture = new THREE.CompressedTexture( mipmaps, width, height, THREE.RGBA_ASTC_4x4_Format );
							break;
						case BasisTextureLoader.BASIS_FORMAT.cTFBC7_M6_OPAQUE_ONLY:
							texture = new THREE.CompressedTexture( mipmaps, width, height, THREE.BasisTextureLoader.COMPRESSED_RGBA_BPTC_UNORM );
							break;
						case BasisTextureLoader.BASIS_FORMAT.cTFBC1:
						case BasisTextureLoader.BASIS_FORMAT.cTFBC3:
							texture = new THREE.CompressedTexture( mipmaps, width, height, BasisTextureLoader.DXT_FORMAT_MAP[ config.format ], THREE.UnsignedByteType );
							break;
						case BasisTextureLoader.BASIS_FORMAT.cTFETC1:
							texture = new THREE.CompressedTexture( mipmaps, width, height, THREE.RGB_ETC1_Format );
							break;
						case BasisTextureLoader.BASIS_FORMAT.cTFPVRTC1_4_RGB:
							texture = new THREE.CompressedTexture( mipmaps, width, height, THREE.RGB_PVRTC_4BPPV1_Format );
							break;
						case BasisTextureLoader.BASIS_FORMAT.cTFPVRTC1_4_RGBA:
							texture = new THREE.CompressedTexture( mipmaps, width, height, THREE.RGBA_PVRTC_4BPPV1_Format );
							break;
						default:
							throw new Error( 'THREE.BasisTextureLoader: No supported format available.' );
	
					}
	
					texture.minFilter = mipmaps.length === 1 ? THREE.LinearFilter : THREE.LinearMipmapLinearFilter;
					texture.magFilter = THREE.LinearFilter;
					texture.generateMipmaps = false;
					texture.needsUpdate = true;
	
					return texture;
	
				} );
	
			texturePending
				.finally( function() {
	
					if ( worker && taskID ) {
	
						worker._taskLoad -= taskCost;
						delete worker._callbacks[ taskID ];
	
					}
	
				} );
	
			return texturePending;
	
		},
	
		_initTranscoder: function () {
	
			if ( ! this.transcoderPending ) {
	
				// Load transcoder wrapper.
				var jsLoader = new THREE.FileLoader( this.manager );
				jsLoader.setPath( this.transcoderPath );
				var jsContent = new Promise( function( resolve, reject ){
	
					jsLoader.load( 'basis_transcoder.js', resolve, undefined, reject );
	
				} );
	
				// Load transcoder WASM binary.
				var binaryLoader = new THREE.FileLoader( this.manager );
				binaryLoader.setPath( this.transcoderPath );
				binaryLoader.setResponseType( 'arraybuffer' );
				var binaryContent = new Promise( function( resolve, reject ) {
	
					binaryLoader.load( 'basis_transcoder.wasm', resolve, undefined, reject );
	
				} );
				var that = this;
				this.transcoderPending = Promise.all( [ jsContent, binaryContent ] )
					.then( function( [ jsContent, binaryContent ] ) {
	
						var fn = THREE.BasisTextureLoader.BasisWorker.toString();
	
						var body = [
							'/* basis_transcoder.js */',
							jsContent,
							'/* worker */',
							fn.substring( fn.indexOf( '{' ) + 1, fn.lastIndexOf( '}' ) )
						].join( '\n' );
	
						that.workerSourceURL = URL.createObjectURL( new Blob( [ body ] ) );
						that.transcoderBinary = binaryContent;
	
					} );
	
			}
	
			return this.transcoderPending;
	
		},
	
		_allocateWorker: function ( taskCost ) {
			var that = this;
			return this._initTranscoder().then( function() {
	
				if ( that.workerPool.length < that.workerLimit ) {
	
					var worker = new Worker( that.workerSourceURL );
	
					worker._callbacks = {};
					worker._taskLoad = 0;
	
					worker.postMessage( {
						type: 'init',
						config: that.workerConfig,
						transcoderBinary: that.transcoderBinary,
					} );
	
					worker.onmessage = function ( e ) {
	
						var message = e.data;
	
						switch ( message.type ) {
	
							case 'transcode':
								worker._callbacks[ message.id ].resolve( message );
								break;
	
							case 'error':
								worker._callbacks[ message.id ].reject( message );
								break;
	
							default:
								console.error( 'THREE.BasisTextureLoader: Unexpected message, "' + message.type + '"' );
	
						}
	
					};
	
					that.workerPool.push( worker );
	
				} else {
	
					that.workerPool.sort( function ( a, b ) {
	
						return a._taskLoad > b._taskLoad ? - 1 : 1;
	
					} );
	
				}
	
				var worker = that.workerPool[ that.workerPool.length - 1 ];
	
				worker._taskLoad += taskCost;
	
				return worker;
	
			} );
	
		},
	
		dispose: function () {
	
			for ( var i = 0; i < this.workerPool.length; i ++ ) {
	
				this.workerPool[ i ].terminate();
	
			}
	
			this.workerPool.length = 0;
	
			return this;
	
		}
	
	} );

	/* CONSTANTS */

	BasisTextureLoader.BASIS_FORMAT = {
		cTFETC1: 0,
		cTFETC2: 1,
		cTFBC1: 2,
		cTFBC3: 3,
		cTFBC4: 4,
		cTFBC5: 5,
		cTFBC7_M6_OPAQUE_ONLY: 6,
		cTFBC7_M5: 7,
		cTFPVRTC1_4_RGB: 8,
		cTFPVRTC1_4_RGBA: 9,
		cTFASTC_4x4: 10,
		cTFATC_RGB: 11,
		cTFATC_RGBA_INTERPOLATED_ALPHA: 12,
		cTFRGBA32: 13,
		cTFRGB565: 14,
		cTFBGR565: 15,
		cTFRGBA4444: 16,
	};

	// DXT formats, from:
	// http://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
	BasisTextureLoader.DXT_FORMAT = {
		COMPRESSED_RGB_S3TC_DXT1_EXT: 0x83F0,
		COMPRESSED_RGBA_S3TC_DXT1_EXT: 0x83F1,
		COMPRESSED_RGBA_S3TC_DXT3_EXT: 0x83F2,
		COMPRESSED_RGBA_S3TC_DXT5_EXT: 0x83F3,
	};
	BasisTextureLoader.DXT_FORMAT_MAP = {};
	BasisTextureLoader.DXT_FORMAT_MAP[ BasisTextureLoader.BASIS_FORMAT.cTFBC1 ] =
		BasisTextureLoader.DXT_FORMAT.COMPRESSED_RGB_S3TC_DXT1_EXT;
	BasisTextureLoader.DXT_FORMAT_MAP[ BasisTextureLoader.BASIS_FORMAT.cTFBC3 ] =
		BasisTextureLoader.DXT_FORMAT.COMPRESSED_RGBA_S3TC_DXT5_EXT;

		// ASTC formats, from:
	// https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
	BasisTextureLoader.COMPRESSED_RGBA_ASTC_4x4_KHR = 0x93B0;

	// BC7/BPTC format, from:
	// https://www.khronos.org/registry/webgl/extensions/EXT_texture_compression_bptc/
	BasisTextureLoader.COMPRESSED_RGBA_BPTC_UNORM = 0x8E8C;

	/* WEB WORKER */

	BasisTextureLoader.BasisWorker = function () {

		var config;
		var transcoderPending;
		var _BasisFile;

		onmessage = function ( e ) {

			var message = e.data;

			switch ( message.type ) {

				case 'init':
					config = message.config;
					init( message.transcoderBinary );
					break;

				case 'transcode':
					transcoderPending.then( function() {

						try {

							var { width, height, hasAlpha, mipmaps, format } = transcode( message.buffer );

							var buffers = [];

							for ( var i = 0; i < mipmaps.length; ++ i ) {

								buffers.push( mipmaps[ i ].data.buffer );

							}

							self.postMessage( { type: 'transcode', id: message.id, width, height, hasAlpha, mipmaps, format }, buffers );

						} catch ( error ) {

							console.error( error );

							self.postMessage( { type: 'error', id: message.id, error: error.message } );

						}

					} );
					break;

			}

		};

		function init( wasmBinary ) {

			var BasisModule;
			transcoderPending = new Promise( function( resolve ) {

				BasisModule = { wasmBinary, onRuntimeInitialized: resolve };
				BASIS( BasisModule );

			} ).then( function() {

				var { BasisFile, initializeBasis } = BasisModule;

				_BasisFile = BasisFile;

				initializeBasis();

			} );

		}

		function transcode( buffer ) {

			var basisFile = new _BasisFile( new Uint8Array( buffer ) );

			var width = basisFile.getImageWidth( 0, 0 );
			var height = basisFile.getImageHeight( 0, 0 );
			var levels = basisFile.getNumLevels( 0 );
			var hasAlpha = basisFile.getHasAlpha();

			function cleanup() {

				basisFile.close();
				basisFile.delete();

			}

			if ( ! hasAlpha ) {

				switch ( config.format ) {

					case 9: // Hardcoded: THREE.BasisTextureLoader.BASIS_FORMAT.cTFPVRTC1_4_RGBA
						config.format = 8; // Hardcoded: THREE.BasisTextureLoader.BASIS_FORMAT.cTFPVRTC1_4_RGB;
						break;
					default:
						break;

				}

			}

			if ( ! width || ! height || ! levels ) {

				cleanup();
				throw new Error( 'THREE.BasisTextureLoader:  Invalid .basis file' );

			}

			if ( ! basisFile.startTranscoding() ) {

				cleanup();
				throw new Error( 'THREE.BasisTextureLoader: .startTranscoding failed' );

			}

			var mipmaps = [];

			for ( var mip = 0; mip < levels; mip ++ ) {

				var mipWidth = basisFile.getImageWidth( 0, mip );
				var mipHeight = basisFile.getImageHeight( 0, mip );
				var dst = new Uint8Array( basisFile.getImageTranscodedSizeInBytes( 0, mip, config.format ) );

				var status = basisFile.transcodeImage(
					dst,
					0,
					mip,
					config.format,
					0,
					hasAlpha
				);

				if ( ! status ) {

					cleanup();
					throw new Error( 'THREE.BasisTextureLoader: .transcodeImage failed.' );

				}

				mipmaps.push( { data: dst, width: mipWidth, height: mipHeight } );

			}

			cleanup();

			return { width, height, hasAlpha, mipmaps, format: config.format };

		}

	};


	return BasisTextureLoader;

})();

