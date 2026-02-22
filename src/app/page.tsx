"use client";

import { useState, useCallback, useRef, type FormEvent, type DragEvent, type ChangeEvent } from "react";
import { useAppStore } from "@/store/useAppStore";
import { validateUrl } from "@/lib/validators";
import { filterLabelMap } from "@/lib/filterData";
import LoadingOverlay from "@/components/LoadingOverlay";
import ControlDock from "@/components/ControlDock";
import FilterInfoPanel from "@/components/FilterInfoPanel";
import {
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  LinkIcon,
  EyeIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const {
    url,
    setUrl,
    screenshotUrl,
    setScreenshotUrl,
    activeFilter,
    isLoading,
    setIsLoading,
    error,
    setError,
    reset,
  } = useAppStore();

  const [inputValue, setInputValue] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [infoPanelOpen, setInfoPanelOpen] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setValidationError(null);
      setError(null);

      const validUrl = validateUrl(inputValue);
      if (!validUrl) {
        setValidationError(
          "Please enter a valid URL (e.g., https://example.com)"
        );
        return;
      }

      setUrl(validUrl);
      setIsLoading(true);

      try {
        const res = await fetch(
          `/api/screenshot?url=${encodeURIComponent(validUrl)}`
        );

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(
            data.error || `Screenshot failed (${res.status})`
          );
        }

        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);
        setScreenshotUrl(objectUrl);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [inputValue, setUrl, setIsLoading, setScreenshotUrl, setError]
  );

  const handleBack = useCallback(() => {
    if (screenshotUrl) {
      URL.revokeObjectURL(screenshotUrl);
    }
    reset();
    setInputValue("");
  }, [screenshotUrl, reset]);

  /** Process an uploaded image file (ephemeral, browser-only) */
  const handleImageUpload = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file (PNG, JPG, WebP, etc.)");
        return;
      }

      // 20 MB sanity limit
      if (file.size > 20 * 1024 * 1024) {
        setError("Image is too large. Please upload a file under 20 MB.");
        return;
      }

      setError(null);
      setValidationError(null);

      const objectUrl = URL.createObjectURL(file);
      setUrl(`Uploaded: ${file.name}`);
      setScreenshotUrl(objectUrl);
    },
    [setUrl, setScreenshotUrl, setError]
  );

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleImageUpload(file);
      // Reset input so the same file can be re-selected
      e.target.value = "";
    },
    [handleImageUpload]
  );

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDraggingOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleImageUpload(file);
    },
    [handleImageUpload]
  );

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const onDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
  }, []);

  const filterClass = `filter-${activeFilter}`;

  // ─── Dashboard View ───
  if (screenshotUrl) {
    return (
      <main className="relative min-h-dvh bg-background">
        {/* Top bar */}
        <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 sm:px-6">
          <button
            onClick={handleBack}
            className="glass flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
            aria-label="Go back to home"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </button>

          <div className="glass rounded-xl px-4 py-2">
            <p className="max-w-[200px] truncate text-xs text-white/50 sm:max-w-md sm:text-sm">
              {url}
            </p>
          </div>

          {/* Filter label */}
          <div className="glass rounded-xl px-4 py-2">
            <p className="text-xs font-medium text-cyan-400 sm:text-sm">
              {filterLabelMap[activeFilter] ?? activeFilter}
            </p>
          </div>
        </header>

        {/* Screenshot display */}
        <div className="flex min-h-dvh items-center justify-center p-4 pt-16 pb-24">
          <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/5 shadow-2xl shadow-black/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={screenshotUrl}
              alt={`Screenshot of ${url} with ${activeFilter} filter applied`}
              className={`h-auto w-full object-contain transition-[filter] duration-500 ease-out ${filterClass}`}
            />
          </div>
        </div>

        {/* Control Dock */}
        <ControlDock onOpenInfo={() => setInfoPanelOpen(true)} />

        {/* Filter Info Panel */}
        <FilterInfoPanel
          open={infoPanelOpen}
          onClose={() => setInfoPanelOpen(false)}
        />
      </main>
    );
  }

  // ─── Landing Page ───
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4">
      {/* Background gradient orbs */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(6,182,212,0) 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-0 h-[400px] w-[400px] rounded-full opacity-10 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0) 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        {/* Logo / Icon */}
        <div className="glass flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg shadow-cyan-500/10">
          <EyeIcon className="h-8 w-8 text-cyan-400" />
        </div>

        {/* Headline */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Accessibility
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Mirror
            </span>
          </h1>
          <p className="max-w-md text-base text-white/50 sm:text-lg">
            See the web through different eyes.
          </p>
        </div>

        {/* URL Input Form */}
        <form
          onSubmit={handleSubmit}
          className="glass w-full max-w-xl rounded-2xl p-2"
          noValidate
        >
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <label htmlFor="url-input" className="sr-only">
                Website URL
              </label>
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                <LinkIcon className="h-4 w-4" />
              </div>
              <input
                id="url-input"
                type="url"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setValidationError(null);
                }}
                placeholder="https://example.com"
                className="h-12 w-full rounded-xl bg-white/5 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-colors focus:bg-white/10 sm:text-base"
                aria-describedby="url-error"
                autoComplete="url"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:brightness-110 disabled:opacity-40 disabled:shadow-none sm:px-8 sm:text-base"
            >
              Visualize
            </button>
          </div>

          {/* Error messages */}
          {(validationError || error) && (
            <p
              id="url-error"
              role="alert"
              className="mt-2 px-2 text-sm text-red-400"
            >
              {validationError || error}
            </p>
          )}
        </form>

        {/* Divider */}
        <div className="flex w-full max-w-xl items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs font-medium text-white/30">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Upload drop zone */}
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
          }}
          aria-label="Upload a screenshot"
          className={`glass w-full max-w-xl cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
            isDraggingOver
              ? "border-cyan-400/60 bg-cyan-500/5"
              : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
            aria-hidden="true"
          />
          <div className="flex flex-col items-center gap-3">
            {isDraggingOver ? (
              <ArrowUpTrayIcon className="h-8 w-8 text-cyan-400 animate-bounce" />
            ) : (
              <PhotoIcon className="h-8 w-8 text-white/30" />
            )}
            <div>
              <p className="text-sm font-medium text-white/60">
                {isDraggingOver ? "Drop your image here" : "Upload your own screenshot"}
              </p>
              <p className="mt-1 text-xs text-white/30">
                Drag & drop or click to browse. Image stays in your browser only.
              </p>
            </div>
          </div>
        </div>

        {/* Feature hints */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {[
            "Protanopia",
            "Deuteranopia",
            "Tritanopia",
            "Achromatopsia",
            "Blurred Vision",
            "Astigmatism",
            "Tunnel Vision",
            "Scotoma",
            "Night Blindness",
            "Photophobia",
          ].map((label) => (
            <span
              key={label}
              className="rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 text-xs text-white/30"
            >
              {label}
            </span>
          ))}
          <span className="rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 text-xs text-white/30">
            +10 more
          </span>
        </div>

        {/* Creator / Footer */}
        <footer className="mt-10 flex flex-col items-center gap-3">
          <p className="text-xs text-white/30">
            Built with empathy. Screenshots captured server-side to bypass CORS.
          </p>
          <div className="flex items-center gap-2 text-white/40 transition-colors hover:text-white/70">
            <a
              href="https://github.com/novandi18/accessibility-mirror"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs"
              aria-label="View source on GitHub"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Created by Novandi Ramadhan
            </a>
          </div>
        </footer>
      </div>

      {/* Loading overlay */}
      {isLoading && <LoadingOverlay />}
    </main>
  );
}
