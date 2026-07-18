import Link from "next/link";
import { Phone, MapPin, Mail, Clock, MessageCircle } from "lucide-react";
import { SITE } from "../constants/site";

export default function Footer() {
  return (
    <footer className="mt-20 bg-green-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <h2 className="text-2xl font-bold">
              {SITE.companyName}
            </h2>

            <p className="mt-4 leading-7 text-green-100">
              {SITE.tagline}
            </p>

            <div className="mt-6">
              <a
                href={`https://wa.me/91${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-green-800 px-4 py-3 transition hover:bg-green-700"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3 text-green-100">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/appointments" className="hover:text-white">
                  Book Appointment
                </Link>
              </li>

              <li>
                <Link href="/diagnostics" className="hover:text-white">
                  Diagnostics
                </Link>
              </li>

              <li>
                <Link href="/pharmacy" className="hover:text-white">
                  Pharmacy
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">
              Contact
            </h3>

            <div className="space-y-4 text-green-100">
              <a
                href={`tel:+91${SITE.phone}`}
                className="flex items-center gap-3 hover:text-white"
              >
                <Phone size={18} />
                +91 {SITE.phone}
              </a>

              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 hover:text-white"
              >
                <Mail size={18} />
                {SITE.email}
              </a>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>{SITE.branches[0].address}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock size={18} />
                Open 7 Days a Week
              </div>
            </div>
          </div>

          {/* Branches */}
          <div>
            <h3 className="mb-5 text-xl font-semibold">
              Our Branches
            </h3>

            <div className="space-y-5">
              {SITE.branches.map((branch) => (
                <div key={branch.name}>
                  <p className="font-semibold">
                    {branch.name}
                  </p>

                  <p className="mt-1 text-sm text-green-100">
                    {branch.address}
                  </p>

                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-green-300 hover:text-white"
                  >
                    View on Google Maps →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="my-10 border-green-800" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-green-100 md:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.companyName}. All Rights Reserved.
          </p>

          <p>Designed & Developed by SHIFA LIFE LINE</p>
        </div>
      </div>
    </footer>
  );
}