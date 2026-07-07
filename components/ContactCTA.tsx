import Link from "next/link";
import { Phone, MessageCircle, CalendarDays } from "lucide-react";
import { SITE } from "../constants/site";

export default function ContactCTA() {
  return (
    <section className="bg-gradient-to-r from-green-700 to-green-600 py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">

        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Ready to Experience Better Healthcare?
        </h2>

        <p className="mt-6 text-lg text-green-100">
          Connect with SHIFA LIFE LINE today. Book an appointment, call us, or
          chat with us on WhatsApp.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-5 md:flex-row">

          <a
            href={`tel:+91${SITE.phone}`}
            className="flex min-w-[220px] items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-green-700 shadow-md transition hover:-translate-y-1 hover:bg-green-50"
          >
            <Phone size={20} />
            Call Now
          </a>

          <a
            href={`https://wa.me/91${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-[220px] items-center justify-center gap-2 rounded-xl bg-green-900 px-6 py-4 font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-green-950"
          >
            <MessageCircle size={20} />
            WhatsApp
          </a>

          <Link
            href="/appointments"
            className="flex min-w-[220px] items-center justify-center gap-2 rounded-xl border border-white px-6 py-4 font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-white hover:text-green-700"
          >
            <CalendarDays size={20} />
            Book Appointment
          </Link>

        </div>

      </div>
    </section>
  );
}