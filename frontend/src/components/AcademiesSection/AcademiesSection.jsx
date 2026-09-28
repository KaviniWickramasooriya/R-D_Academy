import { Link } from "react-router-dom";
import { Palette, Mic2, Globe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AcademiesSection() {
  const academies = [
    {
      title: "Drawing Academy",
      desc: "Master classical proportion, graphite realism, and oil painting techniques in our physical ateliers.",
      icon: Palette,
      link: "/drawing-academy"
    },
    {
      title: "Vocal Academy",
      desc: "Develop pitch stability, breath control, and stage presence with certified industry professionals.",
      icon: Mic2,
      link: "/vocal-academy"
    },
    {
      title: "Online Classes",
      desc: "Join live, interactive zoom sessions from anywhere in the world. Features secure high-definition archives.",
      icon: Globe,
      link: "/online-classes"
    }
  ];

  return (
    // ADDED id="academies" and scroll-mt-24 so the navbar doesn't overlap the title
    <section id="academies" className="py-32 bg-[#0a0a0a] border-t border-stone-900 scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-4"
          >
            Our Faculties
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-stone-100"
          >
            Disciplines of <span className="italic text-stone-500 font-light">Mastery</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {academies.map((academy, idx) => (
            <Link 
              key={idx} 
              to={academy.link} 
              className="group relative block p-10 md:p-12 border border-stone-800 bg-[#121212] hover:border-[#d4af37]/50 transition-colors duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="w-16 h-16 border border-stone-700 bg-stone-900/50 rounded-full flex items-center justify-center mb-10 group-hover:bg-[#d4af37]/10 group-hover:border-[#d4af37]/30 transition-colors duration-500">
                <academy.icon size={28} strokeWidth={1} className="text-stone-400 group-hover:text-[#d4af37] transition-colors duration-500" />
              </div>
              
              <h3 className="text-2xl font-serif text-stone-200 mb-4 group-hover:text-[#d4af37] transition-colors duration-500">
                {academy.title}
              </h3>
              
              <p className="text-stone-500 text-sm font-light leading-relaxed mb-12">
                {academy.desc}
              </p>
              
              <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400 group-hover:text-stone-100 transition-colors">
                Explore Program <ArrowRight size={14} className="text-[#d4af37] transform group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}