import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Sparkles, 
  Moon, 
  Sun, 
  Copy, 
  Trash2, 
  Settings, 
  Image as ImageIcon, 
  Type, 
  Palette,
  MessageSquare,
  Gift,
  Heart,
  Award,
  Church,
  Calendar,
  User,
  CheckCircle2,
  Layout,
  Maximize2,
  AlignJustify,
  Cpu,
  UserCheck,
  Plus,
  Users,
  ChevronRight,
  RefreshCw,
  Edit3,
  Check,
  X,
  Zap,
  Activity,
  Share2,
  MapPin,
  Flame,
  ArrowRight
} from "lucide-react";

const brandPalettes = [
  { name: "Tech Corporate", primary: "#0052CC", secondary: "#F4F5F7" },
  { name: "Luxury Gold", primary: "#D4AF37", secondary: "#000000" },
  { name: "Eco Nature", primary: "#2D5A27", secondary: "#F0F4EF" },
  { name: "Royal Premium", primary: "#6C3483", secondary: "#F4ECF7" },
  { name: "Vibrant Festive", primary: "#FF5733", secondary: "#FFC300" },
  { name: "Minimalist Slate", primary: "#334155", secondary: "#F8FAFC" },
];

export default function FlyerPromptGenerator() {
  const [tab, setTab] = useState("chat");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [globalMode, setGlobalMode] = useState("Simple"); // Simple | Pro
  const [chatInput, setChatInput] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [hasOptimized, setHasOptimized] = useState(false);
  const [isPromptGenerated, setIsPromptGenerated] = useState(false);
  const [strength, setStrength] = useState("Ultra");

  const [form, setForm] = useState({
    eventType: "Birthday",
    cardType: "Celebratory", // Celebratory | Invitation
    title: "HAPPY BIRTHDAY",
    showTitle: true,
    titleSize: "Extra Large",
    titlePosition: "Lower Third",
    subtitle: "",
    showSubtitle: true,
    primaryName: "",
    showPrimaryName: true,
    primaryNameSize: "Large",
    primaryNamePosition: "Center",
    showCelebrantSecondary: false,
    primaryRole: "Celebrant",
    secondaryName: "",
    secondarySubjects: ["Family"],
    customSecondary: "",
    showSecondaryName: true,
    secondaryRole: "Family Members",
    theme: "Modern Premium",
    primaryColor: "#FFD700",
    secondaryColor: "#000000",
    date: "",
    showDate: true,
    venue: "",
    showVenue: true,
    contact: "",
    showContact: true,
    description: "",
    showDescription: true,
    showFooter: true,
    footerMessage: "Wishing you joy, good health, and endless success in every step you take.",
    footerLabel1: "CELEBRATE",
    footerLabel2: "ENJOY",
    footerLabel3: "MAKE MEMORIES",
    vibe: "Elegant & Cinematic",
    customFields: []
  });

  const eventConfigs = {
    Birthday: { icon: <Gift className="w-4 h-4" />, presets: ["Family", "Spouse", "Children"], keywords: ["festive", "balloons"] },
    Wedding: { icon: <Flame className="w-4 h-4" />, presets: ["Spouse", "Family"], keywords: ["grand", "floral"] },
    Anniversary: { icon: <Heart className="w-4 h-4" />, presets: ["Spouse"], keywords: ["elegant", "romantic"] },
    Dedication: { icon: <Church className="w-4 h-4" />, presets: ["Family"], keywords: ["serene", "spiritual"] },
    Award: { icon: <Award className="w-4 h-4" />, presets: [], keywords: ["grand", "prestige"] },
    Commemoration: { icon: <Calendar className="w-4 h-4" />, presets: [], keywords: ["professional", "monumental"] }
  };

  const handleChange = (key, value) => {
    setIsPromptGenerated(false);
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubjectToggle = (subject) => {
    setIsPromptGenerated(false);
    setForm(prev => {
      const current = prev.secondarySubjects;
      const next = current.includes(subject) ? current.filter(s => s !== subject) : [...current, subject];
      return { ...prev, secondarySubjects: next };
    });
  };

  const addCustomField = () => {
    if (form.customFields.length < 3) {
      setForm(prev => ({ ...prev, customFields: [...prev.customFields, { label: "", value: "" }] }));
    }
  };

  const updateCustomField = (index, key, value) => {
    const nextFields = [...form.customFields];
    nextFields[index][key] = value;
    setForm(prev => ({ ...prev, customFields: nextFields }));
    setIsPromptGenerated(false);
  };

  const removeCustomField = (index) => {
    setForm(prev => ({ ...prev, customFields: prev.customFields.filter((_, i) => i !== index) }));
    setIsPromptGenerated(false);
  };

  const handleAIParse = () => {
    setIsParsing(true);
    setTimeout(() => {
      const input = chatInput.toLowerCase();
      const newForm = { ...form };
      if (input.includes("birthday")) newForm.eventType = "Birthday";
      else if (input.includes("wedding")) newForm.eventType = "Wedding";
      else if (input.includes("anniversary")) newForm.eventType = "Anniversary";
      const names = chatInput.match(/[A-Z][a-z]+/g) || [];
      if (names.length > 0) newForm.primaryName = names[0];
      setForm(newForm);
      setIsParsing(false);
      setHasOptimized(true);
      setIsPromptGenerated(false);
    }, 1500);
  };

  const generatePrompt = () => {
    const config = eventConfigs[form.eventType] || eventConfigs.Birthday;
    const secondaryList = [...form.secondarySubjects, form.customSecondary].filter(Boolean).join(", ");
    let prompt = `### MASTER DESIGN PROMPT: ${form.eventType.toUpperCase()} ###\n\n`;
    prompt += `INTENT: ${form.cardType === "Celebratory" ? "Social Media Tribute" : "Official Event Invitation"}\n\n`;
    prompt += `IMAGES:\n- PRIMARY: ${form.primaryName || "Main Subject"}. Portrait focus.\n`;
    if (form.showCelebrantSecondary) prompt += `- LIFESTYLE: Supporting poses.\n`;
    if (secondaryList) prompt += `- INCLUSIONS: ${secondaryList}.\n\n`;
    prompt += `TYPOGRAPHY: "${form.title}"\n`;
    if (globalMode === "Pro") prompt += `- SIZE: ${form.titleSize} | POS: ${form.titlePosition}\n`;
    prompt += `\nDETAILS:\n- DATE: ${form.date}\n`;
    if (form.cardType === "Invitation") prompt += `- VENUE: ${form.venue}\n`;
    form.customFields.forEach(f => { if (f.label) prompt += `- ${f.label.toUpperCase()}: ${f.value}\n`; });
    prompt += `\nSPECS: ${form.theme} theme, ${strength} render.`;
    return prompt;
  };

  const themeClasses = isDarkMode ? "bg-[#0f172a] text-slate-100" : "bg-slate-50 text-slate-900";
  const cardClasses = isDarkMode ? "bg-slate-900/50 border-slate-800 backdrop-blur-xl" : "bg-white border-slate-200 shadow-sm";
  const inputClasses = isDarkMode ? "bg-slate-950/50 border-slate-700" : "bg-slate-100 border-slate-200 text-slate-800 placeholder:text-slate-400";
  const currentPresets = eventConfigs[form.eventType]?.presets || [];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses} font-sans`}>
      <header className={`border-b ${isDarkMode ? 'border-slate-800/50' : 'border-slate-200'} p-4 sticky top-0 z-50 backdrop-blur-md flex justify-between items-center`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20"><Sparkles className="text-white w-6 h-6" /></div>
          <div><h1 className="text-xl font-bold tracking-tight">GRAFIGEN <span className="text-indigo-400">STUDIO</span></h1><p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">Prompt Generator v3.4</p></div>
        </div>
        <div className="flex items-center gap-6">
          <div className={`flex ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-200'} p-1 rounded-full border ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
            {["Simple", "Pro"].map(m => (
              <button key={m} onClick={() => { setGlobalMode(m); setTab(m === "Simple" ? "chat" : "content"); }} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${globalMode === m ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500"}`}>{m} Mode</button>
            ))}
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} className="rounded-full">{isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid lg:grid-cols-[240px_1fr_380px] gap-8">
        <nav className="flex flex-col h-full space-y-8">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase px-3 py-2">Workflow</p>
            {[
              { id: "chat", icon: <MessageSquare className="w-4 h-4" />, label: "Quick Concept", hidden: globalMode === "Pro" },
              { id: "content", icon: <Type className="w-4 h-4" />, label: "Content Details", hidden: globalMode === "Simple" },
              { id: "images", icon: <ImageIcon className="w-4 h-4" />, label: "Subject Images" },
              { id: "style", icon: <Palette className="w-4 h-4" />, label: "Aesthetics" }
            ].filter(i => !i.hidden).map(item => (
              <button key={item.id} onClick={() => setTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${tab === item.id ? "bg-indigo-600 text-white shadow-lg translate-x-1" : "text-slate-400"}`}>{item.icon}<span className="font-medium text-sm">{item.label}</span></button>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-800/50 space-y-3">
            <p className="text-[10px] font-bold text-slate-500 uppercase px-3">Event Type</p>
            {Object.entries(eventConfigs).map(([key, cfg]) => (
              <button key={key} onClick={() => handleChange('eventType', key)} className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${form.eventType === key ? "text-indigo-400 bg-indigo-400/10 border border-indigo-500/20 shadow-inner" : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/30"}`}>
                <span className="flex items-center gap-2">{cfg.icon}{key}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="space-y-6">
          <Card className={`${cardClasses} p-6 border-0 shadow-2xl relative`}>
            <CardContent className="p-0 space-y-8">
              {tab === "chat" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-2"><h2 className="text-2xl font-bold flex items-center gap-2"><Sparkles className="w-6 h-6 text-indigo-400" />Quick Concept</h2><p className="text-xs text-slate-500 font-medium">1. Select purpose & describe your vision</p></div>

                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => handleChange('cardType', 'Celebratory')} className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${form.cardType === 'Celebratory' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : isDarkMode ? "bg-slate-800/20 border-slate-700" : "bg-slate-100 border-slate-200"}`}><div className={`p-2 rounded-lg ${form.cardType === 'Celebratory' ? "bg-white/20" : "bg-indigo-500/20 text-indigo-400"}`}><Share2 className="w-5 h-5" /></div><div className="text-left"><p className="text-sm font-bold">Celebratory</p><p className="text-[9px] opacity-70 uppercase font-bold">Social Post</p></div></button>
                    <button onClick={() => handleChange('cardType', 'Invitation')} className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${form.cardType === 'Invitation' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : isDarkMode ? "bg-slate-800/20 border-slate-700" : "bg-slate-100 border-slate-200"}`}><div className={`p-2 rounded-lg ${form.cardType === 'Invitation' ? "bg-white/20" : "bg-indigo-500/20 text-indigo-400"}`}><MapPin className="w-5 h-5" /></div><div className="text-left"><p className="text-sm font-bold">Invitation</p><p className="text-[9px] opacity-70 uppercase font-bold">Event Details</p></div></button>
                  </div>

                  <div className="grid grid-cols-6 gap-2">
                    {Object.entries(eventConfigs).map(([key, cfg]) => (
                      <button key={key} onClick={() => handleChange('eventType', key)} className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${form.eventType === key ? "bg-indigo-600/10 border-indigo-500 shadow-xl" : isDarkMode ? "bg-slate-800/20 border-slate-700" : "bg-slate-50 border-slate-200"}`}><div className={`w-10 h-10 rounded-xl flex items-center justify-center ${form.eventType === key ? "bg-indigo-600 text-white" : "bg-slate-700 text-slate-400"}`}>{cfg.icon}</div><span className={`text-[8px] font-bold uppercase ${form.eventType === key ? "text-indigo-400" : "text-slate-500"}`}>{key}</span></button>
                    ))}
                  </div>

                  <Textarea placeholder="E.g., Today is my mother's 60th birthday! I want to celebrate her life..." className={`min-h-[160px] ${inputClasses} text-lg`} value={chatInput} onChange={(e) => { setChatInput(e.target.value); setHasOptimized(false); }} />
                  <Button className="w-full bg-indigo-600 py-6 text-lg font-bold shadow-xl hover:bg-indigo-500" disabled={!chatInput || isParsing} onClick={handleAIParse}>{isParsing ? <RefreshCw className="w-5 h-5 animate-spin mr-2" /> : <Sparkles className="w-5 h-5 mr-2" />}Optimize Concept</Button>
                  
                  {hasOptimized && (
                    <div className="pt-6 border-t border-slate-800/50 space-y-6 animate-in fade-in slide-in-from-top-4">
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase text-slate-500 tracking-wider">Refine Extracted Intelligence</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1"><label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Event Title</label><Input value={form.title} onChange={e => handleChange('title', e.target.value)} className={inputClasses} /></div>
                          <div className="space-y-1"><label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Celebrant Name</label><Input value={form.primaryName} onChange={e => handleChange('primaryName', e.target.value)} className={inputClasses} /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1"><label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Date</label><Input value={form.date} onChange={e => handleChange('date', e.target.value)} className={inputClasses} /></div>
                          {form.cardType === "Invitation" && <div className="space-y-1"><label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Venue</label><Input value={form.venue} onChange={e => handleChange('venue', e.target.value)} className={inputClasses} /></div>}
                        </div>
                        <div className="space-y-1"><label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Footer Message</label><Input value={form.footerMessage} onChange={e => handleChange('footerMessage', e.target.value)} className={inputClasses} /></div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-6 font-bold text-white shadow-2xl" onClick={() => setTab("images")}>PROCEED TO SUBJECT IMAGES <ChevronRight className="w-5 h-5 ml-2" /></Button>
                    </div>
                  )}
                </div>
              )}

              {tab === "content" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center justify-between"><h2 className="text-2xl font-bold">Content Details</h2><p className="text-[10px] font-bold px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded">PRO MODE</p></div>
                  <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-4 shadow-inner`}>
                    <div className="space-y-1"><label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Event Title</label><Input value={form.title} onChange={e => handleChange('title', e.target.value)} className={inputClasses} /></div>
                    <div className="grid grid-cols-2 gap-4"><select className={`rounded-xl p-2.5 text-xs border ${inputClasses}`} value={form.titleSize} onChange={e => handleChange('titleSize', e.target.value)}><option>Large</option><option>Extra Large</option><option>Massive</option></select><select className={`rounded-xl p-2.5 text-xs border ${inputClasses}`} value={form.titlePosition} onChange={e => handleChange('titlePosition', e.target.value)}><option>Top</option><option>Center</option><option>Lower Third</option></select></div>
                  </div>
                  <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-4 shadow-inner`}>
                    <div className="space-y-1"><label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Celebrant Name</label><Input value={form.primaryName} onChange={e => handleChange('primaryName', e.target.value)} className={inputClasses} /></div>
                    <div className="grid grid-cols-2 gap-4"><select className={`rounded-xl p-2.5 text-xs border ${inputClasses}`} value={form.primaryNameSize} onChange={e => handleChange('primaryNameSize', e.target.value)}><option>Normal</option><option>Large</option><option>Extra Large</option></select><select className={`rounded-xl p-2.5 text-xs border ${inputClasses}`} value={form.primaryNamePosition} onChange={e => handleChange('primaryNamePosition', e.target.value)}><option>Center</option><option>Top</option><option>Bottom</option></select></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1"><label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Date</label><Input value={form.date} onChange={e => handleChange('date', e.target.value)} className={inputClasses} /></div>
                    <div className="space-y-1"><label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Venue</label><Input value={form.venue} onChange={e => handleChange('venue', e.target.value)} className={inputClasses} /></div>
                  </div>
                  <Button className="w-full bg-indigo-600 py-6 font-bold shadow-lg shadow-indigo-600/10" onClick={() => setTab("images")}>NEXT STEP <ChevronRight className="w-4 h-4 ml-2" /></Button>
                </div>
              )}

              {tab === "images" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h2 className="text-2xl font-bold flex items-center gap-2"><ImageIcon className="w-6 h-6 text-indigo-400" />Subject Images</h2>
                  <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-4 shadow-inner`}>
                    <div className="flex items-center justify-between"><div><p className="font-semibold text-sm">Primary Portrait</p><p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Main focal point</p></div><Switch checked={form.showPrimaryName} onCheckedChange={(v) => handleChange('showPrimaryName', v)} /></div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800/50"><div><p className="font-semibold text-sm">Lifestyle Shots</p><p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Secondary shots of same person</p></div><Switch checked={form.showCelebrantSecondary} onCheckedChange={(v) => handleChange('showCelebrantSecondary', v)} /></div>
                  </div>
                  <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-6 shadow-inner`}>
                    <h3 className="font-bold text-xs text-slate-500 uppercase tracking-widest">Other Inclusions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {currentPresets.map(subject => (
                        <div key={subject} className={`flex items-center gap-3 p-3 rounded-xl border ${isDarkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-white border-slate-200'}`}>
                          <Checkbox checked={form.secondarySubjects.includes(subject)} onCheckedChange={() => handleSubjectToggle(subject)} /><span className="text-xs font-bold text-slate-500 uppercase">{subject}</span>
                        </div>
                      ))}
                    </div>
                    <Input value={form.customSecondary} placeholder="Custom person..." onChange={e => handleChange('customSecondary', e.target.value)} className={inputClasses} />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-6 font-bold text-white shadow-xl" onClick={() => setTab("style")}>PROCEED TO AESTHETICS <ChevronRight className="w-5 h-5 ml-2" /></Button>
                </div>
              )}

              {tab === "style" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h2 className="text-2xl font-bold flex items-center gap-2"><Palette className="w-6 h-6 text-indigo-400" />Aesthetics</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {brandPalettes.map(p => (
                      <button key={p.name} onClick={() => { handleChange('primaryColor', p.primary); handleChange('secondaryColor', p.secondary); }} className={`p-4 rounded-2xl border transition-all text-left ${form.primaryColor === p.primary ? "bg-indigo-600/10 border-indigo-500 shadow-xl" : isDarkMode ? "bg-slate-800/30 border-slate-700" : "bg-slate-100 border-slate-200"}`}>
                        <p className="text-[10px] font-bold uppercase mb-2 text-slate-400">{p.name}</p>
                        <div className="flex gap-2"><div className="w-8 h-8 rounded-lg shadow-sm" style={{ backgroundColor: p.primary }} /><div className="w-8 h-8 rounded-lg shadow-sm border border-slate-700/20" style={{ backgroundColor: p.secondary }} /></div>
                      </button>
                    ))}
                  </div>
                  <div className="pt-10 border-t border-slate-800/50">
                    <Button className="w-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 py-8 text-xl font-black tracking-[0.2em] shadow-2xl animate-pulse hover:animate-none hover:scale-[1.02] transition-all" onClick={() => setIsPromptGenerated(true)}>
                      <Zap className="w-6 h-6 mr-3" /> FINALIZE PROMPT
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className={`${cardClasses} p-6 border-0 shadow-2xl h-[calc(100vh-140px)] flex flex-col sticky top-24 overflow-hidden`}>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h2 className="font-bold flex items-center gap-2 text-sm uppercase tracking-widest text-slate-400"><Sparkles className="w-4 h-4 text-indigo-400" /> Prompt Preview</h2>
              <span className={`text-[9px] font-black tracking-widest px-2 py-1 rounded-full ${isPromptGenerated ? 'bg-green-500/20 text-green-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                {isPromptGenerated ? "REVEALED" : "SYNCING..."}
              </span>
            </div>
            <div className="flex-1 relative rounded-2xl overflow-hidden group">
              {isPromptGenerated ? (
                <div className="h-full animate-in zoom-in-95 fade-in duration-500">
                  <Textarea value={generatePrompt()} readOnly className={`h-full border-0 rounded-2xl p-6 text-[12px] font-mono scrollbar-hide ${isDarkMode ? 'bg-slate-950/80 text-indigo-100/80' : 'bg-slate-100 text-slate-700'}`} />
                  <Button onClick={() => { navigator.clipboard.writeText(generatePrompt()); alert("Prompt Copied!"); }} className="absolute bottom-6 right-6 bg-indigo-600 shadow-2xl hover:bg-indigo-500 rounded-full px-6 py-4 font-bold"><Copy className="w-4 h-4 mr-2" /> COPY PROMPT</Button>
                </div>
              ) : (
                <div className={`h-full w-full flex flex-col items-center justify-center relative overflow-hidden ${isDarkMode ? 'bg-slate-950/50' : 'bg-slate-50'}`}>
                  <div className="absolute inset-0 flex flex-col p-4 opacity-10 font-mono text-[8px] leading-relaxed select-none pointer-events-none overflow-hidden">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div key={i} className="animate-matrix-scroll whitespace-nowrap" style={{ animationDelay: `${i * 0.1}s` }}>
                        {Array.from({ length: 10 }).map(() => `GENERATING_CINEMATIC_ECOSYSTEM_${Math.random().toString(36).substring(7)}... `).join('')}
                      </div>
                    ))}
                  </div>
                  <div className="relative z-10 flex flex-col items-center text-center px-6">
                    <div className="w-20 h-20 mb-6 relative"><div className="absolute inset-0 border-4 border-indigo-500/10 rounded-full" /><div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin" /><Activity className="absolute inset-0 m-auto w-8 h-8 text-indigo-400 animate-pulse" /></div>
                    <h3 className="font-bold text-sm mb-1 uppercase tracking-widest text-indigo-400">Neural Syncing</h3>
                    <p className="text-[10px] text-slate-500 max-w-[200px]">Optimizing cinematic vectors and typography hierarchy...</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes matrix-scroll { from { transform: translateY(0); } to { transform: translateY(-100%); } }
        .animate-matrix-scroll { animation: matrix-scroll 25s linear infinite; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-bottom { from { transform: translateY(10px); } to { transform: translateY(0); } }
        @keyframes slide-in-from-right { from { transform: translateX(10px); } to { transform: translateX(0); } }
        .animate-in { animation: fade-in 0.3s ease-out, slide-in-from-bottom 0.3s ease-out; }
      `}</style>
    </div>
  );
}
