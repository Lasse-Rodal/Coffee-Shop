document.addEventListener("DOMContentLoaded", () => {
  // === Mobile Nav Toggle ===
  const hamb = document.querySelector(".hamb");
  const mobileNav = document.querySelector(".mobile-nav");
  if (hamb && mobileNav) {
    hamb.addEventListener("click", () => {
      mobileNav.classList.toggle("show");
    });
  }

  // === News Banner Rotation ===
  const newsItems = document.querySelectorAll(".news-item");
  let current = 0;

  if (newsItems.length > 0) {
    setInterval(() => {
      newsItems[current].classList.remove("active");
      current = (current + 1) % newsItems.length;
      newsItems[current].classList.add("active");
    }, 4000);
  }

  // === Newsletter Form Submission ===
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thanks for subscribing!");
    });
  }

  // === Menu Items ===
  const menuItems = [
    { id: 1, name: "Latte", price: 450 },
    { id: 2, name: "Iced Coffee", price: 480 },
    { id: 3, name: "Citrus Sparkler", price: 430 },
    { id: 4, name: "Croissant Combo", price: 900 },
    { id: 5, name: "Chocolate Cake Slice", price: 250 },
    { id: 6, name: "Cookies", price: 300 },
  ];

  let order = JSON.parse(localStorage.getItem("order")) || [];

  // === Add to Cart ===
  window.addToCart = function (itemId) {
    const item = menuItems.find((item) => item.id === itemId);
    if (item) {
      order.push(item);
      localStorage.setItem("order", JSON.stringify(order));
      updateCartCount();
      showToast(`${item.name} added to your cart!`);
    }
  };

  // === Toast Message ===
  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
  }

  // === Cart Count Updates ===
  function updateCartCount() {
    const count = order.length;
    const desktop = document.getElementById("cart-count");
    const mobile = document.getElementById("cart-count-mobile");
    if (desktop) desktop.textContent = count;
    if (mobile) mobile.textContent = count;
  }

  // === Cart Page DOM Elements ===
  const orderList = document.getElementById("order-list");
  const totalSpan = document.getElementById("order-total");
  const placeBtn = document.getElementById("place-order");
  const receipt = document.getElementById("receipt");
  const receiptItems = document.getElementById("receipt-items");
  const receiptTotal = document.getElementById("receipt-total");

  // === Update Cart UI ===
  function updateOrderUI() {
    if (!orderList || !totalSpan) return;

    orderList.innerHTML = "";
    let total = 0;

    if (order.length === 0) {
      orderList.innerHTML = "<p>Your cart is empty.</p>";
      totalSpan.textContent = "0";
      return;
    }

    order.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("order-item");
      div.innerHTML = `
        ${item.name} – ¥${item.price} 
        <button class="remove-button" onclick="removeItem(${index})">❌</button>
      `;
      orderList.appendChild(div);
      total += item.price;
    });

    totalSpan.textContent = total;
  }

  // === Remove Item ===
  window.removeItem = function (index) {
    order.splice(index, 1);
    localStorage.setItem("order", JSON.stringify(order));
    updateOrderUI();
    updateCartCount();
  };

  // === Place Order ===
  if (placeBtn) {
    placeBtn.addEventListener("click", () => {
      if (order.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      // Button animation
      placeBtn.classList.add("pulse");
      setTimeout(() => placeBtn.classList.remove("pulse"), 500);

      // Show receipt
      if (receipt && receiptItems && receiptTotal) {
        receiptItems.innerHTML = "";
        let total = 0;

        order.forEach((item) => {
          const line = document.createElement("p");
          line.textContent = `${item.name} ........ ¥${item.price}`;
          receiptItems.appendChild(line);
          total += item.price;
        });

        receiptTotal.textContent = total;
        receipt.classList.remove("hidden");
        setTimeout(() => receipt.classList.add("show"), 100);
      }

      // Clear cart
      order = [];
      localStorage.removeItem("order");
      updateOrderUI();
      updateCartCount();
    });
  }

  updateOrderUI();
  updateCartCount();
});
