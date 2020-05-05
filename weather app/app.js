const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {
    
    // const cityDet = data.cityDet;
    // const weather = data.weather;

    const {cityDet,weather} = data;

    details.innerHTML = `
        <h2 class="city">${cityDet.EnglishName}</h2>
        <p1 class="weather">${weather.WeatherText}</p1>
        <div class="display">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>  
    `
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);

    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    } else {
        timeSrc = 'img/night.svg'
    }

    time.setAttribute('src',timeSrc);

}




const updateCity = async (city) => {

    const cityDet = await getCity(city);
    const weather = await getWeather(cityDet.Key);

    return {
        cityDet: cityDet,
        weather: weather
    }
}

cityForm.addEventListener('submit', e => {
    
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
})