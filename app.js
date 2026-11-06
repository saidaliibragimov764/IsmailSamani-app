/* Connect the original design screens into a navigable prototype. */
(() => {
  const pages = {
    home: '../ismailsamani_mukammal_dashboard_yangilangan/code.html',
    menu: '../ismailsamani_menyu_bo_limi/code.html',
    product: '../ismailsamani_mahsulot_tafsilotlari_kapuchino_klasik/code.html',
    cart: '../ismailsamani_savatcha_ishlovchi_slide_to_pay/code.html',
    profile: '../ismailsamani_profil/code.html',
    orders: '../ismailsamani_buyurtmalar_tarixi/code.html',
    notifications: '../ismailsamani_bildirishnomalar/code.html'
  };
  const go = page => { location.href = pages[page]; };
  document.querySelectorAll('nav a').forEach(link => {
    const text = link.textContent;
    if (text.includes('Bosh sahifa')) link.href = pages.home;
    else if (text.includes('Menyu')) link.href = pages.menu;
    else if (text.includes('Profil')) link.href = pages.profile;
  });
  document.querySelectorAll('[aria-label="Savatcha"], [aria-label="Savat"]').forEach(el => el.addEventListener('click', () => go('cart')));
  document.querySelectorAll('[aria-label="Notifications"]').forEach(el => el.addEventListener('click', () => go('notifications')));
  document.querySelectorAll('a').forEach(link => {
    if (link.textContent.includes('Buyurtmalar tarixi')) link.href = pages.orders;
    if (link.textContent.includes('Barchasi') && !link.closest('nav')) link.href = pages.menu;
  });
  document.querySelectorAll('[onclick="history.back()"]').forEach(el => {
    el.removeAttribute('onclick');
    el.addEventListener('click', () => history.length > 1 ? history.back() : go('home'));
  });
  if (location.pathname.includes('ismailsamani_mukammal_dashboard')) {
    document.querySelectorAll('button').forEach(button => {
      const text = button.textContent;
      if (/Buyurtma berish|Tatib ko.rish|Tanlash|Nonushta|Tushlik va kechki ovqat|Ichimliklar/.test(text)) button.addEventListener('click', () => go('menu'));
      if (button.getAttribute('aria-label') === "Savatga qo'shish") button.addEventListener('click', () => go('menu'));
    });
  }
  if (location.pathname.includes('ismailsamani_menyu_bo_limi')) {
    let category = 'all';
    const input = document.querySelector('input[placeholder]');
    const items = [...document.querySelectorAll('.product-item')];
    const filter = () => {
      const query = input.value.trim().toLocaleLowerCase('uz');
      items.forEach(item => { item.style.display = (category === 'all' || item.dataset.category === category) && item.textContent.toLocaleLowerCase('uz').includes(query) ? '' : 'none'; });
    };
    window.switchCategory = (value, button) => {
      category = value;
      document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('bg-primary-container', 'text-secondary-container', 'shadow-sm', 'font-semibold');
        tab.classList.add('text-on-surface-variant');
      });
      button.classList.add('bg-primary-container', 'text-secondary-container', 'shadow-sm', 'font-semibold');
      button.classList.remove('text-on-surface-variant');
      document.getElementById('category-title').textContent = value === 'all' ? 'Barcha mahsulotlar' : button.textContent.trim();
      filter();
    };
    input.addEventListener('input', filter);
    items.forEach(item => {
      if (/kapuchino/i.test(item.textContent)) {
        item.style.cursor = 'pointer';
        item.setAttribute('role', 'link');
        item.tabIndex = 0;
        item.addEventListener('click', () => go('product'));
        item.addEventListener('keydown', e => { if (e.key === 'Enter') go('product'); });
      } else {
        // Only the cappuccino has a detail screen in the supplied designs.
        const button = item.querySelector('button');
        if (button) button.addEventListener('click', () => { button.title = 'Namuna mahsulot'; });
      }
    });
  }
})();
