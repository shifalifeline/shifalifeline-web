import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OtpPurpose } from "@prisma/client";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  try {
    const { identifier } = await req.json();

    if (!identifier) {
      return NextResponse.json(
        { message: "Mobile number or email is required." },
        { status: 400 }
      );
    }

    const isEmail = String(identifier).includes("@");

    const user = await prisma.user.findFirst({
      where: isEmail
        ? {
            email: {
              equals: identifier,
              mode: "insensitive",
            },
          }
        : {
            phone: identifier,
          },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    await prisma.otpVerification.deleteMany({
      where: {
        identifier,
        purpose: OtpPurpose.PASSWORD_RESET,
        used: false,
      },
    });

    const otp = generateOtp();

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.otpVerification.create({
      data: {
        identifier,
        otp,
        purpose: OtpPurpose.PASSWORD_RESET,
        expiresAt,
      },
    });

    return NextResponse.json({
      success: true,
      message: "OTP generated successfully.",
      otp, // Remove this after SMS/Email integration
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