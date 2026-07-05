import React from "react";
import { Play } from "lucide-react";

interface ProblemModel {
  _id?: string;
  title: string;
  slug: string;
  topic?: string;
  difficulty: "Easy" | "Medium" | "Hard";
  confidence: number;
  attempts: number;
  status: string;
  bookmarked: boolean;
  revision: boolean;
  platform: string;
}

interface ContinueLearningProps {
  recentProblems?: ProblemModel[];
}

export default function ContinueLearning({
  recentProblems = [],
}: ContinueLearningProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-gray-400">
        Continue Your Progress
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {recentProblems.length > 0 ? (
          recentProblems.slice(0, 3).map((prob, idx) => {
            const confidence =
              prob.confidence > 0 ? prob.confidence : 50;

            const topic = prob.topic || "LeetCode";

            const difficultyColor =
              prob.difficulty === "Hard"
                ? "bg-red-500/10 text-red-400 border-red-500/20"
                : prob.difficulty === "Medium"
                ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                : "bg-green-500/10 text-green-400 border-green-500/20";

            const statusColor =
              prob.status === "Solved"
                ? "text-emerald-400"
                : "text-yellow-400";

            return (
              <div
                key={prob._id ?? idx}
                className="bg-[#0F0C1B] border border-[#1F1A3A] rounded-xl p-4 flex flex-col justify-between transition-all duration-300 hover:border-purple-500 hover:-translate-y-1"
              >
                {/* Header */}
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`text-xs font-semibold ${statusColor}`}
                    >
                      {prob.status}
                    </span>

                    <span
                      className={`text-[10px] px-2 py-1 rounded-md border font-semibold ${difficultyColor}`}
                    >
                      {prob.difficulty}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-white hover:text-purple-400 transition truncate">
                    {prob.title || "Untitled Problem"}
                  </h4>

                  <p className="text-xs text-gray-400 mt-1">
                    {topic}
                  </p>

                  <p className="text-[11px] text-gray-500 mt-1">
                    Attempts:{" "}
                    <span className="text-gray-300">
                      {prob.attempts}
                    </span>
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-5">
                  <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                    <span>Confidence</span>
                    <span className="text-purple-400 font-medium">
                      {confidence}%
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#181330] overflow-hidden border border-[#231B44]">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 transition-all duration-500"
                      style={{ width: `${confidence}%` }}
                    />
                  </div>

                  <button
                    onClick={() =>
                      window.open(
                        `https://leetcode.com/problems/${prob.slug}`,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg border border-[#2B224D] bg-[#17122D] py-2 text-xs font-medium text-gray-300 transition hover:border-purple-500 hover:bg-purple-600 hover:text-white"
                  >
                    <Play size={12} fill="currentColor" />
                    Resume Attempt
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full rounded-xl border border-dashed border-[#2B224D] p-8 text-center">
            <p className="text-sm text-gray-500">
              No recent problems found.
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Solve a problem or sync your LeetCode account to continue.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}