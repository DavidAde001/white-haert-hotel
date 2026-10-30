import React from 'react';
import { motion } from 'motion/react';
import {
  Wifi,
  UtensilsCrossed,
  Waves,
  Presentation,
  ShieldCheck,
  Clock,
  Wind,
  ShieldAlert,
  Shirt,
  Plane,
  Sparkles,
  Play,
} from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import a1Img from '../../images/a1.png';
import a2Img from '../../images/a2.png';
import a3Img from '../../images/a3.png';
import poolAsset from '../../assets/images/luxury_hotel_pool_1791560725631.jpg';
import restaurantAsset from '../../assets/images/luxury_hotel_restaurant_1791560715600.jpg';

export const AmenitiesSection: React.FC = () => {
  const amenitiesList = [
    {
      name: 'Free High-Speed WiFi',
      description: 'Dedicated enterprise fiber-optic bandwidth across all 50 suites and common terraces.',
      icon: Wifi,
    },
    {
      name: 'Gourmet Restaurant',
      description: 'World-class culinary dining blending Nigerian delicacies and continental gastronomy.',
      icon: UtensilsCrossed,
    },
    {
      name: 'Swimming Pool',
      description: 'Olympic-style pool with private poolside teak cabanas and dusk cocktail service.',
      icon: Waves,
    },
    {
      name: 'Conference Hall',
      description: 'State-of-the-art audiovisual banquet and convention hall for up to 300 delegates.',
      icon: Presentation,
    },
    {
      name: 'Secure Parking',
      description: 'Expansive on-site access-controlled car park with 24/7 security patrol and valet.',
      icon: ShieldCheck,
    },
    {
      name: '24/7 Room Service',
      description: 'Round-the-clock bespoke dining delivered directly to your suite door.',
      icon: Clock,
    },
    {
      name: 'Air Conditioning',
      description: 'Whisper-quiet climate control systems individually tuned for every room.',
      icon: Wind,
    },
    {
      name: 'Security',
      description: 'Round-the-clock trained executive security guards, CCTV surveillance, and VIP protocol.',
      icon: ShieldAlert,
    },
    {
      name: 'Laundry Service',
      description: 'Same-day steam pressing, dry cleaning, and luxury garment care.',
      icon: Shirt,
    },
    {
      name: 'Airport Pickup',
      description: 'VIP chauffeur transfers to and from Ilorin International Airport in executive vehicles.',
      icon: Plane,
    },
  ];

  return (
    <section id="amenities" className="py-20 sm:py-28 lg:py-32 bg-[#0a0a0a] border-t border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full bg-amber-500/5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UNCOMPROMISED EXCELLENCE</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-neutral-100">
            World-Class <span className="text-gold-gradient">Amenities</span>
          </h2>
          <p className="text-neutral-400 text-xs sm:text-base leading-relaxed">
            Every convenience at White Heart In&apos;t Hotel is tailored for absolute discretion, effortless productivity, and supreme wellness.
          </p>
        </div>

        {/* Visual Showcase (First: Video a1.png, Second: Pool a2.png, Third: Gardens a3.png) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Card 1: First Video Showcase (a1.png) */}
          <div className="relative group rounded-xl overflow-hidden border border-amber-500/30 bg-neutral-900 min-h-[280px] sm:min-h-[300px] shadow-xl flex flex-col justify-end">
            <ImageWithFallback
              src={a1Img}
              alt="White Heart In't Hotel Video Walkthrough & Event Center"
              fallbackSrc={poolAsset}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              containerClassName="absolute inset-0 w-full h-full"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent flex flex-col justify-end p-5 sm:p-6 z-10">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[10px] font-mono uppercase tracking-wider mb-2 w-fit shadow-md">
                <Play className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                <span>Video Showcase</span>
              </div>
              <span className="text-amber-400 text-xs font-mono uppercase tracking-wider">Cinematic Tour</span>
              <h3 className="text-base sm:text-lg lg:text-xl font-display font-bold text-white mt-1">
                Visual Experience &amp; Walkthrough
              </h3>
              <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                Take a virtual tour through the royal reception, bespoke suites, and ultra-luxury hospitality spaces.
              </p>
            </div>
          </div>

          {/* Card 2: Second Image (Swimming Pool a2.png) */}
          <div className="relative group rounded-xl overflow-hidden border border-amber-500/30 bg-neutral-900 min-h-[280px] sm:min-h-[300px] shadow-xl flex flex-col justify-end">
            <ImageWithFallback
              src={a2Img}
              alt="White Heart In't Hotel Olympic Swimming Pool & Cabanas"
              fallbackSrc={poolAsset}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              containerClassName="absolute inset-0 w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent flex flex-col justify-end p-5 sm:p-6 z-10">
              <span className="text-amber-400 text-xs font-mono uppercase tracking-wider">Aquatic Sanctuary</span>
              <h3 className="text-base sm:text-lg lg:text-xl font-display font-bold text-white mt-1">
                Olympic Pool &amp; Teak Cabanas
              </h3>
              <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                Pristine waters illuminated under the evening stars, featuring poolside teak loungers and dusk cocktail service.
              </p>
            </div>
          </div>

          {/* Card 3: Third Image (Gardens & Terraces a3.png) */}
          <div className="relative group rounded-xl overflow-hidden border border-amber-500/30 bg-neutral-900 min-h-[280px] sm:min-h-[300px] shadow-xl flex flex-col justify-end md:col-span-2 lg:col-span-1">
            <ImageWithFallback
              src={a3Img}
              alt="White Heart In't Hotel Lush Gardens & Outdoor Terraces"
              fallbackSrc={restaurantAsset}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              containerClassName="absolute inset-0 w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent flex flex-col justify-end p-5 sm:p-6 z-10">
              <span className="text-amber-400 text-xs font-mono uppercase tracking-wider">Botanical Serenity</span>
              <h3 className="text-base sm:text-lg lg:text-xl font-display font-bold text-white mt-1">
                Lush Gardens &amp; Terraces
              </h3>
              <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                Manicured green grounds, tranquil outdoor walkways, and peaceful landscaped terraces opposite Ilorin Airport.
              </p>
            </div>
          </div>
        </div>

        {/* 10 Amenities Animated Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {amenitiesList.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="luxury-card p-5 rounded-xl border border-amber-500/10 hover:border-amber-500/40 bg-neutral-900/60 backdrop-blur-md flex flex-col justify-between group cursor-default"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors duration-300 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-neutral-100 text-sm mb-2 group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-amber-400/80 font-mono">
                  <span>INCLUDED</span>
                  <span>✓</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
