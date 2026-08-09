import React, { useState } from 'react';
import { roomsData, siteConfig } from '../data/siteData';
import { CheckCircle, X, Loader2 } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, selectedRoom }) {
  const [room, setRoom] = useState(selectedRoom ? selectedRoom.id : roomsData[0].id);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Body lock
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('body-locked');
    } else {
      document.body.classList.remove('body-locked');
      // Reset on close
      if (!isOpen) setSubmitted(false);
    }
    return () => document.body.classList.remove('body-locked');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    const apiKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || siteConfig.web3formsAccessKey;
    const selectedRoomObj = roomsData.find((r) => r.id === room);

    try {
      if (apiKey) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: apiKey,
            subject: `New Room Booking Request: ${selectedRoomObj ? selectedRoomObj.name : room}`,
            from_name: name,
            guest_name: name,
            phone_or_whatsapp: phone,
            room: selectedRoomObj ? selectedRoomObj.name : room,
            check_in: checkIn,
            check_out: checkOut,
          }),
        });
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* Bottom-sheet on mobile, centered modal on sm+ */}
      <div
        className="glass-effect w-full sm:max-w-xl sm:mx-4 max-h-[92dvh] overflow-y-auto
                    rounded-t-2xl sm:rounded-2xl p-5 sm:p-8 relative animate-scaleUp
                    pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 z-50 bg-[#0A0D12]/92 backdrop-blur-md rounded-t-2xl sm:rounded-2xl flex flex-col items-center justify-center p-6 animate-fadeIn">
            <Loader2 className="w-12 h-12 text-[#C5A059] animate-spin mb-4" />
            <h4 className="font-serif text-xl font-bold text-white mb-1">Sending Reservation Request...</h4>
            <p className="text-gray-400 text-xs tracking-wider uppercase">Please wait a moment</p>
          </div>
        )}
        {/* Drag handle */}
        <div className="sm:hidden w-10 h-1 bg-gray-600 rounded-full mx-auto mb-4" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-white rounded-lg"
          aria-label="Close booking modal"
        >
          <X className="w-6 h-6" />
        </button>

        {!submitted ? (
          <>
            <div className="text-center mb-6">
              <p className="font-cursive text-2xl text-[#C5A059] mb-1">Direct Reservation</p>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Book Your Stay at 87 Ahangama
              </h3>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              {/* Room selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Select Room
                </label>
                <select
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full min-h-[48px] px-4 py-3 bg-[#0A0D12] border border-[#C5A059]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#C5A059] appearance-none"
                >
                  {roomsData.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.price} {r.pricePeriod})
                    </option>
                  ))}
                </select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Check-In
                  </label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full min-h-[48px] px-4 py-3 bg-[#0A0D12] border border-[#C5A059]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Check-Out
                  </label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full min-h-[48px] px-4 py-3 bg-[#0A0D12] border border-[#C5A059]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {/* Name + phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Guest Name"
                    className="w-full min-h-[48px] px-4 py-3 bg-[#0A0D12] border border-[#C5A059]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    WhatsApp / Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+94 ..."
                    className="w-full min-h-[48px] px-4 py-3 bg-[#0A0D12] border border-[#C5A059]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[52px] mt-2 bg-gradient-to-r from-[#C5A059] to-[#E5C483] hover:from-[#E5C483] hover:to-[#C5A059]
                           text-[#0A0D12] font-bold text-sm uppercase tracking-widest rounded shadow-lg transition-all active:scale-[0.98]
                           flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Reservation...</span>
                  </>
                ) : (
                  <span>Confirm Reservation Request</span>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-[#C5A059] mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-white mb-2">Reservation Received!</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
              Thank you, <strong className="text-white">{name}</strong>! We received your request for{' '}
              <strong className="text-white">{checkIn}</strong>. Our team will message you at{' '}
              <strong className="text-white">{phone}</strong> shortly.
            </p>
            <button
              onClick={onClose}
              className="min-h-[48px] px-10 bg-gradient-to-r from-[#C5A059] to-[#E5C483] text-[#0A0D12] font-bold text-xs uppercase tracking-widest rounded"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
