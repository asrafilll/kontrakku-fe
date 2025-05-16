import {
  ArrowRight,
  CheckCircle,
  FileText,
  MessageSquare,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Section, FeatureCard } from "./common";

export const Features = () => {
  return (
    <Section id="fitur" className="bg-gray-50">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Kenapa Memilih Kontrakku?
        </h2>
        <p className="text-md md:text-lg text-gray-700 mt-3 max-w-2xl mx-auto">
          Fitur unggulan yang dirancang untuk memberdayakan Anda dalam memahami
          setiap detail kontrak.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={Zap}
          title="Analisis Cepat & Akurat"
          description="Unggah kontrak Anda (PDF) dan dapatkan poin-poin penting serta potensi risiko dalam hitungan menit."
        />
        <FeatureCard
          icon={FileText}
          title="Penjelasan Sederhana"
          description="Kami menerjemahkan jargon hukum yang kompleks menjadi bahasa yang mudah Anda pahami."
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Identifikasi Risiko Tinggi"
          description="Menyoroti klausul yang berpotensi merugikan dan menjelaskan mengapa itu penting untuk diperhatikan."
        />
        <FeatureCard
          icon={MessageSquare}
          title="Tanya Jawab Interaktif"
          description="Ajukan pertanyaan spesifik tentang isi kontrak Anda dan dapatkan jawaban langsung dari AI kami."
        />
        <FeatureCard
          icon={CheckCircle}
          title="Cek Keamanan Kontrak"
          description="Evaluasi keseluruhan keamanan kontrak Anda dengan skor dan penjelasan yang mudah dimengerti."
        />
        <FeatureCard
          icon={ArrowRight}
          title="Saran Pertanyaan ke HR"
          description="Dapatkan daftar pertanyaan relevan yang bisa Anda ajukan ke HR berdasarkan analisis kontrak."
        />
      </div>
    </Section>
  );
};
