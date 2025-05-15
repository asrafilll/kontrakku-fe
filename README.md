# Kontrakku Frontend

Kontrakku adalah alat yang dirancang untuk menganalisis kontrak kerja dan kontrak freelance, membuat bahasa hukum yang kompleks menjadi lebih mudah dipahami bagi pekerja di Indonesia. Aplikasi ini membantu pengguna memahami poin-poin kunci, mengidentifikasi potensi risiko, dan mengajukan pertanyaan yang relevan tentang kontrak mereka.

## Fitur Utama

- **Penjelasan Kontrak**

  - Menerjemahkan bahasa hukum yang kompleks menjadi bahasa yang mudah dipahami
  - Memberikan ringkasan poin-poin utama kontrak

- **Penilaian Risiko**

  - Mengidentifikasi klausul yang berpotensi berisiko
  - Menjelaskan mengapa klausul tertentu bisa mengkhawatirkan
  - Memberikan skor keamanan untuk evaluasi kontrak

- **Tanya Jawab Interaktif**

  - Antarmuka chat untuk mengajukan pertanyaan spesifik tentang kontrak
  - Jawaban berbasis AI berdasarkan konteks kontrak
  - Saran pertanyaan disesuaikan dengan jenis kontrak dan industri

- **Analisis Keamanan**
  - Evaluasi keamanan kontrak yang komprehensif
  - Sistem penilaian terperinci dengan penjelasan
  - Rekomendasi untuk perbaikan

## Tech Stack

- **Framework:** Next.js 15.3
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Package Manager:** Bun
- **State Management:** React Context
- **UI Components:** Custom components with TailwindCSS

## Panduan Memulai

### Prasyarat

- Node.js 18.0 atau lebih tinggi
- Bun (versi terbaru)

### Instalasi

1. Clone repository:

   ```bash
   git clone https://github.com/asrafilll/kontrakku-fe.git
   ```

2. Masuk ke direktori proyek:

   ```bash
   cd kontrakku-fe
   ```

3. Install dependencies:

   ```bash
   bun install
   ```

4. Buat file `.env.local` di root direktori dan tambahkan environment variables yang diperlukan:

   ```env
   NEXT_PUBLIC_API_URL=your_backend_url
   ```

5. Jalankan development server:

   ```bash
   bun dev
   ```

6. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Struktur Proyek

```
src/
├── app/           # Next.js app router pages
├── components/    # Komponen UI yang dapat digunakan kembali
├── lib/          # Fungsi utilitas dan helpers
├── types/        # Definisi tipe TypeScript
├── contexts/     # React Context providers
└── services/     # Fungsi layanan API
```

## Pengembangan

- **Code Style:** Proyek menggunakan ESLint dan Prettier untuk formatting kode
- **Commits:** Ikuti conventional commit messages
- **Branch Strategy:** Feature branches harus dibuat dari `main`

## Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/fitur-baru`)
3. Commit perubahan (`git commit -m 'feat: menambahkan fitur baru'`)
4. Push ke branch (`git push origin feature/fitur-baru`)
5. Buat Pull Request

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file LICENSE untuk detail.

## Proyek Terkait

- [Kontrakku Backend](https://github.com/asrafilll/kontrakku-be) - Repository backend Django

## Catatan Penting

- Aplikasi ini dirancang khusus untuk pengguna Indonesia
- Semua konten dan antarmuka pengguna dalam Bahasa Indonesia
- Analisis kontrak disesuaikan dengan hukum ketenagakerjaan Indonesia
