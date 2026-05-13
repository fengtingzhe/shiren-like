# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

Web Demo v0.9 / 未鉴定与道具风险版

---

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

当前版本 `v0.8 / 背包与投掷版` 已完成，已经实现：

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
- `ATK / DEF / weapon / shield` HUD；
- 背包容量与背包面板；
- `B` 打开背包；
- `G` 收脚下装备进背包；
- 从背包使用、装备和投掷物品；
- 3 层胜利与死亡结算。

本轮任务是：

```text
Web Demo v0.9 / 未鉴定与道具风险版
```

本轮核心目标不是做完整道具鉴定系统，而是加入最小可玩的“未鉴定体验”：

```text
玩家拾到部分卷轴和杖时，不能立即知道真实效果；需要通过使用或投掷来识别。识别后，同一局内该类型道具会显示真实名称。
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
我已理解当前项目是 shiren-like，本轮只做 Web Demo v0.9 / 未鉴定与道具风险版。目标是加入最小可玩的未鉴定道具、识别状态、显示名称和使用/投掷识别流程；不加入壶、商店、怪物屋、据点、Boss、Godot，也不重做背包、装备、怪物、陷阱和镜头系统。
```

---

## 二、本轮核心目标

在保留 v0.8 已有系统的基础上，加入：

1. 未鉴定道具配置；
2. 每局随机化的未知名称；
3. 道具识别状态；
4. 未识别 / 已识别显示名称；
5. 使用道具后识别；
6. 投掷道具命中或结算后识别；
7. 背包面板、快捷栏、日志和 README 同步说明；
8. smoke test、任务记录同步。

完成后，玩家应能明显感受到：

```text
我不知道这张卷轴到底是什么。
现在要不要试用，有风险。
用过一次后，我就知道这一类道具是什么了。
背包中的未知道具不再只是资源，而是带有信息风险的选择。
```

---

## 三、未鉴定范围

本轮只对部分消耗品做未鉴定，不要全量复杂化。

建议纳入未鉴定：

```text
teleport：传送卷轴
sleep：睡眠卷轴
fireball：火球杖
swap：换位杖
```

建议暂不纳入未鉴定：

```text
potion：恢复药
food：食物
所有装备
```

理由：

- 恢复药和食物承担基础生存功能，先保持清晰；
- 装备已经有攻防取舍，本轮不增加装备未鉴定；
- 卷轴和杖更适合制造“试用风险”。

---

## 四、配置需求

请在 `Data/config/web_demo_balance.json` 中新增：

```json
"identification": {
  "enabled": true,
  "unidentifiedTypes": ["teleport", "sleep", "fireball", "swap"],
  "identifyOnUse": true,
  "identifyOnThrow": true,
  "unknownNames": {
    "scroll": ["褪色卷轴", "蓝纹卷轴", "破旧卷轴", "星印卷轴"],
    "wand": ["弯曲木杖", "裂纹木杖", "青铜木杖", "黑曜木杖"]
  }
}
```

并把配置文件版本改为：

```json
"version": "v0.9"
```

分类建议：

```text
teleport / sleep 属于 scroll
fireball / swap 属于 wand
```

---

## 五、识别状态数据结构

请在游戏状态中加入识别信息。

建议结构：

```js
identification: {
  knownTypes: {
    teleport: false,
    sleep: false,
    fireball: false,
    swap: false
  },
  unknownNamesByType: {
    teleport: "褪色卷轴",
    sleep: "蓝纹卷轴",
    fireball: "弯曲木杖",
    swap: "裂纹木杖"
  }
}
```

要求：

- 每局开始时生成一次未知名称映射；
- 同一局内保持固定；
- 重新开始新局可以重新随机；
- 已识别类型显示真实名称；
- 未识别类型显示未知名称；
- 识别状态不需要跨局保存。

推荐函数：

```js
createIdentificationState()
isItemIdentified(type)
identifyItemType(type, reason)
getItemDisplayName(type)
getItemCategory(type)
getUnknownNameForType(type)
```

---

## 六、显示规则

### 1. 地面物品

地面物品如果未识别，应显示未知名称或未知图标提示。

例如：

```text
褪色卷轴
弯曲木杖
```

如果已识别，显示真实名称：

```text
传送卷轴
火球杖
```

### 2. 背包面板

背包面板必须使用 `getItemDisplayName(type)`。

示例：

```text
褪色卷轴 x1   [U 使用] [T 投掷]
弯曲木杖 x1   [U 使用] [T 投掷]
恢复药 x2     [U 使用] [T 投掷]
```

识别后：

```text
传送卷轴 x1   [U 使用] [T 投掷]
火球杖 x1     [U 使用] [T 投掷]
```

### 3. 快捷栏

快捷栏也应尽量使用显示名称，避免直接暴露真实类型。

如果因为当前快捷栏是按类型绑定，短期内无法完全隐藏真实功能，则至少：

- 按钮文本使用未知名称；
- README 明确说明当前 Demo 仍保留快捷键，但视觉名称会根据识别状态变化；
- 不要让背包面板显示真实名称。

### 4. 日志

日志要说明识别过程：

```text
你使用了褪色卷轴。
褪色卷轴的效果是传送卷轴！你被传送到了别处。
之后同类道具会显示为传送卷轴。
```

投掷识别：

```text
你投掷了弯曲木杖。
弯曲木杖击中了 Slime，造成 3 点伤害。
你识别出它是火球杖。
```

---

## 七、使用识别规则

当玩家使用未识别道具时：

1. 先按真实类型结算效果；
2. 然后将该类型标记为已识别；
3. 日志说明未知名称对应的真实道具；
4. 背包和快捷栏刷新显示名称。

例如：

```text
玩家使用 褪色卷轴
真实类型 = teleport
执行传送
identifyItemType("teleport", "use")
以后 teleport 显示为 传送卷轴
```

使用失败是否识别：

- 如果因为没有目标导致失败，例如换位杖前方没有怪物，建议仍然识别；
- 因为玩家明确尝试使用，失败反馈本身也是信息；
- 但如果因为背包中没有该物品，当然不识别。

---

## 八、投掷识别规则

当玩家投掷未识别道具时：

1. 从背包中移除该物品；
2. 按真实类型执行投掷效果；
3. 命中、撞墙或落地后，都可以识别；
4. 日志说明识别结果。

建议：

```text
identifyOnThrow = true
```

原因：投掷是玩家主动试用道具的一种方式，也应该获得信息。

---

## 九、最小道具风险要求

本轮不需要新增大量负面道具，但必须让已有道具在未知状态下产生风险：

- 未知卷轴可能是传送卷轴：会打乱位置；
- 未知卷轴可能是睡眠卷轴：需要判断怪物距离；
- 未知木杖可能是火球杖：需要面对正确方向；
- 未知木杖可能是换位杖：可能把自己换到危险位置或无目标失败；
- 投掷未知道具可能浪费珍贵资源。

如果要新增 1 个简单负面道具，可选但不强制：

```text
confuse_scroll / 混乱卷轴：让玩家睡眠或短暂混乱 1～2 回合
```

但本轮优先不要新增状态系统。若实现负面道具会明显增加复杂度，请不要做。

---

## 十、背包与拾取兼容

必须保留 v0.8 背包规则：

- 背包容量；
- 消耗品堆叠；
- 装备占格；
- 已装备物品不占背包；
- `B` 打开背包；
- `G` 收脚下装备进背包；
- 从背包使用；
- 从背包投掷。

注意：

- 背包容量计算不能因为未知名称而改变；
- 同一真实类型仍然堆叠；
- 未识别时也要堆叠到对应真实类型；
- 显示名称可以未知，但内部类型不能丢失；
- 使用或投掷后识别并刷新 UI。

---

## 十一、与已有系统兼容

必须保留：

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

- 不要删除 `inventorySystem`；
- 不要删除 `throwInventoryItem`；
- 不要删除 `inventory-panel`；
- 不要删除 `C` 装备逻辑；
- 不要删除 `G` 入包逻辑；
- 不要删除 `ATK / DEF / weapon / shield`；
- 不要删除 `CAMERA_FIELDS`；
- 不要删除陷阱、毒沼、怪物机制。

---

## 十二、本轮明确不做

不要做：

- 不做壶；
- 不做商店；
- 不做怪物屋；
- 不做据点；
- 不做 Boss；
- 不做 Godot 工程；
- 不做装备未鉴定；
- 不做装备诅咒；
- 不做装备强化；
- 不做装备合成；
- 不做耐久；
- 不做完整名称记忆跨局保存；
- 不做复杂负面状态系统；
- 不重做背包系统；
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

- 当前版本改为 `v0.9 / 未鉴定与道具风险版`；
- 说明本轮目标是加入最小未鉴定体验；
- 说明哪些道具会未鉴定；
- 说明哪些道具不会未鉴定；
- 说明未知名称、真实类型和识别状态；
- 说明使用后识别；
- 说明投掷后识别；
- 说明背包面板和快捷栏如何显示未识别道具；
- 说明本轮不做装备未鉴定、壶、商店、怪物屋、Boss、Godot；
- 说明 v0.8 背包、v0.7.1 装备、v0.6 陷阱、v0.5 怪物、镜头和 Console 调参都保留。

---

## 十五、测试更新

更新 `Tests/web-demo-smoke.mjs`，至少检查：

- Web Demo 文件存在；
- README 包含 `v0.9 / 未鉴定与道具风险版`；
- README 包含 `未鉴定`、`识别`、`未知名称`；
- 配置文件版本为 `v0.9`；
- 配置文件包含 `identification`；
- 配置文件包含 `unidentifiedTypes`；
- 配置文件 `unidentifiedTypes` 包含 `teleport`、`sleep`、`fireball`、`swap`；
- 配置文件包含 `unknownNames`；
- JS 中存在识别逻辑，例如：
  - `createIdentificationState`；
  - `isItemIdentified`；
  - `identifyItemType`；
  - `getItemDisplayName`；
  - `getUnknownNameForType`；
- JS 中使用或投掷后会识别，例如在 `useItem`、`throwInventoryItem`、`applyThrownItemEffect` 或类似函数中调用 `identifyItemType`；
- JS 中仍存在：
  - `inventorySystem`；
  - `getInventoryUsedSlots`；
  - `throwInventoryItem`；
  - `resolveThrowPath`；
  - `applyThrownItemEffect`；
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

## 十六、功能验收标准

完成后必须满足：

1. `node --check Builds/web-demo/game.js` 通过；
2. `node --check Tools/web-demo-server.mjs` 通过；
3. `node Tests/web-demo-smoke.mjs` 通过；
4. `node Tools/web-demo-server.mjs` 可以启动；
5. 打开 `http://127.0.0.1:4173/Builds/web-demo/` 可以试玩；
6. 未识别卷轴 / 杖在背包中显示未知名称；
7. 使用未识别道具后会执行真实效果；
8. 使用后该类型道具变为已识别；
9. 投掷未识别道具后会执行真实投掷效果；
10. 投掷后该类型道具变为已识别；
11. 同一真实类型的道具仍然正确堆叠；
12. 识别后背包和快捷栏显示更新；
13. 重新开始新局时未知名称映射可以重新生成；
14. 恢复药和食物仍保持清晰可用；
15. v0.8 背包与投掷仍可用；
16. v0.7.1 装备、v0.6 陷阱、v0.5 怪物机制仍可用；
17. 玩家中心镜头、Console 调参、小地图、敌人面板、快捷栏仍可用；
18. 没有加入壶、商店、怪物屋、据点、Boss、Godot；
19. 没有残留 kingdom-like 核心玩法。

---

## 十七、完成后更新记录

完成后必须更新：

1. `AI_TASKS/CURRENT_TASK.md`
2. `AI_TASKS/CHANGELOG.md`
3. `AI_TASKS/DEV_LOG.md`
4. `AI_TASKS/NEXT_CODEX_PROMPT.md`

记录本轮为：

```text
Web Demo v0.9 / 未鉴定与道具风险版
```

下一轮建议暂时写成：

```text
Web Demo v1.0 / 单局体验整合与可读性打磨版
```

但不要直接开始 v1.0，等待制作人试玩 v0.9 后确认。

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