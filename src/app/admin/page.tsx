"use client";
import { FormLogout } from "@/components/form/FormLogout";
import { LayoutAdmin } from "@/components/layout";
import { Navigation } from "@/components/menu";
import Link from "next/link";
import React from "react";

export default function AdminIndex() {
  return (
    <LayoutAdmin>
      <Navigation />
      <div className="max-w-md mx-auto">
        <p>AdminIndex</p>
        <FormLogout />
        <div>
          <Link href={"/admin/test"}>test</Link>
        </div>
      </div>
    </LayoutAdmin>
  );
}
