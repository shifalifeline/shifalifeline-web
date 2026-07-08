import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationSection } from "@/config/navigation";

interface SidebarSectionProps {
  section: NavigationSection;
}

export default function SidebarSection({
  section,
}: SidebarSectionProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      {section.title && (
        <h3 className="px-3 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
          {section.title}
        </h3>
      )}

      <div className="space-y-1">
        {section.items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition ${
                active
                  ? "bg-cyan-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}