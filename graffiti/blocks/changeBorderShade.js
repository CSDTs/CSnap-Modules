(function () {
	return function (delta) {
		this.setBorderShade(this.getBorderShade() + (+delta || 0));
	};
}());

//# changeShade=code.js