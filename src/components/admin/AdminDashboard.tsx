import React, { useState, useEffect } from 'react';
import {
  Shield,
  Layers,
  CalendarCheck,
  Users,
  Mail,
  BarChart3,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Trash2,
  Edit,
  Save,
  RotateCcw,
  Sparkles,
  Database,
  ExternalLink,
  Phone,
  Eye,
  Check,
  Sun,
  Moon,
  Monitor,
  Smartphone,
} from 'lucide-react';
import { Room, Booking, ContactMessage, HotelStats, RoomType } from '../../types/hotel';
import { HotelDB } from '../../services/db';
import { isSupabaseConfigured } from '../../services/supabase';
import { useTheme } from '../../context/ThemeContext';
import logoImg from '../../images/logo.png';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const { theme, toggleTheme, isDesktopMode, toggleDesktopMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'analytics' | 'bookings' | 'rooms' | 'customers' | 'messages' | 'database'>('analytics');
  
  // Data states
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<HotelStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Booking filters
  const [bookingFilter, setBookingFilter] = useState<'All' | 'Pending Payment Verification' | 'Payment Verified' | 'Confirmed' | 'Rejected'>('All');

  // Room editing modal/form
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [newRoomNumber, setNewRoomNumber] = useState('');
  const [newRoomType, setNewRoomType] = useState<RoomType>('Standard Room');
  const [newRoomPrice, setNewRoomPrice] = useState(30000);
  const [newRoomCapacity, setNewRoomCapacity] = useState(2);
  const [newRoomFloor, setNewRoomFloor] = useState(1);

  // Supabase Configuration Form state
  const [supabaseUrl, setSupabaseUrl] = useState(localStorage.getItem('mnp_supabase_url') || '');
  const [supabaseKey, setSupabaseKey] = useState(localStorage.getItem('mnp_supabase_anon_key') || '');
  const [savedConfigMsg, setSavedConfigMsg] = useState(false);

  // Reload data
  const loadData = async () => {
    setLoading(true);
    const [r, b, m, s] = await Promise.all([
      HotelDB.getRooms(),
      HotelDB.getBookings(),
      HotelDB.getContacts(),
      HotelDB.getStats(),
    ]);
    setRooms(r);
    setBookings(b);
    setMessages(m);
    setStats(s);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Booking Status Actions
  const handleUpdateBookingStatus = async (bookingId: string, status: Booking['status']) => {
    await HotelDB.updateBookingStatus(bookingId, status);
    await loadData();
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (confirm('Are you sure you want to delete this reservation record?')) {
      await HotelDB.deleteBooking(bookingId);
      await loadData();
    }
  };

  // Room Actions
  const handleToggleRoomAvailability = async (roomId: string, current: boolean) => {
    await HotelDB.updateRoom(roomId, { isAvailable: !current });
    await loadData();
  };

  const handleSaveRoomPrice = async (roomId: string, price: number) => {
    await HotelDB.updateRoom(roomId, { pricePerNight: price });
    setEditingRoom(null);
    await loadData();
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (confirm('Are you sure you want to delete this room?')) {
      await HotelDB.deleteRoom(roomId);
      await loadData();
    }
  };

  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomNumber) return;

    const newRoom: Room = {
      id: `room-${newRoomNumber}`,
      roomNumber: newRoomNumber,
      roomType: newRoomType,
      capacity: newRoomCapacity,
      bedType: 'King Bed',
      pricePerNight: Number(newRoomPrice),
      amenities: ['High-Speed WiFi', 'Ensuite Marble Bathroom', 'Air Conditioning', 'Smart 55" TV', '24/7 Room Service'],
      description: `Newly commissioned ${newRoomType} featuring luxury furnishings and prime floor ${newRoomFloor} aspect.`,
      imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      isAvailable: true,
      sizeSqM: 35,
      floor: newRoomFloor,
    };

    await HotelDB.createRoom(newRoom);
    setIsAddingRoom(false);
    setNewRoomNumber('');
    await loadData();
  };

  // Contact Message Actions
  const handleUpdateContactStatus = async (msgId: string, status: ContactMessage['status']) => {
    await HotelDB.updateContactStatus(msgId, status);
    await loadData();
  };

  const handleDeleteContact = async (msgId: string) => {
    if (confirm('Delete this contact message?')) {
      await HotelDB.deleteContact(msgId);
      await loadData();
    }
  };

  // Reset demo data
  const handleResetData = () => {
    if (confirm('Reset hotel database back to default 50 rooms and sample records?')) {
      HotelDB.resetToInitialData();
      loadData();
    }
  };

  // Save Supabase credentials
  const handleSaveSupabaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('mnp_supabase_url', supabaseUrl.trim());
    localStorage.setItem('mnp_supabase_anon_key', supabaseKey.trim());
    setSavedConfigMsg(true);
    setTimeout(() => setSavedConfigMsg(false), 3000);
  };

  // Customers calculation
  const customers = React.useMemo(() => {
    const map = new Map<string, { name: string; email: string; phone: string; address: string; totalSpend: number; bookingsCount: number }>();
    bookings.forEach((b) => {
      const key = b.guestEmail.toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          name: b.guestName,
          email: b.guestEmail,
          phone: b.guestPhone,
          address: b.guestAddress,
          totalSpend: b.status === 'Payment Verified' || b.status === 'Confirmed' ? b.totalAmount : 0,
          bookingsCount: 1,
        });
      } else {
        const existing = map.get(key)!;
        existing.bookingsCount += 1;
        if (b.status === 'Payment Verified' || b.status === 'Confirmed') {
          existing.totalSpend += b.totalAmount;
        }
      }
    });
    return Array.from(map.values());
  }, [bookings]);

  // Filtered bookings
  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter === 'All') return true;
    return b.status === bookingFilter;
  });

  return (
    <div className={`pt-24 pb-32 min-h-screen transition-colors duration-300 ${
      theme === 'light' ? 'bg-[#f7f6f2] text-neutral-900' : 'bg-[#080808] text-neutral-100'
    }`}>
      {/* Top Bar / Brand Lockup */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b ${
        theme === 'light' ? 'border-neutral-200' : 'border-neutral-900'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="White Heart In't Hotel"
              className="w-10 h-10 object-contain rounded-full border border-amber-500/40 bg-neutral-950 p-1 shadow-md"
            />
            <div>
              <h1 className={`font-display text-xl sm:text-2xl font-bold flex items-center gap-2 ${
                theme === 'light' ? 'text-neutral-900' : 'text-neutral-100'
              }`}>
                <span>White Heart In&apos;t Hotel</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/40">
                  STAFF DASHBOARD
                </span>
              </h1>
              <p className={`text-xs ${theme === 'light' ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Central Operations, Bookings Management & Supabase Control Hub
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Theme & Desktop Mode Controls - Desktop toggle located ONLY beside dark mode toggle */}
            <div className={`flex items-center gap-1.5 p-1 rounded-lg border shadow-sm ${
              theme === 'light'
                ? 'bg-neutral-100 border-neutral-300'
                : 'bg-neutral-900/90 border-neutral-800'
            }`}>
              {/* Dark / Light Mode Toggle */}
              <button
                onClick={toggleTheme}
                type="button"
                className={`px-3 py-2 rounded-md flex items-center gap-1.5 text-xs font-medium transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'text-amber-300 hover:text-amber-200 hover:bg-neutral-800'
                    : 'text-amber-900 bg-white hover:bg-amber-50 shadow-xs'
                }`}
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                aria-label="Toggle dark/light mode"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="hidden sm:inline">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-amber-600" />
                    <span className="hidden sm:inline">Dark</span>
                  </>
                )}
              </button>

              {/* Desktop Mode Toggle - located ONLY beside the user's dark mode icon */}
              <button
                onClick={toggleDesktopMode}
                type="button"
                className={`px-3 py-2 rounded-md flex items-center gap-1.5 text-xs font-medium transition-all cursor-pointer ${
                  isDesktopMode
                    ? 'text-amber-500 bg-amber-500/15 border border-amber-500/40 shadow-xs font-semibold'
                    : theme === 'light'
                    ? 'text-neutral-600 hover:text-neutral-900 hover:bg-white'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                }`}
                title={`Desktop View is ${isDesktopMode ? 'Enabled (Default)' : 'Disabled'}. Click to toggle.`}
                aria-label="Toggle Desktop Mode"
              >
                {isDesktopMode ? (
                  <>
                    <Monitor className="w-4 h-4 text-amber-500" />
                    <span className="font-semibold">Desktop</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-4 h-4 text-neutral-400" />
                    <span>Mobile</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleResetData}
              className={`px-3.5 py-2.5 rounded-lg border text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
                theme === 'light'
                  ? 'border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700'
                  : 'border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300'
              }`}
              title="Reset rooms and sample bookings to original"
            >
              <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">Reset Data</span>
            </button>
            <button
              onClick={onBackToSite}
              className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider cursor-pointer active:scale-95 transition-all shadow-md"
            >
              Return to Website
            </button>
          </div>
        </div>

        {/* Navigation Tabs with 48px min touch targets */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-850">
          {[
            { id: 'analytics' as const, label: 'Booking Analytics', icon: BarChart3 },
            { id: 'bookings' as const, label: `Bookings (${bookings.length})`, icon: CalendarCheck },
            { id: 'rooms' as const, label: `Manage Rooms (${rooms.length})`, icon: Layers },
            { id: 'customers' as const, label: `Guests (${customers.length})`, icon: Users },
            { id: 'messages' as const, label: `Inquiries (${messages.length})`, icon: Mail },
            { id: 'database' as const, label: 'Supabase Backend', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[48px] px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* 1. ANALYTICS TAB */}
        {activeTab === 'analytics' && stats && (
          <div className="space-y-8 animate-fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="luxury-card p-6 rounded-xl border border-amber-500/20 bg-neutral-900/80">
                <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider">
                  Verified Total Revenue
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-300 mt-2">
                  ₦{stats.totalRevenueNaira.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <span>✓ Strict 0% Tax / 0% VAT Policy</span>
                </div>
              </div>

              <div className="luxury-card p-6 rounded-xl border border-amber-500/20 bg-neutral-900/80">
                <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider">
                  Pending Verification
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 mt-2">
                  {stats.pendingVerifications}
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">
                  Requires receptionist OPay checking
                </div>
              </div>

              <div className="luxury-card p-6 rounded-xl border border-amber-500/20 bg-neutral-900/80">
                <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider">
                  Rooms Available / Total
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white mt-2">
                  {stats.availableRooms} / {stats.totalRooms}
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">
                  {Math.round(((stats.totalRooms - stats.availableRooms) / stats.totalRooms) * 100)}% Current Occupancy
                </div>
              </div>

              <div className="luxury-card p-6 rounded-xl border border-amber-500/20 bg-neutral-900/80">
                <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider">
                  Total Bookings
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white mt-2">
                  {stats.totalBookings}
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">
                  {stats.verifiedBookings} Verified & Confirmed
                </div>
              </div>
            </div>

            {/* Quick Action Pending Notice */}
            {stats.pendingVerifications > 0 && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                  <div className="text-xs">
                    <strong className="text-amber-200 block">
                      {stats.pendingVerifications} Payment(s) Awaiting OPay Transfer Verification
                    </strong>
                    <span className="text-neutral-400">
                      Check your OPay Business account (9012758772) and click &quot;Verify Payment&quot; on matching reservations.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setBookingFilter('Pending Payment Verification');
                    setActiveTab('bookings');
                  }}
                  className="px-4 py-2 bg-amber-500 text-neutral-950 rounded text-xs font-bold whitespace-nowrap cursor-pointer hover:bg-amber-400"
                >
                  Review Payments
                </button>
              </div>
            )}

            {/* Room Breakdown Overview */}
            <div className="luxury-card p-6 rounded-xl border border-neutral-800 bg-neutral-900/60">
              <h3 className="font-display font-bold text-neutral-200 text-sm mb-4">
                Room Inventory by Tier
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  'Standard Room',
                  'Deluxe Room',
                  'Executive Room',
                  'Premium Deluxe Room',
                  'Family Suite',
                  'Business Suite',
                  'Presidential Suite',
                  'Royal Suite',
                ].map((type) => {
                  const count = rooms.filter((r) => r.roomType === type).length;
                  return (
                    <div key={type} className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg">
                      <div className="text-[11px] text-neutral-400 truncate">{type}</div>
                      <div className="text-lg font-mono font-bold text-amber-300 mt-1">{count} Suites</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 2. BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-fade-in">
            {/* Filter buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {[
                'All',
                'Pending Payment Verification',
                'Payment Verified',
                'Confirmed',
                'Rejected',
              ].map((f) => (
                <button
                  key={f}
                  onClick={() => setBookingFilter(f as any)}
                  className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                    bookingFilter === f
                      ? 'bg-amber-500 text-neutral-950 border-amber-400'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Bookings Table */}
            <div className="luxury-card rounded-xl border border-neutral-800 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-4">Reference</th>
                    <th className="p-4">Guest</th>
                    <th className="p-4">Room</th>
                    <th className="p-4">Dates / Nights</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-neutral-900/60 transition-colors">
                      <td className="p-4 font-mono font-bold text-amber-300">
                        {b.referenceNumber}
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-neutral-200">{b.guestName}</div>
                        <div className="text-neutral-400 text-[11px]">{b.guestPhone}</div>
                        <div className="text-neutral-500 text-[10px]">{b.guestEmail}</div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-neutral-200">{b.roomType}</span>
                        <span className="block font-mono text-neutral-400 text-[11px]">Room #{b.roomNumber}</span>
                      </td>
                      <td className="p-4 font-mono text-neutral-300">
                        <div>{b.checkInDate} &rarr; {b.checkOutDate}</div>
                        <div className="text-amber-400/80 text-[10px]">{b.numberOfNights} Nights · {b.numberOfGuests} Guests</div>
                      </td>
                      <td className="p-4 font-mono font-bold text-amber-300">
                        ₦{b.totalAmount.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            b.status === 'Payment Verified' || b.status === 'Confirmed'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : b.status === 'Pending Payment Verification'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-1 whitespace-nowrap">
                        {b.status === 'Pending Payment Verification' && (
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, 'Payment Verified')}
                            className="px-2.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase cursor-pointer"
                            title="Verify OPay Payment"
                          >
                            Verify Payment
                          </button>
                        )}
                        {b.status !== 'Confirmed' && (
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, 'Confirmed')}
                            className="px-2 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-emerald-300 text-[10px] cursor-pointer"
                            title="Approve Reservation"
                          >
                            Approve
                          </button>
                        )}
                        {b.status !== 'Rejected' && (
                          <button
                            onClick={() => handleUpdateBookingStatus(b.id, 'Rejected')}
                            className="px-2 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-rose-300 text-[10px] cursor-pointer"
                            title="Reject Reservation"
                          >
                            Reject
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteBooking(b.id)}
                          className="p-1.5 text-neutral-500 hover:text-rose-400 rounded cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. MANAGE ROOMS TAB */}
        {activeTab === 'rooms' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-neutral-200 text-base">
                  All 50 Hotel Suites & Quarters
                </h3>
                <p className="text-xs text-neutral-400">
                  Manage live prices, toggle availability, add rooms, and assign suites.
                </p>
              </div>

              <button
                onClick={() => setIsAddingRoom(!isAddingRoom)}
                className="min-h-[44px] px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Suite</span>
              </button>
            </div>

            {/* Add Room Drawer/Form */}
            {isAddingRoom && (
              <form onSubmit={handleAddRoom} className="p-6 rounded-xl bg-neutral-900 border border-amber-500/30 space-y-4">
                <h4 className="font-display text-sm font-bold text-amber-300">Commission New Room</h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-xs">
                  <div>
                    <label className="block text-neutral-300 mb-1">Room Number</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 703"
                      value={newRoomNumber}
                      onChange={(e) => setNewRoomNumber(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 p-2 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 mb-1">Room Type</label>
                    <select
                      value={newRoomType}
                      onChange={(e) => setNewRoomType(e.target.value as any)}
                      className="w-full bg-neutral-950 border border-neutral-700 p-2 rounded text-white"
                    >
                      <option value="Standard Room">Standard Room</option>
                      <option value="Deluxe Room">Deluxe Room</option>
                      <option value="Executive Room">Executive Room</option>
                      <option value="Premium Deluxe Room">Premium Deluxe Room</option>
                      <option value="Family Suite">Family Suite</option>
                      <option value="Business Suite">Business Suite</option>
                      <option value="Presidential Suite">Presidential Suite</option>
                      <option value="Royal Suite">Royal Suite</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-neutral-300 mb-1">Price Per Night (₦)</label>
                    <input
                      type="number"
                      required
                      value={newRoomPrice}
                      onChange={(e) => setNewRoomPrice(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-700 p-2 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 mb-1">Floor (1-7)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={7}
                      value={newRoomFloor}
                      onChange={(e) => setNewRoomFloor(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-700 p-2 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 mb-1">Capacity</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={10}
                      value={newRoomCapacity}
                      onChange={(e) => setNewRoomCapacity(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-700 p-2 rounded text-white"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded">
                    Save Room
                  </button>
                  <button type="button" onClick={() => setIsAddingRoom(false)} className="px-4 py-2 bg-neutral-800 text-neutral-300 text-xs rounded">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Rooms Table */}
            <div className="luxury-card rounded-xl border border-neutral-800 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-4">Room #</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Floor</th>
                    <th className="p-4">Price / Night (₦)</th>
                    <th className="p-4">Capacity</th>
                    <th className="p-4">Availability</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  {rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-neutral-900/60 transition-colors">
                      <td className="p-4 font-mono font-bold text-amber-300">
                        {room.roomNumber}
                        {['603', '604', '605'].includes(room.roomNumber) && (
                          <span className="ml-1.5 px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 text-[9px]">
                            OFFICIAL
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-neutral-200 font-medium">
                        {room.roomType}
                      </td>
                      <td className="p-4 font-mono text-neutral-400">
                        Floor {room.floor}
                      </td>
                      <td className="p-4 font-mono font-bold text-amber-300">
                        {editingRoom?.id === room.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              defaultValue={room.pricePerNight}
                              id={`price-${room.id}`}
                              className="w-24 bg-neutral-950 border border-neutral-700 px-2 py-1 rounded text-white"
                            />
                            <button
                              onClick={() => {
                                const input = document.getElementById(`price-${room.id}`) as HTMLInputElement;
                                if (input) handleSaveRoomPrice(room.id, Number(input.value));
                              }}
                              className="p-1 text-emerald-400 hover:text-white"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <span>₦{room.pricePerNight.toLocaleString()}</span>
                        )}
                      </td>
                      <td className="p-4 font-mono text-neutral-300">
                        {room.capacity} Guests
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleRoomAvailability(room.id, room.isAvailable)}
                          className={`px-2 py-1 rounded text-[10px] font-semibold uppercase cursor-pointer ${
                            room.isAvailable
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          }`}
                        >
                          {room.isAvailable ? 'Available' : 'Reserved'}
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingRoom(editingRoom?.id === room.id ? null : room)}
                          className="p-1.5 text-neutral-400 hover:text-amber-300 cursor-pointer"
                          title="Edit Price"
                        >
                          <Edit className="w-3.5 h-3.5 inline" />
                        </button>
                        <button
                          onClick={() => handleDeleteRoom(room.id)}
                          className="p-1.5 text-neutral-500 hover:text-rose-400 cursor-pointer"
                          title="Delete Room"
                        >
                          <Trash2 className="w-3.5 h-3.5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. CUSTOMERS TAB */}
        {activeTab === 'customers' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-display font-bold text-neutral-200 text-base">
                Guest Directory
              </h3>
              <p className="text-xs text-neutral-400">
                Directory of patrons who have reserved suites at White Heart In&apos;t Hotel.
              </p>
            </div>

            <div className="luxury-card rounded-xl border border-neutral-800 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-4">Guest Name</th>
                    <th className="p-4">Contact Phone</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Address</th>
                    <th className="p-4">Bookings</th>
                    <th className="p-4">Total Spent (₦)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900">
                  {customers.map((c) => (
                    <tr key={c.email} className="hover:bg-neutral-900/60 transition-colors">
                      <td className="p-4 font-semibold text-neutral-100">
                        {c.name}
                      </td>
                      <td className="p-4 font-mono text-neutral-300">
                        <a href={`tel:${c.phone}`} className="hover:text-amber-300">{c.phone}</a>
                      </td>
                      <td className="p-4 text-neutral-400 font-mono">
                        {c.email}
                      </td>
                      <td className="p-4 text-neutral-400">
                        {c.address}
                      </td>
                      <td className="p-4 font-mono text-neutral-300">
                        {c.bookingsCount} Stays
                      </td>
                      <td className="p-4 font-mono font-bold text-amber-300">
                        ₦{c.totalSpend.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. CONTACT MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-display font-bold text-neutral-200 text-base">
                Official Inquiries & Messages
              </h3>
              <p className="text-xs text-neutral-400">
                Messages submitted via the Contact Us page and Concierge portal.
              </p>
            </div>

            <div className="space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="luxury-card p-6 rounded-xl border border-neutral-800 bg-neutral-900/70 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="font-semibold text-neutral-100 text-sm">{m.name}</div>
                      <div className="text-neutral-400 text-xs flex items-center gap-3 mt-0.5">
                        <span className="font-mono">{m.email}</span>
                        {m.phone && <span className="font-mono">{m.phone}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          m.status === 'Unread'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}
                      >
                        {m.status}
                      </span>
                      <button
                        onClick={() => handleUpdateContactStatus(m.id, m.status === 'Read' ? 'Replied' : 'Read')}
                        className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 rounded cursor-pointer"
                      >
                        {m.status === 'Read' ? 'Mark Replied' : 'Mark Read'}
                      </button>
                      <button
                        onClick={() => handleDeleteContact(m.id)}
                        className="p-1 text-neutral-500 hover:text-rose-400 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="font-medium text-amber-300 text-xs">{m.subject}</div>
                  <p className="text-neutral-300 text-xs leading-relaxed bg-black/40 p-3 rounded-lg border border-neutral-850">
                    {m.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. SUPABASE BACKEND TAB */}
        {activeTab === 'database' && (
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <div className="luxury-card p-6 rounded-xl border border-amber-500/30 bg-neutral-900/70 space-y-4">
              <div className="flex items-center gap-2 text-amber-300 font-display font-semibold text-base">
                <Database className="w-5 h-5 text-amber-400" />
                <span>Supabase Cloud Database Synchronization</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                White Heart In&apos;t Hotel supports live sync with your Supabase project tables (<code>rooms</code>, <code>bookings</code>, <code>contacts</code>). If Supabase credentials are not provided, the system seamlessly operates on browser persistent local storage with zero loss of functionality.
              </p>

              <form onSubmit={handleSaveSupabaseConfig} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Supabase Project URL (VITE_SUPABASE_URL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://xyzcompany.supabase.co"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Supabase Anon Key (VITE_SUPABASE_ANON_KEY)
                  </label>
                  <input
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider cursor-pointer active:scale-95 transition-all shadow"
                  >
                    Save & Connect Supabase
                  </button>

                  {savedConfigMsg && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                      <Check className="w-4 h-4" /> Saved! Reconnecting...
                    </span>
                  )}
                </div>
              </form>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 space-y-2">
              <div className="text-neutral-200 font-semibold">Active Database Schema:</div>
              <ul className="list-disc pl-5 space-y-1 font-mono text-[11px]">
                <li><code>rooms</code>: 50 records (id, roomNumber, roomType, pricePerNight, capacity, amenities...)</li>
                <li><code>bookings</code>: records with status, guest contact, check-in, check-out, OPay settlement</li>
                <li><code>contacts</code>: guest inquiries from the contact form</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
