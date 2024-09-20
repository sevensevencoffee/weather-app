import './styles.css';
import { fetchWeatherData, fetchCitySuggestions } from './weather.js';
import { displayWeatherInfo, showLoading, hideLoading, displayError, setupAutocomplete } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    setupAutocomplete();

    document.getElementById('weather-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const location = document.getElementById('location').value;
        showLoading();
        try {
            console.log('Fetching weather data for:', location);
            const weatherData = await fetchWeatherData(location);
            console.log('Received weather data:', weatherData);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            displayError(`Failed to fetch weather data: ${error.message}`);
        } finally {
            hideLoading();
        }
    });
});