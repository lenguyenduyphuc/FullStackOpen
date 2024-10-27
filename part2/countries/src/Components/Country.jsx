import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const [lat, lon] = country.capitalInfo.latlng

    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat: lat,
          lon: lon,
          appid: import.meta.env.VITE_API_KEY, 
          units: 'metric', 
        },
      })
      .then((response) => {
        setWeather(response.data)
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch weather data.');
      });
  }, [country.capitalInfo, import.meta.env.VITE_API_KEY]);

  if (weather) {
    const temperature = weather.main?.temp
    const weatherDesc = weather.weather?.[0]?.description
    const windSpeed = weather.wind?.speed
    const humid = weather.main?.humidity

    const iconCode = weather.weather?.[0]?.icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    return (
      <div>
        <h1>{country.name.official}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Population: {country.population} (person)</p>
        <p>Area: {country.area} (km2)</p>
        <span>
          Currency: {Object.values(country.currencies).map((currency) => (
            <span key={currency.name}>
              {currency.name} ({currency.symbol})
            </span>
          ))}
        </span>
        <h2>Spoken Languages</h2>
        <p>
          {Object.values(country.languages).map((language, index) => (
            <div key={index}>{language}</div>
          ))}
        </p>
        <img src={country.flags.svg} alt={country.flags.alt} width="300" />
        <p>{country.flags.alt}</p>
        <h2>Weather in {country.capital[0]}</h2>
        <p>Temperature: {temperature}°C</p>
        <p>Weather: {weatherDesc}</p>
        <img src={iconUrl} alt="Weather icon" />
        <p>Humid: {humid}%</p>
        <p>Wind Speed: {windSpeed} m/s</p>
      </div>
    );
  }

  return <p>Loading weather data...</p>
}

export default Country
