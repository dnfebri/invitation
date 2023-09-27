"use client";
import { LayoutAdmin } from "@/components/layout";
import { Navigation } from "@/components/menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function TestPage() {
  const router = useRouter();
  return (
    <LayoutAdmin>
      <Navigation />
      <p>TestPage</p>
      <div>
        <Link href={"/admin"}>Back</Link>
      </div>
    </LayoutAdmin>
  );
}
