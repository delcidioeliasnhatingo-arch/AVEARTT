import React, { useState } from 'react';
import { THEME_FILES, ThemeFile } from '../data/themeFiles';
import { FileCode, Folder, Copy, Check, Search, FileText } from 'lucide-react';

export const CodeInspector: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<ThemeFile>(THEME_FILES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const filteredFiles = THEME_FILES.filter((f) =>
    f.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories: ThemeFile['category'][] = [
    'layout',
    'templates',
    'sections',
    'snippets',
    'assets',
    'config',
    'locales',
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex h-full bg-[#18181B] text-neutral-200 overflow-hidden font-mono text-xs">
      {/* Sidebar File Tree */}
      <div className="w-72 bg-[#121214] border-r border-neutral-800 flex flex-col shrink-0">
        <div className="p-3 border-b border-neutral-800">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search theme files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e1e24] text-neutral-200 text-xs pl-8 pr-3 py-1.5 rounded-none border border-neutral-700 focus:outline-none focus:border-neutral-400"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          {categories.map((cat) => {
            const files = filteredFiles.filter((f) => f.category === cat);
            if (files.length === 0) return null;

            return (
              <div key={cat} className="space-y-1">
                <div className="flex items-center gap-1.5 px-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  <Folder className="w-3 h-3 text-neutral-400" />
                  <span>{cat}/</span>
                </div>
                <div className="space-y-0.5 pl-2">
                  {files.map((file) => {
                    const isSelected = selectedFile.path === file.path;
                    return (
                      <button
                        key={file.path}
                        onClick={() => setSelectedFile(file)}
                        className={`w-full text-left px-2 py-1.5 flex items-center justify-between text-xs transition-colors ${isSelected ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'}`}
                      >
                        <span className="truncate">{file.path.split('/')[1] || file.path}</span>
                        <span className="text-[10px] text-neutral-600 uppercase font-sans">
                          {file.language}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 border-t border-neutral-800 text-[10px] text-neutral-500 bg-[#0e0e10]">
          Total Theme Assets: <span className="text-neutral-300 font-bold">{THEME_FILES.length} files</span>
        </div>
      </div>

      {/* Editor Content View */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e24]">
        {/* File Header Bar */}
        <div className="px-4 py-2.5 bg-[#18181B] border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <FileCode className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold text-neutral-100 text-xs truncate">{selectedFile.path}</span>
            <span className="text-[10px] px-2 py-0.5 bg-neutral-800 text-neutral-400 font-sans uppercase">
              {selectedFile.language}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-sans transition-colors shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Liquid' : 'Copy File'}</span>
          </button>
        </div>

        {/* File Description Banner */}
        <div className="px-4 py-2 bg-neutral-900/80 border-b border-neutral-800/80 flex items-center gap-2 text-[11px] text-neutral-400 font-sans">
          <FileText className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          <span className="truncate">{selectedFile.description}</span>
        </div>

        {/* Code View with Line Numbers */}
        <div className="flex-1 overflow-auto p-4 bg-[#141416] select-text">
          <div className="flex">
            {/* Line numbers */}
            <div className="pr-4 text-right text-neutral-600 select-none border-r border-neutral-800 font-mono text-xs space-y-1">
              {selectedFile.content.split('\n').map((_, index) => (
                <div key={index}>{index + 1}</div>
              ))}
            </div>

            {/* Code */}
            <pre className="pl-4 text-neutral-200 font-mono text-xs leading-5 whitespace-pre overflow-x-auto flex-1">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
