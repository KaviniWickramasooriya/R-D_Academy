import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import vocalImg from "../../assets/vocal-academy.jpeg"; 
import drawingImg from "../../assets/drawing-academy.jpeg"; 

export default function FeaturedCourses() {
  const academies = [
    {
      id: "vocal",
      tagline: "Rising Voices",
      title: "The Vocal Academy",
      desc: "Technique, breath, repertoire and stage presence for young and adult singers.",
      ledBy: "Led by Raini Charuka Goonatillake",
      img: vocalImg,
      position: "object-[center_15%]", // Focuses near the top to keep the face visible
      link: "/vocal-academy"
    },
    {
      id: "drawing",
      tagline: "Drawing Academy & Studio",
      title: "The Art Atelier",
      desc: "Drawing, graphite, charcoal and painting — from first lines to exhibition work.",
      ledBy: "Led by Dharshan Thavaraja",
      img: drawingImg,
      position: "object-[center_10%]", // Focuses near the top to keep the face visible
      link: "/drawing-academy"
    }
  ];

  return (
    <section className="w-full flex flex-col lg:flex-row min-h-[85vh] bg-[#0a0a0a] border-y border-stone-900">
      {academies.map((item, idx) => (
        <Link 
          key={item.id} 
          to={item.link} 
          className="relative w-full lg:w-1/2 min-h-[60vh] lg:min-h-full group overflow-hidden block"
        >
          {/* Background Image with Controlled Object Position */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-10 transition-opacity duration-700 group-hover:opacity-80"></div>
            <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/40 transition-colors duration-700"></div>
            <img
              src={item.img}
              alt={item.title}
              // The custom position class is applied here dynamically
              className={`w-full h-full object-cover ${item.position} opacity-80 group-hover:scale-105 group-hover:opacity-60 transition-all duration-[1.5s] ease-out`}
            />
          </div>

          {/* Typography Content */}
          <div className="absolute inset-0 p-8 md:p-14 lg:p-20 flex flex-col justify-end z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
            >
              <span className="text-[9px] uppercase tracking-[0.3em] text-stone-400 block mb-4">
                {item.tagline}
              </span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-100 mb-6 tracking-wide">
                {item.title}
              </h2>
              
              <p className="text-stone-300 font-light text-sm md:text-base leading-relaxed max-w-md mb-10">
                {item.desc}
              </p>
              
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#d4af37] block">
                {item.ledBy}
              </span>
            </motion.div>
          </div>
        </Link>
      ))}
    </section>
  );
}