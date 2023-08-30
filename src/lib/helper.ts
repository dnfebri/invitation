import { NextResponse } from "next/server";

export const ResposnseJson = (data: any, message: string, status: number) => {
  return NextResponse.json(
    {
      data,
      message,
    },
    {
      status,
    }
  );
};
