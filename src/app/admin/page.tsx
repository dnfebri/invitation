"use client";
import { FormLogout } from "@/components/form/FormLogout";
import Link from "next/link";
import React from "react";

export default function AdminIndex() {
  return (
    <div>
      <p>AdminIndex</p>
      <FormLogout />
      <div>
        <Link href={"/admin/test"}>test</Link>
      </div>
    </div>
  );
}
