# CURRENT_TASK：当前任务

## 任务名称

Web Demo v0.1 / 最小可玩迷宫版

---

## 背景

v0.0 已经完成项目重定向：仓库从旧 `kingdom-like` 轻策略探索建造方向，转为 `shiren-like` / Mystery Dungeon Roguelike 方向。

本轮由 Codex 执行 v0.1，目标是把旧 Web Demo 占位逻辑替换为最小可玩的格子迷宫原型。

---

## 本任务服务的 Demo 目标

- [x] 格子迷宫
- [x] 回合制移动
- [x] 怪物追击和攻击
- [x] 玩家普通攻击
- [x] 回复药拾取和使用
- [x] 楼梯下楼
- [x] 简单胜负
- [ ] v0.2 道具策略
- [ ] Godot 迁移

---

## 范围

本轮完成：

- 重写 `Builds/web-demo/index.html`；
- 重写 `Builds/web-demo/styles.css`；
- 重写 `Builds/web-demo/game.js`；
- 将 `Data/config/web_demo_balance.json` 改为 shiren-like v0.1 配置；
- 更新 `Builds/web-demo/README.md`；
- 更新 `Tests/web-demo-smoke.mjs`；
- 更新 `AI_TASKS/CHANGELOG.md` 和 `AI_TASKS/DEV_LOG.md`；
- 更新 `AI_TASKS/NEXT_CODEX_PROMPT.md` 为下一轮建议草案。

---

## 本轮不做

- 不做饥饿；
- 不做完整背包；
- 不做未鉴定；
- 不做装备；
- 不做陷阱；
- 不做怪物屋；
- 不做壶；
- 不做商店；
- 不做据点；
- 不做复杂随机地图；
- 不做 Godot 工程；
- 不引入 React、Phaser、Three.js 或复杂 npm 依赖；
- 不做商业化系统。

---

## 验收标准

- [x] `node --check Builds/web-demo/game.js` 通过；
- [x] `node --check Tools/web-demo-server.mjs` 通过；
- [x] `node Tests/web-demo-smoke.mjs` 通过；
- [x] `node Tools/web-demo-server.mjs` 可以启动；
- [x] `http://127.0.0.1:4173/Builds/web-demo/` 可以打开；
- [x] 玩家可以在格子迷宫中移动；
- [x] 玩家行动后怪物行动；
- [x] 玩家可以攻击怪物；
- [x] 怪物可以攻击玩家；
- [x] 玩家可以拾取并使用回复药；
- [x] 玩家可以通过楼梯进入下一层；
- [x] HP 为 0 时失败；
- [x] 到达第 3 层目标后胜利；
- [x] 新 Web Demo 代码不再保留旧 kingdom-like 核心玩法词。

---

## 下一轮建议

```text
Web Demo v0.2 / 道具策略版
```

建议先由人类制作人试玩 v0.1，再决定 v0.2 是否加入简化背包、食物、传送卷轴、睡眠卷轴、火球杖或换位杖。
