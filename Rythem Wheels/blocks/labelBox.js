(function () {
    return function (data, scale) {
    var bubble,
        stage = this.parentThatIsA(StageMorph);

    this.stopTalking();
    if (data === '' || isNil(data)) {return; }
    bubble = new SpriteBubbleMorph(
        data,
        stage ? stage.scale : 1,
        false,
        false
    );
	bubble.isLabel = true;
	bubble.setBorderColor(new Color(0,0,0,0));
	bubble.setColor(new Color(0,0,0,0));
	bubble.setScale(scale)
    this.add(bubble);
    this.positionTalkBubble();
	};
}());

//# sourceURL=labelBox.js