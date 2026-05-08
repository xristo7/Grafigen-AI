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
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if (Object.keys(data).length > 0) setConfig(data);
      })
      .catch(err => console.error("Failed to fetch config from Neon", err));
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      
      if (response.ok) {
        setIsSaved(true);
        // Also update local storage as a fallback/cache
        localStorage.setItem("grafigen_config", JSON.stringify(config));
        setTimeout(() => setIsSaved(false), 3000);
      }
    } catch (err) {
      console.error("Failed to save config to Neon", err);
      alert("Error saving to database. Check console.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black tracking-tight text-white">System Configuration</h1>
          <p className="text-zinc-500 font-medium">Manage global parameters and integration credentials.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10 bg-transparent text-zinc-500 hover:text-white hover:bg-white/5 h-12 px-6 rounded-xl font-black tracking-widest text-[10px] uppercase">
            <RotateCcw className="w-4 h-4 mr-2" /> RESET
          </Button>
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-500 h-12 px-6 rounded-xl font-black tracking-widest text-[10px] uppercase shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)]">
            {isSaved ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            {isSaved ? "SAVED" : "SAVE CHANGES"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Cloudinary Settings */}
          <Card className="bg-zinc-900/20 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 backdrop-blur-md">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest text-white leading-tight">Cloudinary Integration</h3>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Asset storage & optimization engine</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 ml-1">Cloud Name</label>
                <Input value={config.cloudName} onChange={(e) => setConfig({...config, cloudName: e.target.value})} className="bg-zinc-950/60 border-zinc-800/80 h-12 rounded-xl focus:ring-indigo-500/50 text-white font-medium shadow-inner" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 ml-1">Upload Preset</label>
                <Input value={config.uploadPreset} onChange={(e) => setConfig({...config, uploadPreset: e.target.value})} className="bg-zinc-950/60 border-zinc-800/80 h-12 rounded-xl focus:ring-indigo-500/50 text-white font-medium shadow-inner" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 ml-1">API Key</label>
                <Input type="password" value={config.apiKey} onChange={(e) => setConfig({...config, apiKey: e.target.value})} className="bg-zinc-950/60 border-zinc-800/80 h-12 rounded-xl focus:ring-indigo-500/50 text-white font-medium shadow-inner" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 ml-1">API Secret</label>
                <Input type="password" value={config.apiSecret} onChange={(e) => setConfig({...config, apiSecret: e.target.value})} className="bg-zinc-950/60 border-zinc-800/80 h-12 rounded-xl focus:ring-indigo-500/50 text-white font-medium shadow-inner" />
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4 backdrop-blur-md">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[11px] font-medium text-zinc-400 leading-relaxed">
                <strong className="text-amber-500 uppercase tracking-widest block mb-1">Critical: Unsigned Uploads</strong>
                Your Cloudinary Upload Preset MUST be set to <strong>"Unsigned"</strong> in your Cloudinary Dashboard. If it is "Signed", client-side uploads will fail.
              </p>
            </div>
          </Card>

          {/* Social Authentication Settings */}
          <Card className="bg-zinc-900/20 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 backdrop-blur-md">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest text-white leading-tight">Social Authentication</h3>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Manage external login gateways</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Google Auth */}
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/40 border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-2.12 5.4-7.84 5.4-4.96 0-9-4.12-9-9.2s4.04-9.2 9-9.2c2.84 0 4.76 1.2 5.8 2.2l2.6-2.6C18.88 1.12 15.96 0 12.48 0 5.48 0 0 5.48 0 12.48s5.48 12.48 12.48 12.48c7.28 0 12.04-5.12 12.04-12.24 0-.84-.08-1.48-.24-2.16h-11.8z"/></svg>
                    </div>
                    <div>
                      <p className="text-sm font-black text-white tracking-tight">Google Cloud Engine</p>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Enable OAuth handshake</p>
                    </div>
                  </div>
                  <Switch checked={config.enableGoogle} onCheckedChange={(v) => setConfig({...config, enableGoogle: v})} />
                </div>
                {config.enableGoogle && (
                  <div className="animate-in slide-in-from-top-2 duration-300 pl-4 border-l-2 border-indigo-500/30">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 ml-1">Client ID</label>
                      <Input value={config.googleClientId} onChange={(e) => setConfig({...config, googleClientId: e.target.value})} placeholder="xxxxxxxxxxxx.apps.googleusercontent.com" className="bg-zinc-950/60 border-zinc-800/80 h-12 rounded-xl text-white shadow-inner" />
                    </div>
                  </div>
                )}
              </div>

              <div className="h-px bg-white/5" />

              {/* Facebook Auth */}
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/40 border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#1877F2]/10 flex items-center justify-center border border-[#1877F2]/20">
                      <Facebook className="w-4 h-4 text-[#1877F2]" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white tracking-tight">Meta Developers</p>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Enable Facebook Graph access</p>
                    </div>
                  </div>
                  <Switch checked={config.enableFacebook} onCheckedChange={(v) => setConfig({...config, enableFacebook: v})} />
                </div>
                {config.enableFacebook && (
                  <div className="animate-in slide-in-from-top-2 duration-300 pl-4 border-l-2 border-indigo-500/30">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 ml-1">App ID</label>
                      <Input value={config.facebookAppId} onChange={(e) => setConfig({...config, facebookAppId: e.target.value})} placeholder="Enter App ID" className="bg-zinc-950/60 border-zinc-800/80 h-12 rounded-xl text-white shadow-inner" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-zinc-900/20 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 backdrop-blur-md">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest text-white leading-tight">Platform Core</h3>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Branding & behavior</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 ml-1">Site Headline</label>
                <Input value={config.siteTitle} onChange={(e) => setConfig({...config, siteTitle: e.target.value})} className="bg-zinc-950/60 border-zinc-800/80 h-12 rounded-xl text-white font-medium shadow-inner" />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500 ml-1">Accent Brand Color</label>
                <div className="flex gap-3">
                  <Input type="color" value={config.primaryColor} onChange={(e) => setConfig({...config, primaryColor: e.target.value})} className="w-12 h-12 p-1 bg-zinc-900 border-white/10 rounded-xl cursor-pointer" />
                  <Input value={config.primaryColor} onChange={(e) => setConfig({...config, primaryColor: e.target.value})} className="flex-1 bg-zinc-950/60 border-zinc-800/80 h-12 rounded-xl text-white font-mono shadow-inner" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/40 border border-white/5">
                <span className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Dark Mode Protocol</span>
                <Switch checked={config.darkMode} onCheckedChange={(v) => setConfig({...config, darkMode: v})} />
              </div>
            </div>
          </Card>

          <Card className="bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all duration-700"></div>
            <div className="flex items-start gap-4 relative z-10">
              <AlertCircle className="w-6 h-6 text-indigo-400 shrink-0" />
              <div>
                <h4 className="text-sm font-black text-white tracking-tight mb-2">Neon Synchronization</h4>
                <p className="text-[10px] font-bold text-indigo-300/80 leading-relaxed uppercase tracking-wider">
                  All changes are instantly persisted to the Neon PostgreSQL database via Vercel Edge functions.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
