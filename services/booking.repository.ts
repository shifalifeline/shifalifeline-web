import { prisma } from "@/lib/prisma";
import {
  BookingPriority,
  BookingStatus,
  BookingType,
  PaymentStatus,
  Prisma,
} from "@prisma/client";

export interface CreateBookingPayload {
  reference: string;
  type: BookingType;
  title: string;
  amount: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  priority?: BookingPriority;
}

class BookingRepository {
  async createBooking(data: CreateBookingPayload) {
    return prisma.$transaction(async (tx) => {
      let patient = await tx.patient.findUnique({
        where: { phone: data.customerPhone },
      });

      if (!patient) {
        const parts = data.customerName.trim().split(/\s+/);

patient = await tx.patient.create({
  data: {
    uhid: `SH${Date.now()}`,
    firstName: parts[0] ?? "Unknown",
    lastName: parts.slice(1).join(" "),
    phone: data.customerPhone,
    email: data.customerEmail,
    gender: "UNKNOWN",
    status: "Active",
  },
});
      }

      const booking = await tx.booking.create({
        data: {
          reference: data.reference,
          type: data.type,
          title: data.title,
          amount: data.amount,
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          customerEmail: data.customerEmail,
          priority: data.priority ?? BookingPriority.NORMAL,
          status: BookingStatus.NEW,
          paymentStatus: PaymentStatus.PENDING,
          patient: { connect: { id: patient.id } },
        },
      });

      await tx.bookingTimeline.create({
        data: {
          bookingId: booking.id,
          status: BookingStatus.NEW,
          note: "Booking created",
        },
      });

      return booking;
    });
  }

  async getBookings() {
    return prisma.booking.findMany({
      include: {
        patient: true,
        quotations: true,
        timeline: { orderBy: { createdAt: "asc" } },
        schedules: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getBooking(id: string) {
    return prisma.booking.findUnique({
      where: { id },
      include: {
        patient: true,
        quotations: true,
        timeline: { orderBy: { createdAt: "asc" } },
        schedules: true,
      },
    });
  }

  async updateBooking(id: string, data: Prisma.BookingUpdateInput) {
    return prisma.booking.update({
      where: { id },
      data,
      include: {
        patient: true,
        quotations: true,
        timeline: true,
        schedules: true,
      },
    });
  }

  async updateStatus(id: string, status: BookingStatus) {
    return prisma.$transaction(async (tx) => {
      const booking = await tx.booking.update({
        where: { id },
        data: { status },
        include: {
          patient: true,
          quotations: true,
          timeline: true,
          schedules: true,
        },
      });

      await tx.bookingTimeline.create({
        data: {
          bookingId: id,
          status,
          note: `Status changed to ${status}`,
        },
      });

      return booking;
    });
  }

  async applyQuotation(
    bookingId: string,
    amount: number,
    discount = 0,
    remarks?: string
  ) {
    return prisma.$transaction(async (tx) => {
      const version = await tx.bookingQuotation.count({ where: { bookingId } });

      await tx.bookingQuotation.create({
        data: {
          bookingId,
          version: version + 1,
          amount,
          discount,
          finalAmount: amount - discount,
          remarks,
        },
      });

      const booking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          amount,
          status: BookingStatus.QUOTATION_READY,
        },
        include: {
          patient: true,
          quotations: true,
          timeline: true,
          schedules: true,
        },
      });

      await tx.bookingTimeline.create({
        data: {
          bookingId,
          status: BookingStatus.QUOTATION_READY,
          note: "Quotation prepared",
        },
      });

      return booking;
    });
  }

  async processPayment(
    bookingId: string,
    paymentStatus: PaymentStatus
  ) {
    return prisma.$transaction(async (tx) => {
      const status =
        paymentStatus === PaymentStatus.SUCCESS
          ? BookingStatus.PAYMENT_RECEIVED
          : BookingStatus.PAYMENT_PENDING;

      const booking = await tx.booking.update({
        where: { id: bookingId },
        data: { paymentStatus, status },
        include: {
          patient: true,
          quotations: true,
          timeline: true,
          schedules: true,
        },
      });

      await tx.bookingTimeline.create({
        data: {
          bookingId,
          status,
          note:
            paymentStatus === PaymentStatus.SUCCESS
              ? "Payment received"
              : "Payment pending",
        },
      });

      return booking;
    });
  }

  async scheduleBooking(
    bookingId: string,
    scheduledOn: Date,
    session: string,
    assignedTo?: string,
    notes?: string
  ) {
    return prisma.$transaction(async (tx) => {
      await tx.bookingSchedule.create({
        data: {
          bookingId,
          scheduledOn,
          session,
          assignedTo,
          notes,
        },
      });

      const booking = await tx.booking.update({
        where: { id: bookingId },
        data: { status: BookingStatus.SCHEDULED },
        include: {
          patient: true,
          quotations: true,
          timeline: true,
          schedules: true,
        },
      });

      await tx.bookingTimeline.create({
        data: {
          bookingId,
          status: BookingStatus.SCHEDULED,
          note: "Booking scheduled",
        },
      });

      return booking;
    });
  }

  async deleteBooking(id: string) {
    return prisma.booking.delete({
      where: { id },
    });
  }
}

const bookingRepository = new BookingRepository();

export default bookingRepository;
