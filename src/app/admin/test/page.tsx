"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function TestPage() {
  const router = useRouter();
  return (
    <div>
      <p>TestPage</p>
      <div>
        <Link href={"/admin"}>Back</Link>
      </div>
    </div>
  );
}
