# CHANGELOG

## 2026-05-13 / v0.4 / 镜头与画面表现调整版

### 本轮目标

在 v0.3 随机迷宫与饥饿压力版基础上，不新增玩法，重点调整镜头、地牢绘制和 HUD 布局，让 Web Demo 更接近目标战术地牢观感。

---

### 已完成

- [x] 将 `Builds/web-demo/index.html` 调整为左上状态、右上小地图、右侧敌人面板、底部快捷栏布局；
- [x] 重写 `Builds/web-demo/styles.css`，改为 16:9 战术地牢 HUD；
- [x] 在 `Builds/web-demo/game.js` 中实现 `tileToScreen` 等距感投影和 `screenToTile` 逆变换；
- [x] 将地板改为菱形格、墙体改为带高度的立体块；
- [x] 按地块深度排序绘制楼梯、道具、怪物和玩家；
- [x] 加入蓝色半透明行动范围；
- [x] 加入红色半透明威胁范围；
- [x] 加入小地图绘制逻辑；
- [x] 加入右侧敌人面板和简化行动序列；
- [x] 保留 v0.3 的随机迷宫、饥饿、怪物追击、回复药、食物、传送卷轴、睡眠卷轴、火球杖和换位杖；
- [x] 将 `Data/config/web_demo_balance.json` 升级为 v0.4；
- [x] 更新 `Builds/web-demo/README.md`；
- [x] 更新 `Tests/web-demo-smoke.mjs`；
- [x] 更新 `Tools/web-demo-server.mjs`，清理旧 `kingdom-like` 启动文案；
- [x] 更新 `AI_TASKS/CURRENT_TASK.md`；
- [x] 更新 `AI_TASKS/DEV_LOG.md`；
- [x] 更新 `AI_TASKS/NEXT_CODEX_PROMPT.md` 为 v0.5 建议草案。

---

### 本轮未做

- [ ] 未加入新怪物机制；
- [ ] 未加入弓手怪、爆弹怪、骷髅枪兵等规则怪；
- [ ] 未加入未鉴定；
- [ ] 未加入装备；
- [ ] 未加入陷阱；
- [ ] 未加入怪物屋；
- [ ] 未加入壶；
- [ ] 未加入商店；
- [ ] 未加入据点；
- [ ] 未加入复杂 Boss；
- [ ] 未创建 Godot 工程；
- [ ] 未制作最终美术。

---

### 下一轮建议

```text
Web Demo v0.5 / 怪物机制版
```

建议先完成 v0.4 试玩反馈，再决定第一批规则怪物是优先做远程压制、睡眠干扰，还是隔格攻击。

## 2026-05-13 / v0.3 / 随机迷宫与饥饿压力版

### 本轮目标

在 v0.2 道具策略版基础上加入简单随机迷宫生成和轻量饥饿压力，验证“随机探索 + 搜刮与下楼取舍”。

---

### 已完成

- [x] 扩展 `Data/config/web_demo_balance.json` 为 v0.3 配置；
- [x] 新增 `dungeon.generation` 随机迷宫参数；
- [x] 新增 `hunger` 饥饿参数；
- [x] 在 `Builds/web-demo/game.js` 中实现 `generateDungeon`、`generateRooms`、`connectRooms` 等随机房间 / 走廊生成；
- [x] 玩家出生在第一个房间，楼梯生成在远离玩家的房间；
- [x] 怪物、回复药、食物和策略道具随机分布在合法地板格；
- [x] 每次下楼都会重新生成楼层；
- [x] 满腹度随有效回合下降；
- [x] 满腹度低时 HUD 变色并写入日志；
- [x] 满腹度为 0 后产生轻微 HP 压力；
- [x] 食物恢复满腹度；
- [x] 饥饿死亡与怪物死亡原因区分；
- [x] 保留 v0.2 的回复药、食物、传送卷轴、睡眠卷轴、火球杖、换位杖功能；
- [x] 更新 `Builds/web-demo/README.md`；
- [x] 更新 `Tests/web-demo-smoke.mjs`；
- [x] 更新 `AI_TASKS/CURRENT_TASK.md`；
- [x] 更新 `AI_TASKS/DEV_LOG.md`；
- [x] 更新 `AI_TASKS/NEXT_CODEX_PROMPT.md` 为 v0.4 建议草案。

---

### 本轮未做

- [ ] 未加入未鉴定；
- [ ] 未加入装备；
- [ ] 未加入陷阱；
- [ ] 未加入怪物屋；
- [ ] 未加入壶；
- [ ] 未加入商店；
- [ ] 未加入据点；
- [ ] 未加入复杂 Boss；
- [ ] 未加入多种怪物；
- [ ] 未创建 Godot 工程；
- [ ] 未制作最终美术。

---

### 下一轮建议

```text
Web Demo v0.4 / 怪物机制版
```

建议先完成 v0.3 试玩反馈，再决定 v0.4 的第一批规则怪物。

---

## 2026-05-13 / v0.2 / 道具策略版

### 本轮目标

在 v0.1 最小迷宫闭环基础上加入少量策略道具，验证“道具可以改变战局”。

---

### 已完成

- [x] 扩展 `Data/config/web_demo_balance.json` 为 v0.2 配置；
- [x] 在 3 层固定地图中加入 `p/f/t/z/r/x` 多种道具标记；
- [x] 在 `Builds/web-demo/index.html` 中加入满腹度、食物、传送卷轴、睡眠卷轴、火球杖、换位杖按钮；
- [x] 更新 `Builds/web-demo/styles.css`，支持更密集的快捷道具栏；
- [x] 更新 `Builds/web-demo/game.js`，实现多道具拾取和快捷使用；
- [x] 保留回复药 HP 恢复逻辑；
- [x] 加入食物和满腹度占位，但不启用饥饿死亡；
- [x] 加入传送卷轴，用于随机传送到安全地板；
- [x] 加入睡眠卷轴，让 4 格内怪物睡眠 3 回合；
- [x] 加入火球杖，朝当前朝向远程攻击直线第一个怪物；
- [x] 加入换位杖，与当前朝向直线第一个怪物交换位置；
- [x] 更新 `Builds/web-demo/README.md`，记录 v0.2 道具和快捷键；
- [x] 更新 `Tests/web-demo-smoke.mjs`，检查 v0.2 道具逻辑和配置；
- [x] 更新 `AI_TASKS/CURRENT_TASK.md`；
- [x] 更新 `AI_TASKS/DEV_LOG.md`；
- [x] 更新 `AI_TASKS/NEXT_CODEX_PROMPT.md` 为 v0.3 建议草案。

---

### 本轮未做

- [ ] 未加入完整饥饿系统；
- [ ] 未加入饥饿死亡；
- [ ] 未加入完整背包界面；
- [ ] 未加入未鉴定；
- [ ] 未加入装备；
- [ ] 未加入陷阱；
- [ ] 未加入怪物屋；
- [ ] 未加入壶；
- [ ] 未加入商店；
- [ ] 未创建 Godot 工程；
- [ ] 未制作最终美术。

---

### 下一轮建议

```text
Web Demo v0.3 / 随机迷宫与饥饿压力版
```

建议先完成 v0.2 试玩反馈，再决定 v0.3 是否同时加入随机房间、随机道具和轻量饥饿压力。

---

## 2026-05-13 / v0.1 / 最小可玩迷宫版

### 本轮目标

将旧 Web Demo 占位逻辑替换为最小可玩的 `shiren-like` / Mystery Dungeon 原型。

---

### 已完成

- [x] 重写 `Builds/web-demo/index.html`，将 HUD 改为 HP、楼层、回合、回复药、行动按钮和 Console；
- [x] 重写 `Builds/web-demo/styles.css`，改为清晰俯视格子迷宫界面；
- [x] 重写 `Builds/web-demo/game.js`，实现格子移动、回合推进、怪物行动、普通攻击、回复药、楼梯和结算；
- [x] 将 `Data/config/web_demo_balance.json` 改为 v0.1 迷宫、玩家、怪物和回复药配置；
- [x] 更新 `Builds/web-demo/README.md`，记录 v0.1 运行方式、已实现内容和未实现内容；
- [x] 更新 `Tests/web-demo-smoke.mjs`，检查 v0.1 文件、配置、核心逻辑和旧核心词清理；
- [x] 更新 `AI_TASKS/CURRENT_TASK.md`；
- [x] 更新 `AI_TASKS/DEV_LOG.md`；
- [x] 更新 `AI_TASKS/NEXT_CODEX_PROMPT.md` 为 v0.2 建议草案。

---

### 本轮未做

- [ ] 未加入饥饿；
- [ ] 未加入完整背包；
- [ ] 未加入未鉴定；
- [ ] 未加入装备；
- [ ] 未加入陷阱；
- [ ] 未加入怪物屋；
- [ ] 未加入壶；
- [ ] 未加入商店；
- [ ] 未创建 Godot 工程；
- [ ] 未制作最终美术。

---

### 下一轮建议

```text
Web Demo v0.2 / 道具策略版
```

建议先完成 v0.1 试玩反馈，再决定 v0.2 的道具列表和简化背包范围。

---

## 2026-05-13 / v0.0 / 项目重定向版

### 本轮目标

将项目从旧 `kingdom-like` 轻策略探索建造方向重定向为 `shiren-like`：一款现代化 Mystery Dungeon Roguelike Demo。

---

### 已完成

- [x] 更新 `README.md`，将项目名和项目定位改为 `shiren-like`；
- [x] 更新 `DESIGN_HUB/01_PROJECT_BRIEF.md`，明确项目类型为 Mystery Dungeon / Traditional Roguelike / 回合制格子迷宫；
- [x] 更新 `DESIGN_HUB/02_CORE_GAMEPLAY.md`，明确核心循环为迷宫探索、回合制、怪物、道具、楼梯与死亡复盘；
- [x] 更新 `DESIGN_HUB/03_PLAYER_EXPERIENCE.md`，明确高密度决策、道具解局、死亡可复盘等目标体验；
- [x] 更新 `DESIGN_HUB/04_SYSTEM_OVERVIEW.md`，改为回合、地图、移动、战斗、怪物、道具、背包、饥饿、陷阱、UI、死亡复盘等系统；
- [x] 更新 `DESIGN_HUB/05_ECONOMY_AND_BALANCE.md`，移除金币建造经济，改为 HP、楼层、道具、背包、饥饿、回合数等资源压力；
- [x] 更新 `DESIGN_HUB/06_CONTENT_PLAN.md`，制定 v0.1 到 v0.7 的内容计划；
- [x] 更新 `DESIGN_HUB/07_ART_AND_AUDIO_DIRECTION.md`，明确格子、主角、怪物、道具、楼梯的可读性优先；
- [x] 更新 `DESIGN_HUB/08_UX_FLOW.md`，明确移动、攻击、道具、下楼、死亡结算流程；
- [x] 更新 `DESIGN_HUB/09_DECISIONS.md`，记录项目重定向、先 Web Demo、v0.1 最小闭环等决策；
- [x] 更新 `DESIGN_HUB/10_OPEN_QUESTIONS.md`，记录 v0.1 视角、重写方式、地图生成、饥饿和背包时机等待决策问题；
- [x] 更新 `DESIGN_HUB/12_DEMO_SCOPE.md`，明确 v0.0～v2.x 版本路线；
- [x] 更新 `AI_TASKS/CURRENT_TASK.md`；
- [x] 更新 `AI_TASKS/DEV_LOG.md`；
- [x] 更新 `AI_TASKS/NEXT_CODEX_PROMPT.md` 为下一轮 `Web Demo v0.1 / 最小可玩迷宫版`；
- [x] 更新 `Builds/web-demo/README.md`，标明当前 Web Demo 仍是旧占位，v0.1 将重写；
- [x] 更新 `Tests/web-demo-smoke.mjs`，让 smoke test 适配 v0.0 文档重定向阶段；
- [x] 新增 `Docs/Archive/kingdom-like/README.md`，记录旧项目方向已归档。

---

### 本轮未做

- [ ] 未实现 v0.1 玩法；
- [ ] 未重写 `Builds/web-demo/game.js`；
- [ ] 未实现随机迷宫；
- [ ] 未实现背包；
- [ ] 未实现饥饿；
- [ ] 未实现未鉴定、装备、陷阱、怪物屋、壶、商店；
- [ ] 未创建 Godot 工程；
- [ ] 未制作最终美术。

---

### 下一轮任务

```text
Web Demo v0.1 / 最小可玩迷宫版
```

下一轮由 Codex 执行，目标是重写 Web Demo，完成格子迷宫、回合制移动、1 种怪物、普通攻击、1 种回复药、楼梯、HP、楼层、日志、3 层胜利和 HP 为 0 失败。

---

## 历史说明

本仓库在 2026-05-13 前曾用于 `kingdom-like` 轻策略探索建造 Demo。自 v0.0 起，项目方向已重定向为 `shiren-like`。旧方向记录保留在 Git 历史和 `Docs/Archive/kingdom-like/README.md` 中。
