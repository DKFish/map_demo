define(['./createTaskProcessorWorker','./pako_inflate'], function (createTaskProcessorWorker, pako) { 'use strict';
    /**
     * 解码jpeg图片线程
     * @param {*} parameters 
     * @param {*} transferableObjects 
     */
    function inflateRawWorker(parameters, transferableObjects) {
      var rawdata = new Uint8Array(parameters.rawData);
      var uncompressedPacket = pako.inflateRaw(rawdata);
      transferableObjects.push(uncompressedPacket.buffer);
      return {
        uncompressedData: uncompressedPacket.buffer,
      }
    }
    var inflateRawWorker = createTaskProcessorWorker(inflateRawWorker);

   return inflateRawWorker;

});

