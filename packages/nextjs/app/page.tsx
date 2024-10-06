"use client";

import Link from "next/link";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProjectList from "./donation/ProjectListing";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-0 rounded-3xl shadow-lg bg-black">
        <Header />

        {/* Hero Section */}
        <HeroSection />

        {/* Featured Projects Section */}
        <section id="projects" className="py-12 px-5">
          <h3 className="text-3xl font-bold text-center mb-8">Featured Projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold">ICPoker</h4>
              <p className="mt-2">Raising in ICP</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold">MotoDEX</h4>
              <p className="mt-2">Raising 10000 ICP</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold">Bridge23</h4>
              <p className="mt-2">Your Data is Your Business</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto" id="project">
          <h1 className="text-4xl font-bold text-center py-8">Crowdfunding Projects</h1>
          <ProjectList />
        </div>

        {/* Debug and Explorer Sections */}
        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>

        <footer className="w-full py-6 text-center bg-gray-900 mt-10">
          <p>&copy; 2024 Crowdfunding Platform. Powered by Web3.</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
