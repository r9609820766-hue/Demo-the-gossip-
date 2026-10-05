/* The Gossip demo — app logic. Restaurant info/menu edit korte restaurantData.js ar menuData.js use korun. */
(function () {
  "use strict";
  const R = restaurantData;
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const money = n => "₹" + n;
  const digits = s => String(s || "").replace(/\D/g, "");
  const A = R.address;
  const addrLine = () => [A.street, A.area, A.district, A.state + " – " + A.pincode].join(", ");
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage blocked */ } }
  };

  let cart = store.get("gossip_cart", []);
  let orderType = store.get("gossip_ordertype", "Delivery");
  let promo = store.get("gossip_promo", "");
  const st = { cat: "All", q: "", type: "all", sort: "default", pop: false };
  const byName = n => menuItems.find(i => i.name === n);
  const icon = c => (menuCategories.find(x => x.name === c) || {}).icon || "🍽️";

  /* ---------- Logo (assets/logo.png; fallback = text) ---------- */
  window.logoFallback = function (img) {
    const s = document.createElement("span");
    s.className = "logo-text";
    s.textContent = R.restaurantName.toUpperCase();
    img.replaceWith(s);
  };
  const logoHtml = (cls) => '<img class="logo-img ' + (cls || "") + '" src="' + R.logo + '" alt="' + esc(R.restaurantName) + ' logo" onerror="logoFallback(this)">';
  const imgHtml = (src, alt, em) => '<img loading="lazy" src="' + src + '" alt="' + esc(alt) + '" onerror="this.outerHTML=\'<div class=ph aria-hidden=true>' + em + '</div>\'">';

  /* ---------- Theme ---------- */
  const b = R.branding, map = { primaryColor: "--primary", secondaryColor: "--secondary", accentColor: "--accent", backgroundColor: "--background", textColor: "--text" };
  Object.keys(map).forEach(k => { if (b[k]) document.documentElement.style.setProperty(map[k], b[k]); });

  /* ---------- Toast ---------- */
  let tt;
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 2200); }

  /* ---------- Static content ---------- */
  function renderStatic() {
    document.title = R.restaurantName + " | Restaurant in Champahati, South 24 Parganas";
    const fav = document.querySelector('link[rel="icon"]'); if (fav) fav.href = R.favicon;
    ["#navLogo", "#preLogo", "#mobLogo", "#footLogo"].forEach(s => { const e = $(s); if (e) e.innerHTML = logoHtml(s === "#preLogo" ? "pre" : ""); });
    $("#preLogo").style.filter = "brightness(0) invert(1)";
    $("#footLogo").style.filter = "brightness(0) invert(1)";
    $("#heroTitle").textContent = R.restaurantName.toUpperCase();
    $("#heroTag").textContent = R.tagline;
    $("#heroSub").textContent = R.description;
    const hb = $("#heroBg"), im = new Image();
    im.onload = () => { hb.style.backgroundImage = "url('" + R.heroImage + "')"; hb.classList.add("has-img"); };
    im.src = R.heroImage;
    const day = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][new Date().getDay()];
    $("#heroBubble").innerHTML = '<div class="big">' + esc(R.rating) + ' ★</div><p>' + esc(R.reviewCount) + ' Google reviews (listing)</p><p><b>Today:</b> ' + esc(R.openingHours[day]) + '</p>';
    $("#pitch").innerHTML = R.pitch.map(p => '<div class="pitch"><div class="ic">' + p.icon + '</div><h3>' + esc(p.title) + '</h3><p>' + esc(p.text) + '</p></div>').join("");
    $("#aboutTitle").textContent = R.aboutTitle; $("#aboutText").textContent = R.aboutText;
    $("#why").innerHTML = R.why.map(w => '<div><b>' + w.icon + " " + esc(w.title) + '</b><span>' + esc(w.text) + '</span></div>').join("");
    const first = R.gallery[0]; if (first) { const i = new Image(); i.onload = () => $("#aboutImg").style.backgroundImage = "url('" + first.src + "')"; i.src = first.src; }
    $("#revGrid").innerHTML = reviews.map(r => '<figure class="rev"><div class="stars" aria-label="5 stars">★★★★★</div><p>“' + esc(r.text) + '”</p><small>' + esc(r.name) + ' · demo review</small></figure>').join("");
    $("#galGrid").innerHTML = R.gallery.map((g, i) => '<button data-g="' + i + '" aria-label="Open photo ' + (i + 1) + '">' + imgHtml(g.src, g.alt, "📷") + '</button>').join("");
    $("#addr").innerHTML = esc(R.restaurantName) + "<br>" + esc(A.street) + "<br>" + esc(A.area) + "<br>" + esc(A.district) + "<br>" + esc(A.state) + " – " + esc(A.pincode);
    const q = encodeURIComponent(R.restaurantName + ", " + addrLine());
    $("#dirBtn").href = R.googleMapsUrl || "https://www.google.com/maps/search/?api=1&query=" + q;
    const lat = R.coordinates.latitude, lng = R.coordinates.longitude;
    $("#mapFrame").src = "https://maps.google.com/maps?q=" + (lat && lng ? lat + "," + lng : q) + "&output=embed";
    $("#hours").innerHTML = Object.keys(R.openingHours).map(d => '<li class="' + (d === day ? "today" : "") + '"><span>' + d[0].toUpperCase() + d.slice(1) + '</span><span>' + esc(R.openingHours[d]) + '</span></li>').join("");
    $("#contact").innerHTML = 'Phone: <a data-call href="#"><b>' + esc(R.phone) + '</b></a>' + (R.email ? '<br>Email: <a href="mailto:' + esc(R.email) + '">' + esc(R.email) + '</a>' : "");
    $("#footTag").textContent = R.tagline; $("#footAddr").textContent = addrLine();
    $("#footPhone").textContent = R.phone;
    $("#social").innerHTML = Object.keys(R.social).filter(k => R.social[k]).map(k => '<a target="_blank" rel="noopener" href="' + esc(R.social[k]) + '">' + k[0].toUpperCase() + k.slice(1) + '</a>').join("");
    $("#copy").textContent = "© " + new Date().getFullYear() + " " + R.restaurantName;
    $$("[data-call]").forEach(a => a.href = "tel:" + R.phone);
    $$("[data-wa]").forEach(a => a.href = waLink(generalMsg()));
    $("#catGrid").innerHTML = menuCategories.map(c => '<button class="cat" data-cat="' + esc(c.name) + '"><span>' + c.icon + '</span><b>' + esc(c.name) + '</b></button>').join("");
    $("#popularGrid").innerHTML = "";
    R.popularItems.map(byName).filter(Boolean).forEach(i => $("#popularGrid").insertAdjacentHTML("beforeend", cardHtml(i)));
    $("#offerGrid").innerHTML = offers.map((o, i) => '<article class="offer"><div class="pic">' + imgHtml(o.image, o.title, "🏷️") + '</div><div class="body"><h3>' + esc(o.title) + '</h3><p>' + esc(o.description) + '</p><div class="price">' + money(o.price) + ' <s>' + money(o.oldPrice) + '</s></div><small>Valid: ' + esc(o.validity) + '</small><button class="btn sm" data-offer="' + i + '">Order this offer</button></article>').join("");
  }

  /* ---------- WhatsApp ---------- */
  function waLink(msg) { return "https://wa.me/" + digits(R.whatsapp) + "?text=" + encodeURIComponent(msg); }
  function generalMsg() { return "Hello " + R.restaurantName + ",\n\nI would like to place an order.\n\nThank you."; }
  function orderMsg(info) {
    const t = totals(info && info.type);
    let m = "Hello " + R.restaurantName + ",\n\nI would like to place an order:\n\n";
    m += cart.map(c => c.name + (c.variant ? " (" + c.variant + ")" : "") + " × " + c.qty).join("\n");
    m += "\n\nTotal: " + money(t.total) + (t.discount ? " (after discount)" : "");
    m += "\nOrder type: " + ((info && info.type) || orderType);
    m += "\n\nCustomer Name: " + ((info && info.name) || "") + "\nPhone: " + ((info && info.phone) || "") + "\nAddress: " + ((info && info.address) || "") + "\n\nThank you.";
    return m;
  }

  /* ---------- Cards & menu ---------- */
  function priceHtml(i) { return '<span class="price">' + (i.variants ? "from " : "") + money(i.price) + (i.oldPrice ? "<s>" + money(i.oldPrice) + "</s>" : "") + "</span>"; }
  function cardHtml(i) {
    const off = i.oldPrice ? Math.round((1 - i.price / i.oldPrice) * 100) : 0;
    return '<article class="card' + (i.available ? "" : " off") + '"><div class="pic" data-open="' + i.id + '" tabindex="0" role="button" aria-label="View ' + esc(i.name) + '">' + imgHtml(i.image, i.name, icon(i.category)) +
      '<div class="badges">' + (i.popular ? '<span class="badge">Popular</span>' : "") + (i.isNew ? '<span class="badge new">New</span>' : "") + (off ? '<span class="badge off">' + off + '% off</span>' : "") + '</div><span class="dot ' + i.type + '" title="' + (i.type === "veg" ? "Veg" : "Non-veg") + '"></span></div>' +
      '<div class="body"><h3>' + esc(i.name) + '</h3><span class="cat-l">' + esc(i.category) + '</span><div class="row">' + priceHtml(i) +
      (i.available ? '<button class="btn sm" data-add="' + i.id + '">Add</button>' : '<span class="note">Unavailable</span>') + '</div></div></article>';
  }
  function renderChips() {
    $("#chips").innerHTML = ["All"].concat(menuCategories.map(c => c.name)).map(n => '<button class="chip' + (n === st.cat ? " on" : "") + '" data-chip="' + esc(n) + '">' + esc(n) + '</button>').join("");
  }
  function renderMenu() {
    let list = menuItems.filter(i => (st.cat === "All" || i.category === st.cat) && (st.type === "all" || i.type === st.type) && (!st.pop || i.popular) && i.name.toLowerCase().includes(st.q.toLowerCase().trim()));
    if (st.sort === "low") list.sort((a, c) => a.price - c.price);
    if (st.sort === "high") list.sort((a, c) => c.price - a.price);
    if (st.sort === "az") list.sort((a, c) => a.name.localeCompare(c.name));
    $("#resCount").textContent = list.length + " item" + (list.length === 1 ? "" : "s");
    $("#menuGrid").innerHTML = list.length ? list.map(cardHtml).join("") : '<div class="empty">No dishes found. Try a different search or filter.</div>';
    renderChips();
  }

  /* ---------- Cart ---------- */
  function totals(type) {
    type = type || orderType;
    const sub = cart.reduce((s, c) => s + c.price * c.qty, 0);
    const pct = R.promoCodes[promo] || 0;
    const discount = Math.round(sub * pct / 100);
    const delivery = type === "Delivery" && sub > 0 ? R.delivery.charge : 0;
    return { sub, discount, delivery, total: sub - discount + delivery };
  }
  function saveCart() { store.set("gossip_cart", cart); store.set("gossip_ordertype", orderType); store.set("gossip_promo", promo); renderCart(); }
  function addToCart(id, variant, qty) {
    const i = menuItems.find(x => x.id === id); if (!i || !i.available) return;
    const v = i.variants ? (i.variants.find(x => x.label === variant) || i.variants[0]) : null;
    const key = id + "|" + (v ? v.label : "");
    const ex = cart.find(c => c.key === key);
    if (ex) ex.qty += qty || 1; else cart.push({ key, id, name: i.name, variant: v ? v.label : "", price: v ? v.price : i.price, qty: qty || 1 });
    saveCart(); toast(i.name + " added to cart");
    const c = $("#cartCount"); c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump");
  }
  function renderCart() {
    const n = cart.reduce((s, c) => s + c.qty, 0);
    $("#cartCount").textContent = n;
    const body = $("#cartBody"), foot = $("#cartFoot");
    if (!cart.length) { body.innerHTML = '<div class="empty">Your cart is empty.<br>Add something delicious from the menu.</div>'; foot.innerHTML = '<a class="btn" href="#menu" data-closecart>Browse menu</a>'; return; }
    body.innerHTML = cart.map(c => '<div class="ci"><div><b>' + esc(c.name) + '</b><br><small>' + (c.variant ? esc(c.variant) + " · " : "") + money(c.price) + ' each</small></div><b>' + money(c.price * c.qty) + '</b><div class="qty"><button data-dec="' + c.key + '" aria-label="Decrease">−</button><span>' + c.qty + '</span><button data-inc="' + c.key + '" aria-label="Increase">+</button></div><button class="rm" data-rm="' + c.key + '">Remove</button></div>').join("");
    const t = totals();
    foot.innerHTML = '<div class="seg" role="radiogroup" aria-label="Order type">' + ["Delivery", "Pickup"].map(o => '<label><input type="radio" name="ot" value="' + o + '"' + (o === orderType ? " checked" : "") + '> ' + o + '</label>').join("") + '</div>' +
      '<div class="promo"><input id="promoIn" placeholder="Promo code" value="' + esc(promo) + '" aria-label="Promo code"><button class="btn sm ghost" id="promoBtn">Apply</button></div>' +
      '<div class="sum"><span>Subtotal</span><span>' + money(t.sub) + '</span></div>' +
      '<div class="sum"><span>Discount</span><span>−' + money(t.discount) + '</span></div>' +
      '<div class="sum"><span>Delivery</span><span>' + (t.delivery ? money(t.delivery) : "—") + '</span></div>' +
      '<div class="sum total"><span>Total</span><span>' + money(t.total) + '</span></div>' +
      '<div class="foot-btns"><button class="btn" id="goCheckout">Checkout</button><a class="btn wa" target="_blank" rel="noopener" href="' + waLink(orderMsg()) + '">Order on WhatsApp</a><button class="rm" id="clearCart">Clear cart</button></div>';
  }
  function openCart() { $("#drawer").classList.add("open"); $("#overlay").classList.add("show"); $("#drawer").setAttribute("aria-hidden", "false"); $("#closeCart").focus(); }
  function closeCart() { $("#drawer").classList.remove("open"); $("#overlay").classList.remove("show"); $("#drawer").setAttribute("aria-hidden", "true"); }

  /* ---------- Item modal ---------- */
  function openItem(id) {
    const i = menuItems.find(x => x.id === id), d = $("#itemDlg");
    d.innerHTML = '<button class="x dlg-x" data-close aria-label="Close">✕</button><div class="dlg-pic">' + imgHtml(i.image, i.name, icon(i.category)) + '</div><div class="dlg-body"><h2>' + esc(i.name) + '</h2><span class="cat-l">' + esc(i.category) + " · " + (i.type === "veg" ? "Veg" : "Non-Veg") + (i.popular ? " · Popular" : "") + (i.available ? "" : " · Currently unavailable") + '</span><p>' + esc(i.description || "Freshly prepared at The Gossip. Photos and descriptions can be updated by the restaurant.") + '</p>' +
      (i.variants ? '<div class="variants" role="radiogroup" aria-label="Size">' + i.variants.map((v, k) => '<label><input type="radio" name="vr" value="' + esc(v.label) + '"' + (k === 0 ? " checked" : "") + '><span>' + esc(v.label) + '</span><b>' + money(v.price) + '</b></label>').join("") + '</div>' : '<p class="price">' + money(i.price) + '</p>') +
      '<div class="qty" style="margin-bottom:1rem"><button id="mq-" aria-label="Decrease">−</button><span id="mq">1</span><button id="mq+" aria-label="Increase">+</button></div><br>' +
      '<button class="btn" id="mAdd"' + (i.available ? "" : " disabled") + '>Add to cart</button></div>';
    let q = 1;
    d.querySelector("#mq-").onclick = () => { q = Math.max(1, q - 1); d.querySelector("#mq").textContent = q; };
    d.querySelector("#mq\\+").onclick = () => { q++; d.querySelector("#mq").textContent = q; };
    d.querySelector("#mAdd").onclick = () => { const r = d.querySelector('input[name="vr"]:checked'); addToCart(id, r ? r.value : "", q); d.close(); };
    d.showModal();
  }

  /* ---------- Checkout ---------- */
  function openCheckout() {
    if (!cart.length) return;
    closeCart();
    const d = $("#checkoutDlg"), t = totals();
    d.innerHTML = '<div class="co"><button class="x dlg-x" data-close aria-label="Close">✕</button>' +
      '<form id="coForm" novalidate><h2>Checkout</h2><p class="note">Demo checkout — no real payment is taken.</p>' +
      '<div class="field"><span class="l">Order type</span><div class="seg" role="radiogroup"><label><input type="radio" name="type" value="Delivery"' + (orderType === "Delivery" ? " checked" : "") + '> Delivery</label><label><input type="radio" name="type" value="Pickup"' + (orderType === "Pickup" ? " checked" : "") + '> Pickup</label></div></div>' +
      '<div class="f2"><div class="field"><label class="l" for="cName">Customer name *</label><input id="cName" required autocomplete="name"><div class="err" id="eName"></div></div>' +
      '<div class="field"><label class="l" for="cPhone">Phone number *</label><input id="cPhone" type="tel" inputmode="tel" required autocomplete="tel"><div class="err" id="ePhone"></div></div></div>' +
      '<div class="field"><label class="l" for="cAlt">Alternative phone</label><input id="cAlt" type="tel" inputmode="tel"></div>' +
      '<div id="delFields"><div class="field"><label class="l" for="cAddr">Delivery address *</label><textarea id="cAddr" rows="2" autocomplete="street-address"></textarea><div class="err" id="eAddr"></div></div>' +
      '<div class="f2"><div class="field"><label class="l" for="cLand">Landmark</label><input id="cLand"></div><div class="field"><label class="l" for="cCity">City</label><input id="cCity" autocomplete="address-level2"></div></div>' +
      '<div class="field"><label class="l" for="cPin">Pincode</label><input id="cPin" inputmode="numeric" maxlength="6" autocomplete="postal-code"></div></div>' +
      '<div class="field"><span class="l">Payment</span><div class="seg" role="radiogroup"><label><input type="radio" name="pay" value="Cash on Delivery" checked> Cash on Delivery</label><label><input type="radio" name="pay" value="Pay at Restaurant"> Pay at Restaurant</label></div></div>' +
      '<div class="foot-btns"><button class="btn" type="submit">Place order</button><button class="btn wa" type="button" id="coWa">Send on WhatsApp instead</button></div></form>' +
      '<div id="coSum"></div></div>';
    const syncSum = () => { const ty = d.querySelector('input[name="type"]:checked').value; orderType = ty; store.set("gossip_ordertype", ty); const tt = totals(ty);
      d.querySelector("#delFields").style.display = ty === "Delivery" ? "" : "none";
      d.querySelector("#coSum").innerHTML = '<h3 style="margin-top:2.2rem">Your order</h3>' + cart.map(c => '<div class="sum"><span>' + esc(c.name) + (c.variant ? " (" + esc(c.variant) + ")" : "") + " × " + c.qty + '</span><span>' + money(c.price * c.qty) + '</span></div>').join("") +
        '<div class="sum"><span>Subtotal</span><span>' + money(tt.sub) + '</span></div><div class="sum"><span>Discount</span><span>−' + money(tt.discount) + '</span></div><div class="sum"><span>Delivery</span><span>' + (tt.delivery ? money(tt.delivery) : "—") + '</span></div><div class="sum total"><span>Total</span><span>' + money(tt.total) + '</span></div>'; };
    d.querySelectorAll('input[name="type"]').forEach(r => r.onchange = syncSum); syncSum();
    const read = () => ({ type: d.querySelector('input[name="type"]:checked').value, name: d.querySelector("#cName").value.trim(), phone: d.querySelector("#cPhone").value.trim(), alt: d.querySelector("#cAlt").value.trim(),
      address: [d.querySelector("#cAddr").value.trim(), d.querySelector("#cLand").value.trim() && "Landmark: " + d.querySelector("#cLand").value.trim(), d.querySelector("#cCity").value.trim(), d.querySelector("#cPin").value.trim()].filter(Boolean).join(", "),
      pay: d.querySelector('input[name="pay"]:checked').value, addrRaw: d.querySelector("#cAddr").value.trim(), pin: d.querySelector("#cPin").value.trim() });
    const validate = v => { let ok = true; const set = (id, m) => { d.querySelector(id).textContent = m; if (m) ok = false; };
      set("#eName", v.name ? "" : "Please enter your name.");
      set("#ePhone", digits(v.phone).length >= 10 ? "" : "Enter a valid 10-digit phone number.");
      set("#eAddr", v.type === "Delivery" && !v.addrRaw ? "Please enter the delivery address." : "");
      return ok; };
    d.querySelector("#coWa").onclick = () => { const v = read(); if (!validate(v)) return; window.open(waLink(orderMsg({ type: v.type, name: v.name, phone: v.phone, address: v.type === "Delivery" ? v.address : "Pickup" })), "_blank", "noopener"); };
    d.querySelector("#coForm").onsubmit = e => { e.preventDefault(); const v = read(); if (!validate(v)) return;
      const tt = totals(v.type), id = "GSP-" + Date.now().toString().slice(-7);
      const order = { id, customer: v.name, phone: v.phone, type: v.type, pay: v.pay, items: cart.map(c => c.name + (c.variant ? " (" + c.variant + ")" : "") + " × " + c.qty), total: tt.total, time: new Date().toISOString() };
      const all = store.get("gossip_orders", []); all.push(order); store.set("gossip_orders", all);
      cart = []; promo = ""; saveCart();
      d.innerHTML = '<div class="okbox"><button class="x dlg-x" data-close aria-label="Close">✕</button><div class="tick">✅</div><h2>Thank You for Your Order!</h2><p class="note">This is a demo — no real order was sent.</p><dl><dt>Order ID</dt><dd>' + id + '</dd><dt>Name</dt><dd>' + esc(order.customer) + '</dd><dt>Items</dt><dd>' + order.items.map(esc).join("<br>") + '</dd><dt>Total</dt><dd><b>' + money(order.total) + '</b></dd><dt>Order type</dt><dd>' + order.type + '</dd><dt>Payment</dt><dd>' + order.pay + '</dd><dt>Contact</dt><dd>' + esc(order.phone) + '</dd></dl><button class="btn" data-close>Done</button></div>'; };
    d.showModal();
  }

  /* ---------- Events ---------- */
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-add],[data-open],[data-cat],[data-chip],[data-inc],[data-dec],[data-rm],[data-close],[data-offer],[data-g],[data-closecart]");
    if (t) {
      const d = t.dataset;
      if (d.add) { const i = menuItems.find(x => x.id === +d.add); i.variants ? openItem(i.id) : addToCart(i.id, "", 1); }
      else if (d.open) openItem(+d.open);
      else if (d.cat) { st.cat = d.cat; renderMenu(); $("#menu").scrollIntoView(); }
      else if (d.chip) { st.cat = d.chip; renderMenu(); }
      else if (d.inc || d.dec || d.rm) { const key = d.inc || d.dec || d.rm, c = cart.find(x => x.key === key); if (c) { if (d.inc) c.qty++; if (d.dec) c.qty--; if (d.rm || c.qty < 1) cart = cart.filter(x => x.key !== key); saveCart(); } }
      else if (e.target.closest("[data-close]")) t.closest("dialog").close();
      else if (d.offer !== undefined) { const o = offers[+d.offer]; toast(o.title + ": add the dishes you want, then mention the offer on WhatsApp"); $("#menu").scrollIntoView(); }
      else if (d.g !== undefined) { const g = R.gallery[+d.g], l = $("#lightDlg"); l.innerHTML = '<button class="x dlg-x" data-close aria-label="Close">✕</button>' + imgHtml(g.src, g.alt, "📷"); l.showModal(); }
      else if (d.closecart !== undefined) closeCart();
      return;
    }
    if (e.target.closest("#openCart")) openCart();
    else if (e.target.id === "closeCart" || e.target.id === "overlay") closeCart();
    else if (e.target.id === "goCheckout") openCheckout();
    else if (e.target.id === "clearCart") { cart = []; saveCart(); }
    else if (e.target.id === "promoBtn") { const v = $("#promoIn").value.trim().toUpperCase(); if (!v || R.promoCodes[v]) { promo = v; saveCart(); toast(v ? "Promo applied" : "Promo removed"); } else toast("Invalid promo code"); }
    else if (e.target.closest("#heroOrder")) { st.cat = "All"; renderMenu(); }
    else if (e.target.id === "toTop") scrollTo({ top: 0, behavior: "smooth" });
    else if (e.target.tagName === "DIALOG") e.target.close();
    else if (e.target.closest(".links a")) { $("#menuNav").classList.remove("open"); $("#burger").setAttribute("aria-expanded", "false"); }
  });
  document.addEventListener("change", e => { if (e.target.name === "ot") { orderType = e.target.value; saveCart(); } });
  document.addEventListener("keydown", e => {
    if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-open]")) { e.preventDefault(); openItem(+e.target.dataset.open); }
    if (e.key === "Escape") closeCart();
  });
  $("#q").addEventListener("input", e => { st.q = e.target.value; renderMenu(); });
  $("#fType").addEventListener("change", e => { st.type = e.target.value; renderMenu(); });
  $("#fSort").addEventListener("change", e => { st.sort = e.target.value; renderMenu(); });
  $("#fPop").addEventListener("click", e => { st.pop = !st.pop; e.currentTarget.setAttribute("aria-pressed", st.pop); renderMenu(); });
  $("#burger").addEventListener("click", e => { const o = $("#menuNav").classList.toggle("open"); e.currentTarget.setAttribute("aria-expanded", o); });
  window.addEventListener("scroll", () => { $("#nav").classList.toggle("scrolled", scrollY > 20); $("#toTop").classList.toggle("show", scrollY > 600); }, { passive: true });

  /* ---------- Init ---------- */
  cart = cart.filter(c => menuItems.some(i => i.id === c.id && i.available)); // purane/invalid item bad
  renderStatic(); renderMenu(); renderCart();
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .08 }) : null;
  $$(".reveal").forEach(el => io ? io.observe(el) : el.classList.add("in"));
  window.addEventListener("load", () => setTimeout(() => $("#preloader").classList.add("done"), 350));
  setTimeout(() => $("#preloader").classList.add("done"), 2500);
})();
