(function () {
    return function (wheelName, repeatNumber) {
        // if repeatNumber is 0, don't play anything
        console.log("PLAYING");
        if(repeatNumber < 1){
            return;
        }

        // check if there is an instanced wheel in WheelMap
        if (!(wheelMap.hasOwnProperty(wheelName))){
        console.log("Wheel not found/not instantiated");
        throw new Error("Wheel not found/not instantiated");
        }

        if(wheelMap[wheelName].buffer.length == 0){
            console.log("Wheel is empty!");
            throw new Error("Wheel is empty!");
        }

        let wheelDuration = wheelMap[wheelName].duration;
        console.log(wheelMap[wheelName]);

        let numberOfBuffers = wheelMap[wheelName].buffer;
        console.log(numberOfBuffers);
        console.log(numberOfBuffers.length);
        let amountOfBufs = numberOfBuffers.length;
        let buffersToRead = []; // TODO- Use this to read and recompile
        // // for number of repeats, push into wheelMap[wheelName].buffer

        // TODO- fix this. Need to recompile differently in
        for (let i=0; i<repeatNumber; ++i){
            console.log("i is " + i);
            for(let buff=0; buff<amountOfBufs; ++buff){
                console.log(numberOfBuffers[buff]);
                buffersToRead.push(numberOfBuffers[buff]);
            }
        }
        console.log("BUFFERS TO READ");
        console.log(buffersToRead);
        // wheelDuration = long it takes to play every sound in the wheel (audio array) in seconds
        let wheelToPlay = makeAudioContext.createBuffer(1, 48000*(wheelDuration*repeatNumber), 48000);
        console.log("Length of wheel: ");
        console.log(wheelDuration);

        let durationSoFar = 0
        for(let i =0; i < buffersToRead.length; ++i){
            let setWheelBuff = wheelToPlay.getChannelData(0);
            let dataToSet = buffersToRead[i];
            let bufferToSet = dataToSet.buffer;
            console.log("WHERE TO SET:");
            console.log(48000 * durationSoFar);

            // derivative off the Rhythm Wheels GUI, we need to place the slice of audio into amound of time in seconds IN new buffer * 48000
            setWheelBuff.set(bufferToSet, 48000 * durationSoFar);
            durationSoFar += dataToSet.duration;
        }
        // create audioSourceNode to play and  TODO- push into active buffer node data structure
        let playNode = makeAudioContext.createBufferSource();
        playNode.buffer = wheelToPlay;
        playNode.connect(makeAudioContext.destination);
        this.activeWheels[wheelName] = playNode;
        // play audio
        playNode.start();
        return;
	};
}());

//# sourceURL=playWheel.js