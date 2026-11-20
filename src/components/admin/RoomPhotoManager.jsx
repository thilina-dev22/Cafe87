// src/components/admin/RoomPhotoManager.jsx
import React, { useRef, useState } from 'react';
import { api } from '../../lib/api.jsx';
import { Upload, Trash2, Star, StarOff, GripVertical, X } from 'lucide-react';

export default function RoomPhotoManager({ room, onUpdate }) {
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const photos = room.photos || [];

  const readAsDataURL = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    setError('');
    try {
      const photoPayloads = await Promise.all(
        files.map(async (file, i) => ({
          url: await readAsDataURL(file),
          caption: file.name.replace(/\.[^.]+$/, ''),
          isPreview: false,
          sortOrder: photos.length + i,
        }))
      );
      const created = await api.adminRooms.addPhotos(room.id, photoPayloads);
      onUpdate({ ...room, photos: [...photos, ...created] });
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const setPreview = async (photoId) => {
    try {
      await api.adminRooms.updatePhoto(photoId, { isPreview: true });
      onUpdate({
        ...room,
        photos: photos.map(p => ({ ...p, isPreview: p.id === photoId })),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const deletePhoto = async (photoId) => {
    if (!confirm('Delete this photo?')) return;
    try {
      await api.adminRooms.deletePhoto(photoId);
      onUpdate({ ...room, photos: photos.filter(p => p.id !== photoId) });
    } catch (err) {
      setError(err.message);
    }
  };

  const updateCaption = async (photoId, caption) => {
    try {
      await api.adminRooms.updatePhoto(photoId, { caption });
      onUpdate({
        ...room,
        photos: photos.map(p => p.id === photoId ? { ...p, caption } : p),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-serif text-sm font-bold text-[#ECC46C]">Photos ({photos.length})</h4>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ECC46C]/10 hover:bg-[#ECC46C]/20 border border-[#ECC46C]/30 text-[#ECC46C] rounded-lg text-xs font-semibold transition-all"
        >
          <Upload className="w-3.5 h-3.5" />
          {uploading ? 'Uploading…' : 'Add Photos'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {error && (
        <p className="text-red-400 text-xs mb-3 bg-red-400/10 px-3 py-2 rounded-lg">{error}</p>
      )}

      {photos.length === 0 ? (
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-[#ECC46C]/20 rounded-xl p-8 text-center cursor-pointer hover:border-[#ECC46C]/40 transition-all"
        >
          <Upload className="w-6 h-6 text-[#ECC46C]/50 mx-auto mb-2" />
          <p className="text-gray-400 text-xs">Click to upload photos</p>
          <p className="text-gray-500 text-[11px] mt-1">JPEG, PNG, or WebP • Multiple files ok</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photos.map(photo => (
            <div key={photo.id} className="relative group rounded-xl overflow-hidden border border-[#ECC46C]/20 bg-[#0A0F29]">
              <img
                src={photo.url}
                alt={photo.caption || 'Room photo'}
                className="w-full h-28 object-cover"
              />
              {/* Preview badge */}
              {photo.isPreview && (
                <div className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-[#ECC46C] text-[#0A0F29] text-[9px] font-bold rounded-full">
                  Preview
                </div>
              )}
              {/* Actions overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {!photo.isPreview && (
                  <button
                    onClick={() => setPreview(photo.id)}
                    title="Set as preview"
                    className="p-1.5 bg-[#ECC46C] text-[#0A0F29] rounded-full hover:scale-110 transition-all"
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => deletePhoto(photo.id)}
                  title="Delete photo"
                  className="p-1.5 bg-red-500 text-white rounded-full hover:scale-110 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              {/* Caption */}
              <input
                defaultValue={photo.caption || ''}
                onBlur={e => updateCaption(photo.id, e.target.value)}
                placeholder="Caption…"
                maxLength={120}
                className="w-full px-2 py-1 bg-[#0D1638] text-white text-[10px] border-t border-[#ECC46C]/10 focus:outline-none placeholder-gray-600"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
