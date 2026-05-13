# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

Web Demo v0.5 / 怪物机制版

---

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

当前版本 `v0.4.3 / 玩家中心镜头 + Console 视野调参版` 已经完成：

- 随机房间与走廊；
- 房间尺寸 3×3 到 10×10；
- 每个非出生房间至少 1 只怪物；
- 玩家中心镜头；
- Console 视野参数调试；
- 饥饿 / 满腹度；
- 回复药、食物、传送卷轴、睡眠卷轴、火球杖、换位杖；
- 小地图、敌人面板、底部快捷栏；
- 3 层胜利、HP 为 0 失败。

本轮任务是：

```text
Web Demo v0.5 / 怪物机制版
```

本轮核心目标不是扩展复杂系统，而是解决当前敌人过于单一的问题，让游戏从“走格子打史莱姆”进化为：

```text
不同怪物需要不同处理方式。
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
我已理解当前项目是 shiren-like，本轮只做 Web Demo v0.5 / 怪物机制版，目标是加入少量行为差异明确的怪物，让不同怪物需要不同处理方式；不改镜头主方向，不加入陷阱、装备、未鉴定、壶、商店、据点和 Godot。
```

---

## 二、本轮核心目标

在保留 v0.4.3 已有系统的基础上，加入第一批规则差异明确的怪物。

本轮完成后，玩家应能明显感受到：

```text
史莱姆：基础近战怪，教学压力。
哥布林弓手：远程压制，逼迫走位和遮挡。
催眠蘑菇：干扰控制，逼迫玩家优先处理或保持距离。
骷髅枪兵：隔一格攻击，逼迫玩家理解距离和站位。
```

怪物机制的目标是增加局势判断，而不是单纯提高数值难度。

---

## 三、本轮新增怪物

### 1. Slime / 史莱姆：基础近战怪

定位：保留当前基础怪，用作教学和低压敌人。

建议配置：

```json
{
  "id": "slime",
  "name": "史莱姆",
  "hp": 6,
  "attack": 3,
  "behavior": "melee",
  "icon": "S"
}
```

行为：

- 如果与玩家相邻，攻击玩家；
- 否则向玩家靠近；
- 不穿墙；
- 不与其他怪物重叠。

---

### 2. Goblin Archer / 哥布林弓手：远程压制怪

定位：让玩家理解“不是所有怪都要贴脸打”。

建议配置：

```json
{
  "id": "goblin_archer",
  "name": "哥布林弓手",
  "hp": 5,
  "attack": 2,
  "behavior": "ranged",
  "range": 4,
  "icon": "A"
}
```

行为：

- 如果与玩家在同一行或同一列；
- 且距离 <= 4；
- 且中间没有墙；
- 则远程攻击玩家；
- 否则向玩家靠近；
- 如果玩家贴脸，弓手也可以近战攻击，伤害同 attack。

可视化要求：

- 弓手威胁范围用红色线性格或红色危险格提示；
- 行动日志写清楚：`哥布林弓手射击了你。`

设计目标：

- 玩家需要利用墙、拐角、睡眠卷轴、传送卷轴或火球杖处理远程压力。

---

### 3. Sleep Mushroom / 催眠蘑菇：干扰怪

定位：让玩家理解“状态异常比伤害更危险”。

建议配置：

```json
{
  "id": "sleep_mushroom",
  "name": "催眠蘑菇",
  "hp": 7,
  "attack": 1,
  "behavior": "sleep_spore",
  "sporeRange": 2,
  "sleepTurns": 2,
  "cooldown": 4,
  "icon": "M"
}
```

行为：

- 如果玩家在 2 格曼哈顿距离内；
- 且技能未冷却；
- 则释放催眠孢子，让玩家睡眠 2 回合；
- 睡眠期间玩家不能行动，怪物继续行动；
- 技能进入冷却；
- 如果不能释放技能，则按普通近战怪靠近或攻击。

玩家状态要求：

- 为玩家增加 `sleepTurns` 或类似状态字段；
- 玩家睡眠时，按键不执行行动，或自动跳过回合；
- 日志提示：`你被催眠孢子影响，睡着了。`
- 睡眠结束日志提示：`你醒来了。`

设计目标：

- 让玩家优先判断“要不要先处理蘑菇”。

---

### 4. Skeleton Spearman / 骷髅枪兵：隔格攻击怪

定位：让玩家理解“距离 2 也可能危险”。

建议配置：

```json
{
  "id": "skeleton_spearman",
  "name": "骷髅枪兵",
  "hp": 8,
  "attack": 3,
  "behavior": "reach_attack",
  "range": 2,
  "icon": "P"
}
```

行为：

- 如果玩家在同一行或同一列；
- 且距离为 1 或 2；
- 且中间没有墙；
- 则攻击玩家；
- 否则向玩家靠近；
- 攻击日志：`骷髅枪兵用长枪刺中了你。`

设计目标：

- 玩家不能只按“贴脸才危险”理解怪物；
- 玩家需要用走位、火球、换位、睡眠卷轴处理它。

---

## 四、怪物数据结构要求

当前如果只有单一 `monster` 配置，请改成支持多怪物类型。

建议配置结构：

```json
"monsters": {
  "slime": { ... },
  "goblin_archer": { ... },
  "sleep_mushroom": { ... },
  "skeleton_spearman": { ... }
}
```

怪物实例建议包含：

```js
{
  id,
  type,
  name,
  x,
  y,
  hp,
  maxHp,
  attack,
  behavior,
  range,
  sleepTurns,
  cooldown,
  hitFlash
}
```

注意：

- 不要删除对旧 `monster` 配置的兼容，除非所有引用已彻底迁移；
- 新怪物的数值应放在 `Data/config/web_demo_balance.json`；
- 不要在代码中硬编码大段数值。

---

## 五、怪物生成规则

当前已经按房间生成怪物。v0.5 需要让不同楼层出现不同怪物组合。

建议规则：

### 1F

- 主要是史莱姆；
- 少量哥布林弓手；
- 不建议出现催眠蘑菇和骷髅枪兵，或只极少出现。

### 2F

- 史莱姆；
- 哥布林弓手；
- 催眠蘑菇开始出现。

### 3F

- 四种怪物都可以出现；
- 骷髅枪兵作为更高威胁单位出现；
- 不要让同一房间生成太多高威胁怪。

配置建议：

```json
"floorRules": [
  {
    "monsters": [5, 7],
    "monsterTypes": [
      { "type": "slime", "weight": 80 },
      { "type": "goblin_archer", "weight": 20 }
    ]
  },
  {
    "monsters": [6, 8],
    "monsterTypes": [
      { "type": "slime", "weight": 45 },
      { "type": "goblin_archer", "weight": 35 },
      { "type": "sleep_mushroom", "weight": 20 }
    ]
  },
  {
    "monsters": [7, 9],
    "monsterTypes": [
      { "type": "slime", "weight": 30 },
      { "type": "goblin_archer", "weight": 30 },
      { "type": "sleep_mushroom", "weight": 20 },
      { "type": "skeleton_spearman", "weight": 20 }
    ]
  }
]
```

必须保留：

- 每个非出生房间至少 1 只怪物；
- 出生房间不能开局过难；
- 楼梯附近不要直接堵死；
- 大房间可额外生成怪物。

---

## 六、怪物 AI 与回合规则

本轮不要重写整个回合系统，只在现有 `monstersAct` / 怪物行动逻辑基础上扩展。

建议拆分：

```js
actMonster(monster)
actMelee(monster)
actRanged(monster)
actSleepMushroom(monster)
actReachAttack(monster)
```

或者用行为分支：

```js
switch (monster.behavior) { ... }
```

回合规则：

- 玩家每有效行动一次，所有非睡眠怪物行动一次；
- 怪物自身 `sleepTurns > 0` 时减少回合，不行动；
- 玩家被催眠时，应自动跳过或阻止输入，并推进回合；
- 不要出现怪物一回合连续行动多次；
- 不要让怪物互相重叠；
- 不要让远程攻击穿墙。

---

## 七、威胁范围与 UI 要求

### 主画面

需要让玩家看出不同怪物的威胁范围。

建议：

- 近战怪：相邻 4 格红色威胁范围；
- 弓手：同直线射程范围用红色线或半透明格提示；
- 蘑菇：2 格范围可用紫色或红紫色范围提示；
- 枪兵：同直线 2 格范围提示。

如果实现复杂，可以先统一用红色威胁格，但必须让不同怪物的威胁范围至少大致正确。

### 敌人面板

右侧敌人面板应显示怪物类型：

- 图标；
- 名称；
- HP；
- 状态，例如 `睡眠`、`冷却`；
- 类型最好有颜色区分。

### 日志

必须清楚记录特殊行动：

- 弓手射击；
- 蘑菇催眠；
- 玩家睡着 / 醒来；
- 枪兵隔格攻击；
- 怪物被击败。

---

## 八、道具兼容要求

v0.2 / v0.3 的道具必须继续可用，并且能对新怪物产生价值：

- 回复药：继续恢复 HP；
- 食物：继续恢复满腹度；
- 传送卷轴：可以逃离远程压制或包围；
- 睡眠卷轴：可以让所有类型怪物睡眠；
- 火球杖：可以远程攻击所有类型怪物；
- 换位杖：可以与所有类型怪物换位。

注意：

- 火球、换位、睡眠卷轴不要只支持 slime；
- 击杀新怪物也要计入 kills；
- 新怪物 HP 归零后要正确移除。

---

## 九、本轮允许修改文件

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
Data/config/web_demo_balance.json
Builds/web-demo/README.md
Tests/web-demo-smoke.mjs
AI_TASKS/CURRENT_TASK.md
AI_TASKS/CHANGELOG.md
AI_TASKS/DEV_LOG.md
```

---

## 十、本轮禁止事项

不要做：

- 不调整镜头主方案；
- 不删除 Console 视野调参功能；
- 不做陷阱；
- 不做未鉴定；
- 不做装备；
- 不做怪物屋；
- 不做壶；
- 不做商店；
- 不做据点；
- 不做 Boss；
- 不做 Godot 工程；
- 不引入 React、Phaser、Three.js、PixiJS 或复杂 npm 依赖；
- 不破坏随机迷宫、饥饿、道具、小地图、敌人面板和快捷栏；
- 不继续开发旧 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守逻辑。

---

## 十一、README 更新

更新 `Builds/web-demo/README.md`：

- 当前版本改为 `v0.5 / 怪物机制版`；
- 说明本轮目标是加入第一批规则怪物；
- 说明新增怪物：史莱姆、哥布林弓手、催眠蘑菇、骷髅枪兵；
- 说明每种怪物的行为差异；
- 说明道具仍然可用于处理新怪物；
- 说明镜头、Console 调参、小地图、敌人面板、饥饿、道具等系统保留；
- 说明本轮仍未加入陷阱、未鉴定、装备、怪物屋、壶、商店、据点和 Godot。

---

## 十二、测试更新

更新 `Tests/web-demo-smoke.mjs`，至少检查：

- Web Demo 文件存在；
- README 包含 `v0.5 / 怪物机制版`；
- README 包含 `哥布林弓手`、`催眠蘑菇`、`骷髅枪兵`；
- 配置文件版本为 `v0.5`；
- 配置文件包含 `monsters` 多怪物配置；
- 配置文件包含 `slime`；
- 配置文件包含 `goblin_archer`；
- 配置文件包含 `sleep_mushroom`；
- 配置文件包含 `skeleton_spearman`；
- 配置文件 floorRules 包含 `monsterTypes` 或等效权重配置；
- JS 中存在多怪物行为逻辑，例如：
  - `actMonster`；
  - `actRanged` 或 `ranged`；
  - `sleep_spore` 或 `actSleepMushroom`；
  - `reach_attack` 或 `actReachAttack`；
- JS 中存在直线视野 / 不穿墙判断，例如 `hasLineOfSight` 或类似函数；
- JS 中保留玩家睡眠状态逻辑，例如 `player.sleepTurns`；
- JS 中仍存在：
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

## 十三、功能验收标准

完成后必须满足：

1. `node --check Builds/web-demo/game.js` 通过；
2. `node --check Tools/web-demo-server.mjs` 通过；
3. `node Tests/web-demo-smoke.mjs` 通过；
4. `node Tools/web-demo-server.mjs` 可以启动；
5. 打开 `http://127.0.0.1:4173/Builds/web-demo/` 可以试玩；
6. 地图中会生成多种怪物，而不是只有史莱姆；
7. 弓手能在直线无遮挡时远程攻击；
8. 弓手攻击不能穿墙；
9. 催眠蘑菇能让玩家睡眠；
10. 玩家睡眠状态有清楚日志和回合表现；
11. 骷髅枪兵能隔一格攻击；
12. 威胁范围能大致反映不同怪物的危险格；
13. 敌人面板能显示不同怪物类型和 HP；
14. 道具对新怪物仍然有效；
15. 击杀新怪物正常计数；
16. 随机迷宫、饥饿、玩家中心镜头、Console 调参、小地图、快捷栏仍可用；
17. 没有加入陷阱、未鉴定、装备、怪物屋、壶、商店、据点、Boss、Godot；
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
Web Demo v0.5 / 怪物机制版
```

下一轮建议暂时写成：

```text
Web Demo v0.6 / 陷阱与危险地形版
```

但不要直接开始 v0.6，等待制作人试玩 v0.5 后确认。

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