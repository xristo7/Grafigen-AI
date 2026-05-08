import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Image as ImageIcon, 
  Type, 
  Palette,
  MessageSquare,
  Gift,
  Heart,
  Award,
  Church,
  ChevronRight,
  RefreshCw,
  X,
  Share2,
  MapPin,
  Gem,
  ChevronDown,
  Menu,
  LogOut,
  Layout,
  CheckCircle2,
  Zap,
  Calendar,
  Clock,
  Navigation,
  Link as LinkIcon
} from "lucide-react";

export default function Generator() {
  const [tab, setTab] = useState("chat");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [globalMode, setGlobalMode] = useState("Pro");
  const [chatInput, setChatInput] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [hasOptimized, setHasOptimized] = useState(false);
  const [isPromptGenerated, setIsPromptGenerated] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  const [form, setForm] = useState({
    eventType: "Birthday",
    cardType: "Celebratory",
    title: "HAPPY BIRTHDAY",
    showPrimaryName: true,
    showCelebrantSecondary: false,
    primaryName: "",
    date: "",
    time: "",
    venue: "",
    rsvpLink: "",
    brideName: "",
    groomName: "",
    separateNames: false,
    showTitle: true,
    showName: true,
    showDate: false,
    showTime: false,
    showVenue: false,
    showRsvp: false,
    footerMessage: "Wishing you joy, good health, and endless success.",
    secondarySubjects: ["Family"],
    customSecondary: "",
    theme: "Modern Premium",
    primaryPortraitUrl: "",
    lifestyleActionUrl: "",
    subjectUrls: {},
    primaryColor: "#FFD700",
    secondaryColor: "#000000",
    titleSize: "Extra Large",
    titlePosition: "Lower Third",
    primaryNameSize: "Large",
    primaryNamePosition: "Center"
  });

  // Load Progress on Mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("grafigen_user_progress");
    if (savedProgress) {
      try {
        const { form: savedForm, isDarkMode: savedTheme, globalMode: savedMode } = JSON.parse(savedProgress);
        if (savedForm) setForm(savedForm);
        if (savedTheme !== undefined) setIsDarkMode(savedTheme);
        if (savedMode) setGlobalMode(savedMode);
      } catch (e) {
        console.error("Failed to load saved progress", e);
      }
    }
  }, []);

  // Auto-Save on State Change
  useEffect(() => {
    const saveProgress = () => {
      setIsAutoSaving(true);
      const progress = { form, isDarkMode, globalMode };
      localStorage.setItem("grafigen_user_progress", JSON.stringify(progress));
      setTimeout(() => setIsAutoSaving(false), 800);
    };

    const timer = setTimeout(saveProgress, 500); 
    return () => clearTimeout(timer);
  }, [form, isDarkMode, globalMode]);

  const eventConfigs = {
    Birthday: { icon: <Gift className="w-4 h-4" />, label: "BIRTHDAY" },
    Wedding: { icon: <Gem className="w-4 h-4" />, label: "WEDDING" },
    Anniversary: { icon: <Heart className="w-4 h-4" />, label: "ANNIVERSARY" },
    Dedication: { icon: <Church className="w-4 h-4" />, label: "DEDICATION" },
    Award: { icon: <Award className="w-4 h-4" />, label: "AWARD" }
  };

  const handleChange = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
    setIsPromptGenerated(false);
  };

  const handleImageUpload = (targetKey, subjectName = null) => {
    const config = JSON.parse(localStorage.getItem("grafigen_config") || "{}");
    const cloudName = config.cloudinaryCloudName || import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = config.cloudinaryUploadPreset || import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      alert("Cloudinary not configured. Check Admin Settings.");
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        multiple: false,
        maxFiles: 1,
        styles: {
          palette: {
            window: "#09090B",
            windowBorder: "#27272A",
            tabIcon: "#6366F1",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#6366F1",
            action: "#6366F1",
            inactiveTabIcon: "#475569",
            sourceBg: "#09090B"
          }
        }
      },
      (error, result) => {
        if (result && result.event === "success") {
          const url = result.info.secure_url;
          if (subjectName) {
            setForm(prev => ({
              ...prev,
              subjectUrls: { ...prev.subjectUrls, [subjectName]: url }
            }));
          } else {
            setForm(prev => ({ ...prev, [targetKey]: url }));
          }
        }
      }
    );
    widget.open();
  };

  const generatePrompt = () => {
    let conditioningSection = "";
    if (form.primaryPortraitUrl) {
      conditioningSection += `PRIMARY REFERENCE IMAGE (Facial Identity):\n${form.primaryPortraitUrl}\n\n`;
    }
    if (form.lifestyleActionUrl) {
      conditioningSection += `STYLE/ACTION REFERENCE (Composition):\n${form.lifestyleActionUrl}\n\n`;
    }

    const lightingMap = {
      "Modern Premium": "Cinematic soft glow, studio backlighting, atmospheric depth.",
      "Minimalist": "Soft diffused natural light, clean shadows, high-key lighting.",
      "Vibrant": "Dynamic colorful highlights, high-contrast glow, neon accents.",
      "Classic": "Warm golden hour glow, soft vignettes, classic Rembrandt lighting."
    };

    let subjectDesc = `Create a high-end cinematic ${form.cardType.toLowerCase()} poster using the PRIMARY REFERENCE as the exact facial identity reference for ${form.primaryName || "the main subject"}.`;
    subjectDesc += `\n\nPreserve the exact face, skin tone, hairstyle, and likeness from the identity reference. Do not redesign or alter the facial structure.`;

    const masterPrompt = `${conditioningSection}PROMPT:\n${subjectDesc}\n\nTheme: ${form.title.toUpperCase()}\n\nLighting: ${lightingMap[form.theme] || lightingMap["Modern Premium"]}\n\nMood: Vibrant, luxurious, and professional.`.trim();
    setGeneratedPrompt(masterPrompt);
    setIsPromptGenerated(true);
  };

  const handleAIParse = () => {
    setIsParsing(true);
    setTimeout(() => {
      const input = chatInput.toLowerCase();
      if (input.includes("birthday")) handleChange("eventType", "Birthday");
      else if (input.includes("wedding")) handleChange("eventType", "Wedding");
      setIsParsing(false);
      setHasOptimized(true);
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-zinc-100 font-sans overflow-hidden selection:bg-indigo-500/30 relative">
      
      {/* --- BACKGROUND BLOBS --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 opacity-[0.08] blur-[120px]" />
        <div className="absolute top-[50%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tl from-amber-400/10 to-yellow-600/5 opacity-[0.08] blur-[120px]" />
      </div>

      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-white/5 bg-[#09090b]/70 backdrop-blur-2xl flex flex-col transition-transform duration-300 md:translate-x-0 md:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 flex items-center px-6 gap-3 pt-12 md:pt-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight leading-tight">GRAFIGEN</h1>
            <p className="text-[10px] font-medium text-indigo-400 tracking-[0.2em] uppercase">Studio</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 custom-scrollbar">
          <div>
            <h2 className="px-3 text-xs font-semibold text-zinc-500 tracking-wider mb-3 uppercase">Workflow</h2>
            <nav className="space-y-1">
              <NavItem icon={<MessageSquare size={18} />} label="Quick Concept" active={tab === "chat"} onClick={() => setTab("chat")} />
              <NavItem icon={<Layout size={18} />} label="Content Details" active={tab === "content"} onClick={() => setTab("content")} />
              <NavItem icon={<ImageIcon size={18} />} label="Subject Images" active={tab === "images"} onClick={() => setTab("images")} />
              <NavItem icon={<Palette size={18} />} label="Aesthetics" active={tab === "style"} onClick={() => setTab("style")} />
            </nav>
          </div>

          <div>
            <h2 className="px-3 text-xs font-semibold text-zinc-500 tracking-wider mb-3 uppercase">Event Type</h2>
            <nav className="space-y-1">
              {Object.entries(eventConfigs).map(([key, cfg]) => (
                <NavItem 
                  key={key} 
                  icon={cfg.icon} 
                  label={key} 
                  active={form.eventType === key} 
                  onClick={() => handleChange("eventType", key)}
                  style="subtle"
                />
              ))}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-white/5">
          {localStorage.getItem("user_session") ? (
            <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-colors group relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold border border-indigo-500/10">
                {JSON.parse(localStorage.getItem("user_session")).name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{JSON.parse(localStorage.getItem("user_session")).name}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Active Member</p>
              </div>
              <button onClick={() => { localStorage.removeItem("user_session"); window.location.reload(); }} className="text-zinc-500 hover:text-red-400 transition-colors">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="block w-full">
              <Button variant="outline" className="w-full h-12 rounded-xl border-white/5 bg-white/5 hover:bg-white/10 text-[10px] font-black tracking-widest">LOGIN TO ACCOUNT</Button>
            </Link>
          )}
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col h-full relative z-10 pt-16 md:pt-0">
        <header className="hidden md:flex h-20 items-center justify-between px-8 border-b border-white/5 bg-zinc-950/40 backdrop-blur-xl z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-1 text-zinc-400 hover:text-white"><Menu size={20} /></button>
            <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
              <div className={`w-1.5 h-1.5 rounded-full ${isAutoSaving ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
              {isAutoSaving ? 'SAVING...' : 'AUTO-SAVED'}
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-full border border-white/5">
              {["Simple", "Pro"].map(m => (
                <button 
                  key={m} 
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${globalMode === m ? 'bg-indigo-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                  onClick={() => setGlobalMode(m)}
                >
                  {m}
                </button>
              ))}
            </div>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-inner">
                  {tab === "chat" ? <MessageSquare size={24} className="text-indigo-400" /> : tab === "content" ? <Layout size={24} className="text-indigo-400" /> : tab === "images" ? <ImageIcon size={24} className="text-indigo-400" /> : <Palette size={24} className="text-indigo-400" />}
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight uppercase">
                    {tab === "chat" ? "Quick Concept" : tab === "content" ? "Content Details" : tab === "images" ? "Reference Images" : "Aesthetics"}
                  </h1>
                  <p className="text-xs font-bold text-zinc-500 tracking-widest mt-1">
                    {tab === "chat" ? "Describe your vision in plain text." : "Configure the specifics of your generation."}
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full border border-indigo-500/20 text-[10px] font-black tracking-widest backdrop-blur-sm">
                {eventConfigs[form.eventType]?.icon}
                {form.eventType.toUpperCase()}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <ModeCard 
                active={form.cardType === "Celebratory"} 
                onClick={() => handleChange("cardType", "Celebratory")}
                icon={<Share2 size={20} />}
                label="Celebratory"
                sub="Social Post"
              />
              <ModeCard 
                active={form.cardType === "Invitation"} 
                onClick={() => handleChange("cardType", "Invitation")}
                icon={<MapPin size={20} />}
                label="Invitation"
                sub="Event Details"
              />
            </div>

            <div className="bg-zinc-900/20 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden">
              {tab === "chat" && (
                <div className="p-6 md:p-8 space-y-6">
                  <Textarea 
                    placeholder="Describe your vision (e.g. 'Sarah is celebrating her 30th birthday with a purple cinematic theme...')"
                    className="w-full min-h-[160px] bg-zinc-950/60 border border-zinc-800/80 rounded-3xl p-6 text-base text-white placeholder-zinc-700 font-medium focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-inner"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleAIParse} disabled={!chatInput || isParsing} className="bg-indigo-600 hover:bg-indigo-500 h-14 px-8 rounded-2xl font-black tracking-widest shadow-lg shadow-indigo-600/20">
                      {isParsing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles size={18} className="mr-2" />}
                      {isParsing ? "PARSING..." : "OPTIMIZE PROTOCOL"}
                    </Button>
                  </div>
                </div>
              )}

              {tab === "content" && (
                <div className="divide-y divide-white/5">
                  <FormSection label="Main Headline" enabled={form.showTitle} onToggle={(v) => handleChange("showTitle", v)}>
                    <div className="space-y-4">
                      <Input value={form.title} onChange={e => handleChange("title", e.target.value)} className="bg-zinc-950/60 border-zinc-800/80 h-12 rounded-xl text-white font-medium" />
                      <div className="grid grid-cols-2 gap-4">
                        <SelectField label="Size" value={form.titleSize} options={["Extra Large", "Large", "Medium", "Small"]} onChange={v => handleChange("titleSize", v)} />
                        <SelectField label="Position" value={form.titlePosition} options={["Lower Third", "Center", "Top", "Overlay"]} onChange={v => handleChange("titlePosition", v)} />
                      </div>
                    </div>
                  </FormSection>
                  <FormSection label="Celebrant Name" enabled={form.showName} onToggle={(v) => handleChange("showName", v)}>
                    <div className="space-y-4">
                      <Input value={form.primaryName} onChange={e => handleChange("primaryName", e.target.value)} placeholder="Enter name..." className="bg-zinc-950/60 border-zinc-800/80 h-12 rounded-xl text-white font-medium" />
                      <div className="grid grid-cols-2 gap-4">
                        <SelectField label="Presence" value={form.primaryNameSize} options={["Large", "Medium", "Subtle"]} onChange={v => handleChange("primaryNameSize", v)} />
                        <SelectField label="Align" value={form.primaryNamePosition} options={["Center", "Left", "Right"]} onChange={v => handleChange("primaryNamePosition", v)} />
                      </div>
                    </div>
                  </FormSection>
                  <FormSection label="Event Date" enabled={form.showDate} onToggle={(v) => handleChange("showDate", v)}>
                    <Input type="date" value={form.date} onChange={e => handleChange("date", e.target.value)} className="bg-zinc-950/60 border-zinc-800/80 h-12 rounded-xl text-white font-medium" />
                  </FormSection>
                  <FormSection label="Event Time" enabled={form.showTime} onToggle={(v) => handleChange("showTime", v)}>
                    <Input type="time" value={form.time} onChange={e => handleChange("time", e.target.value)} className="bg-zinc-950/60 border-zinc-800/80 h-12 rounded-xl text-white font-medium" />
                  </FormSection>
                  <FormSection label="Venue / Location" enabled={form.showVenue} onToggle={(v) => handleChange("showVenue", v)}>
                    <Input value={form.venue} onChange={e => handleChange("venue", e.target.value)} placeholder="Address or venue name..." className="bg-zinc-950/60 border-zinc-800/80 h-12 rounded-xl text-white font-medium" />
                  </FormSection>
                  <FormSection label="RSVP / Event Link" enabled={form.showRsvp} onToggle={(v) => handleChange("showRsvp", v)}>
                    <Input value={form.rsvpLink} onChange={e => handleChange("rsvpLink", e.target.value)} placeholder="https://..." className="bg-zinc-950/60 border-zinc-800/80 h-12 rounded-xl text-white font-medium" />
                  </FormSection>
                  <div className="p-6 md:p-8">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3 block">Footer Message</label>
                    <Textarea value={form.footerMessage} onChange={e => handleChange("footerMessage", e.target.value)} className="bg-zinc-950/60 border-zinc-800/80 min-h-[80px] rounded-xl text-white font-medium" />
                  </div>
                </div>
              )}

              {tab === "images" && (
                <div className="p-6 md:p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ImageUploadCard label="Identity Reference (Face)" url={form.primaryPortraitUrl} onUpload={() => handleImageUpload("primaryPortraitUrl")} onClear={() => handleChange("primaryPortraitUrl", "")} />
                    <ImageUploadCard label="Style Reference (Action)" url={form.lifestyleActionUrl} onUpload={() => handleImageUpload("lifestyleActionUrl")} onClear={() => handleChange("lifestyleActionUrl", "")} />
                  </div>
                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Secondary Subjects</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {["Family", "Friends", "Partner", "Colleagues"].map(subj => (
                        <button key={subj} onClick={() => {
                          const exist = form.secondarySubjects.includes(subj);
                          handleChange('secondarySubjects', exist ? form.secondarySubjects.filter(s => s !== subj) : [...form.secondarySubjects, subj]);
                        }} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${form.secondarySubjects.includes(subj) ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-zinc-900 border-white/5 text-zinc-500 hover:text-zinc-300'}`}>
                          {subj}
                        </button>
                      ))}
                    </div>
                    <Input placeholder="Custom secondary subjects..." value={form.customSecondary} onChange={e => handleChange('customSecondary', e.target.value)} className="bg-zinc-950/60 border-zinc-800/80 h-11 rounded-xl text-white text-xs font-medium" />
                  </div>
                </div>
              )}

              {tab === "style" && (
                <div className="divide-y divide-white/5">
                  <div className="p-6 md:p-8 space-y-4">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Visual Theme</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Modern Premium", "Minimalist", "Vibrant", "Classic"].map(t => (
                        <button key={t} onClick={() => handleChange('theme', t)} className={`p-4 rounded-2xl text-left border transition-all ${form.theme === t ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-zinc-900 border-white/5 text-zinc-500 hover:text-zinc-300'}`}>
                          <p className="text-xs font-black uppercase tracking-widest">{t}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 md:p-8 grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Primary Color</label>
                      <div className="flex gap-3">
                        <input type="color" value={form.primaryColor} onChange={e => handleChange('primaryColor', e.target.value)} className="w-12 h-12 rounded-xl bg-transparent border-0 cursor-pointer overflow-hidden" />
                        <Input value={form.primaryColor} onChange={e => handleChange('primaryColor', e.target.value)} className="flex-1 bg-zinc-950/60 border-zinc-800/80 h-12 rounded-xl text-white font-mono text-xs" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Secondary Color</label>
                      <div className="flex gap-3">
                        <input type="color" value={form.secondaryColor} onChange={e => handleChange('secondaryColor', e.target.value)} className="w-12 h-12 rounded-xl bg-transparent border-0 cursor-pointer overflow-hidden" />
                        <Input value={form.secondaryColor} onChange={e => handleChange('secondaryColor', e.target.value)} className="flex-1 bg-zinc-950/60 border-zinc-800/80 h-12 rounded-xl text-white font-mono text-xs" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 pb-12 flex justify-end">
              <Button onClick={generatePrompt} className="bg-indigo-600 hover:bg-indigo-500 h-16 px-10 rounded-2xl font-black tracking-tighter text-lg shadow-[0_0_40px_-5px_rgba(99,102,241,0.4)] transition-all transform hover:-translate-y-1 active:translate-y-0">
                <Zap size={22} className="fill-current mr-3" />
                GENERATE CONCEPT
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* --- SUMMARY SIDEBAR --- */}
      <aside className="hidden xl:flex w-80 border-l border-white/5 bg-[#09090b]/70 backdrop-blur-2xl flex-col z-20">
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-zinc-400">
            <Layout size={16} />
            GRAPHIC DATA
          </div>
          <div className="text-[10px] font-black bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20 tracking-widest uppercase">
            Live Summary
          </div>
        </div>
        
        <div className="p-6 flex-1 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <SummaryRow label="Event" value={form.eventType} />
            <SummaryRow label="Type" value={form.cardType} />
            <SummaryRow label="Headline" value={form.title} highlight />
            <SummaryRow label="Celebrant" value={form.primaryName} />
            <SummaryRow label="Inclusions" value={form.secondarySubjects.join(', ') + (form.customSecondary ? `, ${form.customSecondary}` : '')} />
            <SummaryRow label="Theme" value={form.theme} />
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <Sparkles size={18} className="text-indigo-400 mt-0.5 shrink-0" />
              <p className="text-[11px] font-bold text-indigo-200/60 leading-relaxed uppercase tracking-wider">
                All modifications are synchronized across the studio network.
              </p>
            </div>
          </div>
        </div>
      </aside>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(161, 161, 170, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(161, 161, 170, 0.2); }
      `}} />
    </div>
  );
}

const NavItem = ({ icon, label, active, onClick, style="default" }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${active ? style === "default" ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/20" : "bg-zinc-800 text-white border border-white/5" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"}`}>
    <div className={active ? "text-white" : "text-zinc-600"}>{icon}</div>
    {label}
  </button>
);

const ModeCard = ({ active, onClick, icon, label, sub }) => (
  <button onClick={onClick} className={`relative p-5 rounded-3xl flex items-start gap-4 text-left transition-all duration-300 ${active ? 'bg-indigo-500/10 border border-indigo-500/30 shadow-2xl' : 'bg-zinc-900/40 border border-white/5 hover:bg-zinc-900/60'}`}>
    <div className={`p-3 rounded-2xl ${active ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-500'}`}>{icon}</div>
    <div>
      <h3 className={`font-black tracking-tight ${active ? 'text-white' : 'text-zinc-400'}`}>{label}</h3>
      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mt-1">{sub}</p>
    </div>
    {active && <CheckCircle2 className="absolute top-4 right-4 text-indigo-500" size={18} />}
  </button>
);

const FormSection = ({ label, enabled, onToggle, children }) => (
  <div className="p-6 md:p-8 space-y-4">
    <div className="flex items-center justify-between">
      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{label}</label>
      <Switch checked={enabled} onCheckedChange={onToggle} className="data-[state=checked]:bg-indigo-500" />
    </div>
    <div className={`transition-all duration-300 ${!enabled ? 'opacity-30 pointer-events-none' : ''}`}>
      {children}
    </div>
  </div>
);

const SelectField = ({ label, value, options, onChange }) => (
  <div>
    <label className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">{label}</label>
    <div className="relative">
      <select value={value} onChange={e => onChange(e.target.value)} className="w-full appearance-none bg-zinc-950/60 border border-zinc-800/80 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer">
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
    </div>
  </div>
);

const ImageUploadCard = ({ label, url, onUpload, onClear }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative aspect-square rounded-3xl bg-zinc-950/60 border border-zinc-800/80 overflow-hidden group">
      {url ? (
        <>
          <img src={url} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <Button size="icon" variant="ghost" onClick={onUpload} className="bg-white/10 hover:bg-white/20 text-white rounded-xl"><RefreshCw size={18} /></Button>
            <Button size="icon" variant="ghost" onClick={onClear} className="bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-xl"><Trash2 size={18} /></Button>
          </div>
        </>
      ) : (
        <button onClick={onUpload} className="w-full h-full flex flex-col items-center justify-center gap-3 text-zinc-600 hover:text-indigo-400 hover:bg-indigo-500/5 transition-all">
          <ImageIcon size={32} />
          <span className="text-[10px] font-black uppercase tracking-widest">Connect Image</span>
        </button>
      )}
    </div>
  </div>
);

const SummaryRow = ({ label, value, highlight }) => (
  <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 last:border-0">
    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{label}</span>
    <span className={`text-sm font-bold text-right truncate max-w-[140px] ${highlight ? 'text-indigo-400' : 'text-zinc-300'}`}>{value || "---"}</span>
  </div>
);
