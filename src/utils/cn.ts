import clsx, { ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};
