import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Masuk | Kontrakku",
  description:
    "Masuk ke akun Kontrakku Anda untuk menganalisis dan memahami kontrak kerja dengan mudah.",
};

export default function LoginPage() {
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
          Masuk ke Akun Anda
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Lanjutkan menganalisis kontrak kerja Anda dengan mudah
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
