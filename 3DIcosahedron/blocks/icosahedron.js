/**
 * the IIFE below should trigger when a user pulls in our custom block from the block palette
 */
(function () {
    return function (size) {
        console.log(size) // for now
    }
})();
