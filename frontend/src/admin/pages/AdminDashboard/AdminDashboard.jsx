import { useState, useEffect } from 'react';
import { getApplications } from '../../services/adminApi';
import { FileText, Users, Clock, CheckCircle2, XCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [recentApps, setRecentApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getApplications({});
        const apps = data.data || data;
        
        setStats({
          total: apps.length,
          pending: apps.filter(a => a.status === 'Pending').length,
          approved: apps.filter(a => a.status === 'Approved').length,
          rejected: apps.filter(a => a.status === 'Rejected').length,
        });
        setRecentApps(apps.slice(0, 5));
      } catch (err) {
        console.error("Error loading dashboard metrics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8 text-stone-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-2">Overview</span>
          <h1 className="text-3xl font-serif text-stone-100">Academy Command Center</h1>
        </div>
        <Link 
          to="/admin/applications"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#d4af37] text-stone-950 font-medium text-[10px] uppercase tracking-[0.2em] hover:bg-[#ebd083] transition-colors shadow-lg"
        >
          View All Applications <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#121212] border border-stone-800 p-6 rounded-xl shadow-xl">
          <div className="flex items-center justify-between text-stone-400 mb-4">
            <span className="text-[10px] uppercase tracking-[0.2em]">Total Applications</span>
            <FileText size={18} className="text-[#d4af37]" />
          </div>
          <p className="text-3xl font-serif text-stone-100">{loading ? "..." : stats.total}</p>
        </div>

        <div className="bg-[#121212] border border-stone-800 p-6 rounded-xl shadow-xl">
          <div className="flex items-center justify-between text-stone-400 mb-4">
            <span className="text-[10px] uppercase tracking-[0.2em]">Pending Review</span>
            <Clock size={18} className="text-amber-400" />
          </div>
          <p className="text-3xl font-serif text-stone-100">{loading ? "..." : stats.pending}</p>
        </div>

        <div className="bg-[#121212] border border-stone-800 p-6 rounded-xl shadow-xl">
          <div className="flex items-center justify-between text-stone-400 mb-4">
            <span className="text-[10px] uppercase tracking-[0.2em]">Approved</span>
            <CheckCircle2 size={18} className="text-emerald-400" />
          </div>
          <p className="text-3xl font-serif text-stone-100">{loading ? "..." : stats.approved}</p>
        </div>

        <div className="bg-[#121212] border border-stone-800 p-6 rounded-xl shadow-xl">
          <div className="flex items-center justify-between text-stone-400 mb-4">
            <span className="text-[10px] uppercase tracking-[0.2em]">Rejected</span>
            <XCircle size={18} className="text-rose-400" />
          </div>
          <p className="text-3xl font-serif text-stone-100">{loading ? "..." : stats.rejected}</p>
        </div>
      </div>

      {/* Recent Submissions Table */}
      <div className="bg-[#121212] border border-stone-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-stone-800 flex justify-between items-center">
          <h2 className="text-lg font-serif text-stone-100">Recent Submissions</h2>
          <Link to="/admin/applications" className="text-xs text-[#d4af37] hover:underline uppercase tracking-wider">See all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-[#0a0a0a] text-stone-400 uppercase tracking-[0.2em] border-b border-stone-800">
              <tr>
                <th className="p-4 font-medium">Ref ID</th>
                <th className="p-4 font-medium">Applicant</th>
                <th className="p-4 font-medium">Course</th>
                <th className="p-4 font-medium">Submitted</th>
                <th className="p-4 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {loading ? (
                <tr><td colSpan="5" className="p-8 text-center text-stone-500">Loading recent entries...</td></tr>
              ) : recentApps.length === 0 ? (
                <tr><td colSpan="5" className="p-8 text-center text-stone-500">No applications found.</td></tr>
              ) : (
                recentApps.map(app => (
                  <tr key={app.id} className="hover:bg-stone-900/60 transition-colors">
                    <td className="p-4 font-mono text-[#d4af37]">{app.application_ref}</td>
                    <td className="p-4 text-stone-200 font-medium">{app.first_name} {app.last_name}</td>
                    <td className="p-4 text-stone-300">{app.course_name}</td>
                    <td className="p-4 text-stone-400 font-light">{new Date(app.submitted_at).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-medium border uppercase tracking-wider bg-stone-900 border-stone-800 text-stone-300">
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}