import React, { useState } from 'react';
import { galleryData } from '../data/siteData';
import { X, ZoomIn } from 'lucide-react';

const CATEGORIES = ['All', 'Resort', 'Rooms', 'Cafe', 'Vibe'];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [activeImage, setActiveImage] = useState(null);

  const filtered = filter === 'All' ? galleryData : galleryData.filter(img => img.category === filter);

  const openLightbox = (item) => {
    setActiveImage(item);
    document.body.classList.add('body-locked');
  };

  const closeLightbox = () => {
    setActiveImage(null);
    document.body.classList.remove('body-locked');
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-[#0A0D12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="font-cursive text-2xl sm:text-3xl text-[#C5A059] mb-1">Visual Experience</p>
          <h2 className="font-serif font-bold text-white tracking-wide text-[clamp(1.7rem,5vw,3rem)]">
            Resort &amp; Cafe Gallery
          </h2>
          <div className="w-14 h-0.5 bg-[#C5A059] mx-auto mt-3"></div>
        </div>

        {/* Category filter — horizontal scroll on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-7 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center sm:flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`min-h-[40px] px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-250 ${
                filter === cat
                  ? 'bg-[#C5A059] text-[#0A0D12] shadow-lg scale-105'
                  : 'bg-[#141923] text-gray-300 hover:bg-[#C5A059]/20 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery grid — 1 col → 2 col → 3 col → 4 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group relative h-56 sm:h-64 rounded-xl overflow-hidden glass-effect text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
            >
              <img
                src={item.url}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent
                              opacity-60 group-hover:opacity-100 transition-opacity duration-300
                              flex flex-col justify-end p-4">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                  {item.category}
                </span>
                <p className="font-serif text-sm sm:text-base font-bold text-white mt-0.5 leading-tight">
                  {item.title}
                </p>
              </div>
              {/* Zoom icon on hover */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-5 h-5 text-white drop-shadow-lg" />
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close button — top-right, 44px tap target */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 min-w-[44px] min-h-[44px] flex items-center justify-center text-white hover:text-[#C5A059] transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.url}
              alt={activeImage.title}
              className="w-full max-h-[75dvh] object-contain rounded-xl"
            />
            <div className="text-center mt-4">
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-white">{activeImage.title}</h3>
              <p className="text-[#C5A059] text-xs uppercase tracking-wider mt-1">{activeImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
