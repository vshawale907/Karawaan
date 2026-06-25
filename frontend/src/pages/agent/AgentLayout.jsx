import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, ClipboardList, Settings,
  ChevronRight, Menu, X, LogOut, Search, Bell, Sun, Moon, User
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/agent' },
  { label: 'Submit Inquiry', icon: FileText, path: '/agent/inquiry/new' },
  { label: 'Inquiry History', icon: ClipboardList, path: '/agent/inquiries' },
  { label: 'Profile', icon: User, path: '/agent/profile' },
  { label: 'Settings', icon: Settings, path: '/agent/settings' },
];

export default function AgentLayout() {
  const { currentUser, logout, theme, toggleTheme, notifications, markAllNotificationsRead } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter notifications relevant to current agent (or general notifications)
  const agentNotifications = notifications.filter(n => 
    !n.message.includes('submitted by agent') || n.message.includes(currentUser?.name || '')
  );

  const unreadCount = agentNotifications.filter(n => !n.read).length;

  // Handle auto redirect if not logged in or wrong role
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (currentUser.role !== 'agent') {
      navigate('/admin');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-[#0D1117] transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-slate-200/80 dark:border-white/5">
        <div className="w-9 h-9 rounded-xl bg-gold-gradient flex items-center justify-center font-bold text-obsidian text-sm flex-shrink-0">
          K
        </div>
        {sidebarOpen && (
          <div className="flex flex-col justify-center">
            <span className="font-display text-lg font-semibold text-slate-800 dark:text-white tracking-widest leading-none">
              KARA<span className="text-gold-gradient">WAAN</span>
            </span>
            <p className="text-[9px] text-slate-400 dark:text-white/40 tracking-[0.2em] uppercase font-sans mt-0.5">
              Agent Portal
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileSidebarOpen(false)}
              className={active ? 'sidebar-link-active' : 'sidebar-link'}
            >
              <item.icon size={18} className="flex-shrink-0 text-current" />
              {sidebarOpen && <span>{item.label}</span>}
              {active && sidebarOpen && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile Section */}
      <div className="px-3 py-4 border-t border-slate-200/80 dark:border-white/5">
        {sidebarOpen && (
          <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-slate-50 dark:bg-white/5 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-xs font-bold flex-shrink-0">
              {currentUser.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-800 dark:text-white text-xs font-semibold truncate leading-none mb-1">
                {currentUser.name}
              </p>
              <p className="text-slate-400 dark:text-white/30 text-[9px] truncate">
                {currentUser.agencyName}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={() => logout()}
          className="sidebar-link w-full text-red-500 hover:text-red-600 dark:text-red-400/70 dark:hover:text-red-400 hover:bg-red-500/5 transition-colors"
        >
          <LogOut size={17} className="flex-shrink-0" />
          {sidebarOpen && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#FAF8F5] dark:bg-[#080B10] text-slate-800 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 68 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col portal-sidebar"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-[40] bg-black/50 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-[50] w-60 portal-sidebar"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Panel Content Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="portal-header">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setSidebarOpen(o => !o);
                if (window.innerWidth < 1024) setMobileSidebarOpen(o => !o);
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:text-white/40 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <Menu size={18} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 w-64">
              <Search size={14} className="text-slate-400 dark:text-white/30" />
              <input
                placeholder="Search package inquiries..."
                className="bg-transparent text-slate-800 dark:text-white/60 text-sm flex-1 outline-none placeholder-slate-400 dark:placeholder-white/25"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:text-white/40 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Notification Center */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setNotifDropdownOpen(!notifDropdownOpen);
                  markAllNotificationsRead();
                }}
                className="relative p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:text-white/40 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                )}
              </button>

              <AnimatePresence>
                {notifDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#0D1117] border border-slate-200/80 dark:border-white/5 shadow-2xl rounded-2xl overflow-hidden z-[100]"
                  >
                    <div className="px-4 py-3 bg-slate-50 dark:bg-white/5 border-b border-slate-200/80 dark:border-white/5 flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-800 dark:text-white uppercase tracking-wider">
                        Notifications
                      </span>
                      <Link
                        to="/agent/settings"
                        onClick={() => setNotifDropdownOpen(false)}
                        className="text-[10px] text-gold hover:underline"
                      >
                        Manage
                      </Link>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto divide-y divide-slate-100 dark:divide-white/5">
                      {agentNotifications.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-400 dark:text-white/30">
                          No alerts at this moment
                        </div>
                      ) : (
                        agentNotifications.slice(0, 5).map((n) => (
                          <div key={n.id} className="p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            <p className="text-xs font-semibold text-slate-800 dark:text-white mb-0.5">
                              {n.title}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-white/50 leading-normal">
                              {n.message}
                            </p>
                            <span className="text-[9px] text-slate-400 dark:text-white/30 mt-1 block">
                              {new Date(n.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                    <Link
                      to="/agent"
                      onClick={() => setNotifDropdownOpen(false)}
                      className="block text-center py-2.5 text-[10px] uppercase font-semibold text-slate-500 dark:text-white/40 tracking-widest border-t border-slate-200/80 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/10"
                    >
                      View Dashboard Logs
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative border-l border-slate-200/80 dark:border-white/5 pl-3" ref={profileRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center font-bold text-obsidian text-xs">
                  {currentUser.avatar}
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-800 dark:text-white leading-none">
                    {currentUser.name}
                  </span>
                  <span className="text-[9px] text-slate-400 dark:text-white/40 mt-0.5">
                    {currentUser.role === 'admin' ? 'Administrator' : 'Travel Agent'}
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute right-0 mt-3 w-48 bg-white dark:bg-[#0D1117] border border-slate-200/80 dark:border-white/5 shadow-2xl rounded-2xl overflow-hidden z-[100]"
                  >
                    <div className="p-3 bg-slate-50 dark:bg-white/5 border-b border-slate-200/80 dark:border-white/5 text-center">
                      <p className="text-xs font-semibold text-slate-800 dark:text-white">
                        {currentUser.name}
                      </p>
                      <p className="text-[9px] text-slate-400 dark:text-white/40 truncate">
                        {currentUser.email}
                      </p>
                    </div>
                    <div className="p-1">
                      <Link
                        to="/agent/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-white/70"
                      >
                        <User size={14} /> Profile
                      </Link>
                      <Link
                        to="/agent/settings"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-white/70"
                      >
                        <Settings size={14} /> Portal Settings
                      </Link>
                      <hr className="my-1 border-slate-100 dark:border-white/5" />
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                        }}
                        className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-red-500/5 text-red-500"
                      >
                        <LogOut size={14} /> Log Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dynamic Page Router */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
