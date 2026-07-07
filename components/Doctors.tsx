import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

import { DOCTORS } from "../constants/doctors";

export default function Doctors() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">

          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-green-700">
            Meet Our Specialists
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Our Expert
            <span className="text-green-700"> Doctors</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            Consult experienced specialists across multiple disciplines and
            receive compassionate, evidence-based healthcare.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {DOCTORS.map((doctor) => (

            <div
              key={doctor.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="flex justify-center bg-gray-50 p-6">

                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={220}
                  height={220}
                  className="h-52 w-52 rounded-2xl border object-cover shadow-md"
                />

              </div>

              <div className="flex min-h-[250px] flex-col p-6">

                <h3 className="text-xl font-bold text-gray-900">
                  {doctor.name}
                </h3>

                <span className="mt-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {doctor.qualification}
                </span>

                <p className="mt-4 flex-1 text-gray-600">
                  {doctor.speciality}
                </p>

                <Link
                  href="/appointments"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
                >
                  <CalendarDays size={18} />
                  Book Appointment
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}