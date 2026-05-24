(() => {
  const cart = [];

  const safeGet = (id) => document.getElementById(id);

  function openCart() {
    const overlay = safeGet('cartOverlay');
    const drawer = safeGet('cartDrawer');
    if (!overlay || !drawer) return;
    overlay.classList.add('open');
    drawer.classList.add('open');
  }

  function closeCart() {
    const overlay = safeGet('cartOverlay');
    const drawer = safeGet('cartDrawer');
    if (!overlay || !drawer) return;
    overlay.classList.remove('open');
    drawer.classList.remove('open');
  }

  function addToCart(name, price) {
    const priceNum = parseInt(price.replace('$', ''), 10);
    const existing = cart.find((item) => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, priceNum, qty: 1 });
    }
    renderCart();
    showToast();
    openCart();
  }

  function renderCart() {
    const container = safeGet('cartItems');
    const footer = safeGet('cartFooter');
    const countEl = safeGet('cartCount');
    const badge = safeGet('cartCountBadge');
    const totalEl = safeGet('cartTotal');

    if (!container || !countEl || !badge || !totalEl) return;

    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const total = cart.reduce((sum, item) => sum + item.priceNum * item.qty, 0);

    countEl.textContent = count;
    badge.textContent = count;

    if (cart.length === 0) {
      container.innerHTML = '<div class="cart-empty"><span class="big">★</span>Your cart is empty</div>';
      if (footer) footer.style.display = 'none';
      totalEl.textContent = '$0';
      return;
    }

    if (footer) footer.style.display = 'block';
    totalEl.textContent = '$' + total;

    container.innerHTML = cart
      .map(
        (item, index) => `
          <div class="cart-item">
            <div style="background:#2e2e2e;width:80px;height:80px;display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:28px;color:var(--red)">★</div>
            <div>
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-detail">QTY: ${item.qty}</div>
            </div>
            <div>
              <div class="cart-item-price">${item.price}</div>
              <button onclick="removeItem(${index})" style="background:none;border:none;color:rgba(245,244,240,0.3);font-size:11px;letter-spacing:0.1em;cursor:none;margin-top:8px;font-family:'Barlow Condensed',sans-serif;text-transform:uppercase;">Remove</button>
            </div>
          </div>
        `
      )
      .join('');
  }

  function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
  }

  function showToast() {
    const toast = safeGet('toast');
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function selectSize(button) {
    document.querySelectorAll('.size-btn').forEach((sizeButton) => sizeButton.classList.remove('active'));
    button.classList.add('active');
  }

  function toggleMenu() {
    const hamburger = safeGet('hamburger');
    const menu = safeGet('mobileMenu');
    if (!hamburger || !menu) return;
    hamburger.classList.toggle('open');
    menu.classList.toggle('open');
  }

  function filterGallery(button, tag) {
    document.querySelectorAll('.filter-btn').forEach((item) => item.classList.remove('active'));
    if (button) button.classList.add('active');

    document.querySelectorAll('.masonry-item').forEach((item) => {
      if (tag === 'all' || item.dataset.tag === tag) {
        item.style.display = '';
        setTimeout(() => {
          item.style.opacity = '1';
        }, 50);
      } else {
        item.style.opacity = '0';
        setTimeout(() => {
          item.style.display = 'none';
        }, 400);
      }
    });
  }

  const heroImg = safeGet('heroImg');
  if (heroImg) {
    heroImg.onload = () => heroImg.classList.add('loaded');
  }

  window.openCart = openCart;
  window.closeCart = closeCart;
  window.addToCart = addToCart;
  window.renderCart = renderCart;
  window.removeItem = removeItem;
  window.showToast = showToast;
  window.selectSize = selectSize;
  window.toggleMenu = toggleMenu;
  window.filterGallery = filterGallery;
})();
