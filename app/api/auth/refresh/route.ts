import { NextRequest, NextResponse } from "next/server";
import {
  generateAccessToken,
  verifyRefreshToken,
} from "@/lib/auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Refresh token missing." },
        { status: 401 }
      );
    }

    const refreshToken = authHeader.substring(7);

    const payload = verifyRefreshToken(refreshToken);

    const accessToken = generateAccessToken({
      id: payload.id,
      role: payload.role,
    });

    return NextResponse.json({
      success: true,
      accessToken,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Invalid or expired refresh token.",
      },
      { status: 401 }
    );
  }
}