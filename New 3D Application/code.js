var 3DRotationX = 0, 3DRotationY = 0, 3DRotationZ = 0;

IDE_Morph.prototype.dropped3dObject = function (aCanvas, name, url) {
    var costume = new Costume3D(
        aCanvas,
        name ? name.split('.')[0] : '', // up to period
		url
    );

    this.currentSprite.addCostume(costume);
    this.currentSprite.wearCostume(costume);
	// this.currentSprite.freshPalette();
	// this.palette.changed();
	// this.palette.drawNew();
    this.spriteBar.tabBar.tabTo('costumes');
    this.hasChangedMedia = true;
};

IDE_Morph.prototype.projectMenu = function () {
    var menu,
        myself = this,
        world = this.world(),
        pos = this.controlBar.projectButton.bottomLeft(),
        graphicsName = this.currentSprite instanceof SpriteMorph ?
                'Costumes' : 'Backgrounds',
        shiftClicked = (world.currentKey === 16);

    menu = new MenuMorph(this);
    menu.addItem('Project notes...', 'editProjectNotes');
    menu.addLine();
    menu.addItem(
        'New',
        function () {
            myself.confirm(
                'Replace the current project with a new one?',
                'New Project',
                function () {
                    myself.newProject();
                }
            );
        }
    );
    menu.addItem('Open...', 'openProjectsBrowser');
    menu.addItem(
        'Save',
        function () {
            if (myself.source === 'examples') {
                myself.source = 'local'; // cannot save to examples
            }
            if (myself.projectName) {
                if (myself.source === 'local') { // as well as 'examples'
                    myself.saveProject(myself.projectName);
                } else { // 'cloud'
                    myself.saveProjectToCloud(myself.projectName);
                }
            } else {
                myself.saveProjectsBrowser();
            }
        }
    );
    if (shiftClicked) {
        menu.addItem(
            'Save to disk',
            'saveProjectToDisk',
            'experimental - store this project\nin your downloads folder',
            new Color(100, 0, 0)
        );
    }
    menu.addItem('Save As...', 'saveProjectsBrowser');
    menu.addLine();
    menu.addItem(
        'Import...',
        function () {
            var inp = document.createElement('input');
            if (myself.filePicker) {
                document.body.removeChild(myself.filePicker);
                myself.filePicker = null;
            }
            inp.type = 'file';
            inp.style.color = "transparent";
            inp.style.backgroundColor = "transparent";
            inp.style.border = "none";
            inp.style.outline = "none";
            inp.style.position = "absolute";
            inp.style.top = "0px";
            inp.style.left = "0px";
            inp.style.width = "0px";
            inp.style.height = "0px";
            inp.addEventListener(
                "change",
                function () {
                    document.body.removeChild(inp);
                    myself.filePicker = null;
                    world.hand.processDrop(inp.files);
                },
                false
            );
            document.body.appendChild(inp);
            myself.filePicker = inp;
            inp.click();
        },
        'file menu import hint' // looks up the actual text in the translator
    );

    menu.addItem(
        shiftClicked ?
                'Export project as plain text...' : 'Export project...',
        function () {
            if (myself.projectName) {
                myself.exportProject(myself.projectName, shiftClicked);
            } else {
                myself.prompt('Export Project As...', function (name) {
                    myself.exportProject(name);
                }, null, 'exportProject');
            }
        },
        'show project data as XML\nin a new browser window',
        shiftClicked ? new Color(100, 0, 0) : null
    );

    menu.addItem(
        'Export blocks...',
        function () {myself.exportGlobalBlocks(); },
        'show global custom block definitions as XML\nin a new browser window'
    );

    menu.addLine();
    menu.addItem(
        'Import tools',
        function () {
            myself.droppedText(
                myself.getURL(
                    'http://community.csdt.rpi.edu/csnapsource/tools.xml'
                ),
                'tools'
            );
        },
        'load the official library of\npowerful blocks'
    );
    menu.addItem(
        'Libraries...',
        function () {
            // read a list of libraries from an external file,
            var libMenu = new MenuMorph(this, 'Import library'),
                libUrl = 'http://community.csdt.rpi.edu/csnapsource/libraries/' +
                    'LIBRARIES';

            function loadLib(name) {
                var url = 'http://community.csdt.rpi.edu/csnapsource/libraries/'
                        + name
                        + '.xml';
                myself.droppedText(myself.getURL(url), name);
            }

            myself.getURL(libUrl).split('\n').forEach(function (line) {
                if (line.length > 0) {
                    libMenu.addItem(
                        line.substring(line.indexOf('\t') + 1),
                        function () {
                            loadLib(
                                line.substring(0, line.indexOf('\t'))
                            );
                        }
                    );
                }
            });

            libMenu.popup(world, pos);
        },
        'Select categories of additional blocks to add to this project.'
    );

	menu.addLine();
	menu.addItem(
        'Load Demos...',
        function () { new ProjectDialogMorph(this, 'demos').popUp();},
        'show different default scripts'
    );

	if (this.currentSprite instanceof SpriteMorph) {
		// SpriteMorph
		menu.addItem(
			'2D ' + localize(graphicsName) + '...',
			function () {
				var dir = graphicsName,
                names = myself.getCostumesList(dir),
                libMenu = new MenuMorph(
                    myself,
                    localize('Import') + ' ' + '2D ' + localize(graphicsName)
                );

				function loadCostume(name) {
					var url = dir + '/' + name,
                    img = new Image();
					img.onload = function () {
						var canvas = newCanvas(new Point(img.width, img.height));
						canvas.getContext('2d').drawImage(img, 0, 0);
						myself.droppedImage(canvas, name);
					};
					img.src = url;
				}

				names.forEach(function (line) {
					if (line.length > 0) {
						libMenu.addItem(
							line,
							function () {loadCostume(line); }
						);
					}
				});
				libMenu.popup(world, pos);
			},
			'Select a 2D costume from the media library'
		);
		menu.addItem(
			'3D ' + localize(graphicsName) + '...',
			function () {
				var dir = graphicsName + '3D',
                names = myself.getCostumesList(dir),
                libMenu = new MenuMorph(
                    myself,
                    localize('Import') + ' ' + '3D ' + localize(graphicsName)
                );

				function loadCostume(name) {
					var url = dir + '/' + name;
					// canvas = newCanvas(new Point(THREED_DEFAULT_OBJECT_WIDTH,
					// 							 THREED_DEFAULT_OBJECT_HEIGHT));
					myself.dropped3dObject(null, name, url);
				}

				names.forEach(function (line) {
					if (line.length > 0) {
						libMenu.addItem(
							line,
							function () {loadCostume(line); }
						);
					}
				});
				libMenu.popup(world, pos);
			},
			'Select a 3D costume from the media library'
		);
	}
	else {
		// StageMorph
		menu.addItem(
			localize(graphicsName) + '...',
			function () {
				var dir = graphicsName,
                names = myself.getCostumesList(dir),
                libMenu = new MenuMorph(
                    myself,
                    localize('Import') + ' ' + localize(dir)
                );

            function loadCostume(name) {
                var url = dir + '/' + name,
                    img = new Image();
                img.onload = function () {
                    var canvas = newCanvas(new Point(img.width, img.height));
                    canvas.getContext('2d').drawImage(img, 0, 0);
                    myself.droppedImage(canvas, name);
                };
                img.src = url;
            }

				names.forEach(function (line) {
					if (line.length > 0) {
						libMenu.addItem(
							line,
							function () {loadCostume(line); }
						);
					}
				});
				libMenu.popup(world, pos);
			},
			'Select a 2D costume from the media library'
		);
	}
    menu.addItem(
        localize('Sounds') + '...',
        function () {
            var names = this.getCostumesList('Sounds'),
                libMenu = new MenuMorph(this, 'Import sound');

            function loadSound(name) {
                var url = 'Sounds/' + name,
                    audio = new Audio();
                audio.src = url;
                audio.load();
                myself.droppedAudio(audio, name);
            }

            names.forEach(function (line) {
                if (line.length > 0) {
                    libMenu.addItem(
                        line,
                        function () {loadSound(line); }
                    );
                }
            });
            libMenu.popup(world, pos);
        },
        'Select a sound from the media library'
    );

    menu.popup(world, pos);
};

// Point3D //////////////////////////////////////////////////////////////

// Point3D instance creation:

function Point3D(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
}

// Point3D string representation: e.g. '12@68@10'

Point3D.prototype.toString = function () {
    return Math.round(this.x.toString()) +
        '@' + Math.round(this.y.toString()) +
        '@' + Math.round(this.z.toString());
};

// Point3D copying:

Point3D.prototype.copy = function () {
    return new Point3D(this.x, this.y, this.z);
};

// Point3D arithmetic:

Point3D.prototype.add = function (other) {
    if (other instanceof Point3D) {
        return new Point3D(this.x + other.x, this.y + other.y, this.z + other.z);
    }
    return new Point3D(this.x + other, this.y + other, this.z + other);
};

Point3D.prototype.subtract = function (other) {
    if (other instanceof Point3D) {
        return new Point3D(this.x - other.x, this.y - other.y, this.z - other.z);
    }
    return new Point3D(this.x - other, this.y - other, this.z - other);
};

Point3D.prototype.multiplyBy = function (other) {
    if (other instanceof Point3D) {
        return new Point3D(this.x * other.x, this.y * other.y, this.z * other.z);
    }
    return new Point3D(this.x * other, this.y * other, this.z * other);
};

Point3D.prototype.divideBy = function (other) {
    if (other instanceof Point3D) {
        return new Point3D(this.x / other.x, this.y / other.y, this.z / other.z);
    }
    return new Point3D(this.x / other, this.y / other, this.z / other);
};

Point3D.prototype.floorDivideBy = function (other) {
    if (other instanceof Point3D) {
        return new Point3D(Math.floor(this.x / other.x),
						   Math.floor(this.y / other.y),
						   Math.floor(this.z / other.z));
    }
    return new Point3D(Math.floor(this.x / other),
					   Math.floor(this.y / other),
					   Math.floor(this.z / other));
};

// Point3D transforming:

Point3D.prototype.scaleBy = function (scalePoint) {
    return this.multiplyBy(scalePoint);
};

Point3D.prototype.translateBy = function (deltaPoint) {
    return this.add(deltaPoint);
};


Point3D.prototype.rotateBy = function (angleX, angleY, angleZ, centerPoint) {
	// angles are in radians
	var center = centerPoint || new Point3D(0, 0, 0),
		p = this.subtract(center), rotatedP,
		rotMatrix = [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
		multiplyMatrix = function(A, B) {
			if (A[0].length != B.length) {
				return null;
			}
			var i, j, k, l = A.length, m = A[0].length, n = B[0].length, C = new Array();

			for (i = 0; i < l; i++) {
				C[i] = new Array();
				for (j = 0; j < n; j++) {
					C[i][j] = 0;
					for (k = 0; k < m; k++) {
						C[i][j] += A[i][k] * B[k][j];
					}
				}
			}
			return C;
		}


	if (angleX % Math.PI != 0) {
		rotMatrix = [[1, 0, 0],
					 [0, Math.cos(angleX), -1 * Math.sin(angleX)],
					 [0, Math.sin(angleX), Math.cos(angleX)]];
	}
	if (angleY % Math.PI != 0) {
		rotY_Matrix = [[Math.cos(angleY), 0, Math.sin(angleY)],
					   [0, 1, 0],
					   [-1 * Math.sin(angleY), 0, Math.cos(angleY)]];
		rotMatrix = multiplyMatrix(rotMatrix, rotY_Matrix);
	}
	if (angleZ % Math.PI != 0) {
		rotZ_Matrix = [[Math.cos(angleZ), -1 * Math.sin(angleZ), 0],
					   [Math.sin(angleZ), Math.cos(angleZ), 0],
					   [0, 0, 1]];
		rotMatrix = multiplyMatrix(rotMatrix, rotZ_Matrix);
	}

	rotatedP = multiplyMatrix(rotMatrix, [[p.x], [p.y], [p.z]]);

	return new Point3D(
		center.x - (-rotatedP[0]),
		center.y - (-rotatedP[1]),
		center.z - (-rotatedP[2]));
};

// Point conversion:

Point3D.prototype.asArray = function () {
    return [this.x, this.y, this.z];
};

//SHIGERU'S OBJECT.JS CHANGES

SpriteMorph.prototype.init = function (globals) {
	this.name = localize('Sprite');
	this.variables = new VariableFrame(globals || null, this);
	this.scripts = new ScriptsMorph(this);
	this.customBlocks = [];
	this.costumes = new List();
	this.costume = null;
	this.sounds = new List();
	this.normalExtent = new Point(60, 60); // only for costume-less situation
	this.scale = 1;
	this.rotationStyle = 1; // 1 = full, 2 = left/right, 0 = off
	this.version = Date.now(); // for observer optimization
	this.isClone = false; // indicate a "temporary" Scratch-style clone
	this.cloneOriginName = '';
	this.originalPixels = null;
	this.colorChange = false; //Flag to check if color change has been applied
	this.costumeColor = null;
	this.costumeChange = true; //Flag to check if costume change has been applied

	// sprite nesting properties
	this.parts = []; // not serialized, only anchor (name)
	this.anchor = null;
	this.nestingScale = 1;
	this.rotatesWithAnchor = true;

	this.blocksCache = {}; // not to be serialized (!)
	this.paletteCache = {}; // not to be serialized (!)
	this.rotationOffset = new Point(); // not to be serialized (!)
	this.idx = 0; // not to be serialized (!) - used for de-serialization
	this.wasWarped = false; // not to be serialized, used for fast-tracking

	SpriteMorph.uber.init.call(this);

	this.isDraggable = true;
	this.isDown = false;

	this.heading = 90;

	// 3D properties
	this.is3D = false;
	this.zPosition = 0;
	this.xRotation = 0; // degrees
	this.yRotation = 0;
	this.zRotation = 0;
	this.geometry = null;

	this.changed();
	this.drawNew();
	this.changed();
};

// SpriteMorph 2D/3D rendering
const THREED_DEFAULT_OBJECT_SIZE = 160;
const THREED_CAMERA_Z_POSITION = 200;

const THREEJS_FIELD_OF_VIEW = 45; // degree
const THREEJS_CAMERA_Z_POSITION = 10;
var isShowingSphere = false;
var isShowingLine = false;
var debugTranslate = false;

SpriteMorph.prototype.drawNew = function () {
	var myself = this,
	currentCenter = this.center(),
	facing, // actual costume heading based on my rotation style
	isFlipped,
	isLoadingCostume = this.costume &&
		typeof this.costume.loaded === 'function',
	cst,
	pic, // (flipped copy of) actual costume based on my rotation style
	stageScale = this.parent instanceof StageMorph ?
		this.parent.scale : 1,
	newX,
	corners = [],
	origin,
	shift,
	corner,
	costumeExtent,
	ctx,
	handle;


	if (this.isWarped) {
		this.wantsRedraw = true;
		return;
	}

	if (this.costume instanceof Costume3D) {
		var canvasSize =
			(THREED_CAMERA_Z_POSITION / (THREED_CAMERA_Z_POSITION - this.zPosition)) *
			THREED_DEFAULT_OBJECT_SIZE;
		canvasSize = Math.max( canvasSize, 5 );
		var stageScale = this.parent instanceof StageMorph ? this.parent.scale : 1,
		costumeExtent = new Point(canvasSize, canvasSize).multiplyBy(this.scale * stageScale);

		if (this.isWarped) {
			this.endWarp();
		}
		this.changed(); // this is important to clear the current image

		this.image = newCanvas(costumeExtent);
		this.silentSetExtent(costumeExtent);
		this.render3dObject(this.image,	this.costume.url);

		this.setCenter(currentCenter, true); // just me

		// need this for centering
		this.rotationOffset = new Point(0, 0)
			.translateBy(new Point(canvasSize / 2, canvasSize / 2))
			.scaleBy(this.scale * stageScale);

		this.is3D = true;
	}
	else {
		facing = this.rotationStyle ? this.heading : 90;
		if (this.rotationStyle === 2) {
			facing = 90;
			if ((this.heading > 180 && (this.heading < 360))
				|| (this.heading < 0 && (this.heading > -180))) {
				isFlipped = true;
			}
		}
		if (this.costume && !isLoadingCostume) {
			pic = isFlipped ? this.costume.flipped() : this.costume;

			// determine the rotated costume's bounding box
			corners = pic.bounds().corners().map(function (point) {
				return point.rotateBy(
					radians(facing - 90),
					myself.costume.center()
				);
			});

			origin = corners[0];
			corner = corners[0];
			corners.forEach(function (point) {
				origin = origin.min(point);
				corner = corner.max(point);
			});
			costumeExtent = origin.corner(corner)
				.extent().multiplyBy(this.scale * stageScale);

			// determine the new relative origin of the rotated shape
			shift = new Point(0, 0).rotateBy(
				radians(-(facing - 90)),
				pic.center()
			).subtract(origin);

			// create a new, adequately dimensioned canvas
			// and draw the costume on it
			this.image = newCanvas(costumeExtent);
			this.silentSetExtent(costumeExtent);
			ctx = this.image.getContext('2d');
			ctx.scale(this.scale * stageScale, this.scale * stageScale);
			ctx.translate(shift.x, shift.y);
			ctx.rotate(radians(facing - 90));
			ctx.drawImage(pic.contents, 0, 0);

			// adjust my position to the rotation
			this.setCenter(currentCenter, true); // just me

			// determine my rotation offset
			this.rotationOffset = shift
				.translateBy(pic.rotationCenter)
				.rotateBy(radians(-(facing - 90)), shift)
				.scaleBy(this.scale * stageScale);

		} else { //			if (this.costume && !isLoadingCostume) {
			facing = isFlipped ? -90 : facing;
			newX = Math.min(
				Math.max(
					this.normalExtent.x * this.scale * stageScale,
					5
				),
				1000
			);
			this.silentSetExtent(new Point(newX, newX));
			this.image = newCanvas(this.extent());
			this.setCenter(currentCenter, true); // just me
			SpriteMorph.uber.drawNew.call(this, facing);
			this.rotationOffset = this.extent().divideBy(2);
			if (isLoadingCostume) { // retry until costume is done loading
				cst = this.costume;
				handle = setInterval(
					function () {
						myself.wearCostume(cst);
						clearInterval(handle);
					},
					100
				);
				return myself.wearCostume(null);

			}
		}
	} // if (this.costume instanceof Costume3D) {
	this.version = Date.now();

	this.originalPixels = this.image.getContext('2d').createImageData(this.width(), this.height());
	this.originalPixels = this.image.getContext('2d').getImageData(0, 0, this.width(), this.height());
};


SpriteMorph.prototype.compute3dScale = function(geometry, fov, dist, aspect) {
	// see: http://stackoverflow.com/questions/13350875/three-js-width-of-view/13351534#13351534
	var sphere = geometry.boundingSphere; // THREE.Sphere
	var visible_height = 2 * Math.tan(radians(fov / 2)) * dist;
	var visible_width = aspect * visible_height;
	var scale = Math.min(visible_height / (2 * sphere.radius), visible_width / (2 * sphere.radius));

	return [scale * 0.92, sphere]; // TODO: this works, but kludgy
}


SpriteMorph.prototype.jsonLoaderCallback = function (spriteMorph) {
	var myself = spriteMorph;

	return function(geometry) {
		myself.geometry = geometry;

		// compute a proper scaling factor and the center of the geometry
		var results = myself.compute3dScale(geometry,
											THREEJS_FIELD_OF_VIEW, THREEJS_CAMERA_Z_POSITION,
											myself.canvas3D.width/myself.canvas3D.height);
		var scale = results[0], sphere = results[1];

		// create a mesh and shift it so that it is centered
		var color = new THREE.Color(myself.color.r/255, myself.color.g/255, myself.color.b/255);
		var mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial({color: color}) );
		mesh.position.set( -sphere.center.x, -sphere.center.y, -sphere.center.z );

		// create a wrapper to the mesh
		// see: http://stackoverflow.com/questions/12835361/three-js-move-custom-geometry-to-origin
		myself.object = new THREE.Object3D();
		myself.object.add( mesh );
		myself.object.scale.set( scale, scale, scale );
		myself.object.rotation.x = radians(myself.xRotation);
		myself.object.rotation.y = radians(myself.yRotation);
		myself.object.rotation.z = radians(myself.zRotation);
		myself.scene.add(myself.object);

		// create a sphere for debug purpose
		if (isShowingSphere) {
			var sphereGeometry = new THREE.SphereGeometry(sphere.radius, 32, 32);
			var sphereMaterial = new THREE.MeshBasicMaterial( {color: 0xcccccc,
															   wireframe: true,
															   transparent: true,
															   opacity: 0.3 } );
			var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
			sphereMesh.scale.set( scale, scale, scale );
			myself.scene.add(sphereMesh);
		}

		if (isShowingLine) {
			var lineGeometry = new THREE.Geometry();
			var array = lineGeometry.vertices;
			// array.push( new THREE.Vector3(-15, -10, 0), new THREE.Vector3(-15, 10, 0) );
			array.push( new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 10));
			console.log( "sphere.radius: " + sphere.radius );
			// array.push( new THREE.Vector3(15, -10, 0), new THREE.Vector3(15, 10, 0) );
			// lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
			// lineGeometry.vertices.push(new THREE.Vector3(0, 0, sphere.radius));
			var lineMaterial = new THREE.LineDashedMaterial({color:0xff0000, linewidth:5});
			myself.line = new THREE.Line(lineGeometry, lineMaterial);
			myself.scene.add(myself.line);
		}

		// create a point light
		var pointLight = new THREE.PointLight( 0xFFFFFF );
		pointLight.position.x = 50;
		pointLight.position.y = 50;
		pointLight.position.z = 100;
		myself.scene.add(pointLight);

		context = myself.canvas3D.getContext('2d');
		context.save();

		// console.time('render3dObject-render');
		myself.renderer.render(myself.scene, myself.camera);
		// console.timeEnd('render3dObject-render');

		context.restore();
		myself.changed();
		if (myself.isWarped) {
			myself.startWarp();
		}
	}
}


SpriteMorph.prototype.render3dObject = function (aCanvas, url) {
	// console.time('render3dObject');

	var loader = new THREE.JSONLoader();

	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(THREEJS_FIELD_OF_VIEW,
											  aCanvas.width/aCanvas.height, 0.1, 1000);
	this.camera.position.z = THREEJS_CAMERA_Z_POSITION;
	this.scene.add(this.camera);
	this.renderer = new THREE.CanvasRenderer({canvas: aCanvas});
	this.renderer.setSize(aCanvas.width, aCanvas.height);
	this.canvas3D = aCanvas;

	// load a 3D geometry from the url
	if (!this.costumeChange && this.geometry) {
		// you don't have to read the geometry again - synchronized function call
		(this.jsonLoaderCallback(this))(this.geometry);
	}
	else {
		loader.load(url, this.jsonLoaderCallback(this));
		this.costumeChange = false;
	}

	// console.timeEnd('render3dObject');
}


SpriteMorph.prototype.update3dObject = function () {
	// console.time('update3dObject');

	var context = this.image.getContext('2d'),
	isWarped = this.isWarped;
	if (isWarped) {
		this.endWarp();
	}
	context.save();

	context.clearRect(0, 0, this.image.width, this.image.height);
	this.object.rotation.x = radians(this.xRotation);
	this.object.rotation.y = radians(this.yRotation);
	this.object.rotation.z = radians(this.zRotation);
	console.log("rotation (x,y,z)=(" +
				this.xRotation + ", " +
				this.yRotation + ", " +
				this.zRotation + ")");
	this.renderer.render(this.scene, this.camera);

	context.restore();
	this.changed();
	if (isWarped) {
		this.startWarp();
	}

	// console.timeEnd('update3dObject');
};

SpriteMorph.prototype.doStampCube = function () {
	var stage = this.parent,
	canvas = stage.penTrails(),
	context = canvas.getContext('2d'),
	width = stage.image.width,
	height = stage.image.height,
	isWarped = this.isWarped;

	if (isWarped) {
		this.endWarp();
	}
	context.save();
	context.scale(1 / stage.scale, 1 / stage.scale);

	this.render3dObject( canvas, width, height );

	context.restore();
	this.changed();
	if (isWarped) {
		this.startWarp();
	}
};

SpriteMorph.prototype.turn3dWithNesting = function (degX, degY, degZ) {
	var sum = new Point3D(this.xPosition(), this.yPosition(), this.zPosition),
		center, p, newP;

	this.parts.forEach(function (part) {
		sum = sum.add(new Point3D(part.xPosition(), part.yPosition(), part.zPosition));
	});
	center = sum.divideBy(this.parts.length + 1);

	// translate myself first
	p = new Point3D(this.xPosition(), this.yPosition(), this.zPosition);
	newP = p.rotateBy(radians(degX), radians(degY), radians(degZ), center);
	// console.log( p + " --> " + newP);
	this.xRotation += degX;
	this.yRotation += degY;
	this.zRotation += degZ;
	// this.lookAt(newP, center);
	this.gotoXYZ(newP.x, newP.y, newP.z, true /* justme */);

	// then my parts
	this.parts.forEach(function (part) {
		p = new Point3D(part.xPosition(), part.yPosition(), part.zPosition);
		newP = p.rotateBy(radians(degX), radians(degY), radians(degZ), center);
		// console.log( p + " --> " + newP);
		part.xRotation += degX;
		part.yRotation += degY;
		part.zRotation += degZ;
		// part.lookAt(newP, center);
		part.gotoXYZ(newP.x, newP.y, newP.z, true /* justme */);
	});
}

// Costume3D /////////////////////////////////////////////////////////////

/*
  I am a costume containing a 3D object
*/

// Costume3D inherits from Costume:

Costume3D.prototype = new Costume();
Costume3D.prototype.constructor = Costume3D;
Costume3D.uber = Costume.prototype;

// Costume3D instance creation

function Costume3D(canvas, name, url, rotationCenter) {
	this.contents = canvas || newCanvas();
	this.shrinkToFit(this.maxExtent);
	this.name = name || null;
	this.rotationCenter = rotationCenter || this.center();
	this.version = Date.now(); // for observer optimization
	this.loaded = null; // for de-serialization only

	// added for 3D
	this.url = url;
}

Costume3D.prototype.toString = function () {
	return 'a Costume3D(' + this.name + ')';
};

SpriteMorph.prototype.turn3D = function (degX, degY, degZ) {
    if (this.costume && this.costume.is3D) {

        var fullQuaternion = new THREE.Quaternion(), quaternionX = new THREE.Quaternion(), quaternionY = new THREE.Quaternion(), quaternionZ = new THREE.Quaternion();
        quaternionX.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), radians(3DRotationX + degX) );
        quaternionY.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), radians(3DRotationY + degY) );
        quaternionZ.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), radians(3DRotationZ + degZ) );

        fullQuaternion.multiplyQuaternions(quaternionZ,quaternionY.multiplyQuaternions(quaternionY,quaternionX));

        this.object.quaternion.copy(fullQuaternion);
        this.parent.changed();
    }
};

SpriteMorph.prototype.point3D = function (degX, degY, degZ) {
    if (this.costume && this.costume.is3D) {

        var fullQuaternion = new THREE.Quaternion(), quaternionX = new THREE.Quaternion(), quaternionY = new THREE.Quaternion(), quaternionZ = new THREE.Quaternion();
        quaternionX.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), radians(degX) );
        quaternionY.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), radians(degY) );
        quaternionZ.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), radians(degZ) );

        fullQuaternion.multiplyQuaternions(quaternionZ,quaternionY.multiplyQuaternions(quaternionY,quaternionX));

        this.object.quaternion.copy(fullQuaternion);

        3DRotationX = degX;
        3DRotationY = degY;
        3DRotationZ = degZ;

        this.parent.changed();
    }
};


/**
 * Unsure about the placement of the function below but I will be confirming with Ron to see if this is how it was done prior to 2019
 * @param radius this param alters the radius of the 3D object i.e how big you want it to be
 * @param detail this param alters the vertices of the object default is 0 changing it will turn the polygon to a sphere
 * @param colorParam this param alters the color of the object
 */
SpriteMorph.prototype.icosahedron = function (radius, detail, colorParam){
    if (this.costume && this.costume.is3D){
	try {
            let icosahedron = function () {
                if (radius === undefined || detail === undefined) {
                    radius = 1;
                    detail = 0;
                }

                let enteredColorToLowerCase = colorParam.toLowerCase();
                let color = "";
                let emissive = "";

                if (enteredColorToLowerCase !== undefined) {
                    color = new THREE.Color(enteredColorToLowerCase);
                    emissive = color;
                } else {
                    color = new THREE.Color('blue');
                    emissive = color;
                }
                let geometry = new THREE.IcosahedronGeometry(radius, detail);
                let material = new THREE.MeshLambertMaterial({emissive: emissive, color: color});
                return new THREE.Mesh(geometry, material);
            };
            this.render3dShape(icosahedron());
    } catch (e) {
        console.log(e);
    	}
    } else {
    	console.log("that didn't work");
	}
};


//# sourceURL=code.js
