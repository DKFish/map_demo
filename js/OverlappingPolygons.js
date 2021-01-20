//流动线
const OverlappingPolygons = new function() {

    this.depthTest = true;

    this.add = ()=>{
        let p1 = fromDegrees(100.240178334171000,26.869983183708700,2541.248524140220000);
        let p2 = fromDegrees(100.240221664556000,26.869888743613300,2555.026779721780000);
        let p3 = fromDegrees(100.240185104439000,26.869856681781100,2541.250124025430000);
        let p4 = fromDegrees(100.240685440159000,26.869854763525300,2552.226705557060000);
        let p5 = fromDegrees(100.240706301504000,26.869934601716500,2545.691411582020000);
        let p6 = fromDegrees(100.240684076514000,26.869975787200400,2549.857954605760000);
        let p7 = fromDegrees(100.240232510525000,26.869844150288000,2541.598578941530000);
        let p8 = fromDegrees(100.240675249053000,26.869864618553000,2542.053824390380000);
        let positions = [];
        positions.push(p1,p2,p3,p4,p5,p6,p7,p8);

        let overlappingPolygons = new AirlookMap.OverlappingPolygons({
            positions: positions,
            color: "rgb(255,0,0)",
            opacity: 0.5,
            show: true
        });

        window.overlappingPolygons = overlappingPolygons;
        map.add(overlappingPolygons);

        setTimeout(function(){
            overlappingPolygons.opacity= 1;
            console.log(overlappingPolygons.opacity);
        },5000);
        setTimeout(function(){
            overlappingPolygons.show= false;
            console.log(overlappingPolygons.show);
        },6000);
        setTimeout(function(){
            map.remove(overlappingPolygons);
        },9000);
        setTimeout(function(){
            overlappingPolygons.destroy();
        },10000);
    }
}