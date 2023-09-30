import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";

export const ResponseJson = (data: any, message: string, status: number) => {
  return NextResponse.json(
    {
      ...data,
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

export const SecretKey = process.env.TOKEN_SECRET || "secret";

export function GetErrorResponse(
  status: number = 500,
  message: string
  // errors: ZodError | null = null
) {
  return new NextResponse(
    JSON.stringify({
      status: status < 500 ? "fail" : "error",
      message,
      // errors: errors ? errors.flatten() : null,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export const HelperAxiosAuthorization = () => {
  const token = getCookie("token");
  const authhorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return authhorization;
};
