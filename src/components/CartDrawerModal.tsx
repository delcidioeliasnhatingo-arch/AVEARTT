import React from 'react';
import { X, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product } from '../data/mockStoreData';
import { ThemeStylePreset } from './ThemeEditorPanel';

export interface CartItem {
  product: Product;
  variantId: string;
  variantTitle: string;
  price: number;
  quantity: number;
}

interface CartDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (variantId: string, quantity: number) => void;
  freeShippingThreshold?: number;
  themeStyle?: ThemeStylePreset;
}

export const CartDrawerModal: React.FC<CartDrawerModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  freeShippingThreshold = 150,
}) => {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total);
  const shippingPercent = Math.min(100, Math.round((total / freeShippingThreshold) * 100));

  const bgDrawer = 'bg-white';
  const borderCol = 'border-neutral-200';
  const textPrimary = 'text-neutral-900';
  const textSecondary = 'text-neutral-600';
  const accentBg = 'bg-neutral-900 text-white hover:bg-neutral-800';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <aside className={`w-screen max-w-md ${bgDrawer} border-l ${borderCol} flex flex-col shadow-2xl`}>
          {/* Header */}
          <div className={`p-5 border-b ${borderCol} flex items-center justify-between bg-white`}>
            <div className="flex items-center gap-2">
              <h2 className={`text-sm font-bold uppercase tracking-wider ${textPrimary}`}>
                Shopping Bag
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 bg-neutral-100 text-neutral-800 rounded-full tabular-nums">
                {items.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-full hover:bg-neutral-100 ${textSecondary} hover:${textPrimary} transition-colors`}
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className={`px-5 py-3.5 bg-neutral-50 border-b ${borderCol}`}>
            <p className={`text-xs mb-1.5 ${textSecondary}`}>
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-700 font-semibold">✓ Free Express Priority Courier Unlocked!</span>
              ) : (
                <>Add <strong className={`${textPrimary} tabular-nums font-bold`}>${remainingForFreeShipping.toFixed(2)}</strong> more for free courier delivery</>
              )}
            </p>
            <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-neutral-900 transition-all duration-300 rounded-full"
                style={{ width: `${shippingPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100">
            {items.length === 0 ? (
              <div className="py-20 text-center">
                <p className={`text-sm font-bold uppercase tracking-wider ${textPrimary} mb-1`}>Your Bag is Empty</p>
                <p className={`text-xs ${textSecondary} mb-6`}>Browse our collection to add gaming gear.</p>
                <button
                  onClick={onClose}
                  className={`px-6 py-3 ${accentBg} text-xs font-bold uppercase tracking-wider rounded transition-colors`}
                >
                  Explore Hardware
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.variantId} className="py-4 flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className={`w-20 h-20 object-cover bg-neutral-50 rounded border ${borderCol} shrink-0`}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`text-xs sm:text-sm font-bold ${textPrimary} truncate`}>
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => onUpdateQuantity(item.variantId, 0)}
                          className="text-neutral-400 hover:text-red-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className={`text-xs ${textSecondary} mt-0.5`}>{item.variantTitle}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className={`inline-flex items-center border ${borderCol} bg-neutral-50 rounded`}>
                        <button
                          onClick={() => onUpdateQuantity(item.variantId, item.quantity - 1)}
                          className={`w-7 h-7 flex items-center justify-center text-xs font-bold ${textSecondary} hover:${textPrimary}`}
                        >
                          -
                        </button>
                        <span className={`w-7 text-center text-xs font-semibold tabular-nums ${textPrimary}`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.variantId, item.quantity + 1)}
                          className={`w-7 h-7 flex items-center justify-center text-xs font-bold ${textSecondary} hover:${textPrimary}`}
                        >
                          +
                        </button>
                      </div>

                      <span className={`text-sm font-bold ${textPrimary} tabular-nums`}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Module */}
          {items.length > 0 && (
            <div className={`p-5 border-t ${borderCol} bg-neutral-50 space-y-4`}>
              <div className="flex justify-between items-baseline">
                <span className={`text-xs font-semibold uppercase tracking-wider ${textSecondary}`}>Subtotal</span>
                <span className={`text-xl font-extrabold ${textPrimary} tabular-nums`}>
                  ${total.toFixed(2)}
                </span>
              </div>
              <p className={`text-xs ${textSecondary} leading-tight flex items-center gap-1.5`}>
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Taxes and priority delivery calculated at secure checkout.</span>
              </p>
              <button
                onClick={() => {
                  alert('Shopify Online Store 2.0 Checkout Redirect:\nIn a live Shopify store, this routes directly to your secure checkout domain (myshopify.com/checkout).');
                }}
                className={`w-full py-4 ${accentBg} font-bold text-xs uppercase tracking-widest rounded transition-all shadow-sm flex items-center justify-center gap-2`}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
