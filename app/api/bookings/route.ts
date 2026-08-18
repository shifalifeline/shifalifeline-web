import { NextRequest, NextResponse } from "next/server";

import type {
  Booking,
  AppointmentRequestData,
  DiagnosticRequestData,
} from "@/types/booking";

import bookingRepository from "@/services/booking.repository";
import {
  forbiddenResponse,
  getAuthenticatedUser,
  unauthorizedResponse,
} from "@/lib/auth/requireAuth";

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
        booking.customerName || patientName || "",
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

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser(req);

  if (!user) return unauthorizedResponse();

  try {
    const bookings = await bookingRepository.getBookings();

    const visibleBookings =
      user.role === "ADMIN"
        ? bookings
        : user.role === "PATIENT"
          ? bookings.filter(
              (booking) =>
                booking.customerPhone === user.phone
            )
          : user.role === "DOCTOR"
            ? bookings.filter(
                (booking) =>
                  booking.doctorId === user.id
              )
            : user.role === "DIAGNOSTIC"
              ? bookings.filter(
                  (booking) =>
                    booking.type === "DIAGNOSTIC"
                )
              : user.role === "PHARMACY" ||
                  user.role === "RETAILER"
                ? bookings.filter(
                    (booking) =>
                      booking.type === "PHARMACY"
                  )
                : [];

    return NextResponse.json({
      success: true,
      message: "Bookings retrieved successfully.",
      data: visibleBookings.map(normalizeBooking),
    });
  } catch (error) {
    console.error("Failed to retrieve bookings.", error);

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
  const user = await getAuthenticatedUser(req);

  if (!user) return unauthorizedResponse();

  if (
    user.role !== "ADMIN" &&
    user.role !== "PATIENT"
  ) {
    return forbiddenResponse();
  }

  try {
    const body =
      (await req.json()) as Partial<Booking>;

    if (!body.type) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking type is required.",
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
          message: "Customer information is incomplete.",
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

    const customerName =
      user.role === "PATIENT"
        ? user.name
        : body.customer.fullName;

    const customerPhone =
      user.role === "PATIENT"
        ? user.phone
        : body.customer.mobile;

    const customerEmail =
      user.role === "PATIENT"
        ? user.email ?? undefined
        : body.customer.email;

    const createdBooking =
      await bookingRepository.createBooking({
        reference: `BK-${Date.now()}`,
        type: body.type,
        title:
          body.title ?? `${body.type} Booking`,
        amount: body.amount ?? 0,
        customerName,
        customerPhone,
        customerEmail,
        priority: body.priority,
        doctorId:
          body.type === "APPOINTMENT"
            ? appointment?.doctorId
            : undefined,
        preferredDate:
          body.type === "DIAGNOSTIC"
            ? diagnostic?.preferredDate
              ? new Date(diagnostic.preferredDate)
              : undefined
            : undefined,
        consultationMode:
          body.type === "APPOINTMENT"
            ? appointment?.consultationMode
            : undefined,
        requestData: body.requestData
          ? JSON.parse(JSON.stringify(body.requestData))
          : undefined,
      });

    return NextResponse.json(
      {
        success: true,
        message: "Booking created successfully.",
        data: normalizeBooking(createdBooking),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create booking.", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create booking.",
      },
      { status: 500 }
    );
  }
}
