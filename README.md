# Apple Liquid Glass Studio (WWDC25 HIG)

<p align="center">
  <a href="README.md"><strong>简体中文</strong></a> •
  <a href="README_EN.md">English</a> •
  <a href="README_JA.md">日本語</a>
</p>

<p align="center">
  <img src="assets/screenshots/studio-overview.webp" alt="Apple Liquid Glass Studio Overview" width="100%" style="border-radius: 14px; box-shadow: 0 20px 48px rgba(0,0,0,0.6);">
</p>

<p align="center">
  <strong>拒绝浑浊发白，回归极致通透 —— Apple 官方级液态玻璃光学折射引擎与全套设计系统 (WWDC25 HIG)</strong><br>
  98% 纯光透射率 · 真实透镜法线折射 · 零位移四层物理内阴影 · 纯原生零依赖
</p>

<p align="center">
  <a href="https://pandajs404.github.io/liquid-glass/"><img src="https://img.shields.io/badge/Live%20Demo-在线体验工作室-0071e3?style=flat-square&logo=safari&logoColor=white" alt="Live Demo"></a>
  <img src="https://img.shields.io/badge/WWDC25-HIG%20Compliant-ff375f?style=flat-square" alt="WWDC25 HIG">
  <img src="https://img.shields.io/badge/Transmittance-98%25%20Ultra--Clear-30d158?style=flat-square" alt="Transmittance">
  <img src="https://img.shields.io/badge/Refraction-SDF%20Normal%20Field-5e5ce6?style=flat-square" alt="SDF Normal">
  <img src="https://img.shields.io/badge/Layout%20Shift-Zero-30d158?style=flat-square" alt="Zero Layout Shift">
  <img src="https://img.shields.io/badge/Dependencies-0%20(Pure%20Vanilla)-success?style=flat-square" alt="Zero Dependencies">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License MIT">
</p>

---

## 💎 为什么追求“极致通透感”？

传统 Web 界面制作的毛玻璃（Frosted Glass）往往存在严重的光学硬伤：
- ❌ **浑浊白浊（Milky & Foggy）**：粗暴堆叠 20px 以上高斯模糊并覆盖白色半透明蒙层，导致玻璃宛如粗糙的塑料或浴室磨砂白板，背景细节尽失，毫无通透晶莹的光学质感。
- ❌ **死板 1px 实线边框**：使用粗劣的 `border: 1px solid rgba(255,255,255,0.2)`，在玻璃周边形成一层死板发灰的边缘，彻底破坏了真实光学透镜的边缘连续光刃与空间深度。
- ❌ **平面无折射**：背景仅仅被模糊，缺乏光线穿过曲面玻璃透镜时的边缘弯曲与色散效应。

### ✨ 本引擎的通透光学突破

1. 🪞 **98% 高透光率与微距滤波（Micro-Leveling Optics）**  
   出厂标定微距模糊离散（3px ~ 6px），结合激增的微粒色彩饱和（Saturate 145% ~ 175%）与暗部提亮，穿过玻璃的背景排版与光谱几何体依然锐利清晰，杜绝浑浊发白。
2. 🌈 **SDF 透镜法线场与三通道色散（Real Normal Refraction & RGB Dispersion）**  
   基于有向距离场（Signed Distance Field）动态生成透镜凸面法线梯度向量场，驱动 SVG `<feDisplacementMap>` 实现物理级背景边缘弯折与红绿蓝三色散光（Prismatic Dispersion），完美还原苹果官方晶莹透镜质感。
3. 📐 **零位移四层物理内阴影（Zero-Shift 4-Layer Inset Scatter）**  
   彻底摒弃破坏通透感的 1px 死边框，采用倒角主光刃、反向背光、深层体折射流光与环境底光 4 层物理散射内阴影，重排位移为零（Zero Layout Shift）。
4. 🗡️ **360° 锥形动态跟随光刃（Conic Specular Rim）**  
   边缘拟态平滑圆角（Squircle）上的高光倒角依据入射光角动态计算光刃分布，随光标游走如水银泻地，晶莹流转。
5. 🧼 **极致极简布局（Ruthless De-noising）**  
   移除了所有干扰视线的操作标语、次要标签与教程废话，界面自显其意，让用户全神贯注于光与玻璃的折射美学。

---

## 📸 视觉画廊 (Visual Gallery)

> 项目内所有截图均已全面升级为高分辨率、低体积的 **WebP** 格式，加载迅速且细腻晶莹。

### 1. 独立调谐工作台 (Studio & Inspector)
出厂内置高对比度光学折射标定层（Typography Refraction Matrix 与饱和度光谱），支持自由拖拽卡片，实时校验 98% 纯光透射率与边缘色散：
<p align="center">
  <img src="assets/screenshots/studio-overview.webp" alt="Studio Overview" width="94%" style="border-radius: 12px; box-shadow: 0 16px 36px rgba(0,0,0,0.5);">
</p>

### 2. macOS 鱼眼程序坞 (Fisheye Magnification Dock)
真实还原 macOS Dock 物理特性，图标平滑破界向上放大，底部高通透胶囊托盘微距反光：
<p align="center">
  <img src="assets/screenshots/carrier-fisheye-dock.webp" alt="macOS Fisheye Dock" width="94%" style="border-radius: 12px; box-shadow: 0 16px 36px rgba(0,0,0,0.5);">
</p>

### 3. 灵动岛胶囊与 Apple Music 播放器 (Island & Music Widget)
展现极致通透的微距光刃包裹感，支持实时动态音频频谱：
<p align="center">
  <img src="assets/screenshots/carrier-dynamic-island.webp" alt="Dynamic Island" width="46%" style="border-radius: 10px; margin-right: 2%;">
  <img src="assets/screenshots/carrier-music.webp" alt="Music Widget" width="46%" style="border-radius: 10px;">
</p>

### 4. 聚焦搜索框与多态液态按键套件 (Spotlight & Button Suite)
悬浮式通透视窗与物理级触感反馈：
<p align="center">
  <img src="assets/screenshots/carrier-spotlight.webp" alt="Spotlight Search" width="46%" style="border-radius: 10px; margin-right: 2%;">
  <img src="assets/screenshots/carrier-buttons.webp" alt="Liquid Buttons" width="46%" style="border-radius: 10px;">
</p>

---

## 🔬 通透感物理原理与渲染管线

```
┌─────────────────────────────────────────────────────────────┐
│           背景高对比度排版与光谱层 (Background Plate)           │
└──────────────────────────────┬──────────────────────────────┘
                               │ 入射光线穿透
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  1. 98% 纯光微距滤波 (Luminosity Re-leveling)                │
│     • 低离散高斯模糊 (Blur: 3px ~ 6px，拒绝白浊白雾)            │
│     • 色彩纯度激增 (Saturate: 145% ~ 175%，通透晶莹)         │
│     • 暗部通透提亮 (Brightness: 1.05)                        │
│     • 晶体边缘反差 (Contrast: 1.06)                          │
└──────────────────────────────┬──────────────────────────────┘
                               │ 光学折射
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  2. SDF 凸面透镜法线折射与三通道色散 (Optical Refraction)       │
│     • 有向距离场动态计算边缘法线梯度向量                        │
│     • SVG <feDisplacementMap> 驱动边缘背景几何弯曲           │
│     • RGB 三通道分离呈现彩虹色散光刃                            │
└──────────────────────────────┬──────────────────────────────┘
                               │ 边缘光刃成型
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  3. 零位移四层物理内阴影 (Zero-Shift Inset Scatter)          │
│     • 倒角主光刃 (Specular Rim Inset: 1.5px @ 75% Alpha)     │
│     • 反向弱光背刃 (Secondary Bounce Inset: 1.5px @ 15% Alpha) │
│     • 深层体折射流光 (Deep Volume Bloom: 10px ~ 18px Inset)    │
│     • 零接触悬浮投影 (Drop Shadow: 0 24px 50px)              │
│     • 彻底弃用破坏通透感的 1px 实线死边框                     │
└──────────────────────────────┬──────────────────────────────┘
                               │ 光照流转
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  4. 360° 锥形动态跟随光刃 (Conic Rim Specular Glint)         │
│     • 动态光角追踪 + 指针跟随环切遮罩，随视线游走流转          │
└─────────────────────────────────────────────────────────────┘
```

---

## 💎 官方 6 大物理材质体系

| 预设材质 | 典型应用场景 | 模糊度 | 基底透光 | 饱和度 | 边缘反差 | 通透特性与光学描述 |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Clear 纯透** | 晶透厚板、取景视窗、精密透镜 | `4px` | `4%` | `150%` | `1.08` | **极高通透感**，底层文字锐利可辨，边缘法线折射晶莹剔透 |
| **Prismatic 厚棱镜** | 核心卡片、控制中心、浮岛视窗 | `5px` | `8%` | `175%` | `1.06` | **经典 Apple HIG 棱镜**，高透光率与三通道彩虹色散光刃 |
| **Satin 烟雾** | 侧边栏抽屉、设置面板、模态底板 | `18px` | `14%` | `160%` | `1.03` | 细腻柔润的亚克力微雾质感，透光的同时兼顾超高文字可读性 |
| **Tinted 柔彩** | 聚焦状态、多媒体面板、沉浸式卡片 | `8px` | `10%` | `210%` | `1.05` | 双向环境光混色，吸收背景色彩动态晕染，通透不浑浊 |
| **Obsidian 黑曜** | 沉浸式暗色 HUD、音频仪表盘 | `6px` | `32%` | `130%` | `1.10` | 深空灰至纯黑吸收体，高反差金色/白金边缘切面光刃 |
| **Gel 凝胶** | 弹性按键、浮动指示气泡 | `8px` | `12%` | `195%` | `1.04` | 具有表面张力感的厚质感晶莹流体，向中心轻微聚光 |

---

## 🧩 全套 7 大 HIG 核心交互载体

1. **主玻璃卡片 (Master Glass Card)**：具备 98% 纯光透射率的悬浮厚板，支持全屏自由平滑拖拽校验底层背景折射。
2. **macOS 鱼眼程序坞 (Fisheye Magnification Dock)**：完整支持平滑向上破界弹出的鱼眼缩放与底部贴合物理特性。
3. **灵动岛胶囊 (Dynamic Island)**：集成实时动态音频波形与系统级状态微交互。
4. **聚焦搜索框 (Spotlight Search Hub)**：通透悬浮的全局指令搜索面板，键盘一触即达。
5. **分段选择控制器 (Segmented Controls)**：平滑液态滑块，带弹性阻尼与触感回馈。
6. **多态液态按键套件 (Multi-state Liquid Button Suite)**：支持普通、聚焦、按下多物理态形变的微光按键。
7. **Apple Music 正在播放卡片 (Now Playing Live Waveform)**：沉浸式多媒体流光玻璃卡片。

---

## ⚡ 极速上手 (Quick Start)

### 1. 本地免安装运行
本项目基于纯原生 Web 标准构建，**零外部构建工具、零 NPM 依赖**，下载即用：

```bash
# 1. 克隆仓库
git clone git@github.com:pandaJS404/liquid-glass.git
cd liquid-glass

# 2. 方式一：直接在浏览器双击打开 index.html
open index.html

# 3. 方式二：使用 Python 启动本地测试服务（推荐，支持全功能 SVG 折射）
python -m http.server 8088
# 浏览器访问 http://localhost:8088/ 查看独立可视化工作室
```

### 2. 在您项目中直接使用纯透核心 CSS
彻底告别 `border` 带来的发灰浑浊边线，使用纯透物理内阴影公式：

```css
.liquid-glass-translucent {
  width: 480px;
  height: 320px;
  border-radius: 28px;
  border: none; /* 拒绝 1px 灰色死线，维持纯粹通透 */
  
  /* 98% 纯透三步微距滤波 */
  background: rgba(255, 255, 255, 0.04);
  -webkit-backdrop-filter: blur(4px) saturate(150%) brightness(1.05) contrast(1.06);
  backdrop-filter: blur(4px) saturate(150%) brightness(1.05) contrast(1.06);
  
  /* 零位移四层物理晶体散射内阴影 */
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

## 🔗 URL Hash 状态深链接协议

工作台支持将所有光学通透度参数双向序列化至 URL Hash 中，便于在设计规范、团队协作中直接共享特定光学方案：

```text
https://pandajs404.github.io/liquid-glass/#mat=clear&comp=card&blur=4&sat=150&bright=1.05&contrast=1.06&fill=4&rim=1.8&bloom=18&angle=145&spread=60&w=480&h=320&r=28
```

输入或分享包含该 Hash 的链接，即可 100% 还原调校现场。

---

## 🌐 浏览器兼容性与渐进增强

| 光学与交互特性 | Chrome / Edge (Chromium) | Safari (WebKit) | Firefox (Gecko) |
| :--- | :---: | :---: | :---: |
| **98% 纯透微距滤波** | ✅ 完美支持 | ✅ 完美支持 | ✅ 完美支持 |
| **四层散射无边框内阴影** | ✅ 完美支持 | ✅ 完美支持 | ✅ 完美支持 |
| **动态锥形光刃游走** | ✅ 完美支持 | ✅ 完美支持 | ✅ 完美支持 |
| **SVG 法线折射与三通道色散** | ✅ 原生支持 | ⚡ 自动优雅回退至物理散射 | ⚡ 自动优雅回退至物理散射 |
| **无障碍高反差降级防护** | ✅ WCAG 2.2 AA | ✅ WCAG 2.2 AA | ✅ WCAG 2.2 AA |

---

## 📄 开源许可证 (License)

本项目采用 [MIT License](LICENSE) 许可协议，欢迎自由商用与个人学习。

Designed with ❤️ to celebrate the purest optical translucency of Apple Human Interface Guidelines.
