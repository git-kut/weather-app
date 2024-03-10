"use client";
import Container from "@/components/Container";
import ForecastWeatherDetails from "@/components/ForecastWeatherDetails";
import Navbar from "@/components/Navbar";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherIcon from "@/components/WeatherIcon";
import kelvinToCelsius from "@/utils/kelvinToCelsius";
import meterToKilometer from "@/utils/meterToKilometer";
import msToKmh from "@/utils/msToKmh";
import { format, fromUnixTime, parseISO } from "date-fns";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "./atom";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { WeatherData } from "@/entities/WeatherData";
import axios from "axios";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import SideScroller from "@/components/SideScroller";

export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);
  const [loading, setLoading] = useAtom(loadingCityAtom);

  const { isLoading, data, error, refetch } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.API_KEY}&cnt=56`
      );
      return data;
    },
    {
      staleTime: 600000, // 10 minutes
    }
  );

  let background = "";
  switch (data?.list[0].weather[0].main) {
    case "Snow":
      background = 'url("/snow.jpg")';
      break;
    case "Clouds":
      background = 'url("/clouds.jpg")';
      break;
    case "Rain":
      background = 'url("/rain.jpg")';
      break;
    case "Clear":
      background = 'url("/clear.jpg")';
      break;
    case "Drizzle":
      background = 'url("/drizzle.jpg")';
      break;
    case "Storm":
      background = 'url("/storm.jpg")';
      break;
    case "Atmosphere":
      background = 'url("/atmosphere.jpg")';
      break;
  }

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  const firstDate = data?.list[0];
  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];
  const dataFromEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading</p>
      </div>
    );

  if (error) throw error;

  return (
    <>
      <Navbar location={data?.city.name} />
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div
          className={`w-full h-full bg-cover bg-no-repeat`}
          style={{ backgroundImage: background }}
        >
          <main
            className={`px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full py-10`}
          >
            {/* todays data */}
            <section>
              {/* todays data & weather today */}
              <div>
                <div className="flex gap-1 items-end bg-slate-100/85 rounded-t-xl pl-4 pt-2">
                  <p className="text-2xl">
                    {format(parseISO(firstDate?.dt_txt || ""), "EEEE")}
                  </p>
                  <p className="text-lg">
                    ({format(parseISO(firstDate?.dt_txt || ""), "dd.MM.yyy")})
                  </p>
                </div>
                <Container className="gap-10 px-6 items-center rounded-b-xl">
                  {/* temparature now */}
                  <div className="text-center">
                    <span className="text-5xl">
                      {kelvinToCelsius(firstDate?.main.temp || 0)}°
                    </span>
                    <p className="text-xs space-x-1 whitespace-nowrap">
                      Feels like{" "}
                      {kelvinToCelsius(firstDate?.main.feels_like || 0)}°
                    </p>
                    <div className="text-xs space-x-2 text-nowrap">
                      <span>
                        {kelvinToCelsius(firstDate?.main.temp_max || 0)}° ↑{" "}
                      </span>
                      <span>
                        {kelvinToCelsius(firstDate?.main.temp_min || 0)}° ↓{" "}
                      </span>
                    </div>
                  </div>
                  {/* hourly weather */}
                  <SideScroller>
                    <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3 py-3">
                      {data?.list.map((weather, index) => (
                        <div
                          key={index}
                          className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                        >
                          <p className="whitespace-nowrap">
                            {format(parseISO(weather.dt_txt || ""), "h:mm a")}
                          </p>
                          <WeatherIcon iconName={weather.weather[0].icon} />
                          <p>{kelvinToCelsius(weather.main.temp || 0)}°</p>
                        </div>
                      ))}
                    </div>
                  </SideScroller>
                </Container>
              </div>
              {/*  */}
              <div className="flex gap-4 pt-4">
                {/* left */}
                <Container className="w-fit justify-center flex-col px-4 items-center rounded-xl">
                  <WeatherIcon iconName={firstDate?.weather[0].icon || ""} />
                  <p className="capitalize text-nowrap">
                    {firstDate?.weather[0].description}
                  </p>
                </Container>
                {/* right */}
                <Container className="bg-yellow-300/80 justify-between px-6 py-8 gap-4 overflow-x-auto rounded-xl">
                  <WeatherDetails
                    visibility={`${meterToKilometer(firstDate?.visibility)} km`}
                    humidity={`${firstDate?.main.humidity}%`}
                    airPressure={`${firstDate?.main.pressure} hPa`}
                    windSpeed={`${msToKmh(firstDate?.wind.speed || 0)} km/h`}
                    sunrise={format(
                      fromUnixTime(data?.city.sunrise || 0),
                      "H:mm"
                    )}
                    sunset={format(
                      fromUnixTime(data?.city.sunset || 0),
                      "H:mm"
                    )}
                  />
                </Container>
              </div>
            </section>
            {/* 7 day forecast */}
            <section className="flex w-full flex-col">
              <p className="text-2xl bg-slate-100/85 rounded-t-xl pl-4 pt-2">
                Seven Day Forecast
              </p>
              {dataFromEachDate.map((date, index) => (
                <ForecastWeatherDetails
                  key={index}
                  description={date?.weather[0].description || ""}
                  date={format(parseISO(date?.dt_txt || ""), "dd.MM")}
                  day={format(parseISO(date?.dt_txt || ""), "EEEE")}
                  WeatherIcon={date?.weather[0].icon || ""}
                  feels_like={date?.main.feels_like || 0}
                  temp={date?.main.temp || 0}
                  temp_max={date?.main.temp_max || 0}
                  temp_min={date?.main.temp_min || 0}
                  airPressure={`${date?.main.pressure} hPa`}
                  humidity={`${date?.main.humidity}%`}
                  sunrise={format(
                    fromUnixTime(data?.city.sunrise || 0),
                    "H:mm"
                  )}
                  sunset={format(fromUnixTime(data?.city.sunset || 0), "H:mm")}
                  visibility={`${meterToKilometer(date?.visibility)} km`}
                  windSpeed={`${msToKmh(firstDate?.wind.speed || 0)} km/h`}
                />
              ))}
            </section>
          </main>
        </div>
      )}
    </>
  );
}
