import React from 'react';
import { ChevronDown, Wifi, Tv, Coffee, Sun } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function Hero({ onBookClick }) {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `linear-gradient(to bottom, rgba(10, 13, 18, 0.45), rgba(10, 13, 18, 0.85)), url("${siteConfig.heroBg}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        paddingTop: '5rem'
      }}
    >
      <div className="container" style={{ textCenter: 'center', textAlign: 'center', zIndex: 2 }}>
        <p className="font-accent" style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>
          Welcome to
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.75rem, 6vw, 5.5rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '0.04em',
            marginBottom: '1rem',
            color: '#FFFFFF',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}
        >
          A Tranquil Coastal Escape
        </h1>

        <p
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            color: 'var(--secondary-gold)',
            maxWidth: '750px',
            margin: '0 auto 2.5rem',
            fontWeight: 300,
            letterSpacing: '0.05em'
          }}
        >
          {siteConfig.subtagline}
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '1.25rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '4rem'
          }}
        >
          <button onClick={onBookClick} className="btn-gold">
            Book Your Stay
          </button>

          <a href="#rooms" className="btn-outline">
            Explore Rooms
          </a>
        </div>

        {/* Feature Highlights Badges */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            maxWidth: '900px',
            margin: '0 auto',
            padding: '1.25rem',
            background: 'rgba(20, 25, 35, 0.65)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            border: '1px solid rgba(197, 160, 89, 0.25)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <Sun color="var(--primary-gold)" size={24} />
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Sun & Moon Rooms</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <Wifi color="var(--primary-gold)" size={24} />
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>High-Speed Wi-Fi</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <Tv color="var(--primary-gold)" size={24} />
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Free Netflix & YouTube</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <Coffee color="var(--primary-gold)" size={24} />
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Artisanal Cafe</span>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#rooms"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--primary-gold)',
          animation: 'bounce 2s infinite',
          zIndex: 2
        }}
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </a>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translate(-50%, 0); }
          40% { transform: translate(-50%, -10px); }
          60% { transform: translate(-50%, -5px); }
        }
      `}</style>
    </section>
  );
}
