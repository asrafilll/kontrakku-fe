import { Section, StepItem } from "./common";

export const HowItWorks = () => {
  return (
    <Section id="cara-kerja" className="bg-white">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Bagaimana Kontrakku Bekerja?
        </h2>
        <p className="text-md md:text-lg text-gray-700 mt-3 max-w-xl mx-auto">
          Proses sederhana untuk pemahaman kontrak yang mendalam.
        </p>
      </div>
      <div className="max-w-3xl mx-auto space-y-10 md:space-y-12">
        <StepItem
          stepNumber="01"
          title="Unggah Kontrak Anda"
          description="Cukup unggah dokumen kontrak kerja atau freelance Anda dalam format PDF. Data Anda aman bersama kami."
        />
        <StepItem
          stepNumber="02"
          title="Analisis oleh AI Cerdas"
          description="Sistem AI kami akan memproses dan menganalisis setiap klausul dalam kontrak Anda secara detail."
        />
        <StepItem
          stepNumber="03"
          title="Dapatkan Ringkasan & Poin Kunci"
          description="Terima laporan yang mudah dipahami, berisi ringkasan, identifikasi risiko, dan penjelasan."
        />
        <StepItem
          stepNumber="04"
          title="Ajukan Pertanyaan Lebih Lanjut"
          description="Masih ada yang kurang jelas? Gunakan fitur chat untuk bertanya langsung mengenai isi kontrak Anda."
        />
      </div>
    </Section>
  );
};
