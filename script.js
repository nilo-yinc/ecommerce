document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Wireless Earbuds", price: 29.99, image: "https://images-cdn.ubuy.co.in/633b0f5fd18ee764d40f59d1-wireless-earbud-bluetooth-5-3-earbud.jpg" },
    { id: 2, name: "Bluetooth Speaker", price: 49.99, image: "https://myhypergear.com/cdn/shop/files/15885-HYG-HALO-Waterproof-wireless-LED-Speaker-001.jpg?v=1711048539" },
    { id: 3, name: "Smart Watch", price: 99.99, image: "https://images-cdn.ubuy.co.in/653dca4638b3b6351c03b03e-smart-watch-for-android-and-iphone.jpg" },
    { id: 4, name: "Portable PowerBank", price: 24.99, image: "https://bfasset.costco-static.com/U447IH35/as/96g5vzsm8tkp6p3gmjgmg9jb/1836270-847__1?auto=webp&amp;format=jpg&width=600&height=600&fit=bounds&canvas=600,600" },
    { id: 5, name: "Gaming Mouse", price: 39.99, image: "https://www.mytrendyphone.eu/images/6D-4-Speed-DPI-RGB-Gaming-Mouse-G5-Black-05042021-01-p.webp" }
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const totalPriceDisplay = document.getElementById("total-price");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalSection = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");
  const modal = document.getElementById("modal");
  const confirmCheckout = document.getElementById("confirm-checkout");
  const cancelCheckout = document.getElementById("cancel-checkout");
  const themeToggle = document.getElementById("theme-toggle");

  // Render Products
  products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <span>${product.name}<br><strong>$${product.price.toFixed(2)}</strong></span>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(div);
  });

  // Add to Cart
  productList.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
      const id = parseInt(e.target.getAttribute("data-id"));
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.quantity++;
      } else {
        const product = products.find(p => p.id === id);
        cart.push({ ...product, quantity: 1 });
      }
      saveCart();
      renderCart();
    }
  });

  // Render Cart
  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      emptyCartMessage.classList.remove("hidden");
      cartTotalSection.classList.add("hidden");
    } else {
      emptyCartMessage.classList.add("hidden");
      cartTotalSection.classList.remove("hidden");

      cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement("div");
        div.innerHTML = `
          <div>
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
            <div class="quantity-controls">
              <button class="decrement" data-id="${item.id}">−</button>
              <button class="increment" data-id="${item.id}">+</button>
              <button class="remove-btn" data-id="${item.id}">Remove</button>
            </div>
          </div>
        `;
        cartItems.appendChild(div);
      });
    }

    totalPriceDisplay.textContent = `$${total.toFixed(2)}`;
  }

  // Quantity Controls
  cartItems.addEventListener("click", e => {
    const id = parseInt(e.target.getAttribute("data-id"));
    const item = cart.find(i => i.id === id);

    if (e.target.classList.contains("increment")) {
      item.quantity++;
    } else if (e.target.classList.contains("decrement")) {
      if (item.quantity > 1) item.quantity--;
    } else if (e.target.classList.contains("remove-btn")) {
      cart = cart.filter(i => i.id !== id);
    }

    saveCart();
    renderCart();
  });

  // Checkout Modal
  checkoutBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  confirmCheckout.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
    modal.classList.add("hidden");
    alert("Thank you for your purchase!");
  });

  cancelCheckout.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Theme Toggle
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });

  // Save Cart
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  renderCart(); // Initial render
});
