# Kontrakku - Aplikasi Analisis Kontrak Kerja

## Fitur Utama

1. **Autentikasi Sederhana**: Login dengan email `admin@mail.com` dan password `123`
2. **Upload & Analisis Kontrak**: Upload file PDF kontrak untuk dianalisis AI
3. **Analisis Komprehensif**:
   - Ringkasan kontrak
   - Identifikasi red flags dan klausul bermasalah
   - Analisis topik yang tercakup/belum tercakup
   - Detail setiap klausul dengan rekomendasi
4. **Chat Assistant**: Tanya jawab interaktif dengan AI tentang kontrak
5. **Re-check Analisis**: Tombol di chat room untuk melihat ulang analisis dalam modal

## Teknologi

- Next.js 14 dengan App Router
- TypeScript
- Tailwind CSS
- Lucide React Icons
- WebSocket untuk real-time chat

## Cara Menjalankan

```bash
npm install
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## Flow Aplikasi

1. **Login**: Masuk dengan kredensial admin
2. **Dashboard**: Upload kontrak baru atau pilih kontrak existing
3. **Analisis**: Tunggu proses analisis selesai dan lihat hasilnya
4. **Chat**: Lanjut ke chat assistant untuk tanya jawab detail
5. **Re-check**: Gunakan tombol "Lihat Analisis" di chat room untuk melihat analisis lagi

## API Endpoints

- `POST /api/v1/contracts/upload` - Upload kontrak baru
- `GET /api/v1/contracts/status/{id}` - Cek status dan hasil analisis
- `GET /api/v1/contracts` - List semua kontrak
- WebSocket `/ws/chat/{contract_id}` - Real-time chat

## Demo

Username: `admin@mail.com`  
Password: `123`
