import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Sparkles, Lock, Mail, UserPlus, LogIn, ChevronRight, Facebook, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FloatingField = ({ icon: Icon, label, value, onChange, type = "text", placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="relative group/field">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${isFocused || hasValue ? "scale-75 -translate-x-1" : ""}`}>
        <Icon className={`w-5 h-5 ${isFocused ? "text-indigo-400" : "text-zinc-600"}`} />
      </div>
      
      <label 
        className={`absolute transition-all duration-300 pointer-events-none z-10 uppercase font-black tracking-widest
          ${(isFocused || hasValue) 
            ? "text-[9px] top-2 left-12 text-indigo-400" 
            : "text-[11px] top-1/2 -translate-y-1/2 left-12 text-zinc-500"
          }`}
      >
        {label}
      </label>

      <Input 
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused && !hasValue ? placeholder : ""}
        className={`bg-zinc-950/40 border-white/5 h-16 pl-12 pr-4 pt-5 rounded-2xl focus:ring-indigo-500/50 text-white transition-all text-[16px] font-medium shadow-inner
          ${isFocused ? "border-indigo-500/50 bg-zinc-900/60" : "hover:border-white/10"}
        `}
        required 
      />
    </div>
  );
};

export default function Login({ isAdmin = false, defaultMode = "login" }) {
  const [isLogin, setIsLogin] = useState(defaultMode === "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLogin(defaultMode === "login");
    
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if (Object.keys(data).length > 0) {
          localStorage.setItem("grafigen_config", JSON.stringify(data));
        }
      })
      .catch(err => console.error("Neon Config Sync Error:", err));
  }, [defaultMode, location.pathname]);

  const savedConfig = JSON.parse(localStorage.getItem("grafigen_config") || "{}");
  const isFacebookEnabled = savedConfig.enableFacebook !== false;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdmin) {
      const SUPER_ADMIN = { username: "admin", password: "Adromex@7" };
      if (isLogin) {
        if (email === SUPER_ADMIN.username && password === SUPER_ADMIN.password) {
          localStorage.setItem("admin_session", JSON.stringify({ email, name: "Super Admin", role: "admin" }));
          navigate("/admin");
        } else {
          alert("Invalid Admin credentials. Access Denied.");
        }
      } else {
        alert("Registration is disabled for administrative accounts.");
      }
    } else {
      const sessionData = { email, name: name || "User", role: "user" };
      
      fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData)
      }).catch(err => console.error("Failed to sync user to Neon", err));

      localStorage.setItem("user_session", JSON.stringify(sessionData));
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center font-sans selection:bg-indigo-500/30 overflow-hidden relative p-4 lg:p-8">
      
      {/* --- BACKGROUND GRADIENT BLOBS --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 opacity-[0.1] blur-[120px] animate-pulse"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tl from-fuchsia-600 to-pink-500 opacity-[0.08] blur-[120px]"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-tr from-amber-500 to-yellow-600 opacity-[0.05] blur-[120px]"></div>
      </div>

      <div className="w-full max-w-xl relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="flex flex-col items-center mb-10">
          <Link to="/" className="flex flex-col items-center group">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-500/20 mb-4 group-hover:scale-105 transition-transform duration-500">
              <Sparkles className="text-white w-8 h-8" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black tracking-tighter leading-none text-white uppercase">GRAFIGEN</span>
              <span className="text-[11px] font-black tracking-[0.4em] text-indigo-400 leading-none mt-2 uppercase">Studio</span>
            </div>
          </Link>
        </div>

        <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[40px] overflow-hidden shadow-2xl relative">
          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none"></div>
          
          <div className="p-8 lg:p-14 relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 backdrop-blur-md">
                {isAdmin ? <ShieldCheck className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight uppercase leading-none">
                  {isAdmin ? "Security Control Node" : (isLogin ? "Identity Handshake" : "Initialize Protocol")}
                </h2>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1.5">
                  {isAdmin ? "Superuser Authorization Required" : (isLogin ? "Access your creative workspace" : "Join the high-fidelity network")}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && !isAdmin && (
                <FloatingField icon={UserPlus} label="Protocol Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full identity identifier" />
              )}
              
              <FloatingField icon={Mail} label="Access Key (Email)" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="identity@grafigen.studio" />
              <FloatingField icon={Lock} label="Security Token" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" />

              <Button 
                type="submit" 
                className="w-full h-16 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] group mt-4"
              >
                {isAdmin ? "AUTHORIZE ACCESS" : (isLogin ? "INITIALIZE SESSION" : "ACTIVATE PROTOCOL")}
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            {!isAdmin && (
              <div className="mt-12 space-y-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/5"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                    <span className="bg-transparent px-4 text-zinc-600 backdrop-blur-md">Secure Gateway Tunnels</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {isFacebookEnabled && (
                    <Button variant="outline" className="h-14 border-white/5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black tracking-widest text-[10px] transition-all duration-300 uppercase shadow-inner">
                      <Facebook className="w-4 h-4 mr-3 text-[#1877F2]" />
                      Facebook Secure Auth
                    </Button>
                  )}
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="h-px w-12 bg-indigo-500/30"></div>
                  <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                    {isLogin ? "Need a core identity?" : "Already have protocol access?"}
                    <button 
                      onClick={() => setIsLogin(!isLogin)} 
                      className="ml-2 text-indigo-400 hover:text-indigo-300 underline underline-offset-4 decoration-2 transition-all hover:tracking-widest"
                    >
                      {isLogin ? "SIGN UP" : "LOG IN"}
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-x-12 gap-y-4 text-[10px] font-black text-zinc-700 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>Security Node: Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
            <span>AES-256 Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
            <span>Vercel Edge Gateway</span>
          </div>
        </div>
      </div>
    </div>
  );
}
