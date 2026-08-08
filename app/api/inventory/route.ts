import { NextRequest, NextResponse } from "next/server";

import inventoryRepository from "@/services/inventory.repository";

export async function GET() {
  try {
    const inventory =
      await inventoryRepository.getInventory();

    return NextResponse.json({
      success: true,
      message: "Inventory retrieved successfully.",
      data: inventory,
    });
  } catch (error) {
    console.error(
      "Failed to retrieve inventory.",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve inventory.",
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
      !body.code ||
      !body.medicineName ||
      !body.genericName ||
      !body.brandName ||
      !body.manufacturer ||
      !body.category ||
      !body.dosageForm ||
      !body.strength ||
      !body.hsnCode ||
      !body.drugSchedule
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Required medicine fields are missing.",
        },
        { status: 400 }
      );
    }

    const medicine =
      await inventoryRepository.createMedicine({
        code: body.code,
        medicineName:
          body.medicineName,
        genericName:
          body.genericName,
        brandName: body.brandName,
        manufacturer:
          body.manufacturer,
        category: body.category,
        dosageForm:
          body.dosageForm,
        strength: body.strength,
        hsnCode: body.hsnCode,
        gst: Number(body.gst ?? 0),
        purchasePrice:
          Number(body.purchasePrice ?? 0),
        sellingPrice:
          Number(body.sellingPrice ?? 0),
        mrp: Number(body.mrp ?? 0),
        packSize:
          body.packSize ?? "",
        reorderLevel:
          Number(body.reorderLevel ?? 0),
        prescriptionRequired:
          Boolean(
            body.prescriptionRequired
          ),
        drugSchedule:
          body.drugSchedule,
        retail:
          body.retail !== false,
        wholesale:
          Boolean(body.wholesale),
        active:
          body.active !== false,
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Medicine created successfully.",
        data: medicine,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Failed to create medicine.",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to create medicine.",
      },
      { status: 500 }
    );
  }
}