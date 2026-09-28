import { motion } from "framer-motion";
import { Play } from "lucide-react";
import posterImg from "../../assets/rd-trailer-poster.jpg"; //[cite: 10]

export default function VideoTrailer() {
  return (
    <section className="py-24 bg-stone-900 border-y border-stone-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] block mb-4">Watch & Discover</span>
        <h2 className="text-3xl md:text-5xl font-serif text-stone-100 mb-4">Step Inside R & D Academy & Studio</h2>
        <p className="text-stone-400 font-light text-sm mb-12">A short look at what a day of music, art and mentorship feels like at our studio.</p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video max-w-5xl mx-auto rounded-2xl overflow-hidden border border-stone-700 shadow-2xl group cursor-pointer"
        >
          <img 
            src={posterImg} 
            alt="R&D Academy Trailer" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
          />
          <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/20 transition-colors duration-500"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-[#d4af37] rounded-full flex items-center justify-center pl-2 shadow-[0_0_50px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform duration-300">
              <Play size={32} className="text-stone-950" fill="currentColor" />
            </div>
          </div>

          <div className="absolute top-6 left-6 px-4 py-2 bg-stone-950/60 backdrop-blur-md rounded-full border border-stone-700/50">
            <span className="text-xs font-serif text-stone-200 italic">R & D Academy — Official Trailer</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}