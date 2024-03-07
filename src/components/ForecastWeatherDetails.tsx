import React from "react";
import Container from "./Container";
import WeatherIcon from "./WeatherIcon";
import { ForecastWeatherDetail } from "@/entities/ForecastWeatherDetail";
import kelvinToCelsius from "@/utils/kelvinToCelsius";
import WeatherDetails from "./WeatherDetails";
import WeatherDetail from "./WeatherDetail";

const ForecastWeatherDetails = (props: ForecastWeatherDetail) => {
  return (
    <Container className="gap-4 flex px-2 border-b-4 border-black">
      {/* left section */}
      <section className="flex gap-4 items-center">
        <div className="flex flex-col items-center mb-5">
          <WeatherIcon className="-mb-4" iconName={props.WeatherIcon} />
          <p>{props.day}</p>
          <p className="text-sm">{props.date}</p>
        </div>
        {/*  */}
        <div className="flex flex-col">
          <p className="text-4xl space-x-1 whitespace-nowrap">
            {kelvinToCelsius(props.temp)}°
          </p>
          <div className="text-xs space-x-1 whitespace-nowrap">
            <p>Feels like {kelvinToCelsius(props.feels_like)}°</p>
          </div>
          <p className="capitalize text-l">{props.description}</p>
        </div>
      </section>
      {/* right section */}
      <section className="overflow-x-auto flex justify-between gap-4 px-10 py-4 w-full">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
};

export default ForecastWeatherDetails;
