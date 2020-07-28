(function () {
    return function (indexNumber,fileName, wheelName) {
        if (!(wheelMap.hasOwnProperty(wheelName))){
            console.log("Wheel not found/not instantiated");
            throw new Error("Wheel not found/not instantiated");
        }
        let wheelBufferStore = [];
        let file = JSON.stringify(fileBuffer[fileName]);

        parser.parse(JSON.parse(file), wheelBufferStore, indexNumber);

        let wheelToChange = wheelMap[wheelName];
        let secondsPerBeat = (60.0/this.getTempo());
        // now iterate through and put audio wheel data structure
        for (let audio of wheelBufferStore){
            let addedSound = audio.getChannelData(0);
            wheelToChange.buffer.push({buffer: addedSound, duration: secondsPerBeat});
            secondsPerBeat = Math.ceil(secondsPerBeat * 100) / 100;
            wheelToChange.duration += Math.max(secondsPerBeat, audio.duration);
        }
	};
}());
//# sourceURL=importWheel.js