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

    switch (body.type) {
      case "ISSUE": {
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

        const batch =
          await inventoryRepository.getStockBatch(
            body.batchId
          );

        if (!batch) {
          return NextResponse.json(
            {
              success: false,
              message:
                "Inventory batch not found.",
            },
            { status: 404 }
          );
        }

        const now = new Date();

        if (
          batch.expiryDate.getTime() <=
          now.getTime()
        ) {
          return NextResponse.json(
            {
              success: false,
              message:
                "Expired stock cannot be issued.",
            },
            { status: 409 }
          );
        }

        if (batch.quantity <= 0) {
          return NextResponse.json(
            {
              success: false,
              message:
                "This batch has no available stock.",
            },
            { status: 409 }
          );
        }

        if (quantity > batch.quantity) {
          return NextResponse.json(
            {
              success: false,
              message:
                `Only ${batch.quantity} units are available in this batch.`,
            },
            { status: 409 }
          );
        }

        const result =
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

        return NextResponse.json({
          success: true,
          message:
            "Stock issued successfully.",
          data: result,
        });
      }

      case "ADJUSTMENT": {
        const result =
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

        return NextResponse.json({
          success: true,
          message:
            "Stock adjusted successfully.",
          data: result,
        });
      }

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