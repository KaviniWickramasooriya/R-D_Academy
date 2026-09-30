import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroDesktopImg from "../../assets/hero-new-desktop.jpg"; 
import heroMobileImg from "../../assets/hero-new-mobile.jpg"; 

export default function Hero() {
  return (
    <section className="relative w-full h-screen m-0 p-0 flex flex-col justify-center bg-[#0a0a0a] overflow-hidden text-center">
      {/* Background Images & Overlays */}
      <div className="absolute inset-0 w-full h-full m-0 p-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)] z-10 opacity-70"></div>
        
        {/* Desktop Background Image */}
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={heroDesktopImg} 
          alt="Studio Background Desktop" 
          className="hidden md:block w-full h-full object-cover object-center opacity-80"
        />

        {/* Mobile Background Image (Cropped strictly from the bottom using object-[center_top]) */}
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={heroMobileImg} 
          alt="Studio Background Mobile" 
          className="block md:hidden w-full h-full object-cover object-[center_top] opacity-80"
        />

        {/* Subtle gold ambient glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#d4af37]/10 rounded-full blur-[90px] pointer-events-none z-10" />
      </div>

      {/* Content wrapper with zero outer spacing */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 w-full pt-6 md:pt-10 pb-0 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-2"
        >
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-stone-300 font-medium">
            Colombo Conservatory & Atelier
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-serif text-stone-100 leading-[1.05] tracking-tight mb-3 sm:mb-4"
        >
          Where voices rise <span className="text-[#d4af37] italic font-light">&</span><br />
          hands learn to see.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-stone-300 text-xs md:text-sm font-light leading-relaxed tracking-wide mb-5 sm:mb-6 max-w-xl mx-auto"
        >
          Two academies, one standard of craft. Vocal training with Rising Voices and fine art with the Drawing Academy & Studio.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <Link
            to="/apply"
            className="px-8 py-3.5 bg-[#d4af37] hover:bg-[#ebd083] text-stone-950 font-medium tracking-[0.15em] uppercase text-[10px] transition-colors flex items-center justify-center shadow-lg"
          >
            Apply Online — Free
          </Link>
          <Link
            to="/drawing-academy"
            className="px-8 py-3.5 border border-stone-600 text-stone-200 font-medium tracking-[0.15em] uppercase text-[10px] hover:border-[#d4af37] hover:text-[#d4af37] bg-stone-950/30 backdrop-blur-sm transition-all flex items-center justify-center"
          >
            Explore courses
          </Link>
        </motion.div>
      </div>
    </section>
  );
}