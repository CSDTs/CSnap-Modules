Morph.prototype.isTouchingDirection = function (otherMorph) {
    var oImg = this.overlappingImage(otherMorph),
        data = oImg.getContext('2d')
            .getImageData(1, 1, oImg.width, oImg.height)
            .data,
            X = 0, Y = 0, Count = 0;
    list = detectDirection(
        data,
        function (each) {
            return each !== 0;
        }
    );
    if(list == null) return null;
    else 
    {
        for(x = 0; x < oImg.width; x++)
        {
            for(y = 0; y < oImg.height; y++)
            {
                for(c = 1; c <= 4; c++)
                {
                    if(data[c*(x+y*oImg.width)]!=0) 
                    {
                        X += x;
                        Y += y;
                        Count += 1;
                    }
                }
            }
        }
		if(Count == 0) return null;
        return [X/Count-oImg.width/2, Y/Count-oImg.height/2];
    }
};

function detectDirection(list, predicate) {
    // answer the first element of list for which predicate evaluates
    // true, otherwise answer null
    var i, size = list.length, found = false;
    for (i = 0; i < size; i += 1) {
        if (!predicate.call(null, list[i])) {
            list[i] = null;
        }
        else
        {
            found = true;
        }
    }
    if (found) return list;
    else return null;
}

//# sourceURL=code.js