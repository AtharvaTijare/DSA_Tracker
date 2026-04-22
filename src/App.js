import React, { useState, useEffect, useRef } from "react";

/* ─── CONSTANTS ─── */
const REV_META = [
  { label: "Rev 1", desc: "Solve from scratch", xp: 10, bg: "#fef3c7", border: "#fbbf24", text: "#78350f", dot: "#f59e0b", bar: "linear-gradient(90deg,#f59e0b,#fbbf24)" },
  { label: "Rev 2", desc: "Solve + edge cases", xp: 10, bg: "#ede9fe", border: "#a78bfa", text: "#4c1d95", dot: "#8b5cf6", bar: "linear-gradient(90deg,#8b5cf6,#a78bfa)" },
  { label: "Rev 3", desc: "Pseudocode / dry run", xp: 10, bg: "#dbeafe", border: "#60a5fa", text: "#1e3a8a", dot: "#3b82f6", bar: "linear-gradient(90deg,#3b82f6,#60a5fa)" },
  { label: "Rev 4", desc: "Final recall", xp: 50, bg: "#d1fae5", border: "#34d399", text: "#064e3b", dot: "#10b981", bar: "linear-gradient(90deg,#10b981,#34d399)" },
];
const REV_INTERVALS = [3, 7, 30, 90];
const TOPIC_BG = {
  "Arrays":               { bg: "#fff7ed", border: "#fb923c", text: "#7c2d12", pill: "#ea580c" },
  "Binary Search":        { bg: "#f5f3ff", border: "#a78bfa", text: "#4c1d95", pill: "#7c3aed" },
  "Strings":              { bg: "#ecfdf5", border: "#34d399", text: "#064e3b", pill: "#059669" },
  "Linked List":          { bg: "#fff1f2", border: "#fb7185", text: "#881337", pill: "#e11d48" },
  "Recursion":            { bg: "#ecfeff", border: "#22d3ee", text: "#164e63", pill: "#0891b2" },
  "Backtracking":         { bg: "#fdf4ff", border: "#e879f9", text: "#701a75", pill: "#a21caf" },
  "Sorting":              { bg: "#eff6ff", border: "#60a5fa", text: "#1e3a8a", pill: "#2563eb" },
  "Bit Manipulation":     { bg: "#faf5ff", border: "#c084fc", text: "#581c87", pill: "#9333ea" },
  "Stack & Queue":        { bg: "#fff7ed", border: "#fdba74", text: "#9a3412", pill: "#ea580c" },
  "Sliding Window":       { bg: "#f0fdfa", border: "#2dd4bf", text: "#134e4a", pill: "#0d9488" },
  "Heap":                 { bg: "#f0fdf4", border: "#4ade80", text: "#14532d", pill: "#16a34a" },
  "Greedy":               { bg: "#fefce8", border: "#facc15", text: "#713f12", pill: "#ca8a04" },
  "Binary Trees":         { bg: "#eef2ff", border: "#818cf8", text: "#312e81", pill: "#4f46e5" },
  "BST":                  { bg: "#fdf2f8", border: "#f0abfc", text: "#701a75", pill: "#c026d3" },
  "Graphs":               { bg: "#f0f9ff", border: "#38bdf8", text: "#0c4a6e", pill: "#0284c7" },
  "Dynamic Programming":  { bg: "#fef2f2", border: "#fca5a5", text: "#7f1d1d", pill: "#dc2626" },
  "Tries":                { bg: "#fff7ed", border: "#fb923c", text: "#7c2d12", pill: "#f97316" },
};
const TC = (t) => TOPIC_BG[t] || { bg: "#f1f5f9", border: "#94a3b8", text: "#334155", pill: "#64748b" };
const TOPICS = Object.keys(TOPIC_BG);
const PATTERNS = ["Two Pointer","Sliding Window","Binary Search","BFS/DFS","Dynamic Programming","Backtracking","Greedy","Monotonic Stack","Prefix Sum","Hashing","Recursion","Heap/PQ","Union Find","Trie","Bit Manipulation","Fast & Slow Pointer"];

/* ─── DSA SHEET SECTIONS ─── */
const DSA_SECTIONS = {
  "Step 1: Basics":              ["Lec 1: Patterns & Math", "Lec 2: Sorting Basics", "Lec 3: Hashing"],
  "Step 2: Arrays":              ["Lec 1: Easy", "Lec 2: Medium", "Lec 3: Hard"],
  "Step 3: Binary Search":       ["Lec 1: On 1D Arrays", "Lec 2: On Answers", "Lec 3: On 2D Arrays"],
  "Step 4: Strings":             ["Lec 1: Basic", "Lec 2: Medium & Hard"],
  "Step 5: Linked List":         ["Lec 1: Basics", "Lec 2: Doubly LL", "Lec 3: Medium / Hard"],
  "Step 6: Recursion":           ["Lec 1: Fundamentals", "Lec 2: Subsequences", "Lec 3: Hard Problems"],
  "Step 7: Bit Manipulation":    ["Lec 1: Concepts", "Lec 2: Interview Problems"],
  "Step 8: Stack & Queue":       ["Lec 1: Learning", "Lec 2: Prefix/Infix/Postfix", "Lec 3: Monotonic Stack"],
  "Step 9: Sliding Window":      ["Lec 1: Medium", "Lec 2: Hard"],
  "Step 10: Heaps":              ["Lec 1: Learning", "Lec 2: Medium", "Lec 3: Hard"],
  "Step 11: Greedy":             ["Lec 1: Easy", "Lec 2: Medium / Hard"],
  "Step 12: Binary Trees":       ["Lec 1: Traversals", "Lec 2: Medium", "Lec 3: Hard"],
  "Step 13: BST":                ["Lec 1: Concepts", "Lec 2: Problems"],
  "Step 14: Graphs":             ["Lec 1: BFS/DFS", "Lec 2: Topo Sort", "Lec 3: Shortest Path", "Lec 4: MST", "Lec 5: Hard"],
  "Step 15: Dynamic Programming":["Lec 1: 1D DP", "Lec 2: 2D / Grid DP", "Lec 3: DP on Strings", "Lec 4: DP on Stocks", "Lec 5: DP on LIS", "Lec 6: MCM / Partition DP"],
  "Step 16: Tries":              ["Lec 1: Theory", "Lec 2: Problems"],
  "Custom":                      ["General"],
};
const LEVELS = [
  { min: 0,   max: 9,   name: "Newbie",          emoji: "🐣", bg: "#f1f5f9", accent: "#64748b", bar: "linear-gradient(90deg,#94a3b8,#64748b)" },
  { min: 10,  max: 24,  name: "Learner",          emoji: "📚", bg: "#eff6ff", accent: "#3b82f6", bar: "linear-gradient(90deg,#60a5fa,#3b82f6)" },
  { min: 25,  max: 49,  name: "Coder",            emoji: "💻", bg: "#ecfdf5", accent: "#10b981", bar: "linear-gradient(90deg,#34d399,#10b981)" },
  { min: 50,  max: 99,  name: "Problem Solver",   emoji: "🧠", bg: "#f5f3ff", accent: "#8b5cf6", bar: "linear-gradient(90deg,#a78bfa,#8b5cf6)" },
  { min: 100, max: 149, name: "Pattern Hunter",   emoji: "🎯", bg: "#fffbeb", accent: "#f59e0b", bar: "linear-gradient(90deg,#fbbf24,#f59e0b)" },
  { min: 150, max: 199, name: "DSA Warrior",      emoji: "⚔️", bg: "#fff7ed", accent: "#f97316", bar: "linear-gradient(90deg,#fb923c,#f97316)" },
  { min: 200, max: 299, name: "Algorithm Pro",    emoji: "🚀", bg: "#fef2f2", accent: "#ef4444", bar: "linear-gradient(90deg,#f87171,#ef4444)" },
  { min: 300, max: 999, name: "DSA Master",       emoji: "👑", bg: "#fefce8", accent: "#eab308", bar: "linear-gradient(90deg,#facc15,#eab308,#f97316)" },
];
const MILESTONES = [
  { count: 10,  emoji: "🎯", color: "#6366f1", msg: "Double digits! You've cracked the first wall.",    sub: "The habit is forming. Don't stop now." },
  { count: 25,  emoji: "⚡", color: "#8b5cf6", msg: "Quarter century! Patterns are clicking.",           sub: "You're past the hardest phase." },
  { count: 50,  emoji: "🚀", color: "#0891b2", msg: "50 problems! Top 30% of DSA practitioners.",       sub: "Half a century. You're serious." },
  { count: 100, emoji: "💯", color: "#059669", msg: "TRIPLE DIGITS! Interviews fear you now.",           sub: "100 problems. You're a different person." },
  { count: 150, emoji: "⚔️", color: "#f97316", msg: "150 problems! Elite territory.",                   sub: "Most people quit at 30. You're at 150." },
  { count: 200, emoji: "👑", color: "#eab308", msg: "200 problems! Interview-ready.",                    sub: "You've earned the right to be confident." },
  { count: 300, emoji: "🏆", color: "#ef4444", msg: "300 problems! DSA MASTER.",                         sub: "Fewer than 1% of people reach this." },
];
const MISTAKE_TYPES = ["Wrong pattern identified","Off-by-one error","Wrong base case","Missed edge case","Pointer/index error","Forgot TC/SC","Logic error","Didn't handle duplicates","Overflow not handled","Other"];
const QUOTES = ["Every expert was once a beginner. Keep going!","Consistency beats intensity. Show up today.","Hard problems today = easy interviews tomorrow.","Progress, not perfection.","Trust the process. The sheet works if you work.","One problem at a time. That is all it takes.","Your future self is watching. Make them proud."];
const EMPTY = { id: null, section: "", subSection: "", topic: "", name: "", link: "", difficulty: "", note: "", codeSnippet: "", pattern: [], status: "Unsolved", solvedDate: "", revStage: 0, revDates: [], bookmarked: false, revHistory: [] };

/* ─── UTILS ─── */
const todayStr  = () => new Date().toISOString().split("T")[0];
const addDays   = (d, n) => { const dt = new Date(d); dt.setDate(dt.getDate() + n); return dt.toISOString().split("T")[0]; };
const fmtTime   = (s) => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
const fmtHours  = (s) => { const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60); return h > 0 ? h + "h " + m + "m" : m + "m"; };

/* ─── LOCALSTORAGE ─── */
const lsGet = (k, fb) => { try { const v = localStorage.getItem("dsatrk_" + k); return v !== null ? JSON.parse(v) : fb; } catch (e) { return fb; } };
const lsSet = (k, v) => { try { localStorage.setItem("dsatrk_" + k, JSON.stringify(v)); } catch (e) {} };

/* ─── THEME CONTEXT ─── */
const ThemeCtx = React.createContext({ T: {}, dark: false });

const Pill = ({ label, bg, border, text, sm }) => {
  const { dark, T } = React.useContext(ThemeCtx);
  return (
    <span style={{ fontSize: sm ? 10 : 11, padding: sm ? "2px 8px" : "3px 10px", borderRadius: 99, fontWeight: 700, background: dark ? T.chipBg : (bg || "#f0f0f0"), color: text || "#555", border: "1.5px solid " + (dark ? (border || "#ddd") + "66" : (border || "#ddd")), display: "inline-block", marginRight: 4, marginTop: 2, whiteSpace: "nowrap" }}>{label}</span>
  );
};
const Card = ({ bg, border, children, style: st }) => {
  const { dark, T } = React.useContext(ThemeCtx);
  return (
    <div style={{ background: dark ? T.cardBg : (bg || "#f8fafc"), border: "1.5px solid " + (dark ? T.cardBorder : (border || "#e2e8f0")), borderRadius: 14, padding: "16px 20px", marginBottom: 14, ...(st || {}) }}>{children}</div>
  );
};
const SH = ({ children, color, size }) => {
  const { T } = React.useContext(ThemeCtx);
  return (
    <div style={{ fontWeight: 700, fontSize: size || 15, marginBottom: 12, letterSpacing: -0.3, color: color || T.text }}>{children}</div>
  );
};
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #c4b5fd; border-radius: 99px; }
  @keyframes fall  { to { transform: translateY(90vh) rotate(720deg); opacity: 0; } }
  @keyframes pop   { from { transform: scale(0.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  @keyframes slR   { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes glow  { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  @keyframes shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
  @keyframes msA   { 0% { transform: scale(0.6); opacity: 0; } 60% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } }
  .hbtn { transition: all 0.18s !important; cursor: pointer; }
  .hbtn:hover { transform: translateY(-2px) !important; filter: brightness(1.1) !important; }
  .prow { transition: all 0.15s; }
  .prow:hover { transform: translateX(2px); }
  .sht { background: linear-gradient(90deg,#a78bfa,#60a5fa,#f9a8d4,#a78bfa); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 3s linear infinite; }
  .mono { font-family: 'Courier New', monospace !important; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 14px; transition: all 0.18s; border: none; width: 100%; text-align: left; }
  .nav-item:hover { transform: translateX(3px); }
  textarea:focus, input:focus, select:focus { outline: 2px solid #a78bfa !important; outline-offset: 1px; }
  /* Smooth collapse/expand using CSS grid trick */
  .collapsible        { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.32s ease; opacity: 0; }
  .collapsible.open   { grid-template-rows: 1fr; opacity: 1; }
  .collapsible > .collapsible-inner { overflow: hidden; }
  /* #12 Mobile responsive */
  @media (max-width: 768px) {
    .desktop-sidebar { transform: translateX(-100%); transition: transform 0.3s ease; }
    .desktop-sidebar.open { transform: translateX(0); }
    .sidebar-overlay { display: block !important; }
    .main-content { margin-left: 0 !important; max-width: 100vw !important; padding: 16px !important; }
    .mobile-topbar { display: flex !important; }
    .mobile-bottom-nav { display: flex !important; }
    .rev-grid { grid-template-columns: 1fr !important; }
    .two-col { grid-template-columns: 1fr !important; }
    .four-col { grid-template-columns: repeat(2,1fr) !important; }
  }
  @media (min-width: 769px) {
    .sidebar-overlay { display: none !important; }
    .mobile-topbar { display: none !important; }
    .mobile-bottom-nav { display: none !important; }
    .desktop-sidebar { transform: none !important; }
  }
  .sidebar-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 99; display: none; }
  .mobile-topbar { position: fixed; top: 0; left: 0; right: 0; height: 56px; z-index: 98; align-items: center; padding: 0 16px; gap: 12px; display: none; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
  .mobile-bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; height: 60px; z-index: 98; align-items: center; justify-content: space-around; display: none; border-top: 1px solid; padding-bottom: env(safe-area-inset-bottom); }
`;

export default function App() {
  /* ─── STATE ─── */
  const [problems,        setProblems]        = useState(() => lsGet("problems", []));
  const [tab,             setTab]             = useState("today");
  const [filter,          setFilter]          = useState("All");
  const [topicFilter,     setTopicFilter]     = useState("");
  const [patternFilter,   setPatternFilter]   = useState("");
  const [modal,           setModal]           = useState(null);
  const [form,            setForm]            = useState(EMPTY);
  const [search,          setSearch]          = useState("");
  const [xp,              setXp]              = useState(() => lsGet("xp", 0));
  const [streak,          setStreak]          = useState(() => lsGet("streak", { count: 0, lastDate: "" }));
  const [toast,           setToast]           = useState(null);
  const [sparks,          setSparks]          = useState([]);
  const [quote]                               = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const [dark,            setDark]            = useState(() => lsGet("dark", false));
  const [activityLog,     setActivityLog]     = useState(() => lsGet("activityLog", {}));
  const [topicNotes,      setTopicNotes]      = useState(() => lsGet("topicNotes", {}));
  const [notesTopic,      setNotesTopic]      = useState(TOPICS[0]);
  const [timerSessions,   setTimerSessions]   = useState(() => lsGet("timerSessions", []));
  const [hourLog,         setHourLog]         = useState(() => lsGet("hourLog", {}));
  const [revQuality,      setRevQuality]      = useState(() => lsGet("revQuality", {}));
  const [mistakes,        setMistakes]        = useState(() => lsGet("mistakes", []));
  const [milestonesShown, setMilestonesShown] = useState(() => lsGet("milestonesShown", []));
  const [milestoneModal,  setMilestoneModal]  = useState(null);
  const [mistakeModal,    setMistakeModal]    = useState(null);
  const [calHover,        setCalHover]        = useState(null);
  const [timerSec,           setTimerSec]           = useState(0);
  const [timerRunning,       setTimerRunning]       = useState(false);
  const [patternMasteryOpen, setPatternMasteryOpen] = useState(true);
  const [heatYear,           setHeatYear]           = useState(new Date().getFullYear());
  const [trackerView,        setTrackerView]        = useState("flat");
  const [collapsedSections,  setCollapsedSections]  = useState({});
  const [collapsedSubSecs,   setCollapsedSubSecs]   = useState({});
  // #2 Configurable revision intervals (kept for import compat)
  const [revIntervals,    setRevIntervals]    = useState(() => lsGet("revIntervals", [3, 7, 30, 90]));
  // #5 Undo delete
  const [undoQueue,       setUndoQueue]       = useState([]);
  // #12 Mobile sidebar toggle
  const [sidebarOpen,     setSidebarOpen]     = useState(false);
  // #1 Last export date for backup reminder
  const [lastExportDate,  setLastExportDate]  = useState(() => lsGet("lastExportDate", ""));
  // #3 Per-problem solve timer link
  const [linkedProblemId, setLinkedProblemId] = useState(null);
  // unused extras kept only for import compat
  const [weeklyGoal]      = useState(() => lsGet("weeklyGoal", 5));
  const [streakMode]      = useState(() => lsGet("streakMode", "any"));
  const [milestoneLog,    setMilestoneLog]    = useState(() => lsGet("milestoneLog", {}));
  const [settingsOpen,    setSettingsOpen]    = useState(false);

  const timerTarget    = 20 * 60;
  const timerRef       = useRef(null);
  const timerSecRef    = useRef(0);
  const importFileRef  = useRef(null);
  const revCardTimers  = useRef({});

  const toggleSection   = (sec) => setCollapsedSections((p) => ({ ...p, [sec]: !p[sec] }));
  const toggleSubSec    = (key) => setCollapsedSubSecs((p) => ({ ...p, [key]: !p[key] }));
  const today        = todayStr();
  const nowObj       = new Date();
  const currentMonth = nowObj.getFullYear() + "-" + String(nowObj.getMonth() + 1).padStart(2, "0");

  /* ─── INJECT GLOBAL CSS ─── */
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  /* ─── PERSIST ─── */
  useEffect(() => { lsSet("problems",        problems);        }, [problems]);
  useEffect(() => { lsSet("xp",              xp);              }, [xp]);
  useEffect(() => { lsSet("streak",          streak);          }, [streak]);
  useEffect(() => { lsSet("activityLog",     activityLog);     }, [activityLog]);
  useEffect(() => { lsSet("topicNotes",      topicNotes);      }, [topicNotes]);
  useEffect(() => { lsSet("timerSessions",   timerSessions);   }, [timerSessions]);
  useEffect(() => { lsSet("hourLog",         hourLog);         }, [hourLog]);
  useEffect(() => { lsSet("revQuality",      revQuality);      }, [revQuality]);
  useEffect(() => { lsSet("mistakes",        mistakes);        }, [mistakes]);
  useEffect(() => { lsSet("milestonesShown", milestonesShown); }, [milestonesShown]);
  useEffect(() => { lsSet("revIntervals",    revIntervals);    }, [revIntervals]);
  useEffect(() => { lsSet("lastExportDate",  lastExportDate);  }, [lastExportDate]);
  useEffect(() => { lsSet("milestoneLog",    milestoneLog);    }, [milestoneLog]);
  useEffect(() => {
    lsSet("dark", dark);
    document.body.style.background = dark ? "#0f0f1a" : "#f1f5f9";
  }, [dark]);

  // #20 Escape closes any open modal
  useEffect(() => {
    const handler = (e) => {
      if (e.key !== "Escape") return;
      if (modal)          { setModal(null); setForm(EMPTY); }
      if (milestoneModal) setMilestoneModal(null);
      if (mistakeModal)   setMistakeModal(null);
      if (settingsOpen)   setSettingsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modal, milestoneModal, mistakeModal, settingsOpen]);

  // Reset rev card timers when switching TO revision tab
  useEffect(() => {
    if (tab === "revision") {
      revCardTimers.current = {};
      const now = Date.now();
      const todayDate = new Date().toISOString().split("T")[0];
      problems.filter((p) => {
        if (p.status === "Unsolved" || p.revStage >= 4) return false;
        const nr = p.revDates[p.revStage];
        return nr && nr <= todayDate;
      }).forEach((p) => { revCardTimers.current[p.id] = now; });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  /* ─── REV CARD TIMERS (seed when due list changes) ─── */
  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0];
    const dueNow = problems.filter((p) => {
      if (p.status === "Unsolved" || p.revStage >= 4) return false;
      const nr = p.revDates[p.revStage];
      return nr && nr <= todayDate;
    });
    const now = Date.now();
    dueNow.forEach((p) => { if (!revCardTimers.current[p.id]) revCardTimers.current[p.id] = now; });
  }, [problems]);

  /* ─── TIMER ─── */
  useEffect(() => { timerSecRef.current = timerSec; }, [timerSec]);
  useEffect(() => {
    if (timerRunning) { timerRef.current = setInterval(() => setTimerSec((s) => s + 1), 1000); }
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  /* ─── THEME ─── */
  const T = dark
    ? { pageBg: "#0f0f1a", sidebar: "#12121f", cardBg: "#1a1a2e", cardBorder: "#2d2d4e", text: "#e2e8f0", subtext: "#94a3b8", inputBg: "#0f172a", inputBorder: "#334155", rowAlt: "#1e2035", chipBg: "#1e293b", chipBorder: "#334155", mutedBg: "#0f172a" }
    : { pageBg: "#f1f5f9", sidebar: "#ffffff", cardBg: "white",   cardBorder: "#e5e7eb", text: "#111827", subtext: "#6b7280", inputBg: "#f8fafc", inputBorder: "#e5e7eb", rowAlt: "#f9fafb", chipBg: "white",   chipBorder: "#e5e7eb", mutedBg: "#f1f5f9" };

  const TCd = (t) => { const b = TC(t); if (!dark) return b; return { bg: "#1e293b", border: b.pill + "55", text: b.pill, pill: b.pill }; };

  /* ─── COMPUTED ─── */
  const solved          = problems.filter((p) => p.status !== "Unsolved");
  const mastered        = problems.filter((p) => p.revStage >= 4);
  const bookmarked      = problems.filter((p) => p.bookmarked);
  const getNR           = (p) => p.revDates[p.revStage] || null;
  const due             = solved.filter((p) => p.revStage < 4 && getNR(p) && getNR(p) <= today);
  const upcoming        = solved.filter((p) => { if (p.revStage >= 4) return false; const d = getNR(p); if (!d) return false; const diff = (new Date(d) - new Date(today)) / 86400000; return diff > 0 && diff <= 3; });
  const weakTopics      = (() => { const m = {}; solved.forEach((p) => { if (!p.topic) return; if (!m[p.topic]) m[p.topic] = { hard: 0, total: 0 }; m[p.topic].total++; if (p.difficulty === "Hard") m[p.topic].hard++; }); return Object.entries(m).filter(([, v]) => v.total >= 2 && v.hard / v.total >= 0.5).map(([t]) => t); })();
  const level           = LEVELS.find((l) => solved.length >= l.min && solved.length <= l.max) || LEVELS[0];
  const nextLvl         = LEVELS.find((l) => l.min > solved.length);
  const lvlPct          = nextLvl ? Math.round((solved.length - level.min) / (nextLvl.min - level.min) * 100) : 100;
  const weekStart       = (() => { const d = new Date(today); d.setDate(d.getDate() - d.getDay()); return d.toISOString().split("T")[0]; })();
  const solvedThisWeek  = problems.filter((p) => p.solvedDate >= weekStart && p.solvedDate <= today).length;
  const weeklyPct       = Math.min(Math.round(solvedThisWeek / weeklyGoal * 100), 100);
  const overdueCount    = due.filter((p) => getNR(p) < today).length;
  const sPct            = problems.length ? Math.round(solved.length / problems.length * 100) : 0;
  const totalSeconds    = timerSessions.reduce((a, s) => a + s.seconds, 0);
  const monthSeconds    = timerSessions.filter((s) => s.month === currentMonth).reduce((a, s) => a + s.seconds, 0);
  const weekSeconds     = timerSessions.filter((s) => s.date >= weekStart && s.date <= today).reduce((a, s) => a + s.seconds, 0);
  const peakHourEntry   = Object.entries(hourLog).sort((a, b) => b[1] - a[1])[0];
  const peakHour        = peakHourEntry ? Number(peakHourEntry[0]) : null;
  const peakLabel       = peakHour === null ? null : peakHour < 6 ? "Late Night" : peakHour < 12 ? "Morning" : peakHour < 17 ? "Afternoon" : peakHour < 21 ? "Evening" : "Night";
  const maxHourCount    = Math.max(1, ...Object.values(hourLog));
  const getQuality      = (t) => { const q = revQuality[t]; if (!q) return null; const tot = q.easy + q.hard; if (tot < 3) return null; return Math.round(q.easy / tot * 100); };
  const mistakeCounts   = mistakes.reduce((a, m) => ({ ...a, [m.type]: (a[m.type] || 0) + 1 }), {});
  const topMistake      = Object.entries(mistakeCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const weekRevisions   = Object.entries(activityLog).filter(([d]) => d >= weekStart && d <= today).reduce((a, [, v]) => a + v, 0);
  const bestTopicThisWeek = (() => { const m = {}; solved.filter((p) => p.solvedDate >= weekStart).forEach((p) => { if (p.topic) m[p.topic] = (m[p.topic] || 0) + 1; }); const e = Object.entries(m).sort((a, b) => b[1] - a[1])[0]; return e ? e[0] : null; })();
  const daysMissed      = streak.lastDate ? Math.max(0, Math.floor((new Date(today) - new Date(streak.lastDate)) / 86400000)) : 0;
  const calDays         = Array.from({ length: 7 }, (_, i) => { const d = new Date(today); d.setDate(d.getDate() + i); const s = d.toISOString().split("T")[0]; return { date: s, dayName: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()], items: solved.filter((p) => p.revStage < 4 && getNR(p) === s) }; });
  const maxAct          = Math.max(1, ...Object.values(activityLog));
  const activeDaysCount = Object.values(activityLog).filter((v) => v > 0).length;
  const maxStreakCount  = (() => {
    const dates = Object.keys(activityLog).filter((d) => activityLog[d] > 0).sort();
    let best = 0, cur = 0, prev = null;
    dates.forEach((d) => {
      if (prev && (new Date(d) - new Date(prev)) / 86400000 === 1) { cur++; } else { cur = 1; }
      best = Math.max(best, cur); prev = d;
    });
    return best;
  })();

  /* ─── FULL-YEAR HEATMAP ─── */
  const yearHeatWeeks = (() => {
    const jan1    = new Date(heatYear, 0, 1);
    const dec31   = new Date(heatYear, 11, 31);
    const start   = new Date(jan1);  start.setDate(jan1.getDate() - jan1.getDay());
    const end     = new Date(dec31); end.setDate(dec31.getDate() + (6 - dec31.getDay()));
    const weeks   = [];
    const cur     = new Date(start);
    while (cur <= end) {
      const week = [];
      for (let d = 0; d < 7; d++) { week.push(new Date(cur).toISOString().split("T")[0]); cur.setDate(cur.getDate() + 1); }
      weeks.push(week);
    }
    return weeks;
  })();
  const yearHeatTotalActions = yearHeatWeeks.flat().reduce((a, d) => a + (activityLog[d] || 0), 0);
  const availableYears = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i);
  const patternMap      = {};
  solved.forEach((p) => (p.pattern || []).forEach((pt) => { if (!patternMap[pt]) patternMap[pt] = { total: 0, mastered: 0 }; patternMap[pt].total++; if (p.revStage >= 4) patternMap[pt].mastered++; }));
  const patternEntries  = Object.entries(patternMap).sort((a, b) => b[1].total - a[1].total);
  const patternBars     = ["linear-gradient(90deg,#4f46e5,#7c3aed)","linear-gradient(90deg,#0891b2,#22d3ee)","linear-gradient(90deg,#d97706,#fbbf24)","linear-gradient(90deg,#059669,#34d399)","linear-gradient(90deg,#dc2626,#f87171)","linear-gradient(90deg,#a21caf,#e879f9)"];
  const notesCt         = TCd(notesTopic);
  const calHoverDay     = calDays.find((d) => d.date === calHover) || null;
  const filtered        = problems
    .filter((p) => filter === "All" ? true : filter === "Unsolved" ? p.status === "Unsolved" : filter === "Solved" ? p.status !== "Unsolved" : filter === "Mastered" ? p.revStage >= 4 : p.bookmarked)
    .filter((p) => !topicFilter    || p.topic === topicFilter)
    .filter((p) => !patternFilter  || (p.pattern || []).includes(patternFilter))
    .filter((p) => !search         || p.name.toLowerCase().includes(search.toLowerCase()));

  /* ─── ACTIONS ─── */
  const boom      = () => { setSparks(Array.from({ length: 30 }, (_, i) => ({ id: i, x: 10 + Math.random() * 80, c: ["#f59e0b","#ef4444","#10b981","#8b5cf6","#f43f5e","#06b6d4","#a855f7","#22d3ee","#84cc16","#fbbf24"][i % 10], sz: 6 + Math.random() * 10, dl: Math.random() * 0.7, shape: i % 3 === 0 ? "50%" : "3px" }))); setTimeout(() => setSparks([]), 2400); };
  const showToast = (msg, bg, border) => { setToast({ msg, bg, border }); setTimeout(() => setToast(null), 2800); };
  const bumpStreak = () => setStreak((p) => { if (p.lastDate === today) return p; const y = addDays(today, -1); return { count: p.lastDate === y ? p.count + 1 : 1, lastDate: today }; });
  const logActivity = () => { const h = new Date().getHours(); setActivityLog((prev) => ({ ...prev, [today]: (prev[today] || 0) + 1 })); setHourLog((prev) => ({ ...prev, [h]: (prev[h] || 0) + 1 })); };
  const checkMilestone = (nc, shownList) => {
    const m = MILESTONES.find((ms) => ms.count === nc && !shownList.includes(ms.count));
    if (m) {
      setTimeout(() => {
        setMilestoneModal(m);
        setMilestonesShown((p) => [...p, m.count]);
        setMilestoneLog((prev) => ({ ...prev, [m.count]: today }));
        boom();
      }, 900);
    }
  };


  const markSolved = (id) => {
    const nc = solved.length + 1;
    setProblems((prev) => prev.map((p) => p.id !== id ? p : { ...p, status: "Solved", solvedDate: today, revStage: 0, revDates: revIntervals.map((n) => addDays(today, n)) }));
    setXp((x) => x + 20); bumpStreak(); boom(); logActivity(); checkMilestone(nc, milestonesShown);
    showToast("Solved! +20 XP", "#d1fae5", "#34d399");
  };
  const markRev = (id, fb) => {
    const elapsedSec = revCardTimers.current[id] ? Math.round((Date.now() - revCardTimers.current[id]) / 1000) : 0;
    delete revCardTimers.current[id];
    const timeLabel = elapsedSec >= 60 ? Math.floor(elapsedSec / 60) + "m " + (elapsedSec % 60) + "s" : elapsedSec + "s";
    const p = problems.find((x) => x.id === id);
    const wasMaster = p && p.revStage === 3 && fb === "easy";
    if (p && p.topic) setRevQuality((prev) => ({ ...prev, [p.topic]: { easy: (prev[p.topic] ? prev[p.topic].easy : 0) + (fb === "easy" ? 1 : 0), hard: (prev[p.topic] ? prev[p.topic].hard : 0) + (fb === "hard" ? 1 : 0) } }));
    setProblems((prev) => prev.map((pr) => {
      if (pr.id !== id) return pr;
      const ns = fb === "easy" ? pr.revStage + 1 : pr.revStage;
      const nd = [...pr.revDates];
      if (fb === "hard") nd[pr.revStage] = addDays(today, 2);
      const hist = [...(pr.revHistory || []), { date: today, stage: pr.revStage + 1, seconds: elapsedSec, result: fb }];
      return { ...pr, revStage: ns, revDates: nd, revHistory: hist };
    }));
    if (fb === "hard") setTimeout(() => setMistakeModal(id), 300);
    if (wasMaster)          { setXp((x) => x + 50); boom(); logActivity(); showToast("👑 MASTERED! +50 XP · " + timeLabel, "#fef9c3", "#facc15"); }
    else if (fb === "easy") { setXp((x) => x + 10); logActivity(); showToast("✅ Rev done! +10 XP · took " + timeLabel, "#ede9fe", "#a78bfa"); }
    else                    { setXp((x) => x + 5);  logActivity(); showToast("🔄 Rescheduled +5 XP · took " + timeLabel, "#fef3c7", "#fbbf24"); }
    bumpStreak();
  };
  const logMistake  = (type) => { if (!mistakeModal) return; setMistakes((prev) => [...prev, { date: today, type, problemId: mistakeModal }]); setMistakeModal(null); };
  const toggleBM    = (id) => setProblems((prev) => prev.map((p) => p.id !== id ? p : { ...p, bookmarked: !p.bookmarked }));
  // #5 Soft-delete with 5-second undo
  const delP = (id) => {
    const p = problems.find((x) => x.id === id);
    if (!p) return;
    setProblems((prev) => prev.filter((x) => x.id !== id));
    const undoId = Date.now();
    setUndoQueue((prev) => [...prev, { id: undoId, problem: p }]);
    setToast({ msg: 'Deleted "' + p.name + '"', bg: "#fef2f2", border: "#fca5a5", undoId });
    setTimeout(() => {
      setUndoQueue((prev) => prev.filter((u) => u.id !== undoId));
      setToast((t) => (t && t.undoId === undoId ? null : t));
    }, 5000);
  };
  const undoDelete = (undoId) => {
    const entry = undoQueue.find((u) => u.id === undoId);
    if (!entry) return;
    setProblems((prev) => [...prev, entry.problem]);
    setUndoQueue((prev) => prev.filter((u) => u.id !== undoId));
    setToast(null);
    showToast('↩ Restored "' + entry.problem.name + '"', "#f0fdf4", "#86efac");
  };
  const togglePat   = (pt) => setForm((f) => ({ ...f, pattern: (f.pattern || []).includes(pt) ? f.pattern.filter((x) => x !== pt) : [...(f.pattern || []), pt] }));
  const openAdd     = () => { setForm({ ...EMPTY, id: Date.now() }); setModal("add"); };
  const openEdit    = (p) => { setForm({ ...p }); setModal("edit"); };
  const closeModal  = () => { setModal(null); setForm(EMPTY); };
  const saveForm    = () => { if (!form.name.trim()) return; if (modal === "add") setProblems((prev) => [...prev, form]); else setProblems((prev) => prev.map((p) => p.id === form.id ? form : p)); closeModal(); };
  const saveTimerSession = () => { const sec = timerSecRef.current; if (sec < 30) return; setTimerSessions((prev) => [...prev, { date: today, seconds: sec, month: currentMonth, hour: nowObj.getHours() }]); };
  const resetTimer  = () => { saveTimerSession(); setTimerRunning(false); setTimerSec(0); timerSecRef.current = 0; };

  /* ─── EXPORT ─── */
  const exportData = () => {
    const now = new Date();
    const ts  = now.getFullYear() + "-"
      + String(now.getMonth()+1).padStart(2,"0") + "-"
      + String(now.getDate()).padStart(2,"0") + "-"
      + String(now.getHours()).padStart(2,"0")
      + String(now.getMinutes()).padStart(2,"0");
    const payload = { version: 1, exportedAt: now.toISOString(), problems, xp, streak, activityLog, topicNotes, timerSessions, hourLog, revQuality, mistakes, milestonesShown, milestoneLog, revIntervals, weeklyGoal, streakMode, dark };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "striver-a2z-backup-" + ts + ".json"; a.click();
    URL.revokeObjectURL(url);
    setLastExportDate(today);
    showToast("✅ Exported " + problems.length + " problems", "#d1fae5", "#34d399");
  };

  /* ─── IMPORT ─── */
  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const d = JSON.parse(ev.target.result);
        if (!d.problems) throw new Error("Invalid backup file");
        const apply = (key, setter, val) => { setter(val); lsSet(key, val); };
        apply("problems",        setProblems,        d.problems);
        apply("xp",              setXp,              d.xp              ?? 0);
        apply("streak",          setStreak,          d.streak          ?? { count: 0, lastDate: "" });
        apply("activityLog",     setActivityLog,     d.activityLog     ?? {});
        apply("topicNotes",      setTopicNotes,      d.topicNotes      ?? {});
        apply("timerSessions",   setTimerSessions,   d.timerSessions   ?? []);
        apply("hourLog",         setHourLog,         d.hourLog         ?? {});
        apply("revQuality",      setRevQuality,      d.revQuality      ?? {});
        apply("mistakes",        setMistakes,        d.mistakes        ?? []);
        apply("milestonesShown", setMilestonesShown, d.milestonesShown ?? []);
        apply("milestoneLog",    setMilestoneLog,    d.milestoneLog    ?? {});
        apply("revIntervals",    setRevIntervals,    d.revIntervals    ?? [3,7,30,90]);
        showToast("✅ Imported " + d.problems.length + " problems", "#d1fae5", "#34d399");
      } catch {
        showToast("❌ Invalid file — import failed", "#fef2f2", "#fca5a5");
      }
      e.target.value = "";
    };
    reader.readAsText(file);
  };

  /* ─── SIDEBAR ─── */
  const TABS = [
    { id: "today",    icon: "🏠", label: "Today",    badge: overdueCount },
    { id: "revision", icon: "🔁", label: "Revision", badge: due.length   },
    { id: "tracker",  icon: "📊", label: "Tracker"                       },
    { id: "notes",    icon: "📝", label: "Notes"                         },
    { id: "stats",    icon: "📈", label: "Stats"                         },
  ];

  // #1 Days since last backup
  const daysSinceBackup = lastExportDate
    ? Math.floor((new Date(today) - new Date(lastExportDate)) / 86400000)
    : null;
  const showBackupWarning = daysSinceBackup === null || daysSinceBackup >= 3;

  const Sidebar = () => (
    <div style={{ width: 240, background: T.sidebar, borderRight: "1px solid " + T.cardBorder, display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh", overflowY: "auto", zIndex: 100, boxShadow: "2px 0 20px rgba(0,0,0,0.06)" }}>
      {/* Brand */}
      <div style={{ background: "linear-gradient(135deg,#1e1b4b,#312e81,#4f46e5)", padding: "22px 20px 18px", color: "white" }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
          <span>⚔️</span><span className="sht">Striver A2Z Tracker</span>
        </div>
        <div style={{ fontSize: 10, opacity: 0.5, lineHeight: 1.5, fontStyle: "italic" }}>"{quote}"</div>
      </div>

      {/* Level */}
      <div style={{ padding: "14px 16px", borderBottom: "1px solid " + T.cardBorder }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: level.bar, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, animation: "float 3s ease-in-out infinite", flexShrink: 0 }}>{level.emoji}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: T.text }}>{level.name}</div>
            <div style={{ fontSize: 10, color: T.subtext }}>{nextLvl ? nextLvl.min - solved.length + " more" : "Max level"}</div>
          </div>
        </div>
        <div style={{ background: dark ? "#1e293b" : "#e0e7ff", borderRadius: 99, height: 6, overflow: "hidden" }}>
          <div style={{ background: level.bar, height: 6, borderRadius: 99, width: lvlPct + "%", transition: "width 0.8s" }} />
        </div>
      </div>

      {/* Stats */}
      <div style={{ padding: "14px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, borderBottom: "1px solid " + T.cardBorder }}>
        {[{ v: "🔥 " + streak.count, l: "streak", c: "#f97316" }, { v: xp + " XP", l: "earned", c: "#8b5cf6" }, { v: solved.length, l: "solved", c: "#10b981" }, { v: mastered.length, l: "mastered", c: "#eab308" }].map((s, i) => (
          <div key={i} style={{ background: dark ? T.mutedBg : "#f8fafc", border: "1px solid " + T.cardBorder, borderRadius: 9, padding: "8px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: s.c }}>{s.v}</div>
            <div style={{ fontSize: 9, color: T.subtext, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Nav */}
      <nav style={{ padding: "10px 12px", flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.subtext, textTransform: "uppercase", letterSpacing: 1.5, padding: "6px 6px 8px" }}>Navigation</div>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className="nav-item hbtn" style={{ background: tab === t.id ? "linear-gradient(135deg,#4f46e5,#7c3aed)" : "transparent", color: tab === t.id ? "white" : T.subtext, marginBottom: 3, boxShadow: tab === t.id ? "0 4px 14px rgba(79,70,229,0.35)" : "none" }}>
            <span style={{ fontSize: 16 }}>{t.icon}</span>
            <span style={{ flex: 1 }}>{t.label}</span>
            {t.badge > 0 && <span style={{ background: tab !== t.id ? "#ef4444" : "rgba(255,255,255,0.3)", color: "white", borderRadius: 99, fontSize: 10, padding: "1px 7px", fontWeight: 700, animation: tab !== t.id ? "glow 1.8s infinite" : "none" }}>{t.badge}</span>}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "14px 16px", borderTop: "1px solid " + T.cardBorder }}>
        <button onClick={() => setDark((d) => !d)} style={{ width: "100%", padding: "9px", borderRadius: 10, border: "1.5px solid " + T.cardBorder, cursor: "pointer", fontSize: 13, fontWeight: 700, background: dark ? "#fbbf24" : "linear-gradient(135deg,#1e1b4b,#312e81)", color: dark ? "#1e1b4b" : "white", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
          <span>{dark ? "☀️" : "🌙"}</span><span>{dark ? "Light Mode" : "Dark Mode"}</span>
        </button>

        {/* Export */}
        <button onClick={exportData} style={{ width: "100%", padding: "9px", borderRadius: 10, border: "1.5px solid #86efac", cursor: "pointer", fontSize: 13, fontWeight: 700, background: dark ? "#14281f" : "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 6 }}>
          <span>⬇️</span><span>Export Backup</span>
        </button>

        {/* Import */}
        <input
          ref={importFileRef}
          type="file"
          accept=".json"
          style={{ display: "none" }}
          onChange={importData}
        />
        <button onClick={() => importFileRef.current && importFileRef.current.click()} style={{ width: "100%", padding: "9px", borderRadius: 10, border: "1.5px solid #bfdbfe", cursor: "pointer", fontSize: 13, fontWeight: 700, background: dark ? "#1e293b" : "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
          <span>⬆️</span><span>Import Backup</span>
        </button>

        <div style={{ textAlign: "center", fontSize: 10, color: T.subtext, lineHeight: 1.5 }}>
          Data saved in your browser<br />
          <span style={{ opacity: 0.6 }}>Export to back up · Import to restore</span>
        </div>
      </div>
    </div>
  );

  /* ─── TODAY TAB ─── */
  const TodayTab = () => (
    <div>
      {/* #1 Backup reminder */}
      {showBackupWarning && (
        <div style={{ background: dark ? "#1a1200" : "#fffbeb", border: "1.5px solid " + (dark ? "#854d0e" : "#fcd34d"), borderRadius: 11, padding: "10px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18 }}>💾</span>
          <div style={{ flex: 1, fontSize: 12, color: dark ? "#fde68a" : "#92400e" }}>
            <span style={{ fontWeight: 700 }}>
              {daysSinceBackup === null ? "No backup ever made." : daysSinceBackup + " days since last backup."}
            </span>
            {" "}Back up your data so you never lose progress.
          </div>
          <button onClick={exportData} style={{ background: "linear-gradient(135deg,#d97706,#f59e0b)", color: "white", border: "none", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
            Back up now
          </button>
        </div>
      )}
      {overdueCount > 0 && (
        <div style={{ background: dark ? "#2d1515" : "#fef2f2", border: "2px solid " + (dark ? "#7f1d1d" : "#fca5a5"), borderRadius: 13, padding: "14px 20px", marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24, animation: "pulse 1.5s infinite" }}>⚠️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#dc2626" }}>Revision streak at risk!</div>
            <div style={{ fontSize: 12, color: dark ? "#fca5a5" : "#b91c1c", marginTop: 2 }}>{overdueCount} problem{overdueCount > 1 ? "s" : ""} overdue — clear them now</div>
          </div>
          <button onClick={() => setTab("revision")} className="hbtn" style={{ background: "linear-gradient(135deg,#dc2626,#ef4444)", color: "white", border: "none", borderRadius: 9, padding: "9px 18px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>Fix now →</button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {/* LEFT */}
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            {[{ l: "Due", v: due.length, bg: due.length > 0 ? "#fef2f2" : "#f0fdf4", border: due.length > 0 ? "#fca5a5" : "#86efac", text: due.length > 0 ? "#991b1b" : "#166534", icon: "🔁" }, { l: "Starred", v: bookmarked.length, bg: "#fffbeb", border: "#fcd34d", text: "#92400e", icon: "⭐" }].map((s, i) => (
              <div key={i} style={{ background: dark ? T.cardBg : s.bg, border: "2px solid " + (dark ? s.border + "55" : s.border), borderRadius: 14, padding: "16px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 22, marginBottom: 5, animation: "float 3s ease-in-out infinite" }}>{s.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: s.text, letterSpacing: -1 }}>{s.v}</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: s.text, marginTop: 2, opacity: 0.75, textTransform: "uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
          {/* Compact inline counts */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, background: dark ? T.cardBg : "#f5f3ff", border: "1.5px solid " + (dark ? "#a78bfa44" : "#c4b5fd"), borderRadius: 8, padding: "5px 12px", color: dark ? "#a78bfa" : "#7c3aed", fontWeight: 700 }}>👑 {mastered.length} mastered</span>
            <span style={{ fontSize: 12, background: dark ? T.cardBg : "#f0fdf4", border: "1.5px solid " + (dark ? "#34d39944" : "#86efac"), borderRadius: 8, padding: "5px 12px", color: "#059669", fontWeight: 700 }}>📊 {problems.length} total</span>
            <span style={{ fontSize: 12, background: dark ? T.cardBg : "#eff6ff", border: "1.5px solid " + (dark ? "#3b82f644" : "#bfdbfe"), borderRadius: 8, padding: "5px 12px", color: "#2563eb", fontWeight: 700 }}>✅ {solved.length} solved</span>
          </div>

          <Card bg="#eff6ff" border="#bfdbfe">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <SH>🎯 Weekly Goal</SH>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#4f46e5" }}>{solvedThisWeek}/5</div>
            </div>
            <div style={{ background: dark ? "#0f172a" : "#dbeafe", borderRadius: 99, height: 12, overflow: "hidden", marginBottom: 8 }}>
              <div style={{ background: "linear-gradient(90deg,#4f46e5,#7c3aed)", height: 12, borderRadius: 99, width: weeklyPct + "%", transition: "width 0.7s" }} />
            </div>
            <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
              {Array.from({ length: 5 }, (_, i) => <div key={i} style={{ flex: 1, height: 7, borderRadius: 4, background: i < solvedThisWeek ? "linear-gradient(90deg,#4f46e5,#7c3aed)" : dark ? "#1e293b" : "#e0e7ff" }} />)}
            </div>
            <div style={{ fontSize: 12, color: T.subtext }}>{solvedThisWeek >= 5 ? "🎉 Weekly goal smashed!" : solvedThisWeek === 0 ? "Start strong today!" : (5 - solvedThisWeek) + " more to hit your goal!"}</div>
          </Card>

          <Card bg="white" border="#e5e7eb">
            <SH>📋 Daily Checklist</SH>
            {[
              { done: due.length === 0, icon: "🔁", label: due.length === 0 ? "Revisions clear!" : "Revise " + due.length + " problem" + (due.length > 1 ? "s" : ""), action: due.length > 0 ? () => setTab("revision") : null, btnBg: "linear-gradient(135deg,#7c3aed,#4f46e5)", btn: "Go" },
              { done: false, icon: "🧠", label: "Preview tonight's problem" },
              { done: false, icon: "💻", label: "Solve 1 new problem", action: () => setTab("tracker"), btnBg: "linear-gradient(135deg,#059669,#10b981)", btn: "Tracker" },
              { done: false, icon: "🏷️", label: "Tag patterns + write notes" },
            ].map((it, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 13px", background: it.done ? "#f0fdf4" : dark ? T.rowAlt : "#f8fafc", border: "1.5px solid " + (it.done ? "#86efac" : T.cardBorder), borderRadius: 10, marginBottom: 7 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 18 }}>{it.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, textDecoration: it.done ? "line-through" : "none", color: it.done ? "#16a34a" : T.text }}>{it.label}</span>
                </div>
                {it.action && <button onClick={it.action} className="hbtn" style={{ background: it.btnBg, color: "white", border: "none", borderRadius: 7, padding: "5px 14px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>{it.btn}</button>}
              </div>
            ))}
          </Card>

          {daysMissed >= 2 && (
            <Card bg="#f0f9ff" border="#60a5fa">
              <SH color="#1d4ed8">🔄 Recovery Plan — {daysMissed} days missed</SH>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {[{ day: "Today", task: "Clear ALL overdue revisions", icon: "🔁", c: "#f59e0b" }, { day: "Tomorrow", task: "Solve 1 new + revise due", icon: "💻", c: "#059669" }, { day: "Day 3", task: "Full schedule resumes", icon: "✅", c: "#4f46e5" }].map((d, i) => (
                  <div key={i} style={{ background: dark ? T.cardBg : "white", border: "1.5px solid " + d.c + "44", borderRadius: 10, padding: "12px" }}>
                    <div style={{ fontSize: 20, marginBottom: 5 }}>{d.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 12, color: d.c, marginBottom: 4 }}>{d.day}</div>
                    <div style={{ fontSize: 11, color: T.subtext, lineHeight: 1.5 }}>{d.task}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* RIGHT */}
        <div>
          {upcoming.length > 0 && (
            <Card bg="white" border="#e5e7eb">
              <SH>⏳ Coming Up (1–3 days)</SH>
              {upcoming.slice(0, 6).map((p, i) => {
                const rm = REV_META[p.revStage] || REV_META[0];
                return (
                  <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < upcoming.length - 1 ? "1px solid " + T.cardBorder : "none" }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ width: 9, height: 9, borderRadius: 2, background: rm.dot, flexShrink: 0 }} />
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</span>
                      <Pill label={rm.label} bg={rm.bg} border={rm.border} text={rm.text} sm />
                    </div>
                    <span style={{ fontSize: 11, color: "#d97706", fontWeight: 700, background: "#fffbeb", padding: "2px 8px", borderRadius: 5, border: "1px solid #fcd34d", whiteSpace: "nowrap" }}>{getNR(p)}</span>
                  </div>
                );
              })}
            </Card>
          )}

          {bookmarked.length > 0 && (
            <Card bg="#fffbeb" border="#fcd34d">
              <SH>⭐ Bookmarked</SH>
              {bookmarked.slice(0, 5).map((p, i) => {
                const ct = TCd(p.topic);
                return (
                  <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 10px", background: i % 2 === 0 ? dark ? T.rowAlt : "#fef9c3" : "transparent", borderRadius: 8, marginBottom: 4 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span>⭐</span>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>
                        {p.link ? <a href={p.link} target="_blank" rel="noreferrer" style={{ color: ct.pill, textDecoration: "none" }}>{p.name} ↗</a> : p.name}
                      </span>
                    </div>
                    <button onClick={() => toggleBM(p.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#d97706", fontWeight: 700, fontSize: 13 }}>✕</button>
                  </div>
                );
              })}
            </Card>
          )}

          {weakTopics.length > 0 && (
            <Card bg="#fff1f2" border="#fda4af">
              <SH color="#9f1239">⚠️ Weak Topics</SH>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {weakTopics.map((t, i) => <Pill key={i} label={"⚠️ " + t} bg="#fee2e2" border="#fca5a5" text="#9f1239" />)}
              </div>
            </Card>
          )}

          <Card bg={dark ? "#1a1f2e" : "#fef9c3"} border={dark ? "#78350f" : "#fde047"}>
            <SH color="#92400e" size={14}>📋 This Week</SH>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
              {[{ l: "Solved", v: solvedThisWeek, c: "#059669" }, { l: "Actions", v: weekRevisions, c: "#7c3aed" }, { l: "Streak", v: "🔥 " + streak.count, c: "#dc2626" }, { l: "Time", v: fmtHours(weekSeconds) || "0m", c: "#0891b2" }].map((s, i) => (
                <div key={i} style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)", borderRadius: 9, padding: "10px 12px" }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: s.c }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: T.subtext, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  /* ─── REVISION TAB ─── */
  const RevisionTab = () => (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 18 }}>
        {REV_META.map((r, i) => (
          <div key={i} style={{ background: dark ? T.cardBg : r.bg, border: "2px solid " + (dark ? r.dot + "44" : r.border), borderRadius: 13, padding: "14px 16px" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: r.dot }}>{r.label}</div>
            <div style={{ fontSize: 11, color: dark ? T.subtext : r.text, marginTop: 4, lineHeight: 1.5 }}>{r.desc}</div>
            <div style={{ marginTop: 8, background: r.bar, borderRadius: 99, height: 3 }} />
            <div style={{ fontSize: 14, fontWeight: 700, color: r.dot, marginTop: 8 }}>+{r.xp} XP</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, marginBottom: 18 }}>
        <Card bg="white" border="#e5e7eb">
          <SH>📆 7-Day Calendar</SH>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6 }}>
            {calDays.map((day, i) => {
              const isT = day.date === today, has = day.items.length > 0;
              return (
                <div key={i} style={{ textAlign: "center", padding: "10px 4px", borderRadius: 11, border: "2px solid " + (isT ? "#4f46e5" : has ? "#fbbf24" : dark ? T.cardBorder : "#e5e7eb"), background: isT ? dark ? "#1e1b4b" : "#eef2ff" : has ? dark ? "#2d2b00" : "#fffbeb" : dark ? T.rowAlt : "#f9fafb", cursor: has ? "pointer" : "default", transition: "all 0.2s" }} onClick={() => has && setCalHover(calHover === day.date ? null : day.date)}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: isT ? "#4f46e5" : T.subtext }}>{day.dayName}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: isT ? "#4f46e5" : T.text, marginTop: 3 }}>{day.date.slice(8)}</div>
                  {has  && <div style={{ marginTop: 5, background: "linear-gradient(135deg,#f59e0b,#fbbf24)", color: "white", borderRadius: 99, fontSize: 11, fontWeight: 700, padding: "1px 0" }}>{day.items.length}</div>}
                  {!has && <div style={{ marginTop: 5, fontSize: 10, color: T.subtext, opacity: 0.4 }}>—</div>}
                </div>
              );
            })}
          </div>
          {calHover && calHoverDay && calHoverDay.items.length > 0 && (
            <div style={{ marginTop: 12, background: dark ? T.rowAlt : "#fffbeb", border: "1.5px solid #fcd34d", borderRadius: 9, padding: "10px 14px", animation: "pop 0.2s ease" }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: "#92400e", marginBottom: 8 }}>Due on {calHover}:</div>
              {calHoverDay.items.map((p, i) => {
                const rm = REV_META[p.revStage] || REV_META[0], ct = TCd(p.topic);
                return (
                  <div key={i} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 5 }}>
                    <Pill label={rm.label} bg={rm.bg} border={rm.border} text={rm.text} sm />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</span>
                    {p.topic && <Pill label={p.topic} bg={ct.bg} border={ct.border} text={ct.text} sm />}
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card bg={dark ? "#1a1f2e" : "#eff6ff"} border={dark ? "#1e3a5f" : "#bfdbfe"}>
          <SH color="#1d4ed8">Session Stats</SH>
          <div style={{ display: "grid", gap: 10 }}>
            {[{ l: "Due today", v: due.length, c: due.length > 0 ? "#dc2626" : "#059669" }, { l: "Overdue", v: overdueCount, c: overdueCount > 0 ? "#ef4444" : "#059669" }, { l: "Mastered", v: mastered.length, c: "#eab308" }, { l: "This week", v: solvedThisWeek, c: "#4f46e5" }].map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px", background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)", borderRadius: 9 }}>
                <span style={{ fontSize: 13, color: T.subtext }}>{s.l}</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: s.c }}>{s.v}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {due.length === 0 ? (
        <Card bg="linear-gradient(135deg,#f0fdf4,#dcfce7)" border="#86efac" style={{ textAlign: "center", padding: 48 }}>
          <div style={{ fontSize: 56, marginBottom: 14 }}>🎉</div>
          <div style={{ fontWeight: 700, fontSize: 18, color: "#15803d" }}>All caught up!</div>
          <div style={{ fontSize: 14, color: "#16a34a", marginTop: 6 }}>Go solve new problems!</div>
        </Card>
      ) : (
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#991b1b", marginBottom: 14, display: "flex", alignItems: "center", gap: 8, background: dark ? "#2d1515" : "#fef2f2", padding: "12px 16px", borderRadius: 11, border: "1.5px solid " + (dark ? "#7f1d1d" : "#fca5a5") }}>
            <span style={{ animation: "glow 1.5s infinite" }}>🔴</span>
            Due today — {due.length} problem{due.length > 1 ? "s" : ""}
            <span style={{ marginLeft: "auto", fontSize: 12, color: dark ? "#fca5a5" : "#dc2626", fontWeight: 600 }}>Clear before 9am</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {due.map((p) => {
              const rm = REV_META[p.revStage] || REV_META[0], ct = TCd(p.topic);
              return (
                <div key={p.id} style={{ background: dark ? T.cardBg : rm.bg, border: "2px solid " + (dark ? rm.dot + "44" : rm.border), borderRadius: 14, padding: 18, animation: "pop 0.3s ease" }}>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
                    {p.topic && <Pill label={p.topic} bg={ct.bg} border={ct.border} text={ct.text} />}
                    <Pill label={rm.label} bg={rm.bg} border={rm.border} text={rm.text} />
                    {getNR(p) < today && <Pill label="Overdue" bg="#fee2e2" border="#fca5a5" text="#991b1b" />}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>
                    {p.link ? <a href={p.link} target="_blank" rel="noreferrer" style={{ color: rm.dot, textDecoration: "none" }}>{p.name} ↗</a> : p.name}
                  </div>
                  {(p.pattern || []).length > 0 && <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 6 }}>{p.pattern.map((pt) => <Pill key={pt} label={pt} bg="#f5f3ff" border="#c4b5fd" text="#5b21b6" sm />)}</div>}
                  {p.note && <div style={{ fontSize: 12, color: dark ? T.subtext : rm.text, marginTop: 6, background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.65)", padding: "8px 12px", borderRadius: 8, borderLeft: "3px solid " + rm.dot, lineHeight: 1.6 }}>📝 {p.note}</div>}
                  {p.codeSnippet && <div className="mono" style={{ marginTop: 8, background: "#1e293b", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#a78bfa", borderLeft: "3px solid " + rm.dot, whiteSpace: "pre-wrap", overflowX: "auto" }}>💻 {p.codeSnippet}</div>}
                  <div style={{ fontSize: 12, fontWeight: 700, color: rm.dot, marginTop: 8, marginBottom: 6 }}>Goal: {rm.desc}</div>
                  {/* Revision time history */}
                  {(p.revHistory || []).length > 0 && (
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}>
                      {(p.revHistory || []).slice(-4).map((h, i) => (
                        <span key={i} style={{ fontSize: 10, background: h.result === "easy" ? dark ? "#14281f" : "#d1fae5" : dark ? "#2d1515" : "#fee2e2", color: h.result === "easy" ? "#059669" : "#dc2626", borderRadius: 5, padding: "2px 7px", fontWeight: 600, border: "1px solid " + (h.result === "easy" ? "#86efac" : "#fca5a5") }}>
                          R{h.stage} · {h.seconds >= 60 ? Math.floor(h.seconds / 60) + "m" : h.seconds + "s"}
                        </span>
                      ))}
                      <span style={{ fontSize: 10, color: T.subtext, alignSelf: "center" }}>
                        · avg {Math.round((p.revHistory || []).reduce((a, h) => a + h.seconds, 0) / (p.revHistory || []).length)}s
                      </span>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 3, marginBottom: 6 }}>
                    {REV_META.map((_, i) => <div key={i} style={{ flex: 1, height: 5, borderRadius: 99, background: i < p.revStage ? "#10b981" : i === p.revStage ? rm.dot : dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }} />)}
                  </div>
                  <div style={{ fontSize: 11, color: T.subtext, marginBottom: 12 }}>Stage {p.revStage + 1}/4</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => markRev(p.id, "easy")} className="hbtn" style={{ flex: 1, background: "linear-gradient(135deg,#059669,#10b981)", color: "white", border: "none", borderRadius: 10, padding: "10px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>😊 Easy</button>
                    <button onClick={() => markRev(p.id, "hard")} className="hbtn" style={{ flex: 1, background: "linear-gradient(135deg,#dc2626,#ef4444)", color: "white", border: "none", borderRadius: 10, padding: "10px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>😰 Hard</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  /* ─── TRACKER TAB ─── */
  const TrackerTab = () => (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        {(() => {
          const linked = linkedProblemId ? problems.find((p) => p.id === linkedProblemId) : null;
          return (
            <Card bg={timerRunning ? dark ? "#1a0a00" : "#fff7ed" : dark ? T.cardBg : "white"} border={timerRunning ? "#f97316" : linked ? "#4f46e5" : T.cardBorder}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                    Solve Timer
                    <span style={{ fontSize: 11, fontWeight: 400, color: T.subtext }}>— aim 15–20 mins</span>
                  </div>
                  {/* #3 Linked problem badge */}
                  {linked ? (
                    <div style={{ fontSize: 11, background: dark ? "#1e293b" : "#eff6ff", border: "1px solid " + (dark ? "#4f46e544" : "#bfdbfe"), borderRadius: 7, padding: "3px 10px", marginBottom: 6, color: dark ? "#a78bfa" : "#4f46e5", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }}>
                      ⏱ Linked: {linked.name}
                      <button onClick={() => setLinkedProblemId(null)} style={{ background: "none", border: "none", cursor: "pointer", color: T.subtext, fontSize: 11, padding: 0, lineHeight: 1 }}>✕</button>
                    </div>
                  ) : (
                    <div style={{ fontSize: 11, color: T.subtext, marginBottom: 6 }}>Click ⏱ on a problem below to link it</div>
                  )}
                  <div className="mono" style={{ fontSize: 44, fontWeight: 600, color: timerSec > timerTarget ? "#ef4444" : timerSec > timerTarget * 0.75 ? "#f97316" : "#4f46e5", letterSpacing: 5 }}>{fmtTime(timerSec)}</div>
                  {timerSec > 0 && <div style={{ marginTop: 6, background: dark ? T.mutedBg : "#e0e7ff", borderRadius: 99, height: 5, overflow: "hidden" }}><div style={{ background: timerSec > timerTarget ? "linear-gradient(90deg,#ef4444,#f87171)" : "linear-gradient(90deg,#4f46e5,#7c3aed)", height: 5, borderRadius: 99, width: Math.min(timerSec / timerTarget * 100, 100) + "%", transition: "width 1s linear" }} /></div>}
                  {timerSec > timerTarget && <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 700, marginTop: 4, animation: "glow 1.5s infinite" }}>Over 20 mins — take a hint!</div>}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <button onClick={() => setTimerRunning((r) => !r)} className="hbtn" style={{ background: timerRunning ? "linear-gradient(135deg,#dc2626,#ef4444)" : "linear-gradient(135deg,#059669,#10b981)", color: "white", border: "none", borderRadius: 9, padding: "10px 18px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>{timerRunning ? "Pause" : "Start"}</button>
                  <button onClick={() => {
                    saveTimerSession();
                    // #3 If a problem is linked, save this session's time to it
                    if (linkedProblemId && timerSecRef.current >= 30) {
                      const sec = timerSecRef.current;
                      setProblems((prev) => prev.map((p) => p.id !== linkedProblemId ? p : {
                        ...p,
                        solveSessions: [...(p.solveSessions || []), { date: today, seconds: sec }]
                      }));
                      showToast('⏱ ' + fmtTime(sec) + ' saved to "' + (problems.find((p) => p.id === linkedProblemId)?.name || '') + '"', "#eff6ff", "#bfdbfe");
                      setLinkedProblemId(null);
                    }
                    setTimerRunning(false); setTimerSec(0); timerSecRef.current = 0;
                  }} style={{ background: T.mutedBg, color: T.subtext, border: "1px solid " + T.cardBorder, borderRadius: 9, padding: "10px 18px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>Save & Reset</button>
                </div>
              </div>
            </Card>
          );
        })()}

        <Card bg="white" border="#e5e7eb">
          <SH>Progress Overview</SH>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#4f46e5" }}>Solved</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#4f46e5" }}>{solved.length} / {problems.length} ({sPct}%)</span>
          </div>
          <div style={{ background: dark ? T.mutedBg : "#eff6ff", borderRadius: 99, height: 12, marginBottom: 12 }}>
            <div style={{ background: "linear-gradient(90deg,#4f46e5,#7c3aed)", height: 12, borderRadius: 99, width: sPct + "%", transition: "width 0.6s" }} />
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: T.subtext }}>🔁 {due.length} due</span>
            <span style={{ fontSize: 11, color: T.subtext }}>⭐ {bookmarked.length} starred</span>
            <span style={{ marginLeft: "auto", fontSize: 12, color: "#7c3aed", fontWeight: 700, background: dark ? T.mutedBg : "#f5f3ff", padding: "2px 10px", borderRadius: 8, border: "1px solid " + (dark ? "#a78bfa44" : "#c4b5fd") }}>👑 {mastered.length} mastered → see Stats</span>
          </div>
        </Card>
      </div>

      <Card bg="white" border="#e5e7eb" style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Search problems..." style={{ flex: 1, minWidth: 200, padding: "9px 14px", borderRadius: 9, border: "1.5px solid " + T.inputBorder, fontSize: 13, background: T.inputBg, color: T.text }} />
          <select value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)} style={{ padding: "9px 12px", borderRadius: 9, border: "1.5px solid " + T.inputBorder, fontSize: 12, background: T.inputBg, color: T.text }}>
            <option value="">All topics</option>
            {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={patternFilter} onChange={(e) => setPatternFilter(e.target.value)} style={{ padding: "9px 12px", borderRadius: 9, border: "1.5px solid " + T.inputBorder, fontSize: 12, background: T.inputBg, color: T.text }}>
            <option value="">All patterns</option>
            {PATTERNS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <button onClick={openAdd} className="hbtn" style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "white", border: "none", borderRadius: 9, padding: "9px 20px", cursor: "pointer", fontSize: 13, fontWeight: 700, boxShadow: "0 4px 14px rgba(79,70,229,0.35)", whiteSpace: "nowrap" }}>+ Add Problem</button>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap", alignItems: "center" }}>
          {[{ f: "All", bg: "#eff6ff", border: "#bfdbfe", tc: "#1d4ed8" }, { f: "Unsolved", bg: "#fef2f2", border: "#fca5a5", tc: "#dc2626" }, { f: "Solved", bg: "#ecfdf5", border: "#86efac", tc: "#16a34a" }, { f: "Mastered", bg: "#fef9c3", border: "#fde047", tc: "#ca8a04" }, { f: "Starred", bg: "#fffbeb", border: "#fcd34d", tc: "#d97706" }].map(({ f, bg, border, tc }) => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "5px 14px", borderRadius: 99, border: "1.5px solid " + (filter === f ? border : T.chipBorder), cursor: "pointer", fontSize: 12, fontWeight: 700, background: filter === f ? bg : T.chipBg, color: filter === f ? tc : T.subtext }}>{f}</button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: T.subtext }}>{filtered.length} problem{filtered.length !== 1 ? "s" : ""}</span>
            <div style={{ display: "flex", border: "1.5px solid " + T.chipBorder, borderRadius: 9, overflow: "hidden" }}>
              {[{ v: "flat", label: "≡ Flat" }, { v: "grouped", label: "⊞ Grouped" }].map(({ v, label }) => (
                <button key={v} onClick={() => setTrackerView(v)} style={{ padding: "5px 12px", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, background: trackerView === v ? "linear-gradient(135deg,#4f46e5,#7c3aed)" : T.chipBg, color: trackerView === v ? "white" : T.subtext }}>{label}</button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {filtered.length === 0 && (
        <Card bg="#f5f3ff" border="#c4b5fd" style={{ textAlign: "center", padding: 48 }}>
          {problems.length === 0 ? (
            <div><div style={{ fontSize: 44, marginBottom: 12 }}>🎯</div><div style={{ fontWeight: 700, fontSize: 16 }}>No problems yet!</div><div style={{ fontSize: 13, color: T.subtext, marginTop: 6 }}>Click "+ Add Problem" to start your journey</div></div>
          ) : <div style={{ color: T.subtext, fontSize: 14 }}>No problems match the current filters.</div>}
        </Card>
      )}

      {/* GROUPED VIEW */}
      {trackerView === "grouped" && filtered.length > 0 && (() => {
        const grouped = {};
        filtered.forEach((p) => {
          const sec = p.section || "Unsorted";
          const sub = p.subSection || "General";
          if (!grouped[sec]) grouped[sec] = {};
          if (!grouped[sec][sub]) grouped[sec][sub] = [];
          grouped[sec][sub].push(p);
        });
        return Object.entries(grouped).map(([sec, subSecs]) => {
          const secOpen = !collapsedSections[sec];
          const totalInSec = Object.values(subSecs).flat().length;
          const solvedInSec = Object.values(subSecs).flat().filter(p => p.status !== "Unsolved").length;
          const solvedPct = totalInSec ? Math.round(solvedInSec / totalInSec * 100) : 0;
          return (
            <div key={sec} style={{ marginBottom: 14, borderRadius: 12, overflow: "hidden", border: "1.5px solid " + (dark ? "#2d2d4e" : "#e0e7ff"), boxShadow: "0 2px 8px rgba(79,70,229,0.08)" }}>
              {/* Section header */}
              <div onClick={() => toggleSection(sec)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: dark ? "#1e1b4b" : "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "white", cursor: "pointer", userSelect: "none" }}>
                <span style={{ fontSize: 13, transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)", display: "inline-block", transform: secOpen ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
                <span style={{ fontSize: 15 }}>📂</span>
                <span style={{ fontWeight: 700, fontSize: 14, flex: 1 }}>{sec}</span>
                {/* Mini progress bar */}
                <div style={{ width: 60, height: 5, background: "rgba(255,255,255,0.2)", borderRadius: 99, overflow: "hidden", marginRight: 6 }}>
                  <div style={{ height: 5, width: solvedPct + "%", background: "rgba(255,255,255,0.85)", borderRadius: 99, transition: "width 0.5s" }} />
                </div>
                <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 99, padding: "2px 10px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>{solvedInSec}/{totalInSec}</span>
              </div>
              {/* Animated section body */}
              <div className={"collapsible" + (secOpen ? " open" : "")}>
                <div className="collapsible-inner">
                  {Object.entries(subSecs).map(([sub, probs]) => {
                    const subKey = sec + "|" + sub;
                    const subOpen = !collapsedSubSecs[subKey];
                    const solvedInSub = probs.filter(p => p.status !== "Unsolved").length;
                    const masteredInSub = probs.filter(p => p.revStage >= 4).length;
                    const subPct = probs.length ? Math.round(solvedInSub / probs.length * 100) : 0;
                    return (
                      <div key={sub} style={{ borderTop: "1px solid " + (dark ? "#2d2d4e" : "#c7d2fe") }}>
                        {/* Sub-section header */}
                        <div onClick={() => toggleSubSec(subKey)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", background: dark ? "#1a1a2e" : "#eef2ff", cursor: "pointer", userSelect: "none" }}>
                          <span style={{ fontSize: 11, transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)", display: "inline-block", transform: subOpen ? "rotate(90deg)" : "rotate(0deg)", color: dark ? "#a78bfa" : "#4f46e5" }}>▶</span>
                          <span style={{ fontSize: 13 }}>📄</span>
                          <span style={{ fontWeight: 700, fontSize: 12, color: dark ? "#a78bfa" : "#4f46e5", flex: 1 }}>{sub}</span>
                          {masteredInSub > 0 && <span style={{ fontSize: 10, background: dark ? "#14281f" : "#d1fae5", color: "#059669", borderRadius: 5, padding: "1px 7px", fontWeight: 700, marginRight: 6 }}>👑 {masteredInSub}</span>}
                          {/* Mini progress bar */}
                          <div style={{ width: 44, height: 4, background: dark ? "#2d2d4e" : "#c7d2fe", borderRadius: 99, overflow: "hidden", marginRight: 6 }}>
                            <div style={{ height: 4, width: subPct + "%", background: "linear-gradient(90deg,#4f46e5,#7c3aed)", borderRadius: 99, transition: "width 0.5s" }} />
                          </div>
                          <span style={{ fontSize: 11, color: dark ? "#a78bfa" : "#6366f1", fontWeight: 600, whiteSpace: "nowrap" }}>{solvedInSub}/{probs.length}</span>
                        </div>
                        {/* Animated subsection body */}
                        <div className={"collapsible" + (subOpen ? " open" : "")}>
                          <div className="collapsible-inner" style={{ padding: "8px 12px", background: dark ? T.cardBg : "white" }}>
                            {probs.map((p) => {
                              const rm = REV_META[p.revStage] || REV_META[0], ct = TCd(p.topic);
                              return (
                                <div key={p.id} className="prow" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: 9, marginBottom: 5, background: p.revStage >= 4 ? dark ? "#14281f" : "#f0fdf4" : dark ? T.rowAlt : "#f9fafb", border: "1px solid " + (p.revStage >= 4 ? "#86efac" : p.bookmarked ? "#fbbf24" : T.cardBorder) }}>
                                  <div style={{ flex: 1, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                                    {p.bookmarked && <span style={{ fontSize: 12 }}>⭐</span>}
                                    <span style={{ fontWeight: 700, fontSize: 13 }}>
                                      {p.link ? <a href={p.link} target="_blank" rel="noreferrer" style={{ color: p.topic ? TCd(p.topic).pill : "#4f46e5", textDecoration: "none" }}>{p.name} ↗</a> : p.name}
                                    </span>
                                    {p.topic && <Pill label={p.topic} bg={ct.bg} border={ct.border} text={ct.text} sm />}
                                    {p.difficulty && <Pill label={p.difficulty} bg={p.difficulty === "Hard" ? "#fef2f2" : p.difficulty === "Medium" ? "#fffbeb" : "#f0fdf4"} border={p.difficulty === "Hard" ? "#fca5a5" : p.difficulty === "Medium" ? "#fcd34d" : "#86efac"} text={p.difficulty === "Hard" ? "#991b1b" : p.difficulty === "Medium" ? "#92400e" : "#166534"} sm />}
                                    {p.revStage >= 4 && <Pill label="👑 Mastered" bg="#d1fae5" border="#34d399" text="#065f46" sm />}
                                    {p.status !== "Unsolved" && p.revStage < 4 && <Pill label={"Rev " + p.revStage + "/4"} bg={rm.bg} border={rm.border} text={rm.text} sm />}
                                    {p.status === "Unsolved" && <Pill label="Unsolved" bg="#f8fafc" border="#cbd5e1" text="#64748b" sm />}
                                  </div>
                                  <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                                    {p.status === "Unsolved" && <button onClick={() => markSolved(p.id)} className="hbtn" style={{ background: "linear-gradient(135deg,#059669,#10b981)", color: "white", border: "none", borderRadius: 7, padding: "5px 11px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>✓</button>}
                                    <button onClick={() => toggleBM(p.id)} style={{ background: p.bookmarked ? "#fffbeb" : T.chipBg, color: p.bookmarked ? "#d97706" : T.subtext, border: "1.5px solid " + (p.bookmarked ? "#fcd34d" : T.chipBorder), borderRadius: 7, padding: "5px 8px", cursor: "pointer", fontSize: 12 }}>⭐</button>
                                    <button onClick={() => openEdit(p)} style={{ background: "#f0f9ff", color: "#0369a1", border: "1.5px solid #bae6fd", borderRadius: 7, padding: "5px 8px", cursor: "pointer", fontSize: 12 }}>✏️</button>
                                    <button onClick={() => delP(p.id)} style={{ background: "#fef2f2", color: "#dc2626", border: "1.5px solid #fca5a5", borderRadius: 7, padding: "5px 8px", cursor: "pointer", fontSize: 12 }}>🗑</button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        });
      })()}

      {/* FLAT VIEW */}
      {trackerView === "flat" && filtered.map((p) => {
        const rm = REV_META[p.revStage] || REV_META[0], ct = TCd(p.topic);
        const rowBg = p.revStage >= 4 ? dark ? "#14281f" : "#f0fdf4" : p.status === "Unsolved" ? T.cardBg : dark ? T.rowAlt : rm.bg;
        const rowBd = p.revStage >= 4 ? "#86efac" : p.bookmarked ? "#fbbf24" : p.status === "Unsolved" ? T.cardBorder : dark ? rm.dot + "44" : rm.border;
        return (
          <div key={p.id} className="prow" style={{ background: rowBg, border: "1.5px solid " + rowBd, borderRadius: 12, padding: "14px 18px", marginBottom: 8 }}>
            {/* Section breadcrumb */}
            {(p.section || p.subSection) && (
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: T.subtext, marginBottom: 7, paddingBottom: 7, borderBottom: "1px solid " + T.cardBorder }}>
                <span style={{ fontSize: 11 }}>📂</span>
                <span style={{ color: "#4f46e5", fontWeight: 700 }}>{p.section || "—"}</span>
                <span style={{ opacity: 0.4 }}>›</span>
                <span style={{ color: "#7c3aed", fontWeight: 600 }}>{p.subSection || "—"}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center", marginBottom: 6 }}>
                  {p.bookmarked && <span style={{ fontSize: 14 }}>⭐</span>}
                  {p.topic      && <Pill label={p.topic} bg={ct.bg} border={ct.border} text={ct.text} />}
                  {p.difficulty && <Pill label={p.difficulty} bg={p.difficulty === "Hard" ? "#fef2f2" : p.difficulty === "Medium" ? "#fffbeb" : "#f0fdf4"} border={p.difficulty === "Hard" ? "#fca5a5" : p.difficulty === "Medium" ? "#fcd34d" : "#86efac"} text={p.difficulty === "Hard" ? "#991b1b" : p.difficulty === "Medium" ? "#92400e" : "#166534"} />}
                  {p.revStage >= 4            && <Pill label="Mastered" bg="#d1fae5" border="#34d399" text="#065f46" />}
                  {p.status !== "Unsolved" && p.revStage < 4 && <Pill label={"Rev " + p.revStage + "/4"} bg={rm.bg} border={rm.border} text={rm.text} />}
                  {p.status === "Unsolved"    && <Pill label="Unsolved" bg="#f8fafc" border="#cbd5e1" text="#64748b" />}
                </div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>
                  {p.link ? <a href={p.link} target="_blank" rel="noreferrer" style={{ color: p.topic ? TCd(p.topic).pill : "#4f46e5", textDecoration: "none" }}>{p.name} ↗</a> : p.name}
                </div>
                {(p.pattern || []).length > 0 && <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 5 }}>{p.pattern.map((pt) => <Pill key={pt} label={pt} bg="#f5f3ff" border="#c4b5fd" text="#5b21b6" sm />)}</div>}
                {p.note && <div style={{ fontSize: 12, color: T.subtext, marginTop: 5, borderLeft: "3px solid " + (dark ? "#334155" : "#e5e7eb"), paddingLeft: 9, lineHeight: 1.5 }}>📝 {p.note}</div>}
                {p.codeSnippet && <div className="mono" style={{ marginTop: 6, background: "#1e293b", borderRadius: 8, padding: "8px 12px", fontSize: 11, color: "#a78bfa", whiteSpace: "pre-wrap", overflowX: "auto" }}>💻 {p.codeSnippet}</div>}
                {p.status !== "Unsolved" && p.revStage < 4 && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: "flex", gap: 3, marginBottom: 3 }}>{REV_META.map((_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: i < p.revStage ? "#10b981" : i === p.revStage ? rm.dot : dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }} />)}</div>
                    <div style={{ fontSize: 11, color: T.subtext }}>Next: {rm.desc} · {getNR(p)}</div>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                {p.status === "Unsolved" && <button onClick={() => markSolved(p.id)} className="hbtn" style={{ background: "linear-gradient(135deg,#059669,#10b981)", color: "white", border: "none", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>✓ Solve</button>}
                {/* #3 Link problem to timer */}
                <button
                  onClick={() => {
                    if (linkedProblemId === p.id) { setLinkedProblemId(null); }
                    else { setLinkedProblemId(p.id); setTimerRunning(false); setTimerSec(0); timerSecRef.current = 0; showToast('⏱ Timer linked to "' + p.name + '"', "#eff6ff", "#bfdbfe"); }
                  }}
                  title={linkedProblemId === p.id ? "Unlink timer" : "Link timer to this problem"}
                  style={{ background: linkedProblemId === p.id ? "#eff6ff" : T.chipBg, color: linkedProblemId === p.id ? "#4f46e5" : T.subtext, border: "1.5px solid " + (linkedProblemId === p.id ? "#4f46e5" : T.chipBorder), borderRadius: 8, padding: "7px 10px", cursor: "pointer", fontSize: 13, fontWeight: linkedProblemId === p.id ? 700 : 400 }}>
                  {linkedProblemId === p.id ? "⏱" : "⏱"}
                </button>
                <button onClick={() => toggleBM(p.id)} style={{ background: p.bookmarked ? "#fffbeb" : T.chipBg, color: p.bookmarked ? "#d97706" : T.subtext, border: "1.5px solid " + (p.bookmarked ? "#fcd34d" : T.chipBorder), borderRadius: 8, padding: "7px 10px", cursor: "pointer", fontSize: 13 }}>⭐</button>
                <button onClick={() => openEdit(p)} style={{ background: "#f0f9ff", color: "#0369a1", border: "1.5px solid #bae6fd", borderRadius: 8, padding: "7px 10px", cursor: "pointer", fontSize: 13 }}>✏️</button>
                <button onClick={() => delP(p.id)} style={{ background: "#fef2f2", color: "#dc2626", border: "1.5px solid #fca5a5", borderRadius: 8, padding: "7px 10px", cursor: "pointer", fontSize: 13 }}>🗑</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  /* ─── NOTES TAB ─── */
  const NotesTab = () => (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 18, height: "calc(100vh - 140px)" }}>
      <div style={{ background: T.cardBg, border: "1.5px solid " + T.cardBorder, borderRadius: 14, padding: "14px 12px", overflowY: "auto" }}>
        <SH size={13}>Topics</SH>
        {TOPICS.map((t) => {
          const ct = TCd(t), has = topicNotes[t] && topicNotes[t].trim().length > 0;
          return (
            <button key={t} onClick={() => setNotesTopic(t)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: 9, border: "1.5px solid " + (notesTopic === t ? ct.pill : T.chipBorder), cursor: "pointer", fontSize: 12, fontWeight: 600, background: notesTopic === t ? ct.bg : T.chipBg, color: notesTopic === t ? ct.text : T.subtext, marginBottom: 5, transition: "all 0.15s", textAlign: "left" }}>
              <span>{t}</span>
              {has && <span style={{ width: 6, height: 6, borderRadius: "50%", background: ct.pill, display: "inline-block", flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ background: T.cardBg, border: "1.5px solid " + T.cardBorder, borderRadius: 14, padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: notesCt.pill }}>{notesTopic}</div>
            <div style={{ display: "flex", gap: 16, fontSize: 12, color: T.subtext }}>
              <span>{solved.filter((p) => p.topic === notesTopic).length}/{problems.filter((p) => p.topic === notesTopic).length} solved</span>
              <span>{(topicNotes[notesTopic] || "").length} chars</span>
              <span style={{ color: "#16a34a", fontWeight: 600 }}>✓ Auto-saved</span>
            </div>
          </div>
          <textarea
            value={topicNotes[notesTopic] || ""}
            onChange={(e) => setTopicNotes((prev) => ({ ...prev, [notesTopic]: e.target.value }))}
            placeholder={"Notes for " + notesTopic + "...\n\n- Key pattern\n- Time complexity / Space complexity\n- Common gotchas\n- Memory tricks\n- Template code"}
            style={{ flex: 1, padding: "14px 16px", borderRadius: 11, border: "1.5px solid " + notesCt.border, fontSize: 14, resize: "none", background: dark ? T.inputBg : notesCt.bg, color: notesCt.text, lineHeight: 1.8, fontFamily: "system-ui, sans-serif" }}
          />
        </div>
      </div>
    </div>
  );

  /* ─── STATS TAB ─── */
  const StatsTab = () => (
    <div>
      <div style={{ background: "linear-gradient(135deg,#0f0c29,#312e81)", borderRadius: 18, padding: "22px 28px", marginBottom: 18, color: "white", display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ fontSize: 56, animation: "float 3s ease-in-out infinite" }}>{level.emoji}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 24, background: level.bar, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: -0.5 }}>{level.name}</div>
          <div style={{ fontSize: 13, opacity: 0.55, marginTop: 3 }}>{solved.length} solved · {xp} XP · {mastered.length} mastered</div>
          <div style={{ marginTop: 10, background: "rgba(255,255,255,0.12)", borderRadius: 99, height: 9 }}>
            <div style={{ background: level.bar, height: 9, borderRadius: 99, width: lvlPct + "%", transition: "width 0.7s" }} />
          </div>
          {nextLvl && <div style={{ fontSize: 11, opacity: 0.45, marginTop: 4 }}>{nextLvl.min - solved.length} more problems to {nextLvl.name}</div>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
          {[{ l: "Streak", v: "🔥 " + streak.count }, { l: "XP", v: xp }, { l: "Solved", v: solved.length }, { l: "Mastered", v: mastered.length }].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{s.v}</div>
              <div style={{ fontSize: 10, opacity: 0.5, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <Card bg={dark ? "#1a1f2e" : "#eff6ff"} border={dark ? "#1e3a5f" : "#bfdbfe"}>
          <SH color="#1d4ed8">Time Invested</SH>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 9, marginBottom: 10 }}>
            {[{ l: "This week", v: weekSeconds, c: "#4f46e5" }, { l: "This month", v: monthSeconds, c: "#7c3aed" }, { l: "All time", v: totalSeconds, c: "#0891b2" }].map((s, i) => (
              <div key={i} style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)", borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: s.c }}>{fmtHours(s.v) || "0m"}</div>
                <div style={{ fontSize: 10, color: T.subtext, marginTop: 3, textTransform: "uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: T.subtext }}>{timerSessions.length} sessions{totalSeconds > 0 && timerSessions.length > 0 ? " · avg " + fmtHours(Math.round(totalSeconds / timerSessions.length)) + "/session" : ""}</div>
        </Card>

        <Card bg={dark ? "#1a1f2e" : "#fef9c3"} border={dark ? "#78350f" : "#fde047"}>
          <SH color="#92400e">Weekly Report Card</SH>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 10 }}>
            {[{ l: "Problems solved", v: solvedThisWeek, c: "#059669" }, { l: "Revisions done", v: weekRevisions, c: "#7c3aed" }, { l: "XP earned", v: "~" + (solvedThisWeek * 20 + weekRevisions * 8), c: "#d97706" }, { l: "Streak", v: "🔥 " + streak.count, c: "#dc2626" }].map((s, i) => (
              <div key={i} style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)", borderRadius: 9, padding: "10px 12px" }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: 11, color: T.subtext, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
          {bestTopicThisWeek && <div style={{ fontSize: 12, color: "#92400e", background: "rgba(255,255,255,0.5)", padding: "7px 11px", borderRadius: 7, fontWeight: 600 }}>Best topic this week: {bestTopicThisWeek}</div>}
          {solvedThisWeek >= 5 && <div style={{ fontSize: 12, color: "#15803d", background: "#d1fae5", padding: "7px 11px", borderRadius: 7, marginTop: 8, fontWeight: 600 }}>Weekly goal achieved!</div>}
        </Card>

        <Card bg="white" border="#e5e7eb">
          <SH>Peak Performance Hours</SH>
          {Object.keys(hourLog).length === 0 ? (
            <div style={{ fontSize: 13, color: T.subtext }}>No activity yet. Start using the timer!</div>
          ) : (
            <div>
              {peakLabel && <div style={{ fontSize: 13, color: "#4f46e5", fontWeight: 700, marginBottom: 12 }}>Peak: <span style={{ background: "#eff6ff", padding: "3px 10px", borderRadius: 5, border: "1px solid #bfdbfe" }}>{peakLabel} ({peakHour}:00)</span></div>}
              <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 70, marginBottom: 8 }}>
                {Array.from({ length: 24 }, (_, h) => {
                  const v = hourLog[h] || 0, pct = v ? Math.max(8, Math.round(v / maxHourCount * 100)) : 3, isP = h === peakHour;
                  return (<div key={h} style={{ flex: 1, background: isP ? "linear-gradient(180deg,#4f46e5,#7c3aed)" : v > 0 ? dark ? "#1e3a8a" : "#bfdbfe" : dark ? "#1e293b" : "#f1f5f9", borderRadius: "3px 3px 0 0", height: pct + "%", minHeight: 3 }} title={h + ":00 — " + v} />);
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.subtext }}><span>12am</span><span>6am</span><span>12pm</span><span>6pm</span><span>11pm</span></div>
            </div>
          )}
        </Card>

        <Card bg="white" border="#e5e7eb">
          <SH>Revision Quality Score</SH>
          <div style={{ fontSize: 12, color: T.subtext, marginBottom: 12 }}>Easy% per topic. Green=solid, Yellow=shaky, Red=drill more.</div>
          {TOPICS.filter((t) => revQuality[t]).length === 0 ? (
            <div style={{ fontSize: 13, color: T.subtext }}>No revisions yet!</div>
          ) : (
            TOPICS.filter((t) => revQuality[t]).map((t) => {
              const q = getQuality(t), ct = TCd(t), rq = revQuality[t];
              const color = q >= 70 ? "#059669" : q >= 40 ? "#d97706" : "#dc2626";
              const qbg   = q >= 70 ? "#d1fae5" : q >= 40 ? "#fef3c7" : "#fee2e2";
              return (
                <div key={t} style={{ marginBottom: 10, padding: "8px 12px", background: dark ? T.rowAlt : ct.bg, border: "1px solid " + ct.border, borderRadius: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: ct.text }}>{t}</span>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: T.subtext }}>{rq.easy}E / {rq.hard}H</span>
                      <span style={{ fontSize: 12, fontWeight: 700, background: qbg, color, padding: "2px 9px", borderRadius: 5 }}>{q}%</span>
                    </div>
                  </div>
                  <div style={{ background: dark ? T.mutedBg : "rgba(0,0,0,0.06)", borderRadius: 99, height: 5 }}>
                    <div style={{ background: q >= 70 ? "linear-gradient(90deg,#059669,#34d399)" : q >= 40 ? "linear-gradient(90deg,#d97706,#fbbf24)" : "linear-gradient(90deg,#dc2626,#f87171)", height: 5, borderRadius: 99, width: q + "%", transition: "width 0.5s" }} />
                  </div>
                </div>
              );
            })
          )}
        </Card>

        <Card bg="white" border="#e5e7eb">
          <SH>Mistake Patterns</SH>
          {mistakes.length === 0 ? (
            <div style={{ fontSize: 13, color: T.subtext }}>No mistakes logged yet. Hit Hard to track what went wrong.</div>
          ) : (
            <div>
              {topMistake && <div style={{ fontSize: 12, marginBottom: 12, background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 9, padding: "10px 14px", color: "#991b1b", fontWeight: 600 }}>Most common: {topMistake} — fix this first.</div>}
              {Object.entries(mistakeCounts).sort((a, b) => b[1] - a[1]).map(([type, count], i) => {
                const pct = Math.round(count / mistakes.length * 100);
                const colors = ["#ef4444","#f97316","#eab308","#8b5cf6","#3b82f6","#10b981","#ec4899","#06b6d4","#84cc16","#94a3b8"];
                return (
                  <div key={type} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                      <span style={{ fontWeight: 600 }}>{type}</span>
                      <span style={{ color: T.subtext }}>{count}x ({pct}%)</span>
                    </div>
                    <div style={{ background: dark ? T.mutedBg : "#f0f0f5", borderRadius: 99, height: 7 }}>
                      <div style={{ background: colors[i % colors.length], height: 7, borderRadius: 99, width: pct + "%", transition: "width 0.5s" }} />
                    </div>
                  </div>
                );
              })}
              <div style={{ fontSize: 11, color: T.subtext, marginTop: 8, borderTop: "1px solid " + T.cardBorder, paddingTop: 8 }}>{mistakes.length} total · {Object.keys(mistakeCounts).length} types</div>
            </div>
          )}
        </Card>

        <div style={{ gridColumn: "1 / -1", background: dark ? "#1a1a2e" : "#f5f3ff", border: "1.5px solid " + (dark ? "#2d2d4e" : "#c4b5fd"), borderRadius: 16, padding: "20px 24px", marginBottom: 14 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
            <div style={{ color: T.text, fontSize: 15, fontWeight: 700 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: dark ? "#a78bfa" : "#4f46e5" }}>{yearHeatTotalActions}</span>
              <span style={{ color: T.subtext, fontWeight: 400, marginLeft: 6, fontSize: 13 }}>activities in {heatYear}</span>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: T.subtext }}>Active days: <span style={{ color: dark ? "#a78bfa" : "#4f46e5", fontWeight: 700 }}>{activeDaysCount}</span></span>
              <span style={{ fontSize: 12, color: T.subtext }}>Max streak: <span style={{ color: dark ? "#a78bfa" : "#4f46e5", fontWeight: 700 }}>{maxStreakCount}</span></span>
              <span style={{ fontSize: 12, color: T.subtext }}>Current streak: <span style={{ color: dark ? "#a78bfa" : "#4f46e5", fontWeight: 700 }}>{streak.count}</span></span>
              <select value={heatYear} onChange={(e) => setHeatYear(Number(e.target.value))} style={{ padding: "4px 10px", borderRadius: 8, border: "1.5px solid " + (dark ? "#4f46e5" : "#c4b5fd"), fontSize: 12, background: dark ? "#0f172a" : "white", color: dark ? "#a78bfa" : "#4f46e5", fontWeight: 700, cursor: "pointer" }}>
                {availableYears.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* Proper month-separated heatmap */}
          {(() => {
            const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            // Theme-aware color levels: empty → lightest → light → medium → vivid
            const LEVELS_LIGHT = ["#ede9fe", "#c4b5fd", "#7c3aed", "#4f46e5"];
            const LEVELS_DARK  = ["#2d1b69", "#5b21b6", "#7c3aed", "#a78bfa"];
            const emptyBg      = dark ? "#1e1b4b" : "#f0eeff";
            const levels       = dark ? LEVELS_DARK : LEVELS_LIGHT;

            const getCellColor = (date) => {
              const v = activityLog[date] || 0;
              if (!v) return emptyBg;
              const ratio = v / maxAct;
              if (ratio < 0.25) return levels[0];
              if (ratio < 0.5)  return levels[1];
              if (ratio < 0.8)  return levels[2];
              return levels[3];
            };

            // Build 12 month blocks. Each block = weeks where that month has days.
            // A week runs Sun→Sat. We pad the first week with dots for days before the 1st,
            // and the last week with dots for days after the last day of month.
            const monthBlocks = Array.from({ length: 12 }, (_, m) => {
              const firstDay = new Date(heatYear, m, 1);
              const lastDay  = new Date(heatYear, m + 1, 0);
              const startDow = firstDay.getDay(); // 0=Sun
              const endDow   = lastDay.getDay();  // 0=Sun

              // Build full weeks including padding nulls
              const cells = []; // null = empty padding, string = date
              for (let i = 0; i < startDow; i++) cells.push(null);
              for (let d = 1; d <= lastDay.getDate(); d++) {
                const dt = new Date(heatYear, m, d);
                cells.push(dt.toISOString().split("T")[0]);
              }
              // Pad end to complete last week
              const remaining = (7 - (cells.length % 7)) % 7;
              for (let i = 0; i < remaining; i++) cells.push(null);

              // Split into weeks (columns of 7)
              const weeks = [];
              for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
              return { month: m, name: MONTH_NAMES[m], weeks };
            });

            return (
              <div style={{ overflowX: "auto", paddingBottom: 4 }}>
                <div style={{ display: "flex", gap: 8, minWidth: "max-content", alignItems: "flex-start" }}>
                  {/* Day-of-week labels */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingTop: 18, flexShrink: 0 }}>
                    {["S","M","T","W","T","F","S"].map((d, i) => (
                      <div key={i} style={{ width: 11, height: 13, fontSize: 8.5, color: T.subtext, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.7 }}>{d}</div>
                    ))}
                  </div>

                  {/* 12 month blocks */}
                  {monthBlocks.map((blk) => (
                    <div key={blk.month} style={{ display: "flex", flexDirection: "column" }}>
                      {/* Month label */}
                      <div style={{ fontSize: 11, fontWeight: 700, color: dark ? "#a78bfa" : "#7c3aed", marginBottom: 5, height: 16, letterSpacing: 0.3 }}>
                        {blk.name}
                      </div>
                      {/* Week columns */}
                      <div style={{ display: "flex", gap: 3 }}>
                        {blk.weeks.map((week, wi) => (
                          <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            {week.map((date, di) => {
                              if (!date) {
                                return <div key={di} style={{ width: 13, height: 13 }} />;
                              }
                              const v = activityLog[date] || 0;
                              const bg = getCellColor(date);
                              const isToday = date === todayStr();
                              return (
                                <div
                                  key={date}
                                  title={date + ": " + v + " action" + (v !== 1 ? "s" : "")}
                                  style={{
                                    width: 13, height: 13,
                                    borderRadius: 3,
                                    background: bg,
                                    border: isToday
                                      ? "1.5px solid " + (dark ? "#a78bfa" : "#4f46e5")
                                      : "1px solid " + (dark ? "rgba(167,139,250,0.12)" : "rgba(79,70,229,0.1)"),
                                    transition: "background 0.2s",
                                    cursor: v ? "pointer" : "default",
                                    boxShadow: v >= 1 && !dark ? "0 1px 3px rgba(79,70,229,0.18)" : "none",
                                  }}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Legend */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: T.subtext, marginTop: 14 }}>
            <span>Less</span>
            {[dark ? "#1e1b4b" : "#f0eeff", dark ? "#2d1b69" : "#ede9fe", dark ? "#5b21b6" : "#c4b5fd", dark ? "#7c3aed" : "#7c3aed", dark ? "#a78bfa" : "#4f46e5"].map((bg, i) => (
              <div key={i} style={{ width: 13, height: 13, borderRadius: 3, background: bg, border: "1px solid " + (dark ? "rgba(167,139,250,0.2)" : "rgba(79,70,229,0.15)") }} />
            ))}
            <span>More</span>
            <span style={{ marginLeft: "auto", fontSize: 11, color: dark ? "#a78bfa" : "#7c3aed", fontWeight: 600 }}>{yearHeatTotalActions} total actions</span>
          </div>
        </div>

        <Card bg="white" border="#e5e7eb">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: patternMasteryOpen ? 12 : 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.3, color: T.text }}>Pattern Mastery</div>
              <span style={{ fontSize: 12, background: dark ? "#14281f" : "#d1fae5", color: "#059669", borderRadius: 8, padding: "3px 10px", fontWeight: 700, border: "1px solid #86efac" }}>👑 {mastered.length} mastered</span>
            </div>
            <button onClick={() => setPatternMasteryOpen((v) => !v)} style={{ background: dark ? T.mutedBg : "#f5f3ff", border: "1.5px solid " + (dark ? T.chipBorder : "#c4b5fd"), borderRadius: 8, padding: "4px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#7c3aed", display: "flex", alignItems: "center", gap: 5 }}>
              <span>{patternMasteryOpen ? "▲ Hide" : "▼ Show"}</span>
              {!patternMasteryOpen && patternEntries.length > 0 && <span style={{ background: "#ede9fe", borderRadius: 99, padding: "1px 7px", fontSize: 11, color: "#6d28d9" }}>{patternEntries.length}</span>}
            </button>
          </div>
          {patternMasteryOpen && (
            patternEntries.length === 0 ? (
              <div style={{ color: T.subtext, fontSize: 13 }}>No pattern tags yet! Add some when solving.</div>
            ) : (
              patternEntries.map(([pt, s], i) => {
                const p2 = Math.round(s.mastered / s.total * 100);
                const barColor = p2 >= 70 ? "linear-gradient(90deg,#059669,#34d399)" : p2 >= 40 ? patternBars[i % patternBars.length] : "linear-gradient(90deg,#dc2626,#f87171)";
                return (
                  <div key={i} style={{ marginBottom: 12, padding: "8px 12px", background: i % 2 === 0 ? T.rowAlt : T.cardBg, borderRadius: 9 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, marginBottom: 5 }}>
                      <span style={{ fontWeight: 700 }}>{pt}</span>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <span style={{ color: T.subtext, fontSize: 11 }}>{s.mastered}/{s.total} mastered</span>
                        <span style={{ fontSize: 11, fontWeight: 700, background: p2 >= 70 ? "#d1fae5" : p2 >= 40 ? "#ede9fe" : "#fee2e2", color: p2 >= 70 ? "#059669" : p2 >= 40 ? "#7c3aed" : "#dc2626", padding: "1px 8px", borderRadius: 5 }}>{p2}%</span>
                      </div>
                    </div>
                    <div style={{ background: dark ? T.mutedBg : "#f0f0f5", borderRadius: 99, height: 7 }}>
                      <div style={{ background: barColor, height: 7, borderRadius: 99, width: p2 + "%", transition: "width 0.5s" }} />
                    </div>
                  </div>
                );
              })
            )
          )}
        </Card>

        <Card bg="white" border="#e5e7eb" style={{ gridColumn: "1 / -1" }}>
          <SH>Level Roadmap</SH>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {LEVELS.map((l, i) => {
              const isCur = l.name === level.name, isDone = solved.length > l.max;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 12, background: isCur ? dark ? l.accent + "22" : l.bg : isDone ? dark ? "#14281f" : "#f0fdf4" : T.cardBg, border: isCur ? "2px solid " + l.accent + "40" : isDone ? "1.5px solid #86efac" : "1.5px solid " + T.cardBorder }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: isCur || isDone ? l.bar : T.mutedBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{l.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 12, color: isCur ? l.accent : isDone ? "#15803d" : T.subtext }}>{l.name}</div>
                    <div style={{ fontSize: 10, color: T.subtext, opacity: 0.7 }}>{l.min}–{l.max === 999 ? "∞" : l.max}</div>
                  </div>
                  {isDone && <span style={{ fontSize: 11, color: "#15803d", fontWeight: 700 }}>✅</span>}
                  {isCur  && <span style={{ fontSize: 11, fontWeight: 700, color: l.accent }}>You</span>}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );

  /* ─── MODALS ─── */
  const MilestoneModal = () => !milestoneModal ? null : (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,8,30,0.92)", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "linear-gradient(135deg,#1e1b4b,#312e81," + milestoneModal.color + "33)", border: "2px solid " + milestoneModal.color + "60", borderRadius: 24, padding: "48px 56px", maxWidth: 520, width: "100%", textAlign: "center", animation: "msA 0.5s ease", boxShadow: "0 0 80px " + milestoneModal.color + "40" }}>
        <div style={{ fontSize: 72, animation: "float 2s ease-in-out infinite", marginBottom: 16 }}>{milestoneModal.emoji}</div>
        <div style={{ fontSize: 56, fontWeight: 700, color: milestoneModal.color, marginBottom: 6, letterSpacing: -2 }}>{milestoneModal.count}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 3, marginBottom: 20 }}>Problems Solved</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 10 }}>{milestoneModal.msg}</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 32, lineHeight: 1.7 }}>{milestoneModal.sub}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 32 }}>
          {[{ l: "XP Earned", v: xp }, { l: "Mastered", v: mastered.length }, { l: "Streak", v: "🔥" + streak.count }].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: "12px 8px" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: milestoneModal.color }}>{s.v}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 3, textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setMilestoneModal(null)} className="hbtn" style={{ background: "linear-gradient(135deg," + milestoneModal.color + "," + milestoneModal.color + "cc)", color: "white", border: "none", borderRadius: 13, padding: "14px 40px", cursor: "pointer", fontSize: 16, fontWeight: 700 }}>Keep Going!</button>
      </div>
    </div>
  );

  const MistakeModal = () => !mistakeModal ? null : (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,12,41,0.7)", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: T.cardBg, border: "1.5px solid " + T.cardBorder, borderRadius: 20, padding: "28px 32px", maxWidth: 520, width: "100%", animation: "pop 0.25s ease" }}>
        <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>What went wrong?</div>
        <div style={{ fontSize: 13, color: T.subtext, marginBottom: 18 }}>Tracking mistakes helps fix root causes, not symptoms.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 16 }}>
          {MISTAKE_TYPES.map((type) => (
            <button key={type} onClick={() => logMistake(type)} className="hbtn" style={{ padding: "10px 14px", borderRadius: 10, border: "1.5px solid " + T.chipBorder, cursor: "pointer", fontSize: 13, fontWeight: 600, background: T.chipBg, color: T.text, textAlign: "left" }}>{type}</button>
          ))}
        </div>
        <button onClick={() => setMistakeModal(null)} style={{ width: "100%", background: T.mutedBg, color: T.subtext, border: "none", borderRadius: 10, padding: "10px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Skip</button>
      </div>
    </div>
  );

  const ProblemModal = () => !modal ? null : (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,12,41,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 20 }}>
      <div style={{ background: T.cardBg, border: "2px solid " + T.cardBorder, borderRadius: 20, padding: 28, width: "100%", maxWidth: 640, maxHeight: "90vh", overflowY: "auto", animation: "pop 0.25s ease", boxShadow: "0 24px 64px rgba(0,0,0,0.35)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: T.text }}>{modal === "add" ? "Add Problem" : "Edit Problem"}</div>
          <button onClick={closeModal} style={{ background: T.mutedBg, border: "none", borderRadius: 99, width: 34, height: 34, cursor: "pointer", fontSize: 18, color: T.subtext, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: T.subtext, marginBottom: 20, padding: "8px 12px", background: dark ? T.rowAlt : "#f8fafc", borderRadius: 9, border: "1px solid " + T.cardBorder }}>
          <span style={{ color: form.section ? "#4f46e5" : T.subtext, fontWeight: form.section ? 700 : 400 }}>{form.section || "Section"}</span>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: form.subSection ? "#7c3aed" : T.subtext, fontWeight: form.subSection ? 700 : 400 }}>{form.subSection || "Sub-section"}</span>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: form.name ? T.text : T.subtext, fontWeight: form.name ? 700 : 400 }}>{form.name || "Problem name"}</span>
        </div>

        <div style={{ display: "grid", gap: 14 }}>

          {/* ── SECTION → SUB-SECTION ── */}
          <div style={{ background: dark ? T.rowAlt : "#f5f3ff", border: "1.5px solid " + (dark ? "#4f46e544" : "#c4b5fd"), borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>📂 Location</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 5 }}>Section</div>
                <select
                  value={form.section}
                  onChange={(e) => setForm((f) => ({ ...f, section: e.target.value, subSection: "" }))}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: "1.5px solid " + (form.section ? "#a78bfa" : T.inputBorder), fontSize: 13, background: T.inputBg, color: T.text }}
                >
                  <option value="">— Select Section —</option>
                  {Object.keys(DSA_SECTIONS).map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 5 }}>Sub-section</div>
                <select
                  value={form.subSection}
                  onChange={(e) => setForm((f) => ({ ...f, subSection: e.target.value }))}
                  disabled={!form.section}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: "1.5px solid " + (form.subSection ? "#a78bfa" : T.inputBorder), fontSize: 13, background: T.inputBg, color: form.section ? T.text : T.subtext, opacity: form.section ? 1 : 0.5 }}
                >
                  <option value="">— Select Sub-section —</option>
                  {(DSA_SECTIONS[form.section] || []).map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* ── PROBLEM DETAILS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Problem name *</div>
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Two Sum" style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "1.5px solid " + T.inputBorder, fontSize: 14, boxSizing: "border-box", background: T.inputBg, color: T.text }} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Topic</div>
              <select value={form.topic} onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))} style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "1.5px solid " + T.inputBorder, fontSize: 14, background: T.inputBg, color: T.text }}>
                <option value="">Select topic</option>
                {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          {form.topic && <div style={{ padding: "8px 13px", background: dark ? T.rowAlt : TCd(form.topic).bg, border: "1.5px solid " + TCd(form.topic).border, borderRadius: 8, fontSize: 13, color: TCd(form.topic).text, fontWeight: 600 }}>Topic: {form.topic}</div>}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>LeetCode / GFG link</div>
            <input value={form.link} onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))} placeholder="https://leetcode.com/problems/..." style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "1.5px solid " + T.inputBorder, fontSize: 13, boxSizing: "border-box", background: T.inputBg, color: T.text }} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 7, textTransform: "uppercase", letterSpacing: 1 }}>Difficulty</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ v: "Easy", bg: "#f0fdf4", border: "#86efac", text: "#166534" }, { v: "Medium", bg: "#fffbeb", border: "#fcd34d", text: "#92400e" }, { v: "Hard", bg: "#fef2f2", border: "#fca5a5", text: "#991b1b" }].map((opt) => (
                <button key={opt.v} onClick={() => setForm((f) => ({ ...f, difficulty: f.difficulty === opt.v ? "" : opt.v }))} style={{ flex: 1, padding: "9px", borderRadius: 10, border: "2px solid " + (form.difficulty === opt.v ? opt.border : T.inputBorder), cursor: "pointer", fontSize: 13, fontWeight: 700, background: form.difficulty === opt.v ? opt.bg : T.chipBg, color: form.difficulty === opt.v ? opt.text : T.subtext }}>{opt.v}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 7, textTransform: "uppercase", letterSpacing: 1 }}>Pattern Tags</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {PATTERNS.map((pt) => (
                <button key={pt} onClick={() => togglePat(pt)} style={{ padding: "4px 11px", borderRadius: 99, border: "1.5px solid " + ((form.pattern || []).includes(pt) ? "#a78bfa" : T.inputBorder), cursor: "pointer", fontSize: 11, fontWeight: 600, background: (form.pattern || []).includes(pt) ? dark ? "#2d1f5e" : "#f5f3ff" : T.chipBg, color: (form.pattern || []).includes(pt) ? "#a78bfa" : T.subtext }}>{pt}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Notes (key idea, TC/SC)</div>
            <textarea value={form.note} onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))} rows={3} placeholder="e.g. Prefix sum + hashmap. TC: O(n). Key insight: map stores sum index." style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "1.5px solid " + T.inputBorder, fontSize: 13, resize: "vertical", boxSizing: "border-box", background: T.inputBg, color: T.text, fontFamily: "system-ui, sans-serif", lineHeight: 1.6 }} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Key Code Pattern</div>
            <textarea value={form.codeSnippet || ""} onChange={(e) => setForm((f) => ({ ...f, codeSnippet: e.target.value }))} rows={4} placeholder={"// Key pattern\nint l=0, r=n-1;\nwhile(l<r){ ... }"} style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "1.5px solid #334155", fontSize: 13, resize: "vertical", boxSizing: "border-box", background: "#1e293b", color: "#a78bfa", fontFamily: "'Courier New', monospace", lineHeight: 1.7 }} />
            <div style={{ fontSize: 11, color: T.subtext, marginTop: 4 }}>Shown during revision to refresh muscle memory</div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 4 }}>
            <button onClick={closeModal} style={{ background: T.mutedBg, color: T.subtext, border: "none", borderRadius: 10, padding: "10px 22px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>Cancel</button>
            <button onClick={saveForm} className="hbtn" style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "white", border: "none", borderRadius: 10, padding: "10px 28px", cursor: "pointer", fontSize: 14, fontWeight: 700, boxShadow: "0 4px 16px rgba(79,70,229,0.4)" }}>Save Problem</button>
          </div>
        </div>
      </div>
    </div>
  );

  /* ─── RENDER ─── */
  return (
    <ThemeCtx.Provider value={{ T, dark }}>
    <div style={{ display: "flex", minHeight: "100vh", background: T.pageBg, color: T.text }}>

      {/* #12 Mobile sidebar overlay */}
      <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} style={{ display: sidebarOpen ? "block" : "none" }} />

      {/* #12 Mobile top bar */}
      <div className="mobile-topbar" style={{ background: "linear-gradient(135deg,#1e1b4b,#4f46e5)" }}>
        <button onClick={() => setSidebarOpen((v) => !v)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, width: 36, height: 36, cursor: "pointer", fontSize: 18, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>☰</button>
        <span className="sht" style={{ fontWeight: 700, fontSize: 16 }}>Striver A2Z Tracker</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>🔥{streak.count}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>{xp}XP</span>
        </div>
      </div>

      {/* Sidebar — desktop fixed, mobile slide-in */}
      <div className={"desktop-sidebar" + (sidebarOpen ? " open" : "")} style={{ position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 100 }}>
        {Sidebar()}
      </div>

      {/* SPARKS */}
      {sparks.map((c) => (
        <div key={c.id} style={{ position: "fixed", top: 50, left: c.x + "%", width: c.sz, height: c.sz, background: c.c, borderRadius: c.shape, zIndex: 9999, pointerEvents: "none", animation: "fall 2s " + c.dl + "s ease-in forwards" }} />
      ))}

      {/* TOAST — with undo button for deletes (#5) */}
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, background: toast.bg, border: "2px solid " + toast.border, borderRadius: 12, padding: "12px 20px", fontWeight: 700, fontSize: 14, zIndex: 9999, animation: "slR 0.3s ease", color: "#1a1a1a", boxShadow: "0 6px 24px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", gap: 12, maxWidth: 340 }}>
          <span style={{ flex: 1 }}>{toast.msg}</span>
          {toast.undoId && (
            <button onClick={() => undoDelete(toast.undoId)} style={{ background: "#dc2626", color: "white", border: "none", borderRadius: 7, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>↩ Undo</button>
          )}
        </div>
      )}

      {MilestoneModal()}
      {MistakeModal()}
      {ProblemModal()}

      {/* MAIN */}
      <div className="main-content" style={{ marginLeft: 240, flex: 1, padding: "28px 36px", maxWidth: "calc(100vw - 240px)", minHeight: "100vh", paddingBottom: 80 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: T.text, letterSpacing: -0.5 }}>
            {tab === "today"    && "Today's Dashboard"}
            {tab === "revision" && "Revision Queue"}
            {tab === "tracker"  && "Problem Tracker — Striver A2Z"}
            {tab === "notes"    && "Topic Notes"}
            {tab === "stats"    && "Stats & Analytics"}
          </h1>
          <div style={{ fontSize: 13, color: T.subtext, marginTop: 3 }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            {tab === "today"    && " · " + solvedThisWeek + "/" + weeklyGoal + " problems this week"}
            {tab === "revision" && " · " + due.length + " due today"}
            {tab === "tracker"  && " · " + problems.length + " problems total"}
          </div>
        </div>

        {tab === "today"    && TodayTab()}
        {tab === "revision" && RevisionTab()}
        {tab === "tracker"  && TrackerTab()}
        {tab === "notes"    && NotesTab()}
        {tab === "stats"    && StatsTab()}
      </div>

      {/* #12 Mobile bottom nav */}
      <div className="mobile-bottom-nav" style={{ background: T.sidebar, borderTopColor: T.cardBorder }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => { setTab(t.id); setSidebarOpen(false); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", padding: "8px 12px", borderRadius: 10, position: "relative" }}>
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: tab === t.id ? "#4f46e5" : T.subtext }}>{t.label}</span>
            {t.badge > 0 && <span style={{ position: "absolute", top: 4, right: 8, background: "#ef4444", color: "white", borderRadius: 99, fontSize: 9, padding: "1px 5px", fontWeight: 700 }}>{t.badge}</span>}
          </button>
        ))}
      </div>

    </div>
    </ThemeCtx.Provider>
  );
}
