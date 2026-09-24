export interface ThemeFile {
  path: string;
  category: 'layout' | 'templates' | 'sections' | 'snippets' | 'assets' | 'config' | 'locales';
  language: 'liquid' | 'json' | 'css' | 'javascript';
  description: string;
  content: string;
}

export const THEME_FILES: ThemeFile[] = [
  {
    path: 'layout/theme.liquid',
    category: 'layout',
    language: 'liquid',
    description: 'Master HTML wrapper with head metadata, header/footer mounting, cart drawer, and accessibility hooks',
    content: `<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="{{ settings.color_primary_bg }}">
    <link rel="canonical" href="{{ canonical_url }}">
    <link rel="preconnect" href="https://cdn.shopify.com" crossorigin>

    {%- if settings.favicon != blank -%}
      <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
    {%- endif -%}

    <title>
      {{ page_title }}
      {%- if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif -%}
      {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}
      {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
    </title>

    {% if page_description %}
      <meta name="description" content="{{ page_description | escape }}">
    {% endif %}

    {{ content_for_header }}

    <!-- Theme typography and core styles -->
    {{ 'theme.css' | asset_url | stylesheet_tag }}

    <script>
      document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
      window.KineticTheme = {
        strings: {
          addToCart: {{ 'products.product.add_to_cart' | t | json }},
          soldOut: {{ 'products.product.sold_out' | t | json }},
          unavailable: {{ 'products.product.unavailable' | t | json }}
        },
        moneyFormat: {{ shop.money_format | json }},
        routes: {
          cart_add_url: '{{ routes.cart_add_url }}',
          cart_change_url: '{{ routes.cart_change_url }}',
          cart_update_url: '{{ routes.cart_update_url }}',
          cart_url: '{{ routes.cart_url }}',
          predictive_search_url: '{{ routes.predictive_search_url }}'
        }
      };
    </script>
  </head>

  <body class="template-{{ template.name | handle }} bg-white text-neutral-900 antialiased font-sans">
    <a class="skip-to-content-link button visually-hidden" href="#MainContent">
      {{ 'accessibility.skip_to_text' | t }}
    </a>

    {% section 'header' %}

    <main id="MainContent" class="content-for-layout focus-none" role="main" tabindex="-1">
      {{ content_for_layout }}
    </main>

    {% section 'footer' %}

    {% render 'cart-drawer' %}

    <!-- Theme JavaScript Core -->
    <script src="{{ 'theme.js' | asset_url }}" defer="defer"></script>
  </body>
</html>`
  },
  {
    path: 'sections/header.liquid',
    category: 'sections',
    language: 'liquid',
    description: 'Header navigation following 1-row 3-zone contract, dynamic navigation, announcement bar and cart badge',
    content: `{% comment %}
  KINETIC Minimalist Gaming Header Section
{% endcomment %}

<header class="header-sticky border-b border-neutral-200 bg-white" data-section-id="{{ section.id }}">
  {%- if section.settings.show_announcement -%}
    <div class="bg-neutral-900 text-white text-[11px] font-medium tracking-wider text-center py-2 px-4 uppercase">
      {{ section.settings.announcement_text | default: 'Free Express Shipping on Orders Over $150 · 2-Year Full Hardware Warranty' }}
    </div>
  {%- endif -%}

  <div class="page-container flex items-center justify-between h-18">
    <!-- Zone 1: Brand Wordmark / Logo -->
    <div class="flex items-center gap-4">
      <button type="button" class="lg:hidden p-2 text-neutral-700 hover:text-neutral-900" data-mobile-menu-trigger>
        {% render 'icon', name: 'menu', class: 'w-6 h-6' %}
      </button>

      <a href="{{ routes.root_url }}" class="header-brand">
        {%- if section.settings.logo != blank -%}
          <img src="{{ section.settings.logo | image_url: width: 300 }}" alt="{{ shop.name | escape }}" width="{{ section.settings.logo_width | default: 120 }}" height="32">
        {%- else -%}
          <span class="text-xl font-extrabold tracking-tighter uppercase text-neutral-900">
            {{ shop.name | default: 'KINETIC' }}
          </span>
        {%- endif -%}
      </a>
    </div>

    <!-- Zone 2: Navigation Links -->
    <nav class="hidden lg:flex items-center gap-8">
      {%- for link in linklists[section.settings.menu].links -%}
        <a href="{{ link.url }}" class="nav-link text-sm font-medium {% if link.active %}active font-semibold{% endif %}">
          {{ link.title }}
        </a>
      {%- endfor -%}
    </nav>

    <!-- Zone 3: Actions -->
    <div class="flex items-center gap-3">
      <a href="{{ routes.search_url }}" class="p-2 text-neutral-700 hover:text-neutral-900">
        {% render 'icon', name: 'search', class: 'w-5 h-5' %}
      </a>
      <button type="button" class="p-2 text-neutral-900 relative" data-cart-drawer-trigger>
        {% render 'icon', name: 'cart', class: 'w-5 h-5' %}
        <span class="absolute top-1 right-1 w-4 h-4 bg-neutral-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums" data-cart-count>
          {{ cart.item_count }}
        </span>
      </button>
    </div>
  </div>
</header>

{% schema %}
{
  "name": "Header",
  "settings": [
    { "type": "image_picker", "id": "logo", "label": "Store Logo" },
    { "type": "range", "id": "logo_width", "min": 80, "max": 240, "step": 10, "unit": "px", "label": "Custom logo width", "default": 130 },
    { "type": "link_list", "id": "menu", "label": "Navigation Menu", "default": "main-menu" },
    { "type": "checkbox", "id": "enable_sticky_header", "label": "Enable Sticky Header", "default": true },
    { "type": "checkbox", "id": "show_announcement", "label": "Show announcement", "default": true },
    { "type": "text", "id": "announcement_text", "label": "Announcement Text", "default": "Free Express Shipping on Orders Over $150 · 2-Year Full Hardware Warranty" }
  ]
}
{% endschema %}`
  },
  {
    path: 'sections/hero-gaming.liquid',
    category: 'sections',
    language: 'liquid',
    description: 'Two-column split hero section with eyebrow, heading, buttons, and high-key minimalist gaming visual',
    content: `{% comment %}
  KINETIC Minimalist Gaming Hero Section
{% endcomment %}

<section class="relative bg-white border-b border-neutral-200 overflow-hidden" data-section-id="{{ section.id }}">
  <div class="page-container py-12 lg:py-20">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      <div class="lg:col-span-6 flex flex-col justify-center space-y-6">
        {%- if section.settings.eyebrow != blank -%}
          <div class="eyebrow-text flex items-center gap-2">
            <span class="w-2 h-2 bg-neutral-900 inline-block"></span>
            <span>{{ section.settings.eyebrow }}</span>
          </div>
        {%- endif -%}

        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.08] uppercase">
          {{ section.settings.heading | default: 'BUILT FOR YOUR NEXT LEVEL' }}
        </h1>

        <p class="text-base lg:text-lg text-neutral-600 max-w-xl font-normal leading-relaxed">
          {{ section.settings.description | default: 'Gaming gear designed for performance, precision and an exceptional gaming experience.' }}
        </p>

        <div class="flex flex-wrap items-center gap-4 pt-4">
          {%- if section.settings.primary_button_label != blank -%}
            <a href="{{ section.settings.primary_button_link | default: '/collections/all' }}" class="btn-primary">
              {{ section.settings.primary_button_label }}
            </a>
          {%- endif -%}

          {%- if section.settings.secondary_button_label != blank -%}
            <a href="{{ section.settings.secondary_button_link | default: '/collections' }}" class="btn-secondary">
              {{ section.settings.secondary_button_label }}
            </a>
          {%- endif -%}
        </div>
      </div>

      <div class="lg:col-span-6">
        <div class="relative w-full aspect-[16/10] lg:aspect-[4/3] bg-neutral-100 border border-neutral-200 overflow-hidden">
          {%- if section.settings.image != blank -%}
            <img src="{{ section.settings.image | image_url: width: 1400 }}" alt="{{ section.settings.heading | escape }}" class="w-full h-full object-cover">
          {%- else -%}
            <img src="{{ 'hero_gaming_setup.jpg' | asset_url }}" alt="Minimalist gaming setup" class="w-full h-full object-cover">
          {%- endif -%}
        </div>
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Hero Gaming",
  "tag": "section",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow Kicker", "default": "GAMING PERFORMANCE" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "BUILT FOR YOUR NEXT LEVEL" },
    { "type": "textarea", "id": "description", "label": "Description", "default": "Gaming gear designed for performance, precision and an exceptional gaming experience." },
    { "type": "image_picker", "id": "image", "label": "Hero Image" },
    { "type": "text", "id": "primary_button_label", "label": "Primary Button Label", "default": "SHOP GAMING GEAR" },
    { "type": "url", "id": "primary_button_link", "label": "Primary Button Link" },
    { "type": "text", "id": "secondary_button_label", "label": "Secondary Button Label", "default": "EXPLORE COLLECTION" },
    { "type": "url", "id": "secondary_button_link", "label": "Secondary Button Link" }
  ],
  "presets": [{ "name": "Hero Gaming" }]
}
{% endschema %}`
  },
  {
    path: 'sections/featured-products.liquid',
    category: 'sections',
    language: 'liquid',
    description: 'Dynamic 4-column product grid with quick add, rating, and vendor visibility',
    content: `{% comment %}
  KINETIC Minimalist Featured Products Grid
{% endcomment %}

<section class="py-16 lg:py-24 bg-white border-b border-neutral-200" data-section-id="{{ section.id }}">
  <div class="page-container">
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
      <div>
        <p class="eyebrow-text mb-1">PRO-GRADE GEAR</p>
        <h2 class="text-2xl lg:text-3xl font-bold uppercase tracking-tight text-neutral-900">
          {{ section.settings.heading | default: 'FEATURED GAMING GEAR' }}
        </h2>
      </div>

      {%- if section.settings.collection != blank -%}
        <a href="{{ section.settings.collection.url }}" class="text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:underline">
          View all gaming gear &rarr;
        </a>
      {%- endif -%}
    </div>

    {%- assign collection = section.settings.collection -%}
    {%- assign limit = section.settings.products_to_show | default: 8 -%}

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
      {%- for product in collection.products limit: limit -%}
        {% render 'product-card', product: product, show_vendor: section.settings.show_vendor, show_rating: section.settings.show_rating, show_quick_add: section.settings.show_quick_add %}
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Featured Products",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": "FEATURED GAMING GEAR" },
    { "type": "collection", "id": "collection", "label": "Source Collection" },
    { "type": "range", "id": "products_to_show", "min": 4, "max": 16, "step": 4, "label": "Products to show", "default": 8 },
    { "type": "checkbox", "id": "show_vendor", "label": "Show Vendor", "default": true },
    { "type": "checkbox", "id": "show_rating", "label": "Show Rating", "default": true },
    { "type": "checkbox", "id": "show_quick_add", "label": "Show Quick Add", "default": true }
  ],
  "presets": [{ "name": "Featured Products" }]
}
{% endschema %}`
  },
  {
    path: 'sections/setup-banner.liquid',
    category: 'sections',
    language: 'liquid',
    description: '50/50 split banner with high-contrast matte dark section #111111 and workstation image',
    content: `{% comment %}
  KINETIC Minimalist Setup Banner Section
{% endcomment %}

<section class="border-b border-neutral-200 overflow-hidden" data-section-id="{{ section.id }}">
  <div class="grid grid-cols-1 lg:grid-cols-2">
    <div class="relative min-h-[360px] lg:min-h-[520px] bg-neutral-100 overflow-hidden">
      {%- if section.settings.image != blank -%}
        <img src="{{ section.settings.image | image_url: width: 1200 }}" alt="{{ section.settings.heading | escape }}" class="w-full h-full object-cover">
      {%- else -%}
        <img src="{{ 'setup_banner_room.jpg' | asset_url }}" alt="Workstation" class="w-full h-full object-cover">
      {%- endif -%}
    </div>

    <div class="bg-[#111111] text-white p-8 sm:p-12 lg:p-20 flex flex-col justify-center space-y-6">
      <p class="text-[11px] font-semibold tracking-widest uppercase text-neutral-400">
        {{ section.settings.eyebrow | default: 'CURATED ECOSYSTEM' }}
      </p>

      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
        {{ section.settings.heading | default: 'BUILD YOUR SETUP' }}
      </h2>

      <p class="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-lg">
        {{ section.settings.description | default: 'Everything you need to create a clean, powerful and immersive gaming setup.' }}
      </p>

      <div class="pt-4">
        <a href="{{ section.settings.button_link | default: '/collections/all' }}" class="btn-primary btn-dark">
          {{ section.settings.button_label | default: 'EXPLORE SETUPS' }}
        </a>
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Setup Banner",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow Text", "default": "CURATED ECOSYSTEM" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "BUILD YOUR SETUP" },
    { "type": "textarea", "id": "description", "label": "Description", "default": "Everything you need to create a clean, powerful and immersive gaming setup." },
    { "type": "image_picker", "id": "image", "label": "Workstation Image" },
    { "type": "text", "id": "button_label", "label": "Button Label", "default": "EXPLORE SETUPS" },
    { "type": "url", "id": "button_link", "label": "Button Link" }
  ],
  "presets": [{ "name": "Setup Banner" }]
}
{% endschema %}`
  },
  {
    path: 'sections/performance-features.liquid',
    category: 'sections',
    language: 'liquid',
    description: '4-column engineering standards section on secondary background #F6F6F6 with reorderable blocks',
    content: `{% comment %}
  KINETIC Performance Features Section
{% endcomment %}

<section class="py-16 lg:py-24 bg-[#F6F6F6] border-b border-neutral-200">
  <div class="page-container">
    <div class="max-w-2xl mb-12">
      <p class="eyebrow-text mb-1">ENGINEERING STANDARDS</p>
      <h2 class="text-2xl lg:text-3xl font-bold uppercase tracking-tight text-neutral-900">
        {{ section.settings.heading | default: 'PERFORMANCE WITHOUT COMPROMISE' }}
      </h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {%- for block in section.blocks -%}
        <div class="bg-white border border-neutral-200 p-8 flex flex-col justify-between" {{ block.shopify_attributes }}>
          <div>
            <div class="text-neutral-400 font-mono text-xs mb-6 tabular-nums font-semibold">0{{ forloop.index }}</div>
            <h3 class="text-base font-bold uppercase tracking-tight text-neutral-900 mb-3">{{ block.settings.title }}</h3>
            <p class="text-xs text-neutral-600 leading-relaxed">{{ block.settings.description }}</p>
          </div>
        </div>
      {%- endfor -%}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Performance Features",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": "PERFORMANCE WITHOUT COMPROMISE" }
  ],
  "blocks": [
    {
      "type": "feature",
      "name": "Feature Item",
      "settings": [
        { "type": "text", "id": "title", "label": "Feature Title", "default": "PRECISION" },
        { "type": "textarea", "id": "description", "label": "Feature Description", "default": "Equipment designed for accurate and responsive control." }
      ]
    }
  ],
  "presets": [{ "name": "Performance Features" }]
}
{% endschema %}`
  },
  {
    path: 'sections/main-product.liquid',
    category: 'sections',
    language: 'liquid',
    description: 'Contiguous purchase module with variant selector, quantity stepper, dynamic checkout, and specs',
    content: `{% comment %}
  KINETIC Minimalist Gaming Main Product Section
{% endcomment %}

<section class="py-8 lg:py-16 bg-white border-b border-neutral-200" data-product-module>
  <div class="page-container">
    {% render 'breadcrumbs' %}

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mt-4">
      <div class="lg:col-span-7">
        <div class="sticky top-24 space-y-4">
          <div class="relative aspect-square bg-[#FAFAFA] border border-neutral-200 overflow-hidden">
            {%- assign current_image = product.selected_or_first_available_variant.featured_image | default: product.featured_image -%}
            <img id="ProductMainImage" src="{{ current_image | image_url: width: 1200 }}" alt="{{ product.title | escape }}" class="w-full h-full object-cover">
          </div>
        </div>
      </div>

      <div class="lg:col-span-5 flex flex-col justify-start">
        {%- assign current_variant = product.selected_or_first_available_variant -%}

        <p class="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">{{ product.vendor }}</p>
        <h1 class="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-900 mb-3">{{ product.title }}</h1>

        <div class="py-4 border-y border-neutral-100 mb-6 flex items-baseline gap-3">
          <span data-product-price class="text-2xl font-bold text-neutral-900 tabular-nums">{{ current_variant.price | money }}</span>
        </div>

        {%- form 'product', product, id: 'product-form', class: 'space-y-6', data-ajax-cart: 'true' -%}
          <input type="hidden" name="id" value="{{ current_variant.id }}">

          <div class="space-y-3 pt-2">
            <button type="submit" name="add" class="w-full py-4 bg-neutral-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors">
              {{ 'products.product.add_to_cart' | t }}
            </button>
            {%- if section.settings.show_dynamic_checkout -%}
              {{ form | payment_button }}
            {%- endif -%}
          </div>
        {%- endform -%}
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Main Product",
  "settings": [
    { "type": "checkbox", "id": "show_dynamic_checkout", "label": "Show Dynamic Checkout Button", "default": true }
  ]
}
{% endschema %}`
  },
  {
    path: 'snippets/product-card.liquid',
    category: 'snippets',
    language: 'liquid',
    description: 'Product card with secondary image hover, tabular price baseline, and quick add button',
    content: `{% comment %}
  Renders a minimalist gaming product card.
{% endcomment %}

<article class="product-card group {{ class }}">
  <div class="product-card-media relative">
    <a href="{{ product.url }}" class="block w-full h-full" tabindex="-1">
      <img src="{{ product.featured_media | image_url: width: 600 }}" alt="{{ product.title | escape }}" class="product-card-img" loading="lazy">
    </a>

    {%- if show_quick_add and product.available -%}
      <div class="product-card-quick-add">
        <form method="post" action="{{ routes.cart_add_url }}" data-ajax-cart>
          <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
          <button type="submit" class="w-full py-2 bg-neutral-900 text-white text-xs font-semibold tracking-wider uppercase">
            {{ 'products.product.quick_add' | t }}
          </button>
        </form>
      </div>
    {%- endif -%}
  </div>

  <div class="p-4 flex flex-col flex-1 bg-white justify-between">
    <div>
      <p class="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase mb-1">{{ product.vendor }}</p>
      <h3 class="text-sm font-semibold text-neutral-900 line-clamp-2">
        <a href="{{ product.url }}">{{ product.title }}</a>
      </h3>
    </div>

    <div class="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
      {% render 'price', product: product, use_variant: true %}
      <span class="text-[11px] font-medium text-neutral-500">In Stock</span>
    </div>
  </div>
</article>`
  },
  {
    path: 'snippets/cart-drawer.liquid',
    category: 'snippets',
    language: 'liquid',
    description: 'AJAX Cart Drawer slide-out panel with free shipping progress bar, quantity adjustments and subtotal',
    content: `{% comment %}
  Slide-out AJAX Cart Drawer
{% endcomment %}

<div id="CartDrawerOverlay" class="cart-drawer-overlay"></div>

<aside id="CartDrawer" class="cart-drawer" role="dialog" aria-modal="true">
  <div class="p-5 border-b border-neutral-200 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <h2 class="text-base font-bold uppercase tracking-tight text-neutral-900">{{ 'sections.cart.title' | t }}</h2>
      <span class="text-xs font-semibold px-2 py-0.5 bg-neutral-100 text-neutral-800 tabular-nums" data-cart-count>{{ cart.item_count }}</span>
    </div>
    <button type="button" class="p-2 text-neutral-500 hover:text-neutral-900" data-cart-drawer-close>
      {% render 'icon', name: 'close', class: 'w-5 h-5' %}
    </button>
  </div>

  <div id="CartDrawerItems" class="flex-1 overflow-y-auto p-5 space-y-4">
    <!-- Rendered via theme.js fetchCart() -->
  </div>

  <div class="p-5 border-t border-neutral-200 bg-white space-y-4">
    <div class="flex justify-between items-baseline">
      <span class="text-sm font-semibold uppercase tracking-wider text-neutral-600">{{ 'sections.cart.subtotal' | t }}</span>
      <span id="CartDrawerSubtotal" class="text-lg font-bold text-neutral-900 tabular-nums">{{ cart.total_price | money }}</span>
    </div>

    <form action="{{ routes.cart_url }}" method="post">
      <button type="submit" name="checkout" class="w-full py-3.5 bg-neutral-900 text-white font-semibold text-xs tracking-wider uppercase hover:bg-neutral-800 transition-colors">
        {{ 'sections.cart.checkout' | t }}
      </button>
    </form>
  </div>
</aside>`
  },
  {
    path: 'templates/index.json',
    category: 'templates',
    language: 'json',
    description: 'Online Store 2.0 homepage template wiring hero, categories, featured products, banner, features, carousel, newsletter',
    content: `{
  "sections": {
    "hero": {
      "type": "hero-gaming",
      "settings": {
        "eyebrow": "GAMING PERFORMANCE",
        "heading": "BUILT FOR YOUR NEXT LEVEL",
        "description": "Gaming gear designed for performance, precision and an exceptional gaming experience.",
        "primary_button_label": "SHOP GAMING GEAR",
        "primary_button_link": "/collections/all",
        "secondary_button_label": "EXPLORE COLLECTION",
        "secondary_button_link": "/collections"
      }
    },
    "categories": {
      "type": "gaming-categories",
      "settings": { "heading": "SHOP BY CATEGORY" }
    },
    "featured_products": {
      "type": "featured-products",
      "settings": {
        "heading": "FEATURED GAMING GEAR",
        "products_to_show": 8
      }
    },
    "setup_banner": {
      "type": "setup-banner",
      "settings": {
        "eyebrow": "CURATED WORKSPACES",
        "heading": "BUILD YOUR SETUP",
        "button_label": "EXPLORE SETUPS"
      }
    },
    "performance_features": {
      "type": "performance-features",
      "settings": { "heading": "PERFORMANCE WITHOUT COMPROMISE" }
    },
    "best_sellers": {
      "type": "best-sellers",
      "settings": { "heading": "BEST SELLERS" }
    },
    "newsletter": {
      "type": "newsletter",
      "settings": { "heading": "STAY IN THE GAME" }
    }
  },
  "order": [
    "hero",
    "categories",
    "featured_products",
    "setup_banner",
    "performance_features",
    "best_sellers",
    "newsletter"
  ]
}`
  },
  {
    path: 'assets/theme.css',
    category: 'assets',
    language: 'css',
    description: 'Clean Light OS 2.0 Theme Engine: Pure Light Studio, Warm Alabaster, and Platinum Slate presets with fluid edge-to-edge layout',
    content: `:root {
  /* Default: Pure Light Studio */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F8F9FA;
  --color-bg-tertiary: #F1F3F5;
  --color-text-primary: #111827;
  --color-text-secondary: #4B5563;
  --color-text-muted: #9CA3AF;
  --color-border: #E5E7EB;
  --color-accent: #111827;
  --color-button-bg: #111827;
  --color-button-text: #FFFFFF;
  --page-max-width: 100%;
}

[data-theme-style="light-studio"] {
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F8F9FA;
  --color-text-primary: #111827;
  --color-accent: #111827;
  --color-border: #E5E7EB;
}

[data-theme-style="warm-alabaster"] {
  --color-bg-primary: #FAF8F5;
  --color-bg-secondary: #F3EFEA;
  --color-text-primary: #1C1917;
  --color-accent: #451A03;
  --color-border: #E6DFD5;
}

[data-theme-style="platinum-slate"] {
  --color-bg-primary: #F8FAFC;
  --color-bg-secondary: #F1F5F9;
  --color-text-primary: #0F172A;
  --color-accent: #0F172A;
  --color-border: #CBD5E1;
}`
  },
  {
    path: 'config/settings_data.json',
    category: 'config',
    language: 'json',
    description: 'Shopify configuration presets for Pure Light Studio, Warm Alabaster, and Platinum Slate styles',
    content: `{
  "current": {
    "theme_style": "light-studio",
    "color_primary_bg": "#FFFFFF",
    "color_secondary_bg": "#F8F9FA",
    "color_primary_text": "#111827",
    "color_accent": "#111827",
    "cart_type": "drawer",
    "page_width": 1920
  },
  "presets": {
    "Pure Light Studio": {
      "theme_style": "light-studio",
      "color_primary_bg": "#FFFFFF",
      "color_accent": "#111827"
    },
    "Warm Alabaster": {
      "theme_style": "warm-alabaster",
      "color_primary_bg": "#FAF8F5",
      "color_accent": "#451A03"
    },
    "Platinum Slate": {
      "theme_style": "platinum-slate",
      "color_primary_bg": "#F8FAFC",
      "color_accent": "#0F172A"
    }
  }
}`
  },
  {
    path: 'config/settings_schema.json',
    category: 'config',
    language: 'json',
    description: 'Shopify Theme Customizer settings schema defining monochrome color palette, typography, cart drawer, and layout',
    content: `[
  {
    "name": "theme_info",
    "theme_name": "KINETIC Minimalist Gaming",
    "theme_version": "2.4.0",
    "theme_author": "KINETIC Design Systems"
  },
  {
    "name": "Colors",
    "settings": [
      { "type": "color", "id": "color_primary_bg", "label": "Primary Background", "default": "#FFFFFF" },
      { "type": "color", "id": "color_secondary_bg", "label": "Secondary Background", "default": "#F6F6F6" },
      { "type": "color", "id": "color_primary_text", "label": "Primary Text", "default": "#111111" },
      { "type": "color", "id": "color_secondary_text", "label": "Secondary Text", "default": "#666666" },
      { "type": "color", "id": "color_dark_section_bg", "label": "Dark Section Background", "default": "#111111" },
      { "type": "color", "id": "color_borders", "label": "Border Lines", "default": "#E5E5E5" }
    ]
  },
  {
    "name": "Layout & Grid",
    "settings": [
      { "type": "range", "id": "page_width", "min": 1000, "max": 1600, "step": 20, "unit": "px", "label": "Maximum Page Width", "default": 1440 },
      { "type": "range", "id": "card_corner_radius", "min": 0, "max": 12, "step": 2, "unit": "px", "label": "Card Corner Radius", "default": 2 }
    ]
  }
]`
  },
  {
    path: 'locales/en.default.json',
    category: 'locales',
    language: 'json',
    description: 'Comprehensive English language dictionary for storefront translations and accessibility',
    content: `{
  "general": {
    "search": "Search equipment, PCs, monitors...",
    "continue_shopping": "Continue shopping",
    "newsletter_title": "Stay in the game",
    "newsletter_button": "Subscribe"
  },
  "sections": {
    "cart": {
      "title": "Your Cart",
      "empty": "Your cart is currently empty",
      "subtotal": "Subtotal",
      "checkout": "Proceed to Checkout"
    }
  },
  "products": {
    "product": {
      "add_to_cart": "Add to Cart",
      "sold_out": "Sold Out",
      "quick_add": "Quick Add"
    }
  }
}`
  }
];
