# SPRINT-001: User Love v1.1 — July Current Focus

Status: Active

Related Spec:
- product/specs/active/SPEC-001-user-love.md

## Sprint Goal

让用户打开交易日历后，在首屏快速理解：

1. 当前查看的交易周期
2. 今天的交易状态
3. 本月核心交易姿态
4. 最佳交易窗口
5. 高风险日期
6. 下一步应该查看什么

## Product Decisions

- 月度摘要允许根据现有已批准字段生成。
- 首屏新增独立 `CurrentFocusPanel`。
- 当前日期不在已注册计划范围内时，展示最近一期计划并明确提示。
- 用户手动切换到不包含今天的月份时，显示“今天不在当前所选交易周期内”。
- 导出仅增加生成中、被拦截和失败反馈，不增加虚假的导出成功状态。

## Phase 1 — Core Current-Month Experience

Priority: P0

- [x] 移除写死的 `TODAY_STR`
- [x] 使用用户设备真实本地日期
- [x] 根据本地日期自动匹配默认交易计划
- [x] 保留用户手动切换月份的能力
- [x] 增加无匹配周期时的兜底逻辑和提示
- [x] 新增 `CurrentFocusPanel`
- [x] 展示当前月份、日期范围和月令干支
- [x] 展示今日/当前重点
- [x] 展示月度核心摘要
- [x] 增加“查看今日 / 最佳窗口 / 风险日”快捷入口
- [x] 点击快捷入口可滚动到对应区域
- [x] 增强当前选中月份的视觉反馈

## Phase 2 — Mobile and Interaction Improvements

Priority: P1

- [x] 移动端无需 hover 即可查看信号解释
- [x] 增加移动端横向滚动提示
- [x] 检查月份选择器在 H5 的可发现性
- [x] 优化风险日和最佳窗口在移动端的扫描效率
- [x] 统一月份切换反馈
- [x] 优化弹窗打开和关闭反馈
- [x] 优化导出生成中状态
- [x] 优化导出弹窗被拦截后的恢复提示
- [x] 检查中英文新增文案
- [x] 检查 7 月和 8 月英文内容是否仍回退为中文

## Non-Goals

- 不修改任何交易日数据
- 不修改干支
- 不修改信号分类
- 不新增月份
- 不增加数据库
- 不增加登录
- 不增加实时行情
- 不重构整个应用架构
- 不删除现有导出功能

## Acceptance Criteria

- [x] 2026-07-10 打开页面时，默认选中 `july-2026`
- [x] 当前日期不再依赖写死的 2026-05-12
- [x] 用户手动切换到 5 月或 8 月后，选择不会立刻被自动覆盖
- [x] 今天不在所选周期时，界面显示明确提示
- [x] 用户在首屏可以看到当前月份、日期范围和月令干支
- [x] 用户在首屏可以看到今日重点
- [x] 用户在首屏可以进入最佳窗口和风险日
- [x] 7 月现有交易数据与分类完全不变
- [x] 5 月、7 月、8 月仍可选择
- [x] 移动端不依赖 hover 理解信号
- [x] 中英文模式均可使用
- [ ] 当前月份导出功能正常
- [x] TypeScript 检查通过
- [x] Production build 通过
- [ ] 浏览器控制台无新增错误

## Validation

- [x] npm run lint
- [x] npm run build
- [x] Desktop viewport check
- [x] Mobile viewport check
- [ ] May regression check
- [x] July current-date check
- [ ] August switching check
- [x] Chinese locale check
- [x] English locale check
- [ ] Export check

## Validation Notes

- 2026-07-10: `npm run lint` passed with existing unused-variable warnings in `components/dashboard/EventPanel.tsx`, `components/dashboard/Sidebar.tsx`, and `types/dom-to-image-more.d.ts`.
- 2026-07-10: `npx tsc --noEmit` passed.
- 2026-07-10: `npm run build` passed.
- 2026-07-10: `curl -I http://localhost:3000/` returned HTTP 200 from the running Next.js dev server.
- 2026-07-10: A second `npm run dev` attempt exited because an existing Next.js dev server was already running for this repository on port 3000.
- 2026-07-10: Safari DOM automation was blocked because Safari requires "Allow JavaScript from Apple Events" to use `do JavaScript`.
- 2026-07-10: Safari GUI event automation was blocked because `osascript` does not have assistive access.
- 2026-07-10: Desktop viewport visual check passed via Safari screenshot at approximately 1440px width. The first screen showed July 2026, `乙未月`, selected-month feedback, today focus, risk reminder, quick actions, and monthly overview without visible overlap.
- 2026-07-10: Mobile/narrow viewport visual check passed via Safari screenshot at approximately 420px width. The first screen showed the month selector, profile badges strip, current focus, today card, risk card, summary chips, and quick actions without visible overlap.
- 2026-07-10: July current-date visual check passed in Safari. The page showed `7/10 · 乙酉 · 顺势日` for today's focus with the selected July 2026 plan.
- 2026-07-10: May regression, August switching, export popup/print, and full browser-console checks remain blocked by missing browser automation access.
