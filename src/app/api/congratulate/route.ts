import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../prisma/db";
import { ResponseJson } from "@/lib/helpers";
import { CustomPagination } from "@/utils/pagination";
type ICongratulate = {
  note: string;
  author: string;
  reply: string | JSON;
};

export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams;
  const page = query.get("page") ? Number(query.get("page")) : 1;
  const limit = query.get("limit") ? Number(query.get("limit")) : 10;
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
    CustomPagination(responseResult, total, { page, limit }),
    "success",
    200
  );
};

export const POST = async (req: Request) => {
  const data: ICongratulate = await req.json();
  try {
    const createCongratulation = await db.congratulate.create({
      data: {
        author: data.author,
        note: data.note,
        reply: JSON.stringify([]),
      },
      select: {
        note: true,
        author: true,
        reply: true,
      },
    });
    return ResponseJson("OK", "success", 201);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: error,
      },
      {
        status: 401,
      }
    );
  }
};

interface ICongratulateUpdate {
  id: number;
  from: string;
  message: string;
}
export const PUT = async (req: Request) => {
  const data: ICongratulateUpdate = await req.json();
  const messageReply = { name: data.from, message: data.message };
  try {
    const congratulate = await db.congratulate.findMany({
      where: {
        id: data.id,
      },
    });
    const replyJson = JSON.parse(congratulate[0].reply);
    replyJson.push(messageReply);
    await db.congratulate.update({
      where: {
        id: data.id,
      },
      data: {
        reply: JSON.stringify(replyJson),
      },
    });

    return ResponseJson(replyJson, "success", 200);
  } catch (error) {
    return ResponseJson(error, "error", 200);
  }
};
