"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Eye, EyeOff, Info } from "lucide-react";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Registration disabled - do nothing
    return;
  };

  return (
    <div className="space-y-6">
      {/* Info Box - Registration Not Available */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-blue-800 mb-1">
              Pendaftaran Belum Tersedia
            </h3>
            <p className="text-sm text-blue-700">
              Saat ini fitur pendaftaran akun baru belum tersedia. Silakan
              gunakan akun demo untuk mencoba aplikasi.
            </p>
            <div className="mt-2 text-xs text-blue-600 bg-blue-100 rounded px-2 py-1 inline-block">
              <strong>Demo:</strong> admin@mail.com / 123
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nama Lengkap
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-gray-50 text-gray-500 cursor-not-allowed"
            placeholder="Masukkan nama lengkap Anda"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-gray-50 text-gray-500 cursor-not-allowed"
            placeholder="nama@perusahaan.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              disabled
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-gray-50 text-gray-500 cursor-not-allowed"
              placeholder="Minimal 8 karakter"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-not-allowed"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full bg-gray-400 cursor-not-allowed"
            disabled={true}
          >
            Pendaftaran Belum Tersedia
          </Button>
          <p className="mt-2 text-xs text-center text-gray-500">
            Gunakan akun demo untuk mencoba aplikasi
          </p>
        </div>

        <div className="text-center text-sm text-gray-600">
          Ingin mencoba aplikasi?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Gunakan Akun Demo
          </Link>
        </div>
      </form>
    </div>
  );
};
