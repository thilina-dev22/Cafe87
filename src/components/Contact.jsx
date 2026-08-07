import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" style={{ padding: '6rem 0', backgroundColor: '#0F1319' }}>
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">Connect With Us</p>
          <h2 className="section-title">Contact & Location</h2>
          <div className="section-divider"></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          {/* Contact Details */}
          <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h3 style={{ fontSize: '1.75rem', color: '#FFFFFF' }}>Contact Information</h3>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ background: 'rgba(197, 160, 89, 0.15)', padding: '0.75rem', borderRadius: '8px' }}>
                <MapPin color="var(--primary-gold)" size={24} />
              </div>
              <div>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Location</h4>
                <p style={{ color: '#9CA3AF', fontSize: '0.95rem' }}>{siteConfig.address}</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ background: 'rgba(197, 160, 89, 0.15)', padding: '0.75rem', borderRadius: '8px' }}>
                <Phone color="var(--primary-gold)" size={24} />
              </div>
              <div>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Phone & WhatsApp</h4>
                <a href={`tel:${siteConfig.phone}`} style={{ color: 'var(--primary-gold)', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 600 }}>
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ background: 'rgba(197, 160, 89, 0.15)', padding: '0.75rem', borderRadius: '8px' }}>
                <Mail color="var(--primary-gold)" size={24} />
              </div>
              <div>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Email Enquiries</h4>
                <a href={`mailto:${siteConfig.email}`} style={{ color: '#E5E7EB', textDecoration: 'none', fontSize: '0.95rem' }}>
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(197, 160, 89, 0.2)' }}>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.75rem', color: '#FFFFFF', marginBottom: '1.5rem' }}>Send Us A Message</h3>

            {submitted && (
              <div
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10B981',
                  color: '#10B981',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <CheckCircle2 size={20} />
                <span>Thank you! Your message has been sent successfully. We will get back to you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: '#D1D5DB', marginBottom: '0.35rem' }}>Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Smith"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    backgroundColor: 'rgba(10, 13, 18, 0.6)',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                    borderRadius: '6px',
                    color: '#FFFFFF',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: '#D1D5DB', marginBottom: '0.35rem' }}>Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. john@example.com"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    backgroundColor: 'rgba(10, 13, 18, 0.6)',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                    borderRadius: '6px',
                    color: '#FFFFFF',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: '#D1D5DB', marginBottom: '0.35rem' }}>Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Room Inquiry / Cafe Reservation"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    backgroundColor: 'rgba(10, 13, 18, 0.6)',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                    borderRadius: '6px',
                    color: '#FFFFFF',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', color: '#D1D5DB', marginBottom: '0.35rem' }}>Your Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your trip or special requests..."
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    backgroundColor: 'rgba(10, 13, 18, 0.6)',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                    borderRadius: '6px',
                    color: '#FFFFFF',
                    outline: 'none'
                  }}
                ></textarea>
              </div>

              <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                <Send size={18} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
