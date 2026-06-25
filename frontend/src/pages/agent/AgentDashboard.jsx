import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Clock, CheckCircle2, TrendingUp, ArrowRight, MapPin, Calendar, DollarSign, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockPerformanceData = [
  { month: 'Jan', revenue: 15000 },
  { month: 'Feb', revenue: 28000 },
  { month: 'Mar', revenue: 45000 },
  { month: 'Apr', revenue: 38000 },
  { month: 'May', revenue: 65000 },
  { month: 'Jun', revenue: 85000 },
];

export default function AgentDashboard() {
  const { currentUser, inquiries, theme } = useApp();
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Filter inquiries submitted by this agent
  const myInquiries = inquiries.filter(inq => 
    inq.agentName.toLowerCase().includes(currentUser?.name.toLowerCase()) ||
    inq.agentName === 'Demo Travel Agent' ||
    inq.agentName === 'Rajesh Sharma'
  );

  const totalInquiries = myInquiries.length;
  const pendingInquiries = myInquiries.filter(i => i.status === 'pending').length;
  const approvedInquiries = myInquiries.filter(i => i.status === 'approved' || i.status === 'in-progress' || i.status === 'closed').length;

  const mockCommission = totalInquiries * 12500 + 45000;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-obsidian to-forest p-6 sm:p-8 border border-gold/10 shadow-lg text-white">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <TrendingUp size={160} className="text-gold" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="text-gold text-xs font-semibold tracking-wider uppercase">Welcome back Partner ✨</span>
          <h1 className="font-display text-3xl sm:text-4xl font-light mt-2">
            Hello, <span className="text-gold-gradient font-medium">{currentUser?.name}</span>
          </h1>
          <p className="text-white/60 text-sm mt-3 leading-relaxed">
            Your travel agency is active and performing strongly. We have sourced premium safari and luxury itineraries for your inquiries. Let's turn trails into legends today.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/agent/inquiry/new" className="btn-primary text-xs px-5 py-2.5 flex items-center gap-2">
              <FileText size={14} /> Submit New Inquiry
            </Link>
            <Link to="/agent/inquiries" className="btn-outline text-xs px-5 py-2.5 text-center">
              View History
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Submitted Inquiries', value: totalInquiries, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Pending Approvals', value: pendingInquiries, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Approved Trips', value: approvedInquiries, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Estimated Commission', value: `₹${mockCommission.toLocaleString()}`, icon: DollarSign, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -4 }}
            className="glass-card p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase font-semibold">
                {stat.label}
              </p>
              <p className="text-2xl font-bold mt-2 text-slate-800 dark:text-white">
                {stat.value}
              </p>
            </div>
            <div className={`p-3.5 rounded-xl ${stat.bg} ${stat.color} flex-shrink-0`}>
              <stat.icon size={20} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Performance Overview</h2>
              <p className="text-xs text-slate-400 dark:text-white/40">Commission projections & closed packages growth</p>
            </div>
            <span className="text-xs text-gold font-medium bg-gold/10 px-3 py-1 rounded-full border border-gold/15">
              Target Achieved: 82%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockPerformanceData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}/>
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
                  labelStyle={{ color: '#C9A84C', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#C9A84C" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Tips / Agent Info */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Partner Guidelines</h2>
            <p className="text-xs text-slate-400 dark:text-white/40 mb-6">Important updates for booking & visa procedures</p>
            
            <div className="space-y-4">
              {[
                { title: 'Masai Mara Safari Lodge Bookings', desc: 'Summer slots are filling up. Secure packages 45 days in advance.' },
                { title: 'Dubai Visa Guidelines Updated', desc: 'New faster Express eVisa option available. Select in inquiry notes.' },
                { title: 'Swiss Rail Passes', desc: 'Pre-book Swiss travel pass along with Alps package for 10% cash savings.' }
              ].map((item, i) => (
                <div key={i} className="p-3.5 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl">
                  <p className="text-xs font-semibold text-slate-800 dark:text-white">{item.title}</p>
                  <p className="text-[11px] text-slate-400 dark:text-white/40 mt-1 leading-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <Link to="/agent/inquiries" className="text-xs text-gold flex items-center justify-end gap-1 font-medium mt-6 group hover:underline">
            View All Inquiries
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Recent Inquiry Logs */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Traveler Inquiries</h2>
            <p className="text-xs text-slate-400 dark:text-white/40">Status and progress of your recent submissions</p>
          </div>
          <Link to="/agent/inquiries" className="text-xs text-gold font-medium hover:underline">
            See all
          </Link>
        </div>

        {myInquiries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-slate-400 dark:text-white/30">No inquiries created yet.</p>
            <Link to="/agent/inquiry/new" className="btn-primary text-xs px-6 py-2.5 mt-4 inline-block">
              Submit Your First Inquiry
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/5 text-slate-400 dark:text-white/30 text-[10px] tracking-wider uppercase font-semibold">
                  <th className="py-3 px-4">Ref ID</th>
                  <th className="py-3 px-4">Traveler Name</th>
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4">Travel Date</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {myInquiries.slice(0, 4).map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-xs text-slate-800 dark:text-white">{inq.id}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-white">{inq.clientName}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} className="text-gold" />
                        <span>{inq.destination}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-xs">
                        <Calendar size={12} className="text-slate-400" />
                        <span>{inq.dateFrom}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 dark:text-white font-medium">{inq.budget}</td>
                    <td className="py-3.5 px-4">
                      <span className={
                        inq.status === 'new' || inq.status === 'pending'
                          ? 'badge-pending'
                          : inq.status === 'approved'
                          ? 'badge-closed'
                          : inq.status === 'rejected'
                          ? 'badge-new' // treated as red
                          : 'badge-followup'
                      }>
                        {inq.status === 'new' ? 'New' : inq.status === 'pending' ? 'Pending' : inq.status === 'approved' ? 'Approved' : inq.status === 'rejected' ? 'Rejected' : 'In Progress'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="text-xs text-gold hover:text-gold-dark hover:underline font-semibold cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
                    Inquiry Details
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
                    <span className="text-slate-400 dark:text-white/40 text-[9px] uppercase tracking-wider block">Client Name</span>
                    <span className="font-semibold text-slate-800 dark:text-white block mt-0.5">{selectedInquiry.clientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-white/40 text-[9px] uppercase tracking-wider block">Destination</span>
                    <span className="font-semibold text-slate-800 dark:text-white block mt-0.5">{selectedInquiry.destination}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 dark:text-white/40 text-[9px] uppercase tracking-wider block">Travel Date</span>
                    <span className="text-slate-700 dark:text-white/70 block mt-0.5">{selectedInquiry.dateFrom}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-white/40 text-[9px] uppercase tracking-wider block">Budget Group</span>
                    <span className="font-semibold text-gold block mt-0.5">{selectedInquiry.budget}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 dark:text-white/40 text-[9px] uppercase tracking-wider block">Travelers Count</span>
                    <span className="text-slate-700 dark:text-white/70 block mt-0.5">{selectedInquiry.travelers || '2 Adults'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-white/40 text-[9px] uppercase tracking-wider block">Current Status</span>
                    <span className="block mt-1">
                      <span className={
                        selectedInquiry.status === 'new' || selectedInquiry.status === 'pending'
                          ? 'badge-pending'
                          : selectedInquiry.status === 'approved'
                          ? 'badge-closed'
                          : selectedInquiry.status === 'rejected'
                          ? 'badge-new'
                          : 'badge-followup'
                      }>
                        {selectedInquiry.status === 'new' ? 'New' : selectedInquiry.status === 'pending' ? 'Pending' : selectedInquiry.status === 'approved' ? 'Approved' : selectedInquiry.status === 'rejected' ? 'Rejected' : 'In Progress'}
                      </span>
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 dark:text-white/40 text-[9px] uppercase tracking-wider block">Requirements & Notes</span>
                  <p className="text-slate-600 dark:text-white/60 text-xs bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl p-3.5 mt-1 leading-relaxed">
                    {selectedInquiry.requirements || 'No special requirements listed.'}
                  </p>
                </div>

                {selectedInquiry.partner && (
                  <div className="p-3.5 bg-gold/10 border border-gold/20 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-gold text-[9px] uppercase tracking-wider block font-bold">Assigned Safari Partner</span>
                      <span className="text-slate-800 dark:text-white text-xs font-semibold block mt-0.5">{selectedInquiry.partner}</span>
                    </div>
                    {selectedInquiry.followUpDate && (
                      <div className="text-right">
                        <span className="text-slate-400 dark:text-white/40 text-[9px] uppercase tracking-wider block">Estimated Quote Date</span>
                        <span className="text-slate-700 dark:text-white/70 text-xs block mt-0.5">{selectedInquiry.followUpDate}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/5 text-right">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="btn-primary text-xs px-6 py-2.5"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
