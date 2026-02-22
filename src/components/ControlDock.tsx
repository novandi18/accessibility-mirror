"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import {
  filterCategories,
  getCategoryForFilter,
  filterLabelMap,
} from "@/lib/filterData";

export { filterLabelMap };

interface ControlDockProps {
  onOpenInfo: () => void;
}

export default function ControlDock({ onOpenInfo }: ControlDockProps) {
  const activeFilter = useAppStore((s) => s.activeFilter);
  const setActiveFilter = useAppStore((s) => s.setActiveFilter);
  const [expanded, setExpanded] = useState(true);

  // Track which category is active — auto-select based on current filter
  const currentFilterCategory = getCategoryForFilter(activeFilter);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>(
    currentFilterCategory?.name ?? "Normal"
  );

  const currentCategory =
    filterCategories.find((c) => c.name === selectedCategoryName) ??
    filterCategories[0];

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 sm:bottom-6">
      {/* Expanded panel — category tabs + filter buttons */}
      {expanded && (
        <div className="mb-2 animate-in fade-in slide-in-from-bottom-2 rounded-2xl border border-white/10 bg-black/60 shadow-2xl shadow-black/50 backdrop-blur-xl">
          {/* Category tabs */}
          <div className="flex items-center gap-0.5 overflow-x-auto border-b border-white/5 px-3 py-2 sm:justify-center sm:gap-1">
            {filterCategories.map((cat) => {
              const isActive = selectedCategoryName === cat.name;
              const CatIcon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategoryName(cat.name)}
                  title={cat.name}
                  aria-label={`Category: ${cat.name}`}
                  className={`flex flex-shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-all duration-200 sm:px-3 sm:text-xs ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/40 hover:bg-white/5 hover:text-white/70"
                  }`}
                >
                  <CatIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Filter buttons within selected category */}
          <div className="flex items-center gap-1 overflow-x-auto px-3 py-2.5 sm:flex-wrap sm:justify-center sm:gap-1.5 sm:px-4 sm:py-3">
            {currentCategory.filters.map((f) => {
              const isActive = activeFilter === f.id;
              const Icon = f.icon;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  title={f.description}
                  aria-label={`${f.label}: ${f.description}`}
                  aria-pressed={isActive}
                  className={`
                    group relative flex flex-shrink-0 flex-col items-center gap-0.5 rounded-xl px-3 py-2 transition-all duration-200
                    sm:px-3.5 sm:py-2.5
                    ${
                      isActive
                        ? "bg-white/15 text-white shadow-lg shadow-white/5"
                        : "text-white/50 hover:bg-white/5 hover:text-white/80"
                    }
                  `}
                >
                  <Icon
                    className="h-5 w-5 sm:h-[22px] sm:w-[22px]"
                    aria-hidden="true"
                  />
                  <span className="text-[10px] font-medium leading-tight sm:text-xs">
                    {f.label}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Collapsed bar — always visible, shows current filter + controls */}
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/50 px-3 py-2 shadow-2xl shadow-black/40 backdrop-blur-xl sm:px-4 sm:py-2.5">
        {/* Current filter indicator */}
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow shadow-cyan-400/50" />
          <span className="text-xs font-medium text-white/70 sm:text-sm">
            {filterLabelMap[activeFilter] ?? "Normal"}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          {/* Info / Learn button */}
          <button
            onClick={onOpenInfo}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-white/40 transition-colors hover:bg-white/5 hover:text-white/70"
            aria-label="Learn about this filter"
            title="Learn about this condition"
          >
            <InformationCircleIcon className="h-4 w-4" />
            <span className="hidden text-xs sm:inline">Learn</span>
          </button>

          {/* Expand / Collapse toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-white/40 transition-colors hover:bg-white/5 hover:text-white/70"
            aria-label={expanded ? "Collapse filter panel" : "Expand filter panel"}
            title={expanded ? "Collapse filters" : "Expand filters"}
          >
            {expanded ? (
              <ChevronDownIcon className="h-4 w-4" />
            ) : (
              <ChevronUpIcon className="h-4 w-4" />
            )}
            <span className="hidden text-xs sm:inline">
              {expanded ? "Collapse" : "Filters"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
