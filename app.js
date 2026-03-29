// Utilidades de estado
const LS_PRODUCTS = "atc_products";
const LS_CART = "atc_cart";
const LS_SOBRE = "atc_sobre";

let productos = [];
let cart = [];
let sobreTexto = "";

const filtros = ["Todos", "Anime", "Música", "Arte", "Humor", "Personalizado"];
let filtroActivo = "Todos";

// Referencias DOM
const grid = document.getElementById("product-grid");
const filtersEl = document.getElementById("filters");
const cartBtn = document.getElementById("cart-btn");
const cartDrawer = document.getElementById("cart-drawer");
const drawerOverlay = document.getElementById("drawer-overlay");
const closeDrawer = document.getElementById("close-drawer");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartBadge = document.getElementById("cart-badge");
const modal = document.getElementById("product-modal");
const modalOverlay = document.getElementById("modal-overlay");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");
const igOrderBtn = document.getElementById("ig-order");
const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("nav-links");
const hamburger = document.getElementById("hamburger");

// Admin
const adminTrigger = document.getElementById("admin-trigger");
const loginModal = document.getElementById("login-modal");
const loginOverlay = document.getElementById("login-overlay");
const loginClose = document.getElementById("login-close");
const loginForm = document.getElementById("login-form");
const adminPanel = document.getElementById("admin-panel");
const adminProducts = document.getElementById("admin-products");
const adminProductForm = document.getElementById("admin-product-form");
const adminLogout = document.getElementById("admin-logout");
const sobreAdmin = document.getElementById("sobre-admin");
const saveSobreBtn = document.getElementById("save-sobre");
const sobreTextoEl = document.getElementById("sobre-texto");
const editIdInput = document.getElementById("edit-id");
const pNombre = document.getElementById("p-nombre");
const pCat = document.getElementById("p-categoria");
const pPrecio = document.getElementById("p-precio");
const pDesc = document.getElementById("p-desc");
const pGrad = document.getElementById("p-grad");

let adminClicks = 0;
let adminTimer = null;
let isAdmin = false;

// Init
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  renderFilters();
  renderProducts();
  renderCart();
  initListeners();
});

function loadData() {
  const stored = localStorage.getItem(LS_PRODUCTS);
  productos = stored ? JSON.parse(stored) : productosBase;
  const cartStored = localStorage.getItem(LS_CART);
  cart = cartStored ? JSON.parse(cartStored) : [];
  const s = localStorage.getItem(LS_SOBRE);
  sobreTexto = s || sobreTextoEl.textContent;
  sobreTextoEl.textContent = sobreTexto;
}

function saveProducts() {
  localStorage.setItem(LS_PRODUCTS, JSON.stringify(productos));
}
function saveCart() {
  localStorage.setItem(LS_CART, JSON.stringify(cart));
}
function saveSobre() {
  localStorage.setItem(LS_SOBRE, sobreTexto);
}

// Render
function renderFilters() {
  filtersEl.innerHTML = "";
  filtros.forEach(f => {
    const btn = document.createElement("button");
    btn.className = "filter-pill" + (f === filtroActivo ? " active" : "");
    btn.textContent = f;
    btn.onclick = () => { filtroActivo = f; renderProducts(); };
    filtersEl.appendChild(btn);
  });
}

function productIcon(categoria) {
  const common = 'width="32" height="32" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"';
  switch (categoria) {
    case "Anime":
      return `<svg ${common} viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 5-6 8-6s7 2 8 6"/></svg>`;
    case "Música":
      return `<svg ${common} viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
    case "Arte":
      return `<svg ${common} viewBox="0 0 24 24"><path d="M19 21l-7-4-7 4V5l7-4 7 4z"/><path d="M12 3v14"/></svg>`;
    case "Humor":
      return `<svg ${common} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 10h.01M16 10h.01"/><path d="M8 15s1.5 2 4 2 4-2 4-2"/></svg>`;
    case "Personalizado":
      return `<svg ${common} viewBox="0 0 24 24"><path d="M12 2l4 4-4 4-4-4z"/><path d="M6 12l-4 4 4 4 4-4z"/><path d="M18 12l-4 4 4 4 4-4z"/></svg>`;
    default:
      return `<svg ${common} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/></svg>`;
  }
}

function renderProducts() {
  grid.innerHTML = "";
  const lista = filtroActivo === "Todos" ? productos : productos.filter(p => p.categoria === filtroActivo);
  lista.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-top" style="background:${p.gradiente}">
        <span class="badge">${p.categoria.toUpperCase()}</span>
        <div class="card-icon">${productIcon(p.categoria)}</div>
      </div>
      <div class="card-body">
        <div class="card-title">${p.nombre}</div>
        <div class="card-price">$${p.precio.toLocaleString("es-CL")}</div>
        <p class="card-desc">${p.descripcion}</p>
        <div class="card-actions">
          <button class="btn coral" onclick="verDetalle(${p.id})">Ver Detalles</button>
          <button class="btn primary" onclick="addToCart(${p.id})">Agregar</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Detalle modal
function verDetalle(id) {
  const p = productos.find(x => x.id === id);
  if (!p) return;
  modalBody.innerHTML = `
    <div class="card-top" style="background:${p.gradiente}; height:240px;">
      <span class="badge">${p.categoria.toUpperCase()}</span>
      <div class="card-icon" style="width:92px;height:92px;">${productIcon(p.categoria)}</div>
    </div>
    <div class="card-body">
      <div class="card-title" style="font-size:22px;">${p.nombre}</div>
      <div class="card-price">$${p.precio.toLocaleString("es-CL")}</div>
      <p>${p.descripcion}</p>
      <div class="qty-controls" style="margin:12px 0;">
        <span>Cantidad:</span>
        <button class="qty-btn" onclick="changeTemp(-1)">−</button>
        <span id="temp-qty">1</span>
        <button class="qty-btn" onclick="changeTemp(1)">+</button>
      </div>
      <button class="btn primary" onclick="addModal(${p.id})">Agregar al Carrito</button>
    </div>
  `;
  tempQty = 1;
  modal.classList.add("show");
  modalOverlay.classList.add("overlay-show");
}
let tempQty = 1;
window.changeTemp = (d) => {
  tempQty = Math.max(1, tempQty + d);
  document.getElementById("temp-qty").textContent = tempQty;
};
window.addModal = (id) => { addToCart(id, tempQty); closeModal(); };

// Carrito
function addToCart(id, qty = 1) {
  const p = productos.find(x => x.id === id);
  if (!p) return;
  const idx = cart.findIndex(c => c.id === id);
  if (idx >= 0) cart[idx].qty += qty;
  else cart.push({ id, qty });
  saveCart();
  renderCart();
  openDrawer();
}
function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const p = productos.find(x => x.id === item.id);
    if (!p) return;
    total += p.precio * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div>
        <div class="cart-title">${p.nombre}</div>
        <div class="cart-price">$${p.precio.toLocaleString("es-CL")} c/u</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="decCart(${p.id})">−</button>
        <span>${item.qty}</span>
        <button class="qty-btn" onclick="incCart(${p.id})">+</button>
        <button class="qty-btn" onclick="removeCart(${p.id})">×</button>
      </div>
    `;
    cartItemsEl.appendChild(div);
  });
  cartTotalEl.textContent = `$${total.toLocaleString("es-CL")} CLP`;
  cartBadge.textContent = cart.reduce((a,b)=>a+b.qty,0);
}
window.incCart = (id) => { changeCart(id, 1); };
window.decCart = (id) => { changeCart(id, -1); };
function changeCart(id, delta) {
  const idx = cart.findIndex(c => c.id === id);
  if (idx < 0) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx,1);
  saveCart(); renderCart();
}
window.removeCart = (id) => {
  cart = cart.filter(c => c.id !== id);
  saveCart(); renderCart();
};

function openDrawer() {
  cartDrawer.classList.add("drawer-open");
  drawerOverlay.classList.add("overlay-show");
}
function closeDrawerFn() {
  cartDrawer.classList.remove("drawer-open");
  drawerOverlay.classList.remove("overlay-show");
}
closeDrawer.onclick = closeDrawerFn;
drawerOverlay.onclick = closeDrawerFn;
cartBtn.onclick = openDrawer;

// Modal general close
modalClose.onclick = closeModal;
modalOverlay.onclick = closeModal;
function closeModal() {
  modal.classList.remove("show");
  modalOverlay.classList.remove("overlay-show");
}

// Instagram order
igOrderBtn.onclick = () => {
  if (!cart.length) return;
  let total = 0;
  const parts = cart.map(item => {
    const p = productos.find(x => x.id === item.id);
    if (!p) return "";
    total += p.precio * item.qty;
    return `${p.nombre} x${item.qty}`;
  }).filter(Boolean);
  const msg = `Hola! Me gustaría hacer un pedido de: ${parts.join(", ")}. Total: $${total.toLocaleString("es-CL")} CLP`;
  navigator.clipboard?.writeText(msg);
  window.open("https://ig.me/m/asitalcual_tienda", "_blank");
};

// Navbar scroll shadow
window.addEventListener("scroll", () => {
  navbar.style.boxShadow = window.scrollY > 10 ? "0 6px 16px rgba(0,0,0,0.18)" : "none";
});

// Hamburger
hamburger.onclick = () => navLinks.classList.toggle("show");

// Admin hidden trigger
adminTrigger.addEventListener("click", () => {
  adminClicks++;
  if (adminTimer) clearTimeout(adminTimer);
  adminTimer = setTimeout(() => adminClicks = 0, 1200);
  if (adminClicks >= 3) {
    adminClicks = 0;
    showLogin();
  }
});
function showLogin() {
  loginModal.classList.add("show");
  loginOverlay.classList.add("overlay-show");
}
loginClose.onclick = closeLogin;
loginOverlay.onclick = closeLogin;
function closeLogin() {
  loginModal.classList.remove("show");
  loginOverlay.classList.remove("overlay-show");
}

// Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const u = document.getElementById("admin-user").value.trim();
  const p = document.getElementById("admin-pass").value.trim();
  if (u === "adminatc" && p === "amermelao2026") {
    isAdmin = true;
    closeLogin();
    openAdmin();
  } else {
    alert("Credenciales incorrectas");
  }
});

// Admin panel
function openAdmin() {
  adminPanel.classList.add("show");
  renderAdminProducts();
  sobreAdmin.value = sobreTexto;
}
adminLogout.onclick = () => { isAdmin=false; adminPanel.classList.remove("show"); };

function renderAdminProducts() {
  adminProducts.innerHTML = "";
  productos.forEach(p => {
    const div = document.createElement("div");
    div.className = "admin-item";
    div.innerHTML = `
      <strong>${p.nombre}</strong>
      <span>${p.categoria} · $${p.precio.toLocaleString("es-CL")}</span>
      <small>${p.descripcion}</small>
      <small>${p.gradiente}</small>
      <div class="admin-actions">
        <button class="btn ghost small" onclick="editProduct(${p.id})">Editar</button>
        <button class="btn coral small" onclick="deleteProduct(${p.id})">Eliminar</button>
      </div>
    `;
    adminProducts.appendChild(div);
  });
}

window.editProduct = (id) => {
  const p = productos.find(x => x.id === id);
  if (!p) return;
  editIdInput.value = p.id;
  pNombre.value = p.nombre;
  pCat.value = p.categoria;
  pPrecio.value = p.precio;
  pDesc.value = p.descripcion;
  pGrad.value = p.gradiente;
  adminPanel.scrollTo({ top: 0, behavior: "smooth" });
};

window.deleteProduct = (id) => {
  productos = productos.filter(p => p.id !== id);
  saveProducts();
  renderProducts();
  renderAdminProducts();
};

adminProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const idEdit = editIdInput.value;
  const data = {
    id: idEdit ? Number(idEdit) : Date.now(),
    nombre: pNombre.value.trim(),
    categoria: pCat.value,
    precio: Number(pPrecio.value),
    descripcion: pDesc.value.trim(),
    gradiente: pGrad.value.trim()
  };
  if (idEdit) {
    productos = productos.map(p => p.id === Number(idEdit) ? data : p);
  } else {
    productos.push(data);
  }
  saveProducts();
  renderProducts();
  renderAdminProducts();
  adminProductForm.reset();
  editIdInput.value = "";
});

// Sobre nosotros
saveSobreBtn.onclick = () => {
  sobreTexto = sobreAdmin.value.trim() || sobreTexto;
  sobreTextoEl.textContent = sobreTexto;
  saveSobre();
};

// Helpers
function initListeners() {
  // cerrar drawer con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDrawerFn(); closeModal(); closeLogin();
    }
  });
}

// Expose for inline onclick
window.verDetalle = verDetalle;
window.addToCart = addToCart;
