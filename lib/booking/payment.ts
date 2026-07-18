import { Payment } from "@/types/payment";

export type PaymentWorkflowState =
  | "PENDING_REVIEW"
  | "QUOTE_READY"
  | "PAYMENT_PENDING"
  | "PAYMENT_RECEIVED"
  | "PAYMENT_FAILED"
  | "CANCELLED";

export interface PaymentQuote extends Payment {
  workflowStatus: PaymentWorkflowState;
  originalAmount?: number;
  discount?: number;
  finalAmount?: number;
  paymentLink?: string;
  reviewedAt?: string;
}

export async function submitForReview(
  payment: Payment
): Promise<PaymentQuote> {
  return {
    ...payment,
    workflowStatus: "PENDING_REVIEW",
  };
}

export async function generateQuotation(
  quote: PaymentQuote,
  finalAmount: number,
  discount = 0
): Promise<PaymentQuote> {
  return {
    ...quote,
    workflowStatus: "QUOTE_READY",
    originalAmount: quote.amount,
    discount,
    finalAmount,
  };
}

export async function generatePaymentLink(
  quote: PaymentQuote
): Promise<PaymentQuote> {
  return {
    ...quote,
    workflowStatus: "PAYMENT_PENDING",
    paymentLink: `/payments/${quote.bookingId}`,
  };
}