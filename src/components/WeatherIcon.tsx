import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";

type Props = { iconName: string; className?: string };

const WeatherIcon = ({ iconName, className }: Props) => {
  return (
    <div className={(cn("relative h-20 w-20"), className)}>
      <Image
        width={100}
        height={100}
        alt="weather-icon"
        className="h-full w-full"
        src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
      ></Image>
    </div>
  );
};

export default WeatherIcon;
