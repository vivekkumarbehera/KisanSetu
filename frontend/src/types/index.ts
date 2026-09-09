export type Role =
  | 'FARMER'
  | 'FPO'
  | 'CONSUMER'
  | 'BULK_BUYER'
  | 'LOGISTICS'
  | 'GOVERNMENT_ADMIN';

export interface State {
  id: number;
  name: string;
  code: string;
}

export interface District {
  id: number;
  name: string;
  state?: State;
  latitude?: number;
  longitude?: number;
  activeListingsCount?: number;
  majorCrops?: string[];
  surplusDeficitStatus?: 'SURPLUS' | 'DEFICIT' | 'BALANCED';
}

export interface Crop {
  id: number;
  name: string;
  category: 'VEGETABLE' | 'GRAIN' | 'PULSE' | 'SPICE' | 'OILSEED' | 'CASH_CROP';
  season: 'KHARIF' | 'RABI' | 'ZAID';
  unit: string;
  msp?: number; // Minimum Support Price per unit
  avgMarketPrice?: number;
  imageUrl?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  verified: boolean;
  active?: boolean;
}

export interface ProductListing {
  id: number;
  seller: User;
  crop: Crop;
  district: District;
  quantity: number;
  availableQuantity: number;
  quality: 'GRADE_A' | 'GRADE_B' | 'GRADE_C';
  price: number;
  harvestDate: string;
  availabilityDate: string;
  description?: string;
  organic: boolean;
  status: 'ACTIVE' | 'SOLD_OUT' | 'EXPIRED' | 'CANCELLED';
  imageUrl?: string;
  createdAt?: string;
}

export interface DemandForecast {
  id: number;
  crop: Crop;
  district: District;
  currentDemand: number;
  predictedDemand: number;
  predictedDemandNextMonth?: number;
  trend: 'INCREASING' | 'DECREASING' | 'STABLE';
  confidenceScore: number;
  recommendation: string;
  forecastWeek?: number;
  forecastYear?: number;
}

export interface DashboardStats {
  totalFarmers: number;
  totalFpos: number;
  totalBuyers: number;
  totalConsumers: number;
  activeListings: number;
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  totalTransactionValue: number;
  activeLogistics: number;
  verifiedUsers: number;
  estimatedWastageReduction: number;
}

export interface OrderItem {
  id?: number;
  listingId: number;
  cropName: string;
  quantity: number;
  pricePerUnit: number;
  subtotal: number;
}

export interface Order {
  id?: number;
  orderNumber: string;
  buyerName: string;
  buyerRole: Role;
  deliveryAddress: string;
  deliveryDistrict: string;
  status: 'CREATED' | 'CONFIRMED' | 'PICKUP_ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED' | 'COMPLETED';
  totalAmount: number;
  notes?: string;
  createdAt: string;
  items: OrderItem[];
}
