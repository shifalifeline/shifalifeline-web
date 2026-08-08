import { NextRequest, NextResponse } from "next/server";

import inventoryRepository from "@/services/inventory.repository";

export async function GET(
  request: NextRequest
) {
  try {
    const batchId =
      request.nextUrl.searchParams.get(
        "batchId"
      ) ?? undefined;

    const movements =
      await inventoryRepository.getStockMovements(
        batchId
      );

    return NextResponse.json({
      success: true,
      message:
        "Stock movements retrieved successfully.",
      data: movements,
    });
  } catch (error) {
    console.error(
      "Failed to retrieve stock movements.",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to retrieve stock movements.",
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

    if (!body.batchId || !body.type) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Batch and movement type are required.",
        },
        { status: 400 }
      );
    }

    if (body.quantity === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: "Quantity is required.",
        },
        { status: 400 }
      );
    }

    const quantity = Number(body.quantity);

    if (
      !Number.isInteger(quantity) ||
      quantity === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Quantity must be a non-zero whole number.",
        },
        { status: 400 }
      );
    }

    let result;

    switch (body.type) {
      case "ISSUE":
        if (quantity < 0) {
          return NextResponse.json(
            {
              success: false,
              message:
                "Issue quantity must be positive.",
            },
            { status: 400 }
          );
        }

        result =
          await inventoryRepository.issueStock({
            batchId: body.batchId,
            quantity,
            reference:
              body.reference,
            remarks:
              body.remarks,
            createdBy:
              body.createdBy,
          });
        break;

      case "ADJUSTMENT":
        result =
          await inventoryRepository.adjustStock({
            batchId: body.batchId,
            quantity,
            reference:
              body.reference,
            remarks:
              body.remarks,
            createdBy:
              body.createdBy,
          });
        break;

      default:
        return NextResponse.json(
          {
            success: false,
            message:
              "Unsupported stock movement type.",
          },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message:
        body.type === "ISSUE"
          ? "Stock issued successfully."
          : "Stock adjusted successfully.",
      data: result,
    });
  } catch (error) {
    console.error(
      "Failed to process stock movement.",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unable to process stock movement.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 400 }
    );
  }
}