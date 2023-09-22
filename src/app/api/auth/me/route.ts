import { GetErrorResponse, ResponseJson } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";
export const GET = async (req: NextRequest) => {
  const userId = req.headers.get("X-USER-ID");

  if (!userId) {
    return GetErrorResponse(
      401,
      "You are not logged in, please provide token to gain access"
    );
  }

  const user = await db.admin.findUnique({ where: { id: Number(userId) } });
  return NextResponse.json({
    status: "success",
    data: { user: { ...user, password: undefined } },
  });
};
