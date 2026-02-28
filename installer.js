/* ===================================================
   Dunia Digital Installer Otomatis + Generate HTML
   Versi: 1.2
=================================================== */

const fs = require('fs');
const path = require('path');

console.log("🚀 Memulai installer Dunia Digital Shop...");

// =============================
// 1. Buat folder penting
// =============================
const folders = [
  'assets',
  'assets/css',
  'assets/js',
  'assets/img',
  'pages',
  'pages/store',
  'pages/dashboard',
  'workers',
  'workers/security',
  'workers/utils',
  'workers/kv',
  'config'
];

folders.forEach(f => {
  if (!fs.existsSync(f)) {
    fs.mkdirSync(f, { recursive: true });
    console.log(`📁 Folder dibuat: ${f}`);
  } else {
    console.log(`✅ Folder sudah ada: ${f}`);
  }
});

// =============================
// 2. File konfigurasi
// =============================
const configFile = 'config/EDIT_ME_FIRST.txt';
if (!fs.existsSync(configFile)) {
  fs.writeFileSync(configFile, 'Silakan edit file ini sebelum menggunakan sistem!\n');
  console.log(`⚠️ File konfigurasi dibuat: ${configFile}`);
} else {
  console.log(`✅ File konfigurasi sudah ada: ${configFile}`);
}

// =============================
// 3. Copy semua gambar ebook
// =============================
const sourceFolder = 'source_images'; // Tempat gambar asli
const targetFolder = 'assets/img';

if (!fs.existsSync(sourceFolder)) {
  console.log(`❌ Folder sumber gambar tidak ditemukan: ${sourceFolder}`);
  console.log("Silakan buat folder source_images/ dan masukkan 23 gambar ebook di sana.");
  process.exit();
}

const files = fs.readdirSync(sourceFolder);
files.forEach(file => {
  const sourcePath = path.join(sourceFolder, file);
  const targetPath = path.join(targetFolder, file);
  fs.copyFileSync(sourcePath, targetPath);
  console.log(`📄 Gambar tersalin: ${file}`);
});
console.log(`✅ Semua gambar dari ${sourceFolder}/ berhasil disalin ke ${targetFolder}/`);

// =============================
// 4. Generate ebooks.html otomatis
// =============================
let htmlContent = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ebooks Premium - Dunia Digital Shop</title>
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
  <div class="container">
    <h1>📚 Ebooks Premium Dunia Digital</h1>
    <div class="grid">
`;

// Loop semua file gambar untuk buat card
files.forEach((file, index) => {
  const fileName = path.parse(file).name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // Judul otomatis
  const cardHTML = `
      <div class="card">
        <img src="../assets/img/${file}" alt="${fileName}">
        <div class="card-body">
          <div class="title">${fileName}</div>
          <div class="desc">Deskripsi singkat untuk ${fileName}.</div>
          <a href="../store/checkout.html?product=${encodeURIComponent(fileName)}" class="btn">Beli Sekarang</a>
        </div>
      </div>
  `;
  htmlContent += cardHTML;
});

htmlContent += `
    </div>
    <footer>
      © 2026 Dunia Digital Shop — Toko Ebook Premium Spiritual
    </footer>
  </div>
</body>
</html>
`;

const ebooksHTMLPath = 'pages/ebooks.html';
fs.writeFileSync(ebooksHTMLPath, htmlContent);
console.log(`✅ Halaman ebooks.html berhasil dibuat di ${ebooksHTMLPath}`);

// =============================
// 5. Selesai
// =============================
console.log("\n🎯 Installer + Generate HTML selesai!");
console.log("Silakan edit deskripsi card di pages/ebooks.html sesuai kebutuhan.");
console.log("Website siap dijalankan! 🚀");inst
