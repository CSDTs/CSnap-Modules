(function () {
    return function (sound, time) {
		this.playSoundTime(sound, startTime + time);
		return;
	};
}());


//# sourceURL=playAtTime.js