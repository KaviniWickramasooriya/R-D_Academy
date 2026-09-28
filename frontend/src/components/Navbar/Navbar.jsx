import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Shield, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo ori.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const centerLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Courses", to: "/academies" },
    { name: "Online Classes", to: "/online-classes" },
    { name: "Gallery", to: "/gallery" },
    { name: "Activities", to: "/activities" },
    { name: "Contact", to: "/contact" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-stone-800/50 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo Area (Increased size) */}
        <Link to="/" className="flex items-center z-50 group">
          <img 
            src={logo} 
            alt="R&D Academy Colombo" 
            className="h-12 md:h-16 w-auto object-contain opacity-95 group-hover:opacity-100 transition-opacity duration-300"
          />
        </Link>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {centerLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 ${
                  isActive ? "text-[#d4af37]" : "text-stone-400 hover:text-[#d4af37]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Icon-Only Admin Login Button */}
          <Link 
            to="/admin/login" 
            className="p-2.5 border border-stone-800 hover:border-[#d4af37] bg-stone-900/60 hover:bg-[#d4af37]/10 text-stone-400 hover:text-[#d4af37] transition-all rounded-lg group"
            title="Restricted Admin Portal"
          >
            <Lock size={15} className="group-hover:scale-110 transition-transform" />
          </Link>

          <Link to="/my-class" className="text-[10px] uppercase tracking-[0.15em] text-[#d4af37] border border-stone-700 hover:border-[#d4af37] px-5 py-2 transition-all">
            My Class
          </Link>
          <Link to="/apply" className="text-[10px] uppercase tracking-[0.15em] text-stone-900 bg-[#d4af37] hover:bg-[#ebd083] font-medium px-5 py-2 transition-all">
            Apply Online
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-stone-300 z-50 hover:text-[#d4af37] transition-colors p-2">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Fully Responsive Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#0a0a0a]/98 backdrop-blur-xl flex flex-col items-center justify-center space-y-6 z-40 px-6 overflow-y-auto py-20"
          >
            {centerLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                onClick={() => setOpen(false)}
                className="text-base font-serif text-stone-300 hover:text-[#d4af37] transition-colors tracking-widest uppercase"
              >
                {link.name}
              </Link>
            ))}

            <div className="h-px w-16 bg-stone-800 my-2"></div>

            <Link 
              to="/my-class" 
              onClick={() => setOpen(false)} 
              className="text-xs uppercase tracking-widest text-[#d4af37] py-2"
            >
              My Class Portal
            </Link>
            
            <Link 
              to="/apply" 
              onClick={() => setOpen(false)} 
              className="text-xs uppercase tracking-widest bg-[#d4af37] text-stone-950 px-6 py-3 font-medium"
            >
              Apply Online
            </Link>

            {/* Mobile Admin Login Entry */}
            <Link 
              to="/admin/login" 
              onClick={() => setOpen(false)} 
              className="mt-4 text-[11px] uppercase tracking-widest text-stone-500 hover:text-stone-300 flex items-center gap-2 border border-stone-800 px-4 py-2"
            >
              <Shield size={14} className="text-[#d4af37]" /> Admin Portal Access
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}