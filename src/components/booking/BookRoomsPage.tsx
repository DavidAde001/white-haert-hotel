import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Users,
  Bed,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowUpDown,
  Building,
} from 'lucide-react';
import { Room, RoomType } from '../../types/hotel';
import { ImageWithFallback } from '../common/ImageWithFallback';
import suiteAsset from '../../assets/images/luxury_hotel_suite_1791560704962.jpg';

interface BookRoomsPageProps {
  rooms: Room[];
  onSelectRoom: (room: Room) => void;
}

const ROOM_CATEGORIES: (RoomType | 'All')[] = [
  'All',
  'Standard Room',
  'Deluxe Room',
  'Executive Room',
  'Premium Deluxe Room',
  'Family Suite',
  'Business Suite',
  'Presidential Suite',
  'Royal Suite',
];

export const BookRoomsPage: React.FC<BookRoomsPageProps> = ({
  rooms,
  onSelectRoom,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<RoomType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'floor'>('price-asc');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Filter logic
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      // Category match
      if (selectedCategory !== 'All' && room.roomType !== selectedCategory) {
        return false;
      }
      // Capacity match
      if (selectedCapacity !== 'all' && room.capacity < selectedCapacity) {
        return false;
      }
      // Availability
      if (onlyAvailable && !room.isAvailable) {
        return false;
      }
      // Search query (room number, type, amenity, description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchNumber = room.roomNumber.toLowerCase().includes(query);
        const matchType = room.roomType.toLowerCase().includes(query);
        const matchAmenity = room.amenities.some((a) => a.toLowerCase().includes(query));
        const matchDesc = room.description.toLowerCase().includes(query);
        if (!matchNumber && !matchType && !matchAmenity && !matchDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
      if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
      if (sortBy === 'floor') return a.floor - b.floor;
      return 0;
    });
  }, [rooms, selectedCategory, searchQuery, selectedCapacity, sortBy, onlyAvailable]);

  return (
    <div className="pt-24 pb-32 bg-[#080808] min-h-screen">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-neutral-900">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full bg-amber-500/5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>50 BESPOKE SANCTUARIES</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-100">
            Book Your <span className="text-gold-gradient">Luxury Suite</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Select from our 50 masterfully designed rooms and suites. All reservations feature guaranteed lowest rates in Nigerian Naira (₦) with zero added tax or hidden fees.
          </p>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by room # (e.g. 603) or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-[46px] bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-lg pl-10 pr-4 text-xs text-neutral-100 focus:outline-none"
            />
          </div>

          {/* Capacity Selector */}
          <div>
            <select
              value={selectedCapacity}
              onChange={(e) => setSelectedCapacity(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              aria-label="Filter by guest capacity"
              className="w-full min-h-[46px] bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-lg px-4 text-xs text-neutral-200 focus:outline-none"
            >
              <option value="all">Any Guest Capacity</option>
              <option value={2}>2+ Guests</option>
              <option value={3}>3+ Guests</option>
              <option value={4}>4+ Guests</option>
              <option value={5}>5+ Guests</option>
              <option value={6}>6 Guests (Royal Penthouses)</option>
            </select>
          </div>

          {/* Sort By Selector */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort suites by price or floor"
              className="w-full min-h-[46px] bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-lg px-4 text-xs text-neutral-200 focus:outline-none"
            >
              <option value="price-asc">Sort: Price (Lowest to Highest)</option>
              <option value="price-desc">Sort: Price (Highest to Lowest)</option>
              <option value="floor">Sort: Hotel Floor (1 to 7)</option>
            </select>
          </div>

          {/* Only Available Toggle */}
          <label className="flex items-center gap-3 px-4 min-h-[46px] bg-neutral-900 border border-neutral-800 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded"
            />
            <span className="text-xs text-neutral-300 font-medium select-none">
              Only Available Rooms
            </span>
          </label>
        </div>

        {/* Category Horizontal Filter Tabs with 48px min touch targets */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {ROOM_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[48px] px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center justify-center shrink-0 border ${
                  isSelected
                    ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-neutral-900/80 text-neutral-400 hover:text-white border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <span>{cat === 'All' ? 'All 50 Rooms' : cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rooms Catalog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-8 font-mono">
          <span>Showing {filteredRooms.length} of {rooms.length} suites</span>
          {selectedCategory !== 'All' && <span>Category: {selectedCategory}</span>}
        </div>

        {filteredRooms.length === 0 ? (
          <div className="text-center py-24 bg-neutral-900/30 rounded-2xl border border-neutral-800">
            <Building className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
            <h3 className="text-lg font-display text-neutral-200">No Suites Match Your Filter</h3>
            <p className="text-neutral-500 text-xs mt-1">Try resetting the category or search keywords.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSelectedCapacity('all');
                setOnlyAvailable(false);
              }}
              className="mt-4 px-4 py-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs rounded font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="luxury-card rounded-xl overflow-hidden flex flex-col justify-between group border border-amber-500/20 hover:border-amber-500/50 bg-[#0d0d0d]"
              >
                <div>
                  {/* Image with Tag & Availability */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <ImageWithFallback
                      src={room.imageUrl}
                      alt={`${room.roomType} Room ${room.roomNumber}`}
                      fallbackSrc={suiteAsset}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      containerClassName="w-full h-full"
                    />

                    {/* Room Number Badge */}
                    <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md border border-amber-500/40 px-3 py-1 rounded text-xs font-mono font-bold text-amber-300 shadow">
                      Room {room.roomNumber}
                    </div>

                    {/* Availability Tag */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md shadow bg-black/80">
                      {room.isAvailable ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Available</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-rose-400" />
                          <span className="text-rose-400">Reserved</span>
                        </>
                      )}
                    </div>

                    {/* Floor Label */}
                    <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-neutral-300 font-mono">
                      Floor {room.floor} · {room.sizeSqM} m²
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="text-[11px] font-mono text-amber-400 uppercase tracking-widest">
                        {room.roomType}
                      </div>
                      <h2 className="text-xl font-display font-bold text-neutral-100 mt-0.5">
                        {room.roomType} {room.roomNumber}
                      </h2>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-neutral-400 pb-2 border-b border-neutral-800">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        <span>{room.capacity} Guests</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-amber-400" />
                        <span>{room.bedType}</span>
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Amenities Tag Cloud */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {room.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="text-[11px] text-neutral-400 bg-neutral-900 border border-neutral-800/80 px-2 py-0.5 rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="p-6 pt-0 mt-4 border-t border-neutral-800/80 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase font-mono block">
                      Price Per Night
                    </span>
                    <span className="font-mono text-xl font-bold text-amber-300">
                      ₦{room.pricePerNight.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectRoom(room)}
                    disabled={!room.isAvailable}
                    className="min-h-[46px] px-6 py-2.5 rounded bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-amber-500/10"
                  >
                    {room.isAvailable ? 'Book Room' : 'Fully Booked'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
