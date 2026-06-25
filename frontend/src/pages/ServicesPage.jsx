import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Binoculars, Crown, FileCheck, Users, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FadeUp, StaggerContainer, StaggerItem, SectionHeader, ScaleIn } from '../components/ui';
import { services } from '../data/dummyData';

const iconMap = { Globe, Binoculars, Crown, FileCheck, Users, Briefcase };

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-obsidian pt-20">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1920&q=80"
            alt="Services"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-obsidian/80 to-obsidian" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <FadeUp>
            <p className="section-subtitle mb-4 text-gold-gradient">What We Offer</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Our <span className="text-gold-gradient italic">Services</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-white/55 text-xl max-w-xl mx-auto">
              Comprehensive B2B travel solutions designed for modern travel agents. From safaris to luxury escapes — we've got you covered.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <StaggerItem key={service.id}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`glass-card-dark p-8 h-full border ${service.borderColor} group cursor-pointer relative overflow-hidden`}
                >
                  {/* Hover Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} border ${service.borderColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={28} className="text-white" />
                    </div>

                    <h3 className="font-semibold text-white text-lg mb-3 group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {service.features.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-gold flex-shrink-0" />
                          <span className="text-white/55 text-xs">{f}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/inquiry"
                      className="inline-flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all duration-300"
                    >
                      Get a Quote <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* B2B Banner */}
      <section className="py-20 bg-obsidian-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <div className="glass-card-dark p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08)_0%,transparent_70%)]" />
              <div className="relative z-10">
                <p className="text-gold text-xs tracking-widest uppercase mb-4">Exclusive B2B Platform</p>
                <h2 className="font-display text-4xl text-white mb-6">
                  Partner with Karawaan
                </h2>
                <p className="text-white/50 mb-8 max-w-lg mx-auto">
                  Are you a travel agent or agency? Join our exclusive B2B network and access preferential rates, dedicated support, and world-class packages for your clients.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/inquiry" className="btn-primary">Submit Your First Inquiry</Link>
                  <Link to="/contact" className="btn-outline">Talk to Our Team</Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Process Comparison */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          subtitle="Our Edge"
          title={<>Why Agents Choose <span className="text-gold-gradient">Karawaan</span></>}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Without Karawaan',
              items: ['Sourcing packages independently', 'Negotiating directly with foreign hotels', 'No guaranteed support on-trip', 'Language and timezone barriers', 'Inconsistent quality control'],
              negative: true,
            },
            {
              title: 'The Karawaan Way',
              items: ['Submit one inquiry, get curated options', 'Best rates via our partner network', '24/7 on-trip client support', 'Dedicated agent relationship manager', 'Consistently premium experiences'],
              neutral: true,
            },
            {
              title: 'Your Result',
              items: ['Happy, returning clients', 'Higher commissions earned', 'Business reputation grows', 'More referrals & word-of-mouth', 'Time freed for more sales'],
              positive: true,
            },
          ].map((col) => (
            <FadeUp key={col.title} delay={col.neutral ? 0.1 : col.positive ? 0.2 : 0}>
              <div className={`glass-card-dark p-8 h-full ${col.neutral ? 'border-gold/40 bg-gold/5' : ''}`}>
                <h3 className={`font-semibold text-base mb-6 ${col.positive ? 'text-emerald-400' : col.neutral ? 'text-gold' : 'text-white/50'}`}>
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span className={`mt-0.5 flex-shrink-0 ${col.positive ? 'text-emerald-400' : col.neutral ? 'text-gold' : 'text-red-400'}`}>
                        {col.positive ? '✓' : col.neutral ? '→' : '✗'}
                      </span>
                      <span className={col.negative ? 'text-white/35 line-through' : 'text-white/60'}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
}
