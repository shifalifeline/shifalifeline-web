import { apiClient } from "@/lib/apiClient";
import { API } from "@/lib/apiEndpoints";
import {
  ApiResponse,
  PaginatedResponse,
} from "@/types/api.types";
import {
  Booking,
  BookingQuotation,
  BookingSchedule,
  BookingStatus,
} from "@/types/booking";

class BookingApi {
  async getBookings() {
    return apiClient.get<
      PaginatedResponse<Booking>
    >(API.BOOKINGS.LIST);
  }

  async getBooking(id: string) {
    return apiClient.get<
      ApiResponse<Booking>
    >(API.BOOKINGS.DETAILS(id));
  }

  async createBooking(
    booking: Partial<Booking>
  ) {
    return apiClient.post<
      ApiResponse<Booking>
    >(API.BOOKINGS.CREATE, booking);
  }

  async updateBooking(
    id: string,
    booking: Partial<Booking>
  ) {
    return apiClient.put<
      ApiResponse<Booking>
    >(API.BOOKINGS.UPDATE(id), booking);
  }

  async deleteBooking(id: string) {
    return apiClient.delete<
      ApiResponse<null>
    >(API.BOOKINGS.DELETE(id));
  }

  async applyQuotation(
    id: string,
    quotation: BookingQuotation
  ) {
    return apiClient.post<
      ApiResponse<Booking>
    >(
      API.BOOKINGS.QUOTATION(id),
      quotation
    );
  }

  async scheduleBooking(
    id: string,
    schedule: BookingSchedule
  ) {
    return apiClient.post<
      ApiResponse<Booking>
    >(
      API.BOOKINGS.SCHEDULE(id),
      schedule
    );
  }

  async updateStatus(
    id: string,
    status: BookingStatus
  ) {
    return apiClient.patch<
      ApiResponse<Booking>
    >(
      API.BOOKINGS.STATUS(id),
      {
        status,
      }
    );
  }

  async generatePaymentLink(
    id: string,
    gateway: string
  ) {
    return apiClient.post<
      ApiResponse<{
        paymentReference: string;
        paymentLink: string;
      }>
    >(
      API.BOOKINGS.PAYMENT(id),
      {
        gateway,
      }
    );
  }
}

const bookingApi = new BookingApi();

export default bookingApi;