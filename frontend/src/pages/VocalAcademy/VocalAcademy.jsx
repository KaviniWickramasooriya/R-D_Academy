import { motion } from "framer-motion";
import { ArrowRight, Mic2, Music } from "lucide-react";
import { Link } from "react-router-dom";
import vocalCoverImg from "../../assets/vocal-academy-sep.jpg"; 

export default function VocalAcademy() {
  const adultCourses = [
    "Adult Vocal Program"
  ];

  const kidsCourses = [
    "Kids Vocal Program"
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-stone-200 selection:bg-[#d4af37] selection:text-stone-900">
      <div className="flex flex-col lg:flex-row relative">
        
        {/* Left Content (Scrollable) */}
        <div className="w-full lg:w-1/2 px-6 py-24 md:px-16 lg:px-24 xl:px-32 z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] mb-8 flex items-center gap-3 font-medium">
              <Mic2 size={14} /> Vocal Programs
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-stone-100 leading-tight mb-8">
              Rising Voices <br />
              <span className="italic text-stone-500 font-light">Academy</span>
            </h1>
            <p className="text-stone-400 font-light text-sm md:text-base leading-relaxed max-w-md mb-16">
              Build unshakeable confidence and vocal excellence through professional music education designed for children and adults.
            </p>

            <div className="space-y-16">
              {/* Adults Curriculum */}
              <div>
                <h3 className="text-2xl font-serif text-stone-200 mb-8 flex items-center gap-4">
                  Adults Curriculum
                  <div className="h-[1px] flex-1 bg-stone-800"></div>
                </h3>
                <ul className="space-y-6">
                  {adultCourses.map((course, i) => (
                    <li key={i} className="flex items-center gap-5 text-sm md:text-base font-light text-stone-400 hover:text-[#d4af37] transition-colors group cursor-pointer">
                      <div className="w-2 h-2 rounded-full border border-stone-600 group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-colors"></div>
                      {course}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Kids Curriculum */}
              <div>
                <h3 className="text-2xl font-serif text-stone-200 mb-8 flex items-center gap-4">
                  Kids Curriculum
                  <div className="h-[1px] flex-1 bg-stone-800"></div>
                </h3>
                <ul className="space-y-6">
                  {kidsCourses.map((course, i) => (
                    <li key={i} className="flex items-center gap-5 text-sm md:text-base font-light text-stone-400 hover:text-[#d4af37] transition-colors group cursor-pointer">
                      <div className="w-2 h-2 rounded-full border border-stone-600 group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-colors"></div>
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-20 pt-10 border-t border-stone-800">
              <Link
                to="/apply"
                className="inline-flex items-center gap-4 px-10 py-5 bg-[#d4af37] text-stone-950 text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#ebd083] transition-colors"
              >
                Apply for Admission <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Image (Sticky on Desktop) */}
        <div className="hidden lg:block lg:w-1/2 relative sticky top-0 h-screen border-l border-stone-900 overflow-hidden">
          <motion.img 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={vocalCoverImg} 
            alt="Rising Voices Academy" 
            className="absolute inset-0 w-full h-full object-cover object-top grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Aesthetic Overlay Badge */}
          <div className="absolute bottom-16 right-16 bg-[#121212]/90 backdrop-blur-md p-8 border border-stone-800 max-w-sm">
            <Music className="text-[#d4af37] mb-6" size={32} strokeWidth={1} />
            <p className="text-sm text-stone-300 font-light italic leading-loose">
              "Discover your vocal potential through precision training, confidence building, and unbounded musical expression."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}