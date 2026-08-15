import { NextRequest, NextResponse } from "next/server";

import type {
  Booking,
  AppointmentRequestData,
  DiagnosticRequestData,
} from "@/types/booking";

import bookingRepository from "@/services/booking.repository";

function normalizeBooking(booking: any) {
  const patientName = [
    booking.patient?.firstName,
    booking.patient?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    ...booking,

    customer: {
      fullName:
        booking.customerName ||
        patientName ||
        "",

      mobile:
        booking.customerPhone ||
        booking.patient?.phone ||
        "",

      email:
        booking.customerEmail ||
        booking.patient?.email ||
        "",
    },
  };
}

export async function GET() {
  try {
    const bookings =
      await bookingRepository.getBookings();

    return NextResponse.json({
      success: true,
      message:
        "Bookings retrieved successfully.",
      data: bookings.map(normalizeBooking),
    });
  } catch (error) {
    console.error(
      "Failed to retrieve bookings.",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to retrieve bookings.",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest
) {
  try {
    const body =
      (await req.json()) as Partial<Booking>;

    if (!body.type) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Booking type is required.",
        },
        { status: 400 }
      );
    }

    if (
      !body.customer?.fullName ||
      !body.customer?.mobile
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Customer information is incomplete.",
        },
        { status: 400 }
      );
    }

    const appointment =
      body.requestData as
        | AppointmentRequestData
        | undefined;

    const diagnostic =
      body.requestData as
        | DiagnosticRequestData
        | undefined;

    const createdBooking =
      await bookingRepository.createBooking({
        reference: `BK-${Date.now()}`,

        type: body.type,

        title:
          body.title ??
          `${body.type} Booking`,

        amount: body.amount ?? 0,

        customerName:
          body.customer.fullName,

        customerPhone:
          body.customer.mobile,

        customerEmail:
          body.customer.email,

        priority: body.priority,

        doctorId:
          body.type === "APPOINTMENT"
            ? appointment?.doctorId
            : undefined,

        preferredDate:
          body.type === "DIAGNOSTIC"
            ? diagnostic?.preferredDate
              ? new Date(
                  diagnostic.preferredDate
                )
              : undefined
            : undefined,

        consultationMode:
          body.type === "APPOINTMENT"
            ? appointment?.consultationMode
            : undefined,

        requestData: body.requestData
          ? JSON.parse(
              JSON.stringify(
                body.requestData
              )
            )
          : undefined,
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Booking created successfully.",
        data: normalizeBooking(
          createdBooking
        ),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Failed to create booking.",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to create booking.",
      },
      { status: 500 }
    );
  }
}