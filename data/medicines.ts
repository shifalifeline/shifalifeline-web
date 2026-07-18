export interface Medicine {
  id: string;
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
  reorderLevel: number;
  prescriptionRequired: boolean;
  drugSchedule: string;
  retail: boolean;
  wholesale: boolean;
  active: boolean;
}

export const MEDICINES: Medicine[] = [
  {
    id: "1",
    code: "MED001",
    medicineName: "Doxofylline 400 mg",
    genericName: "Doxofylline",
    brandName: "Doxolin",
    manufacturer: "Sun Pharma",
    category: "Respiratory",
    dosageForm: "Tablet",
    strength: "400 mg",
    hsnCode: "30049099",
    gst: 12,
    purchasePrice: 145,
    sellingPrice: 190,
    mrp: 210,
    packSize: "10 Tablets",
    reorderLevel: 25,
    prescriptionRequired: true,
    drugSchedule: "Schedule H",
    retail: true,
    wholesale: true,
    active: true,
  },
  {
    id: "2",
    code: "MED002",
    medicineName: "Montelukast 10 mg",
    genericName: "Montelukast",
    brandName: "Montek",
    manufacturer: "Cipla",
    category: "Anti-Allergic",
    dosageForm: "Tablet",
    strength: "10 mg",
    hsnCode: "30049099",
    gst: 12,
    purchasePrice: 110,
    sellingPrice: 150,
    mrp: 165,
    packSize: "10 Tablets",
    reorderLevel: 20,
    prescriptionRequired: true,
    drugSchedule: "Schedule H",
    retail: true,
    wholesale: false,
    active: true,
  },
];