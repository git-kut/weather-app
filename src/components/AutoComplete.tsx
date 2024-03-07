import React from "react";

type Props = {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (entry: string) => void;
  error: string;
};

const AutoComplete = ({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: Props) => {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-2">{error}</li>
          )}
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AutoComplete;
