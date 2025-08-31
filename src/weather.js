const API_KEY = "";
const URL = "";

const searchBar = document.querySelector(".search input");
const searchBttn = document.querySelector(".search img");
const image = document.querySelector(".imageInner img");

//hiding items elements
const h1 = document.querySelector(".cityName");
const temp = document.querySelector(".te");
const stat = document.querySelector(".status");
const win = document.querySelector(".wind");
const hum = document.querySelector(".humidity");
const pre = document.querySelector(".pressure");
const img = document.querySelector(".imageInner img");
const loader = document.querySelector(".loader");

//

async function checkWeather(city) {
  const response = await fetch(URL + city + `&appid=${API_KEY}`);
  let data = await response.json();

  console.log(data);

  if (response.status == 404 || searchBar.value.trim() == "") {
    h1.innerHTML = "INVALID CITY NAME";
    h1.style.cssText = "color:red;display:block;";
    img.style.display = "none";
    temp.style.display = "none";
    stat.style.display = "none";
    win.style.display = "none";
    hum.style.display = "none";
    pre.style.display = "none";
    loader.style.display = "block";
    return;
  }

  h1.style.color = "white";
  h1.style.display = "block";
  img.style.display = "block";
  temp.style.display = "block";
  stat.style.display = "block";
  win.style.display = "block";
  hum.style.display = "block";
  pre.style.display = "block";
  loader.style.display = "none";

  document.querySelector(".cityName").innerHTML = data.name;
  document.querySelector(".te").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".status").textContent = data.weather[0].main;
  document.querySelector(".wi").textContent =
    "Wind : " + data.wind.speed + " Km/h";
  document.querySelector(".hu").textContent =
    "Humidity : " + data.main.humidity + " %";
  document.querySelector(".pr").textContent =
    "Pressure : " + data.main.pressure + " mbar";

  if (data.weather[0].main == "Clouds") {
    image.src = "/assets/cloudy.png";
  } else if (data.weather[0].main == "Clear") {
    image.src = "/assets/clear.png";
  } else if (data.weather[0].main == "Drizzle") {
    image.src = "/assets/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    image.src = "/assets/mist.png";
  } else if (data.weather[0].main == "Rain") {
    image.src = "/assets/rain.png";
  } else if (data.weather[0].main == "snow") {
    image.src = "/assets/snow.png";
  }
}

searchBar.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    checkWeather(searchBar.value.trim());
  }
});

searchBttn.addEventListener("click", () => {
  checkWeather(searchBar.value.trim());
});
