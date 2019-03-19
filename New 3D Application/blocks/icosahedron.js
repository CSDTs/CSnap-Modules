/**
 * the IIFE below should trigger when a user pulls in our custom block from the block palette
 */
(function () {
    return function (radius) {
        console.log(radius) // for now
    }
})();

// This IIFE is for altering and controlling our 3D icosahedron
