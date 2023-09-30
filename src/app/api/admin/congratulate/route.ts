import { ResponseJson } from "@/lib/helpers";
import { CustomPagination } from "@/utils/pagination";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";

export const GET = async (req: NextRequest) => {
  try {
    const query = req.nextUrl.searchParams;
    const page = query.get("page") ? Number(query.get("page")) : 1;
    const limit = query.get("limit") ? Number(query.get("limit")) : 10;
    const skip = limit * (page - 1);
    const total = await db.congratulate.count();
    const result = await db.congratulate.findMany({
      skip: skip,
      take: limit,
      orderBy: {
        id: "desc",
      },
    });
    const responseResult: {
      reply: any;
      id: number;
      note: string;
      author: string;
      createdAt: Date;
      updatedAt: Date;
    }[] = [];
    result.map((row) => {
      const { reply, ...allRow } = row;
      responseResult.push({
        ...allRow,
        reply: JSON.parse(reply),
      });
    });

    return ResponseJson(
      CustomPagination(responseResult, total, { page, limit }),
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
