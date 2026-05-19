import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, Inbox, CheckCircle2, Clock, AlertCircle,
  Building2, Map, ArrowRight, MoreHorizontal, Eye, ChevronUp
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { motion as m } from 'framer-motion';
import { inquiries, stats, chartData, destinationStats, partners } from '../../data/dummyData';
import { StatusBadge } from '../../components/ui';

const COLORS = ['#C9A84C', '#2D6A4F', '#3B82F6', '#EC4899', '#8B5CF6'];

const StatCard = ({ label, value, sub, icon: Icon, trend, color }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.01 }}
    transition={{ duration: 0.25 }}
    className="glass-card-dark p-6 relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity ${color}`} />
    <div className="flex items-start justify-between mb-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color} bg-opacity-20`}>
        <Icon size={20} className="text-white" />
      </div>
      {trend && (
        <span className={`flex items-center gap-1 text-xs font-semibold ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(trend)}%
        </span>
      )}
    </div>
    <p className="font-display text-3xl text-white font-semibold mb-1">{value}</p>
    <p className="text-white/40 text-xs tracking-wide">{label}</p>
    {sub && <p className="text-gold/70 text-xs mt-1">{sub}</p>}
  </motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0D1117] border border-white/10 rounded-xl p-3 shadow-luxury text-xs">
        <p className="text-white/50 mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }} className="font-medium">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const recentInquiries = inquiries.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl text-white mb-1">Dashboard Overview</h1>
          <p className="text-white/35 text-sm">Welcome back. Here's what's happening with Karawaan today.</p>
        </div>
        <span className="text-white/25 text-xs hidden md:block">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Inquiries" value={stats.totalInquiries} sub={`${stats.monthlyGrowth} this month`} icon={Inbox} trend={18} color="bg-gold" />
        <StatCard label="Active Inquiries" value={stats.activeInquiries} sub="Require attention" icon={AlertCircle} trend={5} color="bg-orange-500" />
        <StatCard label="Deals Closed" value={stats.closedDeals} sub="This quarter" icon={CheckCircle2} trend={22} color="bg-emerald-500" />
        <StatCard label="Revenue (Est.)" value={stats.revenue} sub="Total processed" icon={TrendingUp} trend={31} color="bg-blue-500" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass-card-dark p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-white text-sm">Inquiry & Closure Trends</h3>
              <p className="text-white/30 text-xs mt-0.5">Last 6 months performance</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs border border-gold/20">2026</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorInq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorClosed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="inquiries" name="Inquiries" stroke="#C9A84C" strokeWidth={2} fill="url(#colorInq)" />
              <Area type="monotone" dataKey="closed" name="Closed" stroke="#2D6A4F" strokeWidth={2} fill="url(#colorClosed)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-card-dark p-6"
        >
          <h3 className="font-semibold text-white text-sm mb-1">Top Destinations</h3>
          <p className="text-white/30 text-xs mb-4">Inquiry distribution</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={destinationStats} cx="50%" cy="50%" innerRadius={50} outerRadius={75}
                dataKey="value" paddingAngle={3}>
                {destinationStats.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {destinationStats.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-white/50">{d.name}</span>
                </div>
                <span className="text-white/70 font-medium">{d.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'New', count: inquiries.filter(i => i.status === 'new').length, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
          { label: 'Pending', count: inquiries.filter(i => i.status === 'pending').length, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
          { label: 'Follow-Up', count: inquiries.filter(i => i.status === 'follow-up').length, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
          { label: 'Closed', count: inquiries.filter(i => i.status === 'closed').length, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
        ].map((s) => (
          <motion.div
            key={s.label}
            whileHover={{ y: -3 }}
            className={`${s.bg} border ${s.border} rounded-2xl p-5 text-center`}
          >
            <p className={`font-display text-3xl font-bold ${s.color} mb-1`}>{s.count}</p>
            <p className="text-white/40 text-xs tracking-wider uppercase">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Inquiries Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="glass-card-dark overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div>
            <h3 className="font-semibold text-white text-sm">Recent Inquiries</h3>
            <p className="text-white/30 text-xs mt-0.5">Latest submissions requiring attention</p>
          </div>
          <Link to="/admin/inquiries" className="text-gold text-xs hover:text-gold-light flex items-center gap-1 transition-colors">
            View All <ArrowRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['ID', 'Agent', 'Client', 'Destination', 'Travelers', 'Budget', 'Status', ''].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-white/30 text-xs tracking-wider uppercase font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map((inq, i) => (
                <motion.tr
                  key={inq.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                  className="border-b border-white/3 hover:bg-white/3 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-gold/80 text-xs">{inq.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white text-xs font-medium">{inq.agentName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white/70 text-xs">{inq.clientName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <Map size={11} className="text-gold/60 flex-shrink-0" />
                      <span className="text-white/60 text-xs">{inq.destination}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white/60 text-xs">{inq.travelers} pax</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-emerald-400/80 text-xs font-medium">{inq.budget}</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={inq.status} />
                  </td>
                  <td className="px-6 py-4">
                    <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-gold transition-all">
                      <Eye size={14} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Partners Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="glass-card-dark p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-white text-sm">Partner Agencies</h3>
            <Link to="/admin/partners" className="text-gold text-xs flex items-center gap-1">
              Manage <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {partners.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/3 transition-colors">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-xs font-bold">{p.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium truncate">{p.name}</p>
                  <p className="text-white/30 text-[10px]">{p.country}</p>
                </div>
                <div className="text-right">
                  <p className="text-gold text-xs font-semibold">{p.activePackages}</p>
                  <p className="text-white/25 text-[10px]">packages</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          className="glass-card-dark p-6"
        >
          <h3 className="font-semibold text-white text-sm mb-5">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'New Inquiry', path: '/inquiry', icon: Inbox, color: 'bg-gold/10 border-gold/20 hover:bg-gold/20' },
              { label: 'View Follow-Ups', path: '/admin/followups', icon: Clock, color: 'bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20' },
              { label: 'Manage Partners', path: '/admin/partners', icon: Building2, color: 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20' },
              { label: 'All Inquiries', path: '/admin/inquiries', icon: Eye, color: 'bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20' },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.path}
                className={`flex flex-col items-center justify-center gap-2 p-5 rounded-xl border ${action.color} transition-all duration-200 text-center group`}
              >
                <action.icon size={20} className="text-white/60 group-hover:text-white transition-colors" />
                <span className="text-white/50 text-xs group-hover:text-white/80 transition-colors">{action.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
