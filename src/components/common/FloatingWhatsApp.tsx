import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const FloatingWhatsApp: React.FC = () => {
  const { isDesktopMode } = useTheme();
  const [showTooltip, setShowTooltip] = useState(true);
  const phoneNumber = '2348082187715';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    "Hello White Heart In't Hotel Reception, I would like to inquire about booking a luxury suite or verify payment."
  )}`;

  return (
    <aside
      aria-label="WhatsApp Support"
      className={`fixed ${!isDesktopMode ? 'bottom-22 md:bottom-6' : 'bottom-6'} right-4 sm:right-6 z-40 flex items-center gap-3 transition-all duration-300`}
    >
      {/* Tooltip banner */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-neutral-900/95 text-neutral-100 border border-amber-500/30 px-3.5 py-2 rounded-full shadow-2xl backdrop-blur-md text-xs animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>Chat with White Heart Reception & Verify Payment</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-neutral-400 hover:text-white ml-1 p-0.5"
            aria-label="Dismiss WhatsApp tip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-emerald-400/40 relative group"
        aria-label="Contact White Heart In't Hotel on WhatsApp"
        title="Chat on WhatsApp: 0808 218 7715"
      >
        <MessageCircle className="w-7 h-7 fill-white/20" />
        <span className="sr-only">Contact Receptionist on WhatsApp</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-neutral-950 text-[10px] font-bold rounded-full flex items-center justify-center border border-black shadow">
          1
        </span>
      </a>
    </aside>
  );
};
