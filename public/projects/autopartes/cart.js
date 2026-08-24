// AUTOINSUMO 2000 — carrito compartido entre productos.html y carrito.html (localStorage)
const AUTOINSUMO_CART_KEY = 'autoinsumo_cart';
const AUTOINSUMO_WHATSAPP = '584149876543';
const AUTOINSUMO_SALES_EMAIL = 'ventas@autoinsumo2000.com.ve';

const AUTOINSUMO_PRODUCTS = {
  'amortiguador-hilux': { name: 'Amortiguador a Gas Delantero Toyota Hilux', brand: 'Monroe', category: 'suspension', price: 45.00, code: 'SUS-451' },
  'bateria-70ah': { name: 'Batería S4 12V 70Ah Libre de Mantenimiento', brand: 'Bosch', category: 'electricidad', price: 85.00, code: 'ELE-870' },
  'kit-frenos-ceramicos': { name: 'Kit Discos y Pastillas de Freno Cerámicas', brand: 'Brembo', category: 'frenos', price: 120.00, code: 'BRK-120' },
  'bomba-aceite-v8': { name: 'Bomba de Aceite Alta Presión V8', brand: 'Genuino', category: 'motor', price: 65.00, code: 'MOT-065' },
};

function autoinsumoFormatUSD(value) {
  return '$' + value.toFixed(2);
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(AUTOINSUMO_CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(AUTOINSUMO_CART_KEY, JSON.stringify(cart));
}

function addToCart(productId, qty) {
  qty = qty || 1;
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty: qty });
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  saveCart(getCart().filter((item) => item.id !== productId));
}

function setCartQty(productId, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, qty);
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

// ============ Product Catalog Filtering (productos.html) ============
function autoinsumoInitFilters() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const categoryChecks = document.querySelectorAll('[data-filter-category]');
  const brandChecks = document.querySelectorAll('[data-filter-brand]');
  const priceInput = document.getElementById('price-filter');
  const priceLabel = document.getElementById('price-filter-label');
  const clearBtn = document.getElementById('clear-filters-btn');
  const resultCount = document.getElementById('result-count');
  const cards = Array.from(grid.querySelectorAll('[data-category]'));

  function applyFilters() {
    const checkedCategories = Array.from(categoryChecks).filter((c) => c.checked).map((c) => c.dataset.filterCategory);
    const checkedBrands = Array.from(brandChecks).filter((c) => c.checked).map((c) => c.dataset.filterBrand);
    const maxPrice = priceInput ? parseFloat(priceInput.value) : Infinity;

    let visibleCount = 0;
    cards.forEach((card) => {
      const category = card.dataset.category;
      const brand = card.dataset.brand;
      const price = parseFloat(card.dataset.price);

      const matchesCategory = checkedCategories.length === 0 || checkedCategories.includes(category);
      const matchesBrand = checkedBrands.length === 0 || checkedBrands.includes(brand);
      const matchesPrice = price <= maxPrice;

      const visible = matchesCategory && matchesBrand && matchesPrice;
      card.style.display = visible ? '' : 'none';
      if (visible) visibleCount++;
    });

    if (resultCount) {
      resultCount.textContent = visibleCount === cards.length
        ? `Mostrando los ${cards.length} productos disponibles`
        : `Mostrando ${visibleCount} de ${cards.length} productos`;
    }
  }

  categoryChecks.forEach((c) => c.addEventListener('change', applyFilters));
  brandChecks.forEach((c) => c.addEventListener('change', applyFilters));
  if (priceInput) {
    priceInput.addEventListener('input', () => {
      if (priceLabel) priceLabel.textContent = autoinsumoFormatUSD(parseFloat(priceInput.value));
      applyFilters();
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      categoryChecks.forEach((c) => (c.checked = false));
      brandChecks.forEach((c) => (c.checked = false));
      if (priceInput) {
        priceInput.value = priceInput.max;
        if (priceLabel) priceLabel.textContent = autoinsumoFormatUSD(parseFloat(priceInput.max));
      }
      applyFilters();
    });
  }

  applyFilters();
}

function autoinsumoInitAddToCartButtons() {
  document.querySelectorAll('[data-add-to-cart]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.addToCart;
      addToCart(id, 1);
      window.location.href = 'carrito.html';
    });
  });
}

// ============ Cart Page Rendering (carrito.html) ============
function autoinsumoRenderCart() {
  const tbody = document.getElementById('cart-items-body');
  if (!tbody) return;

  const emptyState = document.getElementById('cart-empty-state');
  const tableWrapper = document.getElementById('cart-table-wrapper');
  const cart = getCart();

  if (cart.length === 0) {
    if (tableWrapper) tableWrapper.classList.add('hidden');
    if (emptyState) emptyState.classList.remove('hidden');
    autoinsumoUpdateCartTotals();
    return;
  }

  if (tableWrapper) tableWrapper.classList.remove('hidden');
  if (emptyState) emptyState.classList.add('hidden');

  tbody.innerHTML = cart.map((item) => {
    const product = AUTOINSUMO_PRODUCTS[item.id];
    if (!product) return '';
    const lineTotal = product.price * item.qty;
    return `
      <tr class="hover:bg-surface-bright transition-colors group">
        <td class="py-4 px-6">
          <div>
            <h3 class="text-body-md font-body-md font-semibold text-on-secondary-fixed">${product.name}</h3>
            <p class="text-caption font-caption text-on-surface-variant">Marca: ${product.brand} | Cod: ${product.code}</p>
          </div>
        </td>
        <td class="py-4 px-6">
          <div class="flex items-center justify-center gap-2">
            <button data-qty-decrease="${item.id}" class="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface transition-colors border border-outline-variant/50">
              <span class="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <span class="w-12 text-center text-body-md font-body-md">${item.qty}</span>
            <button data-qty-increase="${item.id}" class="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface transition-colors border border-outline-variant/50">
              <span class="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>
        </td>
        <td class="py-4 px-6 text-right">
          <div class="text-body-md font-body-md text-on-surface font-medium">${autoinsumoFormatUSD(product.price)}</div>
        </td>
        <td class="py-4 px-6 text-right">
          <div class="text-body-md font-body-md text-primary font-semibold">${autoinsumoFormatUSD(lineTotal)}</div>
        </td>
        <td class="py-4 px-6 text-right">
          <button data-remove="${item.id}" aria-label="Eliminar" class="text-on-surface-variant hover:text-error transition-colors p-2">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('[data-qty-decrease]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.qtyDecrease;
      const item = getCart().find((i) => i.id === id);
      if (item) setCartQty(id, item.qty - 1);
      autoinsumoRenderCart();
    });
  });
  tbody.querySelectorAll('[data-qty-increase]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.qtyIncrease;
      const item = getCart().find((i) => i.id === id);
      if (item) setCartQty(id, item.qty + 1);
      autoinsumoRenderCart();
    });
  });
  tbody.querySelectorAll('[data-remove]').forEach((btn) => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.remove);
      autoinsumoRenderCart();
    });
  });

  autoinsumoUpdateCartTotals();
}

function autoinsumoUpdateCartTotals() {
  const subtotalEl = document.getElementById('cart-subtotal');
  const ivaEl = document.getElementById('cart-iva');
  const shippingEl = document.getElementById('cart-shipping');
  const totalEl = document.getElementById('cart-total');
  const itemCountEl = document.getElementById('cart-item-count');
  const shippingSelect = document.getElementById('shipping-select');
  if (!subtotalEl) return;

  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => {
    const product = AUTOINSUMO_PRODUCTS[item.id];
    return product ? sum + product.price * item.qty : sum;
  }, 0);
  const iva = subtotal * 0.16;
  const shipping = shippingSelect ? parseFloat(shippingSelect.value) || 0 : 0;
  const total = subtotal + iva + shipping;

  subtotalEl.textContent = autoinsumoFormatUSD(subtotal);
  if (ivaEl) ivaEl.textContent = autoinsumoFormatUSD(iva);
  if (shippingEl) shippingEl.textContent = autoinsumoFormatUSD(shipping);
  if (totalEl) totalEl.textContent = autoinsumoFormatUSD(total);
  if (itemCountEl) itemCountEl.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}

function autoinsumoBuildQuoteMessage() {
  const cart = getCart();
  let subtotal = 0;
  const lines = cart.map((item) => {
    const product = AUTOINSUMO_PRODUCTS[item.id];
    if (!product) return '';
    const lineTotal = product.price * item.qty;
    subtotal += lineTotal;
    return `• ${product.name} x${item.qty} — ${autoinsumoFormatUSD(lineTotal)}`;
  }).filter(Boolean).join('\n');

  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  return `Hola AUTOINSUMO 2000, quisiera cotizar los siguientes repuestos:\n\n${lines}\n\nSubtotal: ${autoinsumoFormatUSD(subtotal)}\nIVA (16%): ${autoinsumoFormatUSD(iva)}\nTotal estimado: ${autoinsumoFormatUSD(total)}`;
}

function autoinsumoInitCartCheckoutButtons() {
  const whatsappBtn = document.getElementById('quote-whatsapp-btn');
  const formalBtn = document.getElementById('quote-formal-btn');
  const clearBtn = document.getElementById('clear-cart-btn');

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      if (getCart().length === 0) return;
      const text = encodeURIComponent(autoinsumoBuildQuoteMessage());
      window.open(`https://wa.me/${AUTOINSUMO_WHATSAPP}?text=${text}`, '_blank');
    });
  }
  if (formalBtn) {
    formalBtn.addEventListener('click', () => {
      if (getCart().length === 0) return;
      const subject = encodeURIComponent('Solicitud de cotización — AUTOINSUMO 2000');
      const body = encodeURIComponent(autoinsumoBuildQuoteMessage());
      window.open(`mailto:${AUTOINSUMO_SALES_EMAIL}?subject=${subject}&body=${body}`, '_blank');
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      clearCart();
      autoinsumoRenderCart();
    });
  }

  const shippingSelect = document.getElementById('shipping-select');
  if (shippingSelect) {
    shippingSelect.addEventListener('change', autoinsumoUpdateCartTotals);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  autoinsumoInitFilters();
  autoinsumoInitAddToCartButtons();
  autoinsumoRenderCart();
  autoinsumoInitCartCheckoutButtons();
});
