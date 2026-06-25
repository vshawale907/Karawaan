import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  ArrowRight, Star, Globe, Shield, Users, Trophy,
  ChevronDown, Play, MapPin, Clock, Compass,
  Camera, MessageCircle, Video
} from 'lucide-react';
import {
  FadeUp, FadeIn, SlideInLeft, SlideInRight,
  ScaleIn, StaggerContainer, StaggerItem, SectionHeader, GoldDivider
} from '../components/ui';
import { destinations, testimonials, partners } from '../data/dummyData';

// Hero images from Unsplash
const heroImages = [
  'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=90', // Africa savanna
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90', // Dubai
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=90', // Swiss Alps
];

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src={heroImages[0]}
          alt="African Safari"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/30 to-obsidian/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 via-transparent to-obsidian/30" />
      </motion.div>

      {/* Gold particle effects */}
      <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold/60"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center max-w-5xl mx-auto px-6">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-none tracking-wide mb-6"
        >
          Where Trails
          <br />
          <span className="text-gold-gradient italic">Become Legends</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Empowering travel agents with world-class international packages, safari experiences, and luxury journeys across 40+ destinations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/inquiry" className="btn-primary group flex items-center gap-2">
            Submit Inquiry
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/services" className="btn-outline flex items-center gap-2">
            <Play size={14} />
            Explore Services
          </Link>
        </motion.div>


      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-white/30 text-xs tracking-widest uppercase">Scroll</p>
        <ChevronDown size={20} className="text-gold/60" />
      </motion.div>
    </section>
  );
}



function DestinationsSection() {
  return (
    <section id="destinations" className="py-28 bg-obsidian-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          subtitle="Explore the World"
          title={<>Featured <span className="text-gold-gradient">Destinations</span></>}
          description="From African savanna to Alpine peaks — our curated selection of the world's most sought-after destinations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <ScaleIn key={dest.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-gold/90 text-obsidian text-xs font-bold tracking-wider uppercase">
                      {dest.category}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                    <Star size={11} className="text-gold fill-gold" />
                    <span className="text-white text-xs font-medium">{dest.rating}</span>
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={12} className="text-gold" />
                    <span className="text-gold/80 text-xs tracking-wider uppercase">{dest.duration}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white mb-1">{dest.name}</h3>
                  <p className="text-white/50 text-sm mb-4">{dest.tagline}</p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {dest.highlights.slice(0, 3).map((h) => (
                      <span key={h} className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gold font-semibold text-sm">{dest.price}</span>

                  </div>
                </div>
              </motion.div>
            </ScaleIn>
          ))}
        </div>

        <FadeUp delay={0.3} className="text-center mt-12">
          <Link to="/inquiry" className="btn-outline">
            Inquire About Any Destination
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

function PartnersSection() {
  return (
    <section className="py-28 bg-obsidian relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(27,67,50,0.15)_0%,transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          subtitle="Global Network"
          title={<>Our International <span className="text-gold-gradient">Partners</span></>}
          description="Trusted partnerships with the world's finest travel operators — giving you exclusive access to premium international packages."
        />

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {partners.map((partner) => (
            <StaggerItem key={partner.id}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass-card-dark p-6 group cursor-pointer flex flex-col items-center justify-center text-center h-full"
              >
                <span className="text-5xl mb-3 block transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                  {partner.flag}
                </span>
                <h3 className="font-display font-semibold text-white text-base md:text-lg group-hover:text-gold transition-colors duration-300">
                  {partner.country.replace(partner.flag, '').trim()}
                </h3>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-28 bg-forest/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,168,76,0.04)_0%,transparent_70%)]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          subtitle="Client Stories"
          title={<>What Our <span className="text-gold-gradient">Clients Say</span></>}
          description="Real experiences from real travelers who trusted Karawaan for their journeys."
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="glass-card-dark p-8 relative"
              >
                {/* Quote Mark */}
                <div className="absolute top-6 right-6 font-display text-6xl text-gold/10 leading-none">"</div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-gold fill-gold" />
                  ))}
                </div>

                <p className="text-white/65 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>

                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0">
                    <span className="text-obsidian font-bold text-sm">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.location}</p>
                    <p className="text-gold/70 text-xs mt-0.5">{t.trip} · {t.date}</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}



function CTASection() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80"
          alt="Safari CTA"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-obsidian/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.1)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <p className="section-subtitle mb-4">
            <span className="text-gold-gradient">Ready to Begin?</span>
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl font-light text-white mb-6 leading-tight">
            Your Client's Dream Trip
            <br />
            <span className="text-gold-gradient italic">Starts Here</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="text-white/55 text-lg mb-10 max-w-xl mx-auto">
            Submit an inquiry and let Karawaan's global network craft the perfect international experience for your clients.
          </p>
        </FadeUp>
        <FadeUp delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/inquiry" className="btn-primary group flex items-center gap-2">
            Submit Inquiry Now
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/contact" className="btn-outline">
            Contact Our Team
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

function SocialSection() {
  const handles = [
    { icon: Camera, handle: '@rushikesh__rv_12', followers: '12.4K', platform: 'Instagram', color: 'from-pink-500 to-orange-400', href: 'https://www.instagram.com/rushikesh__rv_12?igsh=Z2VxODBwbGZ6bTY1' },
    { icon: Users, handle: 'Rushikesh Deshmukh', followers: '8.9K', platform: 'Facebook', color: 'from-blue-600 to-blue-400', href: 'https://www.facebook.com/share/1LE7B1Suvy/' },
    { icon: MessageCircle, handle: '@KarawaanSafaris', followers: '5.2K', platform: 'Twitter / X', color: 'from-gray-700 to-gray-500', href: '#' },
    { icon: Video, handle: 'Karawaan Adventures', followers: '3.1K', platform: 'YouTube', color: 'from-red-600 to-red-400', href: '#' },
  ];

  return (
    <section className="py-10 bg-obsidian-50 border-t border-gold/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <FadeUp className="text-center md:text-left mb-8">
          <p className="text-gold/80 text-xs tracking-[0.2em] uppercase font-sans mb-1">
            Follow Our Journey
          </p>
          <h2 className="font-display text-2xl md:text-3xl text-white">Stay Connected</h2>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {handles.map((s) => (
            <StaggerItem key={s.platform}>
              <motion.a
                href={s.href}
                target={s.href !== '#' ? '_blank' : undefined}
                rel={s.href !== '#' ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="glass-card p-4 group flex items-center gap-4 hover:bg-white/[0.03] border border-white/5 hover:border-gold/20 transition-all"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0 shadow-lg opacity-90 group-hover:opacity-100 transition-opacity`}>
                  <s.icon size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="text-white/90 text-sm font-medium tracking-wide">{s.platform}</h3>
                    <span className="text-gold text-xs font-bold">{s.followers}</span>
                  </div>
                  <p className="text-white/40 text-[11px] truncate tracking-wide">{s.handle}</p>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-obsidian">
      <HeroSection />
      <DestinationsSection />
      <PartnersSection />
      <CTASection />
      <TestimonialsSection />
      <SocialSection />
    </div>
  );
}
