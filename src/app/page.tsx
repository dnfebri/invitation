"use client";

import Head from "next/head";
import Image from "next/image";
import { Alex_Brush, Inter, Parisienne } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { HalloSection, WelcomeSection } from "@/components/section";
import axios from "axios";
import { useCount } from "@/store/hooks/useCount";

const inter = Alex_Brush({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const {
    isBarang,
    isCount,
    setAddBarang,
    setDecrement,
    setIncrement,
    setIncrementTwo,
  } = useCount();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tamu = searchParams.get("to");

  const visitorPost = async (name: string) => {
    try {
      const response = await axios.post(
        `${window.location.origin}/api/visitor`,
        {
          username: tamu,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (tamu) {
      visitorPost(tamu.replace(" ", "-"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tamu]);

  if (!tamu) {
    return (
      <div>
        {/* <WelcomeSection /> */}
        <p>home</p>
        <p>Barang: {isBarang}</p>
        <p>Count: {isCount}</p>
        <button className="btn" onClick={setIncrement}>
          Tambah count
        </button>
        <button className="btn" onClick={setDecrement}>
          Kurang count
        </button>
        <button className="btn" onClick={setIncrementTwo}>
          Tambah 2 count
        </button>
        <button className="btn" onClick={setAddBarang}>
          Tambah Barang
        </button>
      </div>
    );
  }
  return (
    <>
      <main className={inter.className}>
        <HalloSection />
      </main>
    </>
  );
}
