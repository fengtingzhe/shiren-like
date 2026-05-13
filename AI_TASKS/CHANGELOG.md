# CHANGELOG

## 2026-05-13 / v0.4.3 / 玩家中心镜头 + Console 视野调参版

### 目标

将 v0.4.2 的“房间中心镜头”改回玩家中心镜头，并在 Console 中加入实时 Camera / View 调参能力，方便制作人直接试玩和微调视野参数。

### 已完成

- [x] 将 `Data/config/web_demo_balance.json` 升级到 `v0.4.3`
- [x] 主镜头改为玩家中心镜头
- [x] 不再将房间中心作为主镜头目标
- [x] 加入地图边缘镜头边界限制
- [x] 为 `camera` 增加默认参数：
  - [x] `tileW`
  - [x] `tileH`
  - [x] `yScale`
  - [x] `rowStep`
  - [x] `perspectiveOffset`
  - [x] `tileDepth`
  - [x] `cameraZoom`
  - [x] `cameraCenterOffsetX`
  - [x] `cameraCenterOffsetY`
- [x] 在 Console 中加入 `Camera / View` 调参区
- [x] 支持实时调参并立即刷新画面
- [x] 支持重置镜头参数
- [x] 支持复制当前镜头参数 JSON
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
等待制作人调试并确认最终镜头参数后，再决定进入 v0.4.4 参数固化版或 v0.5 怪物机制版。
```

## 2026-05-13 / v0.4.2 / 房间视野与镜头居中版

- 地图尺寸恢复到 `36 x 28`
- 房间尺寸调整为 `3x3` 到 `10x10`
- 每个非出生房间至少 1 只怪物
- 主画面改为房间中心局部视野

## 2026-05-13 / v0.4.1 / 传统轻斜俯视镜头修正版

- 主镜头从等距菱形投影切回 `traditional-tilt`
- 屏幕上下左右与键盘方向一致
