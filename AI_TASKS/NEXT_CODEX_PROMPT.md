# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

Web Demo v0.6 / 陷阱与危险地形版

---

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

当前版本 `v0.5 / 怪物机制版` 已完成，已经实现：

- 随机房间与走廊；
- 房间尺寸 3×3 到 10×10；
- 每个非出生房间至少 1 只怪物；
- 玩家中心镜头；
- Console / Camera / View 视野调参；
- 饥饿与满腹度；
- 回复药、食物、传送卷轴、睡眠卷轴、火球杖、换位杖；
- 四种怪物：Slime、Goblin Archer、Sleep Mushroom、Skeleton Spearman；
- 行为差异化怪物 AI；
- 小地图、敌人面板、底部快捷栏；
- 3 层胜利、HP 为 0 失败。

本轮任务是：

```text
Web Demo v0.6 / 陷阱与危险地形版
```

本轮核心目标不是扩展大系统，而是让地图本身开始产生风险：

```text
玩家不只要处理怪物，还要观察地面、规避陷阱、利用危险地形做决策。
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
我已理解当前项目是 shiren-like，本轮只做 Web Demo v0.6 / 陷阱与危险地形版。目标是加入少量规则清晰的陷阱和危险地形，让地图本身产生风险；不加入装备、未鉴定、怪物屋、壶、商店、据点、Boss 或 Godot。
```

---

## 二、本轮核心目标

在保留 v0.5 已有系统的基础上，新增第一批地图风险内容：

1. 陷阱：踩上去触发一次性或短期效果；
2. 危险地形：站在上面或经过时持续产生风险；
3. 视觉提示：玩家能看出哪些格子危险；
4. 日志反馈：触发后必须说明发生了什么；
5. 小地图 / 主画面表现：危险格要可读，但不能遮挡怪物、道具和楼梯。

本轮完成后，玩家应能明显感受到：

```text
走位不只是躲怪物，还要看地面。
有些格子看似可走，但踩上去有代价。
怪物、陷阱、地形会一起形成局势压力。
```

---

## 三、本轮新增内容

### 1. Spike Trap / 地刺陷阱

定位：最基础的直接伤害陷阱。

建议配置：

```json
{
  "id": "spike_trap",
  "name": "地刺陷阱",
  "type": "trap",
  "damage": 4,
  "visible": true,
  "singleUse": true,
  "icon": "^"
}
```

规则：

- 玩家踩到后立刻触发；
- 对玩家造成固定伤害；
- 触发后陷阱消失或变成已触发状态；
- 如果伤害导致 HP 为 0，应进入死亡结算；
- 日志提示：`你踩中了地刺陷阱，受到 4 点伤害。`

本轮可以先不让怪物触发地刺，除非实现成本很低。

---

### 2. Warp Trap / 传送陷阱

定位：改变位置，制造未知风险。

建议配置：

```json
{
  "id": "warp_trap",
  "name": "传送陷阱",
  "type": "trap",
  "visible": true,
  "singleUse": true,
  "icon": "?"
}
```

规则：

- 玩家踩到后传送到当前楼层一个安全地板格；
- 不能传送到墙、怪物、楼梯、道具、其他陷阱或危险地形上；
- 触发后陷阱消失或变成已触发状态；
- 日志提示：`传送陷阱启动了，你被传送到了别处。`

注意：

- 传送不能造成无解；
- 传送位置不能直接把玩家放进怪物包围死局；
- 允许传到另一个房间，制造探索变化。

---

### 3. Sleep Trap / 睡眠陷阱

定位：让玩家理解“地面也可能造成状态异常”。

建议配置：

```json
{
  "id": "sleep_trap",
  "name": "睡眠陷阱",
  "type": "trap",
  "sleepTurns": 2,
  "visible": true,
  "singleUse": true,
  "icon": "Z"
}
```

规则：

- 玩家踩到后进入睡眠状态；
- 睡眠回合建议 2 回合；
- 复用 v0.5 的 `player.sleepTurns` 逻辑；
- 触发后陷阱消失或变成已触发状态；
- 日志提示：`你踩中了睡眠陷阱，陷入沉睡。`

---

### 4. Poison Pool / 毒沼地形

定位：持续危险地形，不是一次性陷阱。

建议配置：

```json
{
  "id": "poison_pool",
  "name": "毒沼",
  "type": "terrain",
  "damage": 1,
  "icon": "~"
}
```

规则：

- 毒沼是危险地形，不是一次性陷阱；
- 玩家进入毒沼格或在毒沼格等待 / 行动时，受到 1 点伤害；
- 毒沼不会消失；
- 日志提示：`毒沼腐蚀了你，受到 1 点伤害。`

本轮可以暂时只对玩家生效，不要求怪物受到毒沼影响。

---

## 四、陷阱与危险地形生成规则

请在 `Data/config/web_demo_balance.json` 中新增配置，例如：

```json
"hazards": {
  "traps": {
    "spike_trap": { ... },
    "warp_trap": { ... },
    "sleep_trap": { ... }
  },
  "terrain": {
    "poison_pool": { ... }
  },
  "floorRules": [
    {
      "traps": [1, 2],
      "terrain": [1, 2],
      "trapTypes": [
        { "type": "spike_trap", "weight": 70 },
        { "type": "warp_trap", "weight": 30 }
      ],
      "terrainTypes": [
        { "type": "poison_pool", "weight": 100 }
      ]
    },
    {
      "traps": [2, 3],
      "terrain": [2, 3],
      "trapTypes": [
        { "type": "spike_trap", "weight": 45 },
        { "type": "warp_trap", "weight": 30 },
        { "type": "sleep_trap", "weight": 25 }
      ],
      "terrainTypes": [
        { "type": "poison_pool", "weight": 100 }
      ]
    },
    {
      "traps": [3, 4],
      "terrain": [3, 5],
      "trapTypes": [
        { "type": "spike_trap", "weight": 40 },
        { "type": "warp_trap", "weight": 30 },
        { "type": "sleep_trap", "weight": 30 }
      ],
      "terrainTypes": [
        { "type": "poison_pool", "weight": 100 }
      ]
    }
  ]
}
```

生成要求：

- 陷阱和危险地形只能生成在地板上；
- 不能生成在玩家出生点；
- 不能生成在楼梯上；
- 不要生成在楼梯相邻 1 格；
- 不要与怪物、道具重叠；
- 不要把唯一通道入口全部堵成必踩危险地形；
- 第 1 层陷阱数量较少；
- 第 2～3 层逐渐增加；
- 陷阱和危险地形数量不要过多，避免主画面变得太脏。

建议新增函数：

```js
placeHazards(...)
placeTraps(...)
placeTerrainHazards(...)
triggerTrapAt(x, y)
applyTerrainAt(x, y)
```

---

## 五、显示与可读性要求

### 主画面

陷阱和危险地形必须清晰可读。

建议：

- 地刺：尖刺符号或红色小三角；
- 传送陷阱：紫色问号或魔法阵；
- 睡眠陷阱：蓝紫色 Z；
- 毒沼：绿色 / 紫绿色半透明地面；
- 不要用和道具、怪物太接近的颜色；
- 不要遮挡蓝色行动范围、红色怪物威胁范围。

### 小地图

小地图可以简化显示：

- 陷阱和危险地形可以显示为黄色 / 紫色小点；
- 如果小地图信息太密，可以只显示危险地形，不显示一次性陷阱；
- 但 README 要说明当前显示策略。

### 敌人面板

本轮不需要在敌人面板显示陷阱。

---

## 六、触发时机与回合规则

### 陷阱

玩家进入陷阱格后触发。

建议流程：

```text
玩家移动到目标格
↓
拾取道具或处理地面对象前后，检查陷阱
↓
触发陷阱效果
↓
若玩家死亡，进入结算
↓
若未死亡，继续回合推进和怪物行动
```

规则要求：

- 踩陷阱属于有效行动的一部分；
- 不要因为陷阱触发额外再推进一回合，除非明确设计；
- 传送陷阱触发后，怪物行动一次即可，不要多次行动；
- 睡眠陷阱触发后，后续回合复用玩家睡眠逻辑；
- 地刺造成伤害后，如果玩家死亡，立即结算。

### 危险地形

玩家进入危险地形或在危险地形上行动时触发。

建议：

- 玩家走入毒沼时扣 1 HP；
- 玩家站在毒沼上等待、攻击、使用道具后，也可以再次扣 1 HP；
- 如果实现复杂，v0.6 可以先只在进入毒沼时扣血，但要在 README 说明；
- 不要让毒沼伤害过高，避免不可控死亡。

---

## 七、与已有系统的兼容

必须保留并兼容：

- v0.5 四种怪物；
- 怪物威胁范围；
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

- 睡眠陷阱应复用玩家睡眠状态，不要另写一套状态；
- 传送陷阱应复用或参考传送卷轴的安全格逻辑；
- 毒沼伤害和饥饿伤害都可能导致死亡，死亡原因要能区分；
- 地刺伤害和怪物攻击都可能发生在同一回合，日志顺序要清楚。

---

## 八、死亡原因与日志

死亡原因至少区分：

- 被怪物击败；
- 因饥饿倒下；
- 被地刺陷阱击倒；
- 被毒沼腐蚀倒下。

日志必须包括：

- 触发地刺；
- 触发传送陷阱；
- 触发睡眠陷阱；
- 毒沼伤害；
- 陷阱已触发 / 消失；
- 如果没有效果，也要有说明。

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

- 不做未鉴定；
- 不做装备；
- 不做怪物屋；
- 不做壶；
- 不做商店；
- 不做据点；
- 不做 Boss；
- 不做 Godot 工程；
- 不新增复杂怪物系统；
- 不重做镜头主方案；
- 不删除 Console / Camera / View 调参功能；
- 不引入 React、Phaser、Three.js、PixiJS 或复杂 npm 依赖；
- 不破坏随机迷宫、饥饿、道具、怪物、小地图、敌人面板和快捷栏；
- 不继续开发旧 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守逻辑。

---

## 十一、README 更新

更新 `Builds/web-demo/README.md`：

- 当前版本改为 `v0.6 / 陷阱与危险地形版`；
- 说明本轮目标是让地图本身产生风险；
- 说明新增陷阱：地刺陷阱、传送陷阱、睡眠陷阱；
- 说明新增危险地形：毒沼；
- 说明每种陷阱 / 地形的触发效果；
- 说明陷阱与危险地形如何显示；
- 说明死亡原因会区分陷阱、毒沼、怪物和饥饿；
- 说明 v0.5 的怪物机制、玩家中心镜头、Console 调参、饥饿和道具都保留；
- 说明本轮仍未加入未鉴定、装备、怪物屋、壶、商店、据点、Boss、Godot。

---

## 十二、测试更新

更新 `Tests/web-demo-smoke.mjs`，至少检查：

- Web Demo 文件存在；
- README 包含 `v0.6 / 陷阱与危险地形版`；
- README 包含 `地刺陷阱`、`传送陷阱`、`睡眠陷阱`、`毒沼`；
- 配置文件版本为 `v0.6`；
- 配置文件包含 `hazards`；
- 配置文件包含 `spike_trap`；
- 配置文件包含 `warp_trap`；
- 配置文件包含 `sleep_trap`；
- 配置文件包含 `poison_pool`；
- 配置文件包含陷阱 / 地形 floorRules；
- JS 中存在陷阱和危险地形逻辑，例如：
  - `placeHazards`；
  - `placeTraps`；
  - `placeTerrainHazards`；
  - `triggerTrapAt`；
  - `applyTerrainAt`；
- JS 中存在死亡原因区分，例如 `trap`、`poison` 或对应 deathReason 文本；
- JS 中仍存在：
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

## 十三、功能验收标准

完成后必须满足：

1. `node --check Builds/web-demo/game.js` 通过；
2. `node --check Tools/web-demo-server.mjs` 通过；
3. `node Tests/web-demo-smoke.mjs` 通过；
4. `node Tools/web-demo-server.mjs` 可以启动；
5. 打开 `http://127.0.0.1:4173/Builds/web-demo/` 可以试玩；
6. 地图中会生成陷阱和危险地形；
7. 玩家踩地刺会受到伤害；
8. 玩家踩传送陷阱会被传送到安全格；
9. 玩家踩睡眠陷阱会进入睡眠状态；
10. 玩家进入毒沼会受到轻微伤害；
11. 陷阱和危险地形有清楚视觉表现；
12. 日志能清楚说明陷阱 / 地形效果；
13. 死亡原因能区分陷阱、毒沼、怪物和饥饿；
14. 陷阱和危险地形不生成在玩家起点、楼梯、楼梯相邻格、怪物、道具上；
15. v0.5 怪物机制仍可用；
16. v0.5 玩家中心镜头、Console 调参、小地图、敌人面板、快捷栏仍可用；
17. 没有加入未鉴定、装备、怪物屋、壶、商店、据点、Boss、Godot；
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
Web Demo v0.6 / 陷阱与危险地形版
```

下一轮建议暂时写成：

```text
Web Demo v0.7 / 未鉴定与装备雏形版
```

但不要直接开始 v0.7，等待制作人试玩 v0.6 后确认。

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