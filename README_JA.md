# Apple Liquid Glass Studio (WWDC25 HIG)

<p align="center">
  <a href="README.md">简体中文</a> •
  <a href="README_EN.md">English</a> •
  <a href="README_JA.md"><strong>日本語</strong></a>
</p>

<p align="center">
  <img src="assets/screenshots/studio-overview.png" alt="Apple Liquid Glass Studio" width="100%" style="border-radius: 14px; box-shadow: 0 16px 40px rgba(0,0,0,0.5);">
</p>

<p align="center">
  <strong>Apple Liquid Glass（WWDC25 HIG準拠）デザインシステム＆光学屈折エンジン。レイアウトシフトゼロの4層物理散乱インセットシャドウ、実時間透鏡屈折、およびリアルタイムコード生成器（Native CSS / Tailwind CSS / React JSX / Vue 3）。</strong>
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

## 🌟 主な特長 (Key Highlights)

- 🪞 **リアルな光学法線屈折エンジン**：符号付き距離場（Signed Distance Field, SDF）に基づき、エッジ法線ベクトルテクスチャをリアルタイム生成。Chromium環境ではSVG `<feDisplacementMap>` により波長色散乱と背景の屈折歪みを忠実に再現。SafariおよびFirefoxでは4層の光散乱フォールバックへ自動移行します。
- 📐 **ゼロ・レイアウトシフト（4層インセットシャドウ）**：リフローや再描画を誘発しやすい従来の `border` を完全排除。4階層の物理散乱 `box-shadow: inset` を採用し、面取りハイライト、深層ボリュームブルーム、環境光を完全統合。1pxのズレも発生しません。
- 🎨 **公式6大物理マテリアルシステム**：**Clear（純透）**、**Prismatic（厚角プリズム）**、**Satin（スモーク）**、**Tinted（カラー）**、**Obsidian（黒曜石）**、**Gel（ジェル）** をプリセット提供。
- 🧩 **完全網羅された7つのApple HIGキャリア**：
  1. **マスターグラスカード**（Master Glass Card）
  2. **macOS 魚眼拡大Dock**（macOS Fisheye Dock）
  3. **Dynamic Island**（ライブアクティビティカプセル）
  4. **Spotlight 検索ハブ**（Spotlight Search Hub）
  5. **セグメントコントロール**（Segmented Controls）
  6. **マルチステート・リキッドボタンスイート**（Liquid Button Suite）
  7. **Apple Music 再生ウィジェット**（Now Playing Live Widget）
- ⚡ **マルチフレームワーク・コード自動生成**：調整したパラメータを **Native CSS**、**Tailwind CSS**、**React JSX**、**Vue 3**、**Design Tokens (JSON)** としてワンクリックで即座に出力。
- 🌐 **100% オフライン＆ゼロ依存関係**：純粋なHTML5 / CSS3 / ES Modulesで構築。外部ビルドツールやCDNスクリプトは一切不要です。
- ♿ **WCAG 2.2 AA アクセシビリティ対応**：`prefers-reduced-transparency`（高コントラスト不透明フォールバック）および `prefers-reduced-motion`（モーション軽減）を完全シミュレーション。

---

## 📸 ビジュアルギャラリー (Visual Gallery)

### 1. スタジオ＆インスペクター (Studio & Inspector)
ブラー分散、彩度、明度、コントラスト、角丸率をリアルタイムで精密に微調整可能：
<p align="center">
  <img src="assets/screenshots/studio-overview.png" alt="Studio Overview" width="92%" style="border-radius: 10px;">
</p>

### 2. macOS 魚眼拡大Dock (Fisheye Dock)
ホバー時にアイコンが滑らかに浮き上がり、底面と接地するリアルな物理特性を再現：
<p align="center">
  <img src="assets/screenshots/carrier-fisheye-dock.png" alt="macOS Fisheye Dock" width="92%" style="border-radius: 10px;">
</p>

### 3. Dynamic Island ＆ 音楽ストリーミングコンポーネント
<p align="center">
  <img src="assets/screenshots/carrier-dynamic-island.png" alt="Dynamic Island" width="45%" style="border-radius: 10px; margin-right: 2%;">
  <img src="assets/screenshots/carrier-music.png" alt="Music Widget" width="45%" style="border-radius: 10px;">
</p>

---

## 💎 公式マテリアル・プリセット一覧

| プリセット | 主な用途 | ブラー | 透過度 | 彩度 | コントラスト | 特徴 |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Clear 純透** | クリスタル板、ルーペ、ビューポート | `4px` | `4%` | `140%` | `1.08` | 極めて高い透明度。背景の文字が鮮明に見え、縁が美しく屈折 |
| **Prismatic 厚角プリズム** | システムカード、コントロールセンター | `16px` | `8%` | `180%` | `1.06` | WWDC25の重厚感あるプリズム反射と柔らかな色散乱 |
| **Satin スモーク** | サイドバー、設定パネル、モーダル | `28px` | `16%` | `160%` | `1.02` | シルクのように滑らかで文字の可読性が最も高いすりガラス |
| **Tinted カラー** | フォーカス状態、メディアカード | `22px` | `12%` | `210%` | `1.05` | 背景のキーカラーを吸収して発光するホログラフィック効果 |
| **Obsidian 黒曜石** | ダークHUD、プロ用オーディオ操作盤 | `24px` | `40%` | `130%` | `1.10` | スペースブラックの重厚な光吸収体と白金ハイライト |
| **Gel ジェル** | アクションボタン、インジケーター | `14px` | `14%` | `195%` | `1.03` | 表面張力を持った流体マテリアル |

---

## 🚀 クイックスタート (Quick Start)

### 1. ローカルでのプレビュー
ビルド環境の構築は不要です：

```bash
# リポジトリをクローン
git clone git@github.com:pandaJS404/liquid-glass.git
cd liquid-glass

# 方法1：ブラウザで index.html を直接ダブルクリックして開く
open index.html

# 方法2：ローカルHTTPサーバーを起動（推奨）
python -m http.server 8088
# ブラウザで http://localhost:8088/ にアクセス
```

### 2. 自身のプロジェクトへの導入
生成されたCSSクラスをそのまま適用できます：

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

## 🔗 URL Hash 状態共有プロトコル

すべての調整値はURL Hashとしてシリアライズされ、チーム間で簡単にデザイン共有を行えます：

```text
#mat=clear&comp=card&blur=4&sat=140&bright=1.06&contrast=1.08&fill=4&rim=1.8&bloom=18&angle=145&spread=60&w=480&h=320&r=28
```

---

## 📄 ライセンス (License)

本プロジェクトは [MIT License](LICENSE) の下で公開されています。

Designed with ❤️ to celebrate the timeless elegance of Apple Human Interface Guidelines.
