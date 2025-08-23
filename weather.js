//Weather API I used: https://creativecommons.org/licenses/by/4.0/
//$("#day1Marker").html(data.list[0].weather[0].main);	
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
    var apiURL = "https://api.weather.gov/points/" + lat + "," + lon;
    $.ajax({

        url: apiURL,
        type: "GET",
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            alert("Error");
        }
    });

}
function getCoordsPageBroken() {
    alert("Page under construction");

};

