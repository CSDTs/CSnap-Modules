function Cloud() {
    // If we are logged in, record our username
    if(config.user !== undefined) {
        this.user = config.user;
    }
    if(config.urls !== undefined) {
        if(config.urls.create_project_url !== undefined) {
            this.create_project_url = config.urls.create_project_url;
        }
        if(config.urls.create_file_url !== undefined) {
            this.create_file_url = config.urls.create_file_url;
        }
        if(config.urls.list_project_url !== undefined) {
            this.list_project_url = config.urls.list_project_url;
        }
        if(config.urls.login_url !== undefined) {
            this.login_url = config.urls.login_url
        }
        if(config.urls.user_detail_url !== undefined) {
            this.user_detail_url = config.urls.user_detail_url;
        }
        this.user_api_detail_url = config.urls.user_api_detail_url;
        if(config.urls.project_url_root !== undefined) {
            this.project_url_root = config.urls.project_url_root;
        }
    }
    this.user_id = config.user_id;
    this.classroom_id = 14;
    this.application_id = config.application_id;
}

Cloud.prototype.loggedInCallBack = function(success, failure) {
    if(this.user_id === undefined) {
        world.children[0].initializeCloudCallback(success, failure);
    }
    else
    {
        success();
    }
};

Cloud.prototype.getProjectList = function(callBack, errorCall) {
    var myself=this;
    this.loggedInCallBack(
        function()
        {
            $.get(myself.list_project_url+"?owner="+myself.user_id, null, 
            function(data) {
                callBack(data);
            }, "json").fail(errorCall);
        },
        function()
        {
            return
        }
    );
};
IDE_Morph.prototype.initializeCloudCallback = function (successCallBack, failureCallBack) {
    var myself = this,
        world = this.world();
    new DialogBoxMorph(
        null,
        function (user) {
            var pwh = hex_sha512(user.password),
                str;
            SnapCloud.login(
                user.username,
                user.password,
                successCallBack,
                failureCallBack
            );
        }
    ).withKey('cloudlogin').promptCredentials(
        'Sign in',
        'login',
        null,
        null,
        null,
        null,
        'stay signed in on this computer\nuntil logging out',
        world,
        myself.cloudIcon(),
        myself.cloudMsg
    );
};
Cloud.prototype.login = function (
    username,
    password,
    callBack,
    errorCall
) {
    var myself=this;
    var myCallBack = function(data, textStatus, jqXHR) {
        // Update user
         $.ajax({
            dataType: "json",
            url: myself.user_api_detail_url,
            success: function(data) {
                myself.user_id = data.id;
				callBack(data, textStatus);
            }
         });
    };
    $.post(this.login_url, {'login': username, 'password': password}, myCallBack).fail(errorCall);
};
ProjectDialogMorph.prototype.buildContents = function () {
    var thumbnail, notification;

    this.addBody(new Morph());
    this.body.color = this.color;

    this.srcBar = new AlignmentMorph('column', this.padding / 2);

    if (this.ide.cloudMsg) {
        notification = new TextMorph(
            this.ide.cloudMsg,
            10,
            null, // style
            false, // bold
            null, // italic
            null, // alignment
            null, // width
            null, // font name
            new Point(1, 1), // shadow offset
            new Color(255, 255, 255) // shadowColor
        );
        notification.refresh = nop;
        this.srcBar.add(notification);
    }
    
    if(this.task === 'demos'){
        this.addSourceButton('examples', localize('Examples'), 'poster');
    }
    else if(this.task === 'goals'){
        //no source button needed
    }
    else{
        this.addSourceButton('cloud', localize('Cloud'), 'cloud');
        this.addSourceButton('local', localize('Browser'), 'storage');
        if (this.task === 'open') {
            this.addSourceButton('examples', localize('Examples'), 'poster');
        }
    }
    this.srcBar.fixLayout();
    this.body.add(this.srcBar);

    if (this.task === 'save') {
        this.nameField = new InputFieldMorph(this.ide.projectName);
        this.body.add(this.nameField);
    }

    this.listField = new ListMorph([]);
    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.drawNew = InputFieldMorph.prototype.drawNew;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.body.add(this.listField);

    this.preview = new Morph();
    this.preview.fixLayout = nop;
    this.preview.edge = InputFieldMorph.prototype.edge;
    this.preview.fontSize = InputFieldMorph.prototype.fontSize;
    this.preview.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.preview.contrast = InputFieldMorph.prototype.contrast;
    this.preview.drawNew = function () {
        InputFieldMorph.prototype.drawNew.call(this);
        if (this.texture) {
            this.drawTexture(this.texture);
        }
    };
    this.preview.drawCachedTexture = function () {
        var context = this.image.getContext('2d');
        context.drawImage(this.cachedTexture, this.edge, this.edge);
    };
    this.preview.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;
    if(this.task === 'goals'){
        this.preview.setExtent(new Point(250, 250));
    } else{
        this.preview.setExtent(
            this.ide.serializer.thumbnailSize.add(this.preview.edge * 2)
        );
    }

    this.body.add(this.preview);
    this.preview.drawNew();
    if (this.task === 'save') {

    this.body.add(this.listField);
        thumbnail = this.ide.stage.thumbnail(
            SnapSerializer.prototype.thumbnailSize
        );
        this.preview.texture = null;
        this.preview.cachedTexture = thumbnail;
        this.preview.drawCachedTexture();
    }

    this.notesField = new ScrollFrameMorph();
    this.notesField.fixLayout = nop;

    this.notesField.edge = InputFieldMorph.prototype.edge;
    this.notesField.fontSize = InputFieldMorph.prototype.fontSize;
    this.notesField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.notesField.contrast = InputFieldMorph.prototype.contrast;
    this.notesField.drawNew = InputFieldMorph.prototype.drawNew;
    this.notesField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.notesField.acceptsDrops = false;
    this.notesField.contents.acceptsDrops = false;
	
    if (this.task === 'open') {
        this.notesText = new TextMorph('');
    } else { // 'save'
	
		this.classroomListField = new ListMorph([]);
		this.fixClassRoomItemColors();
		this.classroomListField.fixLayout = nop;
		this.classroomListField.edge = InputFieldMorph.prototype.edge;
		this.classroomListField.fontSize = InputFieldMorph.prototype.fontSize;
		this.classroomListField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
		this.classroomListField.contrast = InputFieldMorph.prototype.contrast;
		this.classroomListField.drawNew = InputFieldMorph.prototype.drawNew;
		this.classroomListField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;
		this.classroomListField.acceptsDrops = false;
		this.classroomListField.contents.acceptsDrops = false;
		this.classroomListField.isTextLineWrapping = true;
		this.classroomListField.padding = 3;
		this.classroomListField.setWidth(this.preview.width());
		this.body.add(this.classroomListField);
		
        this.notesText = new TextMorph(this.ide.projectNotes);
        this.notesText.isEditable = true;
        this.notesText.enableSelecting();
    }
	
	this.notesField.isTextLineWrapping = true;
	this.notesField.padding = 3;
	this.notesField.setContents(this.notesText);
	this.notesField.setWidth(this.preview.width());

    this.body.add(this.notesField);
	
    if (this.task === 'open') {
        this.addButton('openProject', 'Open');
        this.action = 'openProject';
    } else if (this.task === 'demos'){
        this.addButton('openProject', 'Open');
        this.action = 'openProject';
    } else if (this.task === 'goals'){
        this.addButton('ok', 'Ok');
        //action needed?
    } else { // 'save'
        this.addButton('saveProject', 'Save');
        this.action = 'saveProject';
    }
    this.shareButton = this.addButton('shareProject', 'Share');
    this.unshareButton = this.addButton('unshareProject', 'Unshare');
    this.shareButton.hide();
    this.unshareButton.hide();
    this.deleteButton = this.addButton('deleteProject', 'Delete');
    this.addButton('cancel', 'Cancel');

    if (notification) {
        this.setExtent(new Point(455, 335).add(notification.extent()));
    } else {
        this.setExtent(new Point(455, 335));
    }

    this.fixLayout();

};
ProjectDialogMorph.prototype.setSource = function (source) {
    var myself = this,
        msg;

    this.source = source; //this.task === 'save' ? 'local' : source;
    this.srcBar.children.forEach(function (button) {
        button.refresh();
    });
    switch (this.source) {
    case 'cloud':
        msg = myself.ide.showMessage('Updating\nproject list...');
        this.projectList = [];
        SnapCloud.getProjectList(
            function (projectList) {
                myself.installCloudProjectList(projectList);
                msg.destroy();
            },
            function (err, lbl) {
                msg.destroy();
                myself.ide.cloudError().call(null, err, lbl);
            }
        );
        this.classroomList = [];
        SnapCloud.getClassroomList( 
            function (classroomList) {
                myself.installCloudClassroomList(classroomList);
                msg.destroy();
            },
            function (err, lbl) {
                msg.destroy();
                myself.ide.cloudError().call(null, err, lbl);
            }
        );
        return;
    case 'examples':
        this.projectList = this.getExamplesProjectList();
        break;
    case 'goals':
        this.projectList = this.getGoalProjectList();
        break;
    case 'local':
        this.projectList = this.getLocalProjectList();
        break;
    }
    this.listField.destroy();
    this.classroomListField.destroy();
	
	if(this.source === 'goals'){
		this.listField = new ListMorph(
			this.projectList, 
			this.projectList.length > 0 ?
					function (element) {
						return element.thumb;
					} : null,
			null,
			function () {myself.ok();}
		);
    
    //We need action declaration here to select default
		this.listField.action = function (item) {
            var img, desc;
            if (item === undefined) {return; }
            if (myself.nameField) {
               myself.nameField.setContents(item.name || '');
            }
			var request = new XMLHttpRequest();
			request.open("GET", config.urls.goals_url, false);
			request.send();
			var JSON_object = JSON.parse(request.responseText);
			for (var i = 0; i < JSON_object.length; i++){
				if(JSON_object[i].name === item.name){
					img = JSON_object[i].img_url;
					desc = JSON_object[i].description;
					myself.notesText.text = desc || '';
					myself.notesText.drawNew();
					myself.notesField.contents.adjustBounds();
					myself.preview.texture = img || null;
					myself.preview.cachedTexture = img;
					myself.preview.drawNew();
					myself.edit();
				}
			}
    };
    this.listField.action(this.listField.elements[0]);
	}
	else{
		this.listField = new ListMorph(
			this.projectList,
			this.projectList.length > 0 ?
					function (element) {
						return element.name;
					} : null,
			null,
			function () {myself.ok(); }
		);
	}
    
    if(this.source === 'save'){
        this.classroomListField = new ListMorph(
            this.classroomList, 
            this.classroomList.length > 0 ?
                    function (element) {
                        return element.team_name;
                    } : null,
            null,
            function () {myself.ok();}
        );
    }

    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.drawNew = InputFieldMorph.prototype.drawNew;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.fixClassRoomItemColors();
    this.classroomListField.fixLayout = nop;
    this.classroomListField.edge = InputFieldMorph.prototype.edge;
    this.classroomListField.fontSize = InputFieldMorph.prototype.fontSize;
    this.classroomListField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.classroomListField.contrast = InputFieldMorph.prototype.contrast;
    this.classroomListField.drawNew = InputFieldMorph.prototype.drawNew;
    this.classroomListField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;
	
    if (this.source === 'local') {
        this.listField.action = function (item) {
            var src, xml;

            if (item === undefined) {return; }
            if (myself.nameField) {
                myself.nameField.setContents(item.name || '');
            }
            if (myself.task === 'open') {

                src = localStorage['-snap-project-' + item.name];
                xml = myself.ide.serializer.parse(src);

                myself.notesText.text = xml.childNamed('notes').contents
                    || '';
                myself.notesText.drawNew();
                myself.notesField.contents.adjustBounds();
                myself.preview.texture = xml.childNamed('thumbnail').contents
                    || null;
                myself.preview.cachedTexture = null;
                myself.preview.drawNew();
            }
            myself.edit();
        };	
    } else if (this.source === 'goals'){
        this.listField.action = function (item) {
            var img, desc;
            if (item === undefined) {return; }
            if (myself.nameField) {
               myself.nameField.setContents(item.name || '');
            }
            var request = new XMLHttpRequest();
            request.open("GET", config.urls.goals_url, false);
            request.send();
            var JSON_object = JSON.parse(request.responseText);
            for (var i = 0; i < JSON_object.length; i++){
                if(JSON_object[i].name === item.name){
                    img = JSON_object[i].img_url;
                    desc = JSON_object[i].description;
                    myself.notesText.text = desc || '';
                    myself.notesText.drawNew();
                    myself.notesField.contents.adjustBounds();
                    myself.preview.texture = img || null;
                    myself.preview.cachedTexture = img;
                    myself.preview.drawNew();
                    myself.edit();
                }
            }
        };
    } else { // 'examples', 'cloud' is initialized elsewhere
        this.listField.action = function (item) {
            var src, xml;
            if (item === undefined) {return; }
            if (myself.nameField) {
                myself.nameField.setContents(item.name || '');
            }
            var request = new XMLHttpRequest();
            request.open("GET", config.urls.demos_url, false);
            request.send();
            var JSON_object = JSON.parse(request.responseText);
            for (var i = 0; i < JSON_object.length; i++){
                if(JSON_object[i]["name"] === item.name){
                    src = myself.ide.getURL(JSON_object[i]["project_url"]);
                }
            }

            xml = myself.ide.serializer.parse(src);
            myself.notesText.text = xml.childNamed('notes').contents
                || '';
            myself.notesText.drawNew();
            myself.notesField.contents.adjustBounds();
            myself.preview.texture = xml.childNamed('thumbnail').contents
                || null;
            myself.preview.cachedTexture = null;
            myself.preview.drawNew();
            myself.edit();
        };
    }
    this.body.add(this.listField);
    this.body.add(this.classroomListField);
    this.shareButton.hide();
    this.unshareButton.hide();
    if (this.source === 'local') {
        this.deleteButton.show();
    } else { // examples
        this.deleteButton.hide();
    }
    this.buttons.fixLayout();
    this.fixLayout();
    if (this.task === 'open') {
        this.clearDetails();
    }
};
ProjectDialogMorph.prototype.installCloudClassroomList = function (cl) {
    var myself = this;
    this.classroomList = cl || [];
    this.classroomList.sort(function (x, y) {
        return x.name < y.name ? -1 : 1;
    });

    this.classroomListField.destroy();
    this.classroomListField = new ListMorph(
        this.classroomList,
        this.classroomList.length > 0 ?
                function (element) {
                    return element.team_name;
                } : null,
        [ // format: display shared project names bold
            [
                'bold',
                function (proj) {return proj.approved === true; }
            ]
        ],
        function () {myself.ok(); }
    );
	this.fixClassRoomItemColors();
    this.classroomListField.fixLayout = nop;
    this.classroomListField.edge = InputFieldMorph.prototype.edge;
    this.classroomListField.fontSize = InputFieldMorph.prototype.fontSize;
    this.classroomListField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.classroomListField.contrast = InputFieldMorph.prototype.contrast;
    this.classroomListField.drawNew = InputFieldMorph.prototype.drawNew;
    this.classroomListField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;
	this.classroomListField.action = function (item) {
        if (item === undefined) {return; }
        if (myself.nameField) {
            myself.classroom_id = item.team;
        }
        myself.buttons.fixLayout();
        myself.fixLayout();
        myself.edit();
    };
	this.classroomListField.select(this.classroomListField.children[0].children[0].children[0],true);
    this.body.add(this.classroomListField);
    this.fixLayout();
};
ProjectDialogMorph.prototype.fixLayout = function () {
    var th = fontHeight(this.titleFontSize) + this.titlePadding * 2,
        thin = this.padding / 2,
        oldFlag = Morph.prototype.trackChanges;
        
    if(this.task === 'goals'){
        this.setExtent(new Point(550, 450));
    }

    Morph.prototype.trackChanges = false;

    if (this.buttons && (this.buttons.children.length > 0)) {
        this.buttons.fixLayout();
    }

    if (this.body) {
        this.body.setPosition(this.position().add(new Point(
            this.padding,
            th + this.padding
        )));
        this.body.setExtent(new Point(
            this.width() - this.padding * 2,
            this.height() - this.padding * 3 - th - this.buttons.height()
        ));
        this.srcBar.setPosition(this.body.position());
        if (this.nameField) {
            this.nameField.setWidth(
                this.body.width() - this.srcBar.width() - this.padding * 6
            );
            this.nameField.setLeft(this.srcBar.right() + this.padding * 3);
            this.nameField.setTop(this.srcBar.top());
            this.nameField.drawNew();
        }

        this.listField.setLeft(this.srcBar.right() + this.padding);
        this.listField.setWidth(
            this.body.width()
                - this.srcBar.width()
                - this.preview.width()
                - this.padding
                - thin
        );
        this.listField.contents.children[0].adjustWidths();

        if (this.nameField) {
            this.listField.setTop(this.nameField.bottom() + this.padding);
            this.listField.setHeight(
                this.body.height() - this.nameField.height() - this.padding
            );
        } else {
            this.listField.setTop(this.body.top());
            this.listField.setHeight(this.body.height());
        }

        this.preview.setRight(this.body.right());
        if (this.nameField) {
            this.preview.setTop(this.nameField.bottom() + this.padding);
        } else {
            this.preview.setTop(this.body.top());
        }

        this.notesField.setTop(this.preview.bottom() + thin);
        this.notesField.setLeft(this.preview.left());
        this.notesField.setHeight(
            this.body.bottom() - this.preview.bottom() - thin
        );
        if(this.classroomListField)
		{
			this.classroomListField.setTop(this.srcBar.bottom() +this.srcBar.height() + thin*2);
			this.classroomListField.setLeft(this.srcBar.left());
			this.classroomListField.setHeight(this.listField.bottom()-this.classroomListField.top());
			this.classroomListField.setWidth(this.srcBar.width());
			this.classroomListField.contents.children[0].adjustWidths();
		}
    }

    if (this.label) {
        this.label.setCenter(this.center());
        this.label.setTop(this.top() + (th - this.label.height()) / 2);
    }

    if (this.buttons && (this.buttons.children.length > 0)) {
        this.buttons.setCenter(this.center());
        this.buttons.setBottom(this.bottom() - this.padding);
    }

    Morph.prototype.trackChanges = oldFlag;
    this.changed();
};

Cloud.prototype.getClassroomList = function(callBack, errorCall) {
	if(!this.loggedIn())
		return;
	$.get("/api/team/?user="+this.user_id, null, 
            function(data) {
                callBack(data);
            }, "json").fail(errorCall);
    
};

ProjectDialogMorph.prototype.fixClassRoomItemColors = function () {
    // remember to always fixLayout() afterwards for the changes
    // to take effect
    var myself = this;
    this.classroomListField.contents.children[0].alpha = 0;
    this.classroomListField.contents.children[0].children.forEach(function (item) {
        item.pressColor = myself.titleBarColor.darker(20);
        item.color = new Color(0, 0, 0, 0);
        item.noticesTransparentClick = true;
    });
};
Cloud.prototype.saveProject = function (ide, callBack, errorCall) {
    if(!this.loggedIn()) {
        return;
    }
    // Helper function, kindly donated by http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
    function dataURItoBlob(dataURI, type) {
        var binary;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            binary = atob(dataURI.split(',')[1]);
        else
            binary = unescape(dataURI.split(',')[1]);
        //var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: type});
    }

    // Get a picture of the stage
    var image_string = ide.stage.fullImageClassic().toDataURL();
    var blob = dataURItoBlob(image_string, 'image/png');
    var image = new FormData();
    image.append('file', blob);
    
    // Get the XML save file
    var xml_string = 'data:text/xml,' + encodeURIComponent(ide.serializer.serialize(ide.stage));
    blob = dataURItoBlob(xml_string, 'text/xml');
    var xml = new FormData();
    xml.append('file', blob);

    var upload_project;

    // Upload the two
    var completed = 0;
    var image_id, xml_id;
    function success(data, textStatus, jqXHR) {
        completed++;
        if(completed == 2) {
            // Upload project, then done
            upload_project();
        }
    }
    //$.post(this.create_file_url, {'file':blob}, success, "json");
    $.ajax({
        type: 'POST',
        url: this.create_file_url,
        data: image,
        processData: false,
        contentType: false,
        success: function(data) {
            completed++;
            image_id = data.id;

            if(completed == 2) {
                upload_project();
            }
        }
    }).fail(errorCall);
    $.ajax({
        type:'POST',
        url: this.create_file_url,
        data: xml,
        processData: false,
        contentType:false,
        success: function(data) {
            completed++;
            xml_id = data.id;

            if(completed == 2) {
                upload_project();
            }
        }
    }).fail(errorCall);


    // Create the actual project
    var create_project_url = this.create_project_url;
    var myself = this;
    upload_project = function() {
        var update_cloud_settings;
        if(myself.project_id !== undefined) {
            $.ajax({
                type: 'PUT',
                url: create_project_url+myself.project_id, 
                data: {
                    name: ide.projectName,
                    description: '',
					classroom: myself.classroom_id,
                    application: myself.application_id,
                    project: xml_id,
                    screenshot: image_id
                }, 
                success: function(data, stuff) {
                  update_cloud_settings(data, stuff);
                },
                dataType: 'json'
            }).fail(errorCall);
        } else {
            $.post(create_project_url, {
                name: ide.projectName,
                description: '',
				classroom: myself.classroom_id,
                application: myself.application_id,
                project: xml_id,
                screenshot: image_id
            }, function(data, stuff) {
                update_cloud_settings(data, stuff);
              }, 'json').fail(errorCall);
        }
        update_cloud_settings = function(data, stuff) {
            myself.project_id = data['id'];
            myself.name = data['name'];
            myself.updateURL(myself.project_url_root + data['id']+'/run');
            callBack(data, stuff);
        }
    }

    // Alert user
};


//# sourceURL=code.js