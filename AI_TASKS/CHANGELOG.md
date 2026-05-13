# CHANGELOG

## 2026-05-13 / v0.4.2 / 房间视野与镜头居中版

### 目标

修正 v0.4.1 仍然会一屏显示整层地图的问题，改为以当前房间为中心的局部探索视野，并同步调整房间尺寸与房间怪物分配。

### 已完成

- [x] 将 `Data/config/web_demo_balance.json` 升级到 `v0.4.2`
- [x] 地图尺寸调整为 `36 x 28`
- [x] 房间数量范围调整为 `5 - 8`
- [x] 房间宽高范围调整为 `3x3` 到 `10x10`
- [x] 在 `Builds/web-demo/game.js` 中保存 `rooms` 元数据
- [x] 为房间增加 `centerX / centerY / isStartRoom / isStairsRoom`
- [x] 将怪物生成重构为 `placeMonstersByRoom`
- [x] 保证每个非出生房间至少 1 只怪物
- [x] 为大房间追加额外怪物压力
- [x] 避免把怪物刷在楼梯或楼梯相邻 1 格
- [x] 增加 `getRoomAt`、`getCurrentRoom`、`getCameraTarget`
- [x] 停止按整层地图自动缩放主画面
- [x] 在房间内以房间中心居中，在走廊内跟随玩家
- [x] 保留小地图整层总览
- [x] 更新 `Builds/web-demo/README.md`
- [x] 更新 `Tests/web-demo-smoke.mjs`
- [x] 更新任务记录

### 本轮未做

- [ ] 新怪物机制
- [ ] 远程怪、爆弹怪、隔格攻击怪
- [ ] 未鉴定、装备、陷阱、怪物屋、壶、商店、据点、Boss
- [ ] Godot 工程

### 下一轮建议

```text
Web Demo v0.5 / 怪物机制版
```

## 2026-05-13 / v0.4.1 / 传统轻斜俯视镜头修正版

- 将主镜头从等距菱形投影切回 `traditional-tilt`
- 让屏幕上下左右与键盘方向一致
- 保留 v0.4 HUD、小地图、敌人面板和快捷栏

## 2026-05-13 / v0.4 / 镜头与画面表现调整版

- 引入 2.5D 战术地牢画面
- 增加小地图、敌人面板和快捷栏
- 保留 v0.3 随机迷宫、饥饿与道具逻辑
