# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

`Web Demo v0.7 / 装备与数值成长版`

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

当前版本 `v0.6 / 陷阱与危险地形版` 已经完成：

- 随机房间与走廊
- 玩家中心镜头
- `Console / Camera / View` 调参
- 饥饿与饱腹度
- 四种怪物：`Slime / Goblin Archer / Sleep Mushroom / Skeleton Spearman`
- 三种陷阱：`Spike Trap / Warp Trap / Sleep Trap`
- 一种危险地形：`Poison Pool`
- 小地图、敌人面板、底部快捷栏
- 恢复药、食物、传送卷轴、睡眠卷轴、火球杖、换位杖

下一轮任务是：

```text
Web Demo v0.7 / 装备与数值成长版
```

核心目标：

- 加入最小可玩的装备系统
- 让拾取和替换开始影响玩家数值
- 不扩展到未鉴定、怪物屋、商店、据点、Boss、Godot
- 不推翻 `v0.6` 的怪物、陷阱、危险地形和镜头方案

建议方向：

- 先做少量清晰装备位，例如武器和盾
- 数值变化要在 HUD 或日志里可读
- 允许玩家在拾取时做简单取舍
- 继续保持 smoke test、README 和任务记录同步更新
