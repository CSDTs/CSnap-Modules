//Todo the idea behind adding this code is here is that when a user drags the icosahedron block
// to create a script, this function will return the 3D object which will be added as a
// costume to the stage but I need to talk to Ron to figure out how he envisions this.

// (function () {
//     return function (radius, detail, colorParam) {
//     try {
//             // let icosahedron = function () {
//             //     if (radius === undefined || detail === undefined) {
//             //         radius = 1;
//             //         detail = 0;
//             //     }
//             //
//             //     let enteredColorToLowerCase = colorParam.toLowerCase();
//             //     let color = "";
//             //     let emissive = "";
//             //
//             //     if (enteredColorToLowerCase !== undefined) {
//             //         color = new THREE.Color(enteredColorToLowerCase);
//             //         emissive = color;
//             //     } else {
//             //         color = new THREE.Color('blue');
//             //         emissive = color;
//             //     }
//             //
//             //     let geometry = new THREE.IcosahedronGeometry(radius, detail);
//             //     let material = new THREE.MeshLambertMaterial({emissive: emissive, color: color});
//             //     return new THREE.Mesh(geometry, material);
//             // };
//             console.log(radius + " " + detail + " " + colorParam);
//             // return icosahedron();
//     } catch (e) {
//         console.log(e);
//     }
// };
// })();