import React, { useState } from 'react';
import { roomsData } from '../data/siteData';
import { Bed, Users, Maximize, CheckCircle, ShieldCheck, X } from 'lucide-react';

export default function Rooms({ onBookRoom }) {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <section id="rooms" className="py-20 bg-[#0A0D12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-cursive text-3xl text-[#C5A059] mb-1">Luxury Accommodations</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide">
            Boutique Rooms & Suites
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4"></div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomsData.map((room) => (
            <div
              key={room.id}
              className="glass-effect glass-effect-hover rounded-xl overflow-hidden flex flex-col group"
            >
              {/* Room Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-[#0F194C]/90 backdrop-blur-md border border-[#C5A059] px-3 py-1.5 rounded-full text-white font-bold text-sm">
                  {room.price} <span className="text-xs text-gray-300 font-normal">{room.pricePeriod}</span>
                </div>
              </div>

              {/* Room Body */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-3">
                  <h3 className="font-serif text-2xl font-bold text-white mb-1">{room.name}</h3>
                  <p className="text-[#C5A059] text-xs italic">{room.subtitle}</p>
                </div>

                <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {room.description}
                </p>

                {/* Specs Box */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-[#0A0D12]/70 rounded-lg mb-6 text-center border border-white/5">
                  <div className="flex flex-col items-center">
                    <Maximize className="w-4 h-4 text-[#C5A059] mb-1" />
                    <span className="text-xs text-gray-300 font-medium">{room.size}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Users className="w-4 h-4 text-[#C5A059] mb-1" />
                    <span className="text-xs text-gray-300 font-medium">{room.capacity}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Bed className="w-4 h-4 text-[#C5A059] mb-1" />
                    <span className="text-xs text-gray-300 font-medium">{room.bed.split(' ')[1]} Bed</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 mb-6 flex-grow">
                  {room.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <span className="text-xs text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className="w-full border border-[#C5A059] text-white hover:bg-[#C5A059] hover:text-[#0A0D12] text-xs uppercase font-bold py-2.5 rounded transition-all text-center"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onBookRoom(room)}
                    className="w-full bg-gradient-to-r from-[#C5A059] to-[#E5C483] hover:from-[#E5C483] hover:to-[#C5A059] text-[#0A0D12] text-xs uppercase font-bold py-2.5 rounded transition-all text-center"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Room Details Modal */}
      {selectedRoom && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedRoom(null)}
        >
          <div
            className="glass-effect rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-serif text-3xl font-bold text-white">{selectedRoom.name}</h3>
                <p className="text-[#C5A059] text-sm">{selectedRoom.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedRoom(null)}
                className="text-gray-400 hover:text-white p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <img
              src={selectedRoom.image}
              alt={selectedRoom.name}
              className="w-full h-64 sm:h-80 object-cover rounded-xl mb-6"
            />

            <h4 className="font-serif text-xl text-[#C5A059] mb-2">Room Overview</h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {selectedRoom.description}
            </p>

            <h4 className="font-serif text-xl text-[#C5A059] mb-3">Included Amenities</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {selectedRoom.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span className="text-xs text-gray-200">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedRoom(null)}
                className="px-6 py-2.5 border border-[#C5A059] text-white hover:bg-[#C5A059] hover:text-[#0A0D12] text-xs font-bold uppercase rounded"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const target = selectedRoom;
                  setSelectedRoom(null);
                  onBookRoom(target);
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#E5C483] text-[#0A0D12] text-xs font-bold uppercase rounded"
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
