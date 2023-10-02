"use client";
import { LayoutAdmin } from "@/components/layout";
import {
  TableGuestInvitationSent,
  TableWeddingComments,
} from "@/components/table";
import Link from "next/link";
import React from "react";

export default function AdminIndex() {
  return (
    <LayoutAdmin>
      <div className="max-w-xl mx-auto">
        <TableGuestInvitationSent />
      </div>
      <div className="max-w-xl mx-auto">
        <TableWeddingComments />
      </div>
    </LayoutAdmin>
  );
}
