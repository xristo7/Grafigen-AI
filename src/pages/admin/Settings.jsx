import { useState, useEffect } from "react";
import { 
  Cloud, 
  Key, 
  Shield, 
  Globe, 
  Palette, 
  Save, 
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Facebook,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  const [isSaved, setIsSaved] = useState(false);
  const [config, setConfig] = useState({
    cloudName: "daou85ugm",
    apiKey: "512375417846848",
    apiSecret: "6yiO5YMeU9VefmDCO8mlAWiHctc",
    uploadPreset: "ml_default",
    siteTitle: "Grafigen Studio",
    primaryColor: "#6366f1",
    darkMode: true,
    enableGoogle: true,
    enableFacebook: true,
    googleClientId: "",
    facebookAppId: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("grafigen_config");
    if (saved) setConfig(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    localStorage.setItem("grafigen_config", JSON.stringify(config));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight text-white">System Configuration</h1>
          <p className="text-slate-500 font-medium">Manage global parameters and integration credentials.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-800 bg-transparent text-slate-400 hover:bg-slate-800 h-12 px-6 rounded-xl font-black tracking-widest text-xs">
            <RotateCcw className="w-4 h-4 mr-2" /> RESET
          </Button>
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-500 h-12 px-6 rounded-xl font-black tracking-widest text-xs shadow-lg shadow-indigo-600/20">
            {isSaved ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            {isSaved ? "SAVED" : "SAVE CHANGES"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Cloudinary Settings */}
          <Card className="bg-slate-900 border-slate-800 p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest text-white leading-tight">Cloudinary Integration</h3>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">Asset storage & optimization engine</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Cloud Name</label>
                <Input value={config.cloudName} onChange={(e) => setConfig({...config, cloudName: e.target.value})} className="bg-slate-950/50 border-slate-800 h-12 rounded-xl focus:ring-indigo-500/50 text-white font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Upload Preset</label>
                <Input value={config.uploadPreset} onChange={(e) => setConfig({...config, uploadPreset: e.target.value})} className="bg-slate-950/50 border-slate-800 h-12 rounded-xl focus:ring-indigo-500/50 text-white font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">API Key</label>
                <Input value={config.apiKey} onChange={(e) => setConfig({...config, apiKey: e.target.value})} className="bg-slate-950/50 border-slate-800 h-12 rounded-xl focus:ring-indigo-500/50 text-white font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">API Secret</label>
                <Input type="password" value={config.apiSecret} onChange={(e) => setConfig({...config, apiSecret: e.target.value})} className="bg-slate-950/50 border-slate-800 h-12 rounded-xl focus:ring-indigo-500/50 text-white font-medium" />
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                <strong className="text-amber-500 uppercase tracking-widest block mb-1">Critical: Unsigned Uploads</strong>
                Your Cloudinary Upload Preset MUST be set to <strong>"Unsigned"</strong> in your Cloudinary Dashboard (Settings &gt; Upload &gt; Upload presets). If it is "Signed", uploads will fail from the client side.
              </p>
            </div>
          </Card>

          {/* Social Authentication Settings */}
          <Card className="bg-slate-900 border-slate-800 p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest text-white leading-tight">Social Authentication</h3>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">Manage external login gateways</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Google Auth */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-2.12 5.4-7.84 5.4-4.96 0-9-4.12-9-9.2s4.04-9.2 9-9.2c2.84 0 4.76 1.2 5.8 2.2l2.6-2.6C18.88 1.12 15.96 0 12.48 0 5.48 0 0 5.48 0 12.48s5.48 12.48 12.48 12.48c7.28 0 12.04-5.12 12.04-12.24 0-.84-.08-1.48-.24-2.16h-11.8z"/></svg>
                    </div>
                    <span className="text-xs font-black tracking-widest text-slate-300 uppercase">Google Cloud Console</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] font-black tracking-widest ${config.enableGoogle ? 'text-indigo-400' : 'text-slate-600'}`}>{config.enableGoogle ? 'ACTIVE' : 'DISABLED'}</span>
                    <Switch checked={config.enableGoogle} onCheckedChange={(v) => setConfig({...config, enableGoogle: v})} />
                  </div>
                </div>
                {config.enableGoogle && (
                  <div className="animate-in slide-in-from-top-2 duration-300">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Client ID</label>
                      <Input value={config.googleClientId} onChange={(e) => setConfig({...config, googleClientId: e.target.value})} placeholder="xxxxxxxxxxxx-xxxxxxxx.apps.googleusercontent.com" className="bg-slate-950/50 border-slate-800 h-12 rounded-xl focus:ring-indigo-500/50 text-white font-medium" />
                    </div>
                  </div>
                )}
              </div>

              <div className="h-px bg-slate-800/50" />

              {/* Facebook Auth */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1877F2]/10 flex items-center justify-center">
                      <Facebook className="w-4 h-4 text-[#1877F2]" />
                    </div>
                    <span className="text-xs font-black tracking-widest text-slate-300 uppercase">Meta for Developers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] font-black tracking-widest ${config.enableFacebook ? 'text-indigo-400' : 'text-slate-600'}`}>{config.enableFacebook ? 'ACTIVE' : 'DISABLED'}</span>
                    <Switch checked={config.enableFacebook} onCheckedChange={(v) => setConfig({...config, enableFacebook: v})} />
                  </div>
                </div>
                {config.enableFacebook && (
                  <div className="animate-in slide-in-from-top-2 duration-300">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">App ID</label>
                      <Input value={config.facebookAppId} onChange={(e) => setConfig({...config, facebookAppId: e.target.value})} placeholder="Enter App ID" className="bg-slate-950/50 border-slate-800 h-12 rounded-xl focus:ring-indigo-500/50 text-white font-medium" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Platform Settings */}
          <Card className="bg-slate-900 border-slate-800 p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest text-white leading-tight">Platform Core</h3>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">Global branding and behavior</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Site Headline</label>
                <Input value={config.siteTitle} onChange={(e) => setConfig({...config, siteTitle: e.target.value})} className="bg-slate-950/50 border-slate-800 h-12 rounded-xl focus:ring-indigo-500/50 text-white font-medium" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <Palette className="w-4 h-4 text-slate-500" />
                    <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Accent Color</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-white uppercase">{config.primaryColor}</span>
                    <div className="w-6 h-6 rounded-md border border-white/10" style={{ backgroundColor: config.primaryColor }} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-slate-500" />
                    <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Maintenance Mode</span>
                  </div>
                  <Switch checked={false} onCheckedChange={() => {}} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-indigo-600 border-indigo-500 p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Sparkles className="w-48 h-48" />
            </div>
            <h4 className="text-xl font-black text-white mb-4 relative z-10">Advanced Pro Mode</h4>
            <p className="text-white/70 text-xs font-medium leading-relaxed mb-6 relative z-10">Unlock complex prompt variables, custom training sets, and priority API queueing.</p>
            <Button className="w-full bg-white text-indigo-600 hover:bg-slate-100 font-black tracking-widest text-[10px] rounded-xl h-11 relative z-10">UPGRADE PLAN</Button>
          </Card>
          
          <Card className="bg-slate-900 border-slate-800 p-8 rounded-2xl">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Security Baseline</h4>
            <div className="space-y-4">
              {[
                { label: "SSL Encryption", status: "Enabled" },
                { label: "Firewall Node", status: "Active" },
                { label: "Audit Logs", status: "Persisting" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500">{item.label}</span>
                  <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{item.status}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
