import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Calendar, Users, DollarSign, FileText, UploadCloud, CheckCircle2, User, Phone, Mail, AlertCircle, X, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AgentInquiryForm() {
  const { currentUser, addInquiry } = useApp();
  const navigate = useNavigate();

  // Form states
  const [clientName, setClientName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [travelers, setTravelers] = useState('');
  const [budget, setBudget] = useState('₹2,00,000 - ₹5,00,000');
  const [requirements, setRequirements] = useState('');
  
  // Document Upload States (Mock)
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Validation state
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [newInquiryId, setNewInquiryId] = useState('');

  // Handle Drag Over
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle Drop & Select
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startMockUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      startMockUpload(e.target.files[0]);
    }
  };

  const startMockUpload = (file) => {
    setUploading(true);
    setUploadProgress(0);
    setUploadedFile(null);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadedFile({
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
          });
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
  };

  // Form submission
  const validateForm = () => {
    const tempErrors = {};
    if (!clientName.trim()) tempErrors.clientName = 'Traveler name is required';
    if (!contactNumber.trim()) tempErrors.contactNumber = 'Contact number is required';
    if (!email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Enter a valid email address';
    }
    if (!destination.trim()) tempErrors.destination = 'Destination is required';
    if (!dateFrom) tempErrors.dateFrom = 'Travel date is required';
    if (!travelers.trim()) tempErrors.travelers = 'Number of travelers is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newId = addInquiry({
      agentName: currentUser.name,
      clientName,
      contactNumber,
      email,
      destination,
      dateFrom,
      travelers,
      budget,
      requirements,
      fileName: uploadedFile ? uploadedFile.name : null,
    });

    setNewInquiryId(newId);
    setIsSuccess(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-display text-3xl font-light text-slate-800 dark:text-white">
          Submit Traveler Inquiry
        </h1>
        <p className="text-sm text-slate-400 dark:text-white/40 mt-1">
          Provide your client's travel details and document copies to request a custom safari or luxury itinerary.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass-card-dark p-6 sm:p-8 space-y-6">
            
            {/* Step 1: Client Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-white/5 pb-2 mb-4">
                <User size={16} className="text-gold" />
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white uppercase tracking-wider">
                  Traveler Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-1.5">
                    Traveler Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Mrs. Ananya Sharma"
                      className={`input-luxury ${errors.clientName ? 'border-rose-500' : ''}`}
                    />
                    {errors.clientName && (
                      <span className="text-[10px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle size={10} /> {errors.clientName}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-1.5">
                    Contact Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="e.g. +91 98810 75953"
                      className={`input-luxury ${errors.contactNumber ? 'border-rose-500' : ''}`}
                    />
                    {errors.contactNumber && (
                      <span className="text-[10px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle size={10} /> {errors.contactNumber}
                      </span>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. client@example.com"
                      className={`input-luxury ${errors.email ? 'border-rose-500' : ''}`}
                    />
                    {errors.email && (
                      <span className="text-[10px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle size={10} /> {errors.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Destination & Dates */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-white/5 pb-2 mb-4">
                <MapPin size={16} className="text-gold" />
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white uppercase tracking-wider">
                  Destination & Travel Itinerary
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-1.5">
                    Destination *
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Dubai, Swiss Alps, Masai Mara"
                    className={`input-luxury ${errors.destination ? 'border-rose-500' : ''}`}
                  />
                  {errors.destination && (
                    <span className="text-[10px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle size={10} /> {errors.destination}
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-1.5">
                    Preferred Travel Date *
                  </label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className={`input-luxury ${errors.dateFrom ? 'border-rose-500' : ''}`}
                  />
                  {errors.dateFrom && (
                    <span className="text-[10px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle size={10} /> {errors.dateFrom}
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-1.5">
                    Number of Travelers *
                  </label>
                  <input
                    type="text"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    placeholder="e.g. 2 Adults, 2 Kids (Ages 4, 8)"
                    className={`input-luxury ${errors.travelers ? 'border-rose-500' : ''}`}
                  />
                  {errors.travelers && (
                    <span className="text-[10px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle size={10} /> {errors.travelers}
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-1.5">
                    Estimated Budget *
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="input-luxury"
                  >
                    <option value="Under ₹2,00,000">Under ₹2,00,000</option>
                    <option value="₹2,00,000 - ₹5,00,000">₹2,00,000 - ₹5,00,000</option>
                    <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000</option>
                    <option value="Above ₹10,00,000">Above ₹10,00,000 (Ultra Luxury)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Requirements */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-white/5 pb-2 mb-4">
                <FileText size={16} className="text-gold" />
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white uppercase tracking-wider">
                  Additional Notes
                </h3>
              </div>

              <div>
                <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-1.5">
                  Detailed Notes & Special Requirements
                </label>
                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Share details on preferred flight timings, room specifications, diet constraints, wheelchair access etc."
                  rows={4}
                  className="input-luxury resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-3 py-4 mt-6 text-sm font-bold tracking-wider uppercase shadow-md hover:scale-[1.01]"
            >
              <Send size={15} /> Submit Package Inquiry
            </button>
          </form>
        </div>

        {/* Sidebar: Documents & Fast Tips */}
        <div className="space-y-6">
          {/* Document Upload UI */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2 border-b border-slate-200/80 dark:border-white/5 pb-2">
              <UploadCloud size={16} className="text-gold" /> Traveler Document
            </h3>
            
            <p className="text-[11px] text-slate-400 dark:text-white/40 leading-relaxed mb-4">
              Upload passport copy, flight ticket reservation, or visas. Recommended for faster validation and instant ticketing from operators.
            </p>

            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                dragActive
                  ? 'border-gold bg-gold/5'
                  : uploadedFile
                  ? 'border-emerald-500 bg-emerald-500/5'
                  : 'border-slate-300 dark:border-white/10 hover:border-gold dark:hover:border-gold/30 hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            >
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.pdf"
              />

              <AnimatePresence mode="wait">
                {uploading ? (
                  <motion.div
                    key="uploading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    <div className="flex justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                        className="w-10 h-10 border-4 border-gold/20 border-t-gold rounded-full"
                      />
                    </div>
                    <p className="text-xs font-semibold text-slate-700 dark:text-white/80">Scanning copy details...</p>
                    <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gold-gradient"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400">{uploadProgress}% scanned</span>
                  </motion.div>
                ) : uploadedFile ? (
                  <motion.div
                    key="uploaded"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-500">
                      <ShieldCheck size={26} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-white truncate max-w-[200px] mx-auto">
                        {uploadedFile.name}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{uploadedFile.size}</p>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] rounded-lg hover:bg-rose-500/20 font-semibold cursor-pointer"
                    >
                      Delete File
                    </button>
                  </motion.div>
                ) : (
                  <motion.label
                    key="idle"
                    htmlFor="file-upload"
                    className="cursor-pointer space-y-2 block"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mx-auto text-slate-400 dark:text-white/50">
                      <UploadCloud size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-700 dark:text-white/80">Click to upload passport</p>
                      <p className="text-[10px] text-slate-400 mt-1">or drag & drop file here</p>
                    </div>
                    <span className="text-[9px] text-slate-400/80 block pt-1">Supported: PDF, JPG, PNG up to 5MB</span>
                  </motion.label>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Quick instructions */}
          <div className="glass-card p-6">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white uppercase tracking-wider mb-3">
              Form Support Tips
            </h3>
            <ul className="text-xs text-slate-500 dark:text-white/40 space-y-3 leading-relaxed list-disc list-inside">
              <li>Enter exact traveler name matches as stated in their passport to prevent booking delays.</li>
              <li>Always include children's ages in notes to source correct child occupancy hotel rates.</li>
              <li>Provide budget specifications to source premium 4-Star vs 5-Star experiences.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl z-10 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center mx-auto mb-5 text-emerald-500">
                <CheckCircle2 size={32} />
              </div>

              <h2 className="font-display text-2xl font-semibold text-slate-800 dark:text-white">
                Inquiry Created!
              </h2>
              
              <div className="my-5 p-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl">
                <span className="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-widest block mb-1">
                  Inquiry Reference ID
                </span>
                <span className="font-mono text-xl font-bold text-gold tracking-wider block">
                  {newInquiryId}
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed mb-6">
                Your traveler inquiry for <span className="font-semibold text-slate-700 dark:text-white/70">{destination}</span> has been dispatched to Karawaan administrators. Our international travel partners will review this immediately.
              </p>

              <button
                onClick={() => navigate('/agent')}
                className="btn-primary w-full py-3.5 text-xs font-semibold uppercase tracking-wider"
              >
                Back to Dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
