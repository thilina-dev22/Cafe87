import React, { useState, useEffect } from 'react';
import { roomsData, siteConfig } from '../data/siteData';
import { submitForm, whatsappLink } from '../lib/submitForm';
import useDialogKeys from '../hooks/useDialogKeys';
import { CheckCircle, X, Loader2 } from 'lucide-react';

const labelCls = 'block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5';
const inputCls =
  'w-full min-h-[48px] px-4 py-3 bg-[#0A0D12] border border-[#C5A059]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#C5A059]';

export default function BookingModal({ isOpen, onClose, selectedRoom }) {
  const [room, setRoom] = useState(selectedRoom ? selectedRoom.id : roomsData[0].id);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Keep the room selector in sync with whichever room opened the modal
  useEffect(() => {
    if (isOpen) {
      setRoom(selectedRoom ? selectedRoom.id : roomsData[0].id);
      setError(false);
    }
  }, [isOpen, selectedRoom]);

  // Body lock
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('body-locked');
    } else {
      document.body.classList.remove('body-locked');
      setSubmitted(false);
    }
    return () => document.body.classList.remove('body-locked');
  }, [isOpen]);

  useDialogKeys(isOpen, { onClose });

  if (!isOpen) return null;

  const selectedRoomObj = roomsData.find((r) => r.id === room);
  const roomName = selectedRoomObj ? selectedRoomObj.name : room;
  const today = new Date().toISOString().split('T')[0];

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      await submitForm({
        subject: `New Room Booking Request: ${roomName}`,
        from_name: name,
        guest_name: name,
        phone_or_whatsapp: phone,
        room: roomName,
        check_in: checkIn,
        check_out: checkOut,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fallbackMessage = `Hi 87 Ahangama, I'd like to book the ${roomName}. Check-in: ${checkIn || '—'}, check-out: ${checkOut || '—'}. Name: ${name || '—'}.`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
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
            <Loader2 className="w-12 h-12 text-[#C5A059] animate-spin mb-4" aria-hidden="true" />
            <h4 className="font-serif text-xl font-bold text-white mb-1">Sending Reservation Request...</h4>
            <p className="text-gray-300 text-xs tracking-wider uppercase">Please wait a moment</p>
          </div>
        )}
        {/* Drag handle */}
        <div className="sm:hidden w-10 h-1 bg-gray-600 rounded-full mx-auto mb-4" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-300 hover:text-white rounded-lg"
          aria-label="Close booking modal"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </button>

        {!submitted ? (
          <>
            <div className="text-center mb-6">
              <p className="font-cursive text-2xl text-[#C5A059] mb-1">Direct Reservation</p>
              <h3 id="booking-title" className="font-serif text-xl sm:text-2xl font-bold text-white">
                Book Your Stay at 87 Ahangama
              </h3>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              {/* Room selector */}
              <div>
                <label htmlFor="bk-room" className={labelCls}>Select Room</label>
                <select
                  id="bk-room"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className={`${inputCls} appearance-none`}
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
                  <label htmlFor="bk-in" className={labelCls}>Check-In</label>
                  <input
                    id="bk-in"
                    type="date"
                    required
                    min={today}
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (checkOut && checkOut <= e.target.value) setCheckOut('');
                    }}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="bk-out" className={labelCls}>Check-Out</label>
                  <input
                    id="bk-out"
                    type="date"
                    required
                    min={checkIn || today}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Name + phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bk-name" className={labelCls}>Full Name</label>
                  <input
                    id="bk-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Guest Name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="bk-phone" className={labelCls}>WhatsApp / Phone</label>
                  <input
                    id="bk-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+94 ..."
                    className={inputCls}
                  />
                </div>
              </div>

              {error && (
                <div role="alert" className="bg-red-500/10 border border-red-500/40 text-red-200 text-xs rounded-lg p-3 leading-relaxed">
                  We couldn't send your request. Please{' '}
                  <a href={whatsappLink(fallbackMessage)} target="_blank" rel="noopener noreferrer" className="underline font-bold text-white">
                    send it via WhatsApp
                  </a>{' '}
                  or try again.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[52px] mt-2 bg-gradient-to-r from-[#D7AD50] to-[#ECC46C] hover:from-[#ECC46C] hover:to-[#D7AD50]
                           text-[#0A0F29] font-bold text-sm uppercase tracking-widest rounded-lg shadow-xl transition-all active:scale-[0.98]
                           flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                    <span>Processing Reservation...</span>
                  </>
                ) : (
                  <span>Confirm Direct Reservation</span>
                )}
              </button>
            </form>

            {/* OTA Partner Booking Links */}
            <div className="mt-8 pt-6 border-t border-[#ECC46C]/20 text-center">
              <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-3">
                Or Book Via Our Partner Platforms
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <a
                  href={siteConfig.otaLinks.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#003580] hover:bg-[#002B66] text-white font-bold text-xs rounded-lg shadow-md transition-all border border-blue-400/30"
                >
                  <span className="font-serif text-sm italic font-extrabold">b.</span>
                  <span>Booking.com</span>
                </a>
                <a
                  href={siteConfig.otaLinks.agoda}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#00A859]/20 hover:bg-[#00A859]/30 text-white border border-[#00A859]/50 font-bold text-xs rounded-lg shadow-md transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00A859] inline-block animate-pulse"></span>
                  <span>Agoda</span>
                </a>
                <div aria-disabled="true" className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#FF5A5F]/15 text-gray-300 border border-[#FF5A5F]/30 font-semibold text-xs rounded-lg cursor-not-allowed col-span-2 sm:col-span-1">
                  <span className="text-[#FF5A5F]">airbnb</span>
                  <span className="text-[9px] bg-white/10 text-gray-300 px-1.5 py-0.5 rounded">Soon</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-[#C5A059] mx-auto mb-4" aria-hidden="true" />
            <h3 className="font-serif text-2xl font-bold text-white mb-2">Reservation Received!</h3>
            <p role="status" className="text-gray-300 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
              Thank you, <strong className="text-white">{name}</strong>! We received your request for the{' '}
              <strong className="text-white">{roomName}</strong> ({checkIn} → {checkOut}). Our team will message you at{' '}
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
