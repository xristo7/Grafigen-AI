import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles, Lock, Mail, UserPlus, LogIn, ChevronRight, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FloatingField = ({ icon: Icon, label, value, onChange, type = "text", placeholder, isAdmin }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="relative group/field">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${isFocused || hasValue ? "scale-75 -translate-x-1" : ""}`}>
        <Icon className={`w-5 h-5 ${isFocused ? "text-indigo-400" : "text-slate-600"}`} />
      </div>
      
      <label 
        className={`absolute transition-all duration-300 pointer-events-none z-10 uppercase font-black tracking-widest
          ${(isFocused || hasValue) 
            ? "text-[8px] top-2 right-4 text-indigo-400 translate-y-0" 
            : "text-[10px] top-1/2 -translate-y-1/2 left-12 text-slate-500"
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
        className={`bg-slate-950/50 border-slate-800 h-14 pl-12 pr-4 pt-4 rounded-2xl focus:ring-indigo-500/50 text-white transition-all
          ${isFocused ? "border-indigo-500/50 bg-slate-900" : "hover:border-slate-700"}
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
          alert("Invalid Admin credentials. Access Denied.");
        }
      } else {
        alert("Registration is disabled for administrative accounts.");
      }
    } else {
      localStorage.setItem("user_session", JSON.stringify({ email, name: name || "User", role: "user" }));
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-sans selection:bg-indigo-500/30">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl items-center justify-center shadow-2xl shadow-indigo-500/20 mb-6 animate-bounce-subtle">
            <Sparkles className="text-white w-8 h-8" />
          </div>
          <div className="flex flex-col items-center gap-1 mb-2">
            <h1 className="text-5xl font-black tracking-tighter text-white leading-none">GRAFIGEN</h1>
            <span className="text-indigo-400 font-bold tracking-[0.3em] text-xs uppercase">Studio</span>
          </div>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">
            {isAdmin ? "Administrative Access Protocol" : "Creative Member Access"}
          </p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 backdrop-blur-2xl p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
          
          <div className="flex gap-4 mb-10 p-1 bg-slate-950 rounded-2xl border border-slate-800">
            <button onClick={() => setIsLogin(true)} className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${isLogin ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"}`}>LOG IN</button>
            <button onClick={() => setIsLogin(false)} className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${!isLogin ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"}`} disabled={isAdmin}>REGISTER</button>
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
              label={isAdmin ? "Username / Email" : "Email Address"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isAdmin ? "admin" : "creative@grafigen.studio"}
            />

            <div className="space-y-1">
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

            <Button type="submit" className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 text-white font-black tracking-widest rounded-2xl shadow-xl shadow-indigo-600/20 transition-all group/btn mt-4">
              {isLogin ? 'INITIALIZE SESSION' : 'CREATE PROTOCOL'}
              <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </form>

          {(isGoogleEnabled || isFacebookEnabled) && (
            <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col gap-4">
              <p className="text-[9px] text-center font-black text-slate-600 uppercase tracking-widest">Or continue with external core</p>
              <div className="grid grid-cols-2 gap-4">
                {isFacebookEnabled && (
                  <Button variant="outline" className="h-12 border-slate-800 bg-transparent text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-bold text-xs">
                    <Facebook className="w-4 h-4 mr-2 text-[#1877F2]" /> Facebook
                  </Button>
                )}
                {isGoogleEnabled && (
                  <Button variant="outline" className="h-12 border-slate-800 bg-transparent text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-bold text-xs">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-2.12 5.4-7.84 5.4-4.96 0-9-4.12-9-9.2s4.04-9.2 9-9.2c2.84 0 4.76 1.2 5.8 2.2l2.6-2.6C18.88 1.12 15.96 0 12.48 0 5.48 0 0 5.48 0 12.48s5.48 12.48 12.48 12.48c7.28 0 12.04-5.12 12.04-12.24 0-.84-.08-1.48-.24-2.16h-11.8z"/></svg>
                    Google
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
        
        <p className="mt-8 text-center text-slate-600 text-[10px] font-bold uppercase tracking-widest">
          {isAdmin ? "Authorized Personnel Only. Session is Monitored." : "Join the Grafigen Creative Network."}
        </p>
      </div>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-subtle { animation: bounce-subtle 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
