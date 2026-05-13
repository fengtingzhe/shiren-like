# CURRENT_TASK: 当前任务

## 任务名称

Web Demo v0.4.2 / 房间视野与镜头居中版

## 背景

v0.4.1 已经把主画面改回传统轻斜俯视，但主画面仍然会把整层迷宫缩进同一屏，探索感不足。本轮只修正随机房间尺寸、房间怪物分配和镜头居中策略，不新增怪物系统或后置玩法。

## 本轮目标

- [x] 地图尺寸恢复为 `36 x 28`
- [x] 房间数量调整为 `5 - 8`
- [x] 房间宽高随机范围调整为 `3x3` 到 `10x10`
- [x] 在楼层状态中保存 `rooms` 元数据
- [x] 每个非出生房间至少生成 `1` 只怪物
- [x] 大房间追加额外怪物压力
- [x] 楼梯房保留怪物，但避免刷在楼梯或楼梯相邻 1 格内
- [x] 玩家位于房间时，镜头以房间中心为目标
- [x] 玩家位于走廊时，镜头跟随玩家
- [x] 主画面不再自动缩小到显示整层地图
- [x] 保留 v0.3 / v0.4.1 的 HUD、小地图、敌人面板、快捷栏、饥饿和道具逻辑
- [ ] v0.5 怪物机制
- [ ] Godot 迁移

## 本轮范围

- `Builds/web-demo/game.js`
- `Builds/web-demo/README.md`
- `Data/config/web_demo_balance.json`
- `Tests/web-demo-smoke.mjs`
- `AI_TASKS/CURRENT_TASK.md`
- `AI_TASKS/CHANGELOG.md`
- `AI_TASKS/DEV_LOG.md`
- `AI_TASKS/NEXT_CODEX_PROMPT.md`

## 本轮不做

- 不新增新怪物类型或复杂 AI
- 不做未鉴定、装备、陷阱、怪物屋、壶、商店、据点、Boss
- 不做 Godot 工程
- 不引入 React、Phaser、Three.js、PixiJS 或新的 npm 依赖

## 验收标准

- [x] `node --check Builds/web-demo/game.js`
- [x] `node --check Tools/web-demo-server.mjs`
- [x] `node Tests/web-demo-smoke.mjs`
- [x] `http://127.0.0.1:4173/Builds/web-demo/` 可试玩
- [x] 房间宽高在 `3x3` 到 `10x10` 之间随机
- [x] 每个非出生房间至少有 `1` 只怪物
- [x] 楼梯房怪物不会堵在楼梯或楼梯相邻 1 格
- [x] 房间内镜头以房间中心为准
- [x] 走廊内镜头跟随玩家
- [x] 主画面不再一屏显示整层迷宫
- [x] 小地图继续提供整层总览
- [x] v0.3 / v0.4.1 的基础玩法与面板不回退

## 下一轮建议

```text
Web Demo v0.5 / 怪物机制版
```
