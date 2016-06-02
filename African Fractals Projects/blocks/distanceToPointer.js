(function () {
    return function () {
        return Math.sqrt(Math.pow(this.xPosition() - this.reportMouseX(),2)+Math.pow(this.yPosition() - this.reportMouseY(),2));
}
}());
//# sourceURL=distanceToPointer.js