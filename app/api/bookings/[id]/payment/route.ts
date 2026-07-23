import { NextRequest, NextResponse } from "next/server";
import { PaymentStatus } from "@prisma/client";
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

    const paymentStatus =
      (body.paymentStatus as PaymentStatus) ??
      PaymentStatus.SUCCESS;

    const booking = await bookingRepository.processPayment(
      id,
      paymentStatus
    );

    return NextResponse.json({
      success: true,
      message:
        paymentStatus === PaymentStatus.SUCCESS
          ? "Payment received successfully."
          : "Payment status updated successfully.",
      data: booking,
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