export type RoomType =
  | 'Standard Room'
  | 'Deluxe Room'
  | 'Executive Room'
  | 'Premium Deluxe Room'
  | 'Family Suite'
  | 'Business Suite'
  | 'Presidential Suite'
  | 'Royal Suite';

export interface Room {
  id: string;
  roomNumber: string;
  roomType: RoomType;
  capacity: number;
  bedType: string;
  pricePerNight: number; // in Nigerian Naira (₦)
  amenities: string[];
  description: string;
  imageUrl: string;
  fallbackImageUrl?: string;
  isAvailable: boolean;
  sizeSqM: number;
  floor: number;
}

export type BookingStatus =
  | 'Pending Payment Verification'
  | 'Payment Verified'
  | 'Confirmed'
  | 'Rejected'
  | 'Cancelled';

export interface Booking {
  id: string;
  referenceNumber: string; // e.g., MNP-2026-XXXX
  roomId: string;
  roomNumber: string;
  roomName: string;
  roomType: RoomType;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestAddress: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  numberOfNights: number;
  pricePerNight: number;
  totalAmount: number; // strictly Room Price × Number of Nights
  specialRequests?: string;
  status: BookingStatus;
  paymentMethod: 'OPay Bank Transfer';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
  createdAt: string;
}

export interface HotelStats {
  totalRooms: number;
  availableRooms: number;
  totalBookings: number;
  pendingVerifications: number;
  verifiedBookings: number;
  totalRevenueNaira: number;
}
