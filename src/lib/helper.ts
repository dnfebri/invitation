import { NextResponse } from "next/server";

export const ResponseJson = (data: any, message: string, status: number) => {
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

export const Capitalize = (text: string) => {
  const arr = text.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
};
