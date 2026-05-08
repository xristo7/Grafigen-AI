import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles, Lock, Mail, UserPlus, LogIn, ChevronRight, Facebook, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FloatingField = ({ icon: Icon, label, value, onChange, type = "text", placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="relative group/field">
      <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${isFocused || hasValue ? "scale-75 -translate-x-1" : ""}`}>
        <Icon className={`w-5 h-5 ${isFocused ? "text-indigo-400" : "text-zinc-600"}`} />
      </div>
      
      <label 
        className={`absolute transition-all duration-300 pointer-events-none z-10 uppercase font-black tracking-[0.2em]
          ${(isFocused || hasValue) 
            ? "text-[8px] top-2.5 left-14 text-indigo-400" 
            : "text-[10px] top-1/2 -translate-y-1/2 left-14 text-zinc-500"
          }`}
      >
        {label}
      </label>

      <input 
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused && !hasValue ? placeholder : ""}
        className={`w-full bg-zinc-950/60 border-zinc-800/80 h-16 pl-14 pr-6 pt-5 rounded-2xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-[15px] shadow-inner
          ${isFocused ? "border-indigo-500/50 bg-zinc-900" : "hover:border-zinc-700"}
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

  const savedConfig = JSON.parse(localStorage.getItem("grafigen_config") || "{}");
  const isGoogleEnabled = savedConfig.enableGoogle !== false;
  const isFacebookEnabled = savedConfig.enableFacebook !== false;

  useEffect(() => {
    setIsLogin(defaultMode === "login");
  }, [defaultMode, location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdmin) {
      const SUPER_ADMIN = { username: "admin", password: "Adromex@7" };
      if (isLogin) {
        if (email === SUPER_ADMIN.username && password === SUPER_ADMIN.password) {
          localStorage.setItem("admin_session", JSON.stringify({ email, name: "Super Admin", role: "admin" }));
          navigate("/admin");
        } else {
          alert("Invalid Admin credentials.");
        }
      }
    } else {
      localStorage.setItem("user_session", JSON.stringify({ email, name: name || "User", role: "user" }));
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-stretch font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      
      {/* --- BACKGROUND BLOBS --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/10 opacity-[0.2] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-amber-500/10 to-orange-600/5 opacity-[0.1] blur-[120px]" />
      </div>

      {/* Left Column: Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 z-10 bg-zinc-950/20 backdrop-blur-sm relative">
        <div className="w-full max-w-sm space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-6 lg:hidden">
              <Sparkles size={24} className="text-white" />
            </div>
            <h2 className="text-4xl font-black tracking-tight text-white leading-tight">
              {isLogin ? 'Welcome back to the Studio.' : 'Join the Creative Network.'}
            </h2>
            <p className="text-zinc-500 text-sm font-medium tracking-wide">
              {isLogin ? 'Access your pro tools and generation history.' : 'Initialize your professional account to begin.'}
            </p>
          </div>

          <div className="flex gap-2 p-1 bg-zinc-900/60 rounded-2xl border border-white/5 backdrop-blur-md">
            <button onClick={() => setIsLogin(true)} className={`flex-1 py-3 rounded-xl text-[10px] font-black tracking-[0.2em] transition-all uppercase ${isLogin ? "bg-indigo-600 text-white shadow-xl" : "text-zinc-500 hover:text-zinc-300"}`}>Initialize</button>
            <button onClick={() => setIsLogin(false)} className={`flex-1 py-3 rounded-xl text-[10px] font-black tracking-[0.2em] transition-all uppercase ${!isLogin ? "bg-indigo-600 text-white shadow-xl" : "text-zinc-500 hover:text-zinc-300"}`} disabled={isAdmin}>Register</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && !isAdmin && (
              <FloatingField 
                icon={UserPlus}
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: John Doe"
              />
            )}
            
            <FloatingField 
              icon={Mail}
              label={isAdmin ? "Security ID" : "Member Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isAdmin ? "admin" : "creative@grafigen.studio"}
            />

            <div className="space-y-2">
              <FloatingField 
                icon={Lock}
                label="Security Key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
              />
              {isLogin && (
                <div className="flex justify-end px-1">
                  <a href="#" className="text-[9px] font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest">Forgot Key?</a>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full h-16 bg-indigo-600 hover:bg-indigo-500 text-white font-black tracking-[0.2em] rounded-2xl shadow-2xl shadow-indigo-600/20 transition-all transform hover:-translate-y-1 active:translate-y-0 mt-6 uppercase text-xs">
              {isLogin ? 'Enter Studio' : 'Create Protocol'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {(isGoogleEnabled || isFacebookEnabled) && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">External Core</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {isFacebookEnabled && (
                  <button className="h-14 border border-white/5 bg-zinc-900/40 hover:bg-zinc-800/60 text-zinc-400 hover:text-white rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2">
                    <Facebook size={18} className="text-[#1877F2]" /> Facebook
                  </button>
                )}
                {isGoogleEnabled && (
                  <button className="h-14 border border-white/5 bg-zinc-900/40 hover:bg-zinc-800/60 text-zinc-400 hover:text-white rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-2.12 5.4-7.84 5.4-4.96 0-9-4.12-9-9.2s4.04-9.2 9-9.2c2.84 0 4.76 1.2 5.8 2.2l2.6-2.6C18.88 1.12 15.96 0 12.48 0 5.48 0 0 5.48 0 12.48s5.48 12.48 12.48 12.48c7.28 0 12.04-5.12 12.04-12.24 0-.84-.08-1.48-.24-2.16h-11.8z"/></svg>
                    Google
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Branding */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden bg-zinc-950 border-l border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative text-center z-10 space-y-8 animate-in fade-in zoom-in duration-1000">
          <div className="inline-flex w-28 h-28 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] items-center justify-center shadow-[0_20px_50px_-10px_rgba(99,102,241,0.5)] animate-bounce-subtle">
            <Sparkles className="text-white w-14 h-14" />
          </div>
          <div className="space-y-3">
            <h1 className="text-8xl font-black tracking-tighter text-white leading-none">GRAFIGEN</h1>
            <p className="text-indigo-400 font-bold tracking-[0.5em] text-xl uppercase">Studio</p>
          </div>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md">
            <CheckCircle2 size={16} className="text-indigo-400" />
            <span className="text-xs font-black tracking-widest text-indigo-200/60 uppercase">Professional Creative Network</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-subtle { animation: bounce-subtle 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
