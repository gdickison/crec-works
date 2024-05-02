'use client'
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  const [results, setResults] = useState([])

  return (
    <div className="relative pt-24 pb-12 bg-black xl:pt-48 sm:pb-16 lg:pb-32 xl:pb-48 2xl:pb-56">
      <div className="absolute inset-0">
        <img className="object-cover w-full h-full opacity-[65%]" src="/images/farm_work.jpg" alt="" />
      </div>
      <div className="relative space-y-4 md:space-y-8 lg:space-y-14">
        <div className="w-full h-full p-0.5 border-red-500 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 h-full m-2 p-0.5 border-green-500 flex justify-center">
            <div className="px-6 sm:px-8 lg:px-12 max-w-7xl">
              <div className="w-full lg:w-2/3">
                <h1 className="font-sans text-base font-normal tracking-tight text-white text-opacity-70">The business directory for members of the Communion of Reformed Evangelical Churches</h1>
                <p className="mt-2 md:mt-4 lg:mt-6 tracking-tighter text-white">
                  <span className="font-sans font-normal text-5xl xs:text-7xl xl:text-8xl">CREC</span>
                  <span className="font-serif italic font-normal text-6xl xs:text-8xl xl:text-9xl">Works</span>
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 h-full m-2 py-8 px-0.5 border-green-500 flex items-center">
              <CallToAction/>
          </div>
        </div>
        <div className="p-0.5 border-blue-500 py-4">
          <SearchBar
            setResults={setResults}
          />
        </div>
      </div>
    </div>
  );
}
