import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShieldAlert, ArrowRight, Mail, Lock, Building2, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RegisterPage() {
  const { register, theme } = useApp();
  const navigate = useNavigate();
  const [role, setRole] = useState('agent');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !phone) {
      setError('Please fill in all required fields');
      return;
    }

    if (role === 'agent' && !agencyName) {
      setError('Agency name is required for agents');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const success = register({ name, email, password, phone, agencyName, role });
      if (success) {
         if (role === 'admin') {
           navigate('/admin');
         } else {
           navigate('/agent');
         }
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-8 overflow-auto bg-[#FAF8F5] dark:bg-obsidian transition-colors duration-300">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gold/10 dark:bg-gold/5 blur-[80px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 50, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full bg-forest-200/10 dark:bg-forest/5 blur-[100px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[460px]"
      >
        {/* Logo + Brand */}
        <div className="text-center mb-6">
          <div className="inline-block mb-3">
            <img
              src="/logo.jpg"
              alt="Karawaan Logo"
              className="w-16 h-16 rounded-2xl object-cover mx-auto shadow-lg border-2 border-gold/30"
            />
          </div>
          <h1 className="font-display text-2xl font-light text-slate-800 dark:text-white">
            Partner Registration
          </h1>
          <p className="text-sm text-slate-500 dark:text-white/40 mt-1">
            Join the Luxury Travel Network
          </p>
        </div>

        {/* Card */}
        <div className="glass-card p-6 sm:p-8 border-gold-300/30 dark:border-white/10 dark:bg-[#0D1117]/80 shadow-xl">
          {/* Role Selectors */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole('agent')}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                role === 'agent'
                  ? 'bg-gold/10 border-gold/40 text-gold shadow-[0_0_15px_rgba(201,168,76,0.15)]'
                  : 'bg-slate-100/50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 dark:text-white/40 hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              <User size={18} className={role === 'agent' ? 'text-gold' : ''} />
              <span className="text-xs font-semibold tracking-wider uppercase">Travel Agent</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                role === 'admin'
                  ? 'bg-gold/10 border-gold/40 text-gold shadow-[0_0_15px_rgba(201,168,76,0.15)]'
                  : 'bg-slate-100/50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 dark:text-white/40 hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              <ShieldAlert size={18} className={role === 'admin' ? 'text-gold' : ''} />
              <span className="text-xs font-semibold tracking-wider uppercase">Administrator</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs text-center font-medium">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
               <div className="col-span-2">
                <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="input-luxury pl-11"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="input-luxury pl-11"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-1.5">
                  Phone
                </label>
                <div className="relative">
                  <Phone size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 234 567 890"
                    className="input-luxury pl-11"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-luxury pl-11"
                    disabled={loading}
                  />
                </div>
              </div>

              {role === 'agent' && (
                <div className="col-span-2">
                  <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-1.5">
                    Agency Name
                  </label>
                  <div className="relative">
                    <Building2 size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                    <input
                      type="text"
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      placeholder="Travel Agency Inc."
                      className="input-luxury pl-11"
                      disabled={loading}
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-3 py-3.5 mt-2 text-sm font-semibold tracking-wider uppercase shadow-md disabled:opacity-60"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full"
                  />
                  Registering...
                </div>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500 dark:text-white/50">
              Already have an account?{' '}
              <Link to="/login" className="text-gold hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
