import { Link } from 'react-router-dom';
import { Camera, Users, MessageCircle, Video, Briefcase, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-obsidian-100 border-t border-gold/10 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/logo.jpg" 
                alt="Karawaan Logo" 
                className="h-20 w-auto object-contain rounded-xl shadow-lg"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="flex flex-col justify-center">
                <span className="font-display text-2xl font-semibold text-white tracking-widest">
                  KARA<span className="text-gold-gradient">WAAN</span>
                </span>
                <p className="text-[11px] text-white/50 tracking-[0.35em] uppercase font-sans -mt-1">
                  Trails & Safaris
                </p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              India's premier B2B travel solutions company, connecting travel agents with the world's finest international experiences.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Camera, href: 'https://www.instagram.com/rushikesh__rv_12?igsh=Z2VxODBwbGZ6bTY1', label: 'Instagram' },
                { icon: Users, href: 'https://www.facebook.com/share/1LE7B1Suvy/', label: 'Facebook' },
                { icon: MessageCircle, href: '#', label: 'Twitter' },
                { icon: Video, href: '#', label: 'YouTube' },
                { icon: Briefcase, href: 'https://www.linkedin.com/in/rushikesh-r-deshmukh/', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href !== '#' ? '_blank' : undefined}
                  rel={href !== '#' ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/40 transition-all duration-300 hover:scale-110"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-widest uppercase mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Our Services', path: '/services' },
                { label: 'Destinations', path: '/#destinations' },
                { label: 'Partner Network', path: '/about#partners' },
                { label: 'Submit Inquiry', path: '/inquiry' },
                { label: 'Admin Panel', path: '/admin' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/40 hover:text-gold text-sm flex items-center gap-2 group transition-colors duration-300"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-widest uppercase mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                'International Package Sourcing',
                'Safari & Wildlife Tours',
                'Luxury Travel',
                'Visa Support',
                'Group Tours',
                'Corporate Travel',
                'Honeymoon Packages',
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-white/40 hover:text-gold text-sm flex items-center gap-2 group transition-colors duration-300"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all duration-300" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-sm tracking-widest uppercase mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail size={14} className="text-gold" />
                </div>
                <div>
                  <p className="text-white/30 text-xs mb-0.5">Email</p>
                  <a href="mailto:rushikesh5953@gmail.com" className="text-white/60 hover:text-gold text-sm transition-colors">
                    rushikesh5953@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={14} className="text-gold" />
                </div>
                <div>
                  <p className="text-white/30 text-xs mb-0.5">Phone</p>
                  <a href="tel:+919881075953" className="text-white/60 hover:text-gold text-sm transition-colors">
                    +91 98810 75953
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-gold" />
                </div>
                <div>
                  <p className="text-white/30 text-xs mb-0.5">Office</p>
                  <p className="text-white/60 text-sm">
                    Travel Hub, Bandra West,<br />Mumbai, Maharashtra 400050
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs tracking-wide">
            © 2026 Karawaan Trails & Safaris. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-white/25 hover:text-gold text-xs transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
