function flyToBSphere() {
    //1.飞行定位（包围球）
    var positions = [];
    // positions.push(new AirlookMap.Cartographic.fromDegrees(117.17256497744545, 39.133343189839955,  300)); //天津
    // positions.push(new AirlookMap.Cartographic.fromDegrees(117.19625904422023, 39.127029438367906, 150));
    positions.push(new AirlookMap.Cartographic.fromDegrees(109.57953984495546, 19.498656535733385, 100)); //儋州
    positions.push(new AirlookMap.Cartographic.fromDegrees(109.57964577642356, 19.539321502427562, 100));
    var boundingSphere = AirlookMap.BoundingSphere.fromCartographics(positions); //此处有bug

    // boundingSphere.fromPointsCartographic(positions);
    // console.log(boundingSphere.radius);
    boundingSphere.radius += boundingSphere.radius * 0.9;
    console.log(boundingSphere.radius);
    map.camera.flyToBoundingSphere({
        boundingSphere: boundingSphere,
        orientation: {
            heading: AirlookMap.CesiumMath.toRadians(70),
            pitch: AirlookMap.CesiumMath.toRadians(50)
        },
        // heading: AirlookMap.CesiumMath.toRadians(70),
        // pitch: AirlookMap.CesiumMath.toRadians(50),
        duration: 3
    });
}

function lookTarget() {
    //2.相机朝向目标点
    // view.camera.positionCartographic = new AirlookMap.Cartographic.fromDegrees(117.19625904422023, 39.127029438367906, 150);  //天津
    // var destination = new AirlookMap.Cartographic.fromDegrees(117.17256497744545, 39.133343189839955, 200);


    view.camera.positionCartographic = new AirlookMap.Cartographic.fromDegrees(109.58492320350972, 19.51860990849641, 350); //儋州
    var destination = new AirlookMap.Cartographic.fromDegrees(109.5824370475888, 19.52041648578651, 100);
    view.camera.lookAtTarget(destination);
}

// 3.相机飞行到观察目标
function flyTarget() {
    // var positiontarget = new AirlookMap.Cartographic.fromDegrees(117.18121346875628, 39.127022871559014, 100);  //天津
    var positiontarget = new AirlookMap.Cartographic.fromDegrees(109.58492320350972, 19.51860990849641, 100); //儋州
    view.camera.flyToTarget({
        destination: positiontarget,
        distance: 500,
        orientation: {
            heading: AirlookMap.CesiumMath.toRadians(50),
            pitch: AirlookMap.CesiumMath.toRadians(50)
        },
        duration: 3,
        easingFunction: AirlookMap.EasingFunction.CUBIC_IN_OUT
    }).then(function() {
        console.log("complete");
    })
}
//飞行定位（相机位置）
function flyTo() {
    // var positiondestination =new AirlookMap.Cartographic.fromDegrees(117.18121346875628, 39.127022871559014, 800);   //天津
    var positiondestination = new AirlookMap.Cartographic.fromDegrees(109.57751647925707, 19.51878739983129, 600); //儋州
    // options.destination : 飞行的目标点位置  new AirlookMap.Cartesian3()  
    // options.duration ：飞行动画执行时间 单位秒  默认3秒
    // options.orientation.heading ：飞行动画执行结束后相机姿态方位角 heading 值
    // options.orientation.pitch ：飞行动画执行结束后相机姿态俯仰角 pitch 值
    map.camera.flyTo({
        destination: positiondestination,
        duration: 3,
        orientation: {
            heading: AirlookMap.CesiumMath.toRadians(50),
            pitch: AirlookMap.CesiumMath.toRadians(50)
        },
        easingFunction: AirlookMap.EasingFunction.QUARTIC_OUT
    }).then(function() {
        console.log("complete");
    });;
}
// 计算相机位置
function fly() {
    // var positionfly =new AirlookMap.Cartographic.fromDegrees(117.18121346875628, 39.127022871559014, 190.67311886886208);   //天津
    var positionfly = new AirlookMap.Cartographic.fromDegrees(109.58783930163423, 19.51892322063873, 200); //儋州
    var target = map.camera.cameraPositionFromTarget({
        destination: positionfly, // 观察的目标点
        distance: 500, //距离观察点的距离  单位/米
        orientation: {
            heading: AirlookMap.CesiumMath.toRadians(180),
            pitch: AirlookMap.CesiumMath.toRadians(45)
        }
    })
    view.camera.flyTo({
        destination: target,
        orientation: {
            heading: AirlookMap.CesiumMath.toRadians(180),
            pitch: AirlookMap.CesiumMath.toRadians(45)
        },
        duration: 3,
        easingFunction: AirlookMap.EasingFunction.QUARTIC_OUT
    }).then(function() {
        console.log("complete");
    })
}
// 计算相机位置
function cameraPosition() {
    // var positioncamera=new AirlookMap.Cartographic.fromDegrees(117.18121346875628, 39.127022871559014, 190.67311886886208);   //天津
    var positioncamera = new AirlookMap.Cartographic.fromDegrees(109.58783930163423, 19.51892322063873, 200); //儋州
    var target = view.camera.cameraPositionFromTarget({
        destination: positioncamera, // 观察的目标点
        distance: 500, //距离观察点的距离  单位/米
        orientation: {
            heading: AirlookMap.CesiumMath.toRadians(180),
            pitch: AirlookMap.CesiumMath.toRadians(45)
        }
    })
    view.camera.positionCartographic = target;
    view.camera.heading = AirlookMap.CesiumMath.toRadians(180);
    view.camera.pitch = AirlookMap.CesiumMath.toRadians(45);
}

//相机实时视角
// map.camera.changed.addEventListener(function(event) {
//     let position = event.position // 相机位置
//     let heading = event.heading // 方位角 （0-360） 正北为0|360
//     let pitch = event.pitch // 俯仰角  (30-90)  垂直屏幕俯视为90
//     let roll = event.roll // 翻滚角， 一般场景漫游、视角切换用不到
//     console.log(position, heading, pitch, roll)
// });