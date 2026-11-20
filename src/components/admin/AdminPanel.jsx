// src/components/admin/AdminPanel.jsx — Full admin dashboard shell
import React, { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin.jsx';
import AdminLogin from './AdminLogin.jsx';
import AdminRooms from './AdminRooms.jsx';
import AdminMenu from './AdminMenu.jsx';
import { BedDouble, UtensilsCrossed, LogOut, ExternalLink, ChevronLeft } from 'lucide-react';

const TABS = [
  { id: 'rooms', label: 'Rooms', icon: BedDouble },
  { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
];

export default function AdminPanel() {
  const { admin, loading, logout } = useAdmin();
  const [tab, setTab] = useState('rooms');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F29] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#ECC46C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!admin) return <AdminLogin />;

  return (
    <div className="min-h-screen bg-[#0A0F29]">
      {/* Top nav */}
      <header className="border-b border-[#ECC46C]/20 bg-[#070B1E] px-4 py-3 flex items-center gap-4 sticky top-0 z-40">
        <a href="/" className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm">
          <ChevronLeft className="w-4 h-4" /> Back to Site
        </a>
        <div className="flex-1 text-center">
          <span className="font-cursive text-[#ECC46C] text-lg">87 Ahangama</span>
          <span className="text-gray-500 text-xs ml-2">Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 hidden sm:block">{admin.name || admin.email}</span>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:block">Sign out</span>
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-[#ECC46C]/15 pb-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all border-b-2 -mb-px ${
                tab === id
                  ? 'text-[#ECC46C] border-[#ECC46C]'
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {tab === 'rooms' && <AdminRooms />}
        {tab === 'menu' && <AdminMenu />}
      </div>
    </div>
  );
}
