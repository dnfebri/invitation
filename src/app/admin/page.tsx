"use client";
import { FormLogout } from "@/components/form/FormLogout";
import { LayoutAdmin } from "@/components/layout";
import { Navigation } from "@/components/menu";
import { TableGuestInvitationSent } from "@/components/table";
import Link from "next/link";
import React from "react";

export default function AdminIndex() {
  return (
    <LayoutAdmin>
      <div className="max-w-xl mx-auto">
        <TableGuestInvitationSent />
      </div>
    </LayoutAdmin>
  );
}
