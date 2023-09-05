import { NextResponse } from "next/server";
import { db } from "../../../../prisma/db";
import { ResposnseJson } from "@/lib/helper";
type ICongratulate = {
  note: string;
  author: string;
  reply: string | JSON;
};

export const GET = async (req: Request) => {
  const result = await db.congratulate.findMany({
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
  return ResposnseJson(responseResult, "success", 200);
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
    return ResposnseJson("OK", "success", 201);
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
    const updateReply = await db.congratulate.update({
      where: {
        id: data.id,
      },
      data: {
        reply: JSON.stringify(replyJson),
      },
    });

    return ResposnseJson(replyJson, "success", 200);
  } catch (error) {
    return ResposnseJson(error, "error", 200);
  }
};
