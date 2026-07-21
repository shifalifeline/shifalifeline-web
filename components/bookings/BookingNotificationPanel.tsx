"use client";

import { useState } from "react";

import bookingService from "@/services/booking.service";
import { Booking } from "@/types/booking";

interface Props {
  booking: Booking;
}

export default function BookingNotificationPanel({
  booking,
}: Props) {
  const [sms, setSms] = useState(
    booking.notifications?.sms ?? true
  );

  const [whatsapp, setWhatsapp] = useState(
    booking.notifications?.whatsapp ?? true
  );

  const [email, setEmail] = useState(
    booking.notifications?.email ?? false
  );

  const [dashboard, setDashboard] = useState(
    booking.notifications?.dashboard ?? true
  );

  const handleSend = () => {
    const result =
      bookingService.sendNotification(
        booking,
        {
          sms,
          whatsapp,
          email,
          dashboard,
        }
      );

    alert(result.message);
  };

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        Patient Notification
      </h2>

      <div className="space-y-4">
        <label className="flex items-center justify-between">
          <span>SMS</span>

          <input
            type="checkbox"
            checked={sms}
            onChange={(e) =>
              setSms(e.target.checked)
            }
          />
        </label>

        <label className="flex items-center justify-between">
          <span>WhatsApp</span>

          <input
            type="checkbox"
            checked={whatsapp}
            onChange={(e) =>
              setWhatsapp(e.target.checked)
            }
          />
        </label>

        <label className="flex items-center justify-between">
          <span>Email</span>

          <input
            type="checkbox"
            checked={email}
            onChange={(e) =>
              setEmail(e.target.checked)
            }
          />
        </label>

        <label className="flex items-center justify-between">
          <span>Dashboard</span>

          <input
            type="checkbox"
            checked={dashboard}
            onChange={(e) =>
              setDashboard(e.target.checked)
            }
          />
        </label>

        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs text-slate-500">
            Last Notification
          </p>

          <p className="font-medium">
            {booking.notifications?.lastSentAt
              ? new Date(
                  booking.notifications.lastSentAt
                ).toLocaleString("en-IN")
              : "No notification sent yet"}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSend}
          className="w-full rounded-lg bg-orange-600 py-2 font-semibold text-white transition hover:bg-orange-700"
        >
          Send Notification
        </button>
      </div>
    </div>
  );
}