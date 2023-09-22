import { Parisienne, Alex_Brush } from "next/font/google";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const inter = Alex_Brush({ weight: ["400"], subsets: ["latin"] });
export const WelcomeSection = () => {
  const router = useRouter();
  const [isName, setIsName] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`?to=${isName.toLowerCase()}`);
  };
  return (
    <div className="relative text-white bg-pink-800/80 min-h-screen grid place-items-center items-center bg-cover bg-center bg-[url('/assets/images/bg-welcome.jpg')]">
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-black via-black/10 to-black" />
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-black via-black/10 to-black" />
      <form onSubmit={handleSubmit} className="z-10">
        <div className="grid mx-auto mt-auto mb-10 place-items-center max-w-max">
          <label className={`text-3xl font-black ${inter.className}`}>
            Masukan Nama
          </label>
          <input
            type="text"
            onChange={(e) => setIsName(e.target.value.toUpperCase())}
            value={isName.toUpperCase()}
            className="px-4 py-2 text-center transition-all duration-500 bg-transparent border-b border-secondary focus:border-primary input-reset-css"
          />
          <div className="my-4 text-center">
            <button
              className={`text-white text-xl btn btn-primary p-0 px-8 capitalize ${inter.className}`}
              type="submit"
            >
              Hallo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
