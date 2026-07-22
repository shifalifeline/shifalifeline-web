import { NextRequest, NextResponse } from "next/server";
import { Booking } from "@/types/booking";

const bookings: Booking[] = [];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: bookings,
  });
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

    const now = new Date().toISOString();

    const booking: Booking = {
      id: crypto.randomUUID(),

      reference:
        body.reference ??
        `SHIFA-${Date.now().toString().slice(-8)}`,

      type: body.type,

      title: body.title ?? `${body.type} Booking`,

      amount: body.amount ?? 0,

      customer: body.customer,

      paymentStatus: body.paymentStatus ?? "PENDING",

      createdAt: now,

      updatedAt: now,

      status: body.status ?? "NEW",

      priority: body.priority ?? "NORMAL",

      finalAmount: body.finalAmount,

      quotation: body.quotation,

      discounts: body.discounts,

      schedule: body.schedule,

      timeline: body.timeline,

      notifications: body.notifications,

      internalNotes: body.internalNotes,

      requestData: body.requestData,

      assignedTo: body.assignedTo,
    };

    bookings.unshift(booking);

    return NextResponse.json(
      {
        success: true,
        message: "Booking created successfully.",
        data: booking,
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