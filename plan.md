# Plan: Mini LMS — Panduan Cipta & Import Kursus dalam iFlick (TVETMARA)

## Objektif
Membina sebuah **Self Instructional Material (SIM)** dalam format Mini LMS berbentuk laman web interaktif yang membimbing pengguna untuk:
1. Mencipta kursus baru dalam iFlick (Moodle TVETMARA)
2. Mengimport kandungan dari kursus lama ke kursus baru

---

## Analisis Screenshot (Bahan Rujukan)

| Imej | Skrin | Penerangan |
|------|-------|------------|
| 1.jpeg | Dashboard | Quick links dibuka, anak panah ke "My courses" |
| 2.jpeg | My Courses | Senarai kursus, butang "New course" ditunjuk |
| 3.jpeg | Dalam Kursus | Butang "Course management" ditunjuk |
| 4.jpeg | Modal Course Management | Senarai menu — anak panah ke "Import" |
| 5.jpeg | Import Wizard: Langkah 1 | Pilih kursus sumber (Course selection) |
| 6.jpeg | Import Wizard: Langkah 2 | Import settings (checkbox pilihan kandungan) |
| 7.jpeg | Import Wizard: Langkah 3 | Schema settings — pilih aktiviti spesifik |
| 8.jpeg | Import Wizard: Langkah 5 | Perform import — progress bar 30% |
| 9.jpeg | Import Wizard: Langkah 6 | Complete — "Import complete. Click continue." |

---

## Struktur SIM (Self Instructional Material)

### Format Penyampaian
- **Medium:** Laman web HTML interaktif (offline-capable)
- **Reka Bentuk:** Satu halaman dengan navigasi tab/panel (bukan multi-page)
- **Gaya:** SIM standard — Objektif → Kandungan → Aktiviti → Rumusan → Penilaian Kendiri

### Komponen SIM Standard yang Akan Dimasukkan
1. **Kulit Muka (Cover)** — Tajuk, nama kursus, logo
2. **Panduan Cara Guna** — Arahan navigasi SIM
3. **Hasil Pembelajaran (Learning Outcomes)** — Apa yang pengguna boleh buat selepas habis
4. **Unit 1: Cipta Kursus Baru** — Langkah dengan screenshot beranotasi
5. **Unit 2: Import Kursus Lama** — Langkah dengan screenshot beranotasi
6. **Aktiviti Refleksi** — Soalan semak faham setiap unit
7. **Rumusan** — Ringkasan langkah-langkah
8. **Penilaian Kendiri (Self-Assessment Quiz)** — 5–8 soalan MCQ interaktif

---

## Struktur Fail

```
reuse_iflick/
├── plan.md                  ← Dokumen ini
├── index.html               ← Halaman utama SIM Mini LMS
├── css/
│   └── style.css            ← Gaya reka bentuk SIM
├── js/
│   └── app.js               ← Logik navigasi, quiz, progress tracker
└── imej/
    ├── 1.jpeg → 9.jpeg      ← Screenshot yang sedia ada
```

---

## Kandungan Terperinci Setiap Bahagian

### COVER
- Tajuk: **"Panduan Pengurusan Kursus dalam iFlick"**
- Sub: Cipta Kursus Baru & Import Kandungan Kursus Lama
- Platform: iLearn TVETMARA (Moodle)
- Logo TVETMARA (jika ada)
- Butang "Mula Pembelajaran"

---

### PANDUAN CARA GUNA
- Ikon navigasi Sebelum / Seterusnya
- Cara semak kemajuan
- Nota: Ikut langkah secara berturutan

---

### HASIL PEMBELAJARAN
Selepas menamatkan modul ini, anda akan dapat:
1. Menavigasi dashboard iFlick untuk mengakses senarai kursus
2. Mencipta kursus baru menggunakan fungsi "New course"
3. Membuka Course Management dalam kursus
4. Melaksanakan proses import kandungan dari kursus lama dalam 6 langkah

---

### BAHAGIAN INDUKSI — Pengenalan Import Kursus

> Bahagian ini muncul **sebelum Unit 1**. Tujuannya ialah untuk memberi gambaran awal kepada pengguna tentang konsep import kursus dan menguji pengetahuan sedia ada mereka (pra-penilaian / diagnostic quiz).

#### Induksi 1 — Apakah Import Kursus?

**Kandungan teks:**
> Import kursus dalam iFlick (Moodle) adalah satu proses menyalin kandungan pengajaran — seperti topik, aktiviti, fail, dan soalan — dari **kursus lama** ke dalam **kursus baru** yang anda sediakan.
>
> Ini berbeza daripada fungsi **Restore** yang menyalin keseluruhan kursus termasuk data pelajar. Import hanya membawa **kandungan pengajaran sahaja** — selamat dan bersih.

**Kotak Info:**
```
💡 Bila perlu Import?
   ✔ Semester baru — ingin guna semula bahan lama
   ✔ Kursus sama diajar kepada kelas berbeza
   ✔ Berkongsi bahan dengan pensyarah lain
   ✔ Mahu mulakan kursus baru dengan template yang sedia ada
```

#### Induksi 2 — Perbezaan Import vs Restore vs Backup

| Fungsi | Kandungan | Data Pelajar | Kegunaan |
|--------|-----------|--------------|----------|
| **Import** | ✅ Ya | ❌ Tidak | Salin bahan ke kursus lain |
| **Backup** | ✅ Ya | ✅ Pilihan | Simpan salinan penuh |
| **Restore** | ✅ Ya | ✅ Ya | Pulihkan kursus lengkap |

**Kotak Amaran:**
```
⚠️ Perhatian!
   Import TIDAK akan memadam kandungan yang sedia ada dalam kursus destinasi.
   Kandungan baru akan DITAMBAH ke atas kandungan yang ada.
```

#### Induksi 3 — Gambaran Keseluruhan Proses

Diagram aliran proses (teks):
```
  KURSUS LAMA          KURSUS BARU (destinasi)
  ┌──────────┐         ┌──────────────────────┐
  │ Topik 1  │──────►  │ Topik 1 (disalin)    │
  │ Topik 2  │──────►  │ Topik 2 (disalin)    │
  │ Quiz     │──────►  │ Quiz (disalin)        │
  │ Fail PDF │──────►  │ Fail PDF (disalin)    │
  │ Pelajar  │  ✗      │ (pelajar tidak ikut)  │
  └──────────┘         └──────────────────────┘
       Sumber                  Destinasi
```

Proses ini mengambil masa **lebih kurang 1–2 minit** bergantung kepada saiz kursus.

---

#### QUIZ INDUKSI — Pra-Penilaian (5 Soalan)

> Tujuan: Menguji pengetahuan sedia ada sebelum belajar. Tiada markah lulus/gagal — ini hanya untuk gambaran awal.
> Butang: **"Semak Jawapan Saya"** → papar skor + penerangan setiap soalan

---

**Soalan 1:**
> Apakah fungsi utama ciri "Import" dalam iFlick?

- A) Memuat naik fail dari komputer ke kursus
- B) Menyalin kandungan dari kursus lain ke kursus semasa ✅
- C) Mengimport data pelajar dari sistem lain
- D) Memindahkan kursus ke kategori lain

*Penerangan:* Import membolehkan anda menyalin bahan pengajaran dari satu kursus ke kursus lain tanpa perlu buat semula dari awal.

---

**Soalan 2:**
> Apakah PERBEZAAN utama antara fungsi Import dan Restore dalam Moodle?

- A) Import lebih laju daripada Restore
- B) Restore hanya untuk admin, Import untuk semua pengguna
- C) Import tidak membawa data pelajar, Restore boleh membawa data pelajar ✅
- D) Tiada perbezaan, kedua-duanya sama

*Penerangan:* Import hanya menyalin kandungan kursus (bahan, aktiviti). Restore pula boleh memulihkan kursus secara lengkap termasuk rekod pelajar dan gred.

---

**Soalan 3:**
> Di mana anda perlu **berada** sebelum memulakan proses Import?

- A) Dalam kursus LAMA (sumber)
- B) Dalam kursus BARU (destinasi) ✅
- C) Dalam halaman Site Administration
- D) Dalam halaman My courses

*Penerangan:* Import dimulakan dari dalam kursus BARU yang akan menerima kandungan. Anda membuka Course Management dalam kursus baru tersebut, kemudian pilih kursus lama sebagai sumber.

---

**Soalan 4:**
> Berapa langkah dalam wizard Import Moodle?

- A) 3 langkah
- B) 4 langkah
- C) 5 langkah
- D) 6 langkah ✅

*Penerangan:* Wizard Import mempunyai 6 langkah: (1) Course selection → (2) Initial settings → (3) Schema settings → (4) Confirmation and review → (5) Perform import → (6) Complete.

---

**Soalan 5:**
> Apakah yang berlaku kepada kandungan yang sedia ada dalam kursus baru apabila Import dilakukan?

- A) Ia akan dipadam dan digantikan dengan kandungan baru
- B) Ia akan digabungkan — kandungan baru ditambah tanpa memadam yang sedia ada ✅
- C) Sistem akan meminta pengguna pilih sama ada nak padam atau tambah
- D) Import tidak boleh dilakukan jika kursus sudah ada kandungan

*Penerangan:* Import bersifat additive — ia menambah kandungan dari kursus sumber tanpa membuang apa yang sudah ada dalam kursus destinasi.

---

**Paparan keputusan Quiz Induksi:**
```
┌─────────────────────────────────────────┐
│  Keputusan Pra-Penilaian Anda           │
│                                         │
│  Skor: 3 / 5  ⭐⭐⭐                    │
│                                         │
│  Anda sudah ada asas yang baik!         │
│  Modul ini akan kukuhkan pemahaman anda │
│  dengan panduan langkah demi langkah.   │
│                                         │
│  [ Mulakan Pembelajaran → ]             │
└─────────────────────────────────────────┘
```

Mesej bergantung skor:
- 0–1 betul → "Tiada masalah! Modul ini akan bantu anda dari awal."
- 2–3 betul → "Anda ada asas yang baik. Mari kukuhkan lagi!"
- 4–5 betul → "Terbaik! Anda hampir mahir. Gunakan modul ini sebagai rujukan."

---

### UNIT 1 — Cipta Kursus Baru

**Pengenalan Unit**
> Sebelum anda boleh import kandungan lama, anda perlu ada kursus baru sebagai destinasi. Unit ini menunjukkan cara paling mudah untuk cipta kursus baru.

**Langkah 1.1 — Akses Dashboard**
- Screenshot: `imej/1.jpeg`
- Anotasi: Klik ikon "Quick links" (01) → Pilih "My courses" (02)
- Nota penting: Quick links ada di sudut kiri atas

**Langkah 1.2 — Buka My Courses & Klik New Course**
- Screenshot: `imej/2.jpeg`
- Anotasi: Klik ikon titik tiga (⋮) di sudut kanan → Pilih "New course" (03)
- Nota penting: Anda perlu ada hak akses "Course creator" atau "Admin"

**Langkah 1.3 — Isi Maklumat Kursus**
- (Tiada screenshot — penerangan teks sahaja)
- Isi: Full name, Short name, Course category, Format
- Klik "Save and display"

**Aktiviti 1** *(Semak Faham)*
> Soalan: Di manakah butang "New course" boleh didapati?
> A) Dalam Course management
> B) Dalam My courses (✓)
> C) Dalam Dashboard terus
> D) Dalam Site administration

---

### UNIT 2 — Import Kandungan Kursus Lama

**Pengenalan Unit**
> Import membolehkan anda menyalin kandungan (aktiviti, fail, soal selidik) dari kursus lama ke kursus baru TANPA data pelajar. Proses ini melalui 6 langkah wizard.

**Langkah 2.1 — Buka Course Management**
- Screenshot: `imej/3.jpeg`
- Anotasi: Masuk ke kursus baru → Klik "Course management" di sudut kanan atas
- Nota: Anda mesti berada DALAM kursus baru sebagai destinasi

**Langkah 2.2 — Pilih Import**
- Screenshot: `imej/4.jpeg`
- Anotasi: Dalam modal Course Management → Lihat bahagian "Course" → Klik "Import"
- Nota: Import ≠ Restore. Import tidak membawa data pelajar

**Langkah 2.3 — [Langkah 1] Pilih Kursus Sumber**
- Screenshot: `imej/5.jpeg`
- Anotasi: Senarai kursus dipaparkan → Pilih kursus lama yang dikehendaki → Klik "Continue"
- Nota: Gunakan kotak carian jika kursus terlalu banyak

**Langkah 2.4 — [Langkah 2] Tetapan Import (Initial Settings)**
- Screenshot: `imej/6.jpeg`
- Anotasi: Semak semua pilihan yang diperlukan → Klik "Next"
- Pilihan penting:
  - ✅ Include activities and resources
  - ✅ Include files
  - ✅ Include question bank
  - ☐ Include permission overrides (tidak perlu biasanya)

**Langkah 2.5 — [Langkah 3] Pilih Kandungan Spesifik (Schema Settings)**
- Screenshot: `imej/7.jpeg`
- Anotasi: Tandakan (✅) aktiviti yang ingin diimport → Klik "Next"
- Nota: Anda boleh pilih semua atau hanya topik tertentu sahaja

**Langkah 2.6 — [Langkah 4] Semak & Sahkan**
- (Tiada screenshot — penerangan teks)
- Semak ringkasan apa yang akan diimport
- Klik "Perform import" untuk mulakan

**Langkah 2.7 — [Langkah 5] Proses Import Berjalan**
- Screenshot: `imej/8.jpeg`
- Anotasi: Progress bar ditunjukkan — tunggu sehingga 100%
- Nota: Jangan tutup atau refresh halaman semasa import berlangsung

**Langkah 2.8 — [Langkah 6] Import Selesai**
- Screenshot: `imej/9.jpeg`
- Anotasi: Mesej hijau "Import complete" — Klik "Continue"
- Nota: Anda akan dibawa balik ke halaman kursus yang kini ada kandungan baru

**Aktiviti 2** *(Semak Faham)*
> Soalan: Apakah yang TIDAK dibawa oleh fungsi Import?
> A) Aktiviti dan sumber
> B) Fail kursus
> C) Data dan rekod pelajar (✓)
> D) Soalan dalam Question Bank

---

### RUMUSAN

**Bahagian A — Cipta Kursus Baru (2 Langkah)**
1. Dashboard → Quick links → My courses
2. My courses → ⋮ → New course → Isi maklumat → Save

**Bahagian B — Import Kandungan Kursus Lama (6 Langkah Wizard)**
1. Masuk kursus → Course management → Import
2. Pilih kursus sumber → Continue
3. Tetapkan pilihan import → Next
4. Pilih kandungan spesifik → Next
5. Sahkan & Perform import
6. Tunggu selesai → Continue

---

### PENILAIAN KENDIRI (Quiz Interaktif)

8 soalan MCQ dengan maklum balas segera (betul/salah + penerangan ringkas):

1. Di mana letak butang "Quick links"? → Sudut kiri atas
2. Kursus baru boleh dicipta dari halaman mana? → My courses
3. Fungsi "Course management" berada di mana? → Sudut kanan atas dalam kursus
4. Berapa langkah dalam wizard Import? → 6 langkah
5. Apakah tujuan Langkah 2 (Initial settings)? → Pilih jenis kandungan untuk diimport
6. Bolehkah kita pilih hanya sebahagian aktiviti sahaja untuk diimport? → Ya, dalam Schema settings
7. Apa yang patut dilakukan semasa progress bar berjalan? → Tunggu, jangan tutup/refresh
8. Apa mesej yang muncul bila import berjaya? → "Import complete. Click continue to return to the course."

---

## Reka Bentuk Visual

### Layout Utama — 2 Kolum

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER — Logo TVETMARA + Tajuk SIM                         │
├──────────────────┬──────────────────────────────────────────┤
│                  │                                          │
│   SIDEBAR        │   PANEL KANDUNGAN UTAMA                  │
│   (kiri, tetap)  │                                          │
│                  │   [ Tajuk Langkah ]                      │
│  Kemajuan Anda   │                                          │
│  ░░░░░░░░ 45%    │   Penerangan + Screenshot                │
│                  │                                          │
│  ✅ Cover        │   [ Tip box / Amaran box ]               │
│  ✅ Panduan      │                                          │
│  ✅ Objektif     │                                          │
│  ── UNIT 1 ──    │                                          │
│  ✅ Langkah 1.1  │                                          │
│  ▶ Langkah 1.2   │   ← ───────────── → │
│  ○ Langkah 1.3   │   [ Sebelumnya ]   [ Seterusnya ]        │
│  ○ Aktiviti 1    │                                          │
│  ── UNIT 2 ──    │                                          │
│  ○ Langkah 2.1   │                                          │
│  ○ Langkah 2.2   │                                          │
│  ○ ...           │                                          │
│  ── AKHIR ──     │                                          │
│  ○ Rumusan       │                                          │
│  ○ Quiz          │                                          │
│  ○ Sijil         │                                          │
│                  │                                          │
└──────────────────┴──────────────────────────────────────────┘
```

### Sidebar Progress — Spesifikasi Terperinci

**Bahagian Sidebar:**
1. **Progress Bar** — Bar isi penuh di atas sidebar
   - Teks peratusan: `45% Selesai`
   - Warna isi: hijau `#27AE60` → merah TVETMARA `#8B0000` (gradient)
   - Animasi smooth fill apabila langkah berubah

2. **Senarai Langkah** — Setiap item adalah butang navigasi klik terus
   - **Icon status:**
     - `✅` Hijau bulat — langkah sudah selesai (dilawati)
     - `▶` Merah — langkah semasa (aktif)
     - `○` Kelabu — langkah belum dilawati (locked/unlocked)
   - Teks langkah: bold jika aktif, normal jika selesai, pudar jika belum
   - Klik pada item yang sudah selesai → boleh navigasi terus

3. **Pengumpulan / Grouping:**
   ```
   📋 Pengenalan
      ○ Cover
      ○ Panduan Guna
      ○ Hasil Pembelajaran

   🔍 INDUKSI: Kenali Import Kursus
      ○ Apakah Import Kursus?
      ○ Import vs Restore vs Backup
      ○ Gambaran Keseluruhan Proses
      📝 Quiz Induksi (5 soalan)

   🆕 UNIT 1: Cipta Kursus Baru
      ○ 1.1 — Dashboard & My Courses
      ○ 1.2 — New Course
      ○ 1.3 — Isi Maklumat Kursus
      ✏️  Aktiviti 1

   📥 UNIT 2: Import Kursus Lama
      ○ 2.1 — Course Management
      ○ 2.2 — Pilih Import
      ○ 2.3 — Pilih Kursus Sumber
      ○ 2.4 — Import Settings
      ○ 2.5 — Schema Settings
      ○ 2.6 — Semak & Sahkan
      ○ 2.7 — Proses Import
      ○ 2.8 — Import Selesai
      ✏️  Aktiviti 2

   🏁 Penutup
      ○ Rumusan
      ○ Penilaian Kendiri (Quiz)
      ○ Tahniah / Sijil
   ```

4. **Mini Stats** — di bawah senarai:
   - `Langkah: 5 / 20`
   - `Masa anggaran: ~5 minit lagi`

> **Jumlah langkah keseluruhan: 20**
> - Pengenalan: 3 langkah
> - Induksi: 4 langkah (3 kandungan + 1 quiz)
> - Unit 1: 4 langkah (3 langkah + 1 aktiviti)
> - Unit 2: 9 langkah (8 langkah + 1 aktiviti)
> - Penutup: 3 langkah (rumusan + quiz akhir + sijil)

### KEPUTUSAN REKA BENTUK MUKTAMAD

**Tema Visual: Cerah & Mesra (Light & Friendly)**
Inspirasi: Google Classroom / Notion — bersih, mudah baca, tidak membebankan mata.

#### Palet Warna
| Token | Hex | Kegunaan |
|-------|-----|----------|
| Primary | `#4A90E2` | Butang utama, highlight aktif |
| Primary Dark | `#2C6FBF` | Hover state butang |
| Secondary | `#7B2FBE` | Aksen ungu untuk badge/icon |
| Success | `#27AE60` | Step selesai, jawapan betul |
| Warning | `#F39C12` | Tip box, amaran ringan |
| Danger | `#E74C3C` | Jawapan salah, amaran penting |
| Background | `#F8F9FA` | Latar halaman |
| Surface | `#FFFFFF` | Kad, panel, sidebar |
| Border | `#E0E6EF` | Sempadan elemen |
| Text Primary | `#1A1A2A` | Teks utama |
| Text Muted | `#6B7280` | Label, metadata |
| Sidebar BG | `#FFFFFF` | Sidebar cerah dengan border |
| Sidebar Active | `#EEF4FF` | Highlight baris aktif (biru lembut) |

#### Tipografi
- Font: `Inter` (Google Fonts) — moden, mudah baca
- Tajuk: `700` weight, saiz `1.5rem–2rem`
- Body: `400` weight, saiz `1rem`, line-height `1.7`
- Label langkah: `600` weight, saiz `0.875rem`

#### Elemen UI Interaktif yang Akan Dibina

**1. Drag & Drop Matching Activity** *(elemen interaktif utama)*
- Digunakan dalam **Aktiviti 1** dan **Aktiviti 2**
- Teknologi: HTML5 Drag & Drop API
- Aktiviti 1 — Padankan 3 langkah cipta kursus dengan urutan yang betul
- Aktiviti 2 — Padankan 6 langkah wizard Import dengan penerangan masing-masing
- Maklum balas visual:
  - Semasa drag: item bertukar warna + shadow
  - Drop betul: hijau + animasi bounce
  - Drop salah: merah + shake animation + reset
  - Semua betul: confetti mini + "Tahniah!" modal

**2. Screenshot dengan Annotation Badge**
- Nombor bulat berwarna (`①②③`) terapung di atas gambar
- Hover pada badge → tooltip penerangan muncul
- Tidak perlu klik — lebih ringkas dari hotspot penuh

**3. Animated Progress Bar Sidebar**
- CSS transition smooth (0.4s ease)
- Warna berubah: `#4A90E2` → `#27AE60` (biru ke hijau bila hampir selesai)
- Angka peratusan animated count-up

**4. Step Status Icons Sidebar**
- `○` Abu — belum dilawati
- `▶` Biru — sedang aktif (dengan pulse ring)
- `✓` Hijau — sudah selesai (dengan fade-in animation)

**5. Smooth Panel Transitions**
- Tukar panel dengan CSS `fadeIn` + `slideUp` (150ms)
- Rasa seperti navigasi app moden

**6. Quiz Induksi — Radio Button Bergaya**
- Bukan radio button biasa — styled sebagai kad pilihan
- Klik kad → highlight biru + border tebal
- Submit → reveal betul/salah dengan warna + ikon
- Skor dengan progress ring animation

**7. Info / Tip / Amaran Box**
- 💡 Tip box — latar kuning muda, border kiri kuning
- ⚠️ Amaran — latar merah muda, border kiri merah
- ℹ️ Info — latar biru muda, border kiri biru
- Semua ada ikon dan warna yang berbeza

#### Tiada
- ~~Sijil digital~~ — tidak diperlukan
- ~~Flip card quiz~~ — guna radio bergaya sebaliknya
- ~~Hotspot screenshot~~ — guna annotation badge yang lebih ringkas

### Elemen UI SIM (Panel Kandungan)
- **Nombor langkah** beranotasi — bulatan biru terapung atas screenshot
- **Tip box** `💡 Tip:` — maklumat tambahan berguna
- **Amaran box** `⚠️ Perhatian:` — perkara penting
- **Screenshot** — dengan annotation badge bernombor
- **Navigasi bawah**: `← Sebelumnya` | `Seterusnya →` (butang besar biru)
- **Breadcrumb** atas panel: `Pengenalan › Unit 1 › Langkah 1.2`

---

## Pelan Pelaksanaan

### Fasa 1 — Struktur HTML
- [ ] Bina `index.html` dengan layout 2 kolum (sidebar + kandungan)
- [ ] 16 panel/langkah sebagai `<section>` tersembunyi, papar satu-satu
- [ ] Struktur sidebar dengan semua item langkah

### Fasa 2 — Styling CSS (`css/style.css`)
- [ ] Layout grid/flexbox — sidebar tetap (fixed), kandungan scroll
- [ ] Sidebar gelap dengan teks putih, progress bar hijau
- [ ] Animasi progress bar (CSS transition)
- [ ] Status icon (✅ ▶ ○) dengan warna berbeza
- [ ] Highlight baris aktif dalam sidebar
- [ ] Lightbox overlay untuk zoom screenshot
- [ ] Responsive — sidebar runtuh jadi drawer pada skrin kecil
- [ ] Tip box, amaran box, info box styling

### Fasa 3 — Interaktiviti JavaScript (`js/app.js`)
- [ ] Engine navigasi: `goToStep(n)` — tukar panel, kemaskini sidebar
- [ ] Kira peratusan: `Math.round((currentStep / totalSteps) * 100)`
- [ ] Animasi progress bar fill apabila langkah berubah
- [ ] Kemas kini status icon setiap langkah (todo → active → done)
- [ ] Klik item sidebar → navigasi terus ke langkah tersebut
- [ ] Quiz MCQ: semak jawapan, kira skor, papar maklum balas
- [ ] Simpan kemajuan dalam `localStorage` (resume bila buka semula)
- [ ] Lightbox: klik imej → papar besar, klik luar → tutup

### Fasa 4 — Semakan & Penambahbaikan
- [ ] Uji navigasi dari cover hingga sijil
- [ ] Pastikan progress bar bergerak dengan betul
- [ ] Pastikan semua screenshot dipapar
- [ ] Semak teks Bahasa Melayu
- [ ] Uji quiz dan pastikan skor dikira betul
- [ ] Uji resume dari localStorage

---

## Nota Teknikal
- Semua fail lokal — tiada keperluan server/internet
- Gambar dari `imej/` folder terus dirujuk
- localStorage untuk simpan kemajuan quiz
- Tiada framework — HTML/CSS/JS tulen untuk mudah diselenggara
