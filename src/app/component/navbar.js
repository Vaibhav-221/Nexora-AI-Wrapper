'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo/Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">N</span>
          </div>

          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Nexora
          </h1>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-700 transition-colors duration-300 text-slate-300 hover:text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      {isOpen && (
        <div className="lg:hidden bg-slate-800 border-t border-slate-700 animate-in slide-in-from-top">
          <div className="px-6 py-6 space-y-4">
            <a
              href="#home"
              className="block px-4 py-3 rounded-lg bg-slate-700 text-cyan-400 font-semibold hover:bg-slate-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>

            <a
              href="#chat"
              className="block px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Chat
            </a>

            <a
              href="#models"
              className="block px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Models
            </a>

            <a
              href="#settings"
              className="block px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors font-medium"
              onClick={() => setIsOpen(false)}
            >
              Settings
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}