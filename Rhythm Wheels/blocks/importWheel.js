(function () {
    return function (indexNumber,fileName) {
        wheelName = currentWheel;
        if (!(wheelMap.hasOwnProperty(wheelName))){
            console.log("Wheel not found/not instantiated");
            throw new Error("Wheel not found/not instantiated");
        }
        let wheelBufferStore = [];

        // search for the file in the 
        console.log(this.files);
        let file = detect(this.files.asArray(), function(f){return f.name == fileName});
        if(!file){
            throw new Error("File not found!");
        }
        parser.parse(JSON.parse(file.data), wheelBufferStore, indexNumber, this);

        let wheelToChange = wheelMap[wheelName];
        let secondsPerBeat = (60.0/this.getTempo());
        // now iterate through and put audio wheel data structure
        for (let audio of wheelBufferStore){
            let addedSound = audio.buffer.getChannelData(0);
            wheelToChange.buffer.push({buffer: addedSound, duration: secondsPerBeat});
            secondsPerBeat = Math.ceil(secondsPerBeat * 100) / 100;
            wheelToChange.duration += Math.max(secondsPerBeat, audio.buffer.duration);
        }
	};
}());
//# sourceURL=importWheel.js