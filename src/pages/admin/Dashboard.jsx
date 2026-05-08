import { useState, useEffect } from "react";
import { 
  BarChart3, 
  Users, 
  Sparkles, 
  Clock,
  TrendingUp,
  ArrowUpRight,
  Zap
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setUserCount(data.length);
          setRecentUsers(data.slice(0, 4));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Dashboard sync error", err);
        setLoading(false);
      });
  }, []);

  const stats = [
    { label: "Total Prompts", value: "1,284", icon: <Sparkles className="w-5 h-5 text-indigo-400" />, trend: "+12%" },
    { label: "Active Entities", value: loading ? "..." : userCount.toString(), icon: <Users className="w-5 h-5 text-purple-400" />, trend: "+100%" },
    { label: "Images Sync'd", value: "892", icon: <Zap className="w-5 h-5 text-amber-400" />, trend: "+18%" },
    { label: "Avg. Time", value: "45s", icon: <Clock className="w-5 h-5 text-green-400" />, trend: "-2s" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-white">System Dashboard</h1>
        <p className="text-slate-500 font-medium">Real-time overview of Grafigen Studio performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-slate-900 border-slate-800 p-6 rounded-2xl">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                {stat.icon}
              </div>
              <span className={`text-[10px] font-black tracking-widest px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">{stat.label}</p>
              <h2 className="text-2xl font-black text-white mt-1">{stat.value}</h2>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-slate-900 border-slate-800 p-8 rounded-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              <h3 className="font-black text-sm uppercase tracking-widest">Generation Activity</h3>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1 rounded-full bg-slate-800 text-[10px] font-black text-slate-400 border border-slate-700">7 Days</div>
              <div className="px-3 py-1 rounded-full bg-indigo-600 text-[10px] font-black text-white border border-indigo-500">30 Days</div>
            </div>
          </div>
          
          <div className="h-64 flex items-end gap-2 px-2">
            {[45, 60, 35, 75, 40, 90, 65, 80, 50, 70, 85, 55].map((val, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-indigo-600/20 to-indigo-500 rounded-t-lg transition-all hover:to-indigo-400" style={{ height: `${val}%` }} />
            ))}
          </div>
        </Card>

        <Card className="bg-slate-900 border-slate-800 p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <h3 className="font-black text-sm uppercase tracking-widest">Recent Access</h3>
          </div>
          <div className="space-y-6">
            {recentUsers.length === 0 ? (
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest text-center py-4">No recent activity detected.</p>
            ) : recentUsers.map((user, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-indigo-500/50 transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{user.name}</p>
                    <p className="text-[10px] font-medium text-slate-500">{user.role}</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-slate-600">
                  {new Date(user.last_login).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
