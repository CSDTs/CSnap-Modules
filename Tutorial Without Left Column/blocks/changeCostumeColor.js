(function () {
   return function (col) {
	  if(flippedY)
	  {
		  this.flipYAxis();
		  this.costumes.contents[this.getCostumeIdx()-1].setColor(col);
		  this.flipYAxis();
	  }
	  else
	  {
		  if(flippedX)
		  {
			  this.flipXAxis();
			  this.costumes.contents[this.getCostumeIdx()-1].setColor(col);
			  this.flipXAxis();
		  }
		  else
		  {
			  this.costumes.contents[this.getCostumeIdx()-1].setColor(col);
		  }
	  }
      this.changed();
      this.drawNew();
   };
}());
