import {
  ShieldCheck,
  HeartPulse,
  BadgeCheck,
  Clock3,
  Truck,
  Stethoscope,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Genuine Medicines",
    text: "Quality medicines sourced from trusted distributors.",
  },
  {
    icon: Stethoscope,
    title: "Qualified Doctors",
    text: "Consult experienced healthcare professionals you can trust.",
  },
  {
    icon: HeartPulse,
    title: "Advanced Diagnostics",
    text: "Modern diagnostic services with accurate and timely reports.",
  },
  {
    icon: Truck,
    title: "Home Delivery",
    text: "Medicines delivered safely and quickly to your doorstep.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Service",
    text: "Patient-first healthcare with quality and compassion.",
  },
  {
    icon: Clock3,
    title: "24×7 Support",
    text: "Healthcare assistance whenever you need it.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">

          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-green-700">
            Why Choose SHIFA
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Healthcare You Can
            <span className="text-green-700"> Trust</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Trusted healthcare services backed by experienced professionals,
            genuine medicines and compassionate care.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <Icon size={30} />
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="text-gray-600">
                  {item.text}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}