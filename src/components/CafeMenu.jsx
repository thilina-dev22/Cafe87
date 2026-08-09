import React, { useState, useRef } from 'react';
import { cafeMenuFull, cafeMenuImage } from '../data/siteData';
import { Coffee, Utensils, Search, Maximize2, X, Download, Clock, Wine, GlassWater, Cookie, Sparkles, Moon, ChevronRight, ChevronLeft, ArrowLeft, ArrowRight } from 'lucide-react';

export default function CafeMenu() {
  const [activeCategory, setActiveCategory] = useState('all-day-brunch');
  const [searchQuery, setSearchQuery] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Touch Swipe State
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const tabsRef = useRef(null);

  const mainCategories = [
    { id: 'all-day-brunch', name: 'All Day Brunch', badge: 'Popular' },
    { id: 'smoothie-bowls', name: 'Smoothie Bowls & Juices' },
    { id: 'evening-menu', name: 'Served From 5 PM', badge: 'Dinner & Sushi 🍣' },
    { id: 'coffee-tea', name: 'Coffee & Tea ☕' },
    { id: 'bar-drinks', name: 'Cocktails & Bar 🍸' },
    { id: 'dessert', name: 'Desserts 🍰' },
    { id: 'all', name: 'View All' }
  ];

  // Helper to get category icons
  const getCategoryIcon = (catId) => {
    switch (catId) {
      case 'all-day-brunch': return <Utensils className="w-5 h-5 text-[#ECC46C]" />;
      case 'smoothie-bowls': return <Sparkles className="w-5 h-5 text-[#ECC46C]" />;
      case 'evening-menu': return <Moon className="w-5 h-5 text-[#ECC46C]" />;
      case 'coffee-tea': return <Coffee className="w-5 h-5 text-[#ECC46C]" />;
      case 'bar-drinks': return <Wine className="w-5 h-5 text-[#ECC46C]" />;
      case 'dessert': return <Cookie className="w-5 h-5 text-[#ECC46C]" />;
      default: return <Utensils className="w-5 h-5 text-[#ECC46C]" />;
    }
  };

  // Helper to navigate next / prev category
  const activeIdx = mainCategories.findIndex((c) => c.id === activeCategory);

  const goToNextCategory = () => {
    if (activeIdx < mainCategories.length - 1) {
      setActiveCategory(mainCategories[activeIdx + 1].id);
    } else {
      setActiveCategory(mainCategories[0].id);
    }
  };

  const goToPrevCategory = () => {
    if (activeIdx > 0) {
      setActiveCategory(mainCategories[activeIdx - 1].id);
    } else {
      setActiveCategory(mainCategories[mainCategories.length - 2].id);
    }
  };

  // Touch Swipe Handlers (Swipe left -> next category, Swipe right -> prev category)
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextCategory();
    } else if (isRightSwipe) {
      goToPrevCategory();
    }
  };

  // Scroll Tabs Left / Right
  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredCategories = cafeMenuFull.filter((cat) => {
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      const hasItem = cat.items && cat.items.some((i) => i.name.toLowerCase().includes(query) || (i.desc && i.desc.toLowerCase().includes(query)));
      const hasSub = cat.subsections && cat.subsections.some((sub) => sub.items.some((i) => i.name.toLowerCase().includes(query) || (i.desc && i.desc.toLowerCase().includes(query))));
      return hasItem || hasSub;
    }

    if (activeCategory === 'all') return true;
    if (activeCategory === 'smoothie-bowls') {
      return cat.id === 'smoothie-bowls' || cat.id === 'juices-smoothies';
    }
    return cat.id === activeCategory;
  });

  return (
    <section id="cafe" className="py-16 sm:py-24 bg-[#0A0F29] border-t border-[#ECC46C]/15 relative select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="font-cursive text-2xl sm:text-3xl text-[#ECC46C] mb-1">Artisanal Coastal Dining</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide">
            87 Café &amp; Restaurant Menu
          </h2>
          <div className="w-16 h-0.5 bg-[#ECC46C] mx-auto mt-4 mb-4"></div>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Fresh Sri Lankan brunches, single-origin coffee, tropical fruit juices, 5 PM dinner &amp; sushi bar, and evening cocktails.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsImageModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#ECC46C]/10 hover:bg-[#ECC46C]/20 border border-[#ECC46C]/35 text-[#ECC46C] rounded-lg text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Original Printed Menu</span>
            </button>
            <a
              href={cafeMenuImage}
              download="87-Cafe-Menu.jpg"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D1638] hover:bg-[#14205E] border border-[#ECC46C]/25 text-gray-300 hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-[#ECC46C]" />
              <span>Download</span>
            </a>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="w-4 h-4 text-[#ECC46C] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish, coffee, sushi or cocktail..."
            className="w-full pl-11 pr-9 py-2.5 bg-[#0D1638] border border-[#ECC46C]/30 rounded-full text-white text-xs sm:text-sm focus:outline-none focus:border-[#ECC46C] shadow-inner placeholder-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Tabs Container with Scroll Arrows & Touch Drag */}
        {!searchQuery && (
          <div className="mb-6 relative max-w-4xl mx-auto flex items-center">
            {/* Left Scroll Button */}
            <button
              onClick={() => scrollTabs('left')}
              aria-label="Scroll tabs left"
              className="hidden sm:flex shrink-0 p-2 bg-[#0D1638] text-[#ECC46C] border border-[#ECC46C]/30 rounded-full hover:bg-[#ECC46C] hover:text-[#0A0F29] transition-all mr-2 shadow-lg"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Scrollable Tabs */}
            <div
              ref={tabsRef}
              className="flex items-center gap-2 overflow-x-auto scroll-smooth no-scrollbar py-2 px-1 w-full touch-pan-x"
            >
              {mainCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-[#D7AD50] to-[#ECC46C] text-[#0A0F29] shadow-xl scale-[1.02]'
                      : 'bg-[#0D1638] text-gray-300 hover:text-white border border-[#ECC46C]/20 hover:border-[#ECC46C]/50'
                  }`}
                >
                  <span>{cat.name}</span>
                  {cat.badge && activeCategory !== cat.id && (
                    <span className="px-1.5 py-0.5 bg-[#ECC46C]/20 text-[#ECC46C] text-[9px] font-extrabold rounded-full">
                      {cat.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Right Scroll Button */}
            <button
              onClick={() => scrollTabs('right')}
              aria-label="Scroll tabs right"
              className="hidden sm:flex shrink-0 p-2 bg-[#0D1638] text-[#ECC46C] border border-[#ECC46C]/30 rounded-full hover:bg-[#ECC46C] hover:text-[#0A0F29] transition-all ml-2 shadow-lg"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Swipe Hint for Mobile */}
        {!searchQuery && activeCategory !== 'all' && (
          <div className="flex items-center justify-between text-[11px] text-[#ECC46C]/90 font-medium px-2 mb-4">
            <button
              onClick={goToPrevCategory}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <span className="text-gray-400 font-normal">
              ↔ Swipe left / right on card
            </span>
            <button
              onClick={goToNextCategory}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Menu Cards Container with Touch Swipe Gesture Handler */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="touch-pan-y"
        >
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16 text-gray-400 glass-effect rounded-2xl max-w-md mx-auto">
              <p className="text-base font-serif mb-2 text-white">No items found matching "{searchQuery}"</p>
              <p className="text-xs text-gray-400">Try searching for "brunch", "tuna", "coffee", or "margarita"</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="glass-effect rounded-2xl p-6 sm:p-8 border border-[#ECC46C]/25 shadow-2xl transition-all"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#ECC46C]/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-[#ECC46C]/10 rounded-lg shrink-0">
                        {getCategoryIcon(cat.id)}
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                          {cat.category}
                        </h3>
                        {cat.subtitle && (
                          <p className="text-xs text-[#ECC46C] font-sans font-medium mt-0.5">
                            {cat.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {cat.id === 'evening-menu' && (
                      <span className="px-3 py-1 bg-[#ECC46C]/15 border border-[#ECC46C]/40 text-[#ECC46C] text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Starts 5 PM</span>
                      </span>
                    )}
                  </div>

                  {/* Direct Items List */}
                  {cat.items && cat.items.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                      {cat.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="py-2 border-b border-dashed border-[#ECC46C]/15 last:border-0 hover:bg-[#ECC46C]/5 p-2 rounded-lg transition-colors"
                        >
                          <div className="flex justify-between items-baseline gap-3 mb-1">
                            <h4 className="font-semibold text-sm sm:text-base text-white">
                              {item.name}
                            </h4>
                            <span className="shrink-0 font-bold text-[#ECC46C] text-sm sm:text-base font-serif">
                              {item.price}
                            </span>
                          </div>
                          {item.desc && (
                            <p className="text-gray-400 text-xs leading-relaxed">
                              {item.desc}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Subsections List */}
                  {cat.subsections && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {cat.subsections.map((sub, sIdx) => (
                        <div key={sIdx} className="bg-[#0A0F29]/70 rounded-xl p-5 border border-[#ECC46C]/20">
                          <h4 className="font-serif text-lg font-bold text-[#ECC46C] mb-3 pb-1.5 border-b border-[#ECC46C]/25 flex items-center justify-between">
                            <span>{sub.subtitle}</span>
                          </h4>
                          <div className="space-y-3">
                            {sub.items.map((item, iIdx) => (
                              <div key={iIdx} className="flex justify-between items-baseline gap-2">
                                <div>
                                  <span className="font-semibold text-xs sm:text-sm text-white block">
                                    {item.name}
                                  </span>
                                  {item.desc && (
                                    <span className="text-[11px] text-gray-400 block mt-0.5">
                                      {item.desc}
                                    </span>
                                  )}
                                </div>
                                <span className="shrink-0 font-bold text-[#ECC46C] text-xs sm:text-sm font-serif">
                                  {item.price}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Addons Footer */}
                  {cat.addons && cat.addons.length > 0 && (
                    <div className="pt-4 border-t border-dashed border-[#ECC46C]/25">
                      <p className="text-[11px] font-bold text-[#ECC46C] uppercase tracking-wider mb-2">
                        Optional Add-ons:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cat.addons.map((add, aIdx) => (
                          <div
                            key={aIdx}
                            className="flex items-center gap-2 text-xs text-gray-200 bg-[#0A0F29]/80 py-1.5 px-3 rounded-lg border border-[#ECC46C]/20"
                          >
                            <span>+ {add.name}</span>
                            <span className="font-bold text-[#ECC46C]">{add.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bottom Navigation Buttons for Mobile / Touch */}
                  {!searchQuery && activeCategory !== 'all' && (
                    <div className="mt-8 pt-4 border-t border-[#ECC46C]/20 flex items-center justify-between">
                      <button
                        onClick={goToPrevCategory}
                        className="px-4 py-2 bg-[#0A0F29] hover:bg-[#ECC46C]/20 border border-[#ECC46C]/30 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 text-[#ECC46C]" />
                        <span>Previous Section</span>
                      </button>
                      <button
                        onClick={goToNextCategory}
                        className="px-4 py-2 bg-[#ECC46C]/10 hover:bg-[#ECC46C] hover:text-[#0A0F29] border border-[#ECC46C]/40 text-[#ECC46C] rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
                      >
                        <span>Next Section</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

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

      {/* Full Paper Menu Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md animate-scaleUp"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[92vh] bg-[#0D1638] border border-[#ECC46C]/40 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#ECC46C]/30 bg-[#0A0F29]">
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-white">87 Café &amp; Restaurant Official Menu</h3>
                <p className="text-[11px] text-[#ECC46C]">Original Printed Menu Graphic</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={cafeMenuImage}
                  download="87-Cafe-Menu.jpg"
                  className="p-2 bg-[#ECC46C]/10 hover:bg-[#ECC46C] hover:text-[#0A0F29] text-[#ECC46C] rounded-lg transition-colors"
                  title="Download Image"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsImageModalOpen(false)}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  aria-label="Close menu modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto p-4 flex justify-center items-center bg-[#070B1E] flex-1">
              <img
                src={cafeMenuImage}
                alt="87 Cafe & Restaurant official paper menu"
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl border border-[#ECC46C]/20"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
