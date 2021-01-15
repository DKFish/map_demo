 //线
 var positions = [];
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.19558194708522, 39.13491638399662, 52.53869470766247));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.19598115869609, 39.13502435717243, 52.46329667862012));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.19597933769826, 39.13478666864528, 52.32481314291248));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.19595949528113, 39.13462213749723, 52.66904466183973));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.19590101396456, 39.13442207618043, 52.66904466183973));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.19577775162709, 39.13425543064314, 52.66904466183973));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.19572826453457, 39.13413048195353, 52.66904466183973));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.1960892276829, 39.13399971076955, 52.66904466183973));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.19619390973988, 39.134037306848384, 52.66904466183973));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.19617773748301, 39.13418089626835, 52.66904466183973));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.19626153059843, 39.13437764926282, 52.66904466183973));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.19640165867621, 39.13455767352393, 52.66904466183973));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.19649197236008, 39.13465781258426, 52.66904466183973));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.19669434584432, 39.13458897260569, 52.66904466183973));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.19722458603567, 39.13451248806154, 52.66904466183973));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.19734927652497, 39.13457787659962, 52.66904466183973));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.1974828534173, 39.13482779042354, 52.66904466183973));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.19804768772048, 39.134665048705386, 52.66904466183973));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(117.19837486530763, 39.13456814197281, 52.66904466183973));

 //  positions.push(new AirlookMap.Cartographic.fromDegrees(109.579436156784, 19.516452705771812, 650));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(109.58015930153299, 19.516442352803693, 650));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(109.58169258557106, 19.516463988877202, 650));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(109.58293075457595, 19.516448719478106, 650));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(109.58298563113019, 19.517351526318908, 650));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(109.58295404855765, 19.519307802724416, 650));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(109.58568901514899, 19.51939300918455, 650));
 //  positions.push(new AirlookMap.Cartographic.fromDegrees(109.58793720437404, 19.519344069144168, 650));


 positions.push(new AirlookMap.Cartographic.fromDegrees(109.58290590907289, 19.51647979364614, 180));
 positions.push(new AirlookMap.Cartographic.fromDegrees(109.58294656551581, 19.519352675238206, 180));
 positions.push(new AirlookMap.Cartographic.fromDegrees(109.59018819959998, 19.51930248198325, 180));
 positions.push(new AirlookMap.Cartographic.fromDegrees(109.59022982256505, 19.521250820674933, 180));



 var polyline;


 function addpolyline() {
     polyline = new AirlookMap.PolylineTrailLink({
         positions: positions, //点集合
         lineWidth: 4, //线宽
         color: "rgb(255,0,255)", //线颜色
         dashed: false, //是否虚线
         depthTest: true,
         show: true //遮挡效果
     });

     var linecolor = $('input[name="polyline"]').val();

     var linesize = $('input[name="lineWidth"]').val();

     //  var isdash;
     //  if ($('input:radio[name="dashed"]:checked').val() == "true") {
     //      isdash = true;
     //  } else {
     //      isdash = false;
     //  }
     //  console.log("是否虚线" + isdash);
     var depthTest;
     if ($('input:radio[name="depthTest"]:checked').val() == "true") {
         depthTest = true;
     } else {
         depthTest = false;
     }
     console.log("是否遮挡" + depthTest);
     if (linecolor !== "" && linesize !== "") {
         polyline.positions = positions; //点集合true
         polyline.lineWidth = Number(linesize); //线宽
         console.log(polyline.lineWidth);
         polyline.color = linecolor; //线颜色
         //  polyline.dashed = isdash; //是否虚线
         polyline.depthTest = depthTest; //遮挡效果
         polyline.show = true;

         // console.log("是否虚线" + polyline.dashed);
         console.log("是否遮挡" + polyline.depthTest);
     } else {
         polyline.positions = positions; //点集合
         polyline.lineWidth = 4; //线宽
         polyline.color = "rgb(255,0,255)"; //线颜色
         //  polyline.dashed = false; //是否虚线
         polyline.depthTest = true;
         polyline.show = true; //遮挡效果

         // console.log(polyline.dashed);
         console.log("是否遮挡" + polyline.depthTest);
     }

     map.add(polyline);

 };

 //移除线
 function removepolyline() {
     map.remove(polyline);
 };
 //销毁线
 function destorypolyline() {

     polyline.destroy();

 };