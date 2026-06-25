import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, UploadCloud, X, Building2, User, Phone, Mail, Lock, ShieldAlert, Map, HeartHandshake, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import API_BASE_URL from '../config/api';

export default function RegisterPage() {
  const { register } = useApp();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    agencyName: '',
    agentName: '',
    operationHeadName: '',
    operationHeadContact: '',
    ownerName: '',
    ownerContact: '',
    clientName: '',
    clientContact: '',
    clientEmail: '',
    association: '',
    email: '',
    password: '',
    documents: [],
    promoting: '',
    preferences: '',
    topDestinations: '',
    destinationCount: '',
    support: [],
    partnershipType: '',
    timeline: '',
    communication: []
  });

  const supportOptions = [
    'Destination Training & Webinars',
    'Marketing Collaterals (Images, Videos, Itineraries)',
    'White-label Tech / API Integration',
    'Familiarization (FAM) Trips',
    'Dedicated Account Manager'
  ];
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setForm(f => ({ ...f, documents: [...f.documents, ...files] }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type === 'application/pdf' || 
      file.type === 'image/jpeg' || 
      file.type === 'image/png' || 
      file.type === 'image/jpg'
    );
    if (files.length > 0) {
      setForm(f => ({ ...f, documents: [...f.documents, ...files] }));
    }
  };

  const removeFile = (indexToRemove) => {
    setForm(f => ({
      ...f,
      documents: f.documents.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.agencyName || !form.agentName || !form.operationHeadName || !form.operationHeadContact || !form.ownerName || !form.ownerContact || !form.clientName || !form.clientContact || !form.clientEmail || !form.topDestinations || !form.destinationCount || !form.email || !form.password || form.communication.length === 0 || form.documents.length === 0) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: form.agencyName,
          founderName: form.ownerName,
          founderContact: form.ownerContact,
          salesHeadName: form.operationHeadName,
          salesHeadContact: form.operationHeadContact,
          agentName: form.agentName,
          clientName: form.clientName,
          clientContact: form.clientContact,
          clientEmail: form.clientEmail,
          association: form.association,
          email: form.email,
          password: form.password,
          promoting: form.promoting,
          preferences: form.preferences,
          topDestinations: form.topDestinations,
          destinationCount: form.destinationCount,
          support: form.support,
          partnershipType: form.partnershipType,
          timeline: form.timeline,
          communication: form.communication,
          role: 'admin'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Registration failed');
        setLoading(false);
        return;
      }

      // Sync with AppContext to maintain local state
      const success = register({
        companyName: form.agencyName,
        founderName: form.ownerName,
        email: form.email,
        role: 'admin'
      });

      if (success) {
        navigate('/admin');
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12 overflow-auto bg-[#FAF8F5] dark:bg-obsidian transition-colors duration-300">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden fixed">
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
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Logo + Brand */}
        <div className="text-center mb-8">
          <div className="inline-block mb-3">
            <img
              src="/logo.jpg"
              alt="Karawaan Logo"
              className="w-16 h-16 rounded-2xl object-cover mx-auto shadow-lg border-2 border-gold/30"
            />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-light text-slate-800 dark:text-white">
            Travel Agent Registration
          </h1>
          <p className="text-sm text-slate-500 dark:text-white/40 mt-1">
            Join the Luxury Travel Network
          </p>
        </div>

        {/* Card */}
        <div className="glass-card p-6 sm:p-10 border-gold-300/30 dark:border-white/10 dark:bg-[#0D1117]/80 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm text-center font-medium flex items-center justify-center gap-2">
                <ShieldAlert size={16} />
                {error}
              </div>
            )}

            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200 dark:border-white/5">
                <Building2 size={18} className="text-gold" />
                <h2 className="text-slate-800 dark:text-white font-semibold text-lg">Company Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Row 1: Agency Name | Agent Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/50 font-semibold ml-1 block">
                    Travel Agency Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                    <input
                      type="text"
                      required
                      value={form.agencyName}
                      onChange={(e) => set('agencyName', e.target.value)}
                      placeholder="Agency Name"
                      className="input-luxury pl-11"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/50 font-semibold ml-1 block">
                    Travel Agent Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                    <input
                      type="text"
                      required
                      value={form.agentName}
                      onChange={(e) => set('agentName', e.target.value)}
                      placeholder="Agent Name"
                      className="input-luxury pl-11"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Row 2: Operation Head Name | Operation Head Contact */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/50 font-semibold ml-1 block">
                    Operation Head Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                    <input
                      type="text"
                      required
                      value={form.operationHeadName}
                      onChange={(e) => set('operationHeadName', e.target.value)}
                      placeholder="Head Name"
                      className="input-luxury pl-11"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/50 font-semibold ml-1 block">
                    Operation Head Contact Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                    <input
                      type="tel"
                      required
                      value={form.operationHeadContact}
                      onChange={(e) => set('operationHeadContact', e.target.value)}
                      placeholder="+91"
                      className="input-luxury pl-11"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Row 3: Owner Name | Owner Contact */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/50 font-semibold ml-1 block">
                    Owner Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                    <input
                      type="text"
                      required
                      value={form.ownerName}
                      onChange={(e) => set('ownerName', e.target.value)}
                      placeholder="Owner Name"
                      className="input-luxury pl-11"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/50 font-semibold ml-1 block">
                    Owner Contact Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                    <input
                      type="tel"
                      required
                      value={form.ownerContact}
                      onChange={(e) => set('ownerContact', e.target.value)}
                      placeholder="+91"
                      className="input-luxury pl-11"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Row 4 (3 cols): Client Name | Client Contact | Client Email */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/50 font-semibold ml-1 block">
                      Client Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                      <input
                        type="text"
                        required
                        value={form.clientName}
                        onChange={(e) => set('clientName', e.target.value)}
                        placeholder="Client Name"
                        className="input-luxury pl-11"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/50 font-semibold ml-1 block">
                      Client Contact Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                      <input
                        type="tel"
                        required
                        value={form.clientContact}
                        onChange={(e) => set('clientContact', e.target.value)}
                        placeholder="+91"
                        className="input-luxury pl-11"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/50 font-semibold ml-1 block">
                      Client Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                      <input
                        type="email"
                        required
                        value={form.clientEmail}
                        onChange={(e) => set('clientEmail', e.target.value)}
                        placeholder="email@example.com"
                        className="input-luxury pl-11"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* Association */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/50 font-semibold ml-1 block">
                    Travel Association Registration <span className="text-slate-400 dark:text-white/30 lowercase">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.association}
                    onChange={(e) => set('association', e.target.value)}
                    placeholder="e.g. IATA, TAAI (Leave blank if none)"
                    className="input-luxury"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
            
            {/* Document Upload */}
            <div>
              <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/50 font-semibold ml-1 block mb-2">
                Document Upload <span className="text-rose-500">*</span>
              </label>
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer
                  ${isDragging ? 'border-gold bg-gold/5 dark:bg-gold/10' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  multiple 
                  accept=".pdf,.jpg,.jpeg,.png" 
                  disabled={loading}
                />
                <UploadCloud className="mx-auto text-gold mb-3" size={32} />
                <p className="text-slate-700 dark:text-white/80 text-sm font-medium mb-1">Drag & drop files here or click to browse</p>
                <p className="text-slate-500 dark:text-white/40 text-xs">You can upload GST Certificate and/or a Valid Government ID Proof. (PDF, JPG, PNG)</p>
              </div>
              
              {form.documents.length > 0 && (
                <div className="mt-4 space-y-2">
                  {form.documents.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-100 dark:bg-white/5 px-4 py-2 rounded-lg text-sm text-slate-700 dark:text-white/80 border border-slate-200 dark:border-white/10">
                      <span className="truncate flex-1">{file.name}</span>
                      <button type="button" onClick={() => removeFile(idx)} className="text-slate-400 hover:text-rose-500 dark:text-white/40 dark:hover:text-rose-400 ml-4">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top Selling Destinations */}
            <div>
              <div className="flex items-center gap-3 mb-4 pb-2 border-b border-slate-200 dark:border-white/5">
                <Map size={18} className="text-gold" />
                <h2 className="text-slate-800 dark:text-white font-semibold text-lg">Destination Overview</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/50 font-semibold ml-1 block">
                    Which are the most selling destinations? <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.topDestinations}
                    onChange={(e) => set('topDestinations', e.target.value)}
                    placeholder="e.g. Kenya, Maldives, Dubai, Europe..."
                    className="input-luxury"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/50 font-semibold ml-1 block">
                    No. of Destinations <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={form.destinationCount}
                    onChange={(e) => set('destinationCount', e.target.value)}
                    placeholder="e.g. 5"
                    className="input-luxury"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Section 2 — Product Interest */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200 dark:border-white/5">
                <Map size={18} className="text-gold" />
                <h2 className="text-slate-800 dark:text-white font-semibold text-lg">Product Interest</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-slate-500 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-2 font-semibold">Which Kenya / Africa itineraries are you currently promoting? <span className="text-slate-400 dark:text-white/30 lowercase">(Optional)</span></label>
                  <textarea value={form.promoting} onChange={e => set('promoting', e.target.value)} rows={2} className="input-luxury resize-none" placeholder="E.g., Masai Mara Migration, Big 5 Safaris..." disabled={loading} />
                </div>
                <div>
                  <label className="text-slate-500 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-2 font-semibold">Any preferred parks, lodge brands or safari regions? <span className="text-slate-400 dark:text-white/30 lowercase">(Optional)</span></label>
                  <textarea value={form.preferences} onChange={e => set('preferences', e.target.value)} rows={2} className="input-luxury resize-none" placeholder="E.g., Serena Lodges, Amboseli..." disabled={loading} />
                </div>
              </div>
            </div>

            {/* Section 3 — Partnership Support */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200 dark:border-white/5">
                <HeartHandshake size={18} className="text-gold" />
                <h2 className="text-slate-800 dark:text-white font-semibold text-lg">Partnership Support</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-slate-500 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-3 font-semibold">What support would help you sell Kenya more effectively? <span className="text-slate-400 dark:text-white/30 lowercase">(Optional)</span></label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {supportOptions.map(opt => (
                      <label key={opt} className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${form.support.includes(opt) ? 'bg-gold/10 border-gold/40 text-gold dark:text-white' : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-white/5 dark:border-white/10 dark:text-white/50'}`}>
                        <input type="checkbox" checked={form.support.includes(opt)} onChange={(e) => {
                          const updated = e.target.checked ? [...form.support, opt] : form.support.filter(i => i !== opt);
                          set('support', updated);
                        }} className="accent-gold" disabled={loading} />
                        <span className="text-xs font-medium">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-slate-500 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-3 font-semibold">Preferred Partnership Type <span className="text-slate-400 dark:text-white/30 lowercase">(Optional)</span></label>
                    <div className="space-y-2">
                      {['B2B Direct (Net Rates)', 'Commissionable (Retail Rates)', 'White-label Operation'].map(opt => (
                        <label key={opt} className="flex items-center gap-3 cursor-pointer">
                          <input type="radio" name="partnershipType" value={opt} checked={form.partnershipType === opt} onChange={e => set('partnershipType', e.target.value)} className="accent-gold" disabled={loading} />
                          <span className="text-sm text-slate-600 dark:text-white/70">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-500 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-3 font-semibold">When are you looking to start? <span className="text-slate-400 dark:text-white/30 lowercase">(Optional)</span></label>
                    <div className="space-y-2">
                      {['Immediately', 'Within 1 Month', '1–3 Months', 'Just exploring'].map(opt => (
                        <label key={opt} className="flex items-center gap-3 cursor-pointer">
                          <input type="radio" name="timeline" value={opt} checked={form.timeline === opt} onChange={e => set('timeline', e.target.value)} className="accent-gold" disabled={loading} />
                          <span className="text-sm text-slate-600 dark:text-white/70">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-slate-500 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-3 font-semibold">
                    Preferred Mode of Communication <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Email', 'WhatsApp', 'Phone Call', 'Zoom / Google Meet'].map(opt => (
                      <label key={opt} className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                        form.communication.includes(opt)
                          ? 'bg-gold/10 border-gold/40 text-gold dark:text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-500 dark:bg-white/5 dark:border-white/10 dark:text-white/50'
                      }`}>
                        <input
                          type="checkbox"
                          value={opt}
                          checked={form.communication.includes(opt)}
                          onChange={(e) => {
                            const updated = e.target.checked
                              ? [...form.communication, opt]
                              : form.communication.filter(i => i !== opt);
                            set('communication', updated);
                          }}
                          className="accent-gold"
                          disabled={loading}
                        />
                        <span className="text-xs font-medium">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200 dark:border-white/5">
                <Lock size={18} className="text-gold" />
                <h2 className="text-slate-800 dark:text-white font-semibold text-lg">Account Login Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/50 font-semibold ml-1 block">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      placeholder="email@example.com"
                      className="input-luxury pl-11"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/50 font-semibold ml-1 block">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-4 top-3.5 text-slate-400 dark:text-white/30" />
                    <input
                      type="password"
                      required
                      value={form.password}
                      onChange={(e) => set('password', e.target.value)}
                      placeholder="••••••••"
                      className="input-luxury pl-11"
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-3 py-4 mt-4 text-sm font-semibold tracking-wider uppercase shadow-xl disabled:opacity-60"
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
                  Submit Registration
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-200 dark:border-white/5 pt-6">
            <p className="text-sm text-slate-500 dark:text-white/50">
              Already registered?{' '}
              <Link to="/login" className="text-gold hover:underline font-semibold">
                Sign in to Admin Portal
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
