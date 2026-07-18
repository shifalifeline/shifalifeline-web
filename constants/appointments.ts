import type { Appointment } from "@/lib/services/appointment.service";

export const APPOINTMENTS: Appointment[] = [
  {
    id: "SHF-000101",
    patient: "Rahul Das",
    mobile: "9876543210",
    doctorId: 1,
    doctor: "Dr. Ritun Sarkar",
    date: "2026-07-18",
    preferredSession: "Morning",
    status: "Pending",
  },
  {
    id: "SHF-000102",
    patient: "Priya Sen",
    mobile: "9123456780",
    doctorId: 2,
    doctor: "Dr. Asish Debnath",
    date: "2026-07-19",
    preferredSession: "Evening",
    status: "Confirmed",
  },
];