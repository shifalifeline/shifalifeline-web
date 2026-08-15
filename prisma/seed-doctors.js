const { PrismaClient } = require("@prisma/client");

if (typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile(".env");
  } catch {}
}

const prisma = new PrismaClient();

const DOCTORS = [
  {
    doctorCode: "DOC-001",
    firstName: "Ritun",
    lastName: "Sarkar",
    specialty:
      "General Medicine, Female Health & Wellbeing",
    qualification: "MBBS, MD (Medicine)",
    photoUrl: "/doctors/dr-ritun-sarkar.png",
  },
  {
    doctorCode: "DOC-002",
    firstName: "Asish",
    lastName: "Debnath",
    specialty:
      "Neuro Psychiatrist, Mental Health, De-Addiction Specialist",
    qualification:
      "MBBS, DA, DCH, MD (Psychiatry)",
    photoUrl: "/doctors/dr-asish-debnath.png",
  },
  {
    doctorCode: "DOC-003",
    firstName: "Sibasish",
    lastName: "Mukherjee",
    specialty:
      "Nephrologist & Consultant Urologist",
    qualification: "MBBS, DNB (Nephrology)",
    photoUrl:
      "/doctors/dr-sibasish-mukherjee.png",
  },
  {
    doctorCode: "DOC-004",
    firstName: "Sudipto",
    lastName: "Chakraborty",
    specialty:
      "Nephrologist, Consultant Urologist & Endocrinologist",
    qualification:
      "MBBS, DNB (Medicine), DrNB (Nephrology)",
    photoUrl:
      "/doctors/dr-sudipto-chakraborty.png",
  },
  {
    doctorCode: "DOC-005",
    firstName: "Saumyabrata",
    lastName: "Deb",
    specialty: "General Medicine & Arthritis",
    qualification: "MBBS, DNB (Medicine)",
    photoUrl:
      "/doctors/dr-saumyabrata-deb.jpeg",
  },
  {
    doctorCode: "DOC-006",
    firstName: "Md Mehbub",
    lastName: "Alam",
    specialty: "Obstetrics & Gynecology",
    qualification:
      "MBBS, MS (Gyn & Obs)",
    photoUrl:
      "/doctors/dr-md-mehbub-alam.png",
  },
  {
    doctorCode: "DOC-007",
    firstName: "Kaleemur",
    lastName: "Rahaman",
    specialty:
      "Orthopedic, Joint Replacement & Neuro Spine Specialist",
    qualification:
      "MBBS, MS (Ortho), DNB, MNAMS",
    photoUrl:
      "/doctors/dr-kaleemur-rahaman.png",
  },
  {
    doctorCode: "DOC-008",
    firstName: "Akhil Xavier",
    lastName: "Josef",
    specialty:
      "Orthopedic, Joint Replacement & Neuro Spine Specialist",
    qualification:
      "MBBS, MS (Ortho), FISS",
    photoUrl:
      "/doctors/dr-akhil-xavier-josef.png",
  },
  {
    doctorCode: "DOC-009",
    firstName: "Lavin",
    lastName: "Gowda",
    specialty:
      "Medical Gastroenterologist & Diabetologist",
    qualification:
      "MBBS, MD (Internal Medicine)",
    photoUrl:
      "/doctors/dr-lavin-gowda.png",
  },
];

async function main() {
  for (const doctor of DOCTORS) {
    await prisma.doctor.upsert({
      where: {
        doctorCode: doctor.doctorCode,
      },
      update: {},
      create: {
        ...doctor,
        status: "Active",
      },
    });

    console.log(
      `✓ ${doctor.doctorCode} - ${doctor.firstName} ${doctor.lastName}`
    );
  }

  console.log(
    `\nDoctor seed complete: ${DOCTORS.length} doctors processed.`
  );
}

main()
  .catch((error) => {
    console.error(
      "\nDoctor seed failed:",
      error
    );
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });