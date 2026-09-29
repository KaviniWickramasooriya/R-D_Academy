import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
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

export default function Register() {
  const [formData, setFormData] = useState({
    academyCategory: "Drawing Academy & Studio",
    courseName: "Advanced Painting",
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
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");
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

  const steps = [
    { id: "course", label: "COURSE" },
    { id: "personal", label: "PERSONAL" },
    ...(requiresGuardian ? [{ id: "guardian", label: "GUARDIAN" }] : []),
    { id: "additional", label: "ADDITIONAL" },
    { id: "review", label: "REVIEW" }
  ];

  const currentStep = steps[currentStepIndex] || steps[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "academyCategory") {
      // Reset courseName to the first available course in the new category
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

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await axios.post(`${apiUrl}/applications`, {
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
      });

      setRefNumber(response.data.application_ref || "RD-2026-PENDING");
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to submit application. Please verify your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-stone-200 font-sans selection:bg-[#d4af37] selection:text-stone-900 min-h-screen flex flex-col">
      <div className="flex-1 max-w-[1100px] w-full mx-auto px-6 py-12 md:py-20">
        
        {isSubmitted ? (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto py-16 text-center">
            <div className="w-16 h-16 bg-[#d4af37]/10 border border-[#d4af37]/40 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-[#d4af37]" size={30} />
            </div>
            <h2 className="text-3xl font-serif text-stone-100 mb-3">Application Submitted</h2>
            <p className="text-stone-400 text-xs leading-relaxed mb-8">
              Your application has been received and permanently stored for administrative review. No payment is required at this stage.
            </p>
            <div className="bg-[#141414] border border-stone-800 p-6 mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 block mb-2">Application Reference</span>
              <span className="text-2xl font-mono text-[#d4af37] tracking-widest">{refNumber}</span>
            </div>
            <Link to="/" className="text-xs uppercase tracking-[0.18em] text-stone-300 hover:text-[#d4af37] transition-colors inline-flex items-center gap-2">
              <ArrowLeft size={14} /> Return to Homepage
            </Link>
          </motion.div>
        ) : (
          <div>
            {/* Header Titles */}
            <div className="mb-10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-2">
                Apply Online · Free
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-stone-100 tracking-tight">
                Application form
              </h1>
            </div>

            {/* Stepper Tabs Bar */}
            <div className="grid grid-cols-4 md:grid-cols-5 gap-3 border-b border-stone-800/80 pb-3 mb-12">
              {steps.map((s, idx) => (
                <div key={s.id} className="flex flex-col">
                  <span className={`text-[10px] tracking-[0.16em] mb-2 font-medium ${idx === currentStepIndex ? "text-[#d4af37]" : "text-stone-600"}`}>
                    {s.label}
                  </span>
                  <div className={`h-[2px] w-full transition-all duration-300 ${idx <= currentStepIndex ? "bg-[#d4af37]" : "bg-stone-800"}`} />
                </div>
              ))}
            </div>

            {/* Steps Form */}
            <form onSubmit={currentStepIndex === steps.length - 1 ? handleSubmit : handleNext}>
              <AnimatePresence mode="wait">
                
                {/* STEP 1: COURSE */}
                {currentStep.id === "course" && (
                  <motion.div key="course" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <div>
                      <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-3">
                        Academy Category *
                      </label>
                      <select
                        name="academyCategory"
                        value={formData.academyCategory}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3.5 text-sm focus:outline-none focus:border-[#d4af37] transition-colors mb-6"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat} className="bg-[#121212]">
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-3">
                        Course *
                      </label>
                      <select
                        name="courseName"
                        value={formData.courseName}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3.5 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                      >
                        {(COURSES_BY_CATEGORY[formData.academyCategory] || []).map((cName) => (
                          <option key={cName} value={cName} className="bg-[#121212]">
                            {cName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: PERSONAL */}
                {currentStep.id === "personal" && (
                  <motion.div key="personal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">Date of Birth *</label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] [color-scheme:dark]"
                        />
                        {age !== null && (
                          <span className={`text-[11px] block mt-1.5 ${requiresGuardian ? "text-[#d4af37]" : "text-stone-500"}`}>
                            Age: {age} {requiresGuardian && "· guardian details required"}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">Gender *</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                        >
                          <option value="" disabled>Select</option>
                          <option value="Female" className="bg-[#121212]">Female</option>
                          <option value="Male" className="bg-[#121212]">Male</option>
                          <option value="Prefer not to say" className="bg-[#121212]">Prefer not to say</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">NIC / Passport</label>
                        <input
                          type="text"
                          name="nic"
                          value={formData.nic}
                          onChange={handleChange}
                          className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">Mobile *</label>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">WhatsApp *</label>
                        <input
                          type="tel"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">Address *</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">School / Education</label>
                      <input
                        type="text"
                        name="schoolEducation"
                        value={formData.schoolEducation}
                        onChange={handleChange}
                        className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: GUARDIAN */}
                {currentStep.id === "guardian" && (
                  <motion.div key="guardian" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">Guardian Full Name *</label>
                        <input
                          type="text"
                          name="guardianName"
                          value={formData.guardianName}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">Relationship *</label>
                        <select
                          name="guardianRelation"
                          value={formData.guardianRelation}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                        >
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Legal Guardian">Legal Guardian</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">Contact Number *</label>
                        <input
                          type="tel"
                          name="guardianContact"
                          value={formData.guardianContact}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">Email</label>
                        <input
                          type="email"
                          name="guardianEmail"
                          value={formData.guardianEmail}
                          onChange={handleChange}
                          className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">Address (If different)</label>
                      <input
                        type="text"
                        name="guardianAddress"
                        value={formData.guardianAddress}
                        onChange={handleChange}
                        className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: ADDITIONAL */}
                {currentStep.id === "additional" && (
                  <motion.div key="additional" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    <div>
                      <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">
                        Emergency Contact (Name & Number) *
                      </label>
                      <input
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">
                        Medical Conditions / Requirements
                      </label>
                      <textarea
                        name="medicalConditions"
                        value={formData.medicalConditions}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-[0.15em] text-stone-400 block mb-2">
                        Previous Experience
                      </label>
                      <textarea
                        name="previousExperience"
                        value={formData.previousExperience}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-[#121212] border border-stone-800 text-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: REVIEW */}
                {currentStep.id === "review" && (
                  <motion.div key="review" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                    <div className="border-t border-stone-800/80 divide-y divide-stone-800/60">
                      <div className="py-4 grid grid-cols-1 md:grid-cols-3">
                        <dt className="text-xs text-stone-400">Academy Category</dt>
                        <dd className="md:col-span-2 text-xs text-stone-200 font-medium">{formData.academyCategory}</dd>
                      </div>
                      <div className="py-4 grid grid-cols-1 md:grid-cols-3">
                        <dt className="text-xs text-stone-400">Course</dt>
                        <dd className="md:col-span-2 text-xs text-stone-200 font-medium">{formData.courseName}</dd>
                      </div>
                      <div className="py-4 grid grid-cols-1 md:grid-cols-3">
                        <dt className="text-xs text-stone-400">Name</dt>
                        <dd className="md:col-span-2 text-xs text-stone-200">{formData.firstName} {formData.lastName}</dd>
                      </div>
                      <div className="py-4 grid grid-cols-1 md:grid-cols-3">
                        <dt className="text-xs text-stone-400">Date of birth</dt>
                        <dd className="md:col-span-2 text-xs text-stone-200">{formData.dob} (age {age})</dd>
                      </div>
                      <div className="py-4 grid grid-cols-1 md:grid-cols-3">
                        <dt className="text-xs text-stone-400">Email</dt>
                        <dd className="md:col-span-2 text-xs text-stone-200">{formData.email}</dd>
                      </div>
                      <div className="py-4 grid grid-cols-1 md:grid-cols-3">
                        <dt className="text-xs text-stone-400">Mobile / WhatsApp</dt>
                        <dd className="md:col-span-2 text-xs text-stone-200">{formData.mobile} / {formData.whatsapp}</dd>
                      </div>
                      <div className="py-4 grid grid-cols-1 md:grid-cols-3">
                        <dt className="text-xs text-stone-400">Address</dt>
                        <dd className="md:col-span-2 text-xs text-stone-200">{formData.address}, {formData.city}</dd>
                      </div>
                      {requiresGuardian && (
                        <div className="py-4 grid grid-cols-1 md:grid-cols-3">
                          <dt className="text-xs text-stone-400">Guardian</dt>
                          <dd className="md:col-span-2 text-xs text-stone-200">{formData.guardianName} ({formData.guardianRelation}) {formData.guardianContact}</dd>
                        </div>
                      )}
                    </div>

                    {error && (
                      <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                        <AlertCircle size={14} /> {error}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-between pt-10 mt-6 border-t border-stone-800/80">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStepIndex === 0}
                  className={`px-6 py-2.5 text-xs tracking-wider transition-colors border ${
                    currentStepIndex === 0 ? "border-transparent text-stone-700 cursor-not-allowed" : "border-stone-800 text-stone-300 hover:border-stone-600"
                  }`}
                >
                  Back
                </button>

                {currentStepIndex === steps.length - 1 ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-[#d4af37] hover:bg-[#ebd083] text-stone-950 text-xs tracking-wider font-medium transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit application"}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#d4af37] hover:bg-[#ebd083] text-stone-950 text-xs tracking-wider font-medium transition-colors"
                  >
                    Continue
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}