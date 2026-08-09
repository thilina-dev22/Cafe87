import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function Header({ onBookClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('body-locked');
    } else {
      document.body.classList.remove('body-locked');
    }
    return () => document.body.classList.remove('body-locked');
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Rooms', href: '#rooms' },
    { name: 'Cafe & Dining', href: '#cafe' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0F29]/96 backdrop-blur-md border-b border-[#ECC46C]/25 shadow-2xl'
            : 'bg-[#0A0F29]/70 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Brand Logo */}
            <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 group min-w-0" onClick={handleNavClick}>
              <img
                src={siteConfig.logo}
                alt="87 Ahangama emblem logo"
                className="h-11 sm:h-14 w-auto object-contain shrink-0 transition-transform group-hover:scale-105"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-base sm:text-xl font-bold text-white tracking-widest leading-none truncate">
                  87 AHANGAMA
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.18em] text-[#ECC46C] uppercase font-sans mt-1 truncate">
                  Residence &amp; Cafe
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
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

            {/* Right: CTA + hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onBookClick}
                className="bg-gradient-to-r from-[#C5A059] to-[#E5C483] hover:from-[#E5C483] hover:to-[#C5A059] text-[#0A0D12] font-bold text-[11px] sm:text-sm uppercase tracking-wider px-3 sm:px-5 py-2.5 rounded shadow-lg transition-all active:scale-95 flex items-center gap-1.5 min-h-[44px]"
                aria-label="Book a stay"
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Book Stay</span>
              </button>

              {/* Mobile hamburger — 44×44 touch target */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-11 h-11 text-white rounded-lg hover:bg-white/10 focus:outline-none transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Full-screen Mobile Drawer Overlay ── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={handleNavClick}
          aria-hidden="true"
        >
          {/* Dark backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Drawer panel sliding from top */}
          <nav
            className="absolute top-16 left-0 right-0 bg-[#0A0D12] border-b border-[#C5A059]/30 shadow-2xl animate-slideDown"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleNavClick}
                  className="flex items-center min-h-[52px] text-white text-base font-semibold tracking-wider uppercase hover:text-[#C5A059] transition-colors border-b border-gray-800/60 last:border-0"
                >
                  {link.name}
                </a>
              ))}

              {/* Full-width CTA inside drawer */}
              <div className="pt-4 pb-2">
                <button
                  onClick={() => { handleNavClick(); onBookClick(); }}
                  className="w-full min-h-[52px] bg-gradient-to-r from-[#C5A059] to-[#E5C483] text-[#0A0D12] font-bold text-sm uppercase tracking-widest rounded shadow-lg flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book Your Stay
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
