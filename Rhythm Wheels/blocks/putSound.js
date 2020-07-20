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
    // TODO- has to change for additive sound, instead of slicing based on where it ends, needs to be added in the play wheel block
    let addedSound = soundBuffer[soundInput].getChannelData(0).slice(0, 48000*secondsPerBeat);
    // push individual durations of sounds (half beat or full beat)
    wheelMap[wheelName].buffer.push({buffer: addedSound, duration: secondsPerBeat});

    // add amount of time to duration

    // rounding correction, always try to round up, because having too much space in buffer is better than not enough
    secondsPerBeat = Math.ceil(secondsPerBeat * 100) / 100;
    wheelMap[wheelName].duration +=secondsPerBeat;
    return;
    };
}());
//# sourceURL=putSound.js
