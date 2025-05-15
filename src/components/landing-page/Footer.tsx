import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white/70 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Logo & Slogan */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold">
                <span className="text-blue-400">Kontrak</span>
                <span className="text-white">ku</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Memberdayakan pekerja dan freelancer Indonesia untuk memahami
              kontrak mereka dengan lebih baik.
            </p>
          </div>

          {/* Column 2: Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4">
              Produk
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#fitur"
                  className="hover:text-blue-400 transition-colors"
                >
                  Fitur Utama
                </Link>
              </li>
              <li>
                <Link
                  href="#cara-kerja"
                  className="hover:text-blue-400 transition-colors"
                >
                  Cara Kerja
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-blue-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4">
              Perusahaan
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/tentang-kami"
                  className="hover:text-blue-400 transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/kontak"
                  className="hover:text-blue-400 transition-colors"
                >
                  Kontak
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-blue-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/kebijakan-privasi"
                  className="hover:text-blue-400 transition-colors"
                >
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link
                  href="/syarat-ketentuan"
                  className="hover:text-blue-400 transition-colors"
                >
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Kontrakku. Semua Hak Cipta
            Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};
