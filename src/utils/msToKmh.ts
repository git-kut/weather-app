import React from "react";

const msToKmh = (meterPerSecData: number): number => {
  const kilometerPerHour = meterPerSecData * 3.6;
  return Math.floor(kilometerPerHour);
};

export default msToKmh;
