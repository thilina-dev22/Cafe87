import React from 'react';
import { Compass, Heart, Anchor, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function About() {
  return (
    <section id="about" style={{ padding: '6rem 0', backgroundColor: '#141923' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Left Text */}
          <div>
            <p className="font-accent" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Discover</p>
            <h2 style={{ fontSize: '3rem', color: '#FFFFFF', marginBottom: '1.5rem', lineHeight: 1.15 }}>
              The Essence of 87 Ahangama
            </h2>
            <div style={{ width: '60px', height: '2px', background: 'var(--primary-gold)', marginBottom: '1.5rem' }}></div>

            <p style={{ color: '#D1D5DB', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.25rem' }}>
              Nestled along Sri Lanka's famous southern coastline, <strong>87 Ahangama</strong> is a boutique residence and artisanal cafe created for travelers, surfers, and dreamers seeking serenity.
            </p>

            <p style={{ color: '#9CA3AF', fontSize: '0.975rem', lineHeight: '1.8', marginBottom: '2rem' }}>
              From sun-drenched private rooms with plush bedding and high-speed fiber internet to locally sourced tropical coffee and gourmet hoppers, we combine warm island hospitality with modern luxury amenities.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Compass color="var(--primary-gold)" size={24} style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem' }}>Prime Location</h4>
                  <p style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Minutes from surf breaks and coastal cafes</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Heart color="var(--primary-gold)" size={24} style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem' }}>Warm Hospitality</h4>
                  <p style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Personalized service & local recommendations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Composite Image Grid */}
          <div style={{ position: 'relative' }}>
            <div className="glass-card" style={{ padding: '0.75rem', overflow: 'hidden' }}>
              <img
                src="/assets/images/pexels-freestockpro-11629009-scaled.jpg"
                alt="87 Ahangama Resort Exterior"
                style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '8px' }}
              />
            </div>
            
            <div
              className="glass-card"
              style={{
                position: 'absolute',
                bottom: '-2rem',
                left: '-2rem',
                padding: '1.25rem 1.75rem',
                border: '1px solid var(--primary-gold)',
                background: 'rgba(15, 25, 76, 0.9)'
              }}
            >
              <span style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary-gold)', fontFamily: 'var(--font-heading)' }}>
                4.9★
              </span>
              <p style={{ fontSize: '0.85rem', color: '#E5E7EB', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Guest Rating
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
