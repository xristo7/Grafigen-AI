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
  ArrowRight,
  Gem,
  ChevronDown,
  Menu
} from "lucide-react";

const palettes = [
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
  const [globalMode, setGlobalMode] = useState("Simple");
  const [chatInput, setChatInput] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [hasOptimized, setHasOptimized] = useState(false);
  const [isPromptGenerated, setIsPromptGenerated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // Context-aware labels based on event type
  const nameLabels = {
    Birthday: { name: "Celebrant's Name", title: "Main Headline" },
    Wedding: { name: "Couple Names", title: "Main Headline", bride: "Bride's Name", groom: "Groom's Name" },
    Anniversary: { name: "Family / Couple Name", title: "Main Headline" },
    Dedication: { name: "Baby's Name", title: "Dedication Title" },
    Award: { name: "Recipient's Name", title: "Award Title" }
  };

  const eventConfigs = {
    Birthday: { icon: <Gift className="w-4 h-4" />, presets: ["Family", "Spouse", "Children"] },
    Wedding: { icon: <Gem className="w-4 h-4" />, presets: ["Spouse", "Family"] },
    Anniversary: { icon: <Heart className="w-4 h-4" />, presets: ["Spouse"] },
    Dedication: { icon: <Church className="w-4 h-4" />, presets: ["Family"] },
    Award: { icon: <Award className="w-4 h-4" />, presets: [] }
  };

  const t = {
    bg: isDarkMode ? "bg-[#0f172a]" : "bg-slate-50",
    text: isDarkMode ? "text-slate-100" : "text-slate-900",
    textMuted: "text-slate-500",
    card: isDarkMode ? "bg-slate-800/30 border-slate-700/50 shadow-2xl backdrop-blur-2xl" : "bg-white border-slate-200 shadow-xl",
    input: isDarkMode ? "bg-slate-950/50 border-slate-700/50 text-white focus:ring-indigo-500/50" : "bg-white border-slate-300 text-slate-800 focus:ring-indigo-500/20",
    buttonPrimary: "bg-indigo-600 hover:bg-indigo-500 text-white font-bold tracking-widest transition-all rounded-xl h-12 md:h-14 px-8",
    headerIcon: "p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm",
    label: "text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-slate-500 font-bold"
  };

  const currentPresets = eventConfigs[form.eventType]?.presets || [];

  const handleChange = (key, value) => {
    setIsPromptGenerated(false);
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (targetKey, subjectName = null) => {
    if (!window.cloudinary) {
      alert("Cloudinary script not loaded. Please check your connection.");
      return;
    }

    // Load dynamic config from Settings (localStorage) or fallback to env
    const savedConfig = JSON.parse(localStorage.getItem("grafigen_config") || "{}");
    const cloudName = savedConfig.cloudName || import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "daou85ugm";
    const uploadPreset = savedConfig.uploadPreset || import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "ml_default";
    console.log("Initializing Cloudinary Widget with:", { cloudName, uploadPreset });

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        multiple: false,
        maxFiles: 1,
        clientAllowedFormats: ["jpg", "png", "jpeg", "webp"],
        styles: {
          palette: {
            window: "#0F172A",
            windowBorder: "#1E293B",
            tabIcon: "#6366F1",
            menuIcons: "#94A3B8",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#6366F1",
            action: "#6366F1",
            inactiveTabIcon: "#475569",
            error: "#F43F5E",
            inProgress: "#6366F1",
            complete: "#22C55E",
            sourceBg: "#0F172A"
          }
        }
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Widget Error:", error);
          alert("Upload failed: " + (error.message || "Unknown error"));
          return;
        }
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

  const handleSubjectToggle = (subject) => {
    setIsPromptGenerated(false);
    setForm(prev => {
      const current = prev.secondarySubjects || [];
      const isIncluded = current.includes(subject);
      const next = isIncluded ? current.filter(s => s !== subject) : [...current, subject];
      
      // Clean up URL if removed
      const nextUrls = { ...prev.subjectUrls };
      if (isIncluded) delete nextUrls[subject];
      
      return { ...prev, secondarySubjects: next, subjectUrls: nextUrls };
    });
  };

  const handleAIParse = () => {
    setIsParsing(true);
    setTimeout(() => {
      const input = chatInput.toLowerCase();
      const newForm = { ...form };
      if (input.includes("birthday")) newForm.eventType = "Birthday";
      else if (input.includes("wedding")) newForm.eventType = "Wedding";
      const names = chatInput.match(/[A-Z][a-z]+/g) || [];
      if (names.length > 0) newForm.primaryName = names[0];
      setForm(newForm);
      setIsParsing(false);
      setHasOptimized(true);
      setIsPromptGenerated(false);
    }, 1500);
  };

  const generatePrompt = () => {
    // 1. Image References (Conditioning)
    let conditioningSection = "";
    if (form.primaryPortraitUrl) {
      conditioningSection += `PRIMARY REFERENCE IMAGE (Facial Identity):\n${form.primaryPortraitUrl}\n\n`;
    }
    if (form.lifestyleActionUrl) {
      conditioningSection += `STYLE/ACTION REFERENCE (Composition):\n${form.lifestyleActionUrl}\n\n`;
    }

    const moodMap = {
      Birthday: "Vibrant, joyful, luxurious, and uplifting.",
      Wedding: "Romantic, pure, sophisticated, and timeless.",
      Anniversary: "Warm, grateful, classy, and intimate.",
      Dedication: "Spiritual, ethereal, inspirational, and calm.",
      Award: "Powerful, prestigious, clean, and professional."
    };

    const lightingMap = {
      "Modern Premium": "Cinematic soft glow, studio backlighting, atmospheric depth.",
      "Minimalist": "Soft diffused natural light, clean shadows, high-key lighting.",
      "Vibrant": "Dynamic colorful highlights, high-contrast glow, neon accents.",
      "Classic": "Warm golden hour glow, soft vignettes, classic Rembrandt lighting."
    };

    // 2. Main Subject Description
    let subjectDesc = "";
    if (form.eventType === "Wedding" && form.separateNames) {
      subjectDesc = `Create a high-end cinematic ${form.cardType.toLowerCase()} poster using the PRIMARY REFERENCE as the exact facial identity for the couple (${form.brideName} and ${form.groomName}).`;
    } else {
      subjectDesc = `Create a high-end cinematic ${form.cardType.toLowerCase()} poster using the PRIMARY REFERENCE as the exact facial identity reference for ${form.primaryName || "the main subject"}.`;
    }
    
    subjectDesc += `\n\nPreserve the exact face, skin tone, hairstyle, and likeness from the identity reference. Do not redesign or alter the facial structure. Maintain likeness accuracy.`;

    if (form.showCelebrantSecondary && form.lifestyleActionUrl) {
      subjectDesc += `\n\nUse the STYLE/ACTION REFERENCE only for composition inspiration and lifestyle action posing.`;
    }

    const secondaryList = [...(form.secondarySubjects || []), form.customSecondary].filter(Boolean).join(", ");
    if (secondaryList) {
      subjectDesc += `\n\nSecondary style elements: ${secondaryList}.`;
    }
    
    const masterPrompt = `${conditioningSection}PROMPT:
${subjectDesc}

Theme: ${form.title.toUpperCase()}

Color Palette:
${form.primaryColor} and ${form.secondaryColor}

Lighting:
${lightingMap[form.theme] || lightingMap["Modern Premium"]}

Typography:
"${form.title}"
${form.primaryName ? `"${form.primaryName}"` : ""}
${form.showDate ? `Date: ${form.date}` : ""}
${form.showVenue ? `Venue: ${form.venue}` : ""}

Mood:
${moodMap[form.eventType] || moodMap["Birthday"]}

Style:
${form.theme} aesthetic, ultra-detailed, professional event flyer grade, 8k resolution.`.trim();

    return masterPrompt;
  };

  const StepHeader = ({ icon, title }) => (
    <div className="flex items-center justify-between mb-6 shrink-0 gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className={t.headerIcon}>{icon}</div>
        <h2 className={`text-base md:text-lg font-bold tracking-tight truncate ${t.text}`}>{title}</h2>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-sm backdrop-blur-md shrink-0">
        {eventConfigs[form.eventType]?.icon}
        <span className={`${t.label} hidden md:inline`}>{form.eventType}</span>
      </div>
    </div>
  );

  const ModernSelect = ({ value, onChange, options, label }) => (
    <div className="space-y-1.5 flex-1 min-w-0">
      {label && <label className={`${t.label} ml-1`}>{label}</label>}
      <div className="relative group">
        <select value={value} onChange={onChange} className={`w-full appearance-none rounded-2xl h-11 pl-4 pr-10 text-xs font-bold border transition-all cursor-pointer ${isDarkMode ? 'bg-slate-900/80 border-slate-700/50 text-white' : 'bg-slate-100 border-slate-300 text-slate-800'} focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 hover:border-indigo-500/30`}>
          {options.map(opt => <option key={opt} value={opt} className={isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-800'}>{opt}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none group-hover:text-indigo-400 transition-colors" />
      </div>
    </div>
  );

  const StandardInput = ({ label, value, onChange, placeholder }) => (
    <div className="space-y-1.5 flex-1 min-w-0">
      <label className={`${t.label} ml-1`}>{label}</label>
      <Input value={value} onChange={onChange} placeholder={placeholder} className={`h-11 rounded-xl text-sm font-medium ${t.input}`} />
    </div>
  );

  const SummaryItem = ({ label, value }) => (
    <div className={`flex justify-between items-center py-2.5 border-b ${isDarkMode ? 'border-indigo-500/10' : 'border-slate-200'}`}>
      <span className={t.label}>{label}</span>
      <span className={`text-xs font-medium truncate max-w-[140px] text-right ${t.text}`}>{value || "---"}</span>
    </div>
  );

  return (
    <div className={`h-screen flex flex-col transition-colors duration-300 ${t.bg} font-sans overflow-hidden relative`}>
      {/* Mobile Drawer — sits behind, revealed by push */}
      {isSidebarOpen && <aside className={`fixed left-0 top-0 h-full w-[280px] z-30 lg:hidden ${isDarkMode ? 'bg-slate-950 border-r border-slate-800' : 'bg-white border-r border-slate-200'} p-6 overflow-y-auto custom-scrollbar`}>
        <div className="space-y-8">
          {/* Theme Toggle — Mobile Only */}
          <div className="flex items-center justify-between">
            <span className={`${t.label} ${t.text}`}>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
            <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} className={`rounded-full w-9 h-9 transition-all ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-slate-900/10'}`}>{isDarkMode ? <Sun className="w-4 h-4 text-white" /> : <Moon className="w-4 h-4 text-slate-600" />}</Button>
          </div>
          <div className="space-y-3">
            <p className={`${t.label} px-3`}>Workflow</p>
            {[
              { id: "chat", icon: <MessageSquare className="w-4 h-4" />, label: "Quick Concept", hidden: globalMode === "Pro" },
              { id: "content", icon: <Type className="w-4 h-4" />, label: "Content Details", hidden: globalMode === "Simple" },
              { id: "images", icon: <ImageIcon className="w-4 h-4" />, label: "Subject Images" },
              { id: "style", icon: <Palette className="w-4 h-4" />, label: "Aesthetics" }
            ].filter(i => !i.hidden).map(item => (
              <button key={item.id} onClick={() => { setTab(item.id); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${tab === item.id ? "bg-indigo-600 text-white shadow-xl translate-x-1" : isDarkMode ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200"}`}>{item.icon}<span className="font-bold text-sm">{item.label}</span></button>
            ))}
          </div>
          <div className="pt-8 border-t border-slate-800/50 space-y-4">
            <p className={`${t.label} px-3`}>Event Type</p>
            {Object.entries(eventConfigs).map(([key, cfg]) => (
              <button key={key} onClick={() => { handleChange('eventType', key); setIsSidebarOpen(false); }} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition-all ${form.eventType === key ? "text-indigo-400 bg-indigo-400/10 border border-indigo-500/20" : isDarkMode ? "text-slate-500 hover:text-slate-300 hover:bg-slate-800/30" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200"}`}>
                <span className="flex items-center gap-2.5">{cfg.icon}{key.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>}

      {/* Main Content Wrapper — pushes right on mobile when drawer is open */}
      <div className={`flex flex-col h-full transition-transform duration-300 ease-out ${isSidebarOpen ? 'translate-x-[280px] lg:translate-x-0' : 'translate-x-0'}`}>
        {/* Negative space tap target to close drawer */}
        {isSidebarOpen && <div className="absolute inset-0 z-[60] lg:hidden" onClick={() => setIsSidebarOpen(false)} />}

        <header className={`border-b ${isDarkMode ? 'border-slate-800/50 bg-[#0f172a]/80' : 'border-slate-200 bg-white/80'} p-3 md:p-4 z-50 backdrop-blur-md flex justify-between items-center shrink-0`}>
          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`lg:hidden p-1 transition-opacity ${isDarkMode ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>{isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
            <div className="w-9 h-9 md:w-11 md:h-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20"><Sparkles className="text-white w-5 h-5 md:w-6 md:h-6" /></div>
            <div className="flex flex-col justify-center h-9 md:h-11">
              <h1 className={`text-base md:text-xl font-black tracking-tighter leading-[1] ${t.text}`}>GRAFIGEN</h1>
              <p className={`text-[10px] md:text-[13px] font-black tracking-[0.15em] leading-[1] -mt-0.5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>STUDIO</p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <div className={`flex ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-200'} p-1 rounded-full border ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
              {["Simple", "Pro"].map(m => (
                <button key={m} onClick={() => { setGlobalMode(m); setTab(m === "Simple" ? "chat" : "content"); }} className={`px-3 md:px-5 py-1.5 rounded-full text-[10px] md:text-xs font-black transition-all ${globalMode === m ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500"}`}>{m}</button>
              ))}
            </div>
            
            {localStorage.getItem("user_session") ? (
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[10px] font-black text-indigo-400">
                  {JSON.parse(localStorage.getItem("user_session")).name.charAt(0)}
                </div>
                <Button variant="ghost" size="sm" onClick={() => { localStorage.removeItem("user_session"); window.location.reload(); }} className="text-[10px] font-black tracking-widest text-slate-500 hover:text-red-400">LOGOUT</Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" className={`text-xs font-black tracking-widest ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>LOGIN</Button>
              </Link>
            )}

            {/* Theme toggle — desktop only in header */}
            <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} className={`hidden md:flex rounded-full w-9 h-9 md:w-11 md:h-11 transition-all ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-slate-900/10'}`}>{isDarkMode ? <Sun className="w-4 h-4 md:w-5 md:h-5 text-white" /> : <Moon className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />}</Button>
          </div>
        </header>

        <main className="flex-1 overflow-hidden grid lg:grid-cols-[240px_1fr_1fr] relative">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block p-6 overflow-y-auto custom-scrollbar">
            <div className="space-y-10">
              <div className="space-y-3">
                <p className={`${t.label} px-3`}>Workflow</p>
                {[
                  { id: "chat", icon: <MessageSquare className="w-4 h-4" />, label: "Quick Concept", hidden: globalMode === "Pro" },
                  { id: "content", icon: <Type className="w-4 h-4" />, label: "Content Details", hidden: globalMode === "Simple" },
                  { id: "images", icon: <ImageIcon className="w-4 h-4" />, label: "Subject Images" },
                  { id: "style", icon: <Palette className="w-4 h-4" />, label: "Aesthetics" }
                ].filter(i => !i.hidden).map(item => (
                  <button key={item.id} onClick={() => setTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${tab === item.id ? "bg-indigo-600 text-white shadow-xl translate-x-1" : isDarkMode ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200"}`}>{item.icon}<span className="font-bold text-sm">{item.label}</span></button>
                ))}
              </div>
              <div className="pt-10 border-t border-slate-800/50 space-y-4">
                <p className={`${t.label} px-3`}>Event Type</p>
                {Object.entries(eventConfigs).map(([key, cfg]) => (
                  <button key={key} onClick={() => handleChange('eventType', key)} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition-all ${form.eventType === key ? "text-indigo-400 bg-indigo-400/10 border border-indigo-500/20" : isDarkMode ? "text-slate-500 hover:text-slate-300 hover:bg-slate-800/30" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200"}`}>
                    <span className="flex items-center gap-2.5">{cfg.icon}{key.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

        <section className={`flex flex-col overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar ${isPromptGenerated ? 'hidden lg:flex' : 'flex'}`}>
          <Card className={`${t.card} p-5 md:p-8 border-0 relative rounded-2xl`}>
            <CardContent className="p-0 space-y-8">
              {tab === "chat" && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <StepHeader icon={<Sparkles className="w-5 h-5" />} title="Quick Concept" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button onClick={() => handleChange('cardType', 'Celebratory')} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${form.cardType === 'Celebratory' ? "bg-indigo-600 text-white shadow-xl border-indigo-400" : isDarkMode ? "bg-slate-900/50 border-slate-800" : "bg-slate-50 border-slate-200"}`}><div className={`p-2.5 rounded-xl ${form.cardType === 'Celebratory' ? "bg-white/20" : "bg-indigo-500/20 text-indigo-400"}`}><Share2 className="w-5 h-5" /></div><div className="text-left"><p className={`text-sm font-black ${form.cardType === 'Celebratory' ? 'text-white' : t.text}`}>Celebratory</p><p className={`text-[9px] uppercase font-black tracking-widest ${form.cardType === 'Celebratory' ? 'text-white/70' : 'text-slate-500'}`}>Social Post</p></div></button>
                    <button onClick={() => handleChange('cardType', 'Invitation')} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${form.cardType === 'Invitation' ? "bg-indigo-600 text-white shadow-xl border-indigo-400" : isDarkMode ? "bg-slate-900/50 border-slate-800" : "bg-slate-50 border-slate-200"}`}><div className={`p-2.5 rounded-xl ${form.cardType === 'Invitation' ? "bg-white/20" : "bg-indigo-500/20 text-indigo-400"}`}><MapPin className="w-5 h-5" /></div><div className="text-left"><p className={`text-sm font-black ${form.cardType === 'Invitation' ? 'text-white' : t.text}`}>Invitation</p><p className={`text-[9px] uppercase font-black tracking-widest ${form.cardType === 'Invitation' ? 'text-white/70' : 'text-slate-500'}`}>Event Details</p></div></button>
                  </div>
                  <Textarea placeholder="Describe your vision..." className={`min-h-[140px] md:min-h-[180px] ${t.input} text-base rounded-xl p-5 focus:ring-2 transition-all`} value={chatInput} onChange={(e) => { setChatInput(e.target.value); setHasOptimized(false); }} />
                  <div className="flex justify-end"><Button className={t.buttonPrimary} disabled={!chatInput || isParsing} onClick={handleAIParse}>{isParsing ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />} OPTIMIZE</Button></div>
                  {hasOptimized && (
                    <div className="pt-8 border-t border-slate-800/50 space-y-6 animate-in fade-in duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <StandardInput label="Event Title" value={form.title} onChange={e => handleChange('title', e.target.value)} />
                        <StandardInput label="Celebrant Name" value={form.primaryName} onChange={e => handleChange('primaryName', e.target.value)} />
                      </div>
                      <div className="flex justify-end"><Button className={t.buttonPrimary} onClick={() => setTab("images")}>NEXT STEP <ChevronRight className="w-4 h-4 ml-1" /></Button></div>
                    </div>
                  )}
                </div>
              )}

              {tab === "content" && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <StepHeader icon={<Type className="w-5 h-5" />} title="Content Details" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button onClick={() => handleChange('cardType', 'Celebratory')} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${form.cardType === 'Celebratory' ? "bg-indigo-600 text-white shadow-xl border-indigo-400" : isDarkMode ? "bg-slate-900/50 border-slate-800" : "bg-slate-50 border-slate-200"}`}><div className={`p-2.5 rounded-xl ${form.cardType === 'Celebratory' ? "bg-white/20" : "bg-indigo-500/20 text-indigo-400"}`}><Share2 className="w-5 h-5" /></div><div className="text-left"><p className={`text-sm font-black ${form.cardType === 'Celebratory' ? 'text-white' : t.text}`}>Celebratory</p><p className={`text-[9px] uppercase font-black tracking-widest ${form.cardType === 'Celebratory' ? 'text-white/70' : 'text-slate-500'}`}>Social Post</p></div></button>
                    <button onClick={() => handleChange('cardType', 'Invitation')} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${form.cardType === 'Invitation' ? "bg-indigo-600 text-white shadow-xl border-indigo-400" : isDarkMode ? "bg-slate-900/50 border-slate-800" : "bg-slate-50 border-slate-200"}`}><div className={`p-2.5 rounded-xl ${form.cardType === 'Invitation' ? "bg-white/20" : "bg-indigo-500/20 text-indigo-400"}`}><MapPin className="w-5 h-5" /></div><div className="text-left"><p className={`text-sm font-black ${form.cardType === 'Invitation' ? 'text-white' : t.text}`}>Invitation</p><p className={`text-[9px] uppercase font-black tracking-widest ${form.cardType === 'Invitation' ? 'text-white/70' : 'text-slate-500'}`}>Event Details</p></div></button>
                  </div>

                  <div className="space-y-5">
                    {/* Title Field — Toggle Activated */}
                    <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-slate-900/30 border-slate-700/30' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => handleChange('showTitle', !form.showTitle)}>
                        <span className={`${t.label} ${t.text}`}>{nameLabels[form.eventType]?.title || "Main Headline"}</span>
                        <Switch checked={form.showTitle} onCheckedChange={(v) => handleChange('showTitle', v)} />
                      </div>
                      {form.showTitle && (
                        <div className="px-4 pb-4 space-y-4">
                          <Input value={form.title} onChange={e => handleChange('title', e.target.value)} placeholder="Enter headline..." className={`h-11 rounded-xl text-sm font-medium ${t.input}`} />
                          <div className="grid grid-cols-2 gap-4">
                            <ModernSelect label="Size" value={form.titleSize} onChange={e => handleChange('titleSize', e.target.value)} options={["Large", "Extra Large", "Massive"]} />
                            <ModernSelect label="Position" value={form.titlePosition} onChange={e => handleChange('titlePosition', e.target.value)} options={["Top", "Center", "Lower Third"]} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Name Field — Context Aware */}
                    <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-slate-900/30 border-slate-700/30' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => handleChange('showName', !form.showName)}>
                        <span className={`${t.label} ${t.text}`}>{nameLabels[form.eventType]?.name || "Subject Name"}</span>
                        <Switch checked={form.showName} onCheckedChange={(v) => handleChange('showName', v)} />
                      </div>
                      {form.showName && (
                        <div className="px-4 pb-4 space-y-4">
                          {form.eventType === "Wedding" && (
                            <div className="flex items-center justify-between pb-3 mb-1">
                              <span className={t.label}>Separate Bride & Groom</span>
                              <Switch checked={form.separateNames} onCheckedChange={(v) => handleChange('separateNames', v)} />
                            </div>
                          )}
                          {form.eventType === "Wedding" && form.separateNames ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1.5"><label className={`${t.label} ml-1`}>Bride's Name</label><Input value={form.brideName} onChange={e => handleChange('brideName', e.target.value)} placeholder="Bride..." className={`h-11 rounded-xl text-sm font-medium ${t.input}`} /></div>
                              <div className="space-y-1.5"><label className={`${t.label} ml-1`}>Groom's Name</label><Input value={form.groomName} onChange={e => handleChange('groomName', e.target.value)} placeholder="Groom..." className={`h-11 rounded-xl text-sm font-medium ${t.input}`} /></div>
                            </div>
                          ) : (
                            <Input value={form.primaryName} onChange={e => handleChange('primaryName', e.target.value)} placeholder={nameLabels[form.eventType]?.name || "Name..."} className={`h-11 rounded-xl text-sm font-medium ${t.input}`} />
                          )}
                          <div className="grid grid-cols-2 gap-4">
                            <ModernSelect label="Presence" value={form.primaryNameSize} onChange={e => handleChange('primaryNameSize', e.target.value)} options={["Normal", "Large", "Extra Large"]} />
                            <ModernSelect label="Align" value={form.primaryNamePosition} onChange={e => handleChange('primaryNamePosition', e.target.value)} options={["Center", "Top", "Bottom"]} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Invitation-Only Fields */}
                    {form.cardType === "Invitation" && (
                      <>
                        {[
                          { key: 'showDate', label: 'Event Date', field: 'date', type: 'date', placeholder: '' },
                          { key: 'showTime', label: 'Event Time', field: 'time', type: 'time', placeholder: '' },
                          { key: 'showVenue', label: 'Venue / Location', field: 'venue', type: 'text', placeholder: 'Enter venue...' },
                          { key: 'showRsvp', label: 'RSVP / Event Link', field: 'rsvpLink', type: 'url', placeholder: 'https://...' }
                        ].map(item => (
                          <div key={item.key} className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-slate-900/30 border-slate-700/30' : 'bg-slate-50 border-slate-200'}`}>
                            <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => handleChange(item.key, !form[item.key])}>
                              <span className={`${t.label} ${t.text}`}>{item.label}</span>
                              <Switch checked={form[item.key]} onCheckedChange={(v) => handleChange(item.key, v)} />
                            </div>
                            {form[item.key] && (
                              <div className="px-4 pb-4">
                                <Input type={item.type} value={form[item.field]} onChange={e => handleChange(item.field, e.target.value)} placeholder={item.placeholder} className={`h-11 rounded-xl text-sm font-medium ${t.input}`} />
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>

                  <div className="flex justify-end pt-8 border-t border-slate-800/50"><Button className={t.buttonPrimary} onClick={() => setTab("images")}>NEXT STEP <ChevronRight className="w-4 h-4 ml-1" /></Button></div>
                </div>
              )}

              {tab === "images" && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <StepHeader icon={<ImageIcon className="w-5 h-5" />} title="Reference Conditioning" />
                  <div className="space-y-4">
                    {[
                      { key: 'showPrimaryName', label: 'Identity Reference (Face)', urlKey: 'primaryPortraitUrl', desc: 'Preserves exact facial likeness' },
                      { key: 'showCelebrantSecondary', label: 'Style Reference (Action)', urlKey: 'lifestyleActionUrl', desc: 'Composition & posing inspiration' }
                    ].map(row => (
                      <div key={row.key} className="space-y-3">
                        <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isDarkMode ? 'bg-indigo-500/5 border-indigo-500/10' : 'bg-slate-50 border-slate-200'}`}>
                          <div className="flex flex-col">
                            <span className={`${t.label} ${t.text}`}>{row.label}</span>
                            <span className="text-[9px] font-medium text-slate-500 uppercase tracking-wider">{row.desc}</span>
                          </div>
                          <Switch checked={form[row.key]} onCheckedChange={(v) => handleChange(row.key, v)} />
                        </div>
                        {form[row.key] && (
                          <div className="flex items-center gap-4 animate-in slide-in-from-top-2 duration-300">
                            <Button 
                              onClick={() => handleImageUpload(row.urlKey)} 
                              variant="outline" 
                              className={`flex-1 h-11 border-dashed border-2 ${isDarkMode ? 'border-slate-700 hover:border-indigo-500 bg-slate-900/50' : 'border-slate-300 hover:border-indigo-500 bg-white'} rounded-xl text-[10px] font-black tracking-widest text-slate-500 hover:text-indigo-400 transition-all`}
                            >
                              {form[row.urlKey] ? (
                                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> IMAGE ATTACHED</span>
                              ) : (
                                <span className="flex items-center gap-2"><Plus className="w-4 h-4" /> ATTACH IMAGE</span>
                              )}
                            </Button>
                            {form[row.urlKey] && (
                              <div className="w-11 h-11 rounded-lg overflow-hidden border border-slate-700 bg-slate-800 shrink-0">
                                <img src={form[row.urlKey]} alt="Preview" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <p className={`${t.label} ml-1`}>Inclusions</p>
                    <div className="grid grid-cols-1 gap-3">
                      {currentPresets.map(subject => (
                        <div key={subject} className="space-y-2">
                          <div onClick={() => handleSubjectToggle(subject)} className={`flex items-center justify-between gap-3 p-4 rounded-xl border cursor-pointer transition-all ${form.secondarySubjects.includes(subject) ? "bg-indigo-600/10 border-indigo-500 shadow-lg" : isDarkMode ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"}`}>
                            <span className={`${t.label} truncate ${t.text}`}>{subject}</span>
                            <div onClick={(e) => e.stopPropagation()}><Checkbox checked={form.secondarySubjects.includes(subject)} onCheckedChange={() => handleSubjectToggle(subject)} /></div>
                          </div>
                          {form.secondarySubjects.includes(subject) && (
                            <div className="flex items-center gap-4 pl-4 animate-in slide-in-from-left-2 duration-300">
                              <Button 
                                onClick={() => handleImageUpload(null, subject)} 
                                variant="outline" 
                                className={`flex-1 h-10 border-dashed border-2 ${isDarkMode ? 'border-slate-800 hover:border-indigo-500 bg-slate-950/30' : 'border-slate-200 hover:border-indigo-500 bg-slate-50'} rounded-lg text-[9px] font-black tracking-widest text-slate-500 hover:text-indigo-400 transition-all`}
                              >
                                {form.subjectUrls[subject] ? (
                                  <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> SYNC'D</span>
                                ) : (
                                  <span className="flex items-center gap-2"><Plus className="w-3 h-3" /> ATTACH {subject.toUpperCase()}</span>
                                )}
                              </Button>
                              {form.subjectUrls[subject] && (
                                <div className="w-10 h-10 rounded-md overflow-hidden border border-slate-800 bg-slate-900 shrink-0">
                                  <img src={form.subjectUrls[subject]} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <StandardInput label="Custom" placeholder="Other..." value={form.customSecondary} onChange={e => handleChange('customSecondary', e.target.value)} />
                  </div>
                  <div className="flex justify-end pt-8 border-t border-slate-800/50"><Button className={t.buttonPrimary} onClick={() => setTab("style")}>NEXT STEP <ChevronRight className="w-4 h-4 ml-1" /></Button></div>
                </div>
              )}

              {tab === "style" && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <StepHeader icon={<Palette className="w-5 h-5" />} title="Aesthetics" />
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {palettes.map(p => (
                      <button key={p.name} onClick={() => { handleChange('primaryColor', p.primary); handleChange('secondaryColor', p.secondary); }} className={`p-5 rounded-2xl border transition-all text-left ${form.primaryColor === p.primary ? "bg-indigo-600/10 border-indigo-500 shadow-xl" : isDarkMode ? "bg-slate-900/50 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
                        <p className={`text-[11px] font-semibold uppercase mb-3 tracking-tight ${form.primaryColor === p.primary ? "text-indigo-400" : "text-slate-500"}`}>{p.name}</p>
                        <div className="flex gap-3"><div className="w-10 h-10 rounded-xl shadow-lg" style={{ backgroundColor: p.primary }} /><div className="w-10 h-10 rounded-xl shadow-lg border border-slate-700/20" style={{ backgroundColor: p.secondary }} /></div>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end pt-8 border-t border-slate-800/50">
                    <Button className={`${t.buttonPrimary} w-full sm:w-auto h-14 text-sm`} onClick={() => setIsPromptGenerated(true)}>FINALIZE PROMPT <Zap className="w-4 h-4 ml-2" /></Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <aside className={`flex flex-col overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar ${isPromptGenerated ? 'flex fixed inset-0 z-[60] lg:relative lg:z-auto' : 'hidden lg:flex'}`}>
          <Card className={`${t.card} p-[50px] border-0 h-full flex flex-col relative rounded-2xl overflow-hidden`}>
            {isPromptGenerated && <div className="absolute top-6 right-6 z-[70] lg:hidden"><Button onClick={() => setIsPromptGenerated(false)} variant="ghost" size="icon" className="rounded-full bg-slate-900/50 text-white"><X className="w-5 h-5" /></Button></div>}
            
            <div className="flex items-center justify-between mb-8 shrink-0 relative z-10">
              <h2 className="font-black flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-500">
                <Layout className="w-4 h-4 text-indigo-400" /> {isPromptGenerated ? "Master Prompt" : "Graphic Data"}
              </h2>
              {!isPromptGenerated && <span className="text-[8px] font-black tracking-widest px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">LIVE SUMMARY</span>}
            </div>

            <div className="flex-1 relative rounded-xl overflow-hidden min-h-[300px]">
              {isPromptGenerated ? (
                <div className="h-full animate-in zoom-in-95 fade-in duration-500 flex flex-col">
                  <Textarea value={generatePrompt()} readOnly className={`flex-1 border-0 rounded-xl p-6 text-xs font-mono leading-relaxed resize-none ${isDarkMode ? 'bg-slate-950/80 text-indigo-100/80' : 'bg-slate-100 text-slate-700'}`} />
                  <div className="flex gap-4 pt-6"><Button onClick={() => { navigator.clipboard.writeText(generatePrompt()); alert("Prompt Copied!"); }} className="flex-1 bg-indigo-600 h-14 font-black tracking-widest text-white rounded-xl shadow-indigo-600/20"><Copy className="w-4 h-4 mr-2" /> COPY PROMPT</Button></div>
                </div>
              ) : (
                <div className="h-full flex flex-col space-y-2 p-1 overflow-y-auto custom-scrollbar">
                  <SummaryItem label="Event Type" value={form.eventType} />
                  <SummaryItem label="Design Mode" value={form.cardType === "Celebratory" ? "Social Media" : "Official Invitation"} />
                  {form.showTitle && <SummaryItem label="Headline" value={form.title} />}
                  {form.showName && (form.eventType === "Wedding" && form.separateNames
                    ? <SummaryItem label="Couple" value={[form.brideName, form.groomName].filter(Boolean).join(" & ") || "---"} />
                    : <SummaryItem label={nameLabels[form.eventType]?.name || "Subject"} value={form.primaryName} />
                  )}
                  <SummaryItem label="Inclusions" value={(form.secondarySubjects || []).join(", ") || "None"} />
                  {form.cardType === "Invitation" && form.showDate && <SummaryItem label="Date" value={form.date} />}
                  {form.cardType === "Invitation" && form.showTime && <SummaryItem label="Time" value={form.time} />}
                  {form.cardType === "Invitation" && form.showVenue && <SummaryItem label="Venue" value={form.venue} />}
                  {form.cardType === "Invitation" && form.showRsvp && <SummaryItem label="RSVP Link" value={form.rsvpLink} />}
                  <SummaryItem label="Theme" value={form.theme} />
                </div>
              )}
            </div>
          </Card>
        </aside>
        </main>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.2); border-radius: 10px; }
        .animate-in { animation: fade-in 0.5s ease-out; }
      `}</style>
    </div>
  );
}
