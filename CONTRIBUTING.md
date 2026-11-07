# Contributing to Apple Liquid Glass Studio

感谢你对 **Apple Liquid Glass Studio** 的关注与贡献。本项目旨在为现代 Web 与应用开发者提供严格遵循 Apple HIG（人机交互指南）及 WWDC25 官方标准的液态玻璃物理光学实现方案。

为了维护代码质量与规范统一，请在提交代码前仔细阅读以下指引。

---

## 规范与工程原则

1. **零位移内阴影体系 (Zero Layout Shift)**
   - 严禁在玻璃表面使用传统的 CSS `border: 1px solid ...`，因其破坏像素栅格对齐并引起布局挤压抖动。
   - 所有边缘高光、反弹光与次表面散射，均必须通过精确计算的 4 层 `inset box-shadow` 实现。
2. **三步调平校准法则 (Luminosity Re-leveling)**
   - 标准公式：`-webkit-backdrop-filter: blur(24px) saturate(180%) brightness(1.06) contrast(1.04);`
   - 任何新增材质均须遵循高斯模糊后的饱和度补正与暗部通透度提升，严禁出现发灰、发奶或死黑。
3. **无障碍与边界保护 (Accessibility & WCAG 2.2)**
   - 严格适配 `prefers-reduced-transparency: reduce` 媒体查询，自动切换为高对比度非通透底色。
   - 严格适配 `prefers-reduced-motion: reduce`，禁用 360° 环形光刃高频指针位移追踪。
4. **轻量与零依赖**
   - 核心系统必须保持纯静态原生（Vanilla ES6+ / CSS3），无需构建脚本（Zero Build Step），直接可由 GitHub Pages 托管。

---

## 本地开发与测试

1. **克隆仓库**
   ```bash
   git clone https://github.com/apple-liquid-glass/liquid-glass-studio.git
   cd liquid-glass-studio
   ```

2. **本地启动**
   项目为纯静态工程，任何静态 HTTP 服务器均可使用：
   ```bash
   # 使用 Python 启动
   python -m http.server 8080

   # 或使用 Node npx
   npx serve .
   ```
   浏览器打开 `http://localhost:8080` 即可调试。

3. **运行 CI 完整性校验**
   本地执行以下验证脚本，确保文件编码均为 UTF-8 且无死链：
   ```bash
   python -c "
   import os, sys
   for root, _, files in os.walk('.'):
       if '.git' in root: continue
       for f in files:
           if f.endswith(('.html', '.js', '.css', '.md', '.json', '.xml', '.yml', '.webmanifest')):
               with open(os.path.join(root, f), 'r', encoding='utf-8') as fp:
                   fp.read()
   print('All files UTF-8 verified.')
   "
   ```

---

## 提交 Pull Request 流程

1. 从 `main` 分支检出功能分支：`git checkout -b feature/your-feature-name`
2. 保持原子提交，Commit Message 建议遵循 Conventional Commits：
   - `feat: add dynamic island call response state`
   - `fix: correct specular highlight conic gradient falloff`
   - `docs: update HIG optical calibration reference`
3. 确保 `.github/workflows/ci.yml` 检查全部通过。
4. 在 GitHub 提交 PR 并详细填写 PR 模板中的各项检查项。
