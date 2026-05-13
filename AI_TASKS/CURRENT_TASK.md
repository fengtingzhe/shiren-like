# CURRENT_TASK: 当前任务

## 任务名称

`Web Demo v0.8 / 背包与投掷版`

## 背景

`v0.7.1` 已经补齐了装备成长，但玩家仍然可以无限持有物品。这一轮的目标是加入最小背包压力，并让背包里的物品可以沿当前朝向投掷出去，形成新的取舍和战术入口。

## 本轮目标

- [x] 保留 `v0.7.1` 的装备、怪物、陷阱、危险地形、镜头和 Console
- [x] 加入背包容量
- [x] 加入地面物品拾取取舍
- [x] 加入背包面板 UI
- [x] 支持从背包使用消耗品
- [x] 支持从背包装备备用装备
- [x] 支持从背包投掷物品
- [x] README、配置、smoke test、任务记录同步到 `v0.8`

## 本轮范围

- `D:\work\shiren-like\Builds\web-demo\index.html`
- `D:\work\shiren-like\Builds\web-demo\styles.css`
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
- 壶
- 商店
- 怪物屋
- 据点
- Boss
- Godot

## 验收标准

- [x] `node --check D:\work\shiren-like\Builds\web-demo\game.js`
- [x] `node --check D:\work\shiren-like\Tools\web-demo-server.mjs`
- [x] `node D:\work\shiren-like\Tests\web-demo-smoke.mjs`
- [x] 页面正常启动，无前端报错
- [x] HUD 或面板显示背包容量
- [x] 背包满时不能继续拾取新物品
- [x] 同类型消耗品可堆叠并正确占格
- [x] 背包面板可显示物品、数量和装备数值
- [x] 背包中可以使用消耗品
- [x] 背包中可以投掷物品

## 下一轮建议

```text
Web Demo v0.9 / 未鉴定与道具风险版
```
