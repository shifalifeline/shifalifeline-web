import { NextResponse } from "next/server";

import inventoryRepository from "@/services/inventory.repository";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const batch =
      await inventoryRepository.getStockBatch(id);

    if (!batch) {
      return NextResponse.json(
        {
          success: false,
          message: "Inventory batch not found.",
        },
        { status: 404 }
      );
    }

    await inventoryRepository.deleteStockBatch(
      id
    );

    return NextResponse.json({
      success: true,
      message:
        "Inventory batch deleted successfully.",
      data: null,
    });
  } catch (error) {
    console.error(
      "Failed to delete inventory batch.",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to delete inventory batch.",
      },
      { status: 500 }
    );
  }
}