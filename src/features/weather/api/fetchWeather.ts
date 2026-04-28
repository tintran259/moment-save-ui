import axios from 'axios';
import { WeatherApiResult } from '@/types/weather.types';

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
  };
}

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherApiResult> => {
  const { data } = await axios.get<OpenMeteoResponse>(
    'https://api.open-meteo.com/v1/forecast',
    {
      params: {
        latitude:  lat.toFixed(4),
        longitude: lon.toFixed(4),
        current:   'temperature_2m,weather_code',
        timezone:  'auto',
      },
      timeout: 8000,
    },
  );

  return {
    temp:        Math.round(data.current.temperature_2m),
    weatherCode: data.current.weather_code,
  };
};
