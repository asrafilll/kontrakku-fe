"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const getNavLinks = (isHomePage: boolean) => [
  {
    href: isHomePage ? "#fitur" : "/#fitur",
    label: "Fitur",
  },
  {
    href: isHomePage ? "#cara-kerja" : "/#cara-kerja",
    label: "Cara Kerja",
  },
  {
    href: "/tentang-kami",
    label: "Tentang Kami",
  },
];

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const navLinks = getNavLinks(isHomePage);

  return (
    <header className="fixed top-0 w-full bg-white shadow-sm z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold">
            <span className="text-blue-600">Kontrak</span>
            <span className="text-gray-900">ku</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-blue-600"
            >
              Masuk
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Daftar Gratis
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 py-4">
          <nav className="container mx-auto px-4 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md px-3 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-200 mt-3">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-blue-600"
                >
                  Masuk
                </Button>
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full mt-2"
              >
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  Daftar Gratis
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
