import { NextRequest, NextResponse } from "next/server";
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

    if (body.amount === undefined || body.amount === null) {
      return NextResponse.json(
        {
          success: false,
          message: "Quotation amount is required.",
        },
        { status: 400 }
      );
    }

    const booking = await bookingRepository.applyQuotation(
      id,
      Number(body.amount),
      Number(body.discount ?? 0),
      body.remarks
    );

    return NextResponse.json(
      {
        success: true,
        message: "Quotation applied successfully.",
        data: booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to apply quotation.",
      },
      { status: 500 }
    );
  }
}