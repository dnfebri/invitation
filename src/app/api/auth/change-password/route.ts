import { verifyJWT } from "@/lib/token";
import { NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";

interface IAuth {
  sub: string;
  exp: number;
  iat: number;
}

export const PUT = async (req: Request) => {
  const { currentPassword, newPassword } = await req.json();
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    const auth: IAuth = await verifyJWT(token ?? "");
    if (!auth) {
      return NextResponse.json(
        {
          success: false,
          data: { message: "token tidak valid" },
        },
        {
          status: 400,
        }
      );
    }
    const admin = await db.admin.findUnique({
      where: {
        id: Number(auth.sub),
      },
      select: {
        id: true,
        token: true,
        username: true,
      },
    });
    console.log(admin);
    const response = new NextResponse(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: error,
      },
      {
        status: 400,
      }
    );
  }
};
