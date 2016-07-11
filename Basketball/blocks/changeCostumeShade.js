(function () {
	return function (num) {
		var hsv = this.color.hsv(),
        x = this.xPosition(),
        y = this.yPosition();

		hsv[1] = 1; 
		hsv[2] = Math.max(Math.min(+num || 0, 100), 0) / 100;
		this.color.set_hsv.apply(this.color, hsv);
	};
}());