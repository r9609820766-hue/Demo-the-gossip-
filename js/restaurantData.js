// ================================
// RESTAURANT CUSTOMIZATION
// EDIT THESE VALUES
// Sob kichu ei file theke change korle puro website-e automatic change hobe.
// ================================
const restaurantData = {
  restaurantName: "The Gossip",
  tagline: "Good Food. Great Conversations.",
  description: "Discover delicious food, refreshing conversations and memorable moments at The Gossip, Champahati.",

  // LOGO: sudhu assets/logo.png replace korlei hobe. File na thakle text logo dekhabe.
  logo: "assets/logo.png",
  favicon: "assets/favicon.png",
  // HERO IMAGE: assets/hero.jpg replace korun. Na thakle dark design dekhabe.
  heroImage: "assets/hero.jpg",

  phone: "+918420805671",
  whatsapp: "+918420805671",
  email: "",

  address: {
    street: "J N Bose Road",
    area: "Champahati, Sahebpur",
    district: "South 24 Parganas",
    state: "West Bengal",
    pincode: "743613",
    country: "India"
  },
  coordinates: { latitude: "", longitude: "" },
  // Exact Google Maps link ekhane boshan. Khali thakle address diye search link toiri hobe.
  googleMapsUrl: "",

  rating: "4.0",
  reviewCount: "78",

  openingHours: {
    monday: "5:00 PM – 10:00 PM",
    tuesday: "5:00 PM – 10:00 PM",
    wednesday: "5:00 PM – 10:00 PM",
    thursday: "5:00 PM – 10:00 PM",
    friday: "5:00 PM – 10:00 PM",
    saturday: "5:00 PM – 10:00 PM",
    sunday: "5:00 PM – 10:00 PM"
  },

  // Khali thakle icon dekhabe na. Link boshale footer-e dekhabe.
  social: { facebook: "", instagram: "", youtube: "" },

  // THEME COLOURS: khali thakle css/style.css-er default colour use hobe.
  branding: { primaryColor: "", secondaryColor: "", accentColor: "", backgroundColor: "", textColor: "" },

  // DEMO values — launch-er age owner-er sathe confirm korun
  delivery: { charge: 30 },
  promoCodes: { GOSSIP10: 10 }, // code: discount percent

  aboutTitle: "Where good food meets good conversation",
  aboutText: "The Gossip is a family-friendly food destination in Champahati where great food and good conversations come together. From pizzas, burgers and pasta to Chinese favourites, momos and continental dishes, The Gossip offers a diverse menu designed for friends, families and food lovers.",

  // Customer Favourites: menuData.js-er item name hubohu likhun
  popularItems: [
    "Chicken Lovers Pizza", "Chicken Lollipop", "Chicken Grilled Burger",
    "Chicken Fried Momos", "Tandoori Paneer Tikka Pizza", "Chicken White Sauce Pasta"
  ],

  why: [
    { icon: "👨‍👩‍👧", title: "Family & friends friendly", text: "A relaxed place to sit, eat and talk together." },
    { icon: "🍕", title: "Big menu", text: "Pizza, burgers, pasta, Chinese, momos and continental." },
    { icon: "📱", title: "Order your way", text: "Order from this website, on WhatsApp or by phone." },
    { icon: "🕔", title: "Open every evening", text: "Listed hours: 5:00 PM – 10:00 PM, daily." }
  ],

  // GALLERY: assets/gallery/1.jpg ... 6.jpg replace korun
  gallery: [
    { src: "assets/gallery/1.jpg", alt: "Food at The Gossip" },
    { src: "assets/gallery/2.jpg", alt: "Dining area at The Gossip" },
    { src: "assets/gallery/3.jpg", alt: "Pizza at The Gossip" },
    { src: "assets/gallery/4.jpg", alt: "Momos at The Gossip" },
    { src: "assets/gallery/5.jpg", alt: "Burgers at The Gossip" },
    { src: "assets/gallery/6.jpg", alt: "Friends dining at The Gossip" }
  ],

  // Owner pitch section (demo)
  pitch: [
    { icon: "📖", title: "Online Menu", text: "Your complete menu, available anytime on every customer's phone." },
    { icon: "🛵", title: "Direct Orders", text: "Let customers order directly through your website and WhatsApp." },
    { icon: "🏷️", title: "Special Offers", text: "Promote your latest combos and offers instantly." },
    { icon: "📍", title: "Location", text: "Help customers find The Gossip easily." },
    { icon: "🔗", title: "Social Connect", text: "Connect your Instagram, Facebook and other social channels." }
  ]
};

// ================================
// OFFERS (DEMO — prices/validity owner dile replace korun)
// ================================
const offers = [
  { title: "Weekend Feast", description: "Pizza, momos and a side for the whole table.", image: "assets/offers/weekend.jpg", oldPrice: 799, price: 699, validity: "Sat & Sun (demo)" },
  { title: "Pizza + Drink Combo", description: "Any regular pizza with a chilled drink.", image: "assets/offers/pizza-combo.jpg", oldPrice: 249, price: 219, validity: "Daily (demo)" },
  { title: "Friends Combo", description: "Burgers, fried momos and noodles for a group.", image: "assets/offers/friends.jpg", oldPrice: 599, price: 529, validity: "Daily (demo)" },
  { title: "Family Feast", description: "Starters, fried rice, chicken and pasta for the family.", image: "assets/offers/family.jpg", oldPrice: 1199, price: 999, validity: "Daily (demo)" },
  { title: "Student Special", description: "A burger and Maggi at a friendly price.", image: "assets/offers/student.jpg", oldPrice: 190, price: 165, validity: "Weekdays (demo)" }
];

// ================================
// REVIEWS (DEMO / SAMPLE — real customer review diye replace korun)
// ================================
const reviews = [
  { text: "Great place to spend time with friends and enjoy good food.", name: "Sample guest" },
  { text: "Loved the food variety and ambience.", name: "Sample guest" },
  { text: "Good option for family and friends.", name: "Sample guest" }
];
