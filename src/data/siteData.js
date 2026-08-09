export const siteConfig = {
  name: "87 Ahangama",
  tagline: "A Tranquil Coastal Escape",
  subtagline: "Where relaxation meets nature in perfect harmony",
  phone: "+94 74 208 7870",
  email: "info@87ahangama.com",
  address: "X98G+9VQ, Ahangama 80650, Sri Lanka",
  whatsapp: "+94742087870",
  logo: "/assets/images/cropped-cropped-87-logo-Final-web.png",
  heroBg: "/assets/images/pexels-freestockpro-11629009-scaled.jpg",
  web3formsAccessKey: "" // Add Web3Forms Access Key here or via VITE_WEB3FORMS_ACCESS_KEY env variable
};

export const roomsData = [
  {
    id: "sun-room",
    name: "Sun Room",
    subtitle: "Bright & Sunny Private Suite",
    description: "Sun room is a bright and comfortable private room designed for a relaxing stay. Spanning 148 sq ft with abundant natural sunlight, it is ideal for up to 2 guests seeking warmth and serenity.",
    price: "$85",
    pricePeriod: "per night",
    size: "148 sq ft",
    capacity: "2 Guests",
    bed: "1 Extra-Large King Bed",
    view: "Tropical Garden View",
    image: "/assets/images/WhatsApp-Image-2025-12-24-at-10.52.39-AM-1.jpeg",
    gallery: [
      "/assets/images/WhatsApp-Image-2025-12-24-at-10.52.39-AM-1.jpeg",
      "/assets/images/WhatsApp-Image-2025-12-23-at-10.15.06-PM.jpeg",
      "/assets/images/WhatsApp-Image-2025-12-23-at-10.15.07-PM.jpeg"
    ],
    features: [
      "Private room with abundant natural sunlight",
      "King-size bed with comfortable premium bedding",
      "Air conditioning for year-round comfort",
      "Free high-speed Wi-Fi & Smart TV",
      "Smart TV with Netflix & YouTube access",
      "Private en-suite bathroom with shower",
      "Fresh towels, slippers & essential toiletries",
      "Electric kettle & complimentary tea/coffee"
    ]
  },
  {
    id: "moon-room",
    name: "Moon Room",
    subtitle: "Serene & Air-Conditioned Haven",
    description: "This air-conditioned double room comprises a flat-screen TV with cable channels, private entrance, minibar, and a luxurious private bathroom. Designed for peaceful nights and quiet luxury.",
    price: "$95",
    pricePeriod: "per night",
    size: "165 sq ft",
    capacity: "2 Guests",
    bed: "1 King-Size Double Bed",
    view: "Pool & Terrace View",
    image: "/assets/images/img-75.jpg",
    gallery: [
      "/assets/images/img-75.jpg",
      "/assets/images/WhatsApp-Image-2025-12-24-at-10.52.40-AM.jpeg",
      "/assets/images/WhatsApp-Image-2025-12-23-at-10.15.08-PM.jpeg"
    ],
    features: [
      "Private ground floor entrance with quiet patio",
      "Air conditioning & Minibar",
      "Flat-screen TV with cable & free Netflix",
      "Private en-suite bathroom with bath or shower",
      "Hairdryer, slippers & free luxury toiletries",
      "Ironing facilities & clothes rack",
      "High-speed Wi-Fi connection",
      "Socket right near the bed"
    ]
  },
  {
    id: "beachfront-suite",
    name: "Premier Beachfront Suite",
    subtitle: "Panoramas of the Indian Ocean",
    description: "An expansive beachfront suite featuring floor-to-ceiling glass windows, a private sun terrace, ocean views, and premium artisanal room services.",
    price: "$140",
    pricePeriod: "per night",
    size: "240 sq ft",
    capacity: "2 - 3 Guests",
    bed: "1 Super King Bed + Daybed",
    view: "Direct Ocean Front View",
    image: "/assets/images/WhatsApp-Image-2025-12-24-at-10.52.42-AM.jpeg",
    gallery: [
      "/assets/images/WhatsApp-Image-2025-12-24-at-10.52.42-AM.jpeg",
      "/assets/images/WhatsApp-Image-2025-12-24-at-10.52.43-AM.jpeg"
    ],
    features: [
      "Direct beach & ocean panorama",
      "Private balcony with daybed lounging",
      "Super King bed with 400-thread count sheets",
      "Rainfall shower & freestanding soaking tub",
      "Daily gourmet breakfast included",
      "Espresso machine & stocked mini-bar"
    ]
  }
];

export const galleryData = [
  { id: 1, title: "87 Ahangama Coastal Vibe", category: "Resort", url: "/assets/images/pexels-freestockpro-11629009-scaled.jpg" },
  { id: 2, title: "Sun Room Interior", category: "Rooms", url: "/assets/images/WhatsApp-Image-2025-12-24-at-10.52.39-AM-1.jpeg" },
  { id: 3, title: "Moon Room Luxury Setup", category: "Rooms", url: "/assets/images/img-75.jpg" },
  { id: 4, title: "Artisanal Coffee & Breakfast", category: "Cafe", url: "/assets/images/WhatsApp-Image-2025-09-07-at-4.25.22-PM.jpeg" },
  { id: 5, title: "Resort Exterior & Gardens", category: "Resort", url: "/assets/images/WhatsApp-Image-2025-12-24-at-10.52.40-AM.jpeg" },
  { id: 6, title: "Ahangama Beach & Surf", category: "Vibe", url: "/assets/images/pexels-malindabandaralk-16508231-scaled.jpg" },
  { id: 7, title: "Boutique Room Details", category: "Rooms", url: "/assets/images/WhatsApp-Image-2025-12-23-at-10.15.06-PM.jpeg" },
  { id: 8, title: "Relaxation Lounge", category: "Resort", url: "/assets/images/WhatsApp-Image-2025-12-24-at-10.52.42-AM.jpeg" }
];

export const cafeMenuItems = [
  {
    category: "Coffee & Brews",
    items: [
      { name: "Espresso / Americano", price: "$3.50", desc: "Single origin roasted Sri Lankan espresso" },
      { name: "Coconut Cold Brew", price: "$4.50", desc: "Steeped 18hrs served over fresh king coconut water" },
      { name: "Flat White / Cappuccino", price: "$4.00", desc: "Creamy steamed oat, almond or fresh milk" }
    ]
  },
  {
    category: "All-Day Brunch",
    items: [
      { name: "Ahangama Avocado Toast", price: "$9.00", desc: "Sourdough, smashed avocado, poached egg, chili flakes" },
      { name: "Tropical Acai & Dragonfruit Bowl", price: "$8.50", desc: "Fresh passionfruit, toasted granola, local banana" },
      { name: "Traditional Hopper Set", price: "$10.00", desc: "Egg hoppers with lunu miris and coconut sambal" }
    ]
  }
];
