(function () {
    return function (width, length) {
    const THREEJS_ARC_SEGMENTS = 60,
        THREEJS_TUBE_SEGMENTS = THREEJS_ARC_SEGMENTS;
    var xRadius = width/2, yRadius = length, x, y, points = new Array(), 
        path, 
        THREEJS_TUBE_RADIUS = this.penSize(),
        THREEJS_TUBE_RADIUS_SEGMENTS = 4,
		geometry;

    for (var theta = 0; theta <= 2*Math.PI+0.1; theta += (Math.PI/THREEJS_ARC_SEGMENTS)) {
        x = xRadius * Math.cos(theta);
        y = yRadius * Math.sin(theta);
        points.push(new THREE.Vector3(x, y, 0));
    }
    path = new THREE.SplineCurve3(points);
    geometry = new THREE.TubeGeometry(path, 
                                      THREEJS_TUBE_SEGMENTS,
                                      THREEJS_TUBE_RADIUS,
                                      THREEJS_TUBE_RADIUS_SEGMENTS,
                                      false);   // closed or not
    this.render3dShape(geometry, false);
    };
}());


 //# sourceURL=torus.js