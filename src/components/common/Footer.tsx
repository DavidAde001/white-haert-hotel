import React from 'react';
import { ArrowUp, MapPin, Phone, Mail, Clock, Shield, Instagram, Facebook } from 'lucide-react';
import logoImg from '../../images/logo.png';

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.86-4.49V8.58a8.28 8.28 0 0 0 4.84 1.55v-3.44h-.93z" />
  </svg>
);

interface FooterProps {
  onNavigate: (page: 'home' | 'rooms' | 'contact' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const googleTravelMapsUrl =
    'https://www.google.com/travel/search?q=white%20heart%20hotel&g2lb=4965990%2C72471280%2C72573224%2C72647020%2C72686036%2C72803964%2C72882230%2C73064764%2C121529350%2C121608706%2C121738283%2C121762713%2C121921501%2C121951222%2C121960737%2C122078727%2C122098606&hl=en-NG&gl=ng&cs=1&ssta=1&ts=CAESCgoCCAMKAggDEAAaHhIcEhQKBwjqDxAKGBkSBwjqDxAKGBoYATIECAAQACoHCgU6A05HTg&qs=CAEyE0Nnb0ludnVxaW9XSDY4c2FFQUU4CEIJEW54VNVSUMDqQgkRmmgXQnjt4DVaAggB&ap=KigKEgnxLWhVj9ggQBE-GrudMfwRQBISCTPk8JAp3SBAET4au-0GBBJAugEIb3ZlcnZpZXc&ictx=111';

  const socialLinks = [
    {
      name: 'Instagram',
      handle: '@white_heart_hotel_ilorin',
      url: 'https://www.instagram.com/white_heart_hotel_ilorin/',
      icon: Instagram,
    },
    {
      name: 'TikTok',
      handle: '@white_heart_hotel_ilorin',
      url: 'https://www.tiktok.com/@white_heart_hotel_ilorin',
      icon: TikTokIcon,
    },
    {
      name: 'Facebook',
      handle: 'White Heart Hotel',
      url: 'https://www.facebook.com/Whitehearthotel',
      icon: Facebook,
    },
  ];

  return (
    <footer className="bg-[#050505] border-t border-amber-500/20 text-neutral-300 relative z-20">
      {/* Top Banner / Statement with Social Links */}
      <div className="border-b border-neutral-900 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={logoImg}
              alt="White Heart In't Hotel Logo"
              className="h-14 w-14 object-contain rounded-full border border-amber-500/30 bg-black p-1 shrink-0 shadow-lg shadow-black/80"
            />
            <div>
              <div className="font-display text-2xl lg:text-3xl font-bold tracking-wider text-amber-200">
                WHITE HEART IN&apos;T HOTEL
              </div>
              <p className="text-neutral-400 text-sm mt-1">
                Quintessential 5-Star Sovereign Hospitality opposite Ilorin International Airport, Kwara State, Nigeria.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Social Media Quick Icons in Top Banner */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`White Heart In't Hotel on ${item.name}`}
                    title={`${item.name}: ${item.handle}`}
                    className="w-10 h-10 rounded-full border border-amber-500/30 hover:border-amber-400 bg-neutral-900/90 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-300 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-amber-500/30 hover:border-amber-400 bg-neutral-900/80 hover:bg-neutral-800 text-amber-300 text-xs font-semibold tracking-wider uppercase transition-all duration-300 group cursor-pointer"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Address & Location */}
          <div className="space-y-4">
            <h3 className="text-amber-400 font-display text-sm uppercase tracking-widest font-bold">
              Our Location
            </h3>
            <div className="space-y-3 text-sm text-neutral-400 leading-relaxed">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-neutral-200 font-medium">White Heart In&apos;t Hotel</p>
                  <p>Block IX, Federal Airport Authority Site & Services</p>
                  <p>Egbejila Road (Opposite Ilorin Airport)</p>
                  <p>Ilorin, Kwara State, Nigeria (CGG2+Q4)</p>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href={googleTravelMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 underline underline-offset-4 font-medium"
                >
                  View on Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Direct Contacts & Social Media */}
          <div className="space-y-4">
            <h3 className="text-amber-400 font-display text-sm uppercase tracking-widest font-bold">
              Direct Contact
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:08082187715" className="hover:text-amber-300 transition-colors font-mono font-medium">
                  0808 218 7715
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:hotelwhiteheart22@gmail.com" className="hover:text-amber-300 transition-colors font-mono text-xs">
                  hotelwhiteheart22@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Front Desk: 24 Hours / 7 Days</span>
              </li>
            </ul>

            {/* Social Media Menu Section */}
            <div className="pt-3 border-t border-neutral-900 space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                Social Media
              </h4>
              <div className="flex flex-col gap-2 text-xs">
                {socialLinks.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-neutral-400 hover:text-amber-300 transition-colors py-1 group"
                    >
                      <span className="w-6 h-6 rounded bg-neutral-900 border border-neutral-800 group-hover:border-amber-500/40 flex items-center justify-center text-amber-400">
                        <IconComponent className="w-3.5 h-3.5" />
                      </span>
                      <span>{item.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-4">
            <h3 className="text-amber-400 font-display text-sm uppercase tracking-widest font-bold">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('rooms');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  All 50 Luxury Rooms & Suites
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Contact & Concierge Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-amber-300 text-neutral-500 transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-500/70" />
                  <span>Admin & Reservations Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Payment Policy */}
          <div className="space-y-4">
            <h3 className="text-amber-400 font-display text-sm uppercase tracking-widest font-bold">
              Direct Hotel Transfer
            </h3>
            <div className="bg-neutral-900/90 border border-amber-500/20 p-4 rounded-lg space-y-2 text-xs">
              <div className="text-neutral-400">Official Hotel Settlement Bank:</div>
              <div className="font-semibold text-amber-200">OPay Bank Nigeria</div>
              <div className="text-neutral-300 flex items-center justify-between">
                <span>Account Number:</span>
                <span className="font-mono text-amber-300 font-bold">9012758772</span>
              </div>
              <div className="text-neutral-300 flex items-center justify-between">
                <span>Account Name:</span>
                <span className="text-neutral-100 font-medium">Adewale Fadipe</span>
              </div>
              <div className="text-[11px] text-amber-400/80 pt-1 border-t border-neutral-800">
                Zero hidden fees. Zero VAT or extra charges added.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} White Heart In&apos;t Hotel, Ilorin, Nigeria. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Directly Opposite Airport</span>
            <span>·</span>
            <span>24/7 Power Supply</span>
            <span>·</span>
            <span>Armed Security & VIP Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
