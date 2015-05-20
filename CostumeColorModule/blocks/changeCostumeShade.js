(function () {
	return function (num) {
   
      if(!this.costumes.contents[this.getCostumeIdx()-1].costumeColor) {
         this.costumes.contents[this.getCostumeIdx()-1].costumeColor = new Color(0,0,0);
      }

      if(!this.costumes.contents[this.getCostumeIdx()-1].originalPixels) {
         this.costumes.contents[this.getCostumeIdx()-1].originalPixels = this.costumes.contents[this.getCostumeIdx()-1].contents.getContext('2d')
            .getImageData(0, 0, this.costumes.contents[this.getCostumeIdx()-1].contents.width,
               this.costumes.contents[this.getCostumeIdx()-1].contents.height);
      }
      currentPixels = this.costumes.contents[this.getCostumeIdx()-1].contents.getContext('2d')
         .getImageData(0, 0,
            this.costumes.contents[this.getCostumeIdx()-1].contents.width, this.costumes.contents[this.getCostumeIdx()-1].contents.height);

      // Get the new shading values
      var hsv = this.costumes.contents[this.getCostumeIdx()-1].costumeColor.hsv();
      num = Math.max(Math.min(+num || 0, 100), 0) / 50;
      hsv[1] = 1;
      hsv[2] = 1;

      if(num > 1) {
         hsv[1] = (2 - num);
      }
      else {
         hsv[2] = num;
      }

		this.costumes.contents[this.getCostumeIdx()-1].costumeColor.set_hsv.
         apply(this.costumes.contents[this.getCostumeIdx()-1].costumeColor, hsv);

      // Apply the new shading
      for(var I = 0, L = this.costumes.contents[this.getCostumeIdx()-1].originalPixels.data.length; I < L; I += 4){
         if(currentPixels.data[I + 3] > 0){
            // If it's not a transparent pixel
            currentPixels.data[I] = this.costumes.contents[this.getCostumeIdx()-1].originalPixels.
               data[I] / 255 * this.costumes.contents[this.getCostumeIdx()-1].costumeColor.r;
            currentPixels.data[I + 1] = this.costumes.contents[this.getCostumeIdx()-1].originalPixels.
               data[I + 1] / 255 * this.costumes.contents[this.getCostumeIdx()-1].costumeColor.g;
            currentPixels.data[I + 2] = this.costumes.contents[this.getCostumeIdx()-1].originalPixels.
               data[I + 2] / 255 * this.costumes.contents[this.getCostumeIdx()-1].costumeColor.b;
         }
      }
      this.costumes.contents[this.getCostumeIdx()-1].contents.getContext('2d')
         .putImageData(currentPixels, 0, 0);

     // Now display the new costume
     this.changed();
     this.drawNew();

   };
}());

