import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, BookOpen, AlertCircle, Clock, FileEdit, Users, Check, X } from 'lucide-react';
import { getApplicationDetails, updateApplicationStatus, addAdminNote } from '../../services/adminApi';

export default function AdminRegistrationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');

  const fetchData = async () => {
    try {
      const result = await getApplicationDetails(id);
      setData(result);
    } catch (error) {
      console.error("Error fetching application details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    let reason = '';
    if (newStatus === 'Rejected') {
      reason = window.prompt("Please provide a reason for rejection:");
      if (reason === null) return;
    }
    await updateApplicationStatus(id, newStatus, reason);
    fetchData();
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    await addAdminNote(id, newNote);
    setNewNote('');
    fetchData();
  };

  if (loading) return <div className="p-12 text-center text-stone-500">Loading application details...</div>;
  if (!data) return <div className="p-12 text-center text-rose-400">Application not found.</div>;

  const { application, notes, history = [] } = data;

  const getStatusBadge = (status) => {
    const styles = {
      Pending: "bg-amber-500/10 border-amber-500/30 text-amber-400",
      "Under Review": "bg-sky-500/10 border-sky-500/30 text-sky-400",
      Approved: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      Rejected: "bg-rose-500/10 border-rose-500/30 text-rose-400"
    };
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border uppercase tracking-wider ${styles[status] || styles.Pending}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8 text-stone-200">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 hover:text-[#d4af37] transition-colors">
        <ArrowLeft size={14} /> Back to Applications
      </button>

      {/* Header Card */}
      <div className="bg-[#121212] border border-stone-800 rounded-xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-1">Application Reference</span>
          <h1 className="text-3xl font-serif text-stone-100">{application.application_ref}</h1>
          <p className="text-sm text-stone-400 mt-1">Applicant: <strong className="text-stone-200">{application.first_name} {application.last_name}</strong></p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div>{getStatusBadge(application.status)}</div>
          <div className="flex flex-wrap gap-2">
             <button onClick={() => handleStatusChange('Under Review')} className="px-3 py-1.5 bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500 hover:text-stone-950 transition rounded text-[10px] uppercase tracking-wider font-medium">Review</button>
             <button onClick={() => handleStatusChange('Approved')} className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-stone-950 transition rounded text-[10px] uppercase tracking-wider font-medium flex items-center gap-1"><Check size={12}/> Approve</button>
             <button onClick={() => handleStatusChange('Rejected')} className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-stone-100 transition rounded text-[10px] uppercase tracking-wider font-medium flex items-center gap-1"><X size={12}/> Reject</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns: Core Data */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-[#121212] border border-stone-800 rounded-xl p-8">
            <h2 className="flex items-center gap-2.5 text-lg font-serif text-stone-100 mb-6 border-b border-stone-800 pb-4">
              <User size={18} className="text-[#d4af37]" /> Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 text-xs">
              <div><span className="text-stone-500 uppercase tracking-wider block mb-1">Full Name</span> {application.first_name} {application.last_name}</div>
              <div><span className="text-stone-500 uppercase tracking-wider block mb-1">DOB & Age</span> {new Date(application.dob).toLocaleDateString()} ({application.age} years)</div>
              <div><span className="text-stone-500 uppercase tracking-wider block mb-1">Gender</span> {application.gender || 'N/A'}</div>
              <div><span className="text-stone-500 uppercase tracking-wider block mb-1">NIC / Passport</span> {application.nic_passport || 'N/A'}</div>
              <div><span className="text-stone-500 uppercase tracking-wider block mb-1">Email Address</span> {application.email}</div>
              <div><span className="text-stone-500 uppercase tracking-wider block mb-1">Mobile / WhatsApp</span> {application.mobile_number} / {application.whatsapp_number || 'N/A'}</div>
              <div className="md:col-span-2"><span className="text-stone-500 uppercase tracking-wider block mb-1">Residential Address</span> {application.address}, {application.city}</div>
            </div>
          </section>

          <section className="bg-[#121212] border border-stone-800 rounded-xl p-8">
            <h2 className="flex items-center gap-2.5 text-lg font-serif text-stone-100 mb-6 border-b border-stone-800 pb-4">
              <BookOpen size={18} className="text-[#d4af37]" /> Course Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 text-xs">
              <div><span className="text-stone-500 uppercase tracking-wider block mb-1">Academy Category</span> {application.academy_category}</div>
              <div><span className="text-stone-500 uppercase tracking-wider block mb-1">Course Name</span> {application.course_name}</div>
            </div>
          </section>

          {application.age < 18 && (
            <section className="bg-[#121212] border border-stone-800 rounded-xl p-8">
              <h2 className="flex items-center gap-2.5 text-lg font-serif text-stone-100 mb-6 border-b border-stone-800 pb-4 text-amber-300">
                <Users size={18} /> Parent / Guardian Information (Under 18 Applicant)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 text-xs">
                <div><span className="text-stone-500 uppercase tracking-wider block mb-1">Guardian Name</span> {application.parent_name}</div>
                <div><span className="text-stone-500 uppercase tracking-wider block mb-1">Relationship</span> {application.parent_relationship}</div>
                <div><span className="text-stone-500 uppercase tracking-wider block mb-1">Contact Number</span> {application.parent_contact}</div>
                <div><span className="text-stone-500 uppercase tracking-wider block mb-1">Email</span> {application.parent_email || 'N/A'}</div>
              </div>
            </section>
          )}

          <section className="bg-[#121212] border border-stone-800 rounded-xl p-8">
            <h2 className="flex items-center gap-2.5 text-lg font-serif text-stone-100 mb-6 border-b border-stone-800 pb-4">
              <AlertCircle size={18} className="text-[#d4af37]" /> Additional Information
            </h2>
            <div className="space-y-4 text-xs">
              <div><span className="text-stone-500 uppercase tracking-wider block mb-1">Emergency Contact</span> {application.emergency_contact || 'None reported'}</div>
              <div><span className="text-stone-500 uppercase tracking-wider block mb-1">Medical Conditions</span> {application.medical_conditions || 'None reported'}</div>
              <div><span className="text-stone-500 uppercase tracking-wider block mb-1">Previous Experience</span> {application.previous_experience || 'None reported'}</div>
            </div>
          </section>
        </div>

        {/* Right Column: Status History & Admin Notes */}
        <div className="space-y-6">
          <section className="bg-[#121212] border border-stone-800 rounded-xl p-8">
            <h2 className="flex items-center gap-2 text-base font-serif text-stone-100 mb-4">
              <Clock size={16} className="text-[#d4af37]" /> Status History
            </h2>
            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-2">
              {history.length === 0 ? (
                <p className="text-xs text-stone-500 italic">No status updates logged yet.</p>
              ) : (
                history.map((hist, i) => (
                  <div key={i} className="bg-stone-900/80 p-3 rounded border border-stone-800 text-xs">
                    <p className="font-medium text-stone-200">Status: {hist.to_status}</p>
                    {hist.reason && <p className="text-[11px] text-rose-400 mt-1">Reason: {hist.reason}</p>}
                    <p className="text-[10px] text-stone-500 mt-1 text-right">{new Date(hist.changed_at).toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="bg-[#121212] border border-stone-800 rounded-xl p-8">
            <h2 className="flex items-center gap-2 text-base font-serif text-stone-100 mb-4">
              <FileEdit size={16} className="text-[#d4af37]" /> Admin Notes
            </h2>
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2">
              {notes.length === 0 ? (
                <p className="text-xs text-stone-500 italic">No internal notes added yet.</p>
              ) : (
                notes.map(note => (
                  <div key={note.id} className="bg-stone-900/80 p-3.5 rounded border border-stone-800 text-xs">
                    <p className="text-stone-300 leading-relaxed">{note.note}</p>
                    <p className="text-[10px] text-stone-500 mt-2 text-right">{new Date(note.created_at).toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>
            <form onSubmit={handleAddNote} className="border-t border-stone-800 pt-4">
              <textarea 
                value={newNote} 
                onChange={e => setNewNote(e.target.value)}
                placeholder="Add confidential admin note..." 
                className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-xs text-stone-200 mb-3 focus:outline-none focus:border-[#d4af37]"
                rows="3"
              />
              <button type="submit" disabled={!newNote.trim()} className="w-full bg-[#d4af37] text-stone-950 py-2.5 rounded text-[10px] uppercase tracking-wider font-medium hover:bg-[#ebd083] transition disabled:opacity-50">
                Save Note
              </button>
            </form>
          </section>
        </div>

      </div>
    </div>
  );
}