SpriteMorph.flippedY = false;
SpriteMorph.flippedX = false;
Costume.colored = false;
var originalContent, ID;
var FirstCostume = true;

var startTime =0;
window.audioContext = null, window.gainNode = null, window.analyser = null, window.frequencyDataArray = null;
try {
window.AudioContext = window.AudioContext || window.webkitAudioContext;
window.audioContext = new AudioContext();
window.gainNode = window.audioContext.createGain();
window.analyser = audioContext.createAnalyser();
startTime = audioContext.currentTime + 0.500;
window.analyser.connect(window.audioContext.destination);
analyser.fftSize = 2048;
window.gainNode.connect(window.analyser);
window.gainNode.gain.value = 1;
var bufferLength = analyser.frequencyBinCount;
window.frequencyDataArray = new Uint8Array(bufferLength);
}
catch(e) {
alert('Web Audio API is not supported in this browser');
}

SpriteMorph.prototype.initBlocks = function () {
    SpriteMorph.prototype.blocks = {

        // Motion
        forward: {
            type: 'command',
            category: 'motion',
            spec: 'move %n steps',
            defaults: [10]
        },
        turn: {
            type: 'command',
            category: 'motion',
            spec: 'turn %clockwise %n degrees',
            defaults: [15]
        },
        turnLeft: {
            type: 'command',
            category: 'motion',
            spec: 'turn %counterclockwise %n degrees',
            defaults: [15]
        },
        turn3D: {
            type: 'command',
            category: 'motion',
            spec: 'turn x: %n y: %n z: %n degrees',
            defaults: [0, 0, 0]
        },
        setHeading: {
            type: 'command',
            category: 'motion',
            spec: 'point in direction %dir'
        },
        doFaceTowards: {
            type: 'command',
            category: 'motion',
            spec: 'point towards %dst'
        },
        point3D: {
            type: 'command',
            category: 'motion',
            spec: 'point x: %n y: %n z: %n degrees',
            defaults: [0, 0, 0]
        },
        gotoXY: {
            type: 'command',
            category: 'motion',
            spec: 'go to x: %n y: %n',
            defaults: [0, 0]
        },
        gotoXYZ: {
            type: 'command',
            category: 'motion',
            spec: 'go to x: %n y: %n z: %n',
            defaults: [0, 0, 0]
        },
        doGotoObject: {
            type: 'command',
            category: 'motion',
            spec: 'go to %dst'
        },
        doGlide: {
            type: 'command',
            category: 'motion',
            spec: 'glide %n secs to x: %n y: %n',
            defaults: [1, 0, 0]
        },
        changeXPosition: {
            type: 'command',
            category: 'motion',
            spec: 'change x by %n',
            defaults: [10]
        },
        setXPosition: {
            type: 'command',
            category: 'motion',
            spec: 'set x to %n',
            defaults: [0]
        },
        changeYPosition: {
            type: 'command',
            category: 'motion',
            spec: 'change y by %n',
            defaults: [10]
        },
        setYPosition: {
            type: 'command',
            category: 'motion',
            spec: 'set y to %n',
            defaults: [0]
        },
        changeZPosition: {
            type: 'command',
            category: 'motion',
            spec: 'change z by %n',
            defaults: [10]
        },
        setZPosition: {
            type: 'command',
            category: 'motion',
            spec: 'set z to %n',
            defaults: [0]
        },
        bounceOffEdge: {
            type: 'command',
            category: 'motion',
            spec: 'if on edge, bounce'
        },
        xPosition: {
            type: 'reporter',
            category: 'motion',
            spec: 'x position'
        },
        yPosition: {
            type: 'reporter',
            category: 'motion',
            spec: 'y position'
        },
        zPosition: {
            type: 'reporter',
            category: 'motion',
            spec: 'z position'
        },
        direction: {
            type: 'reporter',
            category: 'motion',
            spec: 'direction'
        },

        // Looks
        doSwitchToCostume: {
            type: 'command',
            category: 'looks',
            spec: 'switch to costume %cst'
        },
        doWearNextCostume: {
            type: 'command',
            category: 'looks',
            spec: 'next costume'
        },
        getCostumeIdx: {
            type: 'reporter',
            category: 'looks',
            spec: 'costume #'
        },
        doSayFor: {
            type: 'command',
            category: 'looks',
            spec: 'say %s for %n secs',
            defaults: [localize('Hello!'), 2]
        },
        bubble: {
            type: 'command',
            category: 'looks',
            spec: 'say %s',
            defaults: [localize('Hello!')]
        },
        doThinkFor: {
            type: 'command',
            category: 'looks',
            spec: 'think %s for %n secs',
            defaults: [localize('Hmm...'), 2]
        },
        doThink: {
            type: 'command',
            category: 'looks',
            spec: 'think %s',
            defaults: [localize('Hmm...')]
        },
        changeEffect: {
            type: 'command',
            category: 'looks',
            spec: 'change %eff effect by %n',
            defaults: [null, 25]
        },
        setEffect: {
            type: 'command',
            category: 'looks',
            spec: 'set %eff effect to %n',
            defaults: [null, 0]
        },
        clearEffects: {
            type: 'command',
            category: 'looks',
            spec: 'clear graphic effects'
        },
        changeScale: {
            type: 'command',
            category: 'looks',
            spec: 'change size by %n',
            defaults: [10]
        },
        setScale: {
            type: 'command',
            category: 'looks',
            spec: 'set size to %n %',
            defaults: [100]
        },
        setScale3D: {
            type: 'command',
            category: 'looks',
            spec: 'scale to x: %n y: %n z: %n',
            defaults: [1.0, 1.0, 1.0]
        },
        getScale: {
            type: 'reporter',
            category: 'looks',
            spec: 'size'
        },
        show: {
            type: 'command',
            category: 'looks',
            spec: 'show'
        },
        hide: {
            type: 'command',
            category: 'looks',
            spec: 'hide'
        },
        show3D: {
            type: 'command',
            category: 'looks',
            spec: 'show'
        },
        hide3D: {
            type: 'command',
            category: 'looks',
            spec: 'hide'
        },
        comeToFront: {
            type: 'command',
            category: 'looks',
            spec: 'go to front'
        },
        goBack: {
            type: 'command',
            category: 'looks',
            spec: 'go back %n layers',
            defaults: [1]
        },
        // camera control for the stage
        setCameraPosition: {
            type: 'command',
            category: 'looks',
            spec: 'set camera to x: %n y: %n z: %n',
            defaults: [0, 50, 500]
        },
        changeCameraXPosition: {
            type: 'command',
            category: 'looks',
            spec: 'change camera x by %n',
            defaults: [10]
        },
        changeCameraYPosition: {
            type: 'command',
            category: 'looks',
            spec: 'change camera y by %n',
            defaults: [10]
        },
        changeCameraZPosition: {
            type: 'command',
            category: 'looks',
            spec: 'change camera z by %n',
            defaults: [10]
        },
        turnCameraAroundXAxis: {
            type: 'command',
            category: 'looks',
            spec: 'turn camera %n deg around X-Axis',
            defaults: [10]
        },
        turnCameraAroundYAxis: {
            type: 'command',
            category: 'looks',
            spec: 'turn camera %n deg around Y-Axis',
            defaults: [10]
        },

        // Looks - Debugging primitives for development mode
        reportCostumes: {
            type: 'reporter',
            category: 'looks',
            spec: 'wardrobe'
        },

        alert: {
            type: 'command',
            category: 'looks',
            spec: 'alert %mult%s'
        },
        log: {
            type: 'command',
            category: 'looks',
            spec: 'console log %mult%s'
        },

        // Sound
        createWheel: {
            type: 'command',
            category: 'sound',
            spec: 'create wheel %var %c',
            default: [3]
        },
        playSound: {
            type: 'command',
            category: 'sound',
            spec: 'play sound %snd'
        },
        doPlaySoundUntilDone: {
            type: 'command',
            category: 'sound',
            spec: 'play sound %snd until done'
        },
        doStopAllSounds: {
            type: 'command',
            category: 'sound',
            spec: 'stop all sounds'
        },
        doSetVolume: {
            type: 'command',
            category: 'sound',
            spec: 'set volume to %n %',
            defaults: [100]
        },
        doChangeVolume: {
            type: 'command',
            category: 'sound',
            spec: 'change volume by %n',
            defaults: [-10]
        },
        reportVolume: {
            type: 'reporter',
            category: 'sound',
            spec: 'volume'
        },
        doRest: {
            type: 'command',
            category: 'sound',
            spec: 'rest for %n beats',
            defaults: [0.2]
        },
        doPlayNote: {
            type: 'command',
            category: 'sound',
            spec: 'play note %n at time %n for %n beats',
            defaults: [60, 0.5]
        },
        doChangeTempo: {
            type: 'command',
            category: 'sound',
            spec: 'change tempo by %n',
            defaults: [20]
        },
        doSetTempo: {
            type: 'command',
            category: 'sound',
            spec: 'set tempo to %n bpm',
            defaults: [60]
        },
        getTempo: {
            type: 'reporter',
            category: 'sound',
            spec: 'tempo'
        },

        // Sound - Debugging primitives for development mode
        reportSounds: {
            type: 'reporter',
            category: 'sound',
            spec: 'jukebox'
        },

        // Pen
        clear: {
            type: 'command',
            category: 'pen',
            spec: 'clear'
        },
        down: {
            type: 'command',
            category: 'pen',
            spec: 'pen down'
        },
        up: {
            type: 'command',
            category: 'pen',
            spec: 'pen up'
        },
        show3dPen: {
            type: 'command',
            category: 'pen',
            spec: 'show pen'
        },
        hide3dPen: {
            type: 'command',
            category: 'pen',
            spec: 'hide pen'
        },
        setColor: {
            type: 'command',
            category: 'pen',
            spec: 'set pen color to %clr'
        },
        changeHue: {
            type: 'command',
            category: 'pen',
            spec: 'change pen color by %n',
            defaults: [10]
        },
        setHue: {
            type: 'command',
            category: 'pen',
            spec: 'set pen color to %n',
            defaults: [0]
        },
		penColor: {
            type: 'reporter',
            category: 'pen',
            spec: 'pen color'
        },
        setBorderHue: {
            type: 'command',
            category: 'pen',
            spec: 'set border color to %n',
            defaults: [0]
        },
		//add Border Shade functionality - Get, Set, and Change
		getBorderShade: {
			type: "reporter",
			category: "pen",
			spec: "border shade"
		},
		setBorderShade: {
			type: "command",
			category: "pen",
			spec: "set border shade to %n",
			defaults: [100]
		},
		changeBorderShade: {
			type: "command",
			category: "pen",
			spec: "change border shade by %n",
			defaults: [100]
		},
        penBorderColor: {
            type: 'reporter',
            category: 'pen',
            spec: 'border color'
        },
        changeBrightness: {
            type: 'command',
            category: 'pen',
            spec: 'change pen shade by %n',
            defaults: [10]
        },
        setBrightness: {
            type: 'command',
            category: 'pen',
            spec: 'set pen shade to %n',
            defaults: [100]
        },
        changeSize: {
            type: 'command',
            category: 'pen',
            spec: 'change pen size by %n',
            defaults: [1]
        },
        setSize: {
            type: 'command',
            category: 'pen',
            spec: 'set pen size to %n',
            defaults: [1]
        },
        penSize: {
            type: 'reporter',
            category: 'pen',
            spec: 'pen size',
        },        
        setBorderSize: {
            type: 'command',
            category: 'pen',
            spec: 'set border size to %n',
            defaults: [0]
        },
        penBorderSize: {
            type: 'reporter',
            category: 'pen',
            spec: 'border size',
        },
        doStamp: {
            type: 'command',
            category: 'pen',
            spec: 'stamp'
        },
        smoothBorders: {
            type: 'command',
            category: 'pen',
            spec: 'fix borders'
        },
        // 3D shapes
        renderSphere: {
            type: 'command',
            category: 'pen',
            spec: 'sphere radius: %n',
            defaults: [50]
        },
        renderBox: {
            type: 'command',
            category: 'pen',
            spec: 'box width: %n height: %n depth: %n',
            defaults: [50, 50, 50]
        },
        renderArc: {
            type: 'command',
            category: 'pen',
            spec: 'arc width: %n height: %n',
            defaults: [100, 100]
        },
        renderCylinder: {
            type: 'command',
            category: 'pen',
            spec: 'cylinder top: %n bottom: %n height: %n',
            defaults: [50, 50, 100]
        },
        renderTorusKnot: {
            type: 'command',
            category: 'pen',
            spec: 'knot radius: %n tube: %n p: %n q: %n scale: %n',
            defaults: [5, 5, 2, 3, 5]
        },
        renderText: {
            type: 'command',
            category: 'pen',
            spec: 'text %s size: %n height: %n',
            defaults: [localize('Hello!'), 30, 3]
        },
        // Control
        receiveGo: {
            type: 'hat',
            category: 'control',
            spec: 'when %greenflag clicked'
        },
        receiveKey: {
            type: 'hat',
            category: 'control',
            spec: 'when %keyHat key pressed'
        },
        receiveClick: {
            type: 'hat',
            category: 'control',
            spec: 'when I am clicked'
        },
        receiveMessage: {
            type: 'hat',
            category: 'control',
            spec: 'when I receive %msgHat'
        },
        doBroadcast: {
            type: 'command',
            category: 'control',
            spec: 'broadcast %msg'
        },
        doBroadcastAndWait: {
            type: 'command',
            category: 'control',
            spec: 'broadcast %msg and wait'
        },
        getLastMessage: {
            type: 'reporter',
            category: 'control',
            spec: 'message'
        },
        doWait: {
            type: 'command',
            category: 'control',
            spec: 'wait %n secs',
            defaults: [1]
        },
        doWaitUntil: {
            type: 'command',
            category: 'control',
            spec: 'wait until %b'
        },
        doForever: {
            type: 'command',
            category: 'control',
            spec: 'forever %c'
        },
        doRepeat: {
            type: 'command',
            category: 'control',
            spec: 'repeat %n %c',
            defaults: [10]
        },
        doUntil: {
            type: 'command',
            category: 'control',
            spec: 'repeat until %b %c'
        },
        doIf: {
            type: 'command',
            category: 'control',
            spec: 'if %b %c'
        },
        doIfElse: {
            type: 'command',
            category: 'control',
            spec: 'if %b %c else %c'
        },

    /* migrated to a newer block version:

        doStop: {
            type: 'command',
            category: 'control',
            spec: 'stop script'
        },
        doStopAll: {
            type: 'command',
            category: 'control',
            spec: 'stop all %stop'
        },
    */

        doStopThis: {
            type: 'command',
            category: 'control',
            spec: 'stop %stopChoices'
        },
        doStopOthers: {
            type: 'command',
            category: 'control',
            spec: 'stop %stopOthersChoices'
        },
        doRun: {
            type: 'command',
            category: 'control',
            spec: 'run %cmdRing %inputs'
        },
        fork: {
            type: 'command',
            category: 'control',
            spec: 'launch %cmdRing %inputs'
        },
        evaluate: {
            type: 'reporter',
            category: 'control',
            spec: 'call %repRing %inputs'
        },
    /*
        doRunWithInputList: {
            type: 'command',
            category: 'control',
            spec: 'run %cmd with input list %l'
        },

        forkWithInputList: {
            type: 'command',
            category: 'control',
            spec: 'launch %cmd with input list %l'
        },

        evaluateWithInputList: {
            type: 'reporter',
            category: 'control',
            spec: 'call %r with input list %l'
        },
    */
        doReport: {
            type: 'command',
            category: 'control',
            spec: 'report %s'
        },
    /*
        doStopBlock: { // migrated to a newer block version
            type: 'command',
            category: 'control',
            spec: 'stop block'
        },
    */
        doCallCC: {
            type: 'command',
            category: 'control',
            spec: 'run %cmdRing w/continuation'
        },
        reportCallCC: {
            type: 'reporter',
            category: 'control',
            spec: 'call %cmdRing w/continuation'
        },
        doWarp: {
            type: 'command',
            category: 'other',
            spec: 'warp %c'
        },

        // Cloning - very experimental
        receiveOnClone: {
            type: 'hat',
            category: 'control',
            spec: 'when I start as a clone'
        },
        createClone: {
            type: 'command',
            category: 'control',
            spec: 'create a clone of %cln'
        },
        removeClone: {
            type: 'command',
            category: 'control',
            spec: 'delete this clone'
        },

        // Debugging - pausing

        doPauseAll: {
            type: 'command',
            category: 'control',
            spec: 'pause all %pause'
        },
      
        // Open website
      
        openWebsite: {
          type: 'command',
          category: 'control',
          spec: 'open website: %s',
          defaults: ['http://']
        
        },

        // Sensing

        reportTouchingObject: {
            type: 'predicate',
            category: 'sensing',
            spec: 'touching %col ?'
        },
        reportTouchingColor: {
            type: 'predicate',
            category: 'sensing',
            spec: 'touching %clr ?'
        },
        reportColorIsTouchingColor: {
            type: 'predicate',
            category: 'sensing',
            spec: 'color %clr is touching %clr ?'
        },
        colorFiltered: {
            type: 'reporter',
            category: 'sensing',
            spec: 'filtered for %clr'
        },
        reportStackSize: {
            type: 'reporter',
            category: 'sensing',
            spec: 'stack size'
        },
        reportFrameCount: {
            type: 'reporter',
            category: 'sensing',
            spec: 'frames'
        },
        doAsk: {
            type: 'command',
            category: 'sensing',
            spec: 'ask %s and wait',
            defaults: [localize('what\'s your name?')]
        },
        reportLastAnswer: { // retained for legacy compatibility
            type: 'reporter',
            category: 'sensing',
            spec: 'answer'
        },
        getLastAnswer: {
            type: 'reporter',
            category: 'sensing',
            spec: 'answer'
        },
        reportMouseX: {
            type: 'reporter',
            category: 'sensing',
            spec: 'mouse x'
        },
        reportMouseY: {
            type: 'reporter',
            category: 'sensing',
            spec: 'mouse y'
        },
        reportMouseDown: {
            type: 'predicate',
            category: 'sensing',
            spec: 'mouse down?'
        },
        reportKeyPressed: {
            type: 'predicate',
            category: 'sensing',
            spec: 'key %key pressed?'
        },
        reportDistanceTo: {
            type: 'reporter',
            category: 'sensing',
            spec: 'distance to %dst'
        },
        doResetTimer: {
            type: 'command',
            category: 'sensing',
            spec: 'reset timer'
        },
        reportTimer: { // retained for legacy compatibility
            type: 'reporter',
            category: 'sensing',
            spec: 'timer'
        },
        getTimer: {
            type: 'reporter',
            category: 'sensing',
            spec: 'timer'
        },
        reportAttributeOf: {
            type: 'reporter',
            category: 'sensing',
            spec: '%att of %spr',
            defaults: [['costume #']]
        },
        reportURL: {
            type: 'reporter',
            category: 'sensing',
            spec: 'http:// %s',
            defaults: ['community.csdt.rpi.edu']
        },
        reportIsFastTracking: {
            type: 'predicate',
            category: 'sensing',
            spec: 'turbo mode?'
        },
        doSetFastTracking: {
            type: 'command',
            category: 'sensing',
            spec: 'set turbo mode to %b'
        },
        reportDate: {
            type: 'reporter',
            category: 'sensing',
            spec: 'current %dates'
        },

        // Operators
        reifyScript: {
            type: 'ring',
            category: 'other',
            spec: '%rc %ringparms'
        },
        reifyReporter: {
            type: 'ring',
            category: 'other',
            spec: '%rr %ringparms'
        },
        reifyPredicate: {
            type: 'ring',
            category: 'other',
            spec: '%rp %ringparms'
        },
        reportSum: {
            type: 'reporter',
            category: 'operators',
            spec: '%n + %n'
        },
        reportDifference: {
            type: 'reporter',
            category: 'operators',
            spec: '%n \u2212 %n'
        },
        reportProduct: {
            type: 'reporter',
            category: 'operators',
            spec: '%n \u00D7 %n'
        },
        reportQuotient: {
            type: 'reporter',
            category: 'operators',
            spec: '%n / %n' // '%n \u00F7 %n'
        },
        reportRound: {
            type: 'reporter',
            category: 'operators',
            spec: 'round %n'
        },
        reportMonadic: {
            type: 'reporter',
            category: 'operators',
            spec: '%fun of %n',
            defaults: [null, 10]
        },
        reportModulus: {
            type: 'reporter',
            category: 'operators',
            spec: '%n mod %n'
        },
        reportRandom: {
            type: 'reporter',
            category: 'operators',
            spec: 'pick random %n to %n',
            defaults: [1, 10]
        },
        reportLessThan: {
            type: 'predicate',
            category: 'operators',
            spec: '%s < %s'
        },
        reportEquals: {
            type: 'predicate',
            category: 'operators',
            spec: '%s = %s'
        },
        reportGreaterThan: {
            type: 'predicate',
            category: 'operators',
            spec: '%s > %s'
        },
        reportAnd: {
            type: 'predicate',
            category: 'operators',
            spec: '%b and %b'
        },
        reportOr: {
            type: 'predicate',
            category: 'operators',
            spec: '%b or %b'
        },
        reportNot: {
            type: 'predicate',
            category: 'operators',
            spec: 'not %b'
        },
        reportTrue: {
            type: 'predicate',
            category: 'operators',
            spec: 'true'
        },
        reportFalse: {
            type: 'predicate',
            category: 'operators',
            spec: 'false'
        },
        reportJoinWords: {
            type: 'reporter',
            category: 'operators',
            spec: 'join %words',
            defaults: [localize('hello') + ' ', localize('world')]
        },
        reportLetter: {
            type: 'reporter',
            category: 'operators',
            spec: 'letter %n of %s',
            defaults: [1, localize('world')]
        },
        reportStringSize: {
            type: 'reporter',
            category: 'operators',
            spec: 'length of %s',
            defaults: [localize('world')]
        },
        reportUnicode: {
            type: 'reporter',
            category: 'operators',
            spec: 'unicode of %s',
            defaults: ['a']
        },
        reportUnicodeAsLetter: {
            type: 'reporter',
            category: 'operators',
            spec: 'unicode %n as letter',
            defaults: [65]
        },
        reportIsA: {
            type: 'predicate',
            category: 'operators',
            spec: 'is %s a %typ ?',
            defaults: [5]
        },
        reportIsIdentical: {
            type: 'predicate',
            category: 'operators',
            spec: 'is %s identical to %s ?'
        },
        reportTextSplit: {
            type: 'reporter',
            category: 'operators',
            spec: 'split %s by %delim',
            defaults: [localize('hello') + ' ' + localize('world'), " "]
        },
        reportTypeOf: { // only in dev mode for debugging
            type: 'reporter',
            category: 'operators',
            spec: 'type of %s',
            defaults: [5]
        },
        reportTextFunction: { // only in dev mode - experimental
            type: 'reporter',
            category: 'operators',
            spec: '%txtfun of %s',
            defaults: [null, "Abelson & Sussman"]
        },

    /*
        reportScript: {
            type: 'reporter',
            category: 'operators',
            spec: 'the script %parms %c'
        },
        reify: {
            type: 'reporter',
            category: 'operators',
            spec: 'the %f block %parms'
        },
    */

        // Variables
        doSetVar: {
            type: 'command',
            category: 'variables',
            spec: 'set %var to %s',
            defaults: [null, 0]
        },
        doChangeVar: {
            type: 'command',
            category: 'variables',
            spec: 'change %var by %n',
            defaults: [null, 1]
        },
        doShowVar: {
            type: 'command',
            category: 'variables',
            spec: 'show variable %var'
        },
        doHideVar: {
            type: 'command',
            category: 'variables',
            spec: 'hide variable %var'
        },
        doDeclareVariables: {
            type: 'command',
            category: 'other',
            spec: 'script variables %scriptVars'
        },

        // Lists
        reportNewList: {
            type: 'reporter',
            category: 'lists',
            spec: 'list %exp'
        },
        reportCONS: {
            type: 'reporter',
            category: 'lists',
            spec: '%s in front of %l'
        },
        reportListItem: {
            type: 'reporter',
            category: 'lists',
            spec: 'item %idx of %l',
            defaults: [1]
        },
        reportCDR: {
            type: 'reporter',
            category: 'lists',
            spec: 'all but first of %l'
        },
        reportListLength: {
            type: 'reporter',
            category: 'lists',
            spec: 'length of %l'
        },
        reportListContainsItem: {
            type: 'predicate',
            category: 'lists',
            spec: '%l contains %s',
            defaults: [null, localize('thing')]
        },
        doAddToList: {
            type: 'command',
            category: 'lists',
            spec: 'add %s to %l',
            defaults: [localize('thing')]
        },
        doDeleteFromList: {
            type: 'command',
            category: 'lists',
            spec: 'delete %ida of %l',
            defaults: [1]
        },
        doInsertInList: {
            type: 'command',
            category: 'lists',
            spec: 'insert %s at %idx of %l',
            defaults: [localize('thing'), 1]
        },
        doReplaceInList: {
            type: 'command',
            category: 'lists',
            spec: 'replace item %idx of %l with %s',
            defaults: [1, null, localize('thing')]
        },

        // MAP - experimental
        reportMap: {
            type: 'reporter',
            category: 'lists',
            spec: 'map %repRing over %l'
        },

        // Code mapping - experimental
        doMapCodeOrHeader: { // experimental
            type: 'command',
            category: 'other',
            spec: 'map %cmdRing to %codeKind %code'
        },
        doMapStringCode: { // experimental
            type: 'command',
            category: 'other',
            spec: 'map String to code %code',
            defaults: ['<#1>']
        },
        doMapListCode: { // experimental
            type: 'command',
            category: 'other',
            spec: 'map %codeListPart of %codeListKind to code %code'
        },
        reportMappedCode: { // experimental
            type: 'reporter',
            category: 'other',
            spec: 'code of %cmdRing'
        }
    };
    
    for(block in SpriteMorph.prototype._blocks) {
        SpriteMorph.prototype.blocks[block] = SpriteMorph.prototype._blocks[block];
    }
};

HandMorph.prototype.processDrop = function (event) {
/*
    find out whether an external image or audio file was dropped
    onto the world canvas, turn it into an offscreen canvas or audio
    element and dispatch the

        droppedImage(canvas, name)
        droppedSVG(image, name)
        droppedAudio(audio, name)

    events to interested Morphs at the mouse pointer
*/
    var files = event instanceof FileList ? event
                : event.target.files || event.dataTransfer.files,
        file,
        url = event.dataTransfer ?
                event.dataTransfer.getData('URL') : null,
        txt = event.dataTransfer ?
                event.dataTransfer.getData('Text/HTML') : null,
        src,
        target = this.morphAtPointer(),
        img = new Image(),
        canvas,
        i;

    function readSVG(aFile) {
        var pic = new Image(),
            frd = new FileReader();
        while (!target.droppedSVG) {
            target = target.parent;
        }
        pic.onload = function () {
            target.droppedSVG(pic, aFile.name);
        };
        frd = new FileReader();
        frd.onloadend = function (e) {
            pic.src = e.target.result;
        };
        frd.readAsDataURL(aFile);
    }

    function readImage(aFile) {
        var pic = new Image(),
            frd = new FileReader();
        while (!target.droppedImage) {
            target = target.parent;
        }
        pic.onload = function () {
            canvas = newCanvas(new Point(pic.width, pic.height));
            canvas.getContext('2d').drawImage(pic, 0, 0);
            target.droppedImage(canvas, aFile.name);
        };
        frd = new FileReader();
        frd.onloadend = function (e) {
            pic.src = e.target.result;
        };
        frd.readAsDataURL(aFile);
    }

    function readAudio(aFile) {
        var frd = new FileReader();
        while (!target.droppedAudio) {
            target = target.parent;
        }
        frd.onloadend = function (e) {
			window.audioContext.decodeAudioData(
				e.target.result,
				function(buffer) {
                    target.droppedAudio(buffer, e.target.result, aFile.name);
				},
				function(e){
					alert("Error with decoding audio data");
				});
        };
        frd.readAsArrayBuffer(aFile);
    }

    function readText(aFile) {
        var frd = new FileReader();
        while (!target.droppedText) {
            target = target.parent;
        }
        frd.onloadend = function (e) {
            target.droppedText(e.target.result, aFile.name);
        };
        frd.readAsText(aFile);
    }

    function readBinary(aFile) {
        var frd = new FileReader();
        while (!target.droppedBinary) {
            target = target.parent;
        }
        frd.onloadend = function (e) {
            console.log("DROPPED BINARY");
            target.droppedBinary(e.target.result, aFile.name, aFile);
        };
        frd.readAsArrayBuffer(aFile);
    }

    function parseImgURL(html) {
        var iurl = '',
            idx,
            c,
            start = html.indexOf('<img src="');
        if (start === -1) {return null; }
        start += 10;
        for (idx = start; idx < html.length; idx += 1) {
            c = html[idx];
            if (c === '"') {
                return iurl;
            }
            iurl = iurl.concat(c);
        }
        return null;
    }

    if (files.length > 0) {
        for (i = 0; i < files.length; i += 1) {
            file = files[i];
            if (file.type.indexOf("svg") !== -1
                    && !MorphicPreferences.rasterizeSVGs) {
                readSVG(file);
            } else if (file.type.indexOf("image") === 0) {
                readImage(file);
            } else if (file.type.indexOf("audio") === 0) {
                readAudio(file);
            } else if (file.type.indexOf("text") === 0) {
                readText(file);
            } else { // assume it's meant to be binary
                readBinary(file);
            }
        }
    } else if (url) {
        if (
            contains(
                ['gif', 'png', 'jpg', 'jpeg', 'bmp'],
                url.slice(url.lastIndexOf('.') + 1).toLowerCase()
            )
        ) {
            while (!target.droppedImage) {
                target = target.parent;
            }
            img = new Image();
            img.onload = function () {
                canvas = newCanvas(new Point(img.width, img.height));
                canvas.getContext('2d').drawImage(img, 0, 0);
                target.droppedImage(canvas);
            };
            img.src = url;
        }
    } else if (txt) {
        while (!target.droppedImage) {
            target = target.parent;
        }
        img = new Image();
        img.onload = function () {
            canvas = newCanvas(new Point(img.width, img.height));
            canvas.getContext('2d').drawImage(img, 0, 0);
            target.droppedImage(canvas);
        };
        src = parseImgURL(txt);
        if (src) {img.src = src; }
    }
};

StageMorph.prototype.toXML = function (serializer) {
    var thumbnail = this.thumbnail(SnapSerializer.prototype.thumbnailSize),
        thumbdata,
        ide = this.parentThatIsA(IDE_Morph);

    // catch cross-origin tainting exception when using SVG costumes
    try {
        thumbdata = thumbnail.toDataURL('image/png');
    } catch (error) {
        thumbdata = null;
    }

    function code(key) {
        var str = '';
        Object.keys(StageMorph.prototype[key]).forEach(
            function (selector) {
                str += (
                    '<' + selector + '>' +
                        XML_Element.prototype.escape(
                            StageMorph.prototype[key][selector]
                        ) +
                        '</' + selector + '>'
                );
            }
        );
        return str;
    }

    return serializer.format(
        '<project name="@" app="@" version="@">' +
            '<notes>$</notes>' +
            '<thumbnail>$</thumbnail>' +
            '<stage name="@" width="@" height="@" ' +
            'costume="@" tempo="@" threadsafe="@" ' +
            'lines="@" ' +
            'codify="@" ' +
            'scheduled="@" ~>' +
            '<pentrails>$</pentrails>' +
            '<costumes>%</costumes>' +
            '<sounds>%</sounds>' +
            '<variables>%</variables>' +
            '<blocks>%</blocks>' +
            '<scripts>%</scripts><sprites>%</sprites>' +
            '</stage>' +
            '<hidden>$</hidden>' +
            '<headers>%</headers>' +
            '<code>%</code>' +
            '<blocks>%</blocks>' +
            '<variables>%</variables>' +
            '</project>',
        (ide && ide.projectName) ? ide.projectName : 'Untitled',
        serializer.app,
        serializer.version,
        (ide && ide.projectNotes) ? ide.projectNotes : '',
        thumbdata,
        this.name,
        StageMorph.prototype.dimensions.x,
        StageMorph.prototype.dimensions.y,
        this.getCostumeIdx(),
        this.getTempo(),
        this.isThreadSafe,
        SpriteMorph.prototype.useFlatLineEnds ? 'flat' : 'round',
        this.enableCodeMapping,
        StageMorph.prototype.frameRate !== 0,
        this.trailsCanvas.toDataURL('image/png'),
        serializer.store(this.costumes, this.name + '_cst'),
        serializer.store(this.sounds, this.name + '_snd'),
        serializer.store(this.variables),
        serializer.store(this.customBlocks),
        serializer.store(this.scripts),
        serializer.store(this.children),
        Object.keys(StageMorph.prototype.hiddenPrimitives).reduce(
                function (a, b) {return a + ' ' + b; },
                ''
            ),
        code('codeHeaders'),
        code('codeMappings'),
        serializer.store(this.globalBlocks),
        (ide && ide.globalVariables) ?
                    serializer.store(ide.globalVariables) : ''
    );
};

IDE_Morph.prototype.createSpriteBar = function () {
    // assumes that the categories pane has already been created
    var rotationStyleButtons = [],
        thumbSize = new Point(45, 45),
        nameField,
        checkbox,
        checkbox2,
        thumbnail,
        tabCorner = 15,
        tabColors = this.tabColors,
        tabBar = new AlignmentMorph('row', -tabCorner * 2),
        tab,
        myself = this;

    if (this.spriteBar) {
        this.spriteBar.destroy();
    }

    this.spriteBar = new Morph();
    this.spriteBar.color = this.frameColor;
    this.add(this.spriteBar);

    function addRotationStyleButton(rotationStyle) {
        var colors = myself.rotationStyleColors,
            button;

        button = new ToggleButtonMorph(
            colors,
            myself, // the IDE is the target
            function () {
                if (myself.currentSprite instanceof SpriteMorph) {
                    myself.currentSprite.rotationStyle = rotationStyle;
                    myself.currentSprite.changed();
                    myself.currentSprite.drawNew();
                    myself.currentSprite.changed();
                }
                rotationStyleButtons.forEach(function (each) {
                    each.refresh();
                });
            },
            ['\u2192', '\u21BB', '\u2194'][rotationStyle], // label
            function () {  // query
                return myself.currentSprite instanceof SpriteMorph
                    && myself.currentSprite.rotationStyle === rotationStyle;
            },
            null, // environment
            localize(
                [
                    'don\'t rotate', 'can rotate', 'only face left/right'
                ][rotationStyle]
            )
        );

        button.corner = 8;
        button.labelMinExtent = new Point(11, 11);
        button.padding = 0;
        button.labelShadowOffset = new Point(-1, -1);
        button.labelShadowColor = colors[1];
        button.labelColor = myself.buttonLabelColor;
        button.fixLayout();
        button.refresh();
        rotationStyleButtons.push(button);
        button.setPosition(myself.spriteBar.position().add(2));
        button.setTop(button.top()
            + ((rotationStyleButtons.length - 1) * (button.height() + 2))
            );
        myself.spriteBar.add(button);
        if (myself.currentSprite instanceof StageMorph) {
            button.hide();
        }
        return button;
    }

    addRotationStyleButton(1);
    addRotationStyleButton(2);
    addRotationStyleButton(0);
    this.rotationStyleButtons = rotationStyleButtons;

    thumbnail = new Morph();
    thumbnail.setExtent(thumbSize);
    thumbnail.image = this.currentSprite.thumbnail(thumbSize);
    thumbnail.setPosition(
        rotationStyleButtons[0].topRight().add(new Point(5, 3))
    );
    this.spriteBar.add(thumbnail);

    thumbnail.fps = 3;

    thumbnail.step = function () {
        if (thumbnail.version !== myself.currentSprite.version) {
            thumbnail.image = myself.currentSprite.thumbnail(thumbSize);
            thumbnail.changed();
            thumbnail.version = myself.currentSprite.version;
        }
    };

    nameField = new InputFieldMorph(this.currentSprite.name);
    nameField.setWidth(100); // fixed dimensions
    nameField.contrast = 90;
    nameField.setPosition(thumbnail.topRight().add(new Point(10, 3)));
    this.spriteBar.add(nameField);
    nameField.drawNew();
    nameField.accept = function () {
        myself.currentSprite.setName(nameField.getValue());
    };
    this.spriteBar.reactToEdit = function () {
        myself.currentSprite.setName(nameField.getValue());
    };

    // checkbox
    if (this.currentSprite instanceof StageMorph) {
        checkbox = new ToggleMorph(
            'checkbox',
            null,
            function () {
                myself.currentSprite.toggleGrid();
            },
            'display grid', // TODO: localize
            function () {
                return myself.currentSprite.getGridVisible();
            }
        );
    }
    else {
        checkbox = new ToggleMorph(
            'checkbox',
            null,
            function () {
                myself.currentSprite.isDraggable =
                    !myself.currentSprite.isDraggable;
            },
            localize('draggable'),
            function () {
                return myself.currentSprite.isDraggable;
            }
        );
    }
    checkbox.label.isBold = false;
    checkbox.label.setColor(this.buttonLabelColor);
    checkbox.color = tabColors[2];
    checkbox.highlightColor = tabColors[0];
    checkbox.pressColor = tabColors[1];

    checkbox.tick.shadowOffset = MorphicPreferences.isFlat ?
            new Point() : new Point(-1, -1);
    checkbox.tick.shadowColor = new Color(); // black
    checkbox.tick.color = this.buttonLabelColor;
    checkbox.tick.isBold = false;
    checkbox.tick.drawNew();

    checkbox.setPosition(nameField.bottomLeft().add(2));
    checkbox.drawNew();
    this.spriteBar.add(checkbox);

    if (this.currentSprite instanceof SpriteMorph) {
        checkbox2 = new ToggleMorph(
            'checkbox',
            null,
            function () {
                myself.currentSprite.toggle3D();
            },
            'switch to 3D', // TODO: localize
            function () {
                return myself.currentSprite.costume ?
                    myself.currentSprite.costume.is3D : false;
            }
        );
        checkbox2.label.isBold = false;
        checkbox2.label.setColor(this.buttonLabelColor);
        checkbox2.color = tabColors[2];
        checkbox2.highlightColor = tabColors[0];
        checkbox2.pressColor = tabColors[1];

        checkbox2.tick.shadowOffset = MorphicPreferences.isFlat ?
            new Point() : new Point(-1, -1);
        checkbox2.tick.shadowColor = new Color(); // black
        checkbox2.tick.color = this.buttonLabelColor;
        checkbox2.tick.isBold = false;
        checkbox2.tick.drawNew();

        checkbox2.setPosition(checkbox.topRight().add(new Point(60, 0)));
        checkbox2.drawNew();
        this.spriteBar.add(checkbox2);
    }

    // tab bar
    tabBar.tabTo = function (tabString) {
        var active;
        myself.currentTab = tabString;
        this.children.forEach(function (each) {
            each.refresh();
            if (each.state) {active = each; }
        });
        active.refresh(); // needed when programmatically tabbing
        myself.createSpriteEditor();
        myself.fixLayout('tabEditor');
    };

    tab = new TabMorph(
        tabColors,
        null, // target
        function () {tabBar.tabTo('scripts'); },
        localize('Scripts'), // label
        function () {  // query
            return myself.currentTab === 'scripts';
        }
    );
    tab.padding = 3;
    tab.corner = tabCorner;
    tab.edge = 1;
    tab.labelShadowOffset = new Point(-1, -1);
    tab.labelShadowColor = tabColors[1];
    tab.labelColor = this.buttonLabelColor;
    tab.drawNew();
    tab.fixLayout();
    tabBar.add(tab);

    tab = new TabMorph(
        tabColors,
        null, // target
        function () {tabBar.tabTo('costumes'); },
        localize('Costumes'), // label
        function () {  // query
            return myself.currentTab === 'costumes';
        }
    );
    tab.padding = 3;
    tab.corner = tabCorner;
    tab.edge = 1;
    tab.labelShadowOffset = new Point(-1, -1);
    tab.labelShadowColor = tabColors[1];
    tab.labelColor = this.buttonLabelColor;
    tab.drawNew();
    tab.fixLayout();
    tabBar.add(tab);

    tab = new TabMorph(
        tabColors,
        null, // target
        function () {tabBar.tabTo('sounds'); },
        localize('Sounds'), // label
        function () {  // query
            return myself.currentTab === 'sounds';
        }
    );
    tab.padding = 3;
    tab.corner = tabCorner;
    tab.edge = 1;
    tab.labelShadowOffset = new Point(-1, -1);
    tab.labelShadowColor = tabColors[1];
    tab.labelColor = this.buttonLabelColor;
    tab.drawNew();
    tab.fixLayout();
    tabBar.add(tab);

    tab = new TabMorph(
        tabColors,
        null, // target
        function () {tabBar.tabTo('files'); },
        localize('Files'), // label
        function () {  // query
            return myself.currentTab === 'files';
        }
    );
    tab.padding = 3;
    tab.corner = tabCorner;
    tab.edge = 1;
    tab.labelShadowOffset = new Point(-1, -1);
    tab.labelShadowColor = tabColors[1];
    tab.labelColor = this.buttonLabelColor;
    tab.drawNew();
    tab.fixLayout();
    tabBar.add(tab);

    tabBar.fixLayout();
    tabBar.children.forEach(function (each) {
        each.refresh();
    });
    this.spriteBar.tabBar = tabBar;
    this.spriteBar.add(this.spriteBar.tabBar);

    this.spriteBar.fixLayout = function () {
        this.tabBar.setLeft(this.left());
        this.tabBar.setBottom(this.bottom());
    };
};

IDE_Morph.prototype.droppedAudio = function (anAudio, buf, name) {
    this.currentSprite.addSound(anAudio, buf, name.split('.')[0]); // up to period
    this.spriteBar.tabBar.tabTo('sounds');
    this.hasChangedMedia = true;
};

SpriteMorph.prototype.addSound = function (audio, buf, name) {
    var volume = this.volume;
    this.sounds.add(new Sound(audio, buf, name, volume));
};

SnapSerializer.prototype.loadInput = function (model, input, block) {
    // private
    var inp, val, myself = this;
    if (model.tag === 'script') {
        inp = this.loadScript(model);
        if (inp) {
            input.add(inp);
            input.fixLayout();
        }
    } else if (model.tag === 'autolambda' && model.children[0]) {
        inp = this.loadBlock(model.children[0], true);
        if (inp) {
            input.silentReplaceInput(input.children[0], inp);
            input.fixLayout();
        }
    } else if (model.tag === 'list') {
        while (input.inputs().length > 0) {
            input.removeInput();
        }
        model.children.forEach(function (item) {
            input.addInput();
            myself.loadInput(
                item,
                input.children[input.children.length - 2],
                input
            );
        });
        input.fixLayout();
    } else if (model.tag === 'block' || model.tag === 'custom-block') {
        block.silentReplaceInput(input, this.loadBlock(model, true));
    } else if (model.tag === 'color') {
        input.setColor(this.loadColor(model.contents));
    } else {
        val = this.loadValue(model);
        if (val) {
            input.setContents(this.loadValue(model));
        }
    }
};

SnapSerializer.prototype.loadValue = function (model) {
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
        v.drawNew();
        v.gotoXY(+model.attributes.x || 0, +model.attributes.y || 0);
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
                var url = config.asset_path + 'Costumes3D' + '/' + name+ ".js";
				v = new Costume(
					null, // no canvas for 3D costumes
					name ? name.split('.')[0] : '', // up to period
					null, // rotation center
					url,
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
        v = new Sound("", model.attributes.sound, model.attributes.name, 100);
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

function Sound(audio, buf, name, volume) {
	var myself = this;
	this.audio = audio;
	this.name = name || "Sound";
	if(typeof buf == "string")
	{
		this.volume = 100;
		this.string = buf;
		str2ArrayBuffer(buf, function(buffer){
            myself.arrayBuffer = buffer;
			window.audioContext.decodeAudioData(
				myself.arrayBuffer,
				function(aud) {
                    myself.audio = aud;
				},
				function(e){
					alert("Error with decoding audio data");
				});
		});
	}
	else
	{
        soundBuffer[name] = audio;
		this.arrayBuffer = buf;
		this.volume = volume || 100;
		this.string = "";
		ArrayBuffer2str(buf, function(buffer){
			myself.string = buffer;
		});
	}
}

Sound.prototype.toDataURL = function () {
    return this.string;
};

Sound.prototype.toXML = function (serializer) {
    return serializer.format(
        '<sound name="@" sound="@" ~/>',
        this.name,
        this.toDataURL()
    );
};

SpriteMorph.prototype.playSound = function (name) {   
	this.playSoundTime(name,0);
};

Sound.prototype.play = function () {
    // return an instance of an audio element which can be terminated
    // externally (i.e. by the stage)
	var source = audioContext.createBufferSource();
	source.buffer = this.audio;
	source.connect(audioContext.destination);
	source[source.start ? 'start' : 'noteOn'](0);
};

Sound.prototype.copy = function () {
    return new sound(this.audio,this.arrayBuffer,this.name,this.volume);
};

SpriteMorph.prototype.playSoundTime = function (name, time) {   
	sound = detect(
		this.sounds.asArray(),
		function (s) {return s.name === name; }
	)
    if (sound) {
		var source = audioContext.createBufferSource();
		source.buffer = sound.audio;
		source.connect(gainNode);
		source[source.start ? 'start' : 'noteOn'](time);
	}
};

function str2ArrayBuffer(str,callback)
{
    var req = new XMLHttpRequest;
    req.open( 'GET', str );
    req.responseType = 'arraybuffer';
    req.onload = function fileLoaded(e)
    {
        callback(e.target.response);
    };

    req.send();
}

function ArrayBuffer2str(arrayBuffer,callback){
	var blob = new Blob([arrayBuffer]);
	var f = new FileReader();
	f.onload = function(e)
	{
		callback(e.target.result)
    }
    f.readAsDataURL(blob);
}

function testSwitch(arrayBuffer)
{
	ArrayBuffer2str(arrayBuffer,
		function(str)
		{
			str2ArrayBuffer(str,
			function(arrayBuffer2)
			{
				return arrayBuffer2;
			});
		});
}
Process.prototype.doStopAllSounds = function () {
    audioContext.close;
	window.audioContext = new AudioContext();	
};

SpriteMorph.prototype.doSetVolume = function (val) {
    gainNode.gain.value = val/100;
};

SpriteMorph.prototype.doChangeVolume = function (val) {
    this.doSetVolume(gainNode.gain.value + val/100);
};

SpriteMorph.prototype.reportVolume = function () {
    return gainNode.gain.value*100;
};

Process.prototype.doPlayNote = function (pitch, time, duration) {
  this.oscillator = context.createOscillator();
  this.oscillator.connect(window.gainNode);
  this.oscillator.frequency.value = pitch;
  this.oscillator[this.oscillator.start ? 'start' : 'noteOn'](time);
  this.oscillator.stop(time-duration);
};
SpriteMorph.prototype.wearCostume = function (costume) {
	if(this.flippedY)
	{
		this.flipYAxis();
	}
	if(this.flippedX)
	{
		this.flipXAxis();
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
		if (this.costume && this.costume.originalPixels && !FirstCostume) 
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
    }

    if (this.updatesPalette) {
        var ide = this.parentThatIsA(IDE_Morph);
        if (ide) {
            ide.selectSprite(this);
        }
    }
	FirstCostume = false;
};
//# sourceURL=code.js