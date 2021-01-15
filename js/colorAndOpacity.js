// 环境光照调整模型颜色
function fillColorandopacity() {
    destorymap();
    console.log("地图已被销毁");
    map = new AirlookMap.Map("container");
    map.readyPromise.then(function(view) {
        // var minicenter = new AirlookMap.Cartographic.fromDegrees(117.17558037729528, 39.12400489486837, 1000);//天津
        var minicenter = new AirlookMap.Cartographic.fromDegrees(109.58296420013482, 19.5113566478344, 1200); //儋州
        //场景定位
        var str = view.setView({
            center: minicenter,
            radius: 2000,
            maxCameraHeight: 4000
        });
        map.collisionDetection = true; //开启碰撞检测
        view.tileset.requestAreaData  = false; //只请求区域内数据
        view.requestRenderMode  =  false;  //开启分时渲染
    });
    var fillcolor = $('input[name="color"]').val();
    console.log(fillcolor);
    var opacity = $('input[name="intensity"]').val();
    console.log(opacity);
    if (fillcolor !== "" && opacity !== "") {
        // console.log(map.ambientLight);
        map.ambientLight.color = fillcolor;
        map.ambientLight.intensity = opacity;
    } else {
        map.ambientLight.color = "rgb(255,255,0)";
        map.ambientLight.intensity = 0;
    }

}