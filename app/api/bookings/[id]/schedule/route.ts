import { NextRequest, NextResponse } from "next/server";
import bookingRepository from "@/services/booking.repository";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!body.scheduledOn) {
      return NextResponse.json(
        {
          success: false,
          message: "Schedule date is required.",
        },
        { status: 400 }
      );
    }

    if (!body.session) {
      return NextResponse.json(
        {
          success: false,
          message: "Session is required.",
        },
        { status: 400 }
      );
    }

    const booking = await bookingRepository.scheduleBooking(
      id,
      new Date(body.scheduledOn),
      body.session,
      body.assignedTo,
      body.notes
    );

    return NextResponse.json(
      {
        success: true,
        message: "Booking scheduled successfully.",
        data: booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to schedule booking.",
      },
      { status: 500 }
    );
  }
}