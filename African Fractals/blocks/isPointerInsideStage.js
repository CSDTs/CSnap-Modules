(function () {
    return function () {
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
}());
 //# sourceURL=isPointerInsideStage.js
 