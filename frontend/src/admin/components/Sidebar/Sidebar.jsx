import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem("adminUser") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Applications', path: '/admin/applications', icon: <FileText size={18} /> },
    { name: 'Students & Batches', path: '/admin/students', icon: <Users size={18} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
  ];

  return (
    <aside className="w-full md:w-64 bg-[#0c0c0c] border-r border-stone-800/80 flex flex-col fixed inset-y-0 left-0 z-30 select-none">
      
      {/* Brand Header */}
      <div className="p-8 border-b border-stone-800/80">
        <h2 className="font-serif text-xl tracking-wider text-stone-100">R & D Studio</h2>
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4af37] block mt-1">Admin Portal</span>
        <p className="text-[11px] text-stone-500 font-light mt-3 truncate">
          {adminData.name || "Master Administrator"}
        </p>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        <span className="px-4 text-[9px] uppercase tracking-[0.25em] text-stone-600 block mb-3 font-medium">Menu</span>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3 rounded-lg text-xs uppercase tracking-wider transition-all duration-200 ${
                isActive 
                  ? 'bg-[#d4af37] text-stone-950 font-medium shadow-lg shadow-[#d4af37]/10' 
                  : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900/60'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Sign Out Footer */}
      <div className="p-4 border-t border-stone-800/80 bg-stone-950/40">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-xs uppercase tracking-wider text-stone-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}