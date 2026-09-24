/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Download,
  Code2,
  Sliders,
  X,
} from 'lucide-react';
import { INITIAL_PRODUCTS, INITIAL_COLLECTIONS, Product } from './data/mockStoreData';
import { StorefrontPreview } from './components/StorefrontPreview';
import { ThemeEditorPanel, DEFAULT_THEME_SETTINGS, ThemeSettingsState } from './components/ThemeEditorPanel';
import { CodeInspector } from './components/CodeInspector';
import { ZipExporter } from './components/ZipExporter';
import { CartDrawerModal, CartItem } from './components/CartDrawerModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { SearchModal } from './components/SearchModal';

type DevToolModal = 'none' | 'editor' | 'inspector' | 'export';

export default function App() {
  const [settings, setSettings] = useState<ThemeSettingsState>(DEFAULT_THEME_SETTINGS);
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [collections] = useState(INITIAL_COLLECTIONS);
  const [activeDevModal, setActiveDevModal] = useState<DevToolModal>('none');

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[1],
      variantId: INITIAL_PRODUCTS[1].variants[0].id,
      variantTitle: INITIAL_PRODUCTS[1].variants[0].title,
      price: INITIAL_PRODUCTS[1].variants[0].price,
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Product Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Search Modal State
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (
    product: Product,
    variantId: string,
    variantTitle: string,
    price: number,
    quantity: number
  ) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.variantId === variantId);
      if (existing) {
        return prev.map((item) =>
          item.variantId === variantId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          variantId,
          variantTitle,
          price,
          quantity,
        },
      ];
    });
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: Product) => {
    const v = product.variants[0];
    handleAddToCart(product, v.id, v.title, v.price, 1);
  };

  const handleUpdateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((i) => i.variantId !== variantId));
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.variantId === variantId ? { ...i, quantity } : i))
      );
    }
  };

  return (
    <div className="relative flex flex-col h-screen w-screen overflow-hidden bg-white text-neutral-900 font-sans">
      {/* 100% Full-Screen Storefront (No top developer navigation bar) */}
      <main className="flex-1 flex w-full h-full overflow-hidden">
        <StorefrontPreview
          settings={settings}
          products={products}
          collections={collections}
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickAdd={handleQuickAdd}
          viewportWidth="100%"
        />
      </main>

      {/* Discreet floating action button for Shopify theme tools (Download ZIP / Inspector) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <button
          onClick={() => setActiveDevModal('export')}
          className="bg-neutral-900/90 hover:bg-neutral-900 text-white px-3.5 py-2 rounded-full shadow-lg text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition-all hover:scale-105"
          title="Export Shopify Theme (.zip)"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Theme (.zip)</span>
        </button>

        <button
          onClick={() => setActiveDevModal('inspector')}
          className="bg-white/90 hover:bg-white text-neutral-800 border border-neutral-300 p-2 rounded-full shadow-md backdrop-blur-md transition-all hover:scale-105"
          title="Inspect Liquid & Theme Code"
        >
          <Code2 className="w-4 h-4" />
        </button>

        <button
          onClick={() => setActiveDevModal('editor')}
          className="bg-white/90 hover:bg-white text-neutral-800 border border-neutral-300 p-2 rounded-full shadow-md backdrop-blur-md transition-all hover:scale-105"
          title="Theme Customizer"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </div>

      {/* Developer Tool Modal (Export / Code Inspector / Customizer) */}
      {activeDevModal !== 'none' && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-8 bg-neutral-900/50 backdrop-blur-xs">
          <div className="bg-white border border-neutral-200 rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  {activeDevModal === 'export' && 'Shopify Online Store 2.0 · Export Theme (.zip)'}
                  {activeDevModal === 'inspector' && 'Shopify Theme Code Inspector'}
                  {activeDevModal === 'editor' && 'Shopify Theme Customizer'}
                </span>
              </div>
              <button
                onClick={() => setActiveDevModal('none')}
                className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-hidden flex">
              {activeDevModal === 'export' && (
                <div className="flex-1 overflow-y-auto">
                  <ZipExporter />
                </div>
              )}
              {activeDevModal === 'inspector' && (
                <div className="flex-1 overflow-hidden">
                  <CodeInspector />
                </div>
              )}
              {activeDevModal === 'editor' && (
                <div className="flex-1 flex overflow-hidden">
                  <ThemeEditorPanel
                    settings={settings}
                    onChange={setSettings}
                    onReset={() => setSettings(DEFAULT_THEME_SETTINGS)}
                  />
                  <div className="flex-1 overflow-y-auto p-4 bg-neutral-100 flex items-center justify-center">
                    <p className="text-xs text-neutral-500">
                      Changes in theme settings update live on the storefront.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Slide-out Cart Drawer Modal */}
      <CartDrawerModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        freeShippingThreshold={150}
        themeStyle={settings.themeStyle}
      />

      {/* Product Detail Modal (main-product.liquid) */}
      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        themeStyle={settings.themeStyle}
      />

      {/* Predictive Search Modal (main-search.liquid) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />
    </div>
  );
}
