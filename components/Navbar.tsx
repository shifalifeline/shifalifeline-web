"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  Phone,
 MessageCircle,
  LogIn,
  Siren,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { SITE } from "../constants/site";
import { NAV_ITEMS } from "../constants/navigation";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">

        {/* Logo */}

        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-3"
        >
          <Image
            src="/logo.png"
            alt={SITE.companyName}
            width={60}
            height={60}
            priority
            className="md:h-20 md:w-20"
          />

          <div>
            <h1 className="text-lg font-bold text-green-700 md:text-2xl">
              {SITE.companyName}
            </h1>

            <p className="hidden text-sm text-gray-500 sm:block">
              Medicines • Doctors • Diagnostics
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden lg:flex items-center gap-2">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-2 font-medium transition-all duration-200 ${
                  active
                    ? "bg-green-100 text-green-700"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}

        <div className="hidden lg:flex items-center gap-3">

          <Link
            href="/login"
            className="flex items-center gap-2 rounded-xl border border-green-700 px-4 py-3 font-medium text-green-700 transition hover:bg-green-50"
          >
            <LogIn size={18} />
            Login
          </Link>

          <Link
            href="/emergency"
            className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-700"
          >
            <Siren size={18} />
            Emergency
          </Link>

          <a
            href={`https://wa.me/91${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-green-100 px-4 py-3 text-green-700 transition hover:bg-green-200"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>

          <a
            href={`tel:+91${SITE.phone}`}
            className="flex items-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-white transition hover:bg-green-800"
          >
            <Phone size={18} />
            Call
          </a>

        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open Menu"
          className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
        >
          <Menu size={28} />
        </button>

      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </nav>
  );
}