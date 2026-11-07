# Apple Liquid Glass Studio (WWDC25 HIG)

<p align="center">
  <a href="README.md">简体中文</a> •
  <a href="README_EN.md"><strong>English</strong></a> •
  <a href="README_JA.md">日本語</a>
</p>

<p align="center">
  <img src="assets/screenshots/studio-overview.png" alt="Apple Liquid Glass Studio" width="100%" style="border-radius: 14px; box-shadow: 0 16px 40px rgba(0,0,0,0.5);">
</p>

<p align="center">
  <strong>Production-ready Apple Liquid Glass (WWDC25 HIG) design system & optics engine. 4-layer zero-shift physical shadows, real-time SVG normal refraction, and interactive code generation for Native CSS, Tailwind CSS, React JSX, and Vue 3.</strong>
</p>

<p align="center">
  <a href="https://github.com/pandaJS404"><img src="https://img.shields.io/badge/Author-pandaJS404-2997ff.svg" alt="Author"></a>
  <img src="https://img.shields.io/badge/WWDC25-HIG%20Compliant-ff375f.svg" alt="WWDC25 HIG">
  <img src="https://img.shields.io/badge/Dependencies-0%20(Pure%20Vanilla)-success.svg" alt="Zero Dependencies">
  <img src="https://img.shields.io/badge/Layout%20Shift-Zero-30d158.svg" alt="Zero Layout Shift">
  <img src="https://img.shields.io/badge/Accessibility-WCAG%202.2%20AA-00f0ff.svg" alt="WCAG 2.2 AA">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
</p>

---

## 🌟 Key Highlights

- 🪞 **Real Optical Surface-Normal Refraction**: Generates dynamic Signed Distance Field (SDF) normal displacement textures on the fly. In Chromium browsers, background elements are warped with wavelength dispersion via SVG `<feDisplacementMap>`; gracefully falls back to 4-layer sub-surface scattering on Safari and Firefox.
- 📐 **Zero Layout Shift (4-Layer Inset Scatter Box-Shadows)**: Completely eliminates jittery `border` properties. Instead, four layers of physical inset scatter shadows replicate bevel specular glints, deep volumetric blooms, and ambient occlusion with exactly zero reflows.
- 🎨 **6 Calibrated Physical Material Presets**: Out-of-the-box presets for **Clear**, **Prismatic**, **Satin**, **Tinted**, **Obsidian**, and **Gel**.
- 🧩 **Complete Suite of 7 Apple HIG Carriers**:
  1. **Master Glass Card** (System Core Card)
  2. **macOS Fisheye Magnification Dock** (Smooth hover popover shelf)
  3. **Dynamic Island** (Live Activity Capsule)
  4. **Spotlight Search Hub** (Unified command palette)
  5. **Segmented Controls** (Tactile switch tabs)
  6. **Multi-state Liquid Button Suite** (Elastic interactive actions)
  7. **Apple Music Now Playing Widget** (Live waveform audio widget)
- ⚡ **Multi-Framework Code Generation**: Live parameter tuning exports directly to **Native CSS**, **Tailwind CSS**, **React JSX**, **Vue 3**, and **Design Tokens (JSON)** with one-click copy.
- 🌐 **100% Offline & Zero Dependencies**: Built strictly on vanilla HTML5, CSS3, and ES Modules. No bundlers or external CDNs required.
- ♿ **WCAG 2.2 AA Accessibility Guardrails**: Full built-in simulation and support for `prefers-reduced-transparency` (high-contrast opaque fallback) and `prefers-reduced-motion` (gentle resting highlights).

---

## 📸 Visual Gallery

### 1. Interactive Studio & Inspector
Tune gaussian scatter blur, saturation, ambient brightness, edge contrast, and squircle curvature with real-time backdrop calibration:
<p align="center">
  <img src="assets/screenshots/studio-overview.png" alt="Studio Overview" width="92%" style="border-radius: 10px;">
</p>

### 2. macOS Fisheye Magnification Dock
Full support for genuine dock shelf physics where magnified icons lift smoothly beyond container boundaries without clipping:
<p align="center">
  <img src="assets/screenshots/carrier-fisheye-dock.png" alt="macOS Fisheye Dock" width="92%" style="border-radius: 10px;">
</p>

### 3. Dynamic Island & Apple Music Widget
<p align="center">
  <img src="assets/screenshots/carrier-dynamic-island.png" alt="Dynamic Island" width="45%" style="border-radius: 10px; margin-right: 2%;">
  <img src="assets/screenshots/carrier-music.png" alt="Music Widget" width="45%" style="border-radius: 10px;">
</p>

---

## 🔬 Optical Physics & Pipeline

```
[ High-Contrast Background Layer (Typography / Spectrum) ]
                            │
                            ▼
[ 1. Luminosity Re-leveling (3-Step HIG Filter) ]
  - Gaussian Blur (4px ~ 28px)
  - Color Saturation (130% ~ 220%)
  - Ambient Brightness Lift (0.94 ~ 1.08)
  - Edge Contrast Boost (1.02 ~ 1.12)
                            │
                            ▼
[ 2. Zero-Shift 4-Layer Inset Scatter Box-Shadows ]
  - Layer 1: Specular Rim Inset (Incident Key Light)
  - Layer 2: Secondary Bounce Inset (Opposite Ambient Return)
  - Layer 3: Short Subsurface Scatter Inset
  - Layer 4: Deep Volume Bloom Inset
  - Layer 5: Non-contact Outer Drop Shadow
                            │
                            ▼
[ 3. Conic Traveling Specular Glint ]
  - 360° Light Angle Dial + Dynamic Pointer Following Mask
```

---

## 💎 The 6 Material Presets at a Glance

| Preset | Target Use Case | Blur | Base Alpha | Saturation | Contrast | Description |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Clear** | Crystal slabs, magnifying loupes, viewports | `4px` | `4%` | `140%` | `1.08` | Ultra-high optical clarity; background typography remains sharp with edge refraction. |
| **Prismatic** | System cards, Control Center, floating islands | `16px` | `8%` | `180%` | `1.06` | Classic WWDC25 heavy glossy prism with chromatic dispersion and smooth scatter. |
| **Satin** | Sidebars, inspector sheets, modal backdrops | `28px` | `16%` | `160%` | `1.02` | Smooth frosted acrylic with maximum text legibility and contrast preservation. |
| **Tinted** | Focused cards, media players, hero highlights | `22px` | `12%` | `210%` | `1.05` | Holographic ambient color blending that absorbs backdrop illumination. |
| **Obsidian** | Dark HUDs, pro audio consoles, monitors | `24px` | `40%` | `130%` | `1.10` | Space black light absorber with high-contrast platinum specular bevels. |
| **Gel** | Tactile buttons, activity bubbles, indicators | `14px` | `14%` | `195%` | `1.03` | Viscous fluid appearance with light refracting gently toward the center. |

---

## 🚀 Quick Start

### 1. Local Preview
No `node_modules` or build steps are necessary:

```bash
# Clone the repository
git clone git@github.com:pandaJS404/liquid-glass.git
cd liquid-glass

# Option A: Directly open index.html in your browser
open index.html

# Option B: Spin up a local lightweight server (Recommended)
python -m http.server 8088
# Visit http://localhost:8088/ in your browser
```

### 2. Using the Core Material CSS in Your Own Project
Simply apply the calibrated styles:

```css
.my-liquid-card {
  width: 480px;
  height: 320px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.04);
  -webkit-backdrop-filter: blur(4px) saturate(140%) brightness(1.06) contrast(1.08);
  backdrop-filter: blur(4px) saturate(140%) brightness(1.06) contrast(1.08);
  box-shadow:
    inset 1.5px 1.5px 2px 0 rgba(255, 255, 255, 0.75),
    inset -1.5px -1.5px 2px 0 rgba(255, 255, 255, 0.15),
    inset 0 0 10px 2px rgba(255, 255, 255, 0.18),
    inset 0 0 18px 4px rgba(255, 255, 255, 0.08),
    0 24px 50px -12px rgba(0, 0, 0, 0.65);
  position: relative;
  overflow: visible;
}
```

---

## 🔗 URL Hash State Protocol

Every optic parameter and carrier layout is serialized into URL Hash parameters, enabling effortless team sharing and design handoff:

```text
#mat=clear&comp=card&blur=4&sat=140&bright=1.06&contrast=1.08&fill=4&rim=1.8&bloom=18&angle=145&spread=60&w=480&h=320&r=28
```

Sharing this URL restores the exact studio inspection state.

---

## 🌐 Browser Compatibility Matrix

| Rendering Feature | Chrome / Edge (Chromium) | Safari (WebKit) | Firefox (Gecko) |
| :--- | :---: | :---: | :---: |
| **4-Layer Scatter Box-Shadows** | ✅ Supported | ✅ Supported | ✅ Supported |
| **3-Step Luminosity Re-leveling** | ✅ Supported | ✅ Supported | ✅ Supported |
| **Conic Traveling Glints** | ✅ Supported | ✅ Supported | ✅ Supported |
| **SVG Normal Refraction** | ✅ Native | ⚡ Elegant CSS Fallback | ⚡ Elegant CSS Fallback |
| **Reduce Transparency** | ✅ 100% WCAG 2.2 AA | ✅ 100% WCAG 2.2 AA | ✅ 100% WCAG 2.2 AA |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

Designed with ❤️ to celebrate the timeless elegance of Apple Human Interface Guidelines.
