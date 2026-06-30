import React from 'react';
import { useNavigate } from 'react-router-dom';

interface RevisionItem {
  _id: string;
  title: string;
  slug?: string;
  lastRevision?: string;
  revisionCount?: number;
  topic?: string;
}

interface RevisionCenterProps {
  variant?: 'mini' | 'full';
  queue?: RevisionItem[];
}

export default function RevisionCenter({ variant = 'mini', queue = [] }: RevisionCenterProps) {
  const navigate = useNavigate();
  
  if (variant === 'full') {
    return (
      <div className="bg-[#0F0C1B] rounded-xl border border-[#1F1A3A] p-6">
        <h2 className="text-lg font-bold text-white mb-2">Extended Revision Queue</h2>
        <p className="text-xs text-gray-400 mb-4 font-sans">Full trace registry dashboard reflecting items needing active validation.</p>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {queue?.map((item, idx) => (
            <div key={item?._id || idx} className="p-3 bg-[#141026] border border-[#1F1A3A] rounded-lg text-xs flex justify-between items-center">
              <div>
                <span className="text-white font-medium block">{item?.title}</span>
                <span className="text-gray-500 text-[10px]">Total Iterations: {item?.revisionCount ?? 0}</span>
              </div>
              <button 
                onClick={() => navigate(`/problem/${item?.slug || item?._id}`)}
                className="px-3 py-1 bg-purple-600 text-white rounded text-[11px] font-medium hover:bg-purple-500 transition"
              >
                Review
              </button>
            </div>
          ))}
          {queue?.length === 0 && (
            <div className="text-center py-6 text-xs text-gray-600 border border-dashed border-[#1F1A3A] rounded-xl">No elements currently flag decay limits.</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F0C1B] rounded-xl border border-[#1F1A3A] p-4">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-sm font-semibold text-white">Revision Center</h3>
          <p className="text-[11px] text-gray-500">Decay interval validation logs</p>
        </div>
        <span className="text-xs text-purple-400 cursor-pointer hover:underline">View All</span>
      </div>

      <div className="space-y-2">
        {queue?.slice(0, 3).map((item, idx) => (
          <div key={item?._id || idx} className="flex items-center justify-between p-2.5 bg-[#151128] border border-[#221A3F] rounded-lg text-xs">
            <div className="truncate pr-2">
              <div className="font-medium text-gray-200 flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                <span className="truncate">{item?.title}</span>
              </div>
              <span className="text-[10px] text-gray-500 pl-3">
                {item?.lastRevision ? new Date(item.lastRevision).toLocaleDateString() : 'Needs Review'}
              </span>
            </div>
            <button 
              onClick={() => navigate(`/problem/${item?.slug || item?._id}`)}
              className="px-2.5 py-1 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-md hover:bg-purple-600 hover:text-white transition text-[11px] font-medium flex-shrink-0"
            >
              Review
            </button>
          </div>
        ))}
        {queue?.length === 0 && (
          <div className="text-center py-4 text-xs text-gray-600">No active tracking metrics require review.</div>
        )}
      </div>
    </div>
  );
}