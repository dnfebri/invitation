import type { NextApiRequest } from "next";
import { useRouter } from "next/router";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../../prisma/db";

interface IParams {
  params: { id: string };
}

export const PUT = async (req: NextRequest, { params }: IParams) => {
  const { active } = await req.json();
  try {
    await db.congratulate.update({
      where: {
        id: Number(params.id),
      },
      data: {
        is_active: active,
      },
    });
    return NextResponse.json({
      success: true,
      message: "success",
    });
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
