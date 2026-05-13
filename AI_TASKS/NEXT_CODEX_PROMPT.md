# NEXT_CODEX_PROMPT：下一轮 Codex 任务建议草案

## 任务名称

Web Demo v0.4 / 怪物机制版

---

## 当前状态

`Web Demo v0.3 / 随机迷宫与饥饿压力版` 已由 Codex 完成。

v0.3 已实现：

- 简单随机房间和走廊；
- 随机怪物分布；
- 随机道具分布；
- 每次下楼重新生成地图；
- 满腹度随有效回合下降；
- 低满腹提示；
- 满腹度为 0 后的轻量 HP 压力；
- 食物恢复满腹度；
- 保留 v0.2 全部道具。

---

## 下一轮建议目标

下一轮建议先等待人类制作人试玩 v0.3，再确认是否进入：

```text
Web Demo v0.4 / 怪物机制版
```

v0.4 的建议目标是验证：

```text
怪物不是数值单位，而是规则单位。
```

---

## v0.4 可选范围

建议只选择 2～3 种怪物机制，不要一次性做完整怪物生态：

- 普通史莱姆：保留当前近战追击怪；
- 弓手怪：隔几格远程攻击，迫使玩家走位；
- 爆弹怪：靠近后延迟爆炸或死亡后爆炸；
- 睡眠蘑菇：靠近后让玩家短暂失控或等待；
- 骷髅枪兵：隔一格攻击。

---

## v0.4 仍然不建议做

- 不做未鉴定；
- 不做装备；
- 不做陷阱；
- 不做怪物屋；
- 不做壶；
- 不做商店；
- 不做据点；
- 不做复杂 Boss；
- 不做完整怪物图鉴；
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

- v0.3 随机地图是否足够可读；
- 满腹度下降速度是否合适；
- 食物数量是否合适；
- 是否保留饥饿伤害当前强度；
- v0.4 第一批怪物机制选择哪 2～3 种。
