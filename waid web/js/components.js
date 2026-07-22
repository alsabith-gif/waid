// WAID Leather Shoe Store - Reusable UI Components Injection

// Global SVG Logo markup
const WAID_LOGO_SVG = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="4"/>
  <polygon points="28,36 46,36 50,64 38,64" />
  <polygon points="72,36 54,36 50,64 62,64" />
</svg>
`;

document.addEventListener("DOMContentLoaded", () => {
  // Injects components into standard placeholder elements
  injectNavbar();
  injectCartDrawer();
  injectFooter();
  injectMobileNav();

  // Initialize event listeners
  initComponentListeners();
  
  // Update UI with initial cart values
  updateCartDrawerUI();
  updateNavbarCartCount();
});

// 1. Inject Navbar
function injectNavbar() {
  const header = document.querySelector("header");
  if (!header) return;

  const currentPath = window.location.pathname;
  const isIndex = currentPath.endsWith("index.html") || currentPath === "/" || currentPath.endsWith("waid%20web/") || currentPath.endsWith("waid web/");
  const isShop = currentPath.endsWith("shop.html");
  const isOrders = currentPath.endsWith("orders.html");

  header.innerHTML = `
    <div class="container navbar-container">
      <button class="nav-icon menu-toggle" aria-label="Toggle Navigation Menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <a href="index.html" class="nav-logo">
        ${WAID_LOGO_SVG}
        <span style="font-family: var(--font-serif); font-weight: 700; letter-spacing: 0.1em;">WAID</span>
      </a>

      <nav>
        <ul class="nav-links">
          <li><a href="index.html" class="${isIndex ? 'active' : ''}">Home</a></li>
          <li><a href="shop.html" class="${isShop ? 'active' : ''}">Shop Collection</a></li>
          <li><a href="index.html#craftsmanship">Craftsmanship</a></li>
          <li><a href="orders.html" class="${isOrders ? 'active' : ''}">My Orders</a></li>
        </ul>
      </nav>

      <div class="nav-actions">
        <a href="orders.html" class="nav-icon" aria-label="Account / Order Dashboard">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </a>
        
        <button class="nav-icon open-cart-btn" aria-label="View Shopping Cart">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span class="cart-count">0</span>
        </button>
      </div>
    </div>
  `;

  // Dynamic header class on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// 2. Inject Cart Drawer
function injectCartDrawer() {
  // Check if drawer overlay already exists
  if (document.querySelector(".cart-drawer-overlay")) return;

  const overlay = document.createElement("div");
  overlay.className = "cart-drawer-overlay";
  
  overlay.innerHTML = `
    <div class="cart-drawer">
      <div class="cart-drawer-header">
        <h2>Shopping Bag</h2>
        <button class="cart-close-btn" aria-label="Close Cart">&times;</button>
      </div>
      
      <div class="cart-drawer-items">
        <!-- Rendered dynamically -->
      </div>
      
      <div class="cart-drawer-footer">
        <form class="cart-promo-form" id="cart-promo-form">
          <input type="text" class="cart-promo-input" placeholder="Promo Code" id="promo-input">
          <button type="submit" class="cart-promo-btn">Apply</button>
        </form>
        
        <div id="promo-applied-container"></div>

        <div class="cart-totals">
          <div class="cart-total-row">
            <span>Subtotal</span>
            <span id="cart-subtotal">$0.00</span>
          </div>
          <div class="cart-total-row discount" id="cart-discount-row" style="display: none;">
            <span>Discount</span>
            <span id="cart-discount">-$0.00</span>
          </div>
          <div class="cart-total-row">
            <span>Estimated Shipping</span>
            <span id="cart-shipping">$0.00</span>
          </div>
          <div class="cart-total-row">
            <span>Estimated Tax (8%)</span>
            <span id="cart-tax">$0.00</span>
          </div>
          <div class="cart-total-row grand-total">
            <span>Total</span>
            <span id="cart-total">$0.00</span>
          </div>
        </div>
        
        <a href="checkout.html" class="btn btn-primary" style="width: 100%; text-align: center;">Proceed to Checkout</a>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
}

// 3. Inject Footer
function injectFooter() {
  const footer = document.querySelector("footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h2>
            ${WAID_LOGO_SVG}
            <span>WAID</span>
          </h2>
          <p>Handcrafting the finest Italian leather footwear with a commitment to luxury, minimal design, and traditional craftsmanship.</p>
          <div class="footer-socials">
            <a href="#" class="social-icon" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" class="social-icon" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" class="social-icon" aria-label="Pinterest">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
            </a>
          </div>
        </div>
        
        <div class="footer-column">
          <h3>Collection</h3>
          <ul class="footer-links">
            <li><a href="shop.html?category=Oxfords">Oxfords</a></li>
            <li><a href="shop.html?category=Boots">Chelsea Boots</a></li>
            <li><a href="shop.html?category=Loafers">Penny Loafers</a></li>
            <li><a href="shop.html">Browse All</a></li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h3>Company</h3>
          <ul class="footer-links">
            <li><a href="index.html#craftsmanship">Our Craft</a></li>
            <li><a href="#">Brand Story</a></li>
            <li><a href="orders.html">My Orders</a></li>
            <li><a href="#">Customer Support</a></li>
          </ul>
        </div>
        
        <div class="footer-column-large footer-newsletter">
          <h3>Newsletter</h3>
          <p>Subscribe to receive private collection releases, styling advice, and exclusive brand events.</p>
          <form class="newsletter-form" id="newsletter-form">
            <input type="email" class="newsletter-input" placeholder="Your email address" required aria-label="Email address for newsletter">
            <button type="submit" class="newsletter-submit" aria-label="Submit subscription">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2026 WAID. All Rights Reserved.</p>
        <div class="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  `;

  // Newsletter submit simulation
  const newsForm = footer.querySelector("#newsletter-form");
  if (newsForm) {
    newsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = newsForm.querySelector(".newsletter-input").value;
      newsForm.reset();
      showToast(`Thank you! ${email} has been subscribed.`);
    });
  }
}

// 4. Inject Mobile Nav Drawer
function injectMobileNav() {
  if (document.querySelector(".mobile-nav-overlay")) return;

  const overlay = document.createElement("div");
  overlay.className = "mobile-nav-overlay";
  overlay.innerHTML = `
    <button class="cart-close-btn close-menu-btn" style="position: absolute; top: 2rem; left: 2rem; color: var(--color-white);" aria-label="Close menu">&times;</button>
    <ul class="mobile-nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="shop.html">Shop Collection</a></li>
      <li><a href="index.html#craftsmanship">Craftsmanship</a></li>
      <li><a href="orders.html">My Orders</a></li>
    </ul>
  `;

  document.body.appendChild(overlay);
}

// 5. Initialize listeners
function initComponentListeners() {
  const cartOverlay = document.querySelector(".cart-drawer-overlay");
  const cartDrawer = document.querySelector(".cart-drawer");
  const mobileNav = document.querySelector(".mobile-nav-overlay");
  
  // Cart open buttons
  document.querySelectorAll(".open-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      cartOverlay.classList.add("active");
      cartDrawer.classList.add("active");
    });
  });

  // Cart close buttons
  const closeCart = () => {
    cartOverlay.classList.remove("active");
    cartDrawer.classList.remove("active");
  };
  
  document.querySelectorAll(".cart-close-btn").forEach(btn => {
    if (!btn.classList.contains("close-menu-btn")) {
      btn.addEventListener("click", closeCart);
    }
  });

  cartOverlay.addEventListener("click", (e) => {
    if (e.target === cartOverlay) closeCart();
  });

  // Mobile menu open
  document.querySelectorAll(".menu-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      mobileNav.classList.add("active");
    });
  });

  // Mobile menu close
  const closeMenu = () => {
    mobileNav.classList.remove("active");
  };
  
  document.querySelectorAll(".close-menu-btn").forEach(btn => {
    btn.addEventListener("click", closeMenu);
  });

  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Promo code form in cart drawer
  const promoForm = document.querySelector("#cart-promo-form");
  if (promoForm) {
    promoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.querySelector("#promo-input");
      if (input && input.value.trim()) {
        applyPromoCode(input.value);
        input.value = "";
      }
    });
  }

  // Listening to cart update event
  window.addEventListener("cartUpdated", () => {
    updateCartDrawerUI();
    updateNavbarCartCount();
  });
}

// 6. Update cart badge count in navbar
function updateNavbarCartCount() {
  const countBadge = document.querySelector(".cart-count");
  if (!countBadge) return;
  
  const cart = getCart();
  const totalQty = cart.reduce((count, item) => count + item.quantity, 0);
  
  countBadge.textContent = totalQty;
  
  // Add a nice subtle bounce micro-animation to cart badge
  countBadge.style.transform = "scale(1.2)";
  setTimeout(() => {
    countBadge.style.transform = "scale(1)";
  }, 200);
}

// 7. Update Cart Drawer HTML and Totals
function updateCartDrawerUI() {
  const cartContainer = document.querySelector(".cart-drawer-items");
  if (!cartContainer) return;

  const cart = getCart();
  
  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="cart-empty-message">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p>Your shopping bag is currently empty.</p>
        <a href="shop.html" class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.8rem 1.6rem;">Explore Collection</a>
      </div>
    `;
    
    // Hide totals and promo form, modify button
    document.querySelector(".cart-totals").style.display = "none";
    document.querySelector("#cart-promo-form").style.display = "none";
    document.querySelector(".cart-drawer-footer .btn-primary").style.display = "none";
    document.querySelector("#promo-applied-container").innerHTML = "";
    return;
  }

  // Show totals and promo form, modify button
  document.querySelector(".cart-totals").style.display = "flex";
  document.querySelector("#cart-promo-form").style.display = "grid";
  document.querySelector(".cart-drawer-footer .btn-primary").style.display = "block";

  // Build items list HTML
  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <div>
          <h3 class="cart-item-name">${item.name}</h3>
          <p class="cart-item-meta">Color: ${item.color} | Size: ${item.size}</p>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn minus" onclick="updateQuantity('${item.id}', ${item.size}, ${item.quantity - 1})">-</button>
          <span class="qty-val">${item.quantity}</span>
          <button class="qty-btn plus" onclick="updateQuantity('${item.id}', ${item.size}, ${item.quantity + 1})">+</button>
        </div>
      </div>
      <div class="cart-item-price-remove">
        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
        <button class="cart-item-remove" onclick="removeFromCart('${item.id}', ${item.size})">Remove</button>
      </div>
    </div>
  `).join("");

  // Update totals
  const totals = getCartTotals();
  document.querySelector("#cart-subtotal").textContent = `$${totals.subtotal.toFixed(2)}`;
  
  const discountRow = document.querySelector("#cart-discount-row");
  const discountVal = document.querySelector("#cart-discount");
  if (totals.discount > 0) {
    discountRow.style.display = "flex";
    discountVal.textContent = `-$${totals.discount.toFixed(2)}`;
  } else {
    discountRow.style.display = "none";
  }

  document.querySelector("#cart-shipping").textContent = totals.shipping === 0 ? "Free" : `$${totals.shipping.toFixed(2)}`;
  document.querySelector("#cart-tax").textContent = `$${totals.tax.toFixed(2)}`;
  document.querySelector("#cart-total").textContent = `$${totals.total.toFixed(2)}`;

  // Update promo banner
  const promoContainer = document.querySelector("#promo-applied-container");
  if (totals.promo) {
    promoContainer.innerHTML = `
      <div class="promo-applied-tag">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
        <span>${totals.promo.code} Applied</span>
        <button class="promo-remove-btn" onclick="removePromoCode()">&times;</button>
      </div>
    `;
    document.querySelector("#cart-promo-form").style.display = "none";
  } else {
    promoContainer.innerHTML = "";
    document.querySelector("#cart-promo-form").style.display = "grid";
  }
}
