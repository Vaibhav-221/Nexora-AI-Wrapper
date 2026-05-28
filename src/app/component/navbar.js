'use client';

import React from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ isSidebarOpen, onToggleSidebar }) {
  return (
    <nav className="h-[73px] border-b border-[#2a2b2a] bg-[#0f0f10]/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-emerald-400/30 bg-emerald-500 text-[#070707] shadow-[0_0_24px_rgba(16,185,129,0.24)]">
            <span className="text-lg font-bold">N</span>
          </div>
          <h1 className="truncate text-xl font-semibold tracking-normal text-zinc-100 sm:text-2xl">
            Nexora
          </h1>
        </div>

        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#2a2b2a] text-zinc-300 transition-colors hover:border-orange-400/70 hover:bg-orange-500 hover:text-[#070707] md:hidden"
          aria-label="Toggle sidebar"
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
}
