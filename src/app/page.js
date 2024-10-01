'use client'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { account } from "./appwrite";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import CallToAction from "@/components/CallToAction";
import Categories from "@/components/Categories";
import Pricing from "@/components/Pricing";
import UserActions from "@/components/UserActions";
import Header from "@/components/Header";

export default function Home() {
  const [user, setUser] = useState(null);
  const [results, setResults] = useState([])
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user:", error);
        // If there's no valid session, redirect to login
        router.push('/');
      }
    };

    fetchUser();
  }, [router]);

  const logout = async () => {
    const session = await account.deleteSession("current");
    setUser(null);
  };
console.log(user);
  return (
    <div>
      <div className="relative pt-24 pb-12 bg-black xl:pt-48 sm:pb-16 lg:pb-32 xl:pb-48 2xl:pb-56">
        <Header user={user} logout={logout} />
        <div className="absolute inset-0">
          <img className="object-cover w-full h-full opacity-[65%]" src="/images/farm_work.jpg" alt="" />
        </div>
        <div className="relative space-y-4 md:space-y-8 lg:space-y-14 max-w-screen-2xl mx-auto">
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
              {user ? <UserActions user={user} account={account} /> : <CallToAction/>}
            </div>
          </div>
          <div className="">
            <p className="text-white px-12 md:px-24">Discover trusted businesses within the CREC. Whether you are looking for a local service or want to connect with professionals across the nation, our directory is here to help you find what you need. Members can log in to access the full directory and manage their business listings. Start exploring today!</p>
          </div>
          {user &&
            <div className="p-0.5 border-blue-500 py-4">
              <SearchBar
                setResults={setResults}
              />
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
