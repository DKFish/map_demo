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