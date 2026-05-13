# CURRENT_TASK：当前任务

## 任务名称

Web Demo v0.3 / 随机迷宫与饥饿压力版

---

## 背景

`Web Demo v0.2 / 道具策略版` 已经实现多种基础道具和快捷栏。玩家可以用回复药、食物、传送卷轴、睡眠卷轴、火球杖和换位杖解决不同局面。

本轮由 Codex 执行 v0.3，目标是在 v0.2 基础上加入简单随机迷宫生成和轻量饥饿压力，验证“随机探索 + 搜刮与下楼取舍”。

---

## 本任务服务的 Demo 目标

- [x] 每层地图布局随机变化
- [x] 每层怪物和道具随机分布
- [x] 玩家可以到达楼梯
- [x] 每次下楼重新生成地图
- [x] 满腹度随有效回合下降
- [x] 满腹度低时提示
- [x] 满腹度为 0 后造成轻微 HP 压力
- [x] 食物恢复满腹度
- [x] 饥饿死亡与怪物死亡原因区分
- [ ] v0.4 怪物机制
- [ ] Godot 迁移

---

## 范围

本轮完成：

- 扩展 `Data/config/web_demo_balance.json` 为 v0.3 配置；
- 加入 `dungeon.generation` 随机房间 / 走廊参数；
- 加入 `hunger` 饥饿参数；
- 更新 `Builds/web-demo/game.js`，实现随机房间、走廊、随机怪物和道具分布；
- 更新 `Builds/web-demo/game.js`，实现满腹度消耗、低满腹提示和饥饿伤害；
- 保留 v0.2 的所有道具功能；
- 更新 `Builds/web-demo/index.html` 文案；
- 更新 `Builds/web-demo/README.md`；
- 更新 `Tests/web-demo-smoke.mjs`；
- 更新 `AI_TASKS/CHANGELOG.md`、`AI_TASKS/DEV_LOG.md` 和 `AI_TASKS/NEXT_CODEX_PROMPT.md`。

---

## 本轮不做

- 不做未鉴定；
- 不做装备；
- 不做陷阱；
- 不做怪物屋；
- 不做壶；
- 不做商店；
- 不做据点；
- 不做复杂 Boss；
- 不做多种怪物；
- 不做完整自然回血系统；
- 不做完整房间识别战术系统；
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
- [x] 每层地图布局不再完全固定；
- [x] 玩家、楼梯、怪物、道具都生成在合法地板格；
- [x] 玩家可以到达楼梯；
- [x] 每次下楼重新生成地图；
- [x] 满腹度会随有效回合下降；
- [x] 满腹度低时有提示；
- [x] 满腹度为 0 后会造成轻微 HP 压力；
- [x] 食物可以恢复满腹度；
- [x] 饥饿死亡和怪物死亡原因区分清楚；
- [x] v0.2 道具功能仍可使用；
- [x] 没有加入后置复杂系统；
- [x] 新 Web Demo 代码不再保留旧 kingdom-like 核心玩法词。

---

## 下一轮建议

```text
Web Demo v0.4 / 怪物机制版
```

建议先由人类制作人试玩 v0.3，确认随机迷宫、食物数量、饥饿速度和搜刮/下楼取舍是否成立，再决定 v0.4 的怪物机制范围。
