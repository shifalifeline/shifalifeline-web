import { Star } from "lucide-react";
import { TESTIMONIALS } from "../constants/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-green-700">
            Patient Reviews
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">
            What Our
            <span className="text-green-700"> Patients Say</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Thousands of patients trust SHIFA LIFE LINE for quality healthcare.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex min-h-[300px] flex-col rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-5 flex">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={20}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mb-6 flex-1 text-gray-600 italic">
                "{testimonial.review}"
              </p>

              <h3 className="mt-auto text-lg font-bold text-gray-900">
                {testimonial.name}
              </h3>

              <p className="text-sm text-gray-500">
                {testimonial.location}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}