# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

Web Demo v0.4 / 镜头与画面表现调整版

---

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

当前 `Web Demo v0.3 / 随机迷宫与饥饿压力版` 已完成，已经实现随机房间和走廊、随机怪物和道具分布、满腹度随有效回合下降、饥饿伤害、食物恢复满腹度，以及 v0.2 的回复药、传送卷轴、睡眠卷轴、火球杖、换位杖等基础道具。

人类制作人已经明确调整版本计划：

```text
原计划 v0.4 / 怪物机制版 暂缓。
新的 v0.4 目标改为：镜头与画面表现调整版。
```

本轮核心目标不是增加玩法，而是把当前 Web Demo 的视觉呈现从“普通俯视格子原型”调整为更接近目标效果的：

```text
2.5D 斜俯视战术迷宫镜头 + 清晰战斗棋盘 + 现代 Roguelike UI 布局
```

参考效果说明：画面应类似一张 16:9 的现代战术地牢截图：镜头斜俯视，地牢房间占据画面中心，玩家位于画面下方偏中，敌人与道具分布在房间中，格子范围以半透明色块显示，顶部左侧为角色状态，右上角为小地图，底部为快捷栏，右侧为敌人/行动序列面板。

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
我已理解当前项目是 shiren-like，本轮只做 Web Demo v0.4 / 镜头与画面表现调整版，目标是把画面从普通俯视格子原型调整为更接近参考图的 2.5D 斜俯视战术地牢镜头，不新增核心玩法系统。
```

---

## 二、本轮目标

在保留 v0.3 玩法的基础上，重点调整画面呈现：

1. 镜头从普通俯视格子改为 2.5D 斜俯视 / 等距感地牢视角；
2. 地牢房间在 16:9 画布中占据主要区域；
3. 玩家、怪物、道具、楼梯、墙体、地板的层次更清楚；
4. 增加半透明战术格子和危险范围显示；
5. 调整 UI 布局，更接近现代战术 Roguelike：左上状态、右上小地图、底部快捷栏、右侧敌人/行动序列；
6. 不改变 v0.3 的核心规则，不加入怪物机制版内容。

---

## 三、本轮允许修改文件

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

如果只是调整镜头和 UI，优先修改：

```text
Builds/web-demo/index.html
Builds/web-demo/styles.css
Builds/web-demo/game.js
Builds/web-demo/README.md
Tests/web-demo-smoke.mjs
```

---

## 四、本轮禁止事项

不要做：

- 不做新怪物机制；
- 不做弓手怪、爆弹怪、骷髅枪兵等 v0.4 旧计划内容；
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
- 不做商业化系统；
- 不破坏 v0.3 已有玩法闭环；
- 不继续开发旧 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守逻辑。

---

## 五、镜头与画面需求

### 1. 画布比例

目标画面按 16:9 横屏展示。

要求：

- 游戏主画布应更像一个完整战术地牢房间截图；
- 不要让地图看起来像铺满全屏的平面表格；
- 地牢主体应位于画面中心，四周有暗角或黑色边缘氛围；
- 玩家位于画面下方偏中或中心偏下，便于观察前方房间。

---

### 2. 2.5D 斜俯视投影

请将当前地图绘制从纯正方形俯视，调整为 2.5D / 等距感表现。

建议实现方式：

- 不引入 3D 引擎；
- 继续用 Canvas 2D；
- 将格子坐标转换为屏幕坐标时，使用类似等距投影：

```text
screenX = originX + (x - y) * tileW / 2
screenY = originY + (x + y) * tileH / 2
```

- `tileW` 可在 64～88 之间；
- `tileH` 可在 32～44 之间；
- 墙、角色、怪物、道具按照 y 值排序绘制，避免遮挡错误；
- 如果完整等距改造成本过高，至少实现“斜俯视伪等距地砖 + 角色层级排序”。

---

### 3. 地板、墙体和房间表现

目标：地牢不再像平面色块，而像有厚度的地下房间。

建议：

- 地板格画成菱形或斜向四边形；
- 墙体画成更高、更暗的块；
- 房间边缘使用暗色轮廓；
- 地板可有轻微纹理线、裂缝、苔藓、火光阴影；
- 随机迷宫仍使用原有数据，但显示时要更有空间感；
- 不要牺牲格子可读性。

---

### 4. 玩家、怪物、道具比例

目标：角色和敌人要明显大于格子地面，接近参考图的战术棋子感。

要求：

- 玩家角色必须一眼可见；
- 怪物、道具、楼梯要比 v0.3 更清楚；
- 玩家脚下可显示蓝色半透明可行动格；
- 怪物脚下或攻击范围可显示红色半透明危险格；
- 道具可以用图标化符号，但要与地板分离；
- 楼梯必须是高辨识度目标。

---

### 5. 战术格子与危险范围

参考图中有蓝色玩家范围和红色危险范围。

本轮需要加入：

- 玩家附近可行动范围：蓝色半透明格，至少显示玩家周围 1～2 格；
- 怪物威胁范围：红色半透明格，至少显示怪物相邻攻击范围；
- 如果怪物会在下一回合接近，也可以只显示当前可攻击格，不做复杂预测；
- 半透明格不能遮挡角色和道具；
- Console 或设置中可保留开关，但不是必须。

---

## 六、UI 布局调整需求

目标布局参考：

```text
左上：玩家头像 / HP / 满腹度 / 楼层 / 道具概览
右上：小地图
右侧：敌人列表 / 行动序列 / 当前怪物状态
底部：1～6 快捷栏，道具和命令
中央：2.5D 地牢画面
```

### 1. 左上状态区

保留并优化：

- 玩家头像占位；
- HP；
- 满腹度；
- 当前楼层；
- 回合数可弱化显示；
- 当前目标提示不要过长。

### 2. 右上小地图

增加或强化小地图：

- 显示当前楼层的墙/地板简图；
- 玩家点；
- 楼梯点；
- 怪物点；
- 道具点可以简化或不显示；
- 小地图不需要完全漂亮，但应帮助玩家理解随机迷宫结构。

### 3. 右侧行动/敌人面板

增加右侧面板，显示：

- 玩家条目；
- 当前可见怪物列表，最多 5～6 个；
- 每个怪物显示图标、HP 条或 HP 数字；
- 睡眠状态可显示 `Z`；
- 不需要真正复杂行动条，只要让右侧看起来像战术信息面板。

### 4. 底部快捷栏

将 v0.3 的按钮改得更像参考图底部 1～6 道具栏：

- 使用 1～6 或 H/F/T/Z/R/X 均可，但必须清楚；
- 每个格子显示道具图标、快捷键、数量；
- 当前不可用时置灰；
- 等待和下楼可以放在快捷栏右侧或单独按钮。

---

## 七、交互与玩法保留要求

本轮必须保留 v0.3 功能：

- 随机迷宫；
- 下楼重新生成地图；
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
- Console 基础功能。

镜头改造不得破坏：

- 键盘移动；
- 鼠标/按钮使用道具；
- 楼梯交互；
- 碰撞逻辑；
- 怪物 AI；
- smoke test。

---

## 八、视觉验收标准

完成后，画面应满足：

1. 第一眼看起来像战术地牢游戏，而不是普通表格式格子原型；
2. 地板具有 2.5D / 等距感；
3. 玩家、怪物、道具、楼梯辨识度明显提高；
4. 玩家附近有蓝色半透明行动范围；
5. 怪物附近有红色半透明威胁范围；
6. UI 布局更接近参考图：左上状态、右上小地图、右侧敌人面板、底部快捷栏；
7. 随机迷宫仍然可读，不因斜俯视变难看懂；
8. 画面不能出现严重遮挡、错位、对象漂浮或点击区域明显不对。

---

## 九、README 更新

更新 `Builds/web-demo/README.md`：

- 当前版本改为 `v0.4 / 镜头与画面表现调整版`；
- 说明本轮不新增玩法，重点调整镜头、画面和 UI；
- 说明 2.5D 斜俯视 / 等距感地牢表现；
- 说明蓝色行动范围和红色威胁范围；
- 说明 UI 布局变化：左上状态、右上小地图、右侧敌人面板、底部快捷栏；
- 说明仍保留 v0.3 的随机迷宫与饥饿系统；
- 说明本轮仍未实现的内容。

---

## 十、测试更新

更新 `Tests/web-demo-smoke.mjs`，至少检查：

- Web Demo 文件存在；
- HTML 引用 CSS 和 JS；
- README 包含 `v0.4 / 镜头与画面表现调整版`；
- README 包含 `2.5D` 或 `斜俯视` 或 `等距`；
- README 包含 `小地图`、`敌人面板`、`快捷栏`；
- JS 中存在投影/镜头相关逻辑，例如：
  - `tileToScreen`；
  - `iso`；
  - `isometric`；
  - `screenX` / `screenY`；
  - 或类似坐标转换函数；
- JS 中存在行动范围或威胁范围绘制逻辑，例如：
  - `drawMoveRange`；
  - `drawThreatRange`；
  - `threat`；
  - `rangeOverlay`；
- HTML 或 JS 中存在小地图逻辑，例如：
  - `minimap`；
- HTML 或 JS 中存在敌人列表 / 行动面板逻辑，例如：
  - `enemy-panel`；
  - `enemy-list`；
  - `turn-order`；
- v0.3 关键逻辑仍存在：
  - `generateDungeon`；
  - `hunger`；
  - `satiety`；
  - `teleport`；
  - `sleep`；
  - `fireball`；
  - `swap`；
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
6. v0.3 的随机迷宫、饥饿、食物、道具、楼梯、胜负条件仍可用；
7. 键盘操作仍正常；
8. 快捷栏按钮仍正常；
9. 小地图显示正常；
10. 敌人面板显示正常；
11. 画面明显接近参考图的战术地牢镜头，而不是普通俯视表格；
12. 没有加入旧计划的怪物机制内容；
13. 没有加入未鉴定、装备、陷阱、怪物屋、壶、商店、据点、Godot；
14. 没有残留 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守核心玩法。

---

## 十二、完成后更新记录

完成后必须更新：

1. `AI_TASKS/CURRENT_TASK.md`
2. `AI_TASKS/CHANGELOG.md`
3. `AI_TASKS/DEV_LOG.md`
4. `AI_TASKS/NEXT_CODEX_PROMPT.md`

记录本轮为：

```text
Web Demo v0.4 / 镜头与画面表现调整版
```

下一轮建议可以先写成：

```text
Web Demo v0.5 / 怪物机制版
```

但不要直接开始 v0.5，等待制作人试玩 v0.4 后确认。

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