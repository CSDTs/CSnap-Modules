var makeAVar = false;
var loadNewVariables = false;
var showCostumesTab = false;
var top = 0;
var iframeHeight = 0;
var hideLeft = false;
var name = '';
var originalContent
var ID
var data = '1,1,2,3,5,8,13,21,34,55,89,144'
var coordinateScale = 1
SpriteMorph.flippedY = false;
SpriteMorph.flippedX = false;
Costume.colored = false;
var originalContent, ID;
var FirstCostume = true;

//override text drop
IDE_Morph.prototype.droppedText = function (aString, name) {
    var lbl = name ? name.split('.')[0] : '';
    if (aString.indexOf('<project') === 0) {
        return this.openProjectString(aString);
    }
    if (aString.indexOf('<snapdata') === 0) {
        return this.openCloudDataString(aString);
    }
    if (aString.indexOf('<blocks') === 0) {
        return this.openBlocksString(aString, lbl, true);
    }
    if (aString.indexOf('<sprites') === 0) {
        return this.openSpritesString(aString);
    }
    if (aString.indexOf('<media') === 0) {
        return this.openMediaString(aString);
    }
    if (aString.indexOf('<data>') === 0) {
        data = aString.substring(6);
    }
};
//override the control bar creation
IDE_Morph.prototype.createControlBar = function () {
    // assumes the logo has already been created
    var padding = 5,
        button,
        stopButton,
        pauseButton,
        startButton,
        muteSoundsButton,
        projectButton,
        settingsButton,
		goalImagesButton,
        stageSizeButton,
        appModeButton,
        cloudButton,
        x,
        colors = [
            this.groupColor,
            this.frameColor.darker(50),
            this.frameColor.darker(50)
        ],
        myself = this;

    if (this.controlBar) {
        this.controlBar.destroy();
    }

    this.controlBar = new Morph();
    this.controlBar.color = this.frameColor;
    this.controlBar.setHeight(this.logo.height()); // height is fixed
    this.controlBar.mouseClickLeft = function () {
        this.world().fillPage();
    };
    this.add(this.controlBar);

    //smallStageButton
    button = new ToggleButtonMorph(
        null, //colors,
        myself, // the IDE is the target
        'toggleStageSize',
        [
            new SymbolMorph('smallStage', 14),
            new SymbolMorph('normalStage', 14)
        ],
        function () {  // query
            return myself.isSmallStage;
        }
    );

    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    //button.drawNew();
    // button.hint = 'stage size\nsmall & normal';
    //button.fixLayout();
    //button.refresh();
    stageSizeButton = button;
    //this.controlBar.add(stageSizeButton);
    //this.controlBar.stageSizeButton = button; // for refreshing

    //appModeButton
    button = new ToggleButtonMorph(
        null, //colors,
        myself, // the IDE is the target
        'toggleAppMode',
        [
            new SymbolMorph('fullScreen', 14),
            new SymbolMorph('normalScreen', 14)
        ],
        function () {  // query
            return myself.isAppMode;
        }
    );

    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    //button.drawNew();
    // button.hint = 'app & edit\nmodes';
    //button.fixLayout();
    //button.refresh();
    appModeButton = button;
    //if (!config.presentation)
    //{ this.controlBar.add(appModeButton); }
    //this.controlBar.appModeButton = appModeButton; // for refreshing

    //muteSoundsButton
    button = new ToggleButtonMorph(
        null, //colors,
        myself, // the IDE is the target
        'toggleMuteSounds',
        [
            new SymbolMorph('mutedSounds', 14),
            new SymbolMorph('unmutedSounds', 14)
        ],
        function () {  // query
            return myself.isMuted;
        }
    );

    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    //button.drawNew();
    // button.hint = 'sounds\nmuted & unmuted';
    //button.fixLayout();
    //button.refresh();
    muteSoundsButton = button;
    //this.controlBar.add(muteSoundsButton);
    //this.controlBar.muteSoundsButton = button; // for refreshing
	
    // stopButton
    button = new PushButtonMorph(
        this,
        'stopAllScripts',
        new SymbolMorph('octagon', 14)
    );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(200, 0, 0);
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'stop\nevery-\nthing';
    button.fixLayout();
    stopButton = button;
    this.controlBar.add(stopButton);

    //pauseButton
    button = new ToggleButtonMorph(
        null, //colors,
        myself, // the IDE is the target
        'togglePauseResume',
        [
            new SymbolMorph('pause', 12),
            new SymbolMorph('pointRight', 14)
        ],
        function () {  // query
            return myself.isPaused();
        }
    );

    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(255, 220, 0);
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'pause/resume\nall scripts';
    button.fixLayout();
    button.refresh();
    pauseButton = button;
    this.controlBar.add(pauseButton);
    this.controlBar.pauseButton = pauseButton; // for refreshing

    // startButton
    button = new PushButtonMorph(
        this,
        'pressStart',
        new SymbolMorph('flag', 14)
    );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(0, 200, 0);
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'start green\nflag scripts';
    button.fixLayout();
    startButton = button;
    this.controlBar.add(startButton);
    this.controlBar.startButton = startButton;

    // projectButton
    button = new PushButtonMorph(
        this,
        'projectMenu',
        'File'
        //'\u270E'
    );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    button.drawNew();
    // button.hint = 'open, save, & annotate project';
    button.fixLayout();
    projectButton = button;
    this.controlBar.add(projectButton);
    this.controlBar.projectButton = projectButton; // for menu positioning

    // settingsButton
    button = new PushButtonMorph(
        this,
        'settingsMenu',
        new SymbolMorph('gears', 14)
        //'\u2699'
    );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    //button.drawNew();
    // button.hint = 'edit settings';
    //button.fixLayout();
    settingsButton = button;
    //this.controlBar.add(settingsButton);
    //this.controlBar.settingsButton = settingsButton; // for menu positioning

 	 // goalImagesButton
    var goals = this.precacheGoals();
   
    if(goals) {
       button = new PushButtonMorph(
           this,
           'goalImagesMenu', ' Goals  '
       );
       button.corner = 12;
       button.color = colors[0];
       button.highlightColor = colors[1];
       button.pressColor = colors[2];
       button.labelMinExtent = new Point(36, 18);
       button.padding = 0;
       button.labelShadowOffset = new Point(-1, -1);
       button.labelShadowColor = colors[1];
       button.labelColor = this.buttonLabelColor;
       button.contrast = this.buttonContrast;
       //button.drawNew();
       //button.fixLayout();
       //goalImagesButton = button;
       //this.controlBar.add(goalImagesButton);
       //this.controlBar.goalImagesButton = goalImagesButton; // for menu positioning
    }
	
    // cloudButton
    button = new PushButtonMorph(
        this,
        'cloudMenu',
        new SymbolMorph('cloud', 11)
    );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.contrast = this.buttonContrast;
    //button.drawNew();
    // button.hint = 'cloud operations';
    //button.fixLayout();
    cloudButton = button;
    //this.controlBar.add(cloudButton);
    //this.controlBar.cloudButton = cloudButton; // for menu positioning

    this.controlBar.fixLayout = function () {
        x = this.right() - padding;
        [stopButton, pauseButton, startButton].forEach(
            function (button) {
                button.setCenter(myself.controlBar.center());
                button.setRight(x);
                x -= button.width();
                x -= padding;
            }
        );

        x = myself.right() - (StageMorph.prototype.dimensions.x
            * (myself.isSmallStage ? myself.stageRatio : 1));
/*
        [stageSizeButton, appModeButton, muteSoundsButton].forEach(
            function (button) {
                x += padding;
                button.setCenter(myself.controlBar.center());
                button.setLeft(x);
                x += button.width();
            }
        );
        if(goals) {
           goalImagesButton.setCenter(myself.controlBar.center());
           goalImagesButton.setLeft(this.left());
         
           settingsButton.setCenter(myself.controlBar.center());
           settingsButton.setLeft(goalImagesButton.left() - padding - 40);
        }
      
        else {
           settingsButton.setCenter(myself.controlBar.center());
           settingsButton.setLeft(this.left() - 40);
        }         

        cloudButton.setCenter(myself.controlBar.center());
        cloudButton.setRight(settingsButton.left() - padding);

        projectButton.setCenter(myself.controlBar.center());
        projectButton.setRight(cloudButton.left() - padding);
		
		*/
        this.updateLabel();
    };

    this.controlBar.updateLabel = function () {
        var suffix = myself.world().isDevMode ?
                ' - ' + localize('development mode') : '';

        if (this.label) {
            this.label.destroy();
        }
        if (myself.isAppMode) {
            return;
        }

        this.label = new StringMorph(
            (myself.projectName || localize('untitled')) + suffix,
            14,
            'sans-serif',
            true,
            false,
            false,
            MorphicPreferences.isFlat ? null : new Point(2, 1),
            myself.frameColor.darker(myself.buttonContrast)
        );
        this.label.color = myself.buttonLabelColor;
        this.label.drawNew();
        this.add(this.label);
        this.label.setCenter(this.center());
		/*
        if(goals) {
            this.label.setLeft(this.goalImagesButton.right() + padding);
        }
        else {
            this.label.setLeft(this.settingsButton.right() + padding);
        }
		*/
    };
};
//override categories
IDE_Morph.prototype.createCategories = function () {
    // assumes the logo has already been created
    var myself = this;

    if (this.categories) {
        this.categories.destroy();
    }
    this.categories = new Morph();
    this.categories.color = this.groupColor;
    this.categories.silentSetWidth(this.logo.width()); // width is fixed

    function addCategoryButton(category) {
        /*
		var labelWidth = 75,
            colors = [
                myself.frameColor,
                myself.frameColor.darker(50),
                SpriteMorph.prototype.blockColor[category]
            ],
            button;

        button = new ToggleButtonMorph(
            colors,
            myself, // the IDE is the target
            function () {
                myself.currentCategory = category;
                myself.categories.children.forEach(function (each) {
                    each.refresh();
                });
                myself.refreshPalette(true);
            },
            category[0].toUpperCase().concat(category.slice(1)), // label
            function () {  // query
                return myself.currentCategory === category;
            },
            null, // env
            null, // hint
            null, // template cache
            labelWidth, // minWidth
            true // has preview
        );

        button.corner = 8;
        button.padding = 0;
        button.labelShadowOffset = new Point(-1, -1);
        button.labelShadowColor = colors[1];
        button.labelColor = myself.buttonLabelColor;
        button.fixLayout();
        button.refresh();
        myself.categories.add(button);
        return button;
		*/
    }

    function fixCategoriesLayout() {
		/*
        var buttonWidth = myself.categories.children[0].width(),
            buttonHeight = myself.categories.children[0].height(),
            border = 3,
            rows =  Math.ceil((myself.categories.children.length) / 2),
            xPadding = (myself.categories.width()
                - border
                - buttonWidth * 2) / 3,
            yPadding = 2,
            l = myself.categories.left(),
            t = myself.categories.top(),
            i = 0,
            row,
            col;

        myself.categories.children.forEach(function (button) {
            i += 1;
            row = Math.ceil(i / 2);
            col = 2 - (i % 2);
            button.setPosition(new Point(
                l + (col * xPadding + ((col - 1) * buttonWidth)),
                t + (row * yPadding + ((row - 1) * buttonHeight) + border)
            ));
        });

        myself.categories.setHeight(
            (rows + 1) * yPadding
                + rows * buttonHeight
                + 2 * border
        );
		*/
    }

    SpriteMorph.prototype.categories.forEach(function (cat) {
        if (!contains(['lists', 'other'], cat)) {
            addCategoryButton(cat);
        }
    });
    fixCategoriesLayout();
    this.add(this.categories);
};
IDE_Morph.prototype.createPalette = function () {
    // assumes that the logo pane has already been created
    // needs the categories pane for layout
    var myself = this;

    if (this.palette)
	{
        this.palette.destroy();
    }
	if(!hideLeft)
	{
		this.palette = this.currentSprite.palette(this.currentCategory);
		this.palette.isDraggable = false;
		this.palette.acceptsDrops = true;
		this.palette.contents.acceptsDrops = false;

		this.palette.reactToDropOf = function (droppedMorph) {
			if (droppedMorph instanceof DialogBoxMorph) {
				myself.world().add(droppedMorph);
			} else if (droppedMorph instanceof SpriteMorph) {
				myself.removeSprite(droppedMorph);
			} else if (droppedMorph instanceof SpriteIconMorph) {
				droppedMorph.destroy();
				myself.removeSprite(droppedMorph.object);
			} else if (droppedMorph instanceof CostumeIconMorph) {
				myself.currentSprite.wearCostume(null);
				droppedMorph.destroy();
			} else {
				droppedMorph.destroy();
			}
		};

		this.palette.setWidth(this.logo.width());
		this.add(this.palette);
		this.palette.scrollX(this.palette.padding);
		this.palette.scrollY(this.palette.padding);
	}
};
IDE_Morph.prototype.fixLayout = function (situation) {
    // situation is a string, i.e.
    // 'selectSprite' or 'refreshPalette' or 'tabEditor'
    var padding = this.padding;

    Morph.prototype.trackChanges = false;

    if (situation !== 'refreshPalette') {
        // controlBar
        this.controlBar.setPosition(this.logo.topRight());
        this.controlBar.setWidth(this.right() - this.controlBar.left());
        this.controlBar.fixLayout();

        // categories
		if(!hideLeft)
		{
			this.categories.setLeft(this.logo.left());
			this.categories.setTop(this.logo.bottom());
		}
    }

	if(!hideLeft)
	{
		this.palette.setLeft(this.logo.left());
		this.palette.setTop(this.categories.bottom());
		this.palette.setHeight(this.bottom() - this.palette.top());
	}

    if (situation !== 'refreshPalette') {
        // stage
        if (this.isAppMode) {
            this.stage.setScale(Math.floor(Math.min(
                (this.width() - padding * 2) / this.stage.dimensions.x,
                (this.height() - this.controlBar.height() * 2 - padding * 2)
                    / this.stage.dimensions.y
            ) * 10) / 10);
            this.stage.setCenter(this.center());
        } else {
//            this.stage.setScale(this.isSmallStage ? 0.5 : 1);
            this.stage.setScale(this.isSmallStage ? this.stageRatio : 1);
            this.stage.setTop(this.logo.bottom() + padding);
            this.stage.setRight(this.right());
        }

        // spriteBar
        this.spriteBar.setPosition(this.logo.bottomRight().add(padding));
        this.spriteBar.setExtent(new Point(
            Math.max(0, this.stage.left() - padding - this.spriteBar.left()),
            this.categories.bottom() - this.spriteBar.top() - padding
        ));
        this.spriteBar.fixLayout();

        // spriteEditor
        if (this.spriteEditor.isVisible) {
            this.spriteEditor.setPosition(this.spriteBar.bottomLeft());
            this.spriteEditor.setExtent(new Point(
                this.spriteBar.width(),
                this.bottom() - this.spriteEditor.top()
            ));
        }

        // corralBar
        this.corralBar.setLeft(this.stage.left());
        this.corralBar.setTop(this.stage.bottom() + padding);
        this.corralBar.setWidth(this.stage.width());

        // corral
        if (!contains(['selectSprite', 'tabEditor'], situation)) {
            this.corral.setPosition(this.corralBar.bottomLeft());
            this.corral.setWidth(this.stage.width());
            this.corral.setHeight(this.bottom() - this.corral.top());
            this.corral.fixLayout();
        }
    }

    Morph.prototype.trackChanges = true;
    this.changed();
};

//override create sprite bar... 
IDE_Morph.prototype.createSpriteBar = function () {
    // assumes that the categories pane has already been created
    var rotationStyleButtons = [],
        thumbSize = new Point(45, 45),
        nameField,
        padlock,
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
        //button.setPosition(myself.spriteBar.position().add(2));
        //button.setTop(button.top()
        //    + ((rotationStyleButtons.length - 1) * (button.height() + 2))
        //    );
        //myself.spriteBar.add(button);
        //if (myself.currentSprite instanceof StageMorph) {
        //    button.hide();
        //}
        return button;
    }

    addRotationStyleButton(1);
    addRotationStyleButton(2);
    addRotationStyleButton(0);
    this.rotationStyleButtons = rotationStyleButtons;

	
    thumbnail = new Morph();
    thumbnail.setExtent(thumbSize);
    //thumbnail.image = this.currentSprite.thumbnail(thumbSize);
    //thumbnail.setPosition(
    //    rotationStyleButtons[0].topRight().add(new Point(5, 3))
    //);
    //this.spriteBar.add(thumbnail);

    //thumbnail.fps = 3;

    thumbnail.step = function () {
        //if (thumbnail.version !== myself.currentSprite.version) {
        //    thumbnail.image = myself.currentSprite.thumbnail(thumbSize);
        //    thumbnail.changed();
        //    thumbnail.version = myself.currentSprite.version;
        //}
    };

    nameField = new InputFieldMorph(this.currentSprite.name);
    nameField.setWidth(100); // fixed dimensions
    nameField.contrast = 90;
    nameField.setPosition(thumbnail.topRight().add(new Point(10, 3)));
    //this.spriteBar.add(nameField);
    //nameField.drawNew();
    //nameField.accept = function () {
    //    myself.currentSprite.setName(nameField.getValue());
    //};
    //this.spriteBar.reactToEdit = function () {
    //    myself.currentSprite.setName(nameField.getValue());
    //};
    // padlock
    padlock = new ToggleMorph(
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
    padlock.label.isBold = false;
    padlock.label.setColor(this.buttonLabelColor);
    padlock.color = tabColors[2];
    padlock.highlightColor = tabColors[0];
    padlock.pressColor = tabColors[1];

    padlock.tick.shadowOffset = MorphicPreferences.isFlat ?
            new Point() : new Point(-1, -1);
    padlock.tick.shadowColor = new Color(); // black
    padlock.tick.color = this.buttonLabelColor;
    padlock.tick.isBold = false;
    padlock.tick.drawNew();

    padlock.setPosition(nameField.bottomLeft().add(2));
    padlock.drawNew();
    this.spriteBar.add(padlock);
    if (this.currentSprite instanceof StageMorph) {
        padlock.hide();
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
	if(showCostumesTab)
	{
		tab.drawNew();
		tab.fixLayout();
		tabBar.add(tab);
	}

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
    //tab.drawNew();
    //tab.fixLayout();
    //tabBar.add(tab);

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
// over ride corral bar
IDE_Morph.prototype.createCorralBar = function () {
    // assumes the stage has already been created
    var padding = 5,
        newbutton,
        paintbutton,
        colors = [
            this.groupColor,
            this.frameColor.darker(50),
            this.frameColor.darker(50)
        ];

    if (this.corralBar) {
        this.corralBar.destroy();
    }

    this.corralBar = new Morph();
    this.corralBar.color = this.frameColor;
    this.corralBar.setHeight(this.logo.height()); // height is fixed
    this.add(this.corralBar);

    // new sprite button
    newbutton = new PushButtonMorph(
        this,
        "addNewSprite",
        new SymbolMorph("turtle", 14)
    );
    newbutton.corner = 12;
    newbutton.color = colors[0];
    newbutton.highlightColor = colors[1];
    newbutton.pressColor = colors[2];
    newbutton.labelMinExtent = new Point(36, 18);
    newbutton.padding = 0;
    newbutton.labelShadowOffset = new Point(-1, -1);
    newbutton.labelShadowColor = colors[1];
    newbutton.labelColor = this.buttonLabelColor;
    newbutton.contrast = this.buttonContrast;
    //newbutton.drawNew();
    newbutton.hint = "add a new Turtle sprite";
    //newbutton.fixLayout();
    newbutton.setCenter(this.corralBar.center());
    newbutton.setLeft(this.corralBar.left() + padding);
    //this.corralBar.add(newbutton);

    paintbutton = new PushButtonMorph(
        this,
        "paintNewSprite",
        new SymbolMorph("brush", 15)
    );
    paintbutton.corner = 12;
    paintbutton.color = colors[0];
    paintbutton.highlightColor = colors[1];
    paintbutton.pressColor = colors[2];
    paintbutton.labelMinExtent = new Point(36, 18);
    paintbutton.padding = 0;
    paintbutton.labelShadowOffset = new Point(-1, -1);
    paintbutton.labelShadowColor = colors[1];
    paintbutton.labelColor = this.buttonLabelColor;
    paintbutton.contrast = this.buttonContrast;
    //paintbutton.drawNew();
    paintbutton.hint = "paint a new sprite";
    //paintbutton.fixLayout();
    paintbutton.setCenter(this.corralBar.center());
    paintbutton.setLeft(
        this.corralBar.left() + padding + newbutton.width() + padding
    );
	
    //this.corralBar.add(paintbutton);  
    xlabel = new StringMorph(
            "X: 0",
            24,
            'sans-serif',
            true,
            false,
            false,
            MorphicPreferences.isFlat ? null : new Point(2, 1),
            this.frameColor.darker(this.buttonContrast)
        );
  
    xlabel.color = this.buttonLabelColor;
    xlabel.drawNew();
    xlabel.setLeft(
        this.corralBar.left() + padding + (newbutton.width() + padding)*2
    );
  
    this.corralBar.add(xlabel)

    ylabel = new StringMorph(
            "Y: 0",
            24,
            'sans-serif',
            true,
            false,
            false,
            MorphicPreferences.isFlat ? null : new Point(2, 1),
            this.frameColor.darker(this.buttonContrast)
        );
    ylabel.color = this.buttonLabelColor;
    ylabel.drawNew();
    ylabel.setLeft(
        this.corralBar.left() + padding + (newbutton.width() + padding)*2 + 100
    );
  
    this.corralBar.add(ylabel)
    
    this.corralBar.step = function() {
      this.parent.updateCorralBar();
    }
  
  
};



IDE_Morph.prototype.updateCorralBar = function () {
   
   var MouseX = this.stage.reportMouseX();
   var MouseY = this.stage.reportMouseY();
    Morph.prototype.trackChanges = false;
   if(this.isSmallStage ||
      MouseX > StageMorph.prototype.dimensions.x / 2 ||
      MouseY > StageMorph.prototype.dimensions.y / 2 ||
      MouseX < StageMorph.prototype.dimensions.x / -2 ||
      MouseY < StageMorph.prototype.dimensions.y / -2) 
   {
     this.corralBar.children[0].text = "";
     this.corralBar.children[1].text = "";     
   } else {
     this.corralBar.children[0].text = "X: " + Math.round(this.stage.reportMouseX() / coordinateScale);
     this.corralBar.children[1].text = "Y: " + Math.round(this.stage.reportMouseY() / coordinateScale);
   }
   Morph.prototype.trackChanges = true;
	 
   //update only if the coordinates have changed to save CPU
   if(this.corralBarOldX != this.corralBar.children[0].text || this.corralBarOldY != this.corralBar.children[1].text)
   {
     this.corralBarOldX = this.corralBar.children[0].text;
     this.corralBarOldY = this.corralBar.children[1].text;
     this.corralBar.children[0].drawNew();
     this.corralBar.children[1].drawNew();
	   
     this.corralBar.changed();
   }
    
};

//override block positioning
SpriteMorph.prototype.blockTemplates = function (category) {
    var blocks = [], myself = this, varNames, button,
        cat = 'motion', txt;

    function block(selector) {
        if (StageMorph.prototype.hiddenPrimitives[selector]) {
            return null;
        }
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        return newBlock;
    }

    function variableBlock(varName) {
        var newBlock = SpriteMorph.prototype.variableBlock(varName);
        newBlock.isDraggable = false;
        newBlock.isTemplate = true;
        return newBlock;
    }

    function watcherToggle(selector) {
        if (StageMorph.prototype.hiddenPrimitives[selector]) {
            return null;
        }
        var info = SpriteMorph.prototype.blocks;
        return new ToggleMorph(
            'checkbox',
            this,
            function () {
                myself.toggleWatcher(
                    selector,
                    localize(info.spec),
                    myself.blockColor[info.category]
                );
            },
            null,
            function () {
                return myself.showingWatcher(selector);
            },
            null
        );
    }

    function variableWatcherToggle(varName) {
        return new ToggleMorph(
            'checkbox',
            this,
            function () {
                myself.toggleVariableWatcher(varName);
            },
            null,
            function () {
                return myself.showingVariableWatcher(varName);
            },
            null
        );
    }

    function helpMenu() {
        var menu = new MenuMorph(this);
        menu.addItem('help...', 'showHelp');
        return menu;
    }

    if (cat === 'motion') {

    //} else if (cat === 'control') {

        blocks.push(block('receiveGo'));
        blocks.push(block('receiveKey'));
        blocks.push(block('receiveClick'));
        blocks.push(block('receiveMessage'));
        blocks.push('-');
        blocks.push(block('doBroadcast'));
        blocks.push(block('doBroadcastAndWait'));
        blocks.push(watcherToggle('getLastMessage'));
        blocks.push(block('getLastMessage'));
        blocks.push('-');
        blocks.push(block('doWarp'));
        blocks.push('-');
        blocks.push(block('doWait'));
        blocks.push(block('doWaitUntil'));
        blocks.push('-');
        blocks.push(block('doForever'));
        blocks.push(block('doUntil'));
        blocks.push('-');
        blocks.push(block('doIf'));
        blocks.push(block('doIfElse'));
        blocks.push('-');
        blocks.push(block('doReport'));
        blocks.push('-');
		
		
        blocks.push(block('forward'));
        blocks.push(block('turn'));
        blocks.push(block('turnLeft'));
        blocks.push('-');
        blocks.push(block('setHeading'));
        blocks.push(block('doFaceTowards'));
        blocks.push('-');
        blocks.push(block('gotoXY'));
        blocks.push(block('doGotoObject'));
        blocks.push(block('doGlide'));
        blocks.push('-');
        blocks.push(block('changeXPosition'));
        blocks.push(block('setXPosition'));
        blocks.push(block('changeYPosition'));
        blocks.push(block('setYPosition'));
        blocks.push('-');
        blocks.push(block('bounceOffEdge'));
        blocks.push('-');
        blocks.push(watcherToggle('xPosition'));
        blocks.push(block('xPosition'));
        blocks.push(watcherToggle('yPosition'));
        blocks.push(block('yPosition'));
        blocks.push(watcherToggle('direction'));
        blocks.push(block('direction'));

    //} else if (cat === 'looks') {

        blocks.push(block('doSwitchToCostume'));
        blocks.push(block('doWearNextCostume'));
        blocks.push(watcherToggle('getCostumeIdx'));
        blocks.push(block('getCostumeIdx'));
        blocks.push('-');
        blocks.push(block('doSayFor'));
        blocks.push(block('bubble'));
        blocks.push(block('doThinkFor'));
        blocks.push(block('doThink'));
        blocks.push('-');
        blocks.push(block('changeEffect'));
        blocks.push(block('setEffect'));
        blocks.push(block('clearEffects'));
        blocks.push('-');
        blocks.push(block('changeScale'));
        blocks.push(block('setScale'));
        blocks.push(watcherToggle('getScale'));
        blocks.push(block('getScale'));
        blocks.push('-');
        blocks.push(block('show'));
        blocks.push(block('hide'));
        blocks.push('-');
        blocks.push(block('comeToFront'));
        blocks.push(block('goBack'));

    // for debugging: ///////////////
/*
        if (this.world().isDevMode) {
            blocks.push('-');
            txt = new TextMorph(localize(
                'development mode \ndebugging primitives:'
            ));
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(block('reportCostumes'));
            blocks.push('-');
            blocks.push(block('log'));
            blocks.push(block('alert'));
        }
*/
    /////////////////////////////////

    //} else if (cat === 'sound') {

        blocks.push(block('playSound'));
        blocks.push(block('doPlaySoundUntilDone'));
        blocks.push(block('doStopAllSounds'));
        blocks.push('-');
        blocks.push(block('doSetVolume'));
        blocks.push(block('doChangeVolume'));
        blocks.push(watcherToggle('reportVolume'));
        blocks.push(block('reportVolume'));
        blocks.push('-');
        blocks.push(block('doRest'));
        blocks.push('-');
        blocks.push(block('doPlayNote'));
        blocks.push('-');
        blocks.push(block('doChangeTempo'));
        blocks.push(block('doSetTempo'));
        blocks.push(watcherToggle('getTempo'));
        blocks.push(block('getTempo'));

    // for debugging: ///////////////
/*
        if (this.world().isDevMode) {
            blocks.push('-');
            txt = new TextMorph(localize(
                'development mode \ndebugging primitives:'
            ));
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(block('reportSounds'));
        }
*/
    //} else if (cat === 'pen') {

        blocks.push(block('clear'));
        blocks.push(block('doRepeat'));
        blocks.push('-');
        blocks.push(block('down'));
        blocks.push(block('up'));
        blocks.push('-');
        blocks.push(block('setColor'));
        blocks.push(block('changeHue'));
        blocks.push(block('setHue'));
        blocks.push(watcherToggle('penColor'))
        blocks.push(block('penColor'))
        blocks.push('-');
        blocks.push(block('changeBrightness'));
        blocks.push(block('setBrightness'));
        blocks.push('-');
        blocks.push(block('changeSize'));
        blocks.push(block('setSize'));
        blocks.push(watcherToggle('penSize'));
        blocks.push(block('penSize'))
        blocks.push('-');
        blocks.push(block('setBorderHue'));
        blocks.push(watcherToggle('penBorderColor'))
        blocks.push(block('penBorderColor'))
        blocks.push('-');
        blocks.push(block('setBorderSize'));
        blocks.push(watcherToggle('penBorderSize'));
        blocks.push(block('penBorderSize'))
        blocks.push('-');
        blocks.push(block('doStamp'));
        blocks.push(block('smoothBorders'));

    /*
    // old STOP variants, migrated to a newer version, now redundant
        blocks.push(block('doStopBlock'));
        blocks.push(block('doStop'));
        blocks.push(block('doStopAll'));
    */
        blocks.push(block('doStopThis'));
        blocks.push(block('doStopOthers'));
        blocks.push('-');
        blocks.push(block('doRun'));
        blocks.push(block('fork'));
        blocks.push(block('evaluate'));
        blocks.push('-');
    /*
    // list variants commented out for now (redundant)
        blocks.push(block('doRunWithInputList'));
        blocks.push(block('forkWithInputList'));
        blocks.push(block('evaluateWithInputList'));
        blocks.push('-');
    */
        blocks.push(block('doCallCC'));
        blocks.push(block('reportCallCC'));
        blocks.push('-');
        blocks.push(block('receiveOnClone'));
        blocks.push(block('createClone'));
        blocks.push(block('removeClone'));
        blocks.push('-');
        blocks.push(block('doPauseAll'));
        blocks.push('-');
        blocks.push(block('openWebsite'));

    //} else if (cat === 'sensing') {

        blocks.push(block('reportTouchingObject'));
        blocks.push(block('reportTouchingColor'));
        blocks.push(block('reportColorIsTouchingColor'));
        blocks.push('-');
        blocks.push(block('doAsk'));
        blocks.push(watcherToggle('getLastAnswer'));
        blocks.push(block('getLastAnswer'));
        blocks.push('-');
        blocks.push(watcherToggle('reportMouseX'));
        blocks.push(block('reportMouseX'));
        blocks.push(watcherToggle('reportMouseY'));
        blocks.push(block('reportMouseY'));
        blocks.push(block('reportMouseDown'));
        blocks.push('-');
        blocks.push(block('reportKeyPressed'));
        blocks.push('-');
        blocks.push(block('reportDistanceTo'));
        blocks.push('-');
        blocks.push(block('doResetTimer'));
        blocks.push(watcherToggle('getTimer'));
        blocks.push(block('getTimer'));
        blocks.push('-');
        blocks.push(block('reportAttributeOf'));
        blocks.push('-');
        blocks.push(block('reportURL'));
        blocks.push('-');
        blocks.push(block('reportIsFastTracking'));
        blocks.push(block('doSetFastTracking'));
        blocks.push('-');
        blocks.push(block('reportDate'));

    // for debugging: ///////////////
/*
        if (this.world().isDevMode) {

            blocks.push('-');
            txt = new TextMorph(localize(
                'development mode \ndebugging primitives:'
            ));
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(block('colorFiltered'));
            blocks.push(block('reportStackSize'));
            blocks.push(block('reportFrameCount'));
        }
*/
    //} else if (cat === 'operators') {

        //blocks.push(block('reifyScript'));
        //blocks.push(block('reifyReporter'));
        //blocks.push(block('reifyPredicate'));
        //blocks.push('#');
        blocks.push('-');
        blocks.push(block('reportSum'));
        blocks.push(block('reportDifference'));
        blocks.push(block('reportProduct'));
        blocks.push(block('reportQuotient'));
        blocks.push('-');
        blocks.push(block('reportModulus'));
        blocks.push(block('reportRound'));
        blocks.push(block('reportMonadic'));
        blocks.push(block('reportRandom'));
        blocks.push('-');
        blocks.push(block('reportLessThan'));
        blocks.push(block('reportEquals'));
        blocks.push(block('reportGreaterThan'));
        blocks.push('-');
        blocks.push(block('reportAnd'));
        blocks.push(block('reportOr'));
        blocks.push(block('reportNot'));
        blocks.push('-');
        blocks.push(block('reportTrue'));
        blocks.push(block('reportFalse'));
        blocks.push('-');
        blocks.push(block('reportJoinWords'));
        blocks.push(block('reportTextSplit'));
        blocks.push(block('reportLetter'));
        blocks.push(block('reportStringSize'));
        blocks.push('-');
        blocks.push(block('reportUnicode'));
        blocks.push(block('reportUnicodeAsLetter'));
        blocks.push('-');
        blocks.push(block('reportIsA'));
        blocks.push(block('reportIsIdentical'));

    // for debugging: ///////////////
/*
        if (this.world().isDevMode) {
            blocks.push('-');
            txt = new TextMorph(
                'development mode \ndebugging primitives:'
            );
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(block('reportTypeOf'));
            blocks.push(block('reportTextFunction'));
        }
*/
    /////////////////////////////////

    //} else if (cat === 'variables') {
		if (makeAVar)
		{
			button = new PushButtonMorph(
				null,
				function () {
					new VariableDialogMorph(
						null,
						function (pair) {
							if (pair && !myself.variables.silentFind(pair[0])) {
							myself.currentSprite.addVariable(pair[0], pair[1]);
							myself.currentSprite.toggleVariableWatcher(pair[0], pair[1]);
							myself.currentSprite.parentThatIsA(IDE_Morph).refreshPalette();
							}
						},
						myself
					).prompt(
						'Variable name',
						null,
						myself.world()
					);
				},
				'Make a variable'
			);
			button.userMenu = helpMenu;
			button.selector = 'addVariable';
			button.showHelp = BlockMorph.prototype.showHelp;
			blocks.push(button);
		}

        if (makeAVar && this.variables.allNames().length > 0) {
            button = new PushButtonMorph(
                null,
                function () {
                    var menu = new MenuMorph(
                        myself.deleteVariable,
                        null,
                        myself
                    );
                    myself.variables.allNames().forEach(function (name) {
                        menu.addItem(name, name);
                    });
                    menu.popUpAtHand(myself.world());
                },
                'Delete a variable'
            );
            button.userMenu = helpMenu;
            button.selector = 'deleteVariable';
            button.showHelp = BlockMorph.prototype.showHelp;
            blocks.push(button);
        }

        blocks.push('-');

        varNames = this.variables.allNames();
        if (varNames.length > 0) {
            varNames.forEach(function (name) {
                blocks.push(variableWatcherToggle(name));
                blocks.push(variableBlock(name));
            });
            blocks.push('-');
        }

        blocks.push(block('doSetVar'));
        blocks.push(block('doChangeVar'));
        blocks.push(block('doShowVar'));
        blocks.push(block('doHideVar'));
        blocks.push(block('doDeclareVariables'));

        blocks.push('=');

        blocks.push(block('reportNewList'));
        blocks.push('-');
        blocks.push(block('reportCONS'));
        blocks.push(block('reportListItem'));
        blocks.push(block('reportCDR'));
        blocks.push('-');
        blocks.push(block('reportListLength'));
        blocks.push(block('reportListContainsItem'));
        blocks.push('-');
        blocks.push(block('doAddToList'));
        blocks.push(block('doDeleteFromList'));
        blocks.push(block('doInsertInList'));
        blocks.push(block('doReplaceInList'));

    // for debugging: ///////////////
/*
        if (this.world().isDevMode) {
            blocks.push('-');
            txt = new TextMorph(localize(
                'development mode \ndebugging primitives:'
            ));
            txt.fontSize = 9;
            txt.setColor(this.paletteTextColor);
            blocks.push(txt);
            blocks.push('-');
            blocks.push(block('reportMap'));
        }
*/
    /////////////////////////////////

        blocks.push('=');

        if (StageMorph.prototype.enableCodeMapping) {
            blocks.push(block('doMapCodeOrHeader'));
            blocks.push(block('doMapStringCode'));
            blocks.push(block('doMapListCode'));
            blocks.push('-');
            blocks.push(block('reportMappedCode'));
            blocks.push('=');
        }
		
		if (makeAVar)
		{
			button.userMenu = helpMenu;
			button.selector = 'addCustomBlock';
			button.showHelp = BlockMorph.prototype.showHelp;
			blocks.push(button);
		}
    }
    this.categories.forEach(function (cate){
		if(typeof SpriteMorph.prototype._blockTemplates[cate] !== 'undefined') {
			for(var i=0; i < SpriteMorph.prototype._blockTemplates[cate].length; i += 1) {
				var bb = SpriteMorph.prototype._blockTemplates[cate][i]
				blocks.push(block(bb));
			}
		}
    });
    return blocks;
};
//override hiding blocks
BlockMorph.prototype.hidePrimitive = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        cat;
    if (!ide) {return; }
    StageMorph.prototype.hiddenPrimitives[this.selector] = true;
    cat = {
        doWarp: 'control',
        reifyScript: 'operators',
        reifyReporter: 'operators',
        reifyPredicate: 'operators',
        doDeclareVariables: 'variables'
    }[this.selector] || this.category;
    if (cat === 'lists') {cat = 'variables'; }
    ide.flushBlocksCache(null);//changed this to null
    ide.refreshPalette();
};
SpriteMorph.prototype.freshPalette = function (category) {
	if(!hideLeft)
	{
		var palette = new ScrollFrameMorph(null, null, this.sliderColor),
			unit = SyntaxElementMorph.prototype.fontSize,
			x = 0,
			y = 5,
			ry = 0,
			blocks,
			hideNextSpace = false,
			myself = this,
			stage = this.parentThatIsA(StageMorph),
			oldFlag = Morph.prototype.trackChanges;

		Morph.prototype.trackChanges = false;

		palette.owner = this;
		palette.padding = unit / 2;
		palette.color = this.paletteColor;
		palette.growth = new Point(0, MorphicPreferences.scrollBarSize);

		// menu:

		palette.userMenu = function () {
			var menu = new MenuMorph(),
				ide = this.parentThatIsA(IDE_Morph),
				more = {
					operators:
						['reifyScript', 'reifyReporter', 'reifyPredicate'],
					control:
						['doWarp'],
					variables:
						[
							'doDeclareVariables',
							'reportNewList',
							'reportCONS',
							'reportListItem',
							'reportCDR',
							'reportListLength',
							'reportListContainsItem',
							'doAddToList',
							'doDeleteFromList',
							'doInsertInList',
							'doReplaceInList'
						]
				};

			function hasHiddenPrimitives() {
				var defs = SpriteMorph.prototype.blocks,
					hiddens = StageMorph.prototype.hiddenPrimitives;
				return Object.keys(hiddens).some(function (any) {
					return defs[any].category === category ||
						contains((more[category] || []), any);
				});
			}

			function canHidePrimitives() {
				return palette.contents.children.some(function (any) {
					return contains(
						Object.keys(SpriteMorph.prototype.blocks),
						any.selector
					);
				});
			}

			if (canHidePrimitives()) {
				menu.addItem(
					'hide primitives',
					function () {
						var defs = SpriteMorph.prototype.blocks;
						Object.keys(defs).forEach(function (sel) {
							if (defs[sel].category === category) {
								StageMorph.prototype.hiddenPrimitives[sel] = true;
							}
						});
						(more[category] || []).forEach(function (sel) {
							StageMorph.prototype.hiddenPrimitives[sel] = true;
						});
						ide.flushBlocksCache(category);
						ide.refreshPalette();
					}
				);
			}
			if (hasHiddenPrimitives()) {
				menu.addItem(
					'show primitives',
					function () {
						var hiddens = StageMorph.prototype.hiddenPrimitives,
							defs = SpriteMorph.prototype.blocks;
						Object.keys(hiddens).forEach(function (sel) {
							if (defs[sel].category === category) {
								delete StageMorph.prototype.hiddenPrimitives[sel];
							}
						});
						(more[category] || []).forEach(function (sel) {
							delete StageMorph.prototype.hiddenPrimitives[sel];
						});
						ide.flushBlocksCache(category);
						ide.refreshPalette();
					}
				);
			}
			return menu;
		};

		// primitives:

		blocks = this.blocksCache[category];
		if (!blocks) {
			blocks = myself.blockTemplates(category);
			if (this.isCachingPrimitives) {
				myself.blocksCache[category] = blocks;
			}
		}

		blocks.forEach(function (block) {
			if (block === null) {
				return;
			}
			if (block === '-') {
				if (hideNextSpace) {return; }
				y += unit * 0.8;
				hideNextSpace = true;
			} else if (block === '=') {
				if (hideNextSpace) {return; }
				y += unit * 1.6;
				hideNextSpace = true;
			} else if (block === '#') {
				x = 0;
				y = ry;
			} else {
				hideNextSpace = false;
				if (x === 0) {
					y += unit * 0.3;
				}
				block.setPosition(new Point(x, y));
				palette.addContents(block);
				if (block instanceof ToggleMorph
						|| (block instanceof RingMorph)) {
					x = block.right() + unit / 2;
					ry = block.bottom();
				} else {
					if (block.fixLayout) {block.fixLayout(); }
					x = 0;
					y += block.height();
				}
			}
		});

		// global custom blocks:

		if (stage) {
			y += unit * 1.6;

			stage.globalBlocks.forEach(function (definition) {
				var block;
				block = definition.templateInstance();
				y += unit * 0.3;
				block.setPosition(new Point(x, y));
				palette.addContents(block);
				x = 0;
				y += block.height();
			});
		}

		// local custom blocks:

		y += unit * 1.6;
		this.customBlocks.forEach(function (definition) {
			var block;
			block = definition.templateInstance();
			y += unit * 0.3;
			block.setPosition(new Point(x, y));
			palette.addContents(block);
			x = 0;
			y += block.height();
		});

		Morph.prototype.trackChanges = oldFlag;
		return palette;
	}
};
IDE_Morph.prototype.rawOpenProjectString = function (str) {
    //this.toggleAppMode(false);
    this.spriteBar.tabBar.tabTo('scripts');
    StageMorph.prototype.hiddenPrimitives = {};
    StageMorph.prototype.codeMappings = {};
    StageMorph.prototype.codeHeaders = {};
    StageMorph.prototype.enableCodeMapping = false;
    if (Process.prototype.isCatchingErrors) {
        try {
            this.serializer.openProject(this.serializer.load(str), this);
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        this.serializer.openProject(this.serializer.load(str), this);
    }
    this.stopFastTracking();
};

IDE_Morph.prototype.loadNewSet = function (str){
  var request = new XMLHttpRequest ();
  request.onload = function () {
    world.children[0].partial_load_xml(this.responseText);
  };
  request.open("get", str, true);
  request.send();
};

IDE_Morph.prototype.partial_load_xml = function (answer){
  var ownXML;
  if (ownXML === undefined) {
    ownXML = world.children[0].export_project_xml();
  }
  var myXML = $.parseXML(ownXML);
  var otherXML = $.parseXML(answer);
  var oldHidden = $(myXML).find('hidden').text().split(' ');
  var oldBlockDefinitions = $(myXML).find('blocks').last().find('block-definition').toArray();
  var newHidden = $(otherXML).find('hidden').text().split(' ');
  var newBlockDefinitions = $(otherXML).find('blocks').last().find('block-definition').toArray();
  var newBlocks = [];
  for (var i in oldHidden) {
    if (newHidden.indexOf(oldHidden[i]) === -1) {
      newBlocks.push(oldHidden[i]);
    }
  }
  $(myXML).find('hidden').text($(otherXML).find('hidden').text());
  var project = myXML.getElementsByTagName('project')[0];
  var blocks = myXML.getElementsByTagName('blocks')[myXML.getElementsByTagName('blocks').length-1];
  var newBlocksNode = myXML.createElement('new');
  newBlocksNode.appendChild(myXML.createTextNode(newBlocks.join(' ')));
  project.appendChild(newBlocksNode);
  for (var i = 0; i<newBlockDefinitions.length; i++) {
	found = false;
	for (var j = 0; j<oldBlockDefinitions.length; j++) {
      if (oldBlockDefinitions[j].getAttribute('s') === newBlockDefinitions[i].getAttribute('s')) {
		found = true;
	  }
	}
    if (!found && typeof(newBlockDefinitions[i]) === 'object') {
      blocks.appendChild(newBlockDefinitions[i]);
    }
  }
  if(loadNewVariables)
  {
	  var oldVariables = $(myXML).find('variables').find('variable');
	  var newVariables = $(otherXML).find('variables').find('variable');
	  var variables = myXML.getElementsByTagName('variables')[myXML.getElementsByTagName('variables').length-1];
	  for (var i = 0; i<newVariables.length; i++) {
		  found = false;
		  for (var j = 0; j<oldVariables.length; j++) {
			if (oldVariables[j].getAttribute('name') === newVariables[i].getAttribute('name')) {
			  found = true;
			}
		  }
		  if(!found)
		  {
			variables.appendChild(newVariables[i]);
		  }
	  }
	  loadNewVariables = false;
  }
  var str = world.children[0].xmlToString(myXML);
  world.children[0].load_project_xml(str);
  return str;
};
IDE_Morph.prototype.export_project_xml = function (){
  return world.children[0].export_project_xml();
};
IDE_Morph.prototype.exportProjectToStr = function () {
    return world.children[0].serializer.serialize(this.stage);
};
IDE_Morph.prototype.export_project_xml = function (xml){
    return world.children[0].exportProjectToStr ();
};
IDE_Morph.prototype.xmlToString = function (xmlData){

    var xmlString;
    //IE
    if (window.ActiveXObject){
        xmlString = xmlData.xml;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else{
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
    }
    return xmlString;
};
IDE_Morph.prototype.load_project_xml = function (text){
  return world.children[0].droppedText(text);
};
CustomCommandBlockMorph.prototype.userMenu = function () {
    var menu;

    if (this.isPrototype) {
        menu = new MenuMorph(this);
        menu.addItem(
            "script pic...",
            function () {
                window.open(this.topBlock().fullImage().toDataURL());
            },
            'open a new window\nwith a picture of this script'
        );
    } else {
        menu = this.constructor.uber.userMenu.call(this);
        if (!menu) {
            menu = new MenuMorph(this);
        } else {
            menu.addLine();
        }
        // menu.addItem("export definition...", 'exportBlockDefinition');
        menu.addItem("delete block definition...", 'deleteBlockDefinition');
        menu.addItem("hide", 'hidePrimitive');
    }
    menu.addItem("edit...", 'edit'); // works also for prototypes
    return menu;
};
CustomCommandBlockMorph.prototype.hideBlockDefinition = function () {
    this.isVisible = false;
    this.changed();
    this.children.forEach(function (child) {
        child.hide();
    });
};
IDE_Morph.prototype.refreshPalette = function (shouldIgnorePosition) {
    if(!hideLeft&&this.palette.contents)
	{
		var oldTop = this.palette.contents.top();
		this.createPalette();
		this.fixLayout('refreshPalette');
		if (!shouldIgnorePosition) {
			this.palette.contents.setTop(oldTop);
		}
	}
	else this.palette.contents = null;
};
IDE_Morph.prototype.loadComplete = function (str){
  var request = new XMLHttpRequest ();
  request.onload = function () {
    world.children[0].droppedText(this.responseText);
  };
  request.open("get", str, true);
  request.send();
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
IDE_Morph.prototype.updateCorralBar = function () {
   
   var MouseX = this.stage.reportMouseX();
   var MouseY = this.stage.reportMouseY();
   Morph.prototype.trackChanges = false;
   if(this.isSmallStage ||
      MouseX > StageMorph.prototype.dimensions.x / 2 ||
      MouseY > StageMorph.prototype.dimensions.y / 2 ||
      MouseX < StageMorph.prototype.dimensions.x / -2 ||
      MouseY < StageMorph.prototype.dimensions.y / -2) 
   {
     this.corralBar.children[0].text = "";
     this.corralBar.children[1].text = "";     
   } else {
     this.corralBar.children[0].text = "X: " + Math.round(this.stage.reportMouseX() / (coordinateScale * 1.369));
     this.corralBar.children[1].text = "Y: " + Math.round(this.stage.reportMouseY() / (coordinateScale * 0.733));
   }

   this.corralBar.children[0].drawNew();
   this.corralBar.children[1].drawNew();
   Morph.prototype.trackChanges = true;
   this.corralBar.changed();
  
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

var btns = window.parent.document.getElementsByClassName("CSnapLoadBtn");
for(i = 0; i<btns.length; i++)
{
    btns[i].onclick = function(event){
		if(event.srcElement.getAttribute("value")){
			AsignSettings(event.srcElement);
		}
		
		if(event.srcElement.getAttribute("name"))
		{
			FirstCostume = true;
			if(event.srcElement.getAttribute("value").includes('ReplaceScript'))
				world.children[0].loadComplete(event.srcElement.getAttribute("name"));
			else
				world.children[0].loadNewSet(event.srcElement.getAttribute("name"));
		}
		
		//scroll
		scrollToLocation(event.srcElement.href);
		
		var fixBackgrounds = window.parent.document.getElementsByClassName("CSnapLoadBtn");
		for(j = 0; j<fixBackgrounds.length; j++)
		{
			if(event.srcElement.href != undefined && event.srcElement.href!=fixBackgrounds[j].href)
				fixBackgrounds[j].style.backgroundColor = "#fff";
		}
		event.srcElement.style.backgroundColor = "#ebebeb";
		return false;
	};
	
	if(btns[i].getAttribute("value")&&btns[i].getAttribute("value").includes('First'))
	{
		AsignSettings(btns[i]);
	}
}
function setScrollPos(){
	var doc = window.parent.document.documentElement;
	top = (window.parent.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
}
function Unscroll(){
	$(window.parent).scrollTop(top);
}
function scrollToLocation(loc){
	window.parent.onload = null;
	window.parent.onscroll = null;
	var doc = window.parent.document.documentElement;
	top = (window.parent.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
	
	if(!(loc == undefined))
	{
		window.parent.location.href = loc;
	}
	$(window.parent).scrollTop(top);
	window.parent.onload = setScrollPos;
	window.parent.onscroll = setScrollPos;
}
function AsignSettings(btn){
	if(btn.getAttribute("value").includes('EnableMakeAVar')) makeAVar=true;
	if(btn.getAttribute("value").includes('CheatFullScreen'))
	{
        try {
            window.parent.document.getElementsByClassName('container')[1].setAttribute('style','width: 100%');
            window.parent.document.getElementsByClassName('container')[2].setAttribute('style','width: 100%');
            window.parent.document.getElementsByClassName('column-left')[0].setAttribute('style','width: 40%');
            window.parent.document.getElementsByClassName('column-right')[0].setAttribute('style','width: 60%');
            window.parent.document.getElementById('CMS_Menu').children[0].setAttribute('style', 'width:100%')
        }
        catch (e) {
        }
	}
	if(btn.getAttribute("value").includes('DisableMakeAVar')) makeAVar=false;
	if(btn.getAttribute("value").includes('ShowCostumesTab')) {
		showCostumesTab=true;
		world.children[0].createSpriteBar();
	}
	if(btn.getAttribute("value").includes('HideCostumesTab')) {
		showCostumesTab=false;
		world.children[0].createSpriteBar();
	}
	if(btn.getAttribute("value").includes('HideLeft')){
		hideLeft=true;
		world.children[0].createPalette();
	}
	if(btn.getAttribute("value").includes('ShowLeft'))
	{
		hideLeft=false;
		world.children[0].createPalette();
	}
	if(btn.getAttribute("value").includes('HideFrame'))
	{
		window.parent.$('#CSnapFrame').hide()
	}
	if(btn.getAttribute("value").includes('ShowFrame'))
	{
		window.parent.$('#CSnapFrame').show()
	}
	if(btn.getAttribute("value").includes('LoadNewVariables'))
	{
		loadNewVariables = true;
	}
	if(btn.getAttribute("value").includes('LoadNewVariables'))CheatFullScreen
	{
		loadNewVariables = true;
	}
}
window.click += Unscroll;
window.parent.onload = setScrollPos;
window.parent.onscroll = setScrollPos;
window.onmousedown = Unscroll;
window.parent.document.getElementById('openModalBtn').click();
//# sourceURL=code.js