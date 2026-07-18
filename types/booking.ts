import { Patient } from "./patient";
import { PaymentStatus } from "./payment";

export type BookingType =
  | "APPOINTMENT"
  | "DIAGNOSTIC"
  | "PHARMACY"
  | "PACKAGE";

export interface Booking {
  id: string;
  reference: string;

  type: BookingType;

  title: string;

  amount: number;

  patient: Patient;

  paymentStatus: PaymentStatus;

  createdAt: string;
}