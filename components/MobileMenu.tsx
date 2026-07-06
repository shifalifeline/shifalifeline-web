"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  X,
  Phone,
  MessageCircle,
  LogIn,
  Siren,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "../constants/navigation";
import { SITE } from "../constants/site";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
}: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="border-t border-gray-200 bg-white shadow-lg">
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-lg font-semibold text-green-700">
            Navigation
          </h2>

          <button
            onClick={onClose}
            aria-label="Close Menu"
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-1 px-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`rounded-lg px-4 py-4 transition ${
                pathname === item.href
                  ? "bg-green-50 font-semibold text-green-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-green-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-4 space-y-3 border-t border-gray-100 p-6">
          <Link
            href="/login"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-green-700 px-4 py-3 font-medium text-green-700 transition hover:bg-green-50"
          >
            <LogIn size={18} />
            Login
          </Link>

          <Link
            href="/emergency"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-700"
          >
            <Siren size={18} />
            Emergency
          </Link>

          <a
            href={`https://wa.me/91${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-100 px-4 py-3 text-green-700 transition hover:bg-green-200"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>

          <a
            href={`tel:+91${SITE.phone}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-white transition hover:bg-green-800"
          >
            <Phone size={18} />
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}