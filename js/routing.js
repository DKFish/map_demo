$("#coordType").val("gcj02");
$("#retcoordType").val("gcj02");

//步行规划
var walkingRoute;

function walking() {
    var coordType = $('#coordType option:selected').val();
    console.log(coordType);
    var retcoordType = $('#retcoordType option:selected').val();
    console.log(retcoordType); 
    walkingRoute = new AirlookMap.WalkingRoute({
        viewer: map,
        showPoint: true,
        coordType: coordType,
        retCoordType: retcoordType,
        depthTest: true,
        // onSearchCallBack: function() {
        //     console.log("已经获取路径规划查询结果");
        // },
        onSearchCallBack: ()=> {
            console.log("已经获取路径规划查询结果");
        },
        onMarkersCallBack: function() {
            console.log("路径规划起点终点渲染结束");
        },
        onPolylinesCallback: function() {
            console.log("径规划轨迹线渲染结束");
        }
    });
    walkingRoute.search(AirlookMap.Cartographic.fromDegrees(117.18153997464413, 39.12744707054671), AirlookMap.Cartographic.fromDegrees(117.18253997464413, 39.12744707054671))
}
// 清除当前步行查询路径规划轨迹线
function clearwalking() {
    walkingRoute.clearRoutePath(); // 清除当前查询路径规划轨迹线
}

//驾车规划
var drivingRoute;

function driving() {
    var coordType = $('#coordType option:selected').val();
    console.log(coordType);
    var retcoordType = $('#retcoordType option:selected').val();
    console.log(retcoordType); 
    drivingRoute = new AirlookMap.DrivingRoute({
        viewer: map,
        showPoint: true,
        tactics: 3, //路线偏好 默认值 0 类型 Number 支持参数 0:常规路径;1：不走高速;2：躲避拥堵;3：距离较短;
        coordType: coordType,
        retCoordType: retcoordType,
        onSearchCallBack: function() {
            console.log("已经获取路径规划查询结果");
        },
        onMarkersCallBack: function() {
            console.log("路径规划起点终点渲染结束");
        },
        onPolylinesCallback: function() {
            console.log("径规划轨迹线渲染结束");
        }
    });
    drivingRoute.search(AirlookMap.Cartographic.fromDegrees(117.18153997464413, 39.12744707054671), AirlookMap.Cartographic.fromDegrees(117.17153997464413, 39.12744707054671))
}
// 清除当前驾车查询路径规划轨迹线
function cleardriving() {
    drivingRoute.clearRoutePath(); // 清除当前查询路径规划轨迹线
}

//骑车规划
var ridingRoute;

function riding() {
    var coordType = $('#coordType option:selected').val();
    console.log(coordType);
    var retcoordType = $('#retcoordType option:selected').val();
    console.log(retcoordType); 
    ridingRoute = new AirlookMap.RidingRoute({
        viewer: map,
        showPoint: false,
        coordType: coordType,
        retCoordType: retcoordType,

        onSearchCallBack: function() {
            console.log("已经获取路径规划查询结果");
        },
        onMarkersCallBack: function() {
            console.log("路径规划起点终点渲染结束");
        },
        onPolylinesCallback: function() {
            console.log("径规划轨迹线渲染结束");
        }
    });

    ridingRoute.search(AirlookMap.Cartographic.fromDegrees(117.18153997464413, 39.12744707054671), AirlookMap.Cartographic.fromDegrees(117.19153997464413, 39.12744707054671))
}
// 清除当前骑车查询路径规划轨迹线
function clearriding() {
    ridingRoute.clearRoutePath(); // 清除当前查询路径规划轨迹线
}

//公交规划
var transitRoute;

function transit() {
    var coordType = $('#coordType option:selected').val();
    console.log(coordType);
    var retcoordType = $('#retcoordType option:selected').val();
    console.log(retcoordType); 
    transitRoute = new AirlookMap.TransitRoute({
        viewer: map,
        showPoint: true,
        coordType: coordType,
        retCoordType: retcoordType,

        onSearchCallBack: function() {
            console.log("已经获取路径规划查询结果");
        },
        onMarkersCallBack: function() {
            console.log("路径规划起点终点渲染结束");
        },
        onPolylinesCallback: function() {
            console.log("径规划轨迹线渲染结束");
        }
    })
    transitRoute.search(new AirlookMap.Cartographic.fromDegrees(117.18153997464413, 39.12744707054671), new AirlookMap.Cartographic.fromDegrees(117.28153997464413, 39.12744707054671))
}
// 清除当前公交查询路径规划轨迹线
function cleartransit() {
    console.log("ddd"); //有bug
    transitRoute.clearRoutePath(); // 清除当前查询路径规划轨迹线AirlookMap.Cartographic.fromDegrees
}