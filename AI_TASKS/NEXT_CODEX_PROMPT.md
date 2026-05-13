# NEXT_CODEX_PROMPT：下一轮 Codex 任务

## 任务名称

Web Demo v0.3 / 随机迷宫与饥饿压力版

---

## 给 Codex 的提示词

你正在继续开发 `shiren-like` 项目的 Web Demo。

当前 `Web Demo v0.2 / 道具策略版` 已完成，已经实现格子迷宫、回合制移动、基础怪物、普通攻击、回复药、食物占位、传送卷轴、睡眠卷轴、火球杖、换位杖、楼梯下楼、HP、楼层、回合、日志、3 层胜利、HP 为 0 失败和通用 Console。

本轮任务是实现：

```text
Web Demo v0.3 / 随机迷宫与饥饿压力版
```

本轮核心目标不是扩展完整 Shiren-like 系统，而是验证：

```text
随机探索 + 轻量饥饿压力 + 搜刮与下楼取舍
```

玩家应该开始感受到：继续搜刮更多道具会消耗满腹度，快速下楼更安全但可能资源不足。

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
我已理解当前项目是 shiren-like，本轮只做 Web Demo v0.3 / 随机迷宫与饥饿压力版，目标是验证随机探索、轻量饥饿压力和搜刮与下楼取舍，不加入后置复杂系统。
```

---

## 二、本轮目标

在 v0.2 的基础上，加入简单随机迷宫生成和轻量饥饿压力。

本轮完成后，玩家应能体验到：

- 每一层地图布局、怪物和道具分布有变化；
- 满腹度会随着有效回合下降；
- 食物不再只是占位，而是用于延长探索；
- 满腹度低时出现明确警告；
- 满腹度为 0 后会产生轻微 HP 压力；
- 玩家需要在“继续搜刮”和“快速下楼”之间做取舍。

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
```

如需要新增配置文件，放在：

```text
Data/config/
```

但优先复用并扩展 `Data/config/web_demo_balance.json`。

---

## 四、本轮禁止事项

不要做：

- 不做未鉴定；
- 不做装备；
- 不做陷阱；
- 不做怪物屋；
- 不做壶；
- 不做商店；
- 不做据点；
- 不做复杂 Boss；
- 不做多种怪物；
- 不做完整自然回血系统；
- 不做完整房间识别战术系统；
- 不做 Godot 工程；
- 不引入 React、Phaser、Three.js 或复杂 npm 依赖；
- 不做商业化系统；
- 不继续开发旧 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守逻辑。

---

## 五、随机迷宫需求

### 1. 生成方式

实现一个简单稳定的随机迷宫生成器。

建议方案：

- 地图尺寸保持 15×12 或可配置；
- 生成 4～6 个矩形房间；
- 用走廊连接房间中心；
- 墙为 `#`，地板为 `.`；
- 玩家出生在第一个房间；
- 楼梯生成在远离玩家的房间；
- 怪物和道具随机分布在地板上；
- 不得生成无解地图；
- 生成失败时可 fallback 到固定地图。

如果你认为房间走廊实现成本较高，可以使用更简单的“随机挖洞 + 连通性检查”，但必须保证玩家能到达楼梯。

---

### 2. 楼层变化

每次进入下一层时重新生成地图。

建议：

- 第 1 层较简单；
- 第 2 层怪物略多；
- 第 3 层道具和怪物更密集；
- 仍保持 3 层胜利目标。

配置中应保留：

```json
"dungeon": {
  "maxFloors": 3,
  "width": 15,
  "height": 12,
  "generation": { ... }
}
```

---

### 3. 随机分布

每层随机生成：

- 怪物；
- 回复药；
- 食物；
- 传送卷轴；
- 睡眠卷轴；
- 火球杖；
- 换位杖；
- 楼梯。

建议数量：

| 楼层 | 怪物 | 回复药 | 食物 | 策略道具 |
|---|---:|---:|---:|---:|
| 1F | 2～3 | 1 | 1 | 1～2 |
| 2F | 3～4 | 1 | 1 | 2 |
| 3F | 4～5 | 1 | 1～2 | 2～3 |

不要让随机分布把道具或楼梯放进墙里，也不要和玩家、怪物重叠。

---

## 六、饥饿 / 满腹度需求

### 1. 基础规则

v0.3 将满腹度从占位 UI 改为轻量压力系统。

建议规则：

- 玩家初始满腹度：100；
- 满腹度最大值：100；
- 玩家每进行 5 个有效回合，满腹度下降 1；
- 满腹度低于 25 时，显示警告；
- 满腹度为 0 时，每 5 个有效回合扣 1 HP；
- 饥饿扣 HP 可以导致死亡，但必须有明确日志提示；
- 食物恢复 40～60 满腹度，具体值配置化。

如果担心太难，可以让 v0.3 的饥饿 HP 伤害较轻，但不要完全没有压力。

---

### 2. 有效回合

以下行动应计入饥饿消耗：

- 移动；
- 普通攻击；
- 使用道具成功；
- 等待；
- 下楼。

以下不计入：

- 无效撞墙；
- 没有道具时点击使用；
- HP 已满无法喝药；
- 满腹已满无法吃食物；
- 打开 Console；
- 暂停。

---

### 3. 食物

食物变为真实资源：

- 使用后恢复满腹度；
- 不超过最大值；
- 使用成功后推进回合；
- 食物数量应显示在快捷栏；
- 满腹度低时，目标提示或日志应提示使用食物。

---

### 4. UI 反馈

HUD 中显示：

```text
满腹 100 / 100
```

当满腹度低于 25：

- 数值变色；
- 日志提示：`满腹度很低，继续探索会有危险。`

当满腹度为 0 且扣 HP：

- 日志提示：`饥饿造成 1 点伤害。`

死亡原因应区分：

- 被怪物击败；
- 因饥饿倒下。

---

## 七、现有道具保留要求

v0.3 必须保留 v0.2 已有道具功能：

- 回复药：恢复 HP；
- 食物：恢复满腹度；
- 传送卷轴：传送到当前楼层安全地板；
- 睡眠卷轴：让范围内怪物睡眠；
- 火球杖：朝当前方向远程攻击；
- 换位杖：与当前方向第一个怪物交换位置。

如果随机地图导致火球 / 换位使用场景不稳定，必须保持规则一致并在 README 中说明。

---

## 八、平衡要求

v0.3 重点是体验取舍，不是惩罚玩家。

建议：

- 第 1 层要容易，让玩家理解随机地图和满腹度；
- 第 2 层开始出现“要不要绕路搜刮”的取舍；
- 第 3 层可以让满腹度低造成压力；
- 食物不能太多，否则饥饿无意义；
- 食物不能太少，否则新玩家容易莫名死亡；
- 怪物数量不要暴涨，避免玩家以为 v0.3 只是变难。

---

## 九、README 更新

更新 `Builds/web-demo/README.md`：

- 当前版本改为 `v0.3 / 随机迷宫与饥饿压力版`；
- 说明运行方式；
- 说明随机迷宫生成方式；
- 说明满腹度 / 饥饿规则；
- 说明食物现在的作用；
- 说明仍保留 v0.2 的道具；
- 说明本轮仍未实现的内容；
- 说明试玩重点：随机探索是否成立，饥饿是否形成搜刮与下楼取舍。

---

## 十、测试更新

更新 `Tests/web-demo-smoke.mjs`，至少检查：

- Web Demo 文件存在；
- HTML 引用 CSS 和 JS；
- README 包含 `v0.3 / 随机迷宫与饥饿压力版`；
- README 包含 `随机迷宫`、`满腹度`、`饥饿`、`食物`；
- JS 中存在随机生成相关逻辑，例如：
  - `generateDungeon`；
  - `rooms`；
  - `connectRooms`；
  - 或其他明确随机迷宫生成函数名；
- JS 中存在饥饿相关逻辑，例如：
  - `satiety`；
  - `hunger`；
  - `consumeSatiety`；
  - `starvation`；
- JS 中仍存在 v0.2 道具逻辑：
  - potion / 回复药；
  - food / 食物；
  - teleport / 传送；
  - sleep / 睡眠；
  - fireball / 火球；
  - swap / 换位；
- 配置文件 `version` 为 `v0.3`；
- 配置文件包含随机迷宫参数；
- 配置文件包含饥饿参数；
- 旧 kingdom-like 核心词仍不得出现：
  - `treeCost`；
  - `wallCost`；
  - `towerCost`；
  - `landmarkCost`；
  - `workers`；
  - `archers`。

---

## 十一、验收标准

完成后必须满足：

1. `node --check Builds/web-demo/game.js` 通过；
2. `node --check Tools/web-demo-server.mjs` 通过；
3. `node Tests/web-demo-smoke.mjs` 通过；
4. `node Tools/web-demo-server.mjs` 可以启动；
5. 打开 `http://127.0.0.1:4173/Builds/web-demo/` 可以试玩；
6. 每层地图布局不再完全固定；
7. 玩家、楼梯、怪物、道具都生成在合法地板格；
8. 玩家可以到达楼梯；
9. 每次下楼会重新生成地图；
10. 满腹度会随有效回合下降；
11. 满腹度低时有明显提示；
12. 满腹度为 0 后会造成轻微 HP 压力；
13. 食物可以恢复满腹度；
14. 饥饿死亡和怪物死亡原因区分清楚；
15. v0.2 的道具功能仍可使用；
16. 没有加入未鉴定、装备、陷阱、怪物屋、壶、商店、据点、Godot；
17. 没有残留 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守核心玩法。

---

## 十二、完成后更新记录

完成后必须更新：

1. `AI_TASKS/CURRENT_TASK.md`
2. `AI_TASKS/CHANGELOG.md`
3. `AI_TASKS/DEV_LOG.md`
4. `AI_TASKS/NEXT_CODEX_PROMPT.md`

记录本轮为：

```text
Web Demo v0.3 / 随机迷宫与饥饿压力版
```

下一轮建议可以先写成：

```text
Web Demo v0.4 / 怪物机制版
```

但不要直接开始 v0.4，等待制作人试玩 v0.3 后确认。

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