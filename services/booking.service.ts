import {
  Booking,
  BookingQuotation,
  BookingStatus,
} from "@/types/booking";

export interface ServiceResult<T = void> {
  success: boolean;
  message: string;
  data?: T;
}

const allowedTransitions: Record<
  BookingStatus,
  BookingStatus[]
> = {
  NEW: ["UNDER_REVIEW"],

  UNDER_REVIEW: [
    "QUOTATION_READY",
    "CANCELLED",
  ],

  QUOTATION_READY: [
    "PAYMENT_PENDING",
    "CANCELLED",
  ],

  PAYMENT_PENDING: [
    "PAYMENT_RECEIVED",
    "CANCELLED",
  ],

  PAYMENT_RECEIVED: [
    "SCHEDULED",
  ],

  SCHEDULED: [
    "IN_PROGRESS",
    "CANCELLED",
  ],

  IN_PROGRESS: [
    "COMPLETED",
  ],

  COMPLETED: [],

  CANCELLED: [],
};

class BookingService {
  applyQuotation(
    booking: Booking,
    quotation: BookingQuotation
  ): ServiceResult<Booking> {
    return {
      success: true,
      message: "Quotation applied successfully.",
      data: {
        ...booking,
        quotation,
        status: "QUOTATION_READY",
      },
    };
  }

  generatePaymentLink(
    booking: Booking,
    gateway: string
  ): ServiceResult<{
    paymentReference: string;
    paymentLink: string;
  }> {
    const paymentReference = `PAY-${Date.now()}`;

    return {
      success: true,
      message: "Payment link generated successfully.",
      data: {
        paymentReference,
        paymentLink: `/payments/${paymentReference}?gateway=${encodeURIComponent(
          gateway
        )}`,
      },
    };
  }

  scheduleBooking(
    booking: Booking,
    schedule: NonNullable<Booking["schedule"]>
  ): ServiceResult<Booking> {
    return {
      success: true,
      message: "Booking scheduled successfully.",
      data: {
        ...booking,
        schedule,
        status: "SCHEDULED",
      },
    };
  }

  sendNotification(
    booking: Booking,
    channels: {
      sms: boolean;
      whatsapp: boolean;
      email: boolean;
      dashboard: boolean;
    }
  ): ServiceResult {
    console.log("Notification Request", {
      bookingId: booking.id,
      channels,
    });

    return {
      success: true,
      message: "Notification queued successfully.",
    };
  }

  updateStatus(
    booking: Booking,
    nextStatus: BookingStatus
  ): ServiceResult<Booking> {
    const current =
      booking.status ?? "NEW";

    if (!allowedTransitions[current].includes(nextStatus)) {
      return {
        success: false,
        message: `Cannot change booking from ${current} to ${nextStatus}.`,
      };
    }

    return {
      success: true,
      message: `Booking moved to ${nextStatus}.`,
      data: {
        ...booking,
        status: nextStatus,
      },
    };
  }

  canTransition(
    current: BookingStatus,
    next: BookingStatus
  ): boolean {
    return allowedTransitions[current].includes(
      next
    );
  }

  getAvailableTransitions(
    current: BookingStatus
  ): BookingStatus[] {
    return allowedTransitions[current];
  }
}

const bookingService = new BookingService();

export default bookingService;