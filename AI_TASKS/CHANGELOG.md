# CHANGELOG

## 2026-05-13 / v0.0 / 项目重定向版

### 本轮目标

将项目从旧 `kingdom-like` 轻策略探索建造方向重定向为 `shiren-like`：一款现代化 Mystery Dungeon Roguelike Demo。

---

### 已完成

- [x] 更新 `README.md`，将项目名和项目定位改为 `shiren-like`；
- [x] 更新 `DESIGN_HUB/01_PROJECT_BRIEF.md`，明确项目类型为 Mystery Dungeon / Traditional Roguelike / 回合制格子迷宫；
- [x] 更新 `DESIGN_HUB/02_CORE_GAMEPLAY.md`，明确核心循环为迷宫探索、回合制、怪物、道具、楼梯与死亡复盘；
- [x] 更新 `DESIGN_HUB/03_PLAYER_EXPERIENCE.md`，明确高密度决策、道具解局、死亡可复盘等目标体验；
- [x] 更新 `DESIGN_HUB/04_SYSTEM_OVERVIEW.md`，改为回合、地图、移动、战斗、怪物、道具、背包、饥饿、陷阱、UI、死亡复盘等系统；
- [x] 更新 `DESIGN_HUB/05_ECONOMY_AND_BALANCE.md`，移除金币建造经济，改为 HP、楼层、道具、背包、饥饿、回合数等资源压力；
- [x] 更新 `DESIGN_HUB/06_CONTENT_PLAN.md`，制定 v0.1 到 v0.7 的内容计划；
- [x] 更新 `DESIGN_HUB/07_ART_AND_AUDIO_DIRECTION.md`，明确格子、主角、怪物、道具、楼梯的可读性优先；
- [x] 更新 `DESIGN_HUB/08_UX_FLOW.md`，明确移动、攻击、道具、下楼、死亡结算流程；
- [x] 更新 `DESIGN_HUB/09_DECISIONS.md`，记录项目重定向、先 Web Demo、v0.1 最小闭环等决策；
- [x] 更新 `DESIGN_HUB/10_OPEN_QUESTIONS.md`，记录 v0.1 视角、重写方式、地图生成、饥饿和背包时机等待决策问题；
- [x] 更新 `DESIGN_HUB/12_DEMO_SCOPE.md`，明确 v0.0～v2.x 版本路线；
- [x] 更新 `AI_TASKS/CURRENT_TASK.md`；
- [x] 更新 `AI_TASKS/DEV_LOG.md`；
- [x] 更新 `AI_TASKS/NEXT_CODEX_PROMPT.md` 为下一轮 `Web Demo v0.1 / 最小可玩迷宫版`；
- [x] 更新 `Builds/web-demo/README.md`，标明当前 Web Demo 仍是旧占位，v0.1 将重写；
- [x] 更新 `Tests/web-demo-smoke.mjs`，让 smoke test 适配 v0.0 文档重定向阶段；
- [x] 新增 `Docs/Archive/kingdom-like/README.md`，记录旧项目方向已归档。

---

### 本轮未做

- [ ] 未实现 v0.1 玩法；
- [ ] 未重写 `Builds/web-demo/game.js`；
- [ ] 未实现随机迷宫；
- [ ] 未实现背包；
- [ ] 未实现饥饿；
- [ ] 未实现未鉴定、装备、陷阱、怪物屋、壶、商店；
- [ ] 未创建 Godot 工程；
- [ ] 未制作最终美术。

---

### 下一轮任务

```text
Web Demo v0.1 / 最小可玩迷宫版
```

下一轮由 Codex 执行，目标是重写 Web Demo，完成格子迷宫、回合制移动、1 种怪物、普通攻击、1 种回复药、楼梯、HP、楼层、日志、3 层胜利和 HP 为 0 失败。

---

## 历史说明

本仓库在 2026-05-13 前曾用于 `kingdom-like` 轻策略探索建造 Demo。自 v0.0 起，项目方向已重定向为 `shiren-like`。旧方向记录保留在 Git 历史和 `Docs/Archive/kingdom-like/README.md` 中。