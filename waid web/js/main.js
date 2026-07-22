// WAID Leather Shoe Store - Core Application Logic

document.addEventListener("DOMContentLoaded", () => {
  // Page entry animation
  initPageTransition();

  // Scroll reveal setup
  initScrollReveal();

  // Detect and run page-specific logic
  if (document.getElementById("home-new-arrivals")) {
    initHomePage();
  }
  if (document.getElementById("products-grid")) {
    initShopPage();
  }
  if (document.getElementById("product-detail-container")) {
    initProductDetailPage();
  }
  if (document.getElementById("checkout-container")) {
    initCheckoutPage();
  }
  if (document.getElementById("orders-container")) {
    initOrdersPage();
  }
});

// 1. Page transition loader
function initPageTransition() {
  const loader = document.createElement("div");
  loader.className = "page-transition-loader animate-out";
  document.body.appendChild(loader);

  // Animate transition on clicking links
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("javascript:") || link.getAttribute("target") === "_blank") {
      return;
    }

    e.preventDefault();
    loader.className = "page-transition-loader animate-in";
    loader.addEventListener("transitionend", () => {
      window.location.href = href;
    });
  });
}

// 2. Scroll Reveal Animations
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    
    reveals.forEach(reveal => {
      const revealTop = reveal.getBoundingClientRect().top;
      if (revealTop < triggerBottom) {
        reveal.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  // Trigger once initially to check for elements above the fold
  setTimeout(revealOnScroll, 100);
}

// 3. Home Page Logic
function initHomePage() {
  const container = document.getElementById("home-new-arrivals");
  if (!container) return;

  // Render top 3 featured products
  const featured = PRODUCTS.slice(0, 3);
  container.innerHTML = featured.map(p => renderProductCard(p)).join("");
}

// 4. Shop Page Logic
function initShopPage() {
  const grid = document.getElementById("products-grid");
  const searchInput = document.getElementById("shop-search");
  const sortSelect = document.getElementById("shop-sort");
  const filterCategory = document.querySelectorAll(".filter-cat-btn");
  const activeFiltersContainer = document.getElementById("active-filters");

  let activeCategory = "All";
  let activeSearch = "";
  let activeSort = "popular";

  // Parse URL query parameter for category (e.g. ?category=Boots)
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get("category");
  if (catParam) {
    activeCategory = catParam;
    filterCategory.forEach(btn => {
      if (btn.dataset.category.toLowerCase() === catParam.toLowerCase()) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  const renderGrid = () => {
    let filtered = PRODUCTS.filter(p => {
      const matchCat = activeCategory === "All" || p.category.toLowerCase() === activeCategory.toLowerCase();
      const matchSearch = p.name.toLowerCase().includes(activeSearch.toLowerCase()) || 
                          p.color.toLowerCase().includes(activeSearch.toLowerCase()) ||
                          p.description.toLowerCase().includes(activeSearch.toLowerCase());
      return matchCat && matchSearch;
    });

    // Sorting
    if (activeSort === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (activeSort === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (activeSort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 0; color: var(--color-text-muted);">
          <p style="font-size: 1.2rem; font-family: var(--font-serif); margin-bottom: 1rem;">No shoes found matching your criteria.</p>
          <button class="btn btn-secondary" onclick="resetFilters()">Reset Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(p => renderProductCard(p)).join("");
    
    // Trigger scroll reveal checking on newly rendered cards
    const cardReveals = grid.querySelectorAll(".reveal");
    setTimeout(() => {
      cardReveals.forEach(r => r.classList.add("active"));
    }, 50);
  };

  // Event Listeners
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeSearch = e.target.value;
      renderGrid();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeSort = e.target.value;
      renderGrid();
    });
  }

  filterCategory.forEach(btn => {
    btn.addEventListener("click", () => {
      filterCategory.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.category;
      renderGrid();
    });
  });

  // Global window functions for reset button
  window.resetFilters = () => {
    if (searchInput) searchInput.value = "";
    activeSearch = "";
    activeCategory = "All";
    filterCategory.forEach(b => {
      if (b.dataset.category === "All") b.classList.add("active");
      else b.classList.remove("active");
    });
    if (sortSelect) sortSelect.value = "popular";
    activeSort = "popular";
    renderGrid();
  };

  renderGrid();
}

// Helper: Render product card HTML
function renderProductCard(product) {
  return `
    <div class="product-card reveal">
      <div class="product-card-image-wrap">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" class="product-card-image">
        </a>
        ${product.badge ? `<span class="product-card-badge">${product.badge}</span>` : ""}
        <div class="product-card-sizes-overlay">
          <p class="sizes-title">Select Size</p>
          <div class="sizes-grid">
            ${product.sizes.map(size => `
              <button onclick="event.preventDefault(); addToCart('${product.id}', ${size}); openCartDrawer();" class="size-select-btn">${size}</button>
            `).join("")}
          </div>
        </div>
      </div>
      <div class="product-card-info">
        <span class="product-card-category">${product.category}</span>
        <h3 class="product-card-name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <p class="product-card-details">${product.color} | ★ ${product.rating.toFixed(1)}</p>
        <p class="product-card-price">$${product.price.toFixed(2)}</p>
      </div>
    </div>
  `;
}

// Global open cart helper for inline quick add sizes
window.openCartDrawer = () => {
  const overlay = document.querySelector(".cart-drawer-overlay");
  const drawer = document.querySelector(".cart-drawer");
  if (overlay && drawer) {
    overlay.classList.add("active");
    drawer.classList.add("active");
  }
};

// 5. Product Detail Page Logic
function initProductDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const container = document.getElementById("product-detail-container");
  
  if (!container) return;

  const product = getProductById(productId);

  if (!product) {
    container.innerHTML = `
      <div class="container section-padding" style="text-align: center;">
        <h2 style="margin-bottom: 2rem;">Product Not Found</h2>
        <p style="margin-bottom: 2rem;">The leather shoe model you are looking for does not exist in our catalog.</p>
        <a href="shop.html" class="btn btn-primary">Return to Shop</a>
      </div>
    `;
    return;
  }

  // Set page meta title
  document.title = `${product.name} | WAID Premium Leather Footwear`;

  // Render product details HTML
  container.innerHTML = `
    <div class="product-detail-grid">
      <!-- Image Gallery -->
      <div class="product-gallery">
        <div class="main-image-container">
          <img src="${product.image}" id="main-product-img" alt="${product.name}">
        </div>
        <div class="thumbnail-list">
          ${product.images.map((img, index) => `
            <div class="thumb-item ${index === 0 ? 'active' : ''}" onclick="changeProductImage('${img}', this)">
              <img src="${img}" alt="${product.name} angle ${index + 1}">
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Product Meta Info -->
      <div class="product-meta-panel">
        ${product.badge ? `<span class="badge badge-accent" style="margin-bottom: 1rem;">${product.badge}</span>` : ""}
        <h1 class="product-title">${product.name}</h1>
        <div class="product-price-rating">
          <span class="product-detail-price">$${product.price.toFixed(2)}</span>
          <span class="product-detail-rating">★ ${product.rating.toFixed(1)} <span class="reviews-count">(${product.reviewsCount} reviews)</span></span>
        </div>
        
        <p class="product-detail-desc">${product.description}</p>
        
        <hr class="divider">
        
        <!-- Color Option -->
        <div class="detail-option-group">
          <span class="option-label">Color: <strong>${product.color}</strong></span>
          <div style="display: flex; gap: 0.8rem; align-items: center; margin-top: 0.5rem;">
            <span style="display: inline-block; width: 24px; height: 24px; border-radius: 50%; background-color: ${product.colorHex}; border: 1px solid var(--color-border); box-shadow: 0 0 0 2px var(--color-bg-primary), 0 0 0 3px var(--color-primary);"></span>
          </div>
        </div>

        <!-- Size Selector -->
        <div class="detail-option-group">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="option-label">Select US Size</span>
            <a href="#size-modal" class="size-chart-link" onclick="openSizeChartModal(event)">Size Guide</a>
          </div>
          <div class="detail-size-grid" id="detail-sizes">
            ${product.sizes.map(size => `
              <button class="detail-size-btn" onclick="selectDetailSize(this, ${size})">${size}</button>
            `).join("")}
          </div>
          <input type="hidden" id="selected-product-size" value="">
        </div>

        <!-- Quantity Selector & Action Button -->
        <div class="detail-actions">
          <div class="detail-qty-stepper">
            <button onclick="decrementDetailQty()">-</button>
            <span id="detail-qty-val">1</span>
            <button onclick="incrementDetailQty()">+</button>
          </div>
          <button class="btn btn-primary add-to-cart-action-btn" onclick="triggerDetailAddToCart('${product.id}')" style="flex: 1;">Add to Bag</button>
        </div>
        
        <hr class="divider">

        <!-- Luxury accordion tabs -->
        <div class="product-accordion">
          <div class="accordion-item active">
            <button class="accordion-header" onclick="toggleAccordion(this)">
              <span>The Craftsmanship & Details</span>
              <svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="accordion-content" style="display: block;">
              <ul class="accordion-list">
                ${product.specs.map(spec => `<li>${spec}</li>`).join("")}
              </ul>
            </div>
          </div>
          
          <div class="accordion-item">
            <button class="accordion-header" onclick="toggleAccordion(this)">
              <span>Leather Care Guide</span>
              <svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="accordion-content">
              <ul class="accordion-list">
                ${product.care.map(tip => `<li>${tip}</li>`).join("")}
              </ul>
            </div>
          </div>
          
          <div class="accordion-item">
            <button class="accordion-header" onclick="toggleAccordion(this)">
              <span>Complimentary Shipping & Returns</span>
              <svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="accordion-content">
              <p>We are pleased to offer complimentary standard shipping on all orders over $300. Standard shipping on orders below $300 is charged at $15.00 flat rate.</p>
              <p style="margin-top: 0.8rem;">We accept returns of unworn, undamaged shoes in original packaging within 30 days of shipment receipt. Return shipping labels are complimentary.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Global functions specifically bound for detail template
  window.changeProductImage = (src, thumbEl) => {
    document.getElementById("main-product-img").src = src;
    document.querySelectorAll(".thumb-item").forEach(el => el.classList.remove("active"));
    thumbEl.classList.add("active");
  };

  window.selectDetailSize = (btnEl, size) => {
    document.querySelectorAll(".detail-size-btn").forEach(el => el.classList.remove("active"));
    btnEl.classList.add("active");
    document.getElementById("selected-product-size").value = size;
  };

  let detailQty = 1;
  window.incrementDetailQty = () => {
    detailQty++;
    document.getElementById("detail-qty-val").textContent = detailQty;
  };
  window.decrementDetailQty = () => {
    if (detailQty > 1) {
      detailQty--;
      document.getElementById("detail-qty-val").textContent = detailQty;
    }
  };

  window.triggerDetailAddToCart = (id) => {
    const size = document.getElementById("selected-product-size").value;
    if (!size) {
      showToast("Please choose a size.", "error");
      return;
    }
    const btn = document.querySelector(".add-to-cart-action-btn");
    btn.innerHTML = `<span class="spinner-small"></span> Adding...`;
    btn.disabled = true;
    
    setTimeout(() => {
      addToCart(id, parseInt(size), detailQty);
      btn.innerHTML = "Add to Bag";
      btn.disabled = false;
      
      // Auto open the side drawer
      setTimeout(openCartDrawer, 300);
    }, 800);
  };

  window.toggleAccordion = (headerEl) => {
    const item = headerEl.parentElement;
    const content = item.querySelector(".accordion-content");
    const isActive = item.classList.contains("active");
    
    // Close other items
    document.querySelectorAll(".accordion-item").forEach(el => {
      el.classList.remove("active");
      el.querySelector(".accordion-content").style.display = "none";
    });

    if (!isActive) {
      item.classList.add("active");
      content.style.display = "block";
    }
  };

  window.openSizeChartModal = (e) => {
    e.preventDefault();
    let sizeModal = document.querySelector(".size-modal-overlay");
    if (!sizeModal) {
      sizeModal = document.createElement("div");
      sizeModal.className = "size-modal-overlay";
      sizeModal.innerHTML = `
        <div class="size-modal">
          <button class="size-modal-close" onclick="closeSizeChartModal()">&times;</button>
          <h2>Shoe Size Equivalents</h2>
          <table class="size-chart-table">
            <thead>
              <tr>
                <th>US Size</th>
                <th>UK Size</th>
                <th>EU Size</th>
                <th>Foot Length (inches)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>7</td><td>6</td><td>40</td><td>9.6"</td></tr>
              <tr><td>8</td><td>7</td><td>41</td><td>9.9"</td></tr>
              <tr><td>9</td><td>8</td><td>42</td><td>10.2"</td></tr>
              <tr><td>10</td><td>9</td><td>43</td><td>10.6"</td></tr>
              <tr><td>11</td><td>10</td><td>44</td><td>10.9"</td></tr>
              <tr><td>12</td><td>11</td><td>45</td><td>11.2"</td></tr>
            </tbody>
          </table>
          <p style="margin-top: 1.5rem; font-size: 0.8rem; color: var(--color-text-muted);">* WAID shoes run true to size. If you are between sizes, we recommend ordering the smaller size.</p>
        </div>
      `;
      document.body.appendChild(sizeModal);
    }
    setTimeout(() => sizeModal.classList.add("active"), 10);
  };

  window.closeSizeChartModal = () => {
    const sizeModal = document.querySelector(".size-modal-overlay");
    if (sizeModal) {
      sizeModal.classList.remove("active");
    }
  };
}

// 6. Checkout Page Logic
function initCheckoutPage() {
  const orderSummaryList = document.getElementById("checkout-summary-items");
  const billingSummary = document.getElementById("checkout-billing-details");
  const checkoutForm = document.getElementById("checkout-steps-form");

  if (!orderSummaryList) return;

  const cart = getCart();
  if (cart.length === 0) {
    window.location.href = "shop.html";
    return;
  }

  // Render checkout cart items
  orderSummaryList.innerHTML = cart.map(item => `
    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.2rem;">
      <div style="width: 54px; height: 54px; background-color: var(--color-bg-secondary); overflow: hidden; border: 1px solid var(--color-border); position: relative;">
        <img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;">
        <span style="position: absolute; top:-6px; right:-6px; background-color:var(--color-primary); color:white; font-size:0.65rem; width:16px; height:16px; border-radius:50%; display:flex; align-items:center; justify-content:center;">${item.quantity}</span>
      </div>
      <div style="flex:1;">
        <h4 style="font-family: var(--font-serif); font-size:0.9rem; color:var(--color-text-dark);">${item.name}</h4>
        <p style="font-size:0.75rem; color:var(--color-text-muted);">Size ${item.size} | Color: ${item.color}</p>
      </div>
      <span style="font-size:0.9rem; font-weight:500;">$${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  `).join("");

  // Update dynamic billing summary
  const updateBillingSummary = () => {
    const totals = getCartTotals();
    
    let discountHTML = "";
    if (totals.discount > 0) {
      discountHTML = `
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--color-accent-dark); font-weight: 500;">
          <span>Promo Code Applied</span>
          <span>-$${totals.discount.toFixed(2)}</span>
        </div>
      `;
    }

    billingSummary.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 0.8rem; margin-top: 1rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
          <span>Subtotal</span>
          <span>$${totals.subtotal.toFixed(2)}</span>
        </div>
        ${discountHTML}
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
          <span>Shipping</span>
          <span>${totals.shipping === 0 ? "Free" : `$${totals.shipping.toFixed(2)}`}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
          <span>Estimated Sales Tax</span>
          <span>$${totals.tax.toFixed(2)}</span>
        </div>
        <hr style="border: 0; border-top: 1px solid var(--color-border); margin: 0.5rem 0;">
        <div style="display: flex; justify-content: space-between; font-family: var(--font-serif); font-size: 1.3rem; color: var(--color-text-dark); font-weight: 500;">
          <span>Total</span>
          <span>$${totals.total.toFixed(2)}</span>
        </div>
      </div>
    `;
  };

  updateBillingSummary();

  // Credit card number auto-formatting helper
  const cardInput = document.getElementById("cc-number");
  if (cardInput) {
    cardInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      let matches = value.match(/\d{4,16}/g);
      let match = matches && matches[0] || '';
      let parts = [];

      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }

      if (parts.length > 0) {
        e.target.value = parts.join(' ');
      } else {
        e.target.value = value;
      }
    });
  }

  // Credit card expiry formatting (MM / YY)
  const expiryInput = document.getElementById("cc-expiry");
  if (expiryInput) {
    expiryInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      if (value.length > 2) {
        e.target.value = value.substring(0, 2) + " / " + value.substring(2, 4);
      } else {
        e.target.value = value;
      }
    });
  }

  // Handle Order Placement
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Show luxury loader overlay simulating processing steps
      const processingOverlay = document.createElement("div");
      processingOverlay.className = "processing-payment-overlay";
      processingOverlay.innerHTML = `
        <div class="processing-card">
          <div class="spinner-large"></div>
          <h3 id="process-step-title">Securing Connection...</h3>
          <p>Please do not refresh the page or click back.</p>
        </div>
      `;
      document.body.appendChild(processingOverlay);

      const stepTitles = [
        "Securing Connection...",
        "Authorizing Transaction...",
        "Confirming with Bank...",
        "Finalizing Invoice...",
        "Order Confirmed!"
      ];

      let currentStep = 0;
      const stepInterval = setInterval(() => {
        currentStep++;
        const titleEl = document.getElementById("process-step-title");
        if (titleEl && stepTitles[currentStep]) {
          titleEl.textContent = stepTitles[currentStep];
        }

        if (currentStep === stepTitles.length - 1) {
          clearInterval(stepInterval);
          
          // Generate simulated Order details
          const totals = getCartTotals();
          const email = document.getElementById("email").value;
          const firstName = document.getElementById("first-name").value;
          const lastName = document.getElementById("last-name").value;
          const address = document.getElementById("address").value;
          const city = document.getElementById("city").value;
          const zip = document.getElementById("zip").value;
          
          const orderNum = "WD-" + Math.floor(100000 + Math.random() * 900000);
          const orderDate = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
          
          const order = {
            orderNumber: orderNum,
            date: orderDate,
            shippingAddress: {
              name: `${firstName} ${lastName}`,
              address: address,
              city: city,
              zip: zip
            },
            email: email,
            items: cart,
            totals: totals,
            status: "Processing"
          };

          // Save to orders history
          const orders = localStorage.getItem("waid_orders") ? JSON.parse(localStorage.getItem("waid_orders")) : [];
          orders.unshift(order); // Put new order first
          localStorage.setItem("waid_orders", JSON.stringify(orders));

          // Clear cart
          clearCart();

          // Redirect to orders summary
          setTimeout(() => {
            processingOverlay.remove();
            window.location.href = "orders.html?newOrder=" + orderNum;
          }, 800);
        }
      }, 1200);
    });
  }
}

// 7. Orders Page Logic
function initOrdersPage() {
  const container = document.getElementById("orders-container");
  if (!container) return;

  const orders = localStorage.getItem("waid_orders") ? JSON.parse(localStorage.getItem("waid_orders")) : [];
  
  // Check if we just redirected from a new order
  const urlParams = new URLSearchParams(window.location.search);
  const newOrderNum = urlParams.get("newOrder");

  if (newOrderNum) {
    const newOrder = orders.find(o => o.orderNumber === newOrderNum);
    if (newOrder) {
      renderNewOrderConfirmation(container, newOrder);
      return;
    }
  }

  // Regular order history
  if (orders.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 6rem 0;">
        <h2 style="margin-bottom: 1.5rem; font-family: var(--font-serif);">No Orders Placed Yet</h2>
        <p style="margin-bottom: 2rem; color: var(--color-text-muted);">Explore our signature collection of luxury shoes to place your first order.</p>
        <a href="shop.html" class="btn btn-primary">Shop Collection</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <h1 style="font-family: var(--font-serif); font-size: 2.2rem; margin-bottom: 3rem; text-align: center;">Your Orders History</h1>
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      ${orders.map(order => `
        <div class="order-history-card">
          <div class="order-header">
            <div>
              <span class="order-meta-label">ORDER PLACED</span>
              <span class="order-meta-val">${order.date}</span>
            </div>
            <div>
              <span class="order-meta-label">TOTAL</span>
              <span class="order-meta-val">$${order.totals.total.toFixed(2)}</span>
            </div>
            <div>
              <span class="order-meta-label">SHIP TO</span>
              <span class="order-meta-val">${order.shippingAddress.name}</span>
            </div>
            <div style="margin-left: auto; text-align: right;">
              <span class="order-meta-label">ORDER # ${order.orderNumber}</span>
              <span class="badge badge-success" style="margin-top: 0.3rem;">${order.status}</span>
            </div>
          </div>
          
          <div class="order-body">
            <div class="order-items-column">
              ${order.items.map(item => `
                <div class="order-item-row">
                  <div class="order-item-img">
                    <img src="${item.image}" alt="${item.name}">
                  </div>
                  <div>
                    <h4 style="font-family: var(--font-serif); font-size: 1rem; color: var(--color-text-dark);">${item.name}</h4>
                    <p style="font-size: 0.8rem; color: var(--color-text-muted);">Size: ${item.size} | Color: ${item.color} | Qty: ${item.quantity}</p>
                    <a href="product.html?id=${item.id}" class="btn-text" style="font-size: 0.7rem; margin-top: 0.5rem; letter-spacing: 0.05em;">View Item Again</a>
                  </div>
                  <span style="margin-left: auto; font-weight: 500; font-size: 0.95rem;">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              `).join("")}
            </div>

            <div class="order-status-column">
              <h4>Delivery Estimation</h4>
              <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">Arriving in 3-5 business days.</p>
              
              <!-- Progress tracking bar -->
              <div class="tracking-progress-bar">
                <div class="progress-line">
                  <div class="progress-fill" style="width: 25%;"></div>
                </div>
                <div class="tracking-nodes">
                  <div class="node active">
                    <span class="node-dot"></span>
                    <span class="node-label">Confirmed</span>
                  </div>
                  <div class="node">
                    <span class="node-dot"></span>
                    <span class="node-label">Shipped</span>
                  </div>
                  <div class="node">
                    <span class="node-dot"></span>
                    <span class="node-label">Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// Render Order Success/Confirmation Layout
function renderNewOrderConfirmation(container, order) {
  // Update document title for success state
  document.title = "Order Confirmed | WAID";

  container.innerHTML = `
    <div style="max-width: 680px; margin: 0 auto; padding: 2rem 0; text-align: center;">
      <!-- Success Icon -->
      <div style="width: 72px; height: 72px; border-radius: 50%; background-color: rgba(45, 90, 39, 0.1); color: var(--color-success); display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem auto;">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      
      <h1 style="font-family: var(--font-serif); font-size: 2.5rem; margin-bottom: 0.5rem;">Thank you for your order</h1>
      <p style="color: var(--color-text-muted); margin-bottom: 3rem;">A confirmation email has been sent to <strong>${order.email}</strong>. We will notify you as soon as your shoes ship.</p>
      
      <div class="order-receipt-card" style="text-align: left; background-color: var(--color-bg-secondary); border: 1px solid var(--color-border); padding: 2.5rem; margin-bottom: 3rem;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 1.2rem; margin-bottom: 1.5rem;">
          <div>
            <span style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Order Number</span>
            <h3 style="font-family: var(--font-sans); font-size: 1.1rem; font-weight: 600; color: var(--color-primary);">${order.orderNumber}</h3>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Date</span>
            <h3 style="font-family: var(--font-sans); font-size: 1.1rem; font-weight: 500; color: var(--color-text-dark);">${order.date}</h3>
          </div>
        </div>

        <h4 style="font-family: var(--font-sans); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1rem; color: var(--color-text-dark);">Items Ordered</h4>
        <div style="border-bottom: 1px solid var(--color-border); padding-bottom: 1rem; margin-bottom: 1.5rem;">
          ${order.items.map(item => `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; font-size: 0.9rem;">
              <span>${item.name} (Size ${item.size}) <span style="color: var(--color-text-muted);">x${item.quantity}</span></span>
              <span style="font-weight: 500;">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          `).join("")}
        </div>

        <div style="display: flex; gap: 2rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1.5rem;">
          <div style="flex: 1; font-size: 0.85rem;">
            <h4 style="font-family: var(--font-sans); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.5rem; color: var(--color-text-dark);">Shipping Address</h4>
            <p style="color: var(--color-text-muted);">${order.shippingAddress.name}</p>
            <p style="color: var(--color-text-muted);">${order.shippingAddress.address}</p>
            <p style="color: var(--color-text-muted);">${order.shippingAddress.city}, ${order.shippingAddress.zip}</p>
          </div>
          <div style="flex: 1; font-size: 0.85rem;">
            <h4 style="font-family: var(--font-sans); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.5rem; color: var(--color-text-dark);">Payment Method</h4>
            <p style="color: var(--color-text-muted);">Credit Card ending in ****</p>
            <p style="color: var(--color-text-muted);">Simulated Sandbox Payment</p>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.85rem;">
          <div style="display: flex; justify-content: space-between;">
            <span>Subtotal</span>
            <span>$${order.totals.subtotal.toFixed(2)}</span>
          </div>
          ${order.totals.discount > 0 ? `
            <div style="display: flex; justify-content: space-between; color: var(--color-accent-dark); font-weight: 500;">
              <span>Promo Discount</span>
              <span>-$${order.totals.discount.toFixed(2)}</span>
            </div>
          ` : ''}
          <div style="display: flex; justify-content: space-between;">
            <span>Shipping</span>
            <span>${order.totals.shipping === 0 ? "Free" : `$${order.totals.shipping.toFixed(2)}`}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Sales Tax (8%)</span>
            <span>$${order.totals.tax.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-family: var(--font-serif); font-size: 1.15rem; font-weight: 600; color: var(--color-text-dark); margin-top: 0.4rem; border-top: 1px dashed var(--color-border); padding-top: 0.6rem;">
            <span>Total Paid</span>
            <span>$${order.totals.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: center;">
        <a href="shop.html" class="btn btn-secondary">Continue Shopping</a>
        <a href="orders.html" class="btn btn-primary">Track Order</a>
      </div>
    </div>
  `;
}
