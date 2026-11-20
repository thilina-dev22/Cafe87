// src/components/admin/AdminRooms.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api.jsx';
import RoomPhotoManager from './RoomPhotoManager.jsx';
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, Eye, EyeOff, Save, X } from 'lucide-react';

const EMPTY_ROOM = {
  slug: '', name: '', subtitle: '', description: '',
  price: '', pricePeriod: 'per night', size: '', capacity: '', bed: '', view: '',
  bookingUrl: '', agodaUrl: '',
  highlights: [''], features: [''],
  sortOrder: 0, isActive: true, photos: [],
};

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // null | 'new' | roomObject
  const [expandedId, setExpandedId] = useState(null); // which room shows photos
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api.adminRooms.list()
      .then(setRooms)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const startNew = () => setEditing({ ...EMPTY_ROOM });
  const startEdit = (room) => setEditing({ ...room, highlights: room.highlights || [''], features: room.features || [''] });
  const cancelEdit = () => setEditing(null);

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
        <h2 className="font-serif text-xl font-bold text-white">Room Listings</h2>
        <button
          onClick={startNew}
          className="flex items-center gap-2 px-4 py-2 bg-[#ECC46C] text-[#0A0F29] rounded-lg text-sm font-bold transition-all hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> New Room
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-xs mb-4 bg-red-400/10 px-3 py-2 rounded-lg border border-red-400/20">{error}</p>
      )}

      {/* Room Edit Form */}
      {editing !== null && (
        <div className="glass-effect rounded-2xl p-6 border border-[#ECC46C]/30 mb-6">
          <h3 className="font-serif text-lg font-bold text-white mb-5">
            {editing.id ? `Edit: ${editing.name}` : 'New Room'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[
              ['name', 'Room Name *'],
              ['slug', 'URL Slug *'],
              ['subtitle', 'Subtitle'],
              ['price', 'Price (e.g. From $24)'],
              ['pricePeriod', 'Price Period'],
              ['size', 'Size (e.g. 148 sq ft)'],
              ['capacity', 'Capacity (e.g. 2 Guests)'],
              ['bed', 'Bed Type'],
              ['view', 'View'],
              ['bookingUrl', 'Booking.com URL'],
              ['agodaUrl', 'Agoda URL'],
            ].map(([key, label]) => (
              <div key={key}>
                <label className="block text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">{label}</label>
                <input
                  value={editing[key] || ''}
                  onChange={e => setField(key, e.target.value)}
                  className="w-full px-3 py-2 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C]"
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-xs text-gray-400 font-semibold mb-1 uppercase tracking-wider">Description *</label>
            <textarea
              value={editing.description || ''}
              onChange={e => setField('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-sm focus:outline-none focus:border-[#ECC46C] resize-none"
            />
          </div>

          {/* Highlights */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Highlights</label>
              <button onClick={() => addListItem('highlights')} className="text-[#ECC46C] text-xs hover:underline">+ Add</button>
            </div>
            {(editing.highlights || []).map((h, i) => (
              <div key={i} className="flex gap-2 mb-1.5">
                <input
                  value={h}
                  onChange={e => setListItem('highlights', i, e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-xs focus:outline-none focus:border-[#ECC46C]"
                  placeholder="e.g. No prepayment needed"
                />
                <button onClick={() => removeListItem('highlights', i)} className="text-red-400 hover:text-red-300">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Features / Amenities</label>
              <button onClick={() => addListItem('features')} className="text-[#ECC46C] text-xs hover:underline">+ Add</button>
            </div>
            {(editing.features || []).map((f, i) => (
              <div key={i} className="flex gap-2 mb-1.5">
                <input
                  value={f}
                  onChange={e => setListItem('features', i, e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-[#0D1638] border border-[#ECC46C]/20 rounded-lg text-white text-xs focus:outline-none focus:border-[#ECC46C]"
                  placeholder="e.g. Air conditioning & ceiling fan"
                />
                <button onClick={() => removeListItem('features', i)} className="text-red-400 hover:text-red-300">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Active toggle */}
          <div className="flex items-center gap-3 mb-5">
            <input
              type="checkbox"
              id="isActive"
              checked={editing.isActive !== false}
              onChange={e => setField('isActive', e.target.checked)}
              className="w-4 h-4 accent-[#ECC46C]"
            />
            <label htmlFor="isActive" className="text-sm text-gray-300">Active (visible on website)</label>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#ECC46C] text-[#0A0F29] rounded-lg font-bold text-sm transition-all hover:opacity-90 disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving…' : 'Save Room'}
            </button>
            <button onClick={cancelEdit} className="px-4 py-2.5 text-gray-400 hover:text-white text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Room List */}
      <div className="space-y-3">
        {rooms.map(room => (
          <div key={room.id} className="glass-effect rounded-xl border border-[#ECC46C]/20 overflow-hidden">
            <div className="flex items-center gap-4 p-4">
              {/* Preview image */}
              {room.photos?.find(p => p.isPreview)?.url || room.photos?.[0]?.url ? (
                <img
                  src={room.photos?.find(p => p.isPreview)?.url || room.photos?.[0]?.url}
                  alt={room.name}
                  className="w-14 h-14 object-cover rounded-lg shrink-0"
                />
              ) : (
                <div className="w-14 h-14 bg-[#0D1638] rounded-lg shrink-0 flex items-center justify-center">
                  <span className="text-gray-600 text-xs">No img</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-white truncate">{room.name}</h3>
                  {!room.isActive && (
                    <span className="px-2 py-0.5 bg-gray-700 text-gray-400 text-[10px] rounded-full font-semibold">Hidden</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 truncate">{room.subtitle}</p>
                <p className="text-xs text-[#ECC46C] font-semibold mt-0.5">{room.price} {room.pricePeriod}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setExpandedId(expandedId === room.id ? null : room.id)}
                  className="p-2 text-gray-400 hover:text-[#ECC46C] rounded-lg hover:bg-[#ECC46C]/10 transition-all"
                  title="Manage photos"
                >
                  {expandedId === room.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => startEdit(room)}
                  className="p-2 text-gray-400 hover:text-[#ECC46C] rounded-lg hover:bg-[#ECC46C]/10 transition-all"
                  title="Edit room"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteRoom(room.id)}
                  className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-all"
                  title="Delete room"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Photos panel */}
            {expandedId === room.id && (
              <div className="border-t border-[#ECC46C]/15 p-4 bg-[#0A0F29]/50">
                <RoomPhotoManager
                  room={room}
                  onUpdate={(updatedRoom) => setRooms(rooms.map(r => r.id === updatedRoom.id ? updatedRoom : r))}
                />
              </div>
            )}
          </div>
        ))}

        {rooms.length === 0 && !loading && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-sm">No rooms yet.</p>
            <button onClick={startNew} className="mt-3 text-[#ECC46C] text-sm hover:underline">Create your first room</button>
          </div>
        )}
      </div>
    </div>
  );
}
