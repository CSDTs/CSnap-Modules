(function () {
    	return function (radius_data, angle_data) {

    		function writeToWindow(radii, angles) {

    			var wnd = window.open("data:text/");

                for (i = 0; i < radii.length; i++) {

                    wnd.document.write(radii[i] + "," + angles[i]);
                    if (i != radii.length - 1) {
                        wnd.document.write("<br>");
                    }                    
                }
    		}

            function makeArray(input_data) {
                var data_array = [];
                var data_string = input_data.asText();
                for (var i = 0; i < data_string.length; i++) {
                    var val = "";
                    while(data_string[i] != "," && i < data_string.length) {
                        val += data_string[i];
                        i+= 1;
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
