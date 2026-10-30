import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Sparkles, Sun, Moon, Monitor, Smartphone } from 'lucide-react';
import logoImg from '../../images/logo.png';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  currentPage: 'home' | 'rooms' | 'contact' | 'admin';
  onNavigate: (page: 'home' | 'rooms' | 'contact' | 'admin') => void;
  onOpenBookingModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBookingModal,
}) => {
  const { theme, toggleTheme, isDesktopMode, toggleDesktopMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' as const },
    { label: 'Rooms & Suites', id: 'rooms' as const },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Location', href: '#location' },
    { label: 'Contact Us', id: 'contact' as const },
  ];

  const handleNavClick = (item: { label: string; id?: 'home' | 'rooms' | 'contact' | 'admin'; href?: string }) => {
    setIsMobileMenuOpen(false);
    if (item.id) {
      onNavigate(item.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.href) {
      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const el = document.querySelector(item.href!);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.querySelector(item.href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === 'light'
            ? 'bg-white/95 backdrop-blur-md border-b border-amber-500/25 py-2 shadow-lg shadow-black/5'
            : 'bg-[#080808]/95 backdrop-blur-md border-b border-amber-500/20 py-2 shadow-2xl shadow-black/80'
          : theme === 'light'
          ? 'bg-gradient-to-b from-white/95 via-white/80 to-transparent py-3 sm:py-4 border-b border-amber-500/15'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-8 h-14 sm:h-16">
          {/* Zone 1: Brand Logo & Wordmark */}
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 sm:gap-3 text-left group cursor-pointer focus:outline-none p-1 -ml-1 rounded-lg shrink-0"
            aria-label="White Heart In't Hotel Home"
          >
            <img
              src={logoImg}
              alt="White Heart In't Hotel Logo"
              className="h-9 w-9 sm:h-11 sm:w-11 object-contain rounded-full border border-amber-500/40 bg-neutral-950 p-1 shadow-md shadow-black/40 group-hover:border-amber-400 transition-colors shrink-0"
            />
            <span
              className={`font-display text-xs xs:text-sm sm:text-base lg:text-xl font-bold tracking-wider transition-colors whitespace-nowrap ${
                theme === 'light' ? 'text-neutral-900 group-hover:text-amber-800' : 'text-amber-100 group-hover:text-amber-300'
              }`}
            >
              WHITE HEART IN&apos;T HOTEL
            </span>
          </button>

          {/* Zone 2: Concise nav links with generous 48px+ touch targets */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = item.id && currentPage === item.id;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`min-h-[48px] min-w-[44px] px-3.5 py-2.5 flex items-center justify-center text-sm font-medium tracking-wide transition-all rounded-md cursor-pointer whitespace-nowrap relative ${
                    isActive
                      ? theme === 'light'
                        ? 'text-amber-900 font-bold'
                        : 'text-amber-300 font-semibold'
                      : theme === 'light'
                      ? 'text-neutral-700 hover:text-amber-900 hover:bg-black/[0.04]'
                      : 'text-neutral-300 hover:text-amber-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Quick Reception Dial + Dark/Light Theme Toggle + Desktop Mode Toggle */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Quick Reception Dial Indicator */}
            <a
              href="tel:08082187715"
              className={`min-h-[44px] px-3.5 py-2 flex items-center gap-2 text-xs rounded-full border transition-all ${
                theme === 'light'
                  ? 'text-neutral-900 hover:text-amber-900 bg-amber-500/10 border-amber-500/30 hover:border-amber-500/60'
                  : 'text-neutral-300 hover:text-amber-300 bg-neutral-900/60 border-amber-500/20 hover:border-amber-400/40'
              }`}
              title="Call White Heart Hotel Reception 24/7: 0808 218 7715"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-mono text-xs font-semibold">0808 218 7715</span>
            </a>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`min-h-[44px] min-w-[44px] p-2.5 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200 shadow-xs'
                  : 'bg-neutral-900/80 text-amber-400 border-amber-500/30 hover:border-amber-400/60 hover:bg-neutral-800'
              }`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle dark/light mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-amber-700 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Desktop Mode Toggle Button beside dark mode icon */}
            <button
              onClick={toggleDesktopMode}
              className={`min-h-[44px] min-w-[44px] p-2.5 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                isDesktopMode
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/60 font-semibold'
                  : theme === 'light'
                  ? 'bg-neutral-100 text-neutral-600 border-neutral-300 hover:bg-neutral-200'
                  : 'bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-neutral-200'
              }`}
              title={isDesktopMode ? 'Desktop Mode is Active. Click for Responsive View.' : 'Switch to Desktop Mode'}
              aria-label="Toggle Desktop Mode"
            >
              {isDesktopMode ? (
                <Monitor className="w-4 h-4 text-amber-500" />
              ) : (
                <Smartphone className="w-4 h-4 text-neutral-400" />
              )}
            </button>
          </div>

          {/* Mobile & Tablet Header Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            <a
              href="tel:08082187715"
              className={`min-h-[40px] px-2.5 sm:px-3 py-1.5 text-xs font-mono font-medium rounded-lg border flex items-center gap-1.5 transition-all ${
                theme === 'light'
                  ? 'text-amber-900 bg-amber-50 border-amber-300 hover:bg-amber-100'
                  : 'text-amber-300 bg-neutral-900/80 border-amber-500/30 hover:border-amber-400/50'
              }`}
              title="Call 0808 218 7715"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="hidden xs:inline sm:inline">0808 218 7715</span>
            </a>

            {/* Dark / Light Mode Toggle next to phone number */}
            <button
              onClick={toggleTheme}
              className={`min-h-[40px] min-w-[40px] p-2 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200 shadow-xs'
                  : 'bg-neutral-900/80 text-amber-400 border-amber-500/30 hover:border-amber-400/60 hover:bg-neutral-800'
              }`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle dark/light mode"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-amber-700" />
              )}
            </button>

            {/* Desktop Mode Toggle beside dark mode icon */}
            <button
              onClick={toggleDesktopMode}
              className={`min-h-[40px] min-w-[40px] p-2 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                isDesktopMode
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/60 font-semibold'
                  : theme === 'light'
                  ? 'bg-neutral-100 text-neutral-600 border-neutral-300 hover:bg-neutral-200'
                  : 'bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:border-neutral-700'
              }`}
              title={isDesktopMode ? 'Desktop Mode Active' : 'Switch to Desktop Mode'}
              aria-label="Toggle Desktop Mode"
            >
              {isDesktopMode ? (
                <Monitor className="w-4 h-4 text-amber-500" />
              ) : (
                <Smartphone className="w-4 h-4 text-neutral-400" />
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`min-h-[40px] min-w-[40px] p-2 rounded-lg transition-colors flex items-center justify-center cursor-pointer ${
                theme === 'light'
                  ? 'text-neutral-800 hover:text-amber-800 hover:bg-amber-100/50'
                  : 'text-neutral-300 hover:text-amber-300 hover:bg-neutral-800/80'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with 48px+ touch targets & no overlapping z-index */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden fixed inset-x-0 top-[56px] sm:top-[64px] bottom-0 backdrop-blur-xl border-t z-50 overflow-y-auto px-5 sm:px-6 py-6 flex flex-col justify-between ${
            theme === 'light'
              ? 'bg-white/98 border-amber-500/30 text-neutral-900'
              : 'bg-[#080808]/98 border-amber-500/20 text-neutral-100'
          }`}
        >
          <div className="space-y-2">
            <div className={`flex items-center gap-3 px-4 py-2 border-b pb-3 mb-2 ${
              theme === 'light' ? 'border-neutral-200' : 'border-neutral-900'
            }`}>
              <img
                src={logoImg}
                alt="White Heart In't Hotel"
                className="h-10 w-10 object-contain rounded-full border border-amber-500/30 bg-black p-1 shrink-0"
              />
              <div>
                <div className={`font-display text-sm font-bold ${
                  theme === 'light' ? 'text-amber-900' : 'text-amber-200'
                }`}>
                  WHITE HEART IN&apos;T HOTEL
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">Opposite Ilorin Airport</div>
              </div>
            </div>
            {navItems.map((item) => {
              const isActive = item.id && currentPage === item.id;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`w-full min-h-[50px] px-5 py-3 rounded-lg text-left text-sm sm:text-base font-medium tracking-wide flex items-center justify-between transition-colors cursor-pointer ${
                    isActive
                      ? theme === 'light'
                        ? 'bg-amber-500/15 text-amber-900 font-bold border-l-2 border-amber-500'
                        : 'bg-amber-500/15 text-amber-300 font-semibold border-l-2 border-amber-400'
                      : theme === 'light'
                      ? 'text-neutral-700 hover:bg-neutral-100 hover:text-amber-900'
                      : 'text-neutral-200 hover:bg-neutral-800/60 hover:text-amber-200'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs text-amber-500 font-bold">ACTIVE</span>}
                </button>
              );
            })}
          </div>

          <div className="pt-6 space-y-4">
            <div className={`p-4 rounded-lg border text-xs space-y-2 ${
              theme === 'light'
                ? 'bg-amber-50/70 border-amber-300/60 text-neutral-800'
                : 'bg-neutral-900/90 border-amber-500/20 text-neutral-300'
            }`}>
              <div className="text-amber-600 font-semibold">24/7 Concierge & Reception</div>
              <a href="tel:08082187715" className="text-amber-500 font-mono font-bold block text-sm hover:underline">
                0808 218 7715
              </a>
              <div className="text-neutral-500 text-[11px]">
                Block IX, Federal Airport Authority Site, Egbejila Road (Opposite Airport), Ilorin
              </div>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenBookingModal) {
                  onOpenBookingModal();
                } else {
                  onNavigate('rooms');
                }
              }}
              className="w-full min-h-[50px] py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold uppercase tracking-wider text-xs sm:text-sm rounded-md shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-neutral-950" />
              <span>RESERVE A ROOM NOW</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
