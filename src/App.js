import { useState, useEffect, useRef } from "react";

const REV_INTERVALS = [3,7,30,90];
const REV_META = [
  {label:"Rev 1",desc:"Solve from scratch",   xp:10,bg:"#fef3c7",border:"#fbbf24",text:"#78350f",dot:"#f59e0b",bar:"linear-gradient(90deg,#f59e0b,#fbbf24)"},
  {label:"Rev 2",desc:"Solve + edge cases",   xp:10,bg:"#ede9fe",border:"#a78bfa",text:"#4c1d95",dot:"#8b5cf6",bar:"linear-gradient(90deg,#8b5cf6,#a78bfa)"},
  {label:"Rev 3",desc:"Pseudocode / dry run", xp:10,bg:"#dbeafe",border:"#60a5fa",text:"#1e3a8a",dot:"#3b82f6",bar:"linear-gradient(90deg,#3b82f6,#60a5fa)"},
  {label:"Rev 4",desc:"Final recall 🏆",      xp:50,bg:"#d1fae5",border:"#34d399",text:"#064e3b",dot:"#10b981",bar:"linear-gradient(90deg,#10b981,#34d399)"},
];
const TOPIC_BG = {
  "Arrays":             {bg:"#fff7ed",border:"#fb923c",text:"#7c2d12",pill:"#ea580c"},
  "Binary Search":      {bg:"#f5f3ff",border:"#a78bfa",text:"#4c1d95",pill:"#7c3aed"},
  "Strings":            {bg:"#ecfdf5",border:"#34d399",text:"#064e3b",pill:"#059669"},
  "Linked List":        {bg:"#fff1f2",border:"#fb7185",text:"#881337",pill:"#e11d48"},
  "Recursion":          {bg:"#ecfeff",border:"#22d3ee",text:"#164e63",pill:"#0891b2"},
  "Backtracking":       {bg:"#fdf4ff",border:"#e879f9",text:"#701a75",pill:"#a21caf"},
  "Sorting":            {bg:"#eff6ff",border:"#60a5fa",text:"#1e3a8a",pill:"#2563eb"},
  "Bit Manipulation":   {bg:"#faf5ff",border:"#c084fc",text:"#581c87",pill:"#9333ea"},
  "Stack & Queue":      {bg:"#fff7ed",border:"#fdba74",text:"#9a3412",pill:"#ea580c"},
  "Sliding Window":     {bg:"#f0fdfa",border:"#2dd4bf",text:"#134e4a",pill:"#0d9488"},
  "Heap":               {bg:"#f0fdf4",border:"#4ade80",text:"#14532d",pill:"#16a34a"},
  "Greedy":             {bg:"#fefce8",border:"#facc15",text:"#713f12",pill:"#ca8a04"},
  "Binary Trees":       {bg:"#eef2ff",border:"#818cf8",text:"#312e81",pill:"#4f46e5"},
  "BST":                {bg:"#fdf2f8",border:"#f0abfc",text:"#701a75",pill:"#c026d3"},
  "Graphs":             {bg:"#f0f9ff",border:"#38bdf8",text:"#0c4a6e",pill:"#0284c7"},
  "Dynamic Programming":{bg:"#fef2f2",border:"#fca5a5",text:"#7f1d1d",pill:"#dc2626"},
  "Tries":              {bg:"#fff7ed",border:"#fb923c",text:"#7c2d12",pill:"#f97316"},
};
const TC  = t => TOPIC_BG[t] || {bg:"#f1f5f9",border:"#94a3b8",text:"#334155",pill:"#64748b"};
const TOPICS   = Object.keys(TOPIC_BG);
const PATTERNS = ["Two Pointer","Sliding Window","Binary Search","BFS/DFS","Dynamic Programming","Backtracking","Greedy","Monotonic Stack","Prefix Sum","Hashing","Recursion","Heap/PQ","Union Find","Trie","Bit Manipulation","Fast & Slow Pointer"];
const LEVELS = [
  {min:0,  max:9,  name:"Newbie",        emoji:"🐣",bg:"#f1f5f9",accent:"#64748b",bar:"linear-gradient(90deg,#94a3b8,#64748b)"},
  {min:10, max:24, name:"Learner",       emoji:"📚",bg:"#eff6ff",accent:"#3b82f6",bar:"linear-gradient(90deg,#60a5fa,#3b82f6)"},
  {min:25, max:49, name:"Coder",         emoji:"💻",bg:"#ecfdf5",accent:"#10b981",bar:"linear-gradient(90deg,#34d399,#10b981)"},
  {min:50, max:99, name:"Problem Solver",emoji:"🧠",bg:"#f5f3ff",accent:"#8b5cf6",bar:"linear-gradient(90deg,#a78bfa,#8b5cf6)"},
  {min:100,max:149,name:"Pattern Hunter",emoji:"🎯",bg:"#fffbeb",accent:"#f59e0b",bar:"linear-gradient(90deg,#fbbf24,#f59e0b)"},
  {min:150,max:199,name:"DSA Warrior",   emoji:"⚔️",bg:"#fff7ed",accent:"#f97316",bar:"linear-gradient(90deg,#fb923c,#f97316)"},
  {min:200,max:299,name:"Algorithm Pro", emoji:"🚀",bg:"#fef2f2",accent:"#ef4444",bar:"linear-gradient(90deg,#f87171,#ef4444)"},
  {min:300,max:999,name:"DSA Master",    emoji:"👑",bg:"#fefce8",accent:"#eab308",bar:"linear-gradient(90deg,#facc15,#eab308,#f97316)"},
];
const QUOTES = [
  "Every expert was once a beginner. Keep going 💪",
  "Consistency beats intensity. Show up today.",
  "Hard problems today = easy interviews tomorrow.",
  "Progress, not perfection.",
  "Trust the process. The sheet works if you work.",
  "One problem at a time. That's all it takes.",
  "Your future self is watching. Make them proud.",
];
const todayStr = () => new Date().toISOString().split("T")[0];
const addDays  = (d,n) => { const dt=new Date(d); dt.setDate(dt.getDate()+n); return dt.toISOString().split("T")[0]; };
const fmtTime  = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
const EMPTY = {id:null,topic:"",name:"",link:"",difficulty:"",note:"",pattern:[],status:"Unsolved",solvedDate:"",revStage:0,revDates:[],bookmarked:false};

// Google Fonts injector
const injectFonts = () => {
  if(document.getElementById("gfonts")) return;
  const l=document.createElement("link"); l.id="gfonts";
  l.rel="stylesheet";
  l.href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap";
  document.head.appendChild(l);
};
injectFonts();

export default function App() {
  const [problems,     setProblems]     = useState([]);
  const [tab,          setTab]          = useState("today");
  const [filter,       setFilter]       = useState("All");
  const [topicFilter,  setTopicFilter]  = useState("");
  const [patternFilter,setPatternFilter]= useState("");
  const [modal,        setModal]        = useState(null);
  const [form,         setForm]         = useState(EMPTY);
  const [search,       setSearch]       = useState("");
  const [xp,           setXp]           = useState(0);
  const [streak,       setStreak]       = useState({count:0,lastDate:""});
  const [toast,        setToast]        = useState(null);
  const [sparks,       setSparks]       = useState([]);
  const [quote]                         = useState(()=>QUOTES[Math.floor(Math.random()*QUOTES.length)]);
  const [dark,         setDark]         = useState(false);
  const [activityLog,  setActivityLog]  = useState({});
  const [weeklyGoal]                    = useState(5);
  const [loaded,       setLoaded]       = useState(false);
  const [topicNotes,   setTopicNotes]   = useState({});
  const [notesTopic,   setNotesTopic]   = useState(TOPICS[0]);
  // Timer
  const [timerSec,     setTimerSec]     = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerTarget]                   = useState(20*60);
  const timerRef                        = useRef(null);
  // Calendar
  const [calHover,     setCalHover]     = useState(null);

  const today = todayStr();

  // ── Persistence (localStorage) ──
  useEffect(() => {
    try {
      const p  = localStorage.getItem("dsa_problems");
      const x  = localStorage.getItem("dsa_xp");
      const s  = localStorage.getItem("dsa_streak");
      const a  = localStorage.getItem("dsa_activityLog");
      const d  = localStorage.getItem("dsa_darkMode");
      const tn = localStorage.getItem("dsa_topicNotes");
      if(p)  setProblems(JSON.parse(p));
      if(x)  setXp(Number(x));
      if(s)  setStreak(JSON.parse(s));
      if(a)  setActivityLog(JSON.parse(a));
      if(d)  setDark(d==="true");
      if(tn) setTopicNotes(JSON.parse(tn));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(()=>{ if(!loaded) return; localStorage.setItem("dsa_problems",    JSON.stringify(problems));    },[problems,loaded]);
  useEffect(()=>{ if(!loaded) return; localStorage.setItem("dsa_xp",          String(xp));                  },[xp,loaded]);
  useEffect(()=>{ if(!loaded) return; localStorage.setItem("dsa_streak",      JSON.stringify(streak));      },[streak,loaded]);
  useEffect(()=>{ if(!loaded) return; localStorage.setItem("dsa_activityLog", JSON.stringify(activityLog)); },[activityLog,loaded]);
  useEffect(()=>{ if(!loaded) return; localStorage.setItem("dsa_darkMode",    String(dark));                },[dark,loaded]);
  useEffect(()=>{ if(!loaded) return; localStorage.setItem("dsa_topicNotes",  JSON.stringify(topicNotes));  },[topicNotes,loaded]);

  const logActivity = () => setActivityLog(prev=>({...prev,[today]:(prev[today]||0)+1}));

  // ── Timer ──
  useEffect(()=>{
    if(timerRunning){ timerRef.current=setInterval(()=>setTimerSec(s=>s+1),1000); }
    else clearInterval(timerRef.current);
    return ()=>clearInterval(timerRef.current);
  },[timerRunning]);
  const resetTimer = () => { setTimerRunning(false); setTimerSec(0); };

  // ── Theme ──
  const T = dark ? {
    pageBg:"#0f0f1a",cardBg:"#1a1a2e",cardBorder:"#2d2d4e",text:"#e2e8f0",
    subtext:"#94a3b8",inputBg:"#0f172a",inputBorder:"#334155",
    rowAlt:"#1e2035",chipBg:"#1e293b",chipBorder:"#334155",mutedBg:"#0f172a",
  } : {
    pageBg:"#f8fafc",cardBg:"white",cardBorder:"#e5e7eb",text:"#111",
    subtext:"#6b7280",inputBg:"#f8fafc",inputBorder:"#e5e7eb",
    rowAlt:"#f8fafc",chipBg:"white",chipBorder:"#e5e7eb",mutedBg:"#f1f5f9",
  };
  const TCd = t => { const b=TC(t); if(!dark) return b; return {bg:"#1e293b",border:b.pill+"55",text:b.pill,pill:b.pill}; };

  // ── Derived ──
  const solved   = problems.filter(p=>p.status!=="Unsolved");
  const mastered = problems.filter(p=>p.revStage>=4);
  const bookmarked = problems.filter(p=>p.bookmarked);
  const getNR  = p => p.revDates[p.revStage]||null;
  const due    = solved.filter(p=>p.revStage<4&&getNR(p)&&getNR(p)<=today);
  const upcoming = solved.filter(p=>{ if(p.revStage>=4) return false; const d=getNR(p); if(!d) return false; const diff=(new Date(d)-new Date(today))/86400000; return diff>0&&diff<=3; });
  const weakTopics = (()=>{ const m={}; solved.forEach(p=>{ if(!p.topic) return; if(!m[p.topic]) m[p.topic]={hard:0,total:0}; m[p.topic].total++; if(p.difficulty==="🔴 Hard") m[p.topic].hard++; }); return Object.entries(m).filter(([,v])=>v.total>=2&&v.hard/v.total>=0.5).map(([t])=>t); })();

  const level  = LEVELS.find(l=>solved.length>=l.min&&solved.length<=l.max)||LEVELS[0];
  const nextLvl= LEVELS.find(l=>l.min>solved.length);
  const lvlPct = nextLvl?Math.round((solved.length-level.min)/(nextLvl.min-level.min)*100):100;

  const weekStart = (()=>{ const d=new Date(today); d.setDate(d.getDate()-d.getDay()); return d.toISOString().split("T")[0]; })();
  const solvedThisWeek = problems.filter(p=>p.solvedDate>=weekStart&&p.solvedDate<=today).length;
  const weeklyPct = Math.min(Math.round(solvedThisWeek/weeklyGoal*100),100);

  // 7-day calendar
  const calDays = Array.from({length:7},(_,i)=>{ const d=new Date(today); d.setDate(d.getDate()+i); const s=d.toISOString().split("T")[0]; const dayName=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()]; const items=solved.filter(p=>p.revStage<4&&getNR(p)===s); return {date:s,dayName,items}; });

  // Heatmap
  const heatDays = Array.from({length:84},(_,i)=>{ const d=new Date(today); d.setDate(d.getDate()-(83-i)); return d.toISOString().split("T")[0]; });
  const maxAct   = Math.max(1,...Object.values(activityLog));
  const heatColor= date=>{ const v=activityLog[date]||0; if(!v) return dark?"#1e293b":"#f1f5f9"; const iv=v/maxAct; if(iv<0.25) return dark?"#1e3a5f":"#dbeafe"; if(iv<0.5) return dark?"#1d4ed8":"#93c5fd"; if(iv<0.75) return dark?"#2563eb":"#3b82f6"; return dark?"#60a5fa":"#1d4ed8"; };

  // Overdue count
  const overdueCount = due.filter(p=>getNR(p)<today).length;

  // ── Actions ──
  const boom = () => { setSparks(Array.from({length:24},(_,i)=>({id:i,x:20+Math.random()*60,c:["#f59e0b","#ef4444","#10b981","#8b5cf6","#f43f5e","#06b6d4","#a855f7","#22d3ee","#84cc16"][i%9],sz:5+Math.random()*8,dl:Math.random()*0.5,shape:i%3===0?"50%":"2px"}))); setTimeout(()=>setSparks([]),2000); };
  const toast$=(msg,bg,border)=>{ setToast({msg,bg,border}); setTimeout(()=>setToast(null),2600); };
  const bumpStreak=()=>setStreak(p=>{ if(p.lastDate===today) return p; const y=addDays(today,-1); return {count:p.lastDate===y?p.count+1:1,lastDate:today}; });

  const markSolved = id => {
    setProblems(prev=>prev.map(p=>p.id!==id?p:{...p,status:"Solved",solvedDate:today,revStage:0,revDates:REV_INTERVALS.map(n=>addDays(today,n))}));
    setXp(x=>x+20); bumpStreak(); boom(); logActivity();
    toast$("✅ +20 XP — Solved! Revision in 3 days 🎯","#d1fae5","#34d399");
  };
  const markRev = (id,fb) => {
    const wasMaster=problems.find(x=>x.id===id)?.revStage===3&&fb==="easy";
    setProblems(prev=>prev.map(p=>{ if(p.id!==id) return p; const ns=fb==="easy"?p.revStage+1:p.revStage; const nd=[...p.revDates]; if(fb==="hard") nd[p.revStage]=addDays(today,2); return {...p,revStage:ns,revDates:nd}; }));
    if(wasMaster){ setXp(x=>x+50); boom(); logActivity(); toast$("👑 +50 XP — MASTERED! 🏆","#fef9c3","#facc15"); }
    else if(fb==="easy"){ setXp(x=>x+10); logActivity(); toast$("+10 XP — Rev done! 😊","#ede9fe","#a78bfa"); }
    else { setXp(x=>x+5); logActivity(); toast$("+5 XP — Rescheduled +2 days 💪","#fef3c7","#fbbf24"); }
    bumpStreak();
  };
  const toggleBookmark = id => setProblems(prev=>prev.map(p=>p.id!==id?p:{...p,bookmarked:!p.bookmarked}));
  const deleteProblem  = id => setProblems(prev=>prev.filter(p=>p.id!==id));
  const togglePat  = pt => setForm(f=>({...f,pattern:(f.pattern||[]).includes(pt)?f.pattern.filter(x=>x!==pt):[...(f.pattern||[]),pt]}));
  const openAdd    = () => { setForm({...EMPTY,id:Date.now()}); setModal("add"); };
  const openEdit   = p  => { setForm({...p}); setModal("edit"); };
  const closeModal = () => { setModal(null); setForm(EMPTY); };
  const saveForm   = () => { if(!form.name.trim()) return; if(modal==="add") setProblems(prev=>[...prev,form]); else setProblems(prev=>prev.map(p=>p.id===form.id?form:p)); closeModal(); };

  // ── Export / Import ──
  const exportData = () => {
    const data = { problems, xp, streak, activityLog, topicNotes, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a"); a.href=url; a.download=`dsa-tracker-backup-${today}.json`; a.click();
    URL.revokeObjectURL(url);
    toast$("📤 Backup exported!","#d1fae5","#34d399");
  };
  const importData = e => {
    const file = e.target.files[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const d = JSON.parse(ev.target.result);
        if(d.problems)     setProblems(d.problems);
        if(d.xp!==undefined) setXp(d.xp);
        if(d.streak)       setStreak(d.streak);
        if(d.activityLog)  setActivityLog(d.activityLog);
        if(d.topicNotes)   setTopicNotes(d.topicNotes);
        toast$("📥 Data restored!","#ede9fe","#a78bfa");
      } catch { toast$("❌ Invalid backup file","#fee2e2","#fca5a5"); }
    };
    reader.readAsText(file);
    e.target.value="";
  };

  const filtered = problems
    .filter(p=>filter==="All"?true:filter==="Unsolved"?p.status==="Unsolved":filter==="Solved"?p.status!=="Unsolved":filter==="Mastered"?p.revStage>=4:p.bookmarked)
    .filter(p=>!topicFilter||p.topic===topicFilter)
    .filter(p=>!patternFilter||(p.pattern||[]).includes(patternFilter))
    .filter(p=>!search||p.name.toLowerCase().includes(search.toLowerCase()));

  const sPct=problems.length?Math.round(solved.length/problems.length*100):0;
  const mPct=problems.length?Math.round(mastered.length/problems.length*100):0;

  const TABS=[
    {id:"today",   label:"🏠 Today"},
    {id:"revision",label:"🔁 Revision",badge:due.length},
    {id:"tracker", label:"📊 Tracker"},
    {id:"notes",   label:"📝 Notes"},
    {id:"stats",   label:"📈 Stats"},
  ];

  const Pill=({label,bg="#f0f0f0",border="#ddd",text="#555",sm})=>(
    <span style={{fontSize:sm?10:11,padding:sm?"1px 7px":"2px 9px",borderRadius:99,fontWeight:700,background:dark?T.chipBg:bg,color:text,border:`1.5px solid ${dark?border+"66":border}`,display:"inline-block",marginRight:4,marginTop:2,whiteSpace:"nowrap"}}>{label}</span>
  );
  const Sec=({bg="#f8fafc",border="#e2e8f0",children,style={}})=>(
    <div style={{background:dark?T.cardBg:bg,border:`1.5px solid ${dark?T.cardBorder:border}`,borderRadius:16,padding:"16px 18px",marginBottom:14,transition:"background 0.3s",...style}}>{children}</div>
  );

  if(!loaded) return (
    <div style={{fontFamily:"'Space Grotesk',Inter,sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",gap:16,color:"#6b7280",background:"#f8fafc"}}>
      <div style={{fontSize:52,animation:"float 1.5s ease-in-out infinite"}}>⚔️</div>
      <div style={{fontWeight:700,fontSize:18,letterSpacing:-0.5,fontFamily:"'Space Grotesk',sans-serif"}}>Loading your tracker...</div>
      <div style={{width:200,background:"#e0e7ff",borderRadius:99,height:7}}><div style={{background:"linear-gradient(90deg,#4f46e5,#7c3aed)",height:7,borderRadius:99,width:"60%",animation:"shimmer 1.5s infinite"}}/></div>
      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}} @keyframes shimmer{0%{width:20%}50%{width:80%}100%{width:20%}}`}</style>
    </div>
  );

  return (
    <div style={{fontFamily:"'Space Grotesk',Inter,sans-serif",width:"100%",minHeight:"100vh",padding:"20px 32px",background:T.pageBg,color:T.text,position:"relative",transition:"background 0.3s,color 0.3s",boxSizing:"border-box"}}>
      <style>{`
        *{box-sizing:border-box}
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
        @keyframes fall  {to{transform:translateY(95vh) rotate(720deg);opacity:0}}
        @keyframes pop   {from{transform:scale(0.85);opacity:0}to{transform:scale(1);opacity:1}}
        @keyframes slR   {from{transform:translateX(80px);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes glow  {0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes float {0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @keyframes pulse {0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
        @keyframes shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        .hbtn:hover{transform:translateY(-1px);filter:brightness(1.08)}
        .prow:hover{filter:brightness(${dark?1.06:0.98})}
        .cal-day:hover{transform:scale(1.04)}
        h1,h2,h3{font-family:'Space Grotesk',sans-serif}
        .mono{font-family:'JetBrains Mono',monospace}
        .gradient-text{background:linear-gradient(135deg,#a78bfa,#60a5fa,#34d399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .shimmer-text{background:linear-gradient(90deg,#a78bfa,#60a5fa,#f9a8d4,#a78bfa);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3s linear infinite}
        input,select,textarea,button{font-family:'Space Grotesk',Inter,sans-serif}
      `}</style>

      {sparks.map(c=>(
        <div key={c.id} style={{position:"fixed",top:50,left:`${c.x}%`,width:c.sz,height:c.sz,background:c.c,borderRadius:c.shape,zIndex:9999,pointerEvents:"none",animation:`fall 1.8s ${c.dl}s ease-in forwards`}}/>
      ))}
      {toast&&(
        <div style={{position:"fixed",top:16,right:16,background:toast.bg,border:`2px solid ${toast.border}`,borderRadius:14,padding:"12px 20px",fontWeight:800,fontSize:13,zIndex:9999,animation:"slR 0.3s ease",boxShadow:"0 8px 30px rgba(0,0,0,0.12)",color:"#1a1a1a"}}>
          {toast.msg}
        </div>
      )}

      {/* ── HEADER ── */}
      <div style={{background:"linear-gradient(135deg,#1e1b4b 0%,#312e81 40%,#4f46e5 70%,#7c3aed 100%)",borderRadius:24,padding:"24px 32px",marginBottom:24,color:"white",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-60,right:-60,width:280,height:280,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}}/>
        <div style={{position:"absolute",bottom:-40,left:80,width:200,height:200,borderRadius:"50%",background:"rgba(6,182,212,0.06)"}}/>
        <div style={{position:"absolute",top:20,right:200,width:100,height:100,borderRadius:"50%",background:"rgba(244,63,94,0.06)"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,position:"relative"}}>
          <div>
            <div style={{fontSize:28,fontWeight:700,letterSpacing:-1,fontFamily:"'Space Grotesk',sans-serif",display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:30}}>⚔️</span>
              <span className="shimmer-text">Striver A2Z Tracker</span>
            </div>
            <div style={{fontSize:13,opacity:0.55,marginTop:5,fontStyle:"italic",letterSpacing:0.3}}>"{quote}"</div>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"flex-start",flexWrap:"wrap"}}>
            <button onClick={()=>setDark(d=>!d)} style={{background:dark?"#fbbf24":"rgba(255,255,255,0.12)",border:"none",borderRadius:99,padding:"8px 16px",cursor:"pointer",fontSize:13,fontWeight:700,color:dark?"#1e1b4b":"white",transition:"all 0.3s",letterSpacing:0.3}}>{dark?"☀️ Light":"🌙 Dark"}</button>
            {[{v:`🔥 ${streak.count}`,l:"streak",bg:"rgba(251,146,60,0.25)",border:"rgba(251,146,60,0.5)"},{v:`${xp}`,l:"XP",bg:"rgba(167,139,250,0.25)",border:"rgba(167,139,250,0.5)"},{v:`${solved.length}`,l:"solved",bg:"rgba(52,211,153,0.25)",border:"rgba(52,211,153,0.5)"},{v:`${mastered.length}`,l:"mastered",bg:"rgba(251,191,36,0.25)",border:"rgba(251,191,36,0.5)"}].map((s,i)=>(
              <div key={i} style={{textAlign:"center",background:s.bg,border:`1.5px solid ${s.border}`,borderRadius:14,padding:"8px 14px"}}>
                <div style={{fontSize:20,fontWeight:700,fontFamily:"'Space Grotesk',sans-serif"}}>{s.v}</div>
                <div style={{fontSize:10,opacity:0.6,marginTop:2,letterSpacing:0.5,textTransform:"uppercase"}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:16,background:"rgba(255,255,255,0.08)",borderRadius:16,padding:"13px 18px",border:"1px solid rgba(255,255,255,0.1)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:42,height:42,borderRadius:12,background:level.bar,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,animation:"float 3s ease-in-out infinite"}}>{level.emoji}</div>
              <div>
                <div style={{fontWeight:700,fontSize:16,fontFamily:"'Space Grotesk',sans-serif",letterSpacing:-0.3}}>{level.name}</div>
                <div style={{fontSize:12,opacity:0.5,marginTop:1}}>{nextLvl?`${nextLvl.min-solved.length} problems to ${nextLvl.name} ${nextLvl.emoji}`:"Maximum level reached 👑"}</div>
              </div>
            </div>
            <div style={{fontWeight:700,fontSize:20,opacity:0.9,fontFamily:"'Space Grotesk',sans-serif"}}>{lvlPct}%</div>
          </div>
          <div style={{background:"rgba(255,255,255,0.12)",borderRadius:99,height:10,overflow:"hidden"}}>
            <div style={{background:level.bar,height:10,borderRadius:99,width:`${lvlPct}%`,transition:"width 0.8s ease",boxShadow:"0 0 12px rgba(255,255,255,0.2)"}}/>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{display:"flex",gap:8,marginBottom:22,flexWrap:"wrap"}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} className="hbtn" style={{padding:"9px 22px",borderRadius:12,border:tab===t.id?"none":`1.5px solid ${T.chipBorder}`,cursor:"pointer",fontSize:14,fontWeight:600,fontFamily:"'Space Grotesk',sans-serif",letterSpacing:0.2,background:tab===t.id?"linear-gradient(135deg,#4f46e5,#7c3aed)":T.chipBg,color:tab===t.id?"white":T.subtext,display:"flex",alignItems:"center",gap:6,transition:"all 0.2s",boxShadow:tab===t.id?"0 4px 20px rgba(79,70,229,0.45)":`0 1px 4px rgba(0,0,0,${dark?0.3:0.08})`}}>
            {t.label}
            {t.badge>0&&<span style={{background:"#ef4444",color:"white",borderRadius:99,fontSize:10,padding:"1px 7px",fontWeight:700,animation:"glow 1.8s infinite"}}>{t.badge}</span>}
          </button>
        ))}
      </div>

      {/* ══ TODAY ══ */}
      {tab==="today"&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,alignItems:"start"}}>
          {/* Overdue warning banner */}
          {overdueCount>0&&(
            <div style={{gridColumn:"1/-1",background:dark?"#2d1515":"#fef2f2",border:`2px solid ${dark?"#7f1d1d":"#fca5a5"}`,borderRadius:14,padding:"13px 20px",display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:22,animation:"pulse 1.5s infinite"}}>⚠️</span>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:14,color:"#dc2626",fontFamily:"'Space Grotesk',sans-serif",letterSpacing:-0.2}}>Revision streak at risk!</div>
                <div style={{fontSize:13,color:dark?"#fca5a5":"#b91c1c",marginTop:2}}>{overdueCount} problem{overdueCount>1?"s are":""} overdue. Clear them before they pile up.</div>
              </div>
              <button onClick={()=>setTab("revision")} style={{background:"linear-gradient(135deg,#dc2626,#ef4444)",color:"white",border:"none",borderRadius:8,padding:"7px 16px",cursor:"pointer",fontSize:13,fontWeight:700,whiteSpace:"nowrap"}}>Fix now →</button>
            </div>
          )}

          {/* LEFT COLUMN */}
          <div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
            {[
              {l:"Due Revisions",v:due.length,bg:due.length>0?"#fef2f2":"#f0fdf4",border:due.length>0?"#fca5a5":"#86efac",text:due.length>0?"#991b1b":"#166534",icon:"🔁"},
              {l:"Bookmarked",v:bookmarked.length,bg:"#fffbeb",border:"#fcd34d",text:"#92400e",icon:"⭐"},
              {l:"Mastered 🏆",v:mastered.length,bg:"#f5f3ff",border:"#c4b5fd",text:"#5b21b6",icon:"👑"},
            ].map((s,i)=>(
              <div key={i} style={{background:dark?T.cardBg:s.bg,border:`2px solid ${dark?s.border+"55":s.border}`,borderRadius:18,padding:"18px 14px",textAlign:"center"}}>
                <div style={{fontSize:24,marginBottom:6,animation:"float 3s ease-in-out infinite"}}>{s.icon}</div>
                <div style={{fontSize:34,fontWeight:700,color:s.text,fontFamily:"'Space Grotesk',sans-serif",letterSpacing:-1}}>{s.v}</div>
                <div style={{fontSize:11,fontWeight:600,color:s.text,marginTop:3,opacity:0.75,textTransform:"uppercase",letterSpacing:0.5}}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Weekly goal */}
          <Sec bg={dark?"#1a1f2e":"#eff6ff"} border={dark?"#1e3a5f":"#bfdbfe"}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontWeight:700,fontSize:15,fontFamily:"'Space Grotesk',sans-serif",letterSpacing:-0.3}}>🎯 Weekly Goal</div>
              <div style={{fontSize:12,color:T.subtext}}>{solvedThisWeek} / {weeklyGoal} this week</div>
            </div>
            <div style={{background:dark?"#0f172a":"#dbeafe",borderRadius:99,height:13,overflow:"hidden",marginBottom:8}}>
              <div style={{background:"linear-gradient(90deg,#4f46e5,#7c3aed,#a78bfa)",height:13,borderRadius:99,width:`${weeklyPct}%`,transition:"width 0.7s ease",display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:6}}>
                {weeklyPct>20&&<span style={{fontSize:9,color:"white",fontWeight:800}}>{weeklyPct}%</span>}
              </div>
            </div>
            <div style={{display:"flex",gap:5}}>
              {Array.from({length:weeklyGoal},(_,i)=>(
                <div key={i} style={{flex:1,height:7,borderRadius:4,background:i<solvedThisWeek?"linear-gradient(90deg,#4f46e5,#7c3aed)":dark?"#1e293b":"#e0e7ff",transition:"background 0.3s"}}/>
              ))}
            </div>
            <div style={{fontSize:11,color:T.subtext,marginTop:6}}>
              {solvedThisWeek>=weeklyGoal?"🎉 Weekly goal smashed! Keep going!":solvedThisWeek===0?"Start strong — solve your first problem today!":`${weeklyGoal-solvedThisWeek} more to hit your weekly goal!`}
            </div>
          </Sec>

          {/* Checklist */}
          <Sec bg="white" border="#e5e7eb">
            <div style={{fontWeight:700,fontSize:15,marginBottom:12,fontFamily:"'Space Grotesk',sans-serif",letterSpacing:-0.3}}>📋 Today's checklist</div>
            {[
              {done:due.length===0,icon:"🔁",label:due.length===0?"No revisions due — clear! 🎉":`Revise ${due.length} problem${due.length>1?"s":""} (7:00–7:20am)`,bg:due.length===0?"#f0fdf4":"#fef2f2",border:due.length===0?"#86efac":"#fca5a5",action:due.length>0?()=>setTab("revision"):null,btnBg:"linear-gradient(135deg,#7c3aed,#4f46e5)",btn:"Revise now →"},
              {done:false,icon:"🧠",label:"Preview tonight's problem (7:20–7:30am)",bg:"#eff6ff",border:"#bfdbfe"},
              {done:false,icon:"💻",label:"Solve 1 new problem (9:40–11:00pm)",bg:"#ecfdf5",border:"#bbf7d0",action:()=>setTab("tracker"),btnBg:"linear-gradient(135deg,#059669,#10b981)",btn:"Open tracker →"},
              {done:false,icon:"🏷️",label:"Tag patterns + write notes after solving",bg:"#fef9c3",border:"#fde047"},
            ].map((it,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 13px",background:it.done?"#f0fdf4":dark?T.rowAlt:it.bg,border:`1.5px solid ${it.done?"#86efac":dark?T.cardBorder:it.border}`,borderRadius:11,marginBottom:8}}>
                <div style={{display:"flex",gap:9,alignItems:"center"}}>
                  <span style={{fontSize:17}}>{it.icon}</span>
                  <span style={{fontSize:13,fontWeight:600,textDecoration:it.done?"line-through":"none",color:it.done?"#16a34a":T.text}}>{it.label}</span>
                </div>
                {it.action&&<button onClick={it.action} style={{background:it.btnBg,color:"white",border:"none",borderRadius:8,padding:"5px 13px",cursor:"pointer",fontSize:12,fontWeight:800,whiteSpace:"nowrap"}}>{it.btn}</button>}
              </div>
            ))}
          </Sec>

          {/* Bookmarked problems */}
          {bookmarked.length>0&&(
            <Sec bg="#fffbeb" border="#fcd34d">
              <div style={{fontWeight:800,fontSize:14,marginBottom:10}}>⭐ Bookmarked — must revisit</div>
              {bookmarked.slice(0,5).map((p,i)=>{
                const ct=TCd(p.topic);
                return(
                  <div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 10px",background:i%2===0?dark?T.rowAlt:"#fef9c3":"transparent",borderRadius:8,marginBottom:4}}>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <span style={{fontSize:14}}>⭐</span>
                      <span style={{fontWeight:600,fontSize:13}}>{p.link?<a href={p.link} target="_blank" rel="noreferrer" style={{color:ct.pill,textDecoration:"none"}}>{p.name} ↗</a>:p.name}</span>
                      {p.topic&&<Pill label={p.topic} bg={ct.bg} border={ct.border} text={ct.text} sm/>}
                    </div>
                    <button onClick={()=>toggleBookmark(p.id)} style={{background:"none",border:"none",cursor:"pointer",fontSize:13,color:"#d97706",fontWeight:700}}>Remove</button>
                  </div>
                );
              })}
            </Sec>
          )}

          {weakTopics.length>0&&(
            <Sec bg="#fff1f2" border="#fda4af">
              <div style={{fontWeight:700,fontSize:15,color:"#9f1239",marginBottom:6,fontFamily:"'Space Grotesk',sans-serif",letterSpacing:-0.3}}>⚠️ Weak topics</div>
              <div style={{fontSize:12,color:"#be123c",marginBottom:10}}>50%+ problems marked Hard. Drill on Sunday.</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{weakTopics.map((t,i)=><Pill key={i} label={`⚠️ ${t}`} bg="#fee2e2" border="#fca5a5" text="#9f1239"/>)}</div>
            </Sec>
          )}
          </div>{/* end LEFT column */}

          {/* RIGHT COLUMN */}
          <div>
          {/* Checklist */}
          <Sec bg="white" border="#e5e7eb">
            <div style={{fontWeight:700,fontSize:15,marginBottom:14,fontFamily:"'Space Grotesk',sans-serif",letterSpacing:-0.3}}>📋 Today's checklist</div>
            {[
              {done:due.length===0,icon:"🔁",label:due.length===0?"No revisions due — clear! 🎉":`Revise ${due.length} problem${due.length>1?"s":""} (7:00–7:20am)`,bg:due.length===0?"#f0fdf4":"#fef2f2",border:due.length===0?"#86efac":"#fca5a5",action:due.length>0?()=>setTab("revision"):null,btnBg:"linear-gradient(135deg,#7c3aed,#4f46e5)",btn:"Revise now →"},
              {done:false,icon:"🧠",label:"Preview tonight's problem (7:20–7:30am)",bg:"#eff6ff",border:"#bfdbfe"},
              {done:false,icon:"💻",label:"Solve 1 new problem (9:40–11:00pm)",bg:"#ecfdf5",border:"#bbf7d0",action:()=>setTab("tracker"),btnBg:"linear-gradient(135deg,#059669,#10b981)",btn:"Open tracker →"},
              {done:false,icon:"🏷️",label:"Tag patterns + write notes after solving",bg:"#fef9c3",border:"#fde047"},
            ].map((it,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 14px",background:it.done?"#f0fdf4":dark?T.rowAlt:it.bg,border:`1.5px solid ${it.done?"#86efac":dark?T.cardBorder:it.border}`,borderRadius:11,marginBottom:8}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <span style={{fontSize:18}}>{it.icon}</span>
                  <span style={{fontSize:13,fontWeight:600,textDecoration:it.done?"line-through":"none",color:it.done?"#16a34a":T.text,letterSpacing:0.1}}>{it.label}</span>
                </div>
                {it.action&&<button onClick={it.action} style={{background:it.btnBg,color:"white",border:"none",borderRadius:8,padding:"6px 14px",cursor:"pointer",fontSize:12,fontWeight:700,whiteSpace:"nowrap"}}>{it.btn}</button>}
              </div>
            ))}
          </Sec>

          {bookmarked.length>0&&(
            <Sec bg="#fffbeb" border="#fcd34d">
              <div style={{fontWeight:700,fontSize:15,marginBottom:10,fontFamily:"'Space Grotesk',sans-serif",letterSpacing:-0.3}}>⭐ Bookmarked — must revisit</div>
              {bookmarked.slice(0,5).map((p,i)=>{
                const ct=TCd(p.topic);
                return(
                  <div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",background:i%2===0?dark?T.rowAlt:"#fef9c3":"transparent",borderRadius:8,marginBottom:4}}>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <span style={{fontSize:14}}>⭐</span>
                      <span style={{fontWeight:600,fontSize:13}}>{p.link?<a href={p.link} target="_blank" rel="noreferrer" style={{color:ct.pill,textDecoration:"none"}}>{p.name} ↗</a>:p.name}</span>
                      {p.topic&&<Pill label={p.topic} bg={ct.bg} border={ct.border} text={ct.text} sm/>}
                    </div>
                    <button onClick={()=>toggleBookmark(p.id)} style={{background:"none",border:"none",cursor:"pointer",fontSize:13,color:"#d97706",fontWeight:700}}>Remove</button>
                  </div>
                );
              })}
            </Sec>
          )}
          </div>{/* end RIGHT column */}
        </div>
      )}

      {/* ══ REVISION ══ */}
      {tab==="revision"&&(
        <div>
          {/* Stage cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
            {REV_META.map((r,i)=>(
              <div key={i} style={{background:dark?T.cardBg:r.bg,border:`2px solid ${dark?r.dot+"44":r.border}`,borderRadius:14,padding:"11px 13px"}}>
                <div style={{fontWeight:800,fontSize:12,color:r.dot}}>{r.label}</div>
                <div style={{fontSize:10,color:dark?T.subtext:r.text,opacity:0.8,marginTop:3,lineHeight:1.4}}>{r.desc}</div>
                <div style={{marginTop:7,background:r.bar,borderRadius:99,height:3}}/>
                <div style={{fontSize:13,fontWeight:900,color:r.dot,marginTop:6}}>+{r.xp} XP</div>
              </div>
            ))}
          </div>

          {/* 7-Day Calendar */}
          <Sec bg="white" border="#e5e7eb">
            <div style={{fontWeight:800,fontSize:14,marginBottom:12}}>📆 7-Day Revision Calendar</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6}}>
              {calDays.map((day,i)=>{
                const isToday=day.date===today;
                const hasItems=day.items.length>0;
                return(
                  <div key={i} className="cal-day" style={{textAlign:"center",padding:"10px 4px",borderRadius:12,border:`2px solid ${isToday?"#4f46e5":hasItems?"#fbbf24":dark?T.cardBorder:"#e5e7eb"}`,background:isToday?dark?"#1e1b4b":"#eef2ff":hasItems?dark?"#2d2b00":"#fffbeb":dark?T.rowAlt:"#f9fafb",cursor:hasItems?"pointer":"default",transition:"all 0.2s",position:"relative"}} onClick={()=>hasItems&&setCalHover(calHover===day.date?null:day.date)}>
                    <div style={{fontSize:10,fontWeight:700,color:isToday?"#4f46e5":T.subtext}}>{day.dayName}</div>
                    <div style={{fontSize:11,fontWeight:800,color:isToday?"#4f46e5":T.text,marginTop:2}}>{day.date.slice(8)}</div>
                    {hasItems&&<div style={{marginTop:5,background:"linear-gradient(135deg,#f59e0b,#fbbf24)",color:"white",borderRadius:99,fontSize:10,fontWeight:900,padding:"1px 0"}}>{day.items.length}</div>}
                    {!hasItems&&<div style={{marginTop:5,fontSize:10,color:T.subtext,opacity:0.4}}>—</div>}
                  </div>
                );
              })}
            </div>
            {calHover&&(()=>{
              const day=calDays.find(d=>d.date===calHover);
              if(!day||!day.items.length) return null;
              return(
                <div style={{marginTop:12,background:dark?T.rowAlt:"#fffbeb",border:"1.5px solid #fcd34d",borderRadius:10,padding:"10px 14px",animation:"pop 0.2s ease"}}>
                  <div style={{fontWeight:700,fontSize:12,color:"#92400e",marginBottom:8}}>Due on {calHover}:</div>
                  {day.items.map((p,i)=>{
                    const rm=REV_META[p.revStage]; const ct=TCd(p.topic);
                    return(
                      <div key={i} style={{display:"flex",gap:8,alignItems:"center",marginBottom:5}}>
                        <Pill label={rm.label} bg={rm.bg} border={rm.border} text={rm.text} sm/>
                        <span style={{fontSize:12,fontWeight:600}}>{p.name}</span>
                        {p.topic&&<Pill label={p.topic} bg={ct.bg} border={ct.border} text={ct.text} sm/>}
                      </div>
                    );
                  })}
                </div>
              );
            })()}
            <div style={{fontSize:11,color:T.subtext,marginTop:10}}>💡 Tap a day with a number to see which problems are due</div>
          </Sec>

          {due.length===0?(
            <Sec bg="linear-gradient(135deg,#f0fdf4,#dcfce7)" border="#86efac" style={{textAlign:"center",padding:36}}>
              <div style={{fontSize:48,marginBottom:10}}>🎉</div>
              <div style={{fontWeight:900,fontSize:17,color:"#15803d"}}>All caught up!</div>
              <div style={{fontSize:13,color:"#16a34a",marginTop:4}}>No revisions due. Go solve new problems!</div>
            </Sec>
          ):(
            <>
              <div style={{fontWeight:800,fontSize:14,color:"#991b1b",marginBottom:12,display:"flex",alignItems:"center",gap:7,background:dark?"#2d1515":"#fef2f2",padding:"10px 14px",borderRadius:10,border:`1.5px solid ${dark?"#7f1d1d":"#fca5a5"}`}}>
                <span style={{animation:"glow 1.5s infinite"}}>🔴</span>
                Due today — {due.length} problem{due.length>1?"s":""}
                <span style={{marginLeft:"auto",fontSize:11,color:dark?"#fca5a5":"#dc2626",fontWeight:600}}>7:00–7:20am slot</span>
              </div>
              {due.map(p=>{
                const rm=REV_META[p.revStage]; const ct=TCd(p.topic);
                return(
                  <div key={p.id} style={{background:dark?T.cardBg:rm.bg,border:`2px solid ${dark?rm.dot+"44":rm.border}`,borderRadius:16,padding:16,marginBottom:12,animation:"pop 0.3s ease"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:7}}>
                          {p.topic&&<Pill label={p.topic} bg={ct.bg} border={ct.border} text={ct.text}/>}
                          <Pill label={rm.label} bg={rm.bg} border={rm.border} text={rm.text}/>
                          {getNR(p)<today&&<Pill label="⚠️ Overdue" bg="#fee2e2" border="#fca5a5" text="#991b1b"/>}
                          {p.bookmarked&&<Pill label="⭐ Bookmarked" bg="#fffbeb" border="#fcd34d" text="#92400e"/>}
                        </div>
                        <div style={{fontWeight:800,fontSize:15}}>
                          {p.link?<a href={p.link} target="_blank" rel="noreferrer" style={{color:rm.dot,textDecoration:"none"}}>{p.name} ↗</a>:p.name}
                        </div>
                        {(p.pattern||[]).length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:5}}>{p.pattern.map(pt=><Pill key={pt} label={pt} bg="#f5f3ff" border="#c4b5fd" text="#5b21b6" sm/>)}</div>}
                        {p.note&&<div style={{fontSize:12,color:dark?T.subtext:rm.text,opacity:0.8,marginTop:7,background:dark?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.65)",padding:"7px 11px",borderRadius:9,borderLeft:`3px solid ${rm.dot}`}}>📝 {p.note}</div>}
                        <div style={{fontSize:12,fontWeight:700,color:rm.dot,marginTop:8}}>🎯 {rm.desc}</div>
                        <div style={{marginTop:9,display:"flex",gap:3}}>
                          {REV_META.map((_,i)=><div key={i} style={{flex:1,height:5,borderRadius:99,background:i<p.revStage?"#10b981":i===p.revStage?rm.dot:dark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)",transition:"background 0.3s"}}/>)}
                        </div>
                        <div style={{fontSize:10,color:T.subtext,marginTop:3}}>Stage {p.revStage+1} of 4</div>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",gap:8}}>
                        <div style={{fontSize:11,fontWeight:600,color:T.subtext,textAlign:"center"}}>How was it?</div>
                        <button onClick={()=>markRev(p.id,"easy")} className="hbtn" style={{background:"linear-gradient(135deg,#059669,#10b981)",color:"white",border:"none",borderRadius:10,padding:"9px 18px",cursor:"pointer",fontSize:13,fontWeight:800,transition:"all 0.2s"}}>😊 Easy</button>
                        <button onClick={()=>markRev(p.id,"hard")} className="hbtn" style={{background:"linear-gradient(135deg,#dc2626,#ef4444)",color:"white",border:"none",borderRadius:10,padding:"9px 18px",cursor:"pointer",fontSize:13,fontWeight:800,transition:"all 0.2s"}}>😰 Hard</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}

      {/* ══ TRACKER ══ */}
      {tab==="tracker"&&(
        <div>
          {/* Timer */}
          <Sec bg={timerRunning?dark?"#1a0a00":"#fff7ed":dark?T.cardBg:"white"} border={timerRunning?"#f97316":T.cardBorder}>
            <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:4,fontFamily:"'Space Grotesk',sans-serif"}}>⏱️ Solve Timer <span style={{fontSize:12,fontWeight:400,color:T.subtext}}>— aim for 15–20 mins per problem</span></div>
                <div style={{fontSize:38,fontWeight:600,fontFamily:"'JetBrains Mono',monospace",color:timerSec>timerTarget?"#ef4444":timerSec>timerTarget*0.75?"#f97316":"#4f46e5",letterSpacing:4}}>{fmtTime(timerSec)}</div>
                {timerSec>0&&(
                  <div style={{marginTop:6,background:dark?T.mutedBg:"#e0e7ff",borderRadius:99,height:5,overflow:"hidden"}}>
                    <div style={{background:timerSec>timerTarget?"linear-gradient(90deg,#ef4444,#f87171)":"linear-gradient(90deg,#4f46e5,#7c3aed)",height:5,borderRadius:99,width:`${Math.min(timerSec/timerTarget*100,100)}%`,transition:"width 1s linear"}}/>
                  </div>
                )}
                {timerSec>timerTarget&&<div style={{fontSize:11,color:"#ef4444",fontWeight:700,marginTop:4,animation:"glow 1.5s infinite"}}>⚠️ Over 20 mins — take the hint if stuck!</div>}
              </div>
              <div style={{display:"flex",gap:7}}>
                <button onClick={()=>setTimerRunning(r=>!r)} style={{background:timerRunning?"linear-gradient(135deg,#dc2626,#ef4444)":"linear-gradient(135deg,#059669,#10b981)",color:"white",border:"none",borderRadius:9,padding:"8px 16px",cursor:"pointer",fontSize:13,fontWeight:800}}>{timerRunning?"⏸ Pause":"▶ Start"}</button>
                <button onClick={resetTimer} style={{background:T.mutedBg,color:T.subtext,border:`1px solid ${T.cardBorder}`,borderRadius:9,padding:"8px 14px",cursor:"pointer",fontSize:13,fontWeight:700}}>↺ Reset</button>
              </div>
            </div>
          </Sec>

          <Sec bg="white" border="#e5e7eb">
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:10,fontWeight:800,fontSize:14}}>
              <span>Progress</span>
              <span style={{fontSize:12,fontWeight:400,color:T.subtext}}>{solved.length} solved · {mastered.length} mastered · {bookmarked.length} starred</span>
            </div>
            {[{l:"Solved",p:sPct,bg:"#eff6ff",bar:"linear-gradient(90deg,#4f46e5,#7c3aed)",tc:"#4f46e5"},{l:"Mastered",p:mPct,bg:"#ecfdf5",bar:"linear-gradient(90deg,#059669,#34d399)",tc:"#059669"}].map((b,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:i===0?7:0}}>
                <div style={{fontSize:12,fontWeight:700,color:b.tc,width:60}}>{b.l}</div>
                <div style={{flex:1,background:dark?T.mutedBg:b.bg,borderRadius:99,height:10,border:`1px solid ${b.tc}20`}}>
                  <div style={{background:b.bar,height:10,borderRadius:99,width:`${b.p}%`,transition:"width 0.6s"}}/>
                </div>
                <div style={{fontSize:13,fontWeight:900,color:b.tc,width:34,textAlign:"right"}}>{b.p}%</div>
              </div>
            ))}
          </Sec>

          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10,alignItems:"center"}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search problems..." style={{flex:1,minWidth:150,padding:"9px 14px",borderRadius:10,border:`1.5px solid ${T.inputBorder}`,fontSize:13,background:T.inputBg,color:T.text}}/>
            <button onClick={openAdd} className="hbtn" style={{background:"linear-gradient(135deg,#4f46e5,#7c3aed)",color:"white",border:"none",borderRadius:10,padding:"9px 18px",cursor:"pointer",fontSize:13,fontWeight:800,whiteSpace:"nowrap",boxShadow:"0 4px 14px rgba(79,70,229,0.35)",transition:"all 0.2s"}}>+ Add Problem</button>
          </div>

          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
            {[{f:"All",bg:"#eff6ff",border:"#bfdbfe",tc:"#1d4ed8"},{f:"Unsolved",bg:"#fef2f2",border:"#fca5a5",tc:"#dc2626"},{f:"Solved",bg:"#ecfdf5",border:"#86efac",tc:"#16a34a"},{f:"Mastered",bg:"#fef9c3",border:"#fde047",tc:"#ca8a04"},{f:"Starred",bg:"#fffbeb",border:"#fcd34d",tc:"#d97706"}].map(({f,bg,border,tc})=>(
              <button key={f} onClick={()=>setFilter(f)} style={{padding:"5px 14px",borderRadius:99,border:`1.5px solid ${filter===f?border:T.chipBorder}`,cursor:"pointer",fontSize:12,fontWeight:700,background:filter===f?bg:T.chipBg,color:filter===f?tc:T.subtext,transition:"all 0.15s"}}>{f}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
            <select value={topicFilter} onChange={e=>setTopicFilter(e.target.value)} style={{padding:"6px 11px",borderRadius:9,border:`1.5px solid ${T.inputBorder}`,fontSize:12,background:T.inputBg,color:T.text}}>
              <option value="">All topics</option>
              {TOPICS.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
            <select value={patternFilter} onChange={e=>setPatternFilter(e.target.value)} style={{padding:"6px 11px",borderRadius:9,border:`1.5px solid ${T.inputBorder}`,fontSize:12,background:T.inputBg,color:T.text}}>
              <option value="">All patterns</option>
              {PATTERNS.map(p=><option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          {filtered.length===0&&(
            <Sec bg="#f5f3ff" border="#c4b5fd" style={{textAlign:"center",padding:32}}>
              {problems.length===0?<><div style={{fontSize:38,marginBottom:10}}>🎯</div><div style={{fontWeight:700}}>No problems yet. Add your first one!</div></>:<div style={{color:T.subtext}}>No problems match filters.</div>}
            </Sec>
          )}

          {filtered.map(p=>{
            const rm=REV_META[p.revStage]; const ct=TCd(p.topic);
            const rowBg=p.revStage>=4?dark?"#14281f":"#f0fdf4":p.status==="Unsolved"?T.cardBg:dark?T.rowAlt:rm.bg;
            const rowBorder=p.revStage>=4?"#86efac":p.bookmarked?"#fbbf24":p.status==="Unsolved"?T.cardBorder:dark?rm.dot+"44":rm.border;
            return(
              <div key={p.id} className="prow" style={{background:rowBg,border:`1.5px solid ${rowBorder}`,borderRadius:13,padding:"12px 15px",marginBottom:9,transition:"all 0.2s"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center",marginBottom:5}}>
                      {p.bookmarked&&<span style={{fontSize:14}}>⭐</span>}
                      {p.topic&&<Pill label={p.topic} bg={ct.bg} border={ct.border} text={ct.text}/>}
                      {p.difficulty&&<Pill label={p.difficulty} bg={p.difficulty.includes("Hard")?"#fef2f2":p.difficulty.includes("Medium")?"#fffbeb":"#f0fdf4"} border={p.difficulty.includes("Hard")?"#fca5a5":p.difficulty.includes("Medium")?"#fcd34d":"#86efac"} text={p.difficulty.includes("Hard")?"#991b1b":p.difficulty.includes("Medium")?"#92400e":"#166534"}/>}
                      {p.revStage>=4&&<Pill label="🏆 Mastered" bg="#d1fae5" border="#34d399" text="#065f46"/>}
                      {p.status!=="Unsolved"&&p.revStage<4&&<Pill label={`Rev ${p.revStage}/4`} bg={rm.bg} border={rm.border} text={rm.text}/>}
                      {p.status==="Unsolved"&&<Pill label="Unsolved" bg="#f8fafc" border="#cbd5e1" text="#64748b"/>}
                    </div>
                    <div style={{fontWeight:700,fontSize:14}}>
                      {p.link?<a href={p.link} target="_blank" rel="noreferrer" style={{color:p.topic?TCd(p.topic).pill:"#4f46e5",textDecoration:"none"}}>{p.name} ↗</a>:p.name}
                    </div>
                    {(p.pattern||[]).length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:4}}>{p.pattern.map(pt=><Pill key={pt} label={pt} bg="#f5f3ff" border="#c4b5fd" text="#5b21b6" sm/>)}</div>}
                    {p.note&&<div style={{fontSize:12,color:T.subtext,marginTop:4,borderLeft:`3px solid ${dark?"#334155":"#e5e7eb"}`,paddingLeft:8}}>📝 {p.note}</div>}
                    {p.status!=="Unsolved"&&p.revStage<4&&(
                      <div style={{marginTop:7}}>
                        <div style={{display:"flex",gap:3}}>{REV_META.map((_,i)=><div key={i} style={{flex:1,height:4,borderRadius:99,background:i<p.revStage?"#10b981":i===p.revStage?rm.dot:dark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.08)"}}/>)}</div>
                        <div style={{fontSize:10,color:T.subtext,marginTop:2}}>Next: {rm.desc} · {getNR(p)}</div>
                      </div>
                    )}
                  </div>
                  <div style={{display:"flex",gap:5,flexShrink:0}}>
                    {p.status==="Unsolved"&&<button onClick={()=>markSolved(p.id)} className="hbtn" style={{background:"linear-gradient(135deg,#059669,#10b981)",color:"white",border:"none",borderRadius:8,padding:"5px 12px",cursor:"pointer",fontSize:12,fontWeight:800,transition:"all 0.2s"}}>✓</button>}
                    <button onClick={()=>toggleBookmark(p.id)} title="Bookmark" style={{background:p.bookmarked?"#fffbeb":"var(--color-background-secondary,#f0f0f5)",color:p.bookmarked?"#d97706":T.subtext,border:`1.5px solid ${p.bookmarked?"#fcd34d":T.chipBorder}`,borderRadius:8,padding:"5px 10px",cursor:"pointer",fontSize:12}}>⭐</button>
                    <button onClick={()=>openEdit(p)} style={{background:"#f0f9ff",color:"#0369a1",border:"1.5px solid #bae6fd",borderRadius:8,padding:"5px 10px",cursor:"pointer",fontSize:12}}>✏️</button>
                    <button onClick={()=>deleteProblem(p.id)} style={{background:"#fef2f2",color:"#dc2626",border:"1.5px solid #fca5a5",borderRadius:8,padding:"5px 10px",cursor:"pointer",fontSize:12}}>🗑</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ══ NOTES TAB ══ */}
      {tab==="notes"&&(
        <div>
          <Sec bg="white" border="#e5e7eb">
            <div style={{fontWeight:800,fontSize:14,marginBottom:4}}>📝 Topic Notes</div>
            <div style={{fontSize:12,color:T.subtext,marginBottom:14}}>Save key patterns, tricks, and gotchas for each topic. These are yours — write anything.</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
              {TOPICS.map(t=>{
                const ct=TCd(t); const hasNote=topicNotes[t]&&topicNotes[t].trim().length>0;
                return(
                  <button key={t} onClick={()=>setNotesTopic(t)} style={{padding:"5px 12px",borderRadius:99,border:`1.5px solid ${notesTopic===t?ct.pill:T.chipBorder}`,cursor:"pointer",fontSize:11,fontWeight:700,background:notesTopic===t?ct.bg:T.chipBg,color:notesTopic===t?ct.text:T.subtext,transition:"all 0.15s",display:"flex",alignItems:"center",gap:4}}>
                    {t}{hasNote&&<span style={{width:6,height:6,borderRadius:"50%",background:ct.pill,display:"inline-block"}}/>}
                  </button>
                );
              })}
            </div>
            {(()=>{
              const ct=TCd(notesTopic);
              const solved_in_topic=solved.filter(p=>p.topic===notesTopic).length;
              const total_in_topic=problems.filter(p=>p.topic===notesTopic).length;
              return(
                <div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                    <div style={{fontWeight:800,fontSize:15,color:ct.pill}}>{notesTopic}</div>
                    <div style={{fontSize:12,color:T.subtext}}>{solved_in_topic}/{total_in_topic} solved</div>
                  </div>
                  <textarea
                    value={topicNotes[notesTopic]||""}
                    onChange={e=>setTopicNotes(prev=>({...prev,[notesTopic]:e.target.value}))}
                    rows={12}
                    placeholder={`Notes for ${notesTopic}...\n\nIdeas to jot down:\n• Key pattern or technique\n• Time / space complexity of main approaches\n• Common gotchas or edge cases\n• Problems you found tricky\n• Memory tricks`}
                    style={{width:"100%",padding:"12px 14px",borderRadius:12,border:`1.5px solid ${ct.border}`,fontSize:13,resize:"vertical",boxSizing:"border-box",background:dark?T.inputBg:ct.bg,color:ct.text,lineHeight:1.7,outline:"none",fontFamily:"inherit"}}
                  />
                  <div style={{display:"flex",justifyContent:"space-between",marginTop:8,fontSize:11,color:T.subtext}}>
                    <span>{topicNotes[notesTopic]?.length||0} chars · Auto-saved</span>
                    <span style={{color:"#16a34a"}}>✓ Saved to localStorage</span>
                  </div>
                </div>
              );
            })()}
          </Sec>

          {/* Quick reference: all topics with notes */}
          {Object.entries(topicNotes).filter(([,v])=>v.trim()).length>0&&(
            <Sec bg="white" border="#e5e7eb">
              <div style={{fontWeight:800,fontSize:14,marginBottom:12}}>📚 Topics with notes</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {Object.entries(topicNotes).filter(([,v])=>v.trim()).map(([t])=>{
                  const ct=TCd(t);
                  return <button key={t} onClick={()=>setNotesTopic(t)} style={{padding:"4px 12px",borderRadius:99,background:ct.bg,border:`1.5px solid ${ct.border}`,color:ct.text,cursor:"pointer",fontSize:12,fontWeight:700}}>{t} ✓</button>;
                })}
              </div>
            </Sec>
          )}
        </div>
      )}

      {/* ══ STATS ══ */}
      {tab==="stats"&&(
        <div>
          <div style={{background:"linear-gradient(135deg,#0f0c29,#312e81)",borderRadius:18,padding:"20px 22px",marginBottom:14,color:"white"}}>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <div style={{fontSize:48,animation:"float 3s ease-in-out infinite"}}>{level.emoji}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:900,fontSize:20,background:level.bar,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>{level.name}</div>
                <div style={{fontSize:13,opacity:0.6,marginTop:2}}>{solved.length} solved · {xp} XP · {mastered.length} mastered · {bookmarked.length} starred</div>
                <div style={{marginTop:10,background:"rgba(255,255,255,0.12)",borderRadius:99,height:8}}>
                  <div style={{background:level.bar,height:8,borderRadius:99,width:`${lvlPct}%`,transition:"width 0.7s"}}/>
                </div>
                {nextLvl&&<div style={{fontSize:11,opacity:0.5,marginTop:4}}>{nextLvl.min-solved.length} more → {nextLvl.name}</div>}
              </div>
            </div>
          </div>

          {/* Export / Import */}
          <Sec bg={dark?"#1a1f2e":"#eff6ff"} border={dark?"#1e3a5f":"#bfdbfe"}>
            <div style={{fontWeight:800,fontSize:14,marginBottom:10}}>📤 Backup & Restore</div>
            <div style={{fontSize:12,color:T.subtext,marginBottom:12}}>Export your entire progress as JSON. Import to restore or move to another device.</div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <button onClick={exportData} className="hbtn" style={{background:"linear-gradient(135deg,#059669,#10b981)",color:"white",border:"none",borderRadius:10,padding:"9px 20px",cursor:"pointer",fontSize:13,fontWeight:800,transition:"all 0.2s"}}>📤 Export backup</button>
              <label style={{background:"linear-gradient(135deg,#4f46e5,#7c3aed)",color:"white",borderRadius:10,padding:"9px 20px",cursor:"pointer",fontSize:13,fontWeight:800,display:"inline-block"}}>
                📥 Import backup
                <input type="file" accept=".json" onChange={importData} style={{display:"none"}}/>
              </label>
            </div>
            <div style={{fontSize:11,color:T.subtext,marginTop:10}}>Last export: {today} · {problems.length} problems · {xp} XP</div>
          </Sec>

          {/* Activity Heatmap */}
          <Sec bg={T.cardBg} border={T.cardBorder}>
            <div style={{fontWeight:800,fontSize:14,marginBottom:14}}>📅 Activity Heatmap — last 12 weeks</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:3,marginBottom:8}}>
              {Array.from({length:12},(_,w)=>(
                <div key={w} style={{display:"grid",gap:2}}>
                  {heatDays.slice(w*7,(w+1)*7).map(date=>(
                    <div key={date} title={`${date}: ${activityLog[date]||0} actions`} style={{width:"100%",aspectRatio:"1",borderRadius:3,background:heatColor(date),border:`1px solid ${dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)"}`,transition:"background 0.2s"}}/>
                  ))}
                </div>
              ))}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,fontSize:11,color:T.subtext}}>
              <span>Less</span>
              {[0,0.25,0.5,0.75,1].map((v,i)=>{ const bg=v===0?dark?"#1e293b":"#f1f5f9":v<0.25?dark?"#1e3a5f":"#dbeafe":v<0.5?dark?"#1d4ed8":"#93c5fd":v<0.75?dark?"#2563eb":"#3b82f6":dark?"#60a5fa":"#1d4ed8"; return <div key={i} style={{width:12,height:12,borderRadius:3,background:bg}}/>; })}
              <span>More</span>
              <span style={{marginLeft:"auto"}}>{Object.values(activityLog).reduce((a,b)=>a+b,0)} total actions</span>
            </div>
          </Sec>

          {/* Level roadmap */}
          <Sec bg="white" border="#e5e7eb">
            <div style={{fontWeight:800,fontSize:14,marginBottom:14}}>🗺️ Level roadmap</div>
            {LEVELS.map((l,i)=>{ const isCur=l.name===level.name,isDone=solved.length>l.max;
              return(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:12,marginBottom:5,background:isCur?dark?l.accent+"22":l.bg:isDone?dark?"#14281f":"#f0fdf4":T.cardBg,border:isCur?`2px solid ${l.accent}40`:isDone?`1.5px solid #86efac`:`1.5px solid ${T.cardBorder}`,transition:"all 0.2s"}}>
                  <div style={{width:36,height:36,borderRadius:10,background:isCur||isDone?l.bar:T.mutedBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{l.emoji}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:13,color:isCur?l.accent:isDone?"#15803d":T.subtext}}>{l.name}</div>
                    <div style={{fontSize:11,color:T.subtext,opacity:0.7}}>{l.min}–{l.max===999?"∞":l.max} problems</div>
                  </div>
                  {isDone&&<span style={{fontSize:12,color:"#15803d",fontWeight:800,background:"#d1fae5",padding:"2px 9px",borderRadius:6}}>✅ Done</span>}
                  {isCur&&<span style={{fontSize:12,fontWeight:900,color:l.accent,background:dark?l.accent+"22":l.bg,padding:"2px 10px",borderRadius:6,border:`1.5px solid ${l.accent}40`}}>← You</span>}
                </div>
              );
            })}
          </Sec>

          {/* Weak topics */}
          <Sec bg="#fff1f2" border="#fda4af">
            <div style={{fontWeight:800,fontSize:14,marginBottom:12,color:"#9f1239"}}>⚠️ Weak topics</div>
            {weakTopics.length===0?<div style={{color:"#15803d",fontSize:13,display:"flex",gap:7,alignItems:"center"}}><span>🎉</span> No weak topics yet!</div>:weakTopics.map((t,i)=>{ const tp=solved.filter(p=>p.topic===t),hc=tp.filter(p=>p.difficulty==="🔴 Hard").length,ct=TCd(t);
              return(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 12px",background:dark?T.cardBg:ct.bg,border:`1.5px solid ${ct.border}`,borderRadius:10,marginBottom:6}}><span style={{fontWeight:700,fontSize:13,color:ct.text}}>⚠️ {t}</span><span style={{fontSize:12,background:"#fee2e2",color:"#991b1b",padding:"2px 8px",borderRadius:6,fontWeight:700}}>{hc}/{tp.length} hard</span></div>);
            })}
          </Sec>

          {/* Pattern mastery */}
          <Sec bg="white" border="#e5e7eb">
            <div style={{fontWeight:800,fontSize:14,marginBottom:14}}>🏷️ Pattern mastery</div>
            {(()=>{
              const map={}; solved.forEach(p=>(p.pattern||[]).forEach(pt=>{ if(!map[pt]) map[pt]={total:0,mastered:0}; map[pt].total++; if(p.revStage>=4) map[pt].mastered++; }));
              const entries=Object.entries(map).sort((a,b)=>b[1].total-a[1].total);
              const bars=["linear-gradient(90deg,#4f46e5,#7c3aed)","linear-gradient(90deg,#0891b2,#22d3ee)","linear-gradient(90deg,#d97706,#fbbf24)","linear-gradient(90deg,#059669,#34d399)","linear-gradient(90deg,#dc2626,#f87171)","linear-gradient(90deg,#a21caf,#e879f9)"];
              return entries.length===0?<div style={{color:T.subtext,fontSize:13}}>No pattern tags yet. Tag problems in the tracker!</div>:entries.map(([pt,s],i)=>{ const p2=Math.round(s.mastered/s.total*100);
                return(<div key={i} style={{marginBottom:11,padding:"7px 11px",background:i%2===0?T.rowAlt:T.cardBg,borderRadius:9}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:5}}><span style={{fontWeight:700}}>{pt}</span><span style={{color:T.subtext,fontSize:12,background:dark?"#1e293b":"#f0f9ff",padding:"1px 8px",borderRadius:5,border:`1px solid ${dark?"#334155":"#bae6fd"}`}}>{s.mastered}/{s.total}</span></div>
                  <div style={{background:dark?T.mutedBg:"#f0f0f5",borderRadius:99,height:7}}><div style={{background:bars[i%bars.length],height:7,borderRadius:99,width:`${p2}%`,transition:"width 0.6s"}}/></div>
                </div>);
              });
            })()}
          </Sec>

          {/* Topic breakdown */}
          <Sec bg="white" border="#e5e7eb">
            <div style={{fontWeight:800,fontSize:14,marginBottom:14}}>📊 Topic breakdown</div>
            {(()=>{
              const map={}; problems.forEach(p=>{ if(!p.topic) return; if(!map[p.topic]) map[p.topic]={total:0,solved:0,mastered:0}; map[p.topic].total++; if(p.status!=="Unsolved") map[p.topic].solved++; if(p.revStage>=4) map[p.topic].mastered++; });
              const entries=Object.entries(map).sort((a,b)=>b[1].total-a[1].total);
              return entries.length===0?<div style={{color:T.subtext,fontSize:13}}>No topics yet.</div>:entries.map(([t,s],i)=>{ const ct=TCd(t),p2=s.total?Math.round(s.solved/s.total*100):0;
                return(<div key={i} style={{padding:"9px 11px",background:i%2===0?dark?T.rowAlt:ct.bg:T.cardBg,border:`1px solid ${i%2===0?dark?ct.border+"33":ct.border:"transparent"}`,borderRadius:10,marginBottom:5}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,alignItems:"center"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:11,height:11,borderRadius:3,background:ct.pill,flexShrink:0}}/><span style={{fontSize:13,fontWeight:700,color:ct.text}}>{t}</span></div>
                    <div style={{display:"flex",gap:5,alignItems:"center"}}><span style={{fontSize:12,color:ct.text,fontWeight:600,background:dark?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.6)",padding:"1px 7px",borderRadius:4}}>{s.solved}/{s.total}</span>{s.mastered>0&&<Pill label={`${s.mastered} 🏆`} bg="#d1fae5" border="#34d399" text="#065f46" sm/>}</div>
                  </div>
                  <div style={{background:dark?T.mutedBg:"rgba(0,0,0,0.06)",borderRadius:99,height:6}}><div style={{background:s.mastered===s.total&&s.total>0?"linear-gradient(90deg,#059669,#34d399)":`linear-gradient(90deg,${ct.pill},${ct.border})`,height:6,borderRadius:99,width:`${p2}%`,transition:"width 0.5s"}}/></div>
                </div>);
              });
            })()}
          </Sec>
        </div>
      )}

      {/* ══ MODAL ══ */}
      {modal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(15,12,41,0.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,padding:16}}>
          <div style={{background:T.cardBg,border:`2px solid ${T.cardBorder}`,borderRadius:22,padding:26,width:"100%",maxWidth:530,maxHeight:"90vh",overflowY:"auto",animation:"pop 0.25s ease",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div style={{fontWeight:900,fontSize:17,color:T.text}}>{modal==="add"?"➕ Add Problem":"✏️ Edit Problem"}</div>
              <button onClick={closeModal} style={{background:T.mutedBg,border:"none",borderRadius:99,width:34,height:34,cursor:"pointer",fontSize:16,color:T.subtext,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
            </div>
            <div style={{display:"grid",gap:14}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <div>
                  <div style={{fontSize:11,fontWeight:700,color:T.subtext,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.06em"}}>Problem name *</div>
                  <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Two Sum" style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1.5px solid ${T.inputBorder}`,fontSize:13,boxSizing:"border-box",background:T.inputBg,color:T.text}}/>
                </div>
                <div>
                  <div style={{fontSize:11,fontWeight:700,color:T.subtext,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.06em"}}>Topic</div>
                  <select value={form.topic} onChange={e=>setForm(f=>({...f,topic:e.target.value}))} style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1.5px solid ${T.inputBorder}`,fontSize:13,background:T.inputBg,color:T.text}}>
                    <option value="">Select topic</option>
                    {TOPICS.map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              {form.topic&&(<div style={{padding:"7px 12px",background:dark?T.rowAlt:TCd(form.topic).bg,border:`1.5px solid ${TCd(form.topic).border}`,borderRadius:8,fontSize:12,color:TCd(form.topic).text,fontWeight:600}}>Selected: {form.topic}</div>)}
              <div>
                <div style={{fontSize:11,fontWeight:700,color:T.subtext,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.06em"}}>LeetCode / GFG link</div>
                <input value={form.link} onChange={e=>setForm(f=>({...f,link:e.target.value}))} placeholder="https://leetcode.com/problems/..." style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1.5px solid ${T.inputBorder}`,fontSize:13,boxSizing:"border-box",background:T.inputBg,color:T.text}}/>
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:T.subtext,marginBottom:7,textTransform:"uppercase",letterSpacing:"0.06em"}}>Difficulty (for you)</div>
                <div style={{display:"flex",gap:8}}>
                  {[{v:"🟢 Easy",bg:"#f0fdf4",border:"#86efac",text:"#166534"},{v:"🟡 Medium",bg:"#fffbeb",border:"#fcd34d",text:"#92400e"},{v:"🔴 Hard",bg:"#fef2f2",border:"#fca5a5",text:"#991b1b"}].map(opt=>(
                    <button key={opt.v} onClick={()=>setForm(f=>({...f,difficulty:f.difficulty===opt.v?"":opt.v}))} style={{flex:1,padding:"8px 10px",borderRadius:10,border:`2px solid ${form.difficulty===opt.v?opt.border:T.inputBorder}`,cursor:"pointer",fontSize:12,fontWeight:700,background:form.difficulty===opt.v?opt.bg:T.chipBg,color:form.difficulty===opt.v?opt.text:T.subtext,transition:"all 0.15s"}}>{opt.v}</button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:T.subtext,marginBottom:7,textTransform:"uppercase",letterSpacing:"0.06em"}}>🏷️ Pattern tags</div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                  {PATTERNS.map(pt=>(
                    <button key={pt} onClick={()=>togglePat(pt)} style={{padding:"4px 10px",borderRadius:99,border:`1.5px solid ${(form.pattern||[]).includes(pt)?"#a78bfa":T.inputBorder}`,cursor:"pointer",fontSize:11,fontWeight:600,background:(form.pattern||[]).includes(pt)?dark?"#2d1f5e":"#f5f3ff":T.chipBg,color:(form.pattern||[]).includes(pt)?"#a78bfa":T.subtext,transition:"all 0.15s"}}>{pt}</button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:T.subtext,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.06em"}}>Notes</div>
                <textarea value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))} rows={3} placeholder="Key idea, TC/SC, pattern, gotcha..." style={{width:"100%",padding:"9px 12px",borderRadius:9,border:`1.5px solid ${T.inputBorder}`,fontSize:13,resize:"vertical",boxSizing:"border-box",background:T.inputBg,color:T.text,fontFamily:"inherit"}}/>
              </div>
              <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                <button onClick={closeModal} style={{background:T.mutedBg,color:T.subtext,border:"none",borderRadius:10,padding:"9px 20px",cursor:"pointer",fontSize:13,fontWeight:700}}>Cancel</button>
                <button onClick={saveForm} className="hbtn" style={{background:"linear-gradient(135deg,#4f46e5,#7c3aed)",color:"white",border:"none",borderRadius:10,padding:"9px 24px",cursor:"pointer",fontSize:13,fontWeight:800,boxShadow:"0 4px 16px rgba(79,70,229,0.4)",transition:"all 0.2s"}}>Save Problem</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
