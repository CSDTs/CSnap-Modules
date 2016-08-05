(function () {
    return function (List, Loops) {
	  var time = startTime;
	  var eighthNoteTime = this.eighthNoteTime();

	  // Play 2 bars of the following:
	  for (var j = 0; j < Loops; j++) {
		  for (var i = 0; i < List.length(); i++) {
			time += eighthNoteTime;
			// Play the bass (kick) drum on beats 1, 5
			this.playSoundTime(List.contents[i], time);
		  }
	  }
	}
}());

//# sourceURL=playSoundList.js