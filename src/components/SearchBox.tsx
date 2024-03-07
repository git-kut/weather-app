import { cn } from "@/utils/cn";
import React, { RefAttributes, RefObject } from "react";
import { IoSearch } from "react-icons/io5";

type Props = {
  onChange: (entry: string) => void;
  onSubmit: (entry: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  value: string;
};

const SearchBox = ({ onChange, onSubmit, className, value }: Props) => {
  /* const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value); // Pass the input value to the onChange handler
  }; 
 */
  return (
    <form
      className={cn(
        "flex relative items-center justify-center h-10",
        className
      )}
      onSubmit={onSubmit}
    >
      <input
        type="text"
        placeholder="Search..."
        className="px-4 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full z-100"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      <button
        type={"submit"}
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 h-full"
      >
        <IoSearch />
      </button>
    </form>
  );
};

export default SearchBox;
