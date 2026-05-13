# CURRENT_TASK: 当前任务

## 任务名称

`Web Demo v0.5 / 怪物机制版`

## 背景

`v0.4.3` 已经完成玩家中心镜头和 `Console / Camera / View` 调参，但敌人仍然过于单一。本轮目标是加入少量行为差异明确的怪物，让玩家必须根据怪物类型调整走位和道具使用。

## 本轮目标

- [x] 保留随机房间、饥饿、镜头、小地图、敌人面板和快捷栏
- [x] 把单一怪物扩展为多怪物配置
- [x] 加入 `Slime / Goblin Archer / Sleep Mushroom / Skeleton Spearman`
- [x] 按楼层权重生成不同怪物组合
- [x] 保留按房间分配怪物
- [x] 加入玩家睡眠状态与自动跳回合
- [x] 按怪物行为显示不同威胁格
- [x] 更新敌人面板，显示图标、颜色、HP、状态或冷却
- [x] 更新 README、配置、smoke test 和任务记录

## 本轮范围

- `Builds/web-demo/game.js`
- `Builds/web-demo/README.md`
- `Data/config/web_demo_balance.json`
- `Tests/web-demo-smoke.mjs`
- `AI_TASKS/CURRENT_TASK.md`
- `AI_TASKS/CHANGELOG.md`
- `AI_TASKS/DEV_LOG.md`
- `AI_TASKS/NEXT_CODEX_PROMPT.md`

## 本轮不做

- 不改镜头主方向
- 不移除 `Console / Camera / View`
- 不做陷阱、未鉴定、装备、怪物屋、壶、商店、据点、Boss、Godot

## 验收标准

- [x] `node --check Builds/web-demo/game.js`
- [x] `node --check Tools/web-demo-server.mjs`
- [x] `node Tests/web-demo-smoke.mjs`
- [x] Demo 中出现多种怪物
- [x] 弓手远程攻击不穿墙
- [x] 蘑菇能让玩家睡眠并跳回合
- [x] 枪兵能隔 1 格攻击
- [x] 威胁格和敌人面板能反映怪物差异

## 下一轮建议

```text
Web Demo v0.6 / 陷阱与危险地形版
```
