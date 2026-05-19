import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import InquiryPage from './pages/InquiryPage';
import B2BSurveyPage from './pages/B2BSurveyPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AllInquiries from './pages/admin/AllInquiries';
import FollowUps from './pages/admin/FollowUps';
import PartnerAgencies from './pages/admin/PartnerAgencies';
import Destinations from './pages/admin/Destinations';
import AdminSettings from './pages/admin/AdminSettings';
import B2BSurveys from './pages/admin/B2BSurveys';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {children}
      </motion.main>
      <Footer />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
        <Route path="/inquiry" element={<PublicLayout><InquiryPage /></PublicLayout>} />
        <Route path="/b2b-survey" element={<PublicLayout><B2BSurveyPage /></PublicLayout>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="inquiries" element={<AllInquiries />} />
          <Route path="followups" element={<FollowUps />} />
          <Route path="surveys" element={<B2BSurveys />} />
          <Route path="partners" element={<PartnerAgencies />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
