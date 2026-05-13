# DEV_LOG：开发过程记录

## 2026-05-13 / v0.0 项目重定向版

### 本轮目标

由 ChatGPT 直接执行 v0.0，将仓库从旧 `kingdom-like` 玩法方向重定向为 `shiren-like`。

---

### 执行背景

人类制作人明确说明：仓库内现有内容属于另一款游戏。现在要以该仓库的结构和 AI 协作流程为基础，制作一款类《风来的西林》/ Mystery Dungeon Roguelike 游戏。

因此，本轮不继续修复旧 Web Demo 的金币、砍树、建墙、建塔、夜晚防守等逻辑，而是先完成项目方向重定向。

---

### 执行过程

- 读取旧 README 和任务提示词，确认仓库仍保存 kingdom-like 项目描述；
- 保留 `DESIGN_HUB / AI_RULES / AI_TASKS / Data / Builds / Tools / Tests` 的组织方式；
- 将 README 项目名和一句话描述改为 `shiren-like`；
- 将 DESIGN_HUB 核心文档替换为 Mystery Dungeon Roguelike 方向；
- 更新已确认决策，记录项目正式从 kingdom-like 重定向为 shiren-like；
- 将待决策问题整理为 v0.1 开发前需要确认的技术和体验问题；
- 更新 Demo 范围，明确 v0.0～v2.x 的版本路线；
- 更新当前任务和变更记录；
- 将 Web Demo README 标记为旧占位内容；
- 调整 smoke test，使其检查文档重定向结果，而不是旧 kingdom-like 功能；
- 创建 `Docs/Archive/kingdom-like/README.md` 作为旧方向归档说明；
- 将 `AI_TASKS/NEXT_CODEX_PROMPT.md` 更新为下一轮 `Web Demo v0.1 / 最小可玩迷宫版`。

---

### 实现内容

新的项目定位：

```text
一款现代化 Mystery Dungeon Roguelike Demo：玩家在随机迷宫中逐层探索，以回合制格子移动、道具组合、怪物机制、陷阱、饥饿压力和死亡复盘为核心，体验“每一步都是决策”的高密度迷宫冒险。
```

新的 v0.1 最小闭环：

```text
格子迷宫 → 回合制移动 → 怪物追击 → 普通攻击 → 回复药 → 楼梯下楼 → 简单胜负
```

---

### 本轮未实现内容

- 未重写 `Builds/web-demo/game.js`；
- 未实现实际迷宫玩法；
- 未实现随机地图；
- 未实现背包；
- 未实现饥饿；
- 未实现未鉴定、装备、陷阱、怪物屋、壶、商店；
- 未创建 Godot 工程。

---

### 后续注意

下一轮由 Codex 执行：

```text
Web Demo v0.1 / 最小可玩迷宫版
```

建议 Codex 直接重写 `Builds/web-demo/game.js`，保留 Web Demo 的运行方式、样式入口、服务器脚本和 smoke test 思路。

v0.1 不要加入饥饿、完整背包、未鉴定、装备、陷阱、怪物屋、壶、商店和 Godot。