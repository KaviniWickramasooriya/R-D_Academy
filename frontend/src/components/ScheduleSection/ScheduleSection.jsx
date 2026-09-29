import { useEffect, useState } from 'react';
import { getSchedule } from '../../services/classesApi';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const asDate = (d) => new Date(d + 'T00:00:00');
const monthLabel = (d) => asDate(d).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
const dayLabel = (d) => asDate(d).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

export function SessionList({ sessions }) {
  const months = {};
  sessions.forEach((s) => {
    const key = monthLabel(s.date);
    if (!months[key]) months[key] = [];
    months[key].push(s);
  });

  return (
    <div className="space-y-8">
      {Object.entries(months).map(([month, items]) => (
        <div key={month} className="space-y-4">
          <h3 className="text-xl font-serif text-[#d4af37] border-b border-stone-800 pb-2">{month}</h3>
          <div className="space-y-3">
            {items.map((s, i) => (
              <motion.div 
                key={s.date + s.time + i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`p-5 bg-[#121212] border border-stone-800 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-[#d4af37]/40 ${s.status === 'Cancelled' ? 'opacity-50 line-through' : ''}`}
              >
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#d4af37] mb-1">
                    <Calendar size={13} /> {dayLabel(s.date)} · {s.time}
                  </div>
                  <h4 className="text-lg font-serif text-stone-100">{s.className}</h4>
                  {s.topic && <p className="text-xs text-stone-400 font-light mt-1">Topic: {s.topic}</p>}
                </div>
                <div className="flex items-center gap-3">
                  {s.status !== 'Scheduled' && (
                    <span className="px-3 py-1 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] uppercase tracking-wider rounded-full">
                      {s.status}
                    </span>
                  )}
                  {s.note && <em className="text-amber-400 text-xs italic">{s.note}</em>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ScheduleSection() {
  const [sessions, setSessions] = useState(null);
  const [failed, setFailed] = useState(false);
  const [cls, setCls] = useState('all');

  useEffect(() => {
    getSchedule()
      .then((res) => setSessions(res.sessions))
      .catch(() => setFailed(true));
  }, []);

  if (failed) return <p className="text-rose-400 text-xs text-center py-8">The schedule could not be loaded. Please message us on WhatsApp.</p>;
  if (!sessions) return <p className="text-stone-500 text-xs text-center py-8 font-mono">Loading upcoming schedule...</p>;

  const names = [...new Set(sessions.map((s) => s.className))];
  const shown = cls === 'all' ? sessions : sessions.filter((s) => s.className === cls);

  return (
    <section className="py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-2 font-mono">Timetable</span>
          <h2 className="text-4xl font-serif text-stone-100">Live Class Schedule</h2>
        </div>
        <select 
          value={cls} 
          onChange={(e) => setCls(e.target.value)} 
          className="bg-[#121212] border border-stone-800 text-stone-300 px-4 py-3 text-xs focus:outline-none focus:border-[#d4af37] rounded-lg"
        >
          <option value="all">All Classes</option>
          {names.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      
      {shown.length === 0 ? (
        <p className="text-stone-500 text-xs italic text-center py-12">No upcoming sessions scheduled for this category currently.</p>
      ) : (
        <SessionList sessions={shown} />
      )}
      
      <p className="text-stone-500 text-[10px] uppercase tracking-wider mt-6 font-mono text-center">
        * All times are displayed in Sri Lanka local time (Asia/Colombo).
      </p>
    </section>
  );
}