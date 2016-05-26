(function () {
    return function (recordingLength) {
		window.MediaRecorder.start(recordingLength*1000);
		MediaRecorder.onstop = function(event) {
		window.MediaRecorder.requestData(); }
		window.MediaRecorder.ondataavailable = saveData;
	};
}());

//# sourceURL=recordMedia.js