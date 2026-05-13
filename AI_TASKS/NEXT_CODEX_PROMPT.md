# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

`Web Demo v0.8 / 背包与投掷版`

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

当前版本 `v0.7.1 / 装备池补全与平衡版` 已完成：

- 随机房间与走廊
- 玩家中心镜头
- `Console / Camera / View` 调参
- 饥饿与饱腹度
- 四种怪物：`Slime / Goblin Archer / Sleep Mushroom / Skeleton Spearman`
- 三种陷阱：`Spike Trap / Warp Trap / Sleep Trap`
- 一种危险地形：`Poison Pool`
- 六种消耗道具：恢复药、食物、传送卷轴、睡眠卷轴、火球杖、换位杖
- 两个装备位：`weapon / shield`
- 六件装备：`Short Sword / Spear / Flame Sword / Wooden Shield / Iron Shield / Guard Shield`
- HUD 已显示 `ATK / DEF / weapon / shield`
- 站在装备上可按 `C` 装备或替换
- 旧装备会稳定掉回脚下或相邻安全格

下一轮任务是：

```text
Web Demo v0.8 / 背包与投掷版
```

核心目标：

- 加入最小可玩的背包压力
- 让道具和装备不再无限持有
- 做一个最小可用的投掷行为
- 不扩展到未鉴定、强化、合成、诅咒、耐久、商店、怪物屋、壶、据点、Boss 或 Godot
- 不推翻 `v0.7.1` 的装备、怪物、陷阱、危险地形和镜头方案

建议方向：

- 先做一个清晰的小容量背包，例如总格数上限
- 允许玩家对部分地面物品做“捡还是不捡”的决定
- 投掷先支持最小规则：直线、命中怪物、消耗物品
- 数值和剩余容量要在 HUD 或日志里可读
- 继续保持 smoke test、README 和任务记录同步更新
