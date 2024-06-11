# Portfolio Site
This is a portfolio site for Patrick Heil; I repurposed a class project to demonstrate API experience and show off some basic web programming.

# Licensing
In the weather forecast page I used TomTom's Fuzzy Search API for getting coordinates from the entered address.
Then I used OpenMaps Weather Forecast API for getting the weather forecast by coordinates.
[TomTom Fuzzy Search API](https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search)
[OpenWeatherMap 5 Day Forecast](https://openweathermap.org/forecast5)

On the Satelite page I use TomTom's Fuzzy Search again for coordinates from the entered address. Those are sent to Nasa's Worldview API (the manual-user site is here https://worldview.earthdata.nasa.gov/) and returns 3 links to different satelite imagery of the same 10km x10km square centered on the given address. 
