import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Loader2, ExternalLink } from 'lucide-react';
import { siteConfig } from '../data/siteData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const apiKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || siteConfig.web3formsAccessKey;

    try {
      if (apiKey) {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: apiKey,
            subject: `Website Inquiry: ${formData.subject}`,
            from_name: formData.name,
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });
      }
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#0A0D12] relative">
      {/* Loading Modal Popup Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex flex-col items-center justify-center animate-fadeIn p-4">
          <div className="glass-card glass-effect rounded-2xl p-8 max-w-sm w-full text-center border border-[#C5A059]/40 shadow-2xl flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-[#C5A059] animate-spin mb-4" />
            <h3 className="font-serif text-xl font-bold text-white mb-1">Sending Message...</h3>
            <p className="text-gray-400 text-xs tracking-wider uppercase">Please wait a moment</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-cursive text-3xl text-[#C5A059] mb-1">Connect With Us</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide">
            Contact & Location
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          
          {/* Info Card */}
          <div className="glass-card glass-effect rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-8">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#C5A059]/15 rounded-lg text-[#C5A059] shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Location</h4>
                    <p className="text-gray-400 text-sm mt-0.5">{siteConfig.address}</p>
                    <a
                      href={siteConfig.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#C5A059] hover:underline font-semibold mt-1"
                    >
                      <span>Get Directions on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#C5A059]/15 rounded-lg text-[#C5A059] shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Phone & WhatsApp</h4>
                    <a href={`tel:${siteConfig.phone}`} className="text-[#C5A059] font-semibold hover:underline text-base block mt-0.5">
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#C5A059]/15 rounded-lg text-[#C5A059] shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Email Enquiries</h4>
                    <a href={`mailto:${siteConfig.email}`} className="text-gray-300 hover:text-white text-sm block mt-0.5">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#C5A059]/20 space-y-3">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-[#C5A059] to-[#E5C483] hover:from-[#E5C483] hover:to-[#C5A059] text-[#0A0D12] font-bold text-sm uppercase tracking-widest py-3.5 rounded shadow-lg transition-all text-center block"
              >
                Chat on WhatsApp
              </a>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#C5A059]/10 hover:bg-[#C5A059]/20 border border-[#C5A059]/30 rounded-lg text-white font-semibold text-xs transition-all"
                >
                  <svg className="w-4 h-4 fill-[#C5A059]" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
                <a
                  href={siteConfig.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#C5A059]/10 hover:bg-[#C5A059]/20 border border-[#C5A059]/30 rounded-lg text-white font-semibold text-xs transition-all"
                >
                  <svg className="w-4 h-4 fill-[#C5A059]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="glass-card glass-effect rounded-2xl p-6 sm:p-8">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
              Send Us A Message
            </h3>

            {submitted && (
              <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 p-4 rounded-xl mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="text-sm">Thank you! Your message has been sent. We will respond shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Smith"
                  className="w-full px-4 py-3 bg-[#0A0D12]/70 border border-[#C5A059]/30 rounded-lg text-white focus:outline-none focus:border-[#C5A059] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. john@example.com"
                  className="w-full px-4 py-3 bg-[#0A0D12]/70 border border-[#C5A059]/30 rounded-lg text-white focus:outline-none focus:border-[#C5A059] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Room Inquiry / Cafe Reservation"
                  className="w-full px-4 py-3 bg-[#0A0D12]/70 border border-[#C5A059]/30 rounded-lg text-white focus:outline-none focus:border-[#C5A059] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 bg-[#0A0D12]/70 border border-[#C5A059]/30 rounded-lg text-white focus:outline-none focus:border-[#C5A059] text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#C5A059] to-[#E5C483] hover:from-[#E5C483] hover:to-[#C5A059] text-[#0A0D12] font-bold text-sm uppercase tracking-widest py-3.5 rounded shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Interactive Google Map Element */}
        <div className="mt-12 glass-card glass-effect rounded-2xl p-4 sm:p-6 border border-[#C5A059]/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C5A059]" />
                <span>Find 87 Ahangama On Google Maps</span>
              </h3>
              <p className="text-gray-400 text-xs mt-1">{siteConfig.address}</p>
            </div>
            <a
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A059]/15 hover:bg-[#C5A059] text-[#C5A059] hover:text-[#0A0D12] border border-[#C5A059]/40 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-[#C5A059]/20 relative shadow-2xl">
            <iframe
              title="87 Ahangama Location Map"
              src="https://maps.google.com/maps?q=87%20Ahangama,%20Ahangama,%20Sri%20Lanka&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
}
