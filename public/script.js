let weather = document.getElementById("weather-div");
const appKey = "a1940f6091cee8f1939beaa1ed9a82dc";
let input = document.getElementById("pac-input");

initAutocomplete = () => {
  //   let map = new google.maps.Map(document.getElementById("map"));
  let searchBox = new google.maps.places.SearchBox(input);
  //   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  searchBox.addListener("places_changed", () => {
    let places = searchBox.getPlaces();
    let lat = places[0].geometry.location.lat();
    let lon = places[0].geometry.location.lng();
    if (places.length == 0) {
      return;
    }
    if (!input.value == "") {
      let searchLink =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&" +
        "lon=" +
        lon +
        "&appid=" +
        appKey;
      requestAsync(searchLink, theResponse);
    }
    console.log(places[0].geometry.location.lng());
    console.log(places[0].geometry.location.lat());
  });
};
window.onload = () => {
  input.addEventListener("keydown", e => {
    if (e.keyCode === 13) {
      initAutocomplete();
    }
  });
};

theResponse = response => {
  let jsonObject = JSON.parse(response);
  let arr = jsonObject.list;
  weather.innerHTML +=
    "<thead><tr><td scope='row'>" +
    "Date" +
    "</td>" +
    "<td scope='col'>" +
    "Temperature (Celsium)" +
    "</td>" +
    "<td scope='col'>" +
    "Weather condition" +
    "</td></tr></thead>";
  for (let i = 0; i < arr.length; i++) {
    weather.innerHTML +=
      "<tbody><tr><td scope='row'>" +
      arr[i].dt_txt +
      "</td><td>" +
      parseInt(arr[i].main.temp - 273) +
      "°" +
      "</td><td>" +
      arr[i].weather[0].description +
      "</td></tr></tbody>";
  }
  console.log(jsonObject.list);
};

requestAsync = (url, callback) => {
  var request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200)
      callback(request.responseText);
  };
  request.open("GET", url, true);
  request.send();
};
