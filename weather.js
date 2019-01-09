// 유저의 Location 좌표 정보를 읽어서 그정보를 저장하고 만약 저장값이 없다면 요청하고, 저장값이 있다면 아무것도 Noting.
// javascript는 웹사이트로 Request를 보내고 응답을 통해서 데이터를 얻을 수 있는데 가져온 데이터를 Refresh 없이돋 웹사이트에 적용시킬 수 있다.
// API_KEY -> openweather site에서 제공하는 날씨정보 API
// API(Application Programming Interface)는 다른 서버로부터 손쉽게 데이터를 가져올 수 있는 수단이다.
// API는 특정 웹사이트로부터 데이터를 얻거나 컴퓨터끼리 소통하기 위해 고안되었다.
const weather = document.querySelector(".js-weather");

const API_KEY = "eb18d106aad0636153883678f8fdb70c";
const COORDS = "coords";

function getWeather(lat, lng) {
  //데이터를 얻는 방법은 fetch를 사용.
  fetch(
    //API_ID에 API_KEY를 넣어주면 API를 제공하는 쪽에서 요청자의 API KEY를 통해서, 빡세게 요청하지는 않는지 알 수 있다.
    //Free API이기 떄문에 자기들 서버에 무리가 갈 만큼의 트래픽 check.
    //then 함수를 호출하는데 데이터가 나한테 완전히 들어 왔을때 호출한다.(데이터가 들어오는데 시간이 걸린다.)
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json(); //json으로 된 날씨 정보들을 받는다.
    })
    .then(function(json) {
      const temperature = json.main.temp;
      const place = json.name;
      console.log(weather);
      weather.innerText = `${temperature}c @ ${place}`;
    });
}

function saveCoords(coordsObj) {
  //coordsObj = 좌표를 저장하는 함수
  localStorage.setItem(COORDS, JSON.stringify(coordsObj)); //string type으로 localstorage에  coords를 setItem 한다!
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
function handleGeoError() {
  console.log("Cant access geo location");
}
//좌표를 요청하는 함수
function askForCoords() {
  //API__navigatior
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    //정보가 없을때 askForCoords 함수를 실행하자.
    askForCoords();
  } else {
    // getWeather
    //local Storage에 아무것도 없으면 getWeather 함수가 실행된다.
    //Because local Storage에 아무것도 없으면 askForCoords 함수가 실행되고, 이 함수 안에서 정상적으로 위치정보를 가져오게 되면
    //handleGeoSuccess가 실행되는데, 이 안에서 API가 최종적으로 호출되기 떄문이다.
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();
