import { NextRequest, NextResponse } from "next/server";
import { BookingStatus } from "@prisma/client";
import bookingRepository from "@/services/booking.repository";
import {
  forbiddenResponse,
  getAuthenticatedUser,
  unauthorizedResponse,
} from "@/lib/auth/requireAuth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(
  req: NextRequest,
  { params }: RouteParams
) {
  const user = await getAuthenticatedUser(req);

  if (!user) return unauthorizedResponse();

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

    const requestedStatus =
      body.status as BookingStatus;

    if (user.role === "PATIENT") {
      if (requestedStatus !== BookingStatus.PAYMENT_PENDING) {
        return forbiddenResponse();
      }

      const booking = await bookingRepository.getBooking(id);

      if (
        !booking ||
        booking.customerPhone !== user.phone
      ) {
        return forbiddenResponse();
      }

      if (booking.status !== BookingStatus.QUOTATION_READY) {
        return NextResponse.json(
          {
            success: false,
            message: "Quotation is not ready for acceptance.",
          },
          { status: 409 }
        );
      }
    } else if (user.role !== "ADMIN") {
      return forbiddenResponse();
    }

    const booking = await bookingRepository.updateStatus(
      id,
      requestedStatus
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
