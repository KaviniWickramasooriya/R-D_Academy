import { useState, useEffect } from 'react';
import { getApplications, updateApplicationStatus } from '../../services/adminApi';
import { Search, Check, X, ShieldAlert, Calendar, RotateCcw, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminRegistrationModal from '../../components/AdminRegistrationModal/AdminRegistrationModal';

export default function AdminRegistrations() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', status: '', category: '', date: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchApps = async () => {
    setLoading(true);
    try {
      const data = await getApplications(filters);
      setApplications(data.data || data); 
    } catch (error) {
      console.error("Failed to load applications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => fetchApps(), 300);
    return () => clearTimeout(timeoutId);
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({ search: '', status: '', category: '', date: '' });
  };

  const handleStatusChange = async (e, id, status) => {
    e.stopPropagation();
    let reason = '';
    if (status === 'Rejected') {
      reason = window.prompt("Enter rejection reason:");
      if (reason === null) return;
    }
    await updateApplicationStatus(id, status, reason);
    fetchApps();
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: "bg-amber-500/10 border-amber-500/30 text-amber-400",
      "Under Review": "bg-sky-500/10 border-sky-500/30 text-sky-400",
      Approved: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      Rejected: "bg-rose-500/10 border-rose-500/30 text-rose-400"
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium border uppercase tracking-wider ${styles[status] || styles.Pending}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-2">Management Portal</span>
          <h1 className="text-3xl font-serif text-stone-100">Student Applications</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-[#d4af37] text-stone-950 hover:bg-[#ebd083] transition rounded text-xs uppercase tracking-wider font-medium flex items-center gap-2 shadow-lg"
          >
            <Plus size={16} /> New Application
          </button>
          <div className="text-xs text-stone-400 font-mono hidden sm:block">
            Total: <strong className="text-[#d4af37]">{applications.length}</strong>
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-[#121212] border border-stone-800 p-6 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4 shadow-xl">
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-4 text-stone-500" />
          <input 
            type="text" 
            placeholder="Search name, email, ref..." 
            className="w-full bg-[#0a0a0a] border border-stone-800 text-stone-200 pl-11 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#d4af37]"
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
        </div>
        
        <select 
          value={filters.status} 
          onChange={(e) => setFilters({...filters, status: e.target.value})} 
          className="bg-[#0a0a0a] border border-stone-800 text-stone-300 px-4 py-2.5 text-xs focus:outline-none focus:border-[#d4af37]"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Under Review">Under Review</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <div className="relative flex items-center">
          <Calendar size={16} className="absolute left-4 text-stone-500" />
          <input 
            type="date"
            className="w-full bg-[#0a0a0a] border border-stone-800 text-stone-300 pl-11 pr-4 py-2 text-xs focus:outline-none focus:border-[#d4af37]"
            value={filters.date}
            onChange={(e) => setFilters({...filters, date: e.target.value})}
          />
        </div>

        <button
          onClick={handleResetFilters}
          className="py-2.5 border border-stone-800 hover:border-stone-600 text-stone-400 hover:text-stone-200 text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#121212] border border-stone-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#0a0a0a] text-stone-400 text-[10px] uppercase tracking-[0.2em] border-b border-stone-800">
              <tr>
                <th className="p-5 font-medium">Ref ID</th>
                <th className="p-5 font-medium">Applicant</th>
                <th className="p-5 font-medium">Course / Academy</th>
                <th className="p-5 font-medium">Age</th>
                <th className="p-5 font-medium">Submitted</th>
                <th className="p-5 font-medium">Status</th>
                <th className="p-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 text-xs">
              {loading ? (
                <tr><td colSpan="7" className="p-12 text-center text-stone-500">Loading records...</td></tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-16 text-center">
                    <ShieldAlert size={32} className="mx-auto text-stone-600 mb-3" />
                    <p className="text-stone-400 font-serif text-lg mb-1">No applications found</p>
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr 
                    key={app.id} 
                    onClick={() => navigate(`/admin/applications/${app.id}`)}
                    className="hover:bg-stone-900/60 transition-colors cursor-pointer group"
                  >
                    <td className="p-5 font-mono text-[#d4af37] font-medium">{app.application_ref}</td>
                    <td className="p-5">
                      <p className="font-medium text-stone-100 group-hover:text-[#d4af37] transition-colors">{app.first_name} {app.last_name}</p>
                      <p className="text-[11px] text-stone-500">{app.email}</p>
                    </td>
                    <td className="p-5">
                      <p className="text-stone-300">{app.course_name}</p>
                      <span className="text-[10px] text-[#d4af37] uppercase tracking-wider">{app.academy_category}</span>
                    </td>
                    <td className="p-5 text-stone-400">{app.age} yrs</td>
                    <td className="p-5 text-stone-400 font-light">
                      {new Date(app.submitted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="p-5">{getStatusBadge(app.status)}</td>
                    <td className="p-5 text-right" onClick={(e) => e.stopPropagation()}>
                      {app.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={(e) => handleStatusChange(e, app.id, 'Approved')} className="px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-stone-950 transition rounded text-[10px] uppercase tracking-wider font-medium flex items-center gap-1">
                            <Check size={12} /> Approve
                          </button>
                          <button onClick={(e) => handleStatusChange(e, app.id, 'Rejected')} className="px-3 py-1.5 bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-stone-100 transition rounded text-[10px] uppercase tracking-wider font-medium flex items-center gap-1">
                            <X size={12} /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-stone-500 text-[11px] uppercase tracking-widest font-mono">Processed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registration Modal */}
      <AdminRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchApps} 
      />
    </div>
  );
}