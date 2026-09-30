import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroDesktopImg from "../../assets/hero-new-desktop.jpg"; 
import heroMobileImg from "../../assets/hero-new-mobile.jpg"; 

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] lg:h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden -mt-24 text-center">
      {/* Background Images & Overlays */}
      <div className="absolute inset-0 w-full h-full">
        {/* Uniform dark overlay allows both left and right sides of the image to show clearly */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        {/* Subtle vignette to focus text readability in the center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)] z-10 opacity-70"></div>
        
        {/* Desktop Background Image (Hidden on small screens) */}
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={heroDesktopImg} 
          alt="Studio Background Desktop" 
          className="hidden md:block w-full h-full object-cover object-center opacity-80"
        />

        {/* Mobile Background Image (Visible only on small screens) - Adjusted position to push image lower */}
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={heroMobileImg} 
          alt="Studio Background Mobile" 
          className="block md:hidden w-full h-full object-cover object-[center_30%] pt-12 opacity-80"
        />

        {/* Subtle gold ambient glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none z-10" />
      </div>

      <div className="relative z-20 max-w-[1400px] mx-auto px-6 w-full mt-24 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-stone-300 font-medium">
            Colombo Conservatory & Atelier
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif text-stone-100 leading-[1.05] tracking-tight mb-8"
        >
          Where voices rise <span className="text-[#d4af37] italic font-light">&</span><br />
          hands learn to see.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-stone-300 text-xs md:text-sm font-light leading-relaxed tracking-wide mb-12 max-w-xl mx-auto"
        >
          Two academies, one standard of craft. Vocal training with Rising Voices and fine art with the Drawing Academy & Studio.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <Link
            to="/apply"
            className="px-10 py-4 bg-[#d4af37] hover:bg-[#ebd083] text-stone-950 font-medium tracking-[0.15em] uppercase text-[10px] transition-colors flex items-center justify-center"
          >
            Apply Online — Free
          </Link>
          <Link
            to="/drawing-academy"
            className="px-10 py-4 border border-stone-600 text-stone-200 font-medium tracking-[0.15em] uppercase text-[10px] hover:border-[#d4af37] hover:text-[#d4af37] bg-stone-950/30 backdrop-blur-sm transition-all flex items-center justify-center"
          >
            Explore courses
          </Link>
        </motion.div>
      </div>
    </section>
  );
}