(function () {
    return function (aColor) {
      var stage = this.parentThatIsA(StageMorph),
        ext = stage.extent(),
        img = stage.thumbnail(ext),
        src,
        clr,
        i,
        diff;

      src = img.getContext('2d').getImageData(0, 0, ext.x, ext.y);
      for (i = 0; i < ext.x * ext.y * 4; i += 4) {
          clr = new Color(
              src.data[i],
              src.data[i + 1],
              src.data[i + 2]
          );
          diff = ((aColor.r - clr.r) ** 2 + (aColor.g - clr.g) ** 2 + (aColor.b - clr.b) ** 2) ** 0.5;
          if (diff<10) return true;
      }
      return false;
    };
}());


//# sourceURL=visibleColor.js
