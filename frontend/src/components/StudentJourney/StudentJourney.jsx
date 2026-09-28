import academyAbout from "../../assets/academy-about.jpeg"; //[cite: 1]

export default function StudentJourney() {
  const steps = [
    { num: "01", title: "Submit Application", desc: "Complete the streamlined online placement form. No upfront fees required." },
    { num: "02", title: "Mentor Review", desc: "Our academic team evaluates your submission to ensure proper cohort placement." },
    { num: "03", title: "Tuition Settlement", desc: "Forward your payment slip securely via our WhatsApp administration desk." },
    { num: "04", title: "Digital Access", desc: "Receive your exclusive 8-character code unlocking Zoom links and class archives." }
  ];

  return (
    <section className="py-32 bg-stone-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center">
        
        <div className="relative aspect-[4/5] overflow-hidden hidden lg:block">
          <img 
            src={academyAbout} 
            alt="Studio Environment" 
            className="w-full h-full object-cover grayscale-[40%] hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 border border-stone-800 m-6"></div>
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] block mb-6">The Workflow</span>
          <h2 className="text-4xl font-serif text-stone-100 mb-16">Pathway to Enrollment</h2>
          
          <div className="space-y-12">
            {steps.map((step, idx) => (
              <div key={idx} className="relative pl-12 border-l border-stone-800 pb-2 group">
                <div className="absolute -left-[5px] top-1 w-[9px] h-[9px] rounded-full bg-stone-800 group-hover:bg-[#d4af37] transition-colors duration-300"></div>
                <div className="absolute -left-12 top-0 text-stone-700 font-serif text-lg">{step.num}</div>
                <h4 className="text-xl font-serif text-stone-200 mb-2 group-hover:text-[#d4af37] transition-colors">{step.title}</h4>
                <p className="text-stone-500 font-light text-sm leading-relaxed max-w-md">{step.desc}</p>
              </div>
            ))}
          </div>

          <a
            href="https://wa.me/94764316929"
            target="_blank"
            rel="noreferrer"
            className="mt-12 inline-block text-xs uppercase tracking-[0.2em] text-stone-400 border-b border-stone-700 pb-1 hover:text-[#d4af37] hover:border-[#d4af37] transition-all"
          >
            Inquire via WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}