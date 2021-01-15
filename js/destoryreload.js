// 释放场景
const destorymap = () => {
    map.destroy();
    console.log("地图已被销毁！！！！ ");
};

const getparameter = () => {

    destorymap();
    alert("地图已销毁，现在重现map");
    console.log("参数不全，经纬度和高度默认值");
    // alert("参数不全,请补全参数！");
    // var  positionsB  = AirlookMap.Cartographic.fromDegrees(117.18153997464413, 39.12744707054671, 300);  //测试环境天津数据
    let positionsB  = AirlookMap.Cartographic.fromDegrees(109.58296420013482, 19.5113566478344, 1200); //儋州
    let localradius = 2000;
    let localmaxCameraHeight = 4000;

    map = new AirlookMap.Map("container");
    console.log(positionsB);
    console.log(localradius);
    console.log(localmaxCameraHeight);
    map.readyPromise.then(function(viewer) {
        view = viewer;
        //场景定位
        var str = view.setView({
            center: positionsB,
            radius: localradius,
            maxCameraHeight: localmaxCameraHeight
        });



    });

};

const reload = () => {
    getparameter();
};