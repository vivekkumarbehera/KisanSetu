import axios from 'axios';
import { District, Crop, ProductListing, DashboardStats, DemandForecast } from '@/types';
import { ODISHA_DISTRICTS, CROPS_DATA, INITIAL_LISTINGS, DEMAND_FORECASTS, INITIAL_STATS } from '@/data/mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  async getDistricts(): Promise<District[]> {
    try {
      const response = await apiClient.get<District[]>('/districts');
      if (response.data && response.data.length > 0) {
        // Merge enriched metadata from mock if needed
        return response.data.map(d => {
          const mock = ODISHA_DISTRICTS.find(m => m.id === d.id || m.name.toLowerCase() === d.name.toLowerCase());
          return {
            ...d,
            activeListingsCount: mock?.activeListingsCount ?? 5,
            majorCrops: mock?.majorCrops ?? ['Rice (Paddy)', 'Vegetables'],
            surplusDeficitStatus: mock?.surplusDeficitStatus ?? 'BALANCED'
          };
        });
      }
      return ODISHA_DISTRICTS;
    } catch (err) {
      console.warn('Backend API /districts unavailable, using local data:', err);
      return ODISHA_DISTRICTS;
    }
  },

  async getCrops(): Promise<Crop[]> {
    try {
      const response = await apiClient.get<Crop[]>('/crops');
      if (response.data && response.data.length > 0) {
        return response.data.map(c => {
          const mock = CROPS_DATA.find(m => m.id === c.id || m.name.toLowerCase() === c.name.toLowerCase());
          return {
            ...c,
            msp: mock?.msp ?? 2000,
            avgMarketPrice: mock?.avgMarketPrice ?? 2200
          };
        });
      }
      return CROPS_DATA;
    } catch (err) {
      console.warn('Backend API /crops unavailable, using local data:', err);
      return CROPS_DATA;
    }
  },

  async getProducts(): Promise<ProductListing[]> {
    try {
      const response = await apiClient.get<ProductListing[]>('/products');
      if (response.data && response.data.length > 0) {
        return response.data;
      }
      return INITIAL_LISTINGS;
    } catch (err) {
      console.warn('Backend API /products unavailable, using local data:', err);
      return INITIAL_LISTINGS;
    }
  },

  async getAdminStats(): Promise<DashboardStats> {
    try {
      const response = await apiClient.get<DashboardStats>('/admin/dashboard');
      if (response.data) {
        return response.data;
      }
      return INITIAL_STATS;
    } catch (err) {
      return INITIAL_STATS;
    }
  },

  async getForecasts(): Promise<DemandForecast[]> {
    try {
      const response = await apiClient.get<DemandForecast[]>('/admin/forecast');
      if (response.data && response.data.length > 0) {
        return response.data;
      }
      return DEMAND_FORECASTS;
    } catch (err) {
      return DEMAND_FORECASTS;
    }
  },

  async login(email: string, password: string): Promise<any> {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  }
};
