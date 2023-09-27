"use client";

import Head from "next/head";
import Image from "next/image";
import { Alex_Brush, Inter, Parisienne } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useSearchParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { HalloSection, WelcomeSection } from "@/components/section";
import axios from "axios";

const inter = Alex_Brush({ weight: "400", subsets: ["latin"] });

export default function Home() {
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
