// WAID Luxury Leather Footwear - Core Application logic

/* ==========================================
   Reliable background scroll lock (works around the
   iOS/Android quirk where `overflow:hidden` on body alone
   doesn't stop the page scrolling behind a fixed overlay).
   Supports being locked by more than one overlay at once
   (e.g. menu + modal) without unlocking too early.
   ========================================== */
let scrollLockCount = 0;
let savedScrollY = 0;

function lockBodyScroll() {
  if (scrollLockCount === 0) {
    savedScrollY = window.scrollY || window.pageYOffset || 0;
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  }
  scrollLockCount++;
}

function unlockBodyScroll() {
  if (scrollLockCount === 0) return;
  scrollLockCount--;
  if (scrollLockCount === 0) {
    document.documentElement.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo({ top: savedScrollY, left: 0, behavior: "instant" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Fill in all text/images/links from js/content.js
  hydrateSiteContent();

  // Initialize grid
  initCollectionGrid();

  // Scroll reveal animations
  initScrollReveal();

  // Scroll active section highlighter and header resize
  initScrollEffects();

  // Mobile menu controls
  initMobileMenu();

  // Modal setup
  initModalListeners();

  // Inquiry form submit
  initInquiryForm();

  // Craft stages motion reel
  initProcessReel();
});

/* ==========================================
   Content Hydration — reads js/content.js (SITE_CONTENT)
   and fills in every bound element on the page. This is
   what lets the whole site be edited from one file.
   ========================================== */
function getByPath(obj, path) {
  return path.split(".").reduce((val, key) => (val == null ? val : val[key]), obj);
}

function hydrateSiteContent() {
  // Page title & meta tags
  document.title = SITE_CONTENT.brand.pageTitle;
  const descMeta = document.getElementById("page-description");
  if (descMeta) descMeta.setAttribute("content", SITE_CONTENT.brand.pageDescription);
  const keywordsMeta = document.getElementById("page-keywords");
  if (keywordsMeta) keywordsMeta.setAttribute("content", SITE_CONTENT.brand.pageKeywords);

  // Plain text content
  document.querySelectorAll("[data-content]").forEach(el => {
    const value = getByPath(SITE_CONTENT, el.getAttribute("data-content"));
    if (value != null) el.textContent = value;
  });

  // Raw HTML content (for headings that need <br> or <em>)
  document.querySelectorAll("[data-content-html]").forEach(el => {
    const value = getByPath(SITE_CONTENT, el.getAttribute("data-content-html"));
    if (value != null) el.innerHTML = value;
  });

  // Image sources
  document.querySelectorAll("[data-content-src]").forEach(el => {
    const value = getByPath(SITE_CONTENT, el.getAttribute("data-content-src"));
    if (value != null) el.setAttribute("src", value);
  });

  // Image alt text
  document.querySelectorAll("[data-content-alt]").forEach(el => {
    const value = getByPath(SITE_CONTENT, el.getAttribute("data-content-alt"));
    if (value != null) el.setAttribute("alt", value);
  });

  // Link hrefs
  document.querySelectorAll("[data-content-href]").forEach(el => {
    const value = getByPath(SITE_CONTENT, el.getAttribute("data-content-href"));
    if (value != null) el.setAttribute("href", value);
  });

  // mailto: links (value is just the email address)
  document.querySelectorAll("[data-content-href-mailto]").forEach(el => {
    const value = getByPath(SITE_CONTENT, el.getAttribute("data-content-href-mailto"));
    if (value != null) el.setAttribute("href", `mailto:${value}`);
  });

  // Background images (hero section)
  document.querySelectorAll("[data-content-bg]").forEach(el => {
    const value = getByPath(SITE_CONTENT, el.getAttribute("data-content-bg"));
    if (value != null) el.style.backgroundImage = `url('${value}')`;
  });

  renderNavLinks();
  renderHeritageStats();
  renderFooterLinks();
}

// Desktop nav bar + mobile drawer nav, both from SITE_CONTENT.nav
function renderNavLinks() {
  const desktopList = document.getElementById("nav-links-desktop");
  if (desktopList) {
    desktopList.innerHTML = SITE_CONTENT.nav.map((item, i) =>
      `<li><a href="${item.href}"${i === 0 ? ' class="active"' : ""}>${item.label}</a></li>`
    ).join("");
  }

  const mobileNav = document.getElementById("nav-links-mobile");
  if (mobileNav) {
    mobileNav.innerHTML = SITE_CONTENT.nav.map(item =>
      `<a href="${item.href}"><span>${item.label}</span></a>`
    ).join("");
  }
}

// Heritage stat trio (e.g. "200+ hand steps")
function renderHeritageStats() {
  const el = document.getElementById("heritage-stats");
  if (!el) return;
  el.innerHTML = SITE_CONTENT.heritage.stats.map(stat =>
    `<div class="heritage-stat"><strong>${stat.value}</strong><span>${stat.label}</span></div>`
  ).join("");
}

// Footer nav column, collections column, and legal links
function renderFooterLinks() {
  const navList = document.getElementById("footer-nav-links");
  if (navList) {
    navList.innerHTML = SITE_CONTENT.nav.map(item =>
      `<li><a href="${item.href}">${item.label}</a></li>`
    ).join("");
  }

  const collectionsList = document.getElementById("footer-collections-links");
  if (collectionsList) {
    collectionsList.innerHTML = SITE_CONTENT.footer.collectionsLinks.map(item =>
      `<li><a href="${item.href}">${item.label}</a></li>`
    ).join("");
  }

  const legalLinks = document.getElementById("footer-legal-links");
  if (legalLinks) {
    legalLinks.innerHTML = SITE_CONTENT.footer.legalLinks.map(item =>
      `<a href="${item.href}">${item.label}</a>`
    ).join("");
  }
}

/* ==========================================
   0. Craft Stages Reel (motion-graphic stage indicator)
   ========================================== */
function initProcessReel() {
  const track = document.getElementById("reel-track");
  if (!track) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        track.classList.add("in-view");
        obs.disconnect(); // one-time build-up, doesn't replay or loop
      }
    });
  }, { threshold: 0.4 });

  observer.observe(track);
}

/* ==========================================
   1. Scroll Reveal Animations
   ========================================== */
function initScrollReveal() {
  const revealOnScroll = () => {
    const reveals = document.querySelectorAll(".reveal");
    const triggerBottom = window.innerHeight * 0.85;

    reveals.forEach(reveal => {
      const revealTop = reveal.getBoundingClientRect().top;
      if (revealTop < triggerBottom) {
        reveal.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  // Trigger initial reveal check
  setTimeout(revealOnScroll, 100);
}

/* ==========================================
   2. Scroll Effects (Header & Section Links)
   ========================================== */
function initScrollEffects() {
  const header = document.querySelector("header");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section, main");

  window.addEventListener("scroll", () => {
    // 1. Resize header on scroll
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // 2. Highlight active navbar link
    let currentId = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // Offset matches header size
      if (window.scrollY >= sectionTop - 100) {
        currentId = section.getAttribute("id") || "";
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

/* ==========================================
   3. Mobile Navigation Drawer
   ========================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById("menu-toggle-btn");
  const closeBtn = document.getElementById("close-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const backdrop = document.getElementById("mobile-menu-backdrop");
  const mobileLinks = mobileMenu.querySelectorAll("a");

  const showMenu = () => {
    mobileMenu.classList.add("active");
    backdrop.classList.add("active");
    lockBodyScroll();
  };

  const hideMenu = () => {
    mobileMenu.classList.remove("active");
    backdrop.classList.remove("active");
    unlockBodyScroll();
  };

  toggleBtn.addEventListener("click", showMenu);
  closeBtn.addEventListener("click", hideMenu);
  backdrop.addEventListener("click", hideMenu);
  mobileLinks.forEach(link => link.addEventListener("click", hideMenu));

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      hideMenu();
    }
  });
}

/* ==========================================
   4. Collection Grid Rendering & Filters
   ========================================== */
function initCollectionGrid() {
  const grid = document.getElementById("products-grid");

  const renderGrid = () => {
    const filtered = getProductsByCategory("All");

    grid.innerHTML = filtered.map(p => `
      <div class="product-card reveal" onclick="openProductModal('${p.id}')">
        <div class="product-card-image-wrap">
          <img src="${p.image}" alt="${p.name}" class="product-card-image">
          ${p.badge ? `<span class="product-card-badge">${p.badge}</span>` : ""}
          <div class="product-card-overlay">
            <span class="view-detail-hint">Explore Details</span>
          </div>
        </div>
        <div class="product-card-info">
          <div class="product-card-text">
            <span class="product-card-category">${p.category}</span>
            <h3 class="product-card-name">${p.name}</h3>
          </div>
          <button type="button" class="card-inquire-btn" onclick="event.stopPropagation(); inquireProduct('${p.name}')">
            Inquire
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </div>
    `).join("");

    // Make new elements active
    setTimeout(() => {
      grid.querySelectorAll(".reveal").forEach(el => el.classList.add("active"));
    }, 50);
  };

  renderGrid();
}

/* ==========================================
   5. Dynamic Product Details Modal
   ========================================== */
function initModalListeners() {
  const overlay = document.getElementById("product-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  const closeModal = () => {
    overlay.classList.remove("active");
    unlockBodyScroll(); // Restore scrolling
  };

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  // Bind close to Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeModal();
    }
  });
}

window.openProductModal = (id) => {
  const product = getProductById(id);
  if (!product) return;

  const overlay = document.getElementById("product-modal");
  const content = document.getElementById("modal-detail-content");

  content.innerHTML = `
    <!-- Left: Image Gallery -->
    <div class="modal-gallery">
      <img src="${product.image}" alt="${product.name}">
    </div>
    
    <!-- Right: Text & Details Panel -->
    <div class="modal-info-panel">
      <span class="product-card-category" style="margin-bottom: 0.5rem; display: block;">${product.category}</span>
      <h2 class="modal-title">${product.name}</h2>
      <span class="modal-color">Patina: ${product.color}</span>

      <p class="modal-desc">${product.description}</p>
      
      <!-- Premium Accordion Tabs -->
      <div class="modal-accordion">
        <div class="accordion-item active">
          <button class="accordion-header" onclick="toggleModalAccordion(this)">
            <span>Specifications</span>
            <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="accordion-content" style="display: block;">
            <ul class="accordion-list">
              ${product.specs.map(spec => `<li>${spec}</li>`).join("")}
            </ul>
          </div>
        </div>

        <div class="accordion-item">
          <button class="accordion-header" onclick="toggleModalAccordion(this)">
            <span>Care Guide</span>
            <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="accordion-content">
            <ul class="accordion-list">
              ${product.care.map(tip => `<li>${tip}</li>`).join("")}
            </ul>
          </div>
        </div>

        <div class="accordion-item">
          <button class="accordion-header" onclick="toggleModalAccordion(this)">
            <span>Sizes Available</span>
            <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="accordion-content">
            <p>We craft pairs in standard US sizes (D width):</p>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.6rem;">
              ${product.sizes.map(s => `<span style="padding: 0.4rem 0.8rem; border: 1px solid var(--color-border); font-size: 0.8rem; font-weight: 500;">${s}</span>`).join("")}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Inquire Button -->
    <a href="#contact" class="modal-inquire-btn" onclick="event.preventDefault(); inquireProduct('${product.name}')">
      Inquire
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    </a>
  `;

  // Open modal and lock main body scroll
  overlay.classList.add("active");
  lockBodyScroll();
};

window.toggleModalAccordion = (headerEl) => {
  const item = headerEl.parentElement;
  const content = item.querySelector(".accordion-content");
  const isActive = item.classList.contains("active");

  // Close all accordions in modal
  document.querySelectorAll(".modal-accordion .accordion-item").forEach(el => {
    el.classList.remove("active");
    el.querySelector(".accordion-content").style.display = "none";
  });

  if (!isActive) {
    item.classList.add("active");
    content.style.display = "block";
  }
};

function openWhatsApp(message) {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener");
}

window.inquireProduct = (name) => {
  // Close modal
  document.getElementById("product-modal").classList.remove("active");
  unlockBodyScroll();

  // Go straight to WhatsApp with the product pre-filled in the message
  const message = fillTemplate(SITE_CONTENT.whatsappTemplates.productInquiry, { product: name });
  openWhatsApp(message);
};

/* ==========================================
   6. Contact / Inquiry Form Processing
   ========================================== */
function initInquiryForm() {
  const form = document.getElementById("inquiry-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("client-name").value.trim();
    const phone = document.getElementById("client-phone").value.trim();
    const email = document.getElementById("client-email").value.trim();
    const details = document.getElementById("client-message").value.trim();

    const message = fillTemplate(SITE_CONTENT.whatsappTemplates.formInquiry, {
      name, phone, email, message: details,
    });

    openWhatsApp(message);

    form.reset();
    showToast(`Thanks, ${name}! Opening WhatsApp to send your inquiry.`);
  });
}

// Toast Alert System
function showToast(message) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

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
