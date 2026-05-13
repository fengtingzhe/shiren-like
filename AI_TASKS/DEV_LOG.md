# DEV_LOG: 开发过程记录

## 2026-05-13 / v0.4.2 / 房间视野与镜头居中版

### 执行过程

- 读取 `AI_TASKS/NEXT_CODEX_PROMPT.md`，确认本轮只做房间尺寸、房间怪物密度和镜头居中策略
- 复查 `AI_TASKS/CURRENT_TASK.md`、`AI_TASKS/CHANGELOG.md`、`Builds/web-demo/README.md`、`Tests/web-demo-smoke.mjs`
- 在 `Builds/web-demo/game.js` 中为楼层状态补充 `rooms`
- 重构随机房间结构，加入 `id / centerX / centerY / isStartRoom / isStairsRoom`
- 将怪物生成从全图随机撒点改为按房间分配
- 为每个非出生房间保底放置怪物，并为大房间追加额外压力
- 避免在楼梯点和楼梯相邻 1 格内放置怪物
- 新增 `getRoomAt`、`getCurrentRoom`、`getCameraTarget`
- 改写 `resizeCanvas`，停止按整层地图缩放，改为按 camera target 计算 `originX / originY`
- 更新 README、配置、smoke test 和任务记录

### 实现结论

v0.4.2 的核心变化是把主画面从“整层地图预览”改回“当前房间探索”。房间内镜头稳定锁房间中心，走廊内镜头跟人走；怪物则按房间生成，不再只是在整层 floor tile 上随机撒点。

### 仍未实现

- 新怪物机制
- 远程怪、爆弹怪、隔格攻击怪
- 未鉴定、装备、陷阱、怪物屋、壶、商店、据点、Boss
- Godot 工程

### 下一轮建议

```text
Web Demo v0.5 / 怪物机制版
```

## 2026-05-13 / v0.4.1 / 传统轻斜俯视镜头修正版

- 目标：修正 v0.4 的等距镜头操作映射问题
- 结果：主镜头回到传统轻斜俯视，操作方向与屏幕方向一致

## 2026-05-13 / v0.4 / 镜头与画面表现调整版

- 目标：把普通平面格子升级为 2.5D 战术地牢观感
- 结果：加入立体墙体、范围提示、小地图、敌人面板和快捷栏
