# CURRENT_TASK: 当前任务

## 任务名称

`Web Demo v0.7 / 装备与数值成长版`

## 背景

`v0.6` 已经把怪物、陷阱和危险地形接起来了，但玩家数值仍然几乎不变。这一轮的目标是加入最小可玩的装备系统，让探索中的“捡还是不捡、换还是不换”开始形成取舍。

## 本轮目标

- [x] 保留 `v0.6` 的随机迷宫、怪物、陷阱、危险地形、镜头和 Console
- [x] 加入 `weapon / shield` 两个装备位
- [x] 新增最小装备池并进入随机地牢生成
- [x] 让装备影响 `ATK / DEF`
- [x] 让玩家站在装备上按 `C` 装备或替换
- [x] 替换时把旧装备掉回脚下
- [x] HUD 显示 `ATK / DEF / weapon / shield`
- [x] README、配置、smoke test、任务记录同步到 `v0.7`

## 本轮范围

- `D:\work\shiren-like\Builds\web-demo\game.js`
- `D:\work\shiren-like\Builds\web-demo\index.html`
- `D:\work\shiren-like\Builds\web-demo\styles.css`
- `D:\work\shiren-like\Builds\web-demo\README.md`
- `D:\work\shiren-like\Data\config\web_demo_balance.json`
- `D:\work\shiren-like\Tests\web-demo-smoke.mjs`
- `D:\work\shiren-like\AI_TASKS\CURRENT_TASK.md`
- `D:\work\shiren-like\AI_TASKS\CHANGELOG.md`
- `D:\work\shiren-like\AI_TASKS\DEV_LOG.md`
- `D:\work\shiren-like\AI_TASKS\NEXT_CODEX_PROMPT.md`

## 本轮不做

- 未鉴定
- 背包容量
- 投掷
- 怪物屋
- 壶
- 商店
- 据点
- Boss
- Godot

## 验收标准

- [x] `node --check D:\work\shiren-like\Builds\web-demo\game.js`
- [x] `node --check D:\work\shiren-like\Tools\web-demo-server.mjs`
- [x] `node D:\work\shiren-like\Tests\web-demo-smoke.mjs`
- [x] 页面正常启动，无前端报错
- [x] 地图内能生成武器和盾牌
- [x] 站在装备上按 `C` 可以装备或替换
- [x] `ATK / DEF` 会随装备变化
- [x] 怪物攻击会吃到防御减伤

## 下一轮建议

```text
Web Demo v0.8 / 背包与投掷版
```
