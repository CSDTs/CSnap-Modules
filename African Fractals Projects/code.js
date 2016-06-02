var top = 0
var mouseXAtDown = 0;
var mouseYAtDown = 0;
SpriteMorph.prototype.setBorderSize = function (size) {
    // pen size
    if (!isNaN(size)) {
        this.borderSize = Math.min(Math.max(+size, 0), 1000);
    }
};
IDE_Morph.prototype.toggleAppMode = function (appMode) {
    var world = this.world(),
        elements = [
            this.logo,
            this.controlBar.cloudButton,
            this.controlBar.settingsButton,
            this.controlBar.goalImagesButton,
            this.controlBar.stageSizeButton,
            this.corral,
            this.corralBar,
            this.spriteEditor,
            this.spriteBar,
            this.palette,
            this.categories
        ];

    this.isAppMode = isNil(appMode) ? !this.isAppMode : appMode;

    Morph.prototype.trackChanges = false;
    if (this.isAppMode) {
        this.setColor(this.appModeColor);
        this.controlBar.setColor(this.color);
        this.controlBar.appModeButton.refresh();
        elements.forEach(function (e) {
            if(e) {
                e.hide();
            }
        });
        world.children.forEach(function (morph) {
            if (morph instanceof DialogBoxMorph) {
                morph.hide();
            }
        });
    } else {
        this.setColor(this.backgroundColor);
        this.controlBar.setColor(this.frameColor);
        elements.forEach(function (e) {
            if(e) {
                e.show();
            }
        });
        this.stage.setScale(1);
        // show all hidden dialogs
        world.children.forEach(function (morph) {
            if (morph instanceof DialogBoxMorph) {
                morph.show();
            }
        });
        // prevent scrollbars from showing when morph appears
        world.allChildren().filter(function (c) {
            return c instanceof ScrollFrameMorph;
        }).forEach(function (s) {
            s.adjustScrollBars();
        });
    }
    this.setExtent(this.world().extent()); // resume trackChanges
};
StageMorph.prototype.isOverPoint = function (ListX, ListY, Radii) {
	for(i=0; i<ListX.contents.length; i++)
	{
		if(Math.abs(ListX.contents[i]-mouseXAtDown)<Radii&&Math.abs(ListY.contents[i]-mouseYAtDown)<Radii)
			return i+1;
	}
	return false;
};
StageMorph.prototype.isPointerInsideStage = function () {
	var stage = this.parentThatIsA(StageMorph),
	width = stage.bounds.corner.x - stage.bounds.origin.x,
	height = stage.bounds.corner.y - stage.bounds.origin.y;
	for(var c in world.children){
		if(world.children[c] instanceof MenuMorph || world.children[c] instanceof ProjectDialogMorph) return false;
	}
	var mouseX = world.hand.position().x - stage.center().x;
	var mouseY = world.hand.position().y - stage.center().y;
	var temp =(Math.abs(mouseX)<width/2 && Math.abs(mouseY)<height/2);
	return temp;
};
HandMorph.prototype.processMouseDown = function (event) {
    var morph, expectedClick, actualClick;

    this.destroyTemporaries();
    this.morphToGrab = null;
    if (this.children.length !== 0) {
        this.drop();
        this.mouseButton = null;
    } else {
        morph = this.morphAtPointer();
		if(morph instanceof StageMorph)
		{
			mouseXAtDown = morph.reportMouseX(), mouseYAtDown = morph.reportMouseY();
			morph["mouseClickLeft"](this.bounds.origin);
		}
        if (this.world.activeMenu) {
            if (!contains(
                    morph.allParents(),
                    this.world.activeMenu
                )) {
                this.world.activeMenu.destroy();
            } else {
                clearInterval(this.touchHoldTimeout);
            }
        }
        if (this.world.activeHandle) {
            if (morph !== this.world.activeHandle) {
                this.world.activeHandle.destroy();
            }
        }
        if (this.world.cursor) {
            if (morph !== this.world.cursor.target) {
                this.world.stopEditing();
            }
        }
        if (!morph.mouseMove) {
            this.morphToGrab = morph.rootForGrab();
        }
        if (event.button === 2 || event.ctrlKey) {
            this.mouseButton = 'right';
            actualClick = 'mouseDownRight';
            expectedClick = 'mouseClickRight';
        } else {
            this.mouseButton = 'left';
            actualClick = 'mouseDownLeft';
            expectedClick = 'mouseClickLeft';
        }
        this.mouseDownMorph = morph;
        while (!this.mouseDownMorph[expectedClick]) {
            this.mouseDownMorph = this.mouseDownMorph.parent;
        }
        while (!morph[actualClick]) {
            morph = morph.parent;
        }
        morph[actualClick](this.bounds.origin);
    }
};
HandMorph.prototype.processMouseUp = function () {
    var morph = this.morphAtPointer(),
        context,
        contextMenu,
        expectedClick;

    this.destroyTemporaries();
    if (this.children.length !== 0) {
        this.drop();
    } else {
        if (this.mouseButton === 'left') {
            expectedClick = 'mouseClickLeft';
        } else {
            expectedClick = 'mouseClickRight';
            if (this.mouseButton) {
                context = morph;
                contextMenu = context.contextMenu();
                while ((!contextMenu) &&
                        context.parent) {
                    context = context.parent;
                    contextMenu = context.contextMenu();
                }
                if (contextMenu) {
                    contextMenu.popUpAtHand(this.world);
                }
            }
        }
        while (!morph[expectedClick]) {
            morph = morph.parent;
        }
		if(!(morph instanceof StageMorph))
		{
			morph[expectedClick](this.bounds.origin);
		}
    }
    this.mouseButton = null;
};
window.parent.addEventListener(
        "keydown",
        function (event) {
            // remember the keyCode in the world's currentKey property
            world.currentKey = event.keyCode;
            if (world.keyboardReceiver) {
                world.keyboardReceiver.processKeyDown(event);
            }
            // supress backspace override
            if (event.keyIdentifier === 'U+0008' ||
                    event.keyIdentifier === 'Backspace') {
                event.preventDefault();
            }
            // supress tab override and make sure tab gets
            // received by all browsers
            if (event.keyIdentifier === 'U+0009' ||
                    event.keyIdentifier === 'Tab') {
                if (world.keyboardReceiver) {
                    world.keyboardReceiver.processKeyPress(event);
                }
                event.preventDefault();
            }
        },
        false
    );
function setScrollPos(){
	var doc = window.parent.document.documentElement;
	top = (window.parent.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
}
function Unscroll(){
	$(window.parent).scrollTop(top);
}
window.parent.onload = setScrollPos;
window.parent.onscroll = setScrollPos;
window.onmousedown = Unscroll;
SyntaxElementMorph.prototype.labelPart = function (spec) {
    var part, tokens;
    if (spec[0] === '%' &&
            spec.length > 1 &&
            this.selector !== 'reportGetVar') {
        // check for variable multi-arg-slot:
        if ((spec.length > 5) && (spec.slice(0, 5) === '%mult')) {
            part = new MultiArgMorph(spec.slice(5));
            part.addInput();
            return part;
        }

        // single-arg and specialized multi-arg slots:
        switch (spec) {
        case '%inputs':
            part = new MultiArgMorph('%s', 'with inputs');
            part.isStatic = false;
            part.canBeEmpty = false;
            break;
        case '%scriptVars':
            part = new MultiArgMorph('%t', null, 1, spec);
            part.canBeEmpty = false;
            break;
        case '%parms':
            part = new MultiArgMorph('%t', 'Input Names:', 0, spec);
            part.canBeEmpty = false;
            break;
        case '%ringparms':
            part = new MultiArgMorph(
                '%t',
                'input names:',
                0,
                spec
            );
            break;
        case '%cmdRing':
            part = new RingMorph();
            part.color = SpriteMorph.prototype.blockColor.other;
            part.selector = 'reifyScript';
            part.setSpec('%rc %ringparms');
            part.isDraggable = true;
            break;
        case '%repRing':
            part = new RingMorph();
            part.color = SpriteMorph.prototype.blockColor.other;
            part.selector = 'reifyReporter';
            part.setSpec('%rr %ringparms');
            part.isDraggable = true;
            part.isStatic = true;
            break;
        case '%predRing':
            part = new RingMorph(true);
            part.color = SpriteMorph.prototype.blockColor.other;
            part.selector = 'reifyPredicate';
            part.setSpec('%rp %ringparms');
            part.isDraggable = true;
            part.isStatic = true;
            break;
        case '%words':
            part = new MultiArgMorph('%s', null, 0);
            part.addInput(); // allow for default value setting
            part.addInput(); // allow for default value setting
            part.isStatic = false;
            break;
        case '%exp':
            part = new MultiArgMorph('%s', null, 0);
            part.addInput();
            part.isStatic = true;
            part.canBeEmpty = false;
            break;
        case '%br':
            part = new Morph();
            part.setExtent(new Point(0, 0));
            part.isBlockLabelBreak = true;
            part.getSpec = function () {
                return '%br';
            };
            break;
        case '%inputName':
            part = new ReporterBlockMorph();
            part.category = 'variables';
            part.color = SpriteMorph.prototype.blockColor.variables;
            part.setSpec(localize('Input name'));
            break;
        case '%s':
            part = new InputSlotMorph();
            break;
        case '%anyUE':
            part = new InputSlotMorph();
            part.isUnevaluated = true;
            break;
        case '%txt':
            part = new InputSlotMorph();
            part.minWidth = part.height() * 1.7; // "landscape"
            part.fixLayout();
            break;
        case '%mlt':
            part = new TextSlotMorph();
            part.fixLayout();
            break;
        case '%code':
            part = new TextSlotMorph();
            part.contents().fontName = 'monospace';
            part.contents().fontStyle = 'monospace';
            part.fixLayout();
            break;
        case '%obj':
            part = new ArgMorph('object');
            break;
        case '%n':
            part = new InputSlotMorph(null, true);
            break;
        case '%dir':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '(90) right' : 90,
                    '(-90) left' : -90,
                    '(0) up' : '0',
                    '(180) down' : 180
                }
            );
            part.setContents(90);
            break;
        case '%inst':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '(1) Acoustic Grand' : 1,
                    '(2) Bright Acoustic' : 2,
                    '(3) Electric Grand' : 3,
                    '(4) Honky Tonk' : 4,
                    '(5) Electric Piano 1' : 5,
                    '(6) Electric Piano 2' : 6,
                    '(7) Harpsichord' : 7
                }
            );
            part.setContents(1);
            break;
        case '%month':
            part = new InputSlotMorph(
                null, // text
                false, // numeric?
                {
                    'January' : ['January'],
                    'February' : ['February'],
                    'March' : ['March'],
                    'April' : ['April'],
                    'May' : ['May'],
                    'June' : ['June'],
                    'July' : ['July'],
                    'August' : ['August'],
                    'September' : ['September'],
                    'October' : ['October'],
                    'November' : ['November'],
                    'December' : ['December']
                },
                true // read-only
            );
            break;
        case '%dates':
            part = new InputSlotMorph(
                null, // text
                false, // non-numeric
                {
                    'year' : ['year'],
                    'month' : ['month'],
                    'date' : ['date'],
                    'day of week' : ['day of week'],
                    'hour' : ['hour'],
                    'minute' : ['minute'],
                    'second' : ['second'],
                    'time in milliseconds' : ['time in milliseconds']
                },
                true // read-only
            );
            part.setContents(['date']);
            break;
        case '%delim':
            part = new InputSlotMorph(
                null, // text
                false, // numeric?
                {
                    'whitespace' : ['whitespace'],
                    'line' : ['line'],
                    'tab' : ['tab'],
                    'cr' : ['cr']
                },
                false // read-only
            );
            break;
        case '%ida':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '1' : 1,
                    last : ['last'],
                    '~' : null,
                    all : ['all']
                }
            );
            part.setContents(1);
            break;
        case '%idx':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '1' : 1,
                    last : ['last'],
                    any : ['any']
                }
            );
            part.setContents(1);
            break;
        case '%spr':
            part = new InputSlotMorph(
                null,
                false,
                'objectsMenu',
                true
            );
            break;
        case '%col': // collision detection
            part = new InputSlotMorph(
                null,
                false,
                'collidablesMenu',
                true
            );
            break;
        case '%dst': // distance measuring
            part = new InputSlotMorph(
                null,
                false,
                'distancesMenu',
                true
            );
            break;
        case '%cln': // clones
            part = new InputSlotMorph(
                null,
                false,
                'clonablesMenu',
                true
            );
            break;
        case '%cst':
            part = new InputSlotMorph(
                null,
                false,
                'costumesMenu',
                true
            );
            break;
        case '%eff':
            part = new InputSlotMorph(
                null,
                false,
                {
                /*
                    color : 'color',
                    fisheye : 'fisheye',
                    whirl : 'whirl',
                    pixelate : 'pixelate',
                    mosaic : 'mosaic',
                    brightness : 'brightness',
                */
                    ghost : ['ghost']
                },
                true
            );
            part.setContents(['ghost']);
            break;
        case '%drc':
            part = new InputSlotMorph(
              'width',
              false,
              {
                  width: ['width'],
                  height: ['height']
              },
              true
            );
            part.setContents(['width']);
            break;
        case '%snd':
            part = new InputSlotMorph(
                null,
                false,
                'soundsMenu',
                true
            );
            break;
        case '%key':
            part = new InputSlotMorph(
                null,
                false,
                {
                    'up arrow': ['up arrow'],
                    'down arrow': ['down arrow'],
                    'right arrow': ['right arrow'],
                    'left arrow': ['left arrow'],
                    space : ['space'],
                    '½': ['½'],
                    '»': ['»'],
                    a : ['a'],
                    b : ['b'],
                    c : ['c'],
                    d : ['d'],
                    e : ['e'],
                    f : ['f'],
                    g : ['g'],
                    h : ['h'],
                    i : ['i'],
                    j : ['j'],
                    k : ['k'],
                    l : ['l'],
                    m : ['m'],
                    n : ['n'],
                    o : ['o'],
                    p : ['p'],
                    q : ['q'],
                    r : ['r'],
                    s : ['s'],
                    t : ['t'],
                    u : ['u'],
                    v : ['v'],
                    w : ['w'],
                    x : ['x'],
                    y : ['y'],
                    z : ['z'],
                    '0' : ['0'],
                    '1' : ['1'],
                    '2' : ['2'],
                    '3' : ['3'],
                    '4' : ['4'],
                    '5' : ['5'],
                    '6' : ['6'],
                    '7' : ['7'],
                    '8' : ['8'],
                    '9' : ['9']
                },
                true
            );
            part.setContents(['space']);
            break;
        case '%keyHat':
            part = this.labelPart('%key');
            part.isStatic = true;
            break;
        case '%msg':
            part = new InputSlotMorph(
                null,
                false,
                'messagesMenu',
                true
            );
            break;
        case '%msgHat':
            part = new InputSlotMorph(
                null,
                false,
                'messagesReceivedMenu',
                true
            );
            part.isStatic = true;
            break;
        case '%att':
            part = new InputSlotMorph(
                null,
                false,
                'attributesMenu',
                true
            );
            break;
        case '%fun':
            part = new InputSlotMorph(
                null,
                false,
                {
                    abs : ['abs'],
                    floor : ['floor'],
                    sqrt : ['sqrt'],
                    sin : ['sin'],
                    cos : ['cos'],
                    tan : ['tan'],
                    asin : ['asin'],
                    acos : ['acos'],
                    atan : ['atan'],
                    ln : ['ln'],
                    // log : 'log',
                    'e^' : ['e^']
                    // '10^' : '10^'
                },
                true
            );
            part.setContents(['sqrt']);
            break;
        case '%txtfun':
            part = new InputSlotMorph(
                null,
                false,
                {
                    'encode URI' : ['encode URI'],
                    'decode URI' : ['decode URI'],
                    'encode URI component' : ['encode URI component'],
                    'decode URI component' : ['decode URI component'],
                    'XML escape' : ['XML escape'],
                    'XML unescape' : ['XML unescape'],
                    'hex sha512 hash' : ['hex sha512 hash']
                },
                true
            );
            part.setContents(['encode URI']);
            break;
        case '%stopChoices':
            part = new InputSlotMorph(
                null,
                false,
                {
                    'all' : ['all'],
                    'this script' : ['this script'],
                    'this block' : ['this block']
                },
                true
            );
            part.setContents(['all']);
            part.isStatic = true;
            break;
        case '%stopOthersChoices':
            part = new InputSlotMorph(
                null,
                false,
                {
                    'all but this script' : ['all but this script'],
                    'other scripts in sprite' : ['other scripts in sprite']
                },
                true
            );
            part.setContents(['all but this script']);
            part.isStatic = true;
            break;
        case '%typ':
            part = new InputSlotMorph(
                null,
                false,
                {
                    number : ['number'],
                    text : ['text'],
                    Boolean : ['Boolean'],
                    list : ['list'],
                    command : ['command'],
                    reporter : ['reporter'],
                    predicate : ['predicate']
                    // ring : 'ring'
                    // object : 'object'
                },
                true
            );
            part.setContents(['number']);
            break;
        case '%var':
            part = new InputSlotMorph(
                null,
                false,
                'getVarNamesDict',
                true
            );
            part.isStatic = true;
            break;
        case '%lst':
            part = new InputSlotMorph(
                null,
                false,
                {
                    list1 : 'list1',
                    list2 : 'list2',
                    list3 : 'list3'
                },
                true
            );
            break;
        case '%codeKind':
            part = new InputSlotMorph(
                null,
                false,
                {
                    code : ['code'],
                    header : ['header']
                },
                true
            );
            part.setContents(['code']);
            break;
        case '%l':
            part = new ArgMorph('list');
            break;
        case '%b':
        case '%boolUE':
            part = new BooleanSlotMorph(null, true);
            break;
        case '%cmd':
            part = new CommandSlotMorph();
            break;
        case '%rc':
            part = new RingCommandSlotMorph();
            part.isStatic = true;
            break;
        case '%rr':
            part = new RingReporterSlotMorph();
            part.isStatic = true;
            break;
        case '%rp':
            part = new RingReporterSlotMorph(true);
            part.isStatic = true;
            break;
        case '%c':
            part = new CSlotMorph();
            part.isStatic = true;
            break;
        case '%cs':
            part = new CSlotMorph(); // non-static
            break;
        case '%clr':
            part = new ColorSlotMorph();
            part.isStatic = true;
            break;
        case '%t':
            part = new TemplateSlotMorph('a');
            break;
        case '%upvar':
            part = new TemplateSlotMorph('\u2191'); // up-arrow
            break;
        case '%f':
            part = new FunctionSlotMorph();
            break;
        case '%r':
            part = new ReporterSlotMorph();
            break;
        case '%p':
            part = new ReporterSlotMorph(true);
            break;

    // code mapping (experimental)

        case '%codeListPart':
            part = new InputSlotMorph(
                null, // text
                false, // numeric?
                {
                    'list' : ['list'],
                    'item' : ['item'],
                    'delimiter' : ['delimiter']
                },
                true // read-only
            );
            break;
        case '%codeListKind':
            part = new InputSlotMorph(
                null, // text
                false, // numeric?
                {
                    'collection' : ['collection'],
                    'variables' : ['variables'],
                    'parameters' : ['parameters']
                },
                true // read-only
            );
            break;

    // symbols:

        case '%turtle':
            part = new SymbolMorph('turtle');
            part.size = this.fontSize * 1.2;
            part.color = new Color(255, 255, 255);
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = MorphicPreferences.isFlat ?
                    new Point() : this.embossing;
            part.drawNew();
            break;
        case '%turtleOutline':
            part = new SymbolMorph('turtleOutline');
            part.size = this.fontSize;
            part.color = new Color(255, 255, 255);
            part.isProtectedLabel = true; // doesn't participate in zebraing
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = MorphicPreferences.isFlat ?
                    new Point() : this.embossing;
            part.drawNew();
            break;
        case '%clockwise':
            part = new SymbolMorph('turnRight');
            part.size = this.fontSize * 1.5;
            part.color = new Color(255, 255, 255);
            part.isProtectedLabel = false; // zebra colors
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = MorphicPreferences.isFlat ?
                    new Point() : this.embossing;
            part.drawNew();
            break;
        case '%counterclockwise':
            part = new SymbolMorph('turnLeft');
            part.size = this.fontSize * 1.5;
            part.color = new Color(255, 255, 255);
            part.isProtectedLabel = false; // zebra colors
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = MorphicPreferences.isFlat ?
                    new Point() : this.embossing;
            part.drawNew();
            break;
        case '%greenflag':
            part = new SymbolMorph('flag');
            part.size = this.fontSize * 1.5;
            part.color = new Color(0, 200, 0);
            part.isProtectedLabel = true; // doesn't participate in zebraing
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = MorphicPreferences.isFlat ?
                    new Point() : this.embossing;
            part.drawNew();
            break;
        case '%stop':
            part = new SymbolMorph('octagon');
            part.size = this.fontSize * 1.5;
            part.color = new Color(200, 0, 0);
            part.isProtectedLabel = true; // doesn't participate in zebraing
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = MorphicPreferences.isFlat ?
                    new Point() : this.embossing;
            part.drawNew();
            break;
        case '%pause':
            part = new SymbolMorph('pause');
            part.size = this.fontSize;
            part.color = new Color(160, 80, 0);
            part.isProtectedLabel = true; // doesn't participate in zebraing
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = MorphicPreferences.isFlat ?
                    new Point() : this.embossing;
            part.drawNew();
            break;
        default:
            nop();
        }
    } else if (spec[0] === '$' &&
            spec.length > 1 &&
            this.selector !== 'reportGetVar') {
/*
        // allow costumes as label symbols
        // has issues when loading costumes (asynchronously)
        // commented out for now

        var rcvr = this.definition.receiver || this.receiver(),
            id = spec.slice(1),
            cst;
        if (!rcvr) {return this.labelPart('%stop'); }
        cst = detect(
            rcvr.costumes.asArray(),
            function (each) {return each.name === id; }
        );
        part = new SymbolMorph(cst);
        part.size = this.fontSize * 1.5;
        part.color = new Color(255, 255, 255);
        part.isProtectedLabel = true; // doesn't participate in zebraing
        part.drawNew();
*/

        // allow GUI symbols as label icons
        // usage: $symbolName[-size-r-g-b], size and color values are optional
        tokens = spec.slice(1).split('-');
        if (!contains(SymbolMorph.prototype.names, tokens[0])) {
            part = new StringMorph(spec);
            part.fontName = this.labelFontName;
            part.fontStyle = this.labelFontStyle;
            part.fontSize = this.fontSize;
            part.color = new Color(255, 255, 255);
            part.isBold = true;
            part.shadowColor = this.color.darker(this.labelContrast);
            part.shadowOffset = MorphicPreferences.isFlat ?
                    new Point() : this.embossing;
            part.drawNew();
            return part;
        }
        part = new SymbolMorph(tokens[0]);
        part.size = this.fontSize * (+tokens[1] || 1.2);
        part.color = new Color(
            +tokens[2] === 0 ? 0 : +tokens[2] || 255,
            +tokens[3] === 0 ? 0 : +tokens[3] || 255,
            +tokens[4] === 0 ? 0 : +tokens[4] || 255
        );
        part.isProtectedLabel = tokens.length > 2; // zebra colors
        part.shadowColor = this.color.darker(this.labelContrast);
        part.shadowOffset = MorphicPreferences.isFlat ?
                new Point() : this.embossing;
        part.drawNew();
    } else {
        part = new StringMorph(spec);
        part.fontName = this.labelFontName;
        part.fontStyle = this.labelFontStyle;
        part.fontSize = this.fontSize;
        part.color = new Color(255, 255, 255);
        part.isBold = true;
        part.shadowColor = this.color.darker(this.labelContrast);
        part.shadowOffset = MorphicPreferences.isFlat ?
                new Point() : this.embossing;
        part.drawNew();
    }
    return part;
};


//# sourceURL=code.js