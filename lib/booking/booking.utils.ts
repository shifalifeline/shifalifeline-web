import { Booking } from "./booking.types";

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

export function saveBooking(booking: Booking) {
  localStorage.setItem(
    booking.reference,
    JSON.stringify(booking)
  );
}

export function getBooking(reference: string) {
  const item = localStorage.getItem(reference);

  return item ? JSON.parse(item) : null;
}