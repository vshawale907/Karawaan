import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, Inbox, CheckCircle2, Clock, AlertCircle,
  Building2, ArrowRight, Eye, MapPin, Calendar, X, ShieldCheck, Settings
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { partners, chartData } from '../../data/dummyData';

const COLORS = ['#C9A84C', '#2D6A4F', '#A07B2E', '#ECFDF5', '#F4E0A1'];

const StatCard = ({ label, value, sub, icon: Icon, trend, color }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.01 }}
    transition={{ duration: 0.25 }}
    className="glass-card-dark p-6 relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity ${color}`} />
    <div className="flex items-start justify-between mb-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color} bg-opacity-20`}>
        <Icon size={20} className="text-slate-800 dark:text-white" />
      </div>
      {trend && (
        <span className={`flex items-center gap-1 text-xs font-semibold ${trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(trend)}%
        </span>
      )}
    </div>
    <p className="font-display text-3xl text-slate-800 dark:text-white font-semibold mb-1">{value}</p>
    <p className="text-slate-400 dark:text-white/40 text-xs tracking-wide">{label}</p>
    {sub && <p className="text-gold/70 text-xs mt-1">{sub}</p>}
  </motion.div>
);

export default function AdminDashboard() {
  const { inquiries, theme } = useApp();
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Live Stats calculations
  const total = inquiries.length;
  const pending = inquiries.filter(i => i.status === 'pending' || i.status === 'new').length;
  const completed = inquiries.filter(i => i.status === 'approved' || i.status === 'closed').length;
  
  const recentInquiries = inquiries.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-200/80 dark:border-white/5 pb-4">
        <div>
          <h1 className="font-display text-3xl font-light text-slate-800 dark:text-white mb-1">
            Dashboard Overview
          </h1>
          <p className="text-slate-400 dark:text-white/45 text-sm">
            Welcome back Admin. Here's a live status of Karawaan B2B traveler inquiry streams.
          </p>
        </div>
        <span className="text-slate-400 dark:text-white/25 text-xs hidden md:block mt-2">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Inquiries" value={total} sub="+18% this month" icon={Inbox} trend={18} color="bg-gold" />
        <StatCard label="Pending Approval" value={pending} sub="Require attention" icon={AlertCircle} trend={5} color="bg-orange-500" />
        <StatCard label="Deals Completed" value={completed} sub="Target finalized" icon={CheckCircle2} trend={22} color="bg-emerald-500" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6">
        {/* Area Chart */}
        <div className="glass-card-dark p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-sm">Inquiry & Closure Trends</h3>
              <p className="text-slate-400 dark:text-white/30 text-xs mt-0.5 font-medium">Last 6 months volume performance</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs border border-gold/20">2026</span>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorInq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorClosed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke={theme === 'dark' ? '#ffffff30' : '#00000030'} fontSize={10} tickLine={false} />
                <YAxis stroke={theme === 'dark' ? '#ffffff30' : '#00000030'} fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#0D1117' : '#FFFFFF',
                    border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '12px'
                  }}
                />
                <Legend iconType="circle" />
                <Area type="monotone" dataKey="inquiries" name="Inquiries Received" stroke="#C9A84C" strokeWidth={2} fill="url(#colorInq)" />
                <Area type="monotone" dataKey="closed" name="Deals Finalized" stroke="#2D6A4F" strokeWidth={2} fill="url(#colorClosed)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-200/80 dark:border-white/5">
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-white text-sm">Recent Traveler Submissions</h3>
            <p className="text-slate-400 dark:text-white/30 text-xs mt-0.5">Live traveler queries submitted by agents</p>
          </div>
          <Link to="/admin/inquiries" className="text-gold text-xs font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/5 text-slate-400 dark:text-white/30 text-[10px] tracking-wider uppercase font-semibold">
                <th className="py-3.5 px-6">ID</th>
                <th className="py-3.5 px-6">Agent</th>
                <th className="py-3.5 px-6">Client</th>
                <th className="py-3.5 px-6">Destination</th>
                <th className="py-3.5 px-6">Budget</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {recentInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-6 font-mono font-bold text-xs text-slate-800 dark:text-white">{inq.id}</td>
                  <td className="py-3.5 px-6 font-semibold text-slate-800 dark:text-white">{inq.agentName}</td>
                  <td className="py-3.5 px-6">{inq.clientName}</td>
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-1">
                      <MapPin size={11} className="text-gold" />
                      <span>{inq.destination}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-6 font-medium text-slate-700 dark:text-white/70">{inq.budget}</td>
                  <td className="py-3.5 px-6">
                    <span className={
                      inq.status === 'new' || inq.status === 'pending'
                        ? 'badge-pending'
                        : inq.status === 'approved'
                        ? 'badge-closed'
                        : inq.status === 'rejected'
                        ? 'badge-new'
                        : 'badge-followup'
                    }>
                      {inq.status === 'new' ? 'New' : inq.status === 'pending' ? 'Pending' : inq.status === 'approved' ? 'Approved' : inq.status === 'rejected' ? 'Rejected' : 'In Progress'}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      onClick={() => setSelectedInquiry(inq)}
                      className="p-1 text-gold hover:text-gold-dark cursor-pointer font-semibold inline-flex items-center gap-1.5 text-xs hover:underline"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {/* Inquiry Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setSelectedInquiry(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl z-10"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-4 mb-6">
                <div>
                  <span className="font-mono text-xs font-bold text-gold">{selectedInquiry.id}</span>
                  <h3 className="font-display text-xl font-semibold text-slate-800 dark:text-white mt-1">
                    Inquiry Inspector
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 dark:text-white/40 text-[9px] uppercase tracking-wider block">Submitted By Agent</span>
                    <span className="font-semibold text-slate-800 dark:text-white block mt-0.5">{selectedInquiry.agentName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-white/40 text-[9px] uppercase tracking-wider block">Client Name</span>
                    <span className="font-semibold text-slate-800 dark:text-white block mt-0.5">{selectedInquiry.clientName}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 dark:text-white/40 text-[9px] uppercase tracking-wider block">Destination</span>
                    <span className="font-semibold text-slate-800 dark:text-white block mt-0.5">{selectedInquiry.destination}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-white/40 text-[9px] uppercase tracking-wider block">Travel Group Budget</span>
                    <span className="font-semibold text-gold block mt-0.5">{selectedInquiry.budget}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 dark:text-white/40 text-[9px] uppercase tracking-wider block">Travel Date</span>
                    <span className="text-slate-700 dark:text-white/70 block mt-0.5">{selectedInquiry.dateFrom}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-white/40 text-[9px] uppercase tracking-wider block">Travelers Pax</span>
                    <span className="text-slate-700 dark:text-white/70 block mt-0.5">{selectedInquiry.travelers || '2 Adults'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 dark:text-white/40 text-[9px] uppercase tracking-wider block">Requirements & Notes</span>
                  <p className="text-slate-600 dark:text-white/60 text-xs bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl p-3.5 mt-1 leading-relaxed">
                    {selectedInquiry.requirements || 'No special requirements listed.'}
                  </p>
                </div>

                {selectedInquiry.fileName && (
                  <div className="p-3.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 dark:text-white/40 text-[9px] uppercase tracking-wider block">Passport scan</span>
                      <span className="text-slate-800 dark:text-white text-xs font-semibold block mt-0.5">{selectedInquiry.fileName}</span>
                    </div>
                    <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                      Scanned Verified ✅
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/5 flex gap-3 justify-end">
                <Link to="/admin/inquiries" onClick={() => setSelectedInquiry(null)} className="btn-primary text-xs px-6 py-2.5">
                  Manage Inquiry Status
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
