import jwt from "jsonwebtoken";
import type { JwtPayload as JwtBasePayload, SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms";

export interface JwtPayload {
  id: string;
  role: string;
}

const ACCESS_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!ACCESS_SECRET) {
  throw new Error("JWT_SECRET is missing.");
}

if (!REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET is missing.");
}

const ACCESS_EXPIRES: StringValue =
  (process.env.JWT_EXPIRES_IN as StringValue) ?? "15m";

const REFRESH_EXPIRES: StringValue =
  (process.env.JWT_REFRESH_EXPIRES_IN as StringValue) ?? "7d";

export function generateAccessToken(
  payload: JwtPayload
): string {
  const options: SignOptions = {
    expiresIn: ACCESS_EXPIRES,
  };

  return jwt.sign(payload, ACCESS_SECRET as string, options);
}

export function generateRefreshToken(
  payload: JwtPayload
): string {
  const options: SignOptions = {
    expiresIn: REFRESH_EXPIRES,
  };

  return jwt.sign(payload, REFRESH_SECRET as string, options);
}

export function verifyAccessToken(
  token: string
): JwtPayload {
  const decoded = jwt.verify(token, ACCESS_SECRET as string);

  if (typeof decoded === "string") {
    throw new Error("Invalid access token.");
  }

  const payload = decoded as JwtBasePayload & JwtPayload;

  return {
    id: payload.id,
    role: payload.role,
  };
}

export function verifyRefreshToken(
  token: string
): JwtPayload {
  const decoded = jwt.verify(token, REFRESH_SECRET as string);

  if (typeof decoded === "string") {
    throw new Error("Invalid refresh token.");
  }

  const payload = decoded as JwtBasePayload & JwtPayload;

  return {
    id: payload.id,
    role: payload.role,
  };
}