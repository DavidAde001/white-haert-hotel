import React, { useState, useId } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Copy,
  Check,
  Calendar,
  Users,
  MessageCircle,
  Phone,
  MapPin,
  Sparkles,
  CreditCard,
  Building,
  UserCheck,
} from 'lucide-react';
import { Room, Booking } from '../../types/hotel';
import { HotelDB } from '../../services/db';

interface BookingModalProps {
  room: Room | null;
  onClose: () => void;
  onBookingComplete?: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  room,
  onClose,
  onBookingComplete,
}) => {
  if (!room) return null;

  // Generate unique booking reference immediately
  const uniqueRefId = React.useMemo(() => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `WHH-2026-${randomSuffix}`;
  }, [room.id]);

  // Form states
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const [guestsCount, setGuestsCount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');

  // Step state: 'form' | 'payment' | 'confirmed'
  const [step, setStep] = useState<'form' | 'payment' | 'confirmed'>('form');
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // Bank details
  const BANK_NAME = 'OPay';
  const ACCOUNT_NUMBER = '9012758772';
  const ACCOUNT_NAME = 'Adewale Fadipe';

  // Calculate nights
  const calculateNights = () => {
    const d1 = new Date(checkInDate);
    const d2 = new Date(checkOutDate);
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();
  // Formula: Total Amount = Room Price × Number of Nights (STRICTLY NO VAT, NO TAX, NO SERVICE CHARGE, NO HIDDEN FEES)
  const totalAmount = room.pricePerNight * nights;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !address) {
      alert('Please fill in all required guest details.');
      return;
    }
    setStep('payment');
  };

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(ACCOUNT_NUMBER);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 3000);
  };

  const handleMadePayment = async () => {
    setIsSubmitting(true);
    try {
      const newBooking: Booking = {
        id: `bkg-${Date.now()}`,
        referenceNumber: uniqueRefId,
        roomId: room.id,
        roomNumber: room.roomNumber,
        roomName: `${room.roomType} ${room.roomNumber}`,
        roomType: room.roomType,
        guestName: fullName,
        guestEmail: email,
        guestPhone: phone,
        guestAddress: address,
        checkInDate,
        checkOutDate,
        numberOfGuests: guestsCount,
        numberOfNights: nights,
        pricePerNight: room.pricePerNight,
        totalAmount,
        specialRequests: specialRequests || undefined,
        status: 'Pending Payment Verification',
        paymentMethod: 'OPay Bank Transfer',
        createdAt: new Date().toISOString(),
      };

      // Store in DB / Supabase / localStorage
      await HotelDB.createBooking(newBooking);
      setCreatedBooking(newBooking);
      if (onBookingComplete) onBookingComplete(newBooking);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#F3E5AB', '#ffffff', '#10B981'],
        });
      } catch {
        // Confetti silent fail safe
      }

      setStep('confirmed');
    } catch (err) {
      console.error('Error saving booking:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello White Heart In't Hotel Reception,\n\nI have completed payment for my reservation:\n- Booking Ref: ${uniqueRefId}\n- Guest: ${fullName}\n- Room: ${room.roomType} (${room.roomNumber})\n- Nights: ${nights}\n- Total: ₦${totalAmount.toLocaleString()}\n- Bank: OPay (Account: 9012758772 - Adewale Fadipe)\n\nPlease verify my payment and confirm my reservation.`
  );
  const whatsappUrl = `https://wa.me/2348082187715?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0c0c0c] border border-amber-500/30 rounded-2xl shadow-2xl shadow-black overflow-hidden my-8">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-neutral-950 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-display text-xs font-bold">
              WHH
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-neutral-100">
                Reservation & Booking
              </h2>
              <p className="text-[11px] text-amber-400 font-mono">
                Ref: {uniqueRefId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: GUEST DETAILS & DATES FORM */}
        {step === 'form' && (
          <form onSubmit={handleProceedToPayment} className="p-6 space-y-6">
            {/* Room Summary Banner */}
            <div className="p-4 rounded-xl bg-neutral-900/80 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-amber-400 text-xs font-mono uppercase tracking-wider">
                  Selected Suite
                </span>
                <h3 className="text-lg font-display font-bold text-neutral-100">
                  {room.roomType} (Room {room.roomNumber})
                </h3>
                <div className="text-xs text-neutral-400 mt-1">
                  Floor {room.floor} · {room.bedType} · Up to {room.capacity} Guests
                </div>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xs text-neutral-400">Nightly Rate</div>
                <div className="text-xl font-bold font-mono text-amber-300">
                  ₦{room.pricePerNight.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Check-In / Check-Out & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  Check-In Date
                </label>
                <input
                  type="date"
                  required
                  min={today}
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-amber-400 rounded-lg px-3 py-2.5 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  Check-Out Date
                </label>
                <input
                  type="date"
                  required
                  min={checkInDate || today}
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-amber-400 rounded-lg px-3 py-2.5 text-xs text-neutral-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  Number of Guests
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-amber-400 rounded-lg px-3 py-2.5 text-xs text-neutral-100 focus:outline-none"
                >
                  {[...Array(room.capacity)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guest Identity Fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Babatunde Adeleke"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-amber-400 rounded-lg px-3.5 py-2.5 text-xs text-neutral-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. babatunde@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-amber-400 rounded-lg px-3.5 py-2.5 text-xs text-neutral-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Phone Number (WhatsApp Preferred) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-amber-400 rounded-lg px-3.5 py-2.5 text-xs text-neutral-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Residential / Office Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="City, State, Country"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-amber-400 rounded-lg px-3.5 py-2.5 text-xs text-neutral-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Special Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Late arrival at 9 PM, quiet floor preference, airport pickup coordination..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 focus:border-amber-400 rounded-lg px-3.5 py-2 text-xs text-neutral-100 focus:outline-none"
                />
              </div>
            </div>

            {/* MANDATORY ONLY-DISPLAY FORMULA REQUIREMENTS:
                "DO NOT ADD: VAT, Tax, Service Charge, Hidden Fees
                 Formula: Total Amount = Room Price × Number of Nights
                 Only display: Room Name, Room Number, Price Per Night, Number of Nights, Total Amount" */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-amber-500/30 space-y-2.5 text-xs">
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1">
                Reservation Cost Calculation
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Room Name:</span>
                <span className="font-semibold text-neutral-100">{room.roomType}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Room Number:</span>
                <span className="font-mono text-neutral-100">{room.roomNumber}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Price Per Night:</span>
                <span className="font-mono text-neutral-100">₦{room.pricePerNight.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Number of Nights:</span>
                <span className="font-mono text-neutral-100">{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
              </div>
              <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-sm">
                <span className="font-bold text-neutral-100">Total Amount:</span>
                <span className="font-mono font-bold text-amber-300 text-base">
                  ₦{totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full min-h-[50px] py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold uppercase tracking-wider text-xs sm:text-sm rounded-lg shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
            >
              <CreditCard className="w-4 h-4 text-neutral-950" />
              <span>Proceed to Payment (₦{totalAmount.toLocaleString()})</span>
            </button>
          </form>
        )}

        {/* STEP 2: BANK TRANSFER & PAYMENT CONFIRMATION SCREEN */}
        {step === 'payment' && (
          <div className="p-6 space-y-6">
            {/* Reservation Summary */}
            <div className="p-4 rounded-xl bg-neutral-900/90 border border-amber-500/20 space-y-2 text-xs">
              <div className="flex items-center justify-between text-amber-400 font-mono text-[11px] uppercase tracking-wider">
                <span>Reservation Summary</span>
                <span>Ref: {uniqueRefId}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Room Name:</span>
                <span className="font-semibold text-neutral-100">{room.roomType}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Room Number:</span>
                <span className="font-mono text-neutral-100">{room.roomNumber}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Price Per Night:</span>
                <span className="font-mono text-neutral-100">₦{room.pricePerNight.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Number of Nights:</span>
                <span className="font-mono text-neutral-100">{nights}</span>
              </div>
              <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-sm font-bold">
                <span className="text-neutral-100">Total Amount:</span>
                <span className="font-mono text-amber-300 text-lg">
                  ₦{totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* OPay Bank Account Details Box */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 via-neutral-950 to-black border-2 border-amber-500/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-400 font-display font-semibold text-sm">
                  <Building className="w-4 h-4" />
                  <span>Official Hotel Bank Transfer</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  INSTANT SETTLEMENT
                </span>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Bank Name:</span>
                  <span className="font-bold text-neutral-100 text-sm">{BANK_NAME}</span>
                </div>

                <div className="p-3.5 rounded-lg bg-black/80 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">
                      Account Number
                    </div>
                    <div className="text-xl sm:text-2xl font-mono font-bold text-amber-300 tracking-widest mt-0.5">
                      {ACCOUNT_NUMBER}
                    </div>
                  </div>
                  <button
                    onClick={handleCopyAccountNumber}
                    type="button"
                    className="min-h-[44px] px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow"
                  >
                    {copiedAccount ? (
                      <>
                        <Check className="w-4 h-4 text-neutral-950" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-neutral-950" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Account Name:</span>
                  <span className="font-semibold text-neutral-100">{ACCOUNT_NAME}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed">
                Please transfer exactly <strong className="text-amber-300 font-mono">₦{totalAmount.toLocaleString()}</strong> using your banking app, then click the button below to notify our front desk.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full sm:w-auto px-5 py-3 rounded-lg border border-neutral-700 text-neutral-300 text-xs font-semibold hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                Back to Details
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleMadePayment}
                className="w-full sm:flex-1 min-h-[50px] py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-neutral-950 font-bold uppercase tracking-wider text-xs sm:text-sm rounded-lg shadow-lg shadow-emerald-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <Check className="w-4 h-4 text-neutral-950" />
                <span>{isSubmitting ? 'Recording Reservation...' : 'I Have Made Payment'}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: POST-PAYMENT CONFIRMATION & INSTRUCTIONS */}
        {step === 'confirmed' && (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            {/* Thank You Banner */}
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-950/40 animate-bounce">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold text-neutral-100">
                Thank You for Your Reservation!
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto">
                Your reservation request has been submitted. Our receptionist will verify your payment and finalize room assignment.
              </p>
            </div>

            {/* Booking Reference Box */}
            <div className="p-4 rounded-xl bg-neutral-900/90 border border-amber-500/30 max-w-md mx-auto text-left space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">Booking Reference:</span>
                <span className="font-mono font-bold text-amber-300 text-sm">{uniqueRefId}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">Status:</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Pending Payment Verification
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">Guest:</span>
                <span className="text-neutral-200">{fullName}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">Room:</span>
                <span className="text-neutral-200">{room.roomType} (Room {room.roomNumber})</span>
              </div>
              <div className="flex justify-between items-center text-xs pt-1 border-t border-neutral-800">
                <span className="text-neutral-400">Total Amount:</span>
                <span className="font-mono font-bold text-amber-300">₦{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Instruction to Contact Receptionist */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed max-w-md mx-auto">
              <strong>Important Next Step:</strong> Please contact our receptionist on WhatsApp or call our 24/7 reception desk with your payment receipt and booking reference (<strong>{uniqueRefId}</strong>) for instant confirmation.
            </div>

            {/* Direct WhatsApp & Receptionist Buttons */}
            <div className="space-y-3 max-w-md mx-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[50px] py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Verify Payment via WhatsApp</span>
              </a>

              <a
                href="tel:08082187715"
                className="w-full min-h-[48px] py-3 bg-neutral-900 hover:bg-neutral-800 border border-amber-500/40 text-amber-300 font-semibold text-xs rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Reception Desk (0808 218 7715)</span>
              </a>
            </div>

            {/* Hotel Contact Information */}
            <div className="text-[11px] text-neutral-400 max-w-md mx-auto pt-2 border-t border-neutral-900 space-y-1">
              <div className="font-semibold text-neutral-300">White Heart In&apos;t Hotel</div>
              <div>Block IX, Federal Airport Authority Site & Services, Egbejila Road (Opposite Airport), Ilorin, Kwara State</div>
              <div>Email: <a href="mailto:hotelwhiteheart22@gmail.com" className="text-amber-300 hover:underline">hotelwhiteheart22@gmail.com</a></div>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-neutral-400 hover:text-white underline underline-offset-4 cursor-pointer pt-2"
            >
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
