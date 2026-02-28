// assets/js/app.js

document.addEventListener("DOMContentLoaded", function() {
  // Tombol Beli Sekarang
  const buyButtons = document.querySelectorAll(".btn");

  buyButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      const productTitle = this.closest(".card").querySelector(".title").textContent;
      const checkoutUrl = this.getAttribute("href");

      // Simpan produk ke localStorage sementara
      localStorage.setItem("selectedProduct", productTitle);

      // Redirect ke halaman checkout
      window.location.href = checkoutUrl;
    });
  });

  // Optional: Filter ebooks
  const searchInput = document.getElementById("searchEbook");
  if (searchInput) {
    searchInput.addEventListener("input", function() {
      const query = this.value.toLowerCase();
      const cards = document.querySelectorAll(".card");

      cards.forEach(card => {
        const title = card.querySelector(".title").textContent.toLowerCase();
        if (title.includes(query)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // Optional: Highlight selected product on checkout page
  const checkoutProduct = document.getElementById("checkoutProduct");
  if (checkoutProduct) {
    const selected = localStorage.getItem("selectedProduct");
    if (selected) {
      checkoutProduct.textContent = selected;
    }
  }
});
