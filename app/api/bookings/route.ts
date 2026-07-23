import { NextRequest, NextResponse } from "next/server";
import type { Booking } from "@/types/booking";
import bookingRepository from "@/services/booking.repository";

export async function GET() {
  try {
    const bookings = await bookingRepository.getBookings();

    return NextResponse.json({
      success: true,
      message: "Bookings retrieved successfully.",
      data: bookings,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve bookings.",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Booking>;

    if (!body.type) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking type is required.",
        },
        { status: 400 }
      );
    }

    if (!body.customer?.fullName || !body.customer?.mobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer information is incomplete.",
        },
        { status: 400 }
      );
    }

    const createdBooking =
      await bookingRepository.createBooking({
        reference:
          body.reference ??
          `SHIFA-${Date.now().toString().slice(-8)}`,
        type: body.type,
        title: body.title ?? `${body.type} Booking`,
        amount: body.amount ?? 0,
        customerName: body.customer.fullName,
        customerPhone: body.customer.mobile,
        customerEmail: body.customer.email,
        priority: body.priority,
      });

    return NextResponse.json(
      {
        success: true,
        message: "Booking created successfully.",
        data: createdBooking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create booking.",
      },
      { status: 500 }
    );
  }
}