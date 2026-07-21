export type PaymentWorkflowState =
  | "PENDING_REVIEW"
  | "QUOTE_READY"
  | "PAYMENT_REQUESTED"
  | "PAYMENT_RECEIVED";

export interface PaymentQuote {
  reference: string;
  bookingId: string;
  bookingType: "APPOINTMENT" | "DIAGNOSTIC" | "PHARMACY" | "PACKAGE";
  status: PaymentWorkflowState;
  originalAmount?: number;
  discount?: number;
  finalAmount?: number;
  remarks?: string;
  requestedAt: string;
  updatedAt: string;
}

function now(): string {
  return new Date().toISOString();
}

export function createPaymentReview(
  bookingId: string,
  bookingType: PaymentQuote["bookingType"],
  reference: string
): PaymentQuote {
  const timestamp = now();

  return {
    bookingId,
    bookingType,
    reference,
    status: "PENDING_REVIEW",
    requestedAt: timestamp,
    updatedAt: timestamp,
  };
}

export function generateQuote(
  review: PaymentQuote,
  originalAmount: number,
  discount = 0,
  remarks?: string
): PaymentQuote {
  return {
    ...review,
    status: "QUOTE_READY",
    originalAmount,
    discount,
    finalAmount: Math.max(originalAmount - discount, 0),
    remarks,
    updatedAt: now(),
  };
}

export function requestPayment(
  review: PaymentQuote
): PaymentQuote {
  return {
    ...review,
    status: "PAYMENT_REQUESTED",
    updatedAt: now(),
  };
}

export function confirmPayment(
  review: PaymentQuote
): PaymentQuote {
  return {
    ...review,
    status: "PAYMENT_RECEIVED",
    updatedAt: now(),
  };
}
