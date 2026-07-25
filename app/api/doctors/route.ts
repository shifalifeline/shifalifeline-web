import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateDoctorCode() {
  return `DOC-${Date.now()}`;
}

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const stats = {
      totalDoctors: doctors.length,
      activeDoctors: doctors.filter(
        (doctor) => doctor.status === "Active"
      ).length,
      specialties: new Set(
        doctors.map((doctor) => doctor.specialty)
      ).size,
    };

    return NextResponse.json({
      success: true,
      data: {
        doctors,
        stats,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch doctors.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const doctor = await prisma.doctor.create({
      data: {
        doctorCode: generateDoctorCode(),
        ...body,
      },
    });

    return NextResponse.json({
      success: true,
      data: doctor,
      message: "Doctor created successfully.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create doctor.",
      },
      { status: 500 }
    );
  }
}