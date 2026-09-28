import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Brush, PenTool, X, Clock, Calendar, Award } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import coverImg from "../../assets/drawing-academy-sep.jpg"; 
import { drawingCourses } from "../../data/drawingCoursesData";

export default function DrawingAcademy() {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);

  const adultCourses = [
    "Beginner Drawing", 
    "Graphite Portrait Drawing", 
    "General Painting (Oil & Acrylic)"
  ];

  const kidsCourses = [
    "Pre-Beginner Art", 
    "Kids Drawing Course"
  ];

  const handleCourseClick = (courseName) => {
    const found = drawingCourses.find(c => c.name.toLowerCase() === courseName.toLowerCase());
    if (found) {
      setSelectedCourse(found);
    } else {
      // Fallback object for kids or other unlisted courses
      setSelectedCourse({
        name: courseName,
        category: "Drawing Academy",
        badge: "Kids Program",
        duration: "Monthly / Flexible",
        schedule: "Sat & Wed • 4:00 PM – 6:00 PM",
        overview: "An introductory art programme building confidence with shape, colour, and imagination in a supportive studio environment.",
        curriculum: [
          "Basic shape and contour recognition",
          "Colour mixing and brush handling fundamentals",
          "Imaginative storytelling through canvas expression"
        ],
        pricing: { registrationFee: "10,000 LKR", payOnce: "8,000 LKR / month" }
      });
    }
  };

  const handleApplyClick = (course) => {
    navigate('/apply', { state: { selectedCourse: course } });
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-stone-200 selection:bg-[#d4af37] selection:text-stone-900">
      <div className="flex flex-col lg:flex-row relative">
        
        {/* Left Content (Scrollable) */}
        <div className="w-full lg:w-1/2 px-6 py-24 md:px-16 lg:px-24 xl:px-32 z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] mb-8 flex items-center gap-3 font-medium">
              <Brush size={14} /> Studio Programs
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-stone-100 leading-tight mb-8">
              Drawing Academy <br />
              <span className="italic text-stone-500 font-light">& Studio</span>
            </h1>
            <p className="text-stone-400 font-light text-sm md:text-base leading-relaxed max-w-md mb-16">
              Learn professional drawing and painting techniques through strictly structured courses tailored for both children and adults. Click any course below to inspect its syllabus.
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
                    <li 
                      key={i} 
                      onClick={() => handleCourseClick(course)}
                      className="flex items-center justify-between text-sm md:text-base font-light text-stone-400 hover:text-[#d4af37] transition-colors group cursor-pointer bg-[#121212] p-5 border border-stone-800 hover:border-[#d4af37]/40"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full border border-stone-600 group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-colors"></div>
                        {course}
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">View Details →</span>
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
                    <li 
                      key={i} 
                      onClick={() => handleCourseClick(course)}
                      className="flex items-center justify-between text-sm md:text-base font-light text-stone-400 hover:text-[#d4af37] transition-colors group cursor-pointer bg-[#121212] p-5 border border-stone-800 hover:border-[#d4af37]/40"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full border border-stone-600 group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-colors"></div>
                        {course}
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">View Details →</span>
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
            src={coverImg} 
            alt="Drawing Academy Studio" 
            className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Aesthetic Overlay Quote */}
          <div className="absolute bottom-16 right-16 bg-[#121212]/90 backdrop-blur-md p-8 border border-stone-800 max-w-sm">
            <PenTool className="text-[#d4af37] mb-6" size={32} strokeWidth={1} />
            <p className="text-sm text-stone-300 font-light italic leading-loose">
              "Master the fundamentals of sketching, proportion, light, and perspective within a dedicated studio environment."
            </p>
          </div>
        </div>

      </div>

      {/* LUXURY COURSE DETAIL MODAL */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#121212] border border-stone-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 md:p-12 relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-6 right-6 text-stone-400 hover:text-[#d4af37] transition-colors p-2"
              >
                <X size={24} />
              </button>

              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-medium">
                    {selectedCourse.category}
                  </span>
                  <span className="text-stone-600">•</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 bg-stone-900 border border-stone-800 px-3 py-1">
                    {selectedCourse.badge}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-stone-100 mb-4">
                  {selectedCourse.name}
                </h2>
                <p className="text-stone-400 font-light text-sm md:text-base leading-relaxed">
                  {selectedCourse.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-stone-900/40 p-6 border border-stone-800/80">
                <div className="flex items-center gap-3 text-xs text-stone-300">
                  <Clock size={16} className="text-[#d4af37]" />
                  <span>Duration: <strong className="font-normal text-stone-100">{selectedCourse.duration}</strong></span>
                </div>
                {selectedCourse.schedule && (
                  <div className="flex items-center gap-3 text-xs text-stone-300">
                    <Calendar size={16} className="text-[#d4af37]" />
                    <span>Schedule: <strong className="font-normal text-stone-100">{selectedCourse.schedule}</strong></span>
                  </div>
                )}
              </div>

              {selectedCourse.curriculum && (
                <div className="mb-10">
                  <h3 className="text-xl font-serif text-stone-200 mb-4 border-b border-stone-800 pb-2 flex items-center gap-2">
                    <Award size={18} className="text-[#d4af37]" /> Curriculum Overview
                  </h3>
                  <ul className="space-y-3">
                    {selectedCourse.curriculum.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-stone-300 font-light">
                        <span className="text-[#d4af37] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedCourse.pricing && (
                <div className="mb-10 p-6 bg-stone-950 border border-stone-800">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-[#d4af37] mb-3">Investment & Structure</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-300">
                    <div>Registration Fee: <strong className="text-stone-100">{selectedCourse.pricing.registrationFee}</strong></div>
                    <div>Full Payment: <strong className="text-stone-100">{selectedCourse.pricing.payOnce}</strong></div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-4 pt-6 border-t border-stone-800">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="px-6 py-3 border border-stone-800 text-stone-400 text-xs uppercase tracking-widest hover:border-stone-600 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleApplyClick(selectedCourse)}
                  className="px-8 py-3 bg-[#d4af37] text-stone-950 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#ebd083] transition-colors shadow-lg"
                >
                  Apply Online
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}