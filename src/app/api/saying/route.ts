import { NextResponse } from "next/server";
import { db } from "../../../../prisma/db";
import { ResposnseJson } from "@/lib/helper";
type dataPost = {
  note: string;
  author: string;
  reply?: string;
};

export const GET = async (req: Request) => {
  const result = await db.congratulations.findMany({});
  return ResposnseJson(result, "success", 200);
};

export const POST = async (req: Request) => {
  const data: dataPost = await req.json();
  try {
    const createCongratulation = await db.congratulations.create({
      data: {
        author: data.author,
        note: data.note,
        reply: data.reply ?? "",
      },
      select: {
        note: true,
        author: true,
        reply: true,
      },
    });
    return ResposnseJson(createCongratulation, "success", 201);
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
