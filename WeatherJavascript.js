// 1) Fetch data from remote API

 

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

             //Filling in period name divs(Today, Tonight, Tomorrow Afternoon Etc)

          document.getElementById("name1").innerHTML = JSON.stringify(data1.name)

 

          document.getElementById("name2").innerHTML = JSON.stringify(data2.name)

 

          document.getElementById("name3").innerHTML = JSON.stringify(data3.name)

             //Filling in temperature divs

          document.getElementById("Temp1").innerHTML = JSON.stringify(data1.temperature) + "°F"

 

          document.getElementById("Temp2").innerHTML = JSON.stringify(data2.temperature)+ "°F"

 

          document.getElementById("Temp3").innerHTML = JSON.stringify(data3.temperature)+ "°F"

       

          // Filling in Forecast divs

         

          document.getElementById("Forecast1").innerHTML = JSON.stringify(data1.shortForecast)

 

          document.getElementById("Forecast2").innerHTML = JSON.stringify(data2.shortForecast)

 

          document.getElementById("Forecast3").innerHTML = JSON.stringify(data3.shortForecast)

         

 

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

    return(data);

  })

  .catch(error => {

    console.error('Error fetching weather data:', error);

  });

}

getWeather();