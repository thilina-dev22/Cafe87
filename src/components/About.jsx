import React from 'react';
import { Compass, Heart, Star } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-[#141923]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Text Content */}
          <div>
            <p className="font-cursive text-2xl sm:text-3xl text-[#C5A059] mb-1">Discover</p>
            <h2 className="font-serif font-bold text-white tracking-wide leading-tight mb-5
                           text-[clamp(1.7rem,5vw,3rem)]">
              The Essence of 87 Ahangama
            </h2>
            <div className="w-14 h-0.5 bg-[#C5A059] mb-5"></div>

            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-4">
              Nestled along Sri Lanka's famous southern coastline,{' '}
              <strong className="text-white">87 Ahangama</strong> is a boutique residence and
              artisanal cafe created for travelers, surfers, and dreamers seeking serenity.
            </p>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
              From sun-drenched private rooms with plush bedding and high-speed fiber internet to
              locally sourced tropical coffee and gourmet hoppers, we combine warm island
              hospitality with modern luxury amenities.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2.5 sm:p-3 bg-[#C5A059]/10 rounded-lg text-[#C5A059] shrink-0">
                  <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">Prime Location</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Minutes from surf breaks and coastal cafes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 sm:p-3 bg-[#C5A059]/10 rounded-lg text-[#C5A059] shrink-0">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">Warm Hospitality</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Personalized service &amp; local recommendations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Card — rating badge sits INSIDE on mobile to avoid clipping */}
          <div className="relative mt-8 lg:mt-0">
            <div className="glass-effect rounded-2xl p-2.5 sm:p-3 overflow-hidden shadow-2xl">
              <img
                src="/assets/images/pexels-freestockpro-11629009-scaled.jpg"
                alt="87 Ahangama exterior"
                loading="lazy"
                className="w-full h-64 sm:h-80 lg:h-[420px] object-cover rounded-xl"
              />
            </div>

            {/* Rating badge — pinned bottom-left of the outer div, not overflowing on mobile */}
            <div className="absolute bottom-4 left-4 sm:-bottom-6 sm:-left-5
                            bg-[#0F194C]/95 border border-[#C5A059] backdrop-blur-md
                            px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2">
              <Star className="w-5 h-5 text-[#C5A059] fill-[#C5A059] shrink-0" />
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C5A059] leading-none">4.9</span>
                <p className="text-[9px] sm:text-[10px] text-gray-200 uppercase tracking-widest mt-0.5">Guest Rating</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
