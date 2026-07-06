import { MapPin, Phone } from "lucide-react";
import { SITE } from "../constants/site";

export default function Branches() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center">
          Visit Our Branches
        </h2>

        <p className="text-center text-gray-600 mt-4 mb-14">
          We're here to serve you at both of our locations.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {SITE.branches.map((branch, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <MapPin
                className="text-green-700 mb-5"
                size={42}
              />

              <h3 className="text-2xl font-bold text-gray-900">
                {branch.name}
              </h3>

              <p className="text-gray-600 mt-2">
                {branch.address}
              </p>

              <a
                href={`tel:+91${SITE.phone}`}
                className="inline-flex items-center gap-2 mt-6 text-green-700 font-semibold hover:text-green-800 transition"
              >
                <Phone size={18} />
                {SITE.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}