# CHANGELOG

## 2026-05-13 / v0.7 / 装备与数值成长版

### 已完成

- [x] 配置升级到 `v0.7`
- [x] 新增装备配置 `equipment`
- [x] 新增四件最小装备
  - `Short Sword`
  - `Spear`
  - `Wooden Shield`
  - `Iron Shield`
- [x] 地牢生成加入装备掉落权重
- [x] 玩家新增 `weapon / shield` 装备位
- [x] 玩家攻击改为读取派生 `ATK`
- [x] 怪物攻击改为读取派生 `DEF`
- [x] 站在装备上可按 `C` 装备或替换
- [x] HUD 新增 `ATK / DEF / 武器 / 盾牌`
- [x] 主画面与小地图加入装备显示
- [x] 更新 README、smoke test 和任务记录

### 本轮未做

- [ ] 未鉴定
- [ ] 背包容量
- [ ] 投掷
- [ ] 怪物屋
- [ ] 壶
- [ ] 商店
- [ ] 据点
- [ ] Boss
- [ ] Godot

### 下一轮建议

```text
Web Demo v0.8 / 背包与投掷版
```

## 2026-05-13 / v0.6 / 陷阱与危险地形版

- 加入 `Spike Trap / Warp Trap / Sleep Trap`
- 加入 `Poison Pool`
- 危险内容按楼层权重生成
- 复用睡眠与安全传送逻辑
- 小地图和主画面加入 hazard 表现

## 2026-05-13 / v0.5 / 怪物机制版

- 加入四种行为差异明显的怪物
- 敌人面板与威胁格按行为显示
