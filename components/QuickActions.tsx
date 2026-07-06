import {
  Pill,
  FileText,
  Stethoscope,
  TestTube,
  Building2,
  PackageSearch,
} from "lucide-react";

const actions = [
  {
    title: "Order Medicines",
    icon: Pill,
    color: "bg-green-50 text-green-700",
  },
  {
    title: "Upload Prescription",
    icon: FileText,
    color: "bg-blue-50 text-blue-700",
  },
  {
    title: "Book Doctor",
    icon: Stethoscope,
    color: "bg-purple-50 text-purple-700",
  },
  {
    title: "Book Lab Test",
    icon: TestTube,
    color: "bg-orange-50 text-orange-700",
  },
  {
    title: "Business & Wholesale",
    icon: Building2,
    color: "bg-indigo-50 text-indigo-700",
  },
  {
    title: "Track Order",
    icon: PackageSearch,
    color: "bg-gray-100 text-gray-700",
  },
];

export default function QuickActions() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">
            How Can We Help You Today?
          </h2>

          <p className="text-gray-600 mt-3">
            Choose a service to get started.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.title}
                className="rounded-2xl border bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-8 text-left"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${action.color}`}
                >
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {action.title}
                </h3>

                <p className="mt-2 text-gray-500 text-sm">
                  Tap to continue
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}