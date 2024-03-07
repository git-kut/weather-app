const meterToKilometer = (meterData: number = 0): number => {
  const kilometer = meterData / 1000;
  return Math.floor(kilometer);
};

export default meterToKilometer;
