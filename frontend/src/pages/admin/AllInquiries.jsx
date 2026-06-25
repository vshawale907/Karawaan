import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Eye, X, Map, Calendar, Users, DollarSign, Phone, Building2, ChevronDown, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { partners } from '../../data/dummyData';
import { StatusBadge } from '../../components/ui';

const STATUS_FILTERS = ['all', 'new', 'pending', 'in-progress', 'follow-up', 'approved', 'rejected', 'closed'];

export default function AllInquiries() {
  const { inquiries, updateInquiryStatus } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  
  // Form edit states in modal
  const [editStatus, setEditStatus] = useState('');
  const [editPartner, setEditPartner] = useState('');
  const [editFollowUpDate, setEditFollowUpDate] = useState('');

  // Handle row click & prepopulate form
  const handleSelectInquiry = (inq) => {
    setSelected(inq);
    setEditStatus(inq.status || 'pending');
    setEditPartner(inq.partner || '');
    setEditFollowUpDate(inq.followUpDate || '');
  };

  // Handle admin save changes
  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (!selected) return;
    
    updateInquiryStatus(selected.id, editStatus, editPartner || null, editFollowUpDate || null);
    
    // Close modal after saving
    setSelected(null);
  };

  // Advanced search, filter, and sort (Newest submitted first)
  const filtered = useMemo(() => {
    return inquiries
      .filter(inq => {
        const matchSearch = !search ||
          (inq.clientName || '').toLowerCase().includes(search.toLowerCase()) ||
          (inq.agentName || '').toLowerCase().includes(search.toLowerCase()) ||
          (inq.destination || '').toLowerCase().includes(search.toLowerCase()) ||
          (inq.id || '').toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || inq.status === statusFilter;
        return matchSearch && matchStatus;
      })
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  }, [inquiries, search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-light text-slate-800 dark:text-white mb-1">
          Inquiries Management
        </h1>
        <p className="text-slate-500 dark:text-white/40 text-sm">
          Monitor traveler inquiries, assign B2B operators, and update booking pipeline statuses.
        </p>
      </div>

      {/* Stats Quick Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Inquiries', count: inquiries.length, color: 'text-slate-800 dark:text-white bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5' },
          { label: 'Pending Action', count: inquiries.filter(i => i.status === 'pending' || i.status === 'new').length, color: 'text-amber-600 dark:text-yellow-400 bg-amber-500/5 dark:bg-yellow-500/5 border border-amber-500/20 dark:border-yellow-500/20' },
          { label: 'In Progress', count: inquiries.filter(i => i.status === 'in-progress' || i.status === 'follow-up').length, color: 'text-sky-600 dark:text-sky-400 bg-sky-500/5 dark:bg-sky-500/5 border border-sky-500/20 dark:border-sky-500/20' },
          { label: 'Approved Trips', count: inquiries.filter(i => i.status === 'approved' || i.status === 'closed').length, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/5 border border-emerald-500/20 dark:border-emerald-500/20' },
        ].map((c) => (
          <div key={c.label} className={`p-4 rounded-xl transition-all ${c.color}`}>
            <span className="text-[10px] tracking-wider uppercase block opacity-70 mb-1">{c.label}</span>
            <span className="text-2xl font-bold font-display">{c.count}</span>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3">
          <Search size={16} className="text-slate-400 dark:text-white/30 flex-shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by Traveler Name, Travel Agent, Destination, or Inquiry ID..."
            className="bg-transparent text-slate-800 dark:text-white/90 text-sm flex-1 outline-none placeholder-slate-400 dark:placeholder-white/20"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white transition-colors">
              <X size={15} />
            </button>
          )}
        </div>

        {/* Horizontal scroll status filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {STATUS_FILTERS.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider capitalize whitespace-nowrap transition-all duration-300 ${
                statusFilter === s
                  ? 'bg-gold text-obsidian shadow-sm border border-gold'
                  : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/15'
              }`}
            >
              {s === 'all' ? 'All Inquiries' : s === 'in-progress' ? 'In Progress' : s === 'follow-up' ? 'Follow-Up' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/60 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.01]">
                {['Inquiry ID', 'Agent Name', 'Traveler', 'Destination', 'Travel Dates', 'Pax', 'Budget', 'B2B Partner', 'Status', 'Action'].map(h => (
                  <th key={h} className="px-6 py-4 text-slate-400 dark:text-white/30 text-[10px] tracking-wider uppercase font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.03]">
              <AnimatePresence mode="popLayout">
                {filtered.map((inq, i) => (
                  <motion.tr
                    key={inq.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: Math.min(i * 0.02, 0.3) }}
                    className="hover:bg-slate-50/60 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer"
                    onClick={() => handleSelectInquiry(inq)}
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-gold dark:text-gold-light text-xs font-semibold">{inq.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-slate-800 dark:text-white text-xs font-semibold">{inq.agentName}</span>
                        <span className="text-slate-400 dark:text-white/20 text-[10px]">Travel Studio</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-800 dark:text-white/90 text-xs font-medium">{inq.clientName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Map size={11} className="text-gold flex-shrink-0" />
                        <span className="text-slate-700 dark:text-white/70 text-xs font-medium">{inq.destination}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-slate-600 dark:text-white/60 text-xs">{inq.dateFrom || 'Flexible'}</span>
                        {inq.dateTo && <span className="text-slate-400 dark:text-white/20 text-[10px]">for {inq.dateTo}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600 dark:text-white/60 text-xs font-semibold">{inq.travelers}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold">{inq.budget || 'Custom'}</span>
                    </td>
                    <td className="px-6 py-4">
                      {inq.partner ? (
                        <div className="flex items-center gap-1.5">
                          <Building2 size={11} className="text-slate-400 dark:text-white/30" />
                          <span className="text-slate-700 dark:text-white/70 text-xs truncate max-w-[120px]">{inq.partner}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 dark:text-white/20 text-[10px] italic">Not Assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={inq.status} />
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 rounded-lg bg-slate-100 hover:bg-gold/20 dark:bg-white/5 dark:hover:bg-gold/25 text-slate-400 hover:text-gold dark:text-white/40 dark:hover:text-gold transition-all">
                        <Eye size={13} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filtered.length === 0 && (
            <div className="text-center py-20 bg-slate-50/20 dark:bg-transparent">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-3">
                <Filter size={18} className="text-slate-400 dark:text-white/30" />
              </div>
              <h3 className="text-slate-800 dark:text-white/90 text-sm font-semibold mb-1">No Inquiries Found</h3>
              <p className="text-slate-400 dark:text-white/30 text-xs max-w-sm mx-auto">
                No traveler inquiries match your selected status filters or search keywords. Try adjusting your query.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Inquiry detail / status updater modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col text-slate-800 dark:text-white"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.01]">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-gold dark:text-gold-light text-xs font-bold uppercase tracking-wider">{selected.id}</span>
                    <StatusBadge status={selected.status} />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-slate-800 dark:text-white">
                    {selected.clientName}
                  </h2>
                  <p className="text-slate-400 dark:text-white/30 text-xs mt-1">
                    Submitted on {selected.submittedAt ? new Date(selected.submittedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'Unknown date'}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 dark:text-white/40 hover:text-slate-800 dark:hover:text-white transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                {/* 2-column info grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Users, label: 'Submitted By Agent', value: selected.agentName },
                    { icon: Map, label: 'Target Destination', value: selected.destination },
                    { icon: Users, label: 'Traveler Count', value: selected.travelers },
                    { icon: DollarSign, label: 'Budget Limit', value: selected.budget || 'Custom Quote' },
                    { icon: Calendar, label: 'Preferred Departure', value: selected.dateFrom || 'Flexible' },
                    { icon: Calendar, label: 'Duration / Return', value: selected.dateTo || 'Flexible' },
                    { icon: Phone, label: 'Contact Phone', value: selected.contact || 'No Direct Phone' },
                    { icon: Building2, label: 'B2B Partner Assigned', value: selected.partner || 'Not Assigned Yet' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-xl p-3.5 flex flex-col justify-center">
                      <div className="flex items-center gap-1.5 mb-1 text-slate-400 dark:text-white/30">
                        <item.icon size={11} className="text-gold flex-shrink-0" />
                        <span className="text-[10px] tracking-wider uppercase font-semibold">{item.label}</span>
                      </div>
                      <span className="text-slate-800 dark:text-white/95 text-xs font-semibold truncate">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Traveler Requirements */}
                <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-xl p-4">
                  <span className="text-slate-400 dark:text-white/30 text-[10px] tracking-wider uppercase font-semibold block mb-2">
                    Special Traveler Requirements & Notes
                  </span>
                  <p className="text-slate-700 dark:text-white/70 text-xs leading-relaxed whitespace-pre-wrap">
                    {selected.requirements || 'No special requirements listed by agent.'}
                  </p>
                </div>

                {/* Uploaded Documents scan preview */}
                <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-xl p-4">
                  <span className="text-slate-400 dark:text-white/30 text-[10px] tracking-wider uppercase font-semibold block mb-2">
                    Traveler Document Scans / passport (B2B Attachment)
                  </span>
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-white/5 rounded-xl border border-slate-200/60 dark:border-white/5">
                    <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
                      <CheckCircle size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-800 dark:text-white/90 font-semibold truncate">
                        passport_scan_package_{selected.id}.pdf
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-white/30">
                        Scan Verified • PDF Document • 2.4 MB
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25 uppercase">
                      Secure
                    </span>
                  </div>
                </div>

                {/* Admin Management Section */}
                <form onSubmit={handleSaveChanges} className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gold dark:text-gold-light">
                    Administrative Action Desk
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* B2B Operator Selector */}
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/30 mb-2">
                        Assign B2B Partner Operator
                      </label>
                      <div className="relative">
                        <select
                          value={editPartner}
                          onChange={(e) => setEditPartner(e.target.value)}
                          className="w-full appearance-none bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 text-slate-700 dark:text-white transition-all"
                        >
                          <option value="" className="text-slate-800 dark:bg-obsidian">-- Unassigned --</option>
                          {partners.map(p => (
                            <option key={p.id} value={p.name} className="text-slate-800 dark:bg-obsidian">
                              {p.flag} {p.name} ({p.country})
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-4 text-slate-400 dark:text-white/30 pointer-events-none" />
                      </div>
                    </div>

                    {/* Follow-up Planner Date */}
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/30 mb-2">
                        Set Pipeline Follow-Up Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={editFollowUpDate}
                          onChange={(e) => setEditFollowUpDate(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 text-slate-700 dark:text-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status Selection Buttons */}
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/30 mb-2.5">
                      Transition Inquiry Booking Status
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { status: 'pending', label: 'Pending Action', color: 'hover:border-yellow-400/40 hover:bg-yellow-400/5', activeColor: 'bg-yellow-500/15 border-yellow-500 text-amber-700 dark:text-yellow-400' },
                        { status: 'in-progress', label: 'In Progress', color: 'hover:border-sky-400/40 hover:bg-sky-400/5', activeColor: 'bg-sky-500/15 border-sky-500 text-sky-600 dark:text-sky-400' },
                        { status: 'approved', label: 'Approve & Confirm', color: 'hover:border-emerald-400/40 hover:bg-emerald-400/5', activeColor: 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold' },
                        { status: 'rejected', label: 'Reject Inquiry', color: 'hover:border-rose-400/40 hover:bg-rose-400/5', activeColor: 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 font-semibold' },
                      ].map((item) => (
                        <button
                          key={item.status}
                          type="button"
                          onClick={() => setEditStatus(item.status)}
                          className={`px-3 py-3 rounded-xl border text-[11px] font-medium text-center transition-all ${
                            editStatus === item.status
                              ? item.activeColor
                              : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 dark:text-white/40 ' + item.color
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 dark:border-white/5">
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer"
                    >
                      Discard changes
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full text-xs font-semibold bg-gold hover:bg-gold-light text-obsidian shadow-md hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      Publish updates
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
