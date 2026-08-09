export const siteConfig = {
  name: "87 Ahangama",
  tagline: "A Tranquil Coastal Escape",
  subtagline: "Where relaxation meets nature in perfect harmony",
  phone: "+94 74 208 7870",
  email: "info@87ahangama.com",
  address: "X98G+9VQ, Ahangama 80650, Sri Lanka",
  googleMapsUrl: "https://maps.app.goo.gl/JCFjTQmnwqfHdufQ7",
  whatsapp: "94742087870",
  facebook: "https://www.facebook.com/87ahangama",
  instagram: "https://www.instagram.com/87ahangama/",
  otaLinks: {
    booking: "https://www.booking.com/Share-I6rKZfl",
    agoda: "https://www.agoda.com/87-ahangama/hotel/galle-lk.html",
    airbnb: "" // Add Airbnb link here when available
  },
  logo: "/assets/images/87-logo-official.png",
  heroBg: "/assets/images/real/property-exterior.jpg",
  web3formsAccessKey: "" // Add Web3Forms Access Key here or via VITE_WEB3FORMS_ACCESS_KEY env variable
};

export const roomsData = [
  {
    id: "sun-room",
    name: "Sun Room",
    subtitle: "Bright & Sunny Private Suite",
    description: "Sun Room is a bright, air-conditioned private suite featuring a solid wood checkered headboard, 1 extra-large double bed with swan towel art, ceiling fan, and a unique artisanal earthen en-suite bathroom.",
    price: "From $24",
    pricePeriod: "per night",
    size: "148 sq ft",
    capacity: "2 Guests",
    bed: "1 Extra-Large Double Bed",
    view: "Tropical Garden View",
    bookingUrl: "https://www.booking.com/Share-I6rKZfl",
    agodaUrl: "https://www.agoda.com/87-ahangama/hotel/galle-lk.html",
    image: "/assets/images/real/sun-room.jpg",
    gallery: [
      "/assets/images/real/sun-room.jpg",
      "/assets/images/real/private-patio.jpg",
      "/assets/images/real/bathroom-1.jpg",
      "/assets/images/real/bathroom-2.jpg"
    ],
    highlights: [
      "No prepayment needed — Pay at property",
      "Breakfast included options available",
      "Ground floor with private entrance"
    ],
    features: [
      "1 Extra-large double bed with swan towel art",
      "Air conditioning & silent ceiling fan",
      "Artisanal earthen en-suite bathroom with bath/shower",
      "Flat-screen TV with cable channels",
      "Minibar & Refrigerator",
      "Free high-speed Wi-Fi",
      "Free toiletries, towels, linen & slippers",
      "Electrical socket right near the bed",
      "Hairdryer, clothes rack & ironing facilities",
      "Mosquito net for peaceful sleep",
      "Electric kettle & coffee/tea maker",
      "Ground floor location with private entrance",
      "Optional fresh breakfast included"
    ]
  },
  {
    id: "moon-room",
    name: "Moon Room",
    subtitle: "Four-Poster Canopy Suite",
    description: "Moon Room is a romantic air-conditioned haven featuring a solid four-poster teak canopy bed with elegant white mosquito net drapery, dark blue linen, mini-bar coffee station, and a luxury earthen bathroom.",
    price: "From $24",
    pricePeriod: "per night",
    size: "165 sq ft",
    capacity: "2 Guests",
    bed: "1 Four-Poster Teak Double Bed",
    view: "Garden & Patio View",
    bookingUrl: "https://www.booking.com/Share-I6rKZfl",
    agodaUrl: "https://www.agoda.com/87-ahangama/hotel/galle-lk.html",
    image: "/assets/images/real/moon-room.jpg",
    gallery: [
      "/assets/images/real/moon-room.jpg",
      "/assets/images/real/moon-room-interior.jpg",
      "/assets/images/real/private-patio.jpg",
      "/assets/images/real/bathroom-1.jpg",
      "/assets/images/real/bathroom-2.jpg"
    ],
    highlights: [
      "No prepayment needed — Pay at property",
      "Breakfast included options available",
      "Ground floor with private entrance"
    ],
    features: [
      "1 Four-poster teak double bed with net drapery",
      "Air conditioning & silent ceiling fan",
      "Artisanal earthen en-suite bathroom with bath/shower",
      "Flat-screen TV with cable channels",
      "Minibar & Refrigerator",
      "Free high-speed Wi-Fi connection",
      "Free luxury toiletries, towels, linen & slippers",
      "Electrical socket right near the bed",
      "Hairdryer, clothes rack & ironing facilities",
      "Electric kettle & tea/coffee making facilities",
      "Polished concrete flooring & tropical decor",
      "Ground floor location with private entrance",
      "Optional fresh breakfast included"
    ]
  }
];

export const galleryData = [
  { id: 1, title: "87 Ahangama Property Exterior & Board", category: "Resort", url: "/assets/images/real/property-exterior.jpg" },
  { id: 2, title: "Sun Room Deluxe Suite", category: "Rooms", url: "/assets/images/real/sun-room.jpg" },
  { id: 3, title: "Moon Room Four-Poster Canopy Suite", category: "Rooms", url: "/assets/images/real/moon-room.jpg" },
  { id: 4, title: "Moon Room Air-Conditioned Suite Interior", category: "Rooms", url: "/assets/images/real/moon-room-interior.jpg" },
  { id: 5, title: "Tropical Private Entry & Coral Stone Patio", category: "Resort", url: "/assets/images/real/private-patio.jpg" },
  { id: 6, title: "Cozy Night Garden Cafe & Fairy Lights", category: "Cafe", url: "/assets/images/real/night-garden-dining.jpg" },
  { id: 7, title: "Artisanal Earthen Bathroom & Sunburst Mirror", category: "Bathrooms", url: "/assets/images/real/bathroom-1.jpg" },
  { id: 8, title: "Luxury Bath Vanity & Bamboo Towel Rack", category: "Bathrooms", url: "/assets/images/real/bathroom-2.jpg" }
];

export const cafeMenuFull = [
  {
    id: "all-day-brunch",
    category: "All Day Brunch",
    subtitle: "Tropical Brunch & Artisanal Plates",
    items: [
      { name: "Sri Lankan Brunch", price: "LKR 2,450", desc: "pol roti, eggs, coconut sambol, avocado, mushroom and seasonal fruits" },
      { name: "Garden Brunch", price: "LKR 2,650", desc: "eggs, avocado, sourdough, roasted tomato and greens" },
      { name: "Fisherman's Brunch", price: "LKR 3,200", desc: "smoked tuna, eggs, avocado, and sourdough" },
      { name: "Vegan Village Plate", price: "LKR 2,250", desc: "pol roti, hummus, roasted vegetables and gotukola salad" },
      { name: "Avocado Toast", price: "LKR 2,200", desc: "Fresh smashed avocado on artisanal toasted sourdough" },
      { name: "Garlic Mushroom Toast", price: "LKR 2,200", desc: "Sautéed garlic mushrooms on toasted sourdough" },
      { name: "Smoked Tuna Toast", price: "LKR 2,800", desc: "Smoked tuna spread served on toasted sourdough" },
      { name: "Chicken & Avocado Toast", price: "LKR 2,250", desc: "Grilled chicken, smashed avocado on sourdough" },
      { name: "Hummus & Roasted Vegetable Wrap", price: "LKR 1,600", desc: "House hummus with warm roasted tropical vegetables" },
      { name: "Sweet Potato Fries", price: "LKR 800", desc: "Crispy seasoned golden sweet potato fries" }
    ],
    addons: [
      { name: "Bacon", price: "LKR 600" },
      { name: "2 Eggs (fried, boiled, scrambled)", price: "LKR 400" }
    ]
  },
  {
    id: "smoothie-bowls",
    category: "Smoothie Bowls",
    subtitle: "Fresh Tropical Fuel",
    items: [
      { name: "Golden Tropics Bowl", price: "LKR 2,500", desc: "Mango, passionfruit & pineapple smoothie base with coconut flakes" },
      { name: "Green Glow Bowl", price: "LKR 2,500", desc: "Nutrient-dense spinach, avocado & banana blend" },
      { name: "Monkey Fuel Bowl", price: "LKR 2,500", desc: "Peanut butter, raw cacao, banana & almond milk blend" }
    ]
  },
  {
    id: "evening-menu",
    category: "Served From 5 PM",
    subtitle: "Soups, Salads, Wings & Sushi Bar 🍣",
    subsections: [
      {
        subtitle: "Soups",
        items: [
          { name: "Tom Yum Soup", price: "LKR 2,200", desc: "Served with steamed rice or grilled sourdough toast" },
          { name: "Roasted Pumpkin & Chicken Soup", price: "LKR 1,800", desc: "Creamy roasted pumpkin soup with tender chicken" }
        ]
      },
      {
        subtitle: "Salads",
        items: [
          { name: "Island Green Bowl", price: "LKR 1,400", desc: "Fresh island greens, house dressing & seeds" }
        ]
      },
      {
        subtitle: "Wings at 87",
        items: [
          { name: "Fried Chicken Wings (6 pcs) & Potato Wedges", price: "LKR 1,750", desc: "Crispy seasoned chicken wings served with golden wedges" }
        ]
      },
      {
        subtitle: "Sushi Bar 🍣",
        items: [
          { name: "Miso Soup", price: "LKR 1,000", desc: "Traditional Japanese miso soup" },
          { name: "Tuna Maki", price: "LKR 2,500", desc: "Fresh tuna sushi roll" },
          { name: "Spicy Tuna Roll", price: "LKR 2,500", desc: "Fresh local tuna with spicy mayo roll" },
          { name: "California Roll", price: "LKR 3,200", desc: "Crab, avocado, cucumber & sushi rice" }
        ]
      }
    ],
    addons: [
      { name: "Grilled Chicken (200g)", price: "LKR 550" },
      { name: "Grilled Tuna (200g)", price: "LKR 550" },
      { name: "Two Eggs (Fried, Boiled or Scrambled)", price: "LKR 400" }
    ]
  },
  {
    id: "coffee-tea",
    category: "Coffee & Tea",
    subtitle: "Single Origin Brews & Ceylon Teas ☕",
    subsections: [
      {
        subtitle: "Coffee",
        items: [
          { name: "Espresso", price: "LKR 800" },
          { name: "Double Espresso", price: "LKR 900" },
          { name: "Cappuccino", price: "LKR 1,100" },
          { name: "Latte", price: "LKR 1,100" },
          { name: "Iced Latte", price: "LKR 1,200" },
          { name: "Flat White", price: "LKR 1,100" },
          { name: "Mocha", price: "LKR 1,400" },
          { name: "Coco Iced Coffee", price: "LKR 1,400" }
        ]
      },
      {
        subtitle: "Tea",
        items: [
          { name: "Ceylon Black Tea", price: "LKR 800" },
          { name: "Green Tea", price: "LKR 800" },
          { name: "Ginger Tea", price: "LKR 800" },
          { name: "Lemon Iced Tea", price: "LKR 1,000" }
        ]
      }
    ]
  },
  {
    id: "juices-smoothies",
    category: "Smoothies & Juices",
    subtitle: "100% Fresh Tropical Fruits 🍹",
    subsections: [
      {
        subtitle: "Smoothies",
        items: [
          { name: "Tropical Mango", price: "LKR 1,500" },
          { name: "Tropical Green Detox", price: "LKR 1,200" },
          { name: "Banana Peanut", price: "LKR 1,500" }
        ]
      },
      {
        subtitle: "Fresh Juices",
        items: [
          { name: "Watermelon", price: "LKR 1,000" },
          { name: "Pineapple", price: "LKR 1,100" },
          { name: "Passion Fruit", price: "LKR 1,200" },
          { name: "Mango", price: "LKR 1,200" },
          { name: "King Coconut", price: "LKR 500" }
        ]
      }
    ]
  },
  {
    id: "bar-drinks",
    category: "Cocktails & Drinks",
    subtitle: "Signature Cocktails, Wine & Cold Drinks 🍸",
    subsections: [
      {
        subtitle: "Cocktails 🍸",
        items: [
          { name: "Arrack Sour", price: "LKR 1,800" },
          { name: "Classic Mojito", price: "LKR 1,800" },
          { name: "Passion Mojito", price: "LKR 1,800" },
          { name: "87 Special", price: "LKR 2,000" },
          { name: "Spicy Margarita", price: "LKR 2,400" },
          { name: "Passion Margarita", price: "LKR 2,400" }
        ]
      },
      {
        subtitle: "Beer & Wine 🍺🍷",
        items: [
          { name: "Lion Lager (Beer)", price: "LKR 1,000" },
          { name: "Glass of White Wine", price: "LKR 2,500" },
          { name: "Glass of Red Wine", price: "LKR 2,500" }
        ]
      },
      {
        subtitle: "Soft Drinks 🥤",
        items: [
          { name: "Coca Cola", price: "LKR 500" },
          { name: "Zero Cola", price: "LKR 500" },
          { name: "Sprite", price: "LKR 500" },
          { name: "Soda", price: "LKR 400" },
          { name: "Water", price: "LKR 300" }
        ]
      }
    ]
  },
  {
    id: "dessert",
    category: "Dessert",
    subtitle: "Sweet Treats & Pancakes 🍰",
    items: [
      { name: "Brownie Bliss", price: "LKR 1,800", desc: "Warm chocolate brownie served with local vanilla bean gelato" },
      { name: "Island Pancakes", price: "LKR 1,500", desc: "Fluffy pancakes served with tropical fruit & coconut syrup" }
    ]
  }
];

export const cafeMenuImage = "/assets/images/cafe-menu-full.jpg";
