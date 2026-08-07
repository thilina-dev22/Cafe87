import React, { useState } from 'react';
import { roomsData } from '../data/siteData';
import { CheckCircle, X } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, selectedRoom }) {
  const [room, setRoom] = useState(selectedRoom ? selectedRoom.id : roomsData[0].id);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleBooking = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="glass-effect rounded-2xl max-w-xl w-full p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2"
        >
          <X className="w-6 h-6" />
        </button>

        {!submitted ? (
          <>
            <div className="text-center mb-6">
              <p className="font-cursive text-2xl text-[#C5A059] mb-1">Direct Reservation</p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Book Your Stay at 87 Ahangama
              </h3>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Select Room</label>
                <select
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0A0D12] border border-[#C5A059]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#C5A059]"
                >
                  {roomsData.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.price} {r.pricePeriod})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Check-In</label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0A0D12] border border-[#C5A059]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Check-Out</label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0A0D12] border border-[#C5A059]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Guest Name"
                    className="w-full px-4 py-3 bg-[#0A0D12] border border-[#C5A059]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">WhatsApp / Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+94 ..."
                    className="w-full px-4 py-3 bg-[#0A0D12] border border-[#C5A059]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-[#C5A059] to-[#E5C483] hover:from-[#E5C483] hover:to-[#C5A059] text-[#0A0D12] font-bold text-sm uppercase tracking-widest py-3.5 rounded shadow-lg transition-all"
              >
                Confirm Reservation Request
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-[#C5A059] mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-white mb-2">Reservation Received!</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Thank you, <strong className="text-white">{name}</strong>! We have received your booking request for <strong className="text-white">{checkIn}</strong>. Our reception team will message you at <strong className="text-white">{phone}</strong> shortly.
            </p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-[#C5A059] to-[#E5C483] text-[#0A0D12] font-bold text-xs uppercase tracking-widest px-8 py-3 rounded"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
