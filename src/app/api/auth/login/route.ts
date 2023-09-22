import { NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";
import { ResponseJson } from "@/lib/helpers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signJWT } from "@/lib/token";

type TLoginPost = {
  username: string;
  password: string;
};

export const POST = async (req: Request) => {
  const reqLogin: TLoginPost = await req.json();
  try {
    const admin = await db.admin.findUnique({
      where: {
        username: reqLogin.username,
      },
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          data: {
            message: "User Tidak ditemukan",
          },
        },
        {
          status: 404,
        }
      );
    }

    const passwordMatch = await bcrypt.compare(
      reqLogin.password,
      admin.password
    );

    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          data: {
            message: "Password Tidak Sama",
          },
        },
        {
          status: 404,
        }
      );
    }

    const { id, username } = admin;
    const generateToken = await signJWT({ sub: id.toString() }, { exp: `1d` });

    await db.admin.update({
      data: { token: generateToken },
      where: { id: admin.id },
    });

    const tokenMaxAge = 60 * 60;
    const cookieOptions = {
      name: "token",
      value: generateToken,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: tokenMaxAge,
    };

    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        token: generateToken,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

    await Promise.all([
      response.cookies.set(cookieOptions),
      response.cookies.set({
        name: "logged-in",
        value: "true",
        maxAge: tokenMaxAge,
      }),
    ]);

    return response;
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
