# CURRENT_TASK：当前任务

## 任务名称

Web Demo v0.2 / 道具策略版

---

## 背景

`Web Demo v0.1 / 最小可玩迷宫版` 已经实现格子迷宫、回合制移动、怪物追击、普通攻击、回复药、楼梯下楼、HP、楼层、回合、日志、胜负和通用 Console。

本轮由 Codex 执行 v0.2，目标是在 v0.1 基础上加入少量高辨识度道具，验证“道具可以改变战局”。

---

## 本任务服务的 Demo 目标

- [x] 回复药用于保命
- [x] 食物作为 v0.3 饥饿系统占位资源
- [x] 传送卷轴用于逃离危险
- [x] 睡眠卷轴用于控场
- [x] 火球杖用于远程攻击
- [x] 换位杖用于位置解局
- [x] 快捷道具栏和道具数量显示
- [ ] v0.3 随机迷宫与饥饿压力
- [ ] Godot 迁移

---

## 范围

本轮完成：

- 扩展 `Data/config/web_demo_balance.json` 为 v0.2 配置；
- 更新 3 层地图，加入 `p/f/t/z/r/x` 多种道具标记；
- 更新 `Builds/web-demo/index.html`，加入满腹度和 6 个道具按钮；
- 更新 `Builds/web-demo/styles.css`，支持更密集的快捷道具栏；
- 更新 `Builds/web-demo/game.js`，实现多道具拾取和使用逻辑；
- 更新 `Builds/web-demo/README.md`；
- 更新 `Tests/web-demo-smoke.mjs`；
- 更新 `AI_TASKS/CHANGELOG.md`、`AI_TASKS/DEV_LOG.md` 和 `AI_TASKS/NEXT_CODEX_PROMPT.md`。

---

## 本轮不做

- 不做完整饥饿系统；
- 不做饥饿死亡；
- 不做完整背包界面；
- 不做未鉴定；
- 不做装备；
- 不做陷阱；
- 不做怪物屋；
- 不做壶；
- 不做商店；
- 不做据点；
- 不做复杂随机地图；
- 不做 Godot 工程；
- 不引入 React、Phaser、Three.js 或复杂 npm 依赖；
- 不做商业化系统。

---

## 验收标准

- [x] `node --check Builds/web-demo/game.js` 通过；
- [x] `node --check Tools/web-demo-server.mjs` 通过；
- [x] `node Tests/web-demo-smoke.mjs` 通过；
- [x] `node Tools/web-demo-server.mjs` 可以启动；
- [x] `http://127.0.0.1:4173/Builds/web-demo/` 可以打开；
- [x] 玩家可以拾取多种道具；
- [x] 玩家可以使用回复药恢复 HP；
- [x] 玩家可以使用食物恢复满腹度；
- [x] 玩家可以使用传送卷轴逃离危险；
- [x] 玩家可以使用睡眠卷轴让怪物暂时不行动；
- [x] 玩家可以使用火球杖远程攻击怪物；
- [x] 玩家可以使用换位杖与怪物交换位置；
- [x] 道具使用后日志有反馈；
- [x] 成功道具使用后推进回合；
- [x] 没有加入后置复杂系统；
- [x] 新 Web Demo 代码不再保留旧 kingdom-like 核心玩法词。

---

## 下一轮建议

```text
Web Demo v0.3 / 随机迷宫与饥饿压力版
```

建议先由人类制作人试玩 v0.2，确认道具是否真的能改变战局，再决定 v0.3 的随机迷宫和饥饿压力范围。
