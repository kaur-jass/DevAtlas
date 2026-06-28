import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Search, Milestone, BarChart3, ArrowRight,
  Bot, Code2, StickyNote, BookMarked, Settings, User, 
  LogOut, Flame, Bell, ChevronDown, ChevronLeft, Menu, 
  X, CheckCircle2, Trophy, Star, Plus, Sparkles, Sun, Moon, Trash2
} from 'lucide-react';
import axios from "axios";

import DevAtlasTracks from "../tracks/Tracks";
// Types for Dashboard Component State
type TimeRange = '7D' | '30D' | '3M' | '1Y' | 'All';

export default function DevAtlasDashboard(): React.JSX.Element {
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<TimeRange>('30D');
  const [selectedTrack, setSelectedTrack] = useState<string>('DSA');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<any[]>([]);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [showNotifications, setShowNotifications] = useState(false);

  // Navigation config matches your design
  const navLinks = [
    { name: 'Overview', icon: LayoutDashboard, active: true },
    { name: 'Search', icon: Search, active: false },
    { name: 'Tracks', icon: Milestone, active: false },
    { name: 'Analytics', icon: BarChart3, active: false },
    { name: 'Compare', icon: LayoutDashboard, active: false }, // Using LayoutDashboard as placeholder for template matching
    { name: 'AI Mentor', icon: Bot, active: false },
    { name: 'Problems', icon: Code2, active: false },
    { name: 'Notes', icon: StickyNote, active: false },
    { name: 'Bookmarks', icon: BookMarked, active: false },
  ];

  const customTracks = [
    { name: 'DSA', color: 'bg-purple-500' },
    { name: 'Web Development', color: 'bg-blue-500' },
    { name: 'AI / ML', color: 'bg-emerald-500' },
    { name: 'System Design', color: 'bg-amber-500' },
    { name: 'Cyber Security', color: 'bg-pink-500' },
  ];



  useEffect(() => {
    const fetchProfile = async () => {
        try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
            "http://localhost:5000/api/auth/profile",
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );

          setUser(res.data.user);
          const notificationRes = await axios.get(
              "http://localhost:5000/api/notifications",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setNotifications(notificationRes.data.notifications);
        } catch (error) {
        console.log(error);
        }
    };

    fetchProfile();
    }, []);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target as Node
        )
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const token = localStorage.getItem("token");

const markAsRead = async (id: string) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id
            ? { ...n, isRead: true }
            : n
        )
      );
    } catch (err) {
      console.log(err);
    }
};

const markAllRead = async () => {
    try {
      await axios.patch(
        "http://localhost:5000/api/notifications/read-all",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          isRead: true,
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };

const deleteNotification = async (id: string) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/notifications/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotifications((prev) =>
      prev.filter((n) => n._id !== id)
    );
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className={`h-screen w-screen overflow-hidden font-sans flex transition-colors duration-300 relative ${isDarkMode ? 'bg-[#070512] text-slate-100' : 'bg-[#f8fafc] text-slate-800'}`}>
      
      {/* Ambient decorative background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] pointer-events-none z-0" />

      {/* ========================================================================= */}
      {/* SIDEBAR NAVIGATION (Desktop & Tablet)                                     */}
      {/* ========================================================================= */}
      <aside className={`hidden md:flex flex-col justify-between border-r shrink-0 transition-all duration-300 z-30 relative h-full ${isSidebarOpen ? 'w-64' : 'w-20'} ${isDarkMode ? 'bg-[#0a0817] border-slate-900/80' : 'bg-white border-slate-200'}`}>
        <div className="overflow-y-auto flex-1 no-scrollbar">
          {/* Sidebar Header Brand block - UPDATED BACKGROUND TO REMOVE TEXT UNDERLAP */}
          <div className={`h-20 flex items-center justify-between px-5 border-b border-inherit sticky top-0 z-10 ${isDarkMode ? 'bg-[#0a0817]' : 'bg-white'}`}>
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2.5 bg-purple-600 rounded-xl text-white shrink-0">
                <svg className="w-4 h-4 transform -rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="9" className="opacity-40" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3M12 9l1.5 1.5L15 12l-1.5 1.5L12 15l-1.5-1.5L9 12l1.5-1.5L12 9z" />
                </svg>
              </div>
              {isSidebarOpen && <span className="font-bold text-base tracking-wide">Dev<span className="text-purple-500">Atlas</span></span>}
            </div>
            
            {isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`p-1.5 rounded-lg border transition-colors ${isDarkMode ? 'border-slate-800 hover:bg-slate-900 text-slate-400' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Navigation links */}
          <div className="p-3 space-y-1">
            {navLinks.map((link) => (
              <button
                  key={link.name}
                  onClick={() => setActiveTab(link.name)}
                  className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    activeTab === link.name
                      ? "bg-purple-600/10 text-purple-400"
                      : isDarkMode
                      ? "text-slate-400 hover:bg-slate-900/50 hover:text-slate-200"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                <link.icon className="w-4 h-4 shrink-0" />
                {isSidebarOpen && <span>{link.name}</span>}
              </button>
            ))}
          </div>

          {/* Tracks divider category panel */}
          {isSidebarOpen && (
            <div className="px-6 py-4 border-t border-inherit">
              <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-3">
                <span>My Tracks</span>
                <Plus className="w-3.5 h-3.5 cursor-pointer hover:text-purple-500" />
              </div>
              <div className="space-y-2.5">
                {customTracks.map((track) => (
                  <div key={track.name} className="flex items-center gap-3 text-xs text-slate-400 hover:text-slate-200 cursor-pointer py-0.5">
                    <span className={`w-2 h-2 rounded-full ${track.color}`} />
                    <span className="truncate">{track.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar static footer segment */}
        <div className="p-3 border-t border-inherit space-y-0.5 bg-inherit">
          {[{ name: 'Settings', icon: Settings }, { name: 'Profile', icon: User }, { name: 'Logout', icon: LogOut }].map((item) => (
            <button key={item.name} className={`w-full flex items-center gap-3.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${isDarkMode ? 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
              <item.icon className="w-4 h-4 shrink-0" />
              {isSidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
          
          {/* Visual Streak Block Container */}
          {isSidebarOpen && (
            <div className={`mt-3 p-4 rounded-xl border relative overflow-hidden ${isDarkMode ? 'bg-[#0d0a21]/60 border-purple-500/10' : 'bg-purple-50/40 border-purple-100'}`}>
              <div className="flex items-center gap-2 text-xs font-bold text-purple-500 mb-1">
                <Flame className="w-3.5 h-3.5 fill-current text-orange-500 stroke-orange-500" />
                <span>Streak</span>
              </div>
              <div className="text-xl font-black">12 days</div>
              <p className="text-[10px] text-slate-500 mt-0.5">Keep it going! 🔥</p>
              <div className="absolute bottom-0 right-0 w-16 h-12 opacity-20">
                <svg viewBox="0 0 100 50" className="w-full h-full stroke-purple-500 stroke-2 fill-none">
                  <path d="M0,45 Q20,40 40,25 T80,15 T100,5" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MOBILE DRAWER BACKDROP AND FRAMES                                         */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed inset-y-0 left-0 w-72 z-50 p-6 flex flex-col justify-between shadow-2xl md:hidden ${isDarkMode ? 'bg-[#0a0817]' : 'bg-white'}`}
          >
            <div className="overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-600 rounded-xl text-white">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="9" className="opacity-40" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3M12 9l1.5 1.5L15 12l-1.5 1.5L12 15l-1.5-1.5L9 12l1.5-1.5L12 9z" /></svg>
                  </div>
                  <span className="font-bold text-lg">Dev<span className="text-purple-500">Atlas</span></span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 rounded-lg border border-slate-500/10"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <button key={link.name} onClick={() => setActiveTab(link.name)} className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-medium ${activeTab === link.name ? 'bg-purple-600/10 text-purple-400' : 'text-slate-400'}`}>
                    <link.icon className="w-4.5 h-4.5" /><span>{link.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-slate-500/10">
              <button className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400"><LogOut className="w-4.5 h-4.5" /><span>Logout</span></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MAIN VIEWPORT FRAME WORKSPACE CONTAINER                                   */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative z-10">
        
        {/* Top Header Platform Navigation Bar */}
        <header className={`h-20 flex items-center justify-between px-4 sm:px-8 border-b shrink-0 transition-colors ${isDarkMode ? 'bg-[#070512]/80 border-slate-900 backdrop-blur-md' : 'bg-white/80 border-slate-200 backdrop-blur-md'} sticky top-0 z-20`}>
          <div className="flex items-center gap-4 flex-1">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="hidden md:block p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:bg-slate-900"
              >
                <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
              </button>
            )}
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-xl border border-slate-500/10 md:hidden"><Menu className="w-4 h-4" /></button>
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input type="text" placeholder="Search problems, concepts, notes, solutions..." className={`w-full rounded-xl pl-10 pr-4 py-2 text-xs border focus:outline-none transition-all ${isDarkMode ? 'bg-[#0e0c22] border-slate-800 text-slate-200 focus:border-purple-500/40' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-500/40'}`} />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[9px] font-mono tracking-widest text-slate-500 bg-slate-500/5 px-1.5 py-0.5 rounded border border-slate-500/10">⌘K</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 shrink-0">
            {/* Theme Toggle Button */}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-xl border transition-colors ${isDarkMode ? 'border-slate-800 hover:bg-slate-900 text-purple-400' : 'border-slate-200 hover:bg-slate-50 text-amber-500'}`}>
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            
            {/* Notifications Alert Bell */}
            <div ref={notificationRef} className="relative">
               <button
                  onClick={() =>
                  setShowNotifications(!showNotifications)
                  }
                  className="relative p-2 rounded-xl border border-slate-800 hover:bg-slate-900 transition"
              >
              <Bell className="w-3.5 h-3.5" />
              {notifications.some((n) => !n.isRead) && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-violet-500 rounded-full border-2 border-[#151326]"></span>
              )}
              </button>
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-14 w-96 bg-[#0E0B1F] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
                  <h2 className="text-base font-semibold">Notifications</h2>

                  <button
                    onClick={markAllRead}
                    className="text-xs text-violet-400 hover:text-violet-300"
                  >
                    Mark all read
                  </button>
                </div>

                {/* Notification List */}
                <div className="max-h-[420px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-10 text-center text-sm text-slate-500">
                      No Notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification._id}
                        onClick={() => markAsRead(notification._id)}
                        className={`px-5 py-4 border-b border-slate-800 cursor-pointer transition-all duration-200 ${
                          notification.isRead
                            ? "bg-transparent hover:bg-slate-900/40"
                            : "bg-violet-500/5 hover:bg-violet-500/10"
                        }`}
                      >
                        <div className="group flex items-start justify-between gap-3">
                          {/* Purple unread dot */}
                          {!notification.isRead && (
                            <div className="mt-2 w-2 h-2 rounded-full bg-violet-500 shrink-0"></div>
                          )}

                          {/* Notification Content */}
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-white">
                              {notification.title}
                            </h3>

                            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                              {notification.message}
                            </p>

                            <p className="mt-2 text-[10px] text-slate-500">
                              {new Date(notification.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification._id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition text-slate-500 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
         </AnimatePresence>
        </div>

            {/* Profile Avatar Trigger dropdown block */}
            <div className="flex items-center gap-2.5 pl-2 sm:border-l border-slate-500/10 cursor-pointer group">
              <img src={ user?.avatar || "https://ui-avatars.com/api/?name=User"} className="w-7 h-7 rounded-full object-cover" />
              <div className="hidden lg:block text-left">
                <div className="text-xs font-semibold leading-none group-hover:text-purple-400 transition-colors">{user?.name || "Loading..."}</div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-500 hidden lg:block" />
            </div>
          </div>
        </header>

        {/* Clean, Non-expanding Scrolling Workspace Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          {activeTab === "Tracks" ? (
            <DevAtlasTracks isDarkMode={isDarkMode} />
          ) : activeTab === "Overview" ? (
            <>
          {/* Welcome User Row Banner */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">Good evening, {user?.name || "Developer"}! 👋</h2>
              <p className="text-xs text-slate-500 font-light mt-0.5">Let's continue your learning journey today.</p>
            </div>
            
            {/* Motivation Quote panel block */}
            <div className={`p-4 rounded-xl border text-left max-w-md w-full lg:w-auto flex gap-3 items-start shadow-sm transition-all ${isDarkMode ? 'bg-[#0e0c22]/50 border-slate-900' : 'bg-purple-50/30 border-purple-100'}`}>
              <span className="text-2xl text-purple-500 font-serif leading-none">“</span>
              <div className="space-y-0.5">
                <p className="text-[11px] leading-relaxed italic text-slate-400">Consistency is what transforms average into excellence.</p>
                <div className="text-[10px] text-slate-500 font-medium">— Keep building, keep growing.</div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STATS COUNT METRIC GRID PANELS                                            */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Problems Solved', value: '1,248', trend: '+12.5%', sub: 'vs last month', icon: Code2, color: 'text-purple-500', fill: 'bg-purple-500/10' },
              { title: 'Contest Rating', value: '1,742', trend: '+98', sub: 'in last 30 days', icon: Trophy, color: 'text-blue-500', fill: 'bg-blue-500/10' },
              { title: 'GitHub Commits', value: '326', trend: '+18.3%', sub: 'vs last month', icon: Star, color: 'text-emerald-500', fill: 'bg-emerald-500/10' },
              { title: 'Study Streak', value: '12 days', trend: 'Keep it going!', sub: 'Active Streak 🔥', icon: Flame, color: 'text-orange-500', fill: 'bg-orange-500/10' }
            ].map((metric, i) => (
              <div key={i} className={`p-5 rounded-2xl border flex flex-col justify-between shadow-sm transition-all ${isDarkMode ? 'bg-[#0e0c22]/60 border-slate-900/80 shadow-black/5' : 'bg-white border-slate-100 shadow-slate-100'}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-semibold text-slate-500 tracking-wide uppercase">{metric.title}</span>
                  <div className={`p-2 rounded-xl ${metric.fill} ${metric.color}`}><metric.icon className="w-3.5 h-3.5 fill-current stroke-current opacity-90" /></div>
                </div>
                <div>
                  <div className="text-2xl font-black tracking-tight leading-none mb-2">{metric.value}</div>
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span className={`font-bold ${metric.color}`}>{metric.trend}</span>
                    <span className="text-slate-500 font-light">{metric.sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ========================================================================= */}
          {/* MID PAGE PROGRESS & TOPIC CHART SECTIONS                                  */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Analytics Dashboard Progress Line Chart Wrapper */}
            <div className={`xl:col-span-2 p-5 sm:p-6 rounded-2xl border flex flex-col justify-between shadow-sm ${isDarkMode ? 'bg-[#0e0c22]/60 border-slate-900/80' : 'bg-white border-slate-100'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-500/5 pb-4 mb-2">
                <div>
                  <h3 className="text-sm font-bold">Progress Overview</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Metrics aggregate analytics graph summary statement.</p>
                </div>
                <div className={`flex p-0.5 rounded-lg border text-[11px] font-semibold self-start sm:self-auto ${isDarkMode ? 'bg-[#131129] border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                  {(['7D', '30D', '3M', '1Y', 'All'] as TimeRange[]).map((range) => (
                    <button key={range} onClick={() => setTimeRange(range)} className={`px-2.5 py-1 rounded-md transition-all ${timeRange === range ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-400'}`}>{range}</button>
                  ))}
                </div>
              </div>

              {/* Dynamic responsive inline SVG graph panel frame */}
              <div className="h-60 w-full relative mt-4">
                <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                  {[0, 50, 100, 150, 200].map((val, idx) => <line key={idx} x1="0" y1={val} x2="600" y2={val} stroke={isDarkMode ? "#1e1b38" : "#f1f5f9"} strokeWidth="1" strokeDasharray="4" />)}
                  <path d="M0,160 Q100,140 200,110 T400,80 T600,50" fill="none" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
                  <path d="M0,180 Q120,150 240,130 T480,100 T600,75" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M0,140 Q150,130 300,100 T450,70 T600,35" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2 px-1">
                  <span>May 12</span><span>May 19</span><span>May 26</span><span>Jun 2</span><span>Jun 9</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 pt-3 border-t border-slate-500/5 text-[10px] text-slate-400 font-medium mt-4">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" /><span>Problems Solved</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /><span>Contest Rating</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /><span>GitHub Commits</span></div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500" /><span>Study Hours</span></div>
              </div>
            </div>

            {/* Radar Strength Network Layout Container */}
            <div className={`p-5 sm:p-6 rounded-2xl border flex flex-col justify-between shadow-sm ${isDarkMode ? 'bg-[#0e0c22]/60 border-slate-900/80' : 'bg-white border-slate-100'}`}>
              <div className="flex items-center justify-between border-b border-slate-500/5 pb-4 mb-2">
                <div>
                  <h3 className="text-sm font-bold">Topic Strength</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Radar distribution score map.</p>
                </div>
                <div className={`relative px-2.5 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer ${isDarkMode ? 'bg-[#131129] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span>{selectedTrack}</span><ChevronDown className="w-3 h-3 text-slate-500" />
                </div>
              </div>

              {/* Custom SVG Coordinate Radar Mesh Grid Overlay Component */}
              <div className="h-52 w-full relative flex items-center justify-center my-2">
                <svg className="w-44 h-44 overflow-visible" viewBox="0 0 100 100">
                  {[100, 75, 50, 25].map((r, i) => (
                    <polygon key={i} points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke={isDarkMode ? "#1e1b38" : "#f1f5f9"} strokeWidth="0.5" transform={`scale(${r/100})`} transform-origin="50 50" />
                  ))}
                  <line x1="50" y1="50" x2="50" y2="0" stroke={isDarkMode ? "#1e1b38" : "#f1f5f9"} strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="93.3" y2="25" stroke={isDarkMode ? "#1e1b38" : "#f1f5f9"} strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="93.3" y2="75" stroke={isDarkMode ? "#1e1b38" : "#f1f5f9"} strokeWidth="0.5" />
                  <line x1="50" y1="50" x2="50" y2="100" stroke={isDarkMode ? "#1e1b38" : "#f1f5f9"} strokeWidth="0.5" />
                  <polygon points="50,12 85,32 78,68 50,88 22,65 28,30" fill="rgba(168, 85, 247, 0.15)" stroke="#a855f7" strokeWidth="1.5" />
                </svg>

                {/* Absolute Axis metric labels */}
                <div className="absolute top-0 text-[9px] text-center font-bold text-slate-400">Arrays<br/><span className="text-purple-400 text-[8px]">87%</span></div>
                <div className="absolute top-1/4 -right-1 text-[9px] text-right font-bold text-slate-400">Graphs<br/><span className="text-purple-400 text-[8px]">82%</span></div>
                <div className="absolute bottom-1/4 -right-1 text-[9px] text-right font-bold text-slate-400">DP<br/><span className="text-purple-400 text-[8px]">58%</span></div>
                <div className="absolute bottom-0 text-[9px] text-center font-bold text-slate-400">Tree<br/><span className="text-purple-400 text-[8px]">74%</span></div>
                <div className="absolute bottom-1/4 -left-3 text-[9px] text-left font-bold text-slate-400">Binary Search<br/><span className="text-purple-400 text-[8px]">90%</span></div>
                <div className="absolute top-1/4 -left-1 text-[9px] text-left font-bold text-slate-400">Greedy<br/><span className="text-purple-400 text-[8px]">76%</span></div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* LOWER ACTIVITY LISTS & INTEGRATED AI ADVISORY BLOCKS                      */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
            {/* Live Activity Stream Panel */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between shadow-sm ${isDarkMode ? 'bg-[#0e0c22]/60 border-slate-900/80' : 'bg-white border-slate-100'}`}>
              <div>
                <div className="flex items-center justify-between border-b border-slate-500/5 pb-3 mb-4">
                  <h3 className="text-sm font-bold">Recent Activity</h3>
                  <button className="text-[10px] text-purple-500 font-semibold hover:underline">View all activity</button>
                </div>

                <div className="space-y-4">
                  {[
                    { text: 'Solved "Alien Dictionary" on LeetCode', tag: 'Graph', time: '2h ago', icon: CheckCircle2, color: 'text-emerald-500', tagColor: 'bg-purple-500/10 text-purple-400' },
                    { text: 'Participated in LeetCode Weekly Contest 392', tag: 'Rated Contest', time: '1d ago', icon: Trophy, color: 'text-blue-500', tagColor: 'bg-blue-500/10 text-blue-400' },
                    { text: 'Starred a repository: system-design-primer', tag: 'GitHub', time: '2d ago', icon: Star, color: 'text-amber-500', tagColor: 'bg-amber-500/10 text-amber-400' },
                    { text: 'Added a note: Dynamic Programming Patterns', tag: 'Notes', time: '3d ago', icon: StickyNote, color: 'text-pink-500', tagColor: 'bg-pink-500/10 text-pink-400' }
                  ].map((act, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs leading-normal">
                      <act.icon className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${act.color}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{act.text}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold uppercase ${act.tagColor}`}>{act.tag}</span>
                          <span className="text-[10px] text-slate-500 font-light">{act.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Target Priority Weak Topics Progress Tracker Grid block */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between shadow-sm ${isDarkMode ? 'bg-[#0e0c22]/60 border-slate-900/80' : 'bg-white border-slate-100'}`}>
              <div>
                <div className="flex items-center justify-between border-b border-slate-500/5 pb-3 mb-4">
                  <h3 className="text-sm font-bold">Weak Topics</h3>
                  <div className={`relative px-2 py-0.5 rounded-lg border text-[10px] font-semibold flex items-center gap-1 cursor-pointer ${isDarkMode ? 'bg-[#131129] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <span>DSA</span><ChevronDown className="w-3 h-3 text-slate-500" />
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { topic: 'Dynamic Programming', percentage: '58%', width: 'w-[58%]', color: 'bg-orange-500' },
                    { topic: 'Bitmasking', percentage: '40%', width: 'w-[40%]', color: 'bg-red-500' },
                    { topic: 'Trie', percentage: '45%', width: 'w-[45%]', color: 'bg-amber-500' },
                    { topic: 'Segment Tree', percentage: '47%', width: 'w-[47%]', color: 'bg-rose-500' }
                  ].map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-400">{item.topic}</span>
                        <span className="font-mono text-slate-500 font-bold">{item.percentage}</span>
                      </div>
                      <div className={`h-1.5 w-full rounded-full ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'} overflow-hidden`}>
                        <div className={`h-full rounded-full ${item.color} ${item.width}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="text-[10px] text-purple-500 font-semibold hover:underline text-left mt-4 block">View all weak areas →</button>
            </div>

            {/* Generative Recommendation AI Card block component */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between shadow-md relative overflow-hidden xl:col-span-1 md:col-span-2 ${isDarkMode ? 'bg-gradient-to-br from-[#0e0c22] via-[#100c2e] to-[#150a3c] border-purple-500/10 shadow-black/20' : 'bg-gradient-to-br from-white via-purple-50/10 to-indigo-50/20 border-purple-100'}`}>
              <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center gap-2 text-purple-500 font-bold text-xs mb-3 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 fill-current" />
                  <span>AI Insight</span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-black leading-tight">You're improving in <span className="text-purple-400">Graphs!</span> 🚀</h4>
                  <p className="text-[11px] leading-relaxed text-slate-400 font-light">
                    But Dynamic Programming needs more focus. Solve 5 DP problems this week to strengthen your concepts.
                  </p>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full mt-6 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 transition-all"
              >
                <span>Generate Study Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>

          </div>
               </>
        ) : (
            <div className="p-8 text-center text-xs text-slate-400">
                {activeTab} Module Framework Interface Placeholder.
            </div>
            )}
        </main>
      </div>
    </div>
  );
}