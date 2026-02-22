/**
 * Scientifically Accurate SVG Filter Definitions for Vision Deficiency Simulation
 *
 * Color matrices sourced from:
 * - Machado, Oliveira & Fernandes (2009) for Protan/Deutan/Tritan deficiencies
 * - ITU-R BT.601 luma coefficients for Achromatopsia
 * - Brettel, Viénot & Mollon (1997) for Tritanopia
 *
 * These filters are defined once globally and referenced via CSS `filter: url(#id)`.
 */
export default function SvgFilters() {
  return (
    <svg
      aria-hidden="true"
      className="absolute h-0 w-0 overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* ============================================================
            COLOR BLINDNESS — FULL SPECTRUM
            ============================================================ */}

        {/* ===== Protanopia (Red-Blind, severity 1.0) ===== */}
        <filter id="protanopia">
          <feColorMatrix
            type="matrix"
            values="
              0.152286  1.052583 -0.204868  0  0
              0.114503  0.786281  0.099216  0  0
             -0.003882 -0.048116  1.051998  0  0
              0         0         0         1  0
            "
          />
        </filter>

        {/* ===== Protanomaly (Red-Weak, severity ~0.6) ===== */}
        <filter id="protanomaly">
          <feColorMatrix
            type="matrix"
            values="
              0.458064  0.679578 -0.137642  0  0
              0.092785  0.846313  0.060902  0  0
             -0.007494 -0.016807  1.024301  0  0
              0         0         0         1  0
            "
          />
        </filter>

        {/* ===== Deuteranopia (Green-Blind, severity 1.0) ===== */}
        <filter id="deuteranopia">
          <feColorMatrix
            type="matrix"
            values="
              0.367322  0.860646 -0.227968  0  0
              0.280085  0.672501  0.047413  0  0
             -0.011820  0.042940  0.968881  0  0
              0         0         0         1  0
            "
          />
        </filter>

        {/* ===== Deuteranomaly (Green-Weak, severity ~0.6) ===== */}
        <filter id="deuteranomaly">
          <feColorMatrix
            type="matrix"
            values="
              0.547494  0.607765 -0.155259  0  0
              0.181692  0.781742  0.036566  0  0
             -0.010410  0.027275  0.983136  0  0
              0         0         0         1  0
            "
          />
        </filter>

        {/* ===== Tritanopia (Blue-Blind, severity 1.0) ===== */}
        {/* Brettel, Viénot & Mollon 1997 */}
        <filter id="tritanopia">
          <feColorMatrix
            type="matrix"
            values="
              1.255528 -0.076749 -0.178779  0  0
             -0.078411  0.930809  0.147602  0  0
              0.004733  0.691367  0.303900  0  0
              0         0         0         1  0
            "
          />
        </filter>

        {/* ===== Tritanomaly (Blue-Weak, severity ~0.6) ===== */}
        <filter id="tritanomaly">
          <feColorMatrix
            type="matrix"
            values="
              1.017277  0.027029 -0.044306  0  0
             -0.006113  0.958479  0.047634  0  0
              0.006379  0.248708  0.744913  0  0
              0         0         0         1  0
            "
          />
        </filter>

        {/* ===== Achromatopsia (Total Color Blindness) ===== */}
        {/* ITU-R BT.601 luma with contrast boost for rod-only vision */}
        <filter id="achromatopsia">
          <feColorMatrix
            type="matrix"
            values="
              0.2126  0.7152  0.0722  0  0
              0.2126  0.7152  0.0722  0  0
              0.2126  0.7152  0.0722  0  0
              0       0       0       1  0
            "
          />
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.1" intercept="-0.05" />
            <feFuncG type="linear" slope="1.1" intercept="-0.05" />
            <feFuncB type="linear" slope="1.1" intercept="-0.05" />
          </feComponentTransfer>
        </filter>

        {/* ===== Achromatomaly (Partial Color Blindness) ===== */}
        <filter id="achromatomaly">
          <feColorMatrix
            type="matrix"
            values="
              0.618  0.320  0.062  0  0
              0.163  0.775  0.062  0  0
              0.163  0.320  0.516  0  0
              0      0      0      1  0
            "
          />
        </filter>

        {/* ============================================================
            CLARITY & REFRACTIVE ERRORS
            ============================================================ */}

        {/* ===== Blurred Vision (Cataracts / Low Acuity) ===== */}
        <filter id="blur-vision">
          <feGaussianBlur stdDeviation="3" />
        </filter>

        {/* ===== Astigmatism (Directional blur + ghosting) ===== */}
        <filter id="astigmatism">
          {/* Primary horizontal stretch blur */}
          <feGaussianBlur in="SourceGraphic" stdDeviation="4 1" result="hblur" />
          {/* Ghost offset layer */}
          <feOffset in="SourceGraphic" dx="2" dy="1" result="ghost" />
          <feGaussianBlur in="ghost" stdDeviation="2 0.5" result="ghostBlur" />
          {/* Composite ghost over blurred */}
          <feBlend in="hblur" in2="ghostBlur" mode="normal" result="merged" />
        </filter>

        {/* ===== Floaters (Dark spots drifting in vision) ===== */}
        <filter id="floaters">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="3"
            seed="5"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.5 1.3"
            result="spots"
          />
          <feGaussianBlur in="spots" stdDeviation="3" result="softSpots" />
          <feComposite in="SourceGraphic" in2="softSpots" operator="arithmetic" k1="0" k2="1" k3="-0.15" k4="0" />
        </filter>

        {/* ============================================================
            FIELD OF VISION LOSS
            ============================================================ */}

        {/* ===== Tunnel Vision (Retinitis Pigmentosa) ===== */}
        <filter id="tunnel-vision" x="-10%" y="-10%" width="120%" height="120%">
          <feFlood floodColor="black" floodOpacity="1" result="black" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="0" result="center" />
          {/* Radial gradient mask via turbulence trick replaced by manual */}
          <feImage
            href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3CradialGradient id='g'%3E%3Cstop offset='25%25' stop-color='white'/%3E%3Cstop offset='50%25' stop-color='white' stop-opacity='0.6'/%3E%3Cstop offset='70%25' stop-color='white' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E"
            preserveAspectRatio="none"
            result="mask"
          />
          <feComposite in="SourceGraphic" in2="mask" operator="in" result="visible" />
          <feComposite in="visible" in2="black" operator="over" />
        </filter>

        {/* ===== Peripheral Vision Loss (Central vision only, faded edges) ===== */}
        <filter id="peripheral-loss" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blurred" />
          <feImage
            href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3CradialGradient id='g'%3E%3Cstop offset='30%25' stop-color='white'/%3E%3Cstop offset='90%25' stop-color='black'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E"
            preserveAspectRatio="none"
            result="mask"
          />
          <feComposite in="SourceGraphic" in2="mask" operator="in" result="sharp" />
          <feComposite in="blurred" in2="mask" operator="out" result="edges" />
          <feComposite in="sharp" in2="edges" operator="over" />
        </filter>

        {/* ===== Hemianopia (Loss of half visual field — left side dark) ===== */}
        <filter id="hemianopia" x="0" y="0" width="100%" height="100%">
          <feFlood floodColor="black" floodOpacity="1" result="black" />
          <feImage
            href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0%25' stop-color='black'/%3E%3Cstop offset='40%25' stop-color='black'/%3E%3Cstop offset='55%25' stop-color='white'/%3E%3Cstop offset='100%25' stop-color='white'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E"
            preserveAspectRatio="none"
            result="mask"
          />
          <feComposite in="SourceGraphic" in2="mask" operator="in" result="visible" />
          <feComposite in="visible" in2="black" operator="over" />
        </filter>

        {/* ===== Central Scotoma (Macular Degeneration — dark spot in center) ===== */}
        <filter id="scotoma" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="slight" />
          <feImage
            href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3CradialGradient id='g'%3E%3Cstop offset='0%25' stop-color='black'/%3E%3Cstop offset='15%25' stop-color='black'/%3E%3Cstop offset='30%25' stop-color='white'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E"
            preserveAspectRatio="none"
            result="mask"
          />
          <feComposite in="slight" in2="mask" operator="in" result="outer" />
          <feFlood floodColor="#1a1a1a" floodOpacity="0.9" result="dark" />
          <feComposite in="dark" in2="mask" operator="out" result="hole" />
          <feComposite in="outer" in2="hole" operator="over" />
        </filter>

        {/* ============================================================
            LIGHT & CONTRAST SENSITIVITY
            ============================================================ */}

        {/* ===== Contrast Loss / Glare (Washed-out screen) ===== */}
        <filter id="contrast-loss">
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.6" intercept="0.25" />
            <feFuncG type="linear" slope="0.6" intercept="0.25" />
            <feFuncB type="linear" slope="0.6" intercept="0.25" />
          </feComponentTransfer>
        </filter>

        {/* ===== Low Contrast (Faded, muted colors) ===== */}
        <filter id="low-contrast">
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.4" intercept="0.3" />
            <feFuncG type="linear" slope="0.4" intercept="0.3" />
            <feFuncB type="linear" slope="0.4" intercept="0.3" />
          </feComponentTransfer>
        </filter>

        {/* ===== Night Blindness (Nyctalopia — very dark, only bright areas visible) ===== */}
        <filter id="night-blindness">
          {/* Dramatically reduce brightness */}
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.25" intercept="-0.02" />
            <feFuncG type="linear" slope="0.28" intercept="-0.02" />
            <feFuncB type="linear" slope="0.35" intercept="-0.02" />
          </feComponentTransfer>
          {/* Slight blue tint for scotopic vision simulation */}
          <feColorMatrix
            type="matrix"
            values="
              0.8  0    0    0  0
              0    0.9  0    0  0
              0    0    1.1  0  0.02
              0    0    0    1  0
            "
          />
        </filter>

        {/* ===== Photophobia (Extreme light sensitivity — blown-out highlights) ===== */}
        <filter id="photophobia">
          {/* Overexpose and bloom */}
          <feComponentTransfer result="bright">
            <feFuncR type="linear" slope="1.8" intercept="0.1" />
            <feFuncG type="linear" slope="1.8" intercept="0.1" />
            <feFuncB type="linear" slope="1.8" intercept="0.12" />
          </feComponentTransfer>
          <feGaussianBlur in="bright" stdDeviation="2" result="bloom" />
          <feBlend in="bright" in2="bloom" mode="screen" />
        </filter>
      </defs>
    </svg>
  );
}
