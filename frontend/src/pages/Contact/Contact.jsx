import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ExternalLink, Send, CheckCircle2, Instagram, Facebook, Video } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 pt-16 pb-32 selection:bg-[#d4af37] selection:text-stone-900">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-4">
            Connect With Us
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-stone-100 leading-tight">
            Visit the Academy <br />
            <span className="italic text-stone-500 font-light">& Studio.</span>
          </h1>
        </motion.div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Contact & Location Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-12"
          >
            {/* Address Box */}
            <div className="p-8 bg-[#121212] border border-stone-800 space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-[#d4af37] shrink-0 mt-1" size={22} strokeWidth={1.5} />
                <div>
                  <h3 className="text-lg font-serif text-stone-100 mb-2">Location</h3>
                  <p className="text-stone-400 font-light text-sm leading-relaxed mb-4">
                    3rd Floor, 30 Queen's Rd,<br />
                    Colombo 00300, Sri Lanka
                  </p>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=30+Queen%27s+Rd+Colombo+00300" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#d4af37] hover:text-stone-100 transition-colors"
                  >
                    Get Directions <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Interactive Map in Full Color */}
            <div className="bg-[#121212] border border-stone-800 p-3 rounded-xl overflow-hidden shadow-2xl">
              <div className="w-full h-64 rounded-lg overflow-hidden transition-all duration-500">
                <iframe
                  title="R & D Academy Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.835338605553!2d79.8550186!3d6.8967963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596131464aa7%3A0x1b9e832d20b6e9bb!2s30%20Queen&#39;s%20Rd%2C%20Colombo%2000300%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1650000000000!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Visit Hours Box */}
            <div className="p-8 bg-[#121212] border border-stone-800 space-y-4">
              <h3 className="text-lg font-serif text-stone-100 mb-2">Visiting Hours</h3>
              <p className="text-stone-400 font-light text-sm leading-relaxed">
                Saturday: 11:00 AM – 5:00 PM<br />
                Sunday: 11:00 AM – 5:00 PM
              </p>
            </div>

            {/* Direct Contacts & Socials */}
            <div className="p-8 bg-[#121212] border border-stone-800 space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="text-[#d4af37] shrink-0" size={20} strokeWidth={1.5} />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-500 block">Email Us</span>
                  <a href="mailto:contact@randdartstudio.com" className="text-stone-300 text-sm hover:text-[#d4af37] transition-colors">
                    contact@randdartstudio.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-stone-800">
                <Phone className="text-[#d4af37] shrink-0" size={20} strokeWidth={1.5} />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-500 block">Direct Line / WhatsApp</span>
                  <a href="https://wa.me/94764316929" target="_blank" rel="noreferrer" className="text-stone-300 text-sm hover:text-[#d4af37] transition-colors">
                    +94 76 431 6929
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-stone-800">
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 block mb-4">Official Channels</span>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://www.facebook.com/share/1DEm8CV7BS/?mibextid=wwXIfr" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full border border-stone-800 bg-stone-900 flex items-center justify-center text-stone-400 hover:text-[#d4af37] hover:border-[#d4af37] transition-all"
                  >
                    <Facebook size={18} />
                  </a>
                  <a 
                    href="https://www.instagram.com/risingvoicesdrawingacademy?igsh=MXA1ZmF2eGozY3h1dg==" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full border border-stone-800 bg-stone-900 flex items-center justify-center text-stone-400 hover:text-[#d4af37] hover:border-[#d4af37] transition-all"
                  >
                    <Instagram size={18} />
                  </a>
                  <a 
                    href="https://www.tiktok.com/@rdacademy?_r=1&_t=ZS-97nbGDAwbqh" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full border border-stone-800 bg-stone-900 flex items-center justify-center text-stone-400 hover:text-[#d4af37] hover:border-[#d4af37] transition-all"
                  >
                    <Video size={18} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Inquiry Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-7 bg-[#121212] border border-stone-800 p-8 md:p-14 flex flex-col justify-center shadow-2xl"
          >
            {submitted ? (
              <div className="py-16 text-center space-y-6">
                <div className="w-16 h-16 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full flex items-center justify-center mx-auto text-[#d4af37]">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-3xl font-serif text-stone-100">Message Received</h3>
                <p className="text-stone-400 font-light text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Our administration desk will review your inquiry and respond shortly.
                </p>
                <button 
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", message: "" }); }}
                  className="mt-6 px-8 py-3 border border-stone-700 text-stone-300 text-[10px] uppercase tracking-[0.2em] hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h3 className="text-2xl font-serif text-stone-100 mb-2">Send an Inquiry</h3>
                  <p className="text-stone-400 font-light text-xs">Have questions about admissions, classes, or studio visits? Drop us a line.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-2">Your Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      className="w-full bg-[#0a0a0a] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                      placeholder="John Silva"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        className="w-full bg-[#0a0a0a] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        className="w-full bg-[#0a0a0a] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                        placeholder="+94 77 000 0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-2">Message *</label>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      required 
                      rows={5}
                      className="w-full bg-[#0a0a0a] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
                      placeholder="How can we assist you?"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-[#d4af37] text-stone-950 font-medium text-[10px] uppercase tracking-[0.2em] hover:bg-[#ebd083] transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  Send Message <Send size={14} />
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}