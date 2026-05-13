# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

Web Demo v1.0 / 单局体验整合与可读性打磨版

---

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

当前版本 `v0.9 / 未鉴定与道具风险版` 已完成，已经实现：

- 随机房间与走廊；
- 玩家中心镜头；
- `Console / Camera / View` 调参；
- 饥饿与满腹度；
- 四种怪物：`Slime / Goblin Archer / Sleep Mushroom / Skeleton Spearman`；
- 三种陷阱：`Spike Trap / Warp Trap / Sleep Trap`；
- 一种危险地形：`Poison Pool`；
- 六种消耗道具：恢复药、食物、传送卷轴、睡眠卷轴、火球杖、换位杖；
- 六件装备：`Short Sword / Spear / Flame Sword / Wooden Shield / Iron Shield / Guard Shield`；
- `weapon / shield` 装备位；
- 背包容量与背包面板；
- `B` 打开背包，`G` 将脚下装备收入背包，`C` 装备脚下装备；
- 从背包使用、装备和投掷物品；
- 传送卷轴、睡眠卷轴、火球杖、换位杖的未鉴定与识别；
- 3 层胜利与死亡结算。

本轮任务是：

```text
Web Demo v1.0 / 单局体验整合与可读性打磨版
```

本轮核心目标不是加入新大系统，而是把现有 Web Demo 打磨成一个可以稳定试玩、容易理解、反馈清晰的 1.0 单局体验：

```text
让玩家能看懂局势、看懂道具、看懂危险、看懂死亡原因，并在 3 层 Demo 中形成完整的一局体验。
```

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
我已理解当前项目是 shiren-like，本轮只做 Web Demo v1.0 / 单局体验整合与可读性打磨版。目标是提升现有 3 层单局体验的可读性、反馈一致性、操作说明、死亡复盘和基础平衡；不加入壶、商店、怪物屋、据点、Boss、Godot，也不重做随机迷宫、背包、装备、怪物、陷阱、未鉴定和镜头系统。
```

---

## 二、本轮核心目标

在保留 v0.9 所有系统的基础上，完成 6 类打磨：

1. 操作说明与新手提示更清楚；
2. HUD / 快捷栏 / 背包 / 日志信息统一；
3. 怪物、陷阱、毒沼、未鉴定道具的危险反馈更可读；
4. 死亡 / 胜利结算更像一次完整单局复盘；
5. 做一轮轻量数值与生成密度检查；
6. 更新 README、配置、smoke test 和任务记录。

完成后，玩家应能感受到：

```text
我知道自己现在处在什么状态。
我知道每个按钮和快捷键大概做什么。
我能看懂怪物、陷阱、道具和未鉴定信息。
死了以后我能知道为什么死。
赢了以后能知道这一局做得怎么样。
```

---

## 三、操作说明与新手提示

### 1. 开始界面说明优化

Start overlay 需要更明确说明核心操作：

```text
移动：WASD / 方向键
等待：空格 / .
下楼：E
装备脚下装备：C
收入背包：G
打开背包：B
快捷使用：H / F / T / Z / R / X
Console：调试镜头与 FPS
```

不要让说明太长，可以分成两行或三行。

### 2. 首次进入游戏的提示

开局日志或提示中加入 2～3 条短提示：

```text
目标：找到楼梯并到达 3F 深处。
注意：每次有效行动都会消耗饱腹度。
提示：未识别卷轴和木杖可以通过使用或投掷来识别。
```

### 3. 背包空 / 没有目标 / 不能使用时的提示

当前失败提示必须清楚，例如：

- 背包为空；
- 背包已满；
- 前方没有怪物；
- 没有可投掷物；
- 没有可装备的脚下装备；
- 该物品无法在当前状态使用。

---

## 四、HUD / 快捷栏 / 背包信息统一

### 1. HUD 信息

HUD 必须继续显示：

```text
HP
饱腹
楼层
回合
背包容量
ATK
DEF
当前武器
当前盾牌
```

建议：

- 饱腹度低于阈值时有明显颜色或文本提示；
- HP 低于 30% 时有明显颜色或文本提示；
- 睡眠状态时 HUD 明确显示 `睡眠 x 回合`。

### 2. 快捷栏名称

快捷栏必须尽量使用 `getItemDisplayName(type)`，避免未鉴定道具直接暴露真实名称。

如果按钮仍然绑定 `T / Z / R / X`，可以保留快捷键，但按钮文本应显示未知名，例如：

```text
T 褪色卷轴 1
Z 蓝纹卷轴 1
R 弯曲木杖 1
X 裂纹木杖 1
```

识别后再显示真实名称。

### 3. 背包面板

背包面板要更清楚地区分：

- 消耗品；
- 未识别消耗品；
- 装备；
- 当前可用操作：使用 / 装备 / 投掷 / 丢弃，若已实现丢弃。

未识别物品可显示：

```text
褪色卷轴 x1 · 未识别
弯曲木杖 x1 · 未识别
```

装备显示：

```text
火焰剑  ATK +4
守护盾  DEF +3
```

---

## 五、危险反馈与可读性

### 1. 怪物威胁提示

保留现有威胁范围，但尽量让不同怪物的危险更易读：

- 近战怪：相邻格危险；
- 弓手：直线射程危险；
- 蘑菇：催眠范围危险；
- 枪兵：隔格攻击危险。

右侧敌人面板建议显示怪物行为短标签：

```text
近战
远程
催眠
长枪
```

### 2. 陷阱与毒沼提示

陷阱和危险地形需要在主画面中保持可读，不要与道具、威胁范围、行动范围混淆。

日志中触发效果必须简洁明确：

```text
你踩中了地刺陷阱，受到 4 点伤害。
毒沼腐蚀了你，受到 1 点伤害。
```

### 3. 未鉴定提示

使用或投掷未鉴定物品时，要记录三件事：

```text
你尝试了什么未知物品；
实际发生了什么效果；
它被识别成了什么。
```

---

## 六、死亡与胜利复盘

### 1. 死亡原因

死亡结算必须尽量区分：

- 被怪物击败；
- 饥饿倒下；
- 地刺陷阱；
- 毒沼；
- 其他未知原因。

结果界面文案要根据原因变化，例如：

```text
你被 Goblin Archer 击败了。
你因饥饿倒下了。
你被地刺陷阱击倒了。
你被毒沼腐蚀倒下了。
```

### 2. 单局统计

结算界面至少显示：

```text
到达楼层
击败怪物
使用道具次数
回合数
识别道具数量
拾取装备数量，若已统计
死亡原因 / 胜利原因
```

如果目前没有对应统计字段，至少添加轻量字段，不要做复杂持久化。

### 3. 胜利文案

到达第 3 层目标并胜利时，结果界面要明确：

```text
你完成了 3 层试炼。
```

并显示本局统计。

---

## 七、轻量平衡检查

本轮可以微调配置，但不要大改系统。

需要检查：

1. 1F 是否过难；
2. 3F 是否有足够怪物、陷阱和未鉴定压力；
3. 背包容量 8 是否过紧或过松；
4. 食物掉落是否足以支撑 3 层试玩；
5. 火焰剑 / 守护盾是否过强；
6. 毒沼、睡眠陷阱、蘑菇催眠是否组合过于恶心；
7. 投掷伤害是否过高或过低。

建议只做小幅微调：

- 不要把背包容量改得很大；
- 不要让 1F 生成太多高威胁怪；
- 不要让陷阱密度遮蔽地面；
- 不要让高级装备在前期过早大量出现。

---

## 八、允许修改文件

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
DESIGN_HUB/04_SYSTEM_OVERVIEW.md
DESIGN_HUB/05_ECONOMY_AND_BALANCE.md
DESIGN_HUB/06_CONTENT_PLAN.md
DESIGN_HUB/08_UX_FLOW.md
DESIGN_HUB/12_DEMO_SCOPE.md
```

优先修改：

```text
Builds/web-demo/game.js
Builds/web-demo/index.html
Builds/web-demo/styles.css
Builds/web-demo/README.md
Data/config/web_demo_balance.json
Tests/web-demo-smoke.mjs
AI_TASKS/CURRENT_TASK.md
AI_TASKS/CHANGELOG.md
AI_TASKS/DEV_LOG.md
```

---

## 九、本轮明确不做

不要做：

- 不做壶；
- 不做商店；
- 不做怪物屋；
- 不做据点；
- 不做 Boss；
- 不做 Godot 工程；
- 不做持久化存档；
- 不做跨局成长；
- 不做装备强化；
- 不做装备合成；
- 不做装备诅咒；
- 不做耐久；
- 不做复杂负面状态系统；
- 不做怪物投掷；
- 不重做随机迷宫；
- 不重做背包系统；
- 不重做镜头主方案；
- 不删除 Console / Camera / View 调参功能；
- 不引入 React、Phaser、Three.js、PixiJS 或复杂 npm 依赖；
- 不继续开发旧 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守逻辑。

---

## 十、必须保留

必须保留：

- v0.9 未鉴定与识别；
- v0.8 背包与投掷；
- v0.7.1 装备系统；
- v0.6 陷阱与危险地形；
- v0.5 四种怪物；
- 随机迷宫；
- 房间怪物分配；
- 玩家中心镜头；
- Console / Camera / View 调参；
- 小地图；
- 敌人面板；
- 底部快捷栏；
- 饥饿系统；
- 3 层胜利与死亡结算。

不要回退：

- 不要删除 `identification`；
- 不要删除 `inventorySystem`；
- 不要删除 `throwInventoryItem`；
- 不要删除 `inventory-panel`；
- 不要删除 `C` 装备逻辑；
- 不要删除 `G` 入包逻辑；
- 不要删除 `ATK / DEF / weapon / shield`；
- 不要删除 `CAMERA_FIELDS`；
- 不要删除陷阱、毒沼、怪物机制。

---

## 十一、README 更新

更新 `Builds/web-demo/README.md`：

- 当前版本改为 `v1.0 / 单局体验整合与可读性打磨版`；
- 说明 v1.0 的目标是整合现有系统，不新增大系统；
- 说明完整操作表；
- 说明 HUD、背包、快捷栏、日志的主要信息；
- 说明怪物、陷阱、毒沼、未鉴定道具的危险提示；
- 说明死亡与胜利结算显示哪些信息；
- 说明 v0.9 / v0.8 / v0.7.1 / v0.6 / v0.5 的核心系统都保留；
- 说明本轮仍未加入壶、商店、怪物屋、据点、Boss、Godot。

---

## 十二、测试更新

更新 `Tests/web-demo-smoke.mjs`，至少检查：

- Web Demo 文件存在；
- README 包含 `v1.0 / 单局体验整合与可读性打磨版`；
- README 包含 `操作`、`背包`、`未鉴定`、`死亡原因`、`结算`；
- 配置文件版本为 `v1.0`；
- HTML 或 JS 中存在更完整的操作说明或帮助信息；
- JS 中存在死亡原因 / 结算统计增强字段或逻辑，例如：
  - `deathReason`；
  - `result`；
  - `turn`；
  - `itemsUsed`；
  - `identified` 或识别数量统计，若实现；
- JS 中仍存在：
  - `identification`；
  - `createIdentificationState`；
  - `getItemDisplayName`；
  - `inventorySystem`；
  - `getInventoryUsedSlots`；
  - `throwInventoryItem`；
  - `resolveThrowPath`；
  - `createEquipmentDrop`；
  - `equipmentOnGround`；
  - `getPlayerAttack`；
  - `getPlayerDefense`；
  - `placeHazards`；
  - `triggerTrapAt`；
  - `applyTerrainAt`；
  - `actMonster`；
  - `generateDungeon`；
  - `CAMERA_FIELDS`；
- 旧 kingdom-like 核心词仍不得出现：`treeCost`、`wallCost`、`towerCost`、`landmarkCost`、`workers`、`archers`。

---

## 十三、功能验收标准

完成后必须满足：

1. `node --check Builds/web-demo/game.js` 通过；
2. `node --check Tools/web-demo-server.mjs` 通过；
3. `node Tests/web-demo-smoke.mjs` 通过；
4. `node Tools/web-demo-server.mjs` 可以启动；
5. 打开 `http://127.0.0.1:4173/Builds/web-demo/` 可以试玩；
6. 开始界面能看懂基本操作；
7. HUD 能清楚显示核心状态；
8. 背包面板信息清楚；
9. 快捷栏不明显泄露未鉴定真实名称；
10. 未鉴定使用 / 投掷 / 识别反馈清楚；
11. 怪物危险提示和敌人面板更容易理解；
12. 陷阱和毒沼触发日志清楚；
13. 死亡原因能在结算中清楚表达；
14. 胜利结算能体现完整单局；
15. v0.9 未鉴定、v0.8 背包投掷、v0.7.1 装备、v0.6 陷阱、v0.5 怪物仍可用；
16. 玩家中心镜头、Console 调参、小地图、敌人面板、快捷栏仍可用；
17. 没有加入壶、商店、怪物屋、据点、Boss、Godot；
18. 没有残留 kingdom-like 核心玩法。

---

## 十四、完成后更新记录

完成后必须更新：

1. `AI_TASKS/CURRENT_TASK.md`
2. `AI_TASKS/CHANGELOG.md`
3. `AI_TASKS/DEV_LOG.md`
4. `AI_TASKS/NEXT_CODEX_PROMPT.md`

记录本轮为：

```text
Web Demo v1.0 / 单局体验整合与可读性打磨版
```

下一轮建议暂时写成：

```text
Web Demo v1.1 / 内容补点与体验修正版
```

但不要直接开始 v1.1，等待制作人试玩 v1.0 后确认。

---

## 十五、完成后输出格式

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