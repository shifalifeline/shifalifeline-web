export type PaymentStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED";

export interface Payment {
  bookingId: string;
  bookingType:
    | "APPOINTMENT"
    | "DIAGNOSTIC"
    | "PHARMACY"
    | "PACKAGE";

  amount: number;
  customerName: string;
  mobile: string;
  email?: string;

  status: PaymentStatus;
}