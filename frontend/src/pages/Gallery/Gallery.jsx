import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import galHero from "../../assets/galhero.jpeg"; 
import gal1 from "../../assets/gallery1.jpg"; 
import gal2 from "../../assets/gallery2.jpg"; 
import gal3 from "../../assets/gallery3.jpg"; 
import gal4 from "../../assets/gallery4.jpg"; 
import gal5 from "../../assets/gallery5.jpg"; 
import gal6 from "../../assets/gallery6.jpg"; 
import rainiGal from "../../assets/raini-gallery1.jpeg"; 
import darshanGal from "../../assets/darshan-gallery1.jpeg"; 
import dharshanNew from "../../assets/dharshannew.jpeg"; 

const GALLERY_DATA = [
  { id: 1, src: galHero, category: "Studio", title: "Creative Space" },
  { id: 2, src: rainiGal, category: "Vocal", title: "Vocal Masterclass" },
  { id: 3, src: gal1, category: "Fine Art", title: "Charcoal Techniques" },
  { id: 4, src: darshanGal, category: "Fine Art", title: "Live Portraiture" },
  { id: 5, src: gal2, category: "Studio", title: "Student Exhibition" },
  { id: 6, src: gal3, category: "Vocal", title: "Stage Performance" },
  { id: 7, src: dharshanNew, category: "Fine Art", title: "Mentorship Session" },
  { id: 8, src: gal4, category: "Studio", title: "The Atelier" },
  { id: 9, src: gal5, category: "Fine Art", title: "Oil Painting Basics" },
  { id: 10, src: gal6, category: "Studio", title: "Creative Community" },
];

const CATEGORIES = ["All", "Fine Art", "Vocal", "Studio"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredGallery = GALLERY_DATA.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    // Changed pt-32 to pt-10 to fix the massive gap
    <div className="min-h-screen bg-[#0a0a0a] pt-10 pb-24 selection:bg-[#d4af37] selection:text-stone-900">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Luxury Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-4">
              The Exhibition
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-stone-100 leading-tight tracking-tight">
              A Visual <br />
              <span className="italic text-stone-500 font-light">Journey.</span>
            </h1>
          </motion.div>

          {/* Minimalist Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-6 border-b border-stone-800 pb-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-300 pb-2 border-b-2 ${
                  activeCategory === cat 
                    ? "text-[#d4af37] border-[#d4af37]" 
                    : "text-stone-500 border-transparent hover:text-stone-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Editorial Masonry Grid */}
        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="break-inside-avoid relative group overflow-hidden bg-[#121212] border border-stone-800 cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-auto object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.2s] ease-out"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-[1px] w-6 bg-[#d4af37]"></div>
                    <span className="text-[#d4af37] text-[9px] uppercase tracking-[0.25em]">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif text-stone-100 tracking-wide">
                    {item.title}
                  </h3>
                </div>

                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-700 m-6"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredGallery.length === 0 && (
          <div className="py-32 text-center text-stone-500 font-light tracking-widest uppercase text-xs">
            No items available in this category.
          </div>
        )}

      </div>
    </div>
  );
}