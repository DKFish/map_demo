  //单体化 
  var  positionsA  =   [];    
  positionsA.push(AirlookMap.Cartographic.fromDegrees(109.58492320350972, 19.51860990849641, 704.7620918668676));
  positionsA.push(AirlookMap.Cartographic.fromDegrees(109.58492320350972, 19.51860990849641, 644.7620918668676));
  positionsA.push(AirlookMap.Cartographic.fromDegrees(109.58530147915417, 19.518604168316094, 704.9382527551578));
  positionsA.push(AirlookMap.Cartographic.fromDegrees(109.58530147915417, 19.518604168316094, 644.9382527551578));
  positionsA.push(AirlookMap.Cartographic.fromDegrees(109.58531748211067, 19.518928457363486, 639.8016867014318));
  positionsA.push(AirlookMap.Cartographic.fromDegrees(109.58531748211067, 19.518928457363486, 639.8016867014318));
  positionsA.push(AirlookMap.Cartographic.fromDegrees(109.58491702352087, 19.51893469001386, 670.9076279995193));
  positionsA.push(AirlookMap.Cartographic.fromDegrees(109.58491702352087, 19.51893469001386, 630.9076279995193));

  //   positionsA.push(new AirlookMap.Cartographic.fromDegrees(117.174553720453898, 39.126392026187266,  122.41623101272509));    
  //   positionsA.push(new  AirlookMap.Cartographic.fromDegrees(117.17530250033698, 39.126382408949215,  122.41613101272509));    
  //   positionsA.push(new  AirlookMap.Cartographic.fromDegrees(117.17515779507498, 39.12656470037493,  122.00603101272509));    
  //   positionsA.push(new  AirlookMap.Cartographic.fromDegrees(117.17446779316420, 39.126604048329116,  122.00613000272509));

  var  overlayA;
  //   overlayA =  new  AirlookMap.OverlappingPolygons({     
  //       positions:  positionsA,
  //       color: "rgb(255,255,155)", // 单体化面颜色
  //       opacity: 0.5, //单体化面不透明度
  //       show: true // 单体化面的可见性
  //   });


    //展示单体化
  function  displaysinglesample()  {
      overlayA =  new  AirlookMap.OverlappingPolygons({     
          positions:  positionsA,
          color: "rgb(255,255,155)", // 单体化面颜色
          opacity: 0.5, //单体化面不透明度
          show: true // 单体化面的可见性
      });

      var simplefillcolor = $('input[name="fillColor"]').val();
      var simpleopacity = $('input[name="opacity"]').val();
      if (simplefillcolor !== "" && simpleopacity !== "") { 

          // overlayA =  new  AirlookMap.OverlappingPolygons({     
          //     positions:  positionsA,
          //     color: simplefillcolor, // 单体化面颜色
          //     opacity: simpleopacity, //单体化面不透明度
          //     show: true // 单体化面的可见性
          // });
          overlayA.position = positionsA;
          overlayA.color = simplefillcolor;
          overlayA.opacity = simpleopacity;
          overlayA.show = true;
      } else {      
          // overlayA =  new  AirlookMap.OverlappingPolygons({     
          //     positions:  positionsA,
          //     color: "rgb(255,255,155)", // 单体化面颜色
          //     opacity: 0.5, //单体化面不透明度
          //     show: true // 单体化面的可见性
          // });
          overlayA.position = positionsA;
          overlayA.color = "rgb(255,255,155)";
          overlayA.opacity = 0.5;
          overlayA.show = true;
      }     
      map.add(overlayA); 
  }   

  //移除单体化
  function  removesinglesample()  {      
      map.remove(overlayA);
      // console.log(overlayA);
  };

  //销毁单体化
  function  destorysinglesample()  {  
      overlayA.destroy();    
      console.log(overlayA);
  };