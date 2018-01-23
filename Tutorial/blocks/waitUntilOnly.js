(function () {
    return function () {
      //get handle on current process
      var processes = this.parentThatIsA(StageMorph).threads.processes;
      for (var i = 0; i < processes.length; i++){
        try{
          if(processes[i].context.expression.selector == 'waitUntilOnly') {
            if (processes.length == 1) {
                processes[i].popContext();
                processes[i].pushContext('doYield');
                return null;
            }
            processes[i].context.inputs = [];
            processes[i].pushContext('doYield');
            processes[i].pushContext();
          }
        }
        catch(e){}
      }
    };
}());


//# sourceURL=waitUntilOnly.js
