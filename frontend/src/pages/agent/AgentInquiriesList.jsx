import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowUpDown, MapPin, Calendar, ClipboardCheck, X, Eye, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AgentInquiriesList() {
  const { currentUser, inquiries } = useApp();
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter inquiries submitted by this agent
  const myInquiries = inquiries.filter(inq => 
    inq.agentName.toLowerCase().includes(currentUser?.name.toLowerCase()) ||
    inq.agentName === 'Demo Travel Agent' ||
    inq.agentName === 'Rajesh Sharma'
  );

  // Apply filters, searches & sorts
  const filteredInquiries = myInquiries
    .filter(inq => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        inq.clientName.toLowerCase().includes(query) ||
        inq.destination.toLowerCase().includes(query) ||
        inq.id.toLowerCase().includes(query) ||
        (inq.email && inq.email.toLowerCase().includes(query));
      
      const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0);
      }
      if (sortBy === 'oldest') {
        return new Date(a.submittedAt || 0) - new Date(b.submittedAt || 0);
      }
      if (sortBy === 'destination') {
        return a.destination.localeCompare(b.destination);
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-light text-slate-800 dark:text-white">
            Inquiry History
          </h1>
          <p className="text-sm text-slate-400 dark:text-white/40 mt-1">
            Browse, search, and track statuses of all package requests submitted by you.
          </p>
        </div>
        <Link to="/agent/inquiry/new" className="btn-primary text-xs px-6 py-2.5 flex items-center gap-2">
          + New Inquiry
        </Link>
      </div>

      {/* Filters Toolbar */}
      <div className="glass-card p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400 dark:text-white/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client, destination, ref ID..."
            className="input-luxury pl-10 py-2.5 text-xs rounded-xl w-full"
          />
        </div>

        {/* Filter Selection */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/15 px-3 py-1.5 rounded-xl text-xs w-full sm:w-auto">
            <Filter size={14} className="text-slate-400 dark:text-white/40" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent outline-none text-slate-700 dark:text-white/70 w-full cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="in-progress">In Progress</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/15 px-3 py-1.5 rounded-xl text-xs w-full sm:w-auto">
            <ArrowUpDown size={14} className="text-slate-400 dark:text-white/40" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent outline-none text-slate-700 dark:text-white/70 w-full cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="destination">Sort: Destination</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inquiry List */}
      <div className="glass-card overflow-hidden">
        {filteredInquiries.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mx-auto mb-4 text-slate-400 dark:text-white/30">
              <ClipboardCheck size={28} />
            </div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-white">No inquiries found</h3>
            <p className="text-xs text-slate-400 dark:text-white/30 mt-1 max-w-sm mx-auto">
              Try adjusting your search criteria, clearing the filters, or create a brand new traveler inquiry.
            </p>
            {(searchQuery || statusFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
                className="mt-4 px-4 py-2 border border-gold/40 text-gold text-xs rounded-xl hover:bg-gold/10 transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/5 text-slate-400 dark:text-white/30 text-[10px] tracking-wider uppercase font-semibold">
                  <th className="py-3.5 px-6">Reference ID</th>
                  <th className="py-3.5 px-6">Client traveler</th>
                  <th className="py-3.5 px-6">Destination</th>
                  <th className="py-3.5 px-6">Date of travel</th>
                  <th className="py-3.5 px-6">Budget range</th>
                  <th className="py-3.5 px-6">Status state</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-xs text-slate-800 dark:text-white">
                      {inq.id}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-800 dark:text-white">
                      {inq.clientName}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-gold" />
                        <span>{inq.destination}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-white/40">
                        <Calendar size={12} />
                        <span>{inq.dateFrom}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-700 dark:text-white/80 font-medium">
                      {inq.budget}
                    </td>
                    <td className="py-4 px-6">
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
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="p-1.5 rounded bg-gold/10 hover:bg-gold/20 text-gold hover:text-gold-dark cursor-pointer transition-colors inline-flex items-center gap-1.5 text-xs font-semibold"
                      >
                        <Eye size={12} /> Inspect
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

                {selectedInquiry.fileName && (
                  <div className="p-3.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 dark:text-white/40 text-[9px] uppercase tracking-wider block">Uploaded Passport scanned</span>
                      <span className="text-slate-800 dark:text-white text-xs font-semibold block mt-0.5">{selectedInquiry.fileName}</span>
                    </div>
                    <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                      Verified Scan ✅
                    </span>
                  </div>
                )}

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
