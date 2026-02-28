// ================================
// assets/js/app.js
// Versi Final - Dunia Digital Shop
// ================================

// Daftar semua ebook
const ebooks = [
  { id: 1, title: "Ksatria Spiritual", price: "Rp99.000", productParam: "Ksatria Spiritual" },
  { id: 2, title: "Rahasia Membongkar Potensi Diri", price: "Rp99.000", productParam: "Rahasia Membongkar Potensi Diri" },
  { id: 3, title: "Quantum Dzikir", price: "Rp99.000", productParam: "Quantum Dzikir" },
  { id: 4, title: "Quantum Cahaya", price: "Rp99.000", productParam: "Quantum Cahaya" },
  { id: 5, title: "Quantum Syukur", price: "Rp99.000", productParam: "Quantum Syukur" },
  { id: 6, title: "Hakikat Quantum Ihsan", price: "Rp99.000", productParam: "Hakikat Quantum Ihsan" },
  { id: 7, title: "The Art of Surrender", price: "Rp99.000", productParam: "The Art of Surrender" },
  { id: 8, title: "Law of Spiritual Attraction", price: "Rp99.000", productParam: "Law of Spiritual Attraction" },
  { id: 9, title: "The Radiance Within", price: "Rp99.000", productParam: "The Radiance Within" },
  { id: 10, title: "Healing Dzikir of Powerful", price: "Rp99.000", productParam: "Healing Dzikir of Powerful" },
  { id: 11, title: "Jatidiri", price: "Rp99.000", productParam: "Jatidiri" },
  { id: 12, title: "The Dzikir of Powerfull", price: "Rp99.000", productParam: "The Dzikir of Powerfull" },
  { id: 13, title: "Membongkar Realitas Hologram", price: "Rp99.000", productParam: "Membongkar Realitas Hologram" },
  { id: 14, title: "The Untouchable", price: "Rp99.000", productParam: "The Untouchable" },
  { id: 15, title: "Quantum Ruh", price: "Rp99.000", productParam: "Quantum Ruh" },
  { id: 16, title: "Zero Points Dzikir", price: "Rp99.000", productParam: "Zero Points Dzikir" },
  { id: 17, title: "Pasrah Adalah Dzikir", price: "Rp99.000", productParam: "Pasrah Adalah Dzikir" },
  { id: 18, title: "Manunggal", price: "Rp99.000", productParam: "Manunggal" },
  { id: 19, title: "Navigasi Cahaya", price: "Rp99.000", productParam: "Navigasi Cahaya" },
  { id: 20, title: "Rahasia Menemukan Kode Sumber Realitas", price: "Rp99.000", productParam: "Rahasia Menemukan Kode Sumber Realitas" },
  { id: 21, title: "Menguak Potensi Diri Tanpa Batas", price: "Rp99.000", productParam: "Menguak Potensi Diri Tanpa Batas" },
  { id: 22, title: "Cara Jitu Berdamai Dengan Diri", price: "Rp99.000", productParam: "Cara Jitu Berdamai Dengan Diri" },
  { id: 23, title: "Tauhid Quantum", price: "Rp99.000", productParam: "Tauhid Quantum" }
];

// Function untuk meng-update tombol checkout
function initCheckoutButtons() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach((btn, index) => {
    if (ebooks[index]) {
      const productParam = encodeURIComponent(ebooks[index].productParam);
      btn.setAttribute('href', `store/checkout.html?product=${productParam}`);
    }
  });
}

// Inisialisasi ketika halaman siap
document.addEventListener('DOMContentLoaded', () => {
  initCheckoutButtons();
}); di 
