# Accessibility Mirror

See the web through different eyes.

Accessibility Mirror is a web application that allows developers, designers, and product owners to instantly visualize how their website is perceived by users with various visual impairments. It builds empathy through direct, scientifically accurate simulation.

---

## How It Works

There are two ways to use the app:

### Option 1 -- URL Screenshot

1. Enter any public URL into the input field.
2. The app captures a full-page screenshot using a serverless backend (Puppeteer Core), bypassing all CORS restrictions.
3. Scientifically accurate SVG filters are applied over the screenshot in real time.

### Option 2 -- Upload Your Own Screenshot

1. Drag and drop an image (or click to browse) into the upload zone on the landing page.
2. The image is loaded entirely in your browser using a temporary object URL. Nothing is uploaded to any server or cloud storage.
3. The same filter simulations are applied instantly.

No iframes. No browser extensions. No data leaves your machine when using the upload option.

---

## Features

- **20 vision simulations** across 5 categories (color blindness, clarity, field of vision, light sensitivity, and normal vision)
- **Persistent filter dock** with categorized tabs that stays visible while switching between filters
- **Educational info panel** -- a slide-in panel that explains each condition, its real-world prevalence, and practical design recommendations
- **Client-side image upload** -- ephemeral, single-use image loading with no cloud storage (blob URL is revoked on navigation)
- **Serverless screenshot capture** -- Puppeteer Core with ad/tracker blocking for clean captures
- **Dark glassmorphism UI** with smooth animations and backdrop blur
- **Fully keyboard-accessible** controls and ARIA labels throughout

---

## Supported Simulations

### Color Blindness (Full Spectrum)

| Filter         | Condition                          | Prevalence           |
| -------------- | ---------------------------------- | -------------------- |
| Protanopia     | Red-blind                          | ~1% of males         |
| Protanomaly    | Red-weak                           | ~1% of males         |
| Deuteranopia   | Green-blind                        | ~5% of males         |
| Deuteranomaly  | Green-weak (most common CVD)       | ~5% of males         |
| Tritanopia     | Blue-blind                         | Very rare            |
| Tritanomaly    | Blue-weak                          | Rare                 |
| Achromatopsia  | Total color blindness (grayscale)  | ~1 in 30,000         |
| Achromatomaly  | Partial color blindness            | Very rare            |

### Clarity and Refractive Errors

| Filter      | Condition                                |
| ----------- | ---------------------------------------- |
| Blurred     | Cataracts / Low visual acuity            |
| Astigmatism | Directional blur with ghosting           |
| Floaters    | Dark spots drifting across the field     |

### Field of Vision Loss

| Filter          | Condition                                    |
| --------------- | -------------------------------------------- |
| Tunnel Vision   | Retinitis Pigmentosa (peripheral loss)       |
| Peripheral Loss | Faded edges, sharp center                    |
| Hemianopia      | Loss of half the visual field                |
| Scotoma         | Macular degeneration (central dark spot)     |

### Light and Contrast Sensitivity

| Filter          | Condition                                    |
| --------------- | -------------------------------------------- |
| Glare           | Washed-out screen / contrast loss            |
| Low Contrast    | Faded, muted colors with poor contrast       |
| Night Blindness | Nyctalopia (very dim scotopic tint)          |
| Photophobia     | Extreme light sensitivity, overblown highlights |

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (dark mode, glassmorphism aesthetic)
- **Icons:** Heroicons v2
- **State Management:** Zustand v5
- **Screenshot Engine:** Puppeteer Core v24 with @sparticuz/chromium (serverless-optimized)
- **CI:** GitHub Actions (lint, typecheck, build)

---

## Getting Started

### Prerequisites

- Node.js 20 or later
- Google Chrome or Chromium installed locally (for the screenshot API)

### Installation

```bash
git clone https://github.com/novandi18/accessibility-mirror.git
cd accessibility-mirror
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

The screenshot API will automatically detect your local Chrome installation. If Chrome is in a non-standard location, set the `CHROME_EXECUTABLE_PATH` environment variable:

```bash
CHROME_EXECUTABLE_PATH=/path/to/chrome npm run dev
```

### Production Build

```bash
npm run build
npm start
```

---

## Deployment

This project is optimized for deployment on Vercel. The screenshot API route uses `@sparticuz/chromium` which bundles a headless Chromium binary compatible with AWS Lambda (used by Vercel serverless functions).

Simply connect the repository to Vercel and deploy. No additional configuration is required.

The upload feature requires no server infrastructure at all -- it runs entirely in the browser.

---

## Privacy

- **URL mode:** The target URL is sent to the app's own serverless API to capture a screenshot. No data is stored or logged beyond the request lifecycle.
- **Upload mode:** The image never leaves the browser. It is loaded as a temporary blob URL (`URL.createObjectURL`) and revoked when the user navigates back. No server request is made, no file is persisted anywhere.

---

## Scientific Accuracy

The color vision deficiency simulations use peer-reviewed color transformation matrices:

- **Protan/Deutan deficiencies:** Machado, Oliveira and Fernandes (2009) -- "A Physiologically-based Model for Simulation of Color Vision Deficiency"
- **Tritan deficiency:** Brettel, Vienot and Mollon (1997) -- "Computerized simulation of color appearance for dichromats"
- **Achromatopsia:** ITU-R BT.601 luma coefficients with contrast adjustment for rod-only vision simulation
- **Field of vision loss:** Radial and linear gradient masks applied via SVG composite filters

---

## Project Structure

```
src/
  app/
    api/screenshot/route.ts    Serverless Puppeteer screenshot API
    globals.css                Global styles, filter CSS classes, animations
    layout.tsx                 Root layout with SVG filter definitions
    page.tsx                   Landing page (URL input + upload) and dashboard
  components/
    ControlDock.tsx            Persistent categorized filter dock with expand/collapse
    FilterInfoPanel.tsx        Slide-in educational panel per filter condition
    LoadingOverlay.tsx         Screenshot capture loading animation
    SvgFilters.tsx             All SVG filter definitions (16 filters)
  lib/
    filterData.ts              Shared filter metadata, categories, and educational content
    validators.ts              URL validation utility
  store/
    useAppStore.ts             Zustand state store (URL, screenshot, filter, loading)
.github/
  workflows/
    ci.yml                     GitHub Actions CI (lint, typecheck, build)
```

---

## License

MIT

---

Created by [Novandi Ramadhan](https://github.com/novandi18)
