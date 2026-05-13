# NEXT_CODEX_PROMPT：下一轮 Codex 任务建议草案

## 任务名称

Web Demo v0.2 / 道具策略版

---

## 当前状态

`Web Demo v0.1 / 最小可玩迷宫版` 已由 Codex 完成。

v0.1 已实现：

- 格子迷宫；
- 回合制移动；
- 1 种基础怪物；
- 普通攻击；
- 1 种回复药；
- 楼梯和下楼；
- HP、楼层、回合、日志；
- 到达第 3 层胜利；
- HP 为 0 失败；
- 通用 Console。

---

## 下一轮建议目标

下一轮建议先等待人类制作人试玩 v0.1，再确认是否进入：

```text
Web Demo v0.2 / 道具策略版
```

v0.2 的建议目标是验证“道具可以改变局势”，而不是扩展完整系统。

---

## v0.2 可选范围

建议只选择少量内容：

- 简化背包；
- 食物；
- 传送卷轴；
- 睡眠卷轴；
- 火球杖；
- 换位杖；
- 道具说明和快捷使用；
- 调整怪物密度和回复药数量。

---

## v0.2 仍然不建议做

- 不做饥饿完整压力，除非制作人明确提前；
- 不做未鉴定；
- 不做装备；
- 不做陷阱；
- 不做怪物屋；
- 不做壶；
- 不做商店；
- 不做据点；
- 不做 Godot 工程；
- 不引入 React、Phaser、Three.js 或复杂 npm 依赖。

---

## 开始下一轮前必须阅读

1. `README.md`
2. `AI_RULES/00_MASTER_PROMPT.md`
3. `AI_RULES/01_AI_READ_ORDER.md`
4. `AI_RULES/02_AI_EDIT_PERMISSION.md`
5. `AI_RULES/03_TECHNICAL_RULES.md`
6. `AI_RULES/04_DATA_RULES.md`
7. `AI_RULES/06_VALIDATION_CHECKLIST.md`
8. `DESIGN_HUB/01_PROJECT_BRIEF.md`
9. `DESIGN_HUB/02_CORE_GAMEPLAY.md`
10. `DESIGN_HUB/03_PLAYER_EXPERIENCE.md`
11. `DESIGN_HUB/04_SYSTEM_OVERVIEW.md`
12. `DESIGN_HUB/05_ECONOMY_AND_BALANCE.md`
13. `DESIGN_HUB/06_CONTENT_PLAN.md`
14. `DESIGN_HUB/08_UX_FLOW.md`
15. `DESIGN_HUB/09_DECISIONS.md`
16. `DESIGN_HUB/10_OPEN_QUESTIONS.md`
17. `DESIGN_HUB/12_DEMO_SCOPE.md`
18. `AI_TASKS/CURRENT_TASK.md`
19. `AI_TASKS/CHANGELOG.md`
20. `AI_TASKS/DEV_LOG.md`
21. `Builds/web-demo/README.md`
22. `Builds/web-demo/index.html`
23. `Builds/web-demo/styles.css`
24. `Builds/web-demo/game.js`
25. `Data/config/web_demo_balance.json`
26. `Tests/web-demo-smoke.mjs`

---

## 需要制作人先确认的问题

- v0.1 的移动节奏是否合适；
- 怪物压力是否过轻或过重；
- 回复药数量是否合适；
- v0.2 第一批道具具体选择哪些；
- 是否在 v0.2 加入简化背包，还是继续使用快捷道具计数。
