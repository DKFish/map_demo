/* This file is automatically rebuilt by the Cesium build process. */
define(['./when', './Check', './Math', './Cartesian2', './Rectangle', './AttributeCompression', './createTaskProcessorWorker'], function (when, Check, _Math, Cartesian2, Rectangle, AttributeCompression, createTaskProcessorWorker) { 'use strict';
    function decodeImage(parameters, transferableObjects) {
        var positions = new Uint16Array(parameters.positions);
        unpackBuffer(parameters.packedBuffer);
        var rectangle = scratchRectangle;
        var ellipsoid = scratchEllipsoid;
        var minimumHeight = scratchMinMaxHeights.min;
        var maximumHeight = scratchMinMaxHeights.max;
        var positionsLength = positions.length / 3;
        var uBuffer = positions.subarray(0, positionsLength);
        var vBuffer = positions.subarray(positionsLength, 2 * positionsLength);
        var heightBuffer = positions.subarray(2 * positionsLength, 3 * positionsLength);
        AttributeCompression.AttributeCompression.zigZagDeltaDecode(uBuffer, vBuffer, heightBuffer);
        var decoded = new Float64Array(positions.length);
        for (var i = 0; i < positionsLength; ++i) {
            var u = uBuffer[i];
            var v = vBuffer[i];
            var h = heightBuffer[i];
            var lon = _Math.CesiumMath.lerp(rectangle.west, rectangle.east, u / maxShort);
            var lat = _Math.CesiumMath.lerp(rectangle.south, rectangle.north, v / maxShort);
            var alt = _Math.CesiumMath.lerp(minimumHeight, maximumHeight, h / maxShort);
            var cartographic = Cartesian2.Cartographic.fromRadians(lon, lat, alt, scratchBVCartographic);
            var decodedPosition = ellipsoid.cartographicToCartesian(cartographic, scratchEncodedPosition);
            Cartesian2.Cartesian3.pack(decodedPosition, decoded, i * 3);
        }
        transferableObjects.push(decoded.buffer);
        return {
            positions: decoded.buffer,
        };
    }
    var decodeImage= createTaskProcessorWorker(decodeImage);

   return ddecodeImage;

});
