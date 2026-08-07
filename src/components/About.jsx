import React from 'react';
import { Compass, Heart } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#141923]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <p className="font-cursive text-3xl text-[#C5A059] mb-1">Discover</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide leading-tight mb-6">
              The Essence of 87 Ahangama
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A059] mb-6"></div>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
              Nestled along Sri Lanka's famous southern coastline, <strong className="text-white">87 Ahangama</strong> is a boutique residence and artisanal cafe created for travelers, surfers, and dreamers seeking serenity.
            </p>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
              From sun-drenched private rooms with plush bedding and high-speed fiber internet to locally sourced tropical coffee and gourmet hoppers, we combine warm island hospitality with modern luxury amenities.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-[#C5A059]/10 rounded-lg text-[#C5A059] shrink-0">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Prime Location</h4>
                  <p className="text-gray-400 text-xs mt-1">Minutes from surf breaks and coastal cafes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 bg-[#C5A059]/10 rounded-lg text-[#C5A059] shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Warm Hospitality</h4>
                  <p className="text-gray-400 text-xs mt-1">Personalized service & local recommendations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Card */}
          <div className="relative">
            <div className="glass-effect rounded-2xl p-3 overflow-hidden shadow-2xl">
              <img
                src="/assets/images/pexels-freestockpro-11629009-scaled.jpg"
                alt="87 Ahangama Exterior"
                className="w-full h-80 sm:h-[450px] object-cover rounded-xl"
              />
            </div>

            <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#0F194C]/95 border border-[#C5A059] backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-2xl">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#C5A059]">
                4.9★
              </span>
              <p className="text-[10px] sm:text-xs text-gray-200 uppercase tracking-widest mt-1">
                Guest Rating
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
