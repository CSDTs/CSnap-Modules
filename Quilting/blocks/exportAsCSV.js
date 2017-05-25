(function () {
    	return function (radius_data, angle_data) {

            //opens a new window and writes data in CSV format.
    		function writeToWindow(radii, angles) {

    			var wnd = window.open("");

                for (i = 0; i < radii.length; i++) {

                    wnd.document.write(radii[i] + "," + angles[i]);
                    if (i != radii.length - 1) {
                        wnd.document.write("<br>");
                    }                    
                }
    		}

            //function create an array from a CSnap list object
            function makeArray(input_data) {
                var data_array = [];
                var data_string = input_data.asText(); //converts CSnap list object to a text string
                for (var i = 0; i < data_string.length; i++) {
                    var val = "";
                    while(data_string[i] != "," && i < data_string.length) { //read through variable-length values until I hit a comma
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
    		writeToWindow(radii, angles);

    	};
}());

//# sourceURL=exportAsCSV.js