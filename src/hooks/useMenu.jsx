// src/hooks/useMenu.js — fetch menu from API with siteData fallback
import { useState, useEffect } from 'react';
import { api } from '../lib/api.jsx';
import { cafeMenuFull } from '../data/siteData.js';

export function useMenu() {
  const [menu, setMenu] = useState(cafeMenuFull); // instant static data
  const [showPrices, setShowPrices] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.menu.list(), api.menu.settings()])
      .then(([menuData, settings]) => {
        if (menuData?.length) {
          // Normalize DB menu to match siteData shape
          setMenu(menuData.map(cat => ({
            id: cat.slug,
            category: cat.name,
            subtitle: cat.subtitle,
            items: cat.items || [],
            subsections: cat.subsections?.map(sub => ({
              subtitle: sub.subtitle,
              items: sub.items || [],
            })) || (cat.subsections?.length ? cat.subsections : undefined),
            addons: cat.addons || [],
          })));
        }
        setShowPrices(settings.showMenuPrices !== false);
      })
      .catch(() => { /* fall back silently */ })
      .finally(() => setLoading(false));
  }, []);

  return { menu, showPrices, loading };
}
