import { MapPin, Phone, Navigation } from "lucide-react";
import { SITE } from "../constants/site";

export default function Branches() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-green-700">
            Our Locations
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Visit Our
            <span className="text-green-700"> Branches</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Visit your nearest SHIFA LIFE LINE branch for medicines,
            consultations and diagnostic services.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {SITE.branches.map((branch, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <MapPin size={30} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900">
                {branch.name}
              </h3>

              <p className="mt-3 text-gray-600">
                {branch.address}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={`tel:+91${SITE.phone}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
                >
                  <Phone size={18} />
                  Call
                </a>

                {branch.mapUrl && (
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-green-700 px-5 py-3 font-semibold text-green-700 transition hover:bg-green-50"
                  >
                    <Navigation size={18} />
                    Get Directions
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}