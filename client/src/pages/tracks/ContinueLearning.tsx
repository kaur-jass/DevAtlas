import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

interface ProblemModel {
  _id: string;
  problemId?: number;
  title: string;
  slug?: string;
  topic?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  confidence?: number;
}

interface ContinueLearningProps {
  recentProblems?: ProblemModel[];
}

export default function ContinueLearning({ recentProblems = [] }: ContinueLearningProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-gray-400">Continue Your Progress</h3>
      
      <div className="grid grid-cols-3 gap-4">
        {recentProblems?.slice(0, 3).map((prob, idx) => {
          const trackerConfidence = prob?.confidence ?? 50;
          const targetSlug = prob?.slug || prob?._id || "";
          
          return (
            <div key={prob?._id || idx} className="bg-[#0F0C1B] border border-[#1F1A3A] rounded-xl p-4 flex flex-col justify-between hover:border-[#32295C] transition group">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs text-gray-500 font-mono">#{prob?.problemId ?? '---'}</span>
                  <span className={`text-[10px] border px-1.5 py-0.5 rounded font-semibold ${
                    prob?.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    prob?.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                    'bg-green-500/10 text-green-400 border-green-500/20'
                  }`}>
                    {prob?.difficulty ?? 'Medium'}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white truncate group-hover:text-purple-400 transition">{prob?.title}</h4>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">{prob?.topic ?? 'General Track Node'}</p>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-[11px] font-medium text-gray-400">
                  <span>Confidence Level</span>
                  <span className="text-purple-400">{trackerConfidence}%</span>
                </div>
                <div className="w-full bg-[#181330] h-1.5 rounded-full overflow-hidden border border-[#231B44]">
                  <div style={{ width: `${trackerConfidence}%` }} className="bg-gradient-to-r from-purple-600 to-indigo-500 h-full rounded-full" />
                </div>
                
                <button 
                  onClick={() => navigate(`/problem/${targetSlug}`)}
                  className="w-full mt-2 flex items-center justify-center space-x-1.5 bg-[#17122D] hover:bg-purple-600 border border-[#2B224D] hover:border-purple-500 text-xs font-medium py-2 rounded-lg text-gray-300 hover:text-white transition"
                >
                  <Play size={12} fill="currentColor" /> <span>Resume Attempt</span>
                </button>
              </div>
            </div>
          );
        })}
        {recentProblems?.length === 0 && (
          <div className="col-span-3 p-6 text-center text-xs border border-dashed border-[#1F1A3A] text-gray-600 rounded-xl">
            No active matching dataset entities.
          </div>
        )}
      </div>
    </div>
  );
}