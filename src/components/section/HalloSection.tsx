import { Alex_Brush } from "next/font/google";
import { useSearchParams } from "next/navigation";
import React from "react";
const inter = Alex_Brush({ weight: ["400"], subsets: ["latin"] });

export const HalloSection = () => {
  const searchParams = useSearchParams();
  const tamu = searchParams.get("to");
  return (
    <div className="relative text-white bg-pink-800/80 min-h-screen grid place-items-center items-center bg-cover bg-center bg-[url('/assets/images/bg-welcome.jpg')]">
      <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-r from-black via-black/10 to-black" />
      <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-black via-black/10 to-black" />

      <div
        className={`grid place-items-center mt-auto max-w-max mx-auto mb-10 z-10 text-3xl`}
      >
        <label>Selamat Datang</label>
        <div>
          <p className="text-5xl capitalize font-black">{tamu}</p>
        </div>
        <div className="text-center my-4">
          <button className="btn btn-primary btn-sx capitalize" type="submit">
            Buka Undangan
          </button>
        </div>
      </div>
    </div>
  );
};
