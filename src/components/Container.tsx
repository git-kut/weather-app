import { cn } from "@/utils/cn";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <div
      className={`w-full bg-slate-100/85 border-none flex py-4 shadow-sm,
        ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
