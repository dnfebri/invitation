import { NextResponse } from "next/server";
import { db } from "../../../../../prisma/db";
import { ResponseJson } from "@/lib/helper";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type TLoginPost = {
  username: string;
  password: string;
};

export const POST = async (req: Request) => {
  const reqLogin: TLoginPost = await req.json();
  try {
    const admin = await db.admin.findFirstOrThrow({
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
    const secretKey = process.env.TOKEN_SECRET || "secret";
    const generateToken = jwt.sign({ id, username }, secretKey, {
      expiresIn: "1d",
    });

    await db.admin.update({
      data: { token: generateToken },
      where: { id: admin.id },
    });

    return ResponseJson({ token: generateToken }, "success", 200);
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
