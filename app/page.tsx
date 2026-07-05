export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold text-green-700">
        SHIFA LIFE LINE
      </h1>

      <p className="mt-4 text-xl text-gray-600">
        Health • Care • Trust
      </p>

      <div className="mt-10 grid gap-4 w-full max-w-md">
        <button className="rounded-xl bg-green-600 text-white p-4 text-lg font-semibold hover:bg-green-700">
          💊 Pharmacy
        </button>

        <button className="rounded-xl bg-blue-600 text-white p-4 text-lg font-semibold hover:bg-blue-700">
          👨‍⚕️ Doctor Consultation
        </button>

        <button className="rounded-xl bg-purple-600 text-white p-4 text-lg font-semibold hover:bg-purple-700">
          🧪 Book Lab Test
        </button>

        <button className="rounded-xl bg-orange-500 text-white p-4 text-lg font-semibold hover:bg-orange-600">
          📄 Upload Prescription
        </button>
      </div>

      <p className="mt-10 text-gray-500">
        Kushmandi • Shankarpur, Raiganj
      </p>
    </main>
  );
}