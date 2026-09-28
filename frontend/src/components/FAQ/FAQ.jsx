import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQ_ITEMS = [
  { 
    q: "Do I need to pay anything to apply?", 
    a: "No upfront payment is required during the initial application. The online form is strictly an intake and placement workflow to ensure you are matched with the right program." 
  },
  { 
    q: "How do I know my application was received?", 
    a: "Upon successful submission, you will instantly receive a unique reference number on the screen. Our administration team will then review your details." 
  },
  { 
    q: "What happens after I apply?", 
    a: "Our academic mentors review your submission to ensure proper cohort placement. Once approved, the administration office will reach out with your schedule and payment instructions." 
  },
  { 
    q: "My child is under 18. What extra details are needed?", 
    a: "For minor applicants, the application form automatically requests the full name, contact number, and relationship details of a parent or legal guardian for administrative and emergency purposes." 
  },
  { 
    q: "How are the online classes held?", 
    a: "Classes are broadcast live via Zoom. This ensures an interactive environment where mentors can provide real-time feedback and guidance on your work." 
  },
  { 
    q: "How do I pay for an online class?", 
    a: "Once your application is reviewed, our office will share the official bank details. You can settle the fee via bank transfer and securely send the deposit slip to our WhatsApp desk." 
  },
  { 
    q: "Are sessions recorded?", 
    a: "Yes. Every live session is recorded in high-definition and archived. Once enrolled, you will receive a private access code to unlock these recordings for review in your 'My Class' portal." 
  },
  { 
    q: "What materials do I need for art classes?", 
    a: "A comprehensive material list is provided upon enrollment. For your convenience, the academy also offers curated, professional-grade material packages for drawing and painting students." 
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Sticky Title Area */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-4">
                Inquiries
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-stone-100 leading-tight mb-6">
                Questions, <br />
                <span className="italic text-stone-500 font-light">answered.</span>
              </h2>
              <p className="text-stone-400 font-light text-xs leading-relaxed max-w-xs">
                Everything you need to know about our admissions, class structures, and technical requirements.
              </p>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:w-2/3 border-t border-stone-800">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="border-b border-stone-800">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full py-8 flex items-center justify-between text-left group"
                  >
                    <span 
                      className={`text-base md:text-lg font-serif transition-colors duration-500 pr-8 ${
                        isOpen ? "text-[#d4af37]" : "text-stone-300 group-hover:text-stone-100"
                      }`}
                    >
                      {item.q}
                    </span>
                    <span className={`shrink-0 transition-transform duration-500 ${isOpen ? "text-[#d4af37] rotate-180" : "text-stone-600 group-hover:text-[#d4af37]"}`}>
                      {isOpen ? <Minus size={18} strokeWidth={1} /> : <Plus size={18} strokeWidth={1} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-stone-400 font-light text-sm leading-relaxed max-w-xl">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}