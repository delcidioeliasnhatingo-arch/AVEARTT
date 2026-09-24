/**
 * KINETIC Minimalist Gaming Shopify Theme JS
 * High-performance vanilla JavaScript for AJAX Cart, Drawer, Variants, and Predictive Search.
 */

class KineticCartDrawer {
  constructor() {
    this.drawer = document.getElementById('CartDrawer');
    this.overlay = document.getElementById('CartDrawerOverlay');
    this.cartTriggers = document.querySelectorAll('[data-cart-drawer-trigger]');
    this.closeButtons = document.querySelectorAll('[data-cart-drawer-close]');
    this.itemContainer = document.getElementById('CartDrawerItems');
    this.subtotalElement = document.getElementById('CartDrawerSubtotal');
    this.countBadges = document.querySelectorAll('[data-cart-count]');
    this.shippingBar = document.getElementById('CartDrawerShippingBar');
    this.shippingMessage = document.getElementById('CartDrawerShippingMsg');

    this.init();
  }

  init() {
    this.cartTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    this.closeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    });

    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });

    // Intercept all native Shopify product forms with data-ajax-cart
    document.addEventListener('submit', (e) => {
      const form = e.target.closest('form[action*="/cart/add"]');
      if (form) {
        e.preventDefault();
        this.addItemFromForm(form);
      }
    });

    // Delegate quantity changes inside drawer
    if (this.drawer) {
      this.drawer.addEventListener('click', (e) => {
        const qtyBtn = e.target.closest('[data-cart-quantity-change]');
        if (qtyBtn) {
          const line = qtyBtn.dataset.line;
          const delta = parseInt(qtyBtn.dataset.delta, 10);
          const currentQty = parseInt(qtyBtn.dataset.currentQty, 10);
          this.changeQuantity(line, currentQty + delta);
        }

        const removeBtn = e.target.closest('[data-cart-remove]');
        if (removeBtn) {
          const line = removeBtn.dataset.line;
          this.changeQuantity(line, 0);
        }
      });
    }
  }

  open() {
    if (!this.drawer) return;
    this.drawer.classList.add('active');
    if (this.overlay) this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.drawer) return;
    this.drawer.classList.remove('active');
    if (this.overlay) this.overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  async fetchCart() {
    try {
      const res = await fetch(window.KineticTheme.routes.cart_url + '.js');
      const cart = await res.json();
      this.renderCart(cart);
      return cart;
    } catch (err) {
      console.error('Failed to fetch cart state', err);
    }
  }

  async addItemFromForm(form) {
    const formData = new FormData(form);
    try {
      const res = await fetch(window.KineticTheme.routes.cart_add_url + '.js', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        await this.fetchCart();
        this.open();
      }
    } catch (err) {
      console.error('Failed to add product to cart', err);
    }
  }

  async changeQuantity(line, quantity) {
    try {
      const res = await fetch(window.KineticTheme.routes.cart_change_url + '.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line: parseInt(line, 10), quantity: parseInt(quantity, 10) })
      });
      const cart = await res.json();
      this.renderCart(cart);
    } catch (err) {
      console.error('Failed to update line item quantity', err);
    }
  }

  formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2);
  }

  renderCart(cart) {
    // Update badge counters
    this.countBadges.forEach(badge => {
      badge.textContent = cart.item_count;
      badge.style.display = cart.item_count > 0 ? 'inline-flex' : 'none';
    });

    if (this.subtotalElement) {
      this.subtotalElement.textContent = this.formatMoney(cart.total_price);
    }

    // Free shipping threshold calculations
    const threshold = (window.KineticTheme.freeShippingThreshold || 150) * 100;
    if (this.shippingBar && this.shippingMessage) {
      if (cart.total_price >= threshold) {
        this.shippingBar.style.width = '100%';
        this.shippingMessage.innerHTML = 'You unlocked <strong>Free Expedited Shipping</strong>';
      } else {
        const percent = Math.min(100, Math.round((cart.total_price / threshold) * 100));
        const remaining = threshold - cart.total_price;
        this.shippingBar.style.width = `${percent}%`;
        this.shippingMessage.innerHTML = `Add <strong>${this.formatMoney(remaining)}</strong> more for free expedited delivery`;
      }
    }

    if (!this.itemContainer) return;

    if (cart.item_count === 0) {
      this.itemContainer.innerHTML = `
        <div class="py-16 text-center">
          <p class="text-neutral-500 text-sm mb-4">Your gaming cart is currently empty</p>
          <button type="button" class="btn-primary" data-cart-drawer-close>Continue Exploring</button>
        </div>
      `;
      return;
    }

    let html = '';
    cart.items.forEach((item, index) => {
      const lineNum = index + 1;
      html += `
        <div class="flex gap-4 py-4 border-b border-neutral-200">
          <div class="w-20 h-20 bg-neutral-100 shrink-0 border border-neutral-200 overflow-hidden">
            <img src="${item.featured_image.url}" alt="${item.title}" class="w-full h-full object-cover">
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="text-sm font-semibold text-neutral-900 truncate">${item.product_title}</h4>
                ${item.variant_title ? `<p class="text-xs text-neutral-500 mt-0.5">${item.variant_title}</p>` : ''}
              </div>
              <button type="button" class="text-neutral-400 hover:text-neutral-900 text-xs p-1" data-cart-remove data-line="${lineNum}" aria-label="Remove item">
                &times;
              </button>
            </div>
            <div class="flex items-center justify-between mt-3">
              <div class="qty-stepper">
                <button type="button" data-cart-quantity-change data-line="${lineNum}" data-delta="-1" data-current-qty="${item.quantity}">-</button>
                <input type="text" value="${item.quantity}" readonly>
                <button type="button" data-cart-quantity-change data-line="${lineNum}" data-delta="1" data-current-qty="${item.quantity}">+</button>
              </div>
              <span class="text-sm font-bold tabular-nums">${this.formatMoney(item.final_line_price)}</span>
            </div>
          </div>
        </div>
      `;
    });

    this.itemContainer.innerHTML = html;
  }
}

// Product Variant Selector Controller
class KineticProductVariants {
  constructor(container) {
    this.container = container;
    this.form = container.querySelector('form[action*="/cart/add"]');
    this.priceElement = container.querySelector('[data-product-price]');
    this.comparePriceElement = container.querySelector('[data-product-compare-price]');
    this.idInput = container.querySelector('input[name="id"]');
    this.radioInputs = container.querySelectorAll('input[type="radio"][data-variant-option]');

    this.init();
  }

  init() {
    this.radioInputs.forEach(input => {
      input.addEventListener('change', () => this.handleOptionChange());
    });
  }

  handleOptionChange() {
    const selectedOptions = Array.from(this.radioInputs)
      .filter(r => r.checked)
      .map(r => r.value);

    // Look for matching variant in Shopify product JSON embedded on page
    if (window.KineticCurrentProduct && window.KineticCurrentProduct.variants) {
      const match = window.KineticCurrentProduct.variants.find(v => {
        return v.options.every((opt, i) => opt === selectedOptions[i]);
      });

      if (match) {
        if (this.idInput) this.idInput.value = match.id;
        if (this.priceElement) this.priceElement.textContent = '$' + (match.price / 100).toFixed(2);
        if (this.comparePriceElement) {
          if (match.compare_at_price && match.compare_at_price > match.price) {
            this.comparePriceElement.textContent = '$' + (match.compare_at_price / 100).toFixed(2);
            this.comparePriceElement.style.display = 'inline';
          } else {
            this.comparePriceElement.style.display = 'none';
          }
        }
      }
    }
  }
}

// Mobile Menu Navigation Drawer
class KineticMobileNav {
  constructor() {
    this.menuDrawer = document.getElementById('MobileNavDrawer');
    this.menuTrigger = document.querySelector('[data-mobile-menu-trigger]');
    this.closeButtons = document.querySelectorAll('[data-mobile-menu-close]');

    if (this.menuTrigger && this.menuDrawer) {
      this.init();
    }
  }

  init() {
    this.menuTrigger.addEventListener('click', () => {
      this.menuDrawer.classList.toggle('active');
      document.body.style.overflow = this.menuDrawer.classList.contains('active') ? 'hidden' : '';
    });

    this.closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.menuDrawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.kineticCart = new KineticCartDrawer();
  window.kineticMobileNav = new KineticMobileNav();

  const productModules = document.querySelectorAll('[data-product-module]');
  productModules.forEach(el => new KineticProductVariants(el));
});
