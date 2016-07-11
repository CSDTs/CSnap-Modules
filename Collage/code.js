var coordinateScale = 18

IDE_Morph.prototype.updateCorralBar = function () {
   
   var MouseX = this.stage.reportMouseX();
   var MouseY = this.stage.reportMouseY();
   if(this.isSmallStage ||
      MouseX > StageMorph.prototype.dimensions.x / 2 ||
      MouseY > StageMorph.prototype.dimensions.y / 2 ||
      MouseX < StageMorph.prototype.dimensions.x / -2 ||
      MouseY < StageMorph.prototype.dimensions.y / -2) 
   {
     this.corralBar.children[2].text = "";
     this.corralBar.children[3].text = "";     
   } else {
     this.corralBar.children[2].text = "X: " + Math.round(this.stage.reportMouseX() / coordinateScale);
     this.corralBar.children[3].text = "Y: " + Math.round(this.stage.reportMouseY() / coordinateScale);
   }

   this.corralBar.children[2].drawNew();
   this.corralBar.children[3].drawNew();
   this.fixLayout();
  
};