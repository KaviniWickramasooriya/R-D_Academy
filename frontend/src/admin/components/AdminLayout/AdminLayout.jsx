import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 flex flex-col md:flex-row selection:bg-[#d4af37] selection:text-stone-900">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-64">
        <Topbar />
        <main className="flex-1 p-8 max-w-[1400px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}