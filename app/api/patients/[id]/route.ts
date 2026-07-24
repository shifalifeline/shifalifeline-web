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

    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        bookings: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!patient) {
      return NextResponse.json(
        {
          success: false,
          message: "Patient not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: patient,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch patient.",
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

    const patient = await prisma.patient.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      success: true,
      data: patient,
      message: "Patient updated successfully.",
    });
  } catch (error: any) {
  if (error.code === "P2025") {
    return NextResponse.json(
      {
        success: false,
        message: "Patient not found.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: "Failed to update patient.",
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

    await prisma.patient.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Patient deleted successfully.",
    });
  } catch (error: any) {
  if (error.code === "P2025") {
    return NextResponse.json(
      {
        success: false,
        message: "Patient not found.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: "Failed to delete patient.",
    },
    { status: 500 }
  );
}
}