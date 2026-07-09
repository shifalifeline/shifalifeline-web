import {
  Activity,
  CalendarDays,
  ClipboardList,
  FileText,
  FlaskConical,
  LayoutDashboard,
  Package,
  Pill,
  ShoppingCart,
  Stethoscope,
  Truck,
  Users,
  UserRound,
  Boxes,
  Building2,
  Globe,
  Settings,
  BarChart3,
  ShieldCheck,
  ClipboardPlus,
  MonitorSmartphone,
  Newspaper,
  Image,
  MessageSquare,
  UserPlus,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export const navigation: NavigationSection[] = [
  {
    title: "",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "Clinical",
    items: [
      {
        label: "Patients",
       href: "/dashboard/patients",
        icon: Users,
      },
      {
        label: "Doctors",
        href: "/dashboard/doctors",
        icon: Stethoscope,
      },
      {
        label: "Appointments",
        href: "/dashboard/appointments",
        icon: CalendarDays,
      },
      {
        label: "Telemedicine",
        href: "/dashboard/telemedicine",
        icon: MonitorSmartphone,
      },
      {
        label: "EMR",
        href: "/dashboard/emr",
        icon: ClipboardList,
      },
      {
        label: "Prescriptions",
        href: "/dashboard/prescriptions",
        icon: Pill,
      },
    ],
  },

  {
    title: "Diagnostics",
    items: [
      {
        label: "Laboratory",
        href: "/laboratory",
        icon: FlaskConical,
      },
      {
        label: "Test Catalogue",
        href: "/tests",
        icon: ClipboardPlus,
      },
      {
        label: "Diagnostic Bookings",
        href: "/diagnostics",
        icon: Activity,
      },
    ],
  },

  {
    title: "Pharmacy",
    items: [
      {
        label: "Products",
        href: "/products",
        icon: Package,
      },
      {
        label: "Categories",
        href: "/categories",
        icon: Boxes,
      },
      {
        label: "Inventory",
        href: "/inventory",
        icon: Package,
      },
      {
        label: "Suppliers",
        href: "/suppliers",
        icon: Truck,
      },
      {
        label: "Purchase Orders",
        href: "/purchase-orders",
        icon: FileText,
      },
    ],
  },

  {
    title: "Commerce",
    items: [
      {
        label: "Online Orders",
        href: "/orders",
        icon: ShoppingCart,
      },
      {
        label: "Bulk Orders",
        href: "/bulk-orders",
        icon: Building2,
      },
      {
        label: "Customers",
        href: "/customers",
        icon: UserRound,
      },
      {
        label: "Business Accounts",
        href: "/business-accounts",
        icon: ShieldCheck,
      },
      {
        label: "Shipping",
        href: "/shipping",
        icon: Truck,
      },
    ],
  },

  {
    title: "Website",
    items: [
      {
        label: "Doctor Profiles",
        href: "/website/doctors",
        icon: Stethoscope,
      },
      {
        label: "Website Content",
        href: "/website/content",
        icon: Globe,
      },
      {
        label: "Health Blogs",
        href: "/website/blogs",
        icon: Newspaper,
      },
      {
        label: "Banners",
        href: "/website/banners",
        icon: Image,
      },
      {
        label: "Enquiries",
        href: "/website/enquiries",
        icon: MessageSquare,
      },
      {
        label: "Specialist Requests",
        href: "/website/specialists",
        icon: UserPlus,
      },
    ],
  },

  {
    title: "Administration",
    items: [
      {
        label: "Reports",
        href: "/reports",
        icon: BarChart3,
      },
      {
        label: "Users & Roles",
        href: "/users",
        icon: Users,
      },
      {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];