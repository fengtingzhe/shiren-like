# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

Web Demo v1.0 / 单局体验整合与可读性打磨版

---

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

当前版本 `v0.9 / 未鉴定与道具风险版` 已完成，已经实现：

- 随机房间与走廊
- 玩家中心镜头
- `Console / Camera / View` 调参
- 饥饿与饱腹度
- 四种怪物
- 三种陷阱
- 一种危险地形
- 六种消耗道具
- 六件装备
- `weapon / shield` 装备位
- 背包容量与背包面板
- 从背包使用、装备和投掷
- 部分卷轴和杖的未鉴定与识别
- 3 层胜利与死亡结算

本轮任务是：

```text
Web Demo v1.0 / 单局体验整合与可读性打磨版
```

目标不是加入新大系统，而是把现有单局体验打磨到更完整、更容易试玩和更容易理解：

- 提高 HUD、快捷栏、背包、日志的可读性
- 统一未鉴定、装备、怪物和陷阱的信息表达
- 修正试玩中容易困惑的提示文案
- 补一轮单局体验平衡
- 保持 Web Demo 仍然轻量，不加入壶、商店、怪物屋、据点、Boss、Godot

---

## 开始前必须阅读

请按顺序阅读：

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
14. `DESIGN_HUB/07_ART_AND_AUDIO_DIRECTION.md`
15. `DESIGN_HUB/08_UX_FLOW.md`
16. `DESIGN_HUB/09_DECISIONS.md`
17. `DESIGN_HUB/10_OPEN_QUESTIONS.md`
18. `DESIGN_HUB/12_DEMO_SCOPE.md`
19. `AI_TASKS/CURRENT_TASK.md`
20. `AI_TASKS/CHANGELOG.md`
21. `AI_TASKS/DEV_LOG.md`
22. `Builds/web-demo/README.md`
23. `Builds/web-demo/index.html`
24. `Builds/web-demo/styles.css`
25. `Builds/web-demo/game.js`
26. `Data/config/web_demo_balance.json`
27. `Tests/web-demo-smoke.mjs`

阅读后先输出：

```text
我已理解当前项目是 shiren-like，本轮只做 Web Demo v1.0 / 单局体验整合与可读性打磨版。目标是提升现有单局体验的可读性、反馈一致性和试玩流畅度；不加入壶、商店、怪物屋、据点、Boss、Godot，也不重做随机迷宫、背包、装备、怪物、陷阱和镜头系统。
```

---

## 建议优先级

1. HUD、快捷栏、背包、日志文案统一
2. 试玩时最容易混淆的信息提示修正
3. 未鉴定与已识别状态的反馈强化
4. 小规模数值和平衡调整
5. README、smoke test、任务记录同步

---

## 硬性限制

- 不引入新大系统
- 不切到 Godot
- 不新增联网内容
- 不做持久化存档
- 保持本地静态网页可运行

---

## 完成后必须做

- 更新 `Builds/web-demo/README.md`
- 更新 `Data/config/web_demo_balance.json`
- 更新 `Tests/web-demo-smoke.mjs`
- 更新 `AI_TASKS/CURRENT_TASK.md`
- 更新 `AI_TASKS/CHANGELOG.md`
- 更新 `AI_TASKS/DEV_LOG.md`
- 重新生成下一轮 `AI_TASKS/NEXT_CODEX_PROMPT.md`
- 运行：
  - `node --check Builds/web-demo/game.js`
  - `node --check Tools/web-demo-server.mjs`
  - `node Tests/web-demo-smoke.mjs`

---

## 下一轮命名建议

如果本轮完成良好，下一轮可考虑：

```text
Web Demo v1.1 / 反馈细化与内容补点版
```
