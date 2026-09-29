import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import axios from "axios";

const CATEGORIES = [
  "Drawing Academy & Studio",
  "Rising Voices Academy",
  "Therapeutic & Creative Activities"
];

const COURSES_BY_CATEGORY = {
  "Drawing Academy & Studio": [
    "Beginner Drawing",
    "Graphite - Portrait & Live Drawing",
    "Charcoal",
    "General Painting Course",
    "Advanced Painting",
    "Pre-Beginner Art",
    "Kids Drawing Course"
  ],
  "Rising Voices Academy": [
    "Adult Vocal Program",
    "Kids Vocal Program"
  ],
  "Therapeutic & Creative Activities": [
    "Yoga Classes"
  ]
};

export default function AdminRegistrationModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    academyCategory: "Drawing Academy & Studio",
    courseName: "Beginner Drawing",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    nic: "",
    email: "",
    mobile: "",
    whatsapp: "",
    address: "",
    city: "",
    schoolEducation: "",
    guardianName: "",
    guardianRelation: "Father",
    guardianContact: "",
    guardianEmail: "",
    guardianAddress: "",
    emergencyContact: "",
    medicalConditions: "",
    previousExperience: ""
  });

  const [age, setAge] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge);
    } else {
      setAge(null);
    }
  }, [formData.dob]);

  const requiresGuardian = age !== null && age < 18;

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "academyCategory") {
      const availableCourses = COURSES_BY_CATEGORY[value] || [];
      setFormData({
        ...formData,
        academyCategory: value,
        courseName: availableCourses[0] || ""
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const token = localStorage.getItem("adminToken");

      await axios.post(`${apiUrl}/applications`, {
        academy_category: formData.academyCategory,
        course_name: formData.courseName,
        first_name: formData.firstName,
        last_name: formData.lastName,
        dob: formData.dob,
        age: age || 0,
        gender: formData.gender,
        nic_passport: formData.nic,
        email: formData.email,
        mobile_number: formData.mobile,
        whatsapp_number: formData.whatsapp,
        address: formData.address,
        city: formData.city,
        school_education: formData.schoolEducation,
        parent_name: requiresGuardian ? formData.guardianName : null,
        parent_relationship: requiresGuardian ? formData.guardianRelation : null,
        parent_contact: requiresGuardian ? formData.guardianContact : null,
        parent_email: requiresGuardian ? formData.guardianEmail : null,
        parent_address: requiresGuardian ? formData.guardianAddress : null,
        emergency_contact: formData.emergencyContact,
        medical_conditions: formData.medicalConditions,
        previous_experience: formData.previousExperience
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#121212] border border-stone-800 rounded-xl max-w-2xl w-full p-8 shadow-2xl my-8 relative">
        
        <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
          <div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4af37]">Administrative Entry</span>
            <h2 className="text-xl font-serif text-stone-100">Register New Student Application</h2>
          </div>
          <button type="button" onClick={onClose} className="text-stone-400 hover:text-stone-100 transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-2">Select Academy Category *</label>
            <select
              name="academyCategory"
              value={formData.academyCategory}
              onChange={handleChange}
              required
              className="w-full bg-[#0a0a0a] border border-stone-800 text-stone-200 p-3 text-xs focus:outline-none focus:border-[#d4af37]"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-2">Select Course *</label>
            <select
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              required
              className="w-full bg-[#0a0a0a] border border-stone-800 text-stone-200 p-3 text-xs focus:outline-none focus:border-[#d4af37]"
            >
              {(COURSES_BY_CATEGORY[formData.academyCategory] || []).map(cName => (
                <option key={cName} value={cName}>{cName}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-2">First Name *</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full bg-[#0a0a0a] border border-stone-800 p-3 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37]" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-2">Last Name *</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full bg-[#0a0a0a] border border-stone-800 p-3 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-2">Date of Birth *</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="w-full bg-[#0a0a0a] border border-stone-800 p-3 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37] [color-scheme:dark]" />
              {age !== null && <span className="text-[10px] text-[#d4af37] mt-1 block">Calculated Age: {age} yrs</span>}
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-2">Gender *</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full bg-[#0a0a0a] border border-stone-800 p-3 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37]">
                <option value="">Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-2">Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-[#0a0a0a] border border-stone-800 p-3 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37]" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-2">Mobile Number *</label>
              <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required className="w-full bg-[#0a0a0a] border border-stone-800 p-3 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-2">Address *</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full bg-[#0a0a0a] border border-stone-800 p-3 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37]" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-2">City *</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full bg-[#0a0a0a] border border-stone-800 p-3 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37]" />
            </div>
          </div>

          {requiresGuardian && (
            <div className="p-4 bg-stone-900/80 border border-amber-500/30 rounded-lg space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400">Parent / Guardian Information (Required Under 18)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Guardian Full Name *" name="guardianName" value={formData.guardianName} onChange={handleChange} required className="bg-[#0a0a0a] border border-stone-800 p-3 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37]" />
                <input type="text" placeholder="Guardian Contact *" name="guardianContact" value={formData.guardianContact} onChange={handleChange} required className="bg-[#0a0a0a] border border-stone-800 p-3 text-xs text-stone-200 focus:outline-none focus:border-[#d4af37]" />
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-800">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-stone-700 text-stone-300 text-xs uppercase tracking-wider hover:bg-stone-800 transition">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-[#d4af37] text-stone-950 font-medium text-xs uppercase tracking-wider hover:bg-[#ebd083] transition disabled:opacity-50">
              {isSubmitting ? "Creating..." : "Submit Application"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}