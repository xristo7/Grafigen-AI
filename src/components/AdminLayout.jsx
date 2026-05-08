import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  ShieldCheck,
  Layout
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { name: "Users", path: "/admin/users", icon: <Users size={18} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={18} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("admin_session");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-zinc-100 font-sans overflow-hidden selection:bg-indigo-500/30 relative">
      
      {/* --- BACKGROUND BLOBS --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 opacity-[0.05] blur-[120px]" />
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-white/5 bg-[#09090b]/70 backdrop-blur-2xl flex flex-col transition-transform duration-300 md:translate-x-0 md:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 flex items-center px-6 gap-3 pt-12 md:pt-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight leading-tight">GRAFIGEN</h1>
            <p className="text-[10px] font-medium text-indigo-400 tracking-[0.2em] uppercase">Studio</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          <h2 className="px-3 text-xs font-semibold text-zinc-500 tracking-wider mb-3 uppercase">Administration</h2>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                location.pathname === item.path
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/20"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
              }`}
            >
              <div className={location.pathname === item.path ? "text-white" : "text-zinc-600"}>{item.icon}</div>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all font-bold text-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <header className="h-20 border-b border-white/5 bg-zinc-950/40 backdrop-blur-xl flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-zinc-400 hover:text-white">
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-indigo-400 bg-indigo-400/10 px-3 py-1.5 rounded-full border border-indigo-400/20 uppercase">
              <ShieldCheck size={14} className="mr-1" />
              Secure Admin Core
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-sm font-bold text-white">Super Admin</span>
              <span className="text-[10px] font-black tracking-widest text-zinc-600 uppercase">Authorized Access</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center shadow-inner">
              <ShieldCheck size={20} className="text-indigo-400" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(161, 161, 170, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(161, 161, 170, 0.2); }
      `}} />
    </div>
  );
}
