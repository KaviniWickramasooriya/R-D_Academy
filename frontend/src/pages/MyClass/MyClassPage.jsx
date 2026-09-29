import { useState } from 'react';
import { getAccess } from '../../services/classesApi';
import { SessionList } from '../../components/ScheduleSection/ScheduleSection';
import { motion } from 'framer-motion';
import { KeyRound, Video, AlertCircle, PlaySquare } from 'lucide-react';

export default function MyClassPage() {
  const [code, setCode] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function open(e) {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError('');
    
    try {
      const res = await getAccess(code.trim().toUpperCase());
      if (!res.ok) throw new Error(res.error || 'Could not verify code');
      setData(res);
    } catch (err) {
      setData(null);
      setError(err.message || 'Could not open your class. Please check your access code.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 pt-16 pb-32 selection:bg-[#d4af37] selection:text-stone-900">
      <div className="max-w-[1000px] mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-3 font-mono">Student Portal</span>
          <h1 className="text-5xl font-serif text-stone-100 mb-4">My Class Access</h1>
          <p className="text-stone-400 text-xs font-light leading-relaxed">
            Enter your secure 8-character access code provided by the administration desk upon payment confirmation to unlock your Zoom link and materials.
          </p>
        </motion.div>

        {/* Access Code Form */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={open} 
          className="bg-[#121212] border border-stone-800 p-8 rounded-xl max-w-lg mx-auto shadow-2xl space-y-6 mb-16"
        >
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-2 font-mono">Your Access Code</label>
            <div className="relative flex items-center">
              <KeyRound className="absolute left-4 text-stone-500" size={18} />
              <input 
                type="text"
                value={code} 
                onChange={(e) => setCode(e.target.value)} 
                placeholder="e.g. K7M2Q9XA" 
                required
                className="w-full bg-[#0a0a0a] border border-stone-800 text-stone-100 pl-12 pr-4 py-3.5 text-sm uppercase font-mono tracking-wider focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 rounded">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-4 bg-[#d4af37] text-stone-950 font-medium text-[10px] uppercase tracking-[0.2em] hover:bg-[#ebd083] transition shadow-lg disabled:opacity-50"
          >
            {loading ? 'Verifying Code...' : 'Open My Class'}
          </button>
        </motion.form>

        {/* Unlocked Class Content */}
        {data && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-12 bg-[#121212] border border-[#d4af37]/30 p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-stone-800 pb-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-1 font-mono">Enrolled Student</span>
                <h2 className="text-3xl font-serif text-stone-100">Welcome, {data.studentName}</h2>
                <p className="text-xs text-stone-400 mt-1">{data.className} · <strong className="text-stone-200">{data.batchName}</strong></p>
              </div>
              <a 
                href={data.zoomLink} 
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-3.5 bg-emerald-500 text-stone-950 font-medium text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-400 transition flex items-center gap-2 shadow-lg rounded-lg"
              >
                <Video size={16} /> Join Zoom Class
              </a>
            </div>

            <div className="bg-[#0a0a0a] border border-stone-800 p-6 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-stone-500 block mb-1">Meeting Passcode</span>
                <span className="text-xl font-mono text-[#d4af37] tracking-widest font-bold">{data.passcode}</span>
              </div>
              <span className="text-xs text-stone-400 italic">Please enter passcode when prompted by Zoom.</span>
            </div>

            {/* Upcoming Batch Sessions */}
            <div>
              <h3 className="text-xl font-serif text-stone-100 mb-6">Upcoming Batch Sessions</h3>
              <SessionList sessions={data.sessions} />
            </div>

            {/* Recordings Archive */}
            {data.recordings && data.recordings.length > 0 && (
              <div className="pt-8 border-t border-stone-800">
                <h3 className="text-xl font-serif text-stone-100 mb-6 flex items-center gap-2">
                  <PlaySquare size={20} className="text-[#d4af37]" /> Class Recordings Archive
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.recordings.map((r, idx) => (
                    <a 
                      key={idx} 
                      href={r.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-5 bg-[#0a0a0a] border border-stone-800 rounded-xl hover:border-[#d4af37]/50 transition block group"
                    >
                      <span className="text-[10px] font-mono text-[#d4af37] block mb-1">{r.date}</span>
                      <h4 className="text-sm font-medium text-stone-200 group-hover:text-[#d4af37] transition">{r.title}</h4>
                    </a>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        )}

      </div>
    </div>
  );
}