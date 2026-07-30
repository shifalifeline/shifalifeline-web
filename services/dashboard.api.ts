import bookingApi from "@/services/booking.api";
import type { Booking } from "@/types/booking";

export interface DashboardMetrics {
  totalBookings: number;
  pendingReview: number;
  paymentPending: number;
  scheduled: number;
  completed: number;
  recentBookings: Booking[];
}

class DashboardApi {
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const response = await bookingApi.getBookings();

    const bookings = response.data;

    return {
      totalBookings: bookings.length,

      pendingReview: bookings.filter(
        (b) => (b.status ?? "NEW") === "UNDER_REVIEW"
      ).length,

      paymentPending: bookings.filter(
        (b) => b.status === "PAYMENT_PENDING"
      ).length,

      scheduled: bookings.filter(
        (b) =>
          b.status === "SCHEDULED" ||
          b.status === "IN_PROGRESS"
      ).length,

      completed: bookings.filter(
        (b) => b.status === "COMPLETED"
      ).length,

      recentBookings: [...bookings]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        )
        .slice(0, 10),
    };
  }
}

const dashboardApi = new DashboardApi();

export default dashboardApi;