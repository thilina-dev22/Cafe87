// src/components/admin/AdminRooms.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api.jsx';
import RoomPhotoManager from './RoomPhotoManager.jsx';
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, Save, X, Sparkles, Check, Link, Bed, Users, Eye, Maximize } from 'lucide-react';

const CAPACITY_PRESETS = [
  '2 Guests',
  '1 Guest',
  '3 Guests',
  '4 Guests',
  '2 Adults + 1 Child',
  'Family Suite (Up to 4 Guests)',
];

const BED_PRESETS = [
  '1 Extra-Large Double Bed',
  '1 Four-Poster Teak Double Bed',
  '1 King Size Bed',
  '1 Queen Size Bed',
  '2 Single Twin Beds',
  '1 Double Bed + 1 Single Bed',
];

const VIEW_PRESETS = [
  'Tropical Garden View',
  'Garden & Patio View',
  'Courtyard & Plumeria Lawn View',
  'Private Patio & Sunset View',
  'Ocean & Coastal Breeze View',
  'Pool & Garden View',
];

const PRICE_PERIOD_PRESETS = [
  'per night',
  'per day',
  'per stay',
  'per week',
  'per person / night',
];

const SIZE_PRESETS = [
  '148 sq ft',
  '165 sq ft',
  '200 sq ft',
  '220 sq ft',
  '250 sq ft',
  '300 sq ft',
];

const HIGHLIGHT_PRESETS = [
  'No prepayment needed — Pay at property',
  'Breakfast included options available',
  'Ground floor with private entrance',
  'Private sun patio & garden access',
  'Free cancellation up to 48 hrs before check-in',
];

const FEATURE_PRESETS = [
  '1 Extra-large double bed with swan towel art',
  'Air conditioning & silent ceiling fan',
  'Artisanal earthen en-suite bathroom with bath/shower',
  'Flat-screen TV with cable channels',
  'Minibar & Refrigerator',
  'Free high-speed Wi-Fi connection',
  'Free luxury toiletries, towels, linen & slippers',
  'Electric kettle & tea/coffee making facilities',
  'Hairdryer, clothes rack & ironing facilities',
  'Mosquito net for peaceful sleep',
  'Polished concrete flooring & tropical decor',
  'Ground floor location with private entrance',
  'Optional fresh breakfast included',
];

const EMPTY_ROOM = {
  slug: '', name: '', subtitle: '', description: '',
  price: '', pricePeriod: 'per night', size: '148 sq ft', capacity: '2 Guests', bed: '1 Extra-Large Double Bed', view: 'Tropical Garden View',
  bookingUrl: '', agodaUrl: '',
  highlights: [], features: [],
  sortOrder: 0, isActive: true, photos: [],
};

const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null | roomObject
  const [expandedId, setExpandedId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  const load = () => {
    setLoading(true);
    api.adminRooms.list()
      .then(setRooms)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const startNew = () => {
    setIsSlugManuallyEdited(false);
    setEditing({ ...EMPTY_ROOM, highlights: [...HIGHLIGHT_PRESETS.slice(0, 3)], features: [...FEATURE_PRESETS.slice(0, 5)] });
  };

  const startEdit = (room) => {
    setIsSlugManuallyEdited(true);
    setEditing({
      ...room,
      highlights: room.highlights || [],
      features: room.features || [],
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setIsSlugManuallyEdited(false);
  };

  const handleNameChange = (name) => {
    setEditing(prev => {
      const updated = { ...prev, name };
      if (!isSlugManuallyEdited && !prev.id) {
        updated.slug = slugify(name);
      }
      return updated;
    });
  };

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...editing,
        highlights: (editing.highlights || []).filter(Boolean),
        features: (editing.features || []).filter(Boolean),
      };
      let saved;
      if (editing.id) {
        saved = await api.adminRooms.update(editing.id, payload);
        setRooms(rooms.map(r => r.id === saved.id ? saved : r));
      } else {
        saved = await api.adminRooms.create(payload);
        setRooms([...rooms, saved]);
      }
      setEditing(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteRoom = async (id) => {
    if (!confirm('Delete this room? This cannot be undone.')) return;
    try {
      await api.adminRooms.delete(id);
      setRooms(rooms.filter(r => r.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const setField = (key, value) => setEditing(prev => ({ ...prev, [key]: value }));

  const toggleHighlight = (text) => {
    setEditing(prev => {
      const current = prev.highlights || [];
      const exists = current.includes(text);
      return {
        ...prev,
        highlights: exists ? current.filter(h => h !== text) : [...current, text],
      };
    });
  };

  const toggleFeature = (text) => {
    setEditing(prev => {
      const current = prev.features || [];
      const exists = current.includes(text);
      return {
        ...prev,
        features: exists ? current.filter(f => f !== text) : [...current, text],
      };
    });
  };

  const setListItem = (key, index, value) => {
    setEditing(prev => {
      const arr = [...(prev[key] || [])];
      arr[index] = value;
      return { ...prev, [key]: arr };
    });
  };

  const addListItem = (key) => setEditing(prev => ({ ...prev, [key]: [...(prev[key] || []), ''] }));
  const removeListItem = (key, index) => setEditing(prev => ({ ...prev, [key]: (prev[key] || []).filter((_, i) => i !== index) }));

  if (loading) return <p className="text-gray-400 text-sm">Loading rooms…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-xl font-bold text-white">Room Listings</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage suite details, dropdown specifications, photos and pricing</p>
        </div>
        <button
          onClick={startNew}
          className="flex items-center gap-2 px-4 py-2 bg-[#ECC46C] text-[#0A0F29] rounded-lg text-sm font-bold transition-all hover:opacity-90 shadow-lg cursor-pointer"
        >
          <Plus className="w-4 h-4" /> New Room
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-xs mb-4 bg-red-400/10 px-3 py-2 rounded-lg border border-red-400/20">{error}</p>
      )}

      {/* Room Edit Form */}
      {editing !== null && (
        <div className="glass-effect rounded-2xl p-6 border border-[#ECC46C]/30 mb-8 shadow-2xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#ECC46C]/20">
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                {editing.id ? `Edit Suite: ${editing.name}` : 'Create New Boutique Room'}
              </h3>
              <p className="text-xs text-[#ECC46C]">Select standard hotel specifications from dropdowns or type custom values</p>
            </div>
            <button onClick={cancelEdit} className="p-1.5 text-gray-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            {/* Room Name */}
            <div>
              <label className="block text-xs text-gray-300 font-semibold mb-1 uppercase tracking-wider">Room Name *</label>
              <input
                value={editing.name || ''}
                onChange={e => handleNameChange(e.target.value)}
                placeholder="e.g. Sun Room, Ocean Suite"
                className="w-full px-3.5 py-2.5 bg-[#0D1638] border border-[#ECC46C]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C]"
              />
            </div>

            {/* URL Slug (Auto-generated with manual override) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-gray-300 font-semibold uppercase tracking-wider">URL Slug *</label>
                {!editing.id && (
                  <span className="text-[10px] text-gray-400">
                    {isSlugManuallyEdited ? '(Manual slug)' : '(Auto-generated)'}
                  </span>
                )}
              </div>
              <input
                value={editing.slug || ''}
                onChange={e => {
                  setIsSlugManuallyEdited(true);
                  setField('slug', e.target.value);
                }}
                placeholder="e.g. sun-room"
                className="w-full px-3.5 py-2.5 bg-[#0D1638] border border-[#ECC46C]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C] font-mono text-xs"
              />
            </div>

            {/* Subtitle */}
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-300 font-semibold mb-1 uppercase tracking-wider">Subtitle</label>
              <input
                value={editing.subtitle || ''}
                onChange={e => setField('subtitle', e.target.value)}
                placeholder="e.g. Bright & Sunny Private Suite / Four-Poster Canopy Suite"
                className="w-full px-3.5 py-2.5 bg-[#0D1638] border border-[#ECC46C]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C]"
              />
            </div>

            {/* Price & Price Period Dropdown */}
            <div>
              <label className="block text-xs text-gray-300 font-semibold mb-1 uppercase tracking-wider">Price (Display)</label>
              <input
                value={editing.price || ''}
                onChange={e => setField('price', e.target.value)}
                placeholder="e.g. From $24, $35"
                className="w-full px-3.5 py-2.5 bg-[#0D1638] border border-[#ECC46C]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C]"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 font-semibold mb-1 uppercase tracking-wider">Price Period (Dropdown)</label>
              <div className="relative">
                <select
                  value={PRICE_PERIOD_PRESETS.includes(editing.pricePeriod) ? editing.pricePeriod : '__custom__'}
                  onChange={e => {
                    if (e.target.value !== '__custom__') setField('pricePeriod', e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#0D1638] border border-[#ECC46C]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C] appearance-none cursor-pointer"
                >
                  {PRICE_PERIOD_PRESETS.map(p => (
                    <option key={p} value={p} className="bg-[#0D1638] text-white">{p}</option>
                  ))}
                  <option value="__custom__" className="bg-[#0D1638] text-gray-300">Custom Period…</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {!PRICE_PERIOD_PRESETS.includes(editing.pricePeriod) && (
                <input
                  value={editing.pricePeriod || ''}
                  onChange={e => setField('pricePeriod', e.target.value)}
                  placeholder="Enter custom period"
                  className="w-full mt-2 px-3 py-1.5 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-xs"
                />
              )}
            </div>

            {/* Capacity Dropdown Select */}
            <div>
              <label className="block text-xs text-gray-300 font-semibold mb-1 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#ECC46C]" /> Capacity (Dropdown)
              </label>
              <div className="relative">
                <select
                  value={CAPACITY_PRESETS.includes(editing.capacity) ? editing.capacity : '__custom__'}
                  onChange={e => {
                    if (e.target.value !== '__custom__') setField('capacity', e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#0D1638] border border-[#ECC46C]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C] appearance-none cursor-pointer"
                >
                  {CAPACITY_PRESETS.map(c => (
                    <option key={c} value={c} className="bg-[#0D1638] text-white">{c}</option>
                  ))}
                  <option value="__custom__" className="bg-[#0D1638] text-gray-300">Custom Capacity…</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {!CAPACITY_PRESETS.includes(editing.capacity) && (
                <input
                  value={editing.capacity || ''}
                  onChange={e => setField('capacity', e.target.value)}
                  placeholder="e.g. 5 Guests"
                  className="w-full mt-2 px-3 py-1.5 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-xs"
                />
              )}
            </div>

            {/* Bed Type Dropdown Select */}
            <div>
              <label className="block text-xs text-gray-300 font-semibold mb-1 uppercase tracking-wider flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-[#ECC46C]" /> Bed Configuration (Dropdown)
              </label>
              <div className="relative">
                <select
                  value={BED_PRESETS.includes(editing.bed) ? editing.bed : '__custom__'}
                  onChange={e => {
                    if (e.target.value !== '__custom__') setField('bed', e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#0D1638] border border-[#ECC46C]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C] appearance-none cursor-pointer"
                >
                  {BED_PRESETS.map(b => (
                    <option key={b} value={b} className="bg-[#0D1638] text-white">{b}</option>
                  ))}
                  <option value="__custom__" className="bg-[#0D1638] text-gray-300">Custom Bed Type…</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {!BED_PRESETS.includes(editing.bed) && (
                <input
                  value={editing.bed || ''}
                  onChange={e => setField('bed', e.target.value)}
                  placeholder="Enter custom bed type"
                  className="w-full mt-2 px-3 py-1.5 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-xs"
                />
              )}
            </div>

            {/* Room View Dropdown Select */}
            <div>
              <label className="block text-xs text-gray-300 font-semibold mb-1 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#ECC46C]" /> View (Dropdown)
              </label>
              <div className="relative">
                <select
                  value={VIEW_PRESETS.includes(editing.view) ? editing.view : '__custom__'}
                  onChange={e => {
                    if (e.target.value !== '__custom__') setField('view', e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#0D1638] border border-[#ECC46C]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C] appearance-none cursor-pointer"
                >
                  {VIEW_PRESETS.map(v => (
                    <option key={v} value={v} className="bg-[#0D1638] text-white">{v}</option>
                  ))}
                  <option value="__custom__" className="bg-[#0D1638] text-gray-300">Custom View…</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {!VIEW_PRESETS.includes(editing.view) && (
                <input
                  value={editing.view || ''}
                  onChange={e => setField('view', e.target.value)}
                  placeholder="Enter custom view description"
                  className="w-full mt-2 px-3 py-1.5 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-xs"
                />
              )}
            </div>

            {/* Size with Quick Pills */}
            <div>
              <label className="block text-xs text-gray-300 font-semibold mb-1 uppercase tracking-wider flex items-center gap-1.5">
                <Maximize className="w-3.5 h-3.5 text-[#ECC46C]" /> Room Size
              </label>
              <input
                value={editing.size || ''}
                onChange={e => setField('size', e.target.value)}
                placeholder="e.g. 148 sq ft"
                className="w-full px-3.5 py-2 bg-[#0D1638] border border-[#ECC46C]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C]"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {SIZE_PRESETS.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setField('size', s)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                      editing.size === s
                        ? 'bg-[#ECC46C] text-[#0A0F29]'
                        : 'bg-[#0D1638] text-gray-400 hover:text-white border border-[#ECC46C]/20'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* External Links */}
            <div>
              <label className="block text-xs text-gray-300 font-semibold mb-1 uppercase tracking-wider flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5 text-blue-400" /> Booking.com Share URL
              </label>
              <input
                value={editing.bookingUrl || ''}
                onChange={e => setField('bookingUrl', e.target.value)}
                placeholder="https://www.booking.com/Share-..."
                className="w-full px-3.5 py-2.5 bg-[#0D1638] border border-[#ECC46C]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C]"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300 font-semibold mb-1 uppercase tracking-wider flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5 text-green-400" /> Agoda URL
              </label>
              <input
                value={editing.agodaUrl || ''}
                onChange={e => setField('agodaUrl', e.target.value)}
                placeholder="https://www.agoda.com/..."
                className="w-full px-3.5 py-2.5 bg-[#0D1638] border border-[#ECC46C]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C]"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-xs text-gray-300 font-semibold mb-1 uppercase tracking-wider">Description *</label>
            <textarea
              value={editing.description || ''}
              onChange={e => setField('description', e.target.value)}
              rows={3}
              placeholder="Describe the aesthetic, private bathroom features, bedding and atmosphere..."
              className="w-full px-3.5 py-2.5 bg-[#0D1638] border border-[#ECC46C]/30 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C] resize-none"
            />
          </div>

          {/* Highlights with Quick Preset Click Tags */}
          <div className="mb-6 bg-[#070B1E] p-4 rounded-xl border border-[#ECC46C]/15">
            <div className="flex items-center justify-between mb-2">
              <div>
                <label className="text-xs text-gray-200 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#ECC46C]" /> Highlights (Top Badges)
                </label>
                <p className="text-[11px] text-gray-400">Click standard badges to instantly toggle them on/off, or type custom entries below</p>
              </div>
              <button
                type="button"
                onClick={() => addListItem('highlights')}
                className="text-[#ECC46C] text-xs font-bold hover:underline cursor-pointer"
              >
                + Custom Highlight
              </button>
            </div>

            {/* Quick chips */}
            <div className="flex flex-wrap gap-2 mb-3">
              {HIGHLIGHT_PRESETS.map(h => {
                const isSelected = (editing.highlights || []).includes(h);
                return (
                  <button
                    key={h}
                    type="button"
                    onClick={() => toggleHighlight(h)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#ECC46C] text-[#0A0F29] font-bold shadow-md'
                        : 'bg-[#0D1638] text-gray-300 border border-[#ECC46C]/25 hover:border-[#ECC46C]/60'
                    }`}
                  >
                    {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-[#ECC46C]" />}
                    <span>{h}</span>
                  </button>
                );
              })}
            </div>

            {/* Editable highlights list */}
            {(editing.highlights || []).map((h, i) => (
              <div key={i} className="flex gap-2 mb-1.5">
                <input
                  value={h}
                  onChange={e => setListItem('highlights', i, e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-xs focus:outline-none focus:border-[#ECC46C]"
                  placeholder="e.g. No prepayment needed — Pay at property"
                />
                <button
                  type="button"
                  onClick={() => removeListItem('highlights', i)}
                  className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Features / Amenities with Quick Preset Click Tags */}
          <div className="mb-6 bg-[#070B1E] p-4 rounded-xl border border-[#ECC46C]/15">
            <div className="flex items-center justify-between mb-2">
              <div>
                <label className="text-xs text-gray-200 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#ECC46C]" /> Amenities &amp; Features
                </label>
                <p className="text-[11px] text-gray-400">Click any amenity chip below to automatically add/remove it from this room</p>
              </div>
              <button
                type="button"
                onClick={() => addListItem('features')}
                className="text-[#ECC46C] text-xs font-bold hover:underline cursor-pointer"
              >
                + Custom Amenity
              </button>
            </div>

            {/* Quick chips */}
            <div className="flex flex-wrap gap-2 mb-3">
              {FEATURE_PRESETS.map(f => {
                const isSelected = (editing.features || []).includes(f);
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => toggleFeature(f)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#ECC46C] text-[#0A0F29] font-bold shadow-md'
                        : 'bg-[#0D1638] text-gray-300 border border-[#ECC46C]/25 hover:border-[#ECC46C]/60'
                    }`}
                  >
                    {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-[#ECC46C]" />}
                    <span>{f}</span>
                  </button>
                );
              })}
            </div>

            {/* Editable features list */}
            {(editing.features || []).map((f, i) => (
              <div key={i} className="flex gap-2 mb-1.5">
                <input
                  value={f}
                  onChange={e => setListItem('features', i, e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-xs focus:outline-none focus:border-[#ECC46C]"
                  placeholder="e.g. Air conditioning & silent ceiling fan"
                />
                <button
                  type="button"
                  onClick={() => removeListItem('features', i)}
                  className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Active toggle */}
          <div className="flex items-center gap-3 mb-6 p-3 bg-[#0D1638] rounded-xl border border-[#ECC46C]/20">
            <input
              type="checkbox"
              id="isActive"
              checked={editing.isActive !== false}
              onChange={e => setField('isActive', e.target.checked)}
              className="w-4 h-4 accent-[#ECC46C] cursor-pointer"
            />
            <label htmlFor="isActive" className="text-sm font-semibold text-gray-200 cursor-pointer">
              Active Listing (Visible to public guests on website)
            </label>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#ECC46C] text-[#0A0F29] rounded-lg font-bold text-sm transition-all hover:opacity-90 disabled:opacity-60 shadow-xl cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving Room…' : 'Save Room Listing'}
            </button>
            <button
              onClick={cancelEdit}
              className="px-4 py-2.5 text-gray-400 hover:text-white text-sm font-semibold cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Room List */}
      <div className="space-y-3">
        {rooms.map(room => (
          <div key={room.id} className="glass-effect rounded-xl border border-[#ECC46C]/20 overflow-hidden shadow-lg">
            <div className="flex items-center gap-4 p-4">
              {/* Preview image */}
              {room.photos?.find(p => p.isPreview)?.url || room.photos?.[0]?.url ? (
                <img
                  src={room.photos?.find(p => p.isPreview)?.url || room.photos?.[0]?.url}
                  alt={room.name}
                  className="w-16 h-16 object-cover rounded-lg shrink-0 border border-[#ECC46C]/30"
                />
              ) : (
                <div className="w-16 h-16 bg-[#0D1638] rounded-lg shrink-0 flex items-center justify-center border border-gray-700">
                  <span className="text-gray-500 text-xs">No Photo</span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-white text-base truncate">{room.name}</h3>
                  {!room.isActive && (
                    <span className="px-2 py-0.5 bg-gray-700 text-gray-400 text-[10px] rounded-full font-semibold">Hidden</span>
                  )}
                  {room.photos?.length > 0 && (
                    <span className="px-2 py-0.5 bg-[#ECC46C]/15 text-[#ECC46C] text-[10px] rounded-full font-semibold border border-[#ECC46C]/30">
                      {room.photos.length} photos
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 truncate">{room.subtitle || 'Boutique Room'}</p>
                <div className="flex items-center gap-3 text-xs text-gray-300 mt-1">
                  <span className="text-[#ECC46C] font-semibold">{room.price} {room.pricePeriod}</span>
                  {room.capacity && <span className="text-gray-400">• {room.capacity}</span>}
                  {room.bed && <span className="text-gray-400 hidden sm:inline">• {room.bed}</span>}
                  {room.view && <span className="text-gray-400 hidden md:inline">• {room.view}</span>}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setExpandedId(expandedId === room.id ? null : room.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#ECC46C] hover:bg-[#ECC46C]/10 rounded-lg border border-[#ECC46C]/30 flex items-center gap-1 transition-all cursor-pointer"
                  title="Manage Photos"
                >
                  <span>Photos</span>
                  {expandedId === room.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => startEdit(room)}
                  className="p-2 text-gray-400 hover:text-[#ECC46C] rounded-lg hover:bg-[#ECC46C]/10 transition-all cursor-pointer"
                  title="Edit Room"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteRoom(room.id)}
                  className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-all cursor-pointer"
                  title="Delete Room"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Photos manager panel */}
            {expandedId === room.id && (
              <div className="border-t border-[#ECC46C]/15 p-5 bg-[#070B1E]">
                <RoomPhotoManager
                  room={room}
                  onUpdate={(updatedRoom) => setRooms(rooms.map(r => r.id === updatedRoom.id ? updatedRoom : r))}
                />
              </div>
            )}
          </div>
        ))}

        {rooms.length === 0 && !loading && (
          <div className="text-center py-16 text-gray-400 glass-effect rounded-xl border border-[#ECC46C]/20">
            <p className="text-base font-serif text-white mb-1">No rooms found</p>
            <p className="text-xs text-gray-400 mb-4">Click below to create your first boutique suite listing</p>
            <button onClick={startNew} className="px-4 py-2 bg-[#ECC46C] text-[#0A0F29] rounded-lg text-xs font-bold uppercase tracking-wider">
              Create Room
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
