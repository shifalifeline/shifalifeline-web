import { prisma } from "@/lib/prisma";
import { StockMovementType } from "@prisma/client";

export interface CreateMedicinePayload {
  code: string;
  medicineName: string;
  genericName: string;
  brandName: string;
  manufacturer: string;
  category: string;
  dosageForm: string;
  strength: string;
  hsnCode: string;
  gst: number;
  purchasePrice: number;
  sellingPrice: number;
  mrp: number;
  packSize: string;
  reorderLevel?: number;
  prescriptionRequired?: boolean;
  drugSchedule: string;
  retail?: boolean;
  wholesale?: boolean;
  active?: boolean;
}

export interface ReceiveStockPayload {
  medicineId: string;
  batchNumber: string;
  expiryDate: Date;
  quantity: number;
  purchasePrice: number;
  sellingPrice: number;
  mrp: number;
  reference?: string;
  remarks?: string;
  createdBy?: string;
}

export interface StockAdjustmentPayload {
  batchId: string;
  quantity: number;
  remarks?: string;
  reference?: string;
  createdBy?: string;
}

export interface StockIssuePayload {
  batchId: string;
  quantity: number;
  reference?: string;
  remarks?: string;
  createdBy?: string;
}

class InventoryRepository {
  async getMedicines() {
    return prisma.medicine.findMany({
      orderBy: {
        medicineName: "asc",
      },
    });
  }

  async getMedicine(id: string) {
    return prisma.medicine.findUnique({
      where: {
        id,
      },
      include: {
        inventoryBatches: {
          orderBy: {
            expiryDate: "asc",
          },
        },
      },
    });
  }

  async createMedicine(data: CreateMedicinePayload) {
    return prisma.medicine.create({
      data: {
        code: data.code,
        medicineName: data.medicineName,
        genericName: data.genericName,
        brandName: data.brandName,
        manufacturer: data.manufacturer,
        category: data.category,
        dosageForm: data.dosageForm,
        strength: data.strength,
        hsnCode: data.hsnCode,
        gst: data.gst,
        purchasePrice: data.purchasePrice,
        sellingPrice: data.sellingPrice,
        mrp: data.mrp,
        packSize: data.packSize,
        reorderLevel: data.reorderLevel ?? 0,
        prescriptionRequired:
          data.prescriptionRequired ?? false,
        drugSchedule: data.drugSchedule,
        retail: data.retail ?? true,
        wholesale: data.wholesale ?? false,
        active: data.active ?? true,
      },
    });
  }

  async deleteMedicine(id: string) {
    return prisma.medicine.delete({
      where: {
        id,
      },
    });
  }

  async getInventory() {
    const medicines = await prisma.medicine.findMany({
      include: {
        inventoryBatches: {
          orderBy: {
            expiryDate: "asc",
          },
        },
      },
      orderBy: {
        medicineName: "asc",
      },
    });

    return medicines.map((medicine) => {
      const totalStock =
        medicine.inventoryBatches.reduce(
          (total, batch) => total + batch.quantity,
          0
        );

      return {
        ...medicine,
        totalStock,
        lowStock: totalStock <= medicine.reorderLevel,
      };
    });
  }

  async getStockBatches(medicineId?: string) {
    return prisma.inventoryBatch.findMany({
      where: medicineId
        ? {
            medicineId,
          }
        : undefined,
      include: {
        medicine: true,
      },
      orderBy: [
        {
          expiryDate: "asc",
        },
        {
          batchNumber: "asc",
        },
      ],
    });
  }

  async receiveStock(data: ReceiveStockPayload) {
    if (data.quantity <= 0) {
      throw new Error(
        "Stock quantity must be greater than zero."
      );
    }

    return prisma.$transaction(async (tx) => {
      const medicine = await tx.medicine.findUnique({
        where: {
          id: data.medicineId,
        },
      });

      if (!medicine) {
        throw new Error("Medicine not found.");
      }

      const batch = await tx.inventoryBatch.upsert({
        where: {
          medicineId_batchNumber: {
            medicineId: data.medicineId,
            batchNumber: data.batchNumber,
          },
        },
        create: {
          medicineId: data.medicineId,
          batchNumber: data.batchNumber,
          expiryDate: data.expiryDate,
          quantity: data.quantity,
          purchasePrice: data.purchasePrice,
          sellingPrice: data.sellingPrice,
          mrp: data.mrp,
        },
        update: {
          expiryDate: data.expiryDate,
          quantity: {
            increment: data.quantity,
          },
          purchasePrice: data.purchasePrice,
          sellingPrice: data.sellingPrice,
          mrp: data.mrp,
        },
      });

      await tx.stockMovement.create({
        data: {
          inventoryBatchId: batch.id,
          type: StockMovementType.RECEIPT,
          quantity: data.quantity,
          reference: data.reference,
          remarks: data.remarks,
          createdBy: data.createdBy,
        },
      });

      return tx.inventoryBatch.findUnique({
        where: {
          id: batch.id,
        },
        include: {
          medicine: true,
          movements: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
    });
  }

  async issueStock(data: StockIssuePayload) {
    if (data.quantity <= 0) {
      throw new Error(
        "Issue quantity must be greater than zero."
      );
    }

    return prisma.$transaction(async (tx) => {
      const batch = await tx.inventoryBatch.findUnique({
        where: {
          id: data.batchId,
        },
      });

      if (!batch) {
        throw new Error("Inventory batch not found.");
      }

      if (batch.quantity < data.quantity) {
        throw new Error("Insufficient stock.");
      }

      const updatedBatch =
        await tx.inventoryBatch.update({
          where: {
            id: data.batchId,
          },
          data: {
            quantity: {
              decrement: data.quantity,
            },
          },
        });

      await tx.stockMovement.create({
        data: {
          inventoryBatchId: data.batchId,
          type: StockMovementType.ISSUE,
          quantity: data.quantity,
          reference: data.reference,
          remarks: data.remarks,
          createdBy: data.createdBy,
        },
      });

      return updatedBatch;
    });
  }

  async adjustStock(data: StockAdjustmentPayload) {
    if (data.quantity === 0) {
      throw new Error(
        "Adjustment quantity cannot be zero."
      );
    }

    return prisma.$transaction(async (tx) => {
      const batch = await tx.inventoryBatch.findUnique({
        where: {
          id: data.batchId,
        },
      });

      if (!batch) {
        throw new Error("Inventory batch not found.");
      }

      const newQuantity =
        batch.quantity + data.quantity;

      if (newQuantity < 0) {
        throw new Error(
          "Stock adjustment cannot make inventory negative."
        );
      }

      const updatedBatch =
        await tx.inventoryBatch.update({
          where: {
            id: data.batchId,
          },
          data: {
            quantity: newQuantity,
          },
        });

      await tx.stockMovement.create({
        data: {
          inventoryBatchId: data.batchId,
          type: StockMovementType.ADJUSTMENT,
          quantity: data.quantity,
          reference: data.reference,
          remarks: data.remarks,
          createdBy: data.createdBy,
        },
      });

      return updatedBatch;
    });
  }

  async getStockMovements(batchId?: string) {
    return prisma.stockMovement.findMany({
      where: batchId
        ? {
            inventoryBatchId: batchId,
          }
        : undefined,
      include: {
        inventoryBatch: {
          include: {
            medicine: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

const inventoryRepository =
  new InventoryRepository();

export default inventoryRepository;