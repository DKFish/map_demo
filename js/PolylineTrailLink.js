//流动线
const polylineTrailLink = new function() {

    this.depthTest = true;

    this.add = ()=>{
      let p1 = fromDegrees(100.23192997696852, 26.875955651592196, 2559.80220466822);
      let p2 = fromDegrees(100.23247717325768, 26.87602849887969, 2561.4129514450237);
      let p3 = fromDegrees(100.23306656233609, 26.876065018168504, 2551.348304314218);
      let p4 = fromDegrees(100.233649247421, 26.875980203232064, 2549.5592917467884);
      let p5 = fromDegrees(100.2337299624449, 26.875523930248054, 2549.287945923655);
      let p6 = fromDegrees(100.23374069875898, 26.87491457313319, 2550.196806815168);
      let p7 = fromDegrees(100.23453038255734, 26.874635472560765, 2553.155838822433);
      let p8 = fromDegrees(100.23519311121628, 26.875007161822932, 2556.511844229068);
      let p9 = fromDegrees(100.2354684131796, 26.875676651534523, 2558.315293435401);
      let p10 = fromDegrees(100.23499783582588, 26.87598575132799, 2559.716335356487);
      let p11 = fromDegrees(100.23413925286674, 26.876243331935587, 2559.716335356487);
      let p12 = fromDegrees(100.23358377580858, 26.87630712524129, 2551.5355235734714);
      let points = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12];
      let flowline = new AirlookMap.PolylineTrailLink({
          positions: points,
          imageUrl: "http://amapmobile.airlook.com/1.0.004/Assets/images/arrow.png",
          color: 'red', //rgb(255,0,0)/0xff0000/'red'
          lineWidth: 10,
          opacity: 1,
          depthTest: this.depthTest,
          speed: 50,
          show: true
        });
      window.flowline = flowline;
      map.add(flowline);
      setTimeout(function(){
        flowline.depthTest= false;
        console.log(flowline.depthTest);
      },5000);
      setTimeout(function(){
        flowline.speed= 100;
        console.log(flowline.speed);
      },6000);
      setTimeout(function(){
        flowline.opacity= 0.5;
        console.log(flowline.opacity);
      },7000);
      setTimeout(function(){
        flowline.lineWidth= 40;
        console.log(flowline.lineWidth);
      },7000);
      setTimeout(function(){
        flowline.show= false;
        console.log(flowline.show);
      },8000);
      setTimeout(function(){
        flowline.show= true;
        console.log(flowline.show);
      },9000);
      setTimeout(function(){
        map.remove(flowline);
      },10000);
    }

    //TODO: 删除流动线，需要抽取JS
    // this.destroy = ()=>{
    //   map.destroy(flowline);
    // }
  }