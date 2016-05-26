(function () {
    return function () {
		var deltaX = this.reportMouseX() - this.xPosition(),
		deltaY = this.reportMouseY() - this.yPosition();
		
		if(deltaX>0)
		{
			return (Math.atan(deltaY/deltaX)*180/Math.PI);
		}
		else if (deltaX === 0)
		{
			if(deltaY>0)
			{
				return 90;
			}
			else
			{
				return -90;
			}
		}
		else
		{
			return (180 + (Math.atan(deltaY/deltaX)*180/Math.PI));
		}
			
    };
}());


//# sourceURL=angleToPointer.js