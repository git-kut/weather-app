import { WeatherDetail } from "./WeatherDetail";

export interface ForecastWeatherDetail extends WeatherDetail {
  WeatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}
