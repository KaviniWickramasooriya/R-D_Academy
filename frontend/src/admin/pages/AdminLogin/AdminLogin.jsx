import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowLeft, AlertCircle } from "lucide-react";
import axios from "axios";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
      
      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("adminUser", JSON.stringify(response.data.admin));

      // Successfully authenticated admins now land directly on the dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 flex flex-col justify-between selection:bg-[#d4af37] selection:text-stone-900">
      
      {/* Top Bar */}
      <div className="max-w-[1400px] w-full mx-auto px-6 h-24 flex items-center justify-between">
        <Link to="/" className="flex flex-col group">
          <span className="font-serif text-2xl tracking-wider text-stone-100 group-hover:text-[#d4af37] transition-colors">
            R & D
          </span>
          <span className="text-[7px] uppercase tracking-[0.35em] text-[#d4af37]">
            Academy · Colombo
          </span>
        </Link>
        <Link to="/" className="text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-stone-100 transition-colors inline-flex items-center gap-2">
          <ArrowLeft size={14} /> Return to Website
        </Link>
      </div>

      {/* Main Login Box */}
      <main className="max-w-md w-full mx-auto px-6 py-0">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#121212] border border-stone-800 p-8 md:p-12 relative shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d4af37] to-transparent"></div>

          <div className="text-center mb-10">
            <div className="w-12 h-12 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full flex items-center justify-center mx-auto mb-4 text-[#d4af37]">
              <Lock size={20} />
            </div>
            <h1 className="text-3xl font-serif text-stone-100 mb-2">Admin Portal</h1>
            <p className="text-stone-500 text-xs tracking-wider uppercase">Restricted Management Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-2">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-stone-600" size={16} />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="w-full bg-[#0a0a0a] border border-stone-800 text-stone-200 pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                  placeholder="admin@randdartstudio.com"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 block mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-stone-600" size={16} />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="w-full bg-[#0a0a0a] border border-stone-800 text-stone-200 pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#d4af37] text-stone-950 font-medium text-[10px] uppercase tracking-[0.2em] hover:bg-[#ebd083] transition-colors shadow-lg disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Sign In to Dashboard"}
            </button>
          </form>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-[10px] text-stone-600 tracking-wider uppercase">
        © {new Date().getFullYear()} R & D Academy · Admin Secure Access
      </footer>

    </div>
  );
}