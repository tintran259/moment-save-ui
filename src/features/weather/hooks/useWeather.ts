import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';
import { fetchWeather } from '../api/fetchWeather';
import { wmoToCondition, wmoToLabel } from '../utils/wmoCode';
import type { WeatherCondition } from '@/types/weather.types';

interface Coords {
  lat: number;
  lon: number;
}

export interface WeatherState {
  temp:      number | null;
  condition: WeatherCondition | null;
  label:     string;
  city:      string;
  isLoading: boolean;
  isError:   boolean;
}

const HCM_FALLBACK: Coords = { lat: 10.8231, lon: 106.6297 };

export const useWeather = (): WeatherState => {
  const [coords,   setCoords]   = useState<Coords | null>(null);
  const [city,     setCity]     = useState('');
  const [locReady, setLocReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setCoords(HCM_FALLBACK);
          setCity('TP.HCM');
          setLocReady(true);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        const { latitude, longitude } = loc.coords;
        setCoords({ lat: latitude, lon: longitude });

        // Reverse geocode separately — failure must NOT override real coords
        try {
          const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
          setCity(
            place?.subregion ?? place?.city ?? place?.region ?? 'Vị trí hiện tại',
          );
        } catch {
          setCity('Vị trí hiện tại');
        }
      } catch {
        setCoords(HCM_FALLBACK);
        setCity('TP.HCM');
      } finally {
        setLocReady(true);
      }
    })();
  }, []);

  const { data, isLoading: queryLoading, isError } = useQuery({
    queryKey: ['weather', coords?.lat, coords?.lon],
    queryFn:  () => fetchWeather(coords!.lat, coords!.lon),
    enabled:   !!coords,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });

  return {
    temp:      data?.temp ?? null,
    condition: data ? wmoToCondition(data.weatherCode) : null,
    label:     data ? wmoToLabel(data.weatherCode) : '',
    city,
    isLoading: !locReady || queryLoading,
    isError,
  };
};
