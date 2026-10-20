import React from 'react';
import { ChevronDown, Wifi, Tv, Coffee, Sun } from 'lucide-react';
import { siteConfig } from '../data/siteData';
import Img from './Img';

export default function Hero({ onBookClick }) {
  return (
    <section
      id="hero"
      aria-label="Welcome to 87 Ahangama"
      className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden"
    >
      {/* LCP image: a real <img> (not a CSS background) so it is discoverable, preloaded and responsive */}
      <Img
        src={siteConfig.heroBg}
        alt="87 Ahangama boutique residence entrance and tropical garden"
        sizes="100vw"
        priority
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D12]/40 to-[#0A0D12]/85" aria-hidden="true" />

      <div className="max-w-4xl mx-auto text-center z-10 w-full">

        {/* Main heading — scales from 375px phones up to 4K */}
        <h1 className="mb-3 sm:mb-4">
          <span className="block font-cursive text-2xl sm:text-3xl md:text-4xl text-[#ECC46C] mb-1 sm:mb-2 font-normal">
            Welcome to 87 Ahangama
          </span>
          <span className="block font-serif font-bold text-white tracking-wide leading-[1.1] drop-shadow-2xl text-[clamp(2rem,8vw,5.5rem)]">
            A Tranquil Coastal Escape in Sri Lanka
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-sm sm:text-lg md:text-xl text-[#F3D893] max-w-xl mx-auto mb-8 sm:mb-10 font-light tracking-wide px-2">
          {siteConfig.subtagline}
        </p>

        {/* CTA buttons — full-width on mobile, auto on sm+ */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14 px-2 sm:px-0">
          <button
            onClick={onBookClick}
            className="min-h-[52px] sm:min-h-0 bg-gradient-to-r from-[#D7AD50] to-[#ECC46C] hover:from-[#ECC46C] hover:to-[#D7AD50]
                       text-[#0A0F29] font-bold text-sm uppercase tracking-widest
                       px-8 py-4 rounded-lg shadow-2xl transition-all active:scale-[0.98]"
          >
            Book Your Stay
          </button>

          <a
            href="#rooms"
            className="min-h-[52px] sm:min-h-0 flex items-center justify-center
                       border-2 border-[#ECC46C] text-white hover:bg-[#ECC46C] hover:text-[#0A0F29]
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
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#ECC46C] shrink-0" aria-hidden="true" />
              <span className="text-[11px] sm:text-sm font-medium text-white leading-tight">{label}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Scroll cue */}
      <a
        href="#rooms"
        className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 text-[#ECC46C] animate-bounce motion-reduce:animate-none p-3 z-10"
        aria-label="Scroll to rooms"
      >
        <ChevronDown className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
      </a>
    </section>
  );
}
