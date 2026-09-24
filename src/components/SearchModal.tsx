import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Product } from '../data/mockStoreData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredProducts = query.trim() === ''
    ? []
    : products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.vendor.toLowerCase().includes(query.toLowerCase()) ||
        p.productType.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

        <div className="inline-block w-full max-w-2xl my-16 text-left align-middle transition-all transform bg-white border border-neutral-200 shadow-2xl overflow-hidden">
          {/* Search Header */}
          <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
            <Search className="w-5 h-5 text-neutral-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search gaming PCs, keyboards, monitors, audio..."
              className="flex-1 text-sm font-medium focus:outline-none text-neutral-900 placeholder-neutral-400"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-neutral-400 hover:text-neutral-700">
                <X className="w-4 h-4" />
              </button>
            )}
            <button onClick={onClose} className="text-xs uppercase font-bold text-neutral-500 hover:text-neutral-900 ml-2">
              Close
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-96 overflow-y-auto p-4">
            {query.trim() === '' ? (
              <div className="py-8 text-center text-xs text-neutral-400">
                Type keywords like <span className="font-semibold text-neutral-700">"keyboard"</span>, <span className="font-semibold text-neutral-700">"mouse"</span>, or <span className="font-semibold text-neutral-700">"PC"</span> to preview results.
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-8 text-center text-xs text-neutral-500">
                No equipment matching "{query}".
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Matching Hardware ({filteredProducts.length})
                </p>
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="flex items-center gap-4 p-2 hover:bg-neutral-50 cursor-pointer border border-transparent hover:border-neutral-200 transition-colors"
                  >
                    <img src={p.image} alt={p.title} className="w-14 h-14 object-cover bg-neutral-100 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-semibold uppercase text-neutral-400">{p.vendor}</span>
                      <h4 className="text-xs font-bold text-neutral-900 truncate">{p.title}</h4>
                      <span className="text-xs font-semibold text-neutral-800 tabular-nums">${p.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
