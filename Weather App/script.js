document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    document.getElementById("result").innerText = "❗ Please enter a city!";
    return;
  }

  getCoordinates(city);
});

function getCoordinates(city) {
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
    .then(res => res.json())
    .then(data => {
      if (!data.results || data.results.length === 0) {
        document.getElementById("result").innerText = "❌ City not found!";
        return;
      }
      const location = data.results[0];
      getWeather(location.latitude, location.longitude, location.name, location.country);
    })
    .catch(() => {
      document.getElementById("result").innerText = "⚠ Error fetching coordinates!";
    });
}

function getWeather(lat, lon, cityName, country) {
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    .then(res => res.json())
    .then(data => {
      const weather = data.current_weather;
      document.getElementById("result").innerHTML = `
        📍 <b>${cityName}, ${country}</b><br/>
        🌡 Temperature: ${weather.temperature}°C<br/>
        🌬 Wind Speed: ${weather.windspeed} km/h<br/>
        🌞 Weather Code: ${weather.weathercode}
      `;
    })
    .catch(() => {
      document.getElementById("result").innerText = "⚠ Error fetching weather!";
    });
}
