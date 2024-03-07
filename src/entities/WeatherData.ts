import { City } from "./City";
import { ListItem } from "./ListItem";

export interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: ListItem[];
  city: City;
}
