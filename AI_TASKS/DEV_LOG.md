# DEV_LOG: 开发过程记录

## 2026-05-13 / v0.7.1 / 装备池补全与平衡版

### 执行过程

- 读取 `D:\work\shiren-like\AI_TASKS\NEXT_CODEX_PROMPT.md`，确认本轮是 `v0.7` 补丁版
- 复查 `game.js`、配置、README 和 smoke test，确认 `v0.7` 已有基础装备系统
- 在默认配置和外部配置里补入 `火焰剑 / 守护盾`
- 按楼层重新调整装备掉落权重
- 重写装备替换逻辑：
  - 先移除脚下新装备
  - 再给玩家换上新装备
  - 最后为旧装备寻找掉落位置
- 新增稳定函数：
  - `findEquipmentAtPlayer`
  - `canPlaceEquipmentAt`
  - `findSafeEquipmentDropCell`
- HUD 装备显示改为 `名称 +数值`
- README、smoke test 和任务记录同步到 `v0.7.1`

### 本轮结论

`v0.7.1` 没有引入新系统，但把装备奖励做得更完整了。现在 `1F` 到 `3F` 的成长梯度更清晰，装备替换的行为也更稳定，适合继续让制作人试玩手感和强度。

### 仍未实现

- 未鉴定
- 强化
- 合成
- 诅咒
- 耐久
- 背包容量
- 投掷
- 商店
- 怪物屋
- 壶
- 据点
- Boss
- Godot

### 下一轮建议

```text
Web Demo v0.8 / 背包与投掷版
```
