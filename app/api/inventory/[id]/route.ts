import { NextResponse } from "next/server";

import inventoryRepository from "@/services/inventory.repository";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

interface UpdateMedicineBody {
  medicineName?: string;
  genericName?: string;
  brandName?: string;
  manufacturer?: string;
  category?: string;
  dosageForm?: string;
  strength?: string;
  hsnCode?: string;
  gst?: number;
  purchasePrice?: number;
  sellingPrice?: number;
  mrp?: number;
  packSize?: string;
  reorderLevel?: number;
  prescriptionRequired?: boolean;
  drugSchedule?: string;
  retail?: boolean;
  wholesale?: boolean;
  active?: boolean;
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

export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body =
      (await request.json()) as UpdateMedicineBody;

    const existingMedicine =
      await inventoryRepository.getMedicine(id);

    if (!existingMedicine) {
      return NextResponse.json(
        {
          success: false,
          message: "Medicine not found.",
        },
        { status: 404 }
      );
    }

    if (
      !body.medicineName?.trim() ||
      !body.genericName?.trim() ||
      !body.brandName?.trim() ||
      !body.manufacturer?.trim() ||
      !body.category?.trim() ||
      !body.dosageForm?.trim() ||
      !body.strength?.trim() ||
      !body.hsnCode?.trim() ||
      !body.drugSchedule?.trim()
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
      await inventoryRepository.updateMedicine(
        id,
        {
          medicineName:
            body.medicineName.trim(),
          genericName:
            body.genericName.trim(),
          brandName:
            body.brandName.trim(),
          manufacturer:
            body.manufacturer.trim(),
          category:
            body.category.trim(),
          dosageForm:
            body.dosageForm.trim(),
          strength:
            body.strength.trim(),
          hsnCode:
            body.hsnCode.trim(),
          gst: Number(body.gst ?? 0),
          purchasePrice:
            Number(
              body.purchasePrice ?? 0
            ),
          sellingPrice:
            Number(
              body.sellingPrice ?? 0
            ),
          mrp: Number(body.mrp ?? 0),
          packSize:
            body.packSize?.trim() ?? "",
          reorderLevel:
            Number(
              body.reorderLevel ?? 0
            ),
          prescriptionRequired:
            Boolean(
              body.prescriptionRequired
            ),
          drugSchedule:
            body.drugSchedule.trim(),
          retail:
            body.retail !== false,
          wholesale:
            Boolean(body.wholesale),
          active:
            body.active !== false,
        }
      );

    return NextResponse.json({
      success: true,
      message:
        "Medicine updated successfully.",
      data: medicine,
    });
  } catch (error) {
    console.error(
      "Failed to update medicine.",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to update medicine.",
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

    if (
      medicine.inventoryBatches.length > 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Medicine cannot be deleted because inventory batches exist.",
        },
        { status: 409 }
      );
    }

    await inventoryRepository.deleteMedicine(
      id
    );

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