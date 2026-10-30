import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { Room } from '../../types/hotel';
import { ImageWithFallback } from '../common/ImageWithFallback';
import suiteAsset from '../../assets/images/luxury_hotel_suite_1791560704962.jpg';

interface FeaturedSuitesSectionProps {
  rooms: Room[];
  onSelectRoom: (room: Room) => void;
  onViewAllRooms: () => void;
}

export const FeaturedSuitesSection: React.FC<FeaturedSuitesSectionProps> = ({
  rooms,
  onSelectRoom,
  onViewAllRooms,
}) => {
  // Showcase Room 603, 604, 605, Presidential 501, Royal 701, Deluxe 105
  const featuredRoomNumbers = ['603', '604', '605', '501', '701', '105'];
  const featuredRooms = rooms.filter((r) => featuredRoomNumbers.includes(r.roomNumber));

  return (
    <section className="py-24 sm:py-32 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full bg-amber-500/5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE ROYAL COLLECTION</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-100">
              Featured <span className="text-gold-gradient">Suites & Rooms</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Explore our signature accommodations, including our coveted Sixth-Floor Executive Quarters and Seventh-Floor Penthouse Sovereignty.
            </p>
          </div>

          <button
            onClick={onViewAllRooms}
            className="self-start md:self-auto min-h-[48px] px-6 py-3 rounded-sm border border-amber-500/40 hover:border-amber-400 bg-neutral-900 hover:bg-neutral-800 text-amber-300 text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer group"
          >
            <span>Explore All 50 Rooms</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Suites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <div
              key={room.id}
              className="luxury-card rounded-xl overflow-hidden flex flex-col justify-between group border border-amber-500/20 hover:border-amber-500/40"
            >
              <div>
                {/* Image Container with Fallback */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <ImageWithFallback
                    src={room.imageUrl}
                    alt={`${room.roomType} Room ${room.roomNumber}`}
                    fallbackSrc={suiteAsset}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-amber-500/30 px-3 py-1 rounded text-xs font-mono font-bold text-amber-300">
                    Room {room.roomNumber}
                  </div>
                  <div className="absolute top-3 right-3 bg-amber-500/90 text-neutral-950 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
                    {room.roomType}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800/80 pb-3">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>{room.capacity} Guests</span>
                    </span>
                    <span>Floor {room.floor}</span>
                    <span>{room.bedType}</span>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                    {room.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {room.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="text-[11px] text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Book Action */}
              <div className="p-6 pt-0 mt-4 border-t border-neutral-800/60 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
                    Per Night
                  </span>
                  <span className="font-mono text-lg font-bold text-amber-300">
                    ₦{room.pricePerNight.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => onSelectRoom(room)}
                  className="min-h-[44px] px-5 py-2.5 rounded bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer active:scale-95 shadow-md shadow-amber-500/10"
                >
                  Book Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
