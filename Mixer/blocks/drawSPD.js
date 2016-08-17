(function () {
    return function (offset) {
    	this.updateFrequencyData();
		var s = this.parentThatIsA(StageMorph), step = s.width()*2/frequencyDataArray.length;
		this.updateFrequencyData();
		this.setXPosition(-s.width()/2);
		this.down();
		for(i = 0; i<frequencyDataArray.length/2; i++)
		{
			this.changeXPosition(step);
			this.setYPosition(Math.sin(2*Math.PI*frequencyDataArray[i]-offset*step));
		}
		this.up();
	};
}());


//# sourceURL=drawSPD.js