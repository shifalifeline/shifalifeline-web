import { STATS } from "../constants/stats";

export default function Stats() {
  return (
    <section className="bg-green-700 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <h2 className="text-4xl font-bold text-white md:text-5xl">
                {stat.value}
              </h2>

              <p className="mt-3 text-lg text-green-100">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}