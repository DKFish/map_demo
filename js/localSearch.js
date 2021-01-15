// 预查询有效范围
// isInBoundary:    Boolean  类型， 当前坐标为有效范围点返回true， false为无效
// boundary:  String类型， 当isInBoundary  =  false  时， 返回数据的有效范围区域定义的geojson串
// position： AirlookMap.Cartographic  类型， 输入查询检索的坐标值
function searchValidatearea() {
    var localSearch = new AirlookMap.LocalSearch();
    // var InBoundaryresult = localSearch.searchInBoundary(new AirlookMap.Cartesian2(117.117966, 39.075591));//天津
    var  result  =  AirlookMap.LocalSearch.searchInBoundary(AirlookMap.Cartographic.fromDegrees(129.5851249234314, 19.518752762716698)); //儋州
    // var  result  =  AirlookMap.LocalSearch.searchInBoundary(AirlookMap.Cartographic.fromDegrees(119.5851249234314, 19.518752762716698), "5882b74ad6465c6b8101eea51212d48c"); //儋州
    console.log(result );
}



// 查询单体化区域 不用测
function searchsinglesample() {
    var coodinate = new CoodinateUtils();
    var wgs84 = coodinate.gcj02towgs84(109.58530147915417, 19.518604168316094);
    var ClassificationArearesult = localSearch.searchClassificationArea(new AirlookMap.Cartesian2(wgs84[0], wgs84[1]));
    console.log("查询单体化区域:");
    console.log(ClassificationArearesult);
}

// 查询高度
function getheight() {
    var lng = $('input[name="getheightlng"]').val();
    var lat = $('input[name="getheightlat"]').val();
    var cartographic = AirlookMap.Cartographic.fromDegrees(Number(lng), Number(lat));
    // var cartographic = AirlookMap.Cartographic.fromDegrees(109.58530147915417, 19.518604168316094);
    var height = view.getHeight(cartographic);
    console.log("查询高度:" + height);

}

// var coodinate = new CoodinateUtils()
// var wgs84 = coodinate.gcj02towgs84(113.31946673535008, 23.01611009461552);