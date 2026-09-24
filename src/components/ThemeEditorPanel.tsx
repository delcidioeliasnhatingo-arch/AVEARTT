import React from 'react';
import { Sliders, RotateCcw, Palette, Layout, Type, ShoppingBag, Sun, Sparkles } from 'lucide-react';

export type ThemeStylePreset = 'light-studio' | 'warm-alabaster' | 'platinum-slate';

export interface ThemeSettingsState {
  themeStyle: ThemeStylePreset;
  announcementShow: boolean;
  announcementText: string;
  heroEyebrow: string;
  heroHeading: string;
  heroDescription: string;
  heroPrimaryBtnText: string;
  heroSecondaryBtnText: string;
  setupEyebrow: string;
  setupHeading: string;
  setupDescription: string;
  setupBtnText: string;
  showVendor: boolean;
  showRating: boolean;
  showQuickAdd: boolean;
  showSecondaryImageOnHover: boolean;
  cardCornerRadius: number;
  maxWidth: number;
}

export const DEFAULT_THEME_SETTINGS: ThemeSettingsState = {
  themeStyle: 'light-studio', // Light, clean, non-cyberpunk style as requested
  announcementShow: true,
  announcementText: 'Free Express Courier on Orders Over $150 · 2-Year Hardware Warranty · 30-Day Risk-Free Returns',
  heroEyebrow: 'PRO SERIES GAMING HARDWARE',
  heroHeading: 'PRECISION ENGINEERING FOR MODERN PLAY',
  heroDescription: 'Minimalist industrial design, aerospace-grade components, and ultra-low latency built for competitive esports and creative setups.',
  heroPrimaryBtnText: 'SHOP COLLECTION',
  heroSecondaryBtnText: 'VIEW SPECIFICATIONS',
  setupEyebrow: 'CURATED BATTLESTATIONS',
  setupHeading: 'SEAMLESS MINIMALIST WORKSPACE',
  setupDescription: 'Engineered for clean cable management, acoustic dampening, and high-refresh studio displays.',
  setupBtnText: 'EXPLORE SETUP GUIDE',
  showVendor: true,
  showRating: true,
  showQuickAdd: true,
  showSecondaryImageOnHover: true,
  cardCornerRadius: 6,
  maxWidth: 1920,
};

interface ThemeEditorPanelProps {
  settings: ThemeSettingsState;
  onChange: (newSettings: ThemeSettingsState) => void;
  onReset: () => void;
}

export const ThemeEditorPanel: React.FC<ThemeEditorPanelProps> = ({
  settings,
  onChange,
  onReset,
}) => {
  const update = <K extends keyof ThemeSettingsState>(key: K, val: ThemeSettingsState[K]) => {
    onChange({
      ...settings,
      [key]: val,
    });
  };

  const applyPreset = (preset: ThemeStylePreset) => {
    if (preset === 'light-studio') {
      onChange({
        ...settings,
        themeStyle: 'light-studio',
        announcementText: 'Free Express Courier on Orders Over $150 · 2-Year Hardware Warranty · 30-Day Risk-Free Returns',
        heroEyebrow: 'PRO SERIES GAMING HARDWARE',
        heroHeading: 'PRECISION ENGINEERING FOR MODERN PLAY',
        heroDescription: 'Minimalist industrial design, aerospace-grade components, and ultra-low latency built for competitive esports and creative setups.',
        heroPrimaryBtnText: 'SHOP COLLECTION',
        heroSecondaryBtnText: 'VIEW SPECIFICATIONS',
      });
    } else if (preset === 'warm-alabaster') {
      onChange({
        ...settings,
        themeStyle: 'warm-alabaster',
        announcementText: 'Complimentary Worldwide Shipping on Orders Over $200 · Handcrafted Precision',
        heroEyebrow: 'ARCHITECTURAL DESIGN',
        heroHeading: 'ELEVATED GAMING ESSENTIALS',
        heroDescription: 'Crafted with tactile mechanical switches, matte anodized aluminum plates, and warm neutral acoustics.',
        heroPrimaryBtnText: 'DISCOVER LINEUP',
        heroSecondaryBtnText: 'DESIGN ESSAY',
      });
    } else {
      onChange({
        ...settings,
        themeStyle: 'platinum-slate',
        announcementText: 'Pro Team Certified · 8000Hz Ultra-Polling Rate · Zero Frame Latency',
        heroEyebrow: 'AEROSPACE ALLOY SERIES',
        heroHeading: 'PERFORMANCE WITHOUT COMPROMISE',
        heroDescription: 'Pure titanium reinforcement, optical switches, and fluid 240Hz OLED color accuracy.',
        heroPrimaryBtnText: 'ORDER HARDWARE',
        heroSecondaryBtnText: 'TECHNICAL TELEMETRY',
      });
    }
  };

  return (
    <div className="bg-white border-r border-neutral-200 h-full flex flex-col w-84 shrink-0 text-neutral-800 select-none overflow-hidden font-sans shadow-sm">
      {/* Editor Header */}
      <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-neutral-900" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
            Shopify Theme Customizer
          </h3>
        </div>
        <button
          onClick={onReset}
          title="Reset settings to defaults"
          className="p-1.5 text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Settings Form */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs">
        {/* Style Presets Switcher */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-neutral-200">
            <div className="flex items-center gap-2 font-bold uppercase text-[11px] text-neutral-900 tracking-wider">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Theme Style Palette</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-500 uppercase">Light Theme</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => applyPreset('light-studio')}
              className={`p-3 text-left border rounded-md transition-all flex items-center justify-between ${settings.themeStyle === 'light-studio' ? 'bg-neutral-50 border-neutral-900 ring-1 ring-neutral-900 text-neutral-900' : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'}`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-900"></span>
                  <span className="font-bold text-xs text-neutral-900">Pure Light Studio</span>
                </div>
                <p className="text-[10px] text-neutral-500 mt-1">
                  Crisp clean whites, subtle porcelain gray, high-contrast charcoal text.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => applyPreset('warm-alabaster')}
              className={`p-3 text-left border rounded-md transition-all flex items-center justify-between ${settings.themeStyle === 'warm-alabaster' ? 'bg-[#FAF8F5] border-amber-800 ring-1 ring-amber-800 text-neutral-900' : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'}`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5DEC9]"></span>
                  <span className="font-bold text-xs text-neutral-900">Warm Alabaster</span>
                </div>
                <p className="text-[10px] text-neutral-500 mt-1">
                  Soft ivory cream, warm sand tones, architectural Scandinavian look.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => applyPreset('platinum-slate')}
              className={`p-3 text-left border rounded-md transition-all flex items-center justify-between ${settings.themeStyle === 'platinum-slate' ? 'bg-slate-50 border-slate-900 ring-1 ring-slate-900 text-neutral-900' : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'}`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                  <span className="font-bold text-xs text-neutral-900">Platinum Slate</span>
                </div>
                <p className="text-[10px] text-neutral-500 mt-1">
                  Cool metallic gray, crisp titanium borders, subtle cobalt accents.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Section: Announcement Bar */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-bold uppercase text-[11px] text-neutral-900 tracking-wider pb-1 border-b border-neutral-200">
            <Layout className="w-3.5 h-3.5 text-neutral-500" />
            <span>Announcement Bar</span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-neutral-700">
            <input
              type="checkbox"
              checked={settings.announcementShow}
              onChange={(e) => update('announcementShow', e.target.checked)}
              className="rounded text-neutral-900 focus:ring-neutral-900"
            />
            <span>Show Announcement Bar</span>
          </label>
          {settings.announcementShow && (
            <div>
              <label className="block text-[11px] text-neutral-500 mb-1">Message Text</label>
              <input
                type="text"
                value={settings.announcementText}
                onChange={(e) => update('announcementText', e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded px-2.5 py-1.5 text-neutral-900 text-xs focus:outline-none focus:border-neutral-900"
              />
            </div>
          )}
        </div>

        {/* Section: Hero Gaming */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-bold uppercase text-[11px] text-neutral-900 tracking-wider pb-1 border-b border-neutral-200">
            <Type className="w-3.5 h-3.5 text-neutral-500" />
            <span>Hero Showcase</span>
          </div>
          <div>
            <label className="block text-[11px] text-neutral-500 mb-1">Eyebrow Tag</label>
            <input
              type="text"
              value={settings.heroEyebrow}
              onChange={(e) => update('heroEyebrow', e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 rounded px-2.5 py-1.5 text-neutral-900 text-xs focus:outline-none focus:border-neutral-900"
            />
          </div>
          <div>
            <label className="block text-[11px] text-neutral-500 mb-1">Heading</label>
            <input
              type="text"
              value={settings.heroHeading}
              onChange={(e) => update('heroHeading', e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 rounded px-2.5 py-1.5 text-neutral-900 text-xs focus:outline-none focus:border-neutral-900"
            />
          </div>
          <div>
            <label className="block text-[11px] text-neutral-500 mb-1">Description</label>
            <textarea
              rows={2}
              value={settings.heroDescription}
              onChange={(e) => update('heroDescription', e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-300 rounded px-2.5 py-1.5 text-neutral-900 text-xs focus:outline-none focus:border-neutral-900"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] text-neutral-500 mb-1">Primary CTA</label>
              <input
                type="text"
                value={settings.heroPrimaryBtnText}
                onChange={(e) => update('heroPrimaryBtnText', e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded px-2.5 py-1.5 text-neutral-900 text-xs focus:outline-none focus:border-neutral-900"
              />
            </div>
            <div>
              <label className="block text-[11px] text-neutral-500 mb-1">Secondary CTA</label>
              <input
                type="text"
                value={settings.heroSecondaryBtnText}
                onChange={(e) => update('heroSecondaryBtnText', e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 rounded px-2.5 py-1.5 text-neutral-900 text-xs focus:outline-none focus:border-neutral-900"
              />
            </div>
          </div>
        </div>

        {/* Section: Product Grid Controls */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-bold uppercase text-[11px] text-neutral-900 tracking-wider pb-1 border-b border-neutral-200">
            <ShoppingBag className="w-3.5 h-3.5 text-neutral-500" />
            <span>Product Cards & Badges</span>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer text-neutral-700">
              <input
                type="checkbox"
                checked={settings.showVendor}
                onChange={(e) => update('showVendor', e.target.checked)}
                className="rounded text-neutral-900 focus:ring-neutral-900"
              />
              <span>Display Hardware Brand / Vendor</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-neutral-700">
              <input
                type="checkbox"
                checked={settings.showRating}
                onChange={(e) => update('showRating', e.target.checked)}
                className="rounded text-neutral-900 focus:ring-neutral-900"
              />
              <span>Display Star Ratings & Reviews</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-neutral-700">
              <input
                type="checkbox"
                checked={settings.showQuickAdd}
                onChange={(e) => update('showQuickAdd', e.target.checked)}
                className="rounded text-neutral-900 focus:ring-neutral-900"
              />
              <span>Enable Quick Add Button</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-neutral-700">
              <input
                type="checkbox"
                checked={settings.showSecondaryImageOnHover}
                onChange={(e) => update('showSecondaryImageOnHover', e.target.checked)}
                className="rounded text-neutral-900 focus:ring-neutral-900"
              />
              <span>Secondary Image Swap on Hover</span>
            </label>
          </div>
        </div>

        {/* Section: Layout Width & Radius */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-bold uppercase text-[11px] text-neutral-900 tracking-wider pb-1 border-b border-neutral-200">
            <Palette className="w-3.5 h-3.5 text-neutral-500" />
            <span>Layout Geometry</span>
          </div>
          <div>
            <div className="flex justify-between text-[11px] text-neutral-600 mb-1">
              <span>Card Corner Radius</span>
              <span>{settings.cardCornerRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="16"
              value={settings.cardCornerRadius}
              onChange={(e) => update('cardCornerRadius', parseInt(e.target.value))}
              className="w-full accent-neutral-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
