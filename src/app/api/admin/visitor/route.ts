import { Capitalize, ResponseJson } from "@/lib/helpers";
import { db } from "../../../../../prisma/db";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { customPagination } from "@/utils/pagination";

interface IVisitorProps {
  username: string;
}

export const GET = async (req: NextRequest) => {
  try {
    const query = req.nextUrl.searchParams;
    const page = Number(query.getAll("page")) ?? 1;
    const limit = Number(query.getAll("limit")) ?? 10;
    const skip = limit * (page - 1);
    const total = await db.visitor.count();
    const result = await db.visitor.findMany({
      skip: skip,
      take: limit,
      orderBy: {
        id: "desc",
      },
    });

    return ResponseJson(
      customPagination(result, total, { page, limit }),
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
