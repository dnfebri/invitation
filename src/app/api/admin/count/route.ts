import { ResponseJson } from "@/lib/helpers";
import { db } from "../../../../../prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { CustomPagination } from "@/utils/pagination";

export const GET = async () => {
  try {
    const totalGuest = await db.visitor.count();
    const guestsAttending = await db.visitor.count({
      where: {
        attend: true,
      },
    });

    const guestsNotAttending = await db.visitor.count({
      where: {
        attend: false,
      },
    });

    const weddingComments = await db.congratulate.count();

    return ResponseJson(
      {
        totalGuest,
        guestsAttending,
        guestsNotAttending,
        weddingComments,
      },
      "success",
      200
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: error,
      },
      {
        status: 404,
      }
    );
  }
};
