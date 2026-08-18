import { NextRequest, NextResponse } from "next/server";
import { PaymentStatus } from "@prisma/client";
import bookingRepository from "@/services/booking.repository";
import {
  forbiddenResponse,
  getAuthenticatedUser,
  unauthorizedResponse,
} from "@/lib/auth/requireAuth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(
  req: NextRequest,
  { params }: RouteParams
) {
  const user = await getAuthenticatedUser(req);

  if (!user) return unauthorizedResponse();

  try {
    const { id } = await params;
    const body = await req.json();

    if (!body.paymentStatus) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment status is required.",
        },
        { status: 400 }
      );
    }

    const paymentStatus =
      body.paymentStatus as PaymentStatus;

    if (
      paymentStatus !== PaymentStatus.PENDING &&
      paymentStatus !== PaymentStatus.SUCCESS &&
      paymentStatus !== PaymentStatus.FAILED
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment status.",
        },
        { status: 400 }
      );
    }

    const booking = await bookingRepository.getBooking(id);

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found.",
        },
        { status: 404 }
      );
    }

    const ownsBooking =
      user.role === "PATIENT" &&
      booking.customerPhone === user.phone;

    if (user.role !== "ADMIN" && !ownsBooking) {
      return forbiddenResponse();
    }

    const updatedBooking =
      await bookingRepository.processPayment(
        id,
        paymentStatus
      );

    return NextResponse.json({
      success: true,
      message:
        paymentStatus === PaymentStatus.SUCCESS
          ? "Payment received successfully."
          : "Payment status updated successfully.",
      data: updatedBooking,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process payment.",
      },
      { status: 500 }
    );
  }
}
