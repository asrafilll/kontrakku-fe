import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Daftar | Kontrakku",
  description:
    "Daftar akun Kontrakku untuk mulai menganalisis kontrak kerja Anda dengan mudah.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center mb-6">
          <span className="text-3xl font-bold">
            <span className="text-blue-600">Kontrak</span>
            <span className="text-gray-900">ku</span>
          </span>
        </Link>
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Daftar Akun Baru
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Mulai analisis kontrak kerja Anda dengan mudah dan aman
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
