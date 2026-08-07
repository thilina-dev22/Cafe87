import React from 'react';
import { ChevronDown, Wifi, Tv, Coffee, Sun } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function Hero({ onBookClick }) {
  return (
    <section
      id="hero"
      /* 
        hero-bg class → CSS @supports block disables bg-fixed on iOS Safari.
        bg-fixed works well on desktop; mobile falls back to bg-scroll to prevent
        the blank/white Safari bug.
      */
      className="hero-bg relative min-h-[100dvh] flex items-center justify-center pt-20 pb-10 px-4 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(10,13,18,0.40) 0%, rgba(10,13,18,0.85) 100%), url("${siteConfig.heroBg}")`
      }}
    >
      <div className="max-w-4xl mx-auto text-center z-10 w-full">

        {/* Script subtitle */}
        <p className="font-cursive text-2xl sm:text-3xl md:text-4xl text-[#C5A059] mb-1 sm:mb-2">
          Welcome to
        </p>

        {/* Main heading — scales from 375px phones up to 4K */}
        <h1 className="font-serif font-bold text-white tracking-wide leading-[1.1] drop-shadow-2xl mb-3 sm:mb-4
                        text-[clamp(2rem,8vw,5.5rem)]">
          A Tranquil Coastal Escape
        </h1>

        {/* Tagline */}
        <p className="text-sm sm:text-lg md:text-xl text-[#E5C483] max-w-xl mx-auto mb-8 sm:mb-10 font-light tracking-wide px-2">
          {siteConfig.subtagline}
        </p>

        {/* CTA buttons — full-width on mobile, auto on sm+ */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14 px-2 sm:px-0">
          <button
            onClick={onBookClick}
            className="min-h-[52px] sm:min-h-0 bg-gradient-to-r from-[#C5A059] to-[#E5C483] hover:from-[#E5C483] hover:to-[#C5A059]
                       text-[#0A0D12] font-bold text-sm uppercase tracking-widest
                       px-8 py-4 rounded-lg shadow-xl transition-all active:scale-[0.98]"
          >
            Book Your Stay
          </button>

          <a
            href="#rooms"
            className="min-h-[52px] sm:min-h-0 flex items-center justify-center
                       border-2 border-[#C5A059] text-white hover:bg-[#C5A059] hover:text-[#0A0D12]
                       font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-lg
                       transition-all active:scale-[0.98]"
          >
            Explore Rooms
          </a>
        </div>

        {/* Feature badges — 2-col on mobile, 4-col on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 max-w-3xl mx-auto
                        px-4 py-4 bg-[#141923]/75 backdrop-blur-md rounded-xl
                        border border-[#C5A059]/25 shadow-2xl">
          {[
            { icon: Sun, label: 'Sun & Moon Rooms' },
            { icon: Wifi, label: 'High-Speed Wi-Fi' },
            { icon: Tv, label: 'Free Netflix' },
            { icon: Coffee, label: 'Artisanal Cafe' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-1.5 sm:gap-2 p-2">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5A059] shrink-0" />
              <span className="text-[11px] sm:text-sm font-medium text-white leading-tight">{label}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Scroll cue */}
      <a
        href="#rooms"
        className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 text-[#C5A059] animate-bounce p-3"
        aria-label="Scroll to rooms"
      >
        <ChevronDown className="w-7 h-7 sm:w-8 sm:h-8" />
      </a>
    </section>
  );
}
