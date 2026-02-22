import { create } from "zustand";

export type SimulationFilter =
  // Normal
  | "normal"
  // Color Blindness – Full Spectrum
  | "protanopia"
  | "protanomaly"
  | "deuteranopia"
  | "deuteranomaly"
  | "tritanopia"
  | "tritanomaly"
  | "achromatopsia"
  | "achromatomaly"
  // Clarity & Refractive Errors
  | "blur"
  | "astigmatism"
  | "floaters"
  // Field of Vision Loss
  | "tunnel-vision"
  | "peripheral-loss"
  | "hemianopia"
  | "scotoma"
  // Light & Contrast Sensitivity
  | "contrast-loss"
  | "low-contrast"
  | "night-blindness"
  | "photophobia";

interface AppState {
  /** The URL entered by the user */
  url: string;
  setUrl: (url: string) => void;

  /** Base64-encoded screenshot data URL */
  screenshotUrl: string | null;
  setScreenshotUrl: (url: string | null) => void;

  /** Current active simulation filter */
  activeFilter: SimulationFilter;
  setActiveFilter: (filter: SimulationFilter) => void;

  /** Loading state while capturing screenshot */
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  /** Error message */
  error: string | null;
  setError: (error: string | null) => void;

  /** Reset to initial state */
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  url: "",
  setUrl: (url) => set({ url }),

  screenshotUrl: null,
  setScreenshotUrl: (screenshotUrl) => set({ screenshotUrl }),

  activeFilter: "normal",
  setActiveFilter: (activeFilter) => set({ activeFilter }),

  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),

  error: null,
  setError: (error) => set({ error }),

  reset: () =>
    set({
      url: "",
      screenshotUrl: null,
      activeFilter: "normal",
      isLoading: false,
      error: null,
    }),
}));
