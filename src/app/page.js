// 'use client'
/* eslint-disable @next/next/no-img-element */
import { getLoggedInUser } from "@/app/appwrite/config";
import SearchBar from "@/components/SearchBar";
import CallToAction from "@/components/CallToAction";
import Categories from "@/components/Categories";
import Pricing from "@/components/Pricing";
import Header from "@/components/Header";
import Link from "next/link";

export default async function Home() {
  const user = await getLoggedInUser();

  return (
    <div>
      <div className="relative pt-24 pb-12 bg-black xl:pt-48 sm:pb-16 lg:pb-32 xl:pb-48 2xl:pb-56">
        <Header user={user} />
        <div className="absolute inset-0">
          <img className="object-cover w-full h-full opacity-[65%]" src="/images/farm_work.jpg" alt="" />
        </div>
        <div className="relative space-y-4 md:space-y-8 lg:space-y-14 max-w-screen-2xl mx-auto">
          <div className="w-full h-full p-0.5 border-red-500 flex flex-col lg:flex-row items-center">
            <div className="h-full m-2 p-0.5 border-green-500 flex justify-center">
              <div className="px-6 sm:px-8 lg:px-12 max-w-7xl">
                <div className="w-full lg:w-2/3">
                  <h1 className="font-sans text-base font-normal tracking-tight text-white text-opacity-70">The business directory for members of the Communion of Reformed Evangelical Churches</h1>
                  <p className="mt-2 md:mt-4 lg:mt-6 tracking-tighter text-white">
                    <span className="font-sans font-normal text-5xl xs:text-7xl xl:text-8xl">MyChurch</span>
                    <span className="font-serif italic font-normal text-6xl xs:text-8xl xl:text-9xl">Works</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="h-full m-2 py-8 px-0.5 border-green-500 flex items-center">
              <CallToAction user={user?.$id} />
            </div>
          </div>
          <div className="">
            <p className="text-white px-12 md:px-24">Discover trusted businesses within the CREC. Whether you are looking for a local service or want to connect with professionals across the nation, our directory is here to help you find what you need. Members can log in to access the full directory and manage their business listings. Start exploring today!</p>
          </div>
          {user &&
            <div className="flex flex-col gap-4">
              <div className="">
                <SearchBar/>
              </div>
              <div className="text-center">
                <Link href={`/search-results`} className="text-white text-center text-xl underline">See sample search results</Link>
              </div>
            </div>
          }
        </div>
      </div>
      {user &&
        <div>
          <Categories/>
        </div>
      }
      <Pricing/>
    </div>
  );
}
