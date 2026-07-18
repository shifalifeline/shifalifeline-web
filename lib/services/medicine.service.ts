import { MEDICINES, Medicine } from "@/data/medicines";

let medicines: Medicine[] = [...MEDICINES];

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getMedicines() {
  await delay(300);

  return [...medicines];
}

export async function getMedicine(id: string) {
  await delay(300);

  return medicines.find((item) => item.id === id);
}

export async function addMedicine(
  medicine: Medicine
) {
  await delay(300);

  medicines.unshift(medicine);

  return medicine;
}

export async function updateMedicine(
  id: string,
  medicine: Medicine
) {
  await delay(300);

  medicines = medicines.map((item) =>
    item.id === id ? medicine : item
  );

  return medicine;
}

export async function deleteMedicine(
  id: string
) {
  await delay(300);

  medicines = medicines.filter(
    (item) => item.id !== id
  );

  return true;
}

export async function searchMedicines(
  keyword: string
) {
  await delay(300);

  const search = keyword.toLowerCase();

  return medicines.filter(
    (item) =>
      item.medicineName
        .toLowerCase()
        .includes(search) ||
      item.genericName
        .toLowerCase()
        .includes(search) ||
      item.brandName
        .toLowerCase()
        .includes(search) ||
      item.manufacturer
        .toLowerCase()
        .includes(search)
  );
}