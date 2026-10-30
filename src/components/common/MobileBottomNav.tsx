import React from 'react';
import { Home, BedDouble, Sparkles, PhoneCall } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface MobileBottomNavProps {
  currentPage: 'home' | 'rooms' | 'contact' | 'admin';
  onNavigate: (page: 'home' | 'rooms' | 'contact' | 'admin') => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
}) => {
  const { theme, isDesktopMode } = useTheme();

  // If Desktop Mode is forced ON, do not display mobile navigation bar
  if (isDesktopMode) {
    return null;
  }

  const handleNavClick = (target: 'home' | 'rooms' | 'amenities' | 'contact') => {
    if (target === 'home') {
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'rooms') {
      onNavigate('rooms');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'amenities') {
      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const el = document.getElementById('amenities');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById('amenities');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (target === 'contact') {
      onNavigate('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    {
      id: 'home' as const,
      label: 'Home',
      icon: Home,
      isActive: currentPage === 'home',
    },
    {
      id: 'rooms' as const,
      label: 'Rooms',
      icon: BedDouble,
      isActive: currentPage === 'rooms',
    },
    {
      id: 'amenities' as const,
      label: 'Amenities',
      icon: Sparkles,
      isActive: false,
    },
    {
      id: 'contact' as const,
      label: 'Contact Us',
      icon: PhoneCall,
      isActive: currentPage === 'contact',
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="mobile-only-bottom-nav md:hidden fixed bottom-3 inset-x-3 z-40 max-w-md mx-auto pointer-events-auto"
    >
      <div
        className={`backdrop-blur-xl border rounded-2xl p-1.5 shadow-[0_0_25px_rgba(212,175,55,0.3)] flex items-center justify-around transition-colors duration-300 ${
          theme === 'light'
            ? 'bg-white/95 border-amber-500/50 shadow-amber-900/10'
            : 'bg-[#0a0a0a]/92 border-amber-500/40 shadow-amber-500/25'
        }`}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.id)}
              className={`flex-1 min-h-[50px] py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer relative ${
                item.isActive
                  ? theme === 'light'
                    ? 'text-amber-900 font-bold bg-amber-500/15'
                    : 'text-amber-300 font-bold bg-amber-500/20'
                  : theme === 'light'
                  ? 'text-neutral-600 hover:text-amber-800 hover:bg-neutral-100'
                  : 'text-neutral-400 hover:text-amber-200 hover:bg-white/[0.04]'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform ${
                  item.isActive
                    ? theme === 'light'
                      ? 'scale-110 text-amber-700'
                      : 'scale-110 text-amber-300'
                    : theme === 'light'
                    ? 'text-neutral-500'
                    : 'text-neutral-400'
                }`}
              />
              <span className="text-[11px] font-medium tracking-wide whitespace-nowrap">
                {item.label}
              </span>
              {item.isActive && (
                <span className="absolute -bottom-0.5 w-6 h-0.5 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(212,175,55,1)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

