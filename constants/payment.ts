export const PAYMENT_STATUS = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
} as const;

export const PAYMENT_GATEWAYS = [
  {
    id: "razorpay",
    name: "Razorpay",
    description: "Cards, UPI, Net Banking & Wallets",
  },
  {
    id: "phonepe",
    name: "PhonePe",
    description: "UPI Payments",
  },
  {
    id: "payu",
    name: "PayU",
    description: "Cards, UPI & Net Banking",
  },
] as const;