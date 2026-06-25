import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Building2, MapPin, ShieldCheck, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateToken, storeToken } from '../../utils/jwt';

const avatarColors = [
  'bg-gold',
  'bg-emerald-500',
  'bg-blue-500',
  'bg-purple-500',
  'bg-rose-500',
];

export default function ProfilePage() {
  const { currentUser, showToast } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [agencyName, setAgencyName] = useState(currentUser?.agencyName || '');
  const [address, setAddress] = useState('12, Nariman Point, Mumbai, Maharashtra 400021');
  
  const [selectedColor, setSelectedColor] = useState('bg-gold');
  const [loading, setLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      // Update context user
      currentUser.name = name;
      currentUser.email = email;
      currentUser.phone = phone;
      currentUser.agencyName = agencyName;
      // Persist via JWT token
      const token = generateToken(currentUser);
      storeToken(token);
      showToast('Profile updated successfully!', 'success');
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-display text-3xl font-light text-slate-800 dark:text-white">
          Manage Profile
        </h1>
        <p className="text-sm text-slate-400 dark:text-white/40 mt-1">
          Review or update your personal account information and agency branding.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Left Column: Avatar & Status */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="glass-card p-8 text-center flex flex-col h-full relative overflow-hidden">
            {/* Decorative background glow */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 blur-[60px] opacity-20 ${selectedColor}`} />

            <div className="relative z-10">
              {/* Avatar block */}
              <div className="relative inline-block mb-5">
                <div className={`w-28 h-28 rounded-full ${selectedColor} flex items-center justify-center font-display font-bold text-5xl text-obsidian shadow-xl mx-auto ring-4 ring-white/5`}>
                  {currentUser?.avatar || 'U'}
                </div>
                <span className="absolute bottom-1 right-2 w-7 h-7 rounded-full bg-emerald-500 border-[3px] border-obsidian flex items-center justify-center text-white shadow-lg">
                  <Check size={14} strokeWidth={3} />
                </span>
              </div>

              <h3 className="font-semibold text-slate-800 dark:text-white text-xl">
                {name}
              </h3>
              <p className="text-xs text-slate-400 dark:text-gold uppercase tracking-widest mt-1.5 font-medium">
                {currentUser?.role === 'admin' ? 'Administrator' : 'Travel Agent'}
              </p>

              <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-white/5 space-y-4 text-left text-sm">
                <div className="flex items-start gap-3 text-slate-500 dark:text-white/60">
                  <ShieldCheck size={16} className="text-emerald-500 mt-0.5" />
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400 dark:text-white/40 mb-0.5">Verification</span>
                    <strong className="text-slate-800 dark:text-white font-medium">Approved B2B Partner</strong>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-slate-500 dark:text-white/60">
                  <Building2 size={16} className="text-gold mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400 dark:text-white/40 mb-0.5">Associated Agency</span>
                    <strong className="text-slate-800 dark:text-white font-medium break-words leading-tight block pr-2">{agencyName}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Change Avatar color */}
          <div className="glass-card p-6">
            <h4 className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest mb-4 text-center">
              Avatar Aesthetics
            </h4>
            <div className="flex justify-center gap-3">
              {avatarColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full ${color} cursor-pointer transition-all ${
                    selectedColor === color ? 'scale-110 ring-2 ring-gold ring-offset-2 ring-offset-obsidian shadow-[0_0_15px_rgba(201,168,76,0.3)]' : 'hover:scale-110 opacity-70 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSave} className="glass-card p-8 lg:p-10 space-y-8">
            <div className="border-b border-slate-200/80 dark:border-white/5 pb-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-widest">
                Personal Information
              </h3>
              <p className="text-xs text-slate-400 dark:text-white/40 mt-1">
                Update your contact details and business profile.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-slate-400 dark:text-white/50 text-[10px] font-bold tracking-widest uppercase block mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-luxury pl-12 py-3 bg-white/5 focus:bg-white/10"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 dark:text-white/50 text-[10px] font-bold tracking-widest uppercase block mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-luxury pl-12 py-3 bg-white/5 focus:bg-white/10"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 dark:text-white/50 text-[10px] font-bold tracking-widest uppercase block mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-luxury pl-12 py-3 bg-white/5 focus:bg-white/10"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 dark:text-white/50 text-[10px] font-bold tracking-widest uppercase block mb-2">
                  Agency / Corporate Name
                </label>
                <div className="relative">
                  <Building2 size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" />
                  <input
                    type="text"
                    required
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    className="input-luxury pl-12 py-3 bg-white/5 focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-400 dark:text-white/50 text-[10px] font-bold tracking-widest uppercase block mb-2">
                  Office Address
                </label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/30" />
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input-luxury pl-12 py-3 bg-white/5 focus:bg-white/10"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-slate-200/80 dark:border-white/5 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary text-sm font-bold tracking-widest uppercase px-8 py-3.5 flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? 'Saving Changes...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
