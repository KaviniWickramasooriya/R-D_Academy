import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Compass, Heart, Sparkles } from "lucide-react";
import founderRaini from "../../assets/raini-gallery1.jpeg";
import founderDarshan from "../../assets/darshan-gallery1.jpeg";
import studioInterior from "../../assets/galhero.jpeg";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 selection:bg-[#d4af37] selection:text-stone-900">
      
      {/* Hero Section - Reduced pt-10 to remove extra top gap */}
      <section className="pt-10 pb-28 md:pt-16 md:pb-40 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-6">
              The Conservatory & Atelier
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-stone-100 leading-tight mb-8">
              Where voices rise <br />
              <span className="italic text-stone-500 font-light">&</span> hands learn to see.
            </h1>
            <p className="text-stone-400 font-light text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Located in the heart of Colombo, R & D Academy is a sanctuary dedicated to classical discipline, vocal mastery, and unbounded modern visual expression.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-[#121212] border-y border-stone-800">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-2">Our Philosophy</span>
              <h2 className="text-4xl font-serif text-stone-100">Two academies, one standard of craft.</h2>
            </div>
            <p className="text-stone-400 font-light text-sm md:text-base leading-relaxed">
              We believe true artistry requires both technical rigor and emotional resonance. Whether through the precise strokes of graphite and oil in our fine art atelier or the breath control and tonal precision in our vocal academy, students are guided by masters of their craft.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border-l border-[#d4af37]/40 pl-6">
                <h4 className="text-2xl font-serif text-stone-100 mb-1">2+</h4>
                <p className="text-[11px] uppercase tracking-widest text-stone-500">Core Faculties</p>
              </div>
              <div className="border-l border-[#d4af37]/40 pl-6">
                <h4 className="text-2xl font-serif text-stone-100 mb-1">100%</h4>
                <p className="text-[11px] uppercase tracking-widest text-stone-500">Master Mentorship</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] overflow-hidden border border-stone-800"
          >
            <img 
              src={studioInterior} 
              alt="Studio Interior" 
              className="w-full h-full object-cover grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* Founders / Master Mentors Section */}
      <section className="py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-4">Leadership</span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-100">Meet Our Master Mentors</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Mentor 1: Raini */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-[#121212] border border-stone-800 overflow-hidden group"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={founderRaini} 
                  alt="Raini Charuka Goonatillake" 
                  className="w-full h-full object-cover object-top grayscale-[20%] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
              </div>
              <div className="p-8 md:p-10">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] block mb-2">Rising Voices Academy</span>
                <h3 className="text-3xl font-serif text-stone-100 mb-4">Raini Charuka Goonatillake</h3>
                <p className="text-stone-400 font-light text-sm leading-relaxed mb-6">
                  Leading the Vocal Academy with extensive expertise in technique, breath control, repertoire building, and stage presence for both young and adult performers.
                </p>
                <Link to="/vocal-academy" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#d4af37] hover:text-stone-100 transition-colors">
                  Explore Vocal Programs <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            {/* Mentor 2: Dharshan */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#121212] border border-stone-800 overflow-hidden group"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={founderDarshan} 
                  alt="Dharshan Thavaraja" 
                  className="w-full h-full object-cover object-top grayscale-[20%] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
              </div>
              <div className="p-8 md:p-10">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] block mb-2">Drawing Academy & Studio</span>
                <h3 className="text-3xl font-serif text-stone-100 mb-4">Dharshan Thavaraja</h3>
                <p className="text-stone-400 font-light text-sm leading-relaxed mb-6">
                  Guiding the Fine Arts Studio through classical drawing, graphite portraiture, charcoal work, and comprehensive oil & acrylic painting techniques.
                </p>
                <Link to="/drawing-academy" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#d4af37] hover:text-stone-100 transition-colors">
                  Explore Art Programs <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-24 bg-[#121212] border-t border-stone-800 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-serif text-stone-100 mb-6">Begin Your Creative Journey</h2>
          <p className="text-stone-400 font-light text-sm md:text-base leading-relaxed mb-10">
            Admissions are open for our physical ateliers in Colombo and our global online interactive classes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link to="/apply" className="px-10 py-4 bg-[#d4af37] hover:bg-[#ebd083] text-stone-950 font-medium text-[10px] uppercase tracking-[0.2em] transition-colors">
              Apply Online — Free
            </Link>
            <Link to="/contact" className="px-10 py-4 border border-stone-700 hover:border-[#d4af37] text-stone-300 hover:text-[#d4af37] font-medium text-[10px] uppercase tracking-[0.2em] transition-all">
              Visit Us & Contact
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}