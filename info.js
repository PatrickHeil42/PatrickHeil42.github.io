var coordsURL = "https://api.tomtom.com/search/2/geocode/";

var backHalfCoords = ".json?storeResult=false&limit=1&view=Unified&key=1f2gA7a0IvDnjVS0wAqsVHVRiPoQKgkn";
//getCoords();
//Working URL: https://api.tomtom.com/search/2/geocode/benton%20hall.json?storeResult=false&view=Unified&key=1f2gA7a0IvDnjVS0wAqsVHVRiPoQKgkn
var fuzzySearchUrl = "https://api.tomtom.com/search/2/search/";
var backHalfFuzzy = ".json?limit=1&minFuzzyLevel=1&maxFuzzyLevel=2&view=Unified&relatedPois=all&key=1f2gA7a0IvDnjVS0wAqsVHVRiPoQKgkn";
function getDays() {
        let currentDay = new Date();
        var day1 = currentDay.getDay();
        var day2 = currentDay.getDay() + 1;
        var day3 = currentDay.getDay() + 2;
        var day4 = currentDay.getDay() + 3;
        var day5 = currentDay.getDay() + 4;
        var day6 = currentDay.getDay() + 5;

}

function getCoords() {
        var addressItem = document.getElementById('address');

        if (addressItem.value.length == 0) {
                alert("Please enter an address in the address box");

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
                                $("#lat").html(lat);
                                $("#lon").html(lon);
                                $("#YourCity").html(x.address.municipality + ", " + x.address.countrySubdivisionName);

                                getWeather();
                                //$("#YourCity").html(data.address.municipality + ", " + data.address.countrySubdivisionName);


                                //Error handling
                        },
                        error: function (error) {
                                alert("Error");
                        }
                });
        }
}

function getWeather() {
        var lat = document.getElementById("lat").innerText;
        var lon = document.getElementById("lon").innerText;



        var mapURL = "https://api.openweathermap.org/data/2.5/forecast?";
        var mapURLBackHalf = "lat=" + lat + "&lon=" + lon + "&units=imperial&appid=520ff607520c3a81ffe9ce4c41a2c28e";
        $.ajax({

                url: mapURL + mapURLBackHalf,
                type: "GET",
                success: function (data) {
                        console.log(data);
                        /*
                         [Date time weirdness note]
                         Doing all this date formatting to get around the weather api's odd format
                         Their date format begins with current time slot and goes by every three hours from there.
                         I need to know how many to go ahead in order to do daily averages.
                         if user runs at 11 pm, [0] forecast will be at midnight. 
                         if user runs at 1:00am, [0] forecast is 3:00am.
                         originally i just added by 8 to go 24 hours from time of call for each day
                         But this is inaccurate, so I fixed it below. Sorry it is messy
                         
                        */

                        let dateUTC = data.list[0].dt_txt;
                        let midnightCountdown = 0;
                        let hour = dateUTC.substring(11, 13)

                        if (hour != "00") {

                                midnightCountdown = Math.ceil(Math.ceil(24 - hour) / 3);

                        }
                        console.log(dateUTC);
                        //console.log(data.list[0].dt_txt);
                        console.log(hour);
                        console.log(midnightCountdown);


                        function getAverage(start, end) {
                                let AverageTemp = 0.0;
                                let counter = start = 0;
                                if (start == end) {
                                        return "No average,this day consists of 1 forecast. End of day?"
                                }
                                while (counter <= end) {
                                        console.log(data.list[counter].main.temp)
                                        AverageTemp += Number(data.list[counter].main.temp);
                                        counter++;
                                }
                                console.log(Number(AverageTemp / end));
                                return AverageTemp / end;
                        }
                        let day1AverageTemp = getAverage(0, midnightCountdown);
                        let day2AverageTemp = getAverage(midnightCountdown, midnightCountdown + 8);
                        let day3AverageTemp = getAverage(midnightCountdown + 8, midnightCountdown + 16);
                        let day4AverageTemp = getAverage(midnightCountdown + 16, midnightCountdown + 24);
                        let day5AverageTemp = getAverage(midnightCountdown + 24, midnightCountdown + 32);
                        /* 
                        //Adjusted time for local.
                        let adjust = data.city.timezone;
                        let date =  Date(data.list[0].dt_txt-adjust);
                        //I cannot tell why date.getHours isn't working, but this substring method works.
                        let dateAsString = String(date);
                        let hour = dateAsString.substring(16,18)
                        let untilTomorrow = 8-(hour/3);
                        console.log(date);
                        
                        console.log(hour);
                        console.log(untilTomorrow);
                        console.log(data);
                        */
                        //We want the average weather between the current time - midnight.


                        $("#day1Text").html(data.list[0].dt_txt + "<br>" + data.list[0].weather[0].main + "<br>" + "Current temperature is " + data.list[0].main.temp + "<br>" + "Feels like " + data.list[0].main.feels_like + "<br>" + "Daily average is " + day1AverageTemp);
                        $("#day1Marker").html(data.list[0].weather[0].main);
                        var markerOne = document.getElementById('day1Marker').innerText;
                        document.getElementById("day1Image").src = "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png";

                        $("#day2Text").html(data.list[midnightCountdown].dt_txt + "<br>" + data.list[midnightCountdown].weather[0].main + "<br>" + " Temperature will be " + data.list[midnightCountdown].main.temp + "<br>" + "Feels like " + data.list[0].main.feels_like + "<br>" + "Daily average is " + day2AverageTemp);
                        $("#day2Marker").html(data.list[midnightCountdown].weather[0].main);
                        var markerTwo = document.getElementById('day2Marker').innerText;
                        document.getElementById("day2Image").src = "http://openweathermap.org/img/wn/" + data.list[midnightCountdown].weather[0].icon + "@2x.png";

                        $("#day3Text").html(data.list[midnightCountdown + 8].dt_txt + "<br>" + data.list[midnightCountdown].weather[0].main + "<br>" + " Temperature will be " + data.list[midnightCountdown].main.temp + "<br>" + "Feels like " + data.list[0].main.feels_like + "<br>" + "Daily average is " + day2AverageTemp);
                        $("#day3Marker").html(data.list[midnightCountdown].weather[0].main);
                        var markerThree = document.getElementById('day3Marker').innerText;
                        document.getElementById("day3Image").src = "http://openweathermap.org/img/wn/" + data.list[midnightCountdown].weather[midnightCountdown + 16].icon + "@2x.png";

                },

                // Error handling
                error: function (error) {
                        alert("Error");
                }
        });


}
function findWeather() {
        var addressItem = document.getElementById('dateInput');
        var input2 = addressItem;
        var encodedInput2 = input2;
        //url = url1 + url2 + url3
        //url1="search/"
        //url3=".json"
        $.ajax({

                url: "http://172.17.13.162/cse383_final_project/final.php?method=getWeather&date=" + ecodedInput2,

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

function getSateliteImage() {

        var lon = document.getElementById("lon").innerText;
        var lat = document.getElementById("lat").innerText;
        var satURL = "https://api.nasa.gov/planetary/earth/imagery";

        var satURLBackHalf = "lat=" + lat + "&lon=" + lon + "api_key=B9s7aMUpoaRCFqHygyKyAe0n5OLzWEYAMndCnZnf";
        $.ajax({
                url: satURL + satURLBackHalf,
                type: "GET",
                success: function (data) {

                        console.log(data);
                        /*
                        $("#day1Text").html(data.list[1].dt_txt  + "<br>" + data.list[1].weather[0].main + "<br>" + "Temperature is " + data.list[1].main.temp + "<br>" + "Feels like "+ data.list[1].main.feels_like); 
                        $("#day1Marker").html(data.list[1].weather[0].main);	
                        var markerOne = document.getElementById('day1Marker').innerText;
                        document.getElementById("day1Image").src="http://openweathermap.org/img/wn/" + data.list[1].weather[0].icon + "@2x.png";
                        */
                },
                // Error handling
                error: function (error) {
                        alert("Error");
                }

        });
}