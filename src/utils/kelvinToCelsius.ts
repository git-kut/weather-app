import React from "react";

const kelvinToCelsius = (kelvinData: number): number => {
  const celsius = kelvinData - 273.15;
  return Math.floor(celsius);
};

export default kelvinToCelsius;
