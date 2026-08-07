import React from 'react';
import { siteConfig } from '../data/siteData';
import { MapPin, Phone, Mail, Globe, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#05070A] border-t border-[#C5A059]/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={siteConfig.logo} alt="87 Ahangama" className="h-10 w-auto" />
              <span className="font-serif text-xl font-bold text-white tracking-wider">
                87 AHANGAMA
              </span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
              A luxury boutique coastal residence & artisanal cafe in Ahangama, Sri Lanka. Offering sun-filled rooms, ocean views, and warm island hospitality.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2.5 bg-[#C5A059]/10 text-[#C5A059] rounded-full hover:bg-[#C5A059] hover:text-[#0A0D12] transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-[#C5A059]/10 text-[#C5A059] rounded-full hover:bg-[#C5A059] hover:text-[#0A0D12] transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4 pb-1 border-b-2 border-[#C5A059] inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {['Home', 'Rooms', 'Cafe & Dining', 'Gallery', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="hover:text-[#C5A059] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4 pb-1 border-b-2 border-[#C5A059] inline-block">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C5A059] shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="text-[#C5A059] hover:underline">{siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span>{siteConfig.email}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} 87 Ahangama. All rights reserved. Powered by React & Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}
