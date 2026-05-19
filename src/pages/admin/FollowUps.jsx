import { motion } from 'framer-motion';
import { Clock, Phone, Map, AlertCircle, CheckCircle2, Calendar } from 'lucide-react';
import { inquiries } from '../../data/dummyData';
import { StatusBadge } from '../../components/ui';

const followUpInquiries = inquiries.filter(i => i.status === 'follow-up' || i.status === 'pending');
const today = new Date().toISOString().split('T')[0];

export default function FollowUps() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-white mb-1">Follow-Ups</h1>
        <p className="text-white/35 text-sm">{followUpInquiries.length} inquiries requiring follow-up action</p>
      </div>

      {/* Urgency Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 bg-orange-500/10 border border-orange-500/25 rounded-2xl p-5"
      >
        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
          <AlertCircle size={20} className="text-orange-400" />
        </div>
        <div>
          <p className="text-orange-300 font-semibold text-sm">Action Required</p>
          <p className="text-white/45 text-xs">
            {followUpInquiries.filter(i => i.followUpDate <= today).length} inquiries are due for follow-up today or overdue.
          </p>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {followUpInquiries.map((inq, i) => {
          const isOverdue = inq.followUpDate && inq.followUpDate <= today;
          return (
            <motion.div
              key={inq.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`glass-card-dark p-6 border ${isOverdue ? 'border-orange-500/30' : 'border-white/5'} relative overflow-hidden`}
            >
              {isOverdue && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500" />
              )}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-gold/80 text-xs">{inq.id}</span>
                    <StatusBadge status={inq.status} />
                    {isOverdue && (
                      <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 text-[10px] font-semibold border border-orange-500/30">
                        OVERDUE
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-semibold text-sm">{inq.clientName}</h3>
                  <p className="text-white/40 text-xs">via {inq.agentName}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Map size={11} className="text-gold/50" />
                  {inq.destination}
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Phone size={11} className="text-emerald-400/50" />
                  {inq.contact}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Calendar size={11} className={isOverdue ? 'text-orange-400' : 'text-blue-400'} />
                  <span className={isOverdue ? 'text-orange-300' : 'text-white/50'}>
                    Follow-up due: {inq.followUpDate}
                  </span>
                </div>
              </div>

              <p className="text-white/35 text-xs leading-relaxed mb-5 line-clamp-2">{inq.requirements}</p>

              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-xl bg-gold/15 border border-gold/25 text-gold text-xs font-medium hover:bg-gold/25 transition-colors">
                  Mark Done
                </button>
                <button className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 text-xs hover:text-white hover:border-white/20 transition-colors">
                  Reschedule
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
