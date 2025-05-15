"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "Apa itu Kontrakku?",
    answer:
      "Kontrakku adalah platform analisis kontrak kerja berbasis AI yang membantu pekerja dan freelancer Indonesia memahami isi kontrak mereka dengan lebih baik. Kami menerjemahkan bahasa hukum yang kompleks menjadi penjelasan yang mudah dipahami.",
  },
  {
    question: "Bagaimana cara kerja Kontrakku?",
    answer:
      "Cukup unggah dokumen kontrak kerja Anda dalam format PDF, dan sistem AI kami akan menganalisis setiap klausul, mengidentifikasi potensi risiko, dan memberikan ringkasan yang mudah dipahami. Anda juga bisa mengajukan pertanyaan spesifik tentang kontrak Anda.",
  },
  {
    question: "Apakah data kontrak saya aman?",
    answer:
      "Ya, keamanan data Anda adalah prioritas utama kami. Kami menggunakan enkripsi end-to-end untuk melindungi dokumen Anda, dan semua data disimpan dengan aman di server yang terlindungi. Kami juga tidak akan membagikan informasi Anda kepada pihak ketiga tanpa izin.",
  },
  {
    question: "Berapa biaya menggunakan Kontrakku?",
    answer:
      "Saat ini, Anda bisa mencoba Kontrakku secara gratis untuk menganalisis hingga 3 kontrak. Untuk penggunaan lebih lanjut, kami menawarkan beberapa paket berlangganan yang dapat disesuaikan dengan kebutuhan Anda.",
  },
  {
    question: "Apakah Kontrakku bisa menganalisis semua jenis kontrak?",
    answer:
      "Saat ini, Kontrakku fokus pada analisis kontrak kerja karyawan dan kontrak freelance. Kami terus mengembangkan kemampuan sistem untuk menangani berbagai jenis kontrak lainnya di masa depan.",
  },
  {
    question: "Berapa lama proses analisis kontrak?",
    answer:
      "Proses analisis biasanya memakan waktu 2-5 menit, tergantung pada panjang dan kompleksitas kontrak. Setelah analisis selesai, Anda akan langsung mendapatkan ringkasan dan bisa mulai mengajukan pertanyaan.",
  },
  {
    question: "Bagaimana jika saya membutuhkan bantuan tambahan?",
    answer:
      "Tim dukungan kami siap membantu Anda 24/7. Anda bisa menghubungi kami melalui email support@kontrakku.com atau menggunakan fitur chat dalam aplikasi untuk mendapatkan bantuan.",
  },
  {
    question:
      "Apakah hasil analisis Kontrakku bisa digunakan sebagai nasihat hukum?",
    answer:
      "Kontrakku memberikan analisis dan pemahaman awal tentang kontrak Anda, namun tidak menggantikan nasihat hukum profesional. Untuk keputusan hukum penting, kami sarankan untuk berkonsultasi dengan pengacara atau konsultan hukum.",
  },
];

const FAQItem = ({ question, answer }: FAQItem) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between text-left"
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <span className="ml-6 flex h-7 items-center">
          <ChevronDown
            className={`h-6 w-6 transform text-blue-600 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>
      {isOpen && (
        <div className="mt-3 pr-12">
          <p className="text-base text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
};

export const FAQSection = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Pertanyaan yang Sering Diajukan
      </h2>
      <p className="mt-4 text-center text-base text-gray-600 mb-10">
        Temukan jawaban untuk pertanyaan umum tentang Kontrakku
      </p>
      <div className="mt-8">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </div>
  );
};
