import Link from "next/link";
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
    description: "Browse and enquire about medicines.",
    href: "/pharmacy",
    icon: Pill,
    color: "bg-green-50 text-green-700",
  },
  {
    title: "Upload Prescription",
    description: "Upload your doctor's prescription.",
    href: "/upload-prescription",
    icon: FileText,
    color: "bg-blue-50 text-blue-700",
  },
  {
    title: "Book Doctor",
    description: "Consult experienced doctors.",
    href: "/appointments",
    icon: Stethoscope,
    color: "bg-purple-50 text-purple-700",
  },
  {
    title: "Book Lab Test",
    description: "Schedule diagnostic tests.",
    href: "/diagnostics",
    icon: TestTube,
    color: "bg-orange-50 text-orange-700",
  },
  {
    title: "Business & Wholesale",
    description: "Wholesale medicines and supplies.",
    href: "/wholesale",
    icon: Building2,
    color: "bg-indigo-50 text-indigo-700",
  },
  {
    title: "Track Order",
    description: "Check your order status.",
    href: "/track-order",
    icon: PackageSearch,
    color: "bg-gray-100 text-gray-700",
  },
];

export default function QuickActions() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            How Can We Help You Today?
          </h2>

          <p className="mt-3 text-gray-600">
            Choose a service to get started.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-2xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-600 hover:shadow-xl"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${action.color}`}
                >
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-900 group-hover:text-green-700">
                  {action.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}