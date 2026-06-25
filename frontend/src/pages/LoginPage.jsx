import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShieldAlert, ArrowRight, Mail, Lock, KeyRound, CheckCircle2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import API_BASE_URL from '../config/api';

export default function LoginPage() {
  const { login, theme } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState('agent'); // 'agent' | 'admin'

  // Forgot password state
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotError, setForgotError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(email, password, loginType);
      navigate(loginType === 'admin' ? '/admin' : '/dashboard');
    }, 1500);
  };

  const handleQuickLogin = (type) => {
    setError('');
    setLoading(true);
    setLoginType(type);
    
    // In a real app, these would be separate demo accounts
    const mockEmail = type === 'admin' ? 'admin@karawaan.com' : 'agent@travel.com';
    const mockPassword = 'password123';
    
    setEmail(mockEmail);
    setPassword(mockPassword);

    setTimeout(() => {
      setLoading(false);
      login(mockEmail, mockPassword, type);
      navigate(type === 'admin' ? '/admin' : '/dashboard');
    }, 1200);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotError('');
    
    if (!forgotEmail) {
      setForgotError('Please enter your email address');
      return;
    }

    setForgotLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await response.json();
      if (!response.ok) {
        setForgotError(data.message || 'Failed to send reset email');
        setForgotLoading(false);
        return;
      }
      setForgotSent(true);
    } catch (err) {
      // Show success anyway for UX (don't reveal if email exists or not)
      setForgotSent(true);
    }
    setForgotLoading(false);
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
              className="w-20 h-20 rounded-2xl object-cover mx-auto shadow-lg border-2 border-gold/30"
            />
          </div>
          <h1 className="font-display text-2xl font-light text-slate-800 dark:text-white transition-colors">
            {loginType === 'admin' ? 'Admin Control Center' : 'B2B Partner Portal'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-white/40 mt-1 transition-colors">
            {loginType === 'admin' ? 'System Management & Oversight' : 'Luxury Travel Management & Inquiry System'}
          </p>
        </div>

        {/* Card */}
        <div className="glass-card p-6 sm:p-8 border-gold-300/30 dark:border-white/10 dark:bg-[#0D1117]/80 shadow-xl">

          {/* Role Toggle */}
          <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl mb-8 border border-slate-200 dark:border-white/10">
            <button
              onClick={() => { setLoginType('agent'); setError(''); }}
              className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                loginType === 'agent'
                  ? 'bg-white dark:bg-[#0D1117] text-gold shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                  : 'text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white/80'
              }`}
            >
              Travel Agent
            </button>
            <button
              onClick={() => { setLoginType('admin'); setError(''); }}
              className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                loginType === 'admin'
                  ? 'bg-white dark:bg-[#0D1117] text-gold shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                  : 'text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white/80'
              }`}
            >
              Administrator
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs text-center font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rushikesh5953@gmail.com"
                  className="input-luxury pl-11"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => { setShowForgot(true); setForgotEmail(email); setForgotSent(false); setForgotError(''); }}
                  className="text-gold text-[10px] tracking-wider uppercase font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="input-luxury pl-11"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-3 py-3.5 text-sm font-semibold tracking-wider uppercase shadow-md disabled:opacity-60"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full"
                  />
                  Authenticating...
                </div>
              ) : (
                <>
                  Enter Dashboard
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>



          {/* Quick-Logins */}
          <div className="mt-5 pt-5 border-t border-slate-200 dark:border-white/5 text-center">
            <p className="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-widest mb-3">
              Demo Fast Pass Logins
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => handleQuickLogin('agent')}
                disabled={loading}
                className="px-4 py-2 text-xs rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-white/70 border border-slate-200 dark:border-white/5 cursor-pointer font-medium transition-colors"
              >
                ✈️ Agent Demo
              </button>
              <button
                onClick={() => handleQuickLogin('admin')}
                disabled={loading}
                className="px-4 py-2 text-xs rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-white/70 border border-slate-200 dark:border-white/5 cursor-pointer font-medium transition-colors"
              >
                🛡️ Admin Demo
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500 dark:text-white/50">
              Don't have an account?{' '}
              <Link to="/register" className="text-gold hover:underline font-medium">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowForgot(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-md p-8 border-gold-300/30 dark:border-white/10 dark:bg-[#0D1117]/95 shadow-2xl relative"
            >
              <button
                onClick={() => setShowForgot(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
                  <KeyRound size={24} className="text-gold" />
                </div>
                <h3 className="font-display text-xl text-slate-800 dark:text-white">
                  {forgotSent ? 'Check Your Email' : 'Reset Password'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-white/40 mt-1">
                  {forgotSent
                    ? 'A password reset link has been sent to your email address.'
                    : 'Enter the email associated with your account and we\'ll send a reset link.'}
                </p>
              </div>

              {forgotSent ? (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-emerald-400" />
                  </div>
                  <p className="text-sm text-slate-500 dark:text-white/50 mb-6">
                    If an account with <strong className="text-gold">{forgotEmail}</strong> exists, you will receive reset instructions shortly.
                  </p>
                  <button onClick={() => setShowForgot(false)} className="btn-primary w-full py-3 text-sm font-semibold">
                    Back to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  {forgotError && (
                    <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs text-center font-medium">
                      {forgotError}
                    </div>
                  )}

                  <div>
                    <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="Enter your registered email"
                        className="input-luxury pl-11"
                        disabled={forgotLoading}
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold tracking-wider uppercase disabled:opacity-60"
                  >
                    {forgotLoading ? (
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full"
                        />
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Mail size={14} />
                        Send Reset Link
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
