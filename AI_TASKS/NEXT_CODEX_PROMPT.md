# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

Web Demo v0.7 / 装备与数值成长版

---

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

当前版本 `v0.6 / 陷阱与危险地形版` 已完成，已经实现：

- 随机房间与走廊；
- 房间尺寸 3×3 到 10×10；
- 每个非出生房间至少 1 只怪物；
- 玩家中心镜头；
- Console / Camera / View 视野调参；
- 饥饿与满腹度；
- 回复药、食物、传送卷轴、睡眠卷轴、火球杖、换位杖；
- 四种怪物：Slime、Goblin Archer、Sleep Mushroom、Skeleton Spearman；
- 三种陷阱：Spike Trap、Warp Trap、Sleep Trap；
- 一种危险地形：Poison Pool；
- 小地图、敌人面板、底部快捷栏；
- 3 层胜利、HP 为 0 失败。

本轮任务是：

```text
Web Demo v0.7 / 装备与数值成长版
```

本轮核心目标不是做完整 RPG 装备系统，而是加入最小可玩的装备与数值成长：

```text
玩家可以拾取、装备、替换武器和盾牌；装备会改变攻击、防御等基础数值；玩家开始在探索中做“换不换装备”的取舍。
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
我已理解当前项目是 shiren-like，本轮只做 Web Demo v0.7 / 装备与数值成长版。目标是加入最小可玩的武器、盾牌、装备替换和数值变化；不加入未鉴定、强化合成、诅咒、商店、怪物屋、据点、Boss 或 Godot。
```

---

## 二、本轮核心目标

在保留 v0.6 已有系统的基础上，加入装备系统的最小闭环：

1. 新增武器和盾牌两类装备；
2. 玩家可以拾取装备；
3. 玩家可以装备 / 替换装备；
4. 武器影响玩家攻击；
5. 盾牌影响玩家受到的伤害；
6. HUD 和日志能清楚显示装备和数值变化；
7. 地图中随机生成少量装备；
8. 不加入复杂装备系统。

完成后，玩家应感受到：

```text
探索不只是找消耗品，也能找到让自己变强的装备。
遇到新武器或盾牌时，需要判断是否替换。
装备会改变战斗节奏和风险承受能力。
```

---

## 三、本轮新增装备

### 1. 武器 / Weapon

定位：提升玩家攻击力。

建议初版只做 3 种武器：

```json
"weapons": {
  "wooden_sword": {
    "id": "wooden_sword",
    "name": "木剑",
    "slot": "weapon",
    "attackBonus": 1,
    "icon": "/",
    "color": "#c99b5c"
  },
  "iron_sword": {
    "id": "iron_sword",
    "name": "铁剑",
    "slot": "weapon",
    "attackBonus": 3,
    "icon": "/",
    "color": "#b7c0c7"
  },
  "flame_sword": {
    "id": "flame_sword",
    "name": "火焰剑",
    "slot": "weapon",
    "attackBonus": 4,
    "icon": "/",
    "color": "#e06a3b"
  }
}
```

本轮不做：

- 不做耐久；
- 不做强化等级；
- 不做附魔；
- 不做属性克制；
- 不做武器特殊技能。

---

### 2. 盾牌 / Shield

定位：降低玩家受到的伤害。

建议初版只做 3 种盾牌：

```json
"shields": {
  "wooden_shield": {
    "id": "wooden_shield",
    "name": "木盾",
    "slot": "shield",
    "defenseBonus": 1,
    "icon": "]",
    "color": "#b98a54"
  },
  "iron_shield": {
    "id": "iron_shield",
    "name": "铁盾",
    "slot": "shield",
    "defenseBonus": 2,
    "icon": "]",
    "color": "#b7c0c7"
  },
  "guard_shield": {
    "id": "guard_shield",
    "name": "守护盾",
    "slot": "shield",
    "defenseBonus": 3,
    "icon": "]",
    "color": "#6aa0d8"
  }
}
```

防御公式建议：

```text
finalDamage = max(1, incomingDamage - player.defense)
```

这里的 `player.defense` 来自盾牌 `defenseBonus`。

注意：

- 陷阱和毒沼伤害是否受盾牌减免，本轮建议不受盾牌减免；
- 怪物普通攻击、弓手射击、枪兵攻击受盾牌减免；
- 日志要写清楚防御后的伤害。

---

## 四、玩家数值结构

请扩展玩家状态：

```js
player: {
  baseAttack: 4,
  attack: 4,
  defense: 0,
  equipment: {
    weapon: null,
    shield: null
  }
}
```

或者保留现有 `player.attack`，但必须能计算：

```js
getPlayerAttack()
getPlayerDefense()
```

建议：

```text
总攻击 = 基础攻击 + 武器 attackBonus
总防御 = 盾牌 defenseBonus
```

不要直接把装备加成永久写死到基础攻击里，避免替换装备后数值越来越乱。

---

## 五、装备拾取与替换规则

### 1. 装备生成在地图上

新增装备地面对象，建议标记：

| 标记 | 类型 |
|---|---|
| w | 武器 |
| q | 盾牌 |

也可以不使用固定地图标记，直接用随机生成逻辑。

装备对象建议结构：

```js
{
  id: "equipment_1",
  type: "equipment",
  equipmentType: "iron_sword",
  slot: "weapon",
  x,
  y
}
```

### 2. 拾取方式

v0.7 推荐简化处理：

```text
玩家走到装备格上，自动拾取并与当前装备比较。
如果对应部位为空，自动装备。
如果已有装备，弹出简化提示或在日志中提示可按 E 替换。
```

为了降低实现复杂度，也可以采用：

```text
玩家走到装备格上，如果新装备数值更高，则自动替换；如果更低或相同，则自动放入地面不处理。
```

但我更推荐做一个极简替换弹窗：

```text
发现铁剑：攻击 +3
当前木剑：攻击 +1
按 E 装备 / 按 Esc 放弃
```

如果做弹窗成本高，可以使用按钮或日志提示实现。

### 3. 替换规则

替换时：

- 新装备进入对应装备槽；
- 旧装备掉落在玩家脚下，或直接消失；
- 本轮建议旧装备掉落在玩家脚下，方便后续扩展；
- 日志提示：`你装备了铁剑，攻击提升到 7。`

---

## 六、装备栏 UI / HUD

HUD 必须显示：

```text
攻击：基础 + 装备 = 总攻击
防御：盾牌防御
武器：当前武器名
盾牌：当前盾牌名
```

建议在左上状态区或 Console 中显示：

```text
ATK 7  DEF 2
武器：铁剑 +3
盾牌：铁盾 +2
```

右侧或底部快捷栏不需要放装备按钮，除非实现方便。

必须让玩家知道：

- 当前装备了什么；
- 装备带来了多少加成；
- 拾取新装备后数值发生了什么变化。

---

## 七、装备生成规则

请在 `Data/config/web_demo_balance.json` 中新增：

```json
"equipment": {
  "weapons": { ... },
  "shields": { ... },
  "floorRules": [
    {
      "equipment": [1, 1],
      "equipmentTypes": [
        { "type": "wooden_sword", "weight": 60 },
        { "type": "wooden_shield", "weight": 40 }
      ]
    },
    {
      "equipment": [1, 2],
      "equipmentTypes": [
        { "type": "wooden_sword", "weight": 25 },
        { "type": "iron_sword", "weight": 35 },
        { "type": "wooden_shield", "weight": 20 },
        { "type": "iron_shield", "weight": 20 }
      ]
    },
    {
      "equipment": [2, 3],
      "equipmentTypes": [
        { "type": "iron_sword", "weight": 30 },
        { "type": "flame_sword", "weight": 20 },
        { "type": "iron_shield", "weight": 30 },
        { "type": "guard_shield", "weight": 20 }
      ]
    }
  ]
}
```

生成要求：

- 装备只能生成在地板上；
- 不生成在玩家出生点；
- 不生成在楼梯上；
- 不生成在楼梯相邻 1 格；
- 不与怪物、道具、陷阱、危险地形重叠；
- 第 1 层只生成低级装备；
- 第 2～3 层出现更高数值装备；
- 数量不要太多，避免装备替换过于频繁。

建议新增函数：

```js
placeEquipment(...)
createEquipmentDrop(...)
pickWeightedEquipmentType(...)
handleEquipmentPickup(...)
equipItem(...)
getPlayerAttack()
getPlayerDefense()
```

---

## 八、战斗兼容要求

必须把装备数值接入现有战斗：

### 玩家攻击怪物

当前如果使用：

```js
monster.hp -= state.player.attack
```

应改为：

```js
monster.hp -= getPlayerAttack()
```

火球杖不使用武器攻击力，仍用道具自身伤害。

### 怪物攻击玩家

当前如果使用：

```js
player.hp -= monster.attack
```

应改为：

```js
damage = Math.max(1, monster.attack - getPlayerDefense())
player.hp -= damage
```

适用：

- 近战怪攻击；
- 弓手射击；
- 骷髅枪兵攻击。

不适用：

- 地刺陷阱；
- 毒沼；
- 饥饿伤害。

---

## 九、与已有系统的兼容

必须保留并兼容：

- v0.6 陷阱和危险地形；
- v0.5 四种怪物；
- 玩家睡眠状态；
- 随机迷宫；
- 房间怪物分配；
- 玩家中心镜头；
- Console / Camera / View 调参；
- 小地图；
- 敌人面板；
- 底部快捷栏；
- 饥饿系统；
- 所有道具；
- 胜负结算。

注意兼容点：

- 传送陷阱和传送卷轴不能把玩家送到装备上，除非你明确处理了拾取流程；
- 装备不能与陷阱、危险地形、道具、怪物、楼梯重叠；
- 小地图是否显示装备可以简化处理：可以显示装备点，也可以只在主画面显示；README 要说明；
- 敌人面板不需要显示装备信息；
- Console 调参功能不能删除。

---

## 十、本轮明确不做

不要做：

- 不做未鉴定；
- 不做装备强化；
- 不做装备合成；
- 不做诅咒装备；
- 不做耐久；
- 不做武器特殊技；
- 不做盾牌特殊抗性；
- 不做商店；
- 不做怪物屋；
- 不做壶；
- 不做据点；
- 不做 Boss；
- 不做 Godot 工程；
- 不新增复杂怪物系统；
- 不重做镜头主方案；
- 不删除 Console / Camera / View 调参功能；
- 不引入 React、Phaser、Three.js、PixiJS 或复杂 npm 依赖；
- 不继续开发旧 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守逻辑。

---

## 十一、本轮允许修改文件

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

## 十二、README 更新

更新 `Builds/web-demo/README.md`：

- 当前版本改为 `v0.7 / 装备与数值成长版`；
- 说明本轮目标是加入最小装备系统；
- 说明新增武器和盾牌；
- 说明武器提升攻击、盾牌降低怪物伤害；
- 说明装备拾取和替换规则；
- 说明装备数值如何显示；
- 说明装备不会影响陷阱、毒沼、饥饿伤害；
- 说明 v0.6 的陷阱、危险地形、v0.5 怪物、镜头、Console 调参、饥饿和道具都保留；
- 说明本轮仍未加入未鉴定、强化、合成、诅咒、商店、怪物屋、壶、据点、Boss、Godot。

---

## 十三、测试更新

更新 `Tests/web-demo-smoke.mjs`，至少检查：

- Web Demo 文件存在；
- README 包含 `v0.7 / 装备与数值成长版`；
- README 包含 `武器`、`盾牌`、`攻击`、`防御`；
- 配置文件版本为 `v0.7`；
- 配置文件包含 `equipment`；
- 配置文件包含 `weapons`；
- 配置文件包含 `shields`；
- 配置文件包含 `wooden_sword`、`iron_sword`、`flame_sword`；
- 配置文件包含 `wooden_shield`、`iron_shield`、`guard_shield`；
- 配置文件包含装备 floorRules；
- JS 中存在装备逻辑，例如：
  - `placeEquipment`；
  - `createEquipmentDrop`；
  - `pickWeightedEquipmentType`；
  - `handleEquipmentPickup`；
  - `equipItem`；
  - `getPlayerAttack`；
  - `getPlayerDefense`；
- JS 中存在玩家装备状态，例如 `equipment`、`weapon`、`shield`；
- JS 中仍存在：
  - `placeHazards`；
  - `triggerTrapAt`；
  - `applyTerrainAt`；
  - `actMonster`；
  - `actRanged`；
  - `actSleepMushroom`；
  - `actReachAttack`；
  - `generateDungeon`；
  - `placeMonstersByRoom`；
  - `hunger`；
  - `satiety`；
  - `teleport`；
  - `sleep`；
  - `fireball`；
  - `swap`；
  - `minimap`；
  - `enemyList`；
  - `CAMERA_FIELDS`；
- 旧 kingdom-like 核心词仍不得出现：`treeCost`、`wallCost`、`towerCost`、`landmarkCost`、`workers`、`archers`。

---

## 十四、功能验收标准

完成后必须满足：

1. `node --check Builds/web-demo/game.js` 通过；
2. `node --check Tools/web-demo-server.mjs` 通过；
3. `node Tests/web-demo-smoke.mjs` 通过；
4. `node Tools/web-demo-server.mjs` 可以启动；
5. 打开 `http://127.0.0.1:4173/Builds/web-demo/` 可以试玩；
6. 地图中会生成武器和盾牌；
7. 玩家可以拾取装备；
8. 玩家可以装备或替换武器；
9. 玩家可以装备或替换盾牌；
10. 武器会提高玩家普通攻击伤害；
11. 盾牌会降低怪物造成的伤害；
12. HUD 能显示当前武器、盾牌、攻击和防御；
13. 日志能说明装备变化和数值变化；
14. 装备不会与怪物、道具、陷阱、危险地形、楼梯重叠；
15. 陷阱、毒沼、饥饿伤害不受盾牌减免；
16. v0.6 陷阱与危险地形仍可用；
17. v0.5 怪物机制仍可用；
18. 玩家中心镜头、Console 调参、小地图、敌人面板、快捷栏仍可用；
19. 没有加入未鉴定、强化、合成、诅咒、商店、怪物屋、壶、据点、Boss、Godot；
20. 没有残留 kingdom-like 核心玩法。

---

## 十五、完成后更新记录

完成后必须更新：

1. `AI_TASKS/CURRENT_TASK.md`
2. `AI_TASKS/CHANGELOG.md`
3. `AI_TASKS/DEV_LOG.md`
4. `AI_TASKS/NEXT_CODEX_PROMPT.md`

记录本轮为：

```text
Web Demo v0.7 / 装备与数值成长版
```

下一轮建议暂时写成：

```text
Web Demo v0.8 / 未鉴定与道具风险版
```

但不要直接开始 v0.8，等待制作人试玩 v0.7 后确认。

---

## 十六、完成后输出格式

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