import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, MapPin, Calendar, Users, Hotel, Car, User, FileText } from 'lucide-react';
import { FadeUp } from '../components/ui';

const hotelCategories = ['3 Star', '4 Star', '5 Star', 'Luxury Safari Lodge'];
const transportOptions = ['Need Private Vehicle', 'Shared Transport', 'Need Recommendation'];

const emptyForm = {
  destination: '',
  dateFrom: '',
  nights: '',
  adults: '',
  children: '',
  childrenAges: '',
  roomRequirement: '',
  hotelCategory: [],
  transport: '',
  agentName: '',
  clientName: '',
  contactNumber: '',
  email: '',
  requirements: '',
};

export default function InquiryPage() {
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inquiryId, setInquiryId] = useState('');

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleCheckbox = (category) => {
    setForm(f => {
      const current = f.hotelCategory;
      if (current.includes(category)) {
        return { ...f, hotelCategory: current.filter(c => c !== category) };
      } else {
        return { ...f, hotelCategory: [...current, category] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setInquiryId(`KRW-2026-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`);
      setSubmitted(true);
    }, 2200);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-obsidian pt-20 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="glass-card-dark p-12 max-w-lg w-full text-center relative overflow-hidden shadow-luxury"
        >
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(52,211,153,0.2)]"
          >
            <CheckCircle2 size={36} className="text-emerald-400" />
          </motion.div>
          <p className="text-gold text-xs tracking-widest uppercase mb-2">Inquiry Successfully Submitted</p>
          <h2 className="font-display text-3xl text-white mb-4">Request Received</h2>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
            <p className="text-white/40 text-xs mb-1">Inquiry Reference ID</p>
            <p className="font-display text-2xl text-gold font-bold tracking-wider">{inquiryId}</p>
          </div>

          <p className="text-white/60 text-sm leading-relaxed mb-8">
            Your inquiry has been successfully submitted to Karawaan. Our international travel partners will review your request and contact you shortly. An acknowledgment email has been sent to your registered address.
          </p>

          <div className="flex gap-3 mb-6">
            <button onClick={() => { setSubmitted(false); setForm(emptyForm); }} className="btn-outline flex-1 text-xs py-3">New Inquiry</button>
            <a href="/admin" className="btn-outline flex-1 text-xs py-3 text-center">View Dashboard</a>
          </div>

          <div className="pt-6 border-t border-white/5">
            <p className="text-white/40 text-[10px] uppercase tracking-wider mb-3">Partner with us</p>
            <a href="/b2b-survey" className="btn-primary w-full text-xs py-3 text-center block">
              Take B2B Partnership Survey
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">Travel Inquiry Request</h1>
          <p className="text-white/50 text-sm max-w-xl mx-auto">
            Submit your travel requirements and our global partner network will provide the best available packages.
          </p>
        </div>

        <FadeUp>
          <form onSubmit={handleSubmit} className="glass-card-dark p-8 md:p-12 space-y-10 border border-white/5 shadow-2xl">
            
            {/* 1. Destination & Dates */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/5">
                <MapPin size={18} className="text-gold" />
                <h2 className="text-white font-semibold text-lg">Destination & Travel Dates</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2">
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Destination *</label>
                  <input required value={form.destination} onChange={e => set('destination', e.target.value)}
                    placeholder="e.g. Masai Mara, Dubai, Bali" className="input-luxury" />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Travel Date *</label>
                  <input required type="date" value={form.dateFrom} onChange={e => set('dateFrom', e.target.value)}
                    className="input-luxury" />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Number of Nights *</label>
                  <input required type="number" min="1" value={form.nights} onChange={e => set('nights', e.target.value)}
                    placeholder="e.g. 3" className="input-luxury" />
                </div>
              </div>
            </div>

            {/* 2. Passengers */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/5">
                <Users size={18} className="text-gold" />
                <h2 className="text-white font-semibold text-lg">Passenger Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Number of Adults *</label>
                  <input required type="number" min="1" value={form.adults} onChange={e => set('adults', e.target.value)}
                    placeholder="e.g. 2" className="input-luxury" />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Number of Children</label>
                  <input type="number" min="0" value={form.children} onChange={e => set('children', e.target.value)}
                    placeholder="e.g. 1" className="input-luxury" />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Children Ages (Comma separated)</label>
                  <input value={form.childrenAges} onChange={e => set('childrenAges', e.target.value)}
                    placeholder="e.g. 3, 6, 9" className="input-luxury" disabled={!form.children || form.children === '0'} />
                </div>
              </div>
            </div>

            {/* 3. Accommodation & Transport */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/5">
                <Hotel size={18} className="text-gold" />
                <h2 className="text-white font-semibold text-lg">Accommodation & Transport</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Room Requirement *</label>
                  <textarea required value={form.roomRequirement} onChange={e => set('roomRequirement', e.target.value)}
                    placeholder="e.g. 03 Double Rooms with child sharing" rows={2} className="input-luxury resize-none" />
                </div>
                
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-3">Hotel Category Required *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {hotelCategories.map(cat => (
                      <label key={cat} className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${form.hotelCategory.includes(cat) ? 'bg-gold/10 border-gold/40 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'}`}>
                        <input type="checkbox" className="hidden" checked={form.hotelCategory.includes(cat)} onChange={() => handleCheckbox(cat)} />
                        <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${form.hotelCategory.includes(cat) ? 'bg-gold border-gold' : 'border-white/30'}`}>
                          {form.hotelCategory.includes(cat) && <CheckCircle2 size={12} className="text-obsidian" />}
                        </div>
                        <span className="text-xs">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Transport Requirement *</label>
                  <select required value={form.transport} onChange={e => set('transport', e.target.value)} className="input-luxury">
                    <option value="" disabled>Select transport option</option>
                    {transportOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Contact Details */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/5">
                <User size={18} className="text-gold" />
                <h2 className="text-white font-semibold text-lg">Contact Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Travel Agent Name *</label>
                  <input required value={form.agentName} onChange={e => set('agentName', e.target.value)} placeholder="Agent Name" className="input-luxury" />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Client Name *</label>
                  <input required value={form.clientName} onChange={e => set('clientName', e.target.value)} placeholder="Client Name" className="input-luxury" />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Contact Number *</label>
                  <input required type="tel" value={form.contactNumber} onChange={e => set('contactNumber', e.target.value)} placeholder="+91" className="input-luxury" />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Email Address *</label>
                  <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@example.com" className="input-luxury" />
                </div>
              </div>
            </div>

            {/* 5. Additional Requirements */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/5">
                <FileText size={18} className="text-gold" />
                <h2 className="text-white font-semibold text-lg">Additional Information</h2>
              </div>
              <div>
                <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Additional Requirements</label>
                <textarea value={form.requirements} onChange={e => set('requirements', e.target.value)}
                  placeholder="Please share available options and rates for the requested destination."
                  rows={4} className="input-luxury resize-none" />
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit" disabled={loading}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-sm disabled:opacity-60"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full" />
                  Processing...
                </div>
              ) : (
                <><Send size={16} /> Submit Inquiry</>
              )}
            </motion.button>
          </form>
        </FadeUp>
      </div>
    </div>
  );
}
