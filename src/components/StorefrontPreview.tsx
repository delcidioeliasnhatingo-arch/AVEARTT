import React, { useRef, useState } from 'react';
import { Search, ShoppingBag, ChevronRight, ChevronLeft, Star, User, ShieldCheck, Zap, Activity, Cpu, ArrowUpRight, Check } from 'lucide-react';
import { Product, Collection, heroImg, roomImg } from '../data/mockStoreData';
import { ThemeSettingsState } from './ThemeEditorPanel';

interface StorefrontPreviewProps {
  settings: ThemeSettingsState;
  products: Product[];
  collections: Collection[];
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  viewportWidth: '100%' | '768px' | '375px';
}

export const StorefrontPreview: React.FC<StorefrontPreviewProps> = ({
  settings,
  products,
  collections,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onSelectProduct,
  onQuickAdd,
  viewportWidth,
}) => {
  const [selectedCategoryHandle, setSelectedCategoryHandle] = useState<string>('all');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const style = settings.themeStyle; // 'light-studio' | 'warm-alabaster' | 'platinum-slate'

  // Refined light palette tokens (Clean, non-cyberpunk)
  const isAlabaster = style === 'warm-alabaster';
  const isPlatinum = style === 'platinum-slate';

  const bgCanvas = isAlabaster ? 'bg-[#FAF8F5]' : isPlatinum ? 'bg-[#F8FAFC]' : 'bg-white';
  const bgCard = isAlabaster ? 'bg-[#FFFFFF]' : isPlatinum ? 'bg-[#FFFFFF]' : 'bg-white';
  const bgSecondary = isAlabaster ? 'bg-[#F3EFEA]' : isPlatinum ? 'bg-[#F1F5F9]' : 'bg-[#F8F9FA]';
  const bgTertiary = isAlabaster ? 'bg-[#EAE4DC]' : isPlatinum ? 'bg-[#E2E8F0]' : 'bg-[#F1F3F5]';
  const borderCol = isAlabaster ? 'border-[#E6DFD5]' : isPlatinum ? 'border-[#E2E8F0]' : 'border-neutral-200';
  const borderHover = isAlabaster ? 'hover:border-amber-700' : isPlatinum ? 'hover:border-slate-800' : 'hover:border-neutral-900';
  const textPrimary = isAlabaster ? 'text-[#1C1917]' : isPlatinum ? 'text-[#0F172A]' : 'text-neutral-900';
  const textSecondary = isAlabaster ? 'text-[#57534E]' : isPlatinum ? 'text-[#475569]' : 'text-neutral-600';
  const textMuted = isAlabaster ? 'text-[#78716C]' : isPlatinum ? 'text-[#64748B]' : 'text-neutral-400';
  const accentText = isAlabaster ? 'text-amber-900' : isPlatinum ? 'text-slate-900' : 'text-neutral-900';
  const accentBg = isAlabaster ? 'bg-amber-950 text-white hover:bg-black' : isPlatinum ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-neutral-900 text-white hover:bg-neutral-800';
  const badgeBg = isAlabaster ? 'bg-[#EFEAE2] text-[#44403C] border border-[#DDD5C7]' : isPlatinum ? 'bg-[#E2E8F0] text-[#1E293B] border border-[#CBD5E1]' : 'bg-neutral-100 text-neutral-800 border border-neutral-200';

  const isFullWidth = viewportWidth === '100%';

  const filteredProducts = selectedCategoryHandle === 'all'
    ? products
    : products.filter((p) => {
        if (selectedCategoryHandle === 'gaming-pcs') return p.productType === 'Gaming PCs';
        if (selectedCategoryHandle === 'monitors') return p.productType === 'Monitors';
        if (selectedCategoryHandle === 'keyboards') return p.productType === 'Keyboards';
        if (selectedCategoryHandle === 'mice') return p.productType === 'Mice';
        if (selectedCategoryHandle === 'headsets') return p.productType === 'Headsets';
        if (selectedCategoryHandle === 'accessories') return p.productType === 'Accessories';
        return true;
      });

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSubscribed(true);
      setTimeout(() => setEmailSubscribed(false), 4000);
      setEmailInput('');
    }
  };

  return (
    <div className={`flex-1 ${bgCanvas} overflow-y-auto w-full h-full flex flex-col items-center ${isFullWidth ? 'p-0' : 'p-4 sm:p-6'}`}>
      {/* Viewport Canvas: 100% full bleed with no outer borders when in full mode */}
      <div
        className={`${bgCanvas} min-h-full transition-all duration-300 w-full flex flex-col ${isFullWidth ? 'border-0 shadow-none' : `border ${borderCol} shadow-xl rounded-md overflow-hidden`}`}
        style={{ maxWidth: isFullWidth ? '100%' : viewportWidth }}
        data-theme-style={style}
      >
        {/* =========================================================
            HEADER (sections/header.liquid) - Full Screen Edge-to-Edge
        ========================================================= */}
        <header className={`sticky top-0 z-40 ${bgCanvas} border-b ${borderCol} transition-colors backdrop-blur-md bg-opacity-95`}>
          {/* Announcement Bar */}
          {settings.announcementShow && (
            <div className={`${bgSecondary} border-b ${borderCol} text-xs font-medium text-center py-2.5 px-4 text-neutral-700 flex items-center justify-center gap-2`}>
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900"></span>
              <span>{settings.announcementText}</span>
            </div>
          )}

          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-24 flex items-center justify-between h-20">
            {/* Brand Wordmark */}
            <div className="flex items-center gap-6">
              <a href="#" className="flex items-center gap-2 group">
                <span className={`text-xl sm:text-2xl font-black tracking-tight uppercase ${textPrimary} flex items-center gap-1`}>
                  <span>AVEART</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900"></span>
                </span>
                <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-sm ${badgeBg}`}>
                  PRO GAMING
                </span>
              </a>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider">
              <button
                onClick={() => setSelectedCategoryHandle('all')}
                className={`transition-colors pb-1 border-b-2 ${selectedCategoryHandle === 'all' ? `${textPrimary} border-neutral-900 font-bold` : `${textMuted} hover:${textPrimary} border-transparent`}`}
              >
                All Products
              </button>
              <button
                onClick={() => setSelectedCategoryHandle('gaming-pcs')}
                className={`transition-colors pb-1 border-b-2 ${selectedCategoryHandle === 'gaming-pcs' ? `${textPrimary} border-neutral-900 font-bold` : `${textMuted} hover:${textPrimary} border-transparent`}`}
              >
                Gaming PCs
              </button>
              <button
                onClick={() => setSelectedCategoryHandle('monitors')}
                className={`transition-colors pb-1 border-b-2 ${selectedCategoryHandle === 'monitors' ? `${textPrimary} border-neutral-900 font-bold` : `${textMuted} hover:${textPrimary} border-transparent`}`}
              >
                Displays
              </button>
              <button
                onClick={() => setSelectedCategoryHandle('keyboards')}
                className={`transition-colors pb-1 border-b-2 ${selectedCategoryHandle === 'keyboards' ? `${textPrimary} border-neutral-900 font-bold` : `${textMuted} hover:${textPrimary} border-transparent`}`}
              >
                Keyboards
              </button>
              <button
                onClick={() => setSelectedCategoryHandle('mice')}
                className={`transition-colors pb-1 border-b-2 ${selectedCategoryHandle === 'mice' ? `${textPrimary} border-neutral-900 font-bold` : `${textMuted} hover:${textPrimary} border-transparent`}`}
              >
                Mice
              </button>
              <button
                onClick={() => setSelectedCategoryHandle('accessories')}
                className={`transition-colors pb-1 border-b-2 ${selectedCategoryHandle === 'accessories' ? `${textPrimary} border-neutral-900 font-bold` : `${textMuted} hover:${textPrimary} border-transparent`}`}
              >
                Accessories
              </button>
            </nav>

            {/* Actions: Search, Account, Cart */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenSearch}
                className={`p-2.5 rounded-full ${bgSecondary} hover:${bgTertiary} ${textPrimary} transition-colors`}
                title="Search collection"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={() => alert('Shopify Customer Account Login')}
                className={`hidden sm:inline-flex p-2.5 rounded-full ${bgSecondary} hover:${bgTertiary} ${textPrimary} transition-colors`}
                title="Account"
              >
                <User className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCart}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full ${accentBg} text-xs font-bold uppercase tracking-wider transition-all shadow-xs`}
                title="Cart Drawer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[11px] tabular-nums font-bold">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* =========================================================
            HERO SECTION (sections/hero-gaming.liquid) - Full Screen Edge-to-Edge
        ========================================================= */}
        <section className={`relative border-b ${borderCol} overflow-hidden ${bgCanvas}`}>
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-24 py-14 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-neutral-100 text-neutral-800 border border-neutral-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>{settings.heroEyebrow}</span>
                </div>

                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight ${textPrimary} leading-[1.08] uppercase`}>
                  {settings.heroHeading}
                </h1>

                <p className={`text-base sm:text-lg ${textSecondary} max-w-xl font-normal leading-relaxed`}>
                  {settings.heroDescription}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      setSelectedCategoryHandle('all');
                      document.getElementById('catalog-anchor')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-8 py-4 ${accentBg} font-bold text-xs uppercase tracking-widest transition-transform hover:-translate-y-0.5 shadow-sm rounded-sm`}
                  >
                    {settings.heroPrimaryBtnText}
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById('categories-anchor')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-8 py-4 ${bgCard} ${textPrimary} border ${borderCol} font-bold text-xs uppercase tracking-widest hover:${borderHover} transition-colors shadow-xs rounded-sm`}
                  >
                    {settings.heroSecondaryBtnText}
                  </button>
                </div>

                {/* Clean Hardware Metrics */}
                <div className={`pt-8 border-t ${borderCol} grid grid-cols-3 gap-6`}>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1 text-neutral-900">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <p className="font-extrabold text-xl tabular-nums">0.12ms</p>
                    </div>
                    <p className={`text-xs ${textMuted} font-medium`}>Input Response</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1 text-neutral-900">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <p className="font-extrabold text-xl tabular-nums">8000Hz</p>
                    </div>
                    <p className={`text-xs ${textMuted} font-medium`}>Polling Frequency</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1 text-neutral-900">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <p className="font-extrabold text-xl">2-YEAR</p>
                    </div>
                    <p className={`text-xs ${textMuted} font-medium`}>Direct Warranty</p>
                  </div>
                </div>
              </div>

              {/* Right Media */}
              <div className="lg:col-span-6">
                <div className={`relative w-full aspect-[16/10] lg:aspect-[4/3] ${bgSecondary} border ${borderCol} overflow-hidden rounded-lg shadow-sm group`}>
                  <img
                    src={heroImg}
                    alt="Minimalist gaming setup"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-md text-xs font-semibold text-neutral-900 border border-neutral-200/80 shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Studio Rig 01 · 34" Curved OLED 240Hz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            CATEGORIES GRID (sections/gaming-categories.liquid) - Full Screen Edge-to-Edge
        ========================================================= */}
        <section id="categories-anchor" className={`py-16 lg:py-20 ${bgSecondary} border-b ${borderCol}`}>
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-24">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className={`text-xs font-bold tracking-widest uppercase ${textMuted} mb-1`}>
                  Curated Equipment
                </p>
                <h2 className={`text-2xl sm:text-3xl font-extrabold uppercase tracking-tight ${textPrimary}`}>
                  Product Categories
                </h2>
              </div>
              <button
                onClick={() => setSelectedCategoryHandle('all')}
                className={`text-xs font-bold uppercase tracking-wider ${accentText} hover:underline flex items-center gap-1`}
              >
                <span>View Full Lineup</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
              {collections.slice(0, 4).map((col) => (
                <div
                  key={col.id}
                  onClick={() => {
                    setSelectedCategoryHandle(col.handle);
                    document.getElementById('catalog-anchor')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`group ${bgCard} border ${borderCol} ${borderHover} overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 p-5 rounded-lg shadow-xs flex flex-col justify-between`}
                >
                  <div className={`aspect-square ${bgSecondary} mb-4 overflow-hidden relative rounded-md border ${borderCol}`}>
                    <img
                      src={col.image}
                      alt={col.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-sm sm:text-base font-bold uppercase tracking-tight ${textPrimary} transition-colors`}>
                        {col.title}
                      </h3>
                      <p className={`text-xs ${textSecondary} mt-0.5`}>Explore Collection</p>
                    </div>
                    <div className={`w-8 h-8 rounded-full ${bgSecondary} flex items-center justify-center text-neutral-700 group-hover:${accentBg} group-hover:text-white transition-all`}>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            FEATURED PRODUCTS (sections/featured-products.liquid) - Full Screen Edge-to-Edge
        ========================================================= */}
        <section id="catalog-anchor" className={`py-16 lg:py-24 ${bgCanvas} border-b ${borderCol}`}>
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <p className={`text-xs font-bold tracking-widest uppercase ${textMuted} mb-1`}>
                  Featured Hardware
                </p>
                <h2 className={`text-2xl sm:text-3xl font-extrabold uppercase tracking-tight ${textPrimary}`}>
                  Precision Esports Gear
                </h2>
              </div>

              {selectedCategoryHandle !== 'all' && (
                <button
                  onClick={() => setSelectedCategoryHandle('all')}
                  className={`text-xs font-semibold ${textPrimary} underline hover:opacity-75`}
                >
                  Showing {selectedCategoryHandle} (Click to reset filter)
                </button>
              )}
            </div>

            {/* Product Grid: Expansive full width grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredProducts.map((product) => {
                const isHovered = hoveredProduct === product.id;
                const displayImage = isHovered && settings.showSecondaryImageOnHover && product.secondaryImage
                  ? product.secondaryImage
                  : product.image;

                return (
                  <article
                    key={product.id}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    className={`${bgCard} border ${borderCol} ${borderHover} group flex flex-col justify-between transition-all duration-300 hover:shadow-md rounded-lg overflow-hidden relative`}
                  >
                    {/* Media Container */}
                    <div className={`aspect-square ${bgSecondary} overflow-hidden relative cursor-pointer`}>
                      <div
                        onClick={() => onSelectProduct(product)}
                        className="w-full h-full"
                      >
                        <img
                          src={displayImage}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                        />
                      </div>

                      {product.compareAtPrice && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="text-[11px] font-bold uppercase bg-neutral-900 text-white px-2.5 py-1 rounded-sm shadow-xs">
                            Sale
                          </span>
                        </div>
                      )}

                      {settings.showQuickAdd && (
                        <div className="absolute bottom-3 inset-x-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
                          <button
                            type="button"
                            onClick={() => onQuickAdd(product)}
                            className={`w-full py-3 ${accentBg} text-xs font-bold tracking-wider uppercase shadow-md rounded-sm`}
                          >
                            Quick Add to Bag +
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        {settings.showVendor && (
                          <p className={`text-[11px] font-semibold tracking-wider ${textMuted} uppercase mb-1`}>
                            {product.vendor}
                          </p>
                        )}

                        <h3
                          onClick={() => onSelectProduct(product)}
                          className={`text-sm sm:text-base font-bold ${textPrimary} hover:underline transition-colors cursor-pointer line-clamp-2 leading-snug`}
                        >
                          {product.title}
                        </h3>

                        {settings.showRating && (
                          <div className={`mt-2 flex items-center gap-1.5 text-xs ${textSecondary}`}>
                            <div className="flex items-center text-amber-500">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                              ))}
                            </div>
                            <span className={`font-bold ${textPrimary} tabular-nums`}>{product.rating}</span>
                            <span className={`text-[11px] ${textMuted}`}>({product.reviewCount} reviews)</span>
                          </div>
                        )}
                      </div>

                      <div className={`mt-5 pt-4 border-t ${borderCol} flex items-center justify-between`}>
                        <div className="flex items-baseline gap-2">
                          <span className={`text-base sm:text-lg font-extrabold ${textPrimary} tabular-nums`}>
                            ${product.price.toFixed(2)}
                          </span>
                          {product.compareAtPrice && (
                            <span className={`text-xs ${textMuted} line-through tabular-nums`}>
                              ${product.compareAtPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeBg}`}>
                          In Stock
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            SETUP BANNER (sections/setup-banner.liquid) - Full Screen Edge-to-Edge Split
        ========================================================= */}
        <section className={`border-b ${borderCol} overflow-hidden ${bgSecondary}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Media */}
            <div className="relative min-h-[400px] lg:min-h-[560px] overflow-hidden">
              <img
                src={roomImg}
                alt="Minimalist gaming studio"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Panel: Clean light container */}
            <div className={`p-8 sm:p-14 lg:p-20 flex flex-col justify-center space-y-6 ${bgCard}`}>
              <p className={`text-xs font-bold tracking-widest uppercase ${textMuted}`}>
                {settings.setupEyebrow}
              </p>

              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight ${textPrimary}`}>
                {settings.setupHeading}
              </h2>

              <p className={`text-base ${textSecondary} font-normal leading-relaxed max-w-lg`}>
                {settings.setupDescription}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setSelectedCategoryHandle('all');
                    document.getElementById('catalog-anchor')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-8 py-4 ${accentBg} font-bold text-xs uppercase tracking-widest rounded-sm shadow-sm`}
                >
                  {settings.setupBtnText}
                </button>
              </div>

              <div className={`pt-8 border-t ${borderCol} grid grid-cols-2 gap-8 text-xs ${textSecondary}`}>
                <div>
                  <span className={`block ${textPrimary} font-bold text-sm mb-1.5 uppercase tracking-wider`}>
                    Modular Cable Routing
                  </span>
                  Clean concealed under-desk channels with magnetic quick-swap clamps.
                </div>
                <div>
                  <span className={`block ${textPrimary} font-bold text-sm mb-1.5 uppercase tracking-wider`}>
                    Acoustic Isolation
                  </span>
                  Vibration-damped isolation pads and whisper-quiet switchplate engineering.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            PERFORMANCE FEATURES (sections/performance-features.liquid) - Full Screen Edge-to-Edge
        ========================================================= */}
        <section className={`py-16 lg:py-24 ${bgCanvas} border-b ${borderCol}`}>
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-24">
            <div className="max-w-2xl mb-12">
              <p className={`text-xs font-bold tracking-widest uppercase ${textMuted} mb-1`}>
                Engineering Standards
              </p>
              <h2 className={`text-2xl sm:text-3xl font-extrabold uppercase tracking-tight ${textPrimary}`}>
                Built For Tournament Performance
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Hall-Effect Magnetic Switches', desc: 'Adjustable actuation from 0.1mm to 4.0mm with instant reset response.' },
                { title: 'Native 8000Hz Transceiver', desc: 'Ultra-high polling rate delivers smooth cursor tracking without jitter.' },
                { title: 'Ergonomic Form Factor', desc: 'Sculpted lightweight chassis optimized for claw, fingertip, and palm grips.' },
                { title: 'CNC Anodized Aluminum', desc: 'Aircraft-grade 6063 aluminum frames with durable double-shot PBT keycaps.' },
              ].map((item, idx) => (
                <div key={idx} className={`${bgCard} border ${borderCol} p-8 rounded-lg shadow-xs flex flex-col justify-between`}>
                  <div>
                    <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-800 mb-6">
                      0{idx + 1}
                    </div>
                    <h3 className={`text-base font-bold uppercase tracking-tight ${textPrimary} mb-2`}>{item.title}</h3>
                    <p className={`text-xs sm:text-sm ${textSecondary} leading-relaxed`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            BEST SELLERS CAROUSEL (sections/best-sellers.liquid) - Full Screen Edge-to-Edge
        ========================================================= */}
        <section className={`py-16 lg:py-20 ${bgSecondary} border-b ${borderCol}`}>
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-24">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className={`text-xs font-bold tracking-widest uppercase ${textMuted} mb-1`}>
                  Community Favorites
                </p>
                <h2 className={`text-2xl sm:text-3xl font-extrabold uppercase tracking-tight ${textPrimary}`}>
                  Best Selling Hardware
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollCarousel('left')}
                  className={`w-10 h-10 border ${borderCol} ${bgCard} rounded-full flex items-center justify-center ${textPrimary} hover:${borderHover} transition-colors shadow-xs`}
                  aria-label="Previous items"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel('right')}
                  className={`w-10 h-10 border ${borderCol} ${bgCard} rounded-full flex items-center justify-center ${textPrimary} hover:${borderHover} transition-colors shadow-xs`}
                  aria-label="Next items"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
            >
              {products.map((p) => (
                <div key={p.id} className="w-72 sm:w-80 shrink-0">
                  <div className={`border ${borderCol} ${bgCard} p-4 rounded-lg flex flex-col justify-between h-full shadow-xs hover:shadow-md transition-shadow`}>
                    <div
                      onClick={() => onSelectProduct(p)}
                      className={`cursor-pointer aspect-square ${bgSecondary} mb-3 overflow-hidden rounded-md border ${borderCol}`}
                    >
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover hover:scale-104 transition-transform duration-300" />
                    </div>
                    <div>
                      <p className={`text-[11px] font-semibold ${textMuted} uppercase`}>{p.vendor}</p>
                      <h4
                        onClick={() => onSelectProduct(p)}
                        className={`text-sm font-bold ${textPrimary} line-clamp-1 hover:underline cursor-pointer`}
                      >
                        {p.title}
                      </h4>
                      <p className={`text-sm font-extrabold ${textPrimary} mt-2 tabular-nums`}>${p.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => onQuickAdd(p)}
                      className={`mt-4 w-full py-2.5 ${accentBg} text-xs font-bold uppercase rounded-sm shadow-xs`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            NEWSLETTER (sections/newsletter.liquid) - Full Screen Edge-to-Edge
        ========================================================= */}
        <section className={`py-16 lg:py-24 border-b ${borderCol} ${bgCanvas}`}>
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-24">
            <div className="max-w-2xl mx-auto text-center">
              <p className={`text-xs font-bold uppercase tracking-widest ${textMuted} mb-2`}>
                Newsletter
              </p>
              <h2 className={`text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mb-3 ${textPrimary}`}>
                Stay Informed On New Releases
              </h2>
              <p className={`text-sm sm:text-base ${textSecondary} max-w-md mx-auto mb-8 leading-relaxed font-sans`}>
                Subscribe to receive early hardware announcements, firmware updates, and exclusive store discounts.
              </p>

              {emailSubscribed ? (
                <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm max-w-md mx-auto rounded-md flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Thank you for subscribing! Your welcome code has been sent.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className={`flex-1 bg-white border ${borderCol} text-neutral-900 placeholder-neutral-400 px-4 py-3.5 text-sm rounded-sm focus:outline-none focus:border-neutral-900 transition-colors shadow-xs`}
                  />
                  <button
                    type="submit"
                    className={`px-8 py-3.5 ${accentBg} font-bold text-xs uppercase tracking-wider rounded-sm shadow-xs shrink-0`}
                  >
                    Subscribe
                  </button>
                </form>
              )}
              <p className={`text-xs ${textMuted} mt-3`}>
                Zero spam. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            FOOTER (sections/footer.liquid) - Full Screen Edge-to-Edge
        ========================================================= */}
        <footer className={`${bgSecondary} border-t ${borderCol}`}>
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-24 py-16">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
              <div className="col-span-2">
                <span className={`text-xl font-black uppercase tracking-tight ${textPrimary} block mb-3`}>
                  AVEART GAMING
                </span>
                <p className={`text-sm ${textSecondary} leading-relaxed max-w-sm mb-6`}>
                  High-performance gaming hardware crafted with minimalist industrial design, aerospace materials, and competitive precision.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className={`px-3 py-1.5 ${bgCard} border ${borderCol} rounded text-neutral-700`}>Discord</span>
                  <span className={`px-3 py-1.5 ${bgCard} border ${borderCol} rounded text-neutral-700`}>Twitch</span>
                  <span className={`px-3 py-1.5 ${bgCard} border ${borderCol} rounded text-neutral-700`}>YouTube</span>
                </div>
              </div>

              <div>
                <h4 className={`text-xs font-bold uppercase tracking-widest ${textPrimary} mb-4`}>Hardware</h4>
                <ul className={`space-y-2.5 text-xs sm:text-sm ${textSecondary}`}>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors">Gaming PCs</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors">240Hz OLED Displays</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors">Mechanical Keyboards</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors">Esports Mice</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors">Desk Surfaces</a></li>
                </ul>
              </div>

              <div>
                <h4 className={`text-xs font-bold uppercase tracking-widest ${textPrimary} mb-4`}>Customer Care</h4>
                <ul className={`space-y-2.5 text-xs sm:text-sm ${textSecondary}`}>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors">Firmware & Drivers</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors">2-Year Warranty</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors">Shipping & Returns</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors">Order Tracking</a></li>
                </ul>
              </div>

              <div>
                <h4 className={`text-xs font-bold uppercase tracking-widest ${textPrimary} mb-4`}>Company</h4>
                <ul className={`space-y-2.5 text-xs sm:text-sm ${textSecondary}`}>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors">About AVEART</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors">Partnerships</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-neutral-900 transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>

            <div className={`mt-14 pt-8 border-t ${borderCol} flex flex-col sm:flex-row items-center justify-between text-xs ${textMuted} gap-4`}>
              <p>&copy; 2026 AVEART. Built with Shopify Online Store 2.0.</p>
              <div className="flex items-center gap-4">
                <span className="font-medium text-neutral-800">Style: {style}</span>
                <span>Currency: USD ($)</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
