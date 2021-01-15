 // 根据两个点计算相机位置及姿态
 function lookAtcameraPosition() {
     // eye 相机位置 new AirlookMap.Cartographic.fromDegrees()
     // target 目标位置 new AirlookMap.Cartographic.fromDegrees()
     // returns {Object} 相机位置及姿态
     var options = AirlookMap.MathUtils.lookAt(new AirlookMap.Cartographic.fromDegrees(117.17256497744545, 39.133343189839955, 200), new AirlookMap.Cartographic.fromDegrees(117.19625904422023, 39.127029438367906, 200));
     console.log(options);
 }

 // 根据包围球计算相机位置
 function BoundingcameraPosition() {
     var positions = [];
     positions.push(new AirlookMap.Cartographic.fromDegrees(117.17256497744545, 39.133343189839955,  300));
     positions.push(new AirlookMap.Cartographic.fromDegrees(117.19625904422023, 39.127029438367906, 150));

     var boundingSphere = AirlookMap.BoundingSphere.fromCartographics(positions);
     boundingSphere.radius += boundingSphere.radius * 0.1;
     var cameraPosition = AirlookMap.MathUtils.lookAtBoundingSphere(boundingSphere, view.camera);

     console.log(cameraPosition);
 }

 //空间距离测量
 function countdistance() {
     var originlng = Number($('input[name="originlng"]').val());
     var originlat = Number($('input[name="originlat"]').val());
     var originalt = Number($('input[name="originalt"]').val());
     var terminallng = Number($('input[name="terminallng"]').val());
     var terminallat = Number($('input[name="terminallat"]').val());
     var terminalalt = Number($('input[name="terminalalt"]').val());
     if (originlng !== "" && originlat !== "" && originalt !== "" && terminallng !== "" && terminallat !== "" && terminalalt !== "") {
         var origin = new AirlookMap.Cartographic.fromDegrees(originlng, originlat, originalt);
         console.log(origin);
         var terminal = new AirlookMap.Cartographic.fromDegrees(terminallng, terminallat, terminalalt);
         console.log(terminal);
         var distance = AirlookMap.MathUtils.distance(origin, terminal);
         alert("您输入的这两点见的空间距离是：" + distance);
     } else {
         alert("请输入起点或终点！");
     }
 }