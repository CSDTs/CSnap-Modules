(function () {
    return function (soundInput, timeInput, wheelName) {
    // console.log("Rocking Robin");
    console.log(soundInput);
    console.log(timeInput);
    console.log(wheelName);

    console.log('PUT SOUND');

    // check if there is an instanced wheel in WheelMap
    if (!(wheelMap.hasOwnProperty(wheelName))){
        console.log("Wheel not found/not instantiated");
        throw new Error("Wheel not found/not instantiated");
    }

    // get sound buffer under soundInput name
    console.log(wheelMap);
    console.log(this.getTempo());
    // this.putSound(soundInput, timeInput, wheelName);
    let secondsPerBeat = (60.0/this.getTempo());
    console.log("QUARTER NOTE AT THIS TEMPO");
    console.log(secondsPerBeat);
    secondsPerBeat *= timeInput;
    console.log(secondsPerBeat);
    console.log(soundBuffer[soundInput]);
    // TODO- has to change for additive sound, instead of slicing based on where it ends, needs to be added in the play wheel block
    let addedSound = soundBuffer[soundInput].getChannelData(0).slice(0, 48000*secondsPerBeat);
    console.log(addedSound);
    // emplace to back of wheelMap
    //   setWheel.set(testSlice, i*48000*secondsPerBeat);
    console.log(wheelMap[wheelName].buffer);
    // push individual durations of sounds (half beat or full beat)
    wheelMap[wheelName].buffer.push({buffer: addedSound, duration: secondsPerBeat});
    console.log("DURATION OF THIS BEAT: ");
    console.log(secondsPerBeat);

    // add amount of time to duration
    console.log("CURRENT DURATION: ");
    console.log(wheelMap[wheelName].duration);
    wheelMap[wheelName].duration +=secondsPerBeat;
    // rounding correction, always try to round up, because having too much space in buffer is better than not enough
    wheelMap[wheelName].duration = Math.round(wheelMap[wheelName].duration *10)/10;
    console.log("TOTAL DURATION NOW");
    console.log(wheelMap[wheelName].duration);
    console.log(wheelMap);
    return;
    //    return this.putSound(soundInput, timeInput, wheelName);
        };
}());

//# sourceURL=putSound.js
