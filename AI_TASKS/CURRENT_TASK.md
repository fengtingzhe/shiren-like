# CURRENT_TASK：当前任务

## 任务名称

v0.0 / 项目重定向版

---

## 背景

当前仓库原本保存的是 `kingdom-like` 轻策略探索建造 Demo 的文档、Web Demo 和 AI 协作流程。

人类制作人已经明确决定：以现有仓库结构为基础，停止继续开发旧的 kingdom-like 方向，转为制作一款类《风来的西林》/ Mystery Dungeon Roguelike 游戏，即 `shiren-like`。

---

## 本任务服务的 Demo 目标

- [x] 项目方向重定向
- [x] 核心设计文档更新
- [x] 版本计划更新
- [x] 下一轮 Codex 任务准备
- [ ] v0.1 玩法实现
- [ ] Godot 迁移

---

## 范围

本轮只做：

- 更新 README 项目定位；
- 更新 DESIGN_HUB 核心设计文档；
- 记录项目重定向决策；
- 更新当前任务、开发记录和变更记录；
- 标记旧 Web Demo 为旧占位内容；
- 调整 smoke test，使其适配 v0.0 文档重定向阶段；
- 将 `AI_TASKS/NEXT_CODEX_PROMPT.md` 更新为下一轮 `Web Demo v0.1 / 最小可玩迷宫版`。

---

## 本轮不做

本轮明确不做：

- 不实现完整 Shiren-like 游戏；
- 不重写完整 Web Demo 玩法；
- 不实现随机迷宫；
- 不实现背包；
- 不实现饥饿；
- 不实现未鉴定；
- 不实现装备；
- 不实现陷阱；
- 不实现怪物屋；
- 不实现壶；
- 不实现商店；
- 不创建完整 Godot 工程；
- 不引入 React、Phaser、Three.js 或复杂 npm 依赖；
- 不做商业化系统。

---

## 允许修改的文件

- `README.md`
- `DESIGN_HUB/`
- `AI_TASKS/CURRENT_TASK.md`
- `AI_TASKS/CHANGELOG.md`
- `AI_TASKS/DEV_LOG.md`
- `AI_TASKS/NEXT_CODEX_PROMPT.md`
- `Builds/web-demo/README.md`
- `Tests/web-demo-smoke.mjs`
- `Docs/Archive/kingdom-like/README.md`

---

## 设计约束

- 新项目定位为 Mystery Dungeon Roguelike；
- 核心是格子回合制、迷宫探索、怪物、道具、楼梯、死亡复盘；
- 当前阶段先 Web Demo，后 Godot Demo；
- v0.1 只做最小可玩迷宫；
- 不再继续开发旧 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守玩法；
- 旧内容保留归档，不无记录删除。

---

## 验收标准

- [x] `README.md` 项目名变为 `shiren-like`；
- [x] README 不再把项目描述为 kingdom-like 探索建造游戏；
- [x] `DESIGN_HUB/01_PROJECT_BRIEF.md` 明确新项目是 Mystery Dungeon Roguelike；
- [x] `DESIGN_HUB/02_CORE_GAMEPLAY.md` 明确核心循环是迷宫探索、回合制、怪物、道具、楼梯；
- [x] `DESIGN_HUB/09_DECISIONS.md` 记录项目重定向决策；
- [x] `AI_TASKS/CURRENT_TASK.md` 显示 v0.0 / 项目重定向版；
- [x] `AI_TASKS/CHANGELOG.md` 追加 v0.0 记录；
- [x] `AI_TASKS/DEV_LOG.md` 记录执行过程；
- [x] `AI_TASKS/NEXT_CODEX_PROMPT.md` 更新为下一轮 `Web Demo v0.1 / 最小可玩迷宫版` 提示词；
- [x] 没有一次性实现复杂系统；
- [x] 没有引入第三方复杂依赖；
- [x] 没有删除旧内容而不留记录。

---

## 下一轮任务

```text
Web Demo v0.1 / 最小可玩迷宫版
```

下一轮由 Codex 执行。