# 🚀 Panduan Deploy MEDTOOLS Creator Hub ke Hostinger

## Persiapan Sebelum Deploy

### 1. Build Website untuk Production

Jalankan command berikut di terminal (dari folder `web`):

```bash
cd /Users/mac/Downloads/Creator\ Team\ SOP\ Website/web
npm run build
```

Command ini akan:
- Compile semua file TypeScript/React
- Generate static HTML files
- Optimize semua assets (CSS, JS, images)
- Membuat folder `out` yang berisi website siap deploy

### 2. Verifikasi Build

Setelah build selesai, test website secara lokal:

```bash
npx serve out
```

Buka browser dan akses `http://localhost:3000` untuk memastikan semuanya berfungsi.

---

## 📦 File yang Perlu Di-Upload ke Hostinger

Setelah build berhasil, upload **SELURUH ISI FOLDER `out`** ke Hostinger.

### Struktur Folder `out`:
```
out/
├── index.html                          # Homepage
├── content-reference.html              # Content Reference page
├── platform/
│   ├── medtools.id.html
│   ├── medtools.store.html
│   ├── medtools.academy.html
│   ├── hai.medi.html
│   └── medimpact.co.html
├── _next/                              # Optimized JS & CSS
│   ├── static/
│   └── ...
├── favicon.ico
└── ... (semua file lainnya)
```

**PENTING**: Upload **SEMUA FILE** di dalam folder `out`, termasuk folder `_next` dan semua subfolder.

---

## 🌐 Langkah-Langkah Upload ke Hostinger

### Metode 1: Via File Manager (Recommended)

1. **Login ke Hostinger**
   - Buka https://hpanel.hostinger.com
   - Login dengan akun Anda

2. **Buka File Manager**
   - Pilih hosting Anda
   - Klik "File Manager" di menu

3. **Navigasi ke Folder Public**
   - Masuk ke folder `public_html` (atau `htdocs` tergantung setup)
   - **HAPUS** semua file default di dalamnya (index.html, dll)

4. **Upload Files**
   - Klik tombol "Upload"
   - Pilih **SEMUA FILE** dari folder `out`
   - Atau zip folder `out` terlebih dahulu, upload zip, lalu extract di server

5. **Set Permissions**
   - Pastikan semua file memiliki permission 644
   - Folder memiliki permission 755

### Metode 2: Via FTP (FileZilla)

1. **Download FileZilla**
   - Download dari https://filezilla-project.org

2. **Dapatkan FTP Credentials**
   - Di Hostinger panel, cari "FTP Accounts"
   - Catat: Host, Username, Password, Port

3. **Connect via FileZilla**
   - Host: ftp.yourdomain.com
   - Username: your_ftp_username
   - Password: your_ftp_password
   - Port: 21

4. **Upload Files**
   - Di panel kiri: navigasi ke folder `out` di komputer Anda
   - Di panel kanan: navigasi ke `public_html`
   - Drag & drop semua file dari `out` ke `public_html`

---

## ⚙️ Konfigurasi .htaccess (PENTING!)

Buat file `.htaccess` di root folder `public_html` dengan isi:

```apache
# Enable Rewrite Engine
RewriteEngine On

# Redirect to HTTPS (optional but recommended)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle Next.js routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /$1.html [L]

# Handle trailing slashes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)/$ /$1.html [L]

# Fallback to index.html for root
DirectoryIndex index.html

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
</IfModule>
```

---

## 🔍 Checklist Setelah Upload

- [ ] Semua file dari folder `out` sudah terupload
- [ ] File `.htaccess` sudah dibuat dan dikonfigurasi
- [ ] Buka website Anda di browser
- [ ] Test navigasi ke semua halaman:
  - Homepage (/)
  - Platform pages (/platform/medtools.id, dll)
  - Content Reference (/content-reference)
- [ ] Test filter di Content Reference page
- [ ] Pastikan semua embed (Instagram, YouTube) berfungsi
- [ ] Test di mobile browser
- [ ] Check console browser untuk error

---

## 🐛 Troubleshooting

### Problem: 404 Error saat navigasi
**Solusi**: Pastikan file `.htaccess` sudah dibuat dengan benar

### Problem: CSS/JS tidak load
**Solusi**: 
- Pastikan folder `_next` terupload lengkap
- Check permission file (644 untuk file, 755 untuk folder)

### Problem: Embed Instagram/YouTube tidak muncul
**Solusi**: 
- Pastikan domain Anda sudah menggunakan HTTPS
- Check browser console untuk CORS errors

### Problem: Halaman blank/putih
**Solusi**:
- Buka browser console (F12)
- Check error messages
- Pastikan semua file JavaScript terupload

---

## 🔄 Update Website di Kemudian Hari

Untuk update website:

1. Edit code di local
2. Run `npm run build` lagi
3. Upload ulang isi folder `out` ke Hostinger
4. Clear browser cache untuk melihat perubahan

---

## 📊 Estimasi Ukuran Upload

- Total files: ~100-200 files
- Total size: ~5-15 MB (tergantung assets)
- Upload time: 2-5 menit (tergantung koneksi internet)

---

## ✅ Domain Setup (Optional)

Jika menggunakan custom domain:

1. Di Hostinger panel, tambahkan domain
2. Update DNS settings
3. Enable SSL certificate (gratis dari Hostinger)
4. Update `.htaccess` untuk force HTTPS

---

**Status**: Ready for Deployment
**Last Updated**: 2026-01-14
