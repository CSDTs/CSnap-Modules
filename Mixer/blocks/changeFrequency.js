(function () {
    return function (input, val, time) {
	  sound = detect(
			this.sounds.asArray(),
			function (s) {return s.name === input; }
		)
		if (sound) {
			var source = audioContext.createBufferSource();
			source.buffer = sound.audio;
			source.playbackRate.value = val/100;
			source.connect(gainNode);
			source[source.start ? 'start' : 'noteOn'](startTime + time);
			stopSounds.add(source);
		}
	};
}());


//# sourceURL=changeFrequency.js