import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { 
  Trash2, FolderPlus, Clock, GraduationCap, X 
} from 'lucide-react';
import {
  getTracks,
  createTrack,
  deleteTrack,
} from "../../services/trackService";


interface TrackItem {
  _id: string;
  name: string;
  color: string;
  progress: number;
  topicsCount: number;
  completedTopics: number;
  lastActive: string;
  description: string;
}

interface TracksProps {
  isDarkMode: boolean;
}

export default function DevAtlasTracks({ isDarkMode }: TracksProps): React.JSX.Element {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [newTrackName, setNewTrackName] = useState<string>('');
  const [newTrackDesc, setNewTrackDesc] = useState<string>('');
  const [newTrackColor, setNewTrackColor] = useState<string>('bg-purple-500');
  const [tracks, setTracks] = useState<TrackItem[]>([]);
  const navigate = useNavigate();

  const colorOptions = [
    { class: 'bg-purple-500', label: 'Purple' },
    { class: 'bg-blue-500', label: 'Blue' },
    { class: 'bg-emerald-500', label: 'Emerald' },
    { class: 'bg-amber-500', label: 'Amber' },
    { class: 'bg-pink-500', label: 'Pink' },
  ];

  const handleCreateTrack = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTrackName.trim()) return;

    try {
      await createTrack({
        name: newTrackName,
        description: newTrackDesc,
        color: newTrackColor,
      });

      await loadTracks();

      setNewTrackName("");
      setNewTrackDesc("");
      setNewTrackColor("bg-purple-500");

      setIsCreateModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTrack = async (
    id: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();

    try {
      await deleteTrack(id);

      await loadTracks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    try {
      const data = await getTracks();
      setTracks(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto relative z-10">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
            Learning Tracks 🎯
          </h2>
          <p className="text-xs text-slate-500 font-light mt-0.5">
            Create, filter, manage, and follow your customized engineering educational trajectories.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-purple-600/10 transition-colors"
        >
          <FolderPlus className="w-4 h-4" />
          <span>Create New Track</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {tracks.map((track) => (
            <motion.div
              layout
              key={track._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => navigate(`/tracks/${track._id}`)}
              className={`p-5 rounded-2xl border flex flex-col justify-between shadow-sm cursor-pointer hover:border-purple-500/40 transition-all relative overflow-hidden group ${
                isDarkMode ? 'bg-[#0e0c22]/60 border-slate-900/80' : 'bg-white border-slate-200'
              }`}
            >
              <div className={`absolute top-0 left-0 right-0 h-[3px] ${track.color}`} />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${track.color}`} />
                    <h3 className="text-base font-black tracking-tight group-hover:text-purple-400 transition-colors">
                      {track.name}
                    </h3>
                  </div>
                  <button
                    onClick={(e) => handleDeleteTrack(track._id, e)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] leading-relaxed font-light text-slate-400 mb-5 line-clamp-2">
                  {track.description}
                </p>
              </div>

              <div className="space-y-4 pt-3 border-t border-slate-500/5">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-500 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Progress Module</span>
                    </span>
                    <span className="font-mono font-bold text-purple-400">{track.progress}%</span>
                  </div>
                  <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${track.color}`} 
                      style={{ width: `${track.progress}%` }} 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                  <div>
                    <span className={isDarkMode ? 'font-bold text-slate-400' : 'font-bold text-slate-700'}>
                      {track.completedTopics}
                    </span>{' '}
                    / {track.topicsCount} Chapters
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{track.lastActive}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md p-6 rounded-2xl border relative z-10 shadow-2xl ${
                isDarkMode ? 'bg-[#0a0817] border-slate-900 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-500/5 pb-3 mb-4">
                <h3 className="text-sm font-bold flex items-center gap-2">Configure Custom Track Roadmap</h3>
                <button onClick={() => setIsCreateModalOpen(false)}><X className="w-4 h-4" /></button>
              </div>

              <form onSubmit={handleCreateTrack} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Track Name</label>
                  <input
                    required
                    type="text"
                    value={newTrackName}
                    onChange={(e) => setNewTrackName(e.target.value)}
                    placeholder="e.g. Advanced System Design"
                    className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none focus:border-purple-500/40 ${
                      isDarkMode ? 'bg-[#0e0c22] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Description</label>
                  <textarea
                    rows={3}
                    value={newTrackDesc}
                    onChange={(e) => setNewTrackDesc(e.target.value)}
                    placeholder="Provide a quick blueprint summary..."
                    className={`w-full rounded-xl px-3.5 py-2 text-xs border focus:outline-none resize-none focus:border-purple-500/40 ${
                      isDarkMode ? 'bg-[#0e0c22] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Accent Tag Theme</label>
                  <div className="flex gap-2.5 pt-1">
                    {colorOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt.class}
                        onClick={() => setNewTrackColor(opt.class)}
                        className={`w-6 h-6 rounded-full transition-all relative ${opt.class} ${
                          newTrackColor === opt.class ? 'ring-2 ring-purple-600 ring-offset-2 ' + (isDarkMode ? 'ring-offset-[#0a0817]' : 'ring-offset-white') : 'scale-90 opacity-60'
                        }`}
                        title={opt.label}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-3 justify-end text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className={`px-4 py-2 rounded-xl transition-colors ${
                      isDarkMode ? 'text-slate-400 hover:bg-slate-900' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl shadow-md transition-colors"
                  >
                    Build Dynamic Track
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}