import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const doctor = await prisma.doctor.findUnique({
      where: { id },
    });

    if (!doctor) {
      return NextResponse.json(
        {
          success: false,
          message: "Doctor not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: doctor,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch doctor.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const doctor = await prisma.doctor.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      success: true,
      data: doctor,
      message: "Doctor updated successfully.",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        {
          success: false,
          message: "Doctor not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update doctor.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    await prisma.doctor.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Doctor deleted successfully.",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        {
          success: false,
          message: "Doctor not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete doctor.",
      },
      { status: 500 }
    );
  }
}