(function () {
    return function (on) {
		if(on)
		{
			this.parentThatIsA(IDE_Morph).startFastTracking();
			return;
		}
		this.parentThatIsA(IDE_Morph).stopFastTracking();
    };
}());


 //# fastTracking.js