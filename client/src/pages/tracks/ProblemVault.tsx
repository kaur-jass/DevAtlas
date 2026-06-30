import React from 'react';

interface VaultProps {
  variant?: 'mini' | 'full';
  stats?: {
    totalProblems: number;
    trackedProblems: number;
    solved: number;
    attempted: number;
    bookmarked: number;
    revision: number;
    averageConfidence: number;
    totalAttempts: number;
  };
}

export default function ProblemVault({ variant = 'mini', stats }: VaultProps) {
  const totalProblems = stats?.totalProblems ?? 0;
  const solved = stats?.solved ?? 0;
  const attempted = stats?.attempted ?? 0;
  const bookmarked = stats?.bookmarked ?? 0;
  const revision = stats?.revision ?? 0;
  const avgConfidence = stats?.averageConfidence ?? 0;

  if (variant === 'mini') {
    return (
      <div className="bg-[#0F0C1B] rounded-xl border border-[#1F1A3A] p-4 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-white">Problem Vault</h3>
          <span className="text-xs text-purple-400 cursor-pointer hover:underline">Metrics</span>
        </div>
        
        <div className="space-y-2">
          {[
                {
                    label: "Total Problems",
                    val: totalProblems,
                    color: "text-gray-400",
                },
                {
                    label: "Tracked Problems",
                    val: stats?.trackedProblems ?? 0,
                    color: "text-blue-400",
                },
                {
                    label: "Solved",
                    val: solved,
                    color: "text-green-400",
                },
                {
                    label: "Attempted",
                    val: attempted,
                    color: "text-yellow-400",
                },
                {
                    label: "Bookmarked",
                    val: bookmarked,
                    color: "text-pink-400",
                },
                {
                    label: "Revision Queue",
                    val: revision,
                    color: "text-cyan-400",
                },
                {
                    label: "Average Confidence",
                    val: `${avgConfidence}%`,
                    color: "text-purple-400",
                },
                {
                    label: "Total Attempts",
                    val: stats?.totalAttempts ?? 0,
                    color: "text-orange-400",
                },
            ].map((row) => (
            <div key={row.label} className="flex justify-between items-center text-xs bg-[#161229]/60 px-3 py-2 rounded-lg border border-[#201A3D]">
              <span className="text-gray-400 font-medium">{row.label}</span>
              <span className={`font-bold ${row.color}`}> {typeof row.val === "number"? row.val.toLocaleString() : row.val}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F0C1B] rounded-xl border border-[#1F1A3A] p-6">
      <h2 className="text-lg font-bold text-white mb-2">Problem Vault</h2>
      <p className="text-xs text-gray-500 mb-6 font-sans">Track your DSA progress, confidence, and revision statistics.</p>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-[#141026] border border-[#1F1A3A] rounded-xl">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Solved</span>
          <div className="text-3xl font-extrabold text-green-400 mt-1">{solved}</div>
        </div>
        <div className="p-4 bg-[#141026] border border-[#1F1A3A] rounded-xl">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Attempted</span>
          <div className="text-3xl font-extrabold text-yellow-400 mt-1">{attempted}</div>
        </div>
        <div className="p-4 bg-[#141026] border border-[#1F1A3A] rounded-xl">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Average Confidence</span>
          <div className="text-3xl font-extrabold text-purple-400 mt-1">{avgConfidence}%</div>
        </div>
        <div className="p-4 bg-[#141026] border border-[#1F1A3A] rounded-xl">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Revision Queue</span>
          <div className="text-3xl font-extrabold text-cyan-400 mt-1">
            {revision}
          </div>
       </div>
      </div>

      <div className="overflow-x-auto border border-[#1F1A3A] rounded-xl bg-[#141026]">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#1C1635] text-gray-400 font-mono border-b border-[#1F1A3A]">
            <tr>
              <th className="p-3">Metric</th>
              <th className="p-3 text-right">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F1A3A] text-gray-300">
            <tr>
                <td className="p-3">Total Problems</td>
                <td className="p-3 text-right font-bold">{totalProblems}</td>
            </tr>

            <tr>
                <td className="p-3">Tracked Problems</td>
                <td className="p-3 text-right font-bold text-blue-400">
                    {stats?.trackedProblems ?? 0}
                </td>
            </tr>

            <tr>
                <td className="p-3">Solved</td>
                <td className="p-3 text-right font-bold text-green-400">
                    {solved}
                </td>
            </tr>

            <tr>
                <td className="p-3">Attempted</td>
                <td className="p-3 text-right font-bold text-yellow-400">
                    {attempted}
                </td>
            </tr>

            <tr>
                <td className="p-3">Bookmarked</td>
                <td className="p-3 text-right font-bold text-pink-400">
                    {bookmarked}
                </td>
            </tr>

            <tr>
                <td className="p-3">Revision Queue</td>
                <td className="p-3 text-right font-bold text-cyan-400">
                    {revision}
                </td>
            </tr>

            <tr>
                <td className="p-3">Average Confidence</td>
                <td className="p-3 text-right font-bold text-purple-400">
                    {avgConfidence}%
                </td>
            </tr>

            <tr>
                <td className="p-3">Total Attempts</td>
                <td className="p-3 text-right font-bold text-orange-400">
                    {stats?.totalAttempts ?? 0}
                </td>
            </tr>
        </tbody>
        </table>
      </div>
    </div>
  );
}