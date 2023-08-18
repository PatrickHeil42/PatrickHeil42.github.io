var coordsURL = "https://api.tomtom.com/search/2/geocode/";

var backHalfCoords =".json?storeResult=false&limit=1&view=Unified&key=1f2gA7a0IvDnjVS0wAqsVHVRiPoQKgkn";
//getCoords();
//Working URL: https://api.tomtom.com/search/2/geocode/benton%20hall.json?storeResult=false&view=Unified&key=1f2gA7a0IvDnjVS0wAqsVHVRiPoQKgkn
var fuzzySearchUrl = "https://api.tomtom.com/search/2/search/";
var backHalfFuzzy = ".json?limit=1&minFuzzyLevel=1&maxFuzzyLevel=2&view=Unified&relatedPois=all&key=1f2gA7a0IvDnjVS0wAqsVHVRiPoQKgkn";

function getCoords() {
	var addressItem = document.getElementById('address');
	if (addressItem.value.length==0){
	alert ("Please enter an address in the address box");

	} else { 
		var input = addressItem.value;
        	var encodedInput = encodeURI(input);
		//url = url1 + url2 + url3
		//url1="search/"
		//url3=".json"
		$.ajax({
		
                // Our sample url to make request
                // url: "https://api.tomtom.com/search/2/geocode/benton%20hall.json?storeResult=false&view=Unified&key=1f2gA7a0IvDnjVS0wAqsVHVRiPoQKgkn",
		url: fuzzySearchUrl + encodedInput + backHalfFuzzy,

                // Type of Request
                type: "GET",
		
                success: function (data) {
		var x = data.results[0];	
           	console.log(x);
                var lat = x.position.lat;
		var lon = x.position.lon;
                
                var minLat = x.position.lat -2;
                var minLon = x.position.lon -2;
                var maxLat = x.position.lat +2;
                var maxLon = x.position.lon +2;
                var bbox = minLat + "," + minLon + "," + maxLat + "," + maxLon;
                var marker = "MARKER="+lon+","+lat;
                let today = new Date();
                console.log(today);
                let dd = today.getDate();
                let mm = today.getMonth() + 1;
                let yyyy = today.getFullYear();
                let hour = today.getHours();
                let minute = today.getMinutes();

                if (dd < 10) {
                dd = '0' + dd;
                }
                if (mm < 10) {
                 mm = '0' + mm;
                }
                if (hour < 10) {
                 hour = '0' + hour;
                }
                if (minute < 10) {
                        minute = '0' + minute;
                       }
                //Leaving hour/minute out of this bc weather radar updates daily; 
                //might implement for clear view which updates every ten minutes.
                today = yyyy + '-' + mm + '-' + dd;
                var todayString = today.toString();
                var radarURL = "https://wvs.earthdata.nasa.gov/api/v1/snapshot?REQUEST=GetSnapshot&TIME=" + todayString + "T00:00:00Z&BBOX=" + bbox + "&CRS=EPSG:4326&LAYERS=GOES-East_ABI_Band2_Red_Visible_1km,GOES-East_ABI_Band13_Clean_Infrared,GOES-West_ABI_Band13_Clean_Infrared,Himawari_AHI_Band13_Clean_Infrared,Coastlines_15m,Reference_Features_15m,Reference_Labels_15m&WRAP=x,x,x,x,x,x,x&FORMAT=image/jpeg&WIDTH=486&HEIGHT=486&" + marker + "&ts=1692306914001";
                var clearURL = "https://wvs.earthdata.nasa.gov/api/v1/snapshot?REQUEST=GetSnapshot&TIME=" + todayString + "T00:00:00Z&BBOX=" + bbox + "&CRS=EPSG:4326&LAYERS=MODIS_Terra_CorrectedReflectance_TrueColor,Coastlines_15m,Reference_Features_15m&WRAP=day,x,x&FORMAT=image/jpeg&WIDTH=486&HEIGHT=486&" + marker + "&ts=1692389710811";
                $("#lat").html(lat);
		$("#lon").html(lon);
                


		//getWeather();
                $("#YourCity").html(x.address.municipality + ", " + x.address.countrySubdivisionName);
                console.log(radarURL);
                console.log(clearURL);
                $("#radarURL").attr("href",radarURL);
                $("#clearURL").attr("href",clearURL);
                
                $("#radarURL").html("Radar link");
                $("#clearURL").html("Clear View link");
                $("#nightURL").html("Night View link");
                //window.location.reload();
                
                //Error handling
		},
                error: function (error) {
                alert("Error");
                }
            });
           
	}		
}
function getWeather(){
	var lat=document.getElementById("lat").innerText;
	var lon=document.getElementById("lon").innerText;
                var mapURL = "https://api.openweathermap.org/data/2.5/forecast?";
                var mapURLBackHalf = "lat=" + lat + "&lon=" + lon + "&units=imperial&appid=520ff607520c3a81ffe9ce4c41a2c28e";
                $.ajax({
                        url: mapURL+ mapURLBackHalf,
                        type: "GET",
                        success: function (data){
                       // document.getElementById("YourCity").html = data.address.municipality + ", " + data.address.countrySubdivisionName;
                        //$("#YourCity").html(data.address.municipality + ", " + data.address.countrySubdivisionName);
                        console.log(data);
			},

                        // Error handling
                        error: function (error) {
                                alert("Error");
                        }
	});
                

}
function findWeather(){
 	var addressItem = document.getElementById('dateInput');
                var input2 = addressItem;
                var encodedInput2 = input2;
                $.ajax({

			url: "http://172.17.13.162/cse383_final_project/final.php?method=getWeather&date=" + ecodedInput2 ,

                // Type of Request
                type: "GET",

                success: function (data) {
              	console.log(data);
		$("#loggedEvents").innerHTML(data);	
              
                },
                error: function (error) {
                alert("Error");
                }
            });
        


}

function getSateliteImage(){

        var lon=document.getElementById("lon").innerText;
        var lat=document.getElementById("lat").innerText;
        var satURL = "https://api.nasa.gov/planetary/earth/imagery";

        var satURLBackHalf = "lat=" + lat + "&lon=" + lon + "api_key=B9s7aMUpoaRCFqHygyKyAe0n5OLzWEYAMndCnZnf";
        $.ajax({
                url: satURL+ satURLBackHalf,
                type: "GET",
                success: function (data){
               
                console.log(data);
               
        },
                // Error handling
                error: function (error) {
                        alert("Error");
                }

      });
}