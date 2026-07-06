import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SERVICES } from "../constants/services";

export default function Services() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">

          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-green-700">
            Healthcare Services
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Everything You Need,
            <span className="text-green-700"> All in One Place</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            SHIFA brings together pharmacy, doctors, diagnostics and digital
            healthcare services into one trusted platform.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {SERVICES.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <Icon size={30} />
                </div>

                <h3 className="mb-3 text-xl font-bold">
                  {service.title}
                </h3>

                <p className="mb-6 text-gray-600">
                  {service.text}
                </p>

                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 font-semibold text-green-700 transition-all group-hover:gap-3"
                >
                  Learn More
                  <ArrowRight size={18} />
                </Link>
              </div>
            );
          })}

        </div>

        <div className="mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-8 py-4 text-lg font-semibold text-white transition hover:bg-green-800"
          >
            Explore All Services
            <ArrowRight size={20} />
          </Link>
        </div>

      </div>
    </section>
  );
}