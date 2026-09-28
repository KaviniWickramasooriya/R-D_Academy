import { motion } from "framer-motion";
import { Mic2, Palette, Award } from "lucide-react";
import aboutImg from "../../assets/academy-about2 (2).jpeg"; //[cite: 8]

export default function AboutAcademy() {
  return (
    <section className="py-32 bg-stone-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Editorial Image with Floating Card */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[4/5] md:aspect-square overflow-hidden rounded-tr-[4rem] rounded-bl-[4rem] border border-stone-800">
            <img 
              src={aboutImg} 
              alt="Students painting at easels" 
              className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
            />
          </div>
          {/* Floating Dark Card[cite: 13] */}
          <div className="absolute -bottom-8 -right-8 md:bottom-8 md:-right-12 bg-stone-900 border border-stone-800 p-8 shadow-2xl backdrop-blur-md max-w-[280px]">
            <h4 className="text-3xl font-serif text-[#d4af37] mb-2 text-center">R & D</h4>
            <p className="text-xs text-stone-400 text-center leading-relaxed font-light">
              Rising Voices & Drawing Academy & Studio
            </p>
          </div>
        </motion.div>

        {/* Right: Typography & Content */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:pl-12 space-y-8"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] block mb-4">About R&D Academy & Studio</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-100 leading-tight">
              Where Creativity <br /> Meets Expression
            </h2>
          </div>

          <div className="space-y-6 text-stone-400 font-light text-sm md:text-base leading-relaxed">
            <p>
              R&D Academy & Studio is a creative learning space designed to inspire the next generation of artists and performers. Bringing together music and visual arts, we provide structured learning experiences for children, teenagers, and adults.
            </p>
            <p>
              Founded by renowned Sri Lankan singer <strong className="text-stone-200 font-normal">Raini Charuka Goonatillake</strong> and actor & artist <strong className="text-stone-200 font-normal">Dharshan Thavaraja</strong>, R&D Academy & Studio creates a platform where passion, creativity, and professional guidance come together.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-800">
            <div className="text-center p-4 bg-stone-900/50 border border-stone-800 hover:border-[#d4af37]/50 transition-colors">
              <Mic2 size={24} className="mx-auto text-[#d4af37] mb-3" strokeWidth={1.5} />
              <span className="text-[10px] uppercase tracking-wider text-stone-300">Vocal<br/>Courses</span>
            </div>
            <div className="text-center p-4 bg-stone-900/50 border border-stone-800 hover:border-[#d4af37]/50 transition-colors">
              <Palette size={24} className="mx-auto text-[#d4af37] mb-3" strokeWidth={1.5} />
              <span className="text-[10px] uppercase tracking-wider text-stone-300">Drawing<br/>Courses</span>
            </div>
            <div className="text-center p-4 bg-stone-900/50 border border-stone-800 hover:border-[#d4af37]/50 transition-colors">
              <Award size={24} className="mx-auto text-[#d4af37] mb-3" strokeWidth={1.5} />
              <span className="text-[10px] uppercase tracking-wider text-stone-300">Professional<br/>Mentorship</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}