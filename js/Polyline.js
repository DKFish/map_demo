//流动线
const Polyline = new function() {

    this.depthTest = true;

    this.add = ()=>{
        let p1 = fromDegrees(100.239760791908000, 26.872202722039300, 2552.1484448571773);
        let p2 = fromDegrees(100.239922305332000, 26.872200793050300, 2551.363433138689);
        let p3 = fromDegrees(100.240122301930000, 26.872226235290600, 2550.653594970696);
        let p4 = fromDegrees(100.240398694469000, 26.872263143806000, 2549.4808592441223);
        let p5 = fromDegrees(100.241774149051000, 26.872500471348500, 2544.181041027231);
        let p6 = fromDegrees(100.242334956997000, 26.871541346690700, 2540.4267765513637);
        let p7 = fromDegrees(100.240291660013000, 26.871518059081300, 2548.191612728598);
        let p8 = fromDegrees(100.240284287825000, 26.871363503262600, 2547.461296242885);
        let p9 = fromDegrees(100.240092092118000, 26.871335969343000, 2547.645446995121);
        let p10 = fromDegrees(100.240087805560000, 26.871269513462500, 2547.2112452552788);
        let p11 = fromDegrees(100.239810761560000, 26.871256138558300, 2547.803601995172);
        let p12 = fromDegrees(100.239793077356000, 26.872189339873800, 2551.9590195913365);
        let points = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12];

        let line = new AirlookMap.Polyline({
            positions: points,
            lineWidth: 10,
            color: "rgb(255,0,255)",
            dashed: true,
            depthTest: true
        });
        window.line = line;
        map.add(line);
        setTimeout(function(){
            line.lineWidth= 30;
            console.log(line.lineWidth);
        },5000);
        setTimeout(function(){
            line.dashed= false;
            console.log(line.dashed);
        },6000);
        setTimeout(function(){
            line.depthTest= false;
            console.log(line.depthTest);
        },7000);
        setTimeout(function(){
            map.remove(line);
        },9000);
        setTimeout(function(){
            line.destroy();
        },10000);
    }
}