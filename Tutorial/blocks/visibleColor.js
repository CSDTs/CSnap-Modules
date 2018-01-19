(function () {
    return function (aColor) {
      var stage = this.parentThatIsA(StageMorph),
        ext = stage.extent(),
        img = stage.thumbnail(ext),
        src,
        clr,
        i;

      src = img.getContext('2d').getImageData(0, 0, ext.x, ext.y);
      for (i = 0; i < ext.x * ext.y * 4; i += 4) {
          clr = new Color(
              src.data[i],
              src.data[i + 1],
              src.data[i + 2]
          );
          if (clr.eq(aColor)) return true;
      }
      return false;
    };
}());


//# sourceURL=visibleColor.js
