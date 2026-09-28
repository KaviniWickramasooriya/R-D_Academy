import { ShieldCheck, Video, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Users,
      title: "Elite Mentorship",
      desc: "Learn directly from active industry professionals and celebrated local artists in an intimate setting."
    },
    {
      icon: Video,
      title: "Seamless Digital Portal",
      desc: "Live interactive classes with secure access codes and high-definition archived recordings for review."
    },
    {
      icon: ShieldCheck,
      title: "Streamlined Admissions",
      desc: "A clean, modern application process with zero upfront payment required to secure your placement evaluation."
    },
    {
      icon: Sparkles,
      title: "Exhibition Opportunities",
      desc: "Showcase your portfolio in our annual physical and digital gallery events to build your artistic profile."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a] border-t border-stone-900">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Luxury Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-4">
              Why Choose R&D Academy
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-100 leading-tight">
              The Standard of <br />
              <span className="italic text-stone-500 font-light">Excellence</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-400 font-light text-xs md:text-sm max-w-sm leading-relaxed pb-2"
          >
            We believe every student possesses unique creative potential. Our mission is to nurture that talent through professional guidance and an inspiring environment.
          </motion.p>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              key={i} 
              className="group relative p-8 md:p-10 bg-[#121212] border border-stone-800 hover:border-stone-600 transition-colors duration-500 overflow-hidden flex flex-col"
            >
              {/* Subtle gold hover line at the top */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="mb-12">
                <f.icon 
                  className="text-stone-500 group-hover:text-[#d4af37] transition-colors duration-500" 
                  size={32} 
                  strokeWidth={1} 
                />
              </div>
              
              <div className="mt-auto">
                <h3 className="text-lg font-serif text-stone-200 mb-4 group-hover:text-[#d4af37] transition-colors duration-500">
                  {f.title}
                </h3>
                <p className="text-[11px] text-stone-400 font-light leading-relaxed tracking-wide">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}