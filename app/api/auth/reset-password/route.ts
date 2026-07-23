import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { OtpPurpose } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const {
      identifier,
      otp,
      password,
      confirmPassword,
    } = await req.json();

    if (
      !identifier ||
      !otp ||
      !password ||
      !confirmPassword
    ) {
      return NextResponse.json(
        {
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          message: "Passwords do not match.",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          message: "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    const otpRecord = await prisma.otpVerification.findFirst({
      where: {
        identifier,
        otp,
        purpose: OtpPurpose.PASSWORD_RESET,
        verified: true,
        used: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!otpRecord) {
      return NextResponse.json(
        {
          message: "OTP verification required.",
        },
        { status: 400 }
      );
    }

    if (otpRecord.expiresAt < new Date()) {
      return NextResponse.json(
        {
          message: "OTP has expired.",
        },
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
        {
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
        },
      }),

      prisma.otpVerification.update({
        where: {
          id: otpRecord.id,
        },
        data: {
          used: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Password reset successfully.",
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