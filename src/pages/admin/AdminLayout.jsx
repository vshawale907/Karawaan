import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Inbox, Bell, Building2, Map, Settings,
  ChevronRight, Menu, X, LogOut, Search, TrendingUp, ClipboardList
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'All Inquiries', icon: Inbox, path: '/admin/inquiries' },
  { label: 'Follow-Ups', icon: Bell, path: '/admin/followups' },
  { label: 'B2B Surveys', icon: ClipboardList, path: '/admin/surveys' },
  { label: 'Partner Agencies', icon: Building2, path: '/admin/partners' },
  { label: 'Destinations', icon: Map, path: '/admin/destinations' },
  { label: 'Settings', icon: Settings, path: '/admin/settings' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/5">
        <img 
          src="/logo.jpg" 
          alt="Karawaan Logo" 
          className="h-14 w-auto object-contain rounded-lg flex-shrink-0 shadow-lg"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        {sidebarOpen && (
          <div className="flex flex-col justify-center">
            <span className="font-display text-lg font-semibold text-white tracking-widest">
              KARA<span className="text-gold-gradient">WAAN</span>
            </span>
            <p className="text-[10px] text-white/50 tracking-[0.25em] uppercase font-sans -mt-0.5">
              Admin Portal
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path ||
            (item.path !== '/admin' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileSidebarOpen(false)}
              className={active ? 'sidebar-link-active' : 'sidebar-link'}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
              {active && sidebarOpen && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/5">
        {sidebarOpen && (
          <div className="flex items-center gap-3 px-3 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-bold flex-shrink-0">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">Admin User</p>
              <p className="text-white/30 text-[10px] truncate">admin@karawaan.com</p>
            </div>
          </div>
        )}
        <Link to="/" className="sidebar-link text-red-400/60 hover:text-red-400 hover:bg-red-400/5">
          <LogOut size={17} className="flex-shrink-0" />
          {sidebarOpen && <span>Back to Site</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#080B10] overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 68 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col bg-[#0D1117] border-r border-white/5 overflow-hidden flex-shrink-0"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)} />
            <motion.aside
              initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-60 bg-[#0D1117] border-r border-white/5 flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-white/5 bg-[#0D1117] flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => { setSidebarOpen(o => !o); setMobileSidebarOpen(o => !o); }}
              className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
            >
              <Menu size={18} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-2 w-64">
              <Search size={14} className="text-white/30" />
              <input placeholder="Search inquiries..." className="bg-transparent text-white/60 text-sm flex-1 outline-none placeholder-white/25" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/inquiry" className="btn-primary text-xs px-4 py-2">
              + New Inquiry
            </Link>
            <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-obsidian font-bold text-xs cursor-pointer">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
