"use client";
import { LayoutAdmin } from "@/components/layout";
import { Navigation } from "@/components/menu";
import React from "react";

export default function AdminSeen() {
  return (
    <LayoutAdmin>
      <Navigation />
      <p>AdminSeen</p>
    </LayoutAdmin>
  );
}
