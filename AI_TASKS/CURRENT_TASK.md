# CURRENT_TASK：当前任务

## 任务名称

v0.3.1 / Playtest 修正版

---

## 背景

本轮按 `AI_TASKS/NEXT_CODEX_PROMPT.md` 执行 v0.3.1 Playtest 修正版要求。目标是修复部署路径、补充 Web Demo README、强化可读性、降低首局压力、增强 smoke test，并保持核心设计不变。

---

## 本任务服务的 Demo 目标

- [x] 核心玩法
- [x] UI 流程
- [x] 视觉表现
- [x] 数值验证
- [x] 工程基础

---

## 范围

本轮只做：

- 复核 `Builds/web-demo/game.js` 配置路径为相对路径；
- 保留 `DEFAULT_CONFIG` fallback，确保直接打开 HTML 时仍可运行；
- 确认 `Builds/web-demo/README.md` 已补充 v0.3.1 试玩说明；
- 补齐新手目标提示文案，使其聚焦“探索森林 → 投金币 → 工人清理 → 边界扩大”；
- 确认可互动对象、建筑节点、已清理区域和普通森林的可读性；
- 确认首局压力已降低；
- 确认 smoke test 覆盖 README、配置路径、单金币经济、HTML 引用和服务脚本；
- 更新 `AI_TASKS/CHANGELOG.md` 和 `AI_TASKS/DEV_LOG.md`。

---

## 保留说明

此前用户明确要求的 Console 与镜头缩放调试入口继续保留；本轮不新增其功能，也不把它作为最终游戏菜单。

---

## 不做

本轮明确不做：

- 不新增多资源；
- 不新增自由建造；
- 不新增复杂科技树；
- 不新增大规模战争；
- 不新增 RTS 框选；
- 不引入 React、Phaser、Three.js 或 npm 依赖；
- 不修改 `DESIGN_HUB/09_DECISIONS.md`；
- 不修改 `AI_RULES/`；
- 不把 Web Demo 宣称为最终游戏；
- 不移除 Godot 作为 Demo 阶段主引擎的长期决策；
- 不新增大型系统或复杂菜单。

---

## 允许修改的文件

- `Builds/web-demo/`
- `Data/config/web_demo_balance.json`
- `Tools/web-demo-server.mjs`
- `Tests/web-demo-smoke.mjs`
- `AI_TASKS/CURRENT_TASK.md`
- `AI_TASKS/CHANGELOG.md`
- `AI_TASKS/DEV_LOG.md`

---

## 禁止修改的文件

- `DESIGN_HUB/09_DECISIONS.md`
- `AI_RULES/`
- `project.godot`
- 核心主场景
- 核心 Autoload 配置

---

## 设计约束

- 探索优先，建造和扩张服务探索；
- 玩家只控制一个主角；
- 村民自动执行命令；
- 只有金币一种资源；
- 建筑只能在固定节点建造；
- 砍树作用是扩大王国控制范围，不产出木材；
- 夜晚防御是扩张压力反馈，不是主玩法；
- 画面优先保证可读性。

---

## 验收标准

- [x] `node --check Builds/web-demo/game.js` 通过；
- [x] `node --check Tools/web-demo-server.mjs` 通过；
- [x] `node Tests/web-demo-smoke.mjs` 通过；
- [x] `http://127.0.0.1:4173/Builds/web-demo/` 可以试玩；
- [x] 玩家能更清楚地区分主角、可砍树、普通森林、建筑节点和已清理区域；
- [x] 首局不会因为夜晚过快或怪物过强而快速失败；
- [x] 画面仍然只显示金币一种资源；
- [x] 没有新增复杂菜单或大型系统。

---

## 试玩地址

```text
http://127.0.0.1:4173/Builds/web-demo/
```
