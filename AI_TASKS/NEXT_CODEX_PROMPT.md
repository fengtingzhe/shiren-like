# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

v0.0 / 项目重定向版：从 kingdom-like 转为 shiren-like

---

## 给 Codex 的提示词

你正在协助开发 `shiren-like` 项目。

当前仓库内仍然保留了上一款游戏 `kingdom-like` 的大量文档和 Web Demo 内容。现在人类制作人已经明确决定：以现有仓库结构为基础，停止继续开发 kingdom-like，将项目正式重定向为一款类《风来的西林》/ Mystery Dungeon Roguelike 游戏。

本轮任务不是开发完整游戏，也不是立刻实现复杂玩法，而是完成 `v0.0 / 项目重定向版`：

```text
保留仓库的工程组织方式、AI 协作流程、Web Demo 快速验证流程、配置化和测试思路；
替换原有 kingdom-like 的项目定位、核心玩法、目标体验、系统规划和任务记录；
为下一轮 Web Demo v0.1 / 最小可玩迷宫版做好文档和任务准备。
```

---

## 一、开始前必须阅读

请按顺序阅读以下文件：

1. `README.md`
2. `AI_RULES/00_MASTER_PROMPT.md`
3. `AI_RULES/01_AI_READ_ORDER.md`
4. `AI_RULES/02_AI_EDIT_PERMISSION.md`
5. `AI_RULES/03_TECHNICAL_RULES.md`
6. `AI_RULES/04_DATA_RULES.md`
7. `AI_RULES/05_ASSET_RULES.md`
8. `AI_RULES/06_VALIDATION_CHECKLIST.md`
9. `AI_RULES/07_AI_ROLE_SPLIT.md`
10. `DESIGN_HUB/00_DESIGN_INDEX.md`
11. `DESIGN_HUB/01_PROJECT_BRIEF.md`
12. `DESIGN_HUB/02_CORE_GAMEPLAY.md`
13. `DESIGN_HUB/03_PLAYER_EXPERIENCE.md`
14. `DESIGN_HUB/04_SYSTEM_OVERVIEW.md`
15. `DESIGN_HUB/05_ECONOMY_AND_BALANCE.md`
16. `DESIGN_HUB/06_CONTENT_PLAN.md`
17. `DESIGN_HUB/07_ART_AND_AUDIO_DIRECTION.md`
18. `DESIGN_HUB/08_UX_FLOW.md`
19. `DESIGN_HUB/09_DECISIONS.md`
20. `DESIGN_HUB/10_OPEN_QUESTIONS.md`
21. `DESIGN_HUB/12_DEMO_SCOPE.md`
22. `DESIGN_HUB/13_DEBUG_CONSOLE.md`
23. `AI_TASKS/CURRENT_TASK.md`
24. `AI_TASKS/CHANGELOG.md`
25. `AI_TASKS/DEV_LOG.md`
26. `AI_TASKS/REVIEW_LOG.md`
27. `Builds/web-demo/README.md`
28. `Builds/web-demo/index.html`
29. `Builds/web-demo/styles.css`
30. `Builds/web-demo/game.js`
31. `Data/config/web_demo_balance.json`
32. `Tests/web-demo-smoke.mjs`

阅读后，先输出：

```text
我已理解当前项目将从 kingdom-like 重定向为 shiren-like，本轮只做 v0.0 项目重定向，不实现完整玩法。
```

然后再开始修改文件。

---

## 二、本轮核心目标

将项目从旧的 `kingdom-like` 玩法正式重定向为 `shiren-like`。

新的项目定位：

```text
一款现代化 Mystery Dungeon Roguelike Demo：玩家在随机迷宫中逐层探索，以回合制格子移动、道具组合、怪物机制、陷阱、饥饿压力和死亡复盘为核心，体验“每一步都是决策”的高密度迷宫冒险。
```

当前阶段目标：

```text
先用 Web Demo 快速验证核心玩法；
再进入 Godot Demo；
Demo 阶段重点是可试玩、可展示、可验证，不追求完整商业化游戏。
```

---

## 三、本轮设计原则

### 保留的仓库基础

保留现有仓库的这些工作方式：

- `DESIGN_HUB/` 管项目方向和设计边界；
- `AI_RULES/` 管 AI 工作规则；
- `AI_TASKS/` 管任务、变更记录和下一轮 Codex 提示词；
- `Data/` 管配置；
- `Builds/web-demo/` 管 Web Demo；
- `Tools/` 管本地启动和辅助工具；
- `Tests/` 管 smoke test；
- 继续采用“先 Web Demo，后 Godot Demo”的开发策略；
- 继续保留 `v0.x = Web Demo`、`v1.x = Godot Demo`、`v2.x = 可展示垂直切片` 的版本阶段。

### 替换的旧玩法内容

将旧 kingdom-like 中的以下内容替换为 shiren-like 内容：

| 旧内容 | 新内容 |
|---|---|
| 探索森林 | 探索随机迷宫 |
| 金币单资源 | HP、饥饿、道具、楼层压力 |
| 工人砍树 | 玩家回合制行动 |
| 建墙 / 建塔 | 道具、陷阱、怪物、地形博弈 |
| 夜晚防守 | 楼层推进、怪物屋、饥饿、逃生压力 |
| 王国边界扩张 | 迷宫逐层深入 |
| 固定地图节点 | 随机房间、通道、怪物、道具、陷阱 |

---

## 四、需要更新的文件

本轮允许修改：

```text
README.md
DESIGN_HUB/01_PROJECT_BRIEF.md
DESIGN_HUB/02_CORE_GAMEPLAY.md
DESIGN_HUB/03_PLAYER_EXPERIENCE.md
DESIGN_HUB/04_SYSTEM_OVERVIEW.md
DESIGN_HUB/05_ECONOMY_AND_BALANCE.md
DESIGN_HUB/06_CONTENT_PLAN.md
DESIGN_HUB/07_ART_AND_AUDIO_DIRECTION.md
DESIGN_HUB/08_UX_FLOW.md
DESIGN_HUB/09_DECISIONS.md
DESIGN_HUB/10_OPEN_QUESTIONS.md
DESIGN_HUB/12_DEMO_SCOPE.md
AI_TASKS/CURRENT_TASK.md
AI_TASKS/CHANGELOG.md
AI_TASKS/DEV_LOG.md
AI_TASKS/NEXT_CODEX_PROMPT.md
Builds/web-demo/README.md
Tests/web-demo-smoke.mjs
```

本轮可以谨慎修改但不是必须：

```text
Builds/web-demo/index.html
Builds/web-demo/styles.css
Builds/web-demo/game.js
Data/config/web_demo_balance.json
```

如果不改 Web Demo 代码，也可以只在文档中明确：旧 Web Demo 仍是待替换内容，不代表当前新玩法。

---

## 五、本轮禁止事项

本轮不要做以下事情：

- 不要直接实现完整 Shiren-like 游戏；
- 不要一次性实现随机迷宫、背包、未鉴定、饥饿、怪物屋、装备、壶、商店等全部系统；
- 不要引入 React、Phaser、Three.js 或复杂 npm 依赖；
- 不要创建完整商业化系统；
- 不要创建正式后端；
- 不要修改 `AI_RULES/` 的基础工作规则，除非只是将项目名从 kingdom-like 替换为 shiren-like 的必要措辞；
- 不要删除旧 kingdom-like 资料，应尽量归档或标记为旧项目内容；
- 不要把 Web Demo 宣称为最终游戏。

---

## 六、README.md 更新要求

将 README 改为 `shiren-like` 项目说明。

建议结构：

```markdown
# shiren-like

本项目采用“游戏工程 + AI 协作规则 + 设计文档 + 数据配置”分离的结构。

当前阶段目标不是让 AI 一次性完成复杂商业游戏，而是借助 AI 快速搭建可试玩、可展示、可验证的 Mystery Dungeon Roguelike Demo。

## 项目一句话描述

一款现代化 Mystery Dungeon Roguelike Demo：玩家在随机迷宫中逐层探索，以回合制格子移动、道具组合、怪物机制、陷阱、饥饿压力和死亡复盘为核心，体验“每一步都是决策”的高密度迷宫冒险。

## 当前开发目标

当前阶段目标是完成第一版 Web Demo，验证：

- 核心玩法闭环：探索迷宫 → 回合制移动 → 遭遇怪物 → 使用道具解局 → 找到楼梯 → 进入下一层；
- 基础 UI 流程：HP、饥饿、楼层、背包、当前危险提示；
- 基础数值配置：玩家 HP、怪物属性、道具效果、楼层生成参数；
- 可运行、可试玩、可展示版本。

## 当前版本不追求

- 最终美术品质；
- 完整商业化；
- 完整后端；
- 完整随机迷宫深度；
- 完整道具库；
- 完整装备强化；
- 完整商店；
- 完整剧情；
- 完整上线品质。
```

同时保留目录结构和 AI 工作流说明，但把 kingdom-like 的玩法边界替换为 shiren-like 的边界。

---

## 七、DESIGN_HUB 文档更新要求

### 01_PROJECT_BRIEF.md

重写为 shiren-like 项目定位。

必须包含：

- 游戏类型：Mystery Dungeon / Traditional Roguelike / 回合制格子迷宫；
- 参考方向：风来的西林、不可思议迷宫类、现代 Roguelike 可读性优化；
- 目标体验：每一步都是决策、道具解局、死亡复盘、随机冒险；
- 当前 Demo 目标：验证最小可玩闭环，而不是完整商业游戏。

---

### 02_CORE_GAMEPLAY.md

重写核心玩法。

必须包含：

```text
玩家进入迷宫
↓
在格子地图中回合制移动
↓
发现道具 / 怪物 / 陷阱 / 楼梯
↓
通过普通攻击、走位和道具解决危机
↓
管理 HP、饥饿和背包资源
↓
找到楼梯进入下一层
↓
死亡后结算并复盘原因
```

核心保留：

- 格子地图；
- 回合制；
- 随机迷宫；
- 随机道具；
- 怪物机制；
- 陷阱；
- 饥饿；
- 死亡代价；
- 死亡复盘。

当前 v0.1 最小闭环只做：

- 小型固定或半随机迷宫；
- 玩家移动；
- 回合制；
- 1 种怪物；
- 普通攻击；
- 1 种回复药；
- 楼梯；
- HP；
- 当前层数；
- 简单胜负。

---

### 03_PLAYER_EXPERIENCE.md

重写目标体验。

关键词：

- 紧张；
- 高密度决策；
- 死亡可复盘；
- 道具改变局势；
- 随机但公平；
- 看起来简单，玩起来有深度。

前 1 分钟体验：

- 明白自己在格子迷宫中移动；
- 明白玩家动一次，怪物动一次；
- 完成一次攻击；
- 捡到并使用一次回复药或道具；
- 看到楼梯目标。

前 5 分钟体验：

- 进入 2～3 层；
- 遭遇至少 2 种危险；
- 用道具解决一次危机；
- 明白继续探索和快速下楼之间的取舍。

---

### 04_SYSTEM_OVERVIEW.md

重写系统总览。

推荐系统：

| 系统 | Demo 阶段目标 |
|---|---|
| 回合系统 | 玩家行动一次，怪物行动一次 |
| 地图系统 | 房间、通道、墙、地板、楼梯 |
| 移动系统 | 格子移动、碰撞、等待 |
| 战斗系统 | 普通攻击、伤害、死亡 |
| 怪物系统 | 基础追击、攻击、特殊能力预留 |
| 道具系统 | 捡起、使用、丢弃、效果 |
| 背包系统 | 格子限制、快捷使用 |
| 饥饿系统 | v0.3 后加入，制造探索节奏压力 |
| 陷阱系统 | v0.6 后加入 |
| UI 系统 | HP、饥饿、楼层、背包、日志 |
| 死亡复盘 | 死因、最近回合记录、再来一局 |

---

### 05_ECONOMY_AND_BALANCE.md

重写为 Roguelike 数值与资源管理。

不要再写金币单资源。

核心资源：

- HP；
- 饥饿 / 满腹度；
- 背包格子；
- 道具数量；
- 楼层深度；
- 回合数；
- 经验 / 等级可后置。

核心数值：

- 玩家 HP；
- 怪物 HP / 攻击；
- 道具掉落率；
- 食物掉落率；
- 饥饿下降速度；
- 楼层怪物密度；
- 陷阱密度；
- 背包容量。

---

### 06_CONTENT_PLAN.md

重写内容计划。

v0.1 最小内容：

- 1 名玩家；
- 1 种怪物；
- 1 种回复药；
- 1 个楼梯；
- 3 层迷宫；
- HP；
- 简单胜负。

v0.2 内容：

- 回复药；
- 食物；
- 传送卷轴；
- 睡眠卷轴；
- 火球杖；
- 换位杖；
- 识别卷轴；
- 背包。

v0.4 怪物：

- 史莱姆；
- 哥布林弓手；
- 盗贼狸；
- 催眠蘑菇；
- 爆弹怪；
- 骷髅枪兵。

---

### 07_ART_AND_AUDIO_DIRECTION.md

重写美术和音频方向。

方向：

- 45 度斜俯视角或清晰俯视格子；
- 主角、怪物、道具、楼梯、陷阱必须清楚；
- 地面格子可读；
- UI 克制，但 HP、饥饿、楼层、背包必须清楚；
- 风格可以是轻量手绘 / 2.5D / 像素占位，但不能像纯插画。

---

### 08_UX_FLOW.md

重写 UX。

核心流程：

- 开始 Demo；
- 进入第 1 层；
- 移动；
- 攻击；
- 捡道具；
- 使用道具；
- 找楼梯；
- 下楼；
- 死亡 / 胜利结算；
- 再来一局。

HUD：

- HP；
- 饥饿；
- 当前层数；
- 背包快捷栏；
- 当前日志；
- 当前目标提示。

---

### 09_DECISIONS.md

新增已确认决策。

必须记录：

1. 项目从 kingdom-like 重定向为 shiren-like；
2. 当前阶段先做 Web Demo；
3. Demo 目标是验证 Mystery Dungeon 最小闭环；
4. 后续仍可迁移 Godot；
5. 不再继续开发旧 kingdom-like 玩法；
6. v0.1 只做最小可玩迷宫，不做复杂系统。

---

### 10_OPEN_QUESTIONS.md

如果你发现以下问题没有明确答案，请写入待决策：

- 第一版是纯俯视格子，还是 45 度斜俯视？
- 第一版是否保留旧 Web Demo 的 Canvas 结构，还是完全重写？
- 第一版迷宫是固定地图还是简单随机地图？
- 第一版是否加入饥饿，还是 v0.3 再加入？
- 第一版是否做背包，还是 v0.2 再加入？

建议：v0.1 可以先固定或半随机地图，不做饥饿，不做完整背包。

---

### 12_DEMO_SCOPE.md

更新版本规划：

```text
v0.0 = 项目重定向版
v0.1 = 最小可玩迷宫版
v0.2 = 道具策略版
v0.3 = 随机迷宫与饥饿压力版
v0.4 = 怪物机制版
v0.5 = 现代化可读性版
v0.6 = Shiren-like 特色体验版
v0.7 = 单局 Demo 完整版
v0.8 = 平衡与试玩修正版
v0.9 = Godot 迁移准备版
v1.x = Godot Demo
v2.x = 垂直切片
```

---

## 八、AI_TASKS 更新要求

### CURRENT_TASK.md

更新为：

```text
v0.0 / 项目重定向版
```

说明本轮目标：

```text
将项目从旧 kingdom-like 玩法重定向为 shiren-like。只更新项目文档、任务记录和下一轮 Codex 提示词，不实现完整玩法。
```

---

### CHANGELOG.md

追加：

```markdown
## 2026-05-13 / v0.0 / 项目重定向版

### 本轮目标
将项目从 kingdom-like 重定向为 shiren-like。

### 已完成
- 更新 README 项目定位；
- 更新 DESIGN_HUB 核心设计文档；
- 更新已确认决策；
- 更新当前任务；
- 更新下一轮 Codex 提示词；
- 明确 v0.1 将开发最小可玩迷宫版。

### 未完成
- 未实现 v0.1 玩法；
- 未迁移 Godot；
- 未制作最终美术。
```

---

### DEV_LOG.md

记录本轮执行过程：

- 读取旧 kingdom-like 文档；
- 确认人类制作人要求以此仓库为基础制作 shiren-like；
- 保留工程组织方式；
- 替换玩法方向；
- 下一轮进入 Web Demo v0.1。

---

### NEXT_CODEX_PROMPT.md

本轮完成后，请将本文件更新为下一轮任务：

```text
Web Demo v0.1 / 最小可玩迷宫版
```

下一轮提示词应要求：

- 替换或重写 `Builds/web-demo/` 中旧 kingdom-like Web Demo；
- 实现格子迷宫；
- 实现玩家回合制移动；
- 实现 1 种怪物；
- 实现普通攻击；
- 实现 1 种回复药；
- 实现楼梯和下楼；
- 实现 HP、楼层、日志；
- 实现 3 层胜利、HP 为 0 失败；
- 更新 smoke test；
- 不做饥饿、背包、未鉴定、怪物屋、装备、壶、商店、Godot。

---

## 九、Builds/web-demo/README.md 处理

将旧 Web Demo README 标记为旧内容，或更新为：

```markdown
# shiren-like Web Demo

当前 Web Demo 正在从旧 kingdom-like 原型重定向为 shiren-like。

v0.0 只更新项目方向和任务计划。

v0.1 将实现最小可玩迷宫版：格子移动、回合制、怪物、攻击、回复药、楼梯和简单胜负。
```

如果暂时不修改 `game.js`，必须明确说明当前 Web Demo 仍是旧占位内容，不代表新项目玩法。

---

## 十、Tests/web-demo-smoke.mjs 处理

本轮如果不改 Web Demo 代码，允许只做轻微调整，避免 smoke test 仍强行检查 kingdom-like 特征。

建议修改 smoke test，使它在 v0.0 阶段至少检查：

- 核心文件存在；
- README 包含 `shiren-like`；
- `NEXT_CODEX_PROMPT.md` 包含 `Web Demo v0.1 / 最小可玩迷宫版`；
- 不再强制检查金币、墙、塔、地标等 kingdom-like 玩法字段。

如果 smoke test 暂不调整，必须在 `DEV_LOG.md` 中记录：

```text
当前 smoke test 仍针对旧 kingdom-like Web Demo，v0.1 实现时必须重写。
```

---

## 十一、验收标准

本轮完成后必须满足：

1. `README.md` 项目名变为 `shiren-like`；
2. README 不再把项目描述为 kingdom-like 探索建造游戏；
3. `DESIGN_HUB/01_PROJECT_BRIEF.md` 明确新项目是 Mystery Dungeon Roguelike；
4. `DESIGN_HUB/02_CORE_GAMEPLAY.md` 明确核心循环是迷宫探索、回合制、怪物、道具、楼梯；
5. `DESIGN_HUB/09_DECISIONS.md` 记录项目重定向决策；
6. `AI_TASKS/CURRENT_TASK.md` 显示 v0.0 / 项目重定向版；
7. `AI_TASKS/CHANGELOG.md` 追加 v0.0 记录；
8. `AI_TASKS/DEV_LOG.md` 记录执行过程；
9. `AI_TASKS/NEXT_CODEX_PROMPT.md` 被更新为下一轮 `Web Demo v0.1 / 最小可玩迷宫版` 提示词；
10. 没有一次性实现复杂系统；
11. 没有引入第三方复杂依赖；
12. 没有删除旧内容而不留记录；
13. 如果 smoke test 仍保留旧逻辑，必须在 DEV_LOG 标明下一轮重写。

---

## 十二、提交后输出格式

完成后请输出：

```text
修改文件列表：
- ...

实现内容：
- ...

验证方式：
- ...

未解决问题：
- ...

需要制作人决策：
- ...

下一轮任务：
Web Demo v0.1 / 最小可玩迷宫版
```
