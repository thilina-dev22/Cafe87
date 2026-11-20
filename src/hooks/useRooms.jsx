// src/hooks/useRooms.js — fetch rooms from API with siteData fallback
import { useState, useEffect } from 'react';
import { api } from '../lib/api.jsx';
import { roomsData } from '../data/siteData.js';

export function useRooms() {
  const [rooms, setRooms] = useState(roomsData); // Start with static data instantly
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.rooms.list()
      .then((data) => {
        if (data?.length) {
          // Normalize DB rooms to match the shape the components expect
          setRooms(data.map(room => ({
            ...room,
            id: room.slug,
            image: room.photos?.find(p => p.isPreview)?.url || room.photos?.[0]?.url || '',
            gallery: room.photos?.map(p => p.url) || [],
          })));
        }
      })
      .catch(() => { /* fall back to static data silently */ })
      .finally(() => setLoading(false));
  }, []);

  return { rooms, loading };
}
