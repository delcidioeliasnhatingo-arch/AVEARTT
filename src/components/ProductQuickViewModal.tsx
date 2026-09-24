import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, RefreshCw, Zap } from 'lucide-react';
import { Product } from '../data/mockStoreData';
import { ThemeStylePreset } from './ThemeEditorPanel';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variantId: string, variantTitle: string, price: number, quantity: number) => void;
  themeStyle?: ThemeStylePreset;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedVariantId, setSelectedVariantId] = useState<string>(product.variants[0]?.id || 'v1');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>(product.image);

  const currentVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const handleAdd = () => {
    onAddToCart(
      product,
      currentVariant.id,
      currentVariant.title,
      currentVariant.price,
      quantity
    );
  };

  const bgModal = 'bg-white';
  const bgCard = 'bg-neutral-50';
  const borderCol = 'border-neutral-200';
  const textPrimary = 'text-neutral-900';
  const textSecondary = 'text-neutral-600';
  const accentBg = 'bg-neutral-900 text-white hover:bg-neutral-800';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className={`inline-block align-bottom ${bgModal} text-left overflow-hidden shadow-2xl rounded-lg transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border ${borderCol}`}>
          {/* Header Close */}
          <div className={`p-4 border-b ${borderCol} flex justify-between items-center bg-neutral-50`}>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
              Quick View · Product Details
            </span>
            <button onClick={onClose} className={`p-1.5 rounded-full hover:bg-neutral-200 ${textSecondary} hover:${textPrimary} transition-colors`}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 lg:p-8">
            {/* Left: Gallery */}
            <div className="md:col-span-6 space-y-4">
              <div className={`aspect-square ${bgCard} border ${borderCol} rounded-lg overflow-hidden relative`}>
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedImage(product.image)}
                  className={`w-16 h-16 rounded border overflow-hidden ${selectedImage === product.image ? 'border-neutral-900 ring-2 ring-neutral-900' : borderCol}`}
                >
                  <img src={product.image} alt="Primary" className="w-full h-full object-cover" />
                </button>
                {product.secondaryImage && (
                  <button
                    type="button"
                    onClick={() => setSelectedImage(product.secondaryImage!)}
                    className={`w-16 h-16 rounded border overflow-hidden ${selectedImage === product.secondaryImage ? 'border-neutral-900 ring-2 ring-neutral-900' : borderCol}`}
                  >
                    <img src={product.secondaryImage} alt="Alternate" className="w-full h-full object-cover" />
                  </button>
                )}
              </div>
            </div>

            {/* Right: Purchase Module */}
            <div className="md:col-span-6 flex flex-col justify-start">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1">
                {product.vendor}
              </p>

              <h2 className={`text-xl lg:text-2xl font-extrabold uppercase tracking-tight ${textPrimary} mb-2 leading-snug`}>
                {product.title}
              </h2>

              <div className="flex items-center gap-2 mb-4 text-xs">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className={`font-bold ${textPrimary}`}>{product.rating}</span>
                <span className={textSecondary}>({product.reviewCount} customer reviews)</span>
              </div>

              {/* Price */}
              <div className={`py-3.5 border-y ${borderCol} mb-5 flex items-baseline gap-3`}>
                <span className={`text-2xl font-extrabold ${textPrimary} tabular-nums`}>
                  ${currentVariant.price.toFixed(2)}
                </span>
                {currentVariant.compareAtPrice && (
                  <span className={`text-sm ${textSecondary} line-through tabular-nums`}>
                    ${currentVariant.compareAtPrice.toFixed(2)}
                  </span>
                )}
                <span className="ml-auto text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  In Stock · Ready to Ship
                </span>
              </div>

              {/* Variants Selector */}
              {product.variants.length > 1 && (
                <div className="mb-5 space-y-2">
                  <label className={`text-xs font-bold uppercase tracking-wider ${textPrimary} block`}>
                    Configuration:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`px-3 py-2 text-xs font-semibold rounded border transition-colors ${selectedVariantId === v.id ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400'}`}
                      >
                        {v.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-5 space-y-2">
                <label className={`text-xs font-bold uppercase tracking-wider ${textPrimary} block`}>
                  Quantity:
                </label>
                <div className={`inline-flex items-center border ${borderCol} bg-neutral-50 rounded`}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`w-9 h-9 flex items-center justify-center text-sm font-semibold ${textSecondary} hover:${textPrimary}`}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className={`w-12 h-9 text-center text-xs font-bold focus:outline-none bg-transparent ${textPrimary}`}
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className={`w-9 h-9 flex items-center justify-center text-sm font-semibold ${textSecondary} hover:${textPrimary}`}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 mb-6">
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`w-full py-3.5 ${accentBg} font-bold text-xs uppercase tracking-widest rounded transition-all shadow-sm`}
                >
                  Add to Cart — ${(currentVariant.price * quantity).toFixed(2)}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleAdd();
                    alert('Shopify Dynamic Checkout flow triggered!');
                  }}
                  className={`w-full py-3.5 bg-neutral-100 text-neutral-900 font-bold text-xs uppercase tracking-widest rounded border ${borderCol} hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  Instant Buy with Shop Pay
                </button>
              </div>

              {/* Highlights */}
              <div className={`border-t ${borderCol} pt-4 space-y-2.5 text-xs ${textSecondary}`}>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>2-Year Comprehensive Hardware Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Same-day priority dispatch on orders before 3PM EST</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-emerald-600" />
                  <span>30-Day Hassle-Free Returns with zero restocking fees</span>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className={`mt-6 pt-4 border-t ${borderCol}`}>
                <h4 className={`text-xs font-bold uppercase tracking-wider ${textPrimary} mb-2`}>
                  Technical Specifications
                </h4>
                <div className={`grid grid-cols-1 gap-1 text-xs ${textSecondary} bg-neutral-50 p-3.5 rounded border ${borderCol}`}>
                  {Object.entries(product.specs).map(([label, val]) => (
                    <div key={label} className={`flex justify-between py-1.5 border-b ${borderCol} last:border-0`}>
                      <span className={`font-semibold ${textPrimary}`}>{label}:</span>
                      <span className="text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
