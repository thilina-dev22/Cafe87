import React, { useState } from 'react';
import { galleryData } from '../data/siteData';
import { Maximize2, X } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [activeImage, setActiveImage] = useState(null);

  const categories = ['All', 'Resort', 'Rooms', 'Cafe', 'Vibe'];

  const filteredImages = filter === 'All'
    ? galleryData
    : galleryData.filter(img => img.category === filter);

  return (
    <section id="gallery" className="py-20 bg-[#0A0D12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-cursive text-3xl text-[#C5A059] mb-1">Visual Experience</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide">
            Resort & Cafe Gallery
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4"></div>
        </div>

        {/* Mobile Horizontal Scroll Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                filter === cat
                  ? 'bg-[#C5A059] text-[#0A0D12] shadow-lg scale-105'
                  : 'bg-[#141923] text-gray-300 hover:bg-[#C5A059]/20 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredImages.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative h-64 sm:h-72 rounded-xl overflow-hidden glass-effect cursor-pointer"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-base font-bold text-white mt-0.5">{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#C5A059] p-2"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={activeImage.url}
              alt={activeImage.title}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <div className="text-center mt-4">
              <h3 className="font-serif text-2xl font-bold text-white">{activeImage.title}</h3>
              <p className="text-[#C5A059] text-sm uppercase tracking-wider mt-1">{activeImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
