import { NextRequest, NextResponse } from "next/server";
import { BookingStatus } from "@prisma/client";
import bookingRepository from "@/services/booking.repository";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await req.json();

    if (!body.status) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking status is required.",
        },
        { status: 400 }
      );
    }

    const booking = await bookingRepository.updateStatus(
      id,
      body.status as BookingStatus
    );

    return NextResponse.json({
      success: true,
      message: "Booking status updated successfully.",
      data: booking,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update booking status.",
      },
      { status: 500 }
    );
  }
}