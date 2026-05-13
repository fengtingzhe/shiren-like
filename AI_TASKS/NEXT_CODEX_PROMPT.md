# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

`Web Demo v0.6 / 陷阱与危险地形版`

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

当前版本 `v0.5 / 怪物机制版` 已经完成：

- 随机房间与走廊
- 玩家中心镜头
- `Console / Camera / View` 调参
- 饥饿与饱腹度
- 恢复药、食物、传送卷轴、睡眠卷轴、火球杖、换位杖
- 小地图、敌人面板、底部快捷栏
- 四种怪物：`Slime / Goblin Archer / Sleep Mushroom / Skeleton Spearman`

下一轮任务是：

```text
Web Demo v0.6 / 陷阱与危险地形版
```

核心目标：

- 加入少量、规则清晰的陷阱
- 加入少量、规则清晰的危险地形
- 不扩展到装备、未鉴定、商店、据点、Godot
- 不推翻 v0.5 的怪物机制、镜头和道具体系

建议方向：

- 地刺或毒沼这类一眼能理解的危险格
- 触发后要有清晰日志与视觉反馈
- 让走位和地图观察比单纯拼数值更重要
- 继续保持 smoke test 和 README 同步更新
