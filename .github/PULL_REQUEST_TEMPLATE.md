## 变更概述 (PR Description)
简要说明本次 Pull Request 所做的修改内容与目标。

## 关联 Issue
Fixes #

## HIG 规范与渲染原则检查 (Checklist)
提交 PR 前请务必确认以下各项符合规范：
- [ ] **零位移内阴影 (Zero Layout Shift)**：严禁使用 `border: 1px solid` 改变盒模型，均采用 4 层物理散射 `inset box-shadow` 实现。
- [ ] **三步调平校准**：`backdrop-filter` 必须遵守 `blur() saturate(180%) brightness(1.06) contrast(1.04)` 光学补偿公式，杜绝发灰发奶。
- [ ] **无障碍降级保护**：支持 `prefers-reduced-transparency`（高对比度不透明底）与 `prefers-reduced-motion`（禁用高频光刃监听）。
- [ ] **纯离线运行与零第三方依赖**：纯原生 HTML5 / CSS3 / ES6 实现，不引入外部 CDN 或重型运行时。
- [ ] **跨浏览器兼容验证**：在 Chrome / Edge、Safari（WebKit 前缀兼容）及 Firefox（降级回退）通过测试。
- [ ] **文档与链接完整性**：未引入死链，中文排版规范，无营销空话。

## 测试与截图说明
请附上修改前后的对比截图或动图（若涉及界面或光学参数修改）。
