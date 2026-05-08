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
  BarChart3,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Users", path: "/admin/users", icon: <Users className="w-5 h-5" /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("admin_session");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex font-sans relative overflow-hidden">
      {/* --- BACKGROUND GRADIENT BLOBS --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-fuchsia-600 to-pink-500 opacity-[0.08] blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-[50%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tl from-amber-400 to-yellow-600 opacity-[0.06] blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-[10%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 opacity-[0.05] blur-[100px] mix-blend-screen"></div>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#09090b]/40 backdrop-blur-3xl border-r border-white/5 transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0`}>
        <div className="flex flex-col h-full relative z-10">
          <div className="p-6 h-20 flex items-center justify-between border-b border-white/5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight leading-none text-white">GRAFIGEN</span>
                <span className="text-[9px] font-black tracking-[0.2em] text-indigo-400 leading-none mt-1 uppercase">Studio</span>
              </div>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
                  location.pathname === item.path
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20"
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                }`}
              >
                {item.icon}
                <span className="font-bold text-sm tracking-tight">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-all font-black text-xs tracking-widest uppercase"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <header className="h-20 border-b border-white/5 bg-[#09090b]/20 backdrop-blur-xl flex items-center justify-between px-4 lg:px-8 shrink-0">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-zinc-400 hover:text-white p-2">
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-sm font-black text-white tracking-tight">Administrator</span>
              <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase">Super User</span>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
