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
           	 
                var lat = x.position.lat;
		var lon = x.position.lon;
		$("#lat").html(lat);
		$("#lon").html(lon);

		getWeather();
               // Error handling
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
                       
                        console.log(data);
//**
//<img id="rain" src="https://imgur.com/50Z4xx0.jpeg" width="20px" height="20px">
//<img id="storm" src="https://imgur.com/847iqmd.jpeg" width="20px" height="20px">
//<img id ="sunny" src="https://imgur.com/3WQTUln.jpeg" width="20px" height="20px">
//<img id="cloudy" src="https://imgur.com/mf5htvc.jpeg" width="20px" height="20px">
//<img id="windy"  src="https://imgur.com/Q1NbBFY.jpeg" width="20px" height="20px">
 
                        $("#YourCity").html(data.city.name);
			//3 hours ahead is [1]
                        $("#day1Text").html(data.list[1].dt_txt  + "<br>" + data.list[1].weather[0].main + "<br>" + "Temperature is " + data.list[1].main.temp + "<br>" + "Feels like "+ data.list[1].main.feels_like); 

			$("#day1Marker").html(data.list[1].weather[0].main);	
			var markerOne = document.getElementById('day1Marker').innerText;
	
			if(markerOne === "Rain"){
				document.getElementById("day1Image").src= "https://imgur.com/50Z4xx0.jpeg";
			}
			if(markerOne === "Storm"){
                                document.getElementById("day1Image").src= "https://imgur.com/847iqmd.jpeg";
                        }
			if(markerOne === "Sunny"){
                               document.getElementById("day1Image").src= "https://imgur.com/3WQTUln.jpeg";
                        }
			if(markerOne === "Clouds"){
				document.getElementById("day1Image").src= "https://imgur.com/mf5htvc.jpeg";
			}
 		        if(markerOne === "Windy"){
                                document.getElementById("day1Image").src = "https://imgur.com/Q1NbBFY.jpeg";
                        }
			//Day 2  is [9]?

			$("#day2Text").html(data.list[9].dt_txt  + "<br>" + data.list[9].weather[0].main + "<br>" + "Temperature is " + data.list[9].main.temp + "<br>" + "Feels like "+ data.list[9].main.feels_like);
		
			
                       $("#day2Marker").html(data.list[9].weather[0].main);
                        var markerTwo = document.getElementById("day2Marker").innerText;
                        if(markerTwo === "Rain"){
                                document.getElementById("day2Image").src= "https://imgur.com/50Z4xx0.jpeg";
                        }
                        if(markerTwo === "Storm"){
                                document.getElementById("day2Image").src= "https://imgur.com/847iqmd.jpeg";
                        }
                        if(markerTwo === "Sunny"){
                               document.getElementById("day2Image").src= "https://imgur.com/3WQTUln.jpeg";
                        }
                        if(markerTwo === "Clouds"){
                                document.getElementById("day2Image").src="https://imgur.com/mf5htvc.jpeg";
                        }
                        if(markerTwo === "Windy"){
                                document.getElementById("day2Image").src= "https://imgur.com/Q1NbBFY.jpeg";
                        }


			//Day 3 is [17]
                        $("#day3Text").html(data.list[17].dt_txt  + "<br>" + data.list[17].weather[0].main + "<br>" + "Temperature is " + data.list[17].main.temp + "<br>" + "Feels like "+ data.list[17].main.feels_like);
			
			
                       $("#day3Marker").html(data.list[17].weather[0].main);
                       var markerThree = document.getElementById("day3Marker").innerText;
                        if(markerThree === "Rain"){
                                document.getElementById("day3Image").src= "https://imgur.com/50Z4xx0.jpeg";
                        }
                        if(markerThree === "Storm"){
                                document.getElementById("day3Image").src= "https://imgur.com/847iqmd.jpeg";
                        }
                        if(markerThree === "Sunny"){
                               document.getElementById("day3Image").src= "https://imgur.com/3WQTUln.jpeg";
                        }
                        if(markerThree == "Clouds"){
                                document.getElementById("day3Image").src="https://imgur.com/mf5htvc.jpeg";
                        }
                        if(markerThree === "Windy"){
                                document.getElementById("day3Image").src= "https://imgur.com/Q1NbBFY.jpeg";
                        }
		

			//Day 4 Noon is [25]
                        $("#day4Text").html(data.list[25].dt_txt  + "<br>" + data.list[25].weather[0].main + "<br>" + "Temperature is " + data.list[25].main.temp + "<br>" + "Feels like "+ data.list[25].main.feels_like);
			
			
                        $("#day4Marker").html(data.list[25].weather[0].main);
                        var markerFour = document.getElementById("day4Marker");

                        if(markerFour === "Rain"){
                                document.getElementById("day4Image").src= "https://imgur.com/50Z4xx0.jpeg";
                        }
                        if(markerFour === "Storm"){
                                document.getElementById("day4Image").src= "https://imgur.com/847iqmd.jpeg";
                        }
                        if(markerFour === "Sunny"){
                               document.getElementById("day4Image").src= "https://imgur.com/3WQTUln.jpeg";
                        }
                        if(markerFour === "Clouds"){
                                document.getElementById("day4Image").src="https://imgur.com/mf5htvc.jpeg";
                        }
                        if(markerFour === "Windy"){
                                document.getElementById("day4Image").src= "https://imgur.com/Q1NbBFY.jpeg";
                        }

		

			//Day 5 Noon is [33]
                        $("#day5Text").html(data.list[33].dt_txt  + "<br>" + data.list[33].weather[0].main + "<br>" + "Temperature is " + data.list[33].main.temp + "<br>" + "Feels like "+ data.list[33].main.feels_like);
			
                        $("#day5Marker").html(data.list[33].weather[0].main);
                        var markerFive = document.getElementById("day5Marker");

                        if(markerFive === "Rain"){
                                document.getElementById("day5Image").src= "https://imgur.com/50Z4xx0.jpeg";
                        }
                        if(markerFive === "Storm"){
                                document.getElementById("day5Image").src= "https://imgur.com/847iqmd.jpeg";
                        }
                        if(markerFive === "Sunny"){
                               document.getElementById("day5Image").src= "https://imgur.com/3WQTUln.jpeg";
                        }
                        if(markerFive === "Clouds"){
                                document.getElementById("day5Image").src="https://imgur.com/mf5htvc.jpeg";
                        }
                        if(markerFive === "Windy"){
                                document.getElementById("day5Image").src= "https://imgur.com/Q1NbBFY.jpeg";
                        }
		
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
                //url = url1 + url2 + url3
                //url1="search/"
                //url3=".json"
                $.ajax({

			url: "http://172.17.13.162/cse383_final_project/final.php?method=getWeather&date=" + ecodedInput2 ,

                // Type of Request
                type: "GET",

                success: function (data) {
              	console.log(data);
		$("#loggedEvents").innerHTML(data);	
               // getWeather();
               // Error handling
                },
                error: function (error) {
                alert("Error");
                }
            });
        
	

}