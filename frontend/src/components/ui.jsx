import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const FadeIn = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SlideInLeft = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, x: -60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SlideInRight = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, x: 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, className = '' }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={{
      visible: {
        transition: { staggerChildren: 0.15 },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = '' }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const GoldDivider = ({ text }) => (
  <div className="luxury-divider">
    <span className="text-xs text-gold/60 tracking-widest uppercase font-sans">
      {text}
    </span>
  </div>
);

export const SectionHeader = ({ subtitle, title, description, center = true }) => (
  <div className={`mb-16 ${center ? 'text-center' : ''}`}>
    <FadeUp>
      <p className="section-subtitle mb-4">
        <span className="text-gold-gradient">{subtitle}</span>
      </p>
    </FadeUp>
    <FadeUp delay={0.1}>
      <h2 className="section-title text-white mb-6">
        {title}
      </h2>
    </FadeUp>
    {description && (
      <FadeUp delay={0.2}>
        <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      </FadeUp>
    )}
    <FadeUp delay={0.3}>
      <div className="luxury-divider mt-8 max-w-xs mx-auto" />
    </FadeUp>
  </div>
);

export const StatusBadge = ({ status }) => {
  const normalized = (status || '').toLowerCase();
  
  const styles = {
    new: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-500/20 dark:border-blue-500/30',
    pending: 'bg-yellow-500/10 dark:bg-yellow-500/20 text-amber-700 dark:text-yellow-300 border-yellow-500/20 dark:border-yellow-500/30',
    'in-progress': 'bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-300 border-sky-500/20 dark:border-sky-500/30',
    'follow-up': 'bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-300 border-orange-500/20 dark:border-orange-500/30',
    approved: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 dark:border-emerald-500/30',
    closed: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 dark:border-emerald-500/30',
    rejected: 'bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-300 border-rose-500/20 dark:border-rose-500/30',
  };

  const labels = {
    new: 'New',
    pending: 'Pending',
    'in-progress': 'In Progress',
    'follow-up': 'Follow-Up',
    approved: 'Approved',
    closed: 'Closed',
    rejected: 'Rejected',
  };

  const baseStyle = 'px-3 py-1 rounded-full text-xs font-semibold tracking-wider border whitespace-nowrap ';

  return (
    <span className={baseStyle + (styles[normalized] || styles.new)}>
      {labels[normalized] || status}
    </span>
  );
};
