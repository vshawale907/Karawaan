import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Shield, Key, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SettingsPage() {
  const { currentUser, showToast } = useApp();

  // Notification toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);

  // Security password
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingSec, setSavingSec] = useState(false);

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match!', 'error');
      return;
    }

    setSavingSec(true);
    setTimeout(() => {
      setSavingSec(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Account password updated!', 'success');
    }, 1000);
  };

  const triggerMockFeature = (name) => {
    showToast(`${name} requires Premium Plan activation. Contact sales@karawaan.com`, 'info');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-display text-3xl font-light text-slate-800 dark:text-white">
          Portal Settings
        </h1>
        <p className="text-sm text-slate-400 dark:text-white/40 mt-1">
          Adjust account preferences and toggle system notifications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Tabs */}
        <div className="md:col-span-1 space-y-4">
          <div className="glass-card p-4 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase text-left border border-gold/20 shadow-sm">
              <Settings size={16} /> Global Preferences
            </button>
            <a href="#security" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-slate-800 dark:text-white/60 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-semibold tracking-wider uppercase text-left">
              <Key size={16} /> Password & Security
            </a>

          </div>

          <div className="glass-card p-6">
            <div className="flex gap-2 text-gold">
              <HelpCircle size={16} className="flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-slate-800 dark:text-white">Need Portal Help?</h4>
                <p className="text-[11px] text-slate-400 dark:text-white/40 mt-1 leading-normal">
                  Our system support helpdesk operates 24/7. Reach our administrative team at support@karawaan.com.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Configurations Fields */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Notifications config */}
          <div className="glass-card-dark p-6 sm:p-8 space-y-6">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white uppercase tracking-wider border-b border-slate-200/80 dark:border-white/5 pb-2 mb-4 flex items-center gap-2">
              <Bell size={16} className="text-gold" /> System Notifications
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white">Email Digest Alerts</p>
                  <p className="text-[11px] text-slate-400 dark:text-white/40 mt-0.5">Receive daily summaries of your inquiry updates.</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-9 h-5 rounded-full bg-slate-200 dark:bg-white/10 accent-gold appearance-none checked:bg-gold cursor-pointer transition-colors relative before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-4 border border-transparent"
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-4">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white">Real-Time Toast Alerts</p>
                  <p className="text-[11px] text-slate-400 dark:text-white/40 mt-0.5">Receive floating banner feedback for portal edits.</p>
                </div>
                <input
                  type="checkbox"
                  checked={pushAlerts}
                  onChange={(e) => setPushAlerts(e.target.checked)}
                  className="w-9 h-5 rounded-full bg-slate-200 dark:bg-white/10 accent-gold appearance-none checked:bg-gold cursor-pointer transition-colors relative before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-4 border border-transparent"
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-4">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white">Chime & Sound Indicators</p>
                  <p className="text-[11px] text-slate-400 dark:text-white/40 mt-0.5">Play audio sounds when inquiries get updated.</p>
                </div>
                <input
                  type="checkbox"
                  checked={soundAlerts}
                  onChange={(e) => setSoundAlerts(e.target.checked)}
                  className="w-9 h-5 rounded-full bg-slate-200 dark:bg-white/10 accent-gold appearance-none checked:bg-gold cursor-pointer transition-colors relative before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 before:transition-transform checked:before:translate-x-4 border border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Security password */}
          <div id="security" className="glass-card-dark p-6 sm:p-8">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white uppercase tracking-wider border-b border-slate-200/80 dark:border-white/5 pb-2 mb-4 flex items-center gap-2">
              <Shield size={16} className="text-gold" /> Security Settings
            </h3>

            <form onSubmit={handlePasswordSave} className="space-y-4">
              <div>
                <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="input-luxury py-2.5"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="input-luxury py-2.5"
                  />
                </div>
                <div>
                  <label className="text-slate-400 dark:text-white/40 text-[10px] tracking-wider uppercase block mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="input-luxury py-2.5"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/80 dark:border-white/5 text-right">
                <button
                  type="submit"
                  disabled={savingSec || !newPassword}
                  className="btn-primary text-xs px-6 py-2.5 disabled:opacity-50 ml-auto"
                >
                  {savingSec ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>


        </div>
      </div>
    </div>
  );
}
