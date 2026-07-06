import {
  Pill,
  Stethoscope,
  FlaskConical,
  FileText,
} from "lucide-react";

export const SERVICES = [
  {
    icon: Pill,
    title: "Pharmacy",
    text: "Order genuine medicines quickly and conveniently.",
    href: "/pharmacy",
  },
  {
    icon: Stethoscope,
    title: "Doctor Consultation",
    text: "Book appointments with experienced doctors.",
    href: "/doctors",
  },
  {
    icon: FlaskConical,
    title: "Lab Tests",
    text: "Book diagnostic tests with reliable reporting.",
    href: "/diagnostics",
  },
  {
    icon: FileText,
    title: "Upload Prescription",
    text: "Upload your prescription and we'll take care of the rest.",
    href: "/prescription",
  },
];