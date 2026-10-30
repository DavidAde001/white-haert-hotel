import React from 'react';
import { MapPin, Navigation, ExternalLink, ShieldCheck, Car, Plane } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const officialMapsUrl =
    'https://www.google.com/travel/search?q=white%20heart%20hotel&g2lb=4965990%2C72471280%2C72573224%2C72647020%2C72686036%2C72803964%2C72882230%2C73064764%2C121529350%2C121608706%2C121738283%2C121762713%2C121921501%2C121951222%2C121960737%2C122078727%2C122098606&hl=en-NG&gl=ng&cs=1&ssta=1&ts=CAESCgoCCAMKAggDEAAaHhIcEhQKBwjqDxAKGBkSBwjqDxAKGBoYATIECAAQACoHCgU6A05HTg&qs=CAEyE0Nnb0ludnVxaW9XSDY4c2FFQUU4CEIJEW54VNVSUMDqQgkRmmgXQnjt4DVaAggB&ap=KigKEgnxLWhVj9ggQBE-GrudMfwRQBISCTPk8JAp3SBAET4au-0GBBJAugEIb3ZlcnZpZXc&ictx=111';
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=White+Heart+International+Hotel+Ilorin+Nigeria`;

  const nearbyLandmarks = [
    { name: 'Ilorin International Airport (ILR)', time: '2 mins (Opposite Airport)', icon: Plane },
    { name: 'Kwara State Government House / GRA', time: '12 mins drive', icon: ShieldCheck },
    { name: 'University of Ilorin (UNILORIN)', time: '18 mins drive', icon: Car },
    { name: 'Kwara State Stadium Complex', time: '10 mins drive', icon: MapPin },
  ];

  return (
    <section id="location" className="py-24 sm:py-32 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full bg-amber-500/5">
            <MapPin className="w-3.5 h-3.5" />
            <span>PRIME ILORIN DESTINATION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-100">
            Hotel Location & <span className="text-gold-gradient">Directions</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Prestigiously positioned directly opposite Ilorin International Airport on Egbejila Road, providing effortless accessibility for travelers and dignitaries.
          </p>
        </div>

        {/* Map & Landmark Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Map Box */}
          <div className="lg:col-span-8 rounded-xl overflow-hidden border border-amber-500/30 bg-neutral-900 shadow-2xl flex flex-col">
            <div className="relative w-full h-[400px] sm:h-[480px] bg-neutral-950">
              <iframe
                title="White Heart In't Hotel Google Map"
                src="https://maps.google.com/maps?q=White%20Heart%20Hotel,%20Egbejila%20Road,%20Ilorin,%20Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Floating Map Pin Badge */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 max-w-[calc(100%-1.5rem)] sm:max-w-xs bg-black/90 backdrop-blur-md border border-amber-500/40 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg shadow-xl text-xs">
                <div className="flex items-center gap-2 text-amber-300 font-bold font-display">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">White Heart In't Hotel</span>
                </div>
                <div className="text-neutral-400 mt-1 text-[11px] sm:text-xs">
                  Block IX, Federal Airport Authority Site & Services, Egbejila Road, opposite Ilorin International Airport, Kwara State
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-4 sm:p-6 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-400 text-center sm:text-left">
                Official Google Maps Registry: <span className="font-mono text-amber-300">ZcCEgnMFZoLVUiyr7</span>
              </div>
              <div className="flex flex-col xs:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-h-[46px] px-4 sm:px-5 py-2.5 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={officialMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-h-[46px] px-4 sm:px-5 py-2.5 rounded-sm border border-amber-500/40 hover:border-amber-400 bg-neutral-900 text-amber-200 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-amber-400" />
                  <span>View on Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Distances & Executive Chauffeur */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="luxury-card p-6 sm:p-8 rounded-xl border border-amber-500/20 bg-neutral-900/70 space-y-6">
              <h3 className="font-display text-lg font-bold text-amber-200">
                Strategic Proximity
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Enjoy seamless transit to diplomatic quarters, executive commercial zones, and cultural landmarks.
              </p>

              <div className="space-y-4 pt-2">
                {nearbyLandmarks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="p-3.5 rounded-lg bg-neutral-950/80 border border-neutral-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="text-neutral-200 font-medium">{item.name}</span>
                      </div>
                      <span className="text-amber-400 font-mono shrink-0">{item.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Airport Transfer Callout */}
            <div className="p-6 rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-neutral-950 to-black text-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-semibold uppercase tracking-wider">
                <Plane className="w-4 h-4 text-amber-400" />
                <span>Complimentary VIP Chauffeur</span>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Guests residing in Executive, Business, Presidential, and Royal Suites receive priority airport transfer from Ilorin International Airport.
              </p>
              <div className="font-mono text-amber-400/90 text-[11px]">
                Coordination Desk: <a href="tel:08082187715" className="hover:underline">0808 218 7715</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
