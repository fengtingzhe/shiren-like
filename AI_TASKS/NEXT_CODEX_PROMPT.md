# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

Web Demo v0.8 / 背包与投掷版

---

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

当前版本 `v0.7.1 / 装备池补全与平衡版` 已完成，已经实现：

- 随机房间与走廊；
- 房间尺寸 3×3 到 10×10；
- 每个非出生房间至少 1 只怪物；
- 玩家中心镜头；
- Console / Camera / View 视野调参；
- 饥饿与满腹度；
- 六种消耗道具：恢复药、食物、传送卷轴、睡眠卷轴、火球杖、换位杖；
- 四种怪物：Slime、Goblin Archer、Sleep Mushroom、Skeleton Spearman；
- 三种陷阱：Spike Trap、Warp Trap、Sleep Trap；
- 一种危险地形：Poison Pool；
- 两个装备位：weapon / shield；
- 六件装备：Short Sword、Spear、Flame Sword、Wooden Shield、Iron Shield、Guard Shield；
- HUD 显示 ATK / DEF / weapon / shield；
- 站在装备上按 C 可以装备或替换；
- 旧装备会稳定掉回脚下或相邻安全格；
- 小地图、敌人面板、底部快捷栏；
- 3 层胜利、HP 为 0 失败。

本轮任务是：

```text
Web Demo v0.8 / 背包与投掷版
```

本轮核心目标不是做完整物品系统，而是加入最小可玩的背包压力和投掷行为：

```text
玩家不再无限持有所有东西，而要在有限背包中做携带取舍；玩家可以把背包中的物品沿当前方向投掷，用于攻击怪物或制造战术选择。
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
我已理解当前项目是 shiren-like，本轮只做 Web Demo v0.8 / 背包与投掷版。目标是加入最小可玩的背包容量、拾取取舍和投掷行为；不加入未鉴定、强化、合成、诅咒、耐久、商店、怪物屋、壶、据点、Boss 或 Godot。
```

---

## 二、本轮核心目标

在保留 v0.7.1 已有系统的基础上，加入：

1. 背包容量；
2. 地面物品拾取取舍；
3. 背包列表 UI；
4. 从背包使用物品；
5. 从背包投掷物品；
6. 投掷物命中怪物造成效果；
7. 背包满时的提示和处理；
8. README、配置、smoke test、任务记录同步。

完成后，玩家应能明显感受到：

```text
我不能无限捡东西。
是否带食物、卷轴、杖或备用装备需要取舍。
不想用的物品也可以投出去解决远处怪物。
```

---

## 三、背包系统需求

### 1. 背包容量

请加入一个最小背包系统。

推荐配置：

```json
"inventorySystem": {
  "enabled": true,
  "capacity": 8,
  "stackConsumables": true,
  "equipmentTakesSlot": true
}
```

解释：

- 背包总容量建议先设为 8 格；
- 消耗品是否堆叠可以简化处理：同类型消耗品可以占 1 格并显示数量；
- 装备每件占 1 格；
- 当前已装备的武器和盾牌不占背包格；
- 地面装备按 C 装备时，旧装备掉地上，不进入背包；
- 这一版先不做复杂背包排序、分类、拖拽。

---

### 2. 背包数据结构

建议从当前简单数量式 `inventory` 扩展为结构化背包，同时保留旧快捷栏兼容。

建议结构：

```js
inventory: {
  capacity: 8,
  items: [
    {
      id: "inv_1",
      kind: "consumable",
      type: "potion",
      name: "恢复药",
      count: 2,
      icon: "+"
    },
    {
      id: "inv_2",
      kind: "equipment",
      type: "flame_sword",
      name: "火焰剑",
      slot: "weapon",
      attackBonus: 4,
      defenseBonus: 0
    }
  ]
}
```

如果一次性重构风险较高，可以先使用兼容方案：

```js
inventoryCounts: { potion, food, teleport, sleep, fireball, swap }
inventoryItems: [equipment instances and non-stacking special items]
```

但必须能实现：

- 背包容量计算；
- UI 显示当前容量；
- 使用物品扣除数量；
- 投掷物品扣除数量或移除物品。

---

### 3. 容量计算

建议规则：

```text
每种消耗品如果数量 > 0，占 1 格。
每件未装备装备，占 1 格。
已装备 weapon / shield 不占格。
```

示例：

```text
恢复药 x2：1 格
食物 x1：1 格
传送卷轴 x1：1 格
火焰剑备用：1 格
铁盾备用：1 格
总占用：5 / 8
```

HUD 或背包面板必须显示：

```text
背包 5 / 8
```

---

## 四、拾取规则

### 1. 消耗品拾取

当前消耗品是走上去自动拾取。本轮改为：

```text
如果背包有空间：仍可自动拾取。
如果背包已满：不能拾取，物品留在地上，日志提示。
```

日志示例：

```text
你拾取了恢复药。
背包已满，无法拾取食物。
```

如果同类型消耗品已经在背包中并允许堆叠，则拾取同类型物品不新增格子。

---

### 2. 装备拾取 / 装备

当前装备是站在装备上按 C 直接装备或替换。本轮保留这个逻辑。

新增：

- 如果玩家不想装备，可以提供“捡入背包”功能；
- 推荐快捷键 `G`：拾取脚下装备到背包；
- 如果背包满，不能捡入背包；
- 如果站在装备上按 C，仍按装备/替换逻辑，不受背包容量影响；
- 替换出来的旧装备仍掉地上，不自动进入背包。

如果实现 `G` 成本较高，可以先不做装备入包，只做装备地上替换，但 README 必须说明。

我推荐 v0.8 做：

```text
C = 装备脚下装备
G = 拾取脚下物品或装备到背包
```

---

## 五、背包 UI 需求

### 1. HUD

左上或底部增加：

```text
背包 5 / 8
```

### 2. 背包面板

增加一个简单背包面板，可用按钮或快捷键打开。

推荐快捷键：

```text
B = 打开 / 关闭背包
```

背包面板显示：

```text
背包 5 / 8
1. 恢复药 x2     [U 使用] [T 投掷]
2. 食物 x1       [U 使用] [T 投掷]
3. 火球杖 x1     [U 使用] [T 投掷]
4. 火焰剑 +4     [E 装备] [T 投掷]
```

最低要求：

- 显示物品名称；
- 显示数量或装备数值；
- 显示容量；
- 能通过鼠标按钮操作；
- 快捷键可选，不强制做到复杂选择模式。

---

## 六、从背包使用物品

当前底部快捷栏可以使用消耗品。本轮要保证：

- 快捷栏仍然可用；
- 背包面板中也可以使用消耗品；
- 使用后扣除对应数量；
- 数量归零后从背包格中消失；
- 使用成功推进回合；
- 使用失败不推进回合。

消耗品使用效果保持现有规则：

- 恢复药恢复 HP；
- 食物恢复满腹度；
- 传送卷轴安全传送；
- 睡眠卷轴让范围内怪物睡眠；
- 火球杖朝当前方向攻击；
- 换位杖与方向上的怪物换位。

不要因为背包重构破坏快捷栏。

---

## 七、投掷系统需求

### 1. 投掷入口

提供最小可用投掷行为。

推荐：

```text
背包面板中每个物品有“投掷”按钮。
投掷方向使用玩家当前 facing。
```

可选快捷键：

```text
V = 投掷当前选中的背包物品
```

如果没有选中物品，可以不处理。

---

### 2. 投掷轨迹

投掷规则：

```text
从玩家面前一格开始；
沿当前 facing 方向直线飞行；
最大距离 5 格；
遇到墙停止；
遇到第一个怪物命中；
未命中则物品落在最后一个合法地板格；
如果没有合法落点，物品消失。
```

推荐函数：

```js
throwInventoryItem(slotIndex)
resolveThrowPath(start, direction, maxRange)
applyThrownItemEffect(item, targetMonster)
dropThrownItemAt(item, x, y)
```

---

### 3. 投掷效果

本轮只做简单效果，不做复杂西林完整投掷系统。

建议规则：

| 类型 | 命中怪物效果 |
|---|---|
| 恢复药 | 对怪物造成 2 点伤害，或者无特殊效果但造成基础投掷伤害 |
| 食物 | 对怪物造成 1 点伤害 |
| 传送卷轴 | 对怪物造成 2 点伤害，本轮不传送怪物 |
| 睡眠卷轴 | 使命中怪物睡眠 3 回合 |
| 火球杖 | 对怪物造成 3 点伤害，不触发杖原本火球 |
| 换位杖 | 对怪物造成 2 点伤害，本轮不换位 |
| 武器 | 造成 `2 + attackBonus` 伤害 |
| 盾牌 | 造成 `1 + defenseBonus` 伤害 |

关键：

- 投掷物品会从背包中消耗；
- 命中怪物后物品消失；
- 未命中时消耗品可以消失，装备可以落地；
- 如果实现复杂，未命中时所有投掷物都消失也可以，但 README 要说明；
- 投掷成功推进回合；
- 投掷失败不推进回合。

日志示例：

```text
你投掷了火焰剑。
火焰剑击中了 Goblin Archer，造成 6 点伤害。
Goblin Archer 被击败了。
你投掷了睡眠卷轴，Sleep Mushroom 睡着了。
投掷物撞到墙后消失了。
```

---

## 八、装备与背包关系

### 1. 已装备物品

已装备 weapon / shield 不在背包中，不占容量。

### 2. 背包装备

背包中的装备可以：

- 装备；
- 投掷；
- 丢弃到地面，若实现方便。

推荐至少实现：

```text
背包中的装备可装备。
背包中的装备可投掷。
```

### 3. 从背包装备

从背包装备时：

- 新装备进入对应装备位；
- 原装备尽量放回背包；
- 如果背包满，原装备掉到脚下或相邻安全格；
- 如果无安全格，原装备消失并写日志；
- 装备动作推进 1 回合。

如果实现成本较高，v0.8 可以先只允许从地面装备，不允许从背包装备，但必须在 README 说明限制。推荐实现从背包装备。

---

## 九、丢弃功能，可选但推荐

推荐加入简单丢弃：

```text
背包面板中每个物品有“丢弃”按钮。
丢弃后物品落在玩家脚下或相邻安全格。
丢弃推进 1 回合或不推进都可以，但要在 README 说明。
```

如果做丢弃，必须复用：

```js
findSafeEquipmentDropCell / canPlaceGroundItemAt
```

不要让丢弃物与怪物、道具、装备、陷阱、危险地形、楼梯重叠。

---

## 十、配置需求

请在 `Data/config/web_demo_balance.json` 中加入：

```json
"inventorySystem": {
  "enabled": true,
  "capacity": 8,
  "stackConsumables": true,
  "equipmentTakesSlot": true,
  "throwRange": 5,
  "throwBaseDamage": 1
}
```

可加入投掷效果配置：

```json
"throwing": {
  "maxRange": 5,
  "defaultDamage": 2,
  "effects": {
    "food": { "damage": 1 },
    "potion": { "damage": 2 },
    "teleport": { "damage": 2 },
    "sleep": { "damage": 0, "sleepTurns": 3 },
    "fireball": { "damage": 3 },
    "swap": { "damage": 2 }
  }
}
```

注意：

- 不要把投掷数值硬编码得太分散；
- 允许部分默认逻辑在 JS 中兜底；
- 配置文件版本改为 `v0.8`。

---

## 十一、与已有系统兼容

必须保留：

- v0.7.1 装备系统；
- v0.6 陷阱和危险地形；
- v0.5 四种怪物；
- 随机迷宫；
- 房间怪物分配；
- 玩家中心镜头；
- Console / Camera / View 调参；
- 小地图；
- 敌人面板；
- 底部快捷栏；
- 饥饿系统；
- 六种消耗道具；
- 3 层胜利与死亡结算。

不要回退：

- 不要删除 `C` 装备逻辑；
- 不要删除 `ATK / DEF / weapon / shield`；
- 不要删除 `equipmentOnGround`；
- 不要删除 `getPlayerAttack()` / `getPlayerDefense()`；
- 不要删除 `CAMERA_FIELDS`；
- 不要删除陷阱、毒沼、怪物机制。

---

## 十二、本轮明确不做

不要做：

- 不做未鉴定；
- 不做装备强化；
- 不做装备合成；
- 不做诅咒装备；
- 不做耐久；
- 不做壶；
- 不做商店；
- 不做怪物屋；
- 不做据点；
- 不做 Boss；
- 不做 Godot 工程；
- 不做完整投掷反弹、穿透、落点弹跳；
- 不做怪物投掷；
- 不做投掷物特殊物理；
- 不重做镜头主方案；
- 不删除 Console / Camera / View 调参功能；
- 不引入 React、Phaser、Three.js、PixiJS 或复杂 npm 依赖；
- 不继续开发旧 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守逻辑。

---

## 十三、本轮允许修改文件

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
Data/config/web_demo_balance.json
Builds/web-demo/README.md
Tests/web-demo-smoke.mjs
AI_TASKS/CURRENT_TASK.md
AI_TASKS/CHANGELOG.md
AI_TASKS/DEV_LOG.md
```

---

## 十四、README 更新

更新 `Builds/web-demo/README.md`：

- 当前版本改为 `v0.8 / 背包与投掷版`；
- 说明本轮目标是加入背包容量和投掷行为；
- 说明背包容量、占格规则和堆叠规则；
- 说明消耗品拾取、装备拾取、背包满时如何处理；
- 说明背包面板如何打开；
- 说明如何从背包使用、装备、投掷物品；
- 说明投掷方向、距离、命中、撞墙、未命中的规则；
- 说明已装备物品不占背包容量；
- 说明 v0.7.1 装备、v0.6 陷阱、v0.5 怪物、镜头、Console 调参、饥饿和道具都保留；
- 说明本轮仍未加入未鉴定、强化、合成、诅咒、耐久、壶、商店、怪物屋、据点、Boss、Godot。

---

## 十五、测试更新

更新 `Tests/web-demo-smoke.mjs`，至少检查：

- Web Demo 文件存在；
- README 包含 `v0.8 / 背包与投掷版`；
- README 包含 `背包`、`容量`、`投掷`；
- 配置文件版本为 `v0.8`；
- 配置文件包含 `inventorySystem`；
- 配置文件包含 `capacity`；
- 配置文件包含 `throwRange` 或 `throwing.maxRange`；
- HTML 或 JS 中存在背包 UI，例如 `inventory-panel`、`inventory-list`、`inventory-value`；
- JS 中存在背包容量逻辑，例如：
  - `getInventoryUsedSlots`；
  - `hasInventorySpace`；
  - `addItemToInventory`；
  - `removeItemFromInventory`；
- JS 中存在背包面板逻辑，例如：
  - `toggleInventoryPanel`；
  - `renderInventoryPanel`；
- JS 中存在投掷逻辑，例如：
  - `throwInventoryItem`；
  - `resolveThrowPath`；
  - `applyThrownItemEffect`；
  - `dropThrownItemAt`；
- JS 中仍存在：
  - `createEquipmentDrop`；
  - `equipmentOnGround`；
  - `equipGroundItem`；
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

## 十六、功能验收标准

完成后必须满足：

1. `node --check Builds/web-demo/game.js` 通过；
2. `node --check Tools/web-demo-server.mjs` 通过；
3. `node Tests/web-demo-smoke.mjs` 通过；
4. `node Tools/web-demo-server.mjs` 可以启动；
5. 打开 `http://127.0.0.1:4173/Builds/web-demo/` 可以试玩；
6. HUD 或面板显示背包容量，例如 `5 / 8`；
7. 背包满时不能继续拾取新物品；
8. 同类型消耗品可堆叠并正确占格；
9. 背包面板能显示物品、数量和装备数值；
10. 背包中可以使用消耗品；
11. 快捷栏使用消耗品仍可用；
12. 背包中可以投掷物品；
13. 投掷沿当前 facing 方向直线飞行；
14. 投掷遇墙停止；
15. 投掷命中第一个怪物并产生效果；
16. 睡眠卷轴投掷命中怪物时能让怪物睡眠；
17. 武器和盾牌投掷命中怪物时能造成基于加成的伤害；
18. 投掷物品会从背包中消耗；
19. 背包系统不破坏地面装备按 C 装备；
20. v0.7.1 装备、v0.6 陷阱、v0.5 怪物机制仍可用；
21. 玩家中心镜头、Console 调参、小地图、敌人面板、快捷栏仍可用；
22. 没有加入未鉴定、强化、合成、诅咒、耐久、壶、商店、怪物屋、据点、Boss、Godot；
23. 没有残留 kingdom-like 核心玩法。

---

## 十七、完成后更新记录

完成后必须更新：

1. `AI_TASKS/CURRENT_TASK.md`
2. `AI_TASKS/CHANGELOG.md`
3. `AI_TASKS/DEV_LOG.md`
4. `AI_TASKS/NEXT_CODEX_PROMPT.md`

记录本轮为：

```text
Web Demo v0.8 / 背包与投掷版
```

下一轮建议暂时写成：

```text
Web Demo v0.9 / 未鉴定与道具风险版
```

但不要直接开始 v0.9，等待制作人试玩 v0.8 后确认。

---

## 十八、完成后输出格式

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