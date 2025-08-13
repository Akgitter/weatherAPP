const searchElement = document.querySelector("[data-city-search]");

const searchBox = new google.maps.places.SearchBox(searchElement);
searchBox.addListener("places_changed", () => {
  const place = searchBox.getPlaces()[0];
  if (place == null) return;
  const latitude = place.geometry.location.lat();
  const longitude = place.geometry.location.lng();
  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setWeatherData(data, place.formatted_address);
    });
});

const weatherIconElement = document.querySelector("[weathericon]");
const locationElement = document.querySelector("[data-location]");
const statusElement = document.querySelector("[data-status]");
const temperatureElement = document.querySelector("[data-temperature]");
const precipitationElement = document.querySelector("[data-precipitation]");
const windElement = document.querySelector("[data-wind]");

function setWeatherData(data, place) {
  locationElement.textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
  statusElement.textContent = `${data.current.condition.text}`;
  temperatureElement.textContent = `${data.current.temp_c}°C`;
  precipitationElement.textContent = `${data.current.precip_mm} mm`;
  windElement.textContent = `${data.current.wind_kph} kph`;
  const iconUrl = `https:${data.current.condition.icon}`;
  weatherIconElement.src = iconUrl;
}
