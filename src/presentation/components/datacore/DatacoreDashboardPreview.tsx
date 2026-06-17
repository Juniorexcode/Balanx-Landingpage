import React from 'react';
import { Search, Bell, User, LayoutGrid, FileText, Wallet, Heart, BarChart3, Users, CheckCircle2, CircleDashed } from 'lucide-react';

export const DatacoreDashboardPreview: React.FC = () => {
  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto mt-16 px-4 pb-20">
      {/* Dashboard Container with Liquid Glass Effect */}
      <div className="relative rounded-2xl overflow-hidden bg-[#0A0614]/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-purple-900/20">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
          <h2 className="text-white font-general font-semibold text-2xl tracking-wide">
            Dashboard Overview
          </h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-datacore-primary transition-colors w-64"
              />
            </div>
            <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              <Bell size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-gradient-to-tr from-datacore-primary to-purple-400 p-[2px]">
              <div className="w-full h-full rounded-full bg-[#0A0614] flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row min-h-[500px]">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 border-r border-white/5 p-6 flex flex-col gap-8">
            {/* General Section */}
            <div>
              <p className="text-white/30 text-xs font-semibold mb-4 uppercase tracking-wider">General</p>
              <div className="flex flex-col gap-2">
                <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-datacore-primary text-white font-medium text-sm transition-colors">
                  <LayoutGrid size={18} /> Overview
                </button>
                <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 font-medium text-sm transition-colors">
                  <FileText size={18} /> Reports
                </button>
                <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 font-medium text-sm transition-colors">
                  <Wallet size={18} /> Wallets Manage
                </button>
                <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 font-medium text-sm transition-colors">
                  <Heart size={18} /> Favorite Transaction
                </button>
              </div>
            </div>

            {/* Metrics Section */}
            <div>
              <p className="text-white/30 text-xs font-semibold mb-4 uppercase tracking-wider">Metrics</p>
              <div className="flex flex-col gap-2">
                <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 font-medium text-sm transition-colors">
                  <BarChart3 size={18} /> Insights
                </button>
                <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 font-medium text-sm transition-colors">
                  <Users size={18} /> Followed
                </button>
              </div>
            </div>
          </div>

          {/* Table Area */}
          <div className="flex-1 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-white font-medium text-lg">Recent Activity Logs</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={14} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent border-b border-white/10 pl-9 pr-4 py-1 text-sm text-white focus:outline-none focus:border-datacore-primary transition-colors"
                />
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-white/40 text-xs uppercase tracking-wider border-b border-white/5">
                    <th className="pb-4 font-medium">Timestamp</th>
                    <th className="pb-4 font-medium">Status</th>
                    <th className="pb-4 font-medium">Amount</th>
                    <th className="pb-4 font-medium">Edge Type</th>
                    <th className="pb-4 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 text-white/70">2026-06-16 10:24</td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-500/10 text-yellow-500 text-xs font-medium border border-yellow-500/20">
                        <CircleDashed size={12} /> In Queue
                      </span>
                    </td>
                    <td className="py-4 text-white font-medium">$ 34,709.00</td>
                    <td className="py-4 text-white/60">International Transfer</td>
                    <td className="py-4 text-white/60">Validated</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 text-white/70">2026-06-15 18:50</td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                        <CheckCircle2 size={12} /> Processed
                      </span>
                    </td>
                    <td className="py-4 text-white font-medium">$ 12,450.50</td>
                    <td className="py-4 text-white/60">Loan Payment</td>
                    <td className="py-4 text-white/60">Updated</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 text-white/70">2026-06-14 09:30</td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                        <CheckCircle2 size={12} /> Paid
                      </span>
                    </td>
                    <td className="py-4 text-white font-medium">$ 8,200.00</td>
                    <td className="py-4 text-white/60">Credit Card</td>
                    <td className="py-4 text-white/60">Format</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
