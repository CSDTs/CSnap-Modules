(function () {
    return function (baseLength, listOfLengths, listOfExclusions) {
		var floor = 0, ceiling = 10, dimensionApproximation = 0, testValue = 0;
		for(j = 0; j < listOfLengths.length(); j++)
		{
			if(!listOfExclusions.contents[j]) floor =1;
		}
		for(i = 0; i < 20; i++)
		{
			dimensionApproximation = (floor + ceiling)/2;
			testValue = 0;
			for(j = 0; j < listOfLengths.length(); j++)
			{
				if(!listOfExclusions.contents[j]) testValue += Math.pow((listOfLengths.contents[j]/baseLength),dimensionApproximation);
			}
			if( testValue > 1)
			{
				floor = dimensionApproximation;
				
			}
			else
			{
				ceiling = dimensionApproximation;
			}
		}
		return ((floor + ceiling)/2);
			
    };
}());


//# sourceURL=calculateDimension.js