import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Briefcase, Mail, Phone, ExternalLink, Calendar, MapPin, Building2, CheckCircle2, ChevronRight } from 'lucide-react';
import { partnerSurveys } from '../../data/dummyData';

export default function B2BSurveys() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  const statuses = ['All', 'New Lead', 'Follow-Up', 'Potential Partner', 'Active Partner'];

  const filteredSurveys = partnerSurveys.filter(survey => {
    const matchesSearch = survey.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          survey.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || survey.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'New Lead': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Follow-Up': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Potential Partner': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Active Partner': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-white mb-2">B2B Partner Surveys</h1>
        <p className="text-white/50 text-sm">Review travel agency profiles and partnership requests.</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Surveys', value: partnerSurveys.length, icon: Building2, color: 'text-blue-400' },
          { label: 'Active Partners', value: partnerSurveys.filter(s => s.status === 'Active Partner').length, icon: CheckCircle2, color: 'text-emerald-400' },
          { label: 'New Leads', value: partnerSurveys.filter(s => s.status === 'New Lead').length, icon: Briefcase, color: 'text-gold' },
          { label: 'Follow-Ups', value: partnerSurveys.filter(s => s.status === 'Follow-Up').length, icon: Calendar, color: 'text-orange-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-5 border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon size={18} />
              </div>
              <span className="text-white/40 text-xs font-medium uppercase tracking-wider">{stat.label}</span>
            </div>
            <p className="font-display text-3xl text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={16} />
          <input
            type="text"
            placeholder="Search company or location..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter size={16} className="text-white/40" />
          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  statusFilter === status
                    ? 'bg-gold text-obsidian'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Surveys List */}
      <div className="space-y-3">
        {filteredSurveys.length > 0 ? (
          filteredSurveys.map((survey) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={survey.id}
              onClick={() => setSelectedSurvey(survey)}
              className="group glass-card p-5 border border-white/5 hover:border-gold/30 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center flex-shrink-0 text-gold font-display font-bold">
                  {survey.companyName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1 group-hover:text-gold transition-colors">{survey.companyName}</h3>
                  <div className="flex items-center gap-3 text-xs text-white/50">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {survey.location}</span>
                    <span className="flex items-center gap-1"><Briefcase size={12} /> {survey.paxHandled} PAX</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 flex-1">
                <div className="hidden lg:block text-xs text-white/40">
                  <p className="mb-1">{survey.partnershipType}</p>
                  <p>{survey.timeline}</p>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold border ${getStatusColor(survey.status)}`}>
                  {survey.status}
                </span>

                <ChevronRight size={18} className="text-white/20 group-hover:text-gold transition-colors" />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 glass-card border border-white/5 rounded-2xl">
            <p className="text-white/40">No surveys found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Survey Details Modal */}
      <AnimatePresence>
        {selectedSurvey && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm"
            onClick={() => setSelectedSurvey(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-zinc-900 border border-white/10 p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-8 pb-6 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-display text-white">{selectedSurvey.companyName}</h2>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${getStatusColor(selectedSurvey.status)}`}>
                      {selectedSurvey.status}
                    </span>
                  </div>
                  <p className="text-white/40 text-xs">ID: {selectedSurvey.id} • Submitted: {new Date(selectedSurvey.submittedAt).toLocaleDateString()}</p>
                </div>
                <button onClick={() => setSelectedSurvey(null)} className="text-white/40 hover:text-white">✕</button>
              </div>

              <div className="space-y-8">
                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Contact Person</p>
                    <p className="text-white text-sm">{selectedSurvey.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Location</p>
                    <p className="text-white text-sm flex items-center gap-1"><MapPin size={12} className="text-gold"/> {selectedSurvey.location}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Email</p>
                    <p className="text-white text-sm flex items-center gap-1"><Mail size={12} className="text-gold"/> {selectedSurvey.email}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Mobile</p>
                    <p className="text-white text-sm flex items-center gap-1"><Phone size={12} className="text-gold"/> {selectedSurvey.mobile}</p>
                  </div>
                </div>

                {/* Business Profile */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                  <h4 className="text-gold text-xs uppercase tracking-wider font-semibold mb-4">Business Profile</h4>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <div>
                      <p className="text-white/40 text-[10px] uppercase mb-1">Selling Kenya Now?</p>
                      <p className="text-white text-sm">{selectedSurvey.experience}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase mb-1">Africa PAX / Year</p>
                      <p className="text-white text-sm">{selectedSurvey.paxHandled}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-white/40 text-[10px] uppercase mb-2">Key Segments</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedSurvey.segments.map(s => <span key={s} className="px-2 py-1 bg-white/10 rounded text-xs text-white/80">{s}</span>)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Partnership Needs */}
                <div>
                  <h4 className="text-gold text-xs uppercase tracking-wider font-semibold mb-4">Partnership Requirements</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-white/40 text-[10px] uppercase mb-1">Preferred Partnership Type</p>
                      <p className="text-white text-sm">{selectedSurvey.partnershipType}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase mb-2">Support Needed</p>
                      <ul className="list-disc pl-4 text-sm text-white/80 space-y-1">
                        {selectedSurvey.supportNeeded.map(s => <li key={s}>{s}</li>)}
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-white/40 text-[10px] uppercase mb-1">Timeline to Start</p>
                        <p className="text-white text-sm">{selectedSurvey.timeline}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-[10px] uppercase mb-1">Pref. Communication</p>
                        <p className="text-white text-sm">{selectedSurvey.communication}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex gap-3">
                <button className="btn-primary flex-1 py-3 text-sm">Send Partnership Proposal</button>
                <button className="btn-outline flex-1 py-3 text-sm">Update Status</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
