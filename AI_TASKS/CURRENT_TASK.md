# CURRENT_TASK：当前任务

## 任务名称

Web Demo v0.4 / 镜头与画面表现调整版

---

## 背景

`Web Demo v0.3 / 随机迷宫与饥饿压力版` 已完成随机房间、走廊、随机怪物和道具分布，以及满腹度、饥饿伤害和多种基础道具。

本轮由 Codex 执行 v0.4，目标不是增加玩法，而是在保留 v0.3 闭环的前提下，把画面从普通俯视格子原型调整为更接近目标方向的 2.5D 战术地牢镜头和现代 Roguelike HUD。

---

## 本任务服务的 Demo 目标

- [x] 镜头从普通俯视格子改为 2.5D / 等距感视角
- [x] 地牢房间在 16:9 画布中占据主要区域
- [x] 玩家、怪物、道具、楼梯、墙体和地板层次更清楚
- [x] 加入蓝色行动范围和红色威胁范围
- [x] 调整 HUD 为左上状态、右上小地图、右侧敌人面板、底部快捷栏
- [x] 保留随机迷宫、饥饿、道具、楼梯和胜负条件
- [ ] v0.5 怪物机制
- [ ] Godot 迁移

---

## 范围

本轮完成：

- 更新 `Builds/web-demo/index.html`，加入左上状态区、右上小地图、右侧敌人面板和底部快捷栏结构；
- 更新 `Builds/web-demo/styles.css`，改为战术地牢 HUD 和 16:9 画面布局；
- 更新 `Builds/web-demo/game.js`，实现 `tileToScreen` 等距投影、墙体厚度、实体排序、小地图、敌人面板、蓝色行动范围和红色威胁范围；
- 保留 v0.3 的随机迷宫、饥饿、怪物追击和所有基础道具；
- 更新 `Builds/web-demo/README.md`；
- 更新 `Data/config/web_demo_balance.json` 为 v0.4；
- 更新 `Tests/web-demo-smoke.mjs`；
- 更新 `Tools/web-demo-server.mjs` 启动文案；
- 更新 `AI_TASKS/CHANGELOG.md`、`AI_TASKS/DEV_LOG.md` 和 `AI_TASKS/NEXT_CODEX_PROMPT.md`。

---

## 本轮不做

- 不做新怪物机制；
- 不做弓手怪、爆弹怪、骷髅枪兵等旧 v0.4 计划内容；
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
- 不做商业化系统。

---

## 验收标准

- [x] `node --check Builds/web-demo/game.js` 通过；
- [x] `node --check Tools/web-demo-server.mjs` 通过；
- [x] `node Tests/web-demo-smoke.mjs` 通过；
- [x] `node Tools/web-demo-server.mjs` 可以启动；
- [x] `http://127.0.0.1:4173/Builds/web-demo/` 可以打开；
- [x] 画面第一眼更接近战术地牢，而不是普通俯视表格；
- [x] 地板具有 2.5D / 等距感；
- [x] 玩家、怪物、道具、楼梯辨识度明显提高；
- [x] 玩家附近显示蓝色半透明行动范围；
- [x] 怪物相邻区域显示红色半透明威胁范围；
- [x] 小地图显示正常；
- [x] 敌人面板显示正常；
- [x] v0.3 的随机迷宫、饥饿、食物、道具、楼梯和胜负条件仍可用；
- [x] 键盘操作和快捷栏按钮仍正常；
- [x] 没有加入后置怪物机制和其他复杂系统；
- [x] 代码与工具文案不再残留旧 kingdom-like 核心玩法词。

---

## 下一轮建议

```text
Web Demo v0.5 / 怪物机制版
```

建议先由人类制作人试玩 v0.4，确认镜头可读性、威胁范围表达、小地图信息量和右侧敌人面板是否有效，再确定第一批规则怪物的范围。
