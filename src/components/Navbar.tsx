"use client";

import React, { useState } from "react";
import { MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import SearchBox from "./SearchBox";
import axios from "axios";
import AutoComplete from "./AutoComplete";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "@/app/atom";

type Props = { location?: string };

const Navbar = ({ location }: Props) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [place, setPlace] = useAtom(placeAtom);
  const [loading, setLoading] = useAtom(loadingCityAtom);

  async function handleInputChange(entry: string) {
    setCity(entry);

    if (entry.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${entry}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const suggestions = response.data.list.map((city: any) => city.name);
        console.log(suggestions);

        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSuggestionClick(entry: string) {
    setCity(entry);
    setPlace(entry);
    setShowSuggestions(false);
  }

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    if (suggestions.length == 0) {
      setError("Location not found");
    } else {
      setError("");
      setTimeout(() => {
        setLoading(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  }

  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLoading(true);
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
          );
          setTimeout(() => {
            setLoading(false);
            setPlace(response.data.name);
          }, 500);
        } catch (error) {
          setLoading(false);
        }
      });
    }
  }

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex flex-col justify-between items-center max-w-7xl px-1 md:px-3 mx-auto my-3 md:my-0   md:flex-row">
        <div
          className="flex items-center justify-center gap-2 cursor-pointer"
          onClick={() => {
            setPlace("Sweden");
            setCity("Sweden");
          }}
        >
          <h2 className="text-gray-500 text-3xl">Weather</h2>
          <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
        </div>
        <section id="right-side" className="flex items-center gap-1">
          <MdMyLocation
            onClick={handleCurrentLocation}
            className="text-xl text-gray-600 opacity-90 hover:opacity-100 cursor-pointer"
          />
          {/* <MdOutlineLocationOn className="text-3xl text-gray-600 opacity-90" /> */}
          <p className="text-slate-900/80 text-sm">| {location}</p>
          <div className="relative md:flex">
            <SearchBox
              value={city}
              onChange={(entry: string) => handleInputChange(entry)}
              onSubmit={handleSubmitSearch}
            />
            <AutoComplete
              error={error}
              handleSuggestionClick={handleSuggestionClick}
              suggestions={suggestions}
              showSuggestions={showSuggestions}
            />
          </div>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
