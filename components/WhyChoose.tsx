import { ShieldCheck, HeartPulse, BadgeCheck, Clock3 } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Genuine Medicines",
    text: "Quality medicines sourced from trusted distributors."
  },
  {
    icon: HeartPulse,
    title: "Experienced Healthcare",
    text: "Professional consultation and patient-focused care."
  },
  {
    icon: BadgeCheck,
    title: "Trusted Service",
    text: "Reliable pharmacy and diagnostic support for every family."
  },
  {
    icon: Clock3,
    title: "Quick Assistance",
    text: "Fast response for medicines, prescriptions and appointments."
  }
];

export default function WhyChoose() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          Why Choose SHIFA LIFE LINE?
        </h2>

        <p className="text-center text-gray-600 mb-14">
          Trusted healthcare services with compassion, quality and care.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition"
              >
                <Icon
                  className="mx-auto text-green-700 mb-5"
                  size={40}
                />

                <h3 className="font-bold text-xl mb-3">
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