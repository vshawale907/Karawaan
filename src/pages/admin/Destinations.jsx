import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { destinations } from '../../data/dummyData';

export default function Destinations() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl text-white mb-1">Destinations</h1>
          <p className="text-white/35 text-sm">{destinations.length} featured destinations in our portfolio</p>
        </div>
        <button className="btn-primary text-xs px-4 py-2">+ Add Destination</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {destinations.map((dest, i) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="glass-card-dark overflow-hidden group cursor-pointer"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={dest.image} alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded-full bg-gold/90 text-obsidian text-xs font-bold">{dest.category}</span>
              </div>
              <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                <Star size={10} className="text-gold fill-gold" />
                <span className="text-white text-xs">{dest.rating}</span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin size={11} className="text-gold/60" />
                <span className="text-gold/70 text-xs">{dest.duration}</span>
              </div>
              <h3 className="font-semibold text-white text-base mb-0.5 group-hover:text-gold transition-colors">{dest.name}</h3>
              <p className="text-white/40 text-xs mb-3">{dest.tagline}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {dest.highlights.slice(0, 3).map(h => (
                  <span key={h} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/50">{h}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div>
                  <p className="text-gold font-semibold text-sm">{dest.price}</p>
                  <p className="text-white/30 text-xs">{dest.bookings} bookings</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/50 text-xs hover:text-white hover:border-white/20 transition-all">Edit</button>
                  <button className="px-3 py-1.5 rounded-xl bg-gold/15 border border-gold/25 text-gold text-xs hover:bg-gold/25 transition-all">View</button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
