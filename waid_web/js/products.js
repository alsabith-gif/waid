/* ==========================================================
   WAID PRODUCT CATALOG — EDIT YOUR SHOES HERE
   ==========================================================
   Every shoe on the site is one entry in the PRODUCTS list
   below. The page reads this file automatically — no other
   file needs to change when you add, remove, or edit a shoe.

   TO ADD A NEW SHOE:
   1. Copy one whole entry below, from the opening { to the
      closing }, and paste it right after it (before the ]).
   2. Give it a unique "id" (letters/numbers/dashes only, no
      spaces) — this is used internally to open the right
      product popup, it's never shown to customers.
   3. Update every field: name, price, category, color,
      image, description, specs, care, badge.
   4. Save the file — the new shoe now appears in the
      collection automatically. There's no separate place
      you need to register it, and no limit on how many you
      can have.

   TO REMOVE A SHOE: delete its whole { ... } entry (and the
   comma before or after it, so you don't end up with two
   commas in a row or a trailing comma before the ]).

   FIELD NOTES:
   - image / images: the file path of the shoe photo. Put new
     photos in the /assets folder, then reference them here,
     e.g. "assets/my_new_shoe.png". "images" is used for the
     small thumbnail gallery — you can repeat the same photo
     if you only have one, or list several.
   - price: just the number, no currency symbol or commas.
   - sizes: the list of sizes you offer for that shoe.
   - specs / care: each line becomes one bullet point on the
     site — add or remove lines as needed.
   - badge: the small tag shown on the product card (e.g.
     "New", "Bestseller"). Set it to "" (empty quotes) to show
     no badge at all.
   ========================================================== */

const PRODUCTS = [
  {
    id: "waid-oxford",
    name: "The Classic Wholecut Oxford",
    price: 295,
    category: "loafers",
    color: "Cognac Brown",
    colorHex: "#8B4513",
    rating: 4.9,
    reviewsCount: 124,
    image: "assets/Both shoes (1).jpeg",
    images: [
      "assets/Both shoes (1).jpeg",
      "assets/Both shoes (1).jpeg", // Mock secondary images
      "assets/Both shoes (1).jpeg"
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    description: "Sculpted from a single piece of premium Italian full-grain calfskin, the Classic Wholecut Oxford represents the pinnacle of formal footwear. Clean, seamless, and timelessly elegant.",
    specs: [
      "100% Italian full-grain calfskin leather",
      " Goodyear welted construction for lifelong durability",
      "Hand-painted and finished finish with a warm cognac patina",
      "Fully lined with breathable, soft cowhide leather",
      "Stacked leather heel with anti-slip rubber insert",
      "Resolable construction"
    ],
    care: [
      "Wipe away dirt and debris with a soft, damp cloth.",
      "Apply a premium neutral or cognac leather cream to nourish.",
      "Buff gently with a horsehair brush to restore the rich luster.",
      "Always store with cedar shoe trees to retain shape and absorb moisture."
    ],
    badge: "Bestseller"
  },
  {
    id: "waid-chelsea",
    name: "The Signature Chelsea Boot",
    price: 345,
    category: "loafers",
    color: "Espresso Brown",
    colorHex: "#3d2314",
    rating: 4.8,
    reviewsCount: 98,
    image: "assets/Both shoes (2).jpeg",
    images: [
      "assets/Both shoes (2).jpeg",
      "assets/Both shoes (2).jpeg",
      "assets/Both shoes (2).jpeg"
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    description: "A refined take on the classic silhouette, our Chelsea boot is crafted from butter-soft calfskin leather with sleek double-sided elastic panels and a hand-stitched pull tab. Effortlessly transitions from casual to formal.",
    specs: [
      "Premium Italian calfskin leather upper",
      "Goodyear welted storm-guard construction",
      "Reinforced custom woven elastic side gores",
      "Full glove-leather lining for ultimate comfort",
      "Durable studded rubber sole for all-weather traction",
      "Handcrafted in small batches"
    ],
    care: [
      "Brush clean with a soft brush to remove dust.",
      "Moisturize periodically with a high-grade leather conditioner.",
      "Avoid direct heat sources if boots become wet; dry naturally.",
      "Insert boot trees immediately after wear to prevent leather creasing."
    ],
    badge: "New Arrival"
  },
  {
    id: "waid-loafer",
    name: "The Heritage Penny Loafer",
    price: 265,
    category: "Loafers",
    color: "Mahogany Suede",
    colorHex: "#4e2d1f",
    rating: 4.7,
    reviewsCount: 76,
    image: "assets/Both shoes (3).jpeg",
    images: [
      "assets/Both shoes (3).jpeg",
      "assets/Both shoes (3).jpeg",
      "assets/Both shoes (3).jpeg"
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    description: "Crafted in rich, water-resistant Italian suede, the Heritage Penny Loafer brings relaxed sophistication to any wardrobe. Features an unlined, extra-flexible structure that contours to your foot over time.",
    specs: [
      "Fine Italian calf suede with water-repellent finish",
      "Blake-stitched flexible construction for out-of-the-box comfort",
      "Hand-sewn moc toe stitching details",
      "Cushioned leather insole with arch support",
      "Molded rubber heel pad for comfort and grip",
      "Ultra-lightweight design"
    ],
    care: [
      "Use a specialized suede brush to restore the nap and lift dust.",
      "Spray with a suede protector to resist water and oil stains.",
      "Treat spills immediately by blotting with a clean cloth and suede cleaner.",
      "Store in a dust bag with cedar shoe trees."
    ],
    badge: "Limited Run"
  },
  {
    id: "waid-monk",
    name: "The Modern Double Monk Strap",
    price: 315,
    category: "loafers",
    color: "Obsidian Black",
    colorHex: "#111111",
    rating: 4.9,
    reviewsCount: 54,
    image: "assets/Both shoes (4).jpeg",
    images: [
      "assets/Both shoes (4).jpeg",
      "assets/Both shoes (4).jpeg",
      "assets/Both shoes (4).jpeg"
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    description: "Exude confidence with our Double Monk Strap, detailed with solid brass buckles. Masterfully crafted from polished French box calf leather, it features a structured silhouette that makes a bold, tailored statement.",
    specs: [
      "Polished French box calf leather upper",
      "Traditional Goodyear welted leather sole",
      "Custom solid brass buckles with adjustable straps",
      "Fully leather lined with premium tan calfskin",
      "Hand-bevelled waist and painted sole edge",
      "Cork-bed filling that shapes to your foot"
    ],
    care: [
      "Apply black shoe wax or cream polish to maintain color depth.",
      "Buff vigorously with a horsehair brush to achieve a mirror shine.",
      "Undo buckles when storing to relieve stress on the leather straps.",
      "Store in a dry place with cedar shoe trees."
    ],
    badge: "Exclusive"
  },
  {
    id: "waid-derby",
    name: "The Heritage Cap-Toe Derby",
    price: 285,
    category: "loafers",
    color: "Jet Black",
    colorHex: "#1c1c1c",
    rating: 4.8,
    reviewsCount: 41,
    image: "assets/Both shoes (5).jpeg",
    images: [
      "assets/Both shoes (5).jpeg",
      "assets/Both shoes (5).jpeg", // Mock secondary images
      "assets/Both shoes (5).jpeg"
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    description: "An open-lacing silhouette with a crisp cap-toe seam, the Cap-Toe Derby brings a slightly more relaxed formality than the Oxford without sacrificing polish. Finished in deep jet black full-grain leather.",
    specs: [
      "Full-grain Italian leather upper",
      "Goodyear welted construction for lifelong durability",
      "Classic 5-eyelet open lacing system",
      "Leather-lined for breathability and comfort",
      "Leather sole with rubber tip for grip",
      "Resolable construction"
    ],
    care: [
      "Wipe clean with a soft, dry cloth after each wear.",
      "Condition monthly with a black leather cream to prevent drying.",
      "Buff with a horsehair brush for a deep, even shine.",
      "Store with cedar shoe trees to maintain shape."
    ],
    badge: "New"
  },
  {
    id: "waid-suede-boot",
    name: "The Explorer Suede Boot",
    price: 325,
    category: "loafers",
    color: "Sandstone Suede",
    colorHex: "#a9825b",
    rating: 4.7,
    reviewsCount: 33,
    image: "assets/Both shoes (6).jpeg",
    images: [
      "assets/Both shoes (6).jpeg",
      "assets/Both shoes (6).jpeg", // Mock secondary images
      "assets/Both shoes (6).jpeg"
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    description: "A rugged yet refined boot in warm sandstone suede, the Explorer pairs a durable lugged sole with hand-finished leather detailing — built for versatility from city streets to weekend travel.",
    specs: [
      "Premium water-resistant Italian suede upper",
      "Goodyear welted construction",
      "Durable lugged rubber outsole for traction",
      "Padded collar for ankle comfort",
      "Full leather lining",
      "Reinforced heel counter for stability"
    ],
    care: [
      "Brush regularly with a suede brush to lift dirt and restore nap.",
      "Apply a suede protector spray before first wear.",
      "Blot (never rub) spills immediately with a clean cloth.",
      "Store with cedar shoe trees away from direct sunlight."
    ],
    badge: "Limited Run"
  }
];

// Helper functions for easy database querying
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function getProductsByCategory(category) {
  if (!category || category === "All") return PRODUCTS;
  return PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
}
