(function () {
    return function (time) {
		startTime = audioContext.currentTime + time;
		return;
	};
}());


//# sourceURL=setStartTime.js