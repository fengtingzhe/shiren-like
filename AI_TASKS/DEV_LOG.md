# DEV_LOG: 开发过程记录

## 2026-05-13 / v0.7 / 装备与数值成长版

### 执行过程

- 读取 `D:\work\shiren-like\AI_TASKS\NEXT_CODEX_PROMPT.md`，确认本轮只做最小装备系统
- 复查 `game.js`、HUD、配置和 smoke test，确认 `v0.6` 没有装备槽和防御结算
- 在默认配置和外部配置里加入装备池、掉落权重和基础防御
- 在玩家状态中加入 `baseAttack / baseDefense / equipment`
- 加入 `weapon / shield` 两个装备位，以及地面装备数组 `equipmentOnGround`
- 随机地牢生成接入装备投放
- 加入 `C` 键和 HUD 按钮，站在装备上时才可装备或替换
- 替换逻辑做成“旧装备掉回脚下”，保持最小取舍
- HUD 新增 `ATK / DEF / 武器 / 盾牌`
- 怪物伤害接入防御减伤，最低伤害保留 `1`
- 重写 README、smoke test 和任务记录到 `v0.7`

### 本轮结论

`v0.7` 的重点不是扩大量，而是让探索奖励开始影响回合决策。现在玩家已经需要在消耗品、下楼时机和装备替换之间做最基本的判断。

### 仍未实现

- 未鉴定
- 背包容量
- 投掷
- 怪物屋
- 壶
- 商店
- 据点
- Boss
- Godot

### 下一轮建议

```text
Web Demo v0.8 / 背包与投掷版
```
