(function () {
   return function (x, y, z, justMe) {
      var stage = this.parentThatIsA(StageMorph),
      newX,
      newY,
      dest;

      this.zPosition = z;
      this.drawNew();

      // added for Z-axis ordering
      if (this.parent) {
         this.parent.children.sort(
            function(a, b) {
               if (a.is3D && b.is3D) {
                  return a.zPosition < b.zPosition ? -1 : 1;
               } else if (!a.is3D && b.is3D) {
                  return 0 < b.zPosition ? -1 : 1;
               } else if (a.is3D && !b.is3D) {
                  return a.zPosition < 0 ? -1 : 1;
               } else {
                  // !a.is3D && !b.is3D (i.e., both are 2D)
                  return -1;
               }
            }
         );
      }

      newX = stage.center().x + (+x || 0) * stage.scale;
      newY = stage.center().y - (+y || 0) * stage.scale;
      if (this.costume) {
         dest = new Point(newX, newY).subtract(this.rotationOffset);
      } else {
         dest = new Point(newX, newY).subtract(this.extent().divideBy(2));
      }
      this.setPosition(dest, justMe);
      this.positionTalkBubble();
};
}());
