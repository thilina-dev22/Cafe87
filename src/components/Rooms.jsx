import React, { useState } from 'react';
import { roomsData } from '../data/siteData';
import { Bed, Users, Maximize, CheckCircle, ShieldCheck, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function Rooms({ onBookRoom }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Touch Swipe State for Modal Gallery
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const openModal = (room) => {
    setSelectedRoom(room);
    setActiveImageIdx(0);
    document.body.classList.add('body-locked');
  };

  const closeModal = () => {
    setSelectedRoom(null);
    document.body.classList.remove('body-locked');
  };

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    if (!selectedRoom) return;
    if (activeImageIdx < selectedRoom.gallery.length - 1) {
      setActiveImageIdx(activeImageIdx + 1);
    } else {
      setActiveImageIdx(0);
    }
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    if (!selectedRoom) return;
    if (activeImageIdx > 0) {
      setActiveImageIdx(activeImageIdx - 1);
    } else {
      setActiveImageIdx(selectedRoom.gallery.length - 1);
    }
  };

  // Touch Swipe Handlers for Room Modal Gallery
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
      nextImage();
    } else if (distance < -minSwipeDistance) {
      prevImage();
    }
  };

  return (
    <section id="rooms" className="py-16 sm:py-24 bg-[#0A0F29] border-t border-[#ECC46C]/15 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="font-cursive text-2xl sm:text-3xl text-[#ECC46C] mb-1">Luxury Accommodations</p>
          <h2 className="font-serif font-bold text-white tracking-wide text-[clamp(1.7rem,5vw,3rem)]">
            Boutique Rooms &amp; Suites
          </h2>
          <div className="w-14 h-0.5 bg-[#ECC46C] mx-auto mt-3"></div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {roomsData.map((room) => (
            <div
              key={room.id}
              className="glass-effect glass-effect-hover rounded-2xl overflow-hidden flex flex-col group border border-[#ECC46C]/25 shadow-2xl transition-all"
            >
              {/* Room Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Price badge */}
                <div className="absolute top-4 right-4 bg-[#0A0F29]/90 backdrop-blur-md border border-[#ECC46C] px-3.5 py-1.5 rounded-full text-white font-bold text-sm shadow-xl">
                  <span className="text-[#ECC46C]">{room.price}</span>
                  <span className="text-[10px] text-gray-300 font-normal ml-1">{room.pricePeriod}</span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <div className="mb-3">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-0.5">{room.name}</h3>
                  <p className="text-[#ECC46C] text-xs font-semibold tracking-wide uppercase">{room.subtitle}</p>
                </div>

                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  {room.description}
                </p>

                {/* Specs row */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-[#0A0F29]/80 rounded-xl mb-6 text-center border border-[#ECC46C]/20">
                  <div className="flex flex-col items-center gap-1 py-1">
                    <Maximize className="w-4 h-4 text-[#ECC46C]" />
                    <span className="text-xs text-gray-200 font-medium">{room.size}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 py-1">
                    <Users className="w-4 h-4 text-[#ECC46C]" />
                    <span className="text-xs text-gray-200 font-medium">{room.capacity}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 py-1">
                    <Bed className="w-4 h-4 text-[#ECC46C]" />
                    <span className="text-xs text-gray-200 font-medium">King Bed</span>
                  </div>
                </div>

                {/* Booking policy highlights */}
                {room.highlights && (
                  <div className="mb-4 space-y-1.5 bg-[#003580]/15 p-2.5 rounded-lg border border-[#003580]/40">
                    {room.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-[#ECC46C] font-semibold">
                        <Sparkles className="w-3 h-3 text-[#ECC46C] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Features */}
                <div className="space-y-2.5 mb-6 flex-grow">
                  {room.features.slice(0, 5).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#ECC46C] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300 leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 mt-auto">
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => openModal(room)}
                      className="min-h-[44px] border border-[#ECC46C] text-white hover:bg-[#ECC46C] hover:text-[#0A0F29]
                                 text-xs uppercase font-bold tracking-wider rounded-lg transition-all active:scale-[0.97]"
                    >
                      View Photos
                    </button>
                    <button
                      onClick={() => onBookRoom(room)}
                      className="min-h-[44px] bg-gradient-to-r from-[#D7AD50] to-[#ECC46C] hover:from-[#ECC46C] hover:to-[#D7AD50]
                                 text-[#0A0F29] text-xs uppercase font-bold tracking-wider rounded-lg transition-all active:scale-[0.97] shadow-xl"
                    >
                      Book Direct
                    </button>
                  </div>
                  {/* OTA Quick Links */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={room.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 py-2 px-2.5 bg-[#003580] hover:bg-[#002B66] text-white text-[11px] font-bold rounded-md transition-all border border-blue-400/30"
                    >
                      <span className="font-serif italic font-extrabold text-xs">b.</span>
                      <span>Booking.com</span>
                    </a>
                    <a
                      href={room.agodaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 py-2 px-2.5 bg-[#00A859]/20 hover:bg-[#00A859]/30 text-white border border-[#00A859]/50 text-[11px] font-bold rounded-md transition-all"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00A859]"></span>
                      <span>Agoda</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Swipeable Room Detail & Gallery Modal */}
      {selectedRoom && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={closeModal}
        >
          <div
            className="glass-effect w-full sm:max-w-2xl max-h-[92dvh] overflow-y-auto
                        rounded-t-2xl sm:rounded-2xl p-5 sm:p-8 relative animate-scaleUp
                        border border-[#ECC46C]/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 bg-[#0A0F29]/80 text-gray-300 hover:text-white rounded-full border border-[#ECC46C]/30 z-30"
              aria-label="Close room details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-4 pr-10">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">{selectedRoom.name}</h3>
              <p className="text-[#ECC46C] text-xs font-semibold uppercase tracking-wider mt-0.5">{selectedRoom.subtitle}</p>
            </div>

            {/* Swipeable Photo Gallery Container */}
            <div
              className="relative h-60 sm:h-80 rounded-xl overflow-hidden mb-4 border border-[#ECC46C]/30 shadow-2xl group touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={selectedRoom.gallery[activeImageIdx]}
                alt={`${selectedRoom.name} photo ${activeImageIdx + 1}`}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Prev / Next Arrow Overlay */}
              {selectedRoom.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#0A0F29]/80 text-[#ECC46C] border border-[#ECC46C]/40 rounded-full hover:bg-[#ECC46C] hover:text-[#0A0F29] transition-all shadow-xl"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#0A0F29]/80 text-[#ECC46C] border border-[#ECC46C]/40 rounded-full hover:bg-[#ECC46C] hover:text-[#0A0F29] transition-all shadow-xl"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Thumbnail Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#0A0F29]/70 backdrop-blur-md py-1 px-2.5 rounded-full border border-white/10">
                    {selectedRoom.gallery.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIdx(i)}
                        className={`h-2 rounded-full transition-all ${
                          activeImageIdx === i ? 'w-5 bg-[#ECC46C]' : 'w-2 bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <p className="text-center text-[11px] text-gray-400 mb-5">
              ↔ Swipe left/right to view room &amp; bathroom photos
            </p>

            <h4 className="font-serif text-lg text-[#ECC46C] mb-2 font-bold">Room Overview</h4>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
              {selectedRoom.description}
            </p>

            <h4 className="font-serif text-lg text-[#ECC46C] mb-3 font-bold">Luxury Amenities Included</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-7">
              {selectedRoom.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#ECC46C] shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-200 leading-snug">{feature}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => { closeModal(); onBookRoom(selectedRoom); }}
                className="w-full min-h-[48px] bg-gradient-to-r from-[#D7AD50] to-[#ECC46C] text-[#0A0F29] text-xs font-bold uppercase tracking-wider rounded-lg shadow-xl"
              >
                Book Direct With Us
              </button>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={selectedRoom.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 min-h-[44px] bg-[#003580] hover:bg-[#002B66] text-white text-xs font-bold rounded-lg transition-all border border-blue-400/30"
                >
                  <span className="font-serif italic font-extrabold text-sm">b.</span>
                  <span>Booking.com</span>
                </a>
                <a
                  href={selectedRoom.agodaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 min-h-[44px] bg-[#00A859]/20 hover:bg-[#00A859]/30 text-white border border-[#00A859]/50 text-xs font-bold rounded-lg transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00A859]"></span>
                  <span>Agoda</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
