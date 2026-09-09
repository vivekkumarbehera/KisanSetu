"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { api } from '@/lib/api';
import {
  District,
  Crop,
  ProductListing,
  DemandForecast,
  DashboardStats,
  Role,
  Order,
  OrderItem
} from '@/types';
import {
  ODISHA_DISTRICTS,
  CROPS_DATA,
  INITIAL_LISTINGS,
  DEMAND_FORECASTS,
  INITIAL_STATS,
  SAMPLE_ORDERS
} from '@/data/mockData';
import {
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  PlusCircle,
  ShieldCheck,
  Truck,
  Building2,
  Users,
  BadgePercent,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

export default function Home() {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState<string>('marketplace');
  const [currentRole, setCurrentRole] = useState<Role>('FARMER');

  // Core Data State
  const [districts, setDistricts] = useState<District[]>(ODISHA_DISTRICTS);
  const [crops, setCrops] = useState<Crop[]>(CROPS_DATA);
  const [listings, setListings] = useState<ProductListing[]>(INITIAL_LISTINGS);
  const [forecasts, setForecasts] = useState<DemandForecast[]>(DEMAND_FORECASTS);
  const [stats, setStats] = useState<DashboardStats>(INITIAL_STATS);
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [loading, setLoading] = useState<boolean>(true);

  // Marketplace Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [selectedQuality, setSelectedQuality] = useState<string>('ALL');
  const [organicOnly, setOrganicOnly] = useState<boolean>(false);

  // Cart & Checkout State
  const [cart, setCart] = useState<{ listing: ProductListing; qty: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  // New Listing Form State (Farmer Desk)
  const [newCropId, setNewCropId] = useState<number>(2); // Tomato default
  const [newDistrictId, setNewDistrictId] = useState<number>(7); // Cuttack default
  const [newQuantity, setNewQuantity] = useState<number>(500);
  const [newQuality, setNewQuality] = useState<'GRADE_A' | 'GRADE_B' | 'GRADE_C'>('GRADE_A');
  const [newPrice, setNewPrice] = useState<number>(29);
  const [newOrganic, setNewOrganic] = useState<boolean>(false);
  const [newDesc, setNewDesc] = useState<string>('Freshly harvested direct farm produce with high quality assurance.');
  const [listingSuccessMsg, setListingSuccessMsg] = useState<string | null>(null);

  // Admin Verification State
  const [pendingVerifications, setPendingVerifications] = useState<{ id: number; name: string; type: string; district: string; docs: string }[]>([
    { id: 101, name: "Pradipta Nayak", type: "Farmer (12 Acres)", district: "Bargarh", docs: "Kalia Scheme Reg & Land Patta #OD-8821" },
    { id: 102, name: "Utkal Krushi Vikas Sangh FPO", type: "FPO (320 Members)", district: "Balasore", docs: "Cooperative Reg #BAL-2024-FPO-91" },
    { id: 103, name: "Malkangiri Organic Millet Producers", type: "FPO (180 Tribal Members)", district: "Malkangiri", docs: "Odisha Millet Mission Cert #OMM-331" }
  ]);

  // Load from Backend API on mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [dList, cList, pList, fList, sData] = await Promise.all([
          api.getDistricts(),
          api.getCrops(),
          api.getProducts(),
          api.getForecasts(),
          api.getAdminStats()
        ]);
        if (dList && dList.length > 0) setDistricts(dList);
        if (cList && cList.length > 0) setCrops(cList);
        if (pList && pList.length > 0) setListings(pList);
        if (fList && fList.length > 0) setForecasts(fList);
        if (sData) setStats(sData);
      } catch (err) {
        console.warn("Backend API sync failed, fallback active", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter listings
  const filteredListings = listings.filter(item => {
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = item.crop?.name?.toLowerCase().includes(q);
      const matchSeller = item.seller?.name?.toLowerCase().includes(q);
      const matchDistrict = item.district?.name?.toLowerCase().includes(q);
      if (!matchName && !matchSeller && !matchDistrict) return false;
    }
    if (selectedCategory !== 'ALL' && item.crop?.category !== selectedCategory) {
      return false;
    }
    if (selectedDistrict !== 'ALL' && item.district?.name !== selectedDistrict) {
      return false;
    }
    if (selectedQuality !== 'ALL' && item.quality !== selectedQuality) {
      return false;
    }
    if (organicOnly && !item.organic) {
      return false;
    }
    return true;
  });

  // Add to cart handler
  const handleAddToCart = (item: ProductListing) => {
    setCart(prev => {
      const exists = prev.find(p => p.listing.id === item.id);
      if (exists) {
        return prev.map(p => p.listing.id === item.id ? { ...p, qty: p.qty + 50 } : p);
      }
      return [...prev, { listing: item, qty: 100 }];
    });
    setIsCartOpen(true);
  };

  // Checkout handler
  const handleCheckout = () => {
    if (cart.length === 0) return;
    const orderNum = `OD-AGRI-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const total = cart.reduce((sum, item) => sum + (item.listing.price * item.qty), 0);
    const newOrder: Order = {
      orderNumber: orderNum,
      buyerName: currentRole === 'BULK_BUYER' ? "Kalinga Fresh Retails Ltd" : "Priyadarshini Rout",
      buyerRole: currentRole,
      deliveryAddress: "Unit 4 Central Market, Bhubaneswar, Khordha - 751001",
      deliveryDistrict: "Khordha",
      status: "CONFIRMED",
      totalAmount: total,
      notes: "Direct procurement via KisanSetu Smart Fair Trade Contract",
      createdAt: new Date().toISOString(),
      items: cart.map(c => ({
        listingId: c.listing.id,
        cropName: c.listing.crop.name,
        quantity: c.qty,
        pricePerUnit: c.listing.price,
        subtotal: c.listing.price * c.qty
      }))
    };

    setOrders([newOrder, ...orders]);
    setStats(prev => ({
      ...prev,
      totalOrders: prev.totalOrders + 1,
      totalTransactionValue: prev.totalTransactionValue + total
    }));

    setOrderSuccess(orderNum);
    setCart([]);
  };

  // Farmer New Listing handler
  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    const crop = crops.find(c => c.id === Number(newCropId)) || crops[0];
    const dist = districts.find(d => d.id === Number(newDistrictId)) || districts[0];

    const newListing: ProductListing = {
      id: Date.now(),
      seller: {
        id: 99,
        name: "Bishnu Charan Das (Farmer)",
        email: "farmer.cuttack@kisansetu.in",
        role: "FARMER",
        verified: true
      },
      crop,
      district: dist,
      quantity: Number(newQuantity),
      availableQuantity: Number(newQuantity),
      quality: newQuality,
      price: Number(newPrice),
      harvestDate: new Date().toISOString().split('T')[0],
      availabilityDate: new Date().toISOString().split('T')[0],
      description: newDesc,
      organic: newOrganic,
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };

    setListings([newListing, ...listings]);
    setStats(prev => ({ ...prev, activeListings: prev.activeListings + 1 }));
    setListingSuccessMsg(`Successfully listed ${crop.name} (${newQuantity} ${crop.unit}) in ${dist.name}!`);
    setTimeout(() => setListingSuccessMsg(null), 5000);
  };

  // Verify farmer handler
  const handleApproveVerification = (id: number) => {
    setPendingVerifications(prev => prev.filter(v => v.id !== id));
    setStats(prev => ({ ...prev, verifiedUsers: prev.verifiedUsers + 1 }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        cartCount={cart.reduce((acc, i) => acc + 1, 0)}
        openCart={() => setIsCartOpen(true)}
      />

      {/* Hero Header Strip */}
      <div className="bg-gradient-to-r from-[#0F4324] via-[#1B5E20] to-[#0A3D1A] text-white border-b-4 border-amber-500 py-8 px-4 sm:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-800/80 px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 border border-emerald-600/50">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Odisha State Agricultural Marketing Board & NIC Initiative</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Odisha Farmer-to-Market Digital Bridge
            </h2>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Empowering Odisha&apos;s 14,800+ registered farmers and FPOs with zero middlemen, guaranteed fair prices, AI demand prediction, and state-wide cold-chain aggregation.
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15">
              <span className="text-xs text-emerald-200 font-medium">Fair Trade Value</span>
              <p className="text-xl font-bold text-amber-300">₹ {(stats.totalTransactionValue / 10000000).toFixed(2)} Cr</p>
              <span className="text-[10px] text-emerald-300">Statewide Mandis</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15">
              <span className="text-xs text-emerald-200 font-medium">Districts Linked</span>
              <p className="text-xl font-bold text-white">30 / 30</p>
              <span className="text-[10px] text-emerald-300">100% Coverage</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15">
              <span className="text-xs text-emerald-200 font-medium">Verified Farmers</span>
              <p className="text-xl font-bold text-emerald-400">{stats.totalFarmers.toLocaleString()}</p>
              <span className="text-[10px] text-emerald-300">218 FPOs Active</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15">
              <span className="text-xs text-emerald-200 font-medium">Wastage Cut</span>
              <p className="text-xl font-bold text-amber-400">-{stats.estimatedWastageReduction}%</p>
              <span className="text-[10px] text-emerald-300">Direct Route Save</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ========================================================= */}
        {/* VIEW 1: MARKETPLACE */}
        {/* ========================================================= */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by crop (Tomato, Rice, Turmeric...), farmer name, or district..."
                    className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                {/* District Filter */}
                <div className="w-full md:w-56">
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full py-2 px-3 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    <option value="ALL">📍 All 30 Districts</option>
                    {districts.map(d => (
                      <option key={d.id} value={d.name}>{d.name} ({d.activeListingsCount ?? 5} listings)</option>
                    ))}
                  </select>
                </div>

                {/* Quality Grade */}
                <div className="w-full md:w-44">
                  <select
                    value={selectedQuality}
                    onChange={(e) => setSelectedQuality(e.target.value)}
                    className="w-full py-2 px-3 text-sm border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    <option value="ALL">🏅 Any Quality Grade</option>
                    <option value="GRADE_A">Grade A (Premium)</option>
                    <option value="GRADE_B">Grade B (Standard)</option>
                    <option value="GRADE_C">Grade C (Bulk Processing)</option>
                  </select>
                </div>

                {/* Organic Checkbox */}
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={organicOnly}
                    onChange={(e) => setOrganicOnly(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>🌿 Certified Organic Only</span>
                </label>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span className="font-semibold text-slate-400 mr-1">Crop Type:</span>
                {['ALL', 'VEGETABLE', 'GRAIN', 'SPICE', 'OILSEED', 'CASH_CROP'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full font-medium transition ${
                      selectedCategory === cat
                        ? 'bg-emerald-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat === 'ALL' ? 'All Crops' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((item) => {
                const msp = item.crop?.msp ?? 20;
                const priceVsMsp = ((item.price - msp) / msp) * 100;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
                  >
                    <div className="p-5">
                      {/* Card Top: Badges */}
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <div className="flex flex-wrap gap-1.5">
                          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                            {item.crop?.category}
                          </span>
                          <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded border border-amber-200">
                            {item.quality.replace('_', ' ')}
                          </span>
                          {item.organic && (
                            <span className="bg-green-600 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                              ✓ Organic
                            </span>
                          )}
                        </div>
                        <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          <MapPin className="w-3 h-3 text-red-500" />
                          {item.district?.name}
                        </span>
                      </div>

                      {/* Title & Seller */}
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition mb-1">
                        {item.crop?.name}
                      </h3>
                      <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                        Sold by <strong className="text-slate-700">{item.seller?.name}</strong>
                        {item.seller?.verified && (
                          <span title="Govt Verified">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
                          </span>
                        )}
                      </p>

                      <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Stock & Freshness */}
                      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg text-xs mb-4 border border-slate-100">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Available Stock</span>
                          <strong className="text-slate-800 text-sm">
                            {item.availableQuantity} {item.crop?.unit}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Harvest Date</span>
                          <span className="text-slate-700 font-medium flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {item.harvestDate}
                          </span>
                        </div>
                      </div>

                      {/* Pricing Comparison */}
                      <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
                        <div>
                          <span className="text-2xl font-black text-[#0F4324]">
                            ₹{item.price.toFixed(2)}
                          </span>
                          <span className="text-xs text-slate-400 ml-1">/ {item.crop?.unit}</span>
                        </div>
                        <div className="text-right text-[11px]">
                          <span className="text-slate-400 block">Govt MSP: ₹{msp}/{item.crop?.unit}</span>
                          <span className={priceVsMsp >= 0 ? "text-emerald-600 font-semibold" : "text-red-500 font-semibold"}>
                            {priceVsMsp >= 0 ? `+${priceVsMsp.toFixed(0)}% vs MSP` : `${priceVsMsp.toFixed(0)}% vs MSP`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Action */}
                    <div className="p-3 bg-slate-50 border-t border-slate-100 flex gap-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 bg-[#0F4324] hover:bg-[#155A31] text-white py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        Procure Now / Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredListings.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-2" />
                <h4 className="text-base font-bold text-slate-800">No produce listings found</h4>
                <p className="text-xs text-slate-500 mt-1">Try relaxing your district or crop category filters.</p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: AI DEMAND FORECASTING & RADAR */}
        {/* ========================================================= */}
        {activeTab === 'forecast' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-6 rounded-2xl shadow-sm border border-emerald-700">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>AI Predictive Market Intelligence (FastAPI + Machine Learning Engine)</span>
              </div>
              <h3 className="text-2xl font-black mb-2">
                State-Wide 4-Week Agricultural Demand & Price Radar
              </h3>
              <p className="text-xs text-emerald-100/80 max-w-3xl leading-relaxed">
                Using historical mandi arrivals, weather projections, consumer demand data from urban centers (Bhubaneswar, Cuttack, Rourkela), our predictive models recommend harvest windows and geographic arbitrage routes to prevent distress selling.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {forecasts.map((f) => {
                const isIncreasing = f.trend === 'INCREASING';
                const isDecreasing = f.trend === 'DECREASING';
                return (
                  <div key={f.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl font-bold text-slate-900">{f.crop?.name}</span>
                          <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            {f.district?.name} District
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">Week {f.forecastWeek ?? 37}, 2026 Forecast</span>
                      </div>

                      {/* Trend Badge */}
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                        isIncreasing
                          ? 'bg-emerald-100 text-emerald-800'
                          : isDecreasing
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {isIncreasing && <TrendingUp className="w-3.5 h-3.5" />}
                        {isDecreasing && <TrendingDown className="w-3.5 h-3.5" />}
                        {!isIncreasing && !isDecreasing && <Minus className="w-3.5 h-3.5" />}
                        {f.trend} DEMAND
                      </span>
                    </div>

                    {/* Demand Comparison Bar */}
                    <div className="space-y-3 mb-5">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500">Current Market Demand</span>
                          <strong className="text-slate-800">{f.currentDemand.toLocaleString()} {f.crop?.unit}</strong>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-slate-400 rounded-full"
                            style={{ width: '60%' }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500">Predicted Demand (Next 30 Days)</span>
                          <strong className={isIncreasing ? "text-emerald-700 font-bold" : "text-slate-800"}>
                            {f.predictedDemand.toLocaleString()} {f.crop?.unit}
                          </strong>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isIncreasing ? 'bg-emerald-600' : isDecreasing ? 'bg-amber-500' : 'bg-blue-500'}`}
                            style={{ width: `${Math.min(100, (f.predictedDemand / f.currentDemand) * 60)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Recommendation Box */}
                    <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5 text-xs text-emerald-900 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-semibold block mb-0.5">AI Farmer Advisory:</strong>
                        <span>{f.recommendation}</span>
                      </div>
                    </div>

                    {/* Confidence Meter */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400">
                      <span>Model Confidence: <strong>{((f.confidenceScore ?? 0.9) * 100).toFixed(0)}%</strong></span>
                      <span className="text-emerald-700 font-semibold cursor-pointer hover:underline">
                        View Price Sensitivity Chart &rarr;
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: ODISHA 30 DISTRICTS HEATMAP */}
        {/* ========================================================= */}
        {activeTab === 'districts' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Odisha Agricultural Production Status Across All 30 Districts
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Click any district to view its major crops, surplus/deficit status, and jump straight to its marketplace listings.
                  </p>
                </div>
                <div className="flex gap-2 text-xs font-semibold">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
                    ● Surplus (Exportable)
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full border border-blue-300">
                    ● Balanced (Self-sufficient)
                  </span>
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-300">
                    ● Deficit (Importing)
                  </span>
                </div>
              </div>

              {/* 30 Districts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {districts.map((d) => {
                  const isSurplus = d.surplusDeficitStatus === 'SURPLUS';
                  const isDeficit = d.surplusDeficitStatus === 'DEFICIT';
                  return (
                    <div
                      key={d.id}
                      onClick={() => {
                        setSelectedDistrict(d.name);
                        setActiveTab('marketplace');
                      }}
                      className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-600 bg-slate-50/50 hover:bg-emerald-50/40 cursor-pointer transition flex flex-col justify-between group shadow-sm"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-sm text-slate-800 group-hover:text-emerald-800">
                            {d.name}
                          </span>
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            isSurplus ? 'bg-emerald-500' : isDeficit ? 'bg-amber-500' : 'bg-blue-500'
                          }`}></span>
                        </div>
                        <p className="text-[11px] text-slate-500 mb-2">
                          {d.majorCrops?.slice(0, 2).join(', ') || 'Rice, Veg'}
                        </p>
                      </div>

                      <div className="flex justify-between items-center text-[10px] pt-2 border-t border-slate-200/60">
                        <span className="text-emerald-700 font-semibold">{d.activeListingsCount ?? 5} active lots</span>
                        <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 4: FARMER DESK / LISTING CREATOR */}
        {/* ========================================================= */}
        {activeTab === 'farmer-desk' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form Section */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                  <PlusCircle className="w-5 h-5 text-emerald-700" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">List New Agricultural Produce</h3>
                    <p className="text-xs text-slate-500">Directly post your harvest lot to thousands of buyers with zero commission.</p>
                  </div>
                </div>

                {listingSuccessMsg && (
                  <div className="mb-4 p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-lg text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>{listingSuccessMsg}</span>
                  </div>
                )}

                <form onSubmit={handleCreateListing} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Crop selection */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Select Crop</label>
                      <select
                        value={newCropId}
                        onChange={(e) => setNewCropId(Number(e.target.value))}
                        className="w-full p-2.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      >
                        {crops.map(c => (
                          <option key={c.id} value={c.id}>{c.name} ({c.category}) - Unit: {c.unit}</option>
                        ))}
                      </select>
                    </div>

                    {/* District selection */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Farm District</label>
                      <select
                        value={newDistrictId}
                        onChange={(e) => setNewDistrictId(Number(e.target.value))}
                        className="w-full p-2.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      >
                        {districts.map(d => (
                          <option key={d.id} value={d.id}>{d.name} District</option>
                        ))}
                      </select>
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Harvest Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(Number(e.target.value))}
                        className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Expected Price per Unit (₹)
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="0.5"
                        value={newPrice}
                        onChange={(e) => setNewPrice(Number(e.target.value))}
                        className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>

                    {/* Quality */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Quality Grade</label>
                      <select
                        value={newQuality}
                        onChange={(e) => setNewQuality(e.target.value as any)}
                        className="w-full p-2.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      >
                        <option value="GRADE_A">Grade A (Premium / Export Quality)</option>
                        <option value="GRADE_B">Grade B (Standard Market Quality)</option>
                        <option value="GRADE_C">Grade C (Bulk Food Processing)</option>
                      </select>
                    </div>

                    {/* Organic Toggle */}
                    <div className="flex items-center pt-5">
                      <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newOrganic}
                          onChange={(e) => setNewOrganic(e.target.checked)}
                          className="w-4 h-4 text-emerald-600 rounded"
                        />
                        <span>Certified Organic Produce</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Lot Description & Notes</label>
                    <textarea
                      rows={2}
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0F4324] hover:bg-[#155A31] text-white py-3 rounded-lg font-bold text-xs transition shadow-sm"
                  >
                    Publish Listing to Odisha Marketplace
                  </button>
                </form>
              </div>

              {/* Farmer Quick Advisory */}
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl text-xs text-amber-900 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
                    <ShieldCheck className="w-5 h-5 text-amber-700" />
                    <span>Fair-Price Guarantee</span>
                  </div>
                  <p className="leading-relaxed">
                    Under the Odisha Agri Marketplace framework, prices are verified against real-time mandi data from e-NAM and OSAMB.
                  </p>
                  <div className="bg-white p-3 rounded-lg border border-amber-200 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Government MSP:</span>
                      <strong className="text-slate-800">Protected Baseline</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Payment Security:</span>
                      <strong className="text-emerald-700">100% Escrow Hold</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-900 text-white p-5 rounded-2xl text-xs space-y-2">
                  <h4 className="font-bold text-sm text-emerald-200">Krushak Odisha Direct Benefits</h4>
                  <p className="text-emerald-100/80 leading-relaxed">
                    Deliveries automatically qualify for subsidized cold storage at nearest district PACs or OSAMB hubs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 5: GOVERNMENT INTELLIGENCE & ADMIN HUB */}
        {/* ========================================================= */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            {/* Top Stat Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-400 font-medium">Verified Farmers & FPOs</span>
                <p className="text-2xl font-black text-slate-900 mt-1">{stats.verifiedUsers.toLocaleString()}</p>
                <span className="text-[11px] text-emerald-600 font-medium">96% verified status</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-400 font-medium">Total Orders Fulfilled</span>
                <p className="text-2xl font-black text-slate-900 mt-1">{stats.totalOrders.toLocaleString()}</p>
                <span className="text-[11px] text-blue-600 font-medium">{stats.completedOrders} completed</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-400 font-medium">Gross Platform Trade</span>
                <p className="text-2xl font-black text-[#0F4324] mt-1">₹ {(stats.totalTransactionValue / 100000).toFixed(1)} Lakh</p>
                <span className="text-[11px] text-emerald-600 font-medium">Direct to farmer bank acct</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-400 font-medium">Post-Harvest Wastage Cut</span>
                <p className="text-2xl font-black text-amber-600 mt-1">18.5%</p>
                <span className="text-[11px] text-slate-500 font-medium">Target: 25% by Dec 2026</span>
              </div>
            </div>

            {/* Verification Queue Section */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Farmer & FPO Verification Queue</h3>
                  <p className="text-xs text-slate-500">Authorize authentic farming certificates and Kalia beneficiary registries.</p>
                </div>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">
                  {pendingVerifications.length} Pending
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {pendingVerifications.map((v) => (
                  <div key={v.id} className="py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                    <div>
                      <strong className="text-slate-800 text-sm block">{v.name}</strong>
                      <span className="text-slate-500">{v.type} • {v.district} District • {v.docs}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApproveVerification(v.id)}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve Verification
                      </button>
                    </div>
                  </div>
                ))}

                {pendingVerifications.length === 0 && (
                  <div className="text-center py-6 text-xs text-slate-400">
                    All verifications are up to date!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 6: SMART LOGISTICS & ROUTE OPTIMIZATION */}
        {/* ========================================================= */}
        {activeTab === 'logistics' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-5 h-5 text-emerald-700" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Odisha Agri-Logistics & Multi-Farmer Route Optimizer</h3>
                  <p className="text-xs text-slate-500">Combining nearby farm pickups into shared reefer trucks to slash transport cost by 40%.</p>
                </div>
              </div>

              {/* Route cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Active Corridors: Route OD-RT-01
                      </span>
                      <h4 className="font-bold text-slate-800 text-sm mt-1">Athagarh (Cuttack) &rarr; Choudwar &rarr; Bhubaneswar</h4>
                    </div>
                    <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      IN TRANSIT
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 bg-white p-3 rounded-lg border border-slate-200">
                    <p><strong>Cargo:</strong> 650 kg Tomato, 450 kg Brinjal (Grade A)</p>
                    <p><strong>Vehicle:</strong> Ashok Leyland Cold-Reefer (OD-05-AA-4412)</p>
                    <p><strong>Capacity Utilization:</strong> 88% (Optimal)</p>
                    <p><strong>Est. Fuel Savings:</strong> ₹ 1,450 vs individual farmer trips</p>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Scheduled Corridor: Route OD-RT-02
                      </span>
                      <h4 className="font-bold text-slate-800 text-sm mt-1">Sambalpur Mandi &rarr; Bargarh &rarr; Rourkela</h4>
                    </div>
                    <span className="bg-blue-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      PICKUP READY
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 bg-white p-3 rounded-lg border border-slate-200">
                    <p><strong>Cargo:</strong> 4,200 kg Swarna Paddy + Cauliflower</p>
                    <p><strong>Vehicle:</strong> Heavy Duty Covered 16T Truck (OD-15-B-9920)</p>
                    <p><strong>Capacity Utilization:</strong> 94%</p>
                    <p><strong>Est. Fuel Savings:</strong> ₹ 3,800 saved via collective transit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Cart Drawer / Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">Procurement Cart</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">
                    {cart.length} items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {orderSuccess && (
                <div className="my-4 p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-sm text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Direct Procurement Confirmed!</span>
                  </div>
                  <p>Order ID: <strong>{orderSuccess}</strong></p>
                  <p className="text-[11px] text-emerald-700">
                    Farmer notification dispatched. Cold chain vehicle scheduled for farm gate pickup.
                  </p>
                </div>
              )}

              {cart.length === 0 && !orderSuccess && (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Your procurement cart is empty. Add produce from the marketplace!
                </div>
              )}

              <div className="divide-y divide-slate-100 my-4">
                {cart.map((c, idx) => (
                  <div key={idx} className="py-3 flex justify-between items-center text-xs">
                    <div>
                      <strong className="text-slate-800 text-sm block">{c.listing.crop.name}</strong>
                      <span className="text-slate-500">
                        {c.qty} {c.listing.crop.unit} • ₹{c.listing.price}/{c.listing.crop.unit}
                      </span>
                      <p className="text-[10px] text-emerald-700">From {c.listing.seller.name} ({c.listing.district.name})</p>
                    </div>
                    <div className="text-right">
                      <strong className="text-slate-900 font-bold block">
                        ₹{(c.qty * c.listing.price).toFixed(2)}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex justify-between items-center text-sm font-bold text-slate-900">
                  <span>Total Amount (Direct to Farmer)</span>
                  <span className="text-xl text-[#0F4324]">
                    ₹{cart.reduce((sum, item) => sum + (item.listing.price * item.qty), 0).toFixed(2)}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  🔒 Protected by Odisha Krushak Direct Escrow. Delivery to Bhubaneswar/Cuttack within 24h.
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#0F4324] hover:bg-[#155A31] text-white py-3 rounded-lg font-bold text-xs transition shadow-sm"
                >
                  Confirm & Place Direct Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
