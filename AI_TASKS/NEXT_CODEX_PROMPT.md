# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

Web Demo v0.5 / 怪物机制版

---

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

当前 `Web Demo v0.4 / 镜头与画面表现调整版` 已完成，已经实现：

- 2.5D / 等距感地牢镜头；
- 菱形地板与立体墙体；
- 左上状态区、右上小地图、右侧敌人面板、底部快捷栏；
- 蓝色行动范围与红色威胁范围；
- v0.3 的随机迷宫、饥饿压力、楼梯推进和基础道具。

人类制作人需要在 v0.4 试玩后继续推进下一轮。

本轮目标改为：

```text
Web Demo v0.5 / 怪物机制版
```

核心目标不是继续改镜头，而是在保留 v0.4 画面和 v0.3 玩法闭环的前提下，引入第一批真正改变局势判断的规则怪物。

---

## 一、开始前必须阅读

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
我已理解当前项目是 shiren-like，本轮只做 Web Demo v0.5 / 怪物机制版，目标是在保留 v0.4 镜头与 v0.3 闭环的前提下，加入第一批能改变局势判断的规则怪物。
```

---

## 二、本轮目标

建议优先做少量但有明确规则差异的怪物，而不是堆数量：

1. 保留现有近战基础怪；
2. 新增 1～2 种规则怪，优先考虑：
   - 远程压制怪；
   - 睡眠 / 干扰怪；
   - 隔格攻击怪；
3. 不要同时塞入过多新机制，优先保证可读性与可测试性；
4. 配套更新小地图、敌人面板、危险范围和日志反馈；
5. 不破坏现有随机迷宫、饥饿、快捷栏和胜负条件。

---

## 三、允许修改文件

优先允许修改：

```text
Builds/web-demo/index.html
Builds/web-demo/styles.css
Builds/web-demo/game.js
Builds/web-demo/README.md
Data/config/web_demo_balance.json
Tests/web-demo-smoke.mjs
AI_TASKS/CURRENT_TASK.md
AI_TASKS/CHANGELOG.md
AI_TASKS/DEV_LOG.md
AI_TASKS/NEXT_CODEX_PROMPT.md
```

---

## 四、本轮禁止事项

- 不做未鉴定；
- 不做装备；
- 不做陷阱；
- 不做怪物屋；
- 不做壶；
- 不做商店；
- 不做据点；
- 不做复杂 Boss；
- 不做 Godot 工程；
- 不引入 React、Phaser、Three.js、PixiJS 或复杂 npm 依赖；
- 不破坏 v0.4 的镜头和 HUD；
- 不继续开发旧 kingdom-like 的任何核心玩法。

---

## 五、完成后必须更新

完成后必须更新：

1. `AI_TASKS/CURRENT_TASK.md`
2. `AI_TASKS/CHANGELOG.md`
3. `AI_TASKS/DEV_LOG.md`
4. `AI_TASKS/NEXT_CODEX_PROMPT.md`

记录本轮为：

```text
Web Demo v0.5 / 怪物机制版
```
