(function () {
   return function (col) {
      this.costumes.contents[this.getCostumeIdx()-1].setColor(col);
      this.costumes.contents[this.getCostumeIdx()-1].colored = true;
      if(this.shade) this.setCostumeShade(this.shade);
      this.changed();
      this.drawNew();
   };
}());

//# sourceURL=changeCostumeColor.js
