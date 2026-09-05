// WAID Leather Shoe Store - Product Database

const PRODUCTS = [
  {
    id: "waid-oxford",
    name: "The Classic Wholecut Oxford",
    price: 295,
    category: "Oxfords",
    color: "Cognac Brown",
    colorHex: "#8B4513",
    rating: 4.9,
    reviewsCount: 124,
    image: "assets/shoe_oxford.png",
    images: [
      "assets/shoe_oxford.png",
      "assets/shoe_oxford.png", // Mock secondary images
      "assets/shoe_oxford.png"
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
    category: "Boots",
    color: "Espresso Brown",
    colorHex: "#3d2314",
    rating: 4.8,
    reviewsCount: 98,
    image: "assets/shoe_chelsea.png",
    images: [
      "assets/shoe_chelsea.png",
      "assets/shoe_chelsea.png",
      "assets/shoe_chelsea.png"
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
    image: "assets/shoe_loafer.png",
    images: [
      "assets/shoe_loafer.png",
      "assets/shoe_loafer.png",
      "assets/shoe_loafer.png"
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
    category: "Oxfords",
    color: "Obsidian Black",
    colorHex: "#111111",
    rating: 4.9,
    reviewsCount: 54,
    image: "assets/shoe_monk.png",
    images: [
      "assets/shoe_monk.png",
      "assets/shoe_monk.png",
      "assets/shoe_monk.png"
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
