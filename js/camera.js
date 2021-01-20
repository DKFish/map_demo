const flyTo = new function() {
    this.longitude = '100.23848506577119';
    this.latitude = '26.871084980034272';
    this.height = '3000';
    this.heading = '40';
    this.pitch = '70'

    this.flyTo = ()=> {
        map.camera.flyTo({
        destination: fromDegrees(parseFloat(this.longitude), parseFloat(this.latitude), parseFloat(this.height)),
        duration: 4,
        orientation: {
          heading: AirlookMap.CesiumMath.toRadians(parseFloat(this.heading)),
          pitch: AirlookMap.CesiumMath.toRadians(parseFloat(this.pitch)),
          easingFunction: QUINTIC_IN_OUT
        }
      }).then(function () {
        console.log("flyTo complete");
      })
    }
  }

const flyToTarget = new function() {
this.longitude = '100.23848506577119';
this.latitude = '26.871084980034272';
this.height = '3000';
this.heading = '40';
this.pitch = '70';
this.distance = '500';

this.flyToTarget = () => {
    map.camera.flyToTarget({
    destination: fromDegrees(parseFloat(this.longitude), parseFloat(this.latitude), parseFloat(this.height)),
    duration: 4,
    orientation: {
        heading: AirlookMap.CesiumMath.toRadians(parseFloat(this.heading)),
        pitch: AirlookMap.CesiumMath.toRadians(parseFloat(this.pitch)),
        easingFunction: QUINTIC_IN_OUT
    },
    distance: parseFloat(this.distance)
    }).then(function () {
    console.log("flyToTarget complete");
    })
}
}

const flyToBoundingSphere = new function() {
    this.heading = '40';
    this.pitch = '70';
    this.duration = '10';

    this.flyToBoundingSphere = () => {
            let positions = [];
            positions.push(fromDegrees(100.234928752854000,26.873662618427900,2555.813280490890000));
            positions.push(fromDegrees(100.235568339977000,26.873689155257600,2555.540214452850000));
            positions.push(fromDegrees(100.236486162106000,26.873425509806900,2558.797632396730000));
            positions.push(fromDegrees(100.237450961385000,26.873073961105500,2557.679067951740000));
            positions.push(fromDegrees(100.237447606581000,26.872130383600800,2553.212960550920000));
            positions.push(fromDegrees(100.236184229051000,26.872473130836000,2553.492367216170000));
            positions.push(fromDegrees(100.235514748087000,26.872794579590600,2548.680443143950000));
            positions.push(fromDegrees(100.234606424028000,26.872248083177900,2552.300634947120000));
            let boundingSphere = AirlookMap.BoundingSphere.fromCartographics(positions);
            map.camera.flyToBoundingSphere({
                boundingSphere,
                orientation: {
                    heading: AirlookMap.CesiumMath.toRadians(parseFloat(this.heading)),
                    pitch: AirlookMap.CesiumMath.toRadians(parseFloat(this.pitch))
                },
                duration: parseFloat(this.duration),
                easingFunction: AirlookMap.EasingFunction.QUARTIC_OUT
            }).then(function () {
                console.log("flyToBoundingSphere complete");
            })
        }
}

const lookAtTarget = new function() {
    this.longitude = '100.234928752854000';
    this.latitude = '26.873662618427900';
    this.height = '3000';

    this.lookAtTarget = () => {
        map.camera.lookAtTarget(
            fromDegrees(parseFloat(this.longitude), parseFloat(this.latitude), parseFloat(this.height)),
        )
    }
}

const cameraPositionFromTarget = new function() {
    this.longitude = '100.23848506577119';
    this.latitude = '26.871084980034272';
    this.height = '3000';
    this.heading = '40';
    this.pitch = '70';
    this.distance = '30';

    this.cameraPositionFromTarget = ()=> {
        map.camera.cameraPositionFromTarget({
            destination: fromDegrees(parseFloat(this.longitude), parseFloat(this.latitude), parseFloat(this.height)),
            orientation: {
                heading: AirlookMap.CesiumMath.toRadians(parseFloat(this.heading)),
                pitch: AirlookMap.CesiumMath.toRadians(parseFloat(this.pitch)),
            },
            distance: parseFloat(this.distance)
        })
    }
}
