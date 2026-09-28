import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Context Providers
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ToastProvider } from './context/ToastContext';

// Shared Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import TicketPromoModal from './components/TicketPromoModal/TicketPromoModal';

// Public Pages
import Home from './pages/Home'; 
import AboutPage from './pages/About/AboutPage';
import DrawingAcademy from './pages/DrawingAcademy/DrawingAcademy';
import VocalAcademy from './pages/VocalAcademy/VocalAcademy';
import Gallery from './pages/Gallery/Gallery';
import Activities from './pages/Activities/Activities';
import Contact from './pages/Contact/Contact';
import Academies from './pages/Academies/Academies';

// Application & Online Classes Features
import Register from './pages/Register/Register';
import MyClassPage from './pages/MyClass/MyClassPage';
import OnlineClassesPage from './pages/OnlineClassesPage';

// Admin Components & Pages
import AdminLayout from './admin/components/AdminLayout/AdminLayout';
import ProtectedAdminRoute from './admin/components/ProtectedAdminRoute/ProtectedAdminRoute';
import AdminLogin from './admin/pages/AdminLogin/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard/AdminDashboard';
import AdminRegistrations from './admin/pages/AdminRegistrations/AdminRegistrations';
import AdminRegistrationDetails from './admin/pages/AdminRegistrationDetails/AdminRegistrationDetails';
import AdminStudents from './admin/pages/AdminStudents/AdminStudents';
import AdminSettings from './admin/pages/AdminSettings/AdminSettings';

const PublicLayout = () => {
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

  // Automatically trigger modal open on first mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPromoModalOpen(true);
    }, 800); // 800ms delay for smooth page entry
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-stone-100 font-sans selection:bg-[#d4af37] selection:text-stone-900">
      <Navbar onOpenPromo={() => setIsPromoModalOpen(true)} />
      
      <main className="flex-1 w-full relative pt-24">
        <Outlet context={{ openPromoModal: () => setIsPromoModalOpen(true) }} />
      </main>
      
      <Footer />

      <TicketPromoModal 
        isOpen={isPromoModalOpen} 
        onClose={() => setIsPromoModalOpen(false)} 
      />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ToastProvider>
        <AdminAuthProvider>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Website Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/academies" element={<Academies />} />
                <Route path="/drawing-academy" element={<DrawingAcademy />} />
                <Route path="/vocal-academy" element={<VocalAcademy />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Registration & Student Portals */}
                <Route path="/apply" element={<Register />} />
                <Route path="/register" element={<Register />} />
                <Route path="/my-class" element={<MyClassPage />} />
                <Route path="/online-classes" element={<OnlineClassesPage />} />
              </Route>

              {/* Admin Portal Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedAdminRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="applications" element={<AdminRegistrations />} />
                  <Route path="applications/:id" element={<AdminRegistrationDetails />} />
                  <Route path="students" element={<AdminStudents />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
              </Route>
            </Routes>
          </AnimatePresence>
        </AdminAuthProvider>
      </ToastProvider>
    </Router>
  );
}