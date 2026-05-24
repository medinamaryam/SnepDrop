/**
 * SnipeDrop Types & Schema Definitions
 */

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  telegramId?: string;
  phoneNumber?: string;
  createdAt: string;
  role: 'buyer' | 'seller';
  wishlist: string[]; // List of ThriftDropItem IDs
  location?: string; // Users verified/detected local hunting hub coordinate/city
}

export interface Subscription {
  id: string;
  userId: string;
  planType: 'free' | 'premium';
  status: 'active' | 'expired' | 'canceled';
  pricePaid: number; // Rp15.000 for premium
  billingCycle: 'monthly';
  startDate: string;
  endDate: string;
  radarChannel: 'telegram' | 'browser_push' | 'both';
  autoRenew: boolean;
}

export interface ThriftDropItem {
  id: string;
  title: string;
  brand: string;
  category: 'jackets' | 'tees' | 'sweaters' | 'pants' | 'sneakers' | 'blouses' | 'cardigans' | 'skirts';
  size: string;
  condition: string; // e.g., "9/10 Vintage", "Mint Condition"
  priceRp: number;
  imageUrl: string;
  dropTime: string; // ISO date string of official release
  isClaimed: boolean;
  claimedByUserId?: string;
  claimedAt?: string;
  tags: string[];
}

export interface JastipBooking {
  id: string;
  dropId: string;
  userId: string;
  bookingTime: string;
  notes?: string;
  status: 'pending' | 'secured' | 'failed';
}

export interface Testimonial {
  id: string;
  name: string;
  username: string;
  avatar: string;
  review: string;
  rating: number;
  itemsSniped: number;
  avatarBgColor: string;
}

// Database Schema Representation metadata for UI display
export interface SchemaTableField {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  referencesTable?: string;
  isNullable?: boolean;
  description: string;
}

export interface SchemaTable {
  name: string;
  description: string;
  fields: SchemaTableField[];
}
