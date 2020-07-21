(function () {
    return function (soundInput, timeInput, wheelName) {
    // check if there is an instanced wheel in WheelMap
    if (!(wheelMap.hasOwnProperty(wheelName))){
        console.log("Wheel not found/not instantiated");
        throw new Error("Wheel not found/not instantiated");
    }
    // get sound buffer under soundInput name
    let secondsPerBeat = (60.0/this.getTempo());
    secondsPerBeat *= timeInput;
    // get entire buffer
    let addedSound = soundBuffer[soundInput].getChannelData(0);
    // push individual durations of sounds (half beat or full beat)
    wheelMap[wheelName].buffer.push({buffer: addedSound, duration: secondsPerBeat});
    // add amount of time to duration
    // rounding correction, always try to round up, because having too much space in buffer is better than not enough
    secondsPerBeat = Math.ceil(secondsPerBeat * 100) / 100;
    wheelMap[wheelName].duration += Math.max(secondsPerBeat, soundBuffer[soundInput].duration);
    return;
    };
}());
//# sourceURL=putSound.js
