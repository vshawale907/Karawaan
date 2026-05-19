import { motion } from 'framer-motion';
import { User, Bell, Shield, Globe, Palette, Save } from 'lucide-react';

const SettingSection = ({ icon: Icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
    className="glass-card-dark p-7"
  >
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
      <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
        <Icon size={16} className="text-gold" />
      </div>
      <h3 className="font-semibold text-white text-sm">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const ToggleRow = ({ label, desc, defaultOn = false }) => (
  <div className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
    <div>
      <p className="text-white text-sm">{label}</p>
      {desc && <p className="text-white/35 text-xs mt-0.5">{desc}</p>}
    </div>
    <button className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${defaultOn ? 'bg-gold' : 'bg-white/10'}`}>
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${defaultOn ? 'left-6' : 'left-1'}`} />
    </button>
  </div>
);

export default function AdminSettings() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-3xl text-white mb-1">Settings</h1>
        <p className="text-white/35 text-sm">Manage your Karawaan admin preferences</p>
      </div>

      <SettingSection icon={User} title="Profile">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Full Name', placeholder: 'Admin User', type: 'text' },
            { label: 'Email', placeholder: 'admin@karawaan.com', type: 'email' },
            { label: 'Phone', placeholder: '+91 98765 43210', type: 'tel' },
            { label: 'Role', placeholder: 'Super Admin', type: 'text' },
          ].map(f => (
            <div key={f.label}>
              <label className="text-white/35 text-[10px] tracking-wider uppercase block mb-1.5">{f.label}</label>
              <input type={f.type} defaultValue={f.placeholder} className="input-luxury text-sm" />
            </div>
          ))}
        </div>
        <button className="btn-primary mt-5 text-xs px-6 py-2.5 flex items-center gap-2">
          <Save size={14} /> Save Profile
        </button>
      </SettingSection>

      <SettingSection icon={Bell} title="Notifications">
        <ToggleRow label="New Inquiry Alerts" desc="Get notified when a new inquiry is submitted" defaultOn={true} />
        <ToggleRow label="Follow-Up Reminders" desc="Daily digest of pending follow-ups" defaultOn={true} />
        <ToggleRow label="Partner Updates" desc="Notifications from partner agencies" defaultOn={false} />
        <ToggleRow label="Weekly Reports" desc="Receive weekly performance summary" defaultOn={true} />
      </SettingSection>

      <SettingSection icon={Shield} title="Security">
        <div className="space-y-4">
          {['Current Password', 'New Password', 'Confirm Password'].map(label => (
            <div key={label}>
              <label className="text-white/35 text-[10px] tracking-wider uppercase block mb-1.5">{label}</label>
              <input type="password" placeholder="••••••••" className="input-luxury text-sm" />
            </div>
          ))}
          <button className="btn-outline text-xs px-6 py-2.5">Update Password</button>
        </div>
      </SettingSection>

      <SettingSection icon={Globe} title="System Preferences">
        <ToggleRow label="Dark Mode" desc="Use dark theme across admin panel" defaultOn={true} />
        <ToggleRow label="Compact View" desc="Show more data per page" defaultOn={false} />
        <ToggleRow label="Auto Follow-Up Reminders" desc="Automatically schedule follow-ups for new inquiries" defaultOn={true} />
      </SettingSection>

      {/* Demo Note */}
      <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-gold/8 border border-gold/20">
        <Palette size={15} className="text-gold flex-shrink-0" />
        <p className="text-gold/70 text-xs">
          <strong className="text-gold">Demo Mode:</strong> Settings are simulated for prototype presentation. No actual data will be saved.
        </p>
      </div>
    </div>
  );
}
