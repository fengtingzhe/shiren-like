# NEXT_CODEX_PROMPT：下一轮 Codex 任务建议草案

## 任务名称

Web Demo v0.3 / 随机迷宫与饥饿压力版

---

## 当前状态

`Web Demo v0.2 / 道具策略版` 已由 Codex 完成。

v0.2 已实现：

- 快捷道具栏；
- 回复药；
- 食物和满腹度占位；
- 传送卷轴；
- 睡眠卷轴；
- 火球杖；
- 换位杖；
- 多道具拾取和日志反馈；
- 睡眠怪物视觉提示；
- 通用 Console。

---

## 下一轮建议目标

下一轮建议先等待人类制作人试玩 v0.2，再确认是否进入：

```text
Web Demo v0.3 / 随机迷宫与饥饿压力版
```

v0.3 的建议目标是验证：

```text
随机探索 + 轻量饥饿压力 + 搜刮与下楼取舍
```

---

## v0.3 可选范围

建议只选择少量内容：

- 简单随机房间和通道；
- 随机怪物分布；
- 随机道具分布；
- 满腹度随回合轻量下降；
- 食物恢复满腹度；
- 满腹度极低时给出警告；
- 是否启用饥饿扣 HP 需制作人确认。

---

## v0.3 仍然不建议做

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

- v0.2 道具数量是否合适；
- 传送卷轴是否过强或过随机；
- 睡眠卷轴范围和回合数是否合适；
- 火球杖伤害是否合适；
- 换位杖是否足够直观；
- v0.3 是否启用饥饿扣 HP，还是只做低满腹警告。
