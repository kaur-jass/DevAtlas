import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Network, Database, Edit2, Plus, LayoutDashboard, Search, 
  CheckCircle, Flame, FileText, Settings, Calendar, RotateCcw, BookOpen, RefreshCw
} from 'lucide-react';
import KnowledgeExplorer from './KnowledgeExplorer';
import ConceptMap from './ConceptMap';
import ProblemVault from './ProblemVault';
import RevisionCenter from './RevisionCenter';
import ContinueLearning from './ContinueLearning';

interface WorkspacePayload {
  success: boolean;
  workspace: {
    overview: {
      totalProblems: number;
      trackedProblems: number;
      solved: number;
      attempted: number;
      bookmarked: number;
      revision: number;
      averageConfidence: number;
      totalAttempts: number;
    };
    recentProblems: any[];
    revisionQueue: any[];
    topicStats: any[];
    studyStreak: number;
  };
}

export default function TrackWorkspace() {
  const { trackId } = useParams<{ trackId: string }>();
  const navigate = useNavigate();
  const activeTrackRoute = trackId || 'dsa';

  const [activeTab, setActiveTab] = useState('explorer');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [track, setTrack] = useState<any>(null);
  const [workspace, setWorkspace] = useState<WorkspacePayload['workspace'] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Profile modal and action states
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('LeetCode');
  const [inputUsername, setInputUsername] = useState('');
  
  // Dedicated sync loader states
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusText, setSyncStatusText] = useState<string | null>(null);

  // 1. IMPROVEMENT: Extracted into a normal reusable function out of useEffect scope
  const loadWorkspaceContext = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      };

      const [trackRes, workspaceRes] = await Promise.all([
        fetch(`http://localhost:5000/api/tracks/${activeTrackRoute}`, { headers }),
        fetch(`http://localhost:5000/api/workspace/${activeTrackRoute}`, { headers })
      ]);

      if (!trackRes.ok || !workspaceRes.ok) {
        throw new Error(`API Connection Failed. Track: ${trackRes.status}, Workspace: ${workspaceRes.status}`);
      }

      const trackData = await trackRes.json();
      const workspaceData = await workspaceRes.json();

      if (trackData.success && workspaceData.success) {
        setTrack(trackData.track);
        setWorkspace(workspaceData.workspace);
      } else {
        throw new Error('API resolution returned structural success error.');
      }
    } catch (err: any) {
      console.error("Workspace configuration error details:", err);
      setError(err.message || 'Fatal data stream synchronization crash.');
    }
  };

  // 2. Clear effect execution wrapper mapping state triggers safely
  useEffect(() => {
    const initializeWorkspace = async () => {
      setLoading(true);
      setError(null);
      await loadWorkspaceContext();
      setLoading(false);
    };
    initializeWorkspace();
  }, [activeTrackRoute]);

  // 3. IMPROVEMENT: Trigger manual indexing from header action buttons
  const handleManualSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncStatusText("Synchronizing data matrix...");
    
    try {
      const token = localStorage.getItem('token');
      const syncRes = await fetch(`http://localhost:5000/api/tracks/${activeTrackRoute}/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });

      if (!syncRes.ok) throw new Error(`Sync routine failed with code status: ${syncRes.status}`);
      
      setSyncStatusText("Reloading workspace data...");
      await loadWorkspaceContext();
      
      setSyncStatusText("Synced successfully! ✨");
      setTimeout(() => setSyncStatusText(null), 3000);
    } catch (err: any) {
      console.error("Manual data ledger sync error:", err);
      setSyncStatusText("Sync Failed ⚠️");
      setTimeout(() => setSyncStatusText(null), 4000);
    } finally {
      setIsSyncing(false);
    }
  };

  // 4. IMPROVEMENT: Profile linked sequence follows through to pipeline sync automatically
  const handleAddProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUsername.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const updatedProfiles = [
        ...(track?.connectedProfiles || []),
        { platform: selectedPlatform, username: inputUsername.trim(), connectedAt: new Date() }
      ];

      // Step A: Save updated tracks data structure metadata
      const putRes = await fetch(`http://localhost:5000/api/tracks/${activeTrackRoute}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          ...track,
          connectedProfiles: updatedProfiles
        })
      });

      if (!putRes.ok) throw new Error("Could not update profile configurations.");

      // Optimistic layout component render assignment
      setTrack((prev: any) => ({
        ...prev,
        connectedProfiles: updatedProfiles
      }));
      
      setInputUsername('');
      setIsProfileModalOpen(false);

      // Step B: Automatically call the sync endpoint right after saving
      setIsSyncing(true);
      setSyncStatusText("Importing platform problem datasets...");
      
      const syncRes = await fetch(
          `http://localhost:5000/api/tracks/${activeTrackRoute}/sync`,
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  ...(token
                      ? { Authorization: `Bearer ${token}` }
                      : {}),
              },
          }
      );

      if (!syncRes.ok) {
          throw new Error("Sync failed");
      }

      await loadWorkspaceContext();
      setSyncStatusText("Profile linked & synced!");
      setTimeout(() => setSyncStatusText(null), 3000);
    } catch (err) {
      console.error("Could not write profile link metadata pipeline:", err);
      setSyncStatusText("Auto-Sync Failed ⚠️");
      setTimeout(() => setSyncStatusText(null), 4000);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleTopicSelection = (topicName: string) => {
    setSearchQuery(topicName);
    setActiveTab('problems');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#0B0813] text-purple-400">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
        <div className="text-xs font-mono tracking-widest uppercase">Fetching Context Matrix...</div>
      </div>
    );
  }

  if (error || !track || !workspace) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#0B0813] text-gray-300 p-6 font-mono text-center">
        <div className="text-red-500 text-xl mb-2">⚠️ Endpoint Connection Interrupted</div>
        <p className="text-sm max-w-lg bg-[#140F26] border border-red-950/40 p-4 rounded-xl text-red-400 font-sans mb-4">{error}</p>
        <p className="text-xs text-gray-500">Double check that your Node server is running on <b>port 5000</b> and the route exists.</p>
      </div>
    );
  }

  const sanitizedQuery = searchQuery.trim().toLowerCase();

  const filteredTopics = workspace?.topicStats?.filter(t => 
    (t?.name || "").toLowerCase().includes(sanitizedQuery)
  ) || [];

  const filteredProblems = workspace?.recentProblems?.filter(p => 
    (p?.title || "").toLowerCase().includes(sanitizedQuery) ||
    (p?.topic || "").toLowerCase().includes(sanitizedQuery)
  ) || [];

  const filteredRevisionQueue = workspace?.revisionQueue?.filter(r => 
    (r?.title || "").toLowerCase().includes(sanitizedQuery)
  ) || [];

  const tabs = [
    { id: 'explorer', label: 'Explorer', icon: LayoutDashboard },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'problems', label: 'Problems', icon: Database },
    { id: 'concept-map', label: 'Concept Map', icon: Network },
    { id: 'study-plan', label: 'Study Plan', icon: Calendar },
    { id: 'revision', label: 'Revision', icon: RotateCcw },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#0B0813] text-gray-200 font-sans overflow-hidden">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#0F0C1B] border-r border-[#1F1A3A] flex flex-col justify-between p-4 flex-shrink-0 z-30">
        <div>
          <div className="flex items-center space-x-2 px-2 py-3 mb-6">
            <div className="bg-purple-600 p-2 rounded-lg text-white">
              <Network size={20} />
            </div>
            <span className="text-xl font-bold text-white tracking-wide">DevAtlas</span>
          </div>
          
          <nav className="space-y-1">
            {['Overview', 'Search', 'Tracks', 'Analytics', 'Compare', 'AI Mentor', 'Problems', 'Notes', 'Bookmarks'].map((item) => (
              <button 
                key={item} 
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  item === 'Tracks' ? 'bg-[#1E1738] text-purple-400' : 'text-gray-400 hover:bg-[#151026] hover:text-gray-200'
                }`}
              >
                <span>{item}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-gradient-to-br from-[#1A1235] to-[#120D24] p-4 rounded-xl border border-[#2A1F4D]">
          <div className="flex items-center space-x-2 text-gray-300 text-sm font-medium">
            <Flame size={16} className="text-orange-500 animate-pulse" />
            <span>Study Streak 🔥</span>
          </div>
          <div className="text-3xl font-extrabold text-white my-1">
            {workspace?.studyStreak ?? 0} <span className="text-sm font-normal text-gray-400">days</span>
          </div>
          <div className="h-1.5 w-full bg-purple-950/40 rounded-full overflow-hidden border border-[#231B44]">
            <div className="w-[80%] bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" />
          </div>
        </div>
      </aside>

      {/* CANVAS VIEWPORT */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#090611] relative z-10">
        <header className="flex items-center justify-between px-8 py-4 border-b border-[#1F1A3A] bg-[#0F0C1B] relative z-40">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-900/40 p-3 rounded-xl border border-purple-500/30 text-purple-400">
              <Database size={24} />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-white tracking-tight">{track?.name || 'Workspace'}</h1>
                
                {/* PROFILES INDICATOR GRID CONTAINER */}
                <div className="flex items-center space-x-2">
                  {track?.connectedProfiles && track.connectedProfiles.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 max-w-md">
                      {track.connectedProfiles.map((p: any, idx: number) => (
                        <div key={idx} className="flex items-center space-x-1 bg-[#17122B] px-2 py-1 rounded-md border border-purple-500/30 text-xs text-purple-300">
                          <span className="font-semibold opacity-75 text-[10px] uppercase">{p.platform}:</span>
                          <span className="max-w-[80px] truncate font-mono">{p.username}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500 font-mono italic">No profiles connected</span>
                  )}

                  <button 
                    onClick={() => setIsProfileModalOpen(true)}
                    className="p-1 rounded-md bg-[#1C1635] hover:bg-purple-600 border border-[#2B224D] text-gray-400 hover:text-white transition flex items-center justify-center"
                    title="Connect alternative platforms"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-0.5">{track?.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* STATUS TOAST / FEEDBACK OVERLAY BANNER */}
            {syncStatusText && (
              <span className="text-xs font-mono bg-[#191333] border border-[#2F255C] px-3 py-1.5 rounded-lg text-purple-300 animate-pulse">
                {syncStatusText}
              </span>
            )}

            {/* IMPROVEMENT: DEDICATED SYNC DATA ACTIONS BUTTON */}
            <button 
              onClick={handleManualSync}
              disabled={isSyncing}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm transition font-medium border border-purple-500/30 ${
                isSyncing 
                  ? 'bg-purple-950/40 text-purple-400 cursor-not-allowed' 
                  : 'bg-[#1E163B] text-purple-300 hover:bg-purple-600 hover:text-white shadow-lg shadow-purple-950/20'
              }`}
            >
              <RefreshCw size={14} className={isSyncing ? "animate-spin" : ""} />
              <span>{isSyncing ? "Syncing..." : "Sync Data"}</span>
            </button>

            <button className="flex items-center space-x-2 px-3 py-1.5 bg-[#1A1530] border border-[#2B224D] rounded-lg text-sm text-gray-300 hover:bg-[#251E44] transition">
              <Edit2 size={14} /> <span>Edit Track</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium text-white transition">
              <Plus size={16} /> <span>Add Content</span>
            </button>
          </div>
        </header>

        {/* TAB OPTIONS LINE BAR CONTROLLER */}
        <div className="px-8 bg-[#0F0C1B] border-b border-[#1F1A3A] flex space-x-6 overflow-x-auto scrollbar-none z-20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3.5 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'border-purple-500 text-purple-400' 
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* WORKSPACE MIDDLE PANELS SECTIONSTAGE */}
        <div className="flex-1 flex overflow-hidden p-6 gap-6 relative">
          <section className="w-80 flex flex-col bg-[#0F0C1B] rounded-xl border border-[#1F1A3A] overflow-hidden flex-shrink-0">
            <KnowledgeExplorer topicStats={filteredTopics} onSelectTopic={handleTopicSelection} />
          </section>

          <section className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Type keywords to filter active context cards..." 
                className="w-full bg-[#0F0C1B] border border-[#1F1A3A] rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-purple-500 text-white placeholder-gray-500 transition shadow-inner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {activeTab === 'explorer' && (
              <>
                <ConceptMap topicStats={filteredTopics} onNodeClick={handleTopicSelection} />
                <ContinueLearning recentProblems={filteredProblems} />
              </>
            )}

            {activeTab === 'search' && (
              <div className="flex flex-col gap-3">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono">Found Results ({filteredProblems.length})</div>
                <ContinueLearning recentProblems={filteredProblems} />
              </div>
            )}

            {activeTab === 'problems' && (
              <ProblemVault variant="full" stats={workspace?.overview} />
            )}

            {activeTab === 'concept-map' && (
              <ConceptMap topicStats={filteredTopics} onNodeClick={handleTopicSelection} />
            )}

            {activeTab === 'study-plan' && (
              <div className="bg-[#0F0C1B] rounded-xl border border-[#1F1A3A] p-6 text-center text-xs text-gray-400">
                📅 Study Plan Engine Active for route link context.
              </div>
            )}

            {activeTab === 'revision' && (
              <RevisionCenter variant="full" queue={filteredRevisionQueue} />
            )}

            {activeTab === 'resources' && (
              <div className="bg-[#0F0C1B] rounded-xl border border-[#1F1A3A] p-6 text-center text-xs text-gray-400">
                📚 External Storage Documentation Nodes.
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="bg-[#0F0C1B] rounded-xl border border-[#1F1A3A] p-6 text-xs font-mono text-purple-400">
                Markdown records active sync window logs framework layer.
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-[#0F0C1B] rounded-xl border border-[#1F1A3A] p-6 text-xs text-gray-400">
                ⚙️ Configurations manager panel view framework controls.
              </div>
            )}
          </section>

          <section className="w-80 flex flex-col gap-6 overflow-y-auto flex-shrink-0">
            <ProblemVault variant="mini" stats={workspace?.overview} />
            <RevisionCenter variant="mini" queue={filteredRevisionQueue} />
          </section>
        </div>
      </main>

      {/* POPUP CONNECTIONS OVERLAY FRAME */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0F0C1B] border border-[#2A234D] w-full max-w-sm rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in duration-150">
            <h3 className="text-base font-bold text-white mb-1">Link Platform Profiles</h3>
            <p className="text-xs text-gray-400 mb-4">Add tracking parameters for your dashboard coding pipelines.</p>
            
            <form onSubmit={handleAddProfile} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Target Platform Provider</label>
                <select 
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full bg-[#16122B] border border-[#2B224D] text-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-500"
                >
                  <option value="LeetCode">LeetCode</option>
                  <option value="Codeforces">Codeforces</option>
                  <option value="HackerRank">HackerRank</option>
                  <option value="GitHub">GitHub</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Platform Handle Username</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. jass_rover"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                  className="w-full bg-[#16122B] border border-[#2B224D] text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-500 placeholder-gray-600 font-mono"
                />
              </div>

              <div className="flex space-x-2 pt-2 justify-end text-xs font-medium">
                <button 
                  type="button" 
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 bg-transparent text-gray-400 hover:text-white transition rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-md transition"
                >
                  Link Integration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}