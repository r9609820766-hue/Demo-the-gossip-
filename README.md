# The Gossip — Demo Website (HTML + CSS + JS only)

## Kivabe chalaben
`index.html` double-click korun (kono server/install lage na). Internet thakle map dekhabe.

## Ki ki change korben (sob kichu 2 ta file-e)
- `js/restaurantData.js` : naam, tagline, phone, WhatsApp, address, Google Maps link, opening hours,
  social links, colours, about text, offers, reviews, gallery, delivery charge, promo code.
- `js/menuData.js` : menu categories + sob item. Notun item = ekta `add(...)` line copy kore bodlan.
  Dam change = number bodlan. Unavailable = `{available:false}`. Popular = `{popular:true}`.

## Logo / images
- Logo: `assets/logo.png` replace korun (na thakle "THE GOSSIP" text dekhabe). Favicon: `assets/favicon.png`.
- Hero: `assets/hero.jpg`. Gallery: `assets/gallery/1.jpg … 6.jpg`.
- Menu photo: `assets/menu/<item-name>.jpg` — e.g. `chicken-lovers-pizza.jpg`, `chicken-fried-momos.jpg`.
  Photo na thakle placeholder dekhabe.
- Offer photo: `assets/offers/*.jpg` (naam `restaurantData.js`-e dewa ache).

## Important
- Menu, dam, offer, review, about text — sob DEMO. Launch-er age owner-er sathe verify korun.
- Checkout demo: real payment nei; order browser-er localStorage-e save hoy.
- SEO JSON-LD `index.html`-er head-e ache; naam/phone/address bodlale oikhaneo update korun.
- Online deploy: puro folder Netlify / GitHub Pages / any hosting-e upload korun.
