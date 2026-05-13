# DEV_LOG: 开发过程记录

## 2026-05-13 / v0.4.3 / 玩家中心镜头 + Console 视野调参版

### 执行过程

- 读取 `AI_TASKS/NEXT_CODEX_PROMPT.md`，确认本轮不新增玩法，只修镜头并加调参工具
- 复查 v0.4.2 的镜头实现、Console 面板和 smoke test
- 将 `getCameraTarget` 从房间中心改为始终返回玩家坐标
- 在 `resizeCanvas` 中改为以玩家为主镜头目标，并增加边界 clamp
- 给 `camera` 配置增加可调默认参数
- 在 Console 中新增 `Camera / View` 区块
- 用动态控件生成方式加入 slider + number input
- 实现实时调参、重置参数、复制当前参数 JSON
- 更新 README、配置、smoke test 和任务记录

### 本轮结论

v0.4.3 的重点不是继续改玩法，而是让镜头手感和视野尺度进入可试玩微调阶段。主画面现在围绕玩家稳定工作，制作人可以直接在 Console 里调 `tileW / tileH / yScale / rowStep / perspectiveOffset` 等参数，再把满意的数值回传给 Codex 固化。

### 仍未实现

- 新怪物机制
- 远程怪、爆弹怪、隔格攻击怪
- 未鉴定、装备、陷阱、怪物屋、壶、商店、据点、Boss
- Godot 工程

### 下一轮建议

```text
等待制作人调试并确认最终镜头参数后，再决定进入 v0.4.4 参数固化版或 v0.5 怪物机制版。
```
