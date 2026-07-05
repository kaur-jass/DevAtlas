import React from 'react';

interface RevisionItem {
  _id: string;
  title: string;
  slug: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  confidence: number;
  attempts: number;
  status: string;
  priority: number;
  revisionReason: string;
  platform: string;
}
interface RevisionCenterProps {
  variant?: 'mini' | 'full';
  queue?: RevisionItem[];
}

export default function RevisionCenter({ variant = 'mini', queue = [] }: RevisionCenterProps) {
  
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

          <div className="flex justify-between items-center mb-4">

              <div>
                  <h3 className="text-sm font-semibold text-white">
                      📚 Today's Revision
                  </h3>

                  <p className="text-[11px] text-gray-500">
                      Focus on your weakest concepts today
                  </p>

              </div>

              <span className="text-xs text-purple-400">
                  {queue.length} Problems
              </span>

          </div>

          <div className="space-y-3">

              {queue.slice(0, 3).map((item) => (

                  <div
                      key={item._id}
                      className="bg-[#141026] border border-[#221A3F] rounded-xl p-3"
                  >

                      <div className="flex justify-between">

                          <div>

                              <h4 className="text-sm font-semibold text-white">
                                  {item.title}
                              </h4>

                              <p className="text-xs text-gray-400 mt-1">
                                  {item.topic} • {item.difficulty}
                              </p>

                          </div>

                          <span className="text-red-400 text-xs font-semibold">
                              {item.priority >= 70
                                  ? "🔴 High"
                                  : item.priority >= 40
                                  ? "🟠 Medium"
                                  : "🟢 Low"}
                          </span>

                      </div>

                      <div className="mt-3 text-xs text-gray-400">

                          Confidence

                          <span className="text-purple-400 ml-2">
                              {item.confidence}%
                          </span>

                      </div>

                      <div className="text-xs text-gray-500 mt-1">
                          {item.revisionReason}
                      </div>

                      <button
                          onClick={() =>
                              window.open(
                                  `https://leetcode.com/problems/${item.slug}`,
                                  "_blank",
                                  "noopener,noreferrer"
                              )
                          }
                          className="mt-4 w-full bg-purple-600 hover:bg-purple-500 text-white rounded-lg py-2 text-xs font-medium transition"
                      >
                          Review Now
                      </button>

                  </div>

              ))}

              {queue.length === 0 && (

                  <div className="text-center py-6 text-gray-500 text-sm">

                      🎉 Nothing to revise today.

                  </div>

              )}

          </div>

      </div>
  );
  
}