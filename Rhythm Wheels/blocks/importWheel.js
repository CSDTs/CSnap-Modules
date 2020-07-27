(function () {
    return function (fileName, indexNumber, wheelName) {
        console.log("IMPORT WHEEL CALL");
        console.log(fileName);
        if (!(wheelMap.hasOwnProperty(wheelName))){
            console.log("Wheel not found/not instantiated");
            throw new Error("Wheel not found/not instantiated");
        }
        // get sound buffer under soundInput name
        // let secondsPerBeat = (60.0/this.getTempo());
        // secondsPerBeat *= timeInput;

        let wheelBufferStore = [];
        let file = JSON.stringify(fileBuffer[fileName]);
        console.log(file);
        // start parsing
        // pass in the WheelToChange and input the audio into that wheel
        console.log(parser);
        parser.parse(JSON.parse(file), wheelBufferStore, indexNumber);

        console.log(wheelBufferStore);
        let wheelToChange = wheelMap[wheelName];
        let secondsPerBeat = (60.0/this.getTempo());
        // now iterate through and put audio wheel data structure
        for (let audio of wheelBufferStore){
            let addedSound = audio.getChannelData(0);
            wheelToChange.buffer.push({buffer: addedSound, duration: secondsPerBeat});
            secondsPerBeat = Math.ceil(secondsPerBeat * 100) / 100;
            wheelToChange.duration += Math.max(secondsPerBeat, audio.duration);
        }
       console.log(wheelMap[wheelName]);

       
	};
}());
//# sourceURL=importWheel.js