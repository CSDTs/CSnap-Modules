(function () {
    return function () {
      //get handle on current process
      var processes = this.parentThatIsA(StageMorph).threads.processes;
      for (var i = 0; i < processes.length; i++){
        if(processes.context.expressions == 'waitUntilOnly') {
          if (processes.length == 1) {
              this.popContext();
              this.pushContext('doYield');
              return null;
          }
          this.context.inputs = [];
          this.pushContext('doYield');
          this.pushContext();
        }
      }
    };
}());


//# sourceURL=waitUntilOnly.js
