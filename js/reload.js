// 释放场景
const destorymap = () => {
    map.destroy();
    console.log("地图已被销毁！！！！ ");
};

const getparameter = () => {
    let lng = $('input[name="lng"]').val();
    let lat = $('input[name="lat"]').val();
    let alt = $('input[name="alt"]').val();

    let definedradius = Number($('input[name="radius"]').val());
    let definedmaxCameraHeight = Number($('input[name="maxCameraHeight"]').val());
    console.log("经度：" + lng + ";  纬度：" + lat + ";   高度：" + alt + ";   " + ";   半径：" + definedradius + ";   最大相机高度：" + definedmaxCameraHeight);
    if (lng !== "" && lat !== "" && alt !== "" && definedradius !== "" && definedmaxCameraHeight !== "") {
        destorymap();
        alert("地图已销毁，现在重现map");

        let positionsB = AirlookMap.Cartographic.fromDegrees(Number(lng), Number(lat), Number(alt));

        map = new AirlookMap.Map("container");
        map.readyPromise.then(function(viewer) {

            view = viewer;
            //场景定位
            let str = view.setView({
                center: positionsB ,
                radius: definedradius,
                maxCameraHeight: definedmaxCameraHeight
            });
            console.log(str);
            //是否打开数据碰撞
            if  ($('input:radio[name="datadetect"]:checked').val()  ==  "yes")  {                    
                console.log("开启碰撞检测");                    
                map.collisionDetection = true;  
            } 
            else{                    
                console.log("未开启碰撞检测");                    
                map.collisionDetection = false; //默认是false关闭碰撞检测
                                
            };                
            // 是否开启分时渲染           
            if  ($('input:radio[name="requestRenderMode"]:checked').val()  ==  "yes")  {                    
                view.requestRenderMode  =  false;  //默认false是启用分时渲染          
                console.log("启用分时渲染");                
            } 
            else  {                    
                view.requestRenderMode  =  true;  //值是true关闭分时渲染
                                    
                console.log("未启用分时渲染");                
            };                
            //是否只请求范围内数据           
            if  ($('input:radio[name="areadata"]:checked').val()  ==  "yes")  {                    
                view.tileset.requestAreaDdata  =  true;  //默认是true只请求区域内数据                  
                console.log("只请求区域内数据");                
            } 
            else  {                    
                view.tileset.requestAreaDdata  =  false;                    
                console.log("不只请求区域内数据");                
            };

            // 数据来源         
            // if  ($('input:radio[name="dataorigin"]:checked').val()  ==  "online")  {                    
            //     AirlookMap.Map.subdomains  =   ["online"];  //默认是["data1 ", "data2 ", "data3 "];生产环境数据                     
            //     console.log("生产环境数据");                
            // } 
            // else  {                    
            //     AirlookMap.Map.subdomains  =   ["tonline"];  //默认是 ["data1-test ", "data2-test ", "data3-test "];测试环境数据                                       
            //     console.log("测试环境数据");                
            // };

        });
    } else {
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
            let str = view.setView({
                center: positionsB,
                radius: localradius,
                maxCameraHeight: localmaxCameraHeight
            });
            是否打开数据碰撞           
            if  ($('input:radio[name="datadetect"]:checked').val()  ==  "yes")  {                    
                console.log("开启碰撞检测");                      
                map.collisionDetection = true;       
            } 
            else  if  ($('input:radio[name="datadetect"]:checked').val()  ==  "no")  {                    
                console.log("未开启碰撞检测");                    
                map.collisionDetection = false;
                默认是false关闭碰撞检测
                // 是否开启分时渲染           
                if  ($('input:radio[name="requestRenderMode"]:checked').val()  ==  "yes")  {                    
                    view.requestRenderMode  =  false;  //默认false是启用分时渲染         
                    console.log("启用分时渲染");                
                } 
                else  {                    
                    view.requestRenderMode  =  true;  //值是true关闭分时渲染                   
                    console.log("未启用分时渲染");                
                };                
                //是否只请求范围内数据    
                if  ($('input:radio[name="areadata"]:checked').val()  ==  "yes")  {                    
                    view.tileset.requestAreaDdata  =  true;  //默认是true只请求区域内数据          
                    console.log("只请求区域内数据");                
                } 
                else  {                    
                    view.tileset.requestAreaDdata  =  false;                    
                    console.log("不只请求区域内数据");                
                };
                // 数据来源           
                // if  ($('input:radio[name="dataorigin"]:checked').val()  ==  "online")  {                    
                //     AirlookMap.Map.subdomains  =   ["online"];  //默认是["data1 ", "data2 ", "data3 "];生产环境数据                 
                //     console.log("生产环境数据");                
                // } 
                // else  {                    
                //     AirlookMap.Map.subdomains  =   ["tonline"];  //默认是 ["data1-test ", "data2-test ", "data3-test "];测试环境数据       
                //     console.log("测试环境数据");                
                // };
            };

        });
    }
};

function reload() {
    getparameter();
}