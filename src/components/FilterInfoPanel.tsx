"use client";

import { useAppStore } from "@/store/useAppStore";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  filterDataMap,
  getCategoryForFilter,
  filterCategories,
  type FilterCategory,
  type FilterItem,
} from "@/lib/filterData";

interface FilterInfoPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function FilterInfoPanel({ open, onClose }: FilterInfoPanelProps) {
  const activeFilter = useAppStore((s) => s.activeFilter);
  const setActiveFilter = useAppStore((s) => s.setActiveFilter);

  const filterData = filterDataMap[activeFilter];
  const category = getCategoryForFilter(activeFilter);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0a0a18]/95 shadow-2xl shadow-black/50 backdrop-blur-xl sm:w-[420px] animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-label="Filter information panel"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              About This Simulation
            </h2>
            <p className="mt-0.5 text-xs text-white/40">
              Understanding visual impairments
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Close info panel"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {/* Current filter detail */}
          {filterData && (
            <section className="mb-8">
              {/* Category badge */}
              {category && (
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                  <category.icon className="h-3.5 w-3.5" />
                  {category.name}
                </span>
              )}

              {/* Filter name & icon */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                  <filterData.icon className="h-5 w-5 text-white/80" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {filterData.label}
                  </h3>
                  <p className="text-sm text-white/50">{filterData.description}</p>
                </div>
              </div>

              {/* Explanation */}
              <div className="mb-4">
                <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-white/30">
                  What is it?
                </h4>
                <p className="text-sm leading-relaxed text-white/70">
                  {filterData.explanation}
                </p>
              </div>

              {/* Prevalence */}
              <div className="mb-4 rounded-xl bg-white/[0.03] p-4">
                <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-white/30">
                  Who is affected?
                </h4>
                <p className="text-sm leading-relaxed text-white/70">
                  {filterData.prevalence}
                </p>
              </div>

              {/* Design tip */}
              <div className="rounded-xl border border-cyan-500/10 bg-cyan-500/5 p-4">
                <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400/60">
                  Design Recommendation
                </h4>
                <p className="text-sm leading-relaxed text-white/70">
                  {filterData.designTip}
                </p>
              </div>
            </section>
          )}

          {/* Divider */}
          <div className="mb-6 h-px bg-white/5" />

          {/* All categories overview */}
          <section>
            <h3 className="mb-4 text-sm font-semibold text-white/50">
              All Simulations
            </h3>

            <div className="flex flex-col gap-4">
              {filterCategories.map((cat) => (
                <CategorySection
                  key={cat.name}
                  category={cat}
                  activeFilterId={activeFilter}
                  onSelectFilter={(id) => setActiveFilter(id)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function CategorySection({
  category,
  activeFilterId,
  onSelectFilter,
}: {
  category: FilterCategory;
  activeFilterId: string;
  onSelectFilter: (id: FilterItem["id"]) => void;
}) {
  const CatIcon = category.icon;

  return (
    <div className="rounded-xl bg-white/[0.02] p-3">
      {/* Category header */}
      <div className="mb-2 flex items-center gap-2">
        <CatIcon className="h-4 w-4 text-white/40" />
        <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40">
          {category.name}
        </h4>
      </div>

      {/* Category summary */}
      <p className="mb-3 text-xs leading-relaxed text-white/30">
        {category.summary}
      </p>

      {/* Filter list */}
      <div className="flex flex-col gap-1">
        {category.filters.map((f) => {
          const isActive = activeFilterId === f.id;
          const Icon = f.icon;
          return (
            <button
              key={f.id}
              onClick={() => onSelectFilter(f.id)}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-all duration-150 ${
                isActive
                  ? "bg-cyan-500/10 text-white"
                  : "text-white/50 hover:bg-white/5 hover:text-white/70"
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-medium">{f.label}</span>
                <span className="ml-2 text-[10px] text-white/30">
                  {f.description}
                </span>
              </div>
              {isActive && (
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
