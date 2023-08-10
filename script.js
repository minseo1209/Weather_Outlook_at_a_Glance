const apiKey = '0159c4e3a5f905c453a33a40e6e233d4';

// HTML 요소 선택
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const backgroundElement = document.getElementById('background'); // 배경 요소 선택
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

// 날씨 정보 가져오는 함수
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

const grayElements = document.getElementsByClassName('gray');

const rainElemnts = document.getElementsByClassName('rain');

const ThunderElemnts = document.getElementsByClassName('Thunder');
const snowElemnts = document.getElementsByClassName('snow');
const skyElements = document.getElementsByClassName('sky'); // 모든 sky 클래스 요소를 선택

// 배경 설정 함수
function setWeatherBackground(weather) {
  weather = weather.toLowerCase();
  if (weather === 'clear') {
    for (let i = 0; i < skyElements.length; i++) {
      skyElements[i].style.opacity = '1';
      grayElements[i].style.opacity = '0';
      rainElemnts[i].style.opacity = '0';
      snowElemnts[i].style.opacity = '0';
      ThunderElemnts[i].style.opacity = '0';
    }
  } else if (weather === 'clouds') {
    for (let i = 0; i < grayElements.length; i++) {
      rainElemnts[i].style.opacity = '0';
      grayElements[i].style.opacity = '1';
      skyElements[i].style.opacity = '0';
      ThunderElemnts[i].style.opacity = '0';
      snowElemnts[i].style.opacity = '0';
    }
  } else if (weather === 'rain' || weather === 'drizzle') {
    for (let i = 0; i < rainElemnts.length; i++) {
      rainElemnts[i].style.opacity = '1';
      grayElements[i].style.opacity = '0';
      skyElements[i].style.opacity = '0';
      ThunderElemnts[i].style.opacity = '0';
      snowElemnts[i].style.opacity = '0';
    }
  } else if (weather === 'thunderstorm') {
    for (let i = 0; i < ThunderElemnts.length; i++) {
      rainElemnts[i].style.opacity = '0';
      grayElements[i].style.opacity = '0';
      skyElements[i].style.opacity = '0';
      ThunderElemnts[i].style.opacity = '1';
      snowElemnts[i].style.opacity = '0';
    }
  } else if (weather === 'snow') {
    for (let i = 0; i < snowElemnts.length; i++) {
      rainElemnts[i].style.opacity = '0';
      grayElements[i].style.opacity = '0';
      skyElements[i].style.opacity = '0';
      snowElemnts[i].style.opacity = '1';
      ThunderElemnts[i].style.opacity = '0'; // 눈 배경
    }
  } else {
    back.style.backgroundColor = 'lightgray'; // 기타 배경
  }
}

// 날씨 정보 업데이트 함수
async function updateWeather(city) {
  try {
    const weatherData = await getWeather(city);
    locationElement.textContent = weatherData.name;
    temperatureElement.textContent = weatherData.main.temp;
    descriptionElement.textContent = weatherData.weather[0].description;

    // 날씨 정보에 따라 배경 설정
    setWeatherBackground(weatherData.weather[0].main);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// 폼 제출 이벤트 처리
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = searchInput.value;
  updateWeather(city);
  searchInput.value = ''; // 입력 필드 초기화
});

// 초기화
searchInput.value = ''; // 입력 필드 초기화

// 버튼 이벤트
function btn_click() {
  const data = document.getElementById('data');
  const btn = document.getElementById('btn');
  if (data.style.display !== 'none') {
    data.style.display = 'none';
    btn.value = '영문 리스트 보여주기';
  } else {
    data.style.display = 'block';
    btn.value = '감추기';
  }
}
