import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Instagram,
  Facebook,
} from 'lucide-react';

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
import { HotelDB } from '../../services/db';
import { ContactMessage } from '../../types/hotel';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    try {
      const newContact: ContactMessage = {
        id: `cnt-${Date.now()}`,
        name,
        email,
        phone,
        subject: subject || 'General Hotel Inquiry',
        message,
        status: 'Unread',
        createdAt: new Date().toISOString(),
      };

      await HotelDB.createContact(newContact);
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error('Error submitting contact form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'What are the check-in and check-out times?',
      a: 'Standard check-in begins at 2:00 PM, and check-out is at 12:00 PM (Noon). Early check-in and extended late check-out can be arranged through the front desk subject to suite availability.',
    },
    {
      q: 'How does payment verification work?',
      a: 'We accept direct bank transfers to our official OPay hotel account (Account: 9012758772, Adewale Fadipe). After making your transfer, click "I Have Made Payment" and share your transaction reference with our receptionist via WhatsApp (+234 901 275 8772) for immediate receipt verification.',
    },
    {
      q: 'Are there hidden taxes, VAT, or service charges added to the bill?',
      a: 'No. Millennium Nice Peak Hotel practices transparent sovereign pricing. The room price multiplied by the number of nights is the exact final amount you pay. We do not tack on surprise fees.',
    },
    {
      q: 'Do you offer airport pickup from Ilorin International Airport?',
      a: 'Yes. VIP chauffeur airport transfers are complimentary for Executive, Business, Presidential, and Royal Suites. For Standard and Deluxe guests, airport pickup is readily available upon request.',
    },
    {
      q: 'Can the conference and banquet halls be booked for corporate summits or weddings?',
      a: 'Absolutely. Our Grand Banquet Hall accommodates up to 300 guests with complete audiovisual setups, diplomatic security, and private executive catering.',
    },
  ];

  return (
    <div className="pt-24 pb-32 bg-[#080808] min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-neutral-900">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full bg-amber-500/5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>24/7 DIPLOMATIC CONCIERGE</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-100">
            Contact <span className="text-gold-gradient">Our Concierge</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Our reception and executive liaison team are available 24 hours a day to assist with suite bookings, VIP airport escorts, banquet catering, and payment verifications.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 luxury-card p-6 sm:p-8 rounded-2xl border border-amber-500/20 bg-neutral-900/60 backdrop-blur-md">
            <h2 className="font-display text-xl font-bold text-neutral-100 mb-2">
              Send an Official Inquiry
            </h2>
            <p className="text-xs text-neutral-400 mb-6">
              Inquiries are answered within minutes by our duty managers.
            </p>

            {submitted ? (
              <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-display text-lg font-bold text-white">Inquiry Received</h3>
                <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                  Thank you for reaching out to White Heart In't Hotel. Our concierge will review your message and reach out shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs text-amber-300 rounded font-semibold cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senator or Dr. Adewale"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-lg px-3.5 py-2.5 text-xs text-neutral-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. adewale@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-lg px-3.5 py-2.5 text-xs text-neutral-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-lg px-3.5 py-2.5 text-xs text-neutral-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Inquiry Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Suite Reservation, Event, etc."
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-lg px-3.5 py-2.5 text-xs text-neutral-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Provide details of your stay, requested dates, or inquiries..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-lg px-3.5 py-2.5 text-xs text-neutral-100 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[50px] py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold uppercase tracking-wider text-xs rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 active:scale-95"
                >
                  <Send className="w-4 h-4 text-neutral-950" />
                  <span>{isSubmitting ? 'Transmitting...' : 'Send Message to Reception'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Hotel Contacts & Business Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Info */}
            <div className="luxury-card p-6 rounded-2xl border border-amber-500/20 bg-neutral-900/60 space-y-5">
              <h2 className="font-display text-lg font-bold text-amber-200">
                Direct Communications
              </h2>

              <div className="space-y-4 text-xs text-neutral-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Official Address:</strong>
                    White Heart In't Hotel, Block IX, Federal Airport Authority Site & Services, Egbejila Road, opposite Ilorin International Airport, Ilorin, Kwara State, Nigeria.
                    <a
                      href="https://www.google.com/travel/search?q=white%20heart%20hotel&g2lb=4965990%2C72471280%2C72573224%2C72647020%2C72686036%2C72803964%2C72882230%2C73064764%2C121529350%2C121608706%2C121738283%2C121762713%2C121921501%2C121951222%2C121960737%2C122078727%2C122098606&hl=en-NG&gl=ng&cs=1&ssta=1&ts=CAESCgoCCAMKAggDEAAaHhIcEhQKBwjqDxAKGBkSBwjqDxAKGBoYATIECAAQACoHCgU6A05HTg&qs=CAEyE0Nnb0ludnVxaW9XSDY4c2FFQUU4CEIJEW54VNVSUMDqQgkRmmgXQnjt4DVaAggB&ap=KigKEgnxLWhVj9ggQBE-GrudMfwRQBISCTPk8JAp3SBAET4au-0GBBJAugEIb3ZlcnZpZXc&ictx=111"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-amber-400 hover:underline mt-1 block"
                    >
                      <span>Open in Google Maps / Travel</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Telephone Number:</strong>
                    <div className="font-mono text-amber-300 font-semibold text-sm">
                      <a href="tel:08082187715" className="hover:underline">0808 218 7715</a>
                    </div>
                    <span className="text-[11px] text-neutral-400">Front Desk, Reservations & Concierge (24/7)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Official Email:</strong>
                    <div className="text-neutral-200 font-mono text-xs">
                      <a href="mailto:hotelwhiteheart22@gmail.com" className="hover:underline hover:text-amber-300">
                        hotelwhiteheart22@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Media Channels */}
                <div className="pt-2 border-t border-neutral-800">
                  <strong className="text-white block mb-2">Connect on Social Media:</strong>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://www.instagram.com/white_heart_hotel_ilorin/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-950 border border-amber-500/30 hover:border-amber-400 text-neutral-300 hover:text-amber-300 transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5 text-amber-400" />
                      <span>Instagram</span>
                    </a>
                    <a
                      href="https://www.tiktok.com/@white_heart_hotel_ilorin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-950 border border-amber-500/30 hover:border-amber-400 text-neutral-300 hover:text-amber-300 transition-colors"
                    >
                      <TikTokIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>TikTok</span>
                    </a>
                    <a
                      href="https://www.facebook.com/Whitehearthotel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-950 border border-amber-500/30 hover:border-amber-400 text-neutral-300 hover:text-amber-300 transition-colors"
                    >
                      <Facebook className="w-3.5 h-3.5 text-amber-400" />
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <a
                href="https://wa.me/2348082187715?text=Hello%20White%20Heart%20In't%20Hotel,%20I%20would%20like%20to%20inquire%20about%20a%20reservation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Chat Instantly on WhatsApp (0808 218 7715)</span>
              </a>
            </div>

            {/* Business Hours */}
            <div className="luxury-card p-6 rounded-2xl border border-amber-500/20 bg-neutral-900/60 space-y-4">
              <div className="flex items-center gap-2 text-amber-300 font-display font-semibold text-sm">
                <Clock className="w-4 h-4" />
                <span>Operating & Service Hours</span>
              </div>
              <div className="space-y-2.5 text-xs text-neutral-300 font-mono">
                <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                  <span className="text-neutral-400">Front Desk & Security:</span>
                  <span className="text-amber-400">24 Hours / 7 Days</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                  <span className="text-neutral-400">Gourmet Restaurant:</span>
                  <span>6:30 AM – 11:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                  <span className="text-neutral-400">Swimming Pool & Cabanas:</span>
                  <span>7:00 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Room Service:</span>
                  <span className="text-amber-400">24 Hours Daily</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map Embed */}
        <div className="mt-16 rounded-2xl overflow-hidden border border-amber-500/30 bg-neutral-900 shadow-2xl">
          <div className="p-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-display font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              Millennium Nice Peak Hotel Map Location (Ilorin, Nigeria)
            </span>
            <a
              href="https://maps.app.goo.gl/ZcCEgnMFZoLVUiyr7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-400 hover:text-amber-200 underline font-medium"
            >
              Open Full Map &rarr;
            </a>
          </div>
          <div className="w-full h-80 bg-neutral-950">
            <iframe
              title="Millennium Nice Peak Hotel Contact Location"
              src="https://maps.google.com/maps?q=Millennium%20Nice%20Peak%20Hotel,%20Old%20Jebba%20Road,%20Ilorin,%20Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1)' }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-20 max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-display text-2xl font-bold text-neutral-100">
              Frequently Asked <span className="text-gold-gradient">Questions</span>
            </h2>
            <p className="text-xs text-neutral-400">
              Essential answers concerning check-in, bank settlement, and hospitality services.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-amber-500/20 bg-neutral-900/50 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full min-h-[50px] p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-neutral-200 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-neutral-400 leading-relaxed border-t border-neutral-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
