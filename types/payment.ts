export type PaymentStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "PARTIAL"
  | "REFUNDED"
  | "CANCELLED";

export type PaymentMethod =
  | "RAZORPAY"
  | "PHONEPE"
  | "UPI"
  | "CARD"
  | "NET_BANKING"
  | "CASH"
  | "OTHER";

export interface PaymentLink {
  id: string;
  url: string;
  expiresAt?: string;
  generatedAt: string;
}

export interface PaymentTransaction {
  id: string;
  amount: number;
  status: PaymentStatus;
  method?: PaymentMethod;
  gatewayReference?: string;
  transactionDate: string;
}

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

  paymentLink?: PaymentLink;

  transactions?: PaymentTransaction[];

  remarks?: string;
}