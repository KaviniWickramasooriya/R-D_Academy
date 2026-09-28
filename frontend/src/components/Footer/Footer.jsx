import { Link } from "react-router-dom";
import { Facebook, Instagram, Video, MapPin, Mail, Phone } from "lucide-react";
import logo from "../../assets/logo ori.png";

export default function Footer() {
  return (
    <footer className="bg-[#080808] text-stone-300 font-sans pt-24 pb-12 border-t border-stone-900 mt-auto selection:bg-[#d4af37] selection:text-stone-900">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
        
        {/* Left Column: Brand Statement */}
        <div className="lg:col-span-5 space-y-6">
          <img 
            src={logo} 
            alt="R&D Academy Colombo" 
            className="h-20 w-auto object-contain opacity-95"
          />
          <p className="text-stone-400 font-light text-sm leading-relaxed max-w-sm">
            A premier Colombo conservatory and atelier for voice and visual art — offering classical training, drawing, painting, and live interactive online sessions.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a 
              href="https://www.facebook.com/share/1DEm8CV7BS/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-stone-800 bg-stone-900 flex items-center justify-center text-stone-400 hover:text-[#d4af37] hover:border-[#d4af37] transition-all"
            >
              <Facebook size={16} />
            </a>
            <a 
              href="https://www.instagram.com/risingvoicesdrawingacademy?igsh=MXA1ZmF2eGozY3h1dg==" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-stone-800 bg-stone-900 flex items-center justify-center text-stone-400 hover:text-[#d4af37] hover:border-[#d4af37] transition-all"
            >
              <Instagram size={16} />
            </a>
            <a 
              href="https://www.tiktok.com/@rdacademy?_r=1&_t=ZS-97nbGDAwbqh" 
              target="_blank" 
              rel="noreferrer"
              aria-label="TikTok"
              className="w-9 h-9 rounded-full border border-stone-800 bg-stone-900 flex items-center justify-center text-stone-400 hover:text-[#d4af37] hover:border-[#d4af37] transition-all"
            >
              <Video size={16} />
            </a>
          </div>
        </div>
        
        {/* Middle Column: Directory */}
        <div className="lg:col-span-3 space-y-6">
          <h5 className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-medium">Directory</h5>
          <ul className="space-y-3 text-xs font-light text-stone-400">
            <li><Link to="/" className="hover:text-stone-100 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-stone-100 transition-colors">About & Contact</Link></li>
            <li><Link to="/academies" className="hover:text-stone-100 transition-colors">Academies</Link></li>
            <li><Link to="/drawing-academy" className="hover:text-stone-100 transition-colors">Drawing Academy & Studio</Link></li>
            <li><Link to="/vocal-academy" className="hover:text-stone-100 transition-colors">Rising Voices Academy</Link></li>
            <li><Link to="/online-classes" className="hover:text-stone-100 transition-colors">Online Classes</Link></li>
            <li><Link to="/gallery" className="hover:text-stone-100 transition-colors">Exhibition Gallery</Link></li>
          </ul>
        </div>

        {/* Right Column: Visit & Contact Details */}
        <div className="lg:col-span-4 space-y-6">
          <h5 className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-medium">Visit & Contact</h5>
          <div className="space-y-4 text-xs font-light text-stone-400">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
              <span>3rd Floor, 30 Queen's Rd, Colombo 00300, Sri Lanka</span>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
              <a href="mailto:contact@randdartstudio.com" className="hover:text-[#d4af37] transition-colors">
                contact@randdartstudio.com
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
              <a href="https://wa.me/94764316929" target="_blank" rel="noreferrer" className="hover:text-[#d4af37] transition-colors">
                +94 76 431 6929
              </a>
            </div>
            <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-500">
              Visiting Hours:<br />
              Saturday: 11:00 AM – 5:00 PM<br />
              Sunday: 11:00 AM – 5:00 PM
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 border-t border-stone-900 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-stone-500 font-light tracking-wider uppercase gap-4">
        <p>© {new Date().getFullYear()} R & D Academy · Rising Voices & Drawing Academy</p>
        <p className="text-stone-500">
          Website developed by{" "}
          <a 
            href="https://adnavra.com/" 
            target="_blank" 
            rel="noreferrer" 
            className="text-[#d4af37] hover:underline"
          >
            Adnavra
          </a>
        </p>
      </div>
    </footer>
  );
}