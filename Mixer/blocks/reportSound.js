(function () {
    return function (input) {
	  sound = detect(
			this.sounds.asArray(),
			function (s) {return s.input === input; }
		)
		if (sound) {
			var source = audioContext.createBufferSource();
			source.buffer = sound.audio;
			return source;
		}
	}
}());

//# sourceURL=playSoundList.js