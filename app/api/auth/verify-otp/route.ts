import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OtpPurpose } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { identifier, otp } = await req.json();

    if (!identifier || !otp) {
      return NextResponse.json(
        {
          message: "Identifier and OTP are required.",
        },
        { status: 400 }
      );
    }

    const record = await prisma.otpVerification.findFirst({
      where: {
        identifier,
        otp,
        purpose: OtpPurpose.PASSWORD_RESET,
        verified: false,
        used: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!record) {
      return NextResponse.json(
        {
          message: "Invalid OTP.",
        },
        { status: 400 }
      );
    }

    if (record.expiresAt < new Date()) {
      return NextResponse.json(
        {
          message: "OTP has expired.",
        },
        { status: 400 }
      );
    }

    await prisma.otpVerification.update({
      where: {
        id: record.id,
      },
      data: {
        verified: true,
      },
    });

    return NextResponse.json({
      success: true,
      verified: true,
      message: "OTP verified successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}