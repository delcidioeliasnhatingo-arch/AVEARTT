import React, { useState } from 'react';
import JSZip from 'jszip';
import { THEME_FILES } from '../data/themeFiles';
import { Download, CheckCircle, Package, ShieldCheck, Sparkles, FileArchive } from 'lucide-react';

export const ZipExporter: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadZip = async () => {
    try {
      setIsGenerating(true);
      const zip = new JSZip();

      // Add all theme files to zip
      THEME_FILES.forEach((file) => {
        zip.file(file.path, file.content);
      });

      // Add dummy README instructions for Shopify Merchants
      const readme = `# KINETIC — Minimalist Gaming Shopify Theme (Online Store 2.0)
Architecture: Shopify OS 2.0 Component-Based Theme
Visual Concept: Minimalist Gaming (High-contrast monochrome, ultra-clean typography, zero RGB clutter)

## Installation Instructions:
1. Log in to your Shopify Store Admin (https://admin.shopify.com).
2. Navigate to **Online Store > Themes**.
3. Under the "Theme library" section, click **Add theme > Upload zip file**.
4. Upload this \`kinetic-minimalist-gaming-theme.zip\` archive.
5. Click **Customize** to edit sections, products, and colors in the visual Shopify Theme Editor.
6. Click **Publish** whenever you are ready!

## Included Directories:
- /layout/theme.liquid
- /templates/*.json (OS 2.0 Dynamic templates)
- /sections/*.liquid (15 customized gaming sections with schema settings)
- /snippets/*.liquid (Modular reusable snippets: cart drawer, product card, rating, etc.)
- /assets/ (theme.css and theme.js AJAX cart framework)
- /config/ (settings_schema.json, settings_data.json)
- /locales/ (en.default.json)
`;
      zip.file('README.md', readme);

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'kinetic-minimalist-gaming-theme.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to generate ZIP archive', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 bg-white p-6 lg:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Banner */}
        <div className="border border-neutral-200 bg-neutral-50 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-neutral-900" />
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Production-Ready Shopify Theme Export
              </span>
            </div>
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-neutral-900">
              Download Theme (.zip)
            </h2>
            <p className="text-xs text-neutral-600 max-w-xl leading-relaxed">
              Export the complete, standalone Shopify Online Store 2.0 theme bundle. Upload directly into your Shopify Admin dashboard via <em>Online Store &gt; Themes &gt; Upload zip file</em>.
            </p>
          </div>

          <button
            onClick={handleDownloadZip}
            disabled={isGenerating}
            className="btn-primary flex items-center gap-2.5 py-4 px-6 shrink-0 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Bundling Theme...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Downloaded Zip!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Export Theme (.zip)</span>
              </>
            )}
          </button>
        </div>

        {/* Verification Matrix */}
        <div className="border border-neutral-200 p-8 space-y-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              Shopify Online Store 2.0 Compliance Audit
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 border border-neutral-200 bg-neutral-50/50 space-y-1">
              <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Shopify OS 2.0 JSON Templates
              </span>
              <p className="text-neutral-500">
                index.json, product.json, collection.json, cart.json, search.json, customers accounts.
              </p>
            </div>

            <div className="p-4 border border-neutral-200 bg-neutral-50/50 space-y-1">
              <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Theme Customizer Schema Integration
              </span>
              <p className="text-neutral-500">
                All 15 sections feature native <code>schema</code> blocks for merchant drag-and-drop customization.
              </p>
            </div>

            <div className="p-4 border border-neutral-200 bg-neutral-50/50 space-y-1">
              <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                AJAX Cart Drawer & Variant Engine
              </span>
              <p className="text-neutral-500">
                Built-in slide-out cart drawer connecting to Shopify <code>/cart/add.js</code> and dynamic checkout.
              </p>
            </div>

            <div className="p-4 border border-neutral-200 bg-neutral-50/50 space-y-1">
              <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Minimalist Gaming Aesthetic Guidelines
              </span>
              <p className="text-neutral-500">
                Strict adherence to clean white/black contrast, mathematical spacing, zero cyberpunk visual noise.
              </p>
            </div>
          </div>
        </div>

        {/* Directory Blueprint View */}
        <div className="border border-neutral-200 p-8 space-y-4">
          <div className="flex items-center gap-2">
            <FileArchive className="w-5 h-5 text-neutral-700" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              Files Packed into the Archive
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs font-mono">
            {THEME_FILES.map((file) => (
              <div key={file.path} className="p-2 border border-neutral-200 bg-neutral-50/40 text-neutral-700 truncate">
                {file.path}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
