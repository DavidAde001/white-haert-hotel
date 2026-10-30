import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles, MapPin, Star } from 'lucide-react';
import logoImg from '../../images/logo.png';
import f1Image from '../../images/f1.jpg';
import lobbyFallbackAsset from '../../assets/images/luxury_hotel_lobby_1791560734422.jpg';

interface HeroSectionProps {
  onBookRoom: () => void;
  onContactUs: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookRoom,
  onContactUs,
}) => {
  const scrollToContent = () => {
    const el = document.getElementById('redefining-luxury');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[100svh] py-16 sm:py-20 overflow-hidden flex items-center justify-center">
      {/* Background with Slow Cinematic Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="w-full h-full"
        >
          <img
            src={f1Image}
            alt="White Heart In't Hotel Luxury Facade and Grounds"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = lobbyFallbackAsset;
            }}
            className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.05]"
          />
        </motion.div>

        {/* Multi-layered luxury dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/55 to-black/70 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-black/80 z-10" />
      </div>

      {/* Floating subtle ambient gold dust particles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-amber-500/5 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 25, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-amber-600/5 blur-3xl"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pt-16">
        {/* Official White Heart In't Hotel Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4"
        >
          <img
            src={logoImg}
            alt="White Heart In't Hotel Logo"
            className="h-20 w-20 sm:h-24 sm:w-24 object-contain rounded-full border-2 border-amber-400/60 bg-black/80 p-2 shadow-2xl shadow-amber-500/20 backdrop-blur-md"
          />
        </motion.div>

        {/* Star Rating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-1.5 mb-5 px-4 py-1.5 rounded-full border border-amber-500/30 bg-black/60 backdrop-blur-md shadow-lg shadow-black/50"
        >
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-[11px] uppercase tracking-widest text-amber-200 font-semibold ml-2">
            5-Star Luxury Destination
          </span>
        </motion.div>

        {/* Hotel Name Prominently Displayed */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-neutral-100 uppercase"
        >
          White Heart In&apos;t
          <span className="block text-gold-gradient text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl mt-1 sm:mt-2">
            Hotel
          </span>
        </motion.h1>

        {/* Location & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 flex items-center justify-center gap-1.5 sm:gap-2 text-neutral-300 text-xs sm:text-sm md:text-base font-light tracking-normal sm:tracking-wider px-2 text-center"
        >
          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Opposite Ilorin International Airport, Egbejila Road, Ilorin, Nigeria</span>
        </motion.div>

        {/* Value Proposition Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 text-neutral-300 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed font-light"
        >
          Welcome to White Heart In&apos;t Hotel — where royal prestige meets serene contemporary comfort. 
          Enjoy 50 luxurious suites, exquisite dining, an Olympic swimming pool, and immediate proximity to the airport.
        </motion.p>

        {/* Action Buttons: Book Room & Contact Us */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md"
        >
          <button
            onClick={onBookRoom}
            className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold uppercase tracking-widest text-xs sm:text-sm rounded-sm shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 active:scale-95 group"
          >
            <Sparkles className="w-4 h-4 text-neutral-950 group-hover:rotate-12 transition-transform" />
            <span>Book Room</span>
          </button>

          <button
            onClick={onContactUs}
            className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 bg-neutral-950/80 hover:bg-neutral-900 border border-amber-500/40 hover:border-amber-400 text-amber-200 font-semibold uppercase tracking-widest text-xs sm:text-sm rounded-sm backdrop-blur-md transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Contact Us</span>
          </button>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.2, duration: 0.8 }, y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-neutral-400 hover:text-amber-300 transition-colors cursor-pointer group"
        aria-label="Scroll to discover"
      >
        <span className="text-[10px] tracking-widest uppercase font-mono text-amber-400/80">
          Discover
        </span>
        <ChevronDown className="w-5 h-5 text-amber-400 group-hover:translate-y-1 transition-transform" />
      </motion.button>
    </section>
  );
};
