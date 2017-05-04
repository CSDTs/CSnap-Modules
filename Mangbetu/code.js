SpriteMorph.flippedY = false;
SpriteMorph.flippedX = false;
SpriteMorph.isNotFlipBack = true;
SpriteMorph.FirstCostume = true;
Costume.colored = false;
var originalContent, ID;
SpriteMorph.prototype.wearCostume = function (costume) {
	if(!this.isNotFlipBack)
	{
		if(this.flippedY)
		{
			this.flipYAxis();
		}
		if(this.flippedX)
		{
			this.flipXAxis();
		}
	}
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
            // we have loaded a 3D geometry already
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
		if (this.costume && this.costume.originalPixels && !this.FirstCostume) 
		{
			this.costume.contents.getContext('2d').putImageData(this.costume.originalPixels, 0, 0);
			this.costume.colored = false;
		}
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
        this.costume = costume;
    }

    if (this.updatesPalette) {
        var ide = this.parentThatIsA(IDE_Morph);
        if (ide) {
            ide.selectSprite(this);
        }
    }
	this.FirstCostume = false;
};
Costume.prototype.setColorWithParent = function(col, myParent) {
	var flipBackX = false, flipBackY = false;
	if(myParent.flippedY)
	{
		myParent.flipYAxis();
		flipBackY = true;
	}
	if(myParent.flippedX)
	{
		myParent.flipXAxis();
		flipBackX = true;
	}

	 if(!this.originalPixels) {
		this.originalPixels = this.contents.getContext('2d')
		   .getImageData(0, 0, this.contents.width,
			  this.contents.height);
	 }
	 if(!this.costumeColor) {
		this.costumeColor = new Color(255,255,255);
	 }

	 currentPixels = this.contents.getContext('2d')
		.getImageData(0, 0,
		   this.contents.width, this.contents.height);

	 if(col instanceof Color) {
		this.costumeColor = col;
	 }
	 else {
		var hsv = this.costumeColor.hsv();
		hsv[0] = Math.max(Math.min(+col || 0, 100), 0) / 100;
		hsv[1] = 1; // we gotta fix this at some time
		this.costumeColor.set_hsv.apply(this.costumeColor, hsv);
	 }

	 for(var I = 0, L = this.originalPixels.data.length; I < L; I += 4){
		if(currentPixels.data[I + 3] > 0){
		   // If it's not a transparent pixel
		   currentPixels.data[I] = this.originalPixels.
			  data[I] / 255 * this.costumeColor.r;
		   currentPixels.data[I + 1] = this.originalPixels.
			  data[I + 1] / 255 * this.costumeColor.g;
		   currentPixels.data[I + 2] = this.originalPixels.
			  data[I + 2] / 255 * this.costumeColor.b;
		}
	 }
	 this.contents.getContext('2d')
		.putImageData(currentPixels, 0, 0);
	if(flipBackY)
	{
		myParent.flipYAxis();
	}
	if(flipBackX)
	{
		myParent.flipXAxis();
	}
};
Costume.prototype.copy = function () {
    var canvas = newCanvas(this.extent()),
        cpy,
        ctx;

    ctx = canvas.getContext('2d');
    ctx.drawImage(this.contents, 0, 0);
    cpy = new Costume(canvas, this.name ? copy(this.name) : null);
	cpy.flippedX = this.flippedX;
	cpy.flippedY = this.flippedY;
	cpy.colored = this.colored;
	cpy.originalPixels = this.originalPixels;
    cpy.rotationCenter = this.rotationCenter.copy();
    return cpy;
};

SpriteMorph.prototype.toXML = function (serializer) {
    var stage = this.parentThatIsA(StageMorph),
        ide = stage ? stage.parentThatIsA(IDE_Morph) : null,
        idx = ide ? ide.sprites.asArray().indexOf(this) + 1 : 0;
    return serializer.format(
        '<sprite name="@" idx="@" x="@" y="@" z="@"' +
            ' heading="@" xRotation="@" yRotation="@" zRotation="@"' +
            ' scale="@"' +
            ' rotation="@"' +
            ' draggable="@"' +
            ' flippedX="@"' +
            ' flippedY="@"' +
            '%' +
            ' costume="@" color="@,@,@" pen="@" ~>' +
            '%' + // nesting info
            '<costumes>%</costumes>' +
            '<sounds>%</sounds>' +
            '<variables>%</variables>' +
            '<blocks>%</blocks>' +
            '<scripts>%</scripts>' +
            '</sprite>',
        this.name,
        idx,
        this.xPosition(),
        this.yPosition(),
        this.zPosition(),
        this.heading,
        this._3DRotationX,
        this._3DRotationY,
        this._3DRotationZ,
        this.scale,
        this.rotationStyle,
        this.isDraggable,
        this.flippedX,
        this.flippedY,
        this.isVisible ? '' : ' hidden="true"',
        this.getCostumeIdx(),
        this.color.r,
        this.color.g,
        this.color.b,
        this.penPoint,

        // nesting info
        this.anchor
            ? '<nest anchor="' +
                    this.anchor.name +
                    '" synch="'
                    + this.rotatesWithAnchor
                    + (this.scale === this.nestingScale ? '' :
                            '"'
                            + ' scale="'
                            + this.nestingScale)

                    + '"/>'
            : '',

        serializer.store(this.costumes, this.name + '_cst'),
        serializer.store(this.sounds, this.name + '_snd'),
        serializer.store(this.variables),
        !this.customBlocks ?
                    '' : serializer.store(this.customBlocks),
        serializer.store(this.scripts)
    );
};SnapSerializer.prototype.loadValue = function (model) {
    // private
    var v, items, el, center, image, name, audio, option,
        myself = this;

    function record() {
        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'id'
            )) {
            myself.objects[model.attributes.id] = v;
        }
        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'mediaID'
            )) {
            myself.mediaDict[model.attributes.mediaID] = v;
        }
    }
    switch (model.tag) {
    case 'ref':
        if (Object.prototype.hasOwnProperty.call(model.attributes, 'id')) {
            return this.objects[model.attributes.id];
        }
        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'mediaID'
            )) {
            return this.mediaDict[model.attributes.mediaID];
        }
        throw new Error('expecting a reference id');
    case 'l':
        option = model.childNamed('option');
        return option ? [option.contents] : model.contents;
    case 'bool':
        return model.contents === 'true';
    case 'list':
        if (model.attributes.hasOwnProperty('linked')) {
            items = model.childrenNamed('item');
            if (items.length === 0) {
                v = new List();
                record();
                return v;
            }
            items.forEach(function (item) {
                var value = item.children[0];
                if (v === undefined) {
                    v = new List();
                    record();
                } else {
                    v = v.rest = new List();
                }
                v.isLinked = true;
                if (!value) {
                    v.first = 0;
                } else {
                    v.first = myself.loadValue(value);
                }
            });
            return v;
        }
        v = new List();
        record();
        v.contents = model.childrenNamed('item').map(function (item) {
            var value = item.children[0];
            if (!value) {
                return 0;
            }
            return myself.loadValue(value);
        });
        return v;
    case 'sprite':
        v  = new SpriteMorph(myself.project.globalVariables);
        if (model.attributes.id) {
            myself.objects[model.attributes.id] = v;
        }
        if (model.attributes.name) {
            v.name = model.attributes.name;
            myself.project.sprites[model.attributes.name] = v;
        }
        if (model.attributes.idx) {
            v.idx = +model.attributes.idx;
        }
        if (model.attributes.color) {
            v.color = myself.loadColor(model.attributes.color);
        }
        if (model.attributes.pen) {
            v.penPoint = model.attributes.pen;
        }
        myself.project.stage.add(v);
        v.scale = parseFloat(model.attributes.scale || '1');
        v.rotationStyle = parseFloat(
            model.attributes.rotation || '1'
        );
        v.isDraggable = model.attributes.draggable !== 'false';
        v.isVisible = model.attributes.hidden !== 'true';
        v.heading = parseFloat(model.attributes.heading) || 0;
        if(model.attributes.xRotation && model.attributes.yRotation && model.attributes.zRotation) v.point3D(model.attributes.xRotation || 0, model.attributes.yRotation || 0, model.attributes.zRotation || 0)
        v.drawNew();
        v.gotoXY(+model.attributes.x || 0, +model.attributes.y || 0);
		if(model.attributes.z) v.gotoXYZ(+model.attributes.x || 0, +model.attributes.y || 0, +model.attributes.z || 0);
        if(model.attributes.hasOwnProperty('flippedY')) v.flippedY=(model.attributes.flippedY=="true");
        if(model.attributes.hasOwnProperty('flippedX')) v.flippedX=(model.attributes.flippedX=="true");
        myself.loadObject(v, model);
        
        return v;
    case 'context':
        v = new Context(null);
        record();
        el = model.childNamed('script');
        if (el) {
            v.expression = this.loadScript(el);
        } else {
            el = model.childNamed('block') ||
                model.childNamed('custom-block');
            if (el) {
                v.expression = this.loadBlock(el);
            } else {
                el = model.childNamed('l');
                if (el) {
                    v.expression = new InputSlotMorph(el.contents);
                }
            }
        }
        el = model.childNamed('receiver');
        if (el) {
            el = el.childNamed('ref') || el.childNamed('sprite');
            if (el) {
                v.receiver = this.loadValue(el);
            }
        }
        el = model.childNamed('inputs');
        if (el) {
            el.children.forEach(function (item) {
                if (item.tag === 'input') {
                    v.inputs.push(item.contents);
                }
            });
        }
        el = model.childNamed('variables');
        if (el) {
            this.loadVariables(v.variables, el);
        }
        el = model.childNamed('context');
        if (el) {
            v.outerContext = this.loadValue(el);
        }
        return v;
    case 'costume':
        center = new Point();
        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'center-x'
            )) {
            center.x = parseFloat(model.attributes['center-x']);
        }
        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'center-y'
            )) {
            center.y = parseFloat(model.attributes['center-y']);
        }
        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'name'
            )) {
            name = model.attributes.name;
        }
        if (model.attributes['costume-color']) {
            costumeColor = myself.loadColor(model.attributes['costume-color']);
        }
        else {
            costumeColor = new Color(255,255,255);
        }
        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'image'
            )) {
            image = new Image();
            if (model.attributes.image.indexOf('data:image/svg+xml') === 0
                    && !MorphicPreferences.rasterizeSVGs) {
                v = new SVG_Costume(null, name, center);
                v.costumeColor = costumeColor;
                image.onload = function () {
                    v.contents = image;
                    v.setColor(v.costumeColor);
                    v.version = +new Date();
                    if (typeof v.loaded === 'function') {
                        v.loaded();
                    } else {
                        v.loaded = true;
                    }
                };
            }
			else if (Object.prototype.hasOwnProperty.call(model.attributes,'is3D') && model.attributes.is3D == "true"){
				v = new Costume(
					null, // no canvas for 3D costumes
					name ? name.split('.')[0] : '', // up to period
					null, // rotation center
					model.attributes.image,
					true, // is3D
					false // is3dSwitchable
				);
			}
			else {
                v = new Costume(null, name, center);
                v.costumeColor = costumeColor;
                image.onload = function () {
                    var canvas = newCanvas(
                            new Point(image.width, image.height)
                        ),
                        context = canvas.getContext('2d');
                    context.drawImage(image, 0, 0);
                    v.contents = canvas;
                    v.setColor(v.costumeColor);
                    v.version = +new Date();
                    if (typeof v.loaded === 'function') {
                        v.loaded();
                    } else {
                        v.loaded = true;
                    }
                };
            }
            image.src = model.attributes.image;
        }
        record();
        return v;
    case 'sound':
        audio = new Audio();
        audio.src = model.attributes.sound;
        v = new Sound(audio, model.attributes.name);
        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'mediaID'
            )) {
            myself.mediaDict[model.attributes.mediaID] = v;
        }
        record();
        return v;
    }
    return undefined;
};

SnapSerializer.prototype.loadCostumes = function (object, model) {
    // private
    var costumes = model.childNamed('costumes'),
        costume;
    if (costumes) {
        object.costumes = this.loadValue(costumes.require('list'));
    }
    if (Object.prototype.hasOwnProperty.call(
            model.attributes,
            'costume'
        )) {
        costume = object.costumes.asArray()[model.attributes.costume - 1];
        if (costume) {
            if (costume.loaded) {
                object.wearCostume(costume);
            }
            else if(costume.is3D)
            {
                object.addCostume(costume);
                object.wearCostume(costume);
            }
			else {
                    costume.loaded = function () {
					object.isNotFlipBack = true;
                    object.wearCostume(costume);
                    this.loaded = true;
                	object.isNotFlipBack = !( object.flippedX || object.flippedY );
					object.FirstCostume = true;
                };
            }
        }
    }
};
//# sourceURL=code.js