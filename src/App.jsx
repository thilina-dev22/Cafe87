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

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);

  const handleOpenBooking = (room = null) => {
    setSelectedRoomForBooking(room);
    setIsBookingOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--dark-obsidian)' }}>
      <Header onBookClick={() => handleOpenBooking(null)} />
      <main>
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
