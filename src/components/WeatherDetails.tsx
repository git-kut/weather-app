import React from "react";
import WeatherDetail from "./WeatherDetail";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";

type Props = {
  visibility?: string;
  humidity?: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
};

const WeatherDetails = ({
  visibility,
  humidity,
  windSpeed,
  airPressure,
  sunrise,
  sunset,
}: Props) => {
  return (
    <>
      <WeatherDetail
        icon={<LuEye />}
        info="Visibility"
        value={visibility}
      ></WeatherDetail>
      <WeatherDetail
        icon={<FiDroplet />}
        info="Humidity"
        value={humidity}
      ></WeatherDetail>
      <WeatherDetail
        icon={<MdAir />}
        info="Wind Speed"
        value={windSpeed}
      ></WeatherDetail>
      <WeatherDetail
        icon={<ImMeter />}
        info="Air Pressure"
        value={airPressure}
      ></WeatherDetail>
      <WeatherDetail
        icon={<LuSunrise />}
        info="Sunrise"
        value={sunrise}
      ></WeatherDetail>
      <WeatherDetail
        icon={<LuSunset />}
        info="Sunset"
        value={sunset}
      ></WeatherDetail>
    </>
  );
};

export default WeatherDetails;
