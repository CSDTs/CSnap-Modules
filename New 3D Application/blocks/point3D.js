(function () {
   return function (degX, degY, degZ) {
      if (this.is3D) {
         this.xRotation = degX;
         this.yRotation = degY;
         this.zRotation = degZ;

         this.update3dObject();
      }

      // propagate to my parts
      this.parts.forEach(function (part) {
         part.point3D(degX, degY, degZ);
      });
};}());
