"use client";

import { EyeIcon } from "@heroicons/react/24/outline";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Animated glass orb */}
      <div className="relative flex items-center justify-center">
        {/* Outer glow ring */}
        <div className="absolute h-32 w-32 animate-ping rounded-full bg-cyan-500/10" />
        <div className="absolute h-24 w-24 animate-pulse rounded-full bg-cyan-500/20 blur-xl" />

        {/* Glass orb */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/5 shadow-2xl backdrop-blur-xl">
          {/* Rotating ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-cyan-400" />
          {/* Eye icon */}
          <EyeIcon className="h-8 w-8 text-cyan-400" />
        </div>
      </div>

      {/* Text */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="text-sm font-medium tracking-wider text-white/80">
          Capturing screenshot…
        </p>
        <p className="text-xs text-white/40">
          This may take a few seconds
        </p>
      </div>

      {/* Animated dots */}
      <div className="mt-4 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-cyan-400"
            style={{
              animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
