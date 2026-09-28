import { motion } from "framer-motion";
import { Sparkles, Calendar, ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Activities() {
  const events = [
    { 
      title: "Annual Studio Art Exhibition", 
      date: "December 2026", 
      location: "Colombo National Art Gallery",
      desc: "A grand student showcase featuring classical paintings, graphite realism, and multi-media works." 
    },
    { 
      title: "Outdoor Landscape Painting Camp", 
      date: "November 2026", 
      location: "Nuwara Eliya Highlands",
      desc: "Immersive plein-air oil and watercolor session capturing scenic mountain vistas." 
    },
    { 
      title: "Acoustic Vocal Showcase", 
      date: "October 2026", 
      location: "R&D Studio Auditorium, Colombo",
      desc: "Live studio recording workshop and vocal performance showcase for enrolled students." 
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 font-sans selection:bg-[#d4af37] selection:text-stone-900">
      
      {/* Hero Header (Reduced top padding) */}
      <section className="pt-16 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-[10px] uppercase tracking-[0.25em] mb-4 font-medium">
              <Sparkles size={12} /> Studio Events & Retreats
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-stone-100 leading-tight mb-4">
              Academy Activities <br />
              <span className="italic text-[#d4af37] font-light">& Exhibitions.</span>
            </h1>
            <p className="text-stone-400 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
              Immersive studio retreats, gallery displays, and live stage productions designed to showcase student mastery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Feed */}
      <section className="pb-28 px-6">
        <div className="max-w-[1000px] mx-auto space-y-6">
          {events.map((e, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-xl border border-stone-800 bg-[#121212] hover:border-[#d4af37]/50 transition-all shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-xs font-mono text-[#d4af37]">
                  <span className="flex items-center gap-1.5"><Calendar size={13} /> {e.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5 text-stone-400"><MapPin size={13} /> {e.location}</span>
                </div>
                <h3 className="text-2xl font-serif text-stone-100 group-hover:text-[#d4af37] transition-colors">
                  {e.title}
                </h3>
                <p className="text-xs text-stone-400 font-light max-w-lg leading-relaxed">
                  {e.desc}
                </p>
              </div>

              <Link to="/contact" className="px-5 py-2.5 border border-stone-700 text-stone-300 hover:border-[#d4af37] hover:text-[#d4af37] text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-2 shrink-0">
                Inquire <ArrowRight size={12} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}