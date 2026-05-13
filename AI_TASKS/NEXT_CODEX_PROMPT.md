# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

Web Demo v0.4.3 / 玩家中心镜头与 Console 视野调参版

---

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

当前版本 `v0.4.2 / 房间视野与镜头居中版` 已经实现了房间尺寸 3×3 到 10×10、每个非出生房间至少 1 只怪物、主画面围绕当前房间或走廊显示等内容。但实际试玩后，人类制作人发现两个问题：

```text
1. 镜头仍然没有符合《风来的西林》的体验。当前“房间中心镜头”会导致角色不在操作焦点中心。
2. 玩家视野看到的范围仍然太大，需要调整 tileW / tileH / yScale / rowStep 等视野参数，但具体数值需要制作人试玩后确定。
```

本轮改为：

```text
Web Demo v0.4.3 / 玩家中心镜头与 Console 视野调参版
```

本轮核心目标不是新增玩法，而是修正镜头策略和提供可调试参数：

```text
镜头改为《风来的西林》式玩家中心镜头；
在 Console 中加入视野参数调节器，让制作人可以实时调整 tileW、tileH、yScale、rowStep、perspectiveOffset 等参数。
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
我已理解当前项目是 shiren-like，本轮只做 Web Demo v0.4.3 / 玩家中心镜头与 Console 视野调参版。目标是按《风来的西林》的方式改为玩家中心镜头，并在 Console 中加入视野参数调节器，不新增怪物机制和后置玩法系统。
```

---

## 二、本轮核心目标

### 目标 1：镜头按《风来的西林》的方式处理

将 v0.4.2 的镜头策略从：

```text
玩家在房间内：镜头以房间中心为目标
玩家在走廊中：镜头跟随玩家
```

改为：

```text
玩家在房间内：镜头跟随玩家
玩家在走廊中：镜头跟随玩家
只有到地图边界附近时，镜头才被边界限制
```

换句话说：

```text
主画面操作焦点永远是玩家。
```

### 目标 2：Console 加入视野参数调节器

把目前影响主画面视野和镜头观感的参数放到 Console 中，方便制作人实时调整。

必须至少支持：

```text
tileW
tileH
yScale
rowStep
perspectiveOffset
```

建议也支持：

```text
tileDepth
cameraZoom
cameraCenterOffsetX
cameraCenterOffsetY
```

本轮不需要最终确定最佳数值，只需要让制作人能够在浏览器里自己调整，观察效果，然后再告诉 Codex 固化数值。

---

## 三、镜头规则需求：玩家中心镜头

### 1. 不再以房间中心作为主镜头目标

当前 v0.4.2 中如果存在类似逻辑：

```js
if (currentRoom) {
  cameraTarget = currentRoom.center;
} else {
  cameraTarget = player.position;
}
```

本轮应改为：

```js
cameraTarget = player.position;
```

或者：

```js
getCameraTarget() always returns player position.
```

可以保留 `getRoomAt`、`getCurrentRoom`、`rooms` 等函数和元数据，因为它们后续仍可用于视野、怪物生成和小地图。但主镜头不再用房间中心。

---

### 2. 玩家始终位于主画面中央附近

要求：

- 玩家在房间内时，角色应位于主画面中央附近；
- 玩家在走廊中时，角色仍位于主画面中央附近；
- 玩家移动时，镜头跟随玩家；
- 只有在地图边界附近，为避免显示过多地图外黑边，镜头可以做边界限制；
- 如果边界限制导致玩家无法完全居中，可以接受轻微偏移；
- 不要因为房间大小或房间中心导致玩家偏到屏幕一侧。

---

### 3. 主画面显示玩家周围局部区域

主画面不负责展示整个房间或整层地图，而是展示玩家附近战术局势。

要求：

```text
主画面：玩家周围局部区域
小地图：整层结构
```

也就是《风来的西林》式分工：

```text
主画面服务即时操作和战斗判断；
小地图服务路线和整层方向判断。
```

---

## 四、Console 视野参数调节器需求

### 1. Console 中新增 Camera / View 调参区

在现有 Console 面板中新增一个区块：

```text
Camera / View 调试参数
```

至少包含：

| 参数 | 作用 | 建议范围 | 步进 |
|---|---|---:|---:|
| tileW | 单格宽度，越大视野越小 | 48～160 | 4 |
| tileH | 单格高度，越大视野越小 | 48～160 | 4 |
| yScale | 轻斜俯视纵向压缩 | 0.50～1.00 | 0.02 |
| rowStep | 行间距 / 纵向步进 | 32～128 | 2 |
| perspectiveOffset | 每行轻微横向偏移 | 0～6 | 0.5 |

建议额外参数：

| 参数 | 作用 | 建议范围 | 步进 |
|---|---|---:|---:|
| tileDepth | 墙体 / 地砖厚度 | 0～40 | 2 |
| cameraZoom | 整体缩放倍率 | 0.75～2.00 | 0.05 |
| cameraCenterOffsetX | 镜头中心 X 微调 | -300～300 | 10 |
| cameraCenterOffsetY | 镜头中心 Y 微调 | -200～200 | 10 |

---

### 2. 调参交互要求

可以用 slider、number input 或按钮实现。

必须满足：

- 调整后立即刷新画面；
- 不需要重启游戏；
- 不需要重新生成楼层；
- 当前参数值在 Console 中可见；
- 有一个“重置镜头参数”按钮；
- 重置后恢复配置文件默认值；
- 参数只用于当前浏览器会话即可，不要求持久化。

可选但推荐：

- 加一个“一键复制当前镜头参数”按钮，把当前参数以 JSON 文本输出到 Console 面板或系统剪贴板；
- 这样制作人可以把调好的参数发回给 Codex 固化。

示例输出：

```json
{
  "tileW": 108,
  "tileH": 108,
  "yScale": 0.72,
  "rowStep": 78,
  "perspectiveOffset": 2,
  "tileDepth": 20,
  "cameraZoom": 1,
  "cameraCenterOffsetX": 0,
  "cameraCenterOffsetY": 0
}
```

---

### 3. 推荐默认值

为了先缩小可见范围，请把默认值先调大一档。

建议默认值：

```json
{
  "tileW": 104,
  "tileH": 104,
  "yScale": 0.72,
  "rowStep": 75,
  "perspectiveOffset": 2,
  "tileDepth": 22,
  "cameraZoom": 1,
  "cameraCenterOffsetX": 0,
  "cameraCenterOffsetY": 0
}
```

如果画面太大或 UI 遮挡严重，可以稍微减小，但不要回到 v0.4.2 那种一屏看到过多区域的状态。

---

## 五、本轮允许修改文件

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
DESIGN_HUB/07_ART_AND_AUDIO_DIRECTION.md
DESIGN_HUB/08_UX_FLOW.md
DESIGN_HUB/12_DEMO_SCOPE.md
```

优先修改：

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
```

---

## 六、本轮禁止事项

不要做：

- 不做新怪物机制；
- 不做弓手怪、爆弹怪、骷髅枪兵等怪物机制版内容；
- 不做未鉴定；
- 不做装备；
- 不做陷阱；
- 不做怪物屋；
- 不做壶；
- 不做商店；
- 不做据点；
- 不做复杂 Boss；
- 不做 Godot 工程；
- 不引入 React、Phaser、Three.js、PixiJS 或复杂 npm 依赖；
- 不破坏随机迷宫、饥饿和道具系统；
- 不破坏 HUD、小地图、敌人面板和快捷栏；
- 不继续开发旧 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守逻辑。

---

## 七、功能保留要求

v0.4.3 必须保留：

- 传统轻斜俯视操作方向；
- 随机迷宫；
- 每次下楼重新生成地图；
- 房间尺寸 3×3 到 10×10；
- 每个非出生房间至少 1 只怪物；
- 满腹度随有效回合下降；
- 食物恢复满腹度；
- 饥饿伤害；
- 回复药；
- 传送卷轴；
- 睡眠卷轴；
- 火球杖；
- 换位杖；
- 怪物追击和攻击；
- HP 为 0 失败；
- 第 3 层胜利；
- 左上状态区；
- 右上小地图；
- 右侧敌人面板；
- 底部快捷栏；
- Console 基础功能。

---

## 八、README 更新

更新 `Builds/web-demo/README.md`：

- 当前版本改为 `v0.4.3 / 玩家中心镜头与 Console 视野调参版`；
- 说明本轮采用《风来的西林》式玩家中心镜头；
- 说明不再使用房间中心作为主镜头目标；
- 说明主画面显示玩家周围局部区域，小地图显示整层结构；
- 说明 Console 新增 Camera / View 调参区；
- 说明可调参数：tileW、tileH、yScale、rowStep、perspectiveOffset 等；
- 说明本轮不新增玩法系统。

---

## 九、测试更新

更新 `Tests/web-demo-smoke.mjs`，至少检查：

- Web Demo 文件存在；
- README 包含 `v0.4.3 / 玩家中心镜头与 Console 视野调参版`；
- README 包含 `风来的西林` 或 `玩家中心镜头`；
- README 包含 `Console`、`tileW`、`tileH`、`yScale`、`rowStep`、`perspectiveOffset`；
- HTML 或 JS 中存在 Console 调参控件或逻辑；
- JS 中存在玩家中心镜头逻辑，例如 `getCameraTarget` 返回玩家坐标，或存在 `playerCenteredCamera` / `cameraTargetPlayer`；
- JS 中不应再把房间中心作为主镜头目标；
- JS 中仍存在：
  - `generateDungeon`；
  - `rooms`；
  - `placeMonstersByRoom`；
  - `hunger`；
  - `satiety`；
  - `teleport`；
  - `sleep`；
  - `fireball`；
  - `swap`；
  - `minimap`；
  - `enemyList`；
- 配置文件版本为 `v0.4.3`；
- 配置文件包含 camera 默认参数：`tileW`、`tileH`、`yScale`、`rowStep`、`perspectiveOffset`；
- 旧 kingdom-like 核心词仍不得出现：`treeCost`、`wallCost`、`towerCost`、`landmarkCost`、`workers`、`archers`。

---

## 十、功能验收标准

完成后必须满足：

1. `node --check Builds/web-demo/game.js` 通过；
2. `node --check Tools/web-demo-server.mjs` 通过；
3. `node Tests/web-demo-smoke.mjs` 通过；
4. `node Tools/web-demo-server.mjs` 可以启动；
5. 打开 `http://127.0.0.1:4173/Builds/web-demo/` 可以试玩；
6. 玩家在房间内时，主角位于主画面中央附近；
7. 玩家在走廊内时，主角仍位于主画面中央附近；
8. 主画面不再以房间中心为主镜头目标；
9. 主画面显示玩家周围局部区域；
10. 小地图继续显示整层结构；
11. Console 中可以调整 tileW、tileH、yScale、rowStep、perspectiveOffset；
12. 调整视野参数后画面立即刷新；
13. 可以重置镜头参数；
14. 推荐提供复制当前参数功能；
15. 不新增怪物机制和后置复杂系统；
16. 不残留 kingdom-like 核心玩法。

---

## 十一、完成后更新记录

完成后必须更新：

1. `AI_TASKS/CURRENT_TASK.md`
2. `AI_TASKS/CHANGELOG.md`
3. `AI_TASKS/DEV_LOG.md`
4. `AI_TASKS/NEXT_CODEX_PROMPT.md`

记录本轮为：

```text
Web Demo v0.4.3 / 玩家中心镜头与 Console 视野调参版
```

下一轮建议暂时写成：

```text
等待制作人调试并确认最终镜头参数后，再决定是否进入 v0.4.4 参数固化版或 v0.5 怪物机制版。
```

---

## 十二、完成后输出格式

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
- 制作人需要在 Console 中调试 tileW、tileH、yScale、rowStep、perspectiveOffset 等参数，并告知最终值。

下一轮建议：
- ...
```