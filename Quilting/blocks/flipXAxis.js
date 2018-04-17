(function () {
    return function () {
		var costume = this.costumes.contents[this.getCostumeIdx()-1],
		canvas = newCanvas(costume.extent()),
		ctx = canvas.getContext('2d'),
    initX = this.xPosition(),
    initY = this.yPosition(),
    initAngle = this.heading;

		ctx.translate(0, costume.height());
		ctx.scale(1, -1);
		ctx.drawImage(costume.contents, 0, 0);
		costume.contents=canvas;
		costume.rotationCenter = new Point(
			   costume.rotationCenter.x,
			   costume.height() - costume.rotationCenter.y
		);

		canvas = newCanvas(costume.extent()),
		ctx = canvas.getContext('2d');
		ctx.putImageData(costume.originalPixels, 0, 0);
		ctx.translate(0, costume.originalPixels.height);
		ctx.scale(1, -1);
		costume.originalPixels=ctx.getImageData(0,0,costume.originalPixels.width,costume.originalPixels.height);

		this.costumes.contents[this.getCostumeIdx()-1] = costume;
		this.costume = costume;
    this.gotoXY(initX, -initY);
		this.setHeading(180-initAngle);
		this.flippedX = !this.flippedX;
		this.isNotFlipBack = !this.isNotFlipBack;
		this.changed();
		this.drawNew();
		this.changed();
    this.positionTalkBubble();
    };
}());

//# sourceURL=reflectX.js
