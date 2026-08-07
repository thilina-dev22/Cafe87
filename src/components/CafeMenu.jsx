import React from 'react';
import { cafeMenuItems } from '../data/siteData';
import { Coffee, Utensils } from 'lucide-react';

export default function CafeMenu() {
  return (
    <section id="cafe" style={{ padding: '6rem 0', backgroundColor: '#0F1319' }}>
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">Artisanal Dining</p>
          <h2 className="section-title">Cafe 87 Menu</h2>
          <div className="section-divider"></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
          {cafeMenuItems.map((cat, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                {idx === 0 ? <Coffee color="var(--primary-gold)" size={28} /> : <Utensils color="var(--primary-gold)" size={28} />}
                <h3 style={{ fontSize: '1.85rem', color: '#FFFFFF' }}>{cat.category}</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {cat.items.map((item, i) => (
                  <div key={i} style={{ borderBottom: '1px dashed rgba(197, 160, 89, 0.2)', paddingBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                      <h4 style={{ fontSize: '1.2rem', color: '#F3F4F6' }}>{item.name}</h4>
                      <span style={{ color: 'var(--primary-gold)', fontWeight: '700', fontSize: '1.1rem' }}>{item.price}</span>
                    </div>
                    <p style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
