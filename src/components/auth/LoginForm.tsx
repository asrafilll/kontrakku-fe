"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Static auth check
    if (email === "admin@mail.com" && password === "123") {
      // Simulate loading
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Set login state (you can use localStorage, cookies, or context)
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setError(
        "Email atau password salah. Gunakan admin@mail.com dengan password 123"
      );
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center">
            <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
            <span className="text-sm text-red-800">{error}</span>
          </div>
        </div>
      )}

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
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
          placeholder="admin@mail.com"
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
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors pr-10"
            placeholder="123"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 focus:ring-offset-0"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-700"
          >
            Ingat saya
          </label>
        </div>

        <div className="text-sm">
          <Link
            href="/forgot-password"
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Lupa password?
          </Link>
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Masuk..." : "Masuk"}
        </Button>
      </div>

      <div className="text-center text-sm text-gray-600">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
        >
          Daftar di sini
        </Link>
      </div>

      {/* Demo credentials info */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800 text-center">
          <strong>Demo Account:</strong>
          <br />
          Email: admin@mail.com
          <br />
          Password: 123
        </p>
      </div>
    </form>
  );
};
