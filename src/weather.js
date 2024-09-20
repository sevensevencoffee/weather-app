const API_KEY = '2WRY6BGCZWGS69VAFJBEYAJ5E'; // Your actual API key
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';
const OPENCAGE_API_KEY = 'your_actual_opencage_api_key_here'; // Replace with your OpenCage API key

export async function fetchWeatherData(location) {
    const url = `${BASE_URL}/${encodeURIComponent(location)}?unitGroup=metric&key=${API_KEY}&contentType=json`;
    console.log('Fetching weather data from:', url);
    try {
        const response = await fetch(url, {
            mode: 'cors'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Received weather data:', data);
        return {
            current: processWeatherData(data),
            forecast: processForecastData(data)
        };
    } catch (error) {
        console.error('Error in fetchWeatherData:', error);
        throw error;
    }
}

function processWeatherData(data) {
    console.log('Processing weather data:', data);
    return {
        temperature: data.currentConditions.temp,
        description: data.currentConditions.conditions,
        location: data.resolvedAddress,
        humidity: data.currentConditions.humidity,
        windSpeed: data.currentConditions.windspeed,
        feelsLike: data.currentConditions.feelslike,
        // Add more fields as needed
    };
}

function processForecastData(data) {
    return data.days.slice(1, 8).map(day => ({
        date: new Date(day.datetime).toLocaleDateString(),
        tempMax: day.tempmax,
        tempMin: day.tempmin,
        description: day.conditions,
        icon: day.icon
    }));
}

export async function fetchCitySuggestions(query) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${OPENCAGE_API_KEY}&limit=5`;
    const response = await fetch(url, {
        mode: 'cors'
    });
    if (!response.ok) {
        throw new Error('Failed to fetch city suggestions');
    }
    const data = await response.json();
    return data.results.map(result => ({
        name: result.formatted,
        lat: result.geometry.lat,
        lng: result.geometry.lng
    }));
}