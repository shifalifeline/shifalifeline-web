import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalPatients,
      activePatients,
      todayRegistrations,
      appointmentsToday,
    ] = await Promise.all([
      prisma.patient.count(),
      prisma.patient.count({
        where: {
          status: "Active",
        },
      }),
      prisma.patient.count({
        where: {
          createdAt: {
            gte: today,
          },
        },
      }),
      prisma.booking.count({
        where: {
          createdAt: {
            gte: today,
          },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        patients,
        stats: {
          totalPatients,
          activePatients,
          todayRegistrations,
          appointmentsToday,
        },
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch patients.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const patient = await prisma.patient.create({
      data: body,
    });

    return NextResponse.json({
      success: true,
      data: patient,
      message: "Patient created successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create patient.",
      },
      {
        status: 500,
      }
    );
  }
}