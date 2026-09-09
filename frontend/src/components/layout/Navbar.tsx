"use client";

import React from 'react';
import { Role } from '@/types';
import { ShoppingCart, ShieldCheck, Sprout, Building2, Store, Truck, Landmark, PhoneCall, Globe2 } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  cartCount: number;
  openCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentRole,
  setCurrentRole,
  cartCount,
  openCart
}) => {
  const roleBadges: Record<Role, { label: string; icon: any; color: string }> = {
    FARMER: { label: "Farmer (Bishnu - Cuttack)", icon: Sprout, color: "bg-emerald-700 text-white" },
    FPO: { label: "FPO (Maa Samaleswari)", icon: Building2, color: "bg-teal-700 text-white" },
    BULK_BUYER: { label: "Bulk Buyer (Kalinga Fresh)", icon: Store, color: "bg-blue-700 text-white" },
    CONSUMER: { label: "Consumer (Priyadarshini)", icon: ShoppingCart, color: "bg-indigo-700 text-white" },
    LOGISTICS: { label: "Logistics (Utkal Express)", icon: Truck, color: "bg-amber-700 text-white" },
    GOVERNMENT_ADMIN: { label: "Govt Admin (Agri Dept)", icon: Landmark, color: "bg-rose-800 text-white" },
  };

  const navItems = [
    { id: 'marketplace', label: 'Marketplace', odia: 'ବଜାର', icon: Store },
    { id: 'forecast', label: 'AI Demand Radar', odia: 'ପୂର୍ବାନୁମାନ', icon: Sprout },
    { id: 'districts', label: 'Odisha Districts (30)', odia: 'ଜିଲ୍ଲା ସ୍ଥିତି', icon: Globe2 },
    { id: 'farmer-desk', label: 'Farmer Portal', odia: 'ଚାଷୀ ପୋର୍ଟାଲ', icon: Sprout },
    { id: 'logistics', label: 'Smart Logistics', odia: 'ପରିବହନ', icon: Truck },
    { id: 'admin', label: 'Govt Intelligence', odia: 'ସରକାରୀ ତଥ୍ୟ', icon: Landmark },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-emerald-900/10 shadow-sm">
      {/* Top Gov Info Bar */}
      <div className="bg-[#0B3B17] text-white text-xs py-1.5 px-4 sm:px-8 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold tracking-wide">GOVERNMENT OF ODISHA</span>
          <span className="text-emerald-300">|</span>
          <span>Department of Agriculture & Farmers&apos; Empowerment</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-emerald-200">
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            Krushak Odisha Helpline: <strong className="text-white ml-1">155333</strong> (Toll Free)
          </span>
          <span className="bg-emerald-800/80 px-2 py-0.5 rounded text-[11px] font-mono">
            OD-AGRI-PROD-2026
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap justify-between items-center gap-4">
        {/* Logo & Brand */}
        <div 
          onClick={() => setActiveTab('marketplace')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0F4324] to-[#2E7D32] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <span className="text-2xl font-bold">କୃ</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-[#0F4324]">
                Kisan<span className="text-amber-600">Setu</span>
              </h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                ODISHA
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              ଓଡ଼ିଶା ସରକାରୀ ଡିଜିଟାଲ କୃଷି ମଞ୍ଚ • Direct Agri Marketplace
            </p>
          </div>
        </div>

        {/* Persona Switcher & Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg p-1 text-xs">
            <span className="text-slate-500 font-medium px-1">Active Persona:</span>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as Role)}
              className="bg-white font-semibold text-slate-800 border border-slate-300 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer"
            >
              <option value="FARMER">🌾 Bishnu Das (Farmer, Cuttack)</option>
              <option value="FPO">🏢 Maa Samaleswari FPO (Sambalpur)</option>
              <option value="BULK_BUYER">🛒 Kalinga Fresh (Bulk Buyer)</option>
              <option value="CONSUMER">🥗 Priyadarshini (Consumer)</option>
              <option value="LOGISTICS">🚚 Utkal Express (Logistics)</option>
              <option value="GOVERNMENT_ADMIN">🏛️ Dr. Ramesh Mohapatra (Govt Admin)</option>
            </select>
          </div>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
          >
            <ShoppingCart className="w-4 h-4 text-emerald-700" />
            <span>Procurement Cart</span>
            {cartCount > 0 && (
              <span className="bg-amber-600 text-white rounded-full px-1.5 py-0.2 text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="bg-slate-50/80 border-t border-slate-200 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-semibold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-[#0F4324] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                <span className={`text-[10px] opacity-75 font-normal ${isActive ? 'text-emerald-200' : 'text-slate-400'}`}>
                  ({item.odia})
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
