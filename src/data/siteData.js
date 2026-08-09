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
  logo: "/assets/images/87-logo-official.png",
  heroBg: "/assets/images/real/property-exterior.jpg",
  web3formsAccessKey: "" // Add Web3Forms Access Key here or via VITE_WEB3FORMS_ACCESS_KEY env variable
};

export const roomsData = [
  {
    id: "sun-room",
    name: "Sun Room",
    subtitle: "Bright & Sunny Private Suite",
    description: "Sun Room is a bright, air-conditioned private suite featuring a solid wood checkered headboard, plush king bed with swan towel art, ceiling fan, and a unique artisanal earthen en-suite bathroom.",
    price: "$85",
    pricePeriod: "per night",
    size: "148 sq ft",
    capacity: "2 Guests",
    bed: "1 Extra-Large King Bed",
    view: "Tropical Garden View",
    image: "/assets/images/real/sun-room.jpg",
    gallery: [
      "/assets/images/real/sun-room.jpg",
      "/assets/images/real/bathroom-1.jpg",
      "/assets/images/real/bathroom-2.jpg"
    ],
    features: [
      "Private room with abundant natural sunlight",
      "Solid wood checkered headboard & King bed",
      "Air conditioning & silent ceiling fan",
      "Artisanal earthen en-suite bathroom",
      "Sunburst vanity mirror & vessel sink",
      "Free high-speed Wi-Fi",
      "Fresh towels, bamboo rack & hairdryer",
      "Electric kettle & tea/coffee station"
    ]
  },
  {
    id: "moon-room",
    name: "Moon Room",
    subtitle: "Four-Poster Canopy Suite",
    description: "Moon Room is a romantic air-conditioned haven featuring a solid four-poster teak canopy bed with elegant white mosquito net drapery, dark blue linen, mini-bar coffee station, and a luxury earthen bathroom.",
    price: "$95",
    pricePeriod: "per night",
    size: "165 sq ft",
    capacity: "2 Guests",
    bed: "1 Four-Poster Teak King Bed",
    view: "Garden & Patio View",
    image: "/assets/images/real/moon-room.jpg",
    gallery: [
      "/assets/images/real/moon-room.jpg",
      "/assets/images/real/bathroom-1.jpg",
      "/assets/images/real/bathroom-2.jpg"
    ],
    features: [
      "Four-poster teak canopy bed with drapery",
      "Air conditioning for cool comfort",
      "Artisanal earthen en-suite bathroom",
      "Minibar & tea/coffee making facilities",
      "Polished concrete flooring & tropical decor",
      "Hairdryer, slippers & luxury toiletries",
      "High-speed Wi-Fi connection",
      "Sockets conveniently located near bed"
    ]
  }
];

export const galleryData = [
  { id: 1, title: "87 Ahangama Front Entrance", category: "Resort", url: "/assets/images/real/property-exterior.jpg" },
  { id: 2, title: "Sun Room Deluxe Suite", category: "Rooms", url: "/assets/images/real/sun-room.jpg" },
  { id: 3, title: "Moon Room Four-Poster Canopy Bed", category: "Rooms", url: "/assets/images/real/moon-room.jpg" },
  { id: 4, title: "Artisanal Earthen Bathroom & Sunburst Mirror", category: "Bathrooms", url: "/assets/images/real/bathroom-1.jpg" },
  { id: 5, title: "Luxury Bath Vanity & Bamboo Ladder", category: "Bathrooms", url: "/assets/images/real/bathroom-2.jpg" },
  { id: 6, title: "Artisanal Cafe & Dining", category: "Cafe", url: "/assets/images/WhatsApp-Image-2025-09-07-at-4.25.22-PM.jpeg" }
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
