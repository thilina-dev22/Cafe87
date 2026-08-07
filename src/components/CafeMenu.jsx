import React from 'react';
import { cafeMenuItems } from '../data/siteData';
import { Coffee, Utensils } from 'lucide-react';

export default function CafeMenu() {
  return (
    <section id="cafe" className="py-20 bg-[#141923]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-cursive text-3xl text-[#C5A059] mb-1">Artisanal Dining</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide">
            Cafe 87 Menu
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-4"></div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cafeMenuItems.map((cat, idx) => (
            <div key={idx} className="glass-effect rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#C5A059]/20">
                {idx === 0 ? <Coffee className="w-7 h-7 text-[#C5A059]" /> : <Utensils className="w-7 h-7 text-[#C5A059]" />}
                <h3 className="font-serif text-2xl font-bold text-white">{cat.category}</h3>
              </div>

              <div className="space-y-6">
                {cat.items.map((item, i) => (
                  <div key={i} className="border-b border-dashed border-[#C5A059]/20 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-semibold text-lg text-white">{item.name}</h4>
                      <span className="font-bold text-[#C5A059] text-base">{item.price}</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">{item.desc}</p>
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
