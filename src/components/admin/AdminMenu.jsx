// src/components/admin/AdminMenu.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api.jsx';
import {
  Plus, Pencil, Trash2, Save, X, ChevronDown, ChevronUp,
  ToggleLeft, ToggleRight, Sparkles, Check, Tag, FolderPlus
} from 'lucide-react';

const CATEGORY_BADGE_PRESETS = [
  '',
  'Popular',
  'Dinner & Sushi 🍣',
  'Coffee & Tea ☕',
  'Signature ⭐',
  'Breakfast & Brunch 🥞',
  'Cocktails & Drinks 🍸',
  'Vegan 🌱',
  "Chef's Choice 👨‍🍳",
  'New ✨',
];

const DIETARY_TAG_PRESETS = [
  '🌱 Vegan',
  '🌿 Vegetarian',
  '🌾 Gluten-Free',
  '🌶️ Spicy',
  '⭐ Signature',
  '🐟 Fresh Catch',
  '🥛 Dairy-Free',
];

const COMMON_ADDON_PRESETS = [
  { name: 'Extra Mozzarella Cheese', price: 'LKR 450' },
  { name: 'Fresh Hass Avocado', price: 'LKR 550' },
  { name: 'Crispy Bacon', price: 'LKR 650' },
  { name: 'Barista Oat Milk', price: 'LKR 350' },
  { name: 'Almond Milk', price: 'LKR 350' },
  { name: 'Extra Espresso Shot', price: 'LKR 300' },
  { name: 'Free-Range Fried Egg', price: 'LKR 250' },
  { name: 'Smoked Salmon Slice', price: 'LKR 950' },
  { name: 'Extra Pickled Ginger & Wasabi', price: 'LKR 300' },
];

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function AdminMenu() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPrices, setShowPrices] = useState(true);
  const [togglingPrices, setTogglingPrices] = useState(false);
  const [expandedCat, setExpandedCat] = useState(null);

  // Editing state
  const [editingCat, setEditingCat] = useState(null); // null | category
  const [isCatSlugManual, setIsCatSlugManual] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null | item
  const [editingAddon, setEditingAddon] = useState(null); // null | addon
  const [savingCat, setSavingCat] = useState(false);
  const [savingItem, setSavingItem] = useState(false);

  const load = () => {
    setLoading(true);
    Promise.all([api.adminMenu.list(), api.menu.settings()])
      .then(([cats, settings]) => {
        setCategories(cats);
        setShowPrices(settings.showMenuPrices !== false);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  // ── Price toggle ────────────────────────────────────────────────────────────
  const togglePrices = async () => {
    setTogglingPrices(true);
    try {
      await api.adminMenu.updateSettings({ showMenuPrices: !showPrices });
      setShowPrices(!showPrices);
    } catch (err) {
      setError(err.message);
    } finally {
      setTogglingPrices(false);
    }
  };

  // ── Category CRUD ────────────────────────────────────────────────────────────
  const startNewCat = () => {
    setIsCatSlugManual(false);
    setEditingCat({ slug: '', name: '', subtitle: '', badge: '', sortOrder: categories.length, isActive: true });
  };

  const startEditCat = (cat) => {
    setIsCatSlugManual(true);
    setEditingCat({ ...cat });
  };

  const handleCatNameChange = (name) => {
    setEditingCat(prev => {
      const updated = { ...prev, name };
      if (!isCatSlugManual && !prev.id) {
        updated.slug = slugify(name);
      }
      return updated;
    });
  };

  const saveCat = async () => {
    setSavingCat(true);
    setError('');
    try {
      let saved;
      if (editingCat.id) {
        saved = await api.adminMenu.updateCategory(editingCat.id, editingCat);
        setCategories(categories.map(c => c.id === saved.id ? { ...c, ...saved } : c));
      } else {
        saved = await api.adminMenu.createCategory(editingCat);
        setCategories([...categories, { ...saved, items: [], subsections: [], addons: [] }]);
      }
      setEditingCat(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingCat(false);
    }
  };

  const deleteCat = async (id) => {
    if (!confirm('Delete this category and ALL its items? Cannot be undone.')) return;
    try {
      await api.adminMenu.deleteCategory(id);
      setCategories(categories.filter(c => c.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // ── Item CRUD ────────────────────────────────────────────────────────────────
  const saveItem = async () => {
    setSavingItem(true);
    setError('');
    try {
      const { _categoryId, ...rest } = editingItem;
      const catId = editingItem.categoryId || _categoryId;
      let saved;
      if (editingItem.id) {
        saved = await api.adminMenu.updateItem(editingItem.id, rest);
        setCategories(categories.map(c => {
          if (c.id !== catId) return c;
          return {
            ...c,
            items: c.items.map(it => it.id === saved.id ? saved : it),
            subsections: c.subsections?.map(sub => ({
              ...sub,
              items: sub.items.map(it => it.id === saved.id ? saved : it),
            })),
          };
        }));
      } else {
        saved = await api.adminMenu.createItem(catId, rest);
        setCategories(categories.map(c => {
          if (c.id !== catId) return c;
          return { ...c, items: [...(c.items || []), saved] };
        }));
      }
      setEditingItem(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingItem(false);
    }
  };

  const deleteItem = async (itemId, catId) => {
    if (!confirm('Delete this menu item?')) return;
    try {
      await api.adminMenu.deleteItem(itemId);
      setCategories(categories.map(c => {
        if (c.id !== catId) return c;
        return {
          ...c,
          items: c.items.filter(it => it.id !== itemId),
          subsections: c.subsections?.map(sub => ({
            ...sub,
            items: sub.items.filter(it => it.id !== itemId),
          })),
        };
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteAddon = async (addonId, catId) => {
    if (!confirm('Delete this add-on?')) return;
    try {
      await api.adminMenu.deleteAddon(addonId);
      setCategories(categories.map(c =>
        c.id !== catId ? c : { ...c, addons: c.addons.filter(a => a.id !== addonId) }
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  // Append a dietary tag to description
  const addDietaryTag = (tag) => {
    if (!editingItem) return;
    const current = editingItem.desc || '';
    if (current.includes(tag)) return;
    const updated = current ? `${current} • ${tag}` : tag;
    setEditingItem(prev => ({ ...prev, desc: updated }));
  };

  if (loading) return <p className="text-gray-400 text-sm">Loading menu…</p>;

  return (
    <div>
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="font-serif text-xl font-bold text-white">Café & Restaurant Menu</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage food, sushi, beverages, add-ons, and public price visibility</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Show Prices toggle */}
          <button
            onClick={togglePrices}
            disabled={togglingPrices}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
              showPrices
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-amber-500/15 border-amber-500/40 text-amber-400 hover:bg-amber-500/20'
            }`}
            title="Toggle price visibility on the public menu"
          >
            {showPrices ? <ToggleRight className="w-4 h-4 text-emerald-400" /> : <ToggleLeft className="w-4 h-4 text-amber-400" />}
            {togglingPrices ? 'Updating…' : showPrices ? 'Prices Visible' : 'Prices Hidden'}
          </button>

          <button
            onClick={startNewCat}
            className="flex items-center gap-2 px-4 py-2 bg-[#ECC46C] text-[#0A0F29] rounded-lg text-xs font-bold uppercase tracking-wider transition-all hover:bg-[#ffe194] cursor-pointer"
          >
            <Plus className="w-4 h-4" /> New Category
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-xs mb-4 bg-red-400/10 px-3 py-2 rounded-lg border border-red-400/20">{error}</p>
      )}

      {/* Price visibility banner */}
      <div className={`mb-5 px-4 py-3 rounded-xl text-xs font-semibold border flex items-center justify-between ${
        showPrices
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
      }`}>
        <div className="flex items-center gap-2">
          <span>{showPrices ? '✅' : '🔒'}</span>
          <span>
            {showPrices
              ? 'Prices are currently VISIBLE on the public website menu.'
              : 'Prices are currently HIDDEN on the public website menu (only item names & descriptions are shown).'}
          </span>
        </div>
        <button
          onClick={togglePrices}
          className="underline hover:text-white ml-2 text-[11px] cursor-pointer"
        >
          {showPrices ? 'Hide all prices now' : 'Show prices now'}
        </button>
      </div>

      {/* Category Edit Form */}
      {editingCat !== null && (
        <div className="glass-effect rounded-2xl p-6 border border-[#ECC46C]/30 mb-6 bg-[#070B1E]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <FolderPlus className="w-4 h-4 text-[#ECC46C]" />
              {editingCat.id ? `Edit Category: ${editingCat.name}` : 'New Menu Category'}
            </h3>
            <button onClick={() => setEditingCat(null)} className="text-gray-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                Category Name *
              </label>
              <input
                value={editingCat.name || ''}
                onChange={e => handleCatNameChange(e.target.value)}
                placeholder="e.g. Dinner & Sushi Bar"
                className="w-full px-3 py-2 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C]"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                URL Slug *
              </label>
              <input
                value={editingCat.slug || ''}
                onChange={e => {
                  setIsCatSlugManual(true);
                  setEditingCat(p => ({ ...p, slug: e.target.value }));
                }}
                placeholder="e.g. dinner-sushi"
                className="w-full px-3 py-2 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C]"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                Subtitle
              </label>
              <input
                value={editingCat.subtitle || ''}
                onChange={e => setEditingCat(p => ({ ...p, subtitle: e.target.value }))}
                placeholder="e.g. Authentic Japanese Flavours & Handcrafted Rolls"
                className="w-full px-3 py-2 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C]"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                Badge / Tag (Select or Custom)
              </label>
              <div className="flex gap-2">
                <select
                  value={CATEGORY_BADGE_PRESETS.includes(editingCat.badge) ? (editingCat.badge || '') : '__custom__'}
                  onChange={e => {
                    const val = e.target.value;
                    if (val !== '__custom__') {
                      setEditingCat(p => ({ ...p, badge: val }));
                    }
                  }}
                  className="w-1/2 px-3 py-2 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-xs focus:outline-none focus:border-[#ECC46C]"
                >
                  <option value="">No Badge</option>
                  {CATEGORY_BADGE_PRESETS.filter(Boolean).map(preset => (
                    <option key={preset} value={preset}>{preset}</option>
                  ))}
                  <option value="__custom__">Custom text…</option>
                </select>
                <input
                  value={editingCat.badge || ''}
                  onChange={e => setEditingCat(p => ({ ...p, badge: e.target.value }))}
                  placeholder="e.g. Popular"
                  className="w-1/2 px-3 py-2 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-xs focus:outline-none focus:border-[#ECC46C]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={saveCat}
              disabled={savingCat || !editingCat.name || !editingCat.slug}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#ECC46C] text-[#0A0F29] rounded-lg font-bold text-xs uppercase tracking-wider disabled:opacity-60 cursor-pointer"
            >
              <Save className="w-4 h-4" /> {savingCat ? 'Saving…' : 'Save Category'}
            </button>
            <button onClick={() => setEditingCat(null)} className="text-gray-400 hover:text-white text-xs cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Item Edit Form */}
      {editingItem !== null && (
        <div className="glass-effect rounded-2xl p-6 border border-[#ECC46C]/30 mb-6 bg-[#070B1E]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ECC46C]" />
              {editingItem.id ? `Edit Item: ${editingItem.name}` : 'New Menu Item'}
            </h3>
            <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                Item Name *
              </label>
              <input
                value={editingItem.name || ''}
                onChange={e => setEditingItem(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Salmon Aburi Nigiri (2 Pcs)"
                className="w-full px-3 py-2 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C]"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                Price
              </label>
              <div className="flex items-center gap-2">
                <input
                  value={editingItem.price || ''}
                  onChange={e => setEditingItem(p => ({ ...p, price: e.target.value }))}
                  placeholder="e.g. LKR 2,450"
                  className="flex-1 px-3 py-2 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C]"
                />
                {!editingItem.price?.startsWith('LKR ') && (
                  <button
                    type="button"
                    onClick={() => setEditingItem(p => ({ ...p, price: `LKR ${p.price || ''}` }))}
                    className="px-2 py-2 bg-[#ECC46C]/10 border border-[#ECC46C]/30 text-[#ECC46C] text-xs font-semibold rounded-lg hover:bg-[#ECC46C]/20 whitespace-nowrap cursor-pointer"
                    title="Prepend LKR currency prefix"
                  >
                    + LKR
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs text-gray-400 uppercase tracking-wider font-semibold">
                Description / Ingredients
              </label>
              <span className="text-[10px] text-gray-500">Click a dietary badge below to add it</span>
            </div>
            <textarea
              value={editingItem.desc || ''}
              onChange={e => setEditingItem(p => ({ ...p, desc: e.target.value }))}
              rows={2}
              placeholder="e.g. Torched fresh salmon, sweet teriyaki glaze, Japanese mayo, spring onion"
              className="w-full px-3 py-2 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C] resize-none mb-2"
            />
            {/* Dietary quick chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              {DIETARY_TAG_PRESETS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addDietaryTag(tag)}
                  className="px-2.5 py-1 bg-[#0A0F29] border border-gray-700 hover:border-[#ECC46C] text-gray-300 hover:text-[#ECC46C] text-[11px] rounded-md transition-all cursor-pointer"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={saveItem}
              disabled={savingItem || !editingItem.name}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#ECC46C] text-[#0A0F29] rounded-lg font-bold text-xs uppercase tracking-wider disabled:opacity-60 cursor-pointer"
            >
              <Save className="w-4 h-4" /> {savingItem ? 'Saving…' : 'Save Item'}
            </button>
            <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-white text-xs cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add-on Edit Form */}
      {editingAddon !== null && (
        <div className="glass-effect rounded-2xl p-6 border border-[#ECC46C]/30 mb-6 bg-[#070B1E]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#ECC46C]" />
              {editingAddon.id ? `Edit Add-on: ${editingAddon.name}` : 'New Add-on'}
            </h3>
            <button onClick={() => setEditingAddon(null)} className="text-gray-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Preset Addons picker */}
          {!editingAddon.id && (
            <div className="mb-4 p-3 bg-[#0D1638] rounded-xl border border-dashed border-[#ECC46C]/30">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-[#ECC46C] mb-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Quick Add-on Presets:
              </p>
              <div className="flex flex-wrap gap-2">
                {COMMON_ADDON_PRESETS.map(preset => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setEditingAddon(prev => ({ ...prev, name: preset.name, price: preset.price }))}
                    className="px-2.5 py-1 bg-[#070B1E] border border-gray-700 hover:border-[#ECC46C] text-gray-300 hover:text-white text-xs rounded-lg transition-all cursor-pointer"
                  >
                    {preset.name} <span className="text-[#ECC46C] font-semibold">({preset.price})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                Add-on Name *
              </label>
              <input
                value={editingAddon.name || ''}
                onChange={e => setEditingAddon(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Extra Fresh Avocado"
                className="w-full px-3 py-2 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C]"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                Price *
              </label>
              <input
                value={editingAddon.price || ''}
                onChange={e => setEditingAddon(p => ({ ...p, price: e.target.value }))}
                placeholder="e.g. LKR 450"
                className="w-full px-3 py-2 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                try {
                  const catId = editingAddon.categoryId;
                  if (editingAddon.id) {
                    const saved = await api.adminMenu.updateAddon(editingAddon.id, editingAddon);
                    setCategories(categories.map(c => c.id !== catId ? c : { ...c, addons: c.addons.map(a => a.id === saved.id ? saved : a) }));
                  } else {
                    const saved = await api.adminMenu.createAddon(catId, editingAddon);
                    setCategories(categories.map(c => c.id !== catId ? c : { ...c, addons: [...(c.addons || []), saved] }));
                  }
                  setEditingAddon(null);
                } catch (err) { setError(err.message); }
              }}
              disabled={!editingAddon.name || !editingAddon.price}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#ECC46C] text-[#0A0F29] rounded-lg font-bold text-xs uppercase tracking-wider disabled:opacity-60 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Add-on
            </button>
            <button onClick={() => setEditingAddon(null)} className="text-gray-400 hover:text-white text-xs cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Categories list */}
      <div className="space-y-4">
        {categories.map(cat => (
          <div key={cat.id} className="glass-effect rounded-2xl border border-[#ECC46C]/20 overflow-hidden transition-all hover:border-[#ECC46C]/40">
            <div
              className="flex items-center gap-3 p-4 cursor-pointer hover:bg-[#ECC46C]/5 transition-colors"
              onClick={() => setExpandedCat(expandedCat === cat.id ? null : cat.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-serif font-bold text-white text-base truncate">{cat.name}</h3>
                  {cat.badge && (
                    <span className="px-2.5 py-0.5 bg-[#ECC46C]/20 text-[#ECC46C] text-[10px] font-bold rounded-full border border-[#ECC46C]/30">
                      {cat.badge}
                    </span>
                  )}
                  {!cat.isActive && (
                    <span className="px-2 py-0.5 bg-gray-700 text-gray-400 text-[10px] rounded-full">Hidden</span>
                  )}
                </div>
                {cat.subtitle && <p className="text-xs text-gray-400 mt-0.5 truncate">{cat.subtitle}</p>}
                <p className="text-[11px] text-gray-400 mt-1">
                  <span className="text-[#ECC46C] font-semibold">
                    {(cat.items?.length || 0) + (cat.subsections?.reduce((s, sub) => s + (sub.items?.length || 0), 0) || 0)} items
                  </span>
                  {cat.addons?.length > 0 && <span className="text-gray-400"> • {cat.addons.length} add-ons</span>}
                  <span className="text-gray-500 text-[10px] ml-2">(/#{cat.slug})</span>
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={e => { e.stopPropagation(); startEditCat(cat); }}
                  className="p-2 text-gray-400 hover:text-[#ECC46C] rounded-lg hover:bg-[#ECC46C]/10 transition-all cursor-pointer"
                  title="Edit Category"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); deleteCat(cat.id); }}
                  className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-all cursor-pointer"
                  title="Delete Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="p-1 text-gray-400">
                  {expandedCat === cat.id ? <ChevronUp className="w-4 h-4 text-[#ECC46C]" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>
            </div>

            {/* Expanded items & subsections */}
            {expandedCat === cat.id && (
              <div className="border-t border-[#ECC46C]/15 p-5 bg-[#070B1E] space-y-6">
                {/* Direct items */}
                {(cat.items?.length > 0 || !cat.subsections?.length) && (
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-1 border-b border-gray-800">
                      <h4 className="text-xs font-bold text-[#ECC46C] uppercase tracking-wider flex items-center gap-1.5">
                        <span>Items</span>
                        <span className="text-[10px] text-gray-400 font-normal">({cat.items?.length || 0})</span>
                      </h4>
                      <button
                        onClick={() => setEditingItem({ name: '', price: '', desc: '', categoryId: cat.id })}
                        className="text-xs font-semibold text-[#ECC46C] hover:bg-[#ECC46C]/10 px-2.5 py-1 rounded-md border border-[#ECC46C]/30 flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Item
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {cat.items?.map(item => (
                        <div key={item.id} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-[#0D1638]/60 hover:bg-[#0D1638] transition-colors border border-transparent hover:border-[#ECC46C]/20">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{item.name}</p>
                            {item.desc && <p className="text-xs text-gray-400 truncate">{item.desc}</p>}
                          </div>
                          <span className="text-xs font-bold text-[#ECC46C] shrink-0">{item.price || '—'}</span>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => setEditingItem({ ...item, _categoryId: cat.id })}
                              className="p-1.5 text-gray-400 hover:text-[#ECC46C] rounded transition-all cursor-pointer"
                              title="Edit item"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteItem(item.id, cat.id)}
                              className="p-1.5 text-gray-400 hover:text-red-400 rounded transition-all cursor-pointer"
                              title="Delete item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {(!cat.items || cat.items.length === 0) && (
                        <p className="text-xs text-gray-500 italic py-2">No items directly in this category.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Subsections */}
                {cat.subsections?.map(sub => (
                  <div key={sub.id} className="pt-2">
                    <div className="flex items-center justify-between mb-3 pb-1 border-b border-gray-800">
                      <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                        <span>{sub.subtitle}</span>
                        <span className="text-[10px] text-gray-400 font-normal">({sub.items?.length || 0})</span>
                      </h4>
                      <button
                        onClick={() => setEditingItem({ name: '', price: '', desc: '', categoryId: cat.id, subsectionId: sub.id })}
                        className="text-xs font-semibold text-indigo-300 hover:bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/30 flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add to {sub.subtitle}
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {sub.items?.map(item => (
                        <div key={item.id} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-[#0D1638]/60 hover:bg-[#0D1638] transition-colors border border-transparent hover:border-indigo-500/20">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{item.name}</p>
                            {item.desc && <p className="text-xs text-gray-400 truncate">{item.desc}</p>}
                          </div>
                          <span className="text-xs font-bold text-[#ECC46C] shrink-0">{item.price || '—'}</span>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => setEditingItem({ ...item, _categoryId: cat.id })}
                              className="p-1.5 text-gray-400 hover:text-[#ECC46C] rounded transition-all cursor-pointer"
                              title="Edit item"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteItem(item.id, cat.id)}
                              className="p-1.5 text-gray-400 hover:text-red-400 rounded transition-all cursor-pointer"
                              title="Delete item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {(!sub.items || sub.items.length === 0) && (
                        <p className="text-xs text-gray-500 italic py-2">No items in this subsection yet.</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add-ons */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3 pb-1 border-b border-gray-800">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span>Add-ons & Extras</span>
                      <span className="text-[10px] text-gray-400 font-normal">({cat.addons?.length || 0})</span>
                    </h4>
                    <button
                      onClick={() => setEditingAddon({ name: '', price: '', categoryId: cat.id })}
                      className="text-xs font-semibold text-amber-300 hover:bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30 flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Add-on
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {cat.addons?.map(addon => (
                      <div key={addon.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#0D1638]/60 border border-gray-800 hover:border-amber-500/30">
                        <span className="text-xs text-gray-200">+ {addon.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#ECC46C]">{addon.price}</span>
                          <button onClick={() => setEditingAddon({ ...addon, categoryId: cat.id })} className="p-1 text-gray-400 hover:text-[#ECC46C] cursor-pointer">
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button onClick={() => deleteAddon(addon.id, cat.id)} className="p-1 text-gray-400 hover:text-red-400 cursor-pointer">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {(!cat.addons || cat.addons.length === 0) && (
                      <p className="text-xs text-gray-500 italic py-2 col-span-2">No add-ons for this category.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {categories.length === 0 && !loading && (
          <div className="text-center py-16 text-gray-400 glass-effect rounded-2xl border border-[#ECC46C]/20">
            <p className="text-base font-serif text-white mb-1">No menu categories found</p>
            <p className="text-xs text-gray-400 mb-4">Click below to create your first food or beverage category</p>
            <button onClick={startNewCat} className="px-4 py-2 bg-[#ECC46C] text-[#0A0F29] rounded-lg text-xs font-bold uppercase tracking-wider">
              Create Category
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
