import { WeatherCondition } from '@/types/weather.types';

export function wmoToCondition(code: number): WeatherCondition {
  if (code === 0)                          return 'sunny';
  if (code <= 2)                           return 'partly-cloudy';
  if (code <= 48)                          return 'cloudy';   // 3 overcast, 45-48 fog
  if (code <= 82)                          return 'rainy';    // 51-82 drizzle / rain / showers
  if (code >= 95)                          return 'stormy';
  return 'cloudy';                                            // 85-86 snow (rare in VN)
}

export function wmoToLabel(code: number): string {
  if (code === 0)              return 'Trời quang';
  if (code <= 2)               return 'Ít mây';
  if (code === 3)              return 'Nhiều mây';
  if (code <= 48)              return 'Sương mù';
  if (code <= 57)              return 'Mưa phùn';
  if (code <= 67)              return 'Mưa';
  if (code <= 77)              return 'Tuyết';
  if (code <= 82)              return 'Mưa rào';
  if (code <= 86)              return 'Tuyết rào';
  return 'Dông bão';
}
