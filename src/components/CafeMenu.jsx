import React, { useState } from 'react';
import { cafeMenuFull, cafeMenuImage } from '../data/siteData';
import { Coffee, Utensils, Search, Maximize2, X, Download, Clock, Wine, GlassWater, Cookie, Sparkles, Moon } from 'lucide-react';

export default function CafeMenu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories' },
    ...cafeMenuFull.map((c) => ({ id: c.id, name: c.category }))
  ];

  const filteredMenu = cafeMenuFull.map((cat) => {
    // If category filter applied and doesn't match
    if (activeCategory !== 'all' && cat.id !== activeCategory) {
      return null;
    }

    // Filter items inside category
    const query = searchQuery.toLowerCase().trim();
    if (!query) return cat;

    let matchItems = [];
    if (cat.items) {
      matchItems = cat.items.filter(
        (item) => item.name.toLowerCase().includes(query) || (item.desc && item.desc.toLowerCase().includes(query))
      );
    }

    let matchSubsections = [];
    if (cat.subsections) {
      matchSubsections = cat.subsections
        .map((sub) => ({
          ...sub,
          items: sub.items.filter(
            (item) => item.name.toLowerCase().includes(query) || (item.desc && item.desc.toLowerCase().includes(query))
          )
        }))
        .filter((sub) => sub.items.length > 0);
    }

    if (matchItems.length === 0 && matchSubsections.length === 0) {
      return null;
    }

    return {
      ...cat,
      items: matchItems.length > 0 ? matchItems : undefined,
      subsections: matchSubsections.length > 0 ? matchSubsections : undefined
    };
  }).filter(Boolean);

  return (
    <section id="cafe" className="py-20 bg-[#0A0F29] border-t border-[#ECC46C]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-cursive text-3xl text-[#ECC46C] mb-1">Tropical Brunch &amp; Dining</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide">
            87 Café &amp; Restaurant Menu
          </h2>
          <div className="w-16 h-0.5 bg-[#ECC46C] mx-auto mt-4 mb-4"></div>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Freshly prepared tropical brunch, artisanal single-origin Ceylon coffee, cold juices, sushi bar, and evening cocktails.
          </p>

          {/* View Original Paper Menu Button */}
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => setIsImageModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ECC46C]/10 hover:bg-[#ECC46C]/20 border border-[#ECC46C]/40 text-[#ECC46C] rounded-lg text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-lg"
            >
              <Maximize2 className="w-4 h-4" />
              <span>View Full Menu Image</span>
            </button>
            <a
              href={cafeMenuImage}
              download="87-Cafe-Menu.jpg"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0D1638] hover:bg-[#14205E] border border-[#ECC46C]/30 text-white rounded-lg text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all"
            >
              <Download className="w-4 h-4 text-[#ECC46C]" />
              <span>Download PDF / JPG</span>
            </a>
          </div>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="mb-12 space-y-6">
          {/* Search Input */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-5 h-5 text-[#ECC46C] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, drinks or coffee..."
              className="w-full pl-12 pr-4 py-3 bg-[#0D1638] border border-[#ECC46C]/30 rounded-full text-white text-sm focus:outline-none focus:border-[#ECC46C] shadow-inner placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 no-scrollbar px-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#D7AD50] to-[#ECC46C] text-[#0A0F29] shadow-lg scale-105'
                    : 'bg-[#0D1638] text-gray-300 hover:text-white hover:border-[#ECC46C]/40 border border-[#ECC46C]/20'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredMenu.length === 0 ? (
          <div className="text-center py-16 text-gray-400 glass-effect rounded-2xl max-w-md mx-auto">
            <p className="text-lg font-serif mb-2">No menu items found</p>
            <p className="text-xs text-gray-500">Try searching for something else like "tuna", "coffee", or "brunch"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredMenu.map((cat) => (
              <div key={cat.id} className="glass-effect rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  {/* Category Header */}
                  <div className="mb-6 pb-4 border-b border-[#ECC46C]/30 flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-white tracking-wide flex items-center gap-2">
                        <span>{cat.category}</span>
                      </h3>
                      {cat.subtitle && (
                        <p className="text-xs text-[#ECC46C] font-sans tracking-wide mt-1 font-medium">
                          {cat.subtitle}
                        </p>
                      )}
                    </div>
                    {cat.id === 'evening-menu' && (
                      <span className="px-3 py-1 bg-[#ECC46C]/15 border border-[#ECC46C]/40 text-[#ECC46C] text-[11px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>From 5 PM</span>
                      </span>
                    )}
                  </div>

                  {/* Standard Items List */}
                  {cat.items && cat.items.length > 0 && (
                    <div className="space-y-4 mb-6">
                      {cat.items.map((item, idx) => (
                        <div key={idx} className="group">
                          <div className="flex justify-between items-baseline gap-2 mb-1">
                            <h4 className="font-semibold text-base sm:text-lg text-white group-hover:text-[#ECC46C] transition-colors">
                              {item.name}
                            </h4>
                            <span className="shrink-0 font-bold text-[#ECC46C] text-sm sm:text-base font-serif">
                              {item.price}
                            </span>
                          </div>
                          {item.desc && (
                            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                              {item.desc}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Subsections List (for 5PM menu, Coffee/Tea, Juices, Bar) */}
                  {cat.subsections && (
                    <div className="space-y-6 mb-6">
                      {cat.subsections.map((sub, sIdx) => (
                        <div key={sIdx} className="bg-[#0A0F29]/60 rounded-xl p-4 border border-[#ECC46C]/15">
                          <h4 className="font-serif text-lg font-bold text-[#ECC46C] mb-3 pb-1 border-b border-[#ECC46C]/20">
                            {sub.subtitle}
                          </h4>
                          <div className="space-y-3">
                            {sub.items.map((item, iIdx) => (
                              <div key={iIdx} className="flex justify-between items-baseline gap-2">
                                <div>
                                  <span className="font-semibold text-sm sm:text-base text-white block">
                                    {item.name}
                                  </span>
                                  {item.desc && (
                                    <span className="text-xs text-gray-400 block mt-0.5">
                                      {item.desc}
                                    </span>
                                  )}
                                </div>
                                <span className="shrink-0 font-bold text-[#ECC46C] text-sm font-serif">
                                  {item.price}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add-ons */}
                  {cat.addons && cat.addons.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-dashed border-[#ECC46C]/20">
                      <p className="text-xs font-bold text-[#ECC46C] uppercase tracking-wider mb-2">
                        Optional Add-ons:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {cat.addons.map((add, aIdx) => (
                          <div key={aIdx} className="flex justify-between text-xs text-gray-300 bg-[#0A0F29]/40 py-1.5 px-3 rounded border border-[#ECC46C]/10">
                            <span>+ {add.name}</span>
                            <span className="font-semibold text-[#ECC46C]">{add.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Service Charge Notice */}
        <div className="mt-12 text-center text-xs text-gray-400 border-t border-[#ECC46C]/20 pt-6">
          <p className="tracking-widest uppercase font-semibold text-gray-300 mb-1">
            @87ahangama • Ahangama, Sri Lanka
          </p>
          <p className="text-[#ECC46C]/90 italic">
            * All prices are in Sri Lankan Rupees (LKR) and subject to a 10% service charge.
          </p>
        </div>

      </div>

      {/* Full Paper Menu Image Modal Overlay */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-scaleUp">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-[#0D1638] border border-[#ECC46C]/40 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#ECC46C]/30 bg-[#0A0F29]">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">87 Café &amp; Restaurant Official Menu</h3>
                <p className="text-xs text-[#ECC46C]">Original Printed Menu Graphic</p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={cafeMenuImage}
                  download="87-Cafe-Menu.jpg"
                  className="p-2 bg-[#ECC46C]/10 hover:bg-[#ECC46C] hover:text-[#0A0F29] text-[#ECC46C] rounded-lg transition-colors"
                  title="Download Image"
                >
                  <Download className="w-5 h-5" />
                </a>
                <button
                  onClick={() => setIsImageModalOpen(false)}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image View */}
            <div className="overflow-auto p-4 flex justify-center bg-[#070B1E]">
              <img
                src={cafeMenuImage}
                alt="87 Cafe & Restaurant official paper menu"
                className="max-w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
