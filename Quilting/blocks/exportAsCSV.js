(function () {
    	return function (radius_data, angle_data) {

            function roundFloat(val) {
                var rounded_val = Math.round(val*10) / 10;
                return rounded_val;
            }

            function roundPoints() {
                for(var i = 0; i < radii.length; i++) {
                    radii[i] = roundFloat(radii[i]);
                    angles[i] = roundFloat(angles[i]) % 360;
                }
            }

            //opens a new window and writes data in CSV format.
            function writeToWindow(points) {

        			var str = '';
        			var ide = this.world.children[0];
              var radii = [];
              var angles = [];

              var keys = [];

              for(var key of points.keys()) {
                  keys.push(key);
              }

              keys.sort(function(a,b){return a - b});

              for(var j = 0; j < keys.length; j++) {
                  var values = points.get(keys[j]);
                  for(var k = 0; k < values.length; k++) {
                      radii.push(keys[j]);
                      angles.push(values[k]);
                  }
              }

              for (var i = 0; i < radii.length; i++) {

                  str += radii[i] + "," + angles[i];
                  if (i !== radii.length - 1) {
                      str += '\n';
                  }
              }
              ide.saveFileAs(str, 'data:text/csv', ide.projectName + ' csvData');
        		}

            function orderRadially(radii, angles) {
                var ordered_points = new Map();
                var ordered_radii = [];
                var ordered_angles = [];
                //iterate through radii, populate map
                //sort map values (arrays of angles)
                //iterate through map in order (small to large radii) and output back to two arrays
                for (var i = 0; i < radii.length; i++) {
                    var unordered_angles = [];
                    if (ordered_points.has(radii[i])) {
                        unordered_angles = ordered_points.get(radii[i]);
                        unordered_angles.push(angles[i]);
                    }
                    else {
                        ordered_points.set(radii[i], unordered_angles);
                    }
                }

                return ordered_points;
            }

            //function create an array from a CSnap list object
            function makeArray(input_data) {
                var data_array = [];
                var data_string = input_data.asText(); //converts CSnap list object to a text string
                for (var i = 0; i < data_string.length; i++) {
                    var val = "";
                    while(data_string[i] !== "," && i < data_string.length) { //read through variable-length values until I hit a comma
                        val += data_string[i];
                        i++;
                    }

                    if(val !== "") {
                        data_array.push(val);
                    }
                }
                return data_array;
            }

            var radii = makeArray(radius_data);
            var angles = makeArray(angle_data);
            roundPoints();
            var points = orderRadially(radii, angles);
    		writeToWindow(points);
    	};
}());

//# sourceURL=exportAsCSV.js
