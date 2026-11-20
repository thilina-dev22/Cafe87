import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Rooms from './components/Rooms';
import CafeMenu from './components/CafeMenu';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import AdminPanel from './components/admin/AdminPanel.jsx';
import { AdminProvider } from './hooks/useAdmin.jsx';

// Simple client-side routing — /admin shows the admin panel
const isAdminRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);

  const handleOpenBooking = (room = null) => {
    setSelectedRoomForBooking(room);
    setIsBookingOpen(true);
  };

  if (isAdminRoute) {
    return (
      <AdminProvider>
        <AdminPanel />
      </AdminProvider>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0D12] overflow-x-hidden">
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header onBookClick={() => handleOpenBooking(null)} />
      <main id="main">
        <Hero onBookClick={() => handleOpenBooking(null)} />
        <Rooms onBookRoom={(room) => handleOpenBooking(room)} />
        <CafeMenu />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedRoom={selectedRoomForBooking}
      />
    </div>
  );
}
