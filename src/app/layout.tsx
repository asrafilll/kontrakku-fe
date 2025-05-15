import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#2563EB",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kontrakku.id"),
  title: {
    default: "Kontrakku - Pahami Kontrak Kerja dengan Mudah",
    template: "%s | Kontrakku",
  },
  description:
    "Kontrakku membantu pekerja Indonesia memahami kontrak kerja dengan bahasa yang sederhana, mengidentifikasi risiko, dan memberikan saran yang tepat.",
  keywords: [
    "analisis kontrak",
    "kontrak kerja",
    "hukum ketenagakerjaan",
    "AI kontrak",
    "review kontrak",
    "kontrak freelance",
    "hukum indonesia",
    "legal tech indonesia",
  ],
  authors: [{ name: "Kontrakku Team" }],
  creator: "Kontrakku",
  publisher: "Kontrakku",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://kontrakku.id",
    title: "Kontrakku - Pahami Kontrak Kerja dengan Mudah",
    description:
      "Kontrakku membantu pekerja Indonesia memahami kontrak kerja dengan bahasa yang sederhana, mengidentifikasi risiko, dan memberikan saran yang tepat.",
    siteName: "Kontrakku",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kontrakku - Pahami Kontrak Kerja dengan Mudah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontrakku - Pahami Kontrak Kerja dengan Mudah",
    description:
      "Kontrakku membantu pekerja Indonesia memahami kontrak kerja dengan bahasa yang sederhana, mengidentifikasi risiko, dan memberikan saran yang tepat.",
    images: ["/twitter-image.png"],
    creator: "@kontrakku",
    site: "@kontrakku",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    other: {
      "facebook-domain-verification": "your-facebook-verification-code",
    },
  },
  alternates: {
    canonical: "https://kontrakku.id",
    languages: {
      "id-ID": "https://kontrakku.id",
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.className}>
      <body>
        <main className="min-h-screen bg-background">{children}</main>
      </body>
    </html>
  );
}
