"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, BookOpen, GraduationCap } from "lucide-react";
import { CHAPTER_LIST } from "@/lib/simulation-engine";

interface SyllabusNavigatorProps {
  selectedTopicId: string | null;
  onSelectTopic: (id: string) => void;
}

export function SyllabusNavigator({ selectedTopicId, onSelectTopic }: SyllabusNavigatorProps) {
  const [expandedChapters, setExpandedChapters] = useState<number[]>([]);

  const toggleChapter = (id: number) => {
    setExpandedChapters(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900 border-l border-zinc-800 w-72 shrink-0 overflow-hidden shadow-2xl">
      <header className="p-5 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
            <GraduationCap size={20} />
          </div>
          <div>
            <h2 className="text-[13px] font-black text-white uppercase tracking-wider leading-none">
              Lab Curriculum
            </h2>
            <p className="text-[9px] font-bold text-zinc-500 uppercase mt-1 tracking-widest">
              Distributed Systems A252
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
        {CHAPTER_LIST.map((chapter) => (
          <div key={chapter.id} className="group">
            <button
              onClick={() => toggleChapter(chapter.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                expandedChapters.includes(chapter.id)
                  ? "bg-zinc-800 text-white"
                  : "hover:bg-zinc-800/50 text-zinc-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen size={16} className={expandedChapters.includes(chapter.id) ? "text-amber-500" : "text-zinc-600"} />
                <span className="text-[11px] font-bold tracking-tight">{chapter.title}</span>
              </div>
              {expandedChapters.includes(chapter.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>

            {expandedChapters.includes(chapter.id) && (
              <div className="mt-1 ml-4 pl-4 border-l border-zinc-800 space-y-1 animate-in slide-in-from-left-2 duration-200">
                {chapter.sections.map((sectionId) => (
                  <button
                    key={sectionId}
                    onClick={() => onSelectTopic(sectionId)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[10px] font-bold transition-all ${
                      selectedTopicId === sectionId
                        ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20 scale-[1.02]"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                    }`}
                  >
                    Section {sectionId}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className="p-4 bg-zinc-950 border-t border-zinc-800">
        <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
          <p className="text-[8px] font-black text-amber-500 uppercase tracking-widest mb-1 text-center">
            Active Simulation
          </p>
          <div className="text-[11px] font-bold text-white text-center">
            {selectedTopicId ? `Unit ${selectedTopicId} Armed` : "Select Topic to Trace"}
          </div>
        </div>
      </footer>
    </div>
  );
}
