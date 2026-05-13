# NEXT_CODEX_PROMPT: 下一轮 Codex 任务

## 任务名称

待定 / v0.4.4 参数固化版 或 v0.5 怪物机制版

## 前置条件

先由制作人在浏览器内试玩 `v0.4.3 / 玩家中心镜头 + Console 视野调参版`，通过 Console 调试并确认最终镜头参数，再决定下一轮方向。

## 如果镜头参数已经确认

进入：

```text
Web Demo v0.4.4 / 镜头参数固化版
```

目标：

- 将制作人确认后的 `tileW / tileH / yScale / rowStep / perspectiveOffset / tileDepth / cameraZoom / cameraCenterOffsetX / cameraCenterOffsetY` 固化到配置文件
- 清理调参阶段留下的临时提示
- 保持 Console 的调参能力是否继续保留，由制作人决定

## 如果镜头参数还需要更多玩法支撑

进入：

```text
Web Demo v0.5 / 怪物机制版
```

目标：

- 在保留 v0.4.3 镜头方案的前提下，加入第一批行为差异明确的怪物
- 优先考虑远程压制、睡眠干扰或隔格攻击三类
