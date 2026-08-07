import React, { useState } from 'react';
import { roomsData } from '../data/siteData';
import { Bed, Users, Maximize, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Rooms({ onBookRoom }) {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <section id="rooms" style={{ padding: '6rem 0', backgroundColor: '#0F1319' }}>
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">Luxury Accommodations</p>
          <h2 className="section-title">Boutique Rooms & Suites</h2>
          <div className="section-divider"></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
          {roomsData.map((room) => (
            <div key={room.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* Image Container */}
              <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                <img
                  src={room.image}
                  alt={room.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(15, 25, 76, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--primary-gold)',
                    padding: '0.4rem 1rem',
                    borderRadius: '20px',
                    color: 'var(--secondary-gold)',
                    fontWeight: '700',
                    fontSize: '1rem'
                  }}
                >
                  {room.price} <span style={{ fontSize: '0.75rem', fontWeight: '400', color: '#D1D5DB' }}>{room.pricePeriod}</span>
                </div>
              </div>

              {/* Room Info */}
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.75rem', color: '#FFFFFF', marginBottom: '0.25rem' }}>{room.name}</h3>
                  <p style={{ color: 'var(--primary-gold)', fontSize: '0.9rem', fontStyle: 'italic' }}>{room.subtitle}</p>
                </div>

                <p style={{ color: '#9CA3AF', fontSize: '0.925rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  {room.description}
                </p>

                {/* Specs Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.75rem',
                    padding: '0.85rem',
                    backgroundColor: 'rgba(10, 13, 18, 0.6)',
                    borderRadius: '8px',
                    marginBottom: '1.5rem'
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <Maximize size={16} color="var(--primary-gold)" style={{ margin: '0 auto 0.25rem' }} />
                    <span style={{ fontSize: '0.75rem', color: '#D1D5DB', display: 'block' }}>{room.size}</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <Users size={16} color="var(--primary-gold)" style={{ margin: '0 auto 0.25rem' }} />
                    <span style={{ fontSize: '0.75rem', color: '#D1D5DB', display: 'block' }}>{room.capacity}</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <Bed size={16} color="var(--primary-gold)" style={{ margin: '0 auto 0.25rem' }} />
                    <span style={{ fontSize: '0.75rem', color: '#D1D5DB', display: 'block' }}>{room.bed.split(' ')[1]} Bed</span>
                  </div>
                </div>

                {/* Features Checklist preview */}
                <div style={{ marginBottom: '1.5rem', flexGrow: 1 }}>
                  {room.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <CheckCircle size={14} color="var(--primary-gold)" />
                      <span style={{ fontSize: '0.85rem', color: '#E5E7EB' }}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className="btn-outline"
                    style={{ flex: 1, padding: '0.65rem 0.5rem', fontSize: '0.8rem', justifyContent: 'center' }}
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onBookRoom(room)}
                    className="btn-gold"
                    style={{ flex: 1, padding: '0.65rem 0.5rem', fontSize: '0.8rem', justifyContent: 'center' }}
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
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setSelectedRoom(null)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '750px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '2.25rem', color: '#FFFFFF' }}>{selectedRoom.name}</h2>
                <p style={{ color: 'var(--primary-gold)', fontSize: '1rem' }}>{selectedRoom.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedRoom(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                ✕
              </button>
            </div>

            <img
              src={selectedRoom.image}
              alt={selectedRoom.name}
              style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1.5rem' }}
            />

            <h4 style={{ color: 'var(--primary-gold)', marginBottom: '0.5rem' }}>Room Overview</h4>
            <p style={{ color: '#D1D5DB', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              {selectedRoom.description}
            </p>

            <h4 style={{ color: 'var(--primary-gold)', marginBottom: '0.75rem' }}>Included Amenities & Facilities</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
              {selectedRoom.features.map((feature, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <ShieldCheck size={16} color="var(--primary-gold)" />
                  <span style={{ fontSize: '0.9rem', color: '#F3F4F6' }}>{feature}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedRoom(null)} className="btn-outline">
                Close
              </button>
              <button
                onClick={() => {
                  const roomToBook = selectedRoom;
                  setSelectedRoom(null);
                  onBookRoom(roomToBook);
                }}
                className="btn-gold"
              >
                Proceed to Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
