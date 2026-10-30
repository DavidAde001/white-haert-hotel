import { Booking, ContactMessage, HotelStats, Room } from '../types/hotel';
import { INITIAL_ROOMS } from '../data/initialRooms';
import { getSupabaseClient } from './supabase';

const ROOMS_STORAGE_KEY = 'whh_hotel_rooms_v2';
const BOOKINGS_STORAGE_KEY = 'whh_hotel_bookings_v2';
const CONTACTS_STORAGE_KEY = 'whh_hotel_contacts_v2';

// Seed sample bookings for realistic luxury hotel dashboard
const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bkg-101',
    referenceNumber: 'WHH-2026-8842',
    roomId: 'room-501',
    roomNumber: '501',
    roomName: 'Presidential Suite 501',
    roomType: 'Presidential Suite',
    guestName: 'Chief Babatunde Adeleke',
    guestEmail: 'babatunde.adeleke@lagoscap.ng',
    guestPhone: '+234 803 456 7890',
    guestAddress: 'Plot 14, Victoria Island, Lagos',
    checkInDate: '2026-10-15',
    checkOutDate: '2026-10-18',
    numberOfGuests: 3,
    numberOfNights: 3,
    pricePerNight: 220000,
    totalAmount: 660000,
    specialRequests: 'VIP airport chauffeur escort and sparkling champagne on arrival',
    status: 'Payment Verified',
    paymentMethod: 'OPay Bank Transfer',
    createdAt: '2026-10-08T14:20:00.000Z',
  },
  {
    id: 'bkg-102',
    referenceNumber: 'WHH-2026-4917',
    roomId: 'room-603',
    roomNumber: '603',
    roomName: 'Executive Room 603',
    roomType: 'Executive Room',
    guestName: 'Dr. (Mrs.) Folashade Alabi',
    guestEmail: 'falabi@unilorin.edu.ng',
    guestPhone: '+234 812 789 0123',
    guestAddress: 'GRA Phase 2, Ilorin, Kwara State',
    checkInDate: '2026-10-12',
    checkOutDate: '2026-10-14',
    numberOfGuests: 2,
    numberOfNights: 2,
    pricePerNight: 65000,
    totalAmount: 130000,
    specialRequests: 'High floor quiet corner with garden view for academic writing retreat',
    status: 'Pending Payment Verification',
    paymentMethod: 'OPay Bank Transfer',
    createdAt: '2026-10-09T06:15:00.000Z',
  },
  {
    id: 'bkg-103',
    referenceNumber: 'WHH-2026-3190',
    roomId: 'room-402',
    roomNumber: '402',
    roomName: 'Business Suite 402',
    roomType: 'Business Suite',
    guestName: 'Engr. Emeka Okonkwo',
    guestEmail: 'emeka.okonkwo@energyinfra.com',
    guestPhone: '+234 902 334 5566',
    guestAddress: 'Maitama District, Abuja, FCT',
    checkInDate: '2026-10-20',
    checkOutDate: '2026-10-23',
    numberOfGuests: 2,
    numberOfNights: 3,
    pricePerNight: 135000,
    totalAmount: 405000,
    specialRequests: 'High-speed printer access and private boardroom slot for 4 people',
    status: 'Confirmed',
    paymentMethod: 'OPay Bank Transfer',
    createdAt: '2026-10-07T11:45:00.000Z',
  },
];

// Seed sample contact messages
const INITIAL_CONTACTS: ContactMessage[] = [
  {
    id: 'cnt-1',
    name: 'Alhaji Musa Danjuma',
    email: 'musa.danjuma@tradewinds.com',
    phone: '+234 809 112 3344',
    subject: 'Executive Boardroom & Banquet Inquiries for 60 Pax',
    message: 'Good day. We are planning a 3-day corporate strategy retreat for our executive board in November. We would like to inquire about reserving Floor 6 suites along with full banquet catering.',
    status: 'Unread',
    createdAt: '2026-10-09T07:10:00.000Z',
  },
  {
    id: 'cnt-2',
    name: 'Zainab Bello',
    email: 'zainab.bello@eventlux.ng',
    phone: '+234 816 554 9900',
    subject: 'Wedding Reception & Royal Suite 701 Reservation',
    message: 'We are hosting a high-profile luxury wedding in Ilorin and require the Royal Penthouse suite for bridal preparations, plus 10 guest rooms for our VIP guests from Abuja.',
    status: 'Read',
    createdAt: '2026-10-08T19:30:00.000Z',
  },
];

// LocalStorage helpers
const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (err) {
    console.warn(`Error reading ${key} from localStorage:`, err);
    return defaultValue;
  }
};

const saveToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
  }
};

export const HotelDB = {
  // === ROOMS CRUD ===
  async getRooms(): Promise<Room[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('rooms').select('*');
        if (!error && data && data.length > 0) {
          return data as Room[];
        }
      } catch (err) {
        console.warn('Supabase rooms fetch fallback to local:', err);
      }
    }
    return loadFromStorage<Room[]>(ROOMS_STORAGE_KEY, INITIAL_ROOMS);
  },

  async getRoomById(id: string): Promise<Room | undefined> {
    const rooms = await this.getRooms();
    return rooms.find((r) => r.id === id || r.roomNumber === id);
  },

  async createRoom(room: Room): Promise<Room> {
    const rooms = await this.getRooms();
    const updated = [room, ...rooms];
    saveToStorage(ROOMS_STORAGE_KEY, updated);

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('rooms').insert([room]);
      } catch (err) {
        console.warn('Supabase room insert warning:', err);
      }
    }
    return room;
  },

  async updateRoom(id: string, updates: Partial<Room>): Promise<Room | null> {
    const rooms = await this.getRooms();
    const index = rooms.findIndex((r) => r.id === id);
    if (index === -1) return null;

    const updatedRoom = { ...rooms[index], ...updates };
    rooms[index] = updatedRoom;
    saveToStorage(ROOMS_STORAGE_KEY, rooms);

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('rooms').update(updates).eq('id', id);
      } catch (err) {
        console.warn('Supabase room update warning:', err);
      }
    }
    return updatedRoom;
  },

  async deleteRoom(id: string): Promise<boolean> {
    const rooms = await this.getRooms();
    const filtered = rooms.filter((r) => r.id !== id);
    saveToStorage(ROOMS_STORAGE_KEY, filtered);

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('rooms').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase room delete warning:', err);
      }
    }
    return true;
  },

  // === BOOKINGS CRUD ===
  async getBookings(): Promise<Booking[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .order('createdAt', { ascending: false });
        if (!error && data && data.length > 0) {
          return data as Booking[];
        }
      } catch (err) {
        console.warn('Supabase bookings fetch fallback to local:', err);
      }
    }
    return loadFromStorage<Booking[]>(BOOKINGS_STORAGE_KEY, INITIAL_BOOKINGS);
  },

  async createBooking(booking: Booking): Promise<Booking> {
    const bookings = await this.getBookings();
    const updated = [booking, ...bookings];
    saveToStorage(BOOKINGS_STORAGE_KEY, updated);

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('bookings').insert([booking]);
      } catch (err) {
        console.warn('Supabase booking insert warning:', err);
      }
    }
    return booking;
  },

  async updateBookingStatus(id: string, status: Booking['status']): Promise<Booking | null> {
    const bookings = await this.getBookings();
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) return null;

    const updatedBooking = { ...bookings[index], status };
    bookings[index] = updatedBooking;
    saveToStorage(BOOKINGS_STORAGE_KEY, bookings);

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('bookings').update({ status }).eq('id', id);
      } catch (err) {
        console.warn('Supabase booking update warning:', err);
      }
    }
    return updatedBooking;
  },

  async deleteBooking(id: string): Promise<boolean> {
    const bookings = await this.getBookings();
    const filtered = bookings.filter((b) => b.id !== id);
    saveToStorage(BOOKINGS_STORAGE_KEY, filtered);

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('bookings').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase booking delete warning:', err);
      }
    }
    return true;
  },

  // === CONTACTS CRUD ===
  async getContacts(): Promise<ContactMessage[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('contacts')
          .select('*')
          .order('createdAt', { ascending: false });
        if (!error && data && data.length > 0) {
          return data as ContactMessage[];
        }
      } catch (err) {
        console.warn('Supabase contacts fetch fallback to local:', err);
      }
    }
    return loadFromStorage<ContactMessage[]>(CONTACTS_STORAGE_KEY, INITIAL_CONTACTS);
  },

  async createContact(contact: ContactMessage): Promise<ContactMessage> {
    const contacts = await this.getContacts();
    const updated = [contact, ...contacts];
    saveToStorage(CONTACTS_STORAGE_KEY, updated);

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('contacts').insert([contact]);
      } catch (err) {
        console.warn('Supabase contact insert warning:', err);
      }
    }
    return contact;
  },

  async updateContactStatus(id: string, status: ContactMessage['status']): Promise<ContactMessage | null> {
    const contacts = await this.getContacts();
    const index = contacts.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const updatedContact = { ...contacts[index], status };
    contacts[index] = updatedContact;
    saveToStorage(CONTACTS_STORAGE_KEY, contacts);

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('contacts').update({ status }).eq('id', id);
      } catch (err) {
        console.warn('Supabase contact update warning:', err);
      }
    }
    return updatedContact;
  },

  async deleteContact(id: string): Promise<boolean> {
    const contacts = await this.getContacts();
    const filtered = contacts.filter((c) => c.id !== id);
    saveToStorage(CONTACTS_STORAGE_KEY, filtered);

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('contacts').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase contact delete warning:', err);
      }
    }
    return true;
  },

  // === ANALYTICS & STATS ===
  async getStats(): Promise<HotelStats> {
    const rooms = await this.getRooms();
    const bookings = await this.getBookings();

    const availableRooms = rooms.filter((r) => r.isAvailable).length;
    const pendingVerifications = bookings.filter((b) => b.status === 'Pending Payment Verification').length;
    const verifiedBookings = bookings.filter(
      (b) => b.status === 'Payment Verified' || b.status === 'Confirmed'
    ).length;

    const totalRevenueNaira = bookings
      .filter((b) => b.status === 'Payment Verified' || b.status === 'Confirmed')
      .reduce((acc, curr) => acc + curr.totalAmount, 0);

    return {
      totalRooms: rooms.length,
      availableRooms,
      totalBookings: bookings.length,
      pendingVerifications,
      verifiedBookings,
      totalRevenueNaira,
    };
  },

  // Reset database back to pristine initial state
  resetToInitialData(): void {
    localStorage.setItem(ROOMS_STORAGE_KEY, JSON.stringify(INITIAL_ROOMS));
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
    localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(INITIAL_CONTACTS));
  },
};
