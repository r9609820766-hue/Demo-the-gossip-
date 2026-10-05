// ================================
// MENU DATA (DEMO — online-e paowa menu, launch-er age verify korun)
// Notun item: niche add() line copy kore name/price bodle den.
// add(category, type "veg"|"nonveg", name, price)   price = 119  OR  [["Regular",149],["Large",219]]
// Optional 5th argument: { popular:true, isNew:true, oldPrice:99, available:false, description:"..." }
// Image automatic: assets/menu/<item-name-slug>.jpg  (na thakle placeholder dekhabe)
// ================================

// Category cards + filter. Notun category (e.g. Beverages) ekhane add korun.
const menuCategories = [
  { name: "Pizza", icon: "🍕" },
  { name: "Burgers", icon: "🍔" },
  { name: "Pasta", icon: "🍝" },
  { name: "Maggi", icon: "🍲" },
  { name: "Chinese", icon: "🍜" },
  { name: "Noodles", icon: "🍜" },
  { name: "Momos", icon: "🥟" },
  { name: "Chicken Specials", icon: "🍗" },
  { name: "Fried Rice", icon: "🍚" },
  { name: "Snacks / Starters", icon: "🥪" },
  { name: "Continental", icon: "🍽️" }
];

const menuItems = [];
let _id = 0;
const slug = s => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
function add(category, type, name, price, o = {}) {
  const variants = Array.isArray(price) ? price.map(v => ({ label: v[0], price: v[1] })) : null;
  menuItems.push(Object.assign({
    id: ++_id, name, category, type,
    price: variants ? variants[0].price : price, variants,
    oldPrice: null, description: "", image: "assets/menu/" + slug(name) + ".jpg",
    popular: false, isNew: false, featured: false, available: true
  }, o));
}

// ---- BURGERS ----
add("Burgers", "veg", "Aloo Tikki Burger", 70);
add("Burgers", "veg", "Veg Burger", 75);
add("Burgers", "veg", "Veg Burger with Cheese", 85);
add("Burgers", "veg", "Veg Grilled Burger", 90);
add("Burgers", "veg", "Double Veg Grilled Burger", 105);
add("Burgers", "veg", "Best Cheese Burger in Town (Veg)", 135);
add("Burgers", "nonveg", "Egg Burger", 80);
add("Burgers", "nonveg", "Chicken Burger", 85);
add("Burgers", "nonveg", "Chicken Burger with Cheese", 95);
add("Burgers", "nonveg", "Chicken Grilled Burger", 105, { popular: true });
add("Burgers", "nonveg", "Double Chicken Grilled Burger", 125);
add("Burgers", "nonveg", "Best Cheese Burger in Town (Non-Veg)", 155);

// ---- PASTA & SIDES ----
add("Pasta", "veg", "Red Sauce Pasta", 119);
add("Pasta", "veg", "White Sauce Pasta", 119);
add("Pasta", "veg", "Exotic Cheese Sauce Pasta", 129);
add("Pasta", "veg", "Peri Peri Pasta", 129);
add("Pasta", "nonveg", "Chicken White Sauce Pasta", 139, { popular: true });
add("Pasta", "nonveg", "Chicken Red Sauce Pasta", 139);
add("Snacks / Starters", "veg", "Cheese Garlic Bread", 119);
add("Snacks / Starters", "veg", "Veggies Garlic Bread", 129);

// ---- MAGGI ----
add("Maggi", "veg", "Plain Maggi", 70);
add("Maggi", "veg", "Masala Maggi", 80);
add("Maggi", "veg", "Pahadi Maggi", 90);
add("Maggi", "veg", "Peri Peri Maggi", 100);
add("Maggi", "veg", "Cheese Maggi", 110);
add("Maggi", "veg", "Paneer Maggi", 120);
add("Maggi", "nonveg", "Chicken Maggi", 129);
add("Maggi", "nonveg", "Special Maggi", 149);

// ---- PIZZA (Regular / Large) ----
const RL = (a, b) => [["Regular", a], ["Large", b]];
add("Pizza", "veg", "Margherita Classico", RL(149, 219));
add("Pizza", "veg", "Cheese Corn", RL(199, 269));
add("Pizza", "veg", "Country Pizza", RL(209, 269));
add("Pizza", "veg", "Veg Delight / Farm House", RL(219, 289));
add("Pizza", "veg", "Herb Mushroom Grilled Pizza", RL(229, 299));
add("Pizza", "veg", "Tandoori Paneer Tikka Pizza", RL(249, 299), { popular: true });
add("Pizza", "nonveg", "Chicken Lovers Pizza", RL(269, 349), { popular: true });
add("Pizza", "veg", "Extra Cheese", RL(55, 75), { description: "Add-on for your pizza." });
add("Pizza", "veg", "Extra Topping", RL(45, 55), { description: "Add-on for your pizza." });
add("Pizza", "veg", "Cheese Burst", RL(89, 99), { description: "Add-on for your pizza." });

// ---- CHINESE (VEG) ----
[["Spring Roll", 119], ["Crispy Chilli Potato", 129], ["Crispy Honey Chilli Potato", 139],
 ["Manchurian Dry", 159], ["Manchurian Gravy", 189], ["Classic Chilli Paneer Dry", 169],
 ["Classic Chilli Paneer Gravy", 189], ["Paneer Hot Garlic Dry", 169], ["Paneer Hot Garlic Gravy", 189],
 ["Truffle Mushroom Chilli Dry", 169], ["Truffle Mushroom Chilli Gravy", 189], ["Corn Salt & Pepper", 129],
 ["Crispy Baby Corn", 169], ["Chilli Baby Corn", 179]
].forEach(x => add("Chinese", "veg", x[0], x[1]));

// ---- NOODLES (Half / Full) ----
["Classic Hakka Noodles", "Chilli Garlic Noodles", "Singapore Noodles", "Schezwan Noodles"]
  .forEach(n => add("Noodles", "veg", n, [["Regular", 119], ["Large", 149]]));

// ---- FRIED RICE ----
add("Fried Rice", "veg", "Veg Fried Rice", 139);
add("Fried Rice", "nonveg", "Non-Veg Fried Rice", 169);
add("Fried Rice", "nonveg", "Egg Fried Rice", 159);
add("Fried Rice", "veg", "Paneer Mushroom Fried Rice", 169);
add("Fried Rice", "veg", "Dragon Fire Paneer Fried Rice", 179);

// ---- CHICKEN SPECIALS (Chinese Non-Veg) ----
add("Chicken Specials", "nonveg", "Chilli Chicken", 229);
add("Chicken Specials", "nonveg", "Kung Pao Chicken", 229);
add("Chicken Specials", "nonveg", "Chicken Lollipop", 229, { popular: true });
add("Chicken Specials", "nonveg", "Chicken Hot Garlic", 229);
add("Chicken Specials", "nonveg", "Drums of Heaven", 229);
add("Chicken Specials", "nonveg", "Chicken Salt & Pepper", 229);

// ---- MOMOS ----
add("Momos", "veg", "Veg Steamed Momos", 85);
add("Momos", "nonveg", "Chicken Steamed Momos", 105);
add("Momos", "veg", "Veg Fried Momos", 100);
add("Momos", "nonveg", "Chicken Fried Momos", 120, { popular: true });
add("Momos", "veg", "Butter Garlic Chilli Momos", [["Regular", 169], ["Large", 199]]);
add("Momos", "veg", "Pan Fried Momos with Chilli Sauce", [["Regular", 179], ["Large", 199]]);

// ---- CONTINENTAL ----
add("Continental", "nonveg", "Grilled Fish with Lemon Butter Sauce", 219);
add("Continental", "nonveg", "Grilled Chicken with BBQ Sauce", 199);
add("Continental", "nonveg", "Fish Finger with Tartar Sauce", 189);
add("Continental", "nonveg", "Chicken Cutlet", 169);
add("Continental", "nonveg", "Fish Cutlet", 199);
add("Continental", "veg", "Veg Cutlet", 129);
add("Continental", "veg", "Paneer Cutlet", 159);
add("Continental", "veg", "Cheese Corn Nuggets", 159);
add("Continental", "veg", "Cheese Ball / Paneer", 169);
add("Continental", "nonveg", "Chicken Cheese Ball", 199);
add("Continental", "nonveg", "Chicken Popcorn", 199);
add("Continental", "nonveg", "Chicken Garlic Finger", 199);
