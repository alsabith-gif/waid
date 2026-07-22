// WAID Leather Shoe Store - Cart Management System

const PROMO_CODES = {
  "WELCOME10": { type: "percent", value: 10, description: "10% Off Your First Order" },
  "VIP15": { type: "percent", value: 15, description: "15% VIP Customer Discount" },
  "FREESHIP": { type: "shipping", value: 0, description: "Free Shipping on All Orders" }
};

// Get cart from localStorage
function getCart() {
  const cart = localStorage.getItem("waid_cart");
  return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage and dispatch update event
function saveCart(cart) {
  localStorage.setItem("waid_cart", JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cart }));
}

// Get active promo code
function getPromo() {
  const promo = localStorage.getItem("waid_promo");
  return promo ? JSON.parse(promo) : null;
}

// Save promo code
function savePromo(promo) {
  if (promo) {
    localStorage.setItem("waid_promo", JSON.stringify(promo));
  } else {
    localStorage.removeItem("waid_promo");
  }
  window.dispatchEvent(new CustomEvent("cartUpdated", { detail: getCart() }));
}

// Add item to cart
function addToCart(productId, size, quantity = 1) {
  const cart = getCart();
  const product = PRODUCTS.find(p => p.id === productId);
  
  if (!product) {
    showToast("Product not found.", "error");
    return;
  }
  
  if (!size) {
    showToast("Please select a size.", "error");
    return;
  }

  const existingItemIndex = cart.findIndex(item => item.id === productId && item.size === size);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      size: size,
      image: product.image,
      color: product.color,
      quantity: quantity
    });
  }

  saveCart(cart);
  showToast(`Added ${product.name} (Size ${size}) to your cart.`);
}

// Update quantity
function updateQuantity(productId, size, quantity) {
  let cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === productId && item.size === size);

  if (itemIndex > -1) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1);
      showToast("Item removed from cart.");
    } else {
      cart[itemIndex].quantity = quantity;
    }
    saveCart(cart);
  }
}

// Remove from cart
function removeFromCart(productId, size) {
  let cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === productId && item.size === size);

  if (itemIndex > -1) {
    const itemName = cart[itemIndex].name;
    cart.splice(itemIndex, 1);
    saveCart(cart);
    showToast(`Removed ${itemName} from your cart.`);
  }
}

// Clear cart
function clearCart() {
  saveCart([]);
  savePromo(null);
}

// Calculate totals
function getCartTotals() {
  const cart = getCart();
  const promo = getPromo();

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  let discount = 0;
  let isFreeShipping = false;

  if (promo && subtotal > 0) {
    const promoDetails = PROMO_CODES[promo.code];
    if (promoDetails) {
      if (promoDetails.type === "percent") {
        discount = subtotal * (promoDetails.value / 100);
      } else if (promoDetails.type === "shipping") {
        isFreeShipping = true;
      }
    }
  }

  // Free shipping on subtotals over $300 or with FREESHIP promo
  const shippingThreshold = 300;
  let shipping = 0;
  if (subtotal > 0) {
    shipping = (subtotal >= shippingThreshold || isFreeShipping) ? 0 : 15;
  }

  // Estimated tax (8%)
  const tax = (subtotal - discount) * 0.08;
  const total = Math.max(0, subtotal - discount + shipping + tax);

  return {
    subtotal: subtotal,
    discount: discount,
    promo: promo,
    shipping: shipping,
    tax: tax,
    total: total
  };
}

// Apply promo code
function applyPromoCode(code) {
  const cleanCode = code.trim().toUpperCase();
  if (PROMO_CODES[cleanCode]) {
    const promo = {
      code: cleanCode,
      description: PROMO_CODES[cleanCode].description
    };
    savePromo(promo);
    showToast(`Promo code "${cleanCode}" applied!`);
    return true;
  } else {
    showToast("Invalid promo code.", "error");
    return false;
  }
}

// Remove promo code
function removePromoCode() {
  savePromo(null);
  showToast("Promo code removed.");
}

// Toast System
function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  // SVG Icon depending on type
  let icon = "";
  if (type === "success") {
    icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
  } else {
    icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  }

  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Auto remove after 3.5 seconds
  setTimeout(() => {
    toast.classList.add("removing");
    toast.addEventListener("animationend", () => {
      toast.remove();
      if (container.children.length === 0) {
        container.remove();
      }
    });
  }, 3500);
}
