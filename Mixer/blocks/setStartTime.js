(function () {
    return function (time) {
		for(i = 0; i< stopSounds.length(); i++)
		{
			stopSounds.contents[i].stop(startTime);
		}
		stopSounds.clear();
		startTime = audioContext.currentTime + time;
		return;
	};
}());


//# sourceURL=setStartTime.js