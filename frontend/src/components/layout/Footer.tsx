import React from 'react';
import { ShieldCheck, PhoneCall, Globe2, Award, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B3B17] text-white border-t-4 border-amber-500 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-xl">
                କୃ
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">KisanSetu Odisha</h3>
                <p className="text-xs text-emerald-300">Govt Digital Agri Marketplace</p>
              </div>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Empowering Odisha&apos;s farming community through direct market access, AI-driven demand forecasting, cold-chain route optimization, and transparent digital procurement.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300">
              <ShieldCheck className="w-4 h-4" />
              <span>100% MSP Verified & Direct Fair-Trade</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-4">
              Agri Portals
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li><a href="#" className="hover:text-white transition">Krushak Odisha Portal</a></li>
              <li><a href="#" className="hover:text-white transition">Kalia Scheme Beneficiary</a></li>
              <li><a href="#" className="hover:text-white transition">Odisha State Agri Marketing Board (OSAMB)</a></li>
              <li><a href="#" className="hover:text-white transition">e-NAM Mandi Integration</a></li>
              <li><a href="#" className="hover:text-white transition">APICOL Agri Enterprises</a></li>
            </ul>
          </div>

          {/* Districts Coverage */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-4">
              Statewide Coverage
            </h4>
            <p className="text-xs text-emerald-100/80 leading-relaxed mb-3">
              Connected across all <strong>30 Districts of Odisha</strong>, 314 Blocks, and 6,798 Gram Panchayats with real-time crop arrival tracking.
            </p>
            <div className="bg-emerald-950/60 p-3 rounded-lg border border-emerald-800 text-xs">
              <div className="flex justify-between items-center mb-1">
                <span className="text-emerald-300">Active Mandis:</span>
                <span className="font-bold text-white">64 Primary</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-emerald-300">Onboarded FPOs:</span>
                <span className="font-bold text-amber-400">218 Verified</span>
              </div>
            </div>
          </div>

          {/* Support & Helplines */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-4">
              Farmer Support & Grievance
            </h4>
            <div className="space-y-3 text-xs text-emerald-100/80">
              <div className="flex items-start gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Krushak Helpline (Toll Free):</p>
                  <p className="text-amber-300 font-mono text-sm">155333 / 1800-180-1551</p>
                  <p className="text-[10px] text-emerald-200">Daily 6:00 AM - 10:00 PM (Odia, English, Hindi)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Globe2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Agri Directorate:</p>
                  <p>Krushi Bhavan, Keshari Nagar, Bhubaneswar, Odisha 751001</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-emerald-900 mt-8 pt-6 flex flex-wrap justify-between items-center gap-4 text-xs text-emerald-300">
          <p>© 2026 Government of Odisha. Designed and maintained for Farmer Prosperity.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Hyperlink Policy</a>
            <a href="#" className="hover:underline">Security Audit Certified</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
