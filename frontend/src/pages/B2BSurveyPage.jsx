import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Building2, Globe2, Briefcase, Map, Target, HeartHandshake } from 'lucide-react';
import { FadeUp } from '../components/ui';
import API_BASE_URL from '../config/api';

const emptyForm = {
  // Section 1
  companyName: '',
  location: '',
  contactPerson: '',
  mobile: '',
  email: '',
  website: '',
  // Section 2
  sellingKenya: '',
  destinationsSold: [],
  paxHandled: '',
  segments: [],
  // Section 3
  perception: '',
  budget: '',
  objections: '',
  // Section 4
  promoting: '',
  preferences: '',
  // Section 5
  support: [],
  partnershipType: '',
  timeline: '',
  communication: '',
  consent: false,
};

const destinationsOptions = ['Kenya', 'Tanzania', 'South Africa', 'Uganda', 'Rwanda', 'Other'];
const paxOptions = ['1–20', '20–50', '50–100', '100+'];
const segmentOptions = ['FIT Travellers', 'Luxury FIT', 'Honeymooners', 'Families', 'Group Travel', 'Corporate / Incentive Groups'];
const perceptionOptions = ['Too Expensive', 'Reasonable / Balanced', 'Competitive'];
const budgetOptions = ['Budget', 'Mid Luxury', 'Luxury', 'Ultra Luxury'];
const supportOptions = ['Exclusive B2B rates', 'Marketing content', 'Reels & Posters', 'Maps & Routing explainers', 'Training webinars', 'Sales pitch guidance', 'Better group departures', 'White label packages', 'Faster quote turnaround', 'Co-branding collaboration'];
const partnershipOptions = ['Fixed Departures', 'Dynamic B2B FIT Rates', 'Group / Incentive Pricing', 'White Labelling Partnership'];
const timelineOptions = ['Immediately', 'Within 30 Days', 'Within 60 Days', 'Research Mode Only'];
const commOptions = ['WhatsApp', 'Email'];

export default function B2BSurveyPage() {
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [partnerId, setPartnerId] = useState('');

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleMultiSelect = (key, val) => {
    setForm(f => {
      const arr = f[key];
      if (arr.includes(val)) return { ...f, [key]: arr.filter(item => item !== val) };
      return { ...f, [key]: [...arr, val] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`${API_BASE_URL}/api/email/survey`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.contactPerson,
          email: form.email,
          agency: form.companyName,
          phone: form.mobile,
          answers: form
        }),
      });
    } catch (err) {
      console.error('Failed to send survey email:', err);
    }

    setTimeout(() => {
      setLoading(false);
      setPartnerId(`KAR-PARTNER-2026-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`);
      setSubmitted(true);
    }, 500);
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
          <p className="text-gold text-xs tracking-widest uppercase mb-2">Survey Submitted Successfully</p>
          <h2 className="font-display text-3xl text-white mb-4">Profile Received</h2>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
            <p className="text-white/40 text-xs mb-1">Your B2B Partner ID</p>
            <p className="font-display text-2xl text-gold font-bold tracking-wider">{partnerId}</p>
          </div>

          <p className="text-white/60 text-sm leading-relaxed mb-8">
            Thank you for completing the Karawaan B2B Safari Partnership Survey. Our team will review your profile and connect with you shortly for potential collaboration opportunities.
          </p>

          <div className="flex gap-3">
            <button onClick={() => { setSubmitted(false); setForm(emptyForm); }} className="btn-outline flex-1 text-xs py-3">Submit Another</button>
            <a href="/admin/surveys" className="btn-primary flex-1 text-xs py-3 text-center">View Dashboard</a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">B2B Partnership & Safari Survey</h1>
          <p className="text-white/50 text-sm max-w-xl mx-auto">
            Help us understand your business profile so we can create better Kenya & Africa safari products, pricing, and long-term B2B collaboration opportunities.
          </p>
        </div>

        <FadeUp>
          <form onSubmit={handleSubmit} className="glass-card-dark p-8 md:p-12 space-y-12 border border-white/5 shadow-2xl">
            
            {/* Section 1 */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/5">
                <Building2 size={18} className="text-gold" />
                <h2 className="text-white font-semibold text-lg">Section 1 — Company Information</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Agency / Company Name *</label>
                  <input required value={form.companyName} onChange={e => set('companyName', e.target.value)} className="input-luxury" />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Primary Office Location *</label>
                  <input required value={form.location} onChange={e => set('location', e.target.value)} placeholder="City, Country" className="input-luxury" />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Contact Person Name & Designation *</label>
                  <input required value={form.contactPerson} onChange={e => set('contactPerson', e.target.value)} className="input-luxury" />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Mobile Number *</label>
                  <input required type="tel" value={form.mobile} onChange={e => set('mobile', e.target.value)} className="input-luxury" />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Email Address *</label>
                  <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} className="input-luxury" />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Website / Social Media Link</label>
                  <input value={form.website} onChange={e => set('website', e.target.value)} className="input-luxury" />
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/5">
                <Globe2 size={18} className="text-gold" />
                <h2 className="text-white font-semibold text-lg">Section 2 — Africa Sales Experience</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-3">Are you currently selling Kenya Safari packages? *</label>
                  <div className="flex gap-4 flex-wrap">
                    {['Yes', 'No', 'Planning to start soon'].map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="sellingKenya" checked={form.sellingKenya === opt} onChange={() => set('sellingKenya', opt)} required className="accent-gold" />
                        <span className="text-sm text-white/80">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-3">Which African destinations have you sold in last 12 months?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {destinationsOptions.map(opt => (
                      <label key={opt} className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${form.destinationsSold.includes(opt) ? 'bg-gold/10 border-gold/40 text-white' : 'bg-white/5 border-white/10 text-white/50'}`}>
                        <input type="checkbox" className="hidden" checked={form.destinationsSold.includes(opt)} onChange={() => handleMultiSelect('destinationsSold', opt)} />
                        <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${form.destinationsSold.includes(opt) ? 'bg-gold border-gold' : 'border-white/30'}`}>
                          {form.destinationsSold.includes(opt) && <CheckCircle2 size={12} className="text-obsidian" />}
                        </div>
                        <span className="text-xs">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Approximate number of PAX handled for Africa in last 12 months?</label>
                  <select value={form.paxHandled} onChange={e => set('paxHandled', e.target.value)} className="input-luxury">
                    <option value="" disabled>Select range</option>
                    {paxOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-3">What traveller segments do you mostly deal with?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {segmentOptions.map(opt => (
                      <label key={opt} className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${form.segments.includes(opt) ? 'bg-gold/10 border-gold/40 text-white' : 'bg-white/5 border-white/10 text-white/50'}`}>
                        <input type="checkbox" className="hidden" checked={form.segments.includes(opt)} onChange={() => handleMultiSelect('segments', opt)} />
                        <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${form.segments.includes(opt) ? 'bg-gold border-gold' : 'border-white/30'}`}>
                          {form.segments.includes(opt) && <CheckCircle2 size={12} className="text-obsidian" />}
                        </div>
                        <span className="text-xs">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/5">
                <Briefcase size={18} className="text-gold" />
                <h2 className="text-white font-semibold text-lg">Section 3 — Market Understanding</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-3">How do your clients currently perceive Kenya Safari pricing? *</label>
                  <div className="flex gap-4 flex-wrap">
                    {perceptionOptions.map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="perception" checked={form.perception === opt} onChange={() => set('perception', opt)} required className="accent-gold" />
                        <span className="text-sm text-white/80">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">What budget range do most clients aim for?</label>
                  <select value={form.budget} onChange={e => set('budget', e.target.value)} className="input-luxury">
                    <option value="" disabled>Select budget range</option>
                    {budgetOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Biggest pricing objections clients usually give?</label>
                  <textarea value={form.objections} onChange={e => set('objections', e.target.value)} rows={3} className="input-luxury resize-none" />
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/5">
                <Map size={18} className="text-gold" />
                <h2 className="text-white font-semibold text-lg">Section 4 — Product Interest</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Which Kenya / Africa itineraries are you currently promoting?</label>
                  <textarea value={form.promoting} onChange={e => set('promoting', e.target.value)} rows={2} className="input-luxury resize-none" />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-2">Any preferred parks, lodge brands or safari regions?</label>
                  <textarea value={form.preferences} onChange={e => set('preferences', e.target.value)} rows={2} className="input-luxury resize-none" />
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/5">
                <HeartHandshake size={18} className="text-gold" />
                <h2 className="text-white font-semibold text-lg">Section 5 — Partnership Support</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-3">What support would help you sell Kenya more effectively?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {supportOptions.map(opt => (
                      <label key={opt} className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${form.support.includes(opt) ? 'bg-gold/10 border-gold/40 text-white' : 'bg-white/5 border-white/10 text-white/50'}`}>
                        <input type="checkbox" className="hidden" checked={form.support.includes(opt)} onChange={() => handleMultiSelect('support', opt)} />
                        <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${form.support.includes(opt) ? 'bg-gold border-gold' : 'border-white/30'}`}>
                          {form.support.includes(opt) && <CheckCircle2 size={12} className="text-obsidian" />}
                        </div>
                        <span className="text-xs">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-3">What type of partnership would work best? *</label>
                  <div className="flex gap-4 flex-wrap">
                    {partnershipOptions.map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="partnershipType" checked={form.partnershipType === opt} onChange={() => set('partnershipType', opt)} required className="accent-gold" />
                        <span className="text-sm text-white/80">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-3">How soon can you start selling Kenya products? *</label>
                  <div className="flex gap-4 flex-wrap">
                    {timelineOptions.map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="timeline" checked={form.timeline === opt} onChange={() => set('timeline', opt)} required className="accent-gold" />
                        <span className="text-sm text-white/80">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-white/40 text-[10px] tracking-wider uppercase block mb-3">Preferred communication channel *</label>
                  <div className="flex gap-4 flex-wrap">
                    {commOptions.map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="communication" checked={form.communication === opt} onChange={() => set('communication', opt)} required className="accent-gold" />
                        <span className="text-sm text-white/80">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required checked={form.consent} onChange={e => set('consent', e.target.checked)} className="mt-1 accent-gold" />
                    <span className="text-xs text-white/60 leading-relaxed">I agree to be contacted for B2B Kenya safari partnership discussions and understand that submitting this form does not guarantee a partnership.</span>
                  </label>
                </div>
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
                  Submitting Profile...
                </div>
              ) : (
                <><Send size={16} /> Submit Partnership Survey</>
              )}
            </motion.button>
          </form>
        </FadeUp>
      </div>
    </div>
  );
}
