import { useWeather } from '../hooks/useWeather';

const weatherIcons = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Snow: '❄️',
  Thunderstorm: '⛈️',
  Drizzle: '🌦️',
  Mist: '🌫️',
  Smoke: '💨',
  Haze: '🌫️',
  Dust: '💨',
  Fog: '🌫️',
  Sand: '💨',
  Ash: '💨',
  Squall: '💨',
  Tornado: '🌪️',
};

export default function WeatherDisplay() {
  const { weather, loading, error } = useWeather();

  if (loading) return <div className="weather-display loading">Loading weather...</div>;
  if (error) return <div className="weather-display error">Weather data unavailable</div>;

  return (
    <div className="weather-display">
      <h3>Current Weather</h3>
      <div className="weather-info">
        <div className="weather-icon">
          {weatherIcons[weather.condition] || '🌈'}
        </div>
        <div className="weather-details">
          <p>{weather.city}</p>
          <p>{weather.temp}°C</p>
          <p>{weather.condition}</p>
        </div>
      </div>
    </div>
  );
}