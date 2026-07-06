import { ArrowRight, FileText } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-white via-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}

          <div>

            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium mb-6">
              Trusted Healthcare Since Day One
            </span>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
              Trusted Healthcare
              <br />
              for Every Family
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              Medicines, Doctors, Diagnostics and Wholesale Healthcare
              Solutions — all under one trusted name.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <button className="bg-green-700 text-white px-7 py-4 rounded-xl font-semibold hover:bg-green-800 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Order Medicines
                <ArrowRight size={18} />
              </button>

              <button className="border-2 border-green-700 text-green-700 px-7 py-4 rounded-xl font-semibold hover:bg-green-50 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Upload Prescription
                <FileText size={18} />
              </button>

            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 text-sm">

              <div className="flex items-center gap-2">
                ✅ Genuine Medicines
              </div>

              <div className="flex items-center gap-2">
                ✅ Home Delivery
              </div>

              <div className="flex items-center gap-2">
                ✅ Home Sample Collection
              </div>

              <div className="flex items-center gap-2">
                ✅ PAN India Shipping
              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="flex justify-center">

            <div className="w-full max-w-md aspect-square rounded-3xl bg-white shadow-2xl border flex items-center justify-center">

              <div className="text-center p-10">

                <div className="text-7xl mb-6">
                  🏥
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  Healthcare Illustration
                </h3>

                <p className="text-gray-500">
                  We'll replace this with our custom SHIFA LIFE LINE
                  illustration in the next sprint.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}