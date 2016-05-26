(function () {
    return function (X, Y, dist) {
		this.gotoXY(Math.cos(-this.direction()*Math.PI/180+Math.PI)*dist + X,Math.sin(-this.direction()*Math.PI/180+Math.PI)*dist + Y);
		return;
	};
}());


//# sourceURL=rotateAroundPoint.js