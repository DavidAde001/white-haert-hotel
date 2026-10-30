import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { HeroSection } from './components/home/HeroSection';
import { RedefiningLuxurySection } from './components/home/RedefiningLuxurySection';
import { FeaturedSuitesSection } from './components/home/FeaturedSuitesSection';
import { AmenitiesSection } from './components/home/AmenitiesSection';
import { LocationSection } from './components/home/LocationSection';
import { BookRoomsPage } from './components/booking/BookRoomsPage';
import { BookingModal } from './components/booking/BookingModal';
import { ContactPage } from './components/contact/ContactPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Room, Booking } from './types/hotel';
import { HotelDB } from './services/db';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { theme, isDesktopMode } = useTheme();
  const [currentPage, setCurrentPage] = useState<'home' | 'rooms' | 'contact' | 'admin'>('home');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);


  // Load rooms from HotelDB (Supabase / local persistent storage)
  useEffect(() => {
    const fetchRooms = async () => {
      const data = await HotelDB.getRooms();
      setRooms(data);
    };
    fetchRooms();
  }, []);

  const handleOpenBookingForRoom = (room: Room) => {
    setSelectedRoomForBooking(room);
    setIsBookingModalOpen(true);
  };

  const handleOpenGeneralBookingModal = () => {
    // If no room is preselected, default to signature Room 603 or first room
    const defaultRoom = rooms.find((r) => r.roomNumber === '603') || rooms[0] || null;
    setSelectedRoomForBooking(defaultRoom);
    setIsBookingModalOpen(true);
  };

  const handleBookingComplete = (booking: Booking) => {
    // Refresh rooms or status if needed
    HotelDB.getRooms().then(setRooms);
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 selection:bg-amber-500/30 selection:text-amber-200 ${
        theme === 'light' ? 'bg-[#f7f6f2] text-neutral-900' : 'bg-[#080808] text-neutral-100'
      }`}
    >
      {/* Top Bar Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBookingModal={handleOpenGeneralBookingModal}
      />

      {/* Main Content Pages with padding-bottom for mobile bottom navigation when in mobile view */}
      <main className={`flex-1 ${!isDesktopMode ? 'pb-28 md:pb-0' : ''}`}>
        {currentPage === 'home' && (
          <>
            <HeroSection
              onBookRoom={() => {
                setCurrentPage('rooms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onContactUs={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <RedefiningLuxurySection
              onExploreSuites={() => {
                setCurrentPage('rooms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <FeaturedSuitesSection
              rooms={rooms}
              onSelectRoom={handleOpenBookingForRoom}
              onViewAllRooms={() => {
                setCurrentPage('rooms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <AmenitiesSection />

            <LocationSection />
          </>
        )}

        {currentPage === 'rooms' && (
          <BookRoomsPage
            rooms={rooms}
            onSelectRoom={handleOpenBookingForRoom}
          />
        )}

        {currentPage === 'contact' && <ContactPage />}

        {currentPage === 'admin' && (
          <AdminDashboard
            onBackToSite={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Booking Modal with OPay settlement and direct WhatsApp confirmation */}
      {isBookingModalOpen && (
        <BookingModal
          room={selectedRoomForBooking}
          onClose={() => setIsBookingModalOpen(false)}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {/* Floating WhatsApp Action with Direct Reception Verification */}
      <FloatingWhatsApp />

      {/* Mobile-Only Floating Bottom Navigation Bar (Home, Rooms, Amenities, Contact Us) */}
      <MobileBottomNav
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Footer */}
      <Footer
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
