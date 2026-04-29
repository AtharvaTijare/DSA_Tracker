
// import React, { useState, useEffect, useRef } from "react";

// /* ─── CONSTANTS ─── */
// const REV_META = [
//   { label: "Rev 1", desc: "Solve from scratch", xp: 10, bg: "#fef3c7", border: "#fbbf24", text: "#78350f", dot: "#f59e0b", bar: "linear-gradient(90deg,#f59e0b,#fbbf24)" },
//   { label: "Rev 2", desc: "Solve + edge cases", xp: 10, bg: "#ede9fe", border: "#a78bfa", text: "#4c1d95", dot: "#8b5cf6", bar: "linear-gradient(90deg,#8b5cf6,#a78bfa)" },
//   { label: "Rev 3", desc: "Pseudocode / dry run", xp: 10, bg: "#dbeafe", border: "#60a5fa", text: "#1e3a8a", dot: "#3b82f6", bar: "linear-gradient(90deg,#3b82f6,#60a5fa)" },
//   { label: "Rev 4", desc: "Final recall", xp: 50, bg: "#d1fae5", border: "#34d399", text: "#064e3b", dot: "#10b981", bar: "linear-gradient(90deg,#10b981,#34d399)" },
// ];
// const REV_INTERVALS = [3, 7, 30, 90];
// const TOPIC_BG = {
//   "Arrays":               { bg: "#fff7ed", border: "#fb923c", text: "#7c2d12", pill: "#ea580c" },
//   "Binary Search":        { bg: "#f5f3ff", border: "#a78bfa", text: "#4c1d95", pill: "#7c3aed" },
//   "Strings":              { bg: "#ecfdf5", border: "#34d399", text: "#064e3b", pill: "#059669" },
//   "Linked List":          { bg: "#fff1f2", border: "#fb7185", text: "#881337", pill: "#e11d48" },
//   "Recursion":            { bg: "#ecfeff", border: "#22d3ee", text: "#164e63", pill: "#0891b2" },
//   "Backtracking":         { bg: "#fdf4ff", border: "#e879f9", text: "#701a75", pill: "#a21caf" },
//   "Sorting":              { bg: "#eff6ff", border: "#60a5fa", text: "#1e3a8a", pill: "#2563eb" },
//   "Bit Manipulation":     { bg: "#faf5ff", border: "#c084fc", text: "#581c87", pill: "#9333ea" },
//   "Stack & Queue":        { bg: "#fff7ed", border: "#fdba74", text: "#9a3412", pill: "#ea580c" },
//   "Sliding Window":       { bg: "#f0fdfa", border: "#2dd4bf", text: "#134e4a", pill: "#0d9488" },
//   "Heap":                 { bg: "#f0fdf4", border: "#4ade80", text: "#14532d", pill: "#16a34a" },
//   "Greedy":               { bg: "#fefce8", border: "#facc15", text: "#713f12", pill: "#ca8a04" },
//   "Binary Trees":         { bg: "#eef2ff", border: "#818cf8", text: "#312e81", pill: "#4f46e5" },
//   "BST":                  { bg: "#fdf2f8", border: "#f0abfc", text: "#701a75", pill: "#c026d3" },
//   "Graphs":               { bg: "#f0f9ff", border: "#38bdf8", text: "#0c4a6e", pill: "#0284c7" },
//   "Dynamic Programming":  { bg: "#fef2f2", border: "#fca5a5", text: "#7f1d1d", pill: "#dc2626" },
//   "Tries":                { bg: "#fff7ed", border: "#fb923c", text: "#7c2d12", pill: "#f97316" },
// };
// const TC = (t) => TOPIC_BG[t] || { bg: "#f1f5f9", border: "#94a3b8", text: "#334155", pill: "#64748b" };
// const TOPICS = Object.keys(TOPIC_BG);
// const PATTERNS = ["Two Pointer","Sliding Window","Binary Search","BFS/DFS","Dynamic Programming","Backtracking","Greedy","Monotonic Stack","Prefix Sum","Hashing","Recursion","Heap/PQ","Union Find","Trie","Bit Manipulation","Fast & Slow Pointer"];

// /* ─── DSA SHEET SECTIONS ─── */
// const DSA_SECTIONS = {
//   "Step 1: Basics":              ["Lec 1: Patterns & Math", "Lec 2: Sorting Basics", "Lec 3: Hashing"],
//   "Step 2: Arrays":              ["Lec 1: Easy", "Lec 2: Medium", "Lec 3: Hard"],
//   "Step 3: Binary Search":       ["Lec 1: On 1D Arrays", "Lec 2: On Answers", "Lec 3: On 2D Arrays"],
//   "Step 4: Strings":             ["Lec 1: Basic", "Lec 2: Medium & Hard"],
//   "Step 5: Linked List":         ["Lec 1: Basics", "Lec 2: Doubly LL", "Lec 3: Medium / Hard"],
//   "Step 6: Recursion":           ["Lec 1: Fundamentals", "Lec 2: Subsequences", "Lec 3: Hard Problems"],
//   "Step 7: Bit Manipulation":    ["Lec 1: Concepts", "Lec 2: Interview Problems"],
//   "Step 8: Stack & Queue":       ["Lec 1: Learning", "Lec 2: Prefix/Infix/Postfix", "Lec 3: Monotonic Stack"],
//   "Step 9: Sliding Window":      ["Lec 1: Medium", "Lec 2: Hard"],
//   "Step 10: Heaps":              ["Lec 1: Learning", "Lec 2: Medium", "Lec 3: Hard"],
//   "Step 11: Greedy":             ["Lec 1: Easy", "Lec 2: Medium / Hard"],
//   "Step 12: Binary Trees":       ["Lec 1: Traversals", "Lec 2: Medium", "Lec 3: Hard"],
//   "Step 13: BST":                ["Lec 1: Concepts", "Lec 2: Problems"],
//   "Step 14: Graphs":             ["Lec 1: BFS/DFS", "Lec 2: Topo Sort", "Lec 3: Shortest Path", "Lec 4: MST", "Lec 5: Hard"],
//   "Step 15: Dynamic Programming":["Lec 1: 1D DP", "Lec 2: 2D / Grid DP", "Lec 3: DP on Strings", "Lec 4: DP on Stocks", "Lec 5: DP on LIS", "Lec 6: MCM / Partition DP"],
//   "Step 16: Tries":              ["Lec 1: Theory", "Lec 2: Problems"],
//   "Custom":                      ["General"],
// };
// const LEVELS = [
//   { min: 0,   max: 9,   name: "Newbie",          emoji: "🐣", bg: "#f1f5f9", accent: "#64748b", bar: "linear-gradient(90deg,#94a3b8,#64748b)" },
//   { min: 10,  max: 24,  name: "Learner",          emoji: "📚", bg: "#eff6ff", accent: "#3b82f6", bar: "linear-gradient(90deg,#60a5fa,#3b82f6)" },
//   { min: 25,  max: 49,  name: "Coder",            emoji: "💻", bg: "#ecfdf5", accent: "#10b981", bar: "linear-gradient(90deg,#34d399,#10b981)" },
//   { min: 50,  max: 99,  name: "Problem Solver",   emoji: "🧠", bg: "#f5f3ff", accent: "#8b5cf6", bar: "linear-gradient(90deg,#a78bfa,#8b5cf6)" },
//   { min: 100, max: 149, name: "Pattern Hunter",   emoji: "🎯", bg: "#fffbeb", accent: "#f59e0b", bar: "linear-gradient(90deg,#fbbf24,#f59e0b)" },
//   { min: 150, max: 199, name: "DSA Warrior",      emoji: "⚔️", bg: "#fff7ed", accent: "#f97316", bar: "linear-gradient(90deg,#fb923c,#f97316)" },
//   { min: 200, max: 299, name: "Algorithm Pro",    emoji: "🚀", bg: "#fef2f2", accent: "#ef4444", bar: "linear-gradient(90deg,#f87171,#ef4444)" },
//   { min: 300, max: 999, name: "DSA Master",       emoji: "👑", bg: "#fefce8", accent: "#eab308", bar: "linear-gradient(90deg,#facc15,#eab308,#f97316)" },
// ];
// const MILESTONES = [
//   { count: 10,  emoji: "🎯", color: "#6366f1", msg: "Double digits! You've cracked the first wall.",    sub: "The habit is forming. Don't stop now." },
//   { count: 25,  emoji: "⚡", color: "#8b5cf6", msg: "Quarter century! Patterns are clicking.",           sub: "You're past the hardest phase." },
//   { count: 50,  emoji: "🚀", color: "#0891b2", msg: "50 problems! Top 30% of DSA practitioners.",       sub: "Half a century. You're serious." },
//   { count: 100, emoji: "💯", color: "#059669", msg: "TRIPLE DIGITS! Interviews fear you now.",           sub: "100 problems. You're a different person." },
//   { count: 150, emoji: "⚔️", color: "#f97316", msg: "150 problems! Elite territory.",                   sub: "Most people quit at 30. You're at 150." },
//   { count: 200, emoji: "👑", color: "#eab308", msg: "200 problems! Interview-ready.",                    sub: "You've earned the right to be confident." },
//   { count: 300, emoji: "🏆", color: "#ef4444", msg: "300 problems! DSA MASTER.",                         sub: "Fewer than 1% of people reach this." },
// ];
// const MISTAKE_TYPES = ["Wrong pattern identified","Off-by-one error","Wrong base case","Missed edge case","Pointer/index error","Forgot TC/SC","Logic error","Didn't handle duplicates","Overflow not handled","Other"];
// const QUOTES = ["Every expert was once a beginner. Keep going!","Consistency beats intensity. Show up today.","Hard problems today = easy interviews tomorrow.","Progress, not perfection.","Trust the process. The sheet works if you work.","One problem at a time. That is all it takes.","Your future self is watching. Make them proud."];
// const EMPTY = { id: null, section: "", subSection: "", topic: "", name: "", link: "", difficulty: "", note: "", codeSnippet: "", pattern: [], status: "Unsolved", solvedDate: "", revStage: 0, revDates: [], bookmarked: false, revHistory: [], timeLogs: [], totalSolveTime: 0, totalRevTime: 0 };

// /* ─── PEAK PERFORMANCE PERIODS ─── */
// const PERIODS = [
//   { label: "Late Night", short: "12–6 AM",  hours: [0,1,2,3,4,5],         color: "#6366f1", grad: "linear-gradient(180deg,#818cf8,#6366f1)" },
//   { label: "Morning",    short: "6–9 AM",   hours: [6,7,8],               color: "#0891b2", grad: "linear-gradient(180deg,#22d3ee,#0891b2)" },
//   { label: "Mid-Day",    short: "9 AM–12",  hours: [9,10,11],             color: "#10b981", grad: "linear-gradient(180deg,#34d399,#10b981)" },
//   { label: "Afternoon",  short: "12–5 PM",  hours: [12,13,14,15,16],      color: "#f59e0b", grad: "linear-gradient(180deg,#fbbf24,#f59e0b)" },
//   { label: "Evening",    short: "5–9 PM",   hours: [17,18,19,20],         color: "#ec4899", grad: "linear-gradient(180deg,#f472b6,#ec4899)" },
//   { label: "Night",      short: "9 PM–12",  hours: [21,22,23],            color: "#a855f7", grad: "linear-gradient(180deg,#c084fc,#a855f7)" },
// ];

// /* ─── UTILS ─── */
// const todayStr  = () => new Date().toISOString().split("T")[0];
// const addDays   = (d, n) => { const dt = new Date(d); dt.setDate(dt.getDate() + n); return dt.toISOString().split("T")[0]; };
// const fmtTime   = (s) => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
// const fmtHours  = (s) => { const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60); return h > 0 ? h + "h " + m + "m" : m + "m"; };

// /* ─── LOCALSTORAGE ─── */
// const lsGet = (k, fb) => { try { const v = localStorage.getItem("dsatrk_" + k); return v !== null ? JSON.parse(v) : fb; } catch (e) { return fb; } };
// const lsSet = (k, v) => { try { localStorage.setItem("dsatrk_" + k, JSON.stringify(v)); } catch (e) {} };

// /* ─── THEME CONTEXT ─── */
// const ThemeCtx = React.createContext({ T: {}, dark: false });

// const Pill = ({ label, bg, border, text, sm }) => {
//   const { dark, T } = React.useContext(ThemeCtx);
//   return (
//     <span style={{ fontSize: sm ? 10 : 11, padding: sm ? "2px 8px" : "3px 10px", borderRadius: 99, fontWeight: 700, background: dark ? T.chipBg : (bg || "#f0f0f0"), color: text || "#555", border: "1.5px solid " + (dark ? (border || "#ddd") + "66" : (border || "#ddd")), display: "inline-block", marginRight: 4, marginTop: 2, whiteSpace: "nowrap" }}>{label}</span>
//   );
// };
// const Card = ({ bg, border, children, style: st }) => {
//   const { dark, T } = React.useContext(ThemeCtx);
//   return (
//     <div style={{ background: dark ? T.cardBg : (bg || "#f8fafc"), border: "1.5px solid " + (dark ? T.cardBorder : (border || "#e2e8f0")), borderRadius: 14, padding: "16px 20px", marginBottom: 14, ...(st || {}) }}>{children}</div>
//   );
// };
// const SH = ({ children, color, size }) => {
//   const { T } = React.useContext(ThemeCtx);
//   return (
//     <div style={{ fontWeight: 700, fontSize: size || 15, marginBottom: 12, letterSpacing: -0.3, color: color || T.text }}>{children}</div>
//   );
// };
// const GLOBAL_CSS = `
//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//   body { font-family: system-ui, -apple-system, sans-serif; overflow-x: hidden; }
//   ::-webkit-scrollbar { width: 6px; height: 6px; }
//   ::-webkit-scrollbar-track { background: transparent; }
//   ::-webkit-scrollbar-thumb { background: #c4b5fd; border-radius: 99px; }
//   @keyframes fall  { to { transform: translateY(90vh) rotate(720deg); opacity: 0; } }
//   @keyframes pop   { from { transform: scale(0.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }
//   @keyframes slR   { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
//   @keyframes glow  { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
//   @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
//   @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
//   @keyframes shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
//   @keyframes msA   { 0% { transform: scale(0.6); opacity: 0; } 60% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } }
//   @keyframes ringPulse { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(1.5); opacity: 0; } }
//   .hbtn { transition: all 0.18s !important; cursor: pointer; }
//   .hbtn:hover { transform: translateY(-2px) !important; filter: brightness(1.1) !important; }
//   .prow { transition: all 0.15s; }
//   .prow:hover { transform: translateX(2px); }
//   .sht { background: linear-gradient(90deg,#a78bfa,#60a5fa,#f9a8d4,#a78bfa); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 3s linear infinite; }
//   .mono { font-family: 'Courier New', monospace !important; }
//   .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 14px; transition: all 0.18s; border: none; width: 100%; text-align: left; }
//   .nav-item:hover { transform: translateX(3px); }
//   textarea:focus, input:focus, select:focus { outline: 2px solid #a78bfa !important; outline-offset: 1px; }
//   /* Smooth collapse/expand using CSS grid trick */
//   .collapsible        { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.32s ease; opacity: 0; }
//   .collapsible.open   { grid-template-rows: 1fr; opacity: 1; }
//   .collapsible > .collapsible-inner { overflow: hidden; }
//   /* Mobile responsive */
//   @media (max-width: 768px) {
//     .desktop-sidebar { transform: translateX(-100%); transition: transform 0.3s ease; }
//     .desktop-sidebar.open { transform: translateX(0); }
//     .sidebar-overlay { display: block !important; }
//     .main-content { margin-left: 0 !important; max-width: 100vw !important; padding: 16px !important; }
//     .mobile-topbar { display: flex !important; }
//     .mobile-bottom-nav { display: flex !important; }
//     .rev-grid { grid-template-columns: 1fr !important; }
//     .two-col { grid-template-columns: 1fr !important; }
//     .four-col { grid-template-columns: repeat(2,1fr) !important; }
//   }
//   @media (min-width: 769px) {
//     .sidebar-overlay { display: none !important; }
//     .mobile-topbar { display: none !important; }
//     .mobile-bottom-nav { display: none !important; }
//     .desktop-sidebar { transform: none !important; }
//   }
//   .sidebar-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 99; display: none; }
//   .mobile-topbar { position: fixed; top: 0; left: 0; right: 0; height: 56px; z-index: 98; align-items: center; padding: 0 16px; gap: 12px; display: none; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
//   .mobile-bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; height: 60px; z-index: 98; align-items: center; justify-content: space-around; display: none; border-top: 1px solid; padding-bottom: env(safe-area-inset-bottom); }
// `;
// export default function App() {
//   /* ─── STATE ─── */
//   const [problems,        setProblems]        = useState(() => lsGet("problems", []));
//   const [tab,             setTab]             = useState("today");
//   const [filter,          setFilter]          = useState("All");
//   const [topicFilter,     setTopicFilter]     = useState("");
//   const [patternFilter,   setPatternFilter]   = useState("");
//   const [modal,           setModal]           = useState(null);
//   const [form,            setForm]            = useState(EMPTY);
//   const [search,          setSearch]          = useState("");
//   const [xp,              setXp]              = useState(() => lsGet("xp", 0));
//   const [streak,          setStreak]          = useState(() => lsGet("streak", { count: 0, lastDate: "" }));
//   const [toast,           setToast]           = useState(null);
//   const [sparks,          setSparks]          = useState([]);
//   const [quote]                               = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);
//   const [dark,            setDark]            = useState(() => lsGet("dark", false));
//   const [activityLog,     setActivityLog]     = useState(() => lsGet("activityLog", {}));
//   const [topicNotes,      setTopicNotes]      = useState(() => lsGet("topicNotes", {}));
//   const [notesTopic,      setNotesTopic]      = useState(TOPICS[0]);
//   const [timerSessions,   setTimerSessions]   = useState(() => lsGet("timerSessions", []));
//   const [hourLog,         setHourLog]         = useState(() => lsGet("hourLog", {}));
//   const [revQuality,      setRevQuality]      = useState(() => lsGet("revQuality", {}));
//   const [mistakes,        setMistakes]        = useState(() => lsGet("mistakes", []));
//   const [milestonesShown, setMilestonesShown] = useState(() => lsGet("milestonesShown", []));
//   const [milestoneModal,  setMilestoneModal]  = useState(null);
//   const [mistakeModal,    setMistakeModal]    = useState(null);
//   const [calHover,        setCalHover]        = useState(null);
//   const [timerSec,           setTimerSec]           = useState(0);
//   const [timerRunning,       setTimerRunning]       = useState(false);
//   const [patternMasteryOpen, setPatternMasteryOpen] = useState(true);
//   const [heatYear,           setHeatYear]           = useState(new Date().getFullYear());
//   const [trackerView,        setTrackerView]        = useState("flat");
//   const [collapsedSections,  setCollapsedSections]  = useState({});
//   const [collapsedSubSecs,   setCollapsedSubSecs]   = useState({});
//   const [revIntervals,    setRevIntervals]    = useState(() => lsGet("revIntervals", [3, 7, 30, 90]));
//   const [undoQueue,       setUndoQueue]       = useState([]);
//   const [sidebarOpen,     setSidebarOpen]     = useState(false);
//   const [lastExportDate,  setLastExportDate]  = useState(() => lsGet("lastExportDate", ""));
//   const [linkedProblemId, setLinkedProblemId] = useState(null);
//   const [weeklyGoal]      = useState(() => lsGet("weeklyGoal", 5));
//   const [streakMode]      = useState(() => lsGet("streakMode", "any"));
//   const [milestoneLog,    setMilestoneLog]    = useState(() => lsGet("milestoneLog", {}));
//   const [settingsOpen,    setSettingsOpen]    = useState(false);

//   /* ─── TIMER REMINDERS (FIX #2) ─── */
//   // Configurable list of minute marks at which to alert the user.
//   // Default reminders: 15min (sweet spot), 25min (pomodoro), 45min (long session warning).
//   const [timerReminders, setTimerReminders] = useState(() => lsGet("timerReminders", [15, 25, 45]));
//   const [reminderInput,  setReminderInput]  = useState("");
//   // Tracks reminders that already fired this session so they don't fire twice.
//   const firedRemindersRef = useRef(new Set());
//   // Visual flash state when a reminder triggers
//   const [reminderFlash, setReminderFlash] = useState(null);

//   const timerRef       = useRef(null);
//   const timerSecRef    = useRef(0);
//   const importFileRef  = useRef(null);
//   const revCardTimers  = useRef({});

//   const toggleSection   = (sec) => setCollapsedSections((p) => ({ ...p, [sec]: !p[sec] }));
//   const toggleSubSec    = (key) => setCollapsedSubSecs((p) => ({ ...p, [key]: !p[key] }));
//   const today        = todayStr();
//   const nowObj       = new Date();
//   const currentMonth = nowObj.getFullYear() + "-" + String(nowObj.getMonth() + 1).padStart(2, "0");

//   /* ─── INJECT GLOBAL CSS ─── */
//   useEffect(() => {
//     const el = document.createElement("style");
//     el.textContent = GLOBAL_CSS;
//     document.head.appendChild(el);
//     return () => document.head.removeChild(el);
//   }, []);

//   /* ─── PERSIST ─── */
//   useEffect(() => { lsSet("problems",        problems);        }, [problems]);
//   useEffect(() => { lsSet("xp",              xp);              }, [xp]);
//   useEffect(() => { lsSet("streak",          streak);          }, [streak]);
//   useEffect(() => { lsSet("activityLog",     activityLog);     }, [activityLog]);
//   useEffect(() => { lsSet("topicNotes",      topicNotes);      }, [topicNotes]);
//   useEffect(() => { lsSet("timerSessions",   timerSessions);   }, [timerSessions]);
//   useEffect(() => { lsSet("hourLog",         hourLog);         }, [hourLog]);
//   useEffect(() => { lsSet("revQuality",      revQuality);      }, [revQuality]);
//   useEffect(() => { lsSet("mistakes",        mistakes);        }, [mistakes]);
//   useEffect(() => { lsSet("milestonesShown", milestonesShown); }, [milestonesShown]);
//   useEffect(() => { lsSet("revIntervals",    revIntervals);    }, [revIntervals]);
//   useEffect(() => { lsSet("lastExportDate",  lastExportDate);  }, [lastExportDate]);
//   useEffect(() => { lsSet("milestoneLog",    milestoneLog);    }, [milestoneLog]);
//   useEffect(() => { lsSet("timerReminders",  timerReminders);  }, [timerReminders]);
//   useEffect(() => {
//     lsSet("dark", dark);
//     document.body.style.background = dark ? "#0f0f1a" : "#f1f5f9";
//   }, [dark]);

//   // Escape closes any open modal
//   useEffect(() => {
//     const handler = (e) => {
//       if (e.key !== "Escape") return;
//       if (modal)          { setModal(null); setForm(EMPTY); }
//       if (milestoneModal) setMilestoneModal(null);
//       if (mistakeModal)   setMistakeModal(null);
//       if (settingsOpen)   setSettingsOpen(false);
//     };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [modal, milestoneModal, mistakeModal, settingsOpen]);

//   // Reset rev card timers when switching TO revision tab
//   useEffect(() => {
//     if (tab === "revision") {
//       revCardTimers.current = {};
//       const now = Date.now();
//       const todayDate = new Date().toISOString().split("T")[0];
//       problems.filter((p) => {
//         if (p.status === "Unsolved" || p.revStage >= 4) return false;
//         const nr = p.revDates[p.revStage];
//         return nr && nr <= todayDate;
//       }).forEach((p) => { revCardTimers.current[p.id] = now; });
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [tab]);

//   /* ─── REV CARD TIMERS (seed when due list changes) ─── */
//   useEffect(() => {
//     const todayDate = new Date().toISOString().split("T")[0];
//     const dueNow = problems.filter((p) => {
//       if (p.status === "Unsolved" || p.revStage >= 4) return false;
//       const nr = p.revDates[p.revStage];
//       return nr && nr <= todayDate;
//     });
//     const now = Date.now();
//     dueNow.forEach((p) => { if (!revCardTimers.current[p.id]) revCardTimers.current[p.id] = now; });
//   }, [problems]);

//   /* ─── TIMER (with FIX #2: reminder popups, no hard 20min limit) ─── */
//   useEffect(() => { timerSecRef.current = timerSec; }, [timerSec]);

//   // Audio beep helper for reminders (graceful no-op if blocked)
//   const playReminderBeep = () => {
//     try {
//       const Ctx = window.AudioContext || window.webkitAudioContext;
//       if (!Ctx) return;
//       const ctx = new Ctx();
//       // Two-tone chime
//       [800, 1100].forEach((freq, i) => {
//         const osc = ctx.createOscillator();
//         const gain = ctx.createGain();
//         osc.connect(gain); gain.connect(ctx.destination);
//         osc.frequency.value = freq;
//         const t0 = ctx.currentTime + i * 0.18;
//         gain.gain.setValueAtTime(0.0001, t0);
//         gain.gain.exponentialRampToValueAtTime(0.25, t0 + 0.02);
//         gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16);
//         osc.start(t0); osc.stop(t0 + 0.2);
//       });
//       setTimeout(() => { try { ctx.close(); } catch (e) {} }, 800);
//     } catch (e) {}
//   };

//   useEffect(() => {
//     if (timerRunning) {
//       timerRef.current = setInterval(() => {
//         setTimerSec((s) => {
//           const ns = s + 1;
//           // Check reminders
//           timerReminders.forEach((min) => {
//             if (ns === min * 60 && !firedRemindersRef.current.has(min)) {
//               firedRemindersRef.current.add(min);
//               playReminderBeep();
//               setReminderFlash(min);
//               setTimeout(() => setReminderFlash(null), 4000);
//               setToast({ msg: "⏰ " + min + " minute" + (min !== 1 ? "s" : "") + " elapsed — keep going or take a break!", bg: "#fef3c7", border: "#f59e0b" });
//               setTimeout(() => setToast((t) => (t && t.msg && t.msg.indexOf(min + " minute") !== -1 ? null : t)), 4000);
//             }
//           });
//           return ns;
//         });
//       }, 1000);
//     } else clearInterval(timerRef.current);
//     return () => clearInterval(timerRef.current);
//   }, [timerRunning, timerReminders]);

//   /* ─── THEME ─── */
//   const T = dark
//     ? { pageBg: "#0f0f1a", sidebar: "#12121f", cardBg: "#1a1a2e", cardBorder: "#2d2d4e", text: "#e2e8f0", subtext: "#94a3b8", inputBg: "#0f172a", inputBorder: "#334155", rowAlt: "#1e2035", chipBg: "#1e293b", chipBorder: "#334155", mutedBg: "#0f172a" }
//     : { pageBg: "#f1f5f9", sidebar: "#ffffff", cardBg: "white",   cardBorder: "#e5e7eb", text: "#111827", subtext: "#6b7280", inputBg: "#f8fafc", inputBorder: "#e5e7eb", rowAlt: "#f9fafb", chipBg: "white",   chipBorder: "#e5e7eb", mutedBg: "#f1f5f9" };

//   const TCd = (t) => { const b = TC(t); if (!dark) return b; return { bg: "#1e293b", border: b.pill + "55", text: b.pill, pill: b.pill }; };

//   /* ─── COMPUTED ─── */
//   const solved          = problems.filter((p) => p.status !== "Unsolved");
//   const mastered        = problems.filter((p) => p.revStage >= 4);
//   const bookmarked      = problems.filter((p) => p.bookmarked);
//   const getNR           = (p) => p.revDates[p.revStage] || null;
//   const due             = solved.filter((p) => p.revStage < 4 && getNR(p) && getNR(p) <= today);
//   const upcoming        = solved.filter((p) => { if (p.revStage >= 4) return false; const d = getNR(p); if (!d) return false; const diff = (new Date(d) - new Date(today)) / 86400000; return diff > 0 && diff <= 3; });
//   const weakTopics      = (() => { const m = {}; solved.forEach((p) => { if (!p.topic) return; if (!m[p.topic]) m[p.topic] = { hard: 0, total: 0 }; m[p.topic].total++; if (p.difficulty === "Hard") m[p.topic].hard++; }); return Object.entries(m).filter(([, v]) => v.total >= 2 && v.hard / v.total >= 0.5).map(([t]) => t); })();
//   const level           = LEVELS.find((l) => solved.length >= l.min && solved.length <= l.max) || LEVELS[0];
//   const nextLvl         = LEVELS.find((l) => l.min > solved.length);
//   const lvlPct          = nextLvl ? Math.round((solved.length - level.min) / (nextLvl.min - level.min) * 100) : 100;
//   const weekStart       = (() => { const d = new Date(today); d.setDate(d.getDate() - d.getDay()); return d.toISOString().split("T")[0]; })();
//   const solvedThisWeek  = problems.filter((p) => p.solvedDate >= weekStart && p.solvedDate <= today).length;
//   const weeklyPct       = Math.min(Math.round(solvedThisWeek / weeklyGoal * 100), 100);
//   const overdueCount    = due.filter((p) => getNR(p) < today).length;
//   const sPct            = problems.length ? Math.round(solved.length / problems.length * 100) : 0;
//   const totalSeconds    = timerSessions.reduce((a, s) => a + s.seconds, 0);
//   const monthSeconds    = timerSessions.filter((s) => s.month === currentMonth).reduce((a, s) => a + s.seconds, 0);
//   const weekSeconds     = timerSessions.filter((s) => s.date >= weekStart && s.date <= today).reduce((a, s) => a + s.seconds, 0);

//   /* ─── PEAK PERFORMANCE PERIODS (FIX #3) ─── */
//   const periodCounts = PERIODS.map((p) => ({
//     ...p,
//     count: p.hours.reduce((sum, h) => sum + (hourLog[h] || 0), 0),
//   }));
//   const peakPeriod    = periodCounts.reduce((max, p) => (p.count > max.count ? p : max), periodCounts[0]);
//   const maxPeriodCount = Math.max(1, ...periodCounts.map((p) => p.count));
//   const totalActions   = periodCounts.reduce((a, p) => a + p.count, 0);

//   const getQuality      = (t) => { const q = revQuality[t]; if (!q) return null; const tot = q.easy + q.hard; if (tot < 3) return null; return Math.round(q.easy / tot * 100); };
//   const mistakeCounts   = mistakes.reduce((a, m) => ({ ...a, [m.type]: (a[m.type] || 0) + 1 }), {});
//   const topMistake      = Object.entries(mistakeCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
//   const weekRevisions   = Object.entries(activityLog).filter(([d]) => d >= weekStart && d <= today).reduce((a, [, v]) => a + v, 0);
//   const bestTopicThisWeek = (() => { const m = {}; solved.filter((p) => p.solvedDate >= weekStart).forEach((p) => { if (p.topic) m[p.topic] = (m[p.topic] || 0) + 1; }); const e = Object.entries(m).sort((a, b) => b[1] - a[1])[0]; return e ? e[0] : null; })();
//   const daysMissed      = streak.lastDate ? Math.max(0, Math.floor((new Date(today) - new Date(streak.lastDate)) / 86400000)) : 0;
//   const calDays         = Array.from({ length: 7 }, (_, i) => { const d = new Date(today); d.setDate(d.getDate() + i); const s = d.toISOString().split("T")[0]; return { date: s, dayName: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()], items: solved.filter((p) => p.revStage < 4 && getNR(p) === s) }; });
//   const maxAct          = Math.max(1, ...Object.values(activityLog));
//   const activeDaysCount = Object.values(activityLog).filter((v) => v > 0).length;
//   const maxStreakCount  = (() => {
//     const dates = Object.keys(activityLog).filter((d) => activityLog[d] > 0).sort();
//     let best = 0, cur = 0, prev = null;
//     dates.forEach((d) => {
//       if (prev && (new Date(d) - new Date(prev)) / 86400000 === 1) { cur++; } else { cur = 1; }
//       best = Math.max(best, cur); prev = d;
//     });
//     return best;
//   })();

//   /* ─── FULL-YEAR HEATMAP ─── */
//   const yearHeatWeeks = (() => {
//     const jan1    = new Date(heatYear, 0, 1);
//     const dec31   = new Date(heatYear, 11, 31);
//     const start   = new Date(jan1);  start.setDate(jan1.getDate() - jan1.getDay());
//     const end     = new Date(dec31); end.setDate(dec31.getDate() + (6 - dec31.getDay()));
//     const weeks   = [];
//     const cur     = new Date(start);
//     while (cur <= end) {
//       const week = [];
//       for (let d = 0; d < 7; d++) { week.push(new Date(cur).toISOString().split("T")[0]); cur.setDate(cur.getDate() + 1); }
//       weeks.push(week);
//     }
//     return weeks;
//   })();
//   const yearHeatTotalActions = yearHeatWeeks.flat().reduce((a, d) => a + (activityLog[d] || 0), 0);
//   const availableYears = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i);
//   const patternMap      = {};
//   solved.forEach((p) => (p.pattern || []).forEach((pt) => { if (!patternMap[pt]) patternMap[pt] = { total: 0, mastered: 0 }; patternMap[pt].total++; if (p.revStage >= 4) patternMap[pt].mastered++; }));
//   const patternEntries  = Object.entries(patternMap).sort((a, b) => b[1].total - a[1].total);
//   const patternBars     = ["linear-gradient(90deg,#4f46e5,#7c3aed)","linear-gradient(90deg,#0891b2,#22d3ee)","linear-gradient(90deg,#d97706,#fbbf24)","linear-gradient(90deg,#059669,#34d399)","linear-gradient(90deg,#dc2626,#f87171)","linear-gradient(90deg,#a21caf,#e879f9)"];
//   const notesCt         = TCd(notesTopic);
//   const calHoverDay     = calDays.find((d) => d.date === calHover) || null;
//   const filtered        = problems
//     .filter((p) => filter === "All" ? true : filter === "Unsolved" ? p.status === "Unsolved" : filter === "Solved" ? p.status !== "Unsolved" : filter === "Mastered" ? p.revStage >= 4 : p.bookmarked)
//     .filter((p) => !topicFilter    || p.topic === topicFilter)
//     .filter((p) => !patternFilter  || (p.pattern || []).includes(patternFilter))
//     .filter((p) => !search         || p.name.toLowerCase().includes(search.toLowerCase()));

//   /* ─── ACTIONS ─── */
//   const boom      = () => { setSparks(Array.from({ length: 30 }, (_, i) => ({ id: i, x: 10 + Math.random() * 80, c: ["#f59e0b","#ef4444","#10b981","#8b5cf6","#f43f5e","#06b6d4","#a855f7","#22d3ee","#84cc16","#fbbf24"][i % 10], sz: 6 + Math.random() * 10, dl: Math.random() * 0.7, shape: i % 3 === 0 ? "50%" : "3px" }))); setTimeout(() => setSparks([]), 2400); };
//   const showToast = (msg, bg, border) => { setToast({ msg, bg, border }); setTimeout(() => setToast(null), 2800); };
//   const bumpStreak = () => setStreak((p) => { if (p.lastDate === today) return p; const y = addDays(today, -1); return { count: p.lastDate === y ? p.count + 1 : 1, lastDate: today }; });
//   const logActivity = () => { const h = new Date().getHours(); setActivityLog((prev) => ({ ...prev, [today]: (prev[today] || 0) + 1 })); setHourLog((prev) => ({ ...prev, [h]: (prev[h] || 0) + 1 })); };
//   const checkMilestone = (nc, shownList) => {
//     const m = MILESTONES.find((ms) => ms.count === nc && !shownList.includes(ms.count));
//     if (m) {
//       setTimeout(() => {
//         setMilestoneModal(m);
//         setMilestonesShown((p) => [...p, m.count]);
//         setMilestoneLog((prev) => ({ ...prev, [m.count]: today }));
//         boom();
//       }, 900);
//     }
//   };

//   const markSolved = (id) => {
//     const nc = solved.length + 1;
//     setProblems((prev) => prev.map((p) => p.id !== id ? p : { ...p, status: "Solved", solvedDate: today, revStage: 0, revDates: revIntervals.map((n) => addDays(today, n)) }));
//     setXp((x) => x + 20); bumpStreak(); boom(); logActivity(); checkMilestone(nc, milestonesShown);
//     showToast("Solved! +20 XP", "#d1fae5", "#34d399");
//   };
//   const markRev = (id, fb) => {
//     const elapsedSec = revCardTimers.current[id] ? Math.round((Date.now() - revCardTimers.current[id]) / 1000) : 0;
//     delete revCardTimers.current[id];
//     const timeLabel = elapsedSec >= 60 ? Math.floor(elapsedSec / 60) + "m " + (elapsedSec % 60) + "s" : elapsedSec + "s";
//     const p = problems.find((x) => x.id === id);
//     const wasMaster = p && p.revStage === 3 && fb === "easy";
//     if (p && p.topic) setRevQuality((prev) => ({ ...prev, [p.topic]: { easy: (prev[p.topic] ? prev[p.topic].easy : 0) + (fb === "easy" ? 1 : 0), hard: (prev[p.topic] ? prev[p.topic].hard : 0) + (fb === "hard" ? 1 : 0) } }));
//     setProblems((prev) => prev.map((pr) => {
//       if (pr.id !== id) return pr;
//       const ns = fb === "easy" ? pr.revStage + 1 : pr.revStage;
//       const nd = [...pr.revDates];
//       if (fb === "hard") nd[pr.revStage] = addDays(today, 2);
//       const hist = [...(pr.revHistory || []), { date: today, stage: pr.revStage + 1, seconds: elapsedSec, result: fb }];
//       const newLog = elapsedSec > 0
//         ? [...(pr.timeLogs || []), { date: today, seconds: elapsedSec, type: "revision", stage: pr.revStage + 1, result: fb }]
//         : (pr.timeLogs || []);
//       return { ...pr, revStage: ns, revDates: nd, revHistory: hist, timeLogs: newLog, totalRevTime: (pr.totalRevTime || 0) + elapsedSec };
//     }));
//     if (fb === "hard") setTimeout(() => setMistakeModal(id), 300);
//     if (wasMaster)          { setXp((x) => x + 50); boom(); logActivity(); showToast("👑 MASTERED! +50 XP · " + timeLabel, "#fef9c3", "#facc15"); }
//     else if (fb === "easy") { setXp((x) => x + 10); logActivity(); showToast("✅ Rev done! +10 XP · took " + timeLabel, "#ede9fe", "#a78bfa"); }
//     else                    { setXp((x) => x + 5);  logActivity(); showToast("🔄 Rescheduled +5 XP · took " + timeLabel, "#fef3c7", "#fbbf24"); }
//     bumpStreak();
//   };
//   const logMistake  = (type) => { if (!mistakeModal) return; setMistakes((prev) => [...prev, { date: today, type, problemId: mistakeModal }]); setMistakeModal(null); };
//   const toggleBM    = (id) => setProblems((prev) => prev.map((p) => p.id !== id ? p : { ...p, bookmarked: !p.bookmarked }));
//   const delP = (id) => {
//     const p = problems.find((x) => x.id === id);
//     if (!p) return;
//     setProblems((prev) => prev.filter((x) => x.id !== id));
//     const undoId = Date.now();
//     setUndoQueue((prev) => [...prev, { id: undoId, problem: p }]);
//     setToast({ msg: 'Deleted "' + p.name + '"', bg: "#fef2f2", border: "#fca5a5", undoId });
//     setTimeout(() => {
//       setUndoQueue((prev) => prev.filter((u) => u.id !== undoId));
//       setToast((t) => (t && t.undoId === undoId ? null : t));
//     }, 5000);
//   };
//   const undoDelete = (undoId) => {
//     const entry = undoQueue.find((u) => u.id === undoId);
//     if (!entry) return;
//     setProblems((prev) => [...prev, entry.problem]);
//     setUndoQueue((prev) => prev.filter((u) => u.id !== undoId));
//     setToast(null);
//     showToast('↩ Restored "' + entry.problem.name + '"', "#f0fdf4", "#86efac");
//   };
//   const togglePat   = (pt) => setForm((f) => ({ ...f, pattern: (f.pattern || []).includes(pt) ? f.pattern.filter((x) => x !== pt) : [...(f.pattern || []), pt] }));
//   const openAdd     = () => { setForm({ ...EMPTY, id: Date.now() }); setModal("add"); };
//   const openEdit    = (p) => { setForm({ ...p }); setModal("edit"); };
//   const closeModal  = () => { setModal(null); setForm(EMPTY); };
//   const saveForm    = () => { if (!form.name.trim()) return; if (modal === "add") setProblems((prev) => [...prev, form]); else setProblems((prev) => prev.map((p) => p.id === form.id ? form : p)); closeModal(); };
//   const saveTimerSession = () => { const sec = timerSecRef.current; if (sec < 30) return; setTimerSessions((prev) => [...prev, { date: today, seconds: sec, month: currentMonth, hour: nowObj.getHours() }]); };
//   const resetTimer  = () => {
//     saveTimerSession();
//     setTimerRunning(false);
//     setTimerSec(0);
//     timerSecRef.current = 0;
//     firedRemindersRef.current = new Set();
//     setReminderFlash(null);
//   };

//   /* ─── TIMER REMINDER MANAGEMENT (FIX #2) ─── */
//   const addReminder = () => {
//     const n = Number(reminderInput);
//     if (!Number.isFinite(n) || n <= 0 || n > 600) {
//       showToast("Enter minutes between 1 and 600", "#fef2f2", "#fca5a5");
//       return;
//     }
//     if (timerReminders.includes(n)) {
//       showToast("That reminder already exists", "#fef3c7", "#fbbf24");
//       return;
//     }
//     setTimerReminders((prev) => [...prev, n].sort((a, b) => a - b));
//     setReminderInput("");
//   };
//   const removeReminder = (m) => setTimerReminders((prev) => prev.filter((x) => x !== m));

//   /* ─── EXPORT ─── */
//   const exportData = () => {
//     const now = new Date();
//     const ts  = now.getFullYear() + "-"
//       + String(now.getMonth()+1).padStart(2,"0") + "-"
//       + String(now.getDate()).padStart(2,"0") + "-"
//       + String(now.getHours()).padStart(2,"0")
//       + String(now.getMinutes()).padStart(2,"0");
//     const payload = { version: 1, exportedAt: now.toISOString(), problems, xp, streak, activityLog, topicNotes, timerSessions, hourLog, revQuality, mistakes, milestonesShown, milestoneLog, revIntervals, timerReminders, weeklyGoal, streakMode, dark };
//     const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
//     const url  = URL.createObjectURL(blob);
//     const a    = document.createElement("a");
//     a.href = url; a.download = "striver-a2z-backup-" + ts + ".json"; a.click();
//     URL.revokeObjectURL(url);
//     setLastExportDate(today);
//     showToast("✅ Exported " + problems.length + " problems", "#d1fae5", "#34d399");
//   };

//   /* ─── IMPORT ─── */
//   const importData = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (ev) => {
//       try {
//         const d = JSON.parse(ev.target.result);
//         if (!d.problems) throw new Error("Invalid backup file");
//         const apply = (key, setter, val) => { setter(val); lsSet(key, val); };
//         apply("problems",        setProblems,        d.problems);
//         apply("xp",              setXp,              d.xp              ?? 0);
//         apply("streak",          setStreak,          d.streak          ?? { count: 0, lastDate: "" });
//         apply("activityLog",     setActivityLog,     d.activityLog     ?? {});
//         apply("topicNotes",      setTopicNotes,      d.topicNotes      ?? {});
//         apply("timerSessions",   setTimerSessions,   d.timerSessions   ?? []);
//         apply("hourLog",         setHourLog,         d.hourLog         ?? {});
//         apply("revQuality",      setRevQuality,      d.revQuality      ?? {});
//         apply("mistakes",        setMistakes,        d.mistakes        ?? []);
//         apply("milestonesShown", setMilestonesShown, d.milestonesShown ?? []);
//         apply("milestoneLog",    setMilestoneLog,    d.milestoneLog    ?? {});
//         apply("revIntervals",    setRevIntervals,    d.revIntervals    ?? [3,7,30,90]);
//         apply("timerReminders",  setTimerReminders,  d.timerReminders  ?? [15,25,45]);
//         showToast("✅ Imported " + d.problems.length + " problems", "#d1fae5", "#34d399");
//       } catch {
//         showToast("❌ Invalid file — import failed", "#fef2f2", "#fca5a5");
//       }
//       e.target.value = "";
//     };
//     reader.readAsText(file);
//   };

//   /* ─── SIDEBAR ─── */
//   const TABS = [
//     { id: "today",    icon: "🏠", label: "Today",    badge: overdueCount },
//     { id: "revision", icon: "🔁", label: "Revision", badge: due.length   },
//     { id: "tracker",  icon: "📊", label: "Tracker"                       },
//     { id: "notes",    icon: "📝", label: "Notes"                         },
//     { id: "stats",    icon: "📈", label: "Stats"                         },
//   ];

//   const daysSinceBackup = lastExportDate
//     ? Math.floor((new Date(today) - new Date(lastExportDate)) / 86400000)
//     : null;
//   const showBackupWarning = daysSinceBackup === null || daysSinceBackup >= 3;

//   const Sidebar = () => (
//     <div style={{ width: 240, background: T.sidebar, borderRight: "1px solid " + T.cardBorder, display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh", overflowY: "auto", zIndex: 100, boxShadow: "2px 0 20px rgba(0,0,0,0.06)" }}>
//       {/* Brand */}
//       <div style={{ background: "linear-gradient(135deg,#1e1b4b,#312e81,#4f46e5)", padding: "22px 20px 18px", color: "white" }}>
//         <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
//           <span>⚔️</span><span className="sht">Striver A2Z Tracker</span>
//         </div>
//         <div style={{ fontSize: 10, opacity: 0.5, lineHeight: 1.5, fontStyle: "italic" }}>"{quote}"</div>
//       </div>

//       {/* Level */}
//       <div style={{ padding: "14px 16px", borderBottom: "1px solid " + T.cardBorder }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
//           <div style={{ width: 34, height: 34, borderRadius: 9, background: level.bar, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, animation: "float 3s ease-in-out infinite", flexShrink: 0 }}>{level.emoji}</div>
//           <div>
//             <div style={{ fontWeight: 700, fontSize: 13, color: T.text }}>{level.name}</div>
//             <div style={{ fontSize: 10, color: T.subtext }}>{nextLvl ? nextLvl.min - solved.length + " more" : "Max level"}</div>
//           </div>
//         </div>
//         <div style={{ background: dark ? "#1e293b" : "#e0e7ff", borderRadius: 99, height: 6, overflow: "hidden" }}>
//           <div style={{ background: level.bar, height: 6, borderRadius: 99, width: lvlPct + "%", transition: "width 0.8s" }} />
//         </div>
//       </div>

//       {/* Stats */}
//       <div style={{ padding: "14px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, borderBottom: "1px solid " + T.cardBorder }}>
//         {[{ v: "🔥 " + streak.count, l: "streak", c: "#f97316" }, { v: xp + " XP", l: "earned", c: "#8b5cf6" }, { v: solved.length, l: "solved", c: "#10b981" }, { v: mastered.length, l: "mastered", c: "#eab308" }].map((s, i) => (
//           <div key={i} style={{ background: dark ? T.mutedBg : "#f8fafc", border: "1px solid " + T.cardBorder, borderRadius: 9, padding: "8px 10px", textAlign: "center" }}>
//             <div style={{ fontSize: 15, fontWeight: 700, color: s.c }}>{s.v}</div>
//             <div style={{ fontSize: 9, color: T.subtext, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.l}</div>
//           </div>
//         ))}
//       </div>

//       {/* Nav */}
//       <nav style={{ padding: "10px 12px", flex: 1 }}>
//         <div style={{ fontSize: 10, fontWeight: 700, color: T.subtext, textTransform: "uppercase", letterSpacing: 1.5, padding: "6px 6px 8px" }}>Navigation</div>
//         {TABS.map((t) => (
//           <button key={t.id} onClick={() => setTab(t.id)} className="nav-item hbtn" style={{ background: tab === t.id ? "linear-gradient(135deg,#4f46e5,#7c3aed)" : "transparent", color: tab === t.id ? "white" : T.subtext, marginBottom: 3, boxShadow: tab === t.id ? "0 4px 14px rgba(79,70,229,0.35)" : "none" }}>
//             <span style={{ fontSize: 16 }}>{t.icon}</span>
//             <span style={{ flex: 1 }}>{t.label}</span>
//             {t.badge > 0 && <span style={{ background: tab !== t.id ? "#ef4444" : "rgba(255,255,255,0.3)", color: "white", borderRadius: 99, fontSize: 10, padding: "1px 7px", fontWeight: 700, animation: tab !== t.id ? "glow 1.8s infinite" : "none" }}>{t.badge}</span>}
//           </button>
//         ))}
//       </nav>

//       {/* Bottom */}
//       <div style={{ padding: "14px 16px", borderTop: "1px solid " + T.cardBorder }}>
//         <button onClick={() => setDark((d) => !d)} style={{ width: "100%", padding: "9px", borderRadius: 10, border: "1.5px solid " + T.cardBorder, cursor: "pointer", fontSize: 13, fontWeight: 700, background: dark ? "#fbbf24" : "linear-gradient(135deg,#1e1b4b,#312e81)", color: dark ? "#1e1b4b" : "white", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
//           <span>{dark ? "☀️" : "🌙"}</span><span>{dark ? "Light Mode" : "Dark Mode"}</span>
//         </button>

//         <button onClick={exportData} style={{ width: "100%", padding: "9px", borderRadius: 10, border: "1.5px solid #86efac", cursor: "pointer", fontSize: 13, fontWeight: 700, background: dark ? "#14281f" : "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 6 }}>
//           <span>⬇️</span><span>Export Backup</span>
//         </button>

//         <input
//           ref={importFileRef}
//           type="file"
//           accept=".json"
//           style={{ display: "none" }}
//           onChange={importData}
//         />
//         <button onClick={() => importFileRef.current && importFileRef.current.click()} style={{ width: "100%", padding: "9px", borderRadius: 10, border: "1.5px solid #bfdbfe", cursor: "pointer", fontSize: 13, fontWeight: 700, background: dark ? "#1e293b" : "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
//           <span>⬆️</span><span>Import Backup</span>
//         </button>

//         <div style={{ textAlign: "center", fontSize: 10, color: T.subtext, lineHeight: 1.5 }}>
//           Data saved in your browser<br />
//           <span style={{ opacity: 0.6 }}>Export to back up · Import to restore</span>
//         </div>
//       </div>
//     </div>
//   );

//   /* ─── TODAY TAB ─── */
//   const TodayTab = () => (
//     <div>
//       {showBackupWarning && (
//         <div style={{ background: dark ? "#1a1200" : "#fffbeb", border: "1.5px solid " + (dark ? "#854d0e" : "#fcd34d"), borderRadius: 11, padding: "10px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
//           <span style={{ fontSize: 18 }}>💾</span>
//           <div style={{ flex: 1, fontSize: 12, color: dark ? "#fde68a" : "#92400e" }}>
//             <span style={{ fontWeight: 700 }}>
//               {daysSinceBackup === null ? "No backup ever made." : daysSinceBackup + " days since last backup."}
//             </span>
//             {" "}Back up your data so you never lose progress.
//           </div>
//           <button onClick={exportData} style={{ background: "linear-gradient(135deg,#d97706,#f59e0b)", color: "white", border: "none", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
//             Back up now
//           </button>
//         </div>
//       )}
//       {overdueCount > 0 && (
//         <div style={{ background: dark ? "#2d1515" : "#fef2f2", border: "2px solid " + (dark ? "#7f1d1d" : "#fca5a5"), borderRadius: 13, padding: "14px 20px", marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
//           <span style={{ fontSize: 24, animation: "pulse 1.5s infinite" }}>⚠️</span>
//           <div style={{ flex: 1 }}>
//             <div style={{ fontWeight: 700, fontSize: 14, color: "#dc2626" }}>Revision streak at risk!</div>
//             <div style={{ fontSize: 12, color: dark ? "#fca5a5" : "#b91c1c", marginTop: 2 }}>{overdueCount} problem{overdueCount > 1 ? "s" : ""} overdue — clear them now</div>
//           </div>
//           <button onClick={() => setTab("revision")} className="hbtn" style={{ background: "linear-gradient(135deg,#dc2626,#ef4444)", color: "white", border: "none", borderRadius: 9, padding: "9px 18px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>Fix now →</button>
//         </div>
//       )}

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
//         {/* LEFT */}
//         <div>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
//             {[{ l: "Due", v: due.length, bg: due.length > 0 ? "#fef2f2" : "#f0fdf4", border: due.length > 0 ? "#fca5a5" : "#86efac", text: due.length > 0 ? "#991b1b" : "#166534", icon: "🔁" }, { l: "Starred", v: bookmarked.length, bg: "#fffbeb", border: "#fcd34d", text: "#92400e", icon: "⭐" }].map((s, i) => (
//               <div key={i} style={{ background: dark ? T.cardBg : s.bg, border: "2px solid " + (dark ? s.border + "55" : s.border), borderRadius: 14, padding: "16px 12px", textAlign: "center" }}>
//                 <div style={{ fontSize: 22, marginBottom: 5, animation: "float 3s ease-in-out infinite" }}>{s.icon}</div>
//                 <div style={{ fontSize: 28, fontWeight: 700, color: s.text, letterSpacing: -1 }}>{s.v}</div>
//                 <div style={{ fontSize: 10, fontWeight: 600, color: s.text, marginTop: 2, opacity: 0.75, textTransform: "uppercase" }}>{s.l}</div>
//               </div>
//             ))}
//           </div>
//           <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
//             <span style={{ fontSize: 12, background: dark ? T.cardBg : "#f5f3ff", border: "1.5px solid " + (dark ? "#a78bfa44" : "#c4b5fd"), borderRadius: 8, padding: "5px 12px", color: dark ? "#a78bfa" : "#7c3aed", fontWeight: 700 }}>👑 {mastered.length} mastered</span>
//             <span style={{ fontSize: 12, background: dark ? T.cardBg : "#f0fdf4", border: "1.5px solid " + (dark ? "#34d39944" : "#86efac"), borderRadius: 8, padding: "5px 12px", color: "#059669", fontWeight: 700 }}>📊 {problems.length} total</span>
//             <span style={{ fontSize: 12, background: dark ? T.cardBg : "#eff6ff", border: "1.5px solid " + (dark ? "#3b82f644" : "#bfdbfe"), borderRadius: 8, padding: "5px 12px", color: "#2563eb", fontWeight: 700 }}>✅ {solved.length} solved</span>
//           </div>

//           <Card bg="#eff6ff" border="#bfdbfe">
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
//               <SH>🎯 Weekly Goal</SH>
//               <div style={{ fontSize: 13, fontWeight: 700, color: "#4f46e5" }}>{solvedThisWeek}/5</div>
//             </div>
//             <div style={{ background: dark ? "#0f172a" : "#dbeafe", borderRadius: 99, height: 12, overflow: "hidden", marginBottom: 8 }}>
//               <div style={{ background: "linear-gradient(90deg,#4f46e5,#7c3aed)", height: 12, borderRadius: 99, width: weeklyPct + "%", transition: "width 0.7s" }} />
//             </div>
//             <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
//               {Array.from({ length: 5 }, (_, i) => <div key={i} style={{ flex: 1, height: 7, borderRadius: 4, background: i < solvedThisWeek ? "linear-gradient(90deg,#4f46e5,#7c3aed)" : dark ? "#1e293b" : "#e0e7ff" }} />)}
//             </div>
//             <div style={{ fontSize: 12, color: T.subtext }}>{solvedThisWeek >= 5 ? "🎉 Weekly goal smashed!" : solvedThisWeek === 0 ? "Start strong today!" : (5 - solvedThisWeek) + " more to hit your goal!"}</div>
//           </Card>

//           <Card bg="white" border="#e5e7eb">
//             <SH>📋 Daily Checklist</SH>
//             {[
//               { done: due.length === 0, icon: "🔁", label: due.length === 0 ? "Revisions clear!" : "Revise " + due.length + " problem" + (due.length > 1 ? "s" : ""), action: due.length > 0 ? () => setTab("revision") : null, btnBg: "linear-gradient(135deg,#7c3aed,#4f46e5)", btn: "Go" },
//               { done: false, icon: "🧠", label: "Preview tonight's problem" },
//               { done: false, icon: "💻", label: "Solve 1 new problem", action: () => setTab("tracker"), btnBg: "linear-gradient(135deg,#059669,#10b981)", btn: "Tracker" },
//               { done: false, icon: "🏷️", label: "Tag patterns + write notes" },
//             ].map((it, i) => (
//               <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 13px", background: it.done ? "#f0fdf4" : dark ? T.rowAlt : "#f8fafc", border: "1.5px solid " + (it.done ? "#86efac" : T.cardBorder), borderRadius: 10, marginBottom: 7 }}>
//                 <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
//                   <span style={{ fontSize: 18 }}>{it.icon}</span>
//                   <span style={{ fontSize: 13, fontWeight: 600, textDecoration: it.done ? "line-through" : "none", color: it.done ? "#16a34a" : T.text }}>{it.label}</span>
//                 </div>
//                 {it.action && <button onClick={it.action} className="hbtn" style={{ background: it.btnBg, color: "white", border: "none", borderRadius: 7, padding: "5px 14px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>{it.btn}</button>}
//               </div>
//             ))}
//           </Card>

//           {daysMissed >= 2 && (
//             <Card bg="#f0f9ff" border="#60a5fa">
//               <SH color="#1d4ed8">🔄 Recovery Plan — {daysMissed} days missed</SH>
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
//                 {[{ day: "Today", task: "Clear ALL overdue revisions", icon: "🔁", c: "#f59e0b" }, { day: "Tomorrow", task: "Solve 1 new + revise due", icon: "💻", c: "#059669" }, { day: "Day 3", task: "Full schedule resumes", icon: "✅", c: "#4f46e5" }].map((d, i) => (
//                   <div key={i} style={{ background: dark ? T.cardBg : "white", border: "1.5px solid " + d.c + "44", borderRadius: 10, padding: "12px" }}>
//                     <div style={{ fontSize: 20, marginBottom: 5 }}>{d.icon}</div>
//                     <div style={{ fontWeight: 700, fontSize: 12, color: d.c, marginBottom: 4 }}>{d.day}</div>
//                     <div style={{ fontSize: 11, color: T.subtext, lineHeight: 1.5 }}>{d.task}</div>
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           )}
//         </div>

//         {/* RIGHT */}
//         <div>
//           {upcoming.length > 0 && (
//             <Card bg="white" border="#e5e7eb">
//               <SH>⏳ Coming Up (1–3 days)</SH>
//               {upcoming.slice(0, 6).map((p, i) => {
//                 const rm = REV_META[p.revStage] || REV_META[0];
//                 return (
//                   <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < upcoming.length - 1 ? "1px solid " + T.cardBorder : "none" }}>
//                     <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//                       <div style={{ width: 9, height: 9, borderRadius: 2, background: rm.dot, flexShrink: 0 }} />
//                       <span style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</span>
//                       <Pill label={rm.label} bg={rm.bg} border={rm.border} text={rm.text} sm />
//                     </div>
//                     <span style={{ fontSize: 11, color: "#d97706", fontWeight: 700, background: "#fffbeb", padding: "2px 8px", borderRadius: 5, border: "1px solid #fcd34d", whiteSpace: "nowrap" }}>{getNR(p)}</span>
//                   </div>
//                 );
//               })}
//             </Card>
//           )}

//           {bookmarked.length > 0 && (
//             <Card bg="#fffbeb" border="#fcd34d">
//               <SH>⭐ Bookmarked</SH>
//               {bookmarked.slice(0, 5).map((p, i) => {
//                 const ct = TCd(p.topic);
//                 return (
//                   <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 10px", background: i % 2 === 0 ? dark ? T.rowAlt : "#fef9c3" : "transparent", borderRadius: 8, marginBottom: 4 }}>
//                     <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//                       <span>⭐</span>
//                       <span style={{ fontWeight: 600, fontSize: 13 }}>
//                         {p.link ? <a href={p.link} target="_blank" rel="noreferrer" style={{ color: ct.pill, textDecoration: "none" }}>{p.name} ↗</a> : p.name}
//                       </span>
//                     </div>
//                     <button onClick={() => toggleBM(p.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#d97706", fontWeight: 700, fontSize: 13 }}>✕</button>
//                   </div>
//                 );
//               })}
//             </Card>
//           )}

//           {weakTopics.length > 0 && (
//             <Card bg="#fff1f2" border="#fda4af">
//               <SH color="#9f1239">⚠️ Weak Topics</SH>
//               <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
//                 {weakTopics.map((t, i) => <Pill key={i} label={"⚠️ " + t} bg="#fee2e2" border="#fca5a5" text="#9f1239" />)}
//               </div>
//             </Card>
//           )}

//           <Card bg={dark ? "#1a1f2e" : "#fef9c3"} border={dark ? "#78350f" : "#fde047"}>
//             <SH color="#92400e" size={14}>📋 This Week</SH>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
//               {[{ l: "Solved", v: solvedThisWeek, c: "#059669" }, { l: "Actions", v: weekRevisions, c: "#7c3aed" }, { l: "Streak", v: "🔥 " + streak.count, c: "#dc2626" }, { l: "Time", v: fmtHours(weekSeconds) || "0m", c: "#0891b2" }].map((s, i) => (
//                 <div key={i} style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)", borderRadius: 9, padding: "10px 12px" }}>
//                   <div style={{ fontWeight: 700, fontSize: 16, color: s.c }}>{s.v}</div>
//                   <div style={{ fontSize: 11, color: T.subtext, marginTop: 2 }}>{s.l}</div>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );

//   /* ─── REVISION TAB ─── */
//   const RevisionTab = () => (
//     <div>
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 18 }}>
//         {REV_META.map((r, i) => (
//           <div key={i} style={{ background: dark ? T.cardBg : r.bg, border: "2px solid " + (dark ? r.dot + "44" : r.border), borderRadius: 13, padding: "14px 16px" }}>
//             <div style={{ fontWeight: 700, fontSize: 13, color: r.dot }}>{r.label}</div>
//             <div style={{ fontSize: 11, color: dark ? T.subtext : r.text, marginTop: 4, lineHeight: 1.5 }}>{r.desc}</div>
//             <div style={{ marginTop: 8, background: r.bar, borderRadius: 99, height: 3 }} />
//             <div style={{ fontSize: 14, fontWeight: 700, color: r.dot, marginTop: 8 }}>+{r.xp} XP</div>
//           </div>
//         ))}
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, marginBottom: 18 }}>
//         <Card bg="white" border="#e5e7eb">
//           <SH>📆 7-Day Calendar</SH>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6 }}>
//             {calDays.map((day, i) => {
//               const isT = day.date === today, has = day.items.length > 0;
//               return (
//                 <div key={i} style={{ textAlign: "center", padding: "10px 4px", borderRadius: 11, border: "2px solid " + (isT ? "#4f46e5" : has ? "#fbbf24" : dark ? T.cardBorder : "#e5e7eb"), background: isT ? dark ? "#1e1b4b" : "#eef2ff" : has ? dark ? "#2d2b00" : "#fffbeb" : dark ? T.rowAlt : "#f9fafb", cursor: has ? "pointer" : "default", transition: "all 0.2s" }} onClick={() => has && setCalHover(calHover === day.date ? null : day.date)}>
//                   <div style={{ fontSize: 10, fontWeight: 700, color: isT ? "#4f46e5" : T.subtext }}>{day.dayName}</div>
//                   <div style={{ fontSize: 12, fontWeight: 700, color: isT ? "#4f46e5" : T.text, marginTop: 3 }}>{day.date.slice(8)}</div>
//                   {has  && <div style={{ marginTop: 5, background: "linear-gradient(135deg,#f59e0b,#fbbf24)", color: "white", borderRadius: 99, fontSize: 11, fontWeight: 700, padding: "1px 0" }}>{day.items.length}</div>}
//                   {!has && <div style={{ marginTop: 5, fontSize: 10, color: T.subtext, opacity: 0.4 }}>—</div>}
//                 </div>
//               );
//             })}
//           </div>
//           {calHover && calHoverDay && calHoverDay.items.length > 0 && (
//             <div style={{ marginTop: 12, background: dark ? T.rowAlt : "#fffbeb", border: "1.5px solid #fcd34d", borderRadius: 9, padding: "10px 14px", animation: "pop 0.2s ease" }}>
//               <div style={{ fontWeight: 700, fontSize: 12, color: "#92400e", marginBottom: 8 }}>Due on {calHover}:</div>
//               {calHoverDay.items.map((p, i) => {
//                 const rm = REV_META[p.revStage] || REV_META[0], ct = TCd(p.topic);
//                 return (
//                   <div key={i} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 5 }}>
//                     <Pill label={rm.label} bg={rm.bg} border={rm.border} text={rm.text} sm />
//                     <span style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</span>
//                     {p.topic && <Pill label={p.topic} bg={ct.bg} border={ct.border} text={ct.text} sm />}
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </Card>

//         <Card bg={dark ? "#1a1f2e" : "#eff6ff"} border={dark ? "#1e3a5f" : "#bfdbfe"}>
//           <SH color="#1d4ed8">Session Stats</SH>
//           <div style={{ display: "grid", gap: 10 }}>
//             {[{ l: "Due today", v: due.length, c: due.length > 0 ? "#dc2626" : "#059669" }, { l: "Overdue", v: overdueCount, c: overdueCount > 0 ? "#ef4444" : "#059669" }, { l: "Mastered", v: mastered.length, c: "#eab308" }, { l: "This week", v: solvedThisWeek, c: "#4f46e5" }].map((s, i) => (
//               <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px", background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)", borderRadius: 9 }}>
//                 <span style={{ fontSize: 13, color: T.subtext }}>{s.l}</span>
//                 <span style={{ fontSize: 18, fontWeight: 700, color: s.c }}>{s.v}</span>
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>

//       {due.length === 0 ? (
//         <Card bg="linear-gradient(135deg,#f0fdf4,#dcfce7)" border="#86efac" style={{ textAlign: "center", padding: 48 }}>
//           <div style={{ fontSize: 56, marginBottom: 14 }}>🎉</div>
//           <div style={{ fontWeight: 700, fontSize: 18, color: "#15803d" }}>All caught up!</div>
//           <div style={{ fontSize: 14, color: "#16a34a", marginTop: 6 }}>Go solve new problems!</div>
//         </Card>
//       ) : (
//         <div>
//           <div style={{ fontWeight: 700, fontSize: 14, color: "#991b1b", marginBottom: 14, display: "flex", alignItems: "center", gap: 8, background: dark ? "#2d1515" : "#fef2f2", padding: "12px 16px", borderRadius: 11, border: "1.5px solid " + (dark ? "#7f1d1d" : "#fca5a5") }}>
//             <span style={{ animation: "glow 1.5s infinite" }}>🔴</span>
//             Due today — {due.length} problem{due.length > 1 ? "s" : ""}
//             <span style={{ marginLeft: "auto", fontSize: 12, color: dark ? "#fca5a5" : "#dc2626", fontWeight: 600 }}>Clear before 9am</span>
//           </div>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
//             {due.map((p) => {
//               const rm = REV_META[p.revStage] || REV_META[0], ct = TCd(p.topic);
//               return (
//                 <div key={p.id} style={{ background: dark ? T.cardBg : rm.bg, border: "2px solid " + (dark ? rm.dot + "44" : rm.border), borderRadius: 14, padding: 18, animation: "pop 0.3s ease" }}>
//                   <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
//                     {p.topic && <Pill label={p.topic} bg={ct.bg} border={ct.border} text={ct.text} />}
//                     <Pill label={rm.label} bg={rm.bg} border={rm.border} text={rm.text} />
//                     {getNR(p) < today && <Pill label="Overdue" bg="#fee2e2" border="#fca5a5" text="#991b1b" />}
//                   </div>
//                   <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>
//                     {p.link ? <a href={p.link} target="_blank" rel="noreferrer" style={{ color: rm.dot, textDecoration: "none" }}>{p.name} ↗</a> : p.name}
//                   </div>
//                   {(p.pattern || []).length > 0 && <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 6 }}>{p.pattern.map((pt) => <Pill key={pt} label={pt} bg="#f5f3ff" border="#c4b5fd" text="#5b21b6" sm />)}</div>}
//                   {p.note && <div style={{ fontSize: 12, color: dark ? T.subtext : rm.text, marginTop: 6, background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.65)", padding: "8px 12px", borderRadius: 8, borderLeft: "3px solid " + rm.dot, lineHeight: 1.6 }}>📝 {p.note}</div>}
//                   {p.codeSnippet && <div className="mono" style={{ marginTop: 8, background: "#1e293b", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#a78bfa", borderLeft: "3px solid " + rm.dot, whiteSpace: "pre-wrap", overflowX: "auto" }}>💻 {p.codeSnippet}</div>}
//                   <div style={{ fontSize: 12, fontWeight: 700, color: rm.dot, marginTop: 8, marginBottom: 6 }}>Goal: {rm.desc}</div>
//                   {(p.revHistory || []).length > 0 && (
//                     <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}>
//                       {(p.revHistory || []).slice(-4).map((h, i) => (
//                         <span key={i} style={{ fontSize: 10, background: h.result === "easy" ? dark ? "#14281f" : "#d1fae5" : dark ? "#2d1515" : "#fee2e2", color: h.result === "easy" ? "#059669" : "#dc2626", borderRadius: 5, padding: "2px 7px", fontWeight: 600, border: "1px solid " + (h.result === "easy" ? "#86efac" : "#fca5a5") }}>
//                           R{h.stage} · {h.seconds >= 60 ? Math.floor(h.seconds / 60) + "m" : h.seconds + "s"}
//                         </span>
//                       ))}
//                       <span style={{ fontSize: 10, color: T.subtext, alignSelf: "center" }}>
//                         · avg {Math.round((p.revHistory || []).reduce((a, h) => a + h.seconds, 0) / (p.revHistory || []).length)}s
//                       </span>
//                     </div>
//                   )}
//                   <div style={{ display: "flex", gap: 3, marginBottom: 6 }}>
//                     {REV_META.map((_, i) => <div key={i} style={{ flex: 1, height: 5, borderRadius: 99, background: i < p.revStage ? "#10b981" : i === p.revStage ? rm.dot : dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }} />)}
//                   </div>
//                   <div style={{ fontSize: 11, color: T.subtext, marginBottom: 12 }}>Stage {p.revStage + 1}/4</div>
//                   <div style={{ display: "flex", gap: 8 }}>
//                     <button onClick={() => markRev(p.id, "easy")} className="hbtn" style={{ flex: 1, background: "linear-gradient(135deg,#059669,#10b981)", color: "white", border: "none", borderRadius: 10, padding: "10px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>😊 Easy</button>
//                     <button onClick={() => markRev(p.id, "hard")} className="hbtn" style={{ flex: 1, background: "linear-gradient(135deg,#dc2626,#ef4444)", color: "white", border: "none", borderRadius: 10, padding: "10px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>😰 Hard</button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   /* ─── TRACKER TAB ─── */
//   const TrackerTab = () => (
//     <div>
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
//         {(() => {
//           const linked = linkedProblemId ? problems.find((p) => p.id === linkedProblemId) : null;
//           // Visual state: how many reminders have been passed
//           const passedReminders = timerReminders.filter((m) => timerSec >= m * 60).length;
//           const maxReminderSec  = timerReminders.length ? Math.max(...timerReminders) * 60 : 1200;
//           const allReminderSec  = timerReminders.length ? Math.max(...timerReminders) * 60 : 0;
//           // Color escalation
//           const timerColor = passedReminders === 0 ? "#4f46e5"
//             : passedReminders < timerReminders.length ? "#f97316"
//             : "#ef4444";
//           const flashing = reminderFlash !== null;
//           return (
//             <Card bg={timerRunning ? dark ? "#1a0a00" : "#fff7ed" : dark ? T.cardBg : "white"} border={flashing ? "#f59e0b" : timerRunning ? "#f97316" : linked ? "#4f46e5" : T.cardBorder} style={flashing ? { boxShadow: "0 0 0 4px rgba(245,158,11,0.25), 0 0 30px rgba(245,158,11,0.4)" } : {}}>
//               <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//                 <div style={{ flex: 1 }}>
//                   <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
//                     Solve Timer
//                     <span style={{ fontSize: 11, fontWeight: 400, color: T.subtext }}>— rings at your reminders</span>
//                   </div>
//                   {linked ? (
//                     <div style={{ fontSize: 11, background: dark ? "#1e293b" : "#eff6ff", border: "1px solid " + (dark ? "#4f46e544" : "#bfdbfe"), borderRadius: 7, padding: "3px 10px", marginBottom: 6, color: dark ? "#a78bfa" : "#4f46e5", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }}>
//                       ⏱ Linked: {linked.name}
//                       <button onClick={() => setLinkedProblemId(null)} style={{ background: "none", border: "none", cursor: "pointer", color: T.subtext, fontSize: 11, padding: 0, lineHeight: 1 }}>✕</button>
//                     </div>
//                   ) : (
//                     <div style={{ fontSize: 11, color: T.subtext, marginBottom: 6 }}>Click ⏱ on a problem below to link it</div>
//                   )}
//                   <div className="mono" style={{ fontSize: 44, fontWeight: 600, color: timerColor, letterSpacing: 5, transition: "color 0.4s" }}>{fmtTime(timerSec)}</div>
//                   {/* Progress bar with reminder ticks */}
//                   {timerReminders.length > 0 && timerSec > 0 && (
//                     <div style={{ position: "relative", marginTop: 6, marginBottom: 4 }}>
//                       <div style={{ background: dark ? T.mutedBg : "#e0e7ff", borderRadius: 99, height: 6, overflow: "hidden" }}>
//                         <div style={{
//                           background: passedReminders === 0
//                             ? "linear-gradient(90deg,#4f46e5,#7c3aed)"
//                             : passedReminders < timerReminders.length
//                             ? "linear-gradient(90deg,#f97316,#fb923c)"
//                             : "linear-gradient(90deg,#ef4444,#f87171)",
//                           height: 6,
//                           borderRadius: 99,
//                           width: Math.min(timerSec / maxReminderSec * 100, 100) + "%",
//                           transition: "width 1s linear, background 0.4s",
//                         }} />
//                       </div>
//                       {/* Reminder ticks */}
//                       {timerReminders.map((m) => {
//                         const pct = Math.min((m * 60) / maxReminderSec * 100, 100);
//                         const passed = timerSec >= m * 60;
//                         return (
//                           <div key={m} title={m + " min reminder"} style={{
//                             position: "absolute",
//                             left: pct + "%",
//                             top: -2,
//                             transform: "translateX(-50%)",
//                             width: 2,
//                             height: 10,
//                             background: passed ? "#fbbf24" : (dark ? "#475569" : "#94a3b8"),
//                             borderRadius: 1,
//                           }} />
//                         );
//                       })}
//                     </div>
//                   )}
//                   {/* Reminder chips */}
//                   <div style={{ marginTop: 6, display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center" }}>
//                     <span style={{ fontSize: 10, color: T.subtext, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Remind at:</span>
//                     {timerReminders.length === 0 && <span style={{ fontSize: 11, color: T.subtext, fontStyle: "italic" }}>none</span>}
//                     {timerReminders.map((m) => {
//                       const fired = firedRemindersRef.current.has(m);
//                       const passed = timerSec >= m * 60;
//                       return (
//                         <span key={m} style={{
//                           fontSize: 11,
//                           background: passed ? "#fef3c7" : dark ? "#1e293b" : "#f5f3ff",
//                           color: passed ? "#92400e" : dark ? "#a78bfa" : "#7c3aed",
//                           border: "1px solid " + (passed ? "#fcd34d" : dark ? "#4f46e544" : "#c4b5fd"),
//                           borderRadius: 7,
//                           padding: "2px 7px",
//                           fontWeight: 700,
//                           display: "inline-flex",
//                           alignItems: "center",
//                           gap: 4,
//                         }}>
//                           {passed ? "✓" : "⏰"} {m}m
//                           <button onClick={() => removeReminder(m)} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontSize: 10, padding: 0, lineHeight: 1, opacity: 0.6 }}>✕</button>
//                         </span>
//                       );
//                     })}
//                     <input
//                       type="number"
//                       min="1"
//                       max="600"
//                       value={reminderInput}
//                       onChange={(e) => setReminderInput(e.target.value)}
//                       onKeyDown={(e) => { if (e.key === "Enter") addReminder(); }}
//                       placeholder="add"
//                       style={{ width: 50, fontSize: 11, padding: "2px 6px", borderRadius: 6, border: "1px dashed " + T.inputBorder, background: T.inputBg, color: T.text }}
//                     />
//                     <button onClick={addReminder} style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "white", border: "none", borderRadius: 6, padding: "2px 9px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>+</button>
//                   </div>
//                   {flashing && (
//                     <div style={{ marginTop: 6, fontSize: 12, fontWeight: 700, color: "#d97706", display: "flex", alignItems: "center", gap: 6, animation: "glow 1s infinite" }}>
//                       <span style={{ fontSize: 14 }}>🔔</span> {reminderFlash} minute{reminderFlash !== 1 ? "s" : ""} elapsed!
//                     </div>
//                   )}
//                 </div>
//                 <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//                   <button onClick={() => setTimerRunning((r) => !r)} className="hbtn" style={{ background: timerRunning ? "linear-gradient(135deg,#dc2626,#ef4444)" : "linear-gradient(135deg,#059669,#10b981)", color: "white", border: "none", borderRadius: 9, padding: "10px 18px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>{timerRunning ? "Pause" : "Start"}</button>
//                   <button onClick={() => {
//                     const sec = timerSecRef.current;
//                     if (sec >= 30) {
//                       const sessionRecord = {
//                         date: today,
//                         seconds: sec,
//                         month: currentMonth,
//                         hour: nowObj.getHours(),
//                         problemId: linkedProblemId || null,
//                         problemName: linkedProblemId
//                           ? (problems.find((p) => p.id === linkedProblemId)?.name || "")
//                           : "",
//                         type: "solve",
//                       };
//                       setTimerSessions((prev) => [...prev, sessionRecord]);
//                     }
//                     if (linkedProblemId && sec >= 30) {
//                       const linkedName = problems.find((p) => p.id === linkedProblemId)?.name || "";
//                       setProblems((prev) => prev.map((p) => p.id !== linkedProblemId ? p : {
//                         ...p,
//                         timeLogs: [...(p.timeLogs || []), { date: today, seconds: sec, type: "solve" }],
//                         totalSolveTime: (p.totalSolveTime || 0) + sec,
//                         solveSessions: [...(p.solveSessions || []), { date: today, seconds: sec }],
//                       }));
//                       showToast('⏱ ' + fmtTime(sec) + ' saved to "' + linkedName + '"', "#eff6ff", "#bfdbfe");
//                       setLinkedProblemId(null);
//                     } else if (sec >= 30) {
//                       showToast("⏱ " + fmtTime(sec) + " session saved", "#eff6ff", "#bfdbfe");
//                     }
//                     setTimerRunning(false);
//                     setTimerSec(0);
//                     timerSecRef.current = 0;
//                     firedRemindersRef.current = new Set();
//                     setReminderFlash(null);
//                   }} style={{ background: T.mutedBg, color: T.subtext, border: "1px solid " + T.cardBorder, borderRadius: 9, padding: "10px 18px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>Save & Reset</button>
//                 </div>
//               </div>
//             </Card>
//           );
//         })()}

//         <Card bg="white" border="#e5e7eb">
//           <SH>Progress Overview</SH>
//           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
//             <span style={{ fontSize: 13, fontWeight: 700, color: "#4f46e5" }}>Solved</span>
//             <span style={{ fontSize: 13, fontWeight: 700, color: "#4f46e5" }}>{solved.length} / {problems.length} ({sPct}%)</span>
//           </div>
//           <div style={{ background: dark ? T.mutedBg : "#eff6ff", borderRadius: 99, height: 12, marginBottom: 12 }}>
//             <div style={{ background: "linear-gradient(90deg,#4f46e5,#7c3aed)", height: 12, borderRadius: 99, width: sPct + "%", transition: "width 0.6s" }} />
//           </div>
//           <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//             <span style={{ fontSize: 11, color: T.subtext }}>🔁 {due.length} due</span>
//             <span style={{ fontSize: 11, color: T.subtext }}>⭐ {bookmarked.length} starred</span>
//             <span style={{ marginLeft: "auto", fontSize: 12, color: "#7c3aed", fontWeight: 700, background: dark ? T.mutedBg : "#f5f3ff", padding: "2px 10px", borderRadius: 8, border: "1px solid " + (dark ? "#a78bfa44" : "#c4b5fd") }}>👑 {mastered.length} mastered → see Stats</span>
//           </div>
//         </Card>
//       </div>

//       <Card bg="white" border="#e5e7eb" style={{ marginBottom: 14 }}>
//         <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
//           <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Search problems..." style={{ flex: 1, minWidth: 200, padding: "9px 14px", borderRadius: 9, border: "1.5px solid " + T.inputBorder, fontSize: 13, background: T.inputBg, color: T.text }} />
//           <select value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)} style={{ padding: "9px 12px", borderRadius: 9, border: "1.5px solid " + T.inputBorder, fontSize: 12, background: T.inputBg, color: T.text }}>
//             <option value="">All topics</option>
//             {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
//           </select>
//           <select value={patternFilter} onChange={(e) => setPatternFilter(e.target.value)} style={{ padding: "9px 12px", borderRadius: 9, border: "1.5px solid " + T.inputBorder, fontSize: 12, background: T.inputBg, color: T.text }}>
//             <option value="">All patterns</option>
//             {PATTERNS.map((p) => <option key={p} value={p}>{p}</option>)}
//           </select>
//           <button onClick={openAdd} className="hbtn" style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "white", border: "none", borderRadius: 9, padding: "9px 20px", cursor: "pointer", fontSize: 13, fontWeight: 700, boxShadow: "0 4px 14px rgba(79,70,229,0.35)", whiteSpace: "nowrap" }}>+ Add Problem</button>
//         </div>
//         <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap", alignItems: "center" }}>
//           {[{ f: "All", bg: "#eff6ff", border: "#bfdbfe", tc: "#1d4ed8" }, { f: "Unsolved", bg: "#fef2f2", border: "#fca5a5", tc: "#dc2626" }, { f: "Solved", bg: "#ecfdf5", border: "#86efac", tc: "#16a34a" }, { f: "Mastered", bg: "#fef9c3", border: "#fde047", tc: "#ca8a04" }, { f: "Starred", bg: "#fffbeb", border: "#fcd34d", tc: "#d97706" }].map(({ f, bg, border, tc }) => (
//             <button key={f} onClick={() => setFilter(f)} style={{ padding: "5px 14px", borderRadius: 99, border: "1.5px solid " + (filter === f ? border : T.chipBorder), cursor: "pointer", fontSize: 12, fontWeight: 700, background: filter === f ? bg : T.chipBg, color: filter === f ? tc : T.subtext }}>{f}</button>
//           ))}
//           <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
//             <span style={{ fontSize: 12, color: T.subtext }}>{filtered.length} problem{filtered.length !== 1 ? "s" : ""}</span>
//             <div style={{ display: "flex", border: "1.5px solid " + T.chipBorder, borderRadius: 9, overflow: "hidden" }}>
//               {[{ v: "flat", label: "≡ Flat" }, { v: "grouped", label: "⊞ Grouped" }].map(({ v, label }) => (
//                 <button key={v} onClick={() => setTrackerView(v)} style={{ padding: "5px 12px", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, background: trackerView === v ? "linear-gradient(135deg,#4f46e5,#7c3aed)" : T.chipBg, color: trackerView === v ? "white" : T.subtext }}>{label}</button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </Card>

//       {filtered.length === 0 && (
//         <Card bg="#f5f3ff" border="#c4b5fd" style={{ textAlign: "center", padding: 48 }}>
//           {problems.length === 0 ? (
//             <div><div style={{ fontSize: 44, marginBottom: 12 }}>🎯</div><div style={{ fontWeight: 700, fontSize: 16 }}>No problems yet!</div><div style={{ fontSize: 13, color: T.subtext, marginTop: 6 }}>Click "+ Add Problem" to start your journey</div></div>
//           ) : <div style={{ color: T.subtext, fontSize: 14 }}>No problems match the current filters.</div>}
//         </Card>
//       )}

//       {/* GROUPED VIEW */}
//       {trackerView === "grouped" && filtered.length > 0 && (() => {
//         const grouped = {};
//         filtered.forEach((p) => {
//           const sec = p.section || "Unsorted";
//           const sub = p.subSection || "General";
//           if (!grouped[sec]) grouped[sec] = {};
//           if (!grouped[sec][sub]) grouped[sec][sub] = [];
//           grouped[sec][sub].push(p);
//         });
//         return Object.entries(grouped).map(([sec, subSecs]) => {
//           const secOpen = !collapsedSections[sec];
//           const totalInSec = Object.values(subSecs).flat().length;
//           const solvedInSec = Object.values(subSecs).flat().filter(p => p.status !== "Unsolved").length;
//           const solvedPct = totalInSec ? Math.round(solvedInSec / totalInSec * 100) : 0;
//           return (
//             <div key={sec} style={{ marginBottom: 14, borderRadius: 12, overflow: "hidden", border: "1.5px solid " + (dark ? "#2d2d4e" : "#e0e7ff"), boxShadow: "0 2px 8px rgba(79,70,229,0.08)" }}>
//               <div onClick={() => toggleSection(sec)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: dark ? "#1e1b4b" : "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "white", cursor: "pointer", userSelect: "none" }}>
//                 <span style={{ fontSize: 13, transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)", display: "inline-block", transform: secOpen ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
//                 <span style={{ fontSize: 15 }}>📂</span>
//                 <span style={{ fontWeight: 700, fontSize: 14, flex: 1 }}>{sec}</span>
//                 <div style={{ width: 60, height: 5, background: "rgba(255,255,255,0.2)", borderRadius: 99, overflow: "hidden", marginRight: 6 }}>
//                   <div style={{ height: 5, width: solvedPct + "%", background: "rgba(255,255,255,0.85)", borderRadius: 99, transition: "width 0.5s" }} />
//                 </div>
//                 <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 99, padding: "2px 10px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>{solvedInSec}/{totalInSec}</span>
//               </div>
//               <div className={"collapsible" + (secOpen ? " open" : "")}>
//                 <div className="collapsible-inner">
//                   {Object.entries(subSecs).map(([sub, probs]) => {
//                     const subKey = sec + "|" + sub;
//                     const subOpen = !collapsedSubSecs[subKey];
//                     const solvedInSub = probs.filter(p => p.status !== "Unsolved").length;
//                     const masteredInSub = probs.filter(p => p.revStage >= 4).length;
//                     const subPct = probs.length ? Math.round(solvedInSub / probs.length * 100) : 0;
//                     return (
//                       <div key={sub} style={{ borderTop: "1px solid " + (dark ? "#2d2d4e" : "#c7d2fe") }}>
//                         <div onClick={() => toggleSubSec(subKey)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", background: dark ? "#1a1a2e" : "#eef2ff", cursor: "pointer", userSelect: "none" }}>
//                           <span style={{ fontSize: 11, transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)", display: "inline-block", transform: subOpen ? "rotate(90deg)" : "rotate(0deg)", color: dark ? "#a78bfa" : "#4f46e5" }}>▶</span>
//                           <span style={{ fontSize: 13 }}>📄</span>
//                           <span style={{ fontWeight: 700, fontSize: 12, color: dark ? "#a78bfa" : "#4f46e5", flex: 1 }}>{sub}</span>
//                           {masteredInSub > 0 && <span style={{ fontSize: 10, background: dark ? "#14281f" : "#d1fae5", color: "#059669", borderRadius: 5, padding: "1px 7px", fontWeight: 700, marginRight: 6 }}>👑 {masteredInSub}</span>}
//                           <div style={{ width: 44, height: 4, background: dark ? "#2d2d4e" : "#c7d2fe", borderRadius: 99, overflow: "hidden", marginRight: 6 }}>
//                             <div style={{ height: 4, width: subPct + "%", background: "linear-gradient(90deg,#4f46e5,#7c3aed)", borderRadius: 99, transition: "width 0.5s" }} />
//                           </div>
//                           <span style={{ fontSize: 11, color: dark ? "#a78bfa" : "#6366f1", fontWeight: 600, whiteSpace: "nowrap" }}>{solvedInSub}/{probs.length}</span>
//                         </div>
//                         <div className={"collapsible" + (subOpen ? " open" : "")}>
//                           <div className="collapsible-inner" style={{ padding: "8px 12px", background: dark ? T.cardBg : "white" }}>
//                             {probs.map((p) => {
//                               const rm = REV_META[p.revStage] || REV_META[0], ct = TCd(p.topic);
//                               return (
//                                 <div key={p.id} className="prow" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: 9, marginBottom: 5, background: p.revStage >= 4 ? dark ? "#14281f" : "#f0fdf4" : dark ? T.rowAlt : "#f9fafb", border: "1px solid " + (p.revStage >= 4 ? "#86efac" : p.bookmarked ? "#fbbf24" : T.cardBorder) }}>
//                                   <div style={{ flex: 1, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
//                                     {p.bookmarked && <span style={{ fontSize: 12 }}>⭐</span>}
//                                     <span style={{ fontWeight: 700, fontSize: 13 }}>
//                                       {p.link ? <a href={p.link} target="_blank" rel="noreferrer" style={{ color: p.topic ? TCd(p.topic).pill : "#4f46e5", textDecoration: "none" }}>{p.name} ↗</a> : p.name}
//                                     </span>
//                                     {p.topic && <Pill label={p.topic} bg={ct.bg} border={ct.border} text={ct.text} sm />}
//                                     {p.difficulty && <Pill label={p.difficulty} bg={p.difficulty === "Hard" ? "#fef2f2" : p.difficulty === "Medium" ? "#fffbeb" : "#f0fdf4"} border={p.difficulty === "Hard" ? "#fca5a5" : p.difficulty === "Medium" ? "#fcd34d" : "#86efac"} text={p.difficulty === "Hard" ? "#991b1b" : p.difficulty === "Medium" ? "#92400e" : "#166534"} sm />}
//                                     {p.revStage >= 4 && <Pill label="👑 Mastered" bg="#d1fae5" border="#34d399" text="#065f46" sm />}
//                                     {p.status !== "Unsolved" && p.revStage < 4 && <Pill label={"Rev " + p.revStage + "/4"} bg={rm.bg} border={rm.border} text={rm.text} sm />}
//                                     {p.status === "Unsolved" && <Pill label="Unsolved" bg="#f8fafc" border="#cbd5e1" text="#64748b" sm />}
//                                   </div>
//                                   <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
//                                     {p.status === "Unsolved" && <button onClick={() => markSolved(p.id)} className="hbtn" style={{ background: "linear-gradient(135deg,#059669,#10b981)", color: "white", border: "none", borderRadius: 7, padding: "5px 11px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>✓</button>}
//                                     <button onClick={() => toggleBM(p.id)} style={{ background: p.bookmarked ? "#fffbeb" : T.chipBg, color: p.bookmarked ? "#d97706" : T.subtext, border: "1.5px solid " + (p.bookmarked ? "#fcd34d" : T.chipBorder), borderRadius: 7, padding: "5px 8px", cursor: "pointer", fontSize: 12 }}>⭐</button>
//                                     <button onClick={() => openEdit(p)} style={{ background: "#f0f9ff", color: "#0369a1", border: "1.5px solid #bae6fd", borderRadius: 7, padding: "5px 8px", cursor: "pointer", fontSize: 12 }}>✏️</button>
//                                     <button onClick={() => delP(p.id)} style={{ background: "#fef2f2", color: "#dc2626", border: "1.5px solid #fca5a5", borderRadius: 7, padding: "5px 8px", cursor: "pointer", fontSize: 12 }}>🗑</button>
//                                   </div>
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           );
//         });
//       })()}

//       {/* FLAT VIEW */}
//       {trackerView === "flat" && filtered.map((p) => {
//         const rm = REV_META[p.revStage] || REV_META[0], ct = TCd(p.topic);
//         const rowBg = p.revStage >= 4 ? dark ? "#14281f" : "#f0fdf4" : p.status === "Unsolved" ? T.cardBg : dark ? T.rowAlt : rm.bg;
//         const rowBd = p.revStage >= 4 ? "#86efac" : p.bookmarked ? "#fbbf24" : p.status === "Unsolved" ? T.cardBorder : dark ? rm.dot + "44" : rm.border;
//         return (
//           <div key={p.id} className="prow" style={{ background: rowBg, border: "1.5px solid " + rowBd, borderRadius: 12, padding: "14px 18px", marginBottom: 8 }}>
//             {(p.section || p.subSection) && (
//               <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: T.subtext, marginBottom: 7, paddingBottom: 7, borderBottom: "1px solid " + T.cardBorder }}>
//                 <span style={{ fontSize: 11 }}>📂</span>
//                 <span style={{ color: "#4f46e5", fontWeight: 700 }}>{p.section || "—"}</span>
//                 <span style={{ opacity: 0.4 }}>›</span>
//                 <span style={{ color: "#7c3aed", fontWeight: 600 }}>{p.subSection || "—"}</span>
//               </div>
//             )}
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
//               <div style={{ flex: 1 }}>
//                 <div style={{ display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center", marginBottom: 6 }}>
//                   {p.bookmarked && <span style={{ fontSize: 14 }}>⭐</span>}
//                   {p.topic      && <Pill label={p.topic} bg={ct.bg} border={ct.border} text={ct.text} />}
//                   {p.difficulty && <Pill label={p.difficulty} bg={p.difficulty === "Hard" ? "#fef2f2" : p.difficulty === "Medium" ? "#fffbeb" : "#f0fdf4"} border={p.difficulty === "Hard" ? "#fca5a5" : p.difficulty === "Medium" ? "#fcd34d" : "#86efac"} text={p.difficulty === "Hard" ? "#991b1b" : p.difficulty === "Medium" ? "#92400e" : "#166534"} />}
//                   {p.revStage >= 4            && <Pill label="Mastered" bg="#d1fae5" border="#34d399" text="#065f46" />}
//                   {p.status !== "Unsolved" && p.revStage < 4 && <Pill label={"Rev " + p.revStage + "/4"} bg={rm.bg} border={rm.border} text={rm.text} />}
//                   {p.status === "Unsolved"    && <Pill label="Unsolved" bg="#f8fafc" border="#cbd5e1" text="#64748b" />}
//                 </div>
//                 <div style={{ fontWeight: 700, fontSize: 14 }}>
//                   {p.link ? <a href={p.link} target="_blank" rel="noreferrer" style={{ color: p.topic ? TCd(p.topic).pill : "#4f46e5", textDecoration: "none" }}>{p.name} ↗</a> : p.name}
//                 </div>
//                 {(p.pattern || []).length > 0 && <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 5 }}>{p.pattern.map((pt) => <Pill key={pt} label={pt} bg="#f5f3ff" border="#c4b5fd" text="#5b21b6" sm />)}</div>}
//                 {p.note && <div style={{ fontSize: 12, color: T.subtext, marginTop: 5, borderLeft: "3px solid " + (dark ? "#334155" : "#e5e7eb"), paddingLeft: 9, lineHeight: 1.5 }}>📝 {p.note}</div>}
//                 {p.codeSnippet && <div className="mono" style={{ marginTop: 6, background: "#1e293b", borderRadius: 8, padding: "8px 12px", fontSize: 11, color: "#a78bfa", whiteSpace: "pre-wrap", overflowX: "auto" }}>💻 {p.codeSnippet}</div>}
//                 {((p.totalSolveTime || 0) > 0 || (p.totalRevTime || 0) > 0) && (
//                   <div style={{ display: "flex", gap: 8, marginTop: 5, flexWrap: "wrap" }}>
//                     {(p.totalSolveTime || 0) > 0 && (
//                       <span style={{ fontSize: 10, background: dark ? "#1e293b" : "#eff6ff", color: "#4f46e5", borderRadius: 5, padding: "2px 8px", fontWeight: 600, border: "1px solid " + (dark ? "#4f46e544" : "#bfdbfe") }}>
//                         ⏱ Solve: {fmtHours(p.totalSolveTime)}
//                       </span>
//                     )}
//                     {(p.totalRevTime || 0) > 0 && (
//                       <span style={{ fontSize: 10, background: dark ? "#14281f" : "#f0fdf4", color: "#059669", borderRadius: 5, padding: "2px 8px", fontWeight: 600, border: "1px solid " + (dark ? "#34d39944" : "#86efac") }}>
//                         🔁 Rev: {fmtHours(p.totalRevTime)}
//                       </span>
//                     )}
//                     {(p.timeLogs || []).length > 0 && (
//                       <span style={{ fontSize: 10, color: T.subtext }}>
//                         · {(p.timeLogs || []).length} session{(p.timeLogs || []).length !== 1 ? "s" : ""}
//                       </span>
//                     )}
//                   </div>
//                 )}
//                 {p.status !== "Unsolved" && p.revStage < 4 && (
//                   <div style={{ marginTop: 8 }}>
//                     <div style={{ display: "flex", gap: 3, marginBottom: 3 }}>{REV_META.map((_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: i < p.revStage ? "#10b981" : i === p.revStage ? rm.dot : dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }} />)}</div>
//                     <div style={{ fontSize: 11, color: T.subtext }}>Next: {rm.desc} · {getNR(p)}</div>
//                   </div>
//                 )}
//               </div>
//               <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
//                 {p.status === "Unsolved" && <button onClick={() => markSolved(p.id)} className="hbtn" style={{ background: "linear-gradient(135deg,#059669,#10b981)", color: "white", border: "none", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>✓ Solve</button>}
//                 <button
//                   onClick={() => {
//                     if (linkedProblemId === p.id) { setLinkedProblemId(null); }
//                     else { setLinkedProblemId(p.id); setTimerRunning(false); setTimerSec(0); timerSecRef.current = 0; firedRemindersRef.current = new Set(); setReminderFlash(null); showToast('⏱ Timer linked to "' + p.name + '"', "#eff6ff", "#bfdbfe"); }
//                   }}
//                   title={linkedProblemId === p.id ? "Unlink timer" : "Link timer to this problem"}
//                   style={{ background: linkedProblemId === p.id ? "#eff6ff" : T.chipBg, color: linkedProblemId === p.id ? "#4f46e5" : T.subtext, border: "1.5px solid " + (linkedProblemId === p.id ? "#4f46e5" : T.chipBorder), borderRadius: 8, padding: "7px 10px", cursor: "pointer", fontSize: 13, fontWeight: linkedProblemId === p.id ? 700 : 400 }}>
//                   ⏱
//                 </button>
//                 <button onClick={() => toggleBM(p.id)} style={{ background: p.bookmarked ? "#fffbeb" : T.chipBg, color: p.bookmarked ? "#d97706" : T.subtext, border: "1.5px solid " + (p.bookmarked ? "#fcd34d" : T.chipBorder), borderRadius: 8, padding: "7px 10px", cursor: "pointer", fontSize: 13 }}>⭐</button>
//                 <button onClick={() => openEdit(p)} style={{ background: "#f0f9ff", color: "#0369a1", border: "1.5px solid #bae6fd", borderRadius: 8, padding: "7px 10px", cursor: "pointer", fontSize: 13 }}>✏️</button>
//                 <button onClick={() => delP(p.id)} style={{ background: "#fef2f2", color: "#dc2626", border: "1.5px solid #fca5a5", borderRadius: 8, padding: "7px 10px", cursor: "pointer", fontSize: 13 }}>🗑</button>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );

//   /* ─── NOTES TAB ─── */
//   const NotesTab = () => (
//     <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 18, height: "calc(100vh - 140px)" }}>
//       <div style={{ background: T.cardBg, border: "1.5px solid " + T.cardBorder, borderRadius: 14, padding: "14px 12px", overflowY: "auto" }}>
//         <SH size={13}>Topics</SH>
//         {TOPICS.map((t) => {
//           const ct = TCd(t), has = topicNotes[t] && topicNotes[t].trim().length > 0;
//           return (
//             <button key={t} onClick={() => setNotesTopic(t)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: 9, border: "1.5px solid " + (notesTopic === t ? ct.pill : T.chipBorder), cursor: "pointer", fontSize: 12, fontWeight: 600, background: notesTopic === t ? ct.bg : T.chipBg, color: notesTopic === t ? ct.text : T.subtext, marginBottom: 5, transition: "all 0.15s", textAlign: "left" }}>
//               <span>{t}</span>
//               {has && <span style={{ width: 6, height: 6, borderRadius: "50%", background: ct.pill, display: "inline-block", flexShrink: 0 }} />}
//             </button>
//           );
//         })}
//       </div>
//       <div style={{ display: "flex", flexDirection: "column" }}>
//         <div style={{ background: T.cardBg, border: "1.5px solid " + T.cardBorder, borderRadius: 14, padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
//             <div style={{ fontWeight: 700, fontSize: 18, color: notesCt.pill }}>{notesTopic}</div>
//             <div style={{ display: "flex", gap: 16, fontSize: 12, color: T.subtext }}>
//               <span>{solved.filter((p) => p.topic === notesTopic).length}/{problems.filter((p) => p.topic === notesTopic).length} solved</span>
//               <span>{(topicNotes[notesTopic] || "").length} chars</span>
//               <span style={{ color: "#16a34a", fontWeight: 600 }}>✓ Auto-saved</span>
//             </div>
//           </div>
//           <textarea
//             value={topicNotes[notesTopic] || ""}
//             onChange={(e) => setTopicNotes((prev) => ({ ...prev, [notesTopic]: e.target.value }))}
//             placeholder={"Notes for " + notesTopic + "...\n\n- Key pattern\n- Time complexity / Space complexity\n- Common gotchas\n- Memory tricks\n- Template code"}
//             style={{ flex: 1, padding: "14px 16px", borderRadius: 11, border: "1.5px solid " + notesCt.border, fontSize: 14, resize: "none", background: dark ? T.inputBg : notesCt.bg, color: notesCt.text, lineHeight: 1.8, fontFamily: "system-ui, sans-serif" }}
//           />
//         </div>
//       </div>
//     </div>
//   );

//   /* ─── STATS TAB ─── */

//   // ── Cumulative solved chart data (last 90 days) ──
//   const cumulativeData = (() => {
//     const pts = [];
//     for (let i = 89; i >= 0; i--) {
//       const d = new Date(today); d.setDate(d.getDate() - i);
//       const ds = d.toISOString().split("T")[0];
//       const count = problems.filter((p) => p.solvedDate && p.solvedDate <= ds && p.status !== "Unsolved").length;
//       pts.push({ date: ds, count, label: d.getDate() === 1 ? d.toLocaleString("en", { month: "short" }) : "" });
//     }
//     return pts;
//   })();
//   const cumulativeMax = Math.max(1, ...cumulativeData.map((d) => d.count));

//   // ── Solve time histogram (5-min buckets, 0–60min) ──
//   const histBuckets = Array.from({ length: 12 }, (_, i) => ({
//     label: i === 11 ? "60m+" : i * 5 + "–" + (i * 5 + 5) + "m",
//     min: i * 5 * 60,
//     max: i === 11 ? Infinity : (i + 1) * 5 * 60,
//     count: 0,
//   }));
//   timerSessions.filter((s) => s.seconds >= 30).forEach((s) => {
//     const bucket = histBuckets.find((b) => s.seconds >= b.min && s.seconds < b.max);
//     if (bucket) bucket.count++;
//   });
//   const histMax = Math.max(1, ...histBuckets.map((b) => b.count));

//   // ── Revision quality sparklines (last 10 revisions per topic) ──
//   const revHistoryByTopic = (() => {
//     const map = {};
//     problems.forEach((p) => {
//       if (!p.topic || !(p.revHistory || []).length) return;
//       if (!map[p.topic]) map[p.topic] = [];
//       p.revHistory.forEach((h) => map[p.topic].push({ date: h.date, result: h.result }));
//     });
//     Object.keys(map).forEach((t) => {
//       map[t] = map[t].sort((a, b) => a.date.localeCompare(b.date)).slice(-10);
//     });
//     return map;
//   })();

//   const StatsTab = () => (
//     <div>
//       <div style={{ background: "linear-gradient(135deg,#0f0c29,#312e81)", borderRadius: 18, padding: "22px 28px", marginBottom: 18, color: "white", display: "flex", alignItems: "center", gap: 20 }}>
//         <div style={{ fontSize: 56, animation: "float 3s ease-in-out infinite" }}>{level.emoji}</div>
//         <div style={{ flex: 1 }}>
//           <div style={{ fontWeight: 700, fontSize: 24, background: level.bar, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: -0.5 }}>{level.name}</div>
//           <div style={{ fontSize: 13, opacity: 0.55, marginTop: 3 }}>{solved.length} solved · {xp} XP · {mastered.length} mastered</div>
//           <div style={{ marginTop: 10, background: "rgba(255,255,255,0.12)", borderRadius: 99, height: 9 }}>
//             <div style={{ background: level.bar, height: 9, borderRadius: 99, width: lvlPct + "%", transition: "width 0.7s" }} />
//           </div>
//           {nextLvl && <div style={{ fontSize: 11, opacity: 0.45, marginTop: 4 }}>{nextLvl.min - solved.length} more problems to {nextLvl.name}</div>}
//         </div>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
//           {[{ l: "Streak", v: "🔥 " + streak.count }, { l: "XP", v: xp }, { l: "Solved", v: solved.length }, { l: "Mastered", v: mastered.length }].map((s, i) => (
//             <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
//               <div style={{ fontSize: 18, fontWeight: 700 }}>{s.v}</div>
//               <div style={{ fontSize: 10, opacity: 0.5, textTransform: "uppercase", letterSpacing: 0.5, marginTop: 2 }}>{s.l}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ── Cumulative Solved Chart — FIXED with HTML overlay labels ── */}
//       <Card bg={dark ? "#1a1a2e" : "white"} border={dark ? "#2d2d4e" : "#e5e7eb"} style={{ marginBottom: 18 }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
//           <div>
//             <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.3, color: T.text, marginBottom: 2 }}>📈 Cumulative Problems Solved</div>
//             <div style={{ fontSize: 11, color: T.subtext }}>Last 90 days · the curve always goes up</div>
//           </div>
//           <div style={{ textAlign: "right" }}>
//             <div style={{ fontSize: 22, fontWeight: 700, color: "#4f46e5" }}>{solved.length}</div>
//             <div style={{ fontSize: 10, color: T.subtext, textTransform: "uppercase", letterSpacing: 0.5 }}>total solved</div>
//           </div>
//         </div>
//         {solved.length === 0 ? (
//           <div style={{ fontSize: 13, color: T.subtext, textAlign: "center", padding: "24px 0" }}>Solve your first problem to see the curve grow!</div>
//         ) : (
//           <div style={{ display: "flex", gap: 0 }}>
//             {/* Y-axis */}
//             <div style={{ width: 30, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingBottom: 18, flexShrink: 0, height: 110 }}>
//               {[cumulativeMax, Math.round(cumulativeMax / 2), 0].map((v, i) => (
//                 <span key={i} style={{ fontSize: 9, color: T.subtext, textAlign: "right", paddingRight: 5 }}>{v}</span>
//               ))}
//             </div>
//             {/* Chart area with relative wrapper so HTML labels can overlay the SVG */}
//             <div style={{ flex: 1, position: "relative" }}>
//               {/* HTML milestone labels — rendered on top of SVG, no stretching */}
//               {LEVELS.filter((l) => l.min > 0 && l.min <= cumulativeMax).map((l) => {
//                 // SVG is 110px tall; viewBox y goes 0–100. So pixel top = svgY * 1.1
//                 // SVG y for milestone line: 100 - (l.min/cumulativeMax)*96
//                 const pxTop = (100 - (l.min / cumulativeMax) * 96) * 1.1;
//                 return (
//                   <div
//                     key={l.name}
//                     style={{
//                       position: "absolute",
//                       top: Math.max(0, pxTop - 9) + "px",
//                       right: 4,
//                       fontSize: 10,
//                       fontWeight: 700,
//                       color: l.accent,
//                       background: dark ? "rgba(26,26,46,0.85)" : "rgba(255,255,255,0.85)",
//                       padding: "1px 6px",
//                       borderRadius: 4,
//                       pointerEvents: "none",
//                       lineHeight: 1.4,
//                       whiteSpace: "nowrap",
//                       zIndex: 2,
//                     }}
//                   >
//                     {l.emoji} {l.name}
//                   </div>
//                 );
//               })}
//               <svg width="100%" height="110" viewBox={"0 0 " + cumulativeData.length + " 100"} preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
//                 <defs>
//                   <linearGradient id="cumGrad" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
//                     <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.02" />
//                   </linearGradient>
//                 </defs>
//                 {/* Grid lines */}
//                 {[0, 50, 100].map((y, i) => (
//                   <line key={i} x1="0" y1={y} x2={cumulativeData.length} y2={y} stroke={dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeWidth="0.5" />
//                 ))}
//                 {/* Level milestone lines (no SVG text — HTML labels above instead) */}
//                 {LEVELS.filter((l) => l.min > 0 && l.min <= cumulativeMax).map((l) => {
//                   const y = 100 - (l.min / cumulativeMax) * 96;
//                   return (
//                     <line key={l.name} x1="0" y1={y} x2={cumulativeData.length} y2={y} stroke={l.accent} strokeWidth="0.4" strokeDasharray="2,3" opacity="0.6" />
//                   );
//                 })}
//                 {/* Area fill */}
//                 <polyline
//                   fill="url(#cumGrad)" stroke="none"
//                   points={cumulativeData.map((d, i) => i + "," + (100 - (d.count / cumulativeMax) * 96)).join(" ") + " " + (cumulativeData.length - 1) + ",100 0,100"}
//                 />
//                 {/* Line */}
//                 <polyline
//                   fill="none" stroke="#4f46e5" strokeWidth="0.8"
//                   strokeLinejoin="round" strokeLinecap="round"
//                   points={cumulativeData.map((d, i) => i + "," + (100 - (d.count / cumulativeMax) * 96)).join(" ")}
//                 />
//                 {/* Today dot */}
//                 <circle cx={cumulativeData.length - 1} cy={100 - (cumulativeData[cumulativeData.length - 1].count / cumulativeMax) * 96} r="1.8" fill="#4f46e5" stroke="white" strokeWidth="0.5" />
//               </svg>
//               {/* Month labels */}
//               <div style={{ display: "flex" }}>
//                 {cumulativeData.map((d, i) => (
//                   <div key={i} style={{ flex: 1 }}>
//                     {d.label && <span style={{ fontSize: 9, color: T.subtext, fontWeight: 600 }}>{d.label}</span>}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </Card>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
//         {/* ── Solve Time Histogram ── */}
//         <Card bg="white" border="#e5e7eb">
//           <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.3, color: T.text, marginBottom: 4 }}>⏱ Solve Time Distribution</div>
//           <div style={{ fontSize: 11, color: T.subtext, marginBottom: 14 }}>How long your sessions actually take · target is 15–20 mins</div>
//           {timerSessions.filter((s) => s.seconds >= 30).length === 0 ? (
//             <div style={{ fontSize: 13, color: T.subtext }}>No sessions yet. Start the timer when solving!</div>
//           ) : (
//             <div>
//               {/* Bars */}
//               <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 80, marginBottom: 6 }}>
//                 {histBuckets.map((b, i) => {
//                   const pct = b.count ? Math.max(6, Math.round(b.count / histMax * 100)) : 0;
//                   const isTarget = b.min >= 15 * 60 && b.min < 20 * 60;
//                   const isOver   = b.min >= 20 * 60;
//                   const barColor = isOver
//                     ? "linear-gradient(180deg,#ef4444,#f87171)"
//                     : isTarget
//                     ? "linear-gradient(180deg,#059669,#34d399)"
//                     : "linear-gradient(180deg,#4f46e5,#7c3aed)";
//                   return (
//                     <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
//                       {b.count > 0 && (
//                         <span style={{ fontSize: 8, color: T.subtext, fontWeight: 600 }}>{b.count}</span>
//                       )}
//                       <div
//                         title={b.label + ": " + b.count + " sessions"}
//                         style={{ width: "100%", height: b.count ? pct + "%" : "3%", borderRadius: "3px 3px 0 0", background: b.count ? barColor : (dark ? "#1e293b" : "#f1f5f9"), transition: "height 0.5s", minHeight: 3 }}
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//               {/* X labels — show every 2nd */}
//               <div style={{ display: "flex", gap: 3 }}>
//                 {histBuckets.map((b, i) => (
//                   <div key={i} style={{ flex: 1, textAlign: "center" }}>
//                     {i % 2 === 0 && <span style={{ fontSize: 7.5, color: T.subtext }}>{i * 5}m</span>}
//                   </div>
//                 ))}
//               </div>
//               {/* Legend */}
//               <div style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 10, flexWrap: "wrap" }}>
//                 {[{ c: "#4f46e5", l: "Under target" }, { c: "#059669", l: "On target (15–20m)" }, { c: "#ef4444", l: "Over 20m" }].map((s, i) => (
//                   <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
//                     <div style={{ width: 8, height: 8, borderRadius: 2, background: s.c }} />
//                     <span style={{ color: T.subtext }}>{s.l}</span>
//                   </div>
//                 ))}
//               </div>
//               {/* Stats summary */}
//               {(() => {
//                 const validSessions = timerSessions.filter((s) => s.seconds >= 30);
//                 const avgSec = validSessions.length ? Math.round(validSessions.reduce((a, s) => a + s.seconds, 0) / validSessions.length) : 0;
//                 const onTarget = validSessions.filter((s) => s.seconds >= 15 * 60 && s.seconds <= 20 * 60).length;
//                 const onTargetPct = validSessions.length ? Math.round(onTarget / validSessions.length * 100) : 0;
//                 return (
//                   <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
//                     <span style={{ fontSize: 11, background: dark ? T.mutedBg : "#eff6ff", color: "#4f46e5", borderRadius: 6, padding: "3px 9px", fontWeight: 600 }}>Avg: {fmtTime(avgSec)}</span>
//                     <span style={{ fontSize: 11, background: dark ? "#14281f" : "#f0fdf4", color: "#059669", borderRadius: 6, padding: "3px 9px", fontWeight: 600 }}>On target: {onTargetPct}%</span>
//                     <span style={{ fontSize: 11, color: T.subtext }}>{validSessions.length} sessions total</span>
//                   </div>
//                 );
//               })()}
//             </div>
//           )}
//         </Card>

//         {/* ── Revision Quality Sparklines ── */}
//         <Card bg="white" border="#e5e7eb">
//           <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.3, color: T.text, marginBottom: 4 }}>✨ Revision Quality Trends</div>
//           <div style={{ fontSize: 11, color: T.subtext, marginBottom: 14 }}>Last 10 revisions per topic · green = Easy, red = Hard</div>
//           {TOPICS.filter((t) => revQuality[t] || revHistoryByTopic[t]).length === 0 ? (
//             <div style={{ fontSize: 13, color: T.subtext }}>No revisions yet!</div>
//           ) : (
//             TOPICS.filter((t) => revQuality[t]).map((t) => {
//               const q         = getQuality(t);
//               const ct        = TCd(t);
//               const rq        = revQuality[t];
//               const spark     = revHistoryByTopic[t] || [];
//               const color     = q === null ? "#94a3b8" : q >= 70 ? "#059669" : q >= 40 ? "#d97706" : "#dc2626";
//               const qbg       = q === null ? "#f1f5f9" : q >= 70 ? "#d1fae5" : q >= 40 ? "#fef3c7" : "#fee2e2";
//               const totalRevs = rq.easy + rq.hard;
//               return (
//                 <div key={t} style={{ marginBottom: 12, padding: "8px 12px", background: dark ? T.rowAlt : ct.bg, border: "1px solid " + ct.border, borderRadius: 10 }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
//                     <span style={{ fontSize: 12, fontWeight: 700, color: ct.text }}>{t}</span>
//                     <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
//                       <span style={{ fontSize: 10, color: T.subtext }}>{rq.easy}E/{rq.hard}H</span>
//                       {q === null ? (
//                         <span style={{ fontSize: 10, color: T.subtext, background: dark ? T.mutedBg : "#f1f5f9", padding: "1px 7px", borderRadius: 5 }}>
//                           Need {3 - totalRevs} more
//                         </span>
//                       ) : (
//                         <span style={{ fontSize: 11, fontWeight: 700, background: qbg, color, padding: "2px 9px", borderRadius: 5 }}>{q}%</span>
//                       )}
//                     </div>
//                   </div>
//                   {/* Sparkline dots */}
//                   {spark.length > 0 && (
//                     <div style={{ display: "flex", gap: 3, alignItems: "center", marginBottom: 4 }}>
//                       {spark.map((h, i) => (
//                         <div
//                           key={i}
//                           title={h.date + " · " + h.result}
//                           style={{
//                             width: 10, height: 10, borderRadius: 3, flexShrink: 0,
//                             background: h.result === "easy"
//                               ? "linear-gradient(135deg,#059669,#34d399)"
//                               : "linear-gradient(135deg,#dc2626,#f87171)",
//                             boxShadow: h.result === "easy"
//                               ? "0 1px 3px rgba(5,150,105,0.3)"
//                               : "0 1px 3px rgba(220,38,38,0.3)",
//                           }}
//                         />
//                       ))}
//                       {spark.length < 10 && (
//                         <span style={{ fontSize: 9, color: T.subtext, marginLeft: 2 }}>← last {spark.length}</span>
//                       )}
//                       {/* Trend arrow */}
//                       {spark.length >= 4 && (() => {
//                         const half = Math.floor(spark.length / 2);
//                         const recentEasy = spark.slice(half).filter((h) => h.result === "easy").length / (spark.length - half);
//                         const olderEasy  = spark.slice(0, half).filter((h) => h.result === "easy").length / half;
//                         const diff = recentEasy - olderEasy;
//                         if (Math.abs(diff) < 0.15) return null;
//                         return (
//                           <span style={{ marginLeft: 4, fontSize: 13, color: diff > 0 ? "#059669" : "#dc2626" }} title={diff > 0 ? "Improving" : "Declining"}>
//                             {diff > 0 ? "↗" : "↘"}
//                           </span>
//                         );
//                       })()}
//                     </div>
//                   )}
//                   {/* Progress bar */}
//                   <div style={{ background: dark ? T.mutedBg : "rgba(0,0,0,0.06)", borderRadius: 99, height: 4 }}>
//                     <div style={{ background: color === "#059669" ? "linear-gradient(90deg,#059669,#34d399)" : color === "#d97706" ? "linear-gradient(90deg,#d97706,#fbbf24)" : color === "#dc2626" ? "linear-gradient(90deg,#dc2626,#f87171)" : "#94a3b8", height: 4, borderRadius: 99, width: (q || 0) + "%", transition: "width 0.5s" }} />
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </Card>

//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
//         <Card bg={dark ? "#1a1f2e" : "#eff6ff"} border={dark ? "#1e3a5f" : "#bfdbfe"}>
//           <SH color="#1d4ed8">Time Invested</SH>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 9, marginBottom: 10 }}>
//             {[{ l: "This week", v: weekSeconds, c: "#4f46e5" }, { l: "This month", v: monthSeconds, c: "#7c3aed" }, { l: "All time", v: totalSeconds, c: "#0891b2" }].map((s, i) => (
//               <div key={i} style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)", borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
//                 <div style={{ fontSize: 18, fontWeight: 700, color: s.c }}>{fmtHours(s.v) || "0m"}</div>
//                 <div style={{ fontSize: 10, color: T.subtext, marginTop: 3, textTransform: "uppercase" }}>{s.l}</div>
//               </div>
//             ))}
//           </div>
//           <div style={{ fontSize: 12, color: T.subtext }}>{timerSessions.length} sessions{totalSeconds > 0 && timerSessions.length > 0 ? " · avg " + fmtHours(Math.round(totalSeconds / timerSessions.length)) + "/session" : ""}</div>
//         </Card>

//         <Card bg={dark ? "#1a1f2e" : "#fef9c3"} border={dark ? "#78350f" : "#fde047"}>
//           <SH color="#92400e">Weekly Report Card</SH>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 10 }}>
//             {[{ l: "Problems solved", v: solvedThisWeek, c: "#059669" }, { l: "Revisions done", v: weekRevisions, c: "#7c3aed" }, { l: "XP earned", v: "~" + (solvedThisWeek * 20 + weekRevisions * 8), c: "#d97706" }, { l: "Streak", v: "🔥 " + streak.count, c: "#dc2626" }].map((s, i) => (
//               <div key={i} style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)", borderRadius: 9, padding: "10px 12px" }}>
//                 <div style={{ fontWeight: 700, fontSize: 16, color: s.c }}>{s.v}</div>
//                 <div style={{ fontSize: 11, color: T.subtext, marginTop: 2 }}>{s.l}</div>
//               </div>
//             ))}
//           </div>
//           {bestTopicThisWeek && <div style={{ fontSize: 12, color: "#92400e", background: "rgba(255,255,255,0.5)", padding: "7px 11px", borderRadius: 7, fontWeight: 600 }}>Best topic this week: {bestTopicThisWeek}</div>}
//           {solvedThisWeek >= 5 && <div style={{ fontSize: 12, color: "#15803d", background: "#d1fae5", padding: "7px 11px", borderRadius: 7, marginTop: 8, fontWeight: 600 }}>Weekly goal achieved!</div>}
//         </Card>

//         {/* ── Peak Performance Hours — REDESIGNED with grouped period bars ── */}
//         <Card bg={dark ? "#0f0f1a" : "white"} border={dark ? "#2d2d4e" : "#e5e7eb"} style={{ gridColumn: "1 / -1" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
//             <div>
//               <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.3, color: T.text, marginBottom: 2 }}>⚡ Peak Performance Hours</div>
//               <div style={{ fontSize: 11, color: T.subtext }}>When you're most active · spot your golden hours</div>
//             </div>
//             {totalActions > 0 && peakPeriod && peakPeriod.count > 0 && (
//               <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
//                 <div style={{ fontSize: 10, color: T.subtext, textTransform: "uppercase", letterSpacing: 0.5 }}>Peak</div>
//                 <div style={{ fontSize: 14, fontWeight: 700, color: peakPeriod.color }}>{peakPeriod.label}</div>
//               </div>
//             )}
//           </div>

//           {totalActions === 0 ? (
//             <div style={{ fontSize: 13, color: T.subtext, textAlign: "center", padding: "32px 0" }}>No activity yet. Start using the timer or marking problems!</div>
//           ) : (
//             <div>
//               {/* Tall bars — reference image style */}
//               <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 180, gap: 12, padding: "0 4px" }}>
//                 {periodCounts.map((p, i) => {
//                   const isPeak = p.label === peakPeriod.label && p.count > 0;
//                   // Height as percentage of max, with reasonable minimum for non-zero, near-zero for zero
//                   const heightPct = p.count === 0 ? 2 : Math.max(8, (p.count / maxPeriodCount) * 100);
//                   const dimmed = !isPeak && p.count > 0;
//                   return (
//                     <div key={p.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end", gap: 6 }}>
//                       {/* Count label above bar */}
//                       <div style={{
//                         fontSize: 12,
//                         fontWeight: 700,
//                         color: isPeak ? p.color : dimmed ? T.text : T.subtext,
//                         opacity: p.count === 0 ? 0.35 : 1,
//                         marginBottom: 2,
//                       }}>
//                         {p.count}
//                       </div>
//                       {/* The bar */}
//                       <div
//                         title={p.label + " (" + p.short + "): " + p.count + " action" + (p.count !== 1 ? "s" : "")}
//                         style={{
//                           width: "100%",
//                           maxWidth: 80,
//                           height: heightPct + "%",
//                           minHeight: p.count === 0 ? 3 : 14,
//                           background: p.count === 0
//                             ? (dark ? "rgba(255,255,255,0.05)" : "#f1f5f9")
//                             : isPeak
//                             ? p.grad
//                             : p.grad,
//                           borderRadius: "10px 10px 4px 4px",
//                           boxShadow: isPeak
//                             ? "0 6px 20px " + p.color + "55, 0 0 0 2px " + p.color + "22"
//                             : p.count > 0
//                             ? "0 2px 8px rgba(0,0,0,0.08)"
//                             : "none",
//                           opacity: p.count === 0 ? 1 : isPeak ? 1 : 0.65,
//                           transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
//                           position: "relative",
//                         }}
//                       >
//                         {isPeak && (
//                           <div style={{
//                             position: "absolute",
//                             top: -8,
//                             left: "50%",
//                             transform: "translateX(-50%)",
//                             background: p.color,
//                             color: "white",
//                             fontSize: 9,
//                             fontWeight: 700,
//                             padding: "2px 7px",
//                             borderRadius: 99,
//                             letterSpacing: 0.5,
//                             textTransform: "uppercase",
//                             whiteSpace: "nowrap",
//                             boxShadow: "0 2px 6px " + p.color + "66",
//                           }}>
//                             ★ Peak
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Period labels below bars */}
//               <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 12, padding: "0 4px" }}>
//                 {periodCounts.map((p) => {
//                   const isPeak = p.label === peakPeriod.label && p.count > 0;
//                   return (
//                     <div key={p.label} style={{ flex: 1, textAlign: "center" }}>
//                       <div style={{
//                         fontSize: 12,
//                         fontWeight: isPeak ? 700 : 600,
//                         color: isPeak ? T.text : T.subtext,
//                         marginBottom: 2,
//                       }}>
//                         {p.label}
//                       </div>
//                       <div style={{ fontSize: 10, color: T.subtext, opacity: 0.7 }}>
//                         {p.short}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Bottom summary */}
//               <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid " + T.cardBorder, display: "flex", gap: 12, flexWrap: "wrap", fontSize: 11, color: T.subtext }}>
//                 <span><strong style={{ color: T.text }}>{totalActions}</strong> total actions logged</span>
//                 {peakPeriod && peakPeriod.count > 0 && (
//                   <span>· <strong style={{ color: peakPeriod.color }}>{Math.round(peakPeriod.count / totalActions * 100)}%</strong> happen during {peakPeriod.label.toLowerCase()}</span>
//                 )}
//               </div>
//             </div>
//           )}
//         </Card>

//         <Card bg="white" border="#e5e7eb">
//           <SH>Mistake Patterns</SH>
//           {mistakes.length === 0 ? (
//             <div style={{ fontSize: 13, color: T.subtext }}>No mistakes logged yet. Hit Hard to track what went wrong.</div>
//           ) : (
//             <div>
//               {topMistake && <div style={{ fontSize: 12, marginBottom: 12, background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 9, padding: "10px 14px", color: "#991b1b", fontWeight: 600 }}>Most common: {topMistake} — fix this first.</div>}
//               {Object.entries(mistakeCounts).sort((a, b) => b[1] - a[1]).map(([type, count], i) => {
//                 const pct = Math.round(count / mistakes.length * 100);
//                 const colors = ["#ef4444","#f97316","#eab308","#8b5cf6","#3b82f6","#10b981","#ec4899","#06b6d4","#84cc16","#94a3b8"];
//                 return (
//                   <div key={type} style={{ marginBottom: 10 }}>
//                     <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
//                       <span style={{ fontWeight: 600 }}>{type}</span>
//                       <span style={{ color: T.subtext }}>{count}x ({pct}%)</span>
//                     </div>
//                     <div style={{ background: dark ? T.mutedBg : "#f0f0f5", borderRadius: 99, height: 7 }}>
//                       <div style={{ background: colors[i % colors.length], height: 7, borderRadius: 99, width: pct + "%", transition: "width 0.5s" }} />
//                     </div>
//                   </div>
//                 );
//               })}
//               <div style={{ fontSize: 11, color: T.subtext, marginTop: 8, borderTop: "1px solid " + T.cardBorder, paddingTop: 8 }}>{mistakes.length} total · {Object.keys(mistakeCounts).length} types</div>
//             </div>
//           )}
//         </Card>

//         <Card bg="white" border="#e5e7eb">
//           <SH>Quick Stats</SH>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//             {[
//               { l: "Total problems",   v: problems.length,                       c: "#4f46e5" },
//               { l: "Solved",           v: solved.length,                         c: "#059669" },
//               { l: "Mastered",         v: mastered.length,                       c: "#eab308" },
//               { l: "Bookmarked",       v: bookmarked.length,                     c: "#d97706" },
//               { l: "Active days",      v: activeDaysCount,                       c: "#7c3aed" },
//               { l: "Best streak",      v: maxStreakCount,                        c: "#dc2626" },
//             ].map((s, i) => (
//               <div key={i} style={{ background: dark ? T.rowAlt : "#f8fafc", borderRadius: 9, padding: "10px 12px", border: "1px solid " + T.cardBorder }}>
//                 <div style={{ fontWeight: 700, fontSize: 18, color: s.c }}>{s.v}</div>
//                 <div style={{ fontSize: 11, color: T.subtext, marginTop: 2 }}>{s.l}</div>
//               </div>
//             ))}
//           </div>
//         </Card>

//         <div style={{ gridColumn: "1 / -1", background: dark ? "#1a1a2e" : "#f5f3ff", border: "1.5px solid " + (dark ? "#2d2d4e" : "#c4b5fd"), borderRadius: 16, padding: "20px 24px", marginBottom: 14 }}>
//           {/* Header */}
//           <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
//             <div style={{ color: T.text, fontSize: 15, fontWeight: 700 }}>
//               <span style={{ fontSize: 20, fontWeight: 800, color: dark ? "#a78bfa" : "#4f46e5" }}>{yearHeatTotalActions}</span>
//               <span style={{ color: T.subtext, fontWeight: 400, marginLeft: 6, fontSize: 13 }}>activities in {heatYear}</span>
//             </div>
//             <div style={{ marginLeft: "auto", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
//               <span style={{ fontSize: 12, color: T.subtext }}>Active days: <span style={{ color: dark ? "#a78bfa" : "#4f46e5", fontWeight: 700 }}>{activeDaysCount}</span></span>
//               <span style={{ fontSize: 12, color: T.subtext }}>Max streak: <span style={{ color: dark ? "#a78bfa" : "#4f46e5", fontWeight: 700 }}>{maxStreakCount}</span></span>
//               <span style={{ fontSize: 12, color: T.subtext }}>Current streak: <span style={{ color: dark ? "#a78bfa" : "#4f46e5", fontWeight: 700 }}>{streak.count}</span></span>
//               <select value={heatYear} onChange={(e) => setHeatYear(Number(e.target.value))} style={{ padding: "4px 10px", borderRadius: 8, border: "1.5px solid " + (dark ? "#4f46e5" : "#c4b5fd"), fontSize: 12, background: dark ? "#0f172a" : "white", color: dark ? "#a78bfa" : "#4f46e5", fontWeight: 700, cursor: "pointer" }}>
//                 {availableYears.map((y) => <option key={y} value={y}>{y}</option>)}
//               </select>
//             </div>
//           </div>

//           {/* Proper month-separated heatmap */}
//           {(() => {
//             const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
//             const LEVELS_LIGHT = ["#ede9fe", "#c4b5fd", "#7c3aed", "#4f46e5"];
//             const LEVELS_DARK  = ["#2d1b69", "#5b21b6", "#7c3aed", "#a78bfa"];
//             const emptyBg      = dark ? "#1e1b4b" : "#f0eeff";
//             const levels       = dark ? LEVELS_DARK : LEVELS_LIGHT;

//             const getCellColor = (date) => {
//               const v = activityLog[date] || 0;
//               if (!v) return emptyBg;
//               const ratio = v / maxAct;
//               if (ratio < 0.25) return levels[0];
//               if (ratio < 0.5)  return levels[1];
//               if (ratio < 0.8)  return levels[2];
//               return levels[3];
//             };

//             const monthBlocks = Array.from({ length: 12 }, (_, m) => {
//               const firstDay = new Date(heatYear, m, 1);
//               const lastDay  = new Date(heatYear, m + 1, 0);
//               const startDow = firstDay.getDay();

//               const cells = [];
//               for (let i = 0; i < startDow; i++) cells.push(null);
//               for (let d = 1; d <= lastDay.getDate(); d++) {
//                 const dt = new Date(heatYear, m, d);
//                 cells.push(dt.toISOString().split("T")[0]);
//               }
//               const remaining = (7 - (cells.length % 7)) % 7;
//               for (let i = 0; i < remaining; i++) cells.push(null);

//               const weeks = [];
//               for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
//               return { month: m, name: MONTH_NAMES[m], weeks };
//             });

//             return (
//               <div style={{ overflowX: "auto", paddingBottom: 4 }}>
//                 <div style={{ display: "flex", gap: 8, minWidth: "max-content", alignItems: "flex-start" }}>
//                   <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingTop: 18, flexShrink: 0 }}>
//                     {["S","M","T","W","T","F","S"].map((d, i) => (
//                       <div key={i} style={{ width: 11, height: 13, fontSize: 8.5, color: T.subtext, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.7 }}>{d}</div>
//                     ))}
//                   </div>

//                   {monthBlocks.map((blk) => (
//                     <div key={blk.month} style={{ display: "flex", flexDirection: "column" }}>
//                       <div style={{ fontSize: 11, fontWeight: 700, color: dark ? "#a78bfa" : "#7c3aed", marginBottom: 5, height: 16, letterSpacing: 0.3 }}>
//                         {blk.name}
//                       </div>
//                       <div style={{ display: "flex", gap: 3 }}>
//                         {blk.weeks.map((week, wi) => (
//                           <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
//                             {week.map((date, di) => {
//                               if (!date) {
//                                 return <div key={di} style={{ width: 13, height: 13 }} />;
//                               }
//                               const v = activityLog[date] || 0;
//                               const bg = getCellColor(date);
//                               const isToday = date === todayStr();
//                               return (
//                                 <div
//                                   key={date}
//                                   title={date + ": " + v + " action" + (v !== 1 ? "s" : "")}
//                                   style={{
//                                     width: 13, height: 13,
//                                     borderRadius: 3,
//                                     background: bg,
//                                     border: isToday
//                                       ? "1.5px solid " + (dark ? "#a78bfa" : "#4f46e5")
//                                       : "1px solid " + (dark ? "rgba(167,139,250,0.12)" : "rgba(79,70,229,0.1)"),
//                                     transition: "background 0.2s",
//                                     cursor: v ? "pointer" : "default",
//                                     boxShadow: v >= 1 && !dark ? "0 1px 3px rgba(79,70,229,0.18)" : "none",
//                                   }}
//                                 />
//                               );
//                             })}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );
//           })()}

//           <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: T.subtext, marginTop: 14 }}>
//             <span>Less</span>
//             {[dark ? "#1e1b4b" : "#f0eeff", dark ? "#2d1b69" : "#ede9fe", dark ? "#5b21b6" : "#c4b5fd", dark ? "#7c3aed" : "#7c3aed", dark ? "#a78bfa" : "#4f46e5"].map((bg, i) => (
//               <div key={i} style={{ width: 13, height: 13, borderRadius: 3, background: bg, border: "1px solid " + (dark ? "rgba(167,139,250,0.2)" : "rgba(79,70,229,0.15)") }} />
//             ))}
//             <span>More</span>
//             <span style={{ marginLeft: "auto", fontSize: 11, color: dark ? "#a78bfa" : "#7c3aed", fontWeight: 600 }}>{yearHeatTotalActions} total actions</span>
//           </div>
//         </div>

//         <Card bg="white" border="#e5e7eb">
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: patternMasteryOpen ? 12 : 0 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.3, color: T.text }}>Pattern Mastery</div>
//               <span style={{ fontSize: 12, background: dark ? "#14281f" : "#d1fae5", color: "#059669", borderRadius: 8, padding: "3px 10px", fontWeight: 700, border: "1px solid #86efac" }}>👑 {mastered.length} mastered</span>
//             </div>
//             <button onClick={() => setPatternMasteryOpen((v) => !v)} style={{ background: dark ? T.mutedBg : "#f5f3ff", border: "1.5px solid " + (dark ? T.chipBorder : "#c4b5fd"), borderRadius: 8, padding: "4px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#7c3aed", display: "flex", alignItems: "center", gap: 5 }}>
//               <span>{patternMasteryOpen ? "▲ Hide" : "▼ Show"}</span>
//               {!patternMasteryOpen && patternEntries.length > 0 && <span style={{ background: "#ede9fe", borderRadius: 99, padding: "1px 7px", fontSize: 11, color: "#6d28d9" }}>{patternEntries.length}</span>}
//             </button>
//           </div>
//           {patternMasteryOpen && (
//             patternEntries.length === 0 ? (
//               <div style={{ color: T.subtext, fontSize: 13 }}>No pattern tags yet! Add some when solving.</div>
//             ) : (
//               patternEntries.map(([pt, s], i) => {
//                 const p2 = Math.round(s.mastered / s.total * 100);
//                 const barColor = p2 >= 70 ? "linear-gradient(90deg,#059669,#34d399)" : p2 >= 40 ? patternBars[i % patternBars.length] : "linear-gradient(90deg,#dc2626,#f87171)";
//                 return (
//                   <div key={i} style={{ marginBottom: 12, padding: "8px 12px", background: i % 2 === 0 ? T.rowAlt : T.cardBg, borderRadius: 9 }}>
//                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, marginBottom: 5 }}>
//                       <span style={{ fontWeight: 700 }}>{pt}</span>
//                       <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
//                         <span style={{ color: T.subtext, fontSize: 11 }}>{s.mastered}/{s.total} mastered</span>
//                         <span style={{ fontSize: 11, fontWeight: 700, background: p2 >= 70 ? "#d1fae5" : p2 >= 40 ? "#ede9fe" : "#fee2e2", color: p2 >= 70 ? "#059669" : p2 >= 40 ? "#7c3aed" : "#dc2626", padding: "1px 8px", borderRadius: 5 }}>{p2}%</span>
//                       </div>
//                     </div>
//                     <div style={{ background: dark ? T.mutedBg : "#f0f0f5", borderRadius: 99, height: 7 }}>
//                       <div style={{ background: barColor, height: 7, borderRadius: 99, width: p2 + "%", transition: "width 0.5s" }} />
//                     </div>
//                   </div>
//                 );
//               })
//             )
//           )}
//         </Card>

//         <Card bg="white" border="#e5e7eb" style={{ gridColumn: "1 / -1" }}>
//           <SH>Level Roadmap</SH>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
//             {LEVELS.map((l, i) => {
//               const isCur = l.name === level.name, isDone = solved.length > l.max;
//               return (
//                 <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 12, background: isCur ? dark ? l.accent + "22" : l.bg : isDone ? dark ? "#14281f" : "#f0fdf4" : T.cardBg, border: isCur ? "2px solid " + l.accent + "40" : isDone ? "1.5px solid #86efac" : "1.5px solid " + T.cardBorder }}>
//                   <div style={{ width: 38, height: 38, borderRadius: 10, background: isCur || isDone ? l.bar : T.mutedBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{l.emoji}</div>
//                   <div style={{ flex: 1, minWidth: 0 }}>
//                     <div style={{ fontWeight: 700, fontSize: 12, color: isCur ? l.accent : isDone ? "#15803d" : T.subtext }}>{l.name}</div>
//                     <div style={{ fontSize: 10, color: T.subtext, opacity: 0.7 }}>{l.min}–{l.max === 999 ? "∞" : l.max}</div>
//                   </div>
//                   {isDone && <span style={{ fontSize: 11, color: "#15803d", fontWeight: 700 }}>✅</span>}
//                   {isCur  && <span style={{ fontSize: 11, fontWeight: 700, color: l.accent }}>You</span>}
//                 </div>
//               );
//             })}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );

//   /* ─── MODALS ─── */
//   const MilestoneModal = () => !milestoneModal ? null : (
//     <div style={{ position: "fixed", inset: 0, background: "rgba(10,8,30,0.92)", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
//       <div style={{ background: "linear-gradient(135deg,#1e1b4b,#312e81," + milestoneModal.color + "33)", border: "2px solid " + milestoneModal.color + "60", borderRadius: 24, padding: "48px 56px", maxWidth: 520, width: "100%", textAlign: "center", animation: "msA 0.5s ease", boxShadow: "0 0 80px " + milestoneModal.color + "40" }}>
//         <div style={{ fontSize: 72, animation: "float 2s ease-in-out infinite", marginBottom: 16 }}>{milestoneModal.emoji}</div>
//         <div style={{ fontSize: 56, fontWeight: 700, color: milestoneModal.color, marginBottom: 6, letterSpacing: -2 }}>{milestoneModal.count}</div>
//         <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 3, marginBottom: 20 }}>Problems Solved</div>
//         <div style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 10 }}>{milestoneModal.msg}</div>
//         <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 32, lineHeight: 1.7 }}>{milestoneModal.sub}</div>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 32 }}>
//           {[{ l: "XP Earned", v: xp }, { l: "Mastered", v: mastered.length }, { l: "Streak", v: "🔥" + streak.count }].map((s, i) => (
//             <div key={i} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: "12px 8px" }}>
//               <div style={{ fontSize: 20, fontWeight: 700, color: milestoneModal.color }}>{s.v}</div>
//               <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 3, textTransform: "uppercase" }}>{s.l}</div>
//             </div>
//           ))}
//         </div>
//         <button onClick={() => setMilestoneModal(null)} className="hbtn" style={{ background: "linear-gradient(135deg," + milestoneModal.color + "," + milestoneModal.color + "cc)", color: "white", border: "none", borderRadius: 13, padding: "14px 40px", cursor: "pointer", fontSize: 16, fontWeight: 700 }}>Keep Going!</button>
//       </div>
//     </div>
//   );

//   const MistakeModal = () => !mistakeModal ? null : (
//     <div style={{ position: "fixed", inset: 0, background: "rgba(15,12,41,0.7)", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
//       <div style={{ background: T.cardBg, border: "1.5px solid " + T.cardBorder, borderRadius: 20, padding: "28px 32px", maxWidth: 520, width: "100%", animation: "pop 0.25s ease" }}>
//         <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>What went wrong?</div>
//         <div style={{ fontSize: 13, color: T.subtext, marginBottom: 18 }}>Tracking mistakes helps fix root causes, not symptoms.</div>
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 16 }}>
//           {MISTAKE_TYPES.map((type) => (
//             <button key={type} onClick={() => logMistake(type)} className="hbtn" style={{ padding: "10px 14px", borderRadius: 10, border: "1.5px solid " + T.chipBorder, cursor: "pointer", fontSize: 13, fontWeight: 600, background: T.chipBg, color: T.text, textAlign: "left" }}>{type}</button>
//           ))}
//         </div>
//         <button onClick={() => setMistakeModal(null)} style={{ width: "100%", background: T.mutedBg, color: T.subtext, border: "none", borderRadius: 10, padding: "10px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Skip</button>
//       </div>
//     </div>
//   );

//   const ProblemModal = () => !modal ? null : (
//     <div style={{ position: "fixed", inset: 0, background: "rgba(15,12,41,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 20 }}>
//       <div style={{ background: T.cardBg, border: "2px solid " + T.cardBorder, borderRadius: 20, padding: 28, width: "100%", maxWidth: 640, maxHeight: "90vh", overflowY: "auto", animation: "pop 0.25s ease", boxShadow: "0 24px 64px rgba(0,0,0,0.35)" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
//           <div style={{ fontWeight: 700, fontSize: 18, color: T.text }}>{modal === "add" ? "Add Problem" : "Edit Problem"}</div>
//           <button onClick={closeModal} style={{ background: T.mutedBg, border: "none", borderRadius: 99, width: 34, height: 34, cursor: "pointer", fontSize: 18, color: T.subtext, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
//         </div>

//         {/* Breadcrumb */}
//         <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: T.subtext, marginBottom: 20, padding: "8px 12px", background: dark ? T.rowAlt : "#f8fafc", borderRadius: 9, border: "1px solid " + T.cardBorder }}>
//           <span style={{ color: form.section ? "#4f46e5" : T.subtext, fontWeight: form.section ? 700 : 400 }}>{form.section || "Section"}</span>
//           <span style={{ opacity: 0.4 }}>›</span>
//           <span style={{ color: form.subSection ? "#7c3aed" : T.subtext, fontWeight: form.subSection ? 700 : 400 }}>{form.subSection || "Sub-section"}</span>
//           <span style={{ opacity: 0.4 }}>›</span>
//           <span style={{ color: form.name ? T.text : T.subtext, fontWeight: form.name ? 700 : 400 }}>{form.name || "Problem name"}</span>
//         </div>

//         <div style={{ display: "grid", gap: 14 }}>

//           {/* ── SECTION → SUB-SECTION ── */}
//           <div style={{ background: dark ? T.rowAlt : "#f5f3ff", border: "1.5px solid " + (dark ? "#4f46e544" : "#c4b5fd"), borderRadius: 12, padding: "14px 16px" }}>
//             <div style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>📂 Location</div>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//               <div>
//                 <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 5 }}>Section</div>
//                 <select
//                   value={form.section}
//                   onChange={(e) => setForm((f) => ({ ...f, section: e.target.value, subSection: "" }))}
//                   style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: "1.5px solid " + (form.section ? "#a78bfa" : T.inputBorder), fontSize: 13, background: T.inputBg, color: T.text }}
//                 >
//                   <option value="">— Select Section —</option>
//                   {Object.keys(DSA_SECTIONS).map((s) => <option key={s} value={s}>{s}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 5 }}>Sub-section</div>
//                 <select
//                   value={form.subSection}
//                   onChange={(e) => setForm((f) => ({ ...f, subSection: e.target.value }))}
//                   disabled={!form.section}
//                   style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: "1.5px solid " + (form.subSection ? "#a78bfa" : T.inputBorder), fontSize: 13, background: T.inputBg, color: form.section ? T.text : T.subtext, opacity: form.section ? 1 : 0.5 }}
//                 >
//                   <option value="">— Select Sub-section —</option>
//                   {(DSA_SECTIONS[form.section] || []).map((s) => <option key={s} value={s}>{s}</option>)}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* ── PROBLEM DETAILS ── */}
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//             <div>
//               <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Problem name *</div>
//               <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Two Sum" style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "1.5px solid " + T.inputBorder, fontSize: 14, boxSizing: "border-box", background: T.inputBg, color: T.text }} />
//             </div>
//             <div>
//               <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Topic</div>
//               <select value={form.topic} onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))} style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "1.5px solid " + T.inputBorder, fontSize: 14, background: T.inputBg, color: T.text }}>
//                 <option value="">Select topic</option>
//                 {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
//               </select>
//             </div>
//           </div>
//           {form.topic && <div style={{ padding: "8px 13px", background: dark ? T.rowAlt : TCd(form.topic).bg, border: "1.5px solid " + TCd(form.topic).border, borderRadius: 8, fontSize: 13, color: TCd(form.topic).text, fontWeight: 600 }}>Topic: {form.topic}</div>}
//           <div>
//             <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>LeetCode / GFG link</div>
//             <input value={form.link} onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))} placeholder="https://leetcode.com/problems/..." style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "1.5px solid " + T.inputBorder, fontSize: 13, boxSizing: "border-box", background: T.inputBg, color: T.text }} />
//           </div>
//           <div>
//             <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 7, textTransform: "uppercase", letterSpacing: 1 }}>Difficulty</div>
//             <div style={{ display: "flex", gap: 8 }}>
//               {[{ v: "Easy", bg: "#f0fdf4", border: "#86efac", text: "#166534" }, { v: "Medium", bg: "#fffbeb", border: "#fcd34d", text: "#92400e" }, { v: "Hard", bg: "#fef2f2", border: "#fca5a5", text: "#991b1b" }].map((opt) => (
//                 <button key={opt.v} onClick={() => setForm((f) => ({ ...f, difficulty: f.difficulty === opt.v ? "" : opt.v }))} style={{ flex: 1, padding: "9px", borderRadius: 10, border: "2px solid " + (form.difficulty === opt.v ? opt.border : T.inputBorder), cursor: "pointer", fontSize: 13, fontWeight: 700, background: form.difficulty === opt.v ? opt.bg : T.chipBg, color: form.difficulty === opt.v ? opt.text : T.subtext }}>{opt.v}</button>
//               ))}
//             </div>
//           </div>
//           <div>
//             <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 7, textTransform: "uppercase", letterSpacing: 1 }}>Pattern Tags</div>
//             <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
//               {PATTERNS.map((pt) => (
//                 <button key={pt} onClick={() => togglePat(pt)} style={{ padding: "4px 11px", borderRadius: 99, border: "1.5px solid " + ((form.pattern || []).includes(pt) ? "#a78bfa" : T.inputBorder), cursor: "pointer", fontSize: 11, fontWeight: 600, background: (form.pattern || []).includes(pt) ? dark ? "#2d1f5e" : "#f5f3ff" : T.chipBg, color: (form.pattern || []).includes(pt) ? "#a78bfa" : T.subtext }}>{pt}</button>
//               ))}
//             </div>
//           </div>
//           <div>
//             <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Notes (key idea, TC/SC)</div>
//             <textarea value={form.note} onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))} rows={3} placeholder="e.g. Prefix sum + hashmap. TC: O(n). Key insight: map stores sum index." style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "1.5px solid " + T.inputBorder, fontSize: 13, resize: "vertical", boxSizing: "border-box", background: T.inputBg, color: T.text, fontFamily: "system-ui, sans-serif", lineHeight: 1.6 }} />
//           </div>
//           <div>
//             <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Key Code Pattern</div>
//             <textarea value={form.codeSnippet || ""} onChange={(e) => setForm((f) => ({ ...f, codeSnippet: e.target.value }))} rows={4} placeholder={"// Key pattern\nint l=0, r=n-1;\nwhile(l<r){ ... }"} style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "1.5px solid #334155", fontSize: 13, resize: "vertical", boxSizing: "border-box", background: "#1e293b", color: "#a78bfa", fontFamily: "'Courier New', monospace", lineHeight: 1.7 }} />
//             <div style={{ fontSize: 11, color: T.subtext, marginTop: 4 }}>Shown during revision to refresh muscle memory</div>
//           </div>
//           <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 4 }}>
//             <button onClick={closeModal} style={{ background: T.mutedBg, color: T.subtext, border: "none", borderRadius: 10, padding: "10px 22px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>Cancel</button>
//             <button onClick={saveForm} className="hbtn" style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "white", border: "none", borderRadius: 10, padding: "10px 28px", cursor: "pointer", fontSize: 14, fontWeight: 700, boxShadow: "0 4px 16px rgba(79,70,229,0.4)" }}>Save Problem</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   /* ─── RENDER ─── */
//   return (
//     <ThemeCtx.Provider value={{ T, dark }}>
//     <div style={{ display: "flex", minHeight: "100vh", background: T.pageBg, color: T.text }}>

//       {/* Mobile sidebar overlay */}
//       <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} style={{ display: sidebarOpen ? "block" : "none" }} />

//       {/* Mobile top bar */}
//       <div className="mobile-topbar" style={{ background: "linear-gradient(135deg,#1e1b4b,#4f46e5)" }}>
//         <button onClick={() => setSidebarOpen((v) => !v)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 8, width: 36, height: 36, cursor: "pointer", fontSize: 18, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>☰</button>
//         <span className="sht" style={{ fontWeight: 700, fontSize: 16 }}>Striver A2Z Tracker</span>
//         <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
//           <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>🔥{streak.count}</span>
//           <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>{xp}XP</span>
//         </div>
//       </div>

//       {/* Sidebar — desktop fixed, mobile slide-in */}
//       <div className={"desktop-sidebar" + (sidebarOpen ? " open" : "")} style={{ position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 100 }}>
//         {Sidebar()}
//       </div>

//       {/* SPARKS */}
//       {sparks.map((c) => (
//         <div key={c.id} style={{ position: "fixed", top: 50, left: c.x + "%", width: c.sz, height: c.sz, background: c.c, borderRadius: c.shape, zIndex: 9999, pointerEvents: "none", animation: "fall 2s " + c.dl + "s ease-in forwards" }} />
//       ))}

//       {/* TOAST — with undo button for deletes */}
//       {toast && (
//         <div style={{ position: "fixed", top: 20, right: 20, background: toast.bg, border: "2px solid " + toast.border, borderRadius: 12, padding: "12px 20px", fontWeight: 700, fontSize: 14, zIndex: 9999, animation: "slR 0.3s ease", color: "#1a1a1a", boxShadow: "0 6px 24px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", gap: 12, maxWidth: 340 }}>
//           <span style={{ flex: 1 }}>{toast.msg}</span>
//           {toast.undoId && (
//             <button onClick={() => undoDelete(toast.undoId)} style={{ background: "#dc2626", color: "white", border: "none", borderRadius: 7, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>↩ Undo</button>
//           )}
//         </div>
//       )}

//       {MilestoneModal()}
//       {MistakeModal()}
//       {ProblemModal()}

//       {/* MAIN */}
//       <div className="main-content" style={{ marginLeft: 240, flex: 1, padding: "28px 36px", maxWidth: "calc(100vw - 240px)", minHeight: "100vh", paddingBottom: 80 }}>
//         <div style={{ marginBottom: 24 }}>
//           <h1 style={{ fontSize: 24, fontWeight: 700, color: T.text, letterSpacing: -0.5 }}>
//             {tab === "today"    && "Today's Dashboard"}
//             {tab === "revision" && "Revision Queue"}
//             {tab === "tracker"  && "Problem Tracker — Striver A2Z"}
//             {tab === "notes"    && "Topic Notes"}
//             {tab === "stats"    && "Stats & Analytics"}
//           </h1>
//           <div style={{ fontSize: 13, color: T.subtext, marginTop: 3 }}>
//             {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
//             {tab === "today"    && " · " + solvedThisWeek + "/" + weeklyGoal + " problems this week"}
//             {tab === "revision" && " · " + due.length + " due today"}
//             {tab === "tracker"  && " · " + problems.length + " problems total"}
//           </div>
//         </div>

//         {tab === "today"    && TodayTab()}
//         {tab === "revision" && RevisionTab()}
//         {tab === "tracker"  && TrackerTab()}
//         {tab === "notes"    && NotesTab()}
//         {tab === "stats"    && StatsTab()}
//       </div>

//       {/* Mobile bottom nav */}
//       <div className="mobile-bottom-nav" style={{ background: T.sidebar, borderTopColor: T.cardBorder }}>
//         {TABS.map((t) => (
//           <button key={t.id} onClick={() => { setTab(t.id); setSidebarOpen(false); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", padding: "8px 12px", borderRadius: 10, position: "relative" }}>
//             <span style={{ fontSize: 20 }}>{t.icon}</span>
//             <span style={{ fontSize: 9, fontWeight: 700, color: tab === t.id ? "#4f46e5" : T.subtext }}>{t.label}</span>
//             {t.badge > 0 && <span style={{ position: "absolute", top: 4, right: 8, background: "#ef4444", color: "white", borderRadius: 99, fontSize: 9, padding: "1px 5px", fontWeight: 700 }}>{t.badge}</span>}
//           </button>
//         ))}
//       </div>

//     </div>
//     </ThemeCtx.Provider>
//   );
// }



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
const EMPTY = { id: null, section: "", subSection: "", topic: "", name: "", link: "", difficulty: "", note: "", codeSnippet: "", pattern: [], status: "Unsolved", solvedDate: "", revStage: 0, revDates: [], bookmarked: false, revHistory: [], timeLogs: [], totalSolveTime: 0, totalRevTime: 0 };

/* ─── PEAK PERFORMANCE PERIODS ─── */
const PERIODS = [
  { label: "Late Night", short: "12–6 AM",  hours: [0,1,2,3,4,5],         color: "#6366f1", grad: "linear-gradient(180deg,#818cf8,#6366f1)" },
  { label: "Morning",    short: "6–9 AM",   hours: [6,7,8],               color: "#0891b2", grad: "linear-gradient(180deg,#22d3ee,#0891b2)" },
  { label: "Mid-Day",    short: "9 AM–12",  hours: [9,10,11],             color: "#10b981", grad: "linear-gradient(180deg,#34d399,#10b981)" },
  { label: "Afternoon",  short: "12–5 PM",  hours: [12,13,14,15,16],      color: "#f59e0b", grad: "linear-gradient(180deg,#fbbf24,#f59e0b)" },
  { label: "Evening",    short: "5–9 PM",   hours: [17,18,19,20],         color: "#ec4899", grad: "linear-gradient(180deg,#f472b6,#ec4899)" },
  { label: "Night",      short: "9 PM–12",  hours: [21,22,23],            color: "#a855f7", grad: "linear-gradient(180deg,#c084fc,#a855f7)" },
];

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
  @keyframes ringPulse { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(1.5); opacity: 0; } }
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
  /* Mobile responsive */
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
    .three-col { grid-template-columns: 1fr !important; }
    .notes-grid { grid-template-columns: 1fr !important; height: auto !important; }
    .notes-side { display: none !important; }
    .filter-popover { position: fixed !important; top: 60px !important; left: 16px !important; right: 16px !important; }
    .toast-position { top: auto !important; right: 16px !important; left: 16px !important; bottom: 80px !important; max-width: calc(100vw - 32px) !important; }
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
  const [revIntervals,    setRevIntervals]    = useState(() => lsGet("revIntervals", [3, 7, 30, 90]));
  const [undoQueue,       setUndoQueue]       = useState([]);
  const [sidebarOpen,     setSidebarOpen]     = useState(false);
  const [lastExportDate,  setLastExportDate]  = useState(() => lsGet("lastExportDate", ""));
  const [linkedProblemId, setLinkedProblemId] = useState(null);
  const [weeklyGoal]      = useState(() => lsGet("weeklyGoal", 5));
  const [streakMode]      = useState(() => lsGet("streakMode", "any"));
  const [milestoneLog,    setMilestoneLog]    = useState(() => lsGet("milestoneLog", {}));
  const [settingsOpen,    setSettingsOpen]    = useState(false);
  const [addModalTab,     setAddModalTab]     = useState("basics");
  const [filtersOpen,     setFiltersOpen]     = useState(false);
  const [notesPanelOpen,  setNotesPanelOpen]  = useState(true);

  /* ─── TIMER REMINDERS (FIX #2) ─── */
  // Configurable list of minute marks at which to alert the user.
  // Default reminders: 15min (sweet spot), 25min (pomodoro), 45min (long session warning).
  const [timerReminders, setTimerReminders] = useState(() => lsGet("timerReminders", [15, 25, 45]));
  const [reminderInput,  setReminderInput]  = useState("");
  // Tracks reminders that already fired this session so they don't fire twice.
  const firedRemindersRef = useRef(new Set());
  // Visual flash state when a reminder triggers
  const [reminderFlash, setReminderFlash] = useState(null);

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
  useEffect(() => { lsSet("timerReminders",  timerReminders);  }, [timerReminders]);
  useEffect(() => {
    lsSet("dark", dark);
    document.body.style.background = dark ? "#0f0f1a" : "#f1f5f9";
  }, [dark]);

  // Escape closes any open modal
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

  /* ─── TIMER (with FIX #2: reminder popups, no hard 20min limit) ─── */
  useEffect(() => { timerSecRef.current = timerSec; }, [timerSec]);

  // Audio beep helper for reminders (graceful no-op if blocked)
  const playReminderBeep = () => {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      // Two-tone chime
      [800, 1100].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = freq;
        const t0 = ctx.currentTime + i * 0.18;
        gain.gain.setValueAtTime(0.0001, t0);
        gain.gain.exponentialRampToValueAtTime(0.25, t0 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16);
        osc.start(t0); osc.stop(t0 + 0.2);
      });
      setTimeout(() => { try { ctx.close(); } catch (e) {} }, 800);
    } catch (e) {}
  };

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSec((s) => {
          const ns = s + 1;
          // Check reminders
          timerReminders.forEach((min) => {
            if (ns === min * 60 && !firedRemindersRef.current.has(min)) {
              firedRemindersRef.current.add(min);
              playReminderBeep();
              setReminderFlash(min);
              setTimeout(() => setReminderFlash(null), 4000);
              setToast({ msg: "⏰ " + min + " minute" + (min !== 1 ? "s" : "") + " elapsed — keep going or take a break!", bg: "#fef3c7", border: "#f59e0b" });
              setTimeout(() => setToast((t) => (t && t.msg && t.msg.indexOf(min + " minute") !== -1 ? null : t)), 4000);
            }
          });
          return ns;
        });
      }, 1000);
    } else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [timerRunning, timerReminders]);

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
  const overdue         = solved.filter((p) => p.revStage < 4 && getNR(p) && getNR(p) < today);
  const dueToday        = solved.filter((p) => p.revStage < 4 && getNR(p) === today);
  const activeFilterCount = (filter !== "All" ? 1 : 0) + (topicFilter ? 1 : 0) + (patternFilter ? 1 : 0);
  const upcoming        = solved.filter((p) => { if (p.revStage >= 4) return false; const d = getNR(p); if (!d) return false; const diff = (new Date(d) - new Date(today)) / 86400000; return diff > 0 && diff <= 3; });
  const weakTopics      = (() => { const m = {}; solved.forEach((p) => { if (!p.topic) return; if (!m[p.topic]) m[p.topic] = { hard: 0, total: 0 }; m[p.topic].total++; if (p.difficulty === "Hard") m[p.topic].hard++; }); return Object.entries(m).filter(([, v]) => v.total >= 2 && v.hard / v.total >= 0.5).map(([t]) => t); })();
  const level           = LEVELS.find((l) => solved.length >= l.min && solved.length <= l.max) || LEVELS[0];
  const nextLvl         = LEVELS.find((l) => l.min > solved.length);
  const lvlPct          = nextLvl ? Math.round((solved.length - level.min) / (nextLvl.min - level.min) * 100) : 100;
  const weekStart       = (() => { const d = new Date(today); d.setDate(d.getDate() - d.getDay()); return d.toISOString().split("T")[0]; })();
  const solvedThisWeek  = problems.filter((p) => p.solvedDate >= weekStart && p.solvedDate <= today).length;
  const weeklyPct       = Math.min(Math.round(solvedThisWeek / weeklyGoal * 100), 100);
  // What single thing should the user do RIGHT NOW? (used by Today's hero CTA)
  const nextAction      = (() => {
    if (overdue.length > 0)  return { kind: "overdue",  problem: overdue[0],  count: overdue.length };
    if (dueToday.length > 0) return { kind: "dueToday", problem: dueToday[0], count: dueToday.length };
    if (problems.length === 0) return { kind: "empty" };
    if (solvedThisWeek < weeklyGoal) return { kind: "newProblem", count: weeklyGoal - solvedThisWeek };
    return { kind: "ahead", count: solvedThisWeek };
  })();
  const overdueCount    = due.filter((p) => getNR(p) < today).length;
  const sPct            = problems.length ? Math.round(solved.length / problems.length * 100) : 0;
  const totalSeconds    = timerSessions.reduce((a, s) => a + s.seconds, 0);
  const monthSeconds    = timerSessions.filter((s) => s.month === currentMonth).reduce((a, s) => a + s.seconds, 0);
  const weekSeconds     = timerSessions.filter((s) => s.date >= weekStart && s.date <= today).reduce((a, s) => a + s.seconds, 0);

  /* ─── PEAK PERFORMANCE PERIODS (FIX #3) ─── */
  const periodCounts = PERIODS.map((p) => ({
    ...p,
    count: p.hours.reduce((sum, h) => sum + (hourLog[h] || 0), 0),
  }));
  const peakPeriod    = periodCounts.reduce((max, p) => (p.count > max.count ? p : max), periodCounts[0]);
  const maxPeriodCount = Math.max(1, ...periodCounts.map((p) => p.count));
  const totalActions   = periodCounts.reduce((a, p) => a + p.count, 0);

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
      const newLog = elapsedSec > 0
        ? [...(pr.timeLogs || []), { date: today, seconds: elapsedSec, type: "revision", stage: pr.revStage + 1, result: fb }]
        : (pr.timeLogs || []);
      return { ...pr, revStage: ns, revDates: nd, revHistory: hist, timeLogs: newLog, totalRevTime: (pr.totalRevTime || 0) + elapsedSec };
    }));
    if (fb === "hard") setTimeout(() => setMistakeModal(id), 300);
    if (wasMaster)          { setXp((x) => x + 50); boom(); logActivity(); showToast("👑 MASTERED! +50 XP · " + timeLabel, "#fef9c3", "#facc15"); }
    else if (fb === "easy") { setXp((x) => x + 10); logActivity(); showToast("✅ Rev done! +10 XP · took " + timeLabel, "#ede9fe", "#a78bfa"); }
    else                    { setXp((x) => x + 5);  logActivity(); showToast("🔄 Rescheduled +5 XP · took " + timeLabel, "#fef3c7", "#fbbf24"); }
    bumpStreak();
  };
  const logMistake  = (type) => { if (!mistakeModal) return; setMistakes((prev) => [...prev, { date: today, type, problemId: mistakeModal }]); setMistakeModal(null); };
  const toggleBM    = (id) => setProblems((prev) => prev.map((p) => p.id !== id ? p : { ...p, bookmarked: !p.bookmarked }));
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
  const openAdd     = () => { setForm({ ...EMPTY, id: Date.now() }); setAddModalTab("basics"); setModal("add"); };
  const openEdit    = (p) => { setForm({ ...p }); setAddModalTab("basics"); setModal("edit"); };
  const closeModal  = () => { setModal(null); setForm(EMPTY); };
  const saveForm    = () => { if (!form.name.trim()) return; if (modal === "add") setProblems((prev) => [...prev, form]); else setProblems((prev) => prev.map((p) => p.id === form.id ? form : p)); closeModal(); };
  const saveTimerSession = () => { const sec = timerSecRef.current; if (sec < 30) return; setTimerSessions((prev) => [...prev, { date: today, seconds: sec, month: currentMonth, hour: nowObj.getHours() }]); };
  const resetTimer  = () => {
    saveTimerSession();
    setTimerRunning(false);
    setTimerSec(0);
    timerSecRef.current = 0;
    firedRemindersRef.current = new Set();
    setReminderFlash(null);
  };

  /* ─── TIMER REMINDER MANAGEMENT (FIX #2) ─── */
  const addReminder = () => {
    const n = Number(reminderInput);
    if (!Number.isFinite(n) || n <= 0 || n > 600) {
      showToast("Enter minutes between 1 and 600", "#fef2f2", "#fca5a5");
      return;
    }
    if (timerReminders.includes(n)) {
      showToast("That reminder already exists", "#fef3c7", "#fbbf24");
      return;
    }
    setTimerReminders((prev) => [...prev, n].sort((a, b) => a - b));
    setReminderInput("");
  };
  const removeReminder = (m) => setTimerReminders((prev) => prev.filter((x) => x !== m));

  /* ─── EXPORT ─── */
  const exportData = () => {
    const now = new Date();
    const ts  = now.getFullYear() + "-"
      + String(now.getMonth()+1).padStart(2,"0") + "-"
      + String(now.getDate()).padStart(2,"0") + "-"
      + String(now.getHours()).padStart(2,"0")
      + String(now.getMinutes()).padStart(2,"0");
    const payload = { version: 1, exportedAt: now.toISOString(), problems, xp, streak, activityLog, topicNotes, timerSessions, hourLog, revQuality, mistakes, milestonesShown, milestoneLog, revIntervals, timerReminders, weeklyGoal, streakMode, dark };
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
        apply("timerReminders",  setTimerReminders,  d.timerReminders  ?? [15,25,45]);
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

      {/* Bottom — consolidated to dark mode + settings */}
      <div style={{ padding: "14px 16px", borderTop: "1px solid " + T.cardBorder }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <button onClick={() => setDark((d) => !d)} title={dark ? "Light mode" : "Dark mode"} style={{ flex: 1, padding: "9px", borderRadius: 10, border: "1.5px solid " + T.cardBorder, cursor: "pointer", fontSize: 13, fontWeight: 700, background: dark ? "#fbbf24" : "linear-gradient(135deg,#1e1b4b,#312e81)", color: dark ? "#1e1b4b" : "white", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <span>{dark ? "☀️" : "🌙"}</span>
          </button>
          <button onClick={() => setSettingsOpen(true)} title="Settings — backup, restore, preferences" style={{ flex: 2, padding: "9px", borderRadius: 10, border: "1.5px solid " + T.cardBorder, cursor: "pointer", fontSize: 13, fontWeight: 700, background: dark ? T.mutedBg : "#f8fafc", color: T.text, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <span>⚙️</span><span>Settings</span>
            {showBackupWarning && <span style={{ background: "#dc2626", color: "white", borderRadius: 99, fontSize: 9, padding: "1px 5px", fontWeight: 700 }}>!</span>}
          </button>
        </div>

        <div style={{ textAlign: "center", fontSize: 10, color: T.subtext, lineHeight: 1.5, opacity: 0.7 }}>
          Local storage · {problems.length} problems
        </div>
      </div>
    </div>
  );

  /* ─── TODAY TAB — HERO CTA + KPIs + REFERENCE ─── */
  const TodayTab = () => {
    // Hero CTA configuration based on next-action priority
    const heroConfig = (() => {
      if (nextAction.kind === "overdue") {
        return {
          title: nextAction.count + " overdue revision" + (nextAction.count > 1 ? "s" : "") + " — clear them now",
          subtitle: "Start with: " + nextAction.problem.name,
          cta: "Go to Revisions →",
          onClick: () => setTab("revision"),
          bg: "linear-gradient(135deg,#7f1d1d,#dc2626)",
          glowColor: "rgba(239,68,68,0.45)",
          icon: "⚠️",
          urgent: true,
        };
      }
      if (nextAction.kind === "dueToday") {
        return {
          title: nextAction.count + " revision" + (nextAction.count > 1 ? "s" : "") + " due today",
          subtitle: "Start with: " + nextAction.problem.name + " (Rev " + (nextAction.problem.revStage + 1) + ")",
          cta: "Start Revising →",
          onClick: () => setTab("revision"),
          bg: "linear-gradient(135deg,#1e3a8a,#4f46e5,#7c3aed)",
          glowColor: "rgba(79,70,229,0.4)",
          icon: "🔁",
          urgent: false,
        };
      }
      if (nextAction.kind === "empty") {
        return {
          title: "Ready to start your DSA journey?",
          subtitle: "Add your first problem to begin tracking progress",
          cta: "Add Problem →",
          onClick: () => { setTab("tracker"); openAdd(); },
          bg: "linear-gradient(135deg,#0f766e,#059669,#10b981)",
          glowColor: "rgba(16,185,129,0.4)",
          icon: "🎯",
          urgent: false,
        };
      }
      if (nextAction.kind === "newProblem") {
        return {
          title: "All revisions clear — solve a new problem",
          subtitle: nextAction.count + " more this week to hit your goal of " + weeklyGoal,
          cta: "Open Tracker →",
          onClick: () => setTab("tracker"),
          bg: "linear-gradient(135deg,#0f766e,#059669,#10b981)",
          glowColor: "rgba(16,185,129,0.4)",
          icon: "💻",
          urgent: false,
        };
      }
      return {
        title: "You're ahead of your weekly goal — nice work!",
        subtitle: solvedThisWeek + " problems solved this week · keep the streak alive",
        cta: "Open Tracker →",
        onClick: () => setTab("tracker"),
        bg: "linear-gradient(135deg,#7c3aed,#a855f7,#ec4899)",
        glowColor: "rgba(168,85,247,0.4)",
        icon: "🚀",
        urgent: false,
      };
    })();

    return (
      <div>
        {showBackupWarning && (
          <div style={{ background: dark ? "#1a1200" : "#fffbeb", border: "1.5px solid " + (dark ? "#854d0e" : "#fcd34d"), borderRadius: 11, padding: "10px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>💾</span>
            <div style={{ flex: 1, fontSize: 12, color: dark ? "#fde68a" : "#92400e" }}>
              <span style={{ fontWeight: 700 }}>
                {daysSinceBackup === null ? "No backup ever made." : daysSinceBackup + " days since last backup."}
              </span>
              {" "}Back up your data so you never lose progress.
            </div>
            <button onClick={() => setSettingsOpen(true)} style={{ background: "linear-gradient(135deg,#d97706,#f59e0b)", color: "white", border: "none", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
              Back up now
            </button>
          </div>
        )}

        {/* HERO — single decisive CTA */}
        <div style={{
          background: heroConfig.bg,
          borderRadius: 18,
          padding: "28px 32px",
          marginBottom: 16,
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 20,
          boxShadow: "0 12px 32px " + heroConfig.glowColor,
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ fontSize: 56, animation: heroConfig.urgent ? "pulse 1.5s infinite" : "float 3s ease-in-out infinite", flexShrink: 0 }}>{heroConfig.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, opacity: 0.65, fontWeight: 700, marginBottom: 4 }}>Today's Mission</div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.4, lineHeight: 1.25, marginBottom: 4 }}>{heroConfig.title}</div>
            <div style={{ fontSize: 13, opacity: 0.78, lineHeight: 1.5 }}>{heroConfig.subtitle}</div>
          </div>
          <button onClick={heroConfig.onClick} className="hbtn" style={{
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)",
            border: "1.5px solid rgba(255,255,255,0.4)",
            color: "white",
            padding: "13px 22px",
            borderRadius: 12,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 700,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}>{heroConfig.cta}</button>
        </div>

        {/* KPI ROW — three cards, equal weight */}
        <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 18 }}>
          {/* Streak */}
          <div style={{ background: dark ? T.cardBg : "white", border: "1.5px solid " + (streak.count > 0 ? "#fdba74" : T.cardBorder), borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 32 }}>🔥</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: streak.count > 0 ? "#ea580c" : T.subtext, lineHeight: 1, letterSpacing: -0.5 }}>{streak.count}</div>
              <div style={{ fontSize: 11, color: T.subtext, marginTop: 4, textTransform: "uppercase", letterSpacing: 0.7, fontWeight: 600 }}>Day streak</div>
            </div>
            {daysMissed >= 1 && streak.count > 0 && (
              <div style={{ fontSize: 10, color: "#dc2626", fontWeight: 700, background: dark ? "#2d1515" : "#fee2e2", padding: "3px 8px", borderRadius: 5 }}>
                {daysMissed === 1 ? "1d gap" : daysMissed + "d gap"}
              </div>
            )}
          </div>

          {/* Weekly Progress */}
          <div style={{ background: dark ? T.cardBg : "white", border: "1.5px solid " + (solvedThisWeek >= weeklyGoal ? "#86efac" : T.cardBorder), borderRadius: 14, padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: T.subtext, textTransform: "uppercase", letterSpacing: 0.7, fontWeight: 600 }}>Week progress</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: solvedThisWeek >= weeklyGoal ? "#16a34a" : "#4f46e5" }}>{solvedThisWeek}/{weeklyGoal}</span>
            </div>
            <div style={{ background: dark ? T.mutedBg : "#eef2ff", borderRadius: 99, height: 9, overflow: "hidden", marginBottom: 8 }}>
              <div style={{ background: solvedThisWeek >= weeklyGoal ? "linear-gradient(90deg,#059669,#10b981)" : "linear-gradient(90deg,#4f46e5,#7c3aed)", height: 9, borderRadius: 99, width: weeklyPct + "%", transition: "width 0.7s" }} />
            </div>
            <div style={{ fontSize: 11, color: T.subtext }}>
              {solvedThisWeek >= weeklyGoal ? "🎉 Goal hit!" : (weeklyGoal - solvedThisWeek) + " more to go"}
            </div>
          </div>

          {/* Due / Overdue */}
          <div style={{ background: dark ? T.cardBg : "white", border: "1.5px solid " + (overdue.length > 0 ? "#fca5a5" : due.length > 0 ? "#fcd34d" : "#86efac"), borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 32 }}>{overdue.length > 0 ? "⚠️" : due.length > 0 ? "🔁" : "✅"}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: overdue.length > 0 ? "#dc2626" : due.length > 0 ? "#d97706" : "#16a34a", lineHeight: 1, letterSpacing: -0.5 }}>{due.length}</div>
              <div style={{ fontSize: 11, color: T.subtext, marginTop: 4, textTransform: "uppercase", letterSpacing: 0.7, fontWeight: 600 }}>
                {overdue.length > 0 ? overdue.length + " overdue" : due.length > 0 ? "Due today" : "All clear!"}
              </div>
            </div>
          </div>
        </div>

        {/* SECONDARY CONTENT — left/right split, de-emphasized */}
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>

          {/* LEFT — schedule preview + activity */}
          <div>
            {upcoming.length > 0 && (
              <Card bg="white" border="#e5e7eb">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: T.text }}>⏳ Coming Up (1–3 days)</div>
                  <span style={{ fontSize: 11, color: T.subtext, background: dark ? T.mutedBg : "#f1f5f9", padding: "2px 9px", borderRadius: 99, fontWeight: 600 }}>{upcoming.length} problems</span>
                </div>
                {upcoming.slice(0, 5).map((p, i) => {
                  const rm = REV_META[p.revStage] || REV_META[0];
                  const ct = TCd(p.topic);
                  return (
                    <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < Math.min(upcoming.length, 5) - 1 ? "1px solid " + T.cardBorder : "none" }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", flex: 1, minWidth: 0 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 99, background: rm.dot, flexShrink: 0 }} />
                        <span style={{ fontWeight: 600, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
                        {p.topic && <Pill label={p.topic} bg={ct.bg} border={ct.border} text={ct.text} sm />}
                      </div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                        <Pill label={rm.label} bg={rm.bg} border={rm.border} text={rm.text} sm />
                        <span style={{ fontSize: 11, color: "#d97706", fontWeight: 700, background: "#fffbeb", padding: "2px 8px", borderRadius: 5, border: "1px solid #fcd34d", whiteSpace: "nowrap" }}>{getNR(p)}</span>
                      </div>
                    </div>
                  );
                })}
              </Card>
            )}

            {bookmarked.length > 0 && (
              <Card bg="#fffbeb" border="#fcd34d">
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, color: "#92400e", display: "flex", alignItems: "center", gap: 8 }}>
                  <span>⭐</span><span>Bookmarked Problems</span>
                  <span style={{ marginLeft: "auto", fontSize: 11, color: "#92400e", background: "rgba(255,255,255,0.6)", padding: "2px 9px", borderRadius: 99, fontWeight: 600 }}>{bookmarked.length}</span>
                </div>
                {bookmarked.slice(0, 4).map((p, i) => {
                  const ct = TCd(p.topic);
                  return (
                    <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 10px", background: i % 2 === 0 ? dark ? T.rowAlt : "rgba(255,255,255,0.6)" : "transparent", borderRadius: 7, marginBottom: 3 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: 12 }}>⭐</span>
                        <span style={{ fontWeight: 600, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {p.link ? <a href={p.link} target="_blank" rel="noreferrer" style={{ color: ct.pill, textDecoration: "none" }}>{p.name} ↗</a> : p.name}
                        </span>
                      </div>
                      <button onClick={() => toggleBM(p.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#d97706", fontSize: 13 }}>✕</button>
                    </div>
                  );
                })}
              </Card>
            )}

            {weakTopics.length > 0 && (
              <Card bg="#fff1f2" border="#fda4af">
                <div style={{ fontWeight: 700, fontSize: 13, color: "#9f1239", marginBottom: 8 }}>⚠️ Topics with high Hard ratio</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {weakTopics.map((t, i) => <Pill key={i} label={t} bg="#fee2e2" border="#fca5a5" text="#9f1239" />)}
                </div>
              </Card>
            )}
          </div>

          {/* RIGHT — week summary + quote (de-emphasized) */}
          <div>
            <Card bg={dark ? "#1a1f2e" : "#fef9c3"} border={dark ? "#78350f" : "#fde047"}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#92400e", marginBottom: 10 }}>This Week</div>
              <div style={{ display: "grid", gap: 8 }}>
                {[
                  { l: "Solved",    v: solvedThisWeek,  c: "#059669", icon: "✅" },
                  { l: "Revisions", v: weekRevisions,   c: "#7c3aed", icon: "🔁" },
                  { l: "Time",      v: fmtHours(weekSeconds) || "0m", c: "#0891b2", icon: "⏱" },
                  { l: "Mastered",  v: mastered.length, c: "#eab308", icon: "👑" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 11px", background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)", borderRadius: 8 }}>
                    <span style={{ fontSize: 14 }}>{s.icon}</span>
                    <span style={{ fontSize: 12, color: T.subtext, flex: 1 }}>{s.l}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: s.c }}>{s.v}</span>
                  </div>
                ))}
              </div>
              {bestTopicThisWeek && (
                <div style={{ fontSize: 11, color: "#92400e", marginTop: 10, padding: "7px 10px", background: "rgba(255,255,255,0.5)", borderRadius: 7, fontWeight: 600 }}>
                  Best topic: {bestTopicThisWeek}
                </div>
              )}
            </Card>

            <Card bg={dark ? "#0f172a" : "#f8fafc"} border={dark ? "#1e293b" : "#e2e8f0"}>
              <div style={{ fontSize: 11, color: T.subtext, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.7, fontWeight: 700 }}>Daily reminder</div>
              <div style={{ fontSize: 13, color: T.text, lineHeight: 1.55, fontStyle: "italic", opacity: 0.85 }}>"{quote}"</div>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  /* ─── REVISION TAB — GROUPED BY URGENCY ─── */
  const RevisionTab = () => {
    // Get last mistake for a problem (most recent entry)
    const getLastMistake = (pid) => {
      const arr = mistakes.filter((m) => m.problemId === pid);
      return arr.length ? arr[arr.length - 1] : null;
    };

    const renderProblemCard = (p, urgency) => {
      const rm = REV_META[p.revStage] || REV_META[0];
      const ct = TCd(p.topic);
      const lastMistake = getLastMistake(p.id);
      const lastResults = (p.revHistory || []).slice(-3);
      const overdueDays = urgency === "overdue"
        ? Math.floor((new Date(today) - new Date(getNR(p))) / 86400000)
        : 0;

      const cardBorder = urgency === "overdue" ? (dark ? "#7f1d1d" : "#fca5a5")
        : urgency === "today" ? (dark ? rm.dot + "55" : rm.border)
        : (dark ? "#3b82f644" : "#bfdbfe");
      const cardBg = urgency === "overdue" ? (dark ? "#2d0a0a" : "#fef2f2")
        : urgency === "today" ? (dark ? T.cardBg : rm.bg)
        : (dark ? T.cardBg : "white");

      return (
        <div key={p.id} style={{
          background: cardBg,
          border: "2px solid " + cardBorder,
          borderRadius: 14,
          padding: 18,
          animation: "pop 0.3s ease",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          boxShadow: urgency === "overdue" ? "0 4px 14px rgba(220,38,38,0.12)" : "0 1px 3px rgba(0,0,0,0.04)",
        }}>
          {/* Top row — tags */}
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
            {p.topic && <Pill label={p.topic} bg={ct.bg} border={ct.border} text={ct.text} />}
            <Pill label={rm.label} bg={rm.bg} border={rm.border} text={rm.text} />
            {urgency === "overdue" && (
              <Pill label={overdueDays > 0 ? overdueDays + "d overdue" : "Overdue"} bg="#fee2e2" border="#fca5a5" text="#991b1b" />
            )}
            {p.bookmarked && <span style={{ marginLeft: "auto", fontSize: 14 }}>⭐</span>}
          </div>

          {/* Problem name — biggest text */}
          <div style={{ fontWeight: 700, fontSize: 17, lineHeight: 1.3, color: T.text }}>
            {p.link ? (
              <a href={p.link} target="_blank" rel="noreferrer" style={{ color: rm.dot, textDecoration: "none" }}>
                {p.name} <span style={{ fontSize: 12, opacity: 0.6 }}>↗</span>
              </a>
            ) : p.name}
          </div>

          {/* THE recall hint — last mistake OR key code, visible by default */}
          {lastMistake ? (
            <div style={{ background: dark ? "#2d1515" : "#fff7ed", border: "1.5px solid " + (dark ? "#7f1d1d" : "#fdba74"), borderRadius: 9, padding: "9px 12px", borderLeft: "3px solid #ea580c" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#c2410c", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>Last time, you tripped on:</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: dark ? "#fdba74" : "#9a3412" }}>{lastMistake.type}</div>
            </div>
          ) : p.codeSnippet ? (
            <div className="mono" style={{ background: "#1e293b", borderRadius: 9, padding: "9px 12px", fontSize: 12, color: "#a78bfa", borderLeft: "3px solid " + rm.dot, whiteSpace: "pre-wrap", overflowX: "auto", maxHeight: 90 }}>
              <div style={{ fontSize: 9, color: "#64748b", marginBottom: 3, fontFamily: "system-ui", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>Pattern</div>
              {p.codeSnippet}
            </div>
          ) : p.note ? (
            <div style={{ background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.65)", border: "1px solid " + T.cardBorder, borderRadius: 9, padding: "9px 12px", borderLeft: "3px solid " + rm.dot, fontSize: 12, color: dark ? T.subtext : rm.text, lineHeight: 1.55 }}>
              <div style={{ fontSize: 9, color: T.subtext, marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>Note</div>
              {p.note.length > 140 ? p.note.slice(0, 140) + "…" : p.note}
            </div>
          ) : (
            <div style={{ fontSize: 11, color: T.subtext, fontStyle: "italic", padding: "4px 0" }}>
              No notes yet — try recalling cold first.
            </div>
          )}

          {/* Goal for this revision stage */}
          <div style={{ fontSize: 12, fontWeight: 700, color: rm.dot, display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontSize: 11, opacity: 0.6 }}>Goal:</span>
            <span>{rm.desc}</span>
            <span style={{ marginLeft: "auto", fontSize: 11, opacity: 0.7 }}>+{rm.xp} XP</span>
          </div>

          {/* Recent results sparkline */}
          {lastResults.length > 0 && (
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: 10, color: T.subtext, marginRight: 2 }}>Recent:</span>
              {lastResults.map((h, i) => (
                <span key={i} style={{ fontSize: 10, background: h.result === "easy" ? dark ? "#14281f" : "#d1fae5" : dark ? "#2d1515" : "#fee2e2", color: h.result === "easy" ? "#059669" : "#dc2626", borderRadius: 5, padding: "2px 7px", fontWeight: 600, border: "1px solid " + (h.result === "easy" ? "#86efac" : "#fca5a5") }}>
                  R{h.stage} · {h.seconds >= 60 ? Math.floor(h.seconds / 60) + "m" : h.seconds + "s"}
                </span>
              ))}
            </div>
          )}

          {/* Stage progress dots */}
          <div>
            <div style={{ display: "flex", gap: 3, marginBottom: 3 }}>
              {REV_META.map((_, i) => (
                <div key={i} style={{ flex: 1, height: 5, borderRadius: 99, background: i < p.revStage ? "#10b981" : i === p.revStage ? rm.dot : dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }} />
              ))}
            </div>
            <div style={{ fontSize: 10, color: T.subtext }}>Stage {p.revStage + 1} of 4</div>
          </div>

          {/* BIG action buttons */}
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <button onClick={() => markRev(p.id, "easy")} className="hbtn" style={{
              flex: 1,
              background: "linear-gradient(135deg,#059669,#10b981)",
              color: "white",
              border: "none",
              borderRadius: 11,
              padding: "13px",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
              letterSpacing: 0.3,
            }}>😊 Easy</button>
            <button onClick={() => markRev(p.id, "hard")} className="hbtn" style={{
              flex: 1,
              background: "linear-gradient(135deg,#dc2626,#ef4444)",
              color: "white",
              border: "none",
              borderRadius: 11,
              padding: "13px",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(239,68,68,0.3)",
              letterSpacing: 0.3,
            }}>😰 Hard</button>
          </div>
        </div>
      );
    };

    const renderSection = (title, problemList, urgency, color, bgColor, icon, hint) => {
      if (problemList.length === 0) return null;
      return (
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 16px",
            background: bgColor,
            border: "1.5px solid " + color,
            borderRadius: 11,
            marginBottom: 14,
          }}>
            <span style={{ fontSize: 18, animation: urgency === "overdue" ? "glow 1.5s infinite" : "none" }}>{icon}</span>
            <span style={{ fontWeight: 700, fontSize: 14, color: color, flex: 1 }}>{title}</span>
            <span style={{ fontSize: 12, color: color, fontWeight: 700, background: "rgba(255,255,255,0.6)", padding: "3px 11px", borderRadius: 99 }}>
              {problemList.length} problem{problemList.length > 1 ? "s" : ""}
            </span>
            {hint && <span style={{ fontSize: 11, color: color, opacity: 0.75, fontWeight: 600 }}>{hint}</span>}
          </div>
          <div className="rev-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {problemList.map((p) => renderProblemCard(p, urgency))}
          </div>
        </div>
      );
    };

    return (
      <div>
        {/* Stage legend */}
        <div className="four-col" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 20 }}>
          {REV_META.map((r, i) => (
            <div key={i} style={{ background: dark ? T.cardBg : r.bg, border: "1.5px solid " + (dark ? r.dot + "44" : r.border), borderRadius: 11, padding: "10px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontWeight: 700, fontSize: 12, color: r.dot }}>{r.label}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: r.dot, opacity: 0.7 }}>+{r.xp}</span>
              </div>
              <div style={{ fontSize: 10, color: dark ? T.subtext : r.text, lineHeight: 1.4 }}>{r.desc}</div>
              <div style={{ marginTop: 6, background: r.bar, borderRadius: 99, height: 2 }} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {due.length === 0 && upcoming.length === 0 && (
          <Card bg="linear-gradient(135deg,#f0fdf4,#dcfce7)" border="#86efac" style={{ textAlign: "center", padding: 56 }}>
            <div style={{ fontSize: 64, marginBottom: 14 }}>🎉</div>
            <div style={{ fontWeight: 700, fontSize: 20, color: "#15803d", marginBottom: 6 }}>All caught up!</div>
            <div style={{ fontSize: 14, color: "#16a34a" }}>No revisions pending. Go solve something new!</div>
            <button onClick={() => setTab("tracker")} className="hbtn" style={{ marginTop: 18, background: "linear-gradient(135deg,#059669,#10b981)", color: "white", border: "none", borderRadius: 10, padding: "11px 28px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>Open Tracker →</button>
          </Card>
        )}

        {/* OVERDUE — most urgent, top */}
        {renderSection(
          "Overdue — clear these first",
          overdue,
          "overdue",
          "#dc2626",
          dark ? "#2d0a0a" : "#fef2f2",
          "⚠️",
          "These are decaying fast"
        )}

        {/* DUE TODAY */}
        {renderSection(
          "Due Today",
          dueToday,
          "today",
          "#d97706",
          dark ? "#2d1f00" : "#fffbeb",
          "🔁",
          null
        )}

        {/* COMING UP — preview only */}
        {renderSection(
          "Coming Up (next 1–3 days)",
          upcoming.slice(0, 6),
          "upcoming",
          "#2563eb",
          dark ? "#0a0f2d" : "#eff6ff",
          "⏳",
          upcoming.length > 6 ? "+ " + (upcoming.length - 6) + " more" : null
        )}
      </div>
    );
  };

  /* ─── TRACKER TAB — TIMER + COMPACT FILTERS + 3 VIEWS + FAB ─── */
  const TrackerTab = () => (
    <div style={{ paddingBottom: 80 }}>
      {/* Timer + Progress row (unchanged) */}
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        {(() => {
          const linked = linkedProblemId ? problems.find((p) => p.id === linkedProblemId) : null;
          const passedReminders = timerReminders.filter((m) => timerSec >= m * 60).length;
          const maxReminderSec  = timerReminders.length ? Math.max(...timerReminders) * 60 : 1200;
          const timerColor = passedReminders === 0 ? "#4f46e5"
            : passedReminders < timerReminders.length ? "#f97316"
            : "#ef4444";
          const flashing = reminderFlash !== null;
          return (
            <Card bg={timerRunning ? dark ? "#1a0a00" : "#fff7ed" : dark ? T.cardBg : "white"} border={flashing ? "#f59e0b" : timerRunning ? "#f97316" : linked ? "#4f46e5" : T.cardBorder} style={flashing ? { boxShadow: "0 0 0 4px rgba(245,158,11,0.25), 0 0 30px rgba(245,158,11,0.4)" } : {}}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                    Solve Timer
                    <span style={{ fontSize: 11, fontWeight: 400, color: T.subtext }}>— rings at your reminders</span>
                  </div>
                  {linked ? (
                    <div style={{ fontSize: 11, background: dark ? "#1e293b" : "#eff6ff", border: "1px solid " + (dark ? "#4f46e544" : "#bfdbfe"), borderRadius: 7, padding: "3px 10px", marginBottom: 6, color: dark ? "#a78bfa" : "#4f46e5", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }}>
                      ⏱ Linked: {linked.name}
                      <button onClick={() => setLinkedProblemId(null)} style={{ background: "none", border: "none", cursor: "pointer", color: T.subtext, fontSize: 11, padding: 0, lineHeight: 1 }}>✕</button>
                    </div>
                  ) : (
                    <div style={{ fontSize: 11, color: T.subtext, marginBottom: 6 }}>Click ⏱ on a problem below to link it</div>
                  )}
                  <div className="mono" style={{ fontSize: 44, fontWeight: 600, color: timerColor, letterSpacing: 5, transition: "color 0.4s" }}>{fmtTime(timerSec)}</div>
                  {timerReminders.length > 0 && timerSec > 0 && (
                    <div style={{ position: "relative", marginTop: 6, marginBottom: 4 }}>
                      <div style={{ background: dark ? T.mutedBg : "#e0e7ff", borderRadius: 99, height: 6, overflow: "hidden" }}>
                        <div style={{
                          background: passedReminders === 0
                            ? "linear-gradient(90deg,#4f46e5,#7c3aed)"
                            : passedReminders < timerReminders.length
                            ? "linear-gradient(90deg,#f97316,#fb923c)"
                            : "linear-gradient(90deg,#ef4444,#f87171)",
                          height: 6,
                          borderRadius: 99,
                          width: Math.min(timerSec / maxReminderSec * 100, 100) + "%",
                          transition: "width 1s linear, background 0.4s",
                        }} />
                      </div>
                      {timerReminders.map((m) => {
                        const pct = Math.min((m * 60) / maxReminderSec * 100, 100);
                        const passed = timerSec >= m * 60;
                        return (
                          <div key={m} title={m + " min reminder"} style={{
                            position: "absolute",
                            left: pct + "%",
                            top: -2,
                            transform: "translateX(-50%)",
                            width: 2,
                            height: 10,
                            background: passed ? "#dc2626" : "#a78bfa",
                            opacity: passed ? 0.9 : 0.6,
                          }} />
                        );
                      })}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", marginTop: 4 }}>
                    <span style={{ fontSize: 10, color: T.subtext, fontWeight: 600 }}>Reminders:</span>
                    {timerReminders.map((m) => {
                      const passed = timerSec >= m * 60;
                      const fired = firedRemindersRef.current.has(m);
                      return (
                        <span key={m} style={{
                          display: "inline-flex", alignItems: "center", gap: 3,
                          fontSize: 10, fontWeight: 700,
                          background: passed ? dark ? "#2d1515" : "#fee2e2" : fired ? "#fffbeb" : dark ? T.chipBg : "#f5f3ff",
                          color: passed ? "#dc2626" : "#7c3aed",
                          border: "1px solid " + (passed ? "#fca5a5" : dark ? T.chipBorder : "#c4b5fd"),
                          padding: "2px 7px", borderRadius: 99,
                        }}>
                          {m}m
                          <button onClick={() => removeReminder(m)} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0, fontSize: 10, opacity: 0.6, lineHeight: 1 }}>✕</button>
                        </span>
                      );
                    })}
                    <input
                      type="number" min="1" max="180"
                      value={reminderInput}
                      onChange={(e) => setReminderInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addReminder()}
                      placeholder="add"
                      style={{ width: 50, fontSize: 11, padding: "2px 6px", borderRadius: 6, border: "1px dashed " + T.inputBorder, background: T.inputBg, color: T.text }}
                    />
                    <button onClick={addReminder} style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "white", border: "none", borderRadius: 6, padding: "2px 9px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>+</button>
                  </div>
                  {flashing && (
                    <div style={{ marginTop: 6, fontSize: 12, fontWeight: 700, color: "#d97706", display: "flex", alignItems: "center", gap: 6, animation: "glow 1s infinite" }}>
                      <span style={{ fontSize: 14 }}>🔔</span> {reminderFlash} minute{reminderFlash !== 1 ? "s" : ""} elapsed!
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <button onClick={() => setTimerRunning((r) => !r)} className="hbtn" style={{ background: timerRunning ? "linear-gradient(135deg,#dc2626,#ef4444)" : "linear-gradient(135deg,#059669,#10b981)", color: "white", border: "none", borderRadius: 9, padding: "10px 18px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>{timerRunning ? "Pause" : "Start"}</button>
                  <button onClick={() => {
                    const sec = timerSecRef.current;
                    if (sec >= 30) {
                      const sessionRecord = {
                        date: today, seconds: sec, month: currentMonth, hour: nowObj.getHours(),
                        problemId: linkedProblemId || null,
                        problemName: linkedProblemId ? (problems.find((p) => p.id === linkedProblemId)?.name || "") : "",
                        type: "solve",
                      };
                      setTimerSessions((prev) => [...prev, sessionRecord]);
                    }
                    if (linkedProblemId && sec >= 30) {
                      const linkedName = problems.find((p) => p.id === linkedProblemId)?.name || "";
                      setProblems((prev) => prev.map((p) => p.id !== linkedProblemId ? p : {
                        ...p,
                        timeLogs: [...(p.timeLogs || []), { date: today, seconds: sec, type: "solve" }],
                        totalSolveTime: (p.totalSolveTime || 0) + sec,
                        solveSessions: [...(p.solveSessions || []), { date: today, seconds: sec }],
                      }));
                      showToast('⏱ ' + fmtTime(sec) + ' saved to "' + linkedName + '"', "#eff6ff", "#bfdbfe");
                      setLinkedProblemId(null);
                    } else if (sec >= 30) {
                      showToast("⏱ " + fmtTime(sec) + " session saved", "#eff6ff", "#bfdbfe");
                    }
                    setTimerRunning(false);
                    setTimerSec(0);
                    timerSecRef.current = 0;
                    firedRemindersRef.current = new Set();
                    setReminderFlash(null);
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
            <span style={{ marginLeft: "auto", fontSize: 12, color: "#7c3aed", fontWeight: 700, background: dark ? T.mutedBg : "#f5f3ff", padding: "2px 10px", borderRadius: 8, border: "1px solid " + (dark ? "#a78bfa44" : "#c4b5fd") }}>👑 {mastered.length} mastered</span>
          </div>
        </Card>
      </div>

      {/* SLIM SEARCH BAR + FILTERS BUTTON + VIEW TOGGLE */}
      <Card bg="white" border="#e5e7eb" style={{ marginBottom: 14, position: "relative" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Search problems by name..." style={{ flex: 1, minWidth: 180, padding: "10px 14px", borderRadius: 9, border: "1.5px solid " + T.inputBorder, fontSize: 13, background: T.inputBg, color: T.text }} />

          <button onClick={() => setFiltersOpen((v) => !v)} className="hbtn" style={{
            background: activeFilterCount > 0 ? "linear-gradient(135deg,#4f46e5,#7c3aed)" : T.chipBg,
            color: activeFilterCount > 0 ? "white" : T.text,
            border: "1.5px solid " + (activeFilterCount > 0 ? "#4f46e5" : T.chipBorder),
            borderRadius: 9, padding: "9px 14px", cursor: "pointer", fontSize: 13, fontWeight: 700,
            display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap",
          }}>
            <span>⚙</span><span>Filters</span>
            {activeFilterCount > 0 && (
              <span style={{ background: "rgba(255,255,255,0.3)", borderRadius: 99, fontSize: 11, padding: "1px 7px", fontWeight: 700 }}>{activeFilterCount}</span>
            )}
          </button>

          {/* View mode toggle */}
          <div style={{ display: "flex", border: "1.5px solid " + T.chipBorder, borderRadius: 9, overflow: "hidden" }}>
            {[
              { v: "flat",    label: "≡",  title: "Flat list" },
              { v: "grouped", label: "⊞",  title: "By section" },
              { v: "byTopic", label: "🏷", title: "By topic" },
            ].map(({ v, label, title }) => (
              <button key={v} onClick={() => setTrackerView(v)} title={title} style={{
                padding: "8px 12px", border: "none", cursor: "pointer", fontSize: 14,
                background: trackerView === v ? "linear-gradient(135deg,#4f46e5,#7c3aed)" : T.chipBg,
                color: trackerView === v ? "white" : T.subtext,
              }}>{label}</button>
            ))}
          </div>

          <span style={{ fontSize: 12, color: T.subtext, fontWeight: 600 }}>
            {filtered.length} of {problems.length}
          </span>
        </div>

        {/* Filters popover — inline expansion below the bar */}
        {filtersOpen && (
          <div className="filter-popover" style={{ marginTop: 12, padding: "14px 16px", background: dark ? T.rowAlt : "#f8fafc", border: "1.5px solid " + T.cardBorder, borderRadius: 11 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.subtext, textTransform: "uppercase", letterSpacing: 0.7 }}>Filters</span>
              <button onClick={() => { setFilter("All"); setTopicFilter(""); setPatternFilter(""); }} style={{ fontSize: 11, background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontWeight: 600 }}>Clear all</button>
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 6 }}>Status</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {[{ f: "All", bg: "#eff6ff", border: "#bfdbfe", tc: "#1d4ed8" }, { f: "Unsolved", bg: "#fef2f2", border: "#fca5a5", tc: "#dc2626" }, { f: "Solved", bg: "#ecfdf5", border: "#86efac", tc: "#16a34a" }, { f: "Mastered", bg: "#fef9c3", border: "#fde047", tc: "#ca8a04" }, { f: "Starred", bg: "#fffbeb", border: "#fcd34d", tc: "#d97706" }].map(({ f, bg, border, tc }) => (
                  <button key={f} onClick={() => setFilter(f)} style={{ padding: "5px 14px", borderRadius: 99, border: "1.5px solid " + (filter === f ? border : T.chipBorder), cursor: "pointer", fontSize: 12, fontWeight: 700, background: filter === f ? bg : T.chipBg, color: filter === f ? tc : T.subtext }}>{f}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 6 }}>Topic</div>
                <select value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)} style={{ width: "100%", padding: "8px 10px", borderRadius: 9, border: "1.5px solid " + T.inputBorder, fontSize: 12, background: T.inputBg, color: T.text }}>
                  <option value="">All topics</option>
                  {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 6 }}>Pattern</div>
                <select value={patternFilter} onChange={(e) => setPatternFilter(e.target.value)} style={{ width: "100%", padding: "8px 10px", borderRadius: 9, border: "1.5px solid " + T.inputBorder, fontSize: 12, background: T.inputBg, color: T.text }}>
                  <option value="">All patterns</option>
                  {PATTERNS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Empty state */}
      {filtered.length === 0 && (
        <Card bg="#f5f3ff" border="#c4b5fd" style={{ textAlign: "center", padding: 48 }}>
          {problems.length === 0 ? (
            <div>
              <div style={{ fontSize: 44, marginBottom: 12 }}>🎯</div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>No problems yet!</div>
              <div style={{ fontSize: 13, color: T.subtext, marginTop: 6 }}>Click the + button to add your first problem</div>
            </div>
          ) : <div style={{ color: T.subtext, fontSize: 14 }}>No problems match the current filters.</div>}
        </Card>
      )}

      {/* GROUPED VIEW (by Striver section) */}
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
              <div onClick={() => toggleSection(sec)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: dark ? "#1e1b4b" : "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "white", cursor: "pointer", userSelect: "none" }}>
                <span style={{ fontSize: 13, transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)", display: "inline-block", transform: secOpen ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
                <span style={{ fontSize: 15 }}>📂</span>
                <span style={{ fontWeight: 700, fontSize: 14, flex: 1 }}>{sec}</span>
                <div style={{ width: 60, height: 5, background: "rgba(255,255,255,0.2)", borderRadius: 99, overflow: "hidden", marginRight: 6 }}>
                  <div style={{ height: 5, width: solvedPct + "%", background: "rgba(255,255,255,0.85)", borderRadius: 99, transition: "width 0.5s" }} />
                </div>
                <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 99, padding: "2px 10px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>{solvedInSec}/{totalInSec}</span>
              </div>
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
                        <div onClick={() => toggleSubSec(subKey)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", background: dark ? "#1a1a2e" : "#eef2ff", cursor: "pointer", userSelect: "none" }}>
                          <span style={{ fontSize: 11, transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)", display: "inline-block", transform: subOpen ? "rotate(90deg)" : "rotate(0deg)", color: dark ? "#a78bfa" : "#4f46e5" }}>▶</span>
                          <span style={{ fontSize: 13 }}>📄</span>
                          <span style={{ fontWeight: 700, fontSize: 12, color: dark ? "#a78bfa" : "#4f46e5", flex: 1 }}>{sub}</span>
                          {masteredInSub > 0 && <span style={{ fontSize: 10, background: dark ? "#14281f" : "#d1fae5", color: "#059669", borderRadius: 5, padding: "1px 7px", fontWeight: 700, marginRight: 6 }}>👑 {masteredInSub}</span>}
                          <div style={{ width: 44, height: 4, background: dark ? "#2d2d4e" : "#c7d2fe", borderRadius: 99, overflow: "hidden", marginRight: 6 }}>
                            <div style={{ height: 4, width: subPct + "%", background: "linear-gradient(90deg,#4f46e5,#7c3aed)", borderRadius: 99, transition: "width 0.5s" }} />
                          </div>
                          <span style={{ fontSize: 11, color: dark ? "#a78bfa" : "#6366f1", fontWeight: 600, whiteSpace: "nowrap" }}>{solvedInSub}/{probs.length}</span>
                        </div>
                        <div className={"collapsible" + (subOpen ? " open" : "")}>
                          <div className="collapsible-inner" style={{ padding: "8px 12px", background: dark ? T.cardBg : "white" }}>
                            {probs.map((p) => renderCompactRow(p))}
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

      {/* BY-TOPIC VIEW — NEW */}
      {trackerView === "byTopic" && filtered.length > 0 && (() => {
        const byTopic = {};
        filtered.forEach((p) => {
          const t = p.topic || "Untagged";
          if (!byTopic[t]) byTopic[t] = [];
          byTopic[t].push(p);
        });
        const sortedTopics = Object.entries(byTopic).sort((a, b) => b[1].length - a[1].length);
        return sortedTopics.map(([topic, probs]) => {
          const ct = TCd(topic);
          const isOpen = !collapsedSections["topic|" + topic];
          const solvedInTopic = probs.filter((p) => p.status !== "Unsolved").length;
          const masteredInTopic = probs.filter((p) => p.revStage >= 4).length;
          const pct = probs.length ? Math.round(solvedInTopic / probs.length * 100) : 0;
          return (
            <div key={topic} style={{ marginBottom: 12, borderRadius: 12, overflow: "hidden", border: "1.5px solid " + (dark ? ct.pill + "55" : ct.border) }}>
              <div onClick={() => toggleSection("topic|" + topic)} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "11px 16px",
                background: dark ? "linear-gradient(90deg," + ct.pill + "22," + ct.pill + "11)" : ct.bg,
                color: dark ? ct.pill : ct.text, cursor: "pointer", userSelect: "none",
                borderLeft: "4px solid " + ct.pill,
              }}>
                <span style={{ fontSize: 12, transition: "transform 0.32s", display: "inline-block", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
                <span style={{ fontSize: 14 }}>🏷</span>
                <span style={{ fontWeight: 700, fontSize: 14, flex: 1 }}>{topic}</span>
                {masteredInTopic > 0 && <span style={{ fontSize: 10, background: dark ? "#14281f" : "#d1fae5", color: "#059669", borderRadius: 5, padding: "2px 7px", fontWeight: 700 }}>👑 {masteredInTopic}</span>}
                <div style={{ width: 60, height: 5, background: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: 5, width: pct + "%", background: ct.pill, borderRadius: 99, transition: "width 0.5s" }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>{solvedInTopic}/{probs.length}</span>
              </div>
              <div className={"collapsible" + (isOpen ? " open" : "")}>
                <div className="collapsible-inner" style={{ padding: "8px 12px", background: dark ? T.cardBg : "white" }}>
                  {probs.map((p) => renderCompactRow(p))}
                </div>
              </div>
            </div>
          );
        });
      })()}

      {/* FLAT VIEW */}
      {trackerView === "flat" && filtered.map((p) => renderFlatRow(p))}

      {/* FAB — bottom-right floating Add button */}
      <button onClick={openAdd} className="hbtn" title="Add a new problem" style={{
        position: "fixed",
        bottom: 28, right: 28,
        width: 60, height: 60,
        borderRadius: "50%",
        background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
        color: "white",
        border: "none",
        fontSize: 28,
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: "0 8px 28px rgba(79,70,229,0.5)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
      }}>+</button>
    </div>
  );

  // Compact row used by grouped + by-topic views
  const renderCompactRow = (p) => {
    const rm = REV_META[p.revStage] || REV_META[0];
    const ct = TCd(p.topic);
    const firstPattern = (p.pattern || [])[0];
    const morePatterns = Math.max(0, (p.pattern || []).length - 1);
    return (
      <div key={p.id} className="prow" style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "9px 11px", borderRadius: 9, marginBottom: 5,
        background: p.revStage >= 4 ? dark ? "#14281f" : "#f0fdf4" : dark ? T.rowAlt : "#f9fafb",
        border: "1px solid " + (p.revStage >= 4 ? "#86efac" : p.bookmarked ? "#fbbf24" : T.cardBorder),
      }}>
        <div style={{ flex: 1, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", minWidth: 0 }}>
          {p.bookmarked && <span style={{ fontSize: 12 }}>⭐</span>}
          <span style={{ fontWeight: 700, fontSize: 13 }}>
            {p.link ? <a href={p.link} target="_blank" rel="noreferrer" style={{ color: p.topic ? TCd(p.topic).pill : "#4f46e5", textDecoration: "none" }}>{p.name} ↗</a> : p.name}
          </span>
          {p.topic && <Pill label={p.topic} bg={ct.bg} border={ct.border} text={ct.text} sm />}
          {p.difficulty && <Pill label={p.difficulty} bg={p.difficulty === "Hard" ? "#fef2f2" : p.difficulty === "Medium" ? "#fffbeb" : "#f0fdf4"} border={p.difficulty === "Hard" ? "#fca5a5" : p.difficulty === "Medium" ? "#fcd34d" : "#86efac"} text={p.difficulty === "Hard" ? "#991b1b" : p.difficulty === "Medium" ? "#92400e" : "#166534"} sm />}
          {firstPattern && (
            <span title={(p.pattern || []).join(", ")} style={{ fontSize: 10, fontWeight: 600, color: "#7c3aed", background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 99, padding: "2px 8px", whiteSpace: "nowrap" }}>
              {firstPattern}{morePatterns > 0 ? " +" + morePatterns : ""}
            </span>
          )}
          {p.revStage >= 4 && <Pill label="👑 Mastered" bg="#d1fae5" border="#34d399" text="#065f46" sm />}
          {p.status !== "Unsolved" && p.revStage < 4 && <Pill label={"Rev " + p.revStage + "/4"} bg={rm.bg} border={rm.border} text={rm.text} sm />}
          {p.status === "Unsolved" && <Pill label="Unsolved" bg="#f8fafc" border="#cbd5e1" text="#64748b" sm />}
        </div>
        <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
          {p.status === "Unsolved" && <button onClick={() => markSolved(p.id)} className="hbtn" title="Mark solved" style={{ background: "linear-gradient(135deg,#059669,#10b981)", color: "white", border: "none", borderRadius: 7, padding: "5px 11px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>✓</button>}
          <button onClick={() => toggleBM(p.id)} title="Bookmark" style={{ background: p.bookmarked ? "#fffbeb" : T.chipBg, color: p.bookmarked ? "#d97706" : T.subtext, border: "1.5px solid " + (p.bookmarked ? "#fcd34d" : T.chipBorder), borderRadius: 7, padding: "5px 8px", cursor: "pointer", fontSize: 12 }}>⭐</button>
          <button onClick={() => openEdit(p)} title="Edit" style={{ background: "#f0f9ff", color: "#0369a1", border: "1.5px solid #bae6fd", borderRadius: 7, padding: "5px 8px", cursor: "pointer", fontSize: 12 }}>✏️</button>
          <button onClick={() => delP(p.id)} title="Delete" style={{ background: "#fef2f2", color: "#dc2626", border: "1.5px solid #fca5a5", borderRadius: 7, padding: "5px 8px", cursor: "pointer", fontSize: 12 }}>🗑</button>
        </div>
      </div>
    );
  };

  // Detailed row used by flat view
  const renderFlatRow = (p) => {
    const rm = REV_META[p.revStage] || REV_META[0];
    const ct = TCd(p.topic);
    const rowBg = p.revStage >= 4 ? dark ? "#14281f" : "#f0fdf4" : p.status === "Unsolved" ? T.cardBg : dark ? T.rowAlt : rm.bg;
    const rowBd = p.revStage >= 4 ? "#86efac" : p.bookmarked ? "#fbbf24" : p.status === "Unsolved" ? T.cardBorder : dark ? rm.dot + "44" : rm.border;
    const firstPattern = (p.pattern || [])[0];
    const morePatterns = Math.max(0, (p.pattern || []).length - 1);
    return (
      <div key={p.id} className="prow" style={{ background: rowBg, border: "1.5px solid " + rowBd, borderRadius: 12, padding: "14px 18px", marginBottom: 8 }}>
        {(p.section || p.subSection) && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: T.subtext, marginBottom: 7, paddingBottom: 7, borderBottom: "1px solid " + T.cardBorder }}>
            <span style={{ fontSize: 11 }}>📂</span>
            <span style={{ color: "#4f46e5", fontWeight: 700 }}>{p.section || "—"}</span>
            <span style={{ opacity: 0.4 }}>›</span>
            <span style={{ color: "#7c3aed", fontWeight: 600 }}>{p.subSection || "—"}</span>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center", marginBottom: 6 }}>
              {p.bookmarked && <span style={{ fontSize: 14 }}>⭐</span>}
              <span style={{ fontWeight: 700, fontSize: 15 }}>
                {p.link ? <a href={p.link} target="_blank" rel="noreferrer" style={{ color: p.topic ? TCd(p.topic).pill : "#4f46e5", textDecoration: "none" }}>{p.name} ↗</a> : p.name}
              </span>
              {p.topic && <Pill label={p.topic} bg={ct.bg} border={ct.border} text={ct.text} sm />}
              {p.difficulty && <Pill label={p.difficulty} bg={p.difficulty === "Hard" ? "#fef2f2" : p.difficulty === "Medium" ? "#fffbeb" : "#f0fdf4"} border={p.difficulty === "Hard" ? "#fca5a5" : p.difficulty === "Medium" ? "#fcd34d" : "#86efac"} text={p.difficulty === "Hard" ? "#991b1b" : p.difficulty === "Medium" ? "#92400e" : "#166534"} sm />}
              {p.revStage >= 4 && <Pill label="👑 Mastered" bg="#d1fae5" border="#34d399" text="#065f46" sm />}
              {p.status !== "Unsolved" && p.revStage < 4 && <Pill label={"Rev " + p.revStage + "/4"} bg={rm.bg} border={rm.border} text={rm.text} sm />}
              {p.status === "Unsolved" && <Pill label="Unsolved" bg="#f8fafc" border="#cbd5e1" text="#64748b" sm />}
            </div>
            {firstPattern && (
              <div style={{ marginBottom: 6 }}>
                <span title={(p.pattern || []).join(", ")} style={{ fontSize: 11, fontWeight: 600, color: "#7c3aed", background: "#f5f3ff", border: "1px solid #c4b5fd", borderRadius: 99, padding: "2px 9px" }}>
                  {firstPattern}{morePatterns > 0 ? " +" + morePatterns + " more" : ""}
                </span>
              </div>
            )}
            {p.note && <div style={{ fontSize: 12, color: dark ? T.subtext : "#475569", marginTop: 5, lineHeight: 1.55 }}>📝 {p.note.length > 200 ? p.note.slice(0, 200) + "…" : p.note}</div>}
            {p.codeSnippet && <div className="mono" style={{ marginTop: 6, background: "#1e293b", borderRadius: 8, padding: "8px 12px", fontSize: 11, color: "#a78bfa", whiteSpace: "pre-wrap", overflowX: "auto", maxHeight: 80 }}>💻 {p.codeSnippet}</div>}
            {((p.totalSolveTime || 0) > 0 || (p.totalRevTime || 0) > 0) && (
              <div style={{ display: "flex", gap: 8, marginTop: 5, flexWrap: "wrap" }}>
                {(p.totalSolveTime || 0) > 0 && (
                  <span style={{ fontSize: 10, background: dark ? "#1e293b" : "#eff6ff", color: "#4f46e5", borderRadius: 5, padding: "2px 8px", fontWeight: 600, border: "1px solid " + (dark ? "#4f46e544" : "#bfdbfe") }}>
                    ⏱ Solve: {fmtHours(p.totalSolveTime)}
                  </span>
                )}
                {(p.totalRevTime || 0) > 0 && (
                  <span style={{ fontSize: 10, background: dark ? "#14281f" : "#f0fdf4", color: "#059669", borderRadius: 5, padding: "2px 8px", fontWeight: 600, border: "1px solid " + (dark ? "#34d39944" : "#86efac") }}>
                    🔁 Rev: {fmtHours(p.totalRevTime)}
                  </span>
                )}
              </div>
            )}
            {p.status !== "Unsolved" && p.revStage < 4 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 3 }}>{REV_META.map((_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: i < p.revStage ? "#10b981" : i === p.revStage ? rm.dot : dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }} />)}</div>
                <div style={{ fontSize: 11, color: T.subtext }}>Next: {rm.desc} · {getNR(p)}</div>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            {p.status === "Unsolved" && <button onClick={() => markSolved(p.id)} className="hbtn" style={{ background: "linear-gradient(135deg,#059669,#10b981)", color: "white", border: "none", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>✓ Solve</button>}
            <button
              onClick={() => {
                if (linkedProblemId === p.id) { setLinkedProblemId(null); }
                else { setLinkedProblemId(p.id); setTimerRunning(false); setTimerSec(0); timerSecRef.current = 0; firedRemindersRef.current = new Set(); setReminderFlash(null); showToast('⏱ Timer linked to "' + p.name + '"', "#eff6ff", "#bfdbfe"); }
              }}
              title={linkedProblemId === p.id ? "Unlink timer" : "Link timer to this problem"}
              style={{ background: linkedProblemId === p.id ? "#eff6ff" : T.chipBg, color: linkedProblemId === p.id ? "#4f46e5" : T.subtext, border: "1.5px solid " + (linkedProblemId === p.id ? "#4f46e5" : T.chipBorder), borderRadius: 8, padding: "7px 10px", cursor: "pointer", fontSize: 13, fontWeight: linkedProblemId === p.id ? 700 : 400 }}>
              ⏱
            </button>
            <button onClick={() => toggleBM(p.id)} style={{ background: p.bookmarked ? "#fffbeb" : T.chipBg, color: p.bookmarked ? "#d97706" : T.subtext, border: "1.5px solid " + (p.bookmarked ? "#fcd34d" : T.chipBorder), borderRadius: 8, padding: "7px 10px", cursor: "pointer", fontSize: 13 }}>⭐</button>
            <button onClick={() => openEdit(p)} style={{ background: "#f0f9ff", color: "#0369a1", border: "1.5px solid #bae6fd", borderRadius: 8, padding: "7px 10px", cursor: "pointer", fontSize: 13 }}>✏️</button>
            <button onClick={() => delP(p.id)} style={{ background: "#fef2f2", color: "#dc2626", border: "1.5px solid #fca5a5", borderRadius: 8, padding: "7px 10px", cursor: "pointer", fontSize: 13 }}>🗑</button>
          </div>
        </div>
      </div>
    );
  };

  /* ─── NOTES TAB — 3-COLUMN: TOPIC LIST | NOTE | RELATED PROBLEMS ─── */
  const NotesTab = () => {
    const topicProblems = problems.filter((p) => p.topic === notesTopic);
    const topicSolved   = topicProblems.filter((p) => p.status !== "Unsolved");
    const topicMastered = topicProblems.filter((p) => p.revStage >= 4);
    const noteCharCount = (topicNotes[notesTopic] || "").length;
    const topicsWithNotes = TOPICS.filter((t) => topicNotes[t] && topicNotes[t].trim().length > 0).length;

    const cols = notesPanelOpen
      ? "220px 1fr 280px"
      : "220px 1fr";

    return (
      <div className="notes-grid" style={{ display: "grid", gridTemplateColumns: cols, gap: 14, height: "calc(100vh - 140px)" }}>
        {/* LEFT — topic list */}
        <div style={{ background: T.cardBg, border: "1.5px solid " + T.cardBorder, borderRadius: 14, padding: "14px 12px", overflowY: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, padding: "0 4px" }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: T.text }}>Topics</span>
            <span style={{ fontSize: 10, color: T.subtext, background: dark ? T.mutedBg : "#f1f5f9", padding: "2px 8px", borderRadius: 99, fontWeight: 700 }}>
              {topicsWithNotes}/{TOPICS.length}
            </span>
          </div>

          {TOPICS.map((t) => {
            const ct = TCd(t);
            const has = topicNotes[t] && topicNotes[t].trim().length > 0;
            const probCount = problems.filter((p) => p.topic === t).length;
            return (
              <button key={t} onClick={() => setNotesTopic(t)} style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "8px 10px", borderRadius: 9,
                border: "1.5px solid " + (notesTopic === t ? ct.pill : T.chipBorder),
                cursor: "pointer", fontSize: 12, fontWeight: 600,
                background: notesTopic === t ? ct.bg : T.chipBg,
                color: notesTopic === t ? ct.text : T.subtext,
                marginBottom: 5, transition: "all 0.15s", textAlign: "left",
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: 7, flex: 1, minWidth: 0 }}>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t}</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                  {probCount > 0 && (
                    <span style={{ fontSize: 9, color: T.subtext, opacity: 0.7 }}>{probCount}</span>
                  )}
                  {has ? (
                    <span title="Has notes" style={{ width: 7, height: 7, borderRadius: "50%", background: ct.pill, display: "inline-block" }} />
                  ) : (
                    <span title="Empty" style={{ width: 7, height: 7, borderRadius: "50%", background: "transparent", border: "1.5px solid " + T.chipBorder, display: "inline-block" }} />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* CENTER — note editor */}
        <div style={{ background: T.cardBg, border: "1.5px solid " + T.cardBorder, borderRadius: 14, padding: "20px 24px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: notesCt.pill }}>{notesTopic}</div>
            <div style={{ display: "flex", gap: 14, fontSize: 11, color: T.subtext, alignItems: "center" }}>
              <span>{noteCharCount} chars</span>
              {noteCharCount > 0 && <span style={{ color: "#16a34a", fontWeight: 600 }}>✓ Auto-saved</span>}
              <button
                className="notes-side"
                onClick={() => setNotesPanelOpen((v) => !v)}
                title={notesPanelOpen ? "Hide problem panel" : "Show problem panel"}
                style={{ background: T.chipBg, border: "1.5px solid " + T.chipBorder, borderRadius: 7, padding: "4px 10px", cursor: "pointer", fontSize: 11, fontWeight: 700, color: T.subtext }}
              >
                {notesPanelOpen ? "Hide ›" : "‹ Show"} problems
              </button>
            </div>
          </div>
          <textarea
            value={topicNotes[notesTopic] || ""}
            onChange={(e) => setTopicNotes((prev) => ({ ...prev, [notesTopic]: e.target.value }))}
            placeholder={"Notes for " + notesTopic + "...\n\n- Key pattern\n- Time complexity / Space complexity\n- Common gotchas\n- Memory tricks\n- Template code"}
            style={{
              flex: 1,
              padding: "14px 16px",
              borderRadius: 11,
              border: "1.5px solid " + notesCt.border,
              fontSize: 14,
              resize: "none",
              background: dark ? T.inputBg : notesCt.bg,
              color: notesCt.text,
              lineHeight: 1.8,
              fontFamily: "system-ui, sans-serif",
            }}
          />
        </div>

        {/* RIGHT — related problems panel */}
        {notesPanelOpen && (
          <div className="notes-side" style={{ background: T.cardBg, border: "1.5px solid " + T.cardBorder, borderRadius: 14, padding: "14px 14px", overflowY: "auto", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: T.text }}>Problems</span>
              <span style={{ fontSize: 10, color: T.subtext }}>{topicProblems.length} total</span>
            </div>

            {/* Mini progress */}
            <div style={{ background: dark ? T.rowAlt : "#f8fafc", border: "1px solid " + T.cardBorder, borderRadius: 9, padding: "10px 11px", marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 11 }}>
                <span style={{ color: T.subtext }}>Solved</span>
                <span style={{ fontWeight: 700, color: notesCt.pill }}>{topicSolved.length}/{topicProblems.length}</span>
              </div>
              <div style={{ background: dark ? T.mutedBg : "#e0e7ff", borderRadius: 99, height: 5, overflow: "hidden", marginBottom: 6 }}>
                <div style={{ background: notesCt.pill, height: 5, width: topicProblems.length ? (topicSolved.length / topicProblems.length * 100) + "%" : "0%", borderRadius: 99, transition: "width 0.5s" }} />
              </div>
              {topicMastered.length > 0 && (
                <div style={{ fontSize: 10, color: "#059669", fontWeight: 700 }}>
                  👑 {topicMastered.length} mastered
                </div>
              )}
            </div>

            {/* Problem list */}
            {topicProblems.length === 0 ? (
              <div style={{ fontSize: 11, color: T.subtext, fontStyle: "italic", padding: "12px 4px", textAlign: "center" }}>
                No problems tagged with this topic yet.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {topicProblems.slice(0, 30).map((p) => {
                  const rm = REV_META[p.revStage] || REV_META[0];
                  return (
                    <button
                      key={p.id}
                      onClick={() => openEdit(p)}
                      title="Open in editor"
                      style={{
                        display: "flex", alignItems: "center", gap: 7,
                        padding: "7px 9px", borderRadius: 8, cursor: "pointer",
                        background: p.revStage >= 4 ? dark ? "#14281f" : "#f0fdf4" : dark ? T.rowAlt : "#fafafa",
                        border: "1px solid " + (p.revStage >= 4 ? "#86efac" : T.chipBorder),
                        textAlign: "left",
                      }}
                    >
                      <div style={{ width: 6, height: 6, borderRadius: 99, background: p.status === "Unsolved" ? "#94a3b8" : p.revStage >= 4 ? "#10b981" : rm.dot, flexShrink: 0 }} />
                      <span style={{ fontSize: 11, fontWeight: 600, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: T.text }}>{p.name}</span>
                      {p.bookmarked && <span style={{ fontSize: 10 }}>⭐</span>}
                      {p.revStage >= 4 && <span style={{ fontSize: 10 }}>👑</span>}
                    </button>
                  );
                })}
                {topicProblems.length > 30 && (
                  <div style={{ fontSize: 10, color: T.subtext, textAlign: "center", padding: "6px 0", fontStyle: "italic" }}>
                    + {topicProblems.length - 30} more
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  /* ─── STATS TAB ─── */

  // ── Cumulative solved chart data (last 90 days) ──
  const cumulativeData = (() => {
    const pts = [];
    for (let i = 89; i >= 0; i--) {
      const d = new Date(today); d.setDate(d.getDate() - i);
      const ds = d.toISOString().split("T")[0];
      const count = problems.filter((p) => p.solvedDate && p.solvedDate <= ds && p.status !== "Unsolved").length;
      pts.push({ date: ds, count, label: d.getDate() === 1 ? d.toLocaleString("en", { month: "short" }) : "" });
    }
    return pts;
  })();
  const cumulativeMax = Math.max(1, ...cumulativeData.map((d) => d.count));

  // ── Solve time histogram (5-min buckets, 0–60min) ──
  const histBuckets = Array.from({ length: 12 }, (_, i) => ({
    label: i === 11 ? "60m+" : i * 5 + "–" + (i * 5 + 5) + "m",
    min: i * 5 * 60,
    max: i === 11 ? Infinity : (i + 1) * 5 * 60,
    count: 0,
  }));
  timerSessions.filter((s) => s.seconds >= 30).forEach((s) => {
    const bucket = histBuckets.find((b) => s.seconds >= b.min && s.seconds < b.max);
    if (bucket) bucket.count++;
  });
  const histMax = Math.max(1, ...histBuckets.map((b) => b.count));

  // ── Revision quality sparklines (last 10 revisions per topic) ──
  const revHistoryByTopic = (() => {
    const map = {};
    problems.forEach((p) => {
      if (!p.topic || !(p.revHistory || []).length) return;
      if (!map[p.topic]) map[p.topic] = [];
      p.revHistory.forEach((h) => map[p.topic].push({ date: h.date, result: h.result }));
    });
    Object.keys(map).forEach((t) => {
      map[t] = map[t].sort((a, b) => a.date.localeCompare(b.date)).slice(-10);
    });
    return map;
  })();

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


      {/* ─── LAYER 1: AM I MAKING PROGRESS? ─── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "26px 0 14px" }}>
        <div style={{ width: 4, height: 22, background: "#4f46e5", borderRadius: 99 }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#4f46e5", letterSpacing: 1, textTransform: "uppercase" }}>Am I making progress?</div>
        </div>
        <div style={{ flex: 1, height: 1, background: T.cardBorder }} />
      </div>
      {/* ── Cumulative Solved Chart — FIXED with HTML overlay labels ── */}
      <Card bg={dark ? "#1a1a2e" : "white"} border={dark ? "#2d2d4e" : "#e5e7eb"} style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.3, color: T.text, marginBottom: 2 }}>📈 Cumulative Problems Solved</div>
            <div style={{ fontSize: 11, color: T.subtext }}>Last 90 days · the curve always goes up</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#4f46e5" }}>{solved.length}</div>
            <div style={{ fontSize: 10, color: T.subtext, textTransform: "uppercase", letterSpacing: 0.5 }}>total solved</div>
          </div>
        </div>
        {solved.length === 0 ? (
          <div style={{ fontSize: 13, color: T.subtext, textAlign: "center", padding: "24px 0" }}>Solve your first problem to see the curve grow!</div>
        ) : (
          <div style={{ display: "flex", gap: 0 }}>
            {/* Y-axis */}
            <div style={{ width: 30, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingBottom: 18, flexShrink: 0, height: 110 }}>
              {[cumulativeMax, Math.round(cumulativeMax / 2), 0].map((v, i) => (
                <span key={i} style={{ fontSize: 9, color: T.subtext, textAlign: "right", paddingRight: 5 }}>{v}</span>
              ))}
            </div>
            {/* Chart area with relative wrapper so HTML labels can overlay the SVG */}
            <div style={{ flex: 1, position: "relative" }}>
              {/* HTML milestone labels — rendered on top of SVG, no stretching */}
              {LEVELS.filter((l) => l.min > 0 && l.min <= cumulativeMax).map((l) => {
                // SVG is 110px tall; viewBox y goes 0–100. So pixel top = svgY * 1.1
                // SVG y for milestone line: 100 - (l.min/cumulativeMax)*96
                const pxTop = (100 - (l.min / cumulativeMax) * 96) * 1.1;
                return (
                  <div
                    key={l.name}
                    style={{
                      position: "absolute",
                      top: Math.max(0, pxTop - 9) + "px",
                      right: 4,
                      fontSize: 10,
                      fontWeight: 700,
                      color: l.accent,
                      background: dark ? "rgba(26,26,46,0.85)" : "rgba(255,255,255,0.85)",
                      padding: "1px 6px",
                      borderRadius: 4,
                      pointerEvents: "none",
                      lineHeight: 1.4,
                      whiteSpace: "nowrap",
                      zIndex: 2,
                    }}
                  >
                    {l.emoji} {l.name}
                  </div>
                );
              })}
              <svg width="100%" height="110" viewBox={"0 0 " + cumulativeData.length + " 100"} preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
                <defs>
                  <linearGradient id="cumGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[0, 50, 100].map((y, i) => (
                  <line key={i} x1="0" y1={y} x2={cumulativeData.length} y2={y} stroke={dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeWidth="0.5" />
                ))}
                {/* Level milestone lines (no SVG text — HTML labels above instead) */}
                {LEVELS.filter((l) => l.min > 0 && l.min <= cumulativeMax).map((l) => {
                  const y = 100 - (l.min / cumulativeMax) * 96;
                  return (
                    <line key={l.name} x1="0" y1={y} x2={cumulativeData.length} y2={y} stroke={l.accent} strokeWidth="0.4" strokeDasharray="2,3" opacity="0.6" />
                  );
                })}
                {/* Area fill */}
                <polyline
                  fill="url(#cumGrad)" stroke="none"
                  points={cumulativeData.map((d, i) => i + "," + (100 - (d.count / cumulativeMax) * 96)).join(" ") + " " + (cumulativeData.length - 1) + ",100 0,100"}
                />
                {/* Line */}
                <polyline
                  fill="none" stroke="#4f46e5" strokeWidth="0.8"
                  strokeLinejoin="round" strokeLinecap="round"
                  points={cumulativeData.map((d, i) => i + "," + (100 - (d.count / cumulativeMax) * 96)).join(" ")}
                />
                {/* Today dot */}
                <circle cx={cumulativeData.length - 1} cy={100 - (cumulativeData[cumulativeData.length - 1].count / cumulativeMax) * 96} r="1.8" fill="#4f46e5" stroke="white" strokeWidth="0.5" />
              </svg>
              {/* Month labels */}
              <div style={{ display: "flex" }}>
                {cumulativeData.map((d, i) => (
                  <div key={i} style={{ flex: 1 }}>
                    {d.label && <span style={{ fontSize: 9, color: T.subtext, fontWeight: 600 }}>{d.label}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18, marginBottom: 18 }}>
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
      </div>

      {/* ─── LAYER 2: BEHAVIOR PATTERNS ─── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "26px 0 14px" }}>
        <div style={{ width: 4, height: 22, background: "#0891b2", borderRadius: 99 }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#0891b2", letterSpacing: 1, textTransform: "uppercase" }}>Behavior patterns</div>
        </div>
        <div style={{ flex: 1, height: 1, background: T.cardBorder }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {/* ── Peak Performance Hours — REDESIGNED with grouped period bars ── */}
        <Card bg={dark ? "#0f0f1a" : "white"} border={dark ? "#2d2d4e" : "#e5e7eb"} style={{ gridColumn: "1 / -1" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.3, color: T.text, marginBottom: 2 }}>⚡ Peak Performance Hours</div>
              <div style={{ fontSize: 11, color: T.subtext }}>When you're most active · spot your golden hours</div>
            </div>
            {totalActions > 0 && peakPeriod && peakPeriod.count > 0 && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                <div style={{ fontSize: 10, color: T.subtext, textTransform: "uppercase", letterSpacing: 0.5 }}>Peak</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: peakPeriod.color }}>{peakPeriod.label}</div>
              </div>
            )}
          </div>

          {totalActions === 0 ? (
            <div style={{ fontSize: 13, color: T.subtext, textAlign: "center", padding: "32px 0" }}>No activity yet. Start using the timer or marking problems!</div>
          ) : (
            <div>
              {/* Tall bars — reference image style */}
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 180, gap: 12, padding: "0 4px" }}>
                {periodCounts.map((p, i) => {
                  const isPeak = p.label === peakPeriod.label && p.count > 0;
                  // Height as percentage of max, with reasonable minimum for non-zero, near-zero for zero
                  const heightPct = p.count === 0 ? 2 : Math.max(8, (p.count / maxPeriodCount) * 100);
                  const dimmed = !isPeak && p.count > 0;
                  return (
                    <div key={p.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end", gap: 6 }}>
                      {/* Count label above bar */}
                      <div style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: isPeak ? p.color : dimmed ? T.text : T.subtext,
                        opacity: p.count === 0 ? 0.35 : 1,
                        marginBottom: 2,
                      }}>
                        {p.count}
                      </div>
                      {/* The bar */}
                      <div
                        title={p.label + " (" + p.short + "): " + p.count + " action" + (p.count !== 1 ? "s" : "")}
                        style={{
                          width: "100%",
                          maxWidth: 80,
                          height: heightPct + "%",
                          minHeight: p.count === 0 ? 3 : 14,
                          background: p.count === 0
                            ? (dark ? "rgba(255,255,255,0.05)" : "#f1f5f9")
                            : isPeak
                            ? p.grad
                            : p.grad,
                          borderRadius: "10px 10px 4px 4px",
                          boxShadow: isPeak
                            ? "0 6px 20px " + p.color + "55, 0 0 0 2px " + p.color + "22"
                            : p.count > 0
                            ? "0 2px 8px rgba(0,0,0,0.08)"
                            : "none",
                          opacity: p.count === 0 ? 1 : isPeak ? 1 : 0.65,
                          transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
                          position: "relative",
                        }}
                      >
                        {isPeak && (
                          <div style={{
                            position: "absolute",
                            top: -8,
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: p.color,
                            color: "white",
                            fontSize: 9,
                            fontWeight: 700,
                            padding: "2px 7px",
                            borderRadius: 99,
                            letterSpacing: 0.5,
                            textTransform: "uppercase",
                            whiteSpace: "nowrap",
                            boxShadow: "0 2px 6px " + p.color + "66",
                          }}>
                            ★ Peak
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Period labels below bars */}
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 12, padding: "0 4px" }}>
                {periodCounts.map((p) => {
                  const isPeak = p.label === peakPeriod.label && p.count > 0;
                  return (
                    <div key={p.label} style={{ flex: 1, textAlign: "center" }}>
                      <div style={{
                        fontSize: 12,
                        fontWeight: isPeak ? 700 : 600,
                        color: isPeak ? T.text : T.subtext,
                        marginBottom: 2,
                      }}>
                        {p.label}
                      </div>
                      <div style={{ fontSize: 10, color: T.subtext, opacity: 0.7 }}>
                        {p.short}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom summary */}
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid " + T.cardBorder, display: "flex", gap: 12, flexWrap: "wrap", fontSize: 11, color: T.subtext }}>
                <span><strong style={{ color: T.text }}>{totalActions}</strong> total actions logged</span>
                {peakPeriod && peakPeriod.count > 0 && (
                  <span>· <strong style={{ color: peakPeriod.color }}>{Math.round(peakPeriod.count / totalActions * 100)}%</strong> happen during {peakPeriod.label.toLowerCase()}</span>
                )}
              </div>
            </div>
          )}
        </Card>
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
        {/* ── Solve Time Histogram ── */}
        <Card bg="white" border="#e5e7eb">
          <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.3, color: T.text, marginBottom: 4 }}>⏱ Solve Time Distribution</div>
          <div style={{ fontSize: 11, color: T.subtext, marginBottom: 14 }}>How long your sessions actually take · target is 15–20 mins</div>
          {timerSessions.filter((s) => s.seconds >= 30).length === 0 ? (
            <div style={{ fontSize: 13, color: T.subtext }}>No sessions yet. Start the timer when solving!</div>
          ) : (
            <div>
              {/* Bars */}
              <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 80, marginBottom: 6 }}>
                {histBuckets.map((b, i) => {
                  const pct = b.count ? Math.max(6, Math.round(b.count / histMax * 100)) : 0;
                  const isTarget = b.min >= 15 * 60 && b.min < 20 * 60;
                  const isOver   = b.min >= 20 * 60;
                  const barColor = isOver
                    ? "linear-gradient(180deg,#ef4444,#f87171)"
                    : isTarget
                    ? "linear-gradient(180deg,#059669,#34d399)"
                    : "linear-gradient(180deg,#4f46e5,#7c3aed)";
                  return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                      {b.count > 0 && (
                        <span style={{ fontSize: 8, color: T.subtext, fontWeight: 600 }}>{b.count}</span>
                      )}
                      <div
                        title={b.label + ": " + b.count + " sessions"}
                        style={{ width: "100%", height: b.count ? pct + "%" : "3%", borderRadius: "3px 3px 0 0", background: b.count ? barColor : (dark ? "#1e293b" : "#f1f5f9"), transition: "height 0.5s", minHeight: 3 }}
                      />
                    </div>
                  );
                })}
              </div>
              {/* X labels — show every 2nd */}
              <div style={{ display: "flex", gap: 3 }}>
                {histBuckets.map((b, i) => (
                  <div key={i} style={{ flex: 1, textAlign: "center" }}>
                    {i % 2 === 0 && <span style={{ fontSize: 7.5, color: T.subtext }}>{i * 5}m</span>}
                  </div>
                ))}
              </div>
              {/* Legend */}
              <div style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 10, flexWrap: "wrap" }}>
                {[{ c: "#4f46e5", l: "Under target" }, { c: "#059669", l: "On target (15–20m)" }, { c: "#ef4444", l: "Over 20m" }].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: s.c }} />
                    <span style={{ color: T.subtext }}>{s.l}</span>
                  </div>
                ))}
              </div>
              {/* Stats summary */}
              {(() => {
                const validSessions = timerSessions.filter((s) => s.seconds >= 30);
                const avgSec = validSessions.length ? Math.round(validSessions.reduce((a, s) => a + s.seconds, 0) / validSessions.length) : 0;
                const onTarget = validSessions.filter((s) => s.seconds >= 15 * 60 && s.seconds <= 20 * 60).length;
                const onTargetPct = validSessions.length ? Math.round(onTarget / validSessions.length * 100) : 0;
                return (
                  <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, background: dark ? T.mutedBg : "#eff6ff", color: "#4f46e5", borderRadius: 6, padding: "3px 9px", fontWeight: 600 }}>Avg: {fmtTime(avgSec)}</span>
                    <span style={{ fontSize: 11, background: dark ? "#14281f" : "#f0fdf4", color: "#059669", borderRadius: 6, padding: "3px 9px", fontWeight: 600 }}>On target: {onTargetPct}%</span>
                    <span style={{ fontSize: 11, color: T.subtext }}>{validSessions.length} sessions total</span>
                  </div>
                );
              })()}
            </div>
          )}
        </Card>
      </div>

      {/* ─── LAYER 3: WHERE ARE MY WEAKNESSES? ─── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "26px 0 14px" }}>
        <div style={{ width: 4, height: 22, background: "#dc2626", borderRadius: 99 }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#dc2626", letterSpacing: 1, textTransform: "uppercase" }}>Where are my weaknesses?</div>
        </div>
        <div style={{ flex: 1, height: 1, background: T.cardBorder }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
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
        {/* ── Revision Quality Sparklines ── */}
        <Card bg="white" border="#e5e7eb">
          <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.3, color: T.text, marginBottom: 4 }}>✨ Revision Quality Trends</div>
          <div style={{ fontSize: 11, color: T.subtext, marginBottom: 14 }}>Last 10 revisions per topic · green = Easy, red = Hard</div>
          {TOPICS.filter((t) => revQuality[t] || revHistoryByTopic[t]).length === 0 ? (
            <div style={{ fontSize: 13, color: T.subtext }}>No revisions yet!</div>
          ) : (
            TOPICS.filter((t) => revQuality[t]).map((t) => {
              const q         = getQuality(t);
              const ct        = TCd(t);
              const rq        = revQuality[t];
              const spark     = revHistoryByTopic[t] || [];
              const color     = q === null ? "#94a3b8" : q >= 70 ? "#059669" : q >= 40 ? "#d97706" : "#dc2626";
              const qbg       = q === null ? "#f1f5f9" : q >= 70 ? "#d1fae5" : q >= 40 ? "#fef3c7" : "#fee2e2";
              const totalRevs = rq.easy + rq.hard;
              return (
                <div key={t} style={{ marginBottom: 12, padding: "8px 12px", background: dark ? T.rowAlt : ct.bg, border: "1px solid " + ct.border, borderRadius: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: ct.text }}>{t}</span>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{ fontSize: 10, color: T.subtext }}>{rq.easy}E/{rq.hard}H</span>
                      {q === null ? (
                        <span style={{ fontSize: 10, color: T.subtext, background: dark ? T.mutedBg : "#f1f5f9", padding: "1px 7px", borderRadius: 5 }}>
                          Need {3 - totalRevs} more
                        </span>
                      ) : (
                        <span style={{ fontSize: 11, fontWeight: 700, background: qbg, color, padding: "2px 9px", borderRadius: 5 }}>{q}%</span>
                      )}
                    </div>
                  </div>
                  {/* Sparkline dots */}
                  {spark.length > 0 && (
                    <div style={{ display: "flex", gap: 3, alignItems: "center", marginBottom: 4 }}>
                      {spark.map((h, i) => (
                        <div
                          key={i}
                          title={h.date + " · " + h.result}
                          style={{
                            width: 10, height: 10, borderRadius: 3, flexShrink: 0,
                            background: h.result === "easy"
                              ? "linear-gradient(135deg,#059669,#34d399)"
                              : "linear-gradient(135deg,#dc2626,#f87171)",
                            boxShadow: h.result === "easy"
                              ? "0 1px 3px rgba(5,150,105,0.3)"
                              : "0 1px 3px rgba(220,38,38,0.3)",
                          }}
                        />
                      ))}
                      {spark.length < 10 && (
                        <span style={{ fontSize: 9, color: T.subtext, marginLeft: 2 }}>← last {spark.length}</span>
                      )}
                      {/* Trend arrow */}
                      {spark.length >= 4 && (() => {
                        const half = Math.floor(spark.length / 2);
                        const recentEasy = spark.slice(half).filter((h) => h.result === "easy").length / (spark.length - half);
                        const olderEasy  = spark.slice(0, half).filter((h) => h.result === "easy").length / half;
                        const diff = recentEasy - olderEasy;
                        if (Math.abs(diff) < 0.15) return null;
                        return (
                          <span style={{ marginLeft: 4, fontSize: 13, color: diff > 0 ? "#059669" : "#dc2626" }} title={diff > 0 ? "Improving" : "Declining"}>
                            {diff > 0 ? "↗" : "↘"}
                          </span>
                        );
                      })()}
                    </div>
                  )}
                  {/* Progress bar */}
                  <div style={{ background: dark ? T.mutedBg : "rgba(0,0,0,0.06)", borderRadius: 99, height: 4 }}>
                    <div style={{ background: color === "#059669" ? "linear-gradient(90deg,#059669,#34d399)" : color === "#d97706" ? "linear-gradient(90deg,#d97706,#fbbf24)" : color === "#dc2626" ? "linear-gradient(90deg,#dc2626,#f87171)" : "#94a3b8", height: 4, borderRadius: 99, width: (q || 0) + "%", transition: "width 0.5s" }} />
                  </div>
                </div>
              );
            })
          )}
        </Card>
        <Card bg="white" border="#e5e7eb" style={{ gridColumn: "1 / -1" }}>
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
      </div>

      {/* ─── LAYER 4: LONG-TERM OVERVIEW ─── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "26px 0 14px" }}>
        <div style={{ width: 4, height: 22, background: "#7c3aed", borderRadius: 99 }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", letterSpacing: 1, textTransform: "uppercase" }}>Long-term overview</div>
        </div>
        <div style={{ flex: 1, height: 1, background: T.cardBorder }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
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

            const monthBlocks = Array.from({ length: 12 }, (_, m) => {
              const firstDay = new Date(heatYear, m, 1);
              const lastDay  = new Date(heatYear, m + 1, 0);
              const startDow = firstDay.getDay();

              const cells = [];
              for (let i = 0; i < startDow; i++) cells.push(null);
              for (let d = 1; d <= lastDay.getDate(); d++) {
                const dt = new Date(heatYear, m, d);
                cells.push(dt.toISOString().split("T")[0]);
              }
              const remaining = (7 - (cells.length % 7)) % 7;
              for (let i = 0; i < remaining; i++) cells.push(null);

              const weeks = [];
              for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
              return { month: m, name: MONTH_NAMES[m], weeks };
            });

            return (
              <div style={{ overflowX: "auto", paddingBottom: 4 }}>
                <div style={{ display: "flex", gap: 8, minWidth: "max-content", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingTop: 18, flexShrink: 0 }}>
                    {["S","M","T","W","T","F","S"].map((d, i) => (
                      <div key={i} style={{ width: 11, height: 13, fontSize: 8.5, color: T.subtext, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.7 }}>{d}</div>
                    ))}
                  </div>

                  {monthBlocks.map((blk) => (
                    <div key={blk.month} style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: dark ? "#a78bfa" : "#7c3aed", marginBottom: 5, height: 16, letterSpacing: 0.3 }}>
                        {blk.name}
                      </div>
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

          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: T.subtext, marginTop: 14 }}>
            <span>Less</span>
            {[dark ? "#1e1b4b" : "#f0eeff", dark ? "#2d1b69" : "#ede9fe", dark ? "#5b21b6" : "#c4b5fd", dark ? "#7c3aed" : "#7c3aed", dark ? "#a78bfa" : "#4f46e5"].map((bg, i) => (
              <div key={i} style={{ width: 13, height: 13, borderRadius: 3, background: bg, border: "1px solid " + (dark ? "rgba(167,139,250,0.2)" : "rgba(79,70,229,0.15)") }} />
            ))}
            <span>More</span>
            <span style={{ marginLeft: "auto", fontSize: 11, color: dark ? "#a78bfa" : "#7c3aed", fontWeight: 600 }}>{yearHeatTotalActions} total actions</span>
          </div>
        </div>
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
        <Card bg="white" border="#e5e7eb" style={{ gridColumn: "1 / -1" }}>
          <SH>Quick Stats</SH>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { l: "Total problems",   v: problems.length,                       c: "#4f46e5" },
              { l: "Solved",           v: solved.length,                         c: "#059669" },
              { l: "Mastered",         v: mastered.length,                       c: "#eab308" },
              { l: "Bookmarked",       v: bookmarked.length,                     c: "#d97706" },
              { l: "Active days",      v: activeDaysCount,                       c: "#7c3aed" },
              { l: "Best streak",      v: maxStreakCount,                        c: "#dc2626" },
            ].map((s, i) => (
              <div key={i} style={{ background: dark ? T.rowAlt : "#f8fafc", borderRadius: 9, padding: "10px 12px", border: "1px solid " + T.cardBorder }}>
                <div style={{ fontWeight: 700, fontSize: 18, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: 11, color: T.subtext, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
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

  /* ─── PROBLEM MODAL — SPLIT INTO BASICS / DETAILS TABS ─── */
  const ProblemModal = () => {
    if (!modal) return null;

    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(15,12,41,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 20 }}>
        <div style={{ background: T.cardBg, border: "2px solid " + T.cardBorder, borderRadius: 20, padding: "20px 24px 24px", width: "100%", maxWidth: 640, maxHeight: "90vh", overflowY: "auto", animation: "pop 0.25s ease", boxShadow: "0 24px 64px rgba(0,0,0,0.35)" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: T.text }}>{modal === "add" ? "Add Problem" : "Edit Problem"}</div>
            <button onClick={closeModal} style={{ background: T.mutedBg, border: "none", borderRadius: 99, width: 34, height: 34, cursor: "pointer", fontSize: 18, color: T.subtext, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          </div>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: T.subtext, marginBottom: 14, padding: "8px 12px", background: dark ? T.rowAlt : "#f8fafc", borderRadius: 9, border: "1px solid " + T.cardBorder }}>
            <span style={{ color: form.section ? "#4f46e5" : T.subtext, fontWeight: form.section ? 700 : 400 }}>{form.section || "Section"}</span>
            <span style={{ opacity: 0.4 }}>›</span>
            <span style={{ color: form.subSection ? "#7c3aed" : T.subtext, fontWeight: form.subSection ? 700 : 400 }}>{form.subSection || "Sub-section"}</span>
            <span style={{ opacity: 0.4 }}>›</span>
            <span style={{ color: form.name ? T.text : T.subtext, fontWeight: form.name ? 700 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{form.name || "Problem name"}</span>
          </div>

          {/* TAB SWITCHER */}
          <div style={{ display: "flex", gap: 2, marginBottom: 16, background: dark ? T.rowAlt : "#f1f5f9", padding: 4, borderRadius: 11 }}>
            {[
              { id: "basics",  label: "📌 Basics",  hint: "Where + what" },
              { id: "details", label: "📝 Details", hint: "Patterns, notes, code" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setAddModalTab(t.id)}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 700,
                  background: addModalTab === t.id ? (dark ? "#4f46e5" : "white") : "transparent",
                  color: addModalTab === t.id ? (dark ? "white" : "#4f46e5") : T.subtext,
                  boxShadow: addModalTab === t.id ? "0 2px 8px rgba(79,70,229,0.15)" : "none",
                  transition: "all 0.18s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <span>{t.label}</span>
                <span style={{ fontSize: 10, opacity: 0.55, fontWeight: 500 }}>· {t.hint}</span>
              </button>
            ))}
          </div>

          {/* TAB CONTENT — BASICS */}
          {addModalTab === "basics" && (
            <div style={{ display: "grid", gap: 14 }}>
              {/* SECTION → SUB-SECTION */}
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

              {/* PROBLEM IDENTIFICATION */}
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

              {/* Hint to switch tabs */}
              <div style={{ fontSize: 11, color: T.subtext, padding: "8px 12px", background: dark ? T.rowAlt : "#f8fafc", borderRadius: 8, border: "1px dashed " + T.cardBorder, textAlign: "center" }}>
                Want to add patterns, notes, or a code snippet? Switch to <button onClick={() => setAddModalTab("details")} style={{ background: "none", border: "none", color: "#4f46e5", cursor: "pointer", fontWeight: 700, fontSize: 11, padding: 0 }}>Details →</button>
              </div>
            </div>
          )}

          {/* TAB CONTENT — DETAILS */}
          {addModalTab === "details" && (
            <div style={{ display: "grid", gap: 14 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 7, textTransform: "uppercase", letterSpacing: 1 }}>Pattern Tags</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {PATTERNS.map((pt) => (
                    <button key={pt} onClick={() => togglePat(pt)} style={{ padding: "5px 12px", borderRadius: 99, border: "1.5px solid " + ((form.pattern || []).includes(pt) ? "#a78bfa" : T.inputBorder), cursor: "pointer", fontSize: 11, fontWeight: 600, background: (form.pattern || []).includes(pt) ? dark ? "#2d1f5e" : "#f5f3ff" : T.chipBg, color: (form.pattern || []).includes(pt) ? "#a78bfa" : T.subtext }}>{pt}</button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Notes (key idea, TC/SC)</div>
                <textarea value={form.note} onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))} rows={4} placeholder="e.g. Prefix sum + hashmap. TC: O(n). Key insight: map stores sum index." style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "1.5px solid " + T.inputBorder, fontSize: 13, resize: "vertical", boxSizing: "border-box", background: T.inputBg, color: T.text, fontFamily: "system-ui, sans-serif", lineHeight: 1.6 }} />
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, marginBottom: 5, textTransform: "uppercase", letterSpacing: 1 }}>Key Code Pattern</div>
                <textarea value={form.codeSnippet || ""} onChange={(e) => setForm((f) => ({ ...f, codeSnippet: e.target.value }))} rows={5} placeholder={"// Key pattern\nint l=0, r=n-1;\nwhile(l<r){ ... }"} style={{ width: "100%", padding: "10px 13px", borderRadius: 9, border: "1.5px solid #334155", fontSize: 13, resize: "vertical", boxSizing: "border-box", background: "#1e293b", color: "#a78bfa", fontFamily: "'Courier New', monospace", lineHeight: 1.7 }} />
                <div style={{ fontSize: 11, color: T.subtext, marginTop: 4 }}>Shown during revision to refresh muscle memory</div>
              </div>
            </div>
          )}

          {/* FOOTER ACTIONS */}
          <div style={{ display: "flex", gap: 10, justifyContent: "space-between", alignItems: "center", paddingTop: 18, marginTop: 18, borderTop: "1px solid " + T.cardBorder }}>
            <span style={{ fontSize: 11, color: T.subtext }}>* required field</span>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={closeModal} style={{ background: T.mutedBg, color: T.subtext, border: "none", borderRadius: 10, padding: "10px 22px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>Cancel</button>
              <button onClick={saveForm} className="hbtn" style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)", color: "white", border: "none", borderRadius: 10, padding: "10px 28px", cursor: "pointer", fontSize: 14, fontWeight: 700, boxShadow: "0 4px 16px rgba(79,70,229,0.4)" }}>Save Problem</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /* ─── SETTINGS MODAL — CONSOLIDATED PREFERENCES + BACKUP ─── */
  const SettingsModal = () => {
    if (!settingsOpen) return null;

    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(15,12,41,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: 20 }}>
        <div style={{ background: T.cardBg, border: "2px solid " + T.cardBorder, borderRadius: 20, padding: "24px 28px", width: "100%", maxWidth: 520, maxHeight: "90vh", overflowY: "auto", animation: "pop 0.25s ease", boxShadow: "0 24px 64px rgba(0,0,0,0.35)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: T.text, display: "flex", alignItems: "center", gap: 8 }}>
              <span>⚙️</span><span>Settings</span>
            </div>
            <button onClick={() => setSettingsOpen(false)} style={{ background: T.mutedBg, border: "none", borderRadius: 99, width: 34, height: 34, cursor: "pointer", fontSize: 18, color: T.subtext, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          </div>

          {/* Backup section */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Backup & Restore</div>

            <div style={{
              padding: "12px 14px",
              background: showBackupWarning ? dark ? "#2d1515" : "#fef2f2" : dark ? "#14281f" : "#f0fdf4",
              border: "1.5px solid " + (showBackupWarning ? (dark ? "#7f1d1d" : "#fca5a5") : (dark ? "#34d39944" : "#86efac")),
              borderRadius: 10,
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}>
              <span style={{ fontSize: 18 }}>{showBackupWarning ? "⚠️" : "✓"}</span>
              <div style={{ flex: 1, fontSize: 12, color: showBackupWarning ? "#dc2626" : "#16a34a", fontWeight: 600 }}>
                {daysSinceBackup === null
                  ? "No backup ever made"
                  : showBackupWarning
                    ? daysSinceBackup + " days since last backup"
                    : "Last backed up " + (daysSinceBackup === 0 ? "today" : daysSinceBackup + " days ago")}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button onClick={exportData} className="hbtn" style={{ padding: "12px", borderRadius: 10, border: "1.5px solid #86efac", cursor: "pointer", fontSize: 13, fontWeight: 700, background: dark ? "#14281f" : "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <span>⬇️</span><span>Export Backup</span>
              </button>
              <input
                ref={importFileRef}
                type="file"
                accept=".json"
                style={{ display: "none" }}
                onChange={importData}
              />
              <button onClick={() => importFileRef.current && importFileRef.current.click()} className="hbtn" style={{ padding: "12px", borderRadius: 10, border: "1.5px solid #bfdbfe", cursor: "pointer", fontSize: 13, fontWeight: 700, background: dark ? "#1e293b" : "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <span>⬆️</span><span>Import Backup</span>
              </button>
            </div>

            <div style={{ fontSize: 11, color: T.subtext, marginTop: 10, lineHeight: 1.5 }}>
              All data lives in your browser. Export regularly to avoid losing progress if you clear your browser data or switch devices.
            </div>
          </div>

          {/* Appearance */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Appearance</div>
            <button onClick={() => setDark((d) => !d)} className="hbtn" style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 10,
              border: "1.5px solid " + T.cardBorder,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
              background: dark ? "#fbbf24" : "linear-gradient(135deg,#1e1b4b,#312e81)",
              color: dark ? "#1e1b4b" : "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}>
              <span>{dark ? "☀️" : "🌙"}</span>
              <span>{dark ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
            </button>
          </div>

          {/* Stats summary */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.subtext, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Your data</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }}>
              {[
                { l: "Problems",      v: problems.length },
                { l: "Sessions",      v: timerSessions.length },
                { l: "Mistakes",      v: mistakes.length },
                { l: "Active days",   v: activeDaysCount },
              ].map((s, i) => (
                <div key={i} style={{ background: dark ? T.rowAlt : "#f8fafc", border: "1px solid " + T.cardBorder, borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: T.text }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: T.subtext, marginTop: 2, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* About */}
          <div style={{ fontSize: 11, color: T.subtext, textAlign: "center", lineHeight: 1.6, opacity: 0.7, paddingTop: 12, borderTop: "1px solid " + T.cardBorder }}>
            Striver A2Z DSA Tracker · Local-first<br />
            Your data never leaves this browser.
          </div>
        </div>
      </div>
    );
  };

  /* ─── RENDER ─── */
  // Mobile bottom nav uses 4 tabs; Notes accessed via sidebar/topbar
  const MOBILE_NAV = TABS.filter((t) => t.id !== "notes");

  return (
    <ThemeCtx.Provider value={{ T, dark }}>
    <div style={{ display: "flex", minHeight: "100vh", background: T.pageBg, color: T.text }}>

      {/* Mobile sidebar overlay */}
      <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} style={{ display: sidebarOpen ? "block" : "none" }} />

      {/* Mobile top bar */}
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

      {/* TOAST — top-right on desktop, bottom-center on mobile via class */}
      {toast && (
        <div className="toast-position" style={{ position: "fixed", top: 20, right: 20, background: toast.bg, border: "2px solid " + toast.border, borderRadius: 12, padding: "12px 20px", fontWeight: 700, fontSize: 14, zIndex: 9999, animation: "slR 0.3s ease", color: "#1a1a1a", boxShadow: "0 6px 24px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", gap: 12, maxWidth: 340 }}>
          <span style={{ flex: 1 }}>{toast.msg}</span>
          {toast.undoId && (
            <button onClick={() => undoDelete(toast.undoId)} style={{ background: "#dc2626", color: "white", border: "none", borderRadius: 7, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>↩ Undo</button>
          )}
        </div>
      )}

      {MilestoneModal()}
      {MistakeModal()}
      {ProblemModal()}
      {SettingsModal()}

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

      {/* Mobile bottom nav — 4 main tabs (Notes via topbar/sidebar) */}
      <div className="mobile-bottom-nav" style={{ background: T.sidebar, borderTopColor: T.cardBorder }}>
        {MOBILE_NAV.map((t) => (
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