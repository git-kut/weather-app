import { Clouds } from "./Clouds";
import { Main } from "./Main";
import { Sys } from "./Sys";
import { Weather } from "./Weather";
import { Wind } from "./Wind";

export interface ListItem {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}
