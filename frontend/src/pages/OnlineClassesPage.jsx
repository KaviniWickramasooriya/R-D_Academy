import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Calendar, MonitorPlay, MessageSquare, Sparkles } from "lucide-react";
import FAQ from "../components/FAQ/FAQ";

export default function OnlineClassesPage() {
  const programmes = [
    {
      id: "kids-art",
      title: "Online Kids Art Classes",
      desc: "Live guided art classes for children at home, fostering foundational creativity and imagination.",
      audience: "Children up to 15 years",
      duration: "2 months per term",
      format: "Online · Live"
    },
    {
      id: "beginner-art",
      title: "Online Art Classes — Beginner Level",
      desc: "Drawing fundamentals online for adults and teens seeking professional technical instruction.",
      audience: "Adults and children up to 15",
      duration: "3 months",
      format: "Online · Live"
    },
    {
      id: "painting-specialized",
      title: "Online Painting Specialized Course",
      desc: "Six months of immersive watercolour, acrylic, and oil painting methodologies.",
      audience: "Ages 16 and above",
      duration: "6 months",
      format: "Online · Live"
    }
  ];

  const schedule = [
    { date: "Sat 3 October", time: "9:00 AM – 10:30 AM", course: "Online Kids Art Classes", status: "New term opening session" },
    { date: "Sun 4 October", time: "6:30 PM – 8:00 PM", course: "Online Art Classes — Beginner Level", status: "Module 1: line and form" },
    { date: "Sat 10 October", time: "2:00 PM – 4:30 PM", course: "Online Painting Specialized Course", status: "Watercolour module begins" },
    { date: "Sat 17 October", time: "9:00 AM – 10:30 AM", course: "Online Kids Art Classes", status: "Colour and storytelling" },
    { date: "Sun 18 October", time: "6:30 PM – 8:00 PM", course: "Online Art Classes — Beginner Level", status: "Module 2: perspective" },
    { date: "Sat 24 October", time: "2:00 PM – 4:30 PM", course: "Online Painting Specialized Course", status: "Acrylic layering" },
  ];

  const steps = [
    { title: "Choose your programme", desc: "Pick the online class that matches the student's age and level from the programmes above." },
    { title: "Register online", desc: "Complete the free application form. You receive a reference number the moment you submit." },
    { title: "Settle the fee", desc: "The office shares the bank details. Send the deposit slip on WhatsApp with the student's name and course." },
    { title: "Receive your access code", desc: "Once the payment is confirmed, the office issues a private access code for the student." },
    { title: "Open My Class and join", desc: "Enter the access code on the My Class page to reveal the live meeting link, passcode and recordings." }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-stone-200 selection:bg-[#d4af37] selection:text-stone-900">
      
      {/* Cinematic Hero (Reduced top padding for seamless layout alignment) */}
      <section className="pt-16 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-[10px] uppercase tracking-[0.25em] mb-4 font-medium">
              <MonitorPlay size={12} /> Global Studio Sessions
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-stone-100 leading-tight mb-6">
              Online Interactive <br />
              <span className="italic text-[#d4af37] font-light">Classes.</span>
            </h1>
            <p className="text-stone-400 font-light text-xs md:text-sm leading-relaxed max-w-2xl mx-auto">
              Three live programmes taught by the Drawing Academy & Studio, with private, high-definition recordings exclusively available for enrolled students.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Programmes (Editorial List) */}
      <section className="py-20 bg-[#121212] border-y border-stone-800/80 shadow-2xl">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-2 font-mono">Curriculum</span>
            <h2 className="text-3xl font-serif text-stone-100">Choose your online class</h2>
          </div>

          <div className="flex flex-col">
            {programmes.map((prog, idx) => (
              <motion.div 
                key={prog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group flex flex-col md:flex-row justify-between py-10 border-b border-stone-800/60 hover:border-[#d4af37]/50 transition-colors duration-500"
              >
                <div className="md:w-1/2 mb-6 md:mb-0 pr-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#d4af37] font-mono">
                      {prog.format}
                    </span>
                  </div>
                  <h4 className="text-2xl font-serif text-stone-200 group-hover:text-[#d4af37] transition-colors duration-500 mb-3">
                    {prog.title}
                  </h4>
                  <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed">
                    {prog.desc}
                  </p>
                </div>

                <div className="md:w-1/3 flex flex-col justify-center border-l border-stone-800/50 pl-0 md:pl-8 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-500 uppercase tracking-widest text-[9px]">Audience</span>
                    <span className="text-stone-300 font-medium">{prog.audience}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-500 uppercase tracking-widest text-[9px]">Duration</span>
                    <span className="text-stone-300 font-medium">{prog.duration}</span>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <Link to="/apply" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#d4af37] hover:text-stone-100 transition-colors font-medium">
                      Apply Now <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary Schedule */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-2 font-mono">Timetable</span>
              <h2 className="text-3xl font-serif text-stone-100">Class Schedule</h2>
            </div>
            <p className="text-stone-400 text-[10px] uppercase tracking-widest flex items-center gap-2 font-mono">
              <Calendar size={12} className="text-[#d4af37]" /> All times are Sri Lanka time (Asia/Colombo)
            </p>
          </div>

          <div className="border-t border-stone-800 bg-[#121212] rounded-xl overflow-hidden border border-stone-800/80 shadow-xl">
            {schedule.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-6 border-b border-stone-800/50 hover:bg-stone-900/60 transition-colors items-center px-6"
              >
                <div className="lg:col-span-2 text-stone-200 font-medium tracking-wide text-xs">
                  {item.date}
                </div>
                <div className="lg:col-span-2 text-stone-400 text-xs font-mono">
                  {item.time}
                </div>
                <div className="lg:col-span-4 text-[#d4af37] font-serif text-base">
                  {item.course}
                </div>
                <div className="lg:col-span-4 flex items-center gap-2 text-stone-400 text-xs font-light italic">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {item.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Workflow / How to Join */}
      <section className="py-24 bg-[#121212] border-t border-stone-800/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="mb-20 text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-2 font-mono">Enrollment Flow</span>
            <h2 className="text-4xl font-serif text-stone-100">Five simple steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
            <div className="hidden lg:block absolute top-12 left-12 right-12 h-[1px] bg-stone-800 z-0" />
            
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left group bg-[#0a0a0a] border border-stone-800/80 p-6 rounded-xl hover:border-[#d4af37]/40 transition-all"
              >
                <div className="text-3xl font-serif text-[#d4af37] mb-4 font-mono">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-serif text-stone-200 mb-2 group-hover:text-[#d4af37] transition-colors">
                  {step.title}
                </h4>
                <p className="text-stone-400 text-xs leading-relaxed font-light">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Core Actions */}
          <div className="mt-20 pt-12 border-t border-stone-800 flex flex-col sm:flex-row flex-wrap justify-center gap-6">
            <Link to="/apply" className="px-8 py-3.5 bg-[#d4af37] text-stone-950 font-medium text-[10px] uppercase tracking-[0.2em] hover:bg-[#ebd083] transition-colors text-center shadow-lg">
              Register Online
            </Link>
            <a href="https://wa.me/94764316929" target="_blank" rel="noreferrer" className="px-8 py-3.5 border border-stone-700 text-stone-300 font-medium text-[10px] uppercase tracking-[0.2em] hover:border-[#d4af37] hover:text-[#d4af37] transition-all flex items-center justify-center gap-2">
              <MessageSquare size={14} /> Send Payment Slip
            </a>
            <Link to="/my-class" className="px-8 py-3.5 border border-stone-700 text-stone-300 font-medium text-[10px] uppercase tracking-[0.2em] hover:border-[#d4af37] hover:text-[#d4af37] transition-all flex items-center justify-center gap-2">
              <Play size={14} /> Open My Class
            </Link>
          </div>
        </div>
      </section>

      <FAQ />

    </div>
  );
}