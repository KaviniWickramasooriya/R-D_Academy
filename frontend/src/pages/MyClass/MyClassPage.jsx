import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Video, Calendar, KeyRound, AlertCircle } from 'lucide-react';
import { getClassAccess } from '../../services/registrationApi';
import "./MyClassPage.css";

export default function MyClassPage() {
  const [code, setCode] = useState('');
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOpenClass = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Backend validates code and returns Zoom details only for paid/approved students[cite: 22]
      const data = await getClassAccess(code);
      setClassData(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid or inactive access code.');
      setClassData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen my-class-bg py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <KeyRound size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">Student Access Portal</h1>
          <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
            Enter your personal access code to retrieve your live Zoom link, upcoming schedule, and recent class recordings[cite: 22].
          </p>
        </div>

        <form onSubmit={handleOpenClass} className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 mb-8 max-w-xl mx-auto relative z-10">
          <label className="block text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">Access Code</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              value={code} 
              onChange={(e) => setCode(e.target.value.toUpperCase())} 
              placeholder="e.g. K7M2Q9XA" 
              className="flex-1 border-2 border-slate-200 rounded-xl px-4 py-4 focus:outline-none focus:border-amber-400 uppercase tracking-[0.3em] font-mono text-lg transition-colors"
              required
            />
            <button 
              type="submit" 
              disabled={loading || code.length < 6}
              className="px-10 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-lg"
            >
              {loading ? 'Verifying...' : 'Access'}
            </button>
          </div>
          {error && (
            <div className="flex items-center gap-2 mt-4 text-rose-500 text-sm font-medium bg-rose-50 p-3 rounded-lg border border-rose-100">
              <AlertCircle size={16} /> {error}
            </div>
          )}
        </form>

        {classData && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 mt-12">
            <div className="p-8 border-b border-slate-100 bg-slate-950 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
              <h2 className="text-3xl font-serif mb-2 relative z-10">Welcome, {classData.studentName}</h2>
              <p className="text-amber-400 font-medium relative z-10">{classData.className} — {classData.batchName}</p>
            </div>
            
            <div className="p-8 md:p-10">
              <div className="bg-sky-50 rounded-2xl p-8 mb-10 text-center border border-sky-100 shadow-inner">
                <a href={classData.zoomLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-sky-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-sky-700 transition-colors w-full md:w-auto justify-center mb-6 shadow-lg shadow-sky-600/30 hover:-translate-y-1 transform duration-200">
                  <Video size={24} /> Join Live Zoom Session
                </a>
                <p className="text-sky-900 text-lg">Meeting Passcode: <strong className="passcode-box font-mono bg-white px-4 py-2 rounded-lg shadow-sm border border-sky-200 ml-2">{classData.passcode}</strong></p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-serif border-b pb-4 mb-6"><Calendar size={20} className="text-amber-500" /> Upcoming Schedule</h3>
                  <ul className="space-y-4">
                    {classData.sessions?.length > 0 ? classData.sessions.map((session, idx) => (
                      <li key={idx} className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                        <p className="font-bold text-slate-900">{new Date(session.session_date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                        <p className="text-sm text-slate-600 mt-1">{session.session_time} • {session.topic}</p>
                      </li>
                    )) : <p className="text-slate-500 italic">No upcoming sessions scheduled.</p>}
                  </ul>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-xl font-serif border-b pb-4 mb-6"><PlayCircle size={20} className="text-amber-500" /> Class Recordings</h3>
                  <ul className="space-y-4">
                    {classData.recordings?.length > 0 ? classData.recordings.map((rec, idx) => (
                      <li key={idx}>
                        <a href={rec.link} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-700 hover:text-slate-900 transition-colors p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200">
                          <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0">
                            <PlayCircle size={20} />
                          </div>
                          <div>
                            <p className="font-bold">{rec.title}</p>
                            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">{new Date(rec.session_date).toLocaleDateString()}</p>
                          </div>
                        </a>
                      </li>
                    )) : <p className="text-slate-500 italic">Recordings will appear here after class.</p>}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}