import { NextResponse } from "next/server";
import { Capitalize, ResponseJson } from "@/lib/helpers";
import { db } from "../../../../../prisma/db";

interface IVisitorProps {
  username: string;
}

export const GET = async () => {
  const result = await db.visitor.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return ResponseJson(result, "success", 200);
};
