import React from 'react';
import { Maximize2 } from 'lucide-react';

interface ConceptMapProps {
  topicStats?: Array<{ name: string; count: number }>;
  onNodeClick?: (topicName: string) => void;
}

export default function ConceptMap({ topicStats = [], onNodeClick }: ConceptMapProps) {
  const anchorCoordinates = [
    { top: '15%', left: '50%', status: 'good' },
    { top: '25%', left: '72%', status: 'good' },
    { top: '50%', left: '80%', status: 'good' },
    { top: '75%', left: '70%', status: 'average' },
    { top: '82%', left: '50%', status: 'needs-work' },
    { top: '68%', left: '26%', status: 'strong' },
    { top: '35%', left: '24%', status: 'good' },
  ];

  return (
    <div className="bg-[#0F0C1B] rounded-xl border border-[#1F1A3A] p-5 relative overflow-hidden h-[380px] flex flex-col justify-between z-10">
      <div className="flex justify-between items-center z-10">
        <div>
          <h3 className="text-sm font-semibold text-white">Concept Map</h3>
          <p className="text-xs text-gray-500">Confidence dispersal matrix anchors</p>
        </div>
        <button className="text-gray-500 hover:text-gray-300 transition">
          <Maximize2 size={16} />
        </button>
      </div>

      {/* FIXED CONTAINER LAYER: Removed blocking click pointer rules */}
      <div className="absolute inset-0 top-12 bottom-12">
        <svg className="w-full h-full absolute inset-0 opacity-20 pointer-events-none">
          {topicStats?.slice(0, anchorCoordinates.length).map((_, idx) => {
            const coord = anchorCoordinates[idx];
            return (
              <line 
                key={idx}
                x1="50%" y1="50%" 
                x2={coord.left} y2={coord.top} 
                stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3"
              />
            );
          })}
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white font-bold px-5 py-3 rounded-xl border border-purple-400 z-20 shadow-[0_0_20px_rgba(139,92,246,0.4)]">
          <div className="text-[10px] text-purple-200 opacity-80 text-center font-mono">{"</>"}</div>
          <div className="text-sm tracking-wide font-bold">DSA</div>
        </div>

        {topicStats?.slice(0, anchorCoordinates.length).map((topic, idx) => {
          const placement = anchorCoordinates[idx];
          if (!topic) return null;

          let nodeTheme = 'border-green-500 text-green-400 bg-green-950/30';
          if (placement.status === 'strong') nodeTheme = 'border-purple-500 text-purple-400 bg-purple-950/30';
          if (placement.status === 'average') nodeTheme = 'border-yellow-500 text-yellow-400 bg-yellow-950/30';
          if (placement.status === 'needs-work') nodeTheme = 'border-red-500 text-red-400 bg-red-950/30';

          return (
            <div 
              key={topic.name || idx}
              style={{ top: placement.top, left: placement.left }}
              onClick={() => {
                console.log("Concept node selection register execution trace:", topic.name);
                onNodeClick?.(topic.name);
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg border text-center cursor-pointer hover:scale-105 hover:border-purple-400 transition min-w-[95px] shadow-lg z-30 ${nodeTheme}`}
            >
              <div className="text-[11px] font-medium text-gray-200 truncate max-w-[110px]">{topic.name}</div>
              <div className="text-[10px] font-bold opacity-80">{topic.count ?? 0}</div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center space-x-4 text-[10px] text-gray-500 z-10 font-medium pointer-events-none">
        <div className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-purple-500" /> <span>Mastered</span></div>
        <div className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-green-500" /> <span>Good</span></div>
        <div className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> <span>Review</span></div>
      </div>
    </div>
  );
}