import { type ComponentType, type SVGProps } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassCircleIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon,
  ViewfinderCircleIcon,
  StopCircleIcon,
  ArrowsRightLeftIcon,
  PaintBrushIcon,
  LightBulbIcon,
  BoltSlashIcon,
  SignalIcon,
  SignalSlashIcon,
  AdjustmentsHorizontalIcon,
  SwatchIcon,
  Square2StackIcon,
  ExclamationCircleIcon,
  MinusCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import type { SimulationFilter } from "@/store/useAppStore";

export type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface FilterItem {
  id: SimulationFilter;
  label: string;
  icon: HeroIcon;
  description: string;
  /** Longer educational explanation for the info panel */
  explanation: string;
  /** Who is affected */
  prevalence: string;
  /** Practical web design tips */
  designTip: string;
}

export interface FilterCategory {
  name: string;
  icon: HeroIcon;
  /** Short category description for the info panel */
  summary: string;
  filters: FilterItem[];
}

export const filterCategories: FilterCategory[] = [
  {
    name: "Normal",
    icon: EyeIcon,
    summary: "The original view with no simulation applied.",
    filters: [
      {
        id: "normal",
        label: "Normal",
        icon: EyeIcon,
        description: "Original view — no simulation applied",
        explanation:
          "This is the baseline view showing the webpage exactly as captured. Use it to compare with other simulations and understand the difference each condition makes.",
        prevalence: "Standard vision — the majority of the population.",
        designTip:
          "Always design for maximum clarity first, then verify your design holds up under each simulation.",
      },
    ],
  },
  {
    name: "Color Blindness",
    icon: SwatchIcon,
    summary:
      "Color Vision Deficiency (CVD) affects approximately 8% of males and 0.5% of females worldwide. These simulations show how the loss or weakness of specific cone photoreceptors in the retina changes color perception.",
    filters: [
      {
        id: "protanopia",
        label: "Protanopia",
        icon: EyeSlashIcon,
        description: "Red-blind (~1% of males)",
        explanation:
          "Protanopia is the complete absence of red cone photoreceptors. People with this condition cannot perceive red light at all — reds appear as dark brownish-yellow, and red-green distinctions are impossible. Traffic lights, error states, and warning indicators that rely solely on red are invisible to them.",
        prevalence: "Affects approximately 1% of males. Very rare in females.",
        designTip:
          "Never use red alone to convey meaning. Pair red indicators with icons, text labels, or patterns. Use colorblind-safe palettes (blue/orange instead of red/green).",
      },
      {
        id: "protanomaly",
        label: "Protanomaly",
        icon: MinusCircleIcon,
        description: "Red-weak (~1% of males)",
        explanation:
          "Protanomaly is a reduced sensitivity to red light rather than a complete absence. Red hues appear weaker and shifted toward green. It is a milder form of protan deficiency, but can still cause significant confusion between reds, oranges, and greens.",
        prevalence: "Affects approximately 1% of males.",
        designTip:
          "Ensure sufficient contrast between red and green elements. Use high-contrast text labels alongside color-coded UI elements.",
      },
      {
        id: "deuteranopia",
        label: "Deuteranopia",
        icon: NoSymbolIcon,
        description: "Green-blind (~5% of males)",
        explanation:
          "Deuteranopia is the complete absence of green cone photoreceptors. It makes greens and reds look very similar — typically appearing as muddy yellows and browns. Since green is heavily used in UI for 'success' and 'go' states, this affects many web interactions.",
        prevalence:
          "Affects approximately 1% of males directly, but deutan deficiency overall (including deuteranomaly) is the most common CVD at ~5% of males.",
        designTip:
          "Avoid red/green as the only differentiator. Use shape, position, and text alongside color. Test status indicators, charts, and forms under this simulation.",
      },
      {
        id: "deuteranomaly",
        label: "Deuteranomaly",
        icon: ExclamationCircleIcon,
        description: "Green-weak (~5% of males, most common CVD)",
        explanation:
          "Deuteranomaly is the most common form of color vision deficiency worldwide. Green cones are present but have shifted sensitivity, making greens appear more red/brown. People with deuteranomaly often do not realize they see colors differently until tested.",
        prevalence:
          "Affects approximately 5% of males and 0.35% of females — the single most common CVD.",
        designTip:
          "This is your highest-priority CVD to design for. If your UI works under deuteranomaly, it likely works for most colorblind users. Always provide non-color cues for important information.",
      },
      {
        id: "tritanopia",
        label: "Tritanopia",
        icon: StopCircleIcon,
        description: "Blue-blind (very rare)",
        explanation:
          "Tritanopia is the absence of blue (short-wavelength) cone photoreceptors. Blues appear greenish and yellows appear as light pinks or grays. Unlike protan/deutan deficiencies, tritanopia is not sex-linked and affects males and females equally.",
        prevalence:
          "Extremely rare — affects fewer than 1 in 10,000 people equally across sexes.",
        designTip:
          "Avoid relying on blue vs. yellow distinctions. This is rare but important for data visualizations that use blue-yellow color scales.",
      },
      {
        id: "tritanomaly",
        label: "Tritanomaly",
        icon: AdjustmentsHorizontalIcon,
        description: "Blue-weak (rare)",
        explanation:
          "Tritanomaly is a reduced sensitivity to blue light. Blues appear somewhat faded or shifted toward green, and yellows can look pinkish. It is a milder form of tritan deficiency.",
        prevalence: "Very rare — slightly more common than tritanopia.",
        designTip:
          "If you already design for tritanopia, tritanomaly users are covered. Focus on providing sufficient luminance contrast between blue and adjacent colors.",
      },
      {
        id: "achromatopsia",
        label: "Achromat.",
        icon: Square2StackIcon,
        description: "Total color blindness — sees only grayscale",
        explanation:
          "Achromatopsia is the complete inability to perceive any color. Vision is entirely in shades of gray. It is caused by non-functioning or absent cone cells, leaving only rod cells active. People with achromatopsia also typically experience extreme light sensitivity (photophobia) and reduced visual acuity.",
        prevalence:
          "Affects approximately 1 in 30,000 people. Higher prevalence on certain Pacific islands (up to 10% in Pingelap).",
        designTip:
          "Ensure your UI is fully usable in grayscale. Check that all interactive elements, links, and states have sufficient luminance contrast — not just hue differences.",
      },
      {
        id: "achromatomaly",
        label: "Achromatomaly",
        icon: PaintBrushIcon,
        description: "Partial color blindness — severely muted colors",
        explanation:
          "Achromatomaly is a partial loss of color vision where all colors appear severely muted and desaturated. Unlike full achromatopsia, some faint color perception remains, but it is extremely weak. The world appears washed out.",
        prevalence: "Very rare — exact prevalence is not well documented.",
        designTip:
          "Use bold, high-saturation colors with strong luminance contrast. Avoid pastel or low-saturation color schemes for important UI elements.",
      },
    ],
  },
  {
    name: "Clarity & Refractive",
    icon: MagnifyingGlassCircleIcon,
    summary:
      "These conditions affect how sharply the eye can focus light onto the retina. They result in blurred, distorted, or obstructed vision that makes reading text and recognizing UI elements difficult.",
    filters: [
      {
        id: "blur",
        label: "Blurred",
        icon: MagnifyingGlassCircleIcon,
        description: "Cataracts / Low acuity",
        explanation:
          "Simulates general visual blur caused by conditions like cataracts, uncorrected refractive errors, or age-related vision decline. Text becomes hard to read and small UI elements merge together. This is one of the most common visual impairments globally.",
        prevalence:
          "Cataracts affect over 50% of people aged 80+. Uncorrected refractive errors are the leading cause of visual impairment worldwide.",
        designTip:
          "Use large, legible fonts (minimum 16px body text). Maintain generous spacing between interactive elements. Ensure high contrast between text and background (WCAG AA minimum 4.5:1 ratio).",
      },
      {
        id: "astigmatism",
        label: "Astigmatism",
        icon: ArrowsRightLeftIcon,
        description: "Directional blur with ghosting",
        explanation:
          "Astigmatism causes light to focus unevenly on the retina, resulting in blur that is worse in one direction — typically horizontal. Text appears to have a ghost or shadow, and thin lines can seem doubled. It often co-occurs with nearsightedness or farsightedness.",
        prevalence:
          "Very common — affects approximately 30-60% of adults to some degree.",
        designTip:
          "Avoid ultra-thin font weights (100-200). Use clear, well-spaced typography. High contrast backgrounds help text remain legible despite directional blur.",
      },
      {
        id: "floaters",
        label: "Floaters",
        icon: SparklesIcon,
        description: "Dark spots drifting across vision",
        explanation:
          "Eye floaters are small clumps of cells or protein in the vitreous humor that cast shadows on the retina. They appear as spots, threads, or cobweb-like shapes that drift across the visual field. While usually harmless, they can obscure portions of the screen.",
        prevalence:
          "Extremely common — most adults experience some floaters, especially after age 50. Prevalence increases significantly with age and myopia.",
        designTip:
          "Avoid placing critical information in very small or isolated areas. Use generous hit targets and clearly labeled interactive elements so obscured areas do not block functionality.",
      },
    ],
  },
  {
    name: "Field of Vision",
    icon: ViewfinderCircleIcon,
    summary:
      "Field of vision loss means portions of what the eye can normally see are missing, darkened, or severely degraded. These conditions make it difficult or impossible to see content outside a restricted area.",
    filters: [
      {
        id: "tunnel-vision",
        label: "Tunnel",
        icon: ViewfinderCircleIcon,
        description: "Retinitis Pigmentosa — peripheral vision lost",
        explanation:
          "Tunnel vision is the loss of peripheral (side) vision, leaving only a small central area visible — like looking through a narrow tube. It is most commonly caused by Retinitis Pigmentosa, a group of genetic disorders that gradually destroy the rod photoreceptors in the outer retina.",
        prevalence:
          "Retinitis Pigmentosa affects approximately 1 in 4,000 people worldwide.",
        designTip:
          "Keep all critical navigation and interactive elements near the center of the viewport. Avoid requiring users to scan far across the screen. Use a compact, centered layout.",
      },
      {
        id: "peripheral-loss",
        label: "Peripheral",
        icon: SignalSlashIcon,
        description: "Faded peripheral vision, sharp center",
        explanation:
          "This simulates a moderate loss of peripheral vision where edges of the visual field become increasingly blurry and faded while the center remains relatively sharp. It can be caused by glaucoma, optic nerve damage, or certain neurological conditions.",
        prevalence:
          "Glaucoma, the most common cause, affects over 80 million people worldwide and is a leading cause of irreversible blindness.",
        designTip:
          "Do not rely on elements positioned at the extreme edges of the viewport for critical actions. Consider sticky navigation and centered content regions. Ensure important notifications appear near the user's focal point.",
      },
      {
        id: "hemianopia",
        label: "Hemianopia",
        icon: SignalIcon,
        description: "Loss of half visual field",
        explanation:
          "Hemianopia (or hemianopsia) is the loss of vision in one half of the visual field, typically caused by stroke, traumatic brain injury, or tumors affecting the visual cortex. The affected person literally cannot see anything on one side — content placed there is completely invisible to them.",
        prevalence:
          "Occurs in approximately 20-30% of stroke survivors. Stroke is a leading cause of disability worldwide.",
        designTip:
          "Center the most important content. Avoid placing critical CTAs, navigation, or warnings at the far left or right edges. Ensure the layout is functional even when only half the screen is visible.",
      },
      {
        id: "scotoma",
        label: "Scotoma",
        icon: StopCircleIcon,
        description: "Macular degeneration — central dark spot",
        explanation:
          "A central scotoma is a blind or dark spot in the center of the visual field, most commonly caused by age-related macular degeneration (AMD). Ironically, it destroys the area where vision is normally sharpest — making reading, recognizing faces, and using screens extremely difficult while peripheral vision remains intact.",
        prevalence:
          "AMD affects approximately 196 million people worldwide. It is the leading cause of vision loss in people over 50 in developed countries.",
        designTip:
          "Use large, clear typography. Do not place the only instance of critical information (like a single CTA button) in a tiny, centered area. Provide multiple ways to discover and interact with key features.",
      },
    ],
  },
  {
    name: "Light & Contrast",
    icon: SunIcon,
    summary:
      "These conditions affect how the eye processes light levels and differences in brightness. They can make screens appear washed out, overly dim, or painfully bright.",
    filters: [
      {
        id: "contrast-loss",
        label: "Glare",
        icon: SunIcon,
        description: "Washed-out screen / Glare",
        explanation:
          "Simulates the effect of screen glare or cataracts where bright ambient light washes out the display. Colors appear faded and low-contrast elements become invisible. This is a common real-world scenario — using a phone outdoors or under harsh office lighting.",
        prevalence:
          "Affects virtually everyone at some point — any user in bright ambient light. Age-related lens yellowing intensifies the effect.",
        designTip:
          "Maintain high contrast ratios (WCAG AAA 7:1 recommended). Avoid light gray text on white backgrounds. Test your UI in bright lighting conditions.",
      },
      {
        id: "low-contrast",
        label: "Low Contrast",
        icon: BoltSlashIcon,
        description: "Faded, muted colors with poor contrast",
        explanation:
          "Simulates reduced contrast sensitivity, where differences between light and dark become harder to perceive. Subtle UI elements like borders, dividers, placeholder text, and disabled states may become completely invisible.",
        prevalence:
          "Contrast sensitivity declines naturally with age and affects the majority of people over 60. Also associated with diabetes, multiple sclerosis, and cataracts.",
        designTip:
          "Do not rely on subtle contrast differences for important UI elements. Disabled states should still be perceivable. Use borders and shadows alongside color differences to define interactive areas.",
      },
      {
        id: "night-blindness",
        label: "Night Blind",
        icon: MoonIcon,
        description: "Nyctalopia — very dim, scotopic tint",
        explanation:
          "Nyctalopia (night blindness) is the inability to see well in low-light conditions. The rod photoreceptors, which handle dim-light vision, function poorly. The world appears extremely dark with a slight blue tint (scotopic shift). Dark-themed interfaces may become almost entirely invisible.",
        prevalence:
          "Can be caused by vitamin A deficiency (common in developing countries), retinitis pigmentosa, or cataracts. Vitamin A deficiency alone affects 250 million preschool children worldwide.",
        designTip:
          "In dark mode, ensure text and interactive elements have sufficient brightness — not just contrast ratio. Consider offering a high-contrast dark theme with brighter accent colors.",
      },
      {
        id: "photophobia",
        label: "Photophobia",
        icon: LightBulbIcon,
        description: "Extreme light sensitivity — overblown highlights",
        explanation:
          "Photophobia is extreme sensitivity to light where bright areas of the screen cause physical discomfort or pain. White backgrounds and bright colors appear to bloom and bleed into surrounding areas, making it impossible to focus. It is a common symptom of migraines, concussions, and achromatopsia.",
        prevalence:
          "Chronic photophobia affects an estimated 15-20% of the population to some degree. Up to 80% of migraine sufferers experience it during episodes.",
        designTip:
          "Always offer a dark mode. Avoid large areas of pure white (#ffffff) — use slightly toned backgrounds instead. Reduce maximum brightness of images and videos when possible. Respect the user's OS-level dark mode preference.",
      },
    ],
  },
];

/** Flat lookup for filter label by id */
export const filterLabelMap: Record<SimulationFilter, string> =
  Object.fromEntries(
    filterCategories.flatMap((c) => c.filters.map((f) => [f.id, f.label]))
  ) as Record<SimulationFilter, string>;

/** Flat lookup for full filter data by id */
export const filterDataMap: Record<SimulationFilter, FilterItem> =
  Object.fromEntries(
    filterCategories.flatMap((c) => c.filters.map((f) => [f.id, f]))
  ) as Record<SimulationFilter, FilterItem>;

/** Find which category a filter belongs to */
export function getCategoryForFilter(
  filterId: SimulationFilter
): FilterCategory | undefined {
  return filterCategories.find((c) => c.filters.some((f) => f.id === filterId));
}
