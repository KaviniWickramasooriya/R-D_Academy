import React, { useState } from 'react';
import { FiSearch, FiUser, FiBookOpen, FiMail, FiPhone, FiFilter } from 'react-icons/fi';

export default function AdminStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('all');

  // Sample placeholder records (Replace or connect with your backend API later)
  const [students] = useState([
    { id: 1, name: 'Amara Perera', email: 'amara.p@gmail.com', phone: '+94 77 123 4567', academy: 'Drawing Academy', batch: 'Batch 01 (Weekend)' },
    { id: 2, name: 'Nuwan Silva', email: 'nuwan.s@yahoo.com', phone: '+94 71 987 6543', academy: 'Vocal Academy', batch: 'Batch 02 (Evening)' },
    { id: 3, name: 'Dilini Fernando', email: 'dilini.f@gmail.com', phone: '+94 70 456 7890', academy: 'Drawing Academy', batch: 'Batch 01 (Weekend)' },
  ]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = selectedBatch === 'all' || student.batch.includes(selectedBatch);
    return matchesSearch && matchesBatch;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-100">Students & Batches</h1>
          <p className="text-sm text-stone-400 mt-1">Manage active student rosters, batches, and enrollment logs.</p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-stone-900 border border-stone-800 p-4 rounded-xl shadow-lg">
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-10 pr-4 py-2 text-stone-200 text-sm focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <FiFilter className="text-stone-400" />
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="w-full md:w-auto bg-stone-950 border border-stone-800 rounded-lg px-4 py-2 text-stone-200 text-sm focus:outline-none focus:border-[#d4af37]"
          >
            <option value="all">All Batches</option>
            <option value="Batch 01">Batch 01</option>
            <option value="Batch 02">Batch 02</option>
          </select>
        </div>
      </div>

      {/* Students Data Grid/Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-800 bg-stone-950 text-stone-400 text-xs uppercase tracking-wider">
                <th className="py-4 px-6">Student Name</th>
                <th className="py-4 px-6">Academy</th>
                <th className="py-4 px-6">Batch Assignment</th>
                <th className="py-4 px-6">Contact Info</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800 text-sm text-stone-300">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-stone-850/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-stone-100 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-[#d4af37] font-bold text-xs border border-stone-700">
                        {student.name.charAt(0)}
                      </div>
                      {student.name}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-800 text-stone-300 border border-stone-700">
                        <FiBookOpen className="text-[#d4af37]" />
                        {student.academy}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-stone-400">{student.batch}</td>
                    <td className="py-4 px-6 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-stone-400">
                        <FiMail className="text-stone-500" /> {student.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-stone-400">
                        <FiPhone className="text-stone-500" /> {student.phone}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-stone-500">
                    No students found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}