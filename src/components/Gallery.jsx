import React, { useState } from 'react';
import { galleryData } from '../data/siteData';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = ['All', 'Resort', 'Rooms', 'Bathrooms', 'Cafe'];

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [activeIdx, setActiveIdx] = useState(null);

  // Touch Swipe State
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const filtered = filter === 'All' ? galleryData : galleryData.filter(img => img.category === filter);

  const openLightbox = (idx) => {
    setActiveIdx(idx);
    document.body.classList.add('body-locked');
  };

  const closeLightbox = () => {
    setActiveIdx(null);
    document.body.classList.remove('body-locked');
  };

  const goToNext = (e) => {
    if (e) e.stopPropagation();
    if (activeIdx !== null && activeIdx < filtered.length - 1) {
      setActiveIdx(activeIdx + 1);
    } else {
      setActiveIdx(0);
    }
  };

  const goToPrev = (e) => {
    if (e) e.stopPropagation();
    if (activeIdx !== null && activeIdx > 0) {
      setActiveIdx(activeIdx - 1);
    } else if (activeIdx !== null) {
      setActiveIdx(filtered.length - 1);
    }
  };

  // Touch Swipe Gestures
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }
  };

  const currentImage = activeIdx !== null ? filtered[activeIdx] : null;

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#0A0F29] border-t border-[#ECC46C]/15 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="font-cursive text-2xl sm:text-3xl text-[#ECC46C] mb-1">Visual Experience</p>
          <h2 className="font-serif font-bold text-white tracking-wide text-[clamp(1.7rem,5vw,3rem)]">
            Resort &amp; Cafe Gallery
          </h2>
          <div className="w-14 h-0.5 bg-[#ECC46C] mx-auto mt-3"></div>
        </div>

        {/* Category filter tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center sm:flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`min-h-[40px] px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-250 ${
                filter === cat
                  ? 'bg-gradient-to-r from-[#D7AD50] to-[#ECC46C] text-[#0A0F29] shadow-xl scale-105 font-bold'
                  : 'bg-[#0D1638] text-gray-300 hover:text-white border border-[#ECC46C]/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden glass-effect text-left border border-[#ECC46C]/20 hover:border-[#ECC46C]/50 transition-all duration-300 shadow-xl"
            >
              <img
                src={item.url}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F29]/95 via-[#0A0F29]/30 to-transparent
                              opacity-70 group-hover:opacity-100 transition-opacity duration-300
                              flex flex-col justify-end p-5">
                <span className="text-[10px] uppercase tracking-widest text-[#ECC46C] font-bold">
                  {item.category}
                </span>
                <p className="font-serif text-base sm:text-lg font-bold text-white mt-0.5 leading-tight">
                  {item.title}
                </p>
              </div>
              {/* Zoom icon on hover */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-2 bg-[#0A0F29]/80 backdrop-blur-md rounded-full border border-[#ECC46C]">
                  <ZoomIn className="w-4 h-4 text-[#ECC46C]" />
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Swipeable Full-Screen Lightbox Modal */}
      {currentImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 touch-pan-y"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-20"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow Button */}
          <button
            onClick={goToPrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 bg-[#0D1638]/90 hover:bg-[#ECC46C] text-[#ECC46C] hover:text-[#0A0F29] border border-[#ECC46C]/40 rounded-full transition-all shadow-2xl z-20"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 bg-[#0D1638]/90 hover:bg-[#ECC46C] text-[#ECC46C] hover:text-[#0A0F29] border border-[#ECC46C]/40 rounded-full transition-all shadow-2xl z-20"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image Container */}
          <div
            className="w-full max-w-4xl flex flex-col items-center animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-2xl border border-[#ECC46C]/30 shadow-2xl">
              <img
                src={currentImage.url}
                alt={currentImage.title}
                className="w-full max-h-[75dvh] object-contain rounded-2xl"
              />
            </div>
            
            <div className="text-center mt-4 space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">{currentImage.title}</h3>
              <div className="flex items-center justify-center gap-3 text-xs">
                <span className="text-[#ECC46C] font-semibold uppercase tracking-wider">{currentImage.category}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-300 font-sans">{activeIdx + 1} of {filtered.length} photos (↔ Swipe left/right)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
