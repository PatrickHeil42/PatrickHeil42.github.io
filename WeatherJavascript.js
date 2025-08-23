// 1) Fetch data from remote API

showRadar();

async function getP() {

  try {

    const response = await fetch('https://api.weather.gov/gridpoints/LOT/75,72/forecast');

    if (response.ok) {

      const data = await response.json();

      console.log(data);

      //should be object.properties.periods[1] from json



      const data1 = data.properties.periods[1]

      const data2 = data.properties.periods[2]

      const data3 = data.properties.periods[3]

      const data4 = data.properties.periods[4]

      const data5 = data.properties.periods[5]


      //Filling in period name divs(Today, Tonight, Tomorrow Afternoon Etc)

      document.getElementById("name1").innerHTML = data1.name



      document.getElementById("name2").innerHTML = data2.name



      document.getElementById("name3").innerHTML = data3.name



      document.getElementById("name4").innerHTML = data4.name



      document.getElementById("name5").innerHTML = data5.name

      //Filling in temperature divs

      document.getElementById("Temp1").innerHTML = JSON.stringify(data1.temperature) + "°F"


      document.getElementById("Temp2").innerHTML = JSON.stringify(data2.temperature) + "°F"


      document.getElementById("Temp3").innerHTML = JSON.stringify(data3.temperature) + "°F"


      document.getElementById("Temp4").innerHTML = JSON.stringify(data4.temperature) + "°F"


      document.getElementById("Temp5").innerHTML = JSON.stringify(data5.temperature) + "°F"



      // Filling in Forecast divs



      document.getElementById("Forecast1").innerHTML = data1.shortForecast


      document.getElementById("Forecast2").innerHTML = data2.shortForecast


      document.getElementById("Forecast3").innerHTML = data3.shortForecast


      document.getElementById("Forecast4").innerHTML = data3.shortForecast


      document.getElementById("Forecast5").innerHTML = data3.shortForecast





    } else {

      throw new Error('Failed to fetch data');

    }

  } catch (error) {

    console.error('Error:', error);

  }

}

getP();



async function getWeather() {

  fetch('https://api.weather.gov/points/39.7456,-97.0892') // Replace with desired latitude and longitude

    .then(response => response.json())

    .then(data => {

      console.log(data);

      return (data);

    })

    .catch(error => {

      console.error('Error fetching weather data:', error);

    });

}
function showRadar() {
  var x = document.getElementById("radarDiv");
  var y = document.getElementById("radarButton");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.innerHTML = "Hide Radar";
  } else {
    y.innerHTML = "Show Radar";
    x.style.display = "none";
  }
}

getWeather();