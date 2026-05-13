# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

Web Demo v0.4.1 / 传统轻斜俯视镜头修正版

---

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

当前 `Web Demo v0.4 / 镜头与画面表现调整版` 已完成，但人类制作人实际试玩后发现：

```text
v0.4 的 2.5D / 等距 / 菱形地牢视角虽然更有表现力，但斜向场景导致键盘方向和玩家操作非常不便利。
```

因此，本轮临时追加一个修正版：

```text
Web Demo v0.4.1 / 传统轻斜俯视镜头修正版
```

人类制作人已经选择 B 方案：

```text
B：75° 传统轻斜俯视视角。
```

本轮目标不是增加新玩法，而是修正 v0.4 的镜头方向：

```text
从等距 / 菱形 / 斜向操作视角，改回传统上北下南左西右东的轻斜俯视视角。
```

参考方向是传统 Roguelike / 地牢 RPG 的轻斜俯视画面：场景有一点纵深，角色和道具有体积感，但地面格子仍接近水平/垂直排列，玩家按上下左右时，角色移动方向必须与屏幕方向一致。

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
我已理解当前项目是 shiren-like，本轮只做 Web Demo v0.4.1 / 传统轻斜俯视镜头修正版，目标是采用 B 方案：75° 传统轻斜俯视视角，修正 v0.4 等距视角带来的操作不便利，不新增玩法系统。
```

---

## 二、本轮核心目标

在保留 v0.3 / v0.4 已有玩法和 UI 的基础上，将画面视角调整为更适合操作的传统轻斜俯视。

核心目标：

1. 废弃或弱化 v0.4 的等距菱形坐标投影；
2. 使用接近传统 RPG 的轻斜俯视视角；
3. 地面格子仍然基本水平 / 垂直排列；
4. 屏幕上方就是键盘上方向，屏幕下方就是键盘下方向；
5. 场景有轻微纵深，但不能影响方向判断；
6. 保留 v0.4 的 HUD 布局、小地图、敌人面板、快捷栏、蓝色行动范围和红色威胁范围；
7. 保留 v0.3 的随机迷宫、饥饿、道具、怪物追击、楼梯和胜负条件。

---

## 三、镜头方案：B / 75° 传统轻斜俯视

### 目标效果

画面应该更接近：

```text
传统地牢 RPG / 风来的西林式轻斜俯视画面。
```

特点：

- 地图从上往下看，但不是完全 90° 正俯视；
- 地面格子仍然是矩形或轻微压扁矩形；
- y 轴方向可以轻微压缩，制造纵深；
- 角色、怪物和道具是立起来的棋子感；
- 墙体和植被可以遮挡部分边缘，但不能挡住关键格子；
- 操作方向必须和屏幕方向一致。

### 推荐实现方式

不要再使用 v0.4 的标准等距公式：

```text
screenX = originX + (x - y) * tileW / 2
screenY = originY + (x + y) * tileH / 2
```

改为传统轻斜俯视坐标：

```text
screenX = originX + x * tileW + optionalPerspectiveOffset
screenY = originY + y * tileH * yScale
```

建议参数：

```text
tileW = 52～64
tileH = 52～64
yScale = 0.70～0.78
perspectiveOffset = 可选，很轻微，不要超过每行 1～3 px
```

建议命名：

```text
cameraMode = "traditional-tilt"
yScale = 0.72
```

如果保留 `tileToScreen` 函数，可以把内部公式改为传统轻斜俯视，而不是等距。

---

## 四、必须修正的问题

### 1. 操作方向

必须保证：

- 按上 / W：角色在屏幕中向上移动；
- 按下 / S：角色在屏幕中向下移动；
- 按左 / A：角色在屏幕中向左移动；
- 按右 / D：角色在屏幕中向右移动。

不能出现：

- 按上后角色沿斜线移动；
- 按左后角色沿斜向地砖移动；
- 玩家需要在脑中转换坐标方向。

---

### 2. 地砖表现

v0.4 的菱形地砖需要改为：

- 矩形地砖；或
- 轻微纵向压缩的矩形地砖；或
- 带轻微透视的近矩形地砖。

不要再使用明显菱形格作为主要地图格。

地砖要求：

- 每个格子边界清楚；
- 蓝色行动范围和红色威胁范围能准确覆盖格子；
- 地面可以有苔藓、泥土、石板纹理感，但不要影响判断。

---

### 3. 角色与怪物表现

角色、怪物、道具继续保持“立起来”的棋子感：

- 玩家应站在格子中心偏下；
- 怪物应站在格子中心偏下；
- 道具可以在格子中心；
- 实体按 y 值排序绘制，避免遮挡错误；
- 墙体、角色、怪物可以有轻微影子。

---

### 4. 画面布局

保留 v0.4 的 UI 结构：

```text
左上：玩家状态
右上：小地图
右侧：敌人面板 / 行动序列
底部：快捷栏
中央：地牢地图
```

但中央地图要改为 B 方案：传统轻斜俯视，而不是等距菱形地图。

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
Builds/web-demo/game.js
Builds/web-demo/styles.css
Builds/web-demo/README.md
Tests/web-demo-smoke.mjs
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
- 不破坏 v0.3 随机迷宫、饥饿和道具系统；
- 不继续开发旧 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守逻辑。

---

## 七、功能保留要求

v0.4.1 必须保留：

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

## 八、视觉验收标准

完成后，画面应满足：

1. 第一眼更接近传统地牢 RPG / 风来的西林式轻斜俯视，而不是等距菱形棋盘；
2. 地砖基本水平 / 垂直排列；
3. y 轴有轻微压缩，产生纵深感；
4. 玩家按上下左右时，角色在屏幕中也向上下左右移动；
5. 玩家、怪物、道具、楼梯辨识度保持或提升；
6. 蓝色行动范围和红色威胁范围能准确覆盖矩形格；
7. UI 布局仍保持左上状态、右上小地图、右侧敌人面板、底部快捷栏；
8. 不出现严重遮挡、错位、漂浮、点击区域和显示区域不一致的问题。

---

## 九、README 更新

更新 `Builds/web-demo/README.md`：

- 当前版本改为 `v0.4.1 / 传统轻斜俯视镜头修正版`；
- 说明 v0.4 的等距 / 菱形视角导致操作不便利；
- 说明本轮选择 B 方案：75° 传统轻斜俯视；
- 说明本轮不新增玩法，重点修正镜头和操作方向；
- 说明地砖从等距菱形改为轻斜俯视矩形格；
- 说明上下左右操作必须与屏幕方向一致；
- 说明仍保留 v0.3 / v0.4 的玩法和 UI。

---

## 十、测试更新

更新 `Tests/web-demo-smoke.mjs`，至少检查：

- Web Demo 文件存在；
- HTML 引用 CSS 和 JS；
- README 包含 `v0.4.1 / 传统轻斜俯视镜头修正版`；
- README 包含 `B 方案` 或 `75°` 或 `传统轻斜俯视`；
- README 包含 `操作方向`、`上下左右`、`矩形格`；
- JS 中存在传统轻斜俯视相关逻辑，例如：
  - `traditional`；
  - `tilt`；
  - `yScale`；
  - `cameraMode`；
  - `tileToScreen`；
- JS 中不应再依赖主要等距菱形公式作为核心地图坐标：
  - 不应继续以 `(x - y)` 和 `(x + y)` 作为主投影公式；
  - 如果保留旧函数名或兼容逻辑，必须保证当前 `cameraMode` 使用传统轻斜俯视；
- JS 中仍存在：
  - `generateDungeon`；
  - `hunger`；
  - `satiety`；
  - `teleport`；
  - `sleep`；
  - `fireball`；
  - `swap`；
  - `drawMoveRange` 或行动范围绘制；
  - `drawThreatRange` 或威胁范围绘制；
  - `minimap`；
  - `enemyList` 或敌人面板；
- 配置文件版本应为 `v0.4.1`；
- 旧 kingdom-like 核心词仍不得出现：
  - `treeCost`；
  - `wallCost`；
  - `towerCost`；
  - `landmarkCost`；
  - `workers`；
  - `archers`。

---

## 十一、功能验收标准

完成后必须满足：

1. `node --check Builds/web-demo/game.js` 通过；
2. `node --check Tools/web-demo-server.mjs` 通过；
3. `node Tests/web-demo-smoke.mjs` 通过；
4. `node Tools/web-demo-server.mjs` 可以启动；
5. 打开 `http://127.0.0.1:4173/Builds/web-demo/` 可以试玩；
6. 按 W / 上方向键，角色向屏幕上方移动；
7. 按 S / 下方向键，角色向屏幕下方移动；
8. 按 A / 左方向键，角色向屏幕左方移动；
9. 按 D / 右方向键，角色向屏幕右方移动；
10. 地图视觉不再是明显等距菱形棋盘；
11. 地图视觉接近传统轻斜俯视矩形格；
12. v0.3 随机迷宫、饥饿、道具、楼梯、胜负条件仍可用；
13. v0.4 小地图、敌人面板、快捷栏仍可用；
14. 没有加入新怪物机制和后置复杂系统；
15. 没有残留 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守核心玩法。

---

## 十二、完成后更新记录

完成后必须更新：

1. `AI_TASKS/CURRENT_TASK.md`
2. `AI_TASKS/CHANGELOG.md`
3. `AI_TASKS/DEV_LOG.md`
4. `AI_TASKS/NEXT_CODEX_PROMPT.md`

记录本轮为：

```text
Web Demo v0.4.1 / 传统轻斜俯视镜头修正版
```

下一轮建议可以先写成：

```text
Web Demo v0.5 / 怪物机制版
```

但不要直接开始 v0.5，等待制作人试玩 v0.4.1 后确认。

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