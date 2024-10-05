import Image from "next/image";
import Stripes from "/public/images/stripes.svg";

// Adjusted the import path

export default function PageIllustration() {
  return (
    <>
      {/* Stripes illustration */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform" aria-hidden="true">
        <Image className="max-w-none" src={Stripes} width={768} height={200} alt="Stripes" priority />
      </div>

      {/* First Circle */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 translate-x-[580px] -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-blue-500 opacity-50 blur-[160px]" />
      </div>

      {/* Second Circle */}
      <div
        className="pointer-events-none absolute top-[420px] left-1/2 translate-x-[380px] -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-blue-500 to-gray-900 opacity-50 blur-[160px]" />
      </div>

      {/* Third Circle */}
      <div
        className="pointer-events-none absolute top-[640px] left-1/2 -translate-x-[300px] -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-blue-500 to-gray-900 opacity-50 blur-[160px]" />
      </div>
    </>
  );
}
