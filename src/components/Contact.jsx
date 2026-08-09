import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
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
    <section id="contact" className="py-20 bg-[#0A0D12]">
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

            <div className="mt-8 pt-6 border-t border-[#C5A059]/20">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-[#C5A059] to-[#E5C483] hover:from-[#E5C483] hover:to-[#C5A059] text-[#0A0D12] font-bold text-sm uppercase tracking-widest py-3.5 rounded shadow-lg transition-all text-center block"
              >
                Chat on WhatsApp
              </a>
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
                className="w-full bg-gradient-to-r from-[#C5A059] to-[#E5C483] hover:from-[#E5C483] hover:to-[#C5A059] text-[#0A0D12] font-bold text-sm uppercase tracking-widest py-3.5 rounded shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
