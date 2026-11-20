// src/components/admin/AdminMenu.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api.jsx';
import { Plus, Pencil, Trash2, Save, X, ChevronDown, ChevronUp, ToggleLeft, ToggleRight } from 'lucide-react';

export default function AdminMenu() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPrices, setShowPrices] = useState(true);
  const [togglingPrices, setTogglingPrices] = useState(false);
  const [expandedCat, setExpandedCat] = useState(null);

  // Editing state
  const [editingCat, setEditingCat] = useState(null); // null | 'new' | category
  const [editingItem, setEditingItem] = useState(null);
  const [editingAddon, setEditingAddon] = useState(null);
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

  if (loading) return <p className="text-gray-400 text-sm">Loading menu…</p>;

  return (
    <div>
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="font-serif text-xl font-bold text-white">Café Menu</h2>

        <div className="flex items-center gap-3">
          {/* Show Prices toggle */}
          <button
            onClick={togglePrices}
            disabled={togglingPrices}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
              showPrices
                ? 'bg-green-500/15 border-green-500/40 text-green-400 hover:bg-green-500/20'
                : 'bg-red-500/15 border-red-500/40 text-red-400 hover:bg-red-500/20'
            }`}
            title="Toggle price visibility on the public menu"
          >
            {showPrices ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
            {togglingPrices ? '…' : showPrices ? 'Prices Visible' : 'Prices Hidden'}
          </button>

          <button
            onClick={() => setEditingCat({ slug: '', name: '', subtitle: '', badge: '', sortOrder: categories.length })}
            className="flex items-center gap-2 px-4 py-2 bg-[#ECC46C] text-[#0A0F29] rounded-lg text-sm font-bold transition-all hover:opacity-90"
          >
            <Plus className="w-4 h-4" /> New Category
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-xs mb-4 bg-red-400/10 px-3 py-2 rounded-lg border border-red-400/20">{error}</p>
      )}

      {/* Price visibility notice */}
      <div className={`mb-5 px-4 py-3 rounded-xl text-xs font-semibold border ${
        showPrices
          ? 'bg-green-500/10 border-green-500/30 text-green-300'
          : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
      }`}>
        {showPrices
          ? '✅ Prices are currently SHOWN on the public menu'
          : '⚠️ Prices are currently HIDDEN on the public menu — toggle above to show them again'}
      </div>

      {/* Category Edit Form */}
      {editingCat !== null && (
        <div className="glass-effect rounded-2xl p-5 border border-[#ECC46C]/30 mb-5">
          <h3 className="font-serif text-base font-bold text-white mb-4">
            {editingCat.id ? `Edit: ${editingCat.name}` : 'New Category'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {[['name', 'Category Name *'], ['slug', 'URL Slug *'], ['subtitle', 'Subtitle'], ['badge', 'Badge (e.g. Popular)']].map(([k, l]) => (
              <div key={k}>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">{l}</label>
                <input
                  value={editingCat[k] || ''}
                  onChange={e => setEditingCat(p => ({ ...p, [k]: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C]"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={saveCat} disabled={savingCat} className="flex items-center gap-2 px-5 py-2.5 bg-[#ECC46C] text-[#0A0F29] rounded-lg font-bold text-sm disabled:opacity-60">
              <Save className="w-4 h-4" /> {savingCat ? 'Saving…' : 'Save'}
            </button>
            <button onClick={() => setEditingCat(null)} className="text-gray-400 hover:text-white text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Item / Addon Edit Form */}
      {(editingItem !== null || editingAddon !== null) && (
        <div className="glass-effect rounded-2xl p-5 border border-[#ECC46C]/30 mb-5">
          <h3 className="font-serif text-base font-bold text-white mb-4">
            {editingAddon ? 'Edit Add-on' : (editingItem?.id ? 'Edit Item' : 'New Item')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">Name *</label>
              <input
                value={(editingItem || editingAddon)?.name || ''}
                onChange={e => editingAddon
                  ? setEditingAddon(p => ({ ...p, name: e.target.value }))
                  : setEditingItem(p => ({ ...p, name: e.target.value }))
                }
                className="w-full px-3 py-2 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C]"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">Price</label>
              <input
                value={(editingItem || editingAddon)?.price || ''}
                onChange={e => editingAddon
                  ? setEditingAddon(p => ({ ...p, price: e.target.value }))
                  : setEditingItem(p => ({ ...p, price: e.target.value }))
                }
                placeholder="e.g. LKR 2,450"
                className="w-full px-3 py-2 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C]"
              />
            </div>
          </div>
          {!editingAddon && (
            <div className="mb-3">
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">Description</label>
              <textarea
                value={editingItem?.desc || ''}
                onChange={e => setEditingItem(p => ({ ...p, desc: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C] resize-none"
              />
            </div>
          )}
          <div className="flex items-center gap-3">
            <button
              onClick={editingAddon ? async () => {
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
              } : saveItem}
              disabled={savingItem}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#ECC46C] text-[#0A0F29] rounded-lg font-bold text-sm disabled:opacity-60"
            >
              <Save className="w-4 h-4" /> {savingItem ? 'Saving…' : 'Save'}
            </button>
            <button onClick={() => { setEditingItem(null); setEditingAddon(null); }} className="text-gray-400 hover:text-white text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Categories list */}
      <div className="space-y-3">
        {categories.map(cat => (
          <div key={cat.id} className="glass-effect rounded-xl border border-[#ECC46C]/20 overflow-hidden">
            <div
              className="flex items-center gap-3 p-4 cursor-pointer hover:bg-[#ECC46C]/5 transition-colors"
              onClick={() => setExpandedCat(expandedCat === cat.id ? null : cat.id)}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-white">{cat.name}</h3>
                  {cat.badge && <span className="px-2 py-0.5 bg-[#ECC46C]/20 text-[#ECC46C] text-[9px] font-bold rounded-full">{cat.badge}</span>}
                  {!cat.isActive && <span className="px-2 py-0.5 bg-gray-700 text-gray-400 text-[10px] rounded-full">Hidden</span>}
                </div>
                {cat.subtitle && <p className="text-xs text-gray-400 mt-0.5">{cat.subtitle}</p>}
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {(cat.items?.length || 0) + (cat.subsections?.reduce((s, sub) => s + (sub.items?.length || 0), 0) || 0)} items
                  {cat.addons?.length ? ` • ${cat.addons.length} add-ons` : ''}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={e => { e.stopPropagation(); setEditingCat({ ...cat }); }} className="p-2 text-gray-400 hover:text-[#ECC46C] rounded-lg hover:bg-[#ECC46C]/10 transition-all">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={e => { e.stopPropagation(); deleteCat(cat.id); }} className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                {expandedCat === cat.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
            </div>

            {/* Expanded items */}
            {expandedCat === cat.id && (
              <div className="border-t border-[#ECC46C]/15 p-4 bg-[#0A0F29]/50 space-y-5">
                {/* Direct items */}
                {(cat.items?.length > 0 || !cat.subsections?.length) && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold text-[#ECC46C] uppercase tracking-wider">Items</h4>
                      <button
                        onClick={() => setEditingItem({ name: '', price: '', desc: '', categoryId: cat.id })}
                        className="text-[#ECC46C] text-xs hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add Item
                      </button>
                    </div>
                    <div className="space-y-1">
                      {cat.items?.map(item => (
                        <div key={item.id} className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-[#ECC46C]/5">
                          <span className="flex-1 text-sm text-white">{item.name}</span>
                          <span className="text-xs font-semibold text-[#ECC46C]">{item.price}</span>
                          <button onClick={() => setEditingItem({ ...item, _categoryId: cat.id })} className="p-1 text-gray-500 hover:text-[#ECC46C]"><Pencil className="w-3 h-3" /></button>
                          <button onClick={() => deleteItem(item.id, cat.id)} className="p-1 text-gray-500 hover:text-red-400"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subsections */}
                {cat.subsections?.map(sub => (
                  <div key={sub.id}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">{sub.subtitle}</h4>
                      <button
                        onClick={() => setEditingItem({ name: '', price: '', desc: '', categoryId: cat.id, subsectionId: sub.id })}
                        className="text-[#ECC46C] text-xs hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add
                      </button>
                    </div>
                    <div className="space-y-1">
                      {sub.items?.map(item => (
                        <div key={item.id} className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-[#ECC46C]/5">
                          <span className="flex-1 text-sm text-white">{item.name}</span>
                          <span className="text-xs font-semibold text-[#ECC46C]">{item.price}</span>
                          <button onClick={() => setEditingItem({ ...item, _categoryId: cat.id })} className="p-1 text-gray-500 hover:text-[#ECC46C]"><Pencil className="w-3 h-3" /></button>
                          <button onClick={() => deleteItem(item.id, cat.id)} className="p-1 text-gray-500 hover:text-red-400"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Add-ons */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-orange-300 uppercase tracking-wider">Add-ons</h4>
                    <button
                      onClick={() => setEditingAddon({ name: '', price: '', categoryId: cat.id })}
                      className="text-[#ECC46C] text-xs hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  </div>
                  <div className="space-y-1">
                    {cat.addons?.map(addon => (
                      <div key={addon.id} className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-[#ECC46C]/5">
                        <span className="flex-1 text-xs text-gray-300">+ {addon.name}</span>
                        <span className="text-xs font-bold text-[#ECC46C]">{addon.price}</span>
                        <button onClick={() => setEditingAddon({ ...addon, categoryId: cat.id })} className="p-1 text-gray-500 hover:text-[#ECC46C]"><Pencil className="w-3 h-3" /></button>
                        <button onClick={() => deleteAddon(addon.id, cat.id)} className="p-1 text-gray-500 hover:text-red-400"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {categories.length === 0 && !loading && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-sm">No menu categories yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
