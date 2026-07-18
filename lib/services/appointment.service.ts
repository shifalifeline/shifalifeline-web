import { APPOINTMENTS } from "@/constants/appointments";

export interface Appointment {
  id: string;
  patient: string;
  mobile: string;
  doctorId: number;
  doctor: string;
  date: string;
  preferredSession: string;
  status:
    | "Pending"
    | "Confirmed"
    | "Completed"
    | "Cancelled";
}

let appointments = [...APPOINTMENTS];

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getAppointments() {
  await delay(300);

  return [...appointments];
}

export async function createAppointment(
  appointment: Appointment
) {
  await delay(300);

  appointments.unshift(appointment);

  return appointment;
}

export async function confirmAppointment(
  id: string
) {
  await delay(300);

  appointments = appointments.map((item) =>
    item.id === id
      ? {
          ...item,
          status: "Confirmed",
        }
      : item
  );

  return [...appointments];
}

export async function completeAppointment(
  id: string
) {
  await delay(300);

  appointments = appointments.map((item) =>
    item.id === id
      ? {
          ...item,
          status: "Completed",
        }
      : item
  );

  return [...appointments];
}

export async function cancelAppointment(
  id: string
) {
  await delay(300);

  appointments = appointments.map((item) =>
    item.id === id
      ? {
          ...item,
          status: "Cancelled",
        }
      : item
  );

  return [...appointments];
}