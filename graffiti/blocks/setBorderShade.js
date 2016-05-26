(function () {
	return function (num) {
      var hsv = this.borderColor.hsv(),
        x = this.xPosition(),
        y = this.yPosition();
			
		//Num goes in 0-100 range. 0 is black, 50 is the unchanged hue, 100 is white
		num = Math.max(Math.min(+num || 0, 100), 0) / 50;
		hsv[1] = 1;
		hsv[2] = 1;

		if(num > 1) {
			hsv[1] = (2 - num); //Make it more white
		}
		else {
			hsv[2] = num; //Make it more black
		}

		this.borderColor.set_hsv.apply(this.borderColor, hsv);
		if (!this.costume) {
			this.drawNew();
			this.changed();
		}
		this.gotoXY(x, y);
	};
}());


//# sourceURL=getBorderShade.js