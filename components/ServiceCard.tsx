import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export default function ServiceCard({
  title,
  description,
  href,
  icon: Icon,
}: ServiceCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-700">
        <Icon size={30} />
      </div>

      <h3 className="mb-3 text-xl font-bold text-gray-900">
        {title}
      </h3>

      <p className="mb-6 text-gray-600">
        {description}
      </p>

      <Link
        href={href}
        className="inline-flex items-center gap-2 font-semibold text-green-700 transition group-hover:gap-3"
      >
        Learn More
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}