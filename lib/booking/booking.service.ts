import { Booking } from "./booking.types";
import { saveBooking } from "./booking.utils";

export class BookingService {
  static create(booking: Booking) {
    saveBooking(booking);

    return booking;
  }

  static updatePayment(
    booking: Booking,
    status: Booking["paymentStatus"]
  ) {
    booking.paymentStatus = status;

    saveBooking(booking);

    return booking;
  }
}