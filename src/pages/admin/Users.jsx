import { useState } from "react";
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

const mockUsers = [
  { id: 1, name: "Administrator", email: "admin@grafigen.studio", role: "Super Admin", status: "Active", joined: "May 01, 2026" },
  { id: 2, name: "John Doe", email: "john@example.com", role: "Editor", status: "Active", joined: "May 03, 2026" },
  { id: 3, name: "Sarah Smith", email: "sarah@design.co", role: "Viewer", status: "Inactive", joined: "May 04, 2026" },
  { id: 4, name: "Michael Chen", email: "m.chen@studio.io", role: "Editor", status: "Active", joined: "May 05, 2026" },
  { id: 5, name: "Elena Rodriguez", email: "elena@agency.com", role: "Viewer", status: "Active", joined: "May 06, 2026" },
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight text-white">Identity Core</h1>
          <p className="text-slate-500 font-medium">Manage access protocols and user permissions.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-500 h-12 px-6 rounded-xl font-black tracking-widest text-xs">
          <Plus className="w-4 h-4 mr-2" /> NEW USER
        </Button>
      </div>

      <div className="flex items-center gap-4 p-2 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Search users by name, email or role..." 
            className="bg-transparent border-0 h-12 pl-12 text-sm focus-visible:ring-0 text-white w-full" 
          />
        </div>
        <div className="hidden md:flex gap-2 pr-2">
          <div className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-[10px] font-black text-slate-400 cursor-pointer hover:text-white transition-colors">ALL</div>
          <div className="px-4 py-2 rounded-xl bg-transparent border border-transparent text-[10px] font-black text-slate-500 cursor-pointer hover:text-white transition-colors">ADMINS</div>
          <div className="px-4 py-2 rounded-xl bg-transparent border border-transparent text-[10px] font-black text-slate-500 cursor-pointer hover:text-white transition-colors">EDITORS</div>
        </div>
      </div>

      <Card className="bg-slate-900 border-slate-800 overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/30">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">User Identity</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Access Level</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Session Status</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Protocols Since</th>
                <th className="px-6 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center font-black text-xs text-indigo-400 group-hover:border-indigo-500/50 transition-colors">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white leading-tight">{user.name}</p>
                        <p className="text-[11px] font-medium text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Shield className={`w-3 h-3 ${user.role === 'Super Admin' ? 'text-indigo-400' : 'text-slate-500'}`} />
                      <span className="text-xs font-bold text-slate-300">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      {user.status === 'Active' ? (
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`text-[10px] font-black tracking-widest uppercase ${user.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-medium text-slate-500">{user.joined}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-500 hover:text-white transition-all">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-950/30 border-t border-slate-800 flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Showing 5 of 1,284 Entities</p>
          <div className="flex gap-2">
            <Button variant="ghost" disabled className="h-8 px-3 text-[10px] font-black text-slate-500 rounded-lg">PREV</Button>
            <Button variant="ghost" className="h-8 px-3 text-[10px] font-black text-indigo-400 hover:text-indigo-300 rounded-lg">NEXT</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
