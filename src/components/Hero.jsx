import React from 'react';
import { ChevronDown, Wifi, Tv, Coffee, Sun } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function Hero({ onBookClick }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(10, 13, 18, 0.45), rgba(10, 13, 18, 0.88)), url("${siteConfig.heroBg}")`
      }}
    >
      <div className="max-w-5xl mx-auto text-center z-10">
        
        {/* Subtitle Script */}
        <p className="font-cursive text-3xl sm:text-4xl text-[#C5A059] mb-2">
          Welcome to
        </p>

        {/* Hero Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-wide leading-tight mb-4 drop-shadow-2xl">
          A Tranquil Coastal Escape
        </h1>

        {/* Tagline */}
        <p className="text-base sm:text-xl text-[#E5C483] max-w-2xl mx-auto mb-8 font-light tracking-wide px-2">
          {siteConfig.subtagline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 px-4">
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto bg-gradient-to-r from-[#C5A059] to-[#E5C483] hover:from-[#E5C483] hover:to-[#C5A059] text-[#0A0D12] font-bold text-sm uppercase tracking-widest px-8 py-4 rounded shadow-xl transition-all duration-300 transform active:scale-95"
          >
            Book Your Stay
          </button>

          <a
            href="#rooms"
            className="w-full sm:w-auto border-2 border-[#C5A059] text-white hover:bg-[#C5A059] hover:text-[#0A0D12] font-bold text-sm uppercase tracking-widest px-8 py-4 rounded transition-all duration-300 transform active:scale-95 text-center"
          >
            Explore Rooms
          </a>
        </div>

        {/* Feature Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto p-4 sm:p-5 bg-[#141923]/70 backdrop-blur-md rounded-xl border border-[#C5A059]/30 shadow-2xl">
          <div className="flex items-center justify-center gap-2 p-2">
            <Sun className="w-5 h-5 text-[#C5A059] shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-white">Sun & Moon Rooms</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2">
            <Wifi className="w-5 h-5 text-[#C5A059] shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-white">High-Speed Wi-Fi</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2">
            <Tv className="w-5 h-5 text-[#C5A059] shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-white">Free Netflix</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2">
            <Coffee className="w-5 h-5 text-[#C5A059] shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-white">Artisanal Cafe</span>
          </div>
        </div>

      </div>

      {/* Down Arrow */}
      <a
        href="#rooms"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#C5A059] animate-bounce p-2"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}
