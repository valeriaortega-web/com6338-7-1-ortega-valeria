
var weather = document.querySelector("#weather");
var form = document.querySelector("form");
var searchInput = document.querySelector("#weather-search");
var apiKey = "f276c388da809063412eff089a8a6538";


form.addEventListener("submit", function(event) {
  event.preventDefault();

  var userQuery = searchInput.value;
  searchInput.value = "";
  weather.innerHTML = "";

    var weatherURL = "https://api.openweathermap.org/data/2.5/weather";

    var queryString = "?units=imperial&appid=" + apiKey + "&q=" + userQuery;

    var fetchURL = weatherURL + queryString;

    
    fetch(fetchURL)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Location not found");
            }
            return response.json();
        })
        .then(function(data) {
            var mapURL = "https://www.google.com/maps/search/?api=1&query=" +
                data.coord.lat + "," + data.coord.lon;

            var date = new Date(data.dt * 1000);

            var timeString = date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit"
            });

            weather.innerHTML =
                "<h2>" + data.name + ", " + data.sys.country + "</h2>" +
                '<a href="' + mapURL + '" target="_blank">Click to view map</a>' +
                '<br><img src="https://openweathermap.org/img/wn/' +
                data.weather[0].icon + '@2x.png" alt="Weather icon">' +
                '<p style="text-transform: capitalize;">' +
                data.weather[0].description + '</p><br>' +
                '<p>Current: ' + data.main.temp + '° F</p>' +
                '<p>Feels like: ' + data.main.feels_like + '° F</p><br>' +
                '<p>Last updated: ' + timeString + '</p>';
        })
        .catch(function(error) {
            weather.innerHTML = "<p>Location Not Found</p>";
        });
    });