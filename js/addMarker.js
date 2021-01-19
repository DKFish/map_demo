// 标注
let poi;
let poi2;
let poiOnClick = function(e) {
        console.log(e.id);
        console.log(e.position);
    };
    
// 儋州市poi
poi = new AirlookMap.Marker({
    position: AirlookMap.Cartographic.fromDegrees(109.58952394747246, 19.518627769322595, 250),
    label: "海航新天地酒店",
    scaleByDistance: new AirlookMap.NearFarScalar(200, 2, 1500, 0.5),
    onClick: poiOnClick,
    iconPath: " http://amapmobile-test.airlook.com/1.0.001/Assets/images/location-marker.png",
    show: true
})
poi1 = new AirlookMap.Marker({
    position: AirlookMap.Cartographic.fromDegrees(109.58783930163423, 19.51892322063873, 250),
    label: "电信大厦",
    scaleByDistance: new AirlookMap.NearFarScalar(200, 2, 1500, 0.5),
    onClick: poiOnClick,
    iconPath: " http://amapmobile-test.airlook.com/1.0.001/Assets/images/location-marker.png",
    show: true
})
poi2 = new AirlookMap.Marker({
    position: AirlookMap.Cartographic.fromDegrees(109.5805689835131, 19.52126061368269, 250),
    label: "儋州市政府",
    iconPath: " http://amapmobile-test.airlook.com/1.0.001/Assets/images/location-marker.png",
    scaleByDistance:  new  AirlookMap.NearFarScalar(200, 2, 1500, 0.5),
    onClick: poiOnClick,
    show: true
})


function addpoi() {
    map.add(poi);
    map.add(poi1);
    map.add(poi2);

    //标注聚合
    map.scene.markerCluster.enabled = false;
}


//移除标注
function removepoi() {
    if (poi != null) {
        map.remove(poi);
        map.remove(poi1);
        map.remove(poi2);
    }
}
//销毁标注
function destroypoi() {
    poi.destroy();
    poi1.destroy();
    poi2.destroy();

}


//自定义标注
// 天津
// var data = [{
//         title: '今晚报大厦',
//         lng: 117.17558798974024,
//         lat: 39.124145541031154 //162.66898154802598

//     }, {
//         title: '保利广场',
//         lng: 117.18828584012897,
//         lat: 39.13061062605863 //133.7216746064486
//     }, {
//         title: '大悦城悦府',
//         lng: 117.17874618728001,
//         lat: 39.134394607916335 //133.7216746064486
//     }
//     //    { title: '友谊宾馆', lng: 109.58324143771215, lat: 19.51793929321225 },
//     //    { title: '新大洲本田', lng: 109.5826040256187, lat: 19.517782138672402 }
// ]
var data = [{
        title: '儋州市农委',
        lng: 109.58296420013482,
        lat: 19.5193566478344 //162.66898154802598
        }
    // }, {
    //     title: '儋州市青少年活动中心',
    //     lng: 109.58119209758972,
    //     lat: 19.514825034208354 //133.7216746064486
    // }, {
    //     title: '儋州市第二中学',
    //     lng: 109.5825919062664,
    //     lat: 19.513441747308715 //133.7216746064486
    // }
    //    { title: '友谊宾馆', lng: 109.58324143771215, lat: 19.51793929321225 },
    //    { title: '新大洲本田', lng: 109.5826040256187, lat: 19.517782138672402 }
]



var createMarkerDom = function(title) {
    var markerDom = document.createElement('div');
    markerDom.setAttribute('class', 'marker');
    var contentDom = document.createElement('div');
    contentDom.setAttribute('class', 'content');
    contentDom.innerHTML = title;
    markerDom.appendChild(contentDom)
    return markerDom;
}

var htmlOverlay = new Array();

function addoverlay() {
    var i = 0;
    data.forEach((point, i) => {
        var element = createMarkerDom(point.title)
        var appendDom = document.getElementById('container');
        var height = map.getHeight(AirlookMap.Cartographic.fromDegrees(point.lng, point.lat));
        console.log(height);
        var position = AirlookMap.Cartographic.fromDegrees(point.lng, point.lat, height);
        htmlOverlay[i] = new AirlookMap.HtmlOverlay({
            element: element, //标签显示Dom     必传 html document
            show: true, //是否显示        非必传 默认 true   Boolean   
            appendDom: appendDom, //追加标签显示Dom 的父容器   非必传 默认追加到document.body
            position: position, //标签显示的位置坐标  必传 AirlookMap.Cartographic.fromDegrees(lng,lat,height);
            pixelOffset: new AirlookMap.Cartesian2(59, 24) //标签显示位置的偏移量new AirlookMap.Cartesian2(x,y)  非必传 默认值 new AirlookMap.Cartesian2(0,0) 

        });
        map.add(htmlOverlay[i]);
        // setTimeout(function() {
        //     map.remove(htmlOverlay)
        // }, 5000);

    });
}

//移除自定义标注
function removeoverlay() {
    htmlOverlay.forEach((point, i) => {
        map.remove(htmlOverlay[i]);
    });


}
//销毁自定义标注
function destoryoverlay() {
    htmlOverlay.forEach((point, i) => {
        htmlOverlay[i].destroy();
    });
}