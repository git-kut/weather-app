import React, { ReactNode } from "react";

type Props = {
  info: string;
  icon: ReactNode;
  value?: string | number;
};

const WeatherDetail = ({ info, icon, value }: Props) => {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
      <div className="text-3xl">{icon}</div>
      <p className="whitespace-nowrap">{info}</p>
      <p>{value}</p>
    </div>
  );
};

export default WeatherDetail;
