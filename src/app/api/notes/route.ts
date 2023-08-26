import { NextResponse } from "next/server";
import { db } from "../../../../prisma/db";
type dataPost = {
  note: string;
  author: string;
};

export const GET = async (req: Request) => {
  const result = await db.congratulations.findMany({});
  return NextResponse.json(
    {
      data: result,
    },
    {
      status: 400,
    }
  );
};

export const POST = async (req: Request) => {
  const data: dataPost = await req.json();
  try {
    const createCongratulation = await db.congratulations.create({
      data: {
        author: data.author,
        note: data.note,
      },
      select: {
        note: true,
        author: true,
      },
    });
    return NextResponse.json(
      {
        success: true,
        data: createCongratulation,
      },
      {
        status: 201,
      }
    );
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
