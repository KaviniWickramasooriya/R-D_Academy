import { motion } from "framer-motion";
import { ArrowRight, Music, Palette } from "lucide-react";
import rainiImg from "../../assets/raini-profile.jpeg"; //[cite: 10]
import darshanImg from "../../assets/darshan-profile.jpeg"; //[cite: 8]

export default function MentorsSection() {
  const mentors = [
    {
      id: "raini",
      name: "Raini Charuka Goonatillake",
      title: "Founder - Rising Voices | Vocal Mentor | Singer",
      desc: "A renowned Sri Lankan singer guiding students to discover their vocal potential through professional training, confidence building, and musical expression.",
      img: rainiImg,
      icon: <Music size={20} />
    },
    {
      id: "darshan",
      name: "Dharshan Thavaraja",
      title: "Founder - Drawing Academy & Studio | Artist | Creative Mentor",
      desc: "An experienced artist and creative professional helping students develop artistic skills through structured drawing and painting programs.",
      img: darshanImg,
      icon: <Palette size={20} />
    }
  ];

  return (
    <section className="py-32 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] block mb-4">Meet Your Mentors</span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-100 mb-6">Learn From Creative Professionals</h2>
          <p className="text-stone-400 font-light max-w-2xl mx-auto text-sm leading-relaxed">
            Guided by passionate mentors with industry experience, R&D Academy & Studio provides students with inspiration, knowledge, and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {mentors.map((mentor, idx) => (
            <motion.div 
              key={mentor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-t-[3rem] overflow-hidden mb-8 border border-stone-800">
                <img 
                  src={mentor.img} 
                  alt={mentor.name} 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute bottom-6 right-6 w-14 h-14 bg-[#d4af37] rounded-full flex items-center justify-center text-stone-950 shadow-xl">
                  {mentor.icon}
                </div>
              </div>
              
              <div>
                <p className="text-[#d4af37] text-[10px] uppercase tracking-[0.2em] mb-2">{mentor.title}</p>
                <h3 className="text-3xl font-serif text-stone-100 mb-4">{mentor.name}</h3>
                <p className="text-stone-400 font-light text-sm leading-relaxed mb-6 h-20">
                  {mentor.desc}
                </p>
                <button className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-100 bg-stone-900 border border-stone-700 px-6 py-3 hover:border-[#d4af37] hover:text-[#d4af37] transition-all">
                  Learn More <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}