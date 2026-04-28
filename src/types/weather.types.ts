export type WeatherCondition = 'sunny' | 'partly-cloudy' | 'cloudy' | 'rainy' | 'stormy';

export interface WeatherApiResult {
  temp: number;
  weatherCode: number;
}
