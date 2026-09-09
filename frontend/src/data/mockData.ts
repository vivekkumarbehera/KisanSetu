import { District, Crop, ProductListing, DemandForecast, DashboardStats, Order } from '@/types';

export const ODISHA_DISTRICTS: District[] = [
  { id: 1, name: "Angul", latitude: 20.84, longitude: 85.10, activeListingsCount: 8, majorCrops: ["Rice (Paddy)", "Groundnut", "Vegetables"], surplusDeficitStatus: 'BALANCED' },
  { id: 2, name: "Balangir", latitude: 20.71, longitude: 83.48, activeListingsCount: 14, majorCrops: ["Onion", "Cotton", "Rice (Paddy)"], surplusDeficitStatus: 'SURPLUS' },
  { id: 3, name: "Balasore", latitude: 21.49, longitude: 86.93, activeListingsCount: 19, majorCrops: ["Rice (Paddy)", "Mustard", "Betel Leaf"], surplusDeficitStatus: 'SURPLUS' },
  { id: 4, name: "Bargarh", latitude: 21.33, longitude: 83.62, activeListingsCount: 32, majorCrops: ["Rice (Paddy)", "Sugarcane", "Cauliflower"], surplusDeficitStatus: 'SURPLUS' },
  { id: 5, name: "Bhadrak", latitude: 21.06, longitude: 86.50, activeListingsCount: 11, majorCrops: ["Rice (Paddy)", "Vegetables", "Fish"], surplusDeficitStatus: 'BALANCED' },
  { id: 6, name: "Boudh", latitude: 20.84, longitude: 84.32, activeListingsCount: 6, majorCrops: ["Rice (Paddy)", "Turmeric", "Millets"], surplusDeficitStatus: 'DEFICIT' },
  { id: 7, name: "Cuttack", latitude: 20.46, longitude: 85.88, activeListingsCount: 28, majorCrops: ["Tomato", "Brinjal", "Rice (Paddy)", "Pointed Gourd"], surplusDeficitStatus: 'SURPLUS' },
  { id: 8, name: "Deogarh", latitude: 21.53, longitude: 84.73, activeListingsCount: 5, majorCrops: ["Rice (Paddy)", "Groundnut", "Pulses"], surplusDeficitStatus: 'DEFICIT' },
  { id: 9, name: "Dhenkanal", latitude: 20.66, longitude: 85.59, activeListingsCount: 12, majorCrops: ["Mango", "Tomato", "Rice (Paddy)"], surplusDeficitStatus: 'BALANCED' },
  { id: 10, name: "Gajapati", latitude: 18.81, longitude: 84.15, activeListingsCount: 9, majorCrops: ["Pineapple", "Cashew", "Millets"], surplusDeficitStatus: 'BALANCED' },
  { id: 11, name: "Ganjam", latitude: 19.38, longitude: 85.05, activeListingsCount: 24, majorCrops: ["Rice (Paddy)", "Brinjal", "Green Chilli", "Kewda"], surplusDeficitStatus: 'SURPLUS' },
  { id: 12, name: "Jagatsinghpur", latitude: 20.26, longitude: 86.17, activeListingsCount: 15, majorCrops: ["Rice (Paddy)", "Betel Vine", "Pulses"], surplusDeficitStatus: 'BALANCED' },
  { id: 13, name: "Jajpur", latitude: 20.85, longitude: 86.33, activeListingsCount: 18, majorCrops: ["Groundnut", "Vegetables", "Rice (Paddy)"], surplusDeficitStatus: 'BALANCED' },
  { id: 14, name: "Jharsuguda", latitude: 21.86, longitude: 84.01, activeListingsCount: 7, majorCrops: ["Rice (Paddy)", "Pulses"], surplusDeficitStatus: 'DEFICIT' },
  { id: 15, name: "Kalahandi", latitude: 19.91, longitude: 83.16, activeListingsCount: 21, majorCrops: ["Cotton", "Rice (Paddy)", "Green Chilli"], surplusDeficitStatus: 'SURPLUS' },
  { id: 16, name: "Kandhamal", latitude: 20.14, longitude: 84.04, activeListingsCount: 16, majorCrops: ["Turmeric (GI Tag)", "Ginger", "Organic Millets"], surplusDeficitStatus: 'SURPLUS' },
  { id: 17, name: "Kendrapara", latitude: 20.50, longitude: 86.42, activeListingsCount: 13, majorCrops: ["Jute", "Rice (Paddy)", "Pulses"], surplusDeficitStatus: 'BALANCED' },
  { id: 18, name: "Keonjhar", latitude: 21.63, longitude: 85.58, activeListingsCount: 10, majorCrops: ["Tomato", "Maize", "Rice (Paddy)"], surplusDeficitStatus: 'BALANCED' },
  { id: 19, name: "Khordha", latitude: 20.19, longitude: 85.62, activeListingsCount: 35, majorCrops: ["Vegetables", "Flowers", "Rice (Paddy)"], surplusDeficitStatus: 'DEFICIT' },
  { id: 20, name: "Koraput", latitude: 18.81, longitude: 82.71, activeListingsCount: 26, majorCrops: ["Coffee", "Turmeric", "Millets (Mandia)", "Ginger"], surplusDeficitStatus: 'SURPLUS' },
  { id: 21, name: "Malkangiri", latitude: 18.34, longitude: 81.90, activeListingsCount: 8, majorCrops: ["Millets", "Rice (Paddy)", "Maize"], surplusDeficitStatus: 'BALANCED' },
  { id: 22, name: "Mayurbhanj", latitude: 21.93, longitude: 86.72, activeListingsCount: 17, majorCrops: ["Rice (Paddy)", "Sabai Grass", "Mustard"], surplusDeficitStatus: 'BALANCED' },
  { id: 23, name: "Nabarangpur", latitude: 19.23, longitude: 82.55, activeListingsCount: 15, majorCrops: ["Maize", "Cashew", "Rice (Paddy)"], surplusDeficitStatus: 'SURPLUS' },
  { id: 24, name: "Nayagarh", latitude: 20.13, longitude: 85.10, activeListingsCount: 11, majorCrops: ["Sugarcane", "Rice (Paddy)", "Vegetables"], surplusDeficitStatus: 'BALANCED' },
  { id: 25, name: "Nuapada", latitude: 20.83, longitude: 82.53, activeListingsCount: 7, majorCrops: ["Cotton", "Paddy", "Pulses"], surplusDeficitStatus: 'DEFICIT' },
  { id: 26, name: "Puri", latitude: 19.81, longitude: 85.83, activeListingsCount: 20, majorCrops: ["Coconut", "Betel Leaf", "Potato", "Rice (Paddy)"], surplusDeficitStatus: 'BALANCED' },
  { id: 27, name: "Rayagada", latitude: 19.17, longitude: 83.42, activeListingsCount: 12, majorCrops: ["Cotton", "Millets", "Pineapple"], surplusDeficitStatus: 'BALANCED' },
  { id: 28, name: "Sambalpur", latitude: 21.47, longitude: 83.97, activeListingsCount: 30, majorCrops: ["Rice (Paddy)", "Cauliflower", "Tomato"], surplusDeficitStatus: 'SURPLUS' },
  { id: 29, name: "Subarnapur", latitude: 20.84, longitude: 83.92, activeListingsCount: 9, majorCrops: ["Rice (Paddy)", "Vegetables"], surplusDeficitStatus: 'BALANCED' },
  { id: 30, name: "Sundargarh", latitude: 22.12, longitude: 84.03, activeListingsCount: 14, majorCrops: ["Tomato", "Rice (Paddy)", "Vegetables"], surplusDeficitStatus: 'DEFICIT' },
];

export const CROPS_DATA: Crop[] = [
  { id: 1, name: "Rice (Paddy)", category: "GRAIN", season: "KHARIF", unit: "quintal", msp: 2300, avgMarketPrice: 2450 },
  { id: 2, name: "Tomato", category: "VEGETABLE", season: "RABI", unit: "kg", msp: 18, avgMarketPrice: 28 },
  { id: 3, name: "Potato", category: "VEGETABLE", season: "RABI", unit: "kg", msp: 16, avgMarketPrice: 22 },
  { id: 4, name: "Onion", category: "VEGETABLE", season: "RABI", unit: "kg", msp: 24, avgMarketPrice: 34 },
  { id: 5, name: "Brinjal", category: "VEGETABLE", season: "KHARIF", unit: "kg", msp: 20, avgMarketPrice: 26 },
  { id: 6, name: "Green Chilli", category: "SPICE", season: "KHARIF", unit: "kg", msp: 45, avgMarketPrice: 68 },
  { id: 7, name: "Cauliflower", category: "VEGETABLE", season: "RABI", unit: "kg", msp: 22, avgMarketPrice: 32 },
  { id: 8, name: "Cabbage", category: "VEGETABLE", season: "RABI", unit: "kg", msp: 18, avgMarketPrice: 24 },
  { id: 9, name: "Lady Finger (Okra)", category: "VEGETABLE", season: "KHARIF", unit: "kg", msp: 25, avgMarketPrice: 35 },
  { id: 10, name: "Bottle Gourd", category: "VEGETABLE", season: "ZAID", unit: "kg", msp: 15, avgMarketPrice: 20 },
  { id: 11, name: "Turmeric", category: "SPICE", season: "KHARIF", unit: "kg", msp: 95, avgMarketPrice: 145 },
  { id: 12, name: "Groundnut", category: "OILSEED", season: "KHARIF", unit: "quintal", msp: 6783, avgMarketPrice: 7200 },
  { id: 13, name: "Mustard", category: "OILSEED", season: "RABI", unit: "quintal", msp: 5650, avgMarketPrice: 6100 },
  { id: 14, name: "Sugarcane", category: "CASH_CROP", season: "KHARIF", unit: "ton", msp: 3400, avgMarketPrice: 3750 }
];

export const INITIAL_LISTINGS: ProductListing[] = [
  {
    id: 1,
    seller: { id: 2, name: "Bishnu Charan Das", email: "farmer.cuttack@kisansetu.in", role: "FARMER", verified: true },
    crop: { id: 2, name: "Tomato", category: "VEGETABLE", season: "RABI", unit: "kg", msp: 18 },
    district: { id: 7, name: "Cuttack" },
    quantity: 800,
    availableQuantity: 650,
    quality: "GRADE_A",
    price: 28.00,
    harvestDate: "2026-09-08",
    availabilityDate: "2026-09-09",
    description: "Freshly harvested juicy hybrid tomatoes from Athagarh belt, Cuttack. Uniform red color and firm skin.",
    organic: false,
    status: "ACTIVE"
  },
  {
    id: 2,
    seller: { id: 5, name: "Maa Samaleswari Farmer Producer Org", email: "fpo.samaleswari@kisansetu.in", role: "FPO", verified: true },
    crop: { id: 1, name: "Rice (Paddy)", category: "GRAIN", season: "KHARIF", unit: "quintal", msp: 2300 },
    district: { id: 28, name: "Sambalpur" },
    quantity: 5000,
    availableQuantity: 4200,
    quality: "GRADE_A",
    price: 36.50,
    harvestDate: "2026-09-05",
    availabilityDate: "2026-09-09",
    description: "Sambalpur Premium Swarna paddy grain, dried to 12% moisture. Certified organic FPO collective aggregate.",
    organic: true,
    status: "ACTIVE"
  },
  {
    id: 3,
    seller: { id: 3, name: "Naveen Pradhan", email: "farmer.sambalpur@kisansetu.in", role: "FARMER", verified: true },
    crop: { id: 7, name: "Cauliflower", category: "VEGETABLE", season: "RABI", unit: "kg", msp: 22 },
    district: { id: 28, name: "Sambalpur" },
    quantity: 1200,
    availableQuantity: 1200,
    quality: "GRADE_A",
    price: 32.00,
    harvestDate: "2026-09-09",
    availabilityDate: "2026-09-10",
    description: "Crisp snow-white organic curds, minimum 1kg head size. Fresh from farm gate.",
    organic: true,
    status: "ACTIVE"
  },
  {
    id: 4,
    seller: { id: 4, name: "Mangala Sabar", email: "farmer.koraput@kisansetu.in", role: "FARMER", verified: true },
    crop: { id: 11, name: "Turmeric", category: "SPICE", season: "KHARIF", unit: "kg", msp: 95 },
    district: { id: 20, name: "Koraput" },
    quantity: 1500,
    availableQuantity: 1100,
    quality: "GRADE_A",
    price: 145.00,
    harvestDate: "2026-08-30",
    availabilityDate: "2026-09-09",
    description: "High curcumin (>5.2%) indigenous Koraput organic turmeric fingers. Sun-dried and graded.",
    organic: true,
    status: "ACTIVE"
  },
  {
    id: 5,
    seller: { id: 2, name: "Bishnu Charan Das", email: "farmer.cuttack@kisansetu.in", role: "FARMER", verified: true },
    crop: { id: 5, name: "Brinjal", category: "VEGETABLE", season: "KHARIF", unit: "kg", msp: 20 },
    district: { id: 7, name: "Cuttack" },
    quantity: 600,
    availableQuantity: 450,
    quality: "GRADE_A",
    price: 26.00,
    harvestDate: "2026-09-08",
    availabilityDate: "2026-09-09",
    description: "Fresh Kantabada round purple brinjal. Glossy skin, tender seeds, pesticide-monitored.",
    organic: false,
    status: "ACTIVE"
  },
  {
    id: 6,
    seller: { id: 3, name: "Naveen Pradhan", email: "farmer.sambalpur@kisansetu.in", role: "FARMER", verified: true },
    crop: { id: 4, name: "Onion", category: "VEGETABLE", season: "RABI", unit: "kg", msp: 24 },
    district: { id: 2, name: "Balangir" },
    quantity: 3500,
    availableQuantity: 3000,
    quality: "GRADE_B",
    price: 34.00,
    harvestDate: "2026-09-06",
    availabilityDate: "2026-09-09",
    description: "Balangir medium red onions, cured skin, long storage shelf life.",
    organic: false,
    status: "ACTIVE"
  },
  {
    id: 7,
    seller: { id: 4, name: "Mangala Sabar", email: "farmer.koraput@kisansetu.in", role: "FARMER", verified: true },
    crop: { id: 6, name: "Green Chilli", category: "SPICE", season: "KHARIF", unit: "kg", msp: 45 },
    district: { id: 15, name: "Kalahandi" },
    quantity: 400,
    availableQuantity: 350,
    quality: "GRADE_A",
    price: 68.00,
    harvestDate: "2026-09-09",
    availabilityDate: "2026-09-09",
    description: "Pungent dark green chillies, fresh harvest, ideal for wholesale and restaurant chains.",
    organic: false,
    status: "ACTIVE"
  }
];

export const DEMAND_FORECASTS: DemandForecast[] = [
  {
    id: 1,
    crop: { id: 2, name: "Tomato", category: "VEGETABLE", season: "RABI", unit: "kg" },
    district: { id: 19, name: "Khordha" },
    currentDemand: 14500,
    predictedDemand: 18200,
    predictedDemandNextMonth: 21500,
    trend: "INCREASING",
    confidenceScore: 0.92,
    recommendation: "High urban demand in Bhubaneswar/Khordha. Redirect Cuttack surplus to Khordha to stabilize prices.",
    forecastWeek: 37,
    forecastYear: 2026
  },
  {
    id: 2,
    crop: { id: 1, name: "Rice (Paddy)", category: "GRAIN", season: "KHARIF", unit: "quintal" },
    district: { id: 28, name: "Sambalpur" },
    currentDemand: 95000,
    predictedDemand: 96200,
    predictedDemandNextMonth: 98000,
    trend: "STABLE",
    confidenceScore: 0.96,
    recommendation: "Steady state institutional procurement with high MSP compliance.",
    forecastWeek: 37,
    forecastYear: 2026
  },
  {
    id: 3,
    crop: { id: 11, name: "Turmeric", category: "SPICE", season: "KHARIF", unit: "kg" },
    district: { id: 20, name: "Koraput" },
    currentDemand: 4200,
    predictedDemand: 6800,
    predictedDemandNextMonth: 8900,
    trend: "INCREASING",
    confidenceScore: 0.89,
    recommendation: "Surge in export & nutraceutical interest. Recommend farmers retain Grade A batch for bulk auction.",
    forecastWeek: 37,
    forecastYear: 2026
  },
  {
    id: 4,
    crop: { id: 3, name: "Potato", category: "VEGETABLE", season: "RABI", unit: "kg" },
    district: { id: 7, name: "Cuttack" },
    currentDemand: 22000,
    predictedDemand: 19500,
    predictedDemandNextMonth: 17000,
    trend: "DECREASING",
    confidenceScore: 0.85,
    recommendation: "Cold storage releases balancing local supply. Monitor arrivals to prevent glut.",
    forecastWeek: 37,
    forecastYear: 2026
  }
];

export const INITIAL_STATS: DashboardStats = {
  totalFarmers: 14820,
  totalFpos: 218,
  totalBuyers: 3450,
  totalConsumers: 41200,
  activeListings: 7,
  totalOrders: 1842,
  completedOrders: 1690,
  pendingOrders: 152,
  totalTransactionValue: 42840000, // ₹ 4.28 Crore
  activeLogistics: 48,
  verifiedUsers: 14200,
  estimatedWastageReduction: 18.5
};

export const SAMPLE_ORDERS: Order[] = [
  {
    id: 1,
    orderNumber: "OD-AGRI-2026-000101",
    buyerName: "Kalinga Fresh Retails Ltd",
    buyerRole: "BULK_BUYER",
    deliveryAddress: "Unit 4 Market, Bhubaneswar, Khordha - 751001",
    deliveryDistrict: "Khordha",
    status: "COMPLETED",
    totalAmount: 5600.00,
    notes: "Fair trade bulk delivery completed successfully via Cold Chain logistics",
    createdAt: "2026-09-08T14:30:00",
    items: [
      { listingId: 1, cropName: "Tomato", quantity: 200, pricePerUnit: 28.00, subtotal: 5600.00 }
    ]
  },
  {
    id: 2,
    orderNumber: "OD-AGRI-2026-000102",
    buyerName: "Priyadarshini Rout",
    buyerRole: "CONSUMER",
    deliveryAddress: "Plot 12, Nayapalli, Bhubaneswar, Khordha - 751012",
    deliveryDistrict: "Khordha",
    status: "CONFIRMED",
    totalAmount: 780.00,
    notes: "Urgent delivery requested for evening market",
    createdAt: "2026-09-09T10:15:00",
    items: [
      { listingId: 3, cropName: "Cauliflower", quantity: 15, pricePerUnit: 32.00, subtotal: 480.00 },
      { listingId: 5, cropName: "Brinjal", quantity: 10, pricePerUnit: 26.00, subtotal: 260.00 }
    ]
  }
];
