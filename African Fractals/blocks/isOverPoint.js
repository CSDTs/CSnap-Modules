(function () {
    return function (ListX, ListY, Radii) {
		var mouseX = this.reportMouseX(), mouseY = this.reportMouseY();
        for(i=0; i<ListX.contents.length; i++)
		{
			if(Math.abs(ListX.contents[i]-mouseX)<Radii&&Math.abs(ListY.contents[i]-mouseY)<Radii)
				return i+1;
		}
		return false;
    };
}());


//# sourceURL=isOverPoint.js