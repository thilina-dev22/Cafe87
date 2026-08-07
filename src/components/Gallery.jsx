import React, { useState } from 'react';
import { galleryData } from '../data/siteData';
import { Maximize2, X } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [activeImage, setActiveImage] = useState(null);

  const categories = ['All', 'Resort', 'Rooms', 'Cafe', 'Vibe'];

  const filteredImages = filter === 'All'
    ? galleryData
    : galleryData.filter(img => img.category === filter);

  return (
    <section id="gallery" style={{ padding: '6rem 0', backgroundColor: '#141923' }}>
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">Visual Experience</p>
          <h2 className="section-title">Resort & Cafe Gallery</h2>
          <div className="section-divider"></div>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '30px',
                border: filter === cat ? '1px solid var(--primary-gold)' : '1px solid rgba(255,255,255,0.1)',
                backgroundColor: filter === cat ? 'var(--primary-gold)' : 'rgba(10, 13, 18, 0.6)',
                color: filter === cat ? '#0A0D12' : '#E5E7EB',
                fontWeight: filter === cat ? '700' : '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.875rem',
                letterSpacing: '0.05em'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {filteredImages.map((item) => (
            <div
              key={item.id}
              className="glass-card"
              style={{
                position: 'relative',
                height: '260px',
                overflow: 'hidden',
                cursor: 'pointer',
                borderRadius: '10px'
              }}
              onClick={() => setActiveImage(item)}
            >
              <img
                src={item.url}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10, 13, 18, 0.85) 0%, transparent 60%)',
                  opacity: 0.85,
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.25rem',
                  transition: 'opacity 0.3s ease'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {item.category}
                  </span>
                  <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginTop: '0.2rem' }}>{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
          onClick={() => setActiveImage(null)}
        >
          <div style={{ position: 'relative', maxWidth: '900px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveImage(null)}
              style={{
                position: 'absolute',
                top: '-3rem',
                right: 0,
                background: 'none',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <X size={32} />
            </button>
            <img
              src={activeImage.url}
              alt={activeImage.title}
              style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px' }}
            />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.5rem' }}>{activeImage.title}</h3>
              <p style={{ color: 'var(--primary-gold)', fontSize: '0.9rem' }}>{activeImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
