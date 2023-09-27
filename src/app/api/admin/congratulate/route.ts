import { ResponseJson } from "@/lib/helpers";
import { customPagination } from "@/utils/pagination";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";

export const GET = async (req: NextRequest) => {
  try {
    const query = req.nextUrl.searchParams;
    const page = Number(query.getAll("page")) ?? 1;
    const limit = Number(query.getAll("limit")) ?? 10;
    const skip = limit * (page - 1);
    const total = await db.congratulate.count({
      where: {
        is_active: true,
      },
    });
    const result = await db.congratulate.findMany({
      skip: skip,
      take: limit,
      where: {
        is_active: true,
      },
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
      customPagination(responseResult, total, { page, limit }),
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
