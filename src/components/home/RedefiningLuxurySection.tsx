import React from 'react';
import { motion } from 'motion/react';
import { Award, Compass, KeyRound, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import f2Image from '../../images/f2.jpg';
import suiteAsset from '../../assets/images/luxury_hotel_suite_1791560704962.jpg';

interface RedefiningLuxurySectionProps {
  onExploreSuites: () => void;
}

export const RedefiningLuxurySection: React.FC<RedefiningLuxurySectionProps> = ({
  onExploreSuites,
}) => {
  const luxuryImage = f2Image;

  const highlights = [
    {
      icon: Award,
      title: '5-Star Benchmark',
      description: 'Engineered to international hospitality standards rivaling Four Seasons and Ritz-Carlton.',
    },
    {
      icon: KeyRound,
      title: '50 Bespoke Suites',
      description: 'From Standard and Deluxe to Penthouse Royal Suites, each room is a secluded masterpiece.',
    },
    {
      icon: Compass,
      title: 'Prime Ilorin Haven',
      description: 'Nestled along Old Jebba Road, Basin Area, providing serene tranquility and swift airport access.',
    },
  ];

  return (
    <section id="redefining-luxury" className="py-24 sm:py-32 bg-[#080808] relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & Accolades */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full bg-amber-500/5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE SOVEREIGN STANDARD</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-100">
              Redefining Luxury in{' '}
              <span className="text-gold-gradient block mt-1">Nigeria</span>
            </h2>

            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
              White Heart In&apos;t Hotel was conceived to bring a new realm of refined luxury to Kwara State.
              Every architectural curve, custom chandelier, and hand-stitched linen reflects our relentless obsession with perfection.
            </p>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Whether you arrive for state affairs, diplomatic engagements, corporate symposia, or a weekend of serene privacy, our staff anticipates your desires before they are uttered.
            </p>

            {/* Feature Highlights Grid */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-neutral-800">
              {highlights.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.title} className="space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="font-display text-sm font-semibold text-neutral-100">
                      {item.title}
                    </div>
                    <p className="text-xs text-neutral-400 leading-snug">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <button
                onClick={onExploreSuites}
                className="min-h-[48px] px-7 py-3 rounded-sm border border-amber-500/50 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500 text-amber-200 hover:text-neutral-950 font-semibold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-lg shadow-black/40"
              >
                Explore All 50 Luxury Suites &rarr;
              </button>
            </div>
          </motion.div>

          {/* Right Column: Required Luxury Image with Hover Animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            {/* Framed luxury container */}
            <div className="relative group rounded-xl overflow-hidden border border-amber-500/30 p-2 bg-gradient-to-br from-amber-500/10 via-neutral-950 to-black shadow-2xl shadow-black/80">
              <div className="overflow-hidden rounded-lg relative aspect-[4/3] bg-neutral-900">
                <ImageWithFallback
                  src={luxuryImage}
                  alt="Redefining Luxury in Nigeria - White Heart In't Hotel"
                  fallbackSrc={suiteAsset}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  containerClassName="w-full h-full"
                />

                {/* Subtle dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                {/* Floating caption badge */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-3 sm:p-4 rounded-lg bg-black/85 backdrop-blur-md border border-amber-500/30 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold truncate">
                      White Heart In&apos;t Hotel
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-neutral-400 truncate">
                      Opposite Ilorin International Airport, Egbejila Road
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] sm:text-xs font-mono text-amber-400 font-bold whitespace-nowrap">5-STAR RATED</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Geometric golden accent corner */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-amber-400/40 pointer-events-none rounded-br-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-amber-400/40 pointer-events-none rounded-tl-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
