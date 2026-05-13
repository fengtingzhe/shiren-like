# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

Web Demo v0.2 / 道具策略版

---

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

当前 `Web Demo v0.1 / 最小可玩迷宫版` 已完成，已经实现格子迷宫、回合制移动、1 种基础怪物、普通攻击、1 种回复药、楼梯下楼、HP、楼层、回合、日志、3 层胜利、HP 为 0 失败和通用 Console。

本轮任务是实现：

```text
Web Demo v0.2 / 道具策略版
```

本轮核心目标不是扩展完整系统，而是验证：

```text
道具可以改变战局。
```

也就是说，玩家在被怪物逼近、包围、低 HP 或路线受阻时，应该能通过不同道具做出不同解法，而不是只能普通攻击或喝回复药。

---

## 一、开始前必须阅读

请按顺序阅读：

1. `README.md`
2. `AI_RULES/00_MASTER_PROMPT.md`
3. `AI_RULES/01_AI_READ_ORDER.md`
4. `AI_RULES/02_AI_EDIT_PERMISSION.md`
5. `AI_RULES/03_TECHNICAL_RULES.md`
6. `AI_RULES/04_DATA_RULES.md`
7. `AI_RULES/06_VALIDATION_CHECKLIST.md`
8. `DESIGN_HUB/01_PROJECT_BRIEF.md`
9. `DESIGN_HUB/02_CORE_GAMEPLAY.md`
10. `DESIGN_HUB/03_PLAYER_EXPERIENCE.md`
11. `DESIGN_HUB/04_SYSTEM_OVERVIEW.md`
12. `DESIGN_HUB/05_ECONOMY_AND_BALANCE.md`
13. `DESIGN_HUB/06_CONTENT_PLAN.md`
14. `DESIGN_HUB/07_ART_AND_AUDIO_DIRECTION.md`
15. `DESIGN_HUB/08_UX_FLOW.md`
16. `DESIGN_HUB/09_DECISIONS.md`
17. `DESIGN_HUB/10_OPEN_QUESTIONS.md`
18. `DESIGN_HUB/12_DEMO_SCOPE.md`
19. `AI_TASKS/CURRENT_TASK.md`
20. `AI_TASKS/CHANGELOG.md`
21. `AI_TASKS/DEV_LOG.md`
22. `Builds/web-demo/README.md`
23. `Builds/web-demo/index.html`
24. `Builds/web-demo/styles.css`
25. `Builds/web-demo/game.js`
26. `Data/config/web_demo_balance.json`
27. `Tests/web-demo-smoke.mjs`

阅读后先输出：

```text
我已理解当前项目是 shiren-like，本轮只做 Web Demo v0.2 / 道具策略版，目标是验证道具能改变战局，不加入复杂系统。
```

---

## 二、本轮目标

在 v0.1 的基础上，加入少量新道具和简化道具管理，让玩家可以使用不同道具解决不同局面。

本轮完成后，玩家应能体验到：

- 回复药用于保命；
- 食物用于为后续饥饿系统占位，但本轮不启用完整饥饿压力；
- 传送卷轴用于逃离危险；
- 睡眠卷轴用于控场；
- 火球杖用于远程攻击；
- 换位杖用于位置解局。

---

## 三、本轮允许修改文件

允许修改：

```text
Builds/web-demo/index.html
Builds/web-demo/styles.css
Builds/web-demo/game.js
Builds/web-demo/README.md
Data/config/web_demo_balance.json
Tests/web-demo-smoke.mjs
AI_TASKS/CURRENT_TASK.md
AI_TASKS/CHANGELOG.md
AI_TASKS/DEV_LOG.md
AI_TASKS/NEXT_CODEX_PROMPT.md
```

如需要新增配置文件，放在：

```text
Data/config/
```

但优先复用并扩展 `Data/config/web_demo_balance.json`。

---

## 四、本轮禁止事项

不要做：

- 不做完整饥饿系统；
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
- 不做商业化系统；
- 不继续开发旧 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守逻辑。

---

## 五、核心功能需求

### 1. 简化道具栏 / 简化背包

v0.2 需要一个简单道具管理方式。

推荐实现：

- 不做完整背包界面；
- 使用 HUD 快捷道具栏；
- 每种道具用数量计数；
- 玩家可通过快捷键或按钮使用；
- 道具说明在按钮 title、悬浮提示或固定说明区显示。

建议快捷键：

| 道具 | 快捷键 |
|---|---|
| 回复药 | H |
| 食物 | F |
| 传送卷轴 | T |
| 睡眠卷轴 | S |
| 火球杖 | R |
| 换位杖 | X |

如果快捷键冲突，可以自行调整，但必须在 README 和界面中说明。

---

### 2. 道具拾取

地图上可以出现多种道具。

建议地图标记：

| 标记 | 道具 |
|---|---|
| p | 回复药 |
| f | 食物 |
| t | 传送卷轴 |
| z | 睡眠卷轴 |
| r | 火球杖 |
| x | 换位杖 |

玩家移动到道具格后拾取，道具数量增加，并记录行动日志。

拾取道具本身是否推进回合，可以保持 v0.1 逻辑：移动进入道具格已消耗回合，因此拾取不额外消耗回合。

---

### 3. 回复药

保留 v0.1 回复药逻辑：

- 恢复 HP；
- 不超过最大 HP；
- 使用后推进一回合；
- 没有回复药或 HP 已满时不消耗回合。

---

### 4. 食物

本轮加入食物，但不启用完整饥饿压力。

目的：

- 为 v0.3 饥饿系统预留 UI 和数据结构；
- 让玩家先理解食物是一种资源。

建议实现：

- HUD 显示 `满腹` 或 `Food` 数值；
- 初始满腹度可为 100；
- 本轮可以不随回合下降，或者只做极轻微下降但不致死；
- 食物使用后恢复满腹度；
- 如果本轮不做满腹度下降，也必须在 README 中说明：食物为 v0.3 占位道具。

避免：

- 不要让饥饿成为 v0.2 核心压力；
- 不要让玩家因饥饿死亡。

---

### 5. 传送卷轴

功能：

- 使用后将玩家传送到当前楼层一个随机安全地板格；
- 不能传送到墙内；
- 不能传送到怪物身上；
- 不能传送到当前原地；
- 使用后推进一回合；
- 记录日志：`使用传送卷轴，脱离危险。`

设计目标：

- 当玩家被怪物贴身或堵路时，可以逃生。

---

### 6. 睡眠卷轴

功能：

- 使用后让一定范围内的怪物睡眠；
- 建议范围：玩家周围 4 格曼哈顿距离，或当前房间内所有怪物；
- v0.2 可以用简单范围，不要求房间识别；
- 睡眠怪物若干回合不行动；
- 建议睡眠回合：3 回合；
- 使用后推进一回合；
- 睡眠状态要有视觉提示，例如怪物上方 `Z` 或颜色变暗。

设计目标：

- 让玩家理解卷轴可以控场。

---

### 7. 火球杖

功能：

- 朝玩家当前朝向发射火球；
- 命中直线上的第一个怪物；
- 不穿墙；
- 对命中怪物造成固定伤害；
- 建议伤害：5；
- 使用后推进一回合；
- 如果前方没有怪物，可以提示未命中，并仍消耗或不消耗道具由你决定，但必须一致并写入 README。

简化方案：

- 火球杖可以按当前朝向发射；
- 如果当前朝向不清楚，用玩家最近移动方向；
- 不要求鼠标指定目标。

设计目标：

- 让玩家可以在怪物接近前远程处理威胁。

---

### 8. 换位杖

功能：

- 朝玩家当前朝向寻找直线上的第一个怪物；
- 如果找到，则玩家与该怪物交换位置；
- 不穿墙；
- 使用后推进一回合；
- 如果没有目标，提示失败；
- 换位后不能把玩家或怪物放进墙内。

设计目标：

- 让玩家通过位置变化脱离包围或接近楼梯。

---

## 六、怪物与数值调整

v0.2 可以适当调整怪物密度，让道具有使用价值。

建议：

- 每层怪物数量略高于 v0.1；
- 不要让前 1 层过难；
- 第 2～3 层可以出现更容易被道具解决的危险局面；
- 回复药数量可以略少于 v0.1，鼓励使用其他道具。

如果调整数值，优先改 `Data/config/web_demo_balance.json`，不要在代码中硬编码。

---

## 七、UI 需求

HUD 至少显示：

- HP / Max HP；
- 当前楼层；
- 当前回合数；
- 回复药数量；
- 食物数量或满腹度；
- 传送卷轴数量；
- 睡眠卷轴数量；
- 火球杖数量；
- 换位杖数量；
- 当前目标提示；
- 行动日志。

道具按钮必须能让玩家知道：

- 这个道具是什么；
- 当前有多少；
- 按什么键使用；
- 没有道具时按钮不可用或有清楚提示。

---

## 八、地图与配置需求

`Data/config/web_demo_balance.json` 应包含：

- 玩家 HP / 攻击；
- 怪物 HP / 攻击；
- 各道具的数量、效果值或配置；
- 地图楼层布局；
- 至少 3 层；
- 每层包含若干不同道具。

建议每层至少出现：

- 1 个回复药或食物；
- 1～2 个策略道具；
- 若干怪物；
- 1 个楼梯。

---

## 九、README 更新

更新 `Builds/web-demo/README.md`：

- 当前版本改为 `v0.2 / 道具策略版`；
- 说明运行方式；
- 说明已实现内容；
- 说明各道具功能和快捷键；
- 说明本轮仍未实现的内容；
- 说明试玩重点：道具是否真的能改变战局。

---

## 十、测试更新

更新 `Tests/web-demo-smoke.mjs`，至少检查：

- Web Demo 文件存在；
- HTML 引用 CSS 和 JS；
- README 包含 `v0.2 / 道具策略版`；
- JS 中存在各道具逻辑：
  - potion / 回复药；
  - food / 食物；
  - teleport / 传送；
  - sleep / 睡眠；
  - fireball / 火球；
  - swap / 换位；
- JS 中存在回合推进逻辑 `advanceTurn`；
- 配置文件包含各道具字段；
- 旧 kingdom-like 核心词仍不得出现：
  - `treeCost`；
  - `wallCost`；
  - `towerCost`；
  - `landmarkCost`；
  - `workers`；
  - `archers`。

---

## 十一、验收标准

完成后必须满足：

1. `node --check Builds/web-demo/game.js` 通过；
2. `node --check Tools/web-demo-server.mjs` 通过；
3. `node Tests/web-demo-smoke.mjs` 通过；
4. `node Tools/web-demo-server.mjs` 可以启动；
5. 打开 `http://127.0.0.1:4173/Builds/web-demo/` 可以试玩；
6. 玩家可以拾取多种道具；
7. 玩家可以使用回复药恢复 HP；
8. 玩家可以使用食物，或至少看到食物作为 v0.3 占位资源；
9. 玩家可以使用传送卷轴逃离危险；
10. 玩家可以使用睡眠卷轴让怪物暂时不行动；
11. 玩家可以使用火球杖远程攻击怪物；
12. 玩家可以使用换位杖与怪物交换位置；
13. 道具使用后日志有清楚反馈；
14. 道具使用后回合推进规则一致；
15. 没有加入饥饿死亡、未鉴定、装备、陷阱、怪物屋、壶、商店、据点、Godot；
16. 没有残留 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守核心玩法。

---

## 十二、完成后更新记录

完成后必须更新：

1. `AI_TASKS/CURRENT_TASK.md`
2. `AI_TASKS/CHANGELOG.md`
3. `AI_TASKS/DEV_LOG.md`
4. `AI_TASKS/NEXT_CODEX_PROMPT.md`

记录本轮为：

```text
Web Demo v0.2 / 道具策略版
```

下一轮建议可以先写成：

```text
Web Demo v0.3 / 随机迷宫与饥饿压力版
```

但不要直接开始 v0.3，等待制作人试玩 v0.2 后确认。

---

## 十三、完成后输出格式

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

下一轮建议：
- ...
```