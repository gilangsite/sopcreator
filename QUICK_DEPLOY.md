# 🚀 Quick Deploy Guide - MEDTOOLS Creator Hub

## Cara Tercepat Deploy ke Hostinger

### 1️⃣ Build Website (5 menit)

Buka Terminal dan jalankan:

```bash
cd /Users/mac/Downloads/Creator\ Team\ SOP\ Website/web
./build-deploy.sh
```

Script ini akan otomatis:
- ✅ Clean build sebelumnya
- ✅ Install dependencies jika perlu
- ✅ Build website untuk production
- ✅ Copy file .htaccess
- ✅ Buat file ZIP siap upload

### 2️⃣ Upload ke Hostinger (3 menit)

**Pilih salah satu metode:**

#### Metode A: Upload ZIP (Tercepat)
1. Login ke Hostinger → File Manager
2. Masuk ke folder `public_html`
3. Hapus semua file lama
4. Upload file `medtools-creator-hub-deploy.zip`
5. Klik kanan → Extract
6. Hapus file ZIP setelah extract

#### Metode B: Upload Manual
1. Login ke Hostinger → File Manager
2. Masuk ke folder `public_html`
3. Hapus semua file lama
4. Upload semua file dari folder `out`

### 3️⃣ Test Website (2 menit)

Buka browser dan test:
- ✅ Homepage: `https://yourdomain.com`
- ✅ Platform pages: `https://yourdomain.com/platform/medtools.id`
- ✅ Content Reference: `https://yourdomain.com/content-reference`

---

## 📋 Checklist Cepat

- [ ] Build selesai tanpa error
- [ ] File ZIP terbuat (atau folder `out` ada)
- [ ] Login ke Hostinger berhasil
- [ ] Upload ke `public_html` selesai
- [ ] Website bisa diakses
- [ ] Semua halaman berfungsi
- [ ] Embed Instagram/YouTube muncul

---

## 🆘 Troubleshooting Cepat

| Problem | Solusi |
|---------|--------|
| Build error | Jalankan `npm install` dulu |
| 404 saat navigasi | Pastikan `.htaccess` terupload |
| CSS tidak muncul | Upload ulang folder `_next` |
| Embed tidak muncul | Aktifkan HTTPS di Hostinger |

---

## 🔄 Update Website Nanti

Untuk update konten:

```bash
# 1. Edit files
# 2. Build ulang
./build-deploy.sh

# 3. Upload ulang file ZIP ke Hostinger
```

---

## 📞 Support

Jika ada masalah, check:
1. `DEPLOYMENT_GUIDE.md` - Panduan lengkap
2. Browser Console (F12) - Lihat error messages
3. Hostinger Support - Live chat 24/7

---

**Total Time**: ~10 menit dari build sampai live! 🎉
