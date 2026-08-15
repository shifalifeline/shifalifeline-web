import { PaymentStatus } from "./payment";

export type BookingType =
  | "APPOINTMENT"
  | "DIAGNOSTIC"
  | "PHARMACY"
  | "PACKAGE";

export type BookingStatus =
  | "NEW"
  | "UNDER_REVIEW"
  | "QUOTATION_READY"
  | "PAYMENT_PENDING"
  | "PAYMENT_RECEIVED"
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type BookingPriority =
  | "LOW"
  | "NORMAL"
  | "HIGH"
  | "URGENT";

export type PreferredSession =
  | "MORNING"
  | "AFTERNOON"
  | "EVENING"
  | "NO_PREFERENCE";

export type ScheduledSession =
  | "MORNING"
  | "AFTERNOON"
  | "EVENING";

export type ConsultationMode =
  | "PHYSICAL"
  | "VIDEO";

export interface CustomerInfo {
  fullName: string;
  mobile: string;
  email?: string;
}

export interface BookingDiscount {
  id: string;
  title: string;
  amount: number;
  percentage?: number;
}

export interface BookingQuotation {
  originalAmount: number;
  promotionalDiscount: number;
  manualDiscount: number;
  finalAmount: number;
  reason?: string;
  preparedBy?: string;
  preparedAt?: string;
}

export interface BookingSchedule {
  date: string;
  session?: ScheduledSession;
  assignedTo?: string;
  location?: string;
}

export interface BookingTimelineEntry {
  id: string;
  title: string;
  description?: string;
  createdBy: string;
  createdAt: string;
}

export interface BookingNotification {
  sms?: boolean;
  whatsapp?: boolean;
  email?: boolean;
  dashboard?: boolean;
  lastSentAt?: string;
}

export interface BookingAttachment {
  fileName: string;
  fileUrl: string;
  mimeType?: string;
}

export interface AppointmentRequestData {
  doctorId: string;
  consultationMode: ConsultationMode;
}

export interface DiagnosticRequestData {
  tests: string[];

  collectionType:
    | "HOME"
    | "CENTER";

  preferredDate?: string;

  address?: string;

  prescription?: string;

  notes?: string;
}

export interface PharmacyRequestData {
  medicines: unknown[];

  prescription?: string;

  deliveryType?: string;
}

export interface PackageRequestData {
  packageId: string;

  preferredDate?: string;
}

export type BookingRequestData =
  | AppointmentRequestData
  | DiagnosticRequestData
  | PharmacyRequestData
  | PackageRequestData;

export interface Booking {
  id: string;

  reference: string;

  type: BookingType;

  title: string;

  amount: number;

  customer: CustomerInfo;

  paymentStatus: PaymentStatus;

  createdAt: string;

  status?: BookingStatus;

  priority?: BookingPriority;

  updatedAt?: string;

  /**
   * Legacy field.
   * Kept for backward compatibility during Sprint 25.
   * Future modules should use quotation.finalAmount.
   */
  finalAmount?: number;

  quotation?: BookingQuotation;

  discounts?: BookingDiscount[];

  schedule?: BookingSchedule;

  timeline?: BookingTimelineEntry[];

  notifications?: BookingNotification;

  internalNotes?: string;

  /**
   * Module-specific payload.
   * Typed according to Booking Type.
   */
  requestData?: BookingRequestData;

  assignedTo?: string;
}