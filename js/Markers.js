const poiOnClick = function(e) {
        console.log(e.id);
        console.log(e.position);
    };

let poi1 = new AirlookMap.Marker({
    position: AirlookMap.Cartographic.fromDegrees(100.234928752854000, 26.873662618427900, 2555.813280490890000),
    label: "标注1",
    scaleByDistance: new AirlookMap.NearFarScalar(200, 2, 1500, 0.5),
    onClick: poiOnClick,
    iconPath: " http://amapmobile-test.airlook.com/1.0.001/Assets/images/location-marker.png",
    show: true
})

let poi2 = new AirlookMap.Marker({
    position: AirlookMap.Cartographic.fromDegrees(100.235568339977000, 26.873689155257600, 2555.540214452850000),
    label: "标注2",
    scaleByDistance: new AirlookMap.NearFarScalar(200, 2, 1500, 0.5),
    onClick: poiOnClick,
    iconPath: " http://amapmobile-test.airlook.com/1.0.001/Assets/images/location-marker.png",
    show: true
})

let poi3 = new AirlookMap.Marker({
    position: AirlookMap.Cartographic.fromDegrees(100.236486162106000, 26.873425509806900, 2558.797632396730000),
    label: "标注3",
    scaleByDistance: new AirlookMap.NearFarScalar(200, 2, 1500, 0.5),
    onClick: poiOnClick,
    iconPath: " http://amapmobile-test.airlook.com/1.0.001/Assets/images/location-marker.png",
    show: true
})

let poi4 = new AirlookMap.Marker({
    position: AirlookMap.Cartographic.fromDegrees(100.237450961385000, 26.873073961105500, 2557.679067951740000),
    label: "标注4",
    scaleByDistance: new AirlookMap.NearFarScalar(200, 2, 1500, 0.5),
    onClick: poiOnClick,
    iconPath: " http://amapmobile-test.airlook.com/1.0.001/Assets/images/location-marker.png",
    show: true
})

let poi5 = new AirlookMap.Marker({
    position: AirlookMap.Cartographic.fromDegrees(100.237447606581000, 26.872130383600800, 2553.212960550920000),
    label: "标注5",
    scaleByDistance: new AirlookMap.NearFarScalar(200, 2, 1500, 0.5),
    onClick: poiOnClick,
    iconPath: " http://amapmobile-test.airlook.com/1.0.001/Assets/images/location-marker.png",
    show: true
})

let poi6 = new AirlookMap.Marker({
    position: AirlookMap.Cartographic.fromDegrees(100.236184229051000, 26.872473130836000, 2553.492367216170000),
    label: "标注6",
    scaleByDistance: new AirlookMap.NearFarScalar(200, 2, 1500, 0.5),
    onClick: poiOnClick,
    iconPath: " http://amapmobile-test.airlook.com/1.0.001/Assets/images/location-marker.png",
    show: true
})

let poi7 = new AirlookMap.Marker({
    position: AirlookMap.Cartographic.fromDegrees(100.235514748087000, 26.872794579590600, 2548.680443143950000),
    label: "标注7",
    scaleByDistance: new AirlookMap.NearFarScalar(200, 2, 1500, 0.5),
    onClick: poiOnClick,
    iconPath: " http://amapmobile-test.airlook.com/1.0.001/Assets/images/location-marker.png",
    show: true
})

let poi8 = new AirlookMap.Marker({
    position: AirlookMap.Cartographic.fromDegrees(100.234606424028000, 26.872248083177900, 2552.300634947120000),
    label: "标注8",
    scaleByDistance: new AirlookMap.NearFarScalar(200, 2, 1500, 0.5),
    onClick: poiOnClick,
    iconPath: " http://amapmobile-test.airlook.com/1.0.001/Assets/images/location-marker.png",
    show: true
})

function addpoi() {
    map.add(poi1);
    map.add(poi2);
    map.add(poi3);
    map.add(poi4);
    map.add(poi5);
    map.add(poi6);
    map.add(poi7);
    map.add(poi8);

    //标注聚合
    map.scene.markerCluster.enabled = true;
    setTimeout(function(){
        poi1.label = '标注1+修改';
    },5000);
    // setTimeout(function(){
    //     map.remove(poi1);
    // },7000);
    // setTimeout(function(){
    //     poi1.destroy();
    // },9000);
}