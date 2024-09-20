import { fetchCitySuggestions } from './weather.js';

export function displayWeatherInfo(weatherData) {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = `
        <h2>Current Weather for ${weatherData.current.location}</h2>
        <p>Temperature: ${weatherData.current.temperature}°C</p>
        <p>Feels like: ${weatherData.current.feelsLike}°C</p>
        <p>Humidity: ${weatherData.current.humidity}%</p>
        <p>Wind Speed: ${weatherData.current.windSpeed} km/h</p>
        <p>Description: ${weatherData.current.description}</p>
        <h3>7-Day Forecast</h3>
        <div id="forecast-container"></div>
    `;

    const forecastContainer = document.getElementById('forecast-container');
    weatherData.forecast.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('forecast-day');
        dayElement.innerHTML = `
            <p>${day.date}</p>
            <p>High: ${day.tempMax}°C</p>
            <p>Low: ${day.tempMin}°C</p>
            <p>${day.description}</p>
        `;
        forecastContainer.appendChild(dayElement);
    });
}

export function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('weather-info').innerHTML = '';
}

export function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

export function displayError(message) {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = `<p class="error" style="color: red;">${message}</p>`;
    console.error('Displaying error:', message);
}

export function setupAutocomplete() {
    const input = document.getElementById('location');
    const autocompleteList = document.getElementById('autocomplete-list');

    input.addEventListener('input', async () => {
        const query = input.value.trim();
        if (query.length < 3) {
            autocompleteList.innerHTML = '';
            return;
        }

        try {
            const suggestions = await fetchCitySuggestions(query);
            displaySuggestions(suggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    });
}

function displaySuggestions(suggestions) {
    const autocompleteList = document.getElementById('autocomplete-list');
    autocompleteList.innerHTML = '';

    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.innerHTML = suggestion.name;
        div.addEventListener('click', () => {
            document.getElementById('location').value = suggestion.name;
            autocompleteList.innerHTML = '';
        });
        autocompleteList.appendChild(div);
    });
}