import { Link } from "react-router-dom";
import { Palette, Mic2, Globe, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Academies() {
  const academies = [
    {
      title: "Drawing Academy & Studio",
      subtitle: "Fine Arts & Classical Ateliers",
      desc: "Master classical proportion, graphite realism, charcoal techniques, and advanced oil painting in our specialized physical studios.",
      icon: Palette,
      link: "/drawing-academy",
      bgImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Rising Voices Academy",
      subtitle: "Vocal Mastery & Performance",
      desc: "Develop pitch stability, breath control, advanced vocal projection, and stage presence with certified industry mentors.",
      icon: Mic2,
      link: "/vocal-academy",
      bgImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Online Classes Portal",
      subtitle: "Global Interactive Sessions",
      desc: "Join live, interactive Zoom sessions from anywhere in the world. Access secure high-definition archives, timetables, and batch recordings.",
      icon: Globe,
      link: "/online-classes",
      bgImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16 pb-32 selection:bg-[#d4af37] selection:text-stone-900 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#d4af37]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-[10px] uppercase tracking-[0.25em] mb-4 font-medium"
          >
            <Sparkles size={12} /> Our Faculties & Programs
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-stone-100 leading-tight"
          >
            Disciplines of <span className="italic text-[#d4af37] font-light">Mastery</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-stone-400 text-xs md:text-sm font-light mt-4 leading-relaxed"
          >
            Explore our specialized studio ateliers and global digital programs designed to nurture technical precision and artistic expression.
          </motion.p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {academies.map((academy, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.15 }}
            >
              <Link 
                to={academy.link} 
                className="group relative flex flex-col justify-between p-8 md:p-10 border border-stone-800 bg-[#121212] hover:border-[#d4af37]/60 transition-all duration-500 overflow-hidden rounded-xl h-full shadow-2xl"
              >
                {/* Background Image Overlay with Gradient */}
                <div className="absolute inset-0 z-0 overflow-hidden opacity-20 group-hover:opacity-35 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent z-10" />
                  <img 
                    src={academy.bgImage} 
                    alt={academy.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter grayscale contrast-125"
                  />
                </div>

                {/* Top Gold Accent Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20"></div>

                {/* Card Content Top */}
                <div className="relative z-20">
                  <div className="w-14 h-14 border border-stone-700 bg-stone-900/80 backdrop-blur rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#d4af37] group-hover:text-stone-950 group-hover:border-[#d4af37] transition-all duration-500 shadow-lg">
                    <academy.icon size={24} strokeWidth={1.5} className="text-[#d4af37] group-hover:text-stone-950 transition-colors duration-500" />
                  </div>
                  
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] block mb-2 font-mono">
                    {academy.subtitle}
                  </span>

                  <h3 className="text-2xl font-serif text-stone-100 mb-4 group-hover:text-[#d4af37] transition-colors duration-300">
                    {academy.title}
                  </h3>
                  
                  <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed mb-12">
                    {academy.desc}
                  </p>
                </div>
                
                {/* Card Footer Link */}
                <div className="relative z-20 flex items-center justify-between pt-6 border-t border-stone-800/80 group-hover:border-[#d4af37]/30 transition-colors">
                  <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-stone-300 group-hover:text-stone-100 transition-colors">
                    Explore Program
                  </span>
                  <div className="w-8 h-8 rounded-full border border-stone-800 bg-stone-900 flex items-center justify-center group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-all duration-300">
                    <ArrowRight size={14} className="text-stone-400 group-hover:text-stone-950 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}