import { SignJWT, jwtVerify } from "jose";
import { SecretKey } from "./helpers";

export const signJWT = async (
  payload: { sub: string },
  options: { exp: string }
) => {
  try {
    const secret = new TextEncoder().encode(SecretKey);
    const alg = "HS256";
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(options.exp)
      .setIssuedAt()
      .setSubject(payload.sub)
      .sign(secret);
  } catch (error) {
    throw error;
  }
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    return (await jwtVerify(token, new TextEncoder().encode(SecretKey)))
      .payload as T;
  } catch (error) {
    console.log(error);
    throw new Error("Your token has expired.");
  }
};
