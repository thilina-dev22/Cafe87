import React from 'react';
import { siteConfig } from '../data/siteData';
import { MapPin, Phone, Mail, Globe, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#07090C', borderTop: '1px solid rgba(197, 160, 89, 0.2)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img src={siteConfig.logo} alt="87 Ahangama" style={{ height: '44px', width: 'auto' }} />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF' }}>
                87 AHANGAMA
              </span>
            </div>
            <p style={{ color: '#9CA3AF', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              A luxury boutique coastal residence & artisanal cafe in Ahangama, Sri Lanka. Offering sun-filled rooms, ocean views, and warm island hospitality.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'var(--primary-gold)', background: 'rgba(197, 160, 89, 0.1)', padding: '0.6rem', borderRadius: '50%' }}>
                <Globe size={18} />
              </a>
              <a href="#" style={{ color: 'var(--primary-gold)', background: 'rgba(197, 160, 89, 0.1)', padding: '0.6rem', borderRadius: '50%' }}>
                <Share2 size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.2rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--primary-gold)', display: 'inline-block', paddingBottom: '0.3rem' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Home', 'Rooms', 'Cafe & Dining', 'Gallery', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    style={{ color: '#D1D5DB', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--primary-gold)'}
                    onMouseLeave={(e) => e.target.style.color = '#D1D5DB'}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.2rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--primary-gold)', display: 'inline-block', paddingBottom: '0.3rem' }}>
              Contact Us
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: '#D1D5DB' }}>
              <li style={{ display: 'flex', gap: '0.75rem' }}>
                <MapPin size={18} color="var(--primary-gold)" style={{ flexShrink: 0 }} />
                <span>{siteConfig.address}</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem' }}>
                <Phone size={18} color="var(--primary-gold)" style={{ flexShrink: 0 }} />
                <a href={`tel:${siteConfig.phone}`} style={{ color: 'var(--primary-gold)', textDecoration: 'none' }}>{siteConfig.phone}</a>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem' }}>
                <Mail size={18} color="var(--primary-gold)" style={{ flexShrink: 0 }} />
                <span>{siteConfig.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#6B7280' }}>
          &copy; {new Date().getFullYear()} 87 Ahangama. All rights reserved. Built with React & Vite.
        </div>
      </div>
    </footer>
  );
}
