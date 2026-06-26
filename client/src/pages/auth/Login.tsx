import axios from "axios";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BarChart3, Brain, Mail, Lock, Eye, EyeOff, Sun, Moon, ArrowRight } from 'lucide-react';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";

type AuthTab = 'login' | 'signup';

export default function DevAtlasLogin(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          const res = await axios.post(
              "http://localhost:5000/api/auth/register",
              { name, email, password }
          );
          alert(res.data.message);
          setName("");
          setEmail("");
          setPassword("");
          setActiveTab("login");
      } catch (err: any) {
          alert(err.response?.data?.message || "Registration Failed");
      }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 110, damping: 16 } 
    }
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 3, ease: "easeInOut" as const } 
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const res = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        }
      );

      localStorage.setItem("token", res.data.token);

      alert("Google Login Successful");

      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);
      alert("Google Login Failed");
    }
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col md:flex-row overflow-x-hidden selection:bg-purple-500/30 transition-colors duration-300 relative ${isDarkMode ? 'bg-[#070512] text-slate-100' : 'bg-[#f8fafc] text-slate-800'}`}>
      
      {/* Intense Top-Left Corner Ambient Glow Overlay */}
      <div className={`absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] blur-[80px] sm:blur-[120px] pointer-events-none z-0 transition-opacity duration-500 ${isDarkMode ? 'bg-gradient-to-br from-purple-600/30 via-indigo-500/10 to-transparent opacity-100' : 'bg-gradient-to-br from-purple-400/20 via-indigo-300/10 to-transparent opacity-70'}`} />

      {/* FIXED THEME TOGGLE Container: Absolute top right on mobile, structured placement on desktop */}
      <div className="absolute top-4 right-4 md:top-12 md:right-12 z-50 flex items-center gap-2 md:gap-3 bg-slate-500/5 backdrop-blur-md p-1.5 rounded-full border border-slate-500/10 md:bg-transparent md:backdrop-blur-none md:p-0 md:border-none">
        <Moon className={`w-3.5 h-3.5 transition-colors ${isDarkMode ? 'text-purple-400' : 'text-slate-400'}`} />
        <button 
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`w-9 h-5 rounded-full relative p-0.5 transition-colors duration-200 focus:outline-none flex items-center ${isDarkMode ? 'bg-purple-600' : 'bg-slate-300'}`}
          aria-label="Toggle interface theme"
        >
          <motion.div 
            animate={{ x: isDarkMode ? 16 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="w-4 h-4 bg-white rounded-full shadow-md absolute left-0.5" 
          />
        </button>
        <Sun className={`w-3.5 h-3.5 transition-colors ${!isDarkMode ? 'text-amber-500' : 'text-slate-400'}`} />
      </div>

      {/* ========================================================================= */}
      {/* LEFT SIDE: Branding & Features                                            */}
      {/* ========================================================================= */}
      <div className="w-full md:w-[45%] h-fit md:h-auto relative flex flex-col justify-between p-6 sm:p-10 md:p-16 lg:p-24 overflow-hidden z-10 border-b md:border-b-0 md:border-r transition-colors duration-300 border-slate-500/10">
        
        {/* Soft Ambient Core Glows */}
        <motion.div 
          animate={{ scale: [1, 1.08, 1], opacity: isDarkMode ? [0.15, 0.22, 0.15] : [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
          className={`absolute top-[10%] left-[-10%] w-[80%] h-[80%] rounded-full blur-[100px] sm:blur-[130px] pointer-events-none transition-colors duration-300 ${isDarkMode ? 'bg-purple-600' : 'bg-purple-400'}`} 
        />
        
        {/* Topology Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" preserveAspectRatio="none">
            <motion.path variants={lineVariants} initial="hidden" animate="visible" d="M-50,100 Q 250,150 650,450" fill="none" stroke={isDarkMode ? "url(#purpleGradDark)" : "url(#purpleGradLight)"} strokeWidth="1.2" />
            <motion.path variants={lineVariants} initial="hidden" animate="visible" d="M-100,250 C 150,300 350,600 700,550" fill="none" stroke={isDarkMode ? "url(#purpleGradDark)" : "url(#purpleGradLight)"} strokeWidth="1" />
            <defs>
              <linearGradient id="purpleGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d8b4fe" stopOpacity="0.35" />
                <stop offset="40%" stopColor="#a855f7" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#070512" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="purpleGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#f8fafc" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Branding & Features Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 my-auto space-y-6 md:space-y-12 w-full max-w-md mx-auto md:mx-0 pr-12 md:pr-0"
        >
          {/* Logo Brand Block */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className={`relative p-2.5 rounded-xl border transition-all duration-300 ${isDarkMode ? 'bg-purple-950/30 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)]' : 'bg-white border-slate-200 shadow-sm'}`}>
              <svg className="w-6 h-6 text-purple-500 transform -rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="9" className="opacity-40" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3M12 9l1.5 1.5L15 12l-1.5 1.5L12 15l-1.5-1.5L9 12l1.5-1.5L12 9z" />
              </svg>
            </div>
            <span className={`text-xl font-bold tracking-wide transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Dev<span className="text-purple-500">Atlas</span>
            </span>
          </motion.div>

          {/* Core Copy Headers */}
          <motion.div variants={itemVariants} className="space-y-2 md:space-y-4">
            <h1 className={`text-xl sm:text-3xl lg:text-[2.1rem] font-extrabold tracking-tight leading-tight transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Your Developer <br className="hidden sm:block" />
              Knowledge <span className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>Atlas</span>
            </h1>
            <p className={`text-xs sm:text-sm font-light leading-relaxed transition-colors duration-300 ${isDarkMode ? 'text-slate-400/90' : 'text-slate-500'}`}>
              Search. Track. Analyze. Everything you learn across platforms, all in one place.
            </p>
          </motion.div>

          {/* UNIQUE MOBILE LAYOUT VARIANT: Becomes a compact grid/flex row on phones, returns to standalone items on desktop */}
          <div className="flex flex-col sm:grid sm:grid-cols-3 md:flex md:flex-col gap-4 md:gap-6 pt-1">
            {/* Feature Item 1 */}
            <motion.div variants={itemVariants} className="flex items-center md:items-start lg:items-center gap-3 md:gap-4 group cursor-pointer">
              <div className={`p-2 border rounded-xl shrink-0 transition-all duration-300 ${isDarkMode ? 'bg-purple-950/20 border-purple-900/30 group-hover:border-purple-500/30' : 'bg-white border-slate-200 group-hover:border-purple-300'}`}>
                <Search className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <h3 className={`text-xs font-semibold transition-colors ${isDarkMode ? 'text-slate-200 group-hover:text-purple-300' : 'text-slate-800 group-hover:text-purple-600'}`}>Universal Search</h3>
                <p className={`text-[10px] sm:hidden md:block md:text-[11px] mt-0.5 font-light transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Find problems, notes instantly.</p>
              </div>
            </motion.div>

            {/* Feature Item 2 */}
            <motion.div variants={itemVariants} className="flex items-center md:items-start lg:items-center gap-3 md:gap-4 group cursor-pointer">
              <div className={`p-2 border rounded-xl shrink-0 transition-all duration-300 ${isDarkMode ? 'bg-purple-950/20 border-purple-900/30 group-hover:border-purple-500/30' : 'bg-white border-slate-200 group-hover:border-purple-300'}`}>
                <BarChart3 className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <h3 className={`text-xs font-semibold transition-colors ${isDarkMode ? 'text-slate-200 group-hover:text-purple-300' : 'text-slate-800 group-hover:text-purple-600'}`}>Growth Analytics</h3>
                <p className={`text-[10px] sm:hidden md:block md:text-[11px] mt-0.5 font-light transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Track your code metrics.</p>
              </div>
            </motion.div>

            {/* Feature Item 3 */}
            <motion.div variants={itemVariants} className="flex items-center md:items-start lg:items-center gap-3 md:gap-4 group cursor-pointer">
              <div className={`p-2 border rounded-xl shrink-0 transition-all duration-300 ${isDarkMode ? 'bg-purple-950/20 border-purple-900/30 group-hover:border-purple-500/30' : 'bg-white border-slate-200 group-hover:border-purple-300'}`}>
                <Brain className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <h3 className={`text-xs font-semibold transition-colors ${isDarkMode ? 'text-slate-200 group-hover:text-purple-300' : 'text-slate-800 group-hover:text-purple-600'}`}>AI Study Planner</h3>
                <p className={`text-[10px] sm:hidden md:block md:text-[11px] mt-0.5 font-light transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Get custom roadmaps.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT SIDE: Interactive Modern Auth Panel                                 */}
      {/* ========================================================================= */}
      <div className={`w-full md:w-[55%] flex flex-col justify-between p-6 sm:p-10 md:p-12 relative z-10 backdrop-blur-[2px] transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0817]/40' : 'bg-[#f1f5f9]/30'}`}>
        
        {/* Spacer for mobile to push down content out of absolute header bounds */}
        <div className="h-6 md:hidden"></div>

        {/* Central Auth Card Frame */}
        <div className="w-full max-w-[440px] mx-auto my-auto pt-2 pb-8 md:py-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`border rounded-2xl p-5 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl transition-all duration-300 ${isDarkMode ? 'bg-[#0e0c22]/70 border-slate-900/60 shadow-black/40' : 'bg-white border-slate-200/60 shadow-slate-200'}`}
          >
            
            {/* Tabs Selector Navigation */}
            <div className={`flex border-b mb-6 md:mb-8 relative ${isDarkMode ? 'border-slate-800/40' : 'border-slate-100'}`}>
              <button 
                type="button"
                onClick={() => setActiveTab('login')}
                className={`flex-1 pb-3 text-xs font-semibold text-center transition-colors relative focus:outline-none ${activeTab === 'login' ? (isDarkMode ? 'text-purple-400' : 'text-purple-600') : (isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600')}`}
              >
                Login
                {activeTab === 'login' && (
                  <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-purple-500 to-indigo-500" />
                )}
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('signup')}
                className={`flex-1 pb-3 text-xs font-semibold text-center transition-colors relative focus:outline-none ${activeTab === 'signup' ? (isDarkMode ? 'text-purple-400' : 'text-purple-600') : (isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600')}`}
              >
                Sign Up
                {activeTab === 'signup' && (
                  <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-purple-500 to-indigo-500" />
                )}
              </button>
            </div>

            {/* Dynamic Sliding Tab Transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: activeTab === 'login' ? -8 : 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeTab === 'login' ? 8 : -8 }}
                transition={{ duration: 0.18 }}
              >
                {activeTab === 'login' ? (
                  <>
                    <div className="text-center mb-6 md:mb-8">
                      <h2 className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Welcome back!</h2>
                      <p className={`text-[11px] mt-1 font-light transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Login to continue your journey</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
                      <div className="space-y-2">
                        <label className={`text-[11px] font-medium block ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Email</label>
                        <div className="relative">
                          <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`} />
                          <input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-1 transition-all duration-200 ${isDarkMode ? 'bg-[#131129] border-slate-800/60 text-slate-200 placeholder-slate-600 focus:border-purple-500/40 focus:ring-purple-500/20' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500/40 focus:ring-purple-500/20'}`}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className={`text-[11px] font-medium block ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Password</label>
                        <div className="relative">
                          <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`} />
                          <input 
                            type={showPassword ? "text" : "password"} 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className={`w-full border rounded-xl pl-10 pr-10 py-2.5 text-xs focus:outline-none focus:ring-1 transition-all duration-200 ${isDarkMode ? 'bg-[#131129] border-slate-800/60 text-slate-200 placeholder-slate-600 focus:border-purple-500/40 focus:ring-purple-500/20' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500/40 focus:ring-purple-500/20'}`}
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute right-3.5 top-1/2 -translate-y-1/2 focus:outline-none transition-colors ${isDarkMode ? 'text-slate-600 hover:text-slate-400' : 'text-slate-400 hover:text-slate-600'}`}
                          >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <a href="#forgot" className="text-[11px] text-purple-500 hover:text-purple-400 transition-colors font-semibold">
                          Forgot password?
                        </a>
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        className="w-full mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 hover:opacity-95 text-white font-semibold py-2.5 px-4 rounded-xl text-xs shadow-[0_4px_18px_rgba(168,85,247,0.25)] transition-all"
                      >
                        Login
                      </motion.button>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="text-center mb-6 md:mb-8">
                      <h2 className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Create an account</h2>
                      <p className={`text-[11px] mt-1 font-light transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Get started with your custom roadmap today</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className={`text-[11px] font-medium block ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Full Name</label>
                        <input type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-[#131129] border-slate-800/60 text-slate-200 focus:border-purple-500/40' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-500/40'}`} />
                      </div>
                      <div className="space-y-1.5">
                        <label className={`text-[11px] font-medium block ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Email</label>
                        <input type="email" placeholder="Enter you Email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-[#131129] border-slate-800/60 text-slate-200 focus:border-purple-500/40' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-500/40'}`} />
                      </div>
                      <div className="space-y-1.5">
                        <label className={`text-[11px] font-medium block ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Password</label>
                        <input type="password" placeholder="Create secure password" value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-[#131129] border-slate-800/60 text-slate-200 focus:border-purple-500/40' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-500/40'}`} />
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        className="w-full mt-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white font-semibold py-2.5 px-4 rounded-xl text-xs shadow-[0_4px_18px_rgba(168,85,247,0.25)]"
                      >
                        Register Account
                      </motion.button>
                    </form>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Separator Divider Line */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDarkMode ? 'border-slate-800/40' : 'border-slate-200'}`}></div>
              </div>
              <span className={`relative px-3 text-[10px] tracking-wider font-medium uppercase transition-colors ${isDarkMode ? 'bg-[#0e0c22] text-slate-500' : 'bg-white text-slate-400'}`}>
                or continue with
              </span>
            </div>

            {/* OAuth Provider Action */}
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleGoogleLogin}
              className={`w-full border font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2.5 ${isDarkMode ? 'bg-[#131129] border-slate-800/60 text-slate-200 hover:bg-[#1a1736]' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.67 0 3.17.58 4.35 1.71l3.25-3.25C17.63 1.71 14.99 1 12 1 7.37 1 3.42 3.66 1.49 7.55l3.86 3C6.26 7.49 8.9 5.04 12 5.04z" />
                <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-1.99 3.41-4.92 3.41-8.6z" />
                <path fill="#FBBC05" d="M5.35 14.55A7.12 7.12 0 0 1 5 12c0-.89.15-1.75.43-2.55L1.57 6.45A11.94 11.94 0 0 0 0 12c0 2.05.52 4 1.44 5.73l3.91-3.18z" />
                <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.7-2.87c-1.03.69-2.34 1.1-3.92 1.1-3.1 0-5.74-2.45-6.68-5.51l-3.89 3.02C3.42 20.34 7.37 23 12 23z" />
              </svg>
              Continue with Google
            </motion.button>

            {/* Inline Footer Switch Tool */}
            <p className="text-center text-[11px] text-slate-400 mt-6 font-light">
              {activeTab === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                type="button"
                onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                className="text-purple-500 hover:text-purple-400 font-semibold transition-colors focus:outline-none ml-0.5"
              >
                {activeTab === 'login' ? 'Sign up' : 'Login'}
              </button>
            </p>

          </motion.div>
        </div>

        {/* Global Structural Footer Nav Block */}
        <div className="text-center z-10 mt-2 md:mt-0">
          <p className="text-[11px] text-slate-500 font-light">
            New here?{' '}
            <a 
              href="#register" 
              onClick={(e) => { e.preventDefault(); setActiveTab('signup'); }}
              className="text-purple-500 hover:text-purple-400 inline-flex items-center gap-1 font-semibold transition-all group"
            >
              Create an account 
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}