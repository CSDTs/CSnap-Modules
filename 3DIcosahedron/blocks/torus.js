(function () {
    return function (width, length) {
    // all used to build our geometry
    const THREEJS_ARC_SEGMENTS = 60, THREEJS_TUBE_SEGMENTS = THREEJS_ARC_SEGMENTS;

    // from our params {width and length} passed in above
    var xRadius = width/2,
        yRadius = length/2,
        y,
        z,
        points = [],
        path,
        THREEJS_TUBE_RADIUS = this.penSize(), THREEJS_TUBE_RADIUS_SEGMENTS = 4, geometry;

    // iteration to repeat the number of arch's we have
    for (var theta = 0; theta <= 2*Math.PI+0.1; theta += (Math.PI/THREEJS_ARC_SEGMENTS)) {
        y = xRadius * Math.cos(theta);
        z = yRadius * Math.sin(theta);
        points.push(new THREE.Vector3(0, y, z));
    }

    //Setting up our object to create the geometry below
    path = new THREE.SplineCurve3(points);

    // the 3d shape for the anishinaabe arc but we can create our own geometry here
    geometry = new THREE.TubeGeometry(path,
                                      THREEJS_TUBE_SEGMENTS,
                                      THREEJS_TUBE_RADIUS,
                                      THREEJS_TUBE_RADIUS_SEGMENTS,
                                      false);   // closed or not

    // render3dShape takes the threejs geometry which could be any 3D shape we created to render
    // in this case we are taking the geometry shape created above on line 17
    this.render3dShape(geometry, false);
    };
}());


 //# sourceURL=torus.js
