import { NextResponse } from "next/server";
import { db } from "../../../../prisma/db";
import { Capitalize, ResponseJson } from "@/lib/helper";

interface IVisitorProps {
  username: string;
}

export const GET = async (req: Request) => {
  const result = await db.visitor.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return ResponseJson(result, "success", 200);
};

export const POST = async (req: Request) => {
  const data: IVisitorProps = await req.json();
  console.log(data);

  try {
    const visitor = await db.visitor.findUnique({
      where: { username: data.username },
    });

    if (!visitor) {
      const createVisitor = await db.visitor.create({
        data: {
          username: data.username,
          name: Capitalize(data.username.replace("-", " ")),
          read: 1,
        },
      });
      return ResponseJson(createVisitor.username, "Created", 201);
    }

    const updateVisitor = await db.visitor.update({
      where: { id: visitor.id },
      data: {
        read: visitor.read + 1,
      },
    });
    return ResponseJson(updateVisitor.username, "Already Registered", 200);
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
