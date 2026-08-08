import { NextRequest, NextResponse } from "next/server";

import inventoryRepository from "@/services/inventory.repository";

export async function GET(
  request: NextRequest
) {
  try {
    const medicineId =
      request.nextUrl.searchParams.get(
        "medicineId"
      ) ?? undefined;

    const batches =
      await inventoryRepository.getStockBatches(
        medicineId
      );

    return NextResponse.json({
      success: true,
      message: "Inventory batches retrieved successfully.",
      data: batches,
    });
  } catch (error) {
    console.error(
      "Failed to retrieve inventory batches.",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to retrieve inventory batches.",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    if (
      !body.medicineId ||
      !body.batchNumber ||
      !body.expiryDate ||
      body.quantity === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Medicine, batch number, expiry date and quantity are required.",
        },
        { status: 400 }
      );
    }

    const quantity = Number(body.quantity);

    if (
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Quantity must be a positive whole number.",
        },
        { status: 400 }
      );
    }

    const expiryDate = new Date(
      body.expiryDate
    );

    if (Number.isNaN(expiryDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid expiry date.",
        },
        { status: 400 }
      );
    }

    const batch =
      await inventoryRepository.receiveStock({
        medicineId: body.medicineId,
        batchNumber: body.batchNumber,
        expiryDate,
        quantity,
        purchasePrice: Number(
          body.purchasePrice ?? 0
        ),
        sellingPrice: Number(
          body.sellingPrice ?? 0
        ),
        mrp: Number(body.mrp ?? 0),
        reference:
          body.reference,
        remarks:
          body.remarks,
        createdBy:
          body.createdBy,
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Stock received successfully.",
        data: batch,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Failed to receive stock.",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unable to receive stock.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 400 }
    );
  }
}