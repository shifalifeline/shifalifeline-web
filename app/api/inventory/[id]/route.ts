import { NextResponse } from "next/server";

import inventoryRepository from "@/services/inventory.repository";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const medicine =
      await inventoryRepository.getMedicine(id);

    if (!medicine) {
      return NextResponse.json(
        {
          success: false,
          message: "Medicine not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Medicine retrieved successfully.",
      data: medicine,
    });
  } catch (error) {
    console.error(
      "Failed to retrieve medicine.",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to retrieve medicine.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const medicine =
      await inventoryRepository.getMedicine(id);

    if (!medicine) {
      return NextResponse.json(
        {
          success: false,
          message: "Medicine not found.",
        },
        { status: 404 }
      );
    }

    if (medicine.inventoryBatches.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Medicine cannot be deleted because inventory batches exist.",
        },
        { status: 409 }
      );
    }

    await inventoryRepository.deleteMedicine(id);

    return NextResponse.json({
      success: true,
      message:
        "Medicine deleted successfully.",
      data: null,
    });
  } catch (error) {
    console.error(
      "Failed to delete medicine.",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to delete medicine.",
      },
      { status: 500 }
    );
  }
}