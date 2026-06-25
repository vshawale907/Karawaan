import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Compass, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#C9A84C', '#2D6A4F', '#A07B2E', '#ECFDF5', '#F4E0A1'];

export default function AnalyticsPage() {
  const { currentUser, inquiries, theme } = themeHook();
  
  // Custom theme hook helper just in case
  function themeHook() {
    return useApp();
  }

  const isAdmin = currentUser?.role === 'admin';

  // Filter based on role
  const relevantInquiries = isAdmin
    ? inquiries
    : inquiries.filter(inq => 
        inq.agentName.toLowerCase().includes(currentUser?.name.toLowerCase()) ||
        inq.agentName === 'Demo Travel Agent' ||
        inq.agentName === 'Rajesh Sharma'
      );

  const total = relevantInquiries.length;
  const approved = relevantInquiries.filter(i => i.status === 'approved').length;
  const inProgress = relevantInquiries.filter(i => i.status === 'in-progress').length;
  const pending = relevantInquiries.filter(i => i.status === 'pending').length;

  // Pie chart structure
  const statusData = [
    { name: 'Approved', value: approved || 4 },
    { name: 'In Progress', value: inProgress || 2 },
    { name: 'Pending', value: pending || 3 },
  ];

  // Mock monthly trends
  const monthlyData = isAdmin
    ? [
        { month: 'Jan', Leads: 32, Conversions: 24 },
        { month: 'Feb', Leads: 45, Conversions: 38 },
        { month: 'Mar', Leads: 58, Conversions: 47 },
        { month: 'Apr', Leads: 62, Conversions: 52 },
        { month: 'May', Leads: 71, Conversions: 58 },
        { month: 'Jun', Leads: total + 12, Conversions: approved + 8 },
      ]
    : [
        { month: 'Jan', Leads: 5, Conversions: 3 },
        { month: 'Feb', Leads: 8, Conversions: 6 },
        { month: 'Mar', Leads: 12, Conversions: 8 },
        { month: 'Apr', Leads: 10, Conversions: 7 },
        { month: 'May', Leads: 15, Conversions: 11 },
        { month: 'Jun', Leads: total, Conversions: approved },
      ];

  // Destination popularity
  const destinationData = [
    { name: 'Dubai', Bookings: 18 },
    { name: 'Kenya Safari', Bookings: 14 },
    { name: 'Swiss Alps', Bookings: 12 },
    { name: 'Maldives', Bookings: 10 },
    { name: 'Bali', Bookings: 8 },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/5 pb-4">
        <div>
          <h1 className="font-display text-3xl font-light text-slate-800 dark:text-white">
            Portal Analytics
          </h1>
          <p className="text-sm text-slate-400 dark:text-white/40 mt-1">
            {isAdmin 
              ? 'Global administrative insights, conversion statistics, and popular destination breakdowns.' 
              : 'Analyze your personal inquiry trends, closed package values, and client favorites.'
            }
          </p>
        </div>
        <div className="p-3 bg-gold/10 text-gold rounded-2xl border border-gold/15">
          <BarChart3 size={20} />
        </div>
      </div>

      {/* Analytics KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Leads Handled', value: total, desc: 'Total inquiries submitted', icon: Compass, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Approved Requests', value: approved, desc: 'Ready & ticketing packages', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Pending Assessment', value: pending, desc: 'In queue for assignment', icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: isAdmin ? 'Conversion Rate' : 'Commission Accrued', value: isAdmin ? '78.5%' : `₹${(approved * 15000 + 15000).toLocaleString()}`, desc: isAdmin ? 'Average lead to booking' : 'Estimated B2B bonus', icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((item, i) => (
          <div key={i} className="glass-card p-6 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] text-slate-400 dark:text-white/40 font-semibold uppercase tracking-wider">{item.label}</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">{item.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
                <item.icon size={18} />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-white/30 mt-4 leading-none">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Main Charts Suite Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart 1: Leads vs Conversions */}
        <div className="glass-card p-6 lg:col-span-2 space-y-4">
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-white">Leads Acquisition & Conversions</h3>
            <p className="text-xs text-slate-400 dark:text-white/40">Monthly breakdown of traveler package requests against finalized deals</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0}/>
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
                <Legend iconType="circle" fontSize={11} />
                <Area type="monotone" dataKey="Leads" stroke="#C9A84C" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
                <Area type="monotone" dataKey="Conversions" stroke="#2D6A4F" strokeWidth={2} fillOpacity={1} fill="url(#colorConversions)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Status breakdown Donut */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-white">Inquiry status allocation</h3>
            <p className="text-xs text-slate-400 dark:text-white/40 mb-4">Breakdown of inquiry queues</p>
          </div>

          <div className="h-48 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute text-center">
              <span className="text-2xl font-bold text-slate-800 dark:text-white">{total}</span>
              <p className="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-widest leading-none">Total leads</p>
            </div>
          </div>

          {/* Status color tags legends */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-4">
            {statusData.map((data, index) => (
              <div key={index} className="p-2 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl">
                <span className="font-bold block text-slate-800 dark:text-white">{data.value}</span>
                <span className="text-[9px] text-slate-400 block mt-0.5" style={{ color: COLORS[index] }}>{data.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: Popular Destinations */}
        <div className="glass-card p-6 lg:col-span-3 space-y-4">
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
              <MapPin size={16} className="text-gold" /> Popular Destination Bookings
            </h3>
            <p className="text-xs text-slate-400 dark:text-white/40">Highly requested international destinations across active traveler leads</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={destinationData}>
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#ffffff30' : '#00000030'} fontSize={10} tickLine={false} />
                <YAxis stroke={theme === 'dark' ? '#ffffff30' : '#00000030'} fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#0D1117' : '#FFFFFF',
                    border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '12px'
                  }}
                />
                <Bar dataKey="Bookings" fill="#C9A84C" radius={[8, 8, 0, 0]} maxBarSize={45}>
                  {destinationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#E8C96B' : '#C9A84C'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
