/* ==========================================================
   WAID SITE CONTENT — EDIT EVERYTHING HERE
   ==========================================================
   This is the ONE file you need to open to change the site's
   text, images, and links. The page automatically reads from
   this file when it loads — you don't need to touch index.html
   or main.js for everyday edits.

   To change a product (name, price, photos, description,
   specs, care instructions), edit js/products.js instead —
   that file is the product catalog.

   HOW TO EDIT:
   - Text: change anything between the quote marks, e.g.
       heading: "Elegance in Every Step"
     becomes
       heading: "Timeless Style, Made by Hand"
   - Images: change the file path to point at a different file
     inside the /assets folder (or upload a new image there
     and reference its filename).
   - Links: change the URL between the quote marks. For page
     sections (like "#collection") leave the # as is — that's
     how the page scrolls to that section.
   - Don't remove the commas at the end of lines, or the
     quote marks around text.
   ========================================================== */

const SITE_CONTENT = {

  /* ---------- Brand basics ---------- */
  brand: {
    name: "WAID",
    logo: "assets/logo_only.png",
    // Shown in the browser tab
    pageTitle: "WAID | Handcrafted Luxury Leather Footwear",
    pageDescription: "Explore WAID, a premium luxury shoe brand handcrafting fine Italian leather oxfords, Chelsea boots, and loafers using traditional Goodyear welt construction.",
    pageKeywords: "luxury leather shoes, premium oxfords, handcrafted mens boots, designer loafers, goodyear welted shoes, WAID shoes",
  },

  /* ---------- Contact details ----------
     whatsappNumber must be digits only: country code + number,
     no "+", no spaces, no dashes. Example for India: 91 followed
     by the 10-digit number. */
  contact: {
    whatsappNumber: "917306589121",
    whatsappDisplay: "+91 73065 89121",
    email: "concierge@waidshoes.com",
    address: "Kozhikode, Kerala, India",
    hours: "Mon – Sat, 10am – 7pm IST",
    // These are just the small field labels shown above each detail
    // in the "Contact Us Directly" card.
    labelLocation: "Location",
    labelEmail: "Email",
    labelWhatsapp: "WhatsApp / Call",
    labelHours: "Studio Hours",
  },

  /* ---------- Social links ----------
     Leave as "#" to hide/disable a link visually (it just won't go anywhere). */
  social: {
    instagram: "#",
    facebook: "#",
  },

  /* ---------- Automated WhatsApp messages ----------
     These are the messages that get pre-filled in WhatsApp when
     someone clicks "Inquire" or submits the contact form. */
  whatsappTemplates: {
    // {{product}} is automatically replaced with the shoe's name
    productInquiry: `Hello WAID, I'm interested in the "{{product}}". Could you share details on pricing, sizing, and availability?`,
    // {{name}}, {{phone}}, {{email}}, {{message}} are filled in from the contact form
    formInquiry: `Hello WAID, I'd like to make an inquiry.\n\nName: {{name}}\nPhone: {{phone}}\nEmail: {{email}}\nMessage: {{message}}`,
  },

  /* ---------- Top navigation menu ----------
     Used for both the desktop menu bar and the mobile slide-in drawer. */
  nav: [
    { label: "Home", href: "#home" },
    { label: "Collection", href: "#collection" },
    { label: "Heritage", href: "#heritage" },
    { label: "Contact", href: "#contact" },
  ],

  /* ---------- Hero (the big top section) ---------- */
  hero: {
    eyebrow: "ESTABLISHED 2026",
    heading: "Elegance in Every Step",
    paragraph: "Handcrafted Italian leather footwear designed with a commitment to premium quality, minimal aesthetics, and timeless heritage.",
    buttonText: "Explore Collection",
    buttonHref: "#collection",
    backgroundImage: "assets/hero_bg.png",
  },

  /* ---------- "The Collection" section heading ----------
     The actual products are edited in js/products.js */
  collection: {
    eyebrow: "SIGNATURE SERIES",
    heading: "The Collection",
  },

  /* ---------- Heritage section ---------- */
  heritage: {
    eyebrow: "HERITAGE & PROCESS",
    // headingHTML supports a line break (<br>) and italics (<em>) if you want them
    headingHTML: "Stitched<br>to <em>Last</em>.",
    lede: "One ribbon of leather. Hand-welted. Built to be resoled, not replaced.",
    image: "assets/craftsmanship.png",
    imageAlt: "Hand-stitched Goodyear welt",
    badge: "EST. 2026",
    stats: [
      { value: "200+", label: "hand steps" },
      { value: "100%", label: "full-grain" },
      { value: "∞", label: "resolable" },
    ],
  },

  /* ---------- "Craft Stages" motion reel ----------
     Only the labels are text-editable here; icons stay as-is. */
  process: {
    eyebrow: "CRAFT STAGES",
    heading: "Hide to Heel",
    stages: [
      { label: "Source" },
      { label: "Last" },
      { label: "Weld" },
      { label: "Finish" },
    ],
  },

  /* ---------- Contact section ---------- */
  contactSection: {
    eyebrow: "GET IN TOUCH",
    heading: "Inquire Collection",
    subtext: "For custom fittings, private trunk shows, or private sizing consultations.",
    cardEyebrow: "Contact Us Directly",
    cardHeading: "We'd Love to Hear From You",
    cardDesc: "Reach out directly for the fastest response, or use the form and our concierge team will follow up.",
    // Labels for the inquiry form on the right side of this section.
    formLabelName: "Full Name",
    formLabelPhone: "Phone Number",
    formLabelEmail: "Email Address",
    formLabelMessage: "Message Details",
    formSubmitText: "Send Inquiry",
  },

  /* ---------- Footer ---------- */
  footer: {
    tagline: "Handcrafted Italian leather footwear. Timeless heritage, designed for a lifetime.",
    navHeading: "Navigation",
    collectionsHeading: "Collections",
    // These just link back to the Collection section — for a filtered link,
    // point them at "#collection" as well.
    collectionsLinks: [
      { label: "Oxfords Series", href: "#collection" },
      { label: "Chelsea Boots", href: "#collection" },
      { label: "Penny Loafers", href: "#collection" },
      { label: "Double Monk Straps", href: "#collection" },
    ],
    businessHeading: "Business Info",
    labelLocation: "Location:",
    labelSupport: "Support:",
    copyright: "© 2026 WAID Craftsmanship. All Rights Reserved.",
    legalLinks: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },

  /* ---------- Small reusable UI labels ----------
     Tiny bits of text used inside the product cards and the
     product detail popup (modal). Edit these to change the
     wording anywhere they appear across every product. */
  ui: {
    exploreDetails: "Explore Details",
    inquireButton: "Inquire",
    colorLabel: "Patina",           // shown as "Patina: Cognac Brown"
    specsTab: "Specifications",
    careTab: "Care Guide",
    sizesTab: "Sizes Available",
    sizesIntro: "We craft pairs in standard US sizes (D width):",
  },

  /* ---------- Mobile menu drawer footer note ---------- */
  mobileDrawer: {
    whatsappButtonText: "Chat on WhatsApp",
    tagline: "Est. 2026 — Handcrafted Italian Leather",
  },
};

/* ==========================================================
   Nothing below this line needs editing.
   Small helper so the rest of the site can build WhatsApp
   links and fill in the templates above.
   ========================================================== */
SITE_CONTENT.contact.whatsappHref = `https://wa.me/${SITE_CONTENT.contact.whatsappNumber}`;

function fillTemplate(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => (values[key] ?? ""));
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${SITE_CONTENT.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
