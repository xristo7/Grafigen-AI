import { useState, useEffect } from "react";
import { 
  Users as UsersIcon, 
  Search, 
  MoreHorizontal, 
  Shield, 
  Mail, 
  Calendar,
  CheckCircle2,
  XCircle,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('/api/auth')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch users", err);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight text-white">Identity Core</h1>
          <p className="text-zinc-500 font-medium">Manage access protocols and user permissions.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-500 h-12 px-6 rounded-xl font-black tracking-widest text-[10px] shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)]">
          <Plus className="w-4 h-4 mr-2" /> NEW USER
        </Button>
      </div>

      <div className="flex items-center gap-4 p-2 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Search users by name, email or role..." 
            className="bg-transparent border-0 h-12 pl-12 text-sm font-medium focus-visible:ring-0 text-white w-full" 
          />
        </div>
        <div className="hidden md:flex gap-2 pr-2">
          {["ALL", "ADMINS", "EDITORS"].map(f => (
            <div key={f} className={`px-4 py-2 rounded-xl border text-[10px] font-black tracking-widest transition-all cursor-pointer ${f === "ALL" ? "bg-zinc-800 text-white border-white/10" : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-200"}`}>{f}</div>
          ))}
        </div>
      </div>

      <Card className="bg-zinc-900/20 backdrop-blur-md border border-white/5 overflow-hidden rounded-2xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-zinc-950/30">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">User Identity</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Access Level</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Session Status</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Protocols Since</th>
                <th className="px-6 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-zinc-500 font-bold uppercase tracking-widest animate-pulse">Initializing Data Stream...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-zinc-500 font-bold uppercase tracking-widest">No matching entities found in core.</td>
                </tr>
              ) : filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 flex items-center justify-center font-black text-xs text-indigo-400 group-hover:border-indigo-500/50 transition-colors shadow-inner">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-white leading-tight tracking-tight">{user.name}</p>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Shield className={`w-3.5 h-3.5 ${user.role === 'admin' ? 'text-indigo-400' : 'text-zinc-500'}`} />
                      <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span className={`text-[10px] font-black tracking-widest uppercase text-emerald-400`}>
                        Active
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-tighter">
                      {new Date(user.last_login).toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-500 hover:text-white transition-all">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-zinc-950/30 border-t border-white/5 flex items-center justify-between">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Showing {filteredUsers.length} of {users.length} Entities</p>
          <div className="flex gap-2">
            <Button variant="ghost" disabled className="h-9 px-4 text-[10px] font-black text-zinc-600 rounded-xl uppercase tracking-widest">PREV</Button>
            <Button variant="ghost" className="h-9 px-4 text-[10px] font-black text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-xl uppercase tracking-widest">NEXT</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
