SpriteMorph._3DRotationX = 0, SpriteMorph._3DRotationY = 0, SpriteMorph._3DRotationZ = 0;

SpriteMorph.prototype.wearCostume = function (costume) {

    // check if we need to remove the existing 3D shape
    if (this.colorChange || (this.object && this.costume && costume != this.costume)) {
        this.object.remove(this.mesh);
        this.parent.changed(); // redraw stage
    }

    // check if we need to update the palatte
    var isFrom2D = (this.costume == null) || (this.costume && !this.costume.is3D),
        isTo2D = (costume == null) || (costume && !costume.is3D);
    this.updatesPalette = (isFrom2D != isTo2D);

    if (costume && costume.is3D) { // if (costume == null), that means a Turtle
        if (costume.geometry != null) {
            // we have loaded a 3D geometry already already already
            var color = new THREE.Color(this.color.r/255, 
                                        this.color.g/255, 
                                        this.color.b/255),
                material, mesh, sphere;

            if (costume.map) {
                if (costume.geometry instanceof THREE.PlaneGeometry) {
                    material = new THREE.MeshPhongMaterial({map: costume.map, side: THREE.DoubleSide});
                }
                else {
                    material = new THREE.MeshPhongMaterial({map: costume.map, color: color});
                }
            }
            else {
                material = new THREE.MeshLambertMaterial({color: color});
            }
            mesh = new THREE.Mesh(costume.geometry, material);
            costume.geometry.computeBoundingSphere();
            sphere = costume.geometry.boundingSphere; // THREE.Sphere
            mesh.position.set(-sphere.center.x, -sphere.center.y, -sphere.center.z);

            this.mesh = mesh;
            this.hide();
            this.object.children = []
            this.object.add(this.mesh);
            this.parent.changed(); // redraw stage
        }
        else {
            // first time we load this geometry
            var loader = new THREE.JSONLoader(), myself = this;
            loader.load(costume.url, function(geometry) {
                var color = new THREE.Color(myself.color.r/255, 
                                            myself.color.g/255, 
                                            myself.color.b/255);
                var material = new THREE.MeshLambertMaterial({color: color}),
                    mesh = new THREE.Mesh(geometry, material),
                    sphere = geometry.boundingSphere; // THREE.Sphere
                mesh.position.set(-sphere.center.x, -sphere.center.y, -sphere.center.z);
                myself.mesh = mesh;

                myself.object = new THREE.Object3D();
                myself.object.add(myself.mesh);
                myself.object.position.x = myself.xPosition();
                myself.object.position.y = myself.yPosition();
                myself.object.position.z = 0;

                myself.hide(); // hide the 2D image
                myself.parent.scene.add(myself.object);
                myself.parent.changed(); // redraw stage

                costume.geometry = geometry;
            });
        }
        this.costume = costume;
    }
    else {
        var x = this.xPosition ? this.xPosition() : null,
        y = this.yPosition ? this.yPosition() : null,
        isWarped = this.isWarped;
        if (isWarped) {
            this.endWarp();
        }
        this.changed();
        this.costume = costume;
        this.drawNew();
        this.changed();
        if (isWarped) {
            this.startWarp();
        }
        if (x !== null) {
            this.silentGotoXY(x, y, true); // just me
        }
        if (this.positionTalkBubble) { // the stage doesn't talk
            this.positionTalkBubble();
        }
        this.version = Date.now();
    }

    if (this.updatesPalette) {
        var ide = this.parentThatIsA(IDE_Morph);
        if (ide) {
            ide.selectSprite(this);
        }
    }
};

SpriteMorph.prototype.turn3D = function (degX, degY, degZ) {
    if (this.costume && this.costume.is3D) {
        
        var fullQuaternion = new THREE.Quaternion(), quaternionX = new THREE.Quaternion(), quaternionY = new THREE.Quaternion(), quaternionZ = new THREE.Quaternion();
        quaternionX.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), radians(degX) );
        quaternionY.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), radians(degY) );
        quaternionZ.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), -radians(degZ) );

        this._3DRotationX += degX;
        this._3DRotationY += degY;
        this._3DRotationZ += degZ;
		
        fullQuaternion.multiplyQuaternions(quaternionZ,quaternionY.multiplyQuaternions(quaternionY,quaternionX.multiplyQuaternions(quaternionX,this.object.quaternion)));

        this.object.quaternion.copy(fullQuaternion);
        this.parent.changed();
    }
};

SpriteMorph.prototype.point3D = function (degX, degY, degZ) {
    if (this.costume && this.costume.is3D) {

        var fullQuaternion = new THREE.Quaternion(), quaternionX = new THREE.Quaternion(), quaternionY = new THREE.Quaternion(), quaternionZ = new THREE.Quaternion();
        quaternionX.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), radians(degX) );
        quaternionY.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), radians(degY) );
        quaternionZ.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), -radians(degZ) );

        fullQuaternion.multiplyQuaternions(quaternionZ,quaternionY.multiplyQuaternions(quaternionY,quaternionX));

        this.object.quaternion.copy(fullQuaternion);

        this._3DRotationX = degX;
        this._3DRotationY = degY;
        this._3DRotationZ = degZ;

        this.parent.changed();
    }
};

StageMorph.prototype.addCoordinatePlane = function (){
    var geometry, grid, text, textShapes, xaxis, xlabel, yaxis, ylabel, zaxis, zlabel, material, size = 300, step = 20;

    geometry = new THREE.Geometry();
    material = new THREE.LineBasicMaterial({color: 'black'});

    for ( var i = -size; i <= size; i+= step) {
        geometry.vertices.push(new THREE.Vector3( -size, -0.04, i ));
        geometry.vertices.push(new THREE.Vector3( size, -0.04, i ));
        geometry.vertices.push(new THREE.Vector3( i, -0.04, -size ));
        geometry.vertices.push(new THREE.Vector3( i, -0.04, size ));
    }
    
    grid = new THREE.Line(geometry, material, THREE.LinePieces);
    
    object = new THREE.Object3D();
    object.add(grid);
    
    geometry = new THREE.Geometry();
    material = new THREE.LineBasicMaterial({linewidth: 5, linecap: 'round', color: 'red'});
    
    geometry.vertices.push(new THREE.Vector3( 0, -0.04, 0 ));
    geometry.vertices.push(new THREE.Vector3( size, -0.04, 0 ));
    
    xaxis = new THREE.Line(geometry, material, THREE.LinePieces);
    
    object.add(xaxis);
    
    textShapes = THREE.FontUtils.generateShapes( 'X', {size:16});
    text = new THREE.ShapeGeometry( textShapes );
    xlabel = new THREE.Mesh( text, new THREE.MeshBasicMaterial( { color: 'red' } ) ) ;
    xlabel.position = new THREE.Vector3(size, 0, 0);
    xlabel.rotation.x = -Math.PI/2;
    
    object.add(xlabel);
    
    geometry = new THREE.Geometry();
    material = new THREE.LineBasicMaterial({linewidth: 5, linecap: 'round', color: 'green'});
    
    geometry.vertices.push(new THREE.Vector3( 0, -0.04, 0 ));
    geometry.vertices.push(new THREE.Vector3( 0, -0.04, -size ));
    
    yaxis = new THREE.Line(geometry, material, THREE.LinePieces);
    
    object.add(yaxis);
    
    textShapes = THREE.FontUtils.generateShapes( 'Y', {size:16});
    text = new THREE.ShapeGeometry( textShapes );
    ylabel = new THREE.Mesh( text, new THREE.MeshBasicMaterial( { color: 'green' } ) ) ;
    ylabel.position = new THREE.Vector3(0, 0, -size);
    ylabel.rotation.x = -Math.PI/2;
    
    object.add(ylabel);
    
    geometry = new THREE.Geometry();
    material = new THREE.LineBasicMaterial({linewidth: 5, linecap: 'round', color: 'blue'});
    
    geometry.vertices.push(new THREE.Vector3( 0, 0, 0 ));
    geometry.vertices.push(new THREE.Vector3( 0, size, 0 ));
    
    zaxis = new THREE.Line(geometry, material, THREE.LinePieces);
    
    object.add(zaxis);
    
    textShapes = THREE.FontUtils.generateShapes( 'Z', {size:16});
    text = new THREE.ShapeGeometry( textShapes );
    zlabel = new THREE.Mesh( text, new THREE.MeshBasicMaterial( { color: 'blue' } ) ) ;
    zlabel.position = new THREE.Vector3(0, size, 0);
    zlabel.rotation.x = 0;
    
    object.add(zlabel);
    
    //this.shownObjects.add(object); // erase this object later by the 'clear' block
    this.scene.add(object);
    this.changed();
};

this.ide.isAnimating = false;
this.ide.setStageExtent(new Point(700, 525));
this.ide.isAnimating = true;

StageMorph.prototype.init3D = function () {
    var canvas = this.get3dCanvas();

    var vFOV = THREEJS_FIELD_OF_VIEW;
    var dist = THREEJS_CAMERA_DEFAULT_Z_POSITION;
    var height = 2 * Math.tan(radians(vFOV / 2)) * dist;
    var width = (canvas.width / canvas.height) * height;

    this.scene = new THREE.Scene();

    // camera
    this.camera = new THREE.PerspectiveCamera(vFOV,
                                              canvas.width / canvas.height, 0.1, 10000);
    this.camera.position.set(THREEJS_CAMERA_DEFAULT_X_POSITION, 
                             THREEJS_CAMERA_DEFAULT_Y_POSITION,
                             THREEJS_CAMERA_DEFAULT_Z_POSITION);
    this.camera.lookAt({x:0, y:0, z:0});
    pointLight = new THREE.PointLight( 0xffffff );
    pointLight.position.set(1,1,2);
    this.camera.add(pointLight);
    this.scene.add(this.camera);

    // lighting
    //

    // renderer
    // try {
    //     this.renderer = new THREE.WebGLRenderer({canvas: canvas});
    // } catch (e) {
        this.renderer = new THREE.CanvasRenderer({canvas: canvas});
    // }
    this.renderer.setSize(canvas.width, canvas.height);
}

SpriteMorph.prototype.renderArc = function (width, height) {
    const THREEJS_ARC_SEGMENTS = 60,
        THREEJS_TUBE_SEGMENTS = THREEJS_ARC_SEGMENTS;
    var xRadius = width/2, yRadius = height, x, y, points = new Array(), 
        path, 
        THREEJS_TUBE_RADIUS = this.penSize(),
        THREEJS_TUBE_RADIUS_SEGMENTS = this.penSize()+4,
		geometry;

    for (var theta = 0; theta <= Math.PI; theta += (Math.PI/THREEJS_ARC_SEGMENTS)) {
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
}

StageMorph.prototype.init = function (globals) {
    this.name = localize('Stage');
    this.threads = new ThreadManager();
    this.variables = new VariableFrame(globals || null, this);
    this.scripts = new ScriptsMorph(this);
    this.customBlocks = [];
    this.globalBlocks = [];
    this.costumes = new List();
    this.costume = null;
    this.sounds = new List();
    this.version = Date.now(); // for observers
    this.isFastTracked = false;
    this.cloneCount = 0;
    this.volume = 100;
    this.muted = false;

    this.timerStart = Date.now();
    this.tempo = 60; // bpm
    this.lastMessage = '';

    this.watcherUpdateFrequency = 2;
    this.lastWatcherUpdate = Date.now();

    this.scale = 1; // for display modes, do not persist

    this.keysPressed = {}; // for handling keyboard events, do not persist
    this.blocksCache = {}; // not to be serialized (!)
    this.paletteCache = {}; // not to be serialized (!)
    this.lastAnswer = null; // last user input, do not persist
    this.activeSounds = []; // do not persist

    this.trailsCanvas = null;
    this.isThreadSafe = false;

    StageMorph.uber.init.call(this);

    this.acceptsDrops = false;
    this.setColor(new Color(255, 255, 255));
    this.fps = this.frameRate;

    // 3D
    this.canvas3D = null;
    this.shownObjects = new List();
    this.hiddenObjects = new List();
    this.init3D();
    this.addCoordinatePlane();
};

function round10(val,exp) {
	var pow = Math.pow(10,exp);
	return Math.round(val/pow)*pow;
}
//# sourceURL=code.js