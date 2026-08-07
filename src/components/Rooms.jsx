import React, { useState } from 'react';
import { roomsData } from '../data/siteData';
import { Bed, Users, Maximize, CheckCircle, ShieldCheck, X } from 'lucide-react';

export default function Rooms({ onBookRoom }) {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const openModal = (room) => {
    setSelectedRoom(room);
    document.body.classList.add('body-locked');
  };

  const closeModal = () => {
    setSelectedRoom(null);
    document.body.classList.remove('body-locked');
  };

  return (
    <section id="rooms" className="py-16 sm:py-20 bg-[#0A0D12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="font-cursive text-2xl sm:text-3xl text-[#C5A059] mb-1">Luxury Accommodations</p>
          <h2 className="font-serif font-bold text-white tracking-wide text-[clamp(1.7rem,5vw,3rem)]">
            Boutique Rooms &amp; Suites
          </h2>
          <div className="w-14 h-0.5 bg-[#C5A059] mx-auto mt-3"></div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {roomsData.map((room) => (
            <div
              key={room.id}
              className="glass-effect glass-effect-hover rounded-xl overflow-hidden flex flex-col group"
            >
              {/* Room Image */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Price badge */}
                <div className="absolute top-3 right-3 bg-[#0F194C]/90 backdrop-blur-md border border-[#C5A059] px-3 py-1 rounded-full text-white font-bold text-sm leading-snug">
                  {room.price}
                  <span className="text-[10px] text-gray-300 font-normal ml-1">{room.pricePeriod}</span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <div className="mb-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-0.5">{room.name}</h3>
                  <p className="text-[#C5A059] text-xs italic">{room.subtitle}</p>
                </div>

                <p className="text-gray-400 text-sm mb-5 line-clamp-3 leading-relaxed">
                  {room.description}
                </p>

                {/* Specs row */}
                <div className="grid grid-cols-3 gap-1.5 p-2.5 bg-[#0A0D12]/70 rounded-lg mb-5 text-center border border-white/5">
                  <div className="flex flex-col items-center gap-1 py-1">
                    <Maximize className="w-4 h-4 text-[#C5A059]" />
                    <span className="text-[11px] text-gray-300 font-medium leading-tight">{room.size}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 py-1">
                    <Users className="w-4 h-4 text-[#C5A059]" />
                    <span className="text-[11px] text-gray-300 font-medium leading-tight">{room.capacity}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 py-1">
                    <Bed className="w-4 h-4 text-[#C5A059]" />
                    <span className="text-[11px] text-gray-300 font-medium leading-tight">King Bed</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-5 flex-grow">
                  {room.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                      <span className="text-[12px] text-gray-300 leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Buttons — 48px min-height for touch */}
                <div className="grid grid-cols-2 gap-2.5 mt-auto">
                  <button
                    onClick={() => openModal(room)}
                    className="min-h-[48px] border border-[#C5A059] text-white hover:bg-[#C5A059] hover:text-[#0A0D12]
                               text-xs uppercase font-bold rounded transition-all active:scale-[0.97]"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onBookRoom(room)}
                    className="min-h-[48px] bg-gradient-to-r from-[#C5A059] to-[#E5C483] hover:from-[#E5C483] hover:to-[#C5A059]
                               text-[#0A0D12] text-xs uppercase font-bold rounded transition-all active:scale-[0.97]"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Room Detail Modal ── */}
      {selectedRoom && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center"
          onClick={closeModal}
        >
          {/*
            On mobile: sheet slides up from bottom (items-end).
            On sm+: centered dialog.
          */}
          <div
            className="glass-effect w-full sm:max-w-2xl sm:mx-4 max-h-[92dvh] overflow-y-auto
                        rounded-t-2xl sm:rounded-2xl p-5 sm:p-8 relative animate-scaleUp
                        pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle (mobile visual cue) */}
            <div className="sm:hidden w-10 h-1 bg-gray-600 rounded-full mx-auto mb-4" />

            {/* Header row */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">{selectedRoom.name}</h3>
                <p className="text-[#C5A059] text-sm">{selectedRoom.subtitle}</p>
              </div>
              <button onClick={closeModal} className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-white rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            <img
              src={selectedRoom.image}
              alt={selectedRoom.name}
              className="w-full h-52 sm:h-72 object-cover rounded-xl mb-5"
            />

            <h4 className="font-serif text-lg sm:text-xl text-[#C5A059] mb-1.5">Room Overview</h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              {selectedRoom.description}
            </p>

            <h4 className="font-serif text-lg sm:text-xl text-[#C5A059] mb-3">Included Amenities</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-7">
              {selectedRoom.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-200 leading-snug">{feature}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={closeModal}
                className="min-h-[48px] border border-[#C5A059] text-white hover:bg-[#C5A059] hover:text-[#0A0D12] text-xs font-bold uppercase rounded"
              >
                Close
              </button>
              <button
                onClick={() => { closeModal(); onBookRoom(selectedRoom); }}
                className="min-h-[48px] bg-gradient-to-r from-[#C5A059] to-[#E5C483] text-[#0A0D12] text-xs font-bold uppercase rounded"
              >
                Book This Room
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
