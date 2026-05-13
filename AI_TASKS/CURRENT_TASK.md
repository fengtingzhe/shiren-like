# CURRENT_TASK: 当前任务

## 任务名称

`Web Demo v0.7.1 / 装备池补全与平衡版`

## 背景

`v0.7` 已经接入了最小装备系统，但装备池偏小，成长曲线不完整。这一轮只做补丁版：补齐高级武器和高级盾牌，并把装备替换与掉落逻辑稳定下来。

## 本轮目标

- [x] 保留 `v0.7` 的装备系统、怪物、陷阱、危险地形、镜头和 Console
- [x] 新增 `flame_sword / 火焰剑`
- [x] 新增 `guard_shield / 守护盾`
- [x] 微调 `1F / 2F / 3F` 装备掉落权重
- [x] 收紧装备替换与旧装备掉落逻辑
- [x] 保证装备不与怪物、道具、陷阱、危险地形、楼梯重叠
- [x] HUD、README、配置、smoke test、任务记录同步到 `v0.7.1`

## 本轮范围

- `D:\work\shiren-like\Builds\web-demo\game.js`
- `D:\work\shiren-like\Builds\web-demo\README.md`
- `D:\work\shiren-like\Data\config\web_demo_balance.json`
- `D:\work\shiren-like\Tests\web-demo-smoke.mjs`
- `D:\work\shiren-like\AI_TASKS\CURRENT_TASK.md`
- `D:\work\shiren-like\AI_TASKS\CHANGELOG.md`
- `D:\work\shiren-like\AI_TASKS\DEV_LOG.md`
- `D:\work\shiren-like\AI_TASKS\NEXT_CODEX_PROMPT.md`

## 本轮不做

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

## 验收标准

- [x] `node --check D:\work\shiren-like\Builds\web-demo\game.js`
- [x] `node --check D:\work\shiren-like\Tools\web-demo-server.mjs`
- [x] `node D:\work\shiren-like\Tests\web-demo-smoke.mjs`
- [x] 页面正常启动，无前端报错
- [x] 地图中仍会生成武器和盾牌
- [x] `3F` 有机会生成火焰剑和守护盾
- [x] 装备火焰剑后 `ATK` 正确增加
- [x] 装备守护盾后 `DEF` 正确增加
- [x] 按 `C` 仍能稳定装备或替换
- [x] 旧装备掉落逻辑稳定，无错误重叠

## 下一轮建议

```text
Web Demo v0.8 / 背包与投掷版
```
