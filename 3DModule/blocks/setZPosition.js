(function () {
   return function (num) {
      this.gotoXYZ(this.xPosition(), this.yPosition(), +num || 0);
}());
