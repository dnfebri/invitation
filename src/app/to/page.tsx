"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function To({}) {
  const searchParams = useSearchParams();
  console.log(searchParams.get("name"));
  return <div>To</div>;
}
