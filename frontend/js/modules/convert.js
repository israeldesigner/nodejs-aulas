const teste = () => {
    function loadSampleData() {
        document.querySelector("#txtCsvData")
        .innerText = "Date,Time,F-Scale,Injuries,Fatalities,Latitude,Longitude,EndLat,EndLong,Length miles,Width Yards,Memo\n1/13/1950,5:25:00 AM,3,1,1,34.4,-94.37,0,0,0.6,17,Date/Time: 01/13/1950 05:25<br/>Fujita scale: 3<br/>Injuries: 1<br/>Fatalities: 1<br/>Length: 0.6 miles<br/>Width: 17 yards\n2/12/1950,12:30:00 PM,2,0,0,34.48,-92.4,0,0,0.1,100,Date/Time: 02/12/1950 12:30<br/>Fujita scale: 2<br/>Injuries: 0<br/>Fatalities: 0<br/>Length: 0.1 miles<br/>Width: 100 yards\n2/12/1950,3:00:00 PM,2,0,0,33.27,-92.95,33.35,-92.95,5.7,100,Date/Time: 02/12/1950 15:00<br/>Fujita scale: 2<br/>Injuries: 0<br/>Fatalities: 0<br/>Length: 5.7 miles<br/>Width: 100 yards\n3/26/1950,7:30:00 PM,2,3,0,34.12,-93.07,34.32,-92.88,17.4,150,Date/Time: 03/26/1950 19:30<br/>Fujita scale: 2<br/>Injuries: 3<br/>Fatalities: 0<br/>Length: 17.4 miles<br/>Width: 150 yards";
    }
    function out(str){ document.querySelector("#txtOutput").value = str; }
    function _out(str) { document.querySelector("#txtOutput").value += "\r\n" + str; }
    function convertToKml() {
        let csv = document.querySelector("#txtCsvData").value;
        if (csv == "") {
            out("#CSV data needed first.  If you have none, use the sample data provided.");
        }
        else {
            let boolIncludeFirstLine = !document.querySelector("#chkHeader").checked;
            let indexLat = document.querySelector("#txtColLat").value - 1;
            let indexLong = document.querySelector("#txtColLon").value - 1;
            let indexLatEnd = document.querySelector("#txtColLatEnd").value - 1;
            let indexLongEnd = document.querySelector("#txtColLonEnd").value - 1;
            let indexTitle = document.querySelector("#txtColTitle").value - 1;
            let indexMemo = document.querySelector("#txtColMemo").value - 1;
            
            out(csvToKml(csv, boolIncludeFirstLine, indexLat, indexLong, indexLatEnd, indexLongEnd, indexTitle, indexMemo));
        }
    }
    function csvToKml(strCsv, boolIncludeFirstLine, indexLat, indexLong, indexLatEnd, indexLongEnd, indexTitle, indexMemo) {
        let placemarks = strCsv.split("\n");
        
        // Create Kml string which will be returned
        let k = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
        k += "<kml xmlns=\"https://earth.google.com/kml/2.0\">\n";
        k += " <Document>\n";
        k += "  <Style id=\"yellowLineGreenPoly\">\n";
        k += "   <LineStyle>\n";
        k += "    <color>7f00ffff</color>\n";
        k += "     <width>4</width>\n";
        k += "   </LineStyle>\n";
        k += "   <PolyStyle>\n";
        k += "    <color>7f00ff00</color>\n";
        k += "   </PolyStyle>\n";
        k += "  </Style>\n";
        k += "  <Style id=\"tornado\">\n";
        k += "  	<IconStyle>\n";
        k += "  		<Icon>\n";
        k += "  			<href>https://dl.dropboxusercontent.com/u/20650772/Tornado.png</href>\n";
        k += "  		</Icon>\n";
        k += "          <hotSpot x=\"9\"  y=\"22\" xunits=\"insetPixels\" yunits=\"insetPixels\"/>\n"
        k += "  	</IconStyle>\n";
        k += "  </Style>\n";
        //
        
        for (let x = 0; x < placemarks.length; x++) {
            if (placemarks[x] == "") {
                continue;
            }
            
            // Split this into columns
            let placemark = placemarks[x].split(",")
            
            if (!((x == 0) && (!boolIncludeFirstLine))) {
                if ((placemark[indexLong] != "0") && (placemark[indexLat] != "0") && (showThisOne(placemark))) {
                    k += "	<Placemark>\n";
                    k += "		<name>" + placemark[indexTitle] + "</name>\n";
                    k += "      <description>" + placemark[indexMemo] + "</description>\n";
                    k += "		<styleUrl>#tornado</styleUrl>\n";
                    k += "		<Point>\n";
                    k += "			<coordinates>" + placemark[indexLong] + "," + placemark[indexLat] + ",0</coordinates>\n";
                    k += "		</Point>\n";
                    k += "	</Placemark>\n";
    
                    if ((indexLatEnd != null) && (indexLongEnd != null) && (placemark[indexLongEnd] != "") && (placemark[indexLatEnd] != "") && (placemark[indexLongEnd] != 0) && (placemark[indexLatEnd] != 0)) {
                        k += "  <Placemark>\n";
                        k += "   <styleUrl>#yellowLineGreenPoly</styleUrl>\n";
                        k += "   <LineString>\n";
                        k += "    <extrude>1</extrude>\n";
                        k += "    <tessellate>1</tessellate>\n";
                        k += "    <altitudeMode>ClampedToGround</altitudeMode>\n";
                        k += "    <coordinates>\n";
                        k += "     " + placemark[indexLong] + "," + placemark[indexLat] + ",0\n";
                        k += "     " + placemark[indexLongEnd] + "," + placemark[indexLatEnd] + ",0\n";
                        k += "    </coordinates>\n";
                        k += "   </LineString>\n";
                        k += "  </Placemark>\n";
                    }
                }
            }
        }
        
        k += " </Document>\n</kml>";
        return k;
    }
    function download(filename, text) {
        if (text != "") {
            let pom = document.createElement('a');
            pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            pom.setAttribute('download', filename);
    
            pom.style.display = 'none';
            document.body.appendChild(pom);
    
            pom.click();
    
            document.body.removeChild(pom);
        }
    }
    function handleFileSelect(evt) {
        let files = evt.target.files; // FileList object
    
        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {
    
            let reader = new FileReader();
    
            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    // Read contents
                    document.querySelector("#txtCsvData").innerText = e.target.result;
                };
              })(f);
    
              // Read in the CSV file as text.
              reader.readAsText(f);
        }
    }
    function showThisOne(placemark){
        // This method is just used to filter the results as needed
        
        let strDate = placemark[0].split('/');
        let dtDate = new Date(strDate[2],strDate[0]-1,strDate[1]);
        let dtCutoffDate = new Date(1990,1,1);
        
        if (dtDate >= dtCutoffDate) {
            return true;
        }
        
        //if (placemark[3] != 4) {
        //    return true;
        //}
        
        return false;
    }

    const files = document.querySelector("#files");
    const btnSampleCSV = document.querySelector("#btnSampleCSV");
    const convertKml = document.querySelector('#convertToKml');
    const btnDownload = document.querySelector('#btnDownload');
    const txtOutput = document.getElementById('#txtOutput');

    if(files) {
        files.addEventListener('change', function(){
            handleFileSelect(event);
        });
    }
    if(btnSampleCSV){
        btnSampleCSV.addEventListener('click', function(){
            loadSampleData()
        });
    }
    if(convertKml){
        convertKml.addEventListener('click', function(){
            convertToKml()
        });
    }
    if(btnDownload){
        btnDownload.addEventListener('click', function(){
            download('map.kml', txtOutput.value );
        })
    }
}

export { teste }