import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  CreditCard, 
  Zap, 
  ChevronLeft, 
  ShieldCheck, 
  History, 
  Star,
  CheckCircle2,
  Crown,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const session = localStorage.getItem("user_session");
    if (session) {
      setUser(JSON.parse(session));
    }
    
    // Initialize or load credits
    const savedCredits = localStorage.getItem("grafigen_credits");
    if (savedCredits === null) {
      localStorage.setItem("grafigen_credits", "10");
      setCredits(10);
    } else {
      setCredits(parseInt(savedCredits));
    }
  }, []);

  const pricingTiers = [
    {
      name: "Standard",
      credits: 50,
      price: "$9",
      features: ["50 AI Generations", "Basic Support", "Standard Speed"],
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      color: "from-amber-500/10 to-orange-500/10",
      border: "border-amber-500/20"
    },
    {
      name: "Premium",
      credits: 200,
      price: "$29",
      features: ["200 AI Generations", "Priority Support", "Fast Generation", "No Expiry"],
      icon: <Star className="w-5 h-5 text-indigo-500" />,
      color: "from-indigo-500/10 to-purple-500/10",
      border: "border-indigo-500/20",
      popular: true
    },
    {
      name: "Pro",
      credits: 1000,
      price: "$99",
      features: ["1000 AI Generations", "Dedicated Support", "Ultra-Fast Speed", "Early Access"],
      icon: <Crown className="w-5 h-5 text-purple-500" />,
      color: "from-purple-500/10 to-fuchsia-500/10",
      border: "border-purple-500/20"
    }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#060b18] text-slate-100 font-sans p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")} className="text-slate-400 hover:text-white group">
            <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> BACK TO STUDIO
          </Button>
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
            <CreditCard className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-black tracking-widest">{credits} CREDITS</span>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1">
              <div className="w-full h-full bg-slate-900 rounded-[1.4rem] flex items-center justify-center">
                <span className="text-4xl font-black text-white">{user.name.charAt(0)}</span>
              </div>
            </div>
            <div className="text-center md:text-left space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight">{user.name}</h1>
                <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-widest uppercase">
                  Verified Member
                </div>
              </div>
              <p className="text-slate-500 font-medium">{user.email}</p>
              <div className="flex items-center justify-center md:justify-start gap-6 pt-4">
                <div className="text-center md:text-left">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Account Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-bold text-slate-300">Active</span>
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div className="text-center md:text-left">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Member Since</p>
                  <span className="text-sm font-bold text-slate-300">May 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black tracking-tight">Refill Your Creative Energy</h2>
            <p className="text-slate-500 text-sm font-medium">Choose a credit package to continue generating premium prompts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <Card key={tier.name} className={`bg-slate-900/50 border-2 ${tier.popular ? 'border-indigo-600 shadow-2xl shadow-indigo-600/10' : 'border-slate-800'} rounded-[2rem] overflow-hidden relative group hover:scale-[1.02] transition-all duration-300`}>
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[9px] font-black px-4 py-1 rounded-bl-xl tracking-widest">MOST POPULAR</div>
                )}
                <CardContent className="p-8 space-y-8">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center border ${tier.border}`}>
                    {tier.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-widest">{tier.name}</h3>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-4xl font-black">{tier.price}</span>
                      <span className="text-slate-500 font-bold text-xs">/ {tier.credits} Credits</span>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-xs font-bold text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-indigo-500" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full h-14 rounded-2xl font-black tracking-widest ${tier.popular ? 'bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/20' : 'bg-slate-800 hover:bg-slate-700'}`}>
                    SELECT PACKAGE
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-indigo-600 rounded-[2rem] p-8 relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 opacity-20 group-hover:scale-110 transition-transform duration-700">
            <Sparkles className="w-48 h-48" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2">
              <h3 className="text-xl font-black text-white uppercase tracking-wider">Unlimited Potential</h3>
              <p className="text-white/70 text-sm font-medium">Credits are consumed only when a prompt is successfully generated.</p>
            </div>
            <Link to="/admin/settings">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-12 px-8 rounded-xl font-black text-xs tracking-widest uppercase">Manage Account</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
