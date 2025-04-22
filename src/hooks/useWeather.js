import { useState, useEffect } from 'react';

const API_KEY = 'a394d3938797960a0e999e19dc7cd68e'; // Your Weatherstack API key

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (location) => {
      try {
        const response = await fetch(
          `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${location}`
        );
        
        if (!response.ok) {
          throw new Error('Weather data unavailable');
        }
        
        const data = await response.json();
        
        if (!data || !data.current) {
          throw new Error('Invalid weather data');
        }

        setWeather({
          temp: data.current.temperature,
          condition: data.current.weather_descriptions[0],
          icon: data.current.weather_icons[0],
          city: data.location.name,
          region: data.location.region,
          country: data.location.country
        });
      } catch (err) {
        setError(err.message || 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    if (!navigator.geolocation) {
      // Fallback to New York if geolocation not available
      fetchWeather('New York');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(`${latitude},${longitude}`);
      },
      (err) => {
        // Fallback to New York if location access denied
        fetchWeather('New York');
      }
    );
  }, []);

  return { weather, loading, error };
}