/**
 * Apple Liquid Glass Studio - Master Optical & Interaction Engine
 * Pure Standalone Project - Zero External Dependencies - 100% HIG Compliant
 */

(function () {
  'use strict';

  // 1. Studio State
  const state = {
    // Carrier & Engine Mode
    carrier: 'card', // 'card' | 'island' | 'dock' | 'spotlight' | 'segmented' | 'buttons' | 'music'
    engineMode: 'A', // 'A' (DOM Native) | 'B' (Floated Lens) | 'C' (GPU Dispersive)
    wallpaper: 'aurora-pink',

    // Material Preset
    preset: 'clear', // 'clear' | 'prismatic' | 'satin' | 'tinted' | 'obsidian' | 'gel'

    // 3-Step Luminosity Re-leveling (WWDC25 HIG)
    blur: 3,
    saturate: 145,
    brightness: 1.06,
    contrast: 1.10,

    // 4-Layer Inset Scatter Shadows (Zero Layout Shift)
    fillAlpha: 4,
    rimDepth: 2.0,
    deepBloom: 24,
    lightAngle: 145,
    conicSpread: 60,

    // Dimensions & Squircle
    squircleRadius: 28,
    cardWidth: 480,
    cardHeight: 320,

    // Accessibility Tests
    reduceTransparency: false,
    reduceMotion: false,
    pointerTrack: true,

    // Code Accordion State
    codeFormat: 'css', // 'css' | 'tailwind' | 'react' | 'vue' | 'tokens'
    codePanelExpanded: false
  };

  // 2. Official HIG Material Presets (Calibrated for Physical Optical Transmittance)
  const MATERIAL_PRESETS = {
    prismatic: {
      nameZh: 'Prismatic 棱镜',
      desc: '重折射厚棱镜，高反差光刃',
      blur: 6,
      saturate: 175,
      brightness: 1.06,
      contrast: 1.12,
      fillAlpha: 6,
      rimDepth: 2.2,
      deepBloom: 36,
      squircleRadius: 28
    },
    satin: {
      nameZh: 'Satin 缎面',
      desc: '丝缎柔光微磨砂，高文本对比',
      blur: 28,
      saturate: 160,
      brightness: 1.08,
      contrast: 1.02,
      fillAlpha: 16,
      rimDepth: 1.2,
      deepBloom: 28,
      squircleRadius: 24
    },
    clear: {
      nameZh: 'Clear 纯透',
      desc: '超透纯净水晶透镜，极高通透感',
      blur: 3,
      saturate: 145,
      brightness: 1.06,
      contrast: 1.10,
      fillAlpha: 4,
      rimDepth: 2.0,
      deepBloom: 24,
      squircleRadius: 32
    },
    tinted: {
      nameZh: 'Tinted 柔彩',
      desc: '全息极光幻彩，智能动态感',
      blur: 22,
      saturate: 210,
      brightness: 1.05,
      contrast: 1.05,
      fillAlpha: 12,
      rimDepth: 1.6,
      deepBloom: 36,
      squircleRadius: 28
    },
    obsidian: {
      nameZh: 'Obsidian 黑曜',
      desc: '黑曜石深空玻璃，深沉镜面',
      blur: 24,
      saturate: 130,
      brightness: 0.94,
      contrast: 1.10,
      fillAlpha: 40,
      rimDepth: 1.2,
      deepBloom: 24,
      squircleRadius: 26
    },
    gel: {
      nameZh: 'Gel 凝胶',
      desc: '弹性果冻凝胶，大曲率透镜',
      blur: 14,
      saturate: 195,
      brightness: 1.10,
      contrast: 1.03,
      fillAlpha: 14,
      rimDepth: 2.2,
      deepBloom: 44,
      squircleRadius: 36
    }
  };

  // Wallpapers
  const WALLPAPERS = {
    'aurora-pink': 'radial-gradient(circle at 22% 28%, #ec4899 0%, #3b82f6 45%, transparent 72%), radial-gradient(circle at 88% 55%, #8b5cf6 0%, #ec4899 35%, transparent 68%), #090c16',
    'ocean-blue': 'radial-gradient(circle at 20% 30%, #06b6d4 0%, #2563eb 48%, transparent 75%), radial-gradient(circle at 88% 45%, #3b82f6 0%, #0284c7 40%, transparent 65%), #05070e',
    'sunset-amber': 'radial-gradient(circle at 22% 30%, #f43f5e 0%, #fb923c 48%, transparent 75%), radial-gradient(circle at 88% 50%, #f97316 0%, #e11d48 40%, transparent 68%), #0c0807',
    'cyber-neon': 'radial-gradient(circle at 25% 35%, #d946ef 0%, #6366f1 48%, transparent 75%), radial-gradient(circle at 88% 45%, #a855f7 0%, #3b82f6 40%, transparent 68%), #05060d',
    'dark-minimal': 'radial-gradient(circle at 85% 35%, rgba(255,255,255,0.06) 0%, transparent 55%), #090b10',
    'mesh-organic': 'radial-gradient(circle at 22% 30%, #2563eb 0%, #0d9488 48%, transparent 75%), radial-gradient(circle at 88% 55%, #14b8a6 0%, #6366f1 40%, transparent 68%), #070a10'
  };

  // DOM Elements references
  let stageBackdrop = null;
  let glassTarget = null;
  let cardMetaText = null;
  let compassDial = null;
  let compassNeedle = null;
  let codeSnippetEl = null;
  let codeAccordionPanel = null;
  let foldStatusText = null;
  let toastEl = null;
  let modalOverlay = null;

  // Sliders and Displays
  const sliders = {};
  const displays = {};

  // =========================================================================
  // URL Hash Sync (Bidirectional 9elements-style Serialization)
  // =========================================================================
  function parseHash() {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash) return;
    const params = new URLSearchParams(hash);

    if (params.has('mat') && MATERIAL_PRESETS[params.get('mat')]) {
      state.preset = params.get('mat');
      const p = MATERIAL_PRESETS[state.preset];
      state.blur = p.blur;
      state.saturate = p.saturate;
      state.brightness = p.brightness;
      state.contrast = p.contrast;
      state.fillAlpha = p.fillAlpha;
      state.rimDepth = p.rimDepth;
      state.deepBloom = p.deepBloom;
      state.squircleRadius = p.squircleRadius;
    }
    if (params.has('mode')) state.engineMode = params.get('mode');
    if (params.has('comp')) state.carrier = params.get('comp');
    if (params.has('blur')) state.blur = parseInt(params.get('blur'), 10) || state.blur;
    if (params.has('sat')) state.saturate = parseInt(params.get('sat'), 10) || state.saturate;
    if (params.has('bright')) state.brightness = parseFloat(params.get('bright')) || state.brightness;
    if (params.has('contrast')) state.contrast = parseFloat(params.get('contrast')) || state.contrast;
    if (params.has('fill')) state.fillAlpha = parseInt(params.get('fill'), 10) || state.fillAlpha;
    if (params.has('rim')) state.rimDepth = parseFloat(params.get('rim')) || state.rimDepth;
    if (params.has('bloom')) state.deepBloom = parseInt(params.get('bloom'), 10) || state.deepBloom;
    if (params.has('angle')) state.lightAngle = parseInt(params.get('angle'), 10) || state.lightAngle;
    if (params.has('spread')) state.conicSpread = parseInt(params.get('spread'), 10) || state.conicSpread;
    if (params.has('w')) state.cardWidth = parseInt(params.get('w'), 10) || state.cardWidth;
    if (params.has('h')) state.cardHeight = parseInt(params.get('h'), 10) || state.cardHeight;
    if (params.has('r')) state.squircleRadius = parseInt(params.get('r'), 10) || state.squircleRadius;
    if (params.has('fmt')) state.codeFormat = params.get('fmt');
  }

  function updateHash() {
    const params = new URLSearchParams();
    params.set('mat', state.preset);
    params.set('mode', state.engineMode);
    params.set('comp', state.carrier);
    params.set('blur', state.blur);
    params.set('sat', state.saturate);
    params.set('bright', state.brightness.toFixed(2));
    params.set('contrast', state.contrast.toFixed(2));
    params.set('fill', state.fillAlpha);
    params.set('rim', state.rimDepth.toFixed(1));
    params.set('bloom', state.deepBloom);
    params.set('angle', Math.round(state.lightAngle));
    params.set('spread', state.conicSpread);
    params.set('w', state.cardWidth);
    params.set('h', state.cardHeight);
    params.set('r', state.squircleRadius);
    const newHash = '#' + params.toString();
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', newHash);
    }
  }

  // =========================================================================
  // Physics & Optical Calculations
  // =========================================================================
  function calculateOpticalProperties() {
    // 3-step filter
    const backdropFilter = `blur(${state.blur}px) saturate(${state.saturate}%) brightness(${state.brightness}) contrast(${state.contrast})`;

    // Base background tint
    const baseColor = state.preset === 'obsidian'
      ? `rgba(18, 22, 34, ${state.fillAlpha / 100})`
      : `rgba(255, 255, 255, ${state.fillAlpha / 100})`;

    // 4-Layer Inset Scatter Box Shadow
    const rad = (state.lightAngle * Math.PI) / 180;
    const offX = Math.round(Math.cos(rad) * state.rimDepth * 10) / 10;
    const offY = Math.round(Math.sin(rad) * state.rimDepth * 10) / 10;
    const oppX = -offX;
    const oppY = -offY;

    const layer1 = `inset ${offX}px ${offY}px 3px 0 rgba(255, 255, 255, 0.95)`;
    const layer2 = `inset ${oppX}px ${oppY}px 3px 0 rgba(255, 255, 255, 0.28)`;
    const layer3 = `inset 0 0 20px 4px rgba(255, 255, 255, 0.20)`;
    const layer4 = `inset 0 0 ${state.deepBloom}px 6px rgba(255, 255, 255, 0.12)`;
    const layer5 = `0 32px 64px -14px rgba(0, 0, 0, 0.72)`;

    const boxShadow = `${layer1},\n    ${layer2},\n    ${layer3},\n    ${layer4},\n    ${layer5}`;

    return {
      backdropFilter,
      baseColor,
      boxShadow,
      squircleRadius: `${state.squircleRadius}px`
    };
  }

  // =========================================================================
  // Multi-Format Code Generators (CSS, Tailwind, React, Vue, Tokens)
  // =========================================================================
  function generateCode(format, optics) {
    switch (format) {
      case 'css':
        return `/* =========================================================
   Apple HIG Liquid Glass - ${state.preset.toUpperCase()} (WWDC25 Compliant)
   三步调平滤波 · 零位移四层内阴影 · 平滑圆角
   ========================================================= */

.liquid-glass-carrier {
  /* 尺寸与几何圆角 (Anti-Clipping: 容器与裁剪绝对一致) */
  width: ${state.cardWidth}px;
  height: ${state.cardHeight}px;
  border-radius: ${optics.squircleRadius};

  /* 基础底色与透明度 */
  background: ${optics.baseColor};

  /* 苹果官方三步调平滤波 (消除发灰死黑，拉开晶莹反差) */
  -webkit-backdrop-filter: ${optics.backdropFilter};
  backdrop-filter: ${optics.backdropFilter};

  /* 零位移四层物理散射内阴影 (摒弃传统 border 破坏对齐) */
  box-shadow:
    ${optics.boxShadow};

  /* 环境遮蔽与发丝级高光 */
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 文本环境遮蔽防护 (Ambient Occlusion Shield) */
.liquid-glass-carrier h1,
.liquid-glass-carrier h2,
.liquid-glass-carrier p {
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
}

/* WCAG 2.2 无障碍降级守则 (Reduce Transparency) */
@media (prefers-reduced-transparency: reduce) {
  .liquid-glass-carrier {
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    background: #181b26 !important;
    border: 1px solid rgba(255, 255, 255, 0.35) !important;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.7) !important;
  }
}

/* Reduce Motion 动效降级守则 */
@media (prefers-reduced-motion: reduce) {
  .liquid-glass-carrier {
    transition: none !important;
    animation: none !important;
  }
}`;

      case 'tailwind':
        return `<!-- Tailwind CSS (JIT Arbitrary Values & Apple HIG Re-leveling) -->
<div class="
  w-[${state.cardWidth}px] h-[${state.cardHeight}px] rounded-[${optics.squircleRadius}]
  bg-[${optics.baseColor}]
  backdrop-blur-[${state.blur}px] backdrop-saturate-[${state.saturate}%]
  backdrop-brightness-[${state.brightness}] backdrop-contrast-[${state.contrast}]
  shadow-[inset_1.5px_1.5px_2px_0_rgba(255,255,255,0.75),inset_-1.5px_-1.5px_2px_0_rgba(255,255,255,0.15),inset_0_0_10px_2px_rgba(255,255,255,0.18),inset_0_0_${state.deepBloom}px_4px_rgba(255,255,255,0.08),0_24px_50px_-12px_rgba(0,0,0,0.65)]
  relative overflow-hidden transition-all duration-300
  motion-reduce:transition-none
">
  <!-- 内容层与环境遮蔽文本防护 -->
  <div class="p-8 text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]">
    <h2 class="text-2xl font-bold tracking-tight">Apple Liquid Glass</h2>
    <p class="text-sm text-white/80 mt-2">三步调平滤波 · 零位移四层散射内阴影</p>
  </div>
</div>`;

      case 'react':
        return `import React, { useState, useEffect } from 'react';

/**
 * Apple Liquid Glass Component (WWDC25 HIG Specification)
 */
export const LiquidGlassCard = ({
  children,
  className = '',
  style = {}
}) => {
  const [lightAngle, setLightAngle] = useState(${state.lightAngle});

  useEffect(() => {
    const handlePointerMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const deg = Math.atan2(e.clientY - innerHeight / 2, e.clientX - innerWidth / 2) * (180 / Math.PI) + 90;
      setLightAngle(deg < 0 ? deg + 360 : deg);
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const glassStyle: React.CSSProperties = {
    width: '${state.cardWidth}px',
    height: '${state.cardHeight}px',
    borderRadius: '${optics.squircleRadius}',
    background: '${optics.baseColor}',
    WebkitBackdropFilter: '${optics.backdropFilter}',
    backdropFilter: '${optics.backdropFilter}',
    boxShadow: \`
      inset 1.5px 1.5px 2px 0 rgba(255, 255, 255, 0.75),
      inset -1.5px -1.5px 2px 0 rgba(255, 255, 255, 0.15),
      inset 0 0 10px 2px rgba(255, 255, 255, 0.18),
      inset 0 0 ${state.deepBloom}px 4px rgba(255, 255, 255, 0.08),
      0 24px 50px -12px rgba(0, 0, 0, 0.65)
    \`,
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    ...style
  };

  return (
    <div className={\`liquid-glass-card \${className}\`} style={glassStyle}>
      <div style={{ padding: '28px', color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.45)' }}>
        {children || (
          <>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>Apple Liquid Glass</h2>
            <p style={{ margin: '8px 0 0', opacity: 0.85, fontSize: '13px' }}>
              三步调平滤波 · 零位移四层内阴影 · 平滑圆角
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LiquidGlassCard;`;

      case 'vue':
        return `<template>
  <div class="liquid-glass-card" :style="computedGlassStyle">
    <div class="glass-inner-content">
      <slot>
        <h2 class="glass-title">Apple Liquid Glass</h2>
        <p class="glass-sub">三步调平滤波 · 零位移四层内阴影 · 平滑圆角</p>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  width: { type: Number, default: ${state.cardWidth} },
  height: { type: Number, default: ${state.cardHeight} },
  radius: { type: Number, default: ${state.squircleRadius} }
});

const computedGlassStyle = computed(() => ({
  width: \`\${props.width}px\`,
  height: \`\${props.height}px\`,
  borderRadius: \`\${props.radius}px\`,
  background: '${optics.baseColor}',
  WebkitBackdropFilter: '${optics.backdropFilter}',
  backdropFilter: '${optics.backdropFilter}',
  boxShadow: \`
    inset 1.5px 1.5px 2px 0 rgba(255, 255, 255, 0.75),
    inset -1.5px -1.5px 2px 0 rgba(255, 255, 255, 0.15),
    inset 0 0 10px 2px rgba(255, 255, 255, 0.18),
    inset 0 0 ${state.deepBloom}px 4px rgba(255, 255, 255, 0.08),
    0 24px 50px -12px rgba(0, 0, 0, 0.65)
  \`
}));
</script>

<style scoped>
.liquid-glass-card {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.glass-inner-content {
  padding: 28px;
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
}
.glass-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
}
.glass-sub {
  margin: 8px 0 0;
  font-size: 13px;
  opacity: 0.85;
}
</style>`;

      case 'tokens':
        return JSON.stringify({
          "$schema": "https://design-tokens.github.io/community-group/format/",
          "appleLiquidGlass": {
            "preset": state.preset,
            "luminosityLeveling": {
              "blur": { "value": `${state.blur}px`, "type": "dimension" },
              "saturate": { "value": `${state.saturate}%`, "type": "number" },
              "brightness": { "value": state.brightness, "type": "number" },
              "contrast": { "value": state.contrast, "type": "number" },
              "filterFormula": { "value": optics.backdropFilter, "type": "string" }
            },
            "fourLayerInsetShadow": {
              "layer1SpecularRim": { "value": "inset 1.5px 1.5px 2px 0 rgba(255,255,255,0.75)", "type": "shadow" },
              "layer2AmbientBounce": { "value": "inset -1.5px -1.5px 2px 0 rgba(255,255,255,0.15)", "type": "shadow" },
              "layer3SubsurfaceScatter": { "value": "inset 0 0 10px 2px rgba(255,255,255,0.18)", "type": "shadow" },
              "layer4DeepVolumeBloom": { "value": `inset 0 0 ${state.deepBloom}px 4px rgba(255,255,255,0.08)`, "type": "shadow" },
              "layer5DropShadow": { "value": "0 24px 50px -12px rgba(0, 0, 0, 0.65)", "type": "shadow" }
            },
            "geometry": {
              "squircleRadius": { "value": optics.squircleRadius, "type": "dimension" },
              "width": { "value": `${state.cardWidth}px`, "type": "dimension" },
              "height": { "value": `${state.cardHeight}px`, "type": "dimension" }
            },
            "lighting": {
              "lightAngle": { "value": `${state.lightAngle}deg`, "type": "angle" },
              "conicSpread": { "value": `${state.conicSpread}deg`, "type": "angle" }
            }
          }
        }, null, 2);

      default:
        return '';
    }
  }


  // =========================================================================
  // Real SVG Optical Displacement & Chromatic Aberration Pipeline
  // =========================================================================
  let svgDefsContainer = null;
  function getSvgDefs() {
    if (!svgDefsContainer) {
      svgDefsContainer = document.getElementById('liquid-glass-svg-defs');
    }
    return svgDefsContainer;
  }

  function clampVal(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  function buildDisplacementMap(width, height, radius, rimWidth, curvaturePower = 2.2) {
    const canvas = document.createElement('canvas');
    const w = Math.max(8, Math.round(width));
    const h = Math.max(8, Math.round(height));
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(w, h);
    const data = imgData.data;

    const halfW = w / 2;
    const halfH = h / 2;
    const r = Math.min(radius, halfW, halfH);
    const innerW = halfW - r;
    const innerH = halfH - r;
    const rim = Math.max(6, rimWidth);

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const dx = x + 0.5 - halfW;
        const dy = y + 0.5 - halfH;
        const sx = Math.sign(dx) || 1;
        const sy = Math.sign(dy) || 1;

        const qx = Math.abs(dx) - innerW;
        const qy = Math.abs(dy) - innerH;
        const ox = Math.max(qx, 0);
        const oy = Math.max(qy, 0);

        const dist = r - (Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0));

        let nx = 0, ny = 0;
        if (qx > 0 && qy > 0) {
          const len = Math.hypot(qx, qy) || 1;
          nx = (sx * qx) / len;
          ny = (sy * qy) / len;
        } else if (qx > qy) {
          nx = sx;
          ny = 0;
        } else {
          nx = 0;
          ny = sy;
        }

        let t = 1 - clampVal(dist / rim, 0, 1);
        t = Math.pow(t, curvaturePower);

        const idx = (y * w + x) * 4;
        data[idx]     = Math.round(128 - nx * 127 * t);
        data[idx + 1] = Math.round(128 - ny * 127 * t);
        data[idx + 2] = 128;
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL('image/png');
  }

  function updateSvgLensFilter(width, height, radius) {
    const container = getSvgDefs();
    if (!container) return null;

    const filterId = 'studio-optical-lens-filter';
    let filterEl = document.getElementById(filterId);
    if (!filterEl) {
      filterEl = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filterEl.id = filterId;
      filterEl.setAttribute('x', '0');
      filterEl.setAttribute('y', '0');
      filterEl.setAttribute('width', '100%');
      filterEl.setAttribute('height', '100%');
      filterEl.setAttribute('color-interpolation-filters', 'sRGB');
      container.appendChild(filterEl);
    }

    const rim = Math.max(12, Math.min(height * 0.45, 38));
    const mapUri = buildDisplacementMap(width, height, radius, rim);

    let scale = 36;
    let dispersion = 0;
    if (state.engineMode === 'B') {
      scale = 36;
      dispersion = 0.08;
    } else if (state.engineMode === 'C') {
      scale = 44;
      dispersion = 0.42;
    }

    const scaleR = (scale * (1 + dispersion)).toFixed(1);
    const scaleG = scale.toFixed(1);
    const scaleB = (scale * (1 - dispersion)).toFixed(1);
    const stdDev = Math.max(0, state.blur * 0.25).toFixed(1);
    const satVal = (state.saturate / 100).toFixed(2);

    filterEl.innerHTML = `
      <feImage href="${mapUri}" xlink:href="${mapUri}" result="dispMap" width="${width}" height="${height}" preserveAspectRatio="none" />
      <feDisplacementMap in="SourceGraphic" in2="dispMap" xChannelSelector="R" yChannelSelector="G" scale="${scaleR}" result="displacedR" />
      <feDisplacementMap in="SourceGraphic" in2="dispMap" xChannelSelector="R" yChannelSelector="G" scale="${scaleG}" result="displacedG" />
      <feDisplacementMap in="SourceGraphic" in2="dispMap" xChannelSelector="R" yChannelSelector="G" scale="${scaleB}" result="displacedB" />
      <feColorMatrix in="displacedR" type="matrix" result="colorR" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
      <feColorMatrix in="displacedG" type="matrix" result="colorG" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" />
      <feColorMatrix in="displacedB" type="matrix" result="colorB" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" />
      <feComposite in="colorR" in2="colorG" operator="arithmetic" k2="1" k3="1" result="colorRG" />
      <feComposite in="colorRG" in2="colorB" operator="arithmetic" k2="1" k3="1" result="chromaCombined" />
      <feGaussianBlur in="chromaCombined" stdDeviation="${stdDev}" result="polished" />
      <feColorMatrix in="polished" type="saturate" values="${satVal}" />
    `;

    return `url(#${filterId})`;
  }

  // =========================================================================
  // Interactive Smooth Dragging across Stage (Like sandbox-section)
  // =========================================================================
  let isDraggingCard = false;
  let dragStartX = 0, dragStartY = 0;
  let currentCardX = 0, currentCardY = 0;

  function initDraggableCard() {
    if (!glassTarget) return;

    glassTarget.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button, input, a, select, textarea, .no-drag')) return;

      isDraggingCard = true;
      dragStartX = e.clientX - currentCardX;
      dragStartY = e.clientY - currentCardY;
      glassTarget.classList.add('is-dragging');
      glassTarget.setPointerCapture(e.pointerId);
    });

    glassTarget.addEventListener('pointermove', (e) => {
      if (!isDraggingCard) return;

      const newX = e.clientX - dragStartX;
      const newY = e.clientY - dragStartY;

      currentCardX = Math.max(-420, Math.min(420, newX));
      currentCardY = Math.max(-260, Math.min(260, newY));

      glassTarget.style.transform = `translate3d(${currentCardX}px, ${currentCardY}px, 0)`;
    });

    const endDrag = (e) => {
      if (!isDraggingCard) return;
      isDraggingCard = false;
      glassTarget.classList.remove('is-dragging');
      try {
        glassTarget.releasePointerCapture(e.pointerId);
      } catch (err) {}
    };

    glassTarget.addEventListener('pointerup', endDrag);
    glassTarget.addEventListener('pointercancel', endDrag);

    glassTarget.addEventListener('dblclick', (e) => {
      if (e.target.closest('button, input, a')) return;
      currentCardX = 0;
      currentCardY = 0;
      glassTarget.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      glassTarget.style.transform = `translate3d(0, 0, 0)`;
      setTimeout(() => {
        glassTarget.style.transition = '';
      }, 400);
      showToast('玻璃已复位至中心');
    });
  }

  // =========================================================================
  // Master Render Loop
  // =========================================================================
  function render() {
    const optics = calculateOpticalProperties();

    // 1. Update Carrier Master Host
    if (glassTarget) {
      // Dimensions adapt per carrier
      glassTarget.style.maxWidth = 'min(100%, calc(100vw - 28px))';
      if (state.carrier === 'card') {
        glassTarget.style.width = `${state.cardWidth}px`;
        glassTarget.style.height = `${state.cardHeight}px`;
        glassTarget.style.minHeight = '240px';
        glassTarget.style.borderRadius = optics.squircleRadius;
      } else if (state.carrier === 'island') {
        glassTarget.style.width = '360px';
        glassTarget.style.height = '68px';
        glassTarget.style.minHeight = '68px';
        glassTarget.style.borderRadius = '34px';
      } else if (state.carrier === 'dock') {
        glassTarget.style.width = '420px';
        glassTarget.style.height = '76px';
        glassTarget.style.minHeight = '76px';
        glassTarget.style.borderRadius = '24px';
      } else if (state.carrier === 'spotlight') {
        glassTarget.style.width = '520px';
        glassTarget.style.height = '180px';
        glassTarget.style.minHeight = '140px';
        glassTarget.style.borderRadius = '22px';
      } else if (state.carrier === 'segmented') {
        glassTarget.style.width = '320px';
        glassTarget.style.height = '56px';
        glassTarget.style.minHeight = '56px';
        glassTarget.style.borderRadius = '16px';
      } else if (state.carrier === 'buttons') {
        glassTarget.style.width = '460px';
        glassTarget.style.height = 'auto';
        glassTarget.style.minHeight = '90px';
        glassTarget.style.borderRadius = '24px';
      } else if (state.carrier === 'music') {
        glassTarget.style.width = '400px';
        glassTarget.style.height = '100px';
        glassTarget.style.minHeight = '84px';
        glassTarget.style.borderRadius = '26px';
      }

      // Sheen gradient + base tint gives crystal clarity
      glassTarget.style.background = `linear-gradient(${state.lightAngle}deg, rgba(255, 255, 255, 0.38) 0%, transparent 24%), ${optics.baseColor}`;
      
      // Mode B & C: Real SVG Optical Displacement & Chromatic Aberration
      if (state.engineMode === 'B' || state.engineMode === 'C') {
        const rect = glassTarget.getBoundingClientRect();
        const radNum = parseFloat(optics.squircleRadius) || 28;
        const w = rect.width || state.cardWidth;
        const h = rect.height || state.cardHeight;
        const filterUrl = updateSvgLensFilter(w, h, radNum);
        if (filterUrl) {
          glassTarget.style.webkitBackdropFilter = `${filterUrl} ${optics.backdropFilter}`;
          glassTarget.style.backdropFilter = `${filterUrl} ${optics.backdropFilter}`;
        } else {
          glassTarget.style.webkitBackdropFilter = optics.backdropFilter;
          glassTarget.style.backdropFilter = optics.backdropFilter;
        }
      } else {
        glassTarget.style.webkitBackdropFilter = optics.backdropFilter;
        glassTarget.style.backdropFilter = optics.backdropFilter;
      }
      glassTarget.style.boxShadow = optics.boxShadow;
      glassTarget.style.setProperty('--light-angle', `${state.lightAngle}deg`);
      glassTarget.style.setProperty('--lg-light-angle', `${state.lightAngle}deg`);
      glassTarget.style.setProperty('--lg-conic-spread', `${state.conicSpread}deg`);
      glassTarget.classList.toggle('mode-lens', state.engineMode === 'B');
      glassTarget.classList.toggle('mode-dispersive', state.engineMode === 'C');
    }

    // 2. Update Card Meta text and Dynamic Metric
    if (cardMetaText) {
      cardMetaText.textContent = `Blur ${state.blur}px · Sat ${state.saturate}%`;
    }
    const progressFill = document.querySelector('.card-progress-fill');
    if (progressFill) {
      const transmission = Math.max(15, Math.min(99, Math.round(100 - state.fillAlpha * 0.8 - (state.blur - 4) * 0.8)));
      progressFill.style.width = `${transmission}%`;
      const metricVal = document.querySelector('.card-metric-value');
      if (metricVal) metricVal.innerHTML = `${transmission}<span class="card-metric-unit">%</span>`;
    }

    // 3. Update Compass Dial needle
    if (compassNeedle) {
      compassNeedle.style.transform = `translate(-50%, -100%) rotate(${state.lightAngle}deg)`;
    }

    // 4. Update Slider value indicators
    if (displays.blur) displays.blur.textContent = `${state.blur}px`;
    if (displays.saturate) displays.saturate.textContent = `${state.saturate}%`;
    if (displays.brightness) displays.brightness.textContent = state.brightness.toFixed(2);
    if (displays.contrast) displays.contrast.textContent = state.contrast.toFixed(2);
    if (displays.fillAlpha) displays.fillAlpha.textContent = `${state.fillAlpha}%`;
    if (displays.rimDepth) displays.rimDepth.textContent = `${state.rimDepth.toFixed(1)}px`;
    if (displays.deepBloom) displays.deepBloom.textContent = `${state.deepBloom}px`;
    if (displays.lightAngle) displays.lightAngle.textContent = `${Math.round(state.lightAngle)}°`;
    if (displays.conicSpread) displays.conicSpread.textContent = `${state.conicSpread}°`;
    if (displays.squircleRadius) displays.squircleRadius.textContent = `${state.squircleRadius}px`;

    // 5. Update Sliders input values (if not currently focused)
    if (sliders.blur && document.activeElement !== sliders.blur) sliders.blur.value = state.blur;
    if (sliders.saturate && document.activeElement !== sliders.saturate) sliders.saturate.value = state.saturate;
    if (sliders.brightness && document.activeElement !== sliders.brightness) sliders.brightness.value = state.brightness;
    if (sliders.contrast && document.activeElement !== sliders.contrast) sliders.contrast.value = state.contrast;
    if (sliders.fillAlpha && document.activeElement !== sliders.fillAlpha) sliders.fillAlpha.value = state.fillAlpha;
    if (sliders.rimDepth && document.activeElement !== sliders.rimDepth) sliders.rimDepth.value = state.rimDepth;
    if (sliders.deepBloom && document.activeElement !== sliders.deepBloom) sliders.deepBloom.value = state.deepBloom;
    if (sliders.lightAngle && document.activeElement !== sliders.lightAngle) sliders.lightAngle.value = state.lightAngle;
    if (sliders.conicSpread && document.activeElement !== sliders.conicSpread) sliders.conicSpread.value = state.conicSpread;
    if (sliders.squircleRadius && document.activeElement !== sliders.squircleRadius) sliders.squircleRadius.value = state.squircleRadius;

    // 6. Update Dimensions Inputs
    const numW = document.getElementById('num-width');
    const numH = document.getElementById('num-height');
    if (numW && document.activeElement !== numW) numW.value = state.cardWidth;
    if (numH && document.activeElement !== numH) numH.value = state.cardHeight;

    // 7. Update Code Drawer Content
    if (codeSnippetEl) {
      codeSnippetEl.textContent = generateCode(state.codeFormat, optics);
    }

    // 8. Update Accordion Fold State & Status Text
    if (codeAccordionPanel) {
      codeAccordionPanel.classList.toggle('expanded', state.codePanelExpanded);
      if (foldStatusText) {
        foldStatusText.textContent = state.codePanelExpanded ? '收起' : '展开';
      }
    }

    // 9. Accessibility Simulation Classes
    document.body.classList.toggle('test-reduce-transparency', state.reduceTransparency);
    document.body.classList.toggle('test-reduce-motion', state.reduceMotion);

    // 10. Update Hash
    updateHash();
  }

  // =========================================================================
  // Sun Compass Dial Interaction
  // =========================================================================
  function initCompassDial() {
    if (!compassDial) return;
    let isDragging = false;

    function handleRotate(e) {
      const rect = compassDial.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      let deg = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI) + 90;
      if (deg < 0) deg += 360;
      state.lightAngle = Math.round(deg);
      render();
    }

    compassDial.addEventListener('mousedown', (e) => {
      isDragging = true;
      handleRotate(e);
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) handleRotate(e);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Pointer Track on stage with 3D Tilt & Specular Lens Flare
    window.addEventListener('pointermove', (e) => {
      if (!state.pointerTrack || isDragging) return;
      const viewport = document.getElementById('stage-viewport');
      if (!viewport) return;
      const rect = viewport.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let deg = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI) + 90;
      if (deg < 0) deg += 360;
      state.lightAngle = Math.round(deg);

      if (compassNeedle) {
        compassNeedle.style.transform = `translate(-50%, -100%) rotate(${state.lightAngle}deg)`;
      }
      if (glassTarget) {
        glassTarget.style.setProperty('--light-angle', `${state.lightAngle}deg`);
        glassTarget.style.setProperty('--lg-light-angle', `${state.lightAngle}deg`);

        // Interactive 3D Perspective Tilt & Cursor Glint
        if (!state.reduceMotion) {
          const bounds = glassTarget.getBoundingClientRect();
          if (
            e.clientX >= bounds.left - 40 &&
            e.clientX <= bounds.right + 40 &&
            e.clientY >= bounds.top - 40 &&
            e.clientY <= bounds.bottom + 40
          ) {
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;
            glassTarget.style.setProperty('--px', `${x}px`);
            glassTarget.style.setProperty('--py', `${y}px`);
            glassTarget.classList.add('is-lit');

            if (state.carrier === 'card') {
              const normX = (x / bounds.width - 0.5) * 2;
              const normY = (y / bounds.height - 0.5) * 2;
              const rotX = -normY * 6;
              const rotY = normX * 6;
              glassTarget.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(8px)`;
            }
          } else {
            glassTarget.classList.remove('is-lit');
            if (state.carrier === 'card') {
              glassTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
            }
          }
        }
      }
      if (displays.lightAngle) {
        displays.lightAngle.textContent = `${state.lightAngle}°`;
      }
      if (sliders.lightAngle && document.activeElement !== sliders.lightAngle) {
        sliders.lightAngle.value = state.lightAngle;
      }
    });

    if (glassTarget) {
      glassTarget.addEventListener('pointerleave', () => {
        glassTarget.classList.remove('is-lit');
        if (state.carrier === 'card') {
          glassTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        }
      });
    }
  }

  // =========================================================================
  // Initialization & Event Binding
  // =========================================================================
  function init() {
    // 1. Gather Elements
    stageBackdrop = document.getElementById('stage-backdrop');
    if (stageBackdrop && WALLPAPERS[state.wallpaper]) {
      stageBackdrop.style.background = WALLPAPERS[state.wallpaper];
    }
    glassTarget = document.getElementById('glass-target');
    cardMetaText = document.getElementById('card-meta-text');
    compassDial = document.getElementById('compass-dial');
    compassNeedle = document.getElementById('compass-needle');
    codeSnippetEl = document.getElementById('code-snippet-pre');
    codeAccordionPanel = document.getElementById('code-accordion-panel');
    foldStatusText = document.getElementById('fold-status-text');
    toastEl = document.getElementById('studio-hud-toast');
    modalOverlay = document.getElementById('modal-spec-overlay');

    // Gather Sliders
    sliders.blur = document.getElementById('sl-blur');
    sliders.saturate = document.getElementById('sl-saturate');
    sliders.brightness = document.getElementById('sl-brightness');
    sliders.contrast = document.getElementById('sl-contrast');
    sliders.fillAlpha = document.getElementById('sl-fill-alpha');
    sliders.rimDepth = document.getElementById('sl-rim-depth');
    sliders.deepBloom = document.getElementById('sl-deep-bloom');
    sliders.lightAngle = document.getElementById('sl-light-angle');
    sliders.conicSpread = document.getElementById('sl-conic-spread');
    sliders.squircleRadius = document.getElementById('sl-squircle-radius');

    // Gather Value Displays
    displays.blur = document.getElementById('val-blur');
    displays.saturate = document.getElementById('val-saturate');
    displays.brightness = document.getElementById('val-brightness');
    displays.contrast = document.getElementById('val-contrast');
    displays.fillAlpha = document.getElementById('val-fill-alpha');
    displays.rimDepth = document.getElementById('val-rim-depth');
    displays.deepBloom = document.getElementById('val-deep-bloom');
    displays.lightAngle = document.getElementById('val-light-angle');
    displays.conicSpread = document.getElementById('val-conic-spread');
    displays.squircleRadius = document.getElementById('val-squircle-radius');

    // 2. Parse URL Hash
    parseHash();

    // Sync active UI buttons with parsed state
    document.querySelectorAll('.preset-chip').forEach((c) => {
      const isMatch = c.dataset.preset === state.preset;
      c.classList.toggle('active', isMatch);
      c.setAttribute('aria-checked', String(isMatch));
    });
    document.querySelectorAll('.carrier-tab-btn').forEach((b) => {
      const isMatch = b.dataset.carrier === state.carrier;
      b.classList.toggle('active', isMatch);
      b.setAttribute('aria-selected', String(isMatch));
    });
    document.querySelectorAll('.mode-btn').forEach((b) => {
      const isMatch = b.dataset.mode === state.engineMode;
      b.classList.toggle('active', isMatch);
    });

    // 3. Bind Material Presets
    document.querySelectorAll('.preset-chip').forEach((card) => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.preset-chip').forEach((c) => {
          c.classList.remove('active');
          c.setAttribute('aria-checked', 'false');
        });
        card.classList.add('active');
        card.setAttribute('aria-checked', 'true');

        const presetKey = card.dataset.preset;
        if (MATERIAL_PRESETS[presetKey]) {
          state.preset = presetKey;
          const p = MATERIAL_PRESETS[presetKey];
          state.blur = p.blur;
          state.saturate = p.saturate;
          state.brightness = p.brightness;
          state.contrast = p.contrast;
          state.fillAlpha = p.fillAlpha;
          state.rimDepth = p.rimDepth;
          state.deepBloom = p.deepBloom;
          state.squircleRadius = p.squircleRadius;
          render();
          showToast(`材质: ${p.nameZh}`);
        }
      });
    });

    // 4. Bind Carrier Tabs (Top bar)
    document.querySelectorAll('.carrier-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.carrier-tab-btn').forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const carrierKey = btn.dataset.carrier;
        state.carrier = carrierKey;

        document.querySelectorAll('.carrier-view').forEach((v) => v.classList.remove('active'));
        const activeView = document.getElementById(`carrier-${carrierKey}`);
        if (activeView) activeView.classList.add('active');

        render();
      });
    });

    // 5. Bind Engine Mode Switcher
    document.querySelectorAll('.mode-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        state.engineMode = btn.dataset.mode;
        render();
        showToast(`模式: Mode ${state.engineMode}`);
      });
    });

    // 6. Bind Wallpaper Swatches
    document.querySelectorAll('.wp-circle-dot').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.wp-circle-dot').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const wallKey = btn.dataset.wall;
        state.wallpaper = wallKey;
        if (stageBackdrop && WALLPAPERS[wallKey]) {
          stageBackdrop.style.background = WALLPAPERS[wallKey];
        }
      });
    });

    // 7. Bind Pointer Track Checkbox
    const chkPointerTrack = document.getElementById('chk-pointer-track');
    if (chkPointerTrack) {
      chkPointerTrack.checked = state.pointerTrack;
      chkPointerTrack.addEventListener('change', () => {
        state.pointerTrack = chkPointerTrack.checked;
      });
    }

    initDraggableCard();

    // 8. Bind Sliders
    if (sliders.blur) sliders.blur.addEventListener('input', (e) => { state.blur = parseInt(e.target.value, 10); render(); });
    if (sliders.saturate) sliders.saturate.addEventListener('input', (e) => { state.saturate = parseInt(e.target.value, 10); render(); });
    if (sliders.brightness) sliders.brightness.addEventListener('input', (e) => { state.brightness = parseFloat(e.target.value); render(); });
    if (sliders.contrast) sliders.contrast.addEventListener('input', (e) => { state.contrast = parseFloat(e.target.value); render(); });
    if (sliders.fillAlpha) sliders.fillAlpha.addEventListener('input', (e) => { state.fillAlpha = parseInt(e.target.value, 10); render(); });
    if (sliders.rimDepth) sliders.rimDepth.addEventListener('input', (e) => { state.rimDepth = parseFloat(e.target.value); render(); });
    if (sliders.deepBloom) sliders.deepBloom.addEventListener('input', (e) => { state.deepBloom = parseInt(e.target.value, 10); render(); });
    if (sliders.lightAngle) sliders.lightAngle.addEventListener('input', (e) => { state.lightAngle = parseInt(e.target.value, 10); render(); });
    if (sliders.conicSpread) sliders.conicSpread.addEventListener('input', (e) => { state.conicSpread = parseInt(e.target.value, 10); render(); });
    if (sliders.squircleRadius) sliders.squircleRadius.addEventListener('input', (e) => { state.squircleRadius = parseInt(e.target.value, 10); render(); });

    // 9. Bind Dimension Inputs with Scroll and Scrub support
    const numW = document.getElementById('num-width');
    const numH = document.getElementById('num-height');
    if (numW) {
      numW.addEventListener('input', (e) => { state.cardWidth = parseInt(e.target.value, 10) || 480; render(); });
      numW.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 10 : -10;
        state.cardWidth = Math.max(180, Math.min(960, state.cardWidth + delta));
        numW.value = state.cardWidth;
        render();
      }, { passive: false });
    }
    if (numH) {
      numH.addEventListener('input', (e) => { state.cardHeight = parseInt(e.target.value, 10) || 320; render(); });
      numH.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 10 : -10;
        state.cardHeight = Math.max(120, Math.min(680, state.cardHeight + delta));
        numH.value = state.cardHeight;
        render();
      }, { passive: false });
    }

    // Drag-to-scrub on labels (Figma / macOS Inspector style)
    const bindScrub = (labelEl, inputEl, key, min, max) => {
      if (!labelEl || !inputEl) return;
      let startX = 0, startVal = 0, dragging = false;
      labelEl.addEventListener('pointerdown', (e) => {
        dragging = true;
        startX = e.clientX;
        startVal = state[key];
        labelEl.setPointerCapture(e.pointerId);
        document.body.style.cursor = 'ew-resize';
      });
      labelEl.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const diff = Math.round((e.clientX - startX) / 2) * 5;
        state[key] = Math.max(min, Math.min(max, startVal + diff));
        inputEl.value = state[key];
        render();
      });
      const endDrag = (e) => {
        if (!dragging) return;
        dragging = false;
        try { labelEl.releasePointerCapture(e.pointerId); } catch (_) {}
        document.body.style.cursor = '';
      };
      labelEl.addEventListener('pointerup', endDrag);
      labelEl.addEventListener('pointercancel', endDrag);
    };
    bindScrub(document.querySelector('label[for="num-width"]'), numW, 'cardWidth', 180, 960);
    bindScrub(document.querySelector('label[for="num-height"]'), numH, 'cardHeight', 120, 680);

    // 10. Bind Accessibility Toggles
    const chkTrans = document.getElementById('chk-test-transparency');
    if (chkTrans) {
      chkTrans.addEventListener('change', () => {
        state.reduceTransparency = chkTrans.checked;
        render();
        showToast(state.reduceTransparency ? '开启 Reduce Transparency' : '关闭 Reduce Transparency');
      });
    }

    const chkMotion = document.getElementById('chk-test-motion');
    if (chkMotion) {
      chkMotion.addEventListener('change', () => {
        state.reduceMotion = chkMotion.checked;
        render();
        showToast(state.reduceMotion ? '开启 Reduce Motion' : '关闭 Reduce Motion');
      });
    }

    // 11. Topbar Reset Button
    const btnReset = document.getElementById('btn-reset');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        const def = MATERIAL_PRESETS.clear;
        state.preset = 'clear';
        state.blur = def.blur;
        state.saturate = def.saturate;
        state.brightness = def.brightness;
        state.contrast = def.contrast;
        state.fillAlpha = def.fillAlpha;
        state.rimDepth = def.rimDepth;
        state.deepBloom = def.deepBloom;
        state.squircleRadius = def.squircleRadius;
        state.cardWidth = 480;
        state.cardHeight = 320;
        state.lightAngle = 145;
        state.engineMode = 'A';
        state.reduceTransparency = false;
        state.reduceMotion = false;
        if (chkTrans) chkTrans.checked = false;
        if (chkMotion) chkMotion.checked = false;

        document.querySelectorAll('.preset-chip').forEach((c) => {
          c.classList.toggle('active', c.dataset.preset === 'prismatic');
        });
        document.querySelectorAll('.mode-btn').forEach((b) => {
          b.classList.toggle('active', b.dataset.mode === 'A');
        });
        render();
        showToast('已重置默认');
      });
    }

    // 12. Modal Open/Close
    const btnOpenDoc = document.getElementById('btn-doc');
    const btnCloseModal = document.getElementById('btn-close-modal');

    if (btnOpenDoc && modalOverlay) {
      btnOpenDoc.addEventListener('click', () => modalOverlay.classList.add('open'));
    }
    if (btnCloseModal && modalOverlay) {
      btnCloseModal.addEventListener('click', () => modalOverlay.classList.remove('open'));
    }
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.classList.remove('open');
      });
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
        modalOverlay.classList.remove('open');
      }
    });

    // 13. Code Accordion Fold/Unfold Toggle (折叠面板)
    codeAccordionPanel = document.getElementById('code-accordion-panel');
    foldStatusText = document.getElementById('fold-status-text') || document.getElementById('code-fold-text');
    const foldToggleBtn = document.getElementById('btn-fold-chevron') || document.getElementById('btn-toggle-code-fold-action');
    const foldLabelBtn = document.getElementById('btn-toggle-code-fold') || document.getElementById('code-panel-label-badge');

    const toggleAccordion = () => {
      state.codePanelExpanded = !state.codePanelExpanded;
      if (codeAccordionPanel) {
        codeAccordionPanel.classList.toggle('expanded', state.codePanelExpanded);
      }
      if (foldStatusText) {
        foldStatusText.textContent = state.codePanelExpanded ? '收起' : '展开';
      }
    };

    if (foldToggleBtn) foldToggleBtn.addEventListener('click', toggleAccordion);
    if (foldLabelBtn) foldLabelBtn.addEventListener('click', toggleAccordion);

    // 14. Code Format Switcher (CSS, Tailwind, React, Vue, Tokens)
    document.querySelectorAll('.format-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.format-tab-btn').forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        state.codeFormat = btn.dataset.format;

        // Auto expand if currently collapsed
        if (!state.codePanelExpanded) {
          state.codePanelExpanded = true;
          if (codeAccordionPanel) codeAccordionPanel.classList.add('expanded');
          if (foldStatusText) foldStatusText.textContent = '收起';
        }
        render();
      });
    });

    // 15. Copy Code Button with Instant Visual Feedback
    const copyBtn = document.getElementById('btn-copy-code');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (!codeSnippetEl) return;
        navigator.clipboard.writeText(codeSnippetEl.textContent).then(() => {
          const originalHTML = copyBtn.innerHTML;
          copyBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>已复制</span>`;
          copyBtn.style.background = 'var(--accent-green)';
          showToast('代码已复制到剪贴板');
          setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.background = '';
          }, 1800);
        });
      });
    }

    // 16. Share URL Button with Instant Visual Feedback
    const shareBtn = document.getElementById('btn-share');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        updateHash();
        navigator.clipboard.writeText(window.location.href).then(() => {
          const originalHTML = shareBtn.innerHTML;
          shareBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>已复制</span>`;
          shareBtn.style.background = 'var(--accent-green)';
          showToast('配置链接已复制');
          setTimeout(() => {
            shareBtn.innerHTML = originalHTML;
            shareBtn.style.background = '';
          }, 1800);
        });
      });
    }

    // 17. Sub-carriers click interaction
    document.querySelectorAll('.seg-item-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.seg-item-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    initCompassDial();

    // 18. Window Resize Listener for Responsive Tuning
    window.addEventListener('resize', () => {
      render();
    });

    // 19. Initial Render
    render();
  }

  // Toast Helper
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  // Window hash listener
  window.addEventListener('hashchange', () => {
    parseHash();
    render();
  });

  // DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
