# CURRENT_TASK: 当前任务

## 任务名称

`Web Demo v0.6 / 陷阱与危险地形版`

## 背景

`v0.5` 已经完成怪物差异化，但地图本身还不构成足够风险。本轮目标是加入少量、规则清晰的陷阱和持续危险地形，让玩家在处理怪物的同时，也要观察地面和重新理解走位。

## 本轮目标

- [x] 保留随机房间、怪物、镜头、小地图、敌人面板、快捷栏和道具系统
- [x] 加入 `Spike Trap`
- [x] 加入 `Warp Trap`
- [x] 加入 `Sleep Trap`
- [x] 加入 `Poison Pool`
- [x] 复用已有 `player.sleepTurns`
- [x] 危险内容按楼层逐步增加
- [x] 主画面提供可读的陷阱和地形表现
- [x] README、配置、smoke test、任务记录同步到 `v0.6`

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

- 不加入装备
- 不加入未鉴定
- 不加入怪物屋、壶、商店、据点、Boss、Godot

## 验收标准

- [x] `node --check Builds/web-demo/game.js`
- [x] `node --check Tools/web-demo-server.mjs`
- [x] `node Tests/web-demo-smoke.mjs`
- [x] 页面正常启动，无前端报错
- [x] 地图中可生成陷阱和危险地形
- [x] 陷阱和危险地形与怪物、道具、楼梯不重叠
- [x] 传送陷阱不会把玩家送到危险或无效格
- [x] 毒沼会在进入或站立行动时造成伤害

## 下一轮建议

```text
Web Demo v0.7 / 装备与数值成长版
```
