import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Folder, FolderOpen, Code } from 'lucide-react';

interface TopicNode {
  name: string;
  count: number;
  children?: TopicNode[];
}

interface KnowledgeExplorerProps {
  topicStats?: TopicNode[];
  onSelectTopic?: (topicName: string) => void;
}

export default function KnowledgeExplorer({ topicStats = [], onSelectTopic }: KnowledgeExplorerProps) {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});

  const toggleNode = (name: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop parent execution triggers
    setExpandedNodes(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const renderTree = (nodes: TopicNode[], level = 0) => {
    return nodes.map((node) => {
      if (!node) return null;
      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = expandedNodes[node.name];

      return (
        <div key={node.name} className="select-none">
          <div 
            onClick={() => onSelectTopic?.(node.name)}
            style={{ paddingLeft: `${level * 12 + 12}px` }}
            className={`flex items-center justify-between py-1.5 pr-3 text-xs font-medium cursor-pointer transition rounded-md group hover:bg-[#120F24]`}
          >
            <div className="flex items-center space-x-2 truncate">
              {hasChildren ? (
                <button 
                  onClick={(e) => toggleNode(node.name, e)} 
                  className="p-0.5 hover:bg-purple-900/30 rounded text-gray-500 hover:text-purple-400 transition"
                >
                  {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                </button>
              ) : (
                <div className="w-4.5" />
              )}
              {hasChildren ? (
                isExpanded ? <FolderOpen size={13} className="text-purple-400" /> : <Folder size={13} className="text-purple-500/70" />
              ) : (
                <Code size={11} className="text-gray-600 group-hover:text-purple-400 transition" />
              )}
              <span className="truncate group-hover:text-purple-300 transition">{node.name}</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#151128] text-gray-500 group-hover:text-purple-300 transition">
              {node.count ?? 0}
            </span>
          </div>
          
          {hasChildren && isExpanded && (
            <div className="mt-0.5">
              {renderTree(node.children!, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-[#1F1A3A] bg-[#120E24]">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Knowledge Explorer</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {topicStats?.length === 0 ? (
          <div className="text-xs text-gray-600 p-4 text-center">No structural patterns mapped.</div>
        ) : (
          renderTree(topicStats)
        )}
      </div>
    </div>
  );
}