# CURRENT_TASK: 当前任务

## 任务名称

`Web Demo v1.0 / 单局体验整合与可读性打磨版`

## 背景

`v0.9` 已经完成了未鉴定系统。这一轮的目标不是加入新大系统，而是把现有 Web Demo 打磨成一个可以稳定试玩、容易理解、反馈清晰的 1.0 单局体验。

## 本轮目标

- [x] 保留 v0.9 所有系统（未鉴定、背包、投掷、装备、陷阱、怪物、镜头、Console）
- [x] 开始界面操作说明改为三行分组
- [x] 开局日志中显示 3 条新手提示
- [x] 改进 4 处错误提示文案
- [x] HUD 添加睡眠状态指示器
- [x] 背包面板添加未识别标签
- [x] 敌人面板添加怪物行为标签（近战/远程/催眠/长枪）
- [x] 鉴定反馈信息增强（明确是通过使用还是投掷鉴定的）
- [x] 结算界面新增总回合数、已鉴定、获得装备 3 项统计
- [x] 1F 食物数量微调（[1,1] -> [0,1]）
- [x] 版本号、README、smoke test 同步到 v1.0

## 本轮范围

- `Builds/web-demo/index.html`
- `Builds/web-demo/styles.css`
- `Builds/web-demo/game.js`
- `Builds/web-demo/README.md`
- `Data/config/web_demo_balance.json`
- `Tests/web-demo-smoke.mjs`
- `AI_TASKS/CURRENT_TASK.md`
- `AI_TASKS/CHANGELOG.md`
- `AI_TASKS/DEV_LOG.md`

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

- [x] `node --check Builds/web-demo/game.js`
- [x] `node --check Tools/web-demo-server.mjs`
- [x] `node Tests/web-demo-smoke.mjs`
- [x] 开始界面能看懂基本操作
- [x] HUD 能清楚显示核心状态（含睡眠指示器）
- [x] 背包面板信息清楚（含未识别标签）
- [x] 快捷栏不明显泄露未鉴定真实名称
- [x] 未鉴定使用/投掷/识别反馈清楚
- [x] 怪物危险提示和敌人面板更容易理解（含行为标签）
- [x] 死亡/胜利结算能体现完整单局（含 6 项统计）
- [x] v0.9 未鉴定、v0.8 背包投掷等所有系统仍可用
- [x] 没有加入壶、商店、怪物屋、据点、Boss、Godot
- [x] 没有残留 kingdom-like 核心玩法

## 下一轮建议

```text
Web Demo v1.1 / 内容补点与体验修正版
```

不直接开始 v1.1，等待制作人试玩 v1.0 后确认。
