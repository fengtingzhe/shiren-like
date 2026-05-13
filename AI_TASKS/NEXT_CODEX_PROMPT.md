# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

Web Demo v0.1 / 最小可玩迷宫版

---

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

v0.0 已经由 ChatGPT 完成项目重定向：当前项目已经从旧 `kingdom-like` 轻策略探索建造方向，转为类《风来的西林》/ Mystery Dungeon Roguelike 方向。

本轮任务由 Codex 执行，目标是完成 `Web Demo v0.1 / 最小可玩迷宫版`。

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
26. `Tests/web-demo-smoke.mjs`

阅读后先输出：

```text
我已理解当前项目是 shiren-like，本轮只做 Web Demo v0.1 / 最小可玩迷宫版，不加入复杂系统。
```

---

## 二、本轮目标

重写或替换旧 kingdom-like Web Demo，使其变成最小可玩的 Shiren-like / Mystery Dungeon 原型。

v0.1 只验证：

```text
格子迷宫 → 回合制移动 → 怪物追击 → 普通攻击 → 回复药 → 楼梯下楼 → 简单胜负
```

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
```

如需要新增配置，优先放在：

```text
Data/config/
```

可以把旧 `web_demo_balance.json` 改造成 shiren-like 配置，或新增 `shiren_web_demo_balance.json`。如果新增配置，要同步更新 `game.js` 和 smoke test。

---

## 四、本轮禁止事项

不要做：

- 不做饥饿；
- 不做完整背包；
- 不做未鉴定；
- 不做装备；
- 不做陷阱；
- 不做怪物屋；
- 不做壶；
- 不做商店；
- 不做据点；
- 不做随机深度复杂地图；
- 不做 Godot 工程；
- 不引入 React、Phaser、Three.js 或复杂 npm 依赖；
- 不做商业化系统；
- 不继续开发 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守逻辑。

---

## 五、玩法需求

### 1. 地图

实现一个小型格子迷宫。

建议：

- 12×12 或 15×12；
- 墙；
- 地板；
- 玩家起点；
- 怪物；
- 回复药；
- 楼梯；
- v0.1 可以固定地图或半随机地图。

优先保证稳定和可读，不追求复杂随机生成。

---

### 2. 回合制

核心规则：

```text
玩家每进行一次有效行动
↓
推进一个回合
↓
所有怪物行动一次
```

有效行动包括：

- 移动一格；
- 攻击相邻怪物；
- 使用回复药；
- 等待一回合；
- 下楼。

不应推进回合：

- 打开说明；
- 点击无效位置；
- 鼠标移动；
- 游戏暂停。

---

### 3. 玩家

玩家属性建议：

```json
{
  "maxHp": 20,
  "attack": 4
}
```

玩家操作：

- WASD / 方向键移动；
- 相邻格有怪物时，朝该方向移动即攻击；
- 空格或句号可以等待一回合；
- H 或快捷按钮使用回复药；
- 站在楼梯上按 E / Enter / 按钮下楼。

---

### 4. 怪物

v0.1 只做 1 种基础怪物。

建议属性：

```json
{
  "name": "Slime",
  "hp": 6,
  "attack": 3
}
```

行为：

- 如果与玩家相邻，攻击玩家；
- 否则向玩家靠近一格；
- 不穿墙；
- 不与其他怪物重叠；
- 简单路径即可，不要求复杂寻路；
- 若无法靠近，可原地等待。

---

### 5. 回复药

v0.1 只做 1 种道具：回复药。

功能：

- 玩家走到道具格后拾取；
- 道具数量显示在 HUD；
- 玩家按 H 或点击按钮使用；
- 恢复 8 HP；
- 不能超过最大 HP；
- 使用后推进一回合。

---

### 6. 楼梯与楼层

- 每层有 1 个楼梯；
- 玩家站到楼梯上出现提示；
- 确认后进入下一层；
- 楼层数 +1；
- 刷新地图、怪物和回复药；
- 到达第 3 层并进入终点后胜利。

---

### 7. 胜负条件

失败：

```text
玩家 HP <= 0
```

胜利：

```text
完成第 3 层目标 / 进入第 3 层终点
```

结算界面至少显示：

- 胜利 / 死亡；
- 到达楼层；
- 击败怪物数量；
- 使用回复药数量；
- 死亡原因或胜利说明；
- 再来一局按钮。

---

## 六、UI 需求

HUD 至少显示：

- HP / Max HP；
- 当前楼层；
- 当前回合数；
- 回复药数量；
- 当前目标提示；
- 行动日志。

画面必须清楚显示：

- 玩家；
- 墙；
- 地板；
- 怪物；
- 回复药；
- 楼梯。

v0.1 可以使用简化图形、emoji、canvas 图形或 CSS 格子，但必须稳定、清楚、像游戏。

---

## 七、README 更新

更新 `Builds/web-demo/README.md`：

- 当前版本改为 `v0.1 / 最小可玩迷宫版`；
- 说明运行方式；
- 说明已实现内容；
- 说明未实现内容；
- 说明试玩重点。

---

## 八、测试更新

更新 `Tests/web-demo-smoke.mjs`，至少检查：

- Web Demo 文件存在；
- HTML 引用 CSS 和 JS；
- README 包含 `shiren-like Web Demo`；
- README 包含 `v0.1 / 最小可玩迷宫版`；
- JS 中存在回合制相关逻辑，例如 `turn` 或 `advanceTurn`；
- JS 中存在玩家 HP；
- JS 中存在怪物；
- JS 中存在 potion / 回复药；
- JS 中存在 stairs / 楼梯；
- JS 中不存在旧 kingdom-like 核心词：`treeCost`、`wallCost`、`towerCost`、`landmarkCost`、`workers`、`archers`。

---

## 九、验收标准

完成后必须满足：

1. `node --check Builds/web-demo/game.js` 通过；
2. `node --check Tools/web-demo-server.mjs` 通过；
3. `node Tests/web-demo-smoke.mjs` 通过；
4. `node Tools/web-demo-server.mjs` 可以启动；
5. 打开 `http://127.0.0.1:4173/Builds/web-demo/` 可以试玩；
6. 玩家可以在格子迷宫中移动；
7. 玩家行动后怪物行动；
8. 玩家可以攻击怪物；
9. 怪物可以攻击玩家；
10. 玩家可以拾取并使用回复药；
11. 玩家可以通过楼梯进入下一层；
12. HP 为 0 时失败；
13. 到达第 3 层目标后胜利；
14. 没有残留 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守核心玩法。

---

## 十、完成后更新记录

完成后必须更新：

1. `AI_TASKS/CURRENT_TASK.md`
2. `AI_TASKS/CHANGELOG.md`
3. `AI_TASKS/DEV_LOG.md`
4. 必要时更新 `AI_TASKS/NEXT_CODEX_PROMPT.md`

记录本轮为：

```text
Web Demo v0.1 / 最小可玩迷宫版
```

---

## 十一、完成后输出格式

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