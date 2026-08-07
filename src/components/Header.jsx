import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function Header({ onBookClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Rooms', href: '#rooms' },
    { name: 'Cafe & Dining', href: '#cafe' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0D12]/95 backdrop-blur-md border-b border-[#C5A059]/20 py-3 shadow-xl'
          : 'bg-[#0A0D12]/60 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <img
            src={siteConfig.logo}
            alt="87 Ahangama"
            className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold text-white tracking-widest leading-none">
              87 AHANGAMA
            </span>
            <span className="text-[10px] tracking-[0.2em] text-[#C5A059] uppercase font-sans mt-0.5">
              Residence & Cafe
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-[#C5A059] text-xs font-semibold tracking-widest uppercase transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBookClick}
            className="bg-gradient-to-r from-[#C5A059] to-[#E5C483] hover:from-[#E5C483] hover:to-[#C5A059] text-[#0A0D12] font-bold text-xs sm:text-sm uppercase tracking-wider px-4 sm:px-6 py-2.5 rounded shadow-lg transition-all duration-300 transform active:scale-95 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Stay</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2 focus:outline-none rounded-lg hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0D12] border-b border-[#C5A059]/30 px-6 py-6 space-y-4 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white text-base font-semibold tracking-wider uppercase hover:text-[#C5A059] transition-colors border-b border-gray-800 pb-2"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
