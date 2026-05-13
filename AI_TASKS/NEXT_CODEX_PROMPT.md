# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

Web Demo v0.7.1 / 装备池补全与平衡版

---

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

当前版本 `v0.7 / 装备与数值成长版` 已经完成最小装备系统：

- 玩家有 `weapon / shield` 两个装备位；
- 地图中会生成装备；
- 玩家站在装备上按 `C` 可以装备或替换；
- 替换时旧装备会掉回脚下；
- 武器影响 `ATK`；
- 盾牌影响 `DEF`；
- 怪物攻击会受到防御减免，最低伤害为 1；
- HUD 显示 `ATK / DEF / weapon / shield`；
- v0.6 陷阱与危险地形、v0.5 怪物、玩家中心镜头、Console 调参、小地图、敌人面板、快捷栏都保留。

但当前 v0.7 实际实现的装备池偏小：

```text
武器：Short Sword / Spear
盾牌：Wooden Shield / Iron Shield
```

本轮任务是：

```text
Web Demo v0.7.1 / 装备池补全与平衡版
```

本轮目标不是增加新系统，而是补齐装备池并做一次轻量平衡：

```text
补齐高级武器和高级盾牌，让装备成长更完整；检查装备生成、替换、掉落和攻防成长节奏是否合理。
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
我已理解当前项目是 shiren-like，本轮只做 Web Demo v0.7.1 / 装备池补全与平衡版。目标是补齐高级装备并微调装备掉落和攻防成长，不新增未鉴定、强化、合成、诅咒、耐久、商店、怪物屋、壶、据点、Boss 或 Godot。
```

---

## 二、本轮核心目标

在 v0.7 的基础上，完成以下改动：

1. 补齐高级武器 `flame_sword / 火焰剑`；
2. 补齐高级盾牌 `guard_shield / 守护盾`；
3. 检查并微调每层装备掉落权重；
4. 保证装备替换和旧装备掉落逻辑稳定；
5. 保证装备不会与怪物、道具、陷阱、危险地形、楼梯重叠；
6. 更新 HUD、日志、README、配置、smoke test 和任务记录；
7. 不新增复杂装备系统。

完成后，玩家应能感受到：

```text
1F 主要获得基础装备；
2F 可能获得中级装备；
3F 有机会获得高级装备；
武器和盾牌成长形成清晰的探索奖励。
```

---

## 三、装备池补全

当前 v0.7 已有：

```text
short_sword：短剑，weapon，ATK +1
spear：长枪，weapon，ATK +2
wooden_shield：木盾，shield，DEF +1
iron_shield：铁盾，shield，DEF +2
```

本轮新增：

### 1. Flame Sword / 火焰剑

```json
"flame_sword": {
  "id": "flame_sword",
  "name": "火焰剑",
  "slot": "weapon",
  "attackBonus": 4,
  "defenseBonus": 0,
  "icon": "F",
  "color": "#e06a3b"
}
```

说明：

- 本轮只做高攻击数值装备；
- 不做火焰特效；
- 不做属性克制；
- 不做燃烧状态；
- 不做特殊攻击。

---

### 2. Guard Shield / 守护盾

```json
"guard_shield": {
  "id": "guard_shield",
  "name": "守护盾",
  "slot": "shield",
  "attackBonus": 0,
  "defenseBonus": 3,
  "icon": "G",
  "color": "#6aa0d8"
}
```

说明：

- 本轮只做高防御数值装备；
- 不做特殊抗性；
- 不做反伤；
- 不做免疫陷阱；
- 不做耐久。

---

## 四、装备生成权重调整

请继续使用当前 v0.7 的 `equipmentTypes` 生成方式，不要重做整个装备系统。

推荐调整为：

### 1F：基础装备为主

```json
"equipment": [1, 2],
"equipmentTypes": [
  { "type": "short_sword", "weight": 45 },
  { "type": "wooden_shield", "weight": 45 },
  { "type": "spear", "weight": 8 },
  { "type": "iron_shield", "weight": 2 }
]
```

### 2F：中级装备为主

```json
"equipment": [2, 2],
"equipmentTypes": [
  { "type": "short_sword", "weight": 20 },
  { "type": "wooden_shield", "weight": 20 },
  { "type": "spear", "weight": 30 },
  { "type": "iron_shield", "weight": 25 },
  { "type": "flame_sword", "weight": 3 },
  { "type": "guard_shield", "weight": 2 }
]
```

### 3F：高级装备开始出现

```json
"equipment": [2, 3],
"equipmentTypes": [
  { "type": "spear", "weight": 30 },
  { "type": "iron_shield", "weight": 30 },
  { "type": "flame_sword", "weight": 20 },
  { "type": "guard_shield", "weight": 20 }
]
```

设计意图：

- 1F 主要帮助玩家理解装备；
- 2F 开始出现换装取舍；
- 3F 给予明显成长感；
- 高级装备不应过早大量出现，避免前期难度失效。

---

## 五、装备替换与掉落稳定性检查

当前 v0.7 的规则是：

```text
站在装备上按 C 装备或替换；
旧装备掉回脚下；
装备 / 替换推进 1 回合。
```

本轮必须检查并保证：

1. 玩家脚下有装备时，按 `C` 一定能触发；
2. 当前槽位为空时，新装备直接装备；
3. 当前槽位已有装备时，新装备进入槽位；
4. 旧装备掉回玩家脚下；
5. 如果脚下已经有装备，不能产生两个装备完全重叠导致无法选择；
6. 如果实现上无法支持脚下多装备，请用稳定方案：旧装备放到玩家相邻安全格；
7. 如果没有相邻安全格，旧装备可以直接消失，但必须写日志说明；
8. 装备动作推进 1 回合；
9. 装备动作不会额外触发两次怪物行动；
10. 装备动作后如果玩家站在毒沼上，仍按 v0.7 规则结算毒沼伤害。

推荐新增或检查函数：

```js
findEquipmentAtPlayer()
findSafeEquipmentDropCell()
canPlaceEquipmentAt(x, y)
```

---

## 六、HUD 与日志要求

HUD 继续显示：

```text
ATK
DEF
武器
盾牌
```

新增装备出现后，要能正确显示：

```text
武器：火焰剑 +4
盾牌：守护盾 +3
```

日志要清楚：

```text
你装备了火焰剑，攻击提升到 8。
你装备了守护盾，防御提升到 3。
你卸下的铁盾掉在了脚下。
```

如果旧装备被丢到相邻格：

```text
你卸下的木盾掉在了旁边。
```

如果旧装备无法放置而消失：

```text
附近没有可放置的位置，旧装备消失了。
```

---

## 七、战斗平衡检查

装备接入规则保持 v0.7：

```text
玩家普通攻击 = baseAttack + weapon.attackBonus
玩家防御 = baseDefense + shield.defenseBonus
怪物最终伤害 = max(1, monster.attack - playerDefense)
```

本轮要检查：

- 火焰剑不会让 1F 怪物全部被过早秒杀，除非极低概率掉落；
- 守护盾不会让玩家完全无伤，因为最低伤害仍为 1；
- 陷阱、毒沼、饥饿仍不受盾牌减免；
- 火球杖仍使用道具自身伤害，不吃武器攻击加成。

不要做复杂数值系统，只做必要平衡微调。

---

## 八、与已有系统的兼容

必须保留：

- v0.7 装备系统；
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
- 回复药、食物、传送卷轴、睡眠卷轴、火球杖、换位杖；
- 3 层胜利与死亡结算。

不要回退：

- 不要删除装备快捷键 `C`；
- 不要删除 `ATK / DEF / weapon / shield`；
- 不要删除 `equipmentOnGround`；
- 不要删除 `getPlayerAttack()` / `getPlayerDefense()`；
- 不要删除 `CAMERA_FIELDS`；
- 不要删除陷阱、毒沼、怪物机制。

---

## 九、本轮明确不做

不要做：

- 不做未鉴定；
- 不做装备强化；
- 不做装备合成；
- 不做诅咒装备；
- 不做耐久；
- 不做武器特殊技；
- 不做盾牌特殊抗性；
- 不做火焰剑燃烧效果；
- 不做守护盾特殊防护；
- 不做背包容量；
- 不做投掷；
- 不做商店；
- 不做怪物屋；
- 不做壶；
- 不做据点；
- 不做 Boss；
- 不做 Godot 工程；
- 不重做镜头主方案；
- 不删除 Console / Camera / View 调参功能；
- 不引入 React、Phaser、Three.js、PixiJS 或复杂 npm 依赖；
- 不继续开发旧 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守逻辑。

---

## 十、本轮允许修改文件

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
Data/config/web_demo_balance.json
Builds/web-demo/game.js
Builds/web-demo/README.md
Tests/web-demo-smoke.mjs
AI_TASKS/CURRENT_TASK.md
AI_TASKS/CHANGELOG.md
AI_TASKS/DEV_LOG.md
```

---

## 十一、README 更新

更新 `Builds/web-demo/README.md`：

- 当前版本改为 `v0.7.1 / 装备池补全与平衡版`；
- 说明本轮是 v0.7 的补丁版，不新增大系统；
- 说明新增 `Flame Sword / 火焰剑` 和 `Guard Shield / 守护盾`；
- 说明当前装备池完整列表；
- 说明每层装备掉落节奏；
- 说明装备替换、旧装备掉落和无法掉落时的处理；
- 说明火焰剑和守护盾目前只有数值效果，没有特殊效果；
- 说明 v0.6 陷阱、v0.5 怪物、玩家中心镜头、Console 调参、饥饿和道具都保留。

---

## 十二、测试更新

更新 `Tests/web-demo-smoke.mjs`，至少检查：

- Web Demo 文件存在；
- README 包含 `v0.7.1 / 装备池补全与平衡版`；
- README 包含 `火焰剑` 或 `Flame Sword`；
- README 包含 `守护盾` 或 `Guard Shield`；
- 配置文件版本为 `v0.7.1`；
- 配置文件包含 `flame_sword`；
- 配置文件包含 `guard_shield`；
- `flame_sword.attackBonus` 为 4；
- `guard_shield.defenseBonus` 为 3；
- 3F `equipmentTypes` 中包含 `flame_sword`；
- 3F `equipmentTypes` 中包含 `guard_shield`；
- JS 中仍存在：
  - `createEquipmentDrop`；
  - `equipmentOnGround`；
  - `placeEquipmentDrops`；
  - `equipGroundItem`；
  - `getPlayerAttack`；
  - `getPlayerDefense`；
  - `KeyC`；
  - `weapon-value`；
  - `shield-value`；
  - `placeHazards`；
  - `triggerTrapAt`；
  - `applyTerrainAt`；
  - `actMonster`；
  - `generateDungeon`；
  - `CAMERA_FIELDS`；
- 如果实现了相邻格旧装备掉落逻辑，测试中检查 `findSafeEquipmentDropCell` 或类似函数；
- 旧 kingdom-like 核心词仍不得出现：`treeCost`、`wallCost`、`towerCost`、`landmarkCost`、`workers`、`archers`。

---

## 十三、功能验收标准

完成后必须满足：

1. `node --check Builds/web-demo/game.js` 通过；
2. `node --check Tools/web-demo-server.mjs` 通过；
3. `node Tests/web-demo-smoke.mjs` 通过；
4. `node Tools/web-demo-server.mjs` 可以启动；
5. 打开 `http://127.0.0.1:4173/Builds/web-demo/` 可以试玩；
6. 地图中仍会生成武器和盾牌；
7. 3F 有机会生成火焰剑和守护盾；
8. 火焰剑装备后 ATK 正确增加；
9. 守护盾装备后 DEF 正确增加；
10. 站在装备上按 C 仍能稳定装备或替换；
11. 旧装备掉落逻辑稳定，不会导致无法选择或错误重叠；
12. 装备不会与怪物、道具、陷阱、危险地形、楼梯重叠；
13. 怪物伤害仍受 DEF 减免，最低伤害仍为 1；
14. 陷阱、毒沼、饥饿伤害仍不受盾牌减免；
15. v0.6 陷阱与危险地形仍可用；
16. v0.5 怪物机制仍可用；
17. 玩家中心镜头、Console 调参、小地图、敌人面板、快捷栏仍可用；
18. 没有加入未鉴定、强化、合成、诅咒、耐久、商店、怪物屋、壶、据点、Boss、Godot；
19. 没有残留 kingdom-like 核心玩法。

---

## 十四、完成后更新记录

完成后必须更新：

1. `AI_TASKS/CURRENT_TASK.md`
2. `AI_TASKS/CHANGELOG.md`
3. `AI_TASKS/DEV_LOG.md`
4. `AI_TASKS/NEXT_CODEX_PROMPT.md`

记录本轮为：

```text
Web Demo v0.7.1 / 装备池补全与平衡版
```

下一轮建议暂时写成：

```text
Web Demo v0.8 / 背包与投掷版
```

但不要直接开始 v0.8，等待制作人试玩 v0.7.1 后确认。

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