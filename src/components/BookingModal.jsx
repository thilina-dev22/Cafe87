import React, { useState } from 'react';
import { roomsData } from '../data/siteData';
import { Calendar, Users, CheckCircle, X } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, selectedRoom }) {
  const [room, setRoom] = useState(selectedRoom ? selectedRoom.id : roomsData[0].id);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
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
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          maxWidth: '600px',
          width: '100%',
          padding: '2.5rem',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: '#9CA3AF',
            cursor: 'pointer'
          }}
        >
          <X size={24} />
        </button>

        {!submitted ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <p className="font-accent" style={{ fontSize: '1.75rem' }}>Direct Reservation</p>
              <h2 style={{ fontSize: '2.25rem', color: '#FFFFFF' }}>Book Your Stay at 87 Ahangama</h2>
            </div>

            <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: '#D1D5DB', marginBottom: '0.35rem' }}>Select Room</label>
                <select
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    backgroundColor: '#0F1319',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                    borderRadius: '6px',
                    color: '#FFFFFF',
                    outline: 'none'
                  }}
                >
                  {roomsData.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.price} {r.pricePeriod})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: '#D1D5DB', marginBottom: '0.35rem' }}>Check-In Date</label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      backgroundColor: '#0F1319',
                      border: '1px solid rgba(197, 160, 89, 0.3)',
                      borderRadius: '6px',
                      color: '#FFFFFF',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: '#D1D5DB', marginBottom: '0.35rem' }}>Check-Out Date</label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      backgroundColor: '#0F1319',
                      border: '1px solid rgba(197, 160, 89, 0.3)',
                      borderRadius: '6px',
                      color: '#FFFFFF',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: '#D1D5DB', marginBottom: '0.35rem' }}>Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Guest Name"
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      backgroundColor: '#0F1319',
                      border: '1px solid rgba(197, 160, 89, 0.3)',
                      borderRadius: '6px',
                      color: '#FFFFFF',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: '#D1D5DB', marginBottom: '0.35rem' }}>WhatsApp / Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+94 ..."
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      backgroundColor: '#0F1319',
                      border: '1px solid rgba(197, 160, 89, 0.3)',
                      borderRadius: '6px',
                      color: '#FFFFFF',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
                Confirm Reservation Request
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle size={64} color="var(--primary-gold)" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>Reservation Received!</h2>
            <p style={{ color: '#D1D5DB', marginBottom: '2rem', lineHeight: '1.6' }}>
              Thank you, <strong>{name}</strong>! We have received your booking request for check-in on <strong>{checkIn}</strong>. Our team will contact you via WhatsApp at <strong>{phone}</strong> shortly.
            </p>
            <button onClick={onClose} className="btn-gold">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
