import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewsBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-amber-400 text-slate-950 relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider flex-1 justify-center">
          <Sparkles size={14} />
          <span>New Intake Registrations are now open for 2026.</span>
          <Link to="/apply" className="ml-2 underline underline-offset-4 hover:text-white transition-colors">
            Apply Now
          </Link>
        </div>
        <button 
          onClick={() => setIsVisible(false)} 
          className="text-slate-900 hover:text-white transition-colors p-1"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}