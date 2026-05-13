# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

Web Demo v0.4.2 / 房间视野与镜头居中版

---

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

当前实际体验中出现了一个关键问题：主画面一屏显示了整层迷宫，导致画面更像整体地图预览，而不是《风来的西林》/ Mystery Dungeon 常见的“当前房间局部探索”。

人类制作人提出 3 个新需求：

```text
1. 修改迷宫生成规则，房间大小在 3×3 到 10×10 之间随机。
2. 保证一个房间内至少有 1 只怪物。
3. 永远让主角所在的房间置于屏幕中央。
```

本轮版本命名为：

```text
Web Demo v0.4.2 / 房间视野与镜头居中版
```

本轮核心目标不是新增玩法系统，而是调整随机房间生成、怪物分布和镜头策略：

```text
从“一屏显示整层迷宫”改为“当前房间为主的局部视野”。
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
我已理解当前项目是 shiren-like，本轮只做 Web Demo v0.4.2 / 房间视野与镜头居中版，目标是调整房间生成、每房怪物密度和镜头居中策略，让画面以主角所在房间为中心，不再一屏显示整层迷宫，不新增后置玩法系统。
```

---

## 二、本轮核心目标

在保留现有玩法的基础上，完成 3 个核心改动：

1. 每个房间尺寸随机为 3×3 到 10×10；
2. 每个房间至少有 1 只怪物，但出生房间要避免开局过难；
3. 镜头始终围绕主角所在房间居中，主角在通道中时镜头跟随主角。

完成后，玩家应感受到：

```text
我不是在看整张地图，而是在探索一个个房间。
进入新房间后，镜头切到当前房间中心。
房间内一定有怪物压力。
通道用于连接房间，而不是让整层地图一览无余。
```

---

## 三、需求 1：房间大小 3×3 到 10×10 随机

### 解释

这里的“大小在 3×3 到 10×10 之间随机”指的是：

```text
每个房间的宽度和高度在 3～10 格之间随机。
```

不要把整层地图做成 3×3 到 10×10。整层地图应比屏幕大，例如：

```text
地图宽度：30～40
地图高度：24～32
```

推荐配置：

```json
"dungeon": {
  "width": 36,
  "height": 28,
  "generation": {
    "roomCount": [5, 8],
    "roomWidth": [3, 10],
    "roomHeight": [3, 10]
  }
}
```

### 房间元数据要求

生成随机房间时，必须把 rooms 元数据保存在当前楼层状态中，例如：

```js
rooms: [
  {
    id: "room_0",
    x: 3,
    y: 4,
    width: 7,
    height: 5,
    centerX: 6,
    centerY: 6,
    isStartRoom: true,
    isStairsRoom: false
  }
]
```

后续镜头居中、按房间放怪、小地图显示都应依赖 rooms。

---

## 四、需求 2：每个房间至少 1 只怪物

### 推荐规则

为了避免开局过难，请按以下规则实现：

```text
startRoom：默认 0 只怪物，或配置允许 0～1 只弱怪。
normalRoom：至少 1 只怪物。
stairsRoom：至少 1 只怪物，但不能生成在楼梯相邻 1 格内。
largeRoom：面积大于 50 的房间，可以额外 +1 只怪物。
```

### 怪物不能生成在

- 墙体；
- 玩家出生点；
- 楼梯；
- 楼梯相邻 1 格；
- 道具所在格；
- 房间门口 / 通道入口，如果会造成无解堵路；
- 其他怪物所在格。

### 技术建议

当前如果已有 `placeMonsters`，建议重构为房间驱动：

```js
placeMonstersByRoom(rooms, occupied, tiles, width, height, floorIndex)
```

每个房间内部选择合法地板格生成怪物，而不是只在全地图地板格里随机撒点。

---

## 五、需求 3：主角所在房间始终置于屏幕中央

### 解释

这不是简单地“主角永远在屏幕中心”。更适合 Mystery Dungeon 的做法是：

```text
主角在房间内时：镜头以当前房间中心为目标。
主角在通道内时：镜头以主角为目标，或沿通道轻微跟随。
主角进入新房间时：镜头切换到新房间中心。
```

这样画面稳定，不会因为主角在房间内每走一步而频繁抖动。

### 推荐函数

请增加：

```js
getRoomAt(x, y)
getCurrentRoom()
getCameraTarget()
```

逻辑：

```text
如果玩家坐标位于某个 room 的矩形范围内，则当前房间 = 该 room。
如果玩家不在任何 room 内，则认为玩家在通道中。
如果玩家在房间中：cameraTarget = 当前房间中心。
如果玩家在通道中：cameraTarget = 玩家坐标。
```

绘制地图时，不再让整个地图自动缩放进屏幕，而是根据 cameraTarget 计算 origin：

```js
originX = screenCenterX - cameraTargetScreenX
originY = screenCenterY - cameraTargetScreenY
```

### 镜头行为要求

- 主角所在房间应尽量处于屏幕中央；
- 不要一屏显示整层迷宫；
- 大房间可以完整或大部分显示；
- 小房间显示时周围可以看到少量通道或墙体；
- 通道中可以让主角居中；
- 进入新房间时镜头可以立即切换，不强制做动画；
- 如果做平滑移动，必须保证不影响操作响应。

---

## 六、主画面与小地图关系

当前主画面不再显示整层地图，但小地图可以保留整层概览。

要求：

```text
主画面：显示当前房间及附近区域。
小地图：显示整层地图结构。
```

小地图仍应显示：

- 玩家；
- 楼梯；
- 怪物；
- 道具；
- 墙 / 地板。

---

## 七、镜头与缩放建议

当前问题是“一屏显示整层迷宫”。本轮应改为固定或半固定 tile size，不要为了显示整层地图而自动缩小 tile。

建议：

```text
tileW = 56～72
tileH = 40～56，按当前轻斜俯视方案微调
主画面只显示约 10×8 到 16×10 格范围
```

如果仍采用传统轻斜俯视：

```text
screenX = originX + x * tileW + optionalPerspectiveOffset
screenY = originY + y * tileH * yScale
```

其中 origin 必须由 cameraTarget 推导，而不是由整层地图尺寸居中推导。

---

## 八、本轮允许修改文件

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
Builds/web-demo/game.js
Data/config/web_demo_balance.json
Builds/web-demo/README.md
Tests/web-demo-smoke.mjs
AI_TASKS/CURRENT_TASK.md
AI_TASKS/CHANGELOG.md
AI_TASKS/DEV_LOG.md
```

---

## 九、本轮禁止事项

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
- 不破坏 v0.3 随机迷宫、饥饿和道具系统；
- 不破坏 v0.4 / v0.4.1 的 HUD、小地图、敌人面板和快捷栏；
- 不继续开发旧 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守逻辑。

---

## 十、功能保留要求

v0.4.2 必须保留：

- 传统轻斜俯视操作方向；
- 随机迷宫；
- 每次下楼重新生成地图；
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

## 十一、README 更新

更新 `Builds/web-demo/README.md`：

- 当前版本改为 `v0.4.2 / 房间视野与镜头居中版`；
- 说明本轮解决“一屏显示整层迷宫”的问题；
- 说明房间尺寸随机为 3×3 到 10×10；
- 说明每个非出生房间至少 1 只怪物；
- 说明主角在房间内时，镜头以当前房间中心为准；
- 说明主角在通道中时，镜头跟随主角；
- 说明主画面显示当前房间，小地图显示整层结构；
- 说明本轮不新增玩法系统。

---

## 十二、测试更新

更新 `Tests/web-demo-smoke.mjs`，至少检查：

- Web Demo 文件存在；
- README 包含 `v0.4.2 / 房间视野与镜头居中版`；
- README 包含 `3×3` 或 `3x3`；
- README 包含 `10×10` 或 `10x10`；
- README 包含 `每个非出生房间至少 1 只怪物` 或类似说明；
- README 包含 `主角所在的房间`、`屏幕中央` 或 `镜头居中`；
- JS 中存在房间元数据：`rooms`、`centerX`、`centerY`、`isStartRoom`、`isStairsRoom`；
- JS 中存在当前房间判断：`getRoomAt`、`getCurrentRoom`；
- JS 中存在镜头目标逻辑：`getCameraTarget`、`cameraTarget` 或 `cameraOffset`；
- JS 中存在按房间放怪逻辑：`placeMonstersByRoom` 或 `ensureRoomMonster`；
- 配置文件版本为 `v0.4.2`；
- 配置文件中 `roomWidth` 覆盖 `[3, 10]`；
- 配置文件中 `roomHeight` 覆盖 `[3, 10]`；
- JS 中仍存在 `generateDungeon`、`hunger`、`satiety`、`teleport`、`sleep`、`fireball`、`swap`、`minimap`、`enemyList`；
- 旧 kingdom-like 核心词仍不得出现：`treeCost`、`wallCost`、`towerCost`、`landmarkCost`、`workers`、`archers`。

---

## 十三、功能验收标准

完成后必须满足：

1. `node --check Builds/web-demo/game.js` 通过；
2. `node --check Tools/web-demo-server.mjs` 通过；
3. `node Tests/web-demo-smoke.mjs` 通过；
4. `node Tools/web-demo-server.mjs` 可以启动；
5. 打开 `http://127.0.0.1:4173/Builds/web-demo/` 可以试玩；
6. 房间宽度和高度能在 3～10 格之间随机；
7. 整层地图不再被强行全部显示在主画面中；
8. 主画面以主角所在房间为中心；
9. 主角在通道中时，镜头跟随主角；
10. 每个非出生房间至少 1 只怪物；
11. 楼梯房间至少 1 只怪物，但怪物不能堵楼梯；
12. 出生房间不能开局过难；
13. 小地图仍能显示整层结构；
14. v0.3 随机迷宫、饥饿、道具、楼梯、胜负条件仍可用；
15. v0.4 / v0.4.1 的 HUD、小地图、敌人面板、快捷栏仍可用；
16. 没有加入新怪物机制和后置复杂系统；
17. 没有残留 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守核心玩法。

---

## 十四、完成后更新记录

完成后必须更新：

1. `AI_TASKS/CURRENT_TASK.md`
2. `AI_TASKS/CHANGELOG.md`
3. `AI_TASKS/DEV_LOG.md`
4. `AI_TASKS/NEXT_CODEX_PROMPT.md`

记录本轮为：

```text
Web Demo v0.4.2 / 房间视野与镜头居中版
```

下一轮建议可以先写成：

```text
Web Demo v0.5 / 怪物机制版
```

但不要直接开始 v0.5，等待制作人试玩 v0.4.2 后确认。

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