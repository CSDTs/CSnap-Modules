(function () {
    return function (offset) {
    	this.updateFrequencyData();
		var s = this.parentThatIsA(StageMorph), step = s.width()/frequencyDataArray.length;
		this.updateFrequencyData();
		this.setXPosition(-s.width()/2);
		this.down();
		for(i = 0; i<frequencyDataArray.length; i++)
		{
			this.changeXPosition(step);
			this.setYPosition(frequencyDataArray[i]-offset);
		}
		this.up();
	};
}());


//# sourceURL=drawSPD.js