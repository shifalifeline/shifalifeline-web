import { NextRequest, NextResponse } from "next/server";
import type {
  Booking,
  AppointmentRequestData,
} from "@/types/booking";
import bookingRepository from "@/services/booking.repository";
import { DiagnosticRequestData } from "@/types/booking";

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

    const appointment =
    body.requestData as AppointmentRequestData | undefined;

    const diagnostic =
    body.requestData as DiagnosticRequestData | undefined;

    const createdBooking =
      await bookingRepository.createBooking({
        reference: `BK-${Date.now()}`,

  type: body.type,

  title: body.title ?? `${body.type} Booking`,

 amount: body.amount ?? 0,

  customerName: body.customer.fullName,

  customerPhone: body.customer.mobile,

  customerEmail: body.customer.email,

  priority: body.priority,

  // Appointment fields
  doctorId:
    body.type === "APPOINTMENT"
      ? appointment?.doctorId
      : undefined,

  preferredDate:
    body.type === "APPOINTMENT"
      ? appointment?.preferredDate
        ? new Date(appointment.preferredDate)
        : undefined
      : body.type === "DIAGNOSTIC"
      ? diagnostic?.preferredDate
        ? new Date(diagnostic.preferredDate)
        : undefined
      : undefined,

  preferredSession:
    body.type === "APPOINTMENT"
      ? appointment?.preferredSession
      : undefined,

  consultationMode:
    body.type === "APPOINTMENT"
      ? appointment?.consultationMode
      : undefined,

  reasonForVisit:
    body.type === "APPOINTMENT"
      ? appointment?.reasonForVisit
      : undefined,

  requestData: body.requestData
  ? JSON.parse(JSON.stringify(body.requestData))
  : undefined,
  
  attachments:
    body.type === "APPOINTMENT"
      ? appointment?.attachments
      : undefined,
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