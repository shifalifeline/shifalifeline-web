import {
  Pill,
  Stethoscope,
  FlaskConical,
  FileText,
} from "lucide-react";

const services = [
  {
    icon: Pill,
    title: "Pharmacy",
    text: "Order genuine medicines quickly and conveniently.",
  },
  {
    icon: Stethoscope,
    title: "Doctor Consultation",
    text: "Book appointments with experienced doctors.",
  },
  {
    icon: FlaskConical,
    title: "Lab Tests",
    text: "Book diagnostic tests with reliable reporting.",
  },
  {
    icon: FileText,
    title: "Upload Prescription",
    text: "Upload your prescription and we'll take care of the rest.",
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Our Services
        </h2>

        <p className="text-center text-gray-600 mt-4 mb-14">
          Everything you need for your family's healthcare.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition duration-300"
              >
                <Icon
                  className="text-green-700 mb-5"
                  size={42}
                />

                <h3 className="text-xl font-bold mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600">
                  {service.text}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}