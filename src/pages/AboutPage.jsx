import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Shield, Heart, Award, Users, Star, CheckCircle2 } from 'lucide-react';
import { FadeUp, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem, SectionHeader, ScaleIn } from '../components/ui';
import { partners } from '../data/dummyData';

const timeline = [
  { year: '2016', title: 'Founded in Mumbai', desc: 'Karawaan began as a small B2B travel consultancy, connecting local agents with Dubai tourism packages.' },
  { year: '2018', title: 'African Safari Division', desc: 'Launched our dedicated safari division, partnering with East Africa\'s premier operators.' },
  { year: '2020', title: 'Digital Transformation', desc: 'Moved operations fully digital, building streamlined inquiry and fulfillment workflows.' },
  { year: '2022', title: 'Pan-Asia Expansion', desc: 'Expanded into Southeast Asia — Bali, Thailand, Singapore — with Global Asia Holidays.' },
  { year: '2024', title: 'European Corridor', desc: 'Launched European packages through EuroTrail Adventures, completing our global coverage.' },
  { year: '2026', title: 'Industry Leaders', desc: '800+ satisfied clients, 5 global partners, and India\'s most trusted B2B travel platform.' },
];

const values = [
  { icon: Shield, title: 'Trust & Transparency', desc: 'We operate with complete transparency in pricing, commissions, and partner relations.' },
  { icon: Globe, title: 'Global Reach', desc: 'Our network spans 5 continents, giving your clients access to the world\'s finest experiences.' },
  { icon: Heart, title: 'Client-First Approach', desc: 'Every decision we make is driven by the best interest of your clients\' travel experience.' },
  { icon: Award, title: 'Excellence in Curation', desc: 'Only the finest accommodations, guides, and experiences make it into our packages.' },
];

const reasons = [
  '5 handpicked global partner agencies',
  'Dedicated agent relationship manager',
  'Competitive B2B commission structures',
  '24/7 on-trip support for your clients',
  'Multi-destination and group specialization',
  'Transparent pricing — no hidden costs',
  'Swift 48-hour inquiry response guarantee',
  'Luxury to budget — all segments covered',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-obsidian pt-20">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1920&q=80"
            alt="About Karawaan"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/80 to-obsidian" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="section-subtitle mb-4 text-gold-gradient">Our Story</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white leading-tight mb-6">
              Born from a Passion
              <br />
              <span className="text-gold-gradient italic">for Exploration</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-white/55 text-xl max-w-2xl mx-auto leading-relaxed">
              Karawaan — meaning "caravan" in Urdu — embodies the spirit of guided journeys across the world's most extraordinary landscapes.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <SlideInLeft>
            <div>
              <p className="section-subtitle mb-4 text-gold-gradient">Who We Are</p>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-8 leading-tight">
                India's Premier B2B
                <br />
                <span className="text-gold-gradient">Travel Solutions Company</span>
              </h2>
              <div className="space-y-4 text-white/55 leading-relaxed">
                <p>
                  Karawaan Trails & Safaris is a dedicated B2B travel platform that acts as the bridge between Indian travel agents and world-class international travel operators. We understand the complexities of sourcing authentic, high-quality international experiences — which is why we built a trusted network of partners across 5 continents.
                </p>
                <p>
                  Founded in 2016 in Mumbai, we've grown from a boutique Dubai specialist to a comprehensive global travel solutions company. Our team of 25+ dedicated travel professionals handles everything from initial inquiry to on-ground support, ensuring every journey exceeds expectations.
                </p>
                <p>
                  Whether it's a luxury Maldives honeymoon, an African safari expedition, a European rail journey, or a corporate team retreat in Bali — Karawaan delivers with precision, passion, and professionalism.
                </p>
              </div>
            </div>
          </SlideInLeft>

          <SlideInRight delay={0.2}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=700&q=80"
                alt="Our Team"
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="absolute -bottom-6 -left-6 glass-card-dark p-6 max-w-xs">
                <div className="flex gap-4">
                  {[
                    { value: '800+', label: 'Happy Clients' },
                    { value: '40+', label: 'Destinations' },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="font-display text-2xl text-gold font-bold">{s.value}</p>
                      <p className="text-white/40 text-xs">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-gold">
                <div className="text-center">
                  <p className="font-display text-2xl text-obsidian font-bold">8+</p>
                  <p className="text-obsidian/70 text-xs">Years</p>
                </div>
              </div>
            </div>
          </SlideInRight>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-obsidian-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StaggerItem>
              <div className="glass-card-dark p-10 h-full">
                <div className="w-12 h-12 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center mb-6">
                  <Globe size={22} className="text-gold" />
                </div>
                <h3 className="font-display text-3xl text-white mb-4">Our Mission</h3>
                <p className="text-white/55 leading-relaxed">
                  To empower every Indian travel agent with access to the world's finest international travel experiences, through a trusted network of global partners, seamless B2B operations, and unwavering commitment to quality — making the extraordinary accessible to all.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="glass-card-dark p-10 h-full">
                <div className="w-12 h-12 rounded-xl bg-forest/40 border border-forest-light/30 flex items-center justify-center mb-6">
                  <Star size={22} className="text-emerald-400" />
                </div>
                <h3 className="font-display text-3xl text-white mb-4">Our Vision</h3>
                <p className="text-white/55 leading-relaxed">
                  To become South Asia's most respected B2B travel solutions platform — recognized globally for our curated experiences, partner integrity, and the transformative journeys we deliver. We envision a world where every dream destination is within reach of every Indian traveler.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          subtitle="Our Journey"
          title={<>A Decade of <span className="text-gold-gradient">Milestones</span></>}
        />

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold/30 via-gold/20 to-transparent hidden md:block" />

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <FadeUp key={item.year} delay={i * 0.1}>
                <div className="flex items-start gap-8 md:ml-8 pl-0 md:pl-12 relative">
                  <div className="hidden md:flex absolute -left-12 w-8 h-8 rounded-full bg-gold-gradient items-center justify-center flex-shrink-0 shadow-gold text-obsidian text-xs font-bold">
                    {i + 1}
                  </div>
                  <div className="glass-card-dark p-6 flex-1 group hover:border-gold/30 transition-colors duration-300">
                    <span className="text-gold text-sm font-bold tracking-wider">{item.year}</span>
                    <h3 className="font-semibold text-white text-base mt-1 mb-2">{item.title}</h3>
                    <p className="text-white/45 text-sm">{item.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-forest/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            subtitle="Our Values"
            title={<>What <span className="text-gold-gradient">Drives Us</span></>}
          />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="glass-card-dark p-8 text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                    <v.icon size={24} className="text-gold" />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-3">{v.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{v.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <SlideInLeft>
            <SectionHeader subtitle="Why Karawaan" title={<>Your Best Choice for <span className="text-gold-gradient">B2B Travel</span></>} center={false} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {reasons.map((r) => (
                <div key={r} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-gold flex-shrink-0" />
                  <span className="text-white/65 text-sm">{r}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/inquiry" className="btn-primary inline-flex items-center gap-2">
                Start Your Inquiry <ArrowRight size={16} />
              </Link>
            </div>
          </SlideInLeft>
          <SlideInRight delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80', alt: 'Luxury Experience' },
                { img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80', alt: 'Safari Experience' },
                { img: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&q=80', alt: 'Europe Tours' },
                { img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80', alt: 'Bali Experience' },
              ].map((img, i) => (
                <motion.img
                  key={i}
                  src={img.img}
                  alt={img.alt}
                  className={`w-full object-cover rounded-2xl ${i === 0 ? 'h-48 col-span-2' : 'h-36'}`}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </SlideInRight>
        </div>
      </section>

      {/* Partners Preview */}
      <section id="partners" className="py-20 bg-obsidian-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            subtitle="Partner Network"
            title={<>Our <span className="text-gold-gradient">Global Partners</span></>}
            description="Five handpicked international agencies forming the backbone of Karawaan's service excellence."
          />
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {partners.map((p) => (
              <StaggerItem key={p.id}>
                <motion.div whileHover={{ y: -4 }} className="glass-card-dark p-5 text-center group cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                    <span className="text-white font-bold text-sm">{p.initials}</span>
                  </div>
                  <p className="text-white text-xs font-semibold mb-1 group-hover:text-gold transition-colors">{p.name}</p>
                  <p className="text-white/30 text-xs">{p.country}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
