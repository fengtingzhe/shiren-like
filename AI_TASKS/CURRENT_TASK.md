# CURRENT_TASK: 当前任务

## 任务名称

Web Demo v0.4.3 / 玩家中心镜头 + Console 视野调参版

## 背景

v0.4.2 已经完成房间尺寸、房间怪物分配和房间视野，但试玩后仍有两个问题：主镜头过于依赖房间中心，操作焦点不够稳定；同时视野范围还需要继续试调。本轮只修正镜头策略，并在 Console 中开放实时 Camera / View 调参。

## 本轮目标

- [x] 主镜头改为玩家中心镜头
- [x] 不再使用房间中心作为主镜头目标
- [x] 玩家在房间和走廊内都保持在主画面中心附近
- [x] 地图边缘附近启用镜头边界限制
- [x] 在 Console 中加入 `Camera / View` 调参区
- [x] 支持实时调整 `tileW`
- [x] 支持实时调整 `tileH`
- [x] 支持实时调整 `yScale`
- [x] 支持实时调整 `rowStep`
- [x] 支持实时调整 `perspectiveOffset`
- [x] 支持额外调整 `tileDepth`
- [x] 支持额外调整 `cameraZoom`
- [x] 支持额外调整 `cameraCenterOffsetX`
- [x] 支持额外调整 `cameraCenterOffsetY`
- [x] 支持重置镜头参数
- [x] 支持复制当前镜头参数 JSON
- [ ] v0.4.4 参数固化或 v0.5 怪物机制

## 本轮范围

- `Builds/web-demo/index.html`
- `Builds/web-demo/styles.css`
- `Builds/web-demo/game.js`
- `Builds/web-demo/README.md`
- `Data/config/web_demo_balance.json`
- `Tests/web-demo-smoke.mjs`
- `AI_TASKS/CURRENT_TASK.md`
- `AI_TASKS/CHANGELOG.md`
- `AI_TASKS/DEV_LOG.md`
- `AI_TASKS/NEXT_CODEX_PROMPT.md`

## 本轮不做

- 不新增怪物机制
- 不做远程怪、爆弹怪、隔格攻击怪
- 不做未鉴定、装备、陷阱、怪物屋、壶、商店、据点、Boss
- 不做 Godot 工程
- 不引入新的前端框架或 npm 依赖

## 验收标准

- [x] `node --check Builds/web-demo/game.js`
- [x] `node --check Tools/web-demo-server.mjs`
- [x] `node Tests/web-demo-smoke.mjs`
- [x] 本地 Demo 可试玩
- [x] 玩家在房间和走廊内都保持在画面中心附近
- [x] 主画面不再以房间中心作为主镜头目标
- [x] Console 中可实时调整镜头参数
- [x] 调参后画面立即刷新
- [x] 可重置镜头参数
- [x] 可复制当前镜头参数
- [x] 保留随机地牢、房间怪物分配、饥饿、道具、小地图、敌人面板和快捷栏

## 下一轮建议

```text
等待制作人调试并确认最终镜头参数后，再决定进入 v0.4.4 参数固化版或 v0.5 怪物机制版。
```
