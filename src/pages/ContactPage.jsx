import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Camera, Users, MessageCircle, Video, Briefcase, Send, CheckCircle2 } from 'lucide-react';
import { FadeUp, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem } from '../components/ui';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=1920&q=80" alt="Contact" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/80 to-obsidian" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeUp><p className="section-subtitle mb-4 text-gold-gradient">Get In Touch</p></FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display text-5xl md:text-6xl font-light text-white leading-tight mb-6">
              Let's Plan Your Client's
              <br /><span className="text-gold-gradient italic">Next Adventure</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-white/50 text-lg max-w-xl mx-auto">Our travel experts are ready to assist you Monday–Saturday, 9AM to 7PM IST.</p>
          </FadeUp>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Info */}
          <SlideInLeft className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl text-white mb-2">Contact Information</h2>
                <p className="text-white/40 text-sm">Reach us through any channel — we respond within 4 business hours.</p>
              </div>

              {[
                { icon: Mail, label: 'Email Us', value: 'info@karawaan.com', sub: 'partnerships@karawaan.com', href: 'mailto:info@karawaan.com' },
                { icon: Phone, label: 'Call Us', value: '+91 98765 43210', sub: '+91 87654 32109 (WhatsApp)', href: 'tel:+919876543210' },
                { icon: MapPin, label: 'Office Address', value: 'Travel Hub, Bandra West', sub: 'Mumbai, Maharashtra 400050', href: '#' },
                { icon: Clock, label: 'Business Hours', value: 'Mon–Sat: 9AM – 7PM IST', sub: 'Emergency Support: 24/7', href: '#' },
              ].map((item) => (
                <a key={item.label} href={item.href} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                    <item.icon size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-white/35 text-xs tracking-wider uppercase mb-1">{item.label}</p>
                    <p className="text-white font-medium text-sm">{item.value}</p>
                    <p className="text-white/40 text-xs mt-0.5">{item.sub}</p>
                  </div>
                </a>
              ))}

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-gold/20 to-transparent" />

              {/* Social */}
              <div>
                <p className="text-white/35 text-xs tracking-wider uppercase mb-4">Follow Us</p>
                <div className="flex items-center gap-3">
                  {[
                    { icon: Camera, href: '#', color: 'hover:bg-pink-500/20 hover:border-pink-500/40 hover:text-pink-400' },
                    { icon: Users, href: '#', color: 'hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-blue-400' },
                    { icon: MessageCircle, href: '#', color: 'hover:bg-gray-500/20 hover:border-gray-500/40 hover:text-gray-300' },
                    { icon: Video, href: '#', color: 'hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400' },
                    { icon: Briefcase, href: '#', color: 'hover:bg-blue-600/20 hover:border-blue-600/40 hover:text-blue-300' },
                  ].map(({ icon: Icon, href, color }) => (
                    <a key={color} href={href}
                      className={`w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/40 transition-all duration-300 ${color}`}>
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </SlideInLeft>

          {/* Right Form */}
          <SlideInRight delay={0.2} className="lg:col-span-3">
            <div className="glass-card-dark p-8 md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 size={36} className="text-emerald-400" />
                  </motion.div>
                  <h3 className="font-display text-3xl text-white mb-3">Message Received!</h3>
                  <p className="text-white/50 mb-6">Our team will respond within 4 business hours. Thank you for reaching out to Karawaan.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name:'',email:'',phone:'',subject:'',message:'' }); }}
                    className="btn-outline text-sm">Send Another Message</button>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-display text-2xl text-white mb-2">Send Us a Message</h3>
                  <p className="text-white/40 text-sm mb-8">Fill in the details below and we'll get back to you promptly.</p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Full Name *</label>
                        <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                          placeholder="Your full name" className="input-luxury" />
                      </div>
                      <div>
                        <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Email Address *</label>
                        <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                          placeholder="your@email.com" className="input-luxury" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Phone Number</label>
                        <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                          placeholder="+91 00000 00000" className="input-luxury" />
                      </div>
                      <div>
                        <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Subject *</label>
                        <select required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                          className="input-luxury">
                          <option value="" disabled>Select a subject</option>
                          <option value="partnership">Partnership Inquiry</option>
                          <option value="package">Package Information</option>
                          <option value="support">Customer Support</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-white/40 text-xs tracking-wider uppercase block mb-2">Message *</label>
                      <textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                        placeholder="Tell us how we can help you..." rows={5} className="input-luxury resize-none" />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary w-full flex items-center justify-center gap-2 py-4 disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full" />
                          Sending...
                        </>
                      ) : (
                        <><Send size={16} /> Send Message</>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </SlideInRight>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="pb-20 max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp>
          <div className="relative h-80 rounded-2xl overflow-hidden border border-white/5">
            <div className="absolute inset-0 bg-obsidian-50 flex items-center justify-center flex-col gap-4">
              <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
                <MapPin size={28} className="text-gold" />
              </div>
              <p className="text-white/50 text-sm">Interactive Map — Bandra West, Mumbai</p>
              <p className="text-white/25 text-xs">Google Maps integration available in production version</p>
            </div>
            {/* Decorative grid */}
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
