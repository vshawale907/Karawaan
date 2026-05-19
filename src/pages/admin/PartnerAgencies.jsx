import { motion } from 'framer-motion';
import { Star, ExternalLink, Package } from 'lucide-react';
import { partners } from '../../data/dummyData';

export default function PartnerAgencies() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl text-white mb-1">Partner Agencies</h1>
          <p className="text-white/35 text-sm">Karawaan's global network of {partners.length} trusted international operators</p>
        </div>
        <button className="btn-primary text-xs px-4 py-2">+ Add Partner</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {partners.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass-card-dark p-7 group"
          >
            {/* Header */}
            <div className="flex items-start gap-4 mb-5">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <span className="text-white font-display font-bold text-xl">{p.initials}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white text-base group-hover:text-gold transition-colors duration-300 mb-0.5">{p.name}</h3>
                <p className="text-white/40 text-sm">{p.country}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={11} className={j < Math.floor(p.rating) ? 'text-gold fill-gold' : 'text-white/15'} />
                  ))}
                  <span className="text-white/40 text-xs ml-1">{p.rating}/5.0</span>
                </div>
              </div>
              <button className="p-2 rounded-xl hover:bg-white/5 text-white/25 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                <ExternalLink size={14} />
              </button>
            </div>

            <p className="text-white/45 text-sm leading-relaxed mb-5">{p.description}</p>

            {/* Services */}
            <div className="flex flex-wrap gap-2 mb-5">
              {p.services.map(s => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-white/55">
                  {s}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
              <div className="text-center">
                <p className="font-display text-2xl text-gold font-bold">{p.activePackages}</p>
                <p className="text-white/30 text-[10px] uppercase tracking-wider">Packages</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl text-emerald-400 font-bold">{p.rating}</p>
                <p className="text-white/30 text-[10px] uppercase tracking-wider">Rating</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl text-blue-400 font-bold">Active</p>
                <p className="text-white/30 text-[10px] uppercase tracking-wider">Status</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
