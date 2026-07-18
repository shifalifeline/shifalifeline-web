import { PaymentStatus } from "./payment";

export type BookingType =
  | "APPOINTMENT"
  | "DIAGNOSTIC"
  | "PHARMACY"
  | "PACKAGE";

export interface CustomerInfo {
  fullName: string;
  mobile: string;
  email?: string;
}

export interface Booking {
  id: string;
  reference: string;

  type: BookingType;

  title: string;

  amount: number;

  customer: CustomerInfo;

  paymentStatus: PaymentStatus;

  createdAt: string;
}