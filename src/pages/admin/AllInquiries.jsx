import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Eye, X, Map, Calendar, Users, DollarSign, Phone, Building2, ChevronDown } from 'lucide-react';
import { inquiries } from '../../data/dummyData';
import { StatusBadge } from '../../components/ui';

const STATUS_OPTIONS = ['all', 'new', 'pending', 'follow-up', 'closed'];

export default function AllInquiries() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return inquiries.filter(inq => {
      const matchSearch = !search ||
        inq.clientName.toLowerCase().includes(search.toLowerCase()) ||
        inq.agentName.toLowerCase().includes(search.toLowerCase()) ||
        inq.destination.toLowerCase().includes(search.toLowerCase()) ||
        inq.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || inq.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl text-white mb-1">All Inquiries</h1>
          <p className="text-white/35 text-sm">{filtered.length} of {inquiries.length} inquiries shown</p>
        </div>
        <a href="/inquiry" className="btn-primary text-xs px-4 py-2">+ New Inquiry</a>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 flex-1">
          <Search size={15} className="text-white/30 flex-shrink-0" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by client, agent, destination, ID..."
            className="bg-transparent text-white/70 text-sm flex-1 outline-none placeholder-white/25"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-white/30 hover:text-white transition-colors">
              <X size={13} />
            </button>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all duration-200 ${
                statusFilter === s
                  ? 'bg-gold text-obsidian shadow-gold'
                  : 'bg-white/5 border border-white/8 text-white/50 hover:text-white hover:border-white/20'
              }`}
            >
              {s === 'all' ? 'All Status' : s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {['ID', 'Agent', 'Client', 'Destination', 'Travel Dates', 'Pax', 'Budget', 'Partner', 'Status', 'Action'].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-white/25 text-[10px] tracking-widest uppercase font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filtered.map((inq, i) => (
                  <motion.tr
                    key={inq.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors group cursor-pointer"
                    onClick={() => setSelected(inq)}
                  >
                    <td className="px-5 py-4"><span className="font-mono text-gold/80 text-xs">{inq.id}</span></td>
                    <td className="px-5 py-4"><p className="text-white text-xs font-medium whitespace-nowrap">{inq.agentName}</p></td>
                    <td className="px-5 py-4"><p className="text-white/70 text-xs whitespace-nowrap">{inq.clientName}</p></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <Map size={10} className="text-gold/50 flex-shrink-0" />
                        <span className="text-white/60 text-xs whitespace-nowrap">{inq.destination}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-white/50 text-xs whitespace-nowrap">{inq.dateFrom}</p>
                      <p className="text-white/25 text-[10px]">to {inq.dateTo}</p>
                    </td>
                    <td className="px-5 py-4"><span className="text-white/60 text-xs">{inq.travelers}</span></td>
                    <td className="px-5 py-4"><span className="text-emerald-400/80 text-xs font-medium whitespace-nowrap">{inq.budget}</span></td>
                    <td className="px-5 py-4"><span className="text-white/40 text-xs whitespace-nowrap">{inq.partner}</span></td>
                    <td className="px-5 py-4"><StatusBadge status={inq.status} /></td>
                    <td className="px-5 py-4">
                      <button className="p-1.5 rounded-lg bg-white/5 hover:bg-gold/20 text-white/40 hover:text-gold transition-all opacity-0 group-hover:opacity-100">
                        <Eye size={13} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/25 text-sm">No inquiries match your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="bg-[#0D1117] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-luxury"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between p-6 border-b border-white/5 sticky top-0 bg-[#0D1117] z-10">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-gold text-sm font-bold">{selected.id}</span>
                    <StatusBadge status={selected.status} />
                  </div>
                  <h2 className="font-display text-2xl text-white">{selected.clientName}</h2>
                  <p className="text-white/35 text-xs mt-1">Submitted {new Date(selected.submittedAt).toLocaleString('en-IN')}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Grid details */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Users, label: 'Agent', value: selected.agentName },
                    { icon: Building2, label: 'Partner', value: selected.partner },
                    { icon: Map, label: 'Destination', value: selected.destination },
                    { icon: DollarSign, label: 'Budget', value: selected.budget },
                    { icon: Users, label: 'Travelers', value: `${selected.travelers} Pax` },
                    { icon: Phone, label: 'Contact', value: selected.contact },
                    { icon: Calendar, label: 'Departure', value: selected.dateFrom },
                    { icon: Calendar, label: 'Return', value: selected.dateTo },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/3 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <item.icon size={12} className="text-gold/60" />
                        <p className="text-white/30 text-[10px] tracking-wider uppercase">{item.label}</p>
                      </div>
                      <p className="text-white text-sm font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Requirements */}
                <div className="bg-white/3 rounded-xl p-4">
                  <p className="text-white/30 text-[10px] tracking-wider uppercase mb-2">Requirements</p>
                  <p className="text-white/70 text-sm leading-relaxed">{selected.requirements}</p>
                </div>

                {/* Change Status */}
                <div>
                  <p className="text-white/30 text-[10px] tracking-wider uppercase mb-3">Update Status</p>
                  <div className="flex gap-2 flex-wrap">
                    {['new', 'pending', 'follow-up', 'closed'].map(s => (
                      <button
                        key={s}
                        className={`px-4 py-2 rounded-xl text-xs capitalize transition-all ${
                          selected.status === s ? 'bg-gold text-obsidian font-semibold' : 'bg-white/5 border border-white/10 text-white/50 hover:text-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
