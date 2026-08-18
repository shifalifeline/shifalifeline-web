import { NextRequest, NextResponse } from "next/server";
import bookingRepository from "@/services/booking.repository";
import {
  forbiddenResponse,
  getAuthenticatedUser,
  unauthorizedResponse,
} from "@/lib/auth/requireAuth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

function normalizeBooking(booking: any) {
  return {
    ...booking,
    customer: {
      fullName:
        booking.customerName ??
        [
          booking.patient?.firstName,
          booking.patient?.lastName,
        ]
          .filter(Boolean)
          .join(" "),
      mobile:
        booking.customerPhone ??
        booking.patient?.phone ??
        "",
      email:
        booking.customerEmail ??
        booking.patient?.email ??
        "",
    },
  };
}

function canAccessBooking(
  user: Awaited<ReturnType<typeof getAuthenticatedUser>>,
  booking: any
) {
  if (!user || !booking) return false;

  if (user.role === "ADMIN") return true;

  if (user.role === "PATIENT") {
    return booking.customerPhone === user.phone;
  }

  if (user.role === "DOCTOR") {
    return booking.doctorId === user.id;
  }

  if (user.role === "DIAGNOSTIC") {
    return booking.type === "DIAGNOSTIC";
  }

  if (
    user.role === "PHARMACY" ||
    user.role === "RETAILER"
  ) {
    return booking.type === "PHARMACY";
  }

  return false;
}

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  const user = await getAuthenticatedUser(req);

  if (!user) return unauthorizedResponse();

  try {
    const { id } = await params;
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

    if (!canAccessBooking(user, booking)) {
      return forbiddenResponse();
    }

    return NextResponse.json({
      success: true,
      message: "Booking retrieved successfully.",
      data: normalizeBooking(booking),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve booking.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: RouteParams
) {
  const user = await getAuthenticatedUser(req);

  if (!user) return unauthorizedResponse();
  if (user.role !== "ADMIN") return forbiddenResponse();

  try {
    const { id } = await params;
    const body = await req.json();

    const booking = await bookingRepository.updateBooking(
      id,
      body
    );

    return NextResponse.json({
      success: true,
      message: "Booking updated successfully.",
      data: normalizeBooking(booking),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update booking.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
) {
  const user = await getAuthenticatedUser(req);

  if (!user) return unauthorizedResponse();
  if (user.role !== "ADMIN") return forbiddenResponse();

  try {
    const { id } = await params;

    await bookingRepository.deleteBooking(id);

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete booking.",
      },
      { status: 500 }
    );
  }
}
