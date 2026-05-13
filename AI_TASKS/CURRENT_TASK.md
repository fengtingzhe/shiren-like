# CURRENT_TASK: 当前任务

## 任务名称

`Web Demo v0.9 / 未鉴定与道具风险版`

## 背景

`v0.8` 已经补齐了背包容量和投掷，但卷轴与杖仍然完全透明。这一轮的目标是加入最小未鉴定体验，让部分策略道具带上信息风险，迫使玩家在安全和识别收益之间做判断。

## 本轮目标

- [x] 保留 `v0.8` 的背包、装备、怪物、陷阱、危险地形、镜头和 Console
- [x] 加入未鉴定配置
- [x] 加入每局随机未知名称映射
- [x] 加入识别状态
- [x] 支持未识别 / 已识别名称显示切换
- [x] 支持使用后识别
- [x] 支持投掷结算后识别
- [x] README、配置、smoke test、任务记录同步到 `v0.9`

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
- [x] 未识别卷轴和杖显示未知名称
- [x] 同一局内未知名称保持固定
- [x] 使用成功后能识别同类型道具
- [x] 投掷结算后能识别同类型道具
- [x] 已识别后背包、快捷栏和日志显示真实名称

## 下一轮建议

```text
Web Demo v1.0 / 单局体验整合与可读性打磨版
```
