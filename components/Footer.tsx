import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { SITE } from "../constants/site";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Company */}

          <div>
            <h2 className="text-2xl font-bold">
              {SITE.companyName}
            </h2>

            <p className="mt-3 text-green-100">
              {SITE.tagline}
            </p>
          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-3">

              <p className="flex items-center gap-2">
                <Phone size={18} />
                {SITE.phone}
              </p>

              <p className="flex items-center gap-2">
                <MapPin size={18} />
                Kushmandi & Shankarpur
              </p>

              <p className="flex items-center gap-2">
                <Clock size={18} />
                Open Everyday
              </p>

            </div>

          </div>

          {/* Email */}

          <div>

            <h3 className="text-xl font-semibold mb-4">
              Email
            </h3>

            <p className="flex items-center gap-2">
              <Mail size={18} />
              info@shifalifeline.in
            </p>

          </div>

        </div>

        <hr className="my-8 border-green-700" />

        <p className="text-center text-green-100">
          © 2026 {SITE.companyName}. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}