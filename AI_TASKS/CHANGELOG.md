# CHANGELOG

## 2026-05-12 / v0.3.1 / Playtest 修正版复核

### 本轮目标

按 `AI_TASKS/NEXT_CODEX_PROMPT.md` 重新执行 v0.3.1 / Playtest 修正版要求，只做合规复核和缺口补齐，不新增大型系统。

---

### 已完成

- [x] 复核 `Builds/web-demo/game.js` 配置路径，确认已使用相对路径；
- [x] 保留 `DEFAULT_CONFIG` fallback；
- [x] 确认 `Builds/web-demo/README.md` 已补充；
- [x] 补齐前期目标提示文案；
- [x] 确认可互动对象可读性、首局压力配置和单金币经济约束；
- [x] 确认 smoke test 覆盖 README、配置路径、经济字段、HTML 引用和服务脚本；
- [x] 更新 `AI_TASKS/CURRENT_TASK.md`、`AI_TASKS/CHANGELOG.md` 和 `AI_TASKS/DEV_LOG.md`；
- [x] 没有新增多资源、自由建造、复杂科技树、大规模战争、RTS 框选或新依赖。

---

### 修改文件

- `Builds/web-demo/game.js`
- `AI_TASKS/CURRENT_TASK.md`
- `AI_TASKS/CHANGELOG.md`
- `AI_TASKS/DEV_LOG.md`

---

### 试玩地址

```text
http://127.0.0.1:4173/Builds/web-demo/
```

## 2026-05-12 / v0.3.4

### 本轮目标

修正 Console 镜头缩放逻辑：从仅改变地图投影尺寸，改为整体世界镜头缩放，并让镜头始终以主角为中心。

---

### 已完成

- [x] 新增世界镜头渲染流程 `drawWorld()`；
- [x] 镜头缩放改为 Canvas 世界整体 transform；
- [x] 地图、角色、树、建筑、特效和交互提示会一起缩放；
- [x] 镜头焦点始终使用主角位置；
- [x] 点击移动坐标转换同步适配镜头缩放；
- [x] 夜晚营火光照位置同步适配镜头；
- [x] smoke test 增加世界镜头相关检查。

---

### 修改文件

- `Builds/web-demo/game.js`
- `Tests/web-demo-smoke.mjs`
- `AI_TASKS/CHANGELOG.md`
- `AI_TASKS/DEV_LOG.md`

---

### 试玩地址

```text
http://127.0.0.1:4173/Builds/web-demo/
```

## 2026-05-12 / v0.3.3

### 本轮目标

按反馈扩大 Console 中镜头缩放滑竿范围。

---

### 已完成

- [x] 镜头缩放滑竿范围改为 50%～5000%；
- [x] 镜头缩放 clamp 范围同步改为 `0.5`～`50`；
- [x] 放宽 Console 中缩放数值显示宽度；
- [x] smoke test 增加滑竿范围检查。

---

### 修改文件

- `Builds/web-demo/index.html`
- `Builds/web-demo/styles.css`
- `Builds/web-demo/game.js`
- `Tests/web-demo-smoke.mjs`
- `AI_TASKS/CHANGELOG.md`
- `AI_TASKS/DEV_LOG.md`

---

### 试玩地址

```text
http://127.0.0.1:4173/Builds/web-demo/
```

## 2026-05-12 / v0.3.2

### 本轮目标

根据试玩反馈处理镜头过远问题，并建立后续调试功能统一入口。

---

### 已完成

- [x] 在 HUD 增加 `Console` 按钮；
- [x] 新增从左侧滑入的 Console 面板；
- [x] 在 Console 面板内新增镜头缩放滑竿；
- [x] 将镜头缩放接入 Canvas 等距投影尺寸；
- [x] 默认镜头缩放设为 120%，让当前画面更近；
- [x] 增强 smoke test，检查 Console 按钮和镜头滑竿存在。

---

### 修改文件

- `Builds/web-demo/index.html`
- `Builds/web-demo/styles.css`
- `Builds/web-demo/game.js`
- `Tests/web-demo-smoke.mjs`
- `AI_TASKS/CHANGELOG.md`
- `AI_TASKS/DEV_LOG.md`

---

### 验证方式

```text
node --check Builds/web-demo/game.js
node --check Tools/web-demo-server.mjs
node Tests/web-demo-smoke.mjs
```

试玩地址：

```text
http://127.0.0.1:4173/Builds/web-demo/
```

## 2026-05-12 / v0.3.1

### 本轮目标

Playtest 修正版：不新增大型系统，不继续堆功能，只修复部署路径、补充 Web Demo README、强化可读性、降低首局压力并增强 smoke test。

---

### 已完成

- [x] 将 `Builds/web-demo/game.js` 配置路径从绝对路径改为相对路径；
- [x] 保留 `DEFAULT_CONFIG` fallback，直接打开 HTML 时 fetch 失败仍可使用内置配置；
- [x] 新增 `Builds/web-demo/README.md`；
- [x] 强化玩家角色轮廓和比例；
- [x] 强化可砍边界树的金色描边、斧头提示和近距离金币槽提示；
- [x] 强化墙点、塔点、地标等固定建筑节点的底座、旗帜和光圈；
- [x] 拉大已清理区域和未清理森林的明暗差；
- [x] 增强砍树完成后的地面闪光 / 扩散反馈；
- [x] 降低首局压力：延长白天和黄昏，减慢敌人，降低刷怪频率，提高营火生命值，提高开局金币；
- [x] 优化前期目标提示；
- [x] 增强 `Tests/web-demo-smoke.mjs`。

---

### 修改文件

- `Builds/web-demo/README.md`
- `Builds/web-demo/game.js`
- `Data/config/web_demo_balance.json`
- `Tests/web-demo-smoke.mjs`
- `AI_TASKS/CURRENT_TASK.md`
- `AI_TASKS/CHANGELOG.md`
- `AI_TASKS/DEV_LOG.md`

---

### 验证方式

```text
node --check Builds/web-demo/game.js
node --check Tools/web-demo-server.mjs
node Tests/web-demo-smoke.mjs
node Tools/web-demo-server.mjs
```

浏览器验证：

```text
http://127.0.0.1:4173/Builds/web-demo/
```

结果：页面可进入，开局金币为 8，首个目标提示正常，首次砍树交互可用，工人完成砍树后目标提示切换为“边界扩大了…”，控制台无错误。

---

### 明确未做

- 未新增多资源；
- 未新增自由建造；
- 未新增复杂科技树；
- 未新增大规模战争；
- 未新增 RTS 框选；
- 未引入 React、Phaser、Three.js 或 npm 依赖；
- 未修改 `DESIGN_HUB/09_DECISIONS.md`；
- 未修改 `AI_RULES/`；
- 未将 Web Demo 宣称为最终游戏；
- 未移除 Godot 作为 Demo 阶段主引擎的长期决策。

## 2026-05-12 / v0.0.4

### 本轮目标

生成一个可双击运行的 `.bat` 文件，用于自动拉起网页 Demo 服务并打开游戏页面。

---

### 已完成

- [x] 新增 `Tools/run-web-demo.bat`；
- [x] 双击或命令行运行时自动检查 Node.js；
- [x] 自动选择从 4173 开始的可用端口；
- [x] 自动启动 `Tools/web-demo-server.mjs`；
- [x] 服务就绪后自动打开 `Builds/web-demo/` 页面。

---

### 修改文件

- `Tools/run-web-demo.bat`
- `AI_TASKS/CHANGELOG.md`
- `AI_TASKS/DEV_LOG.md`

---

### 验证方式

```text
cmd /c Tools\run-web-demo.bat
```

验证结果：命令执行成功，服务被拉起，浏览器自动打开游戏页面。

---

## 2026-05-12 / v0.0.3

### 本轮目标

按用户要求检查项目内开发工具是否完备，并创建一个独立网页端可试玩 Demo 原型。

---

### 工具检查结果

- [x] 仓库当前主要是文档和占位目录；
- [x] `Tools/` 仅有 `.gitkeep`，项目内开发工具不完备；
- [x] 未发现 `project.godot`、`package.json`、`index.html`、`.gd`、`.tscn` 等实际工程文件；
- [x] 本机可用 Node.js v24.14.0、npm 11.9.0、git、Python；
- [x] 未找到 Godot 命令；
- [x] 本轮采用无第三方依赖 Web/H5 原型，不改变 Godot 主引擎决策。

---

### 已完成

- [x] 创建 Web demo 页面；
- [x] 创建 Canvas 游戏主逻辑；
- [x] 创建 Web demo 样式；
- [x] 创建 Web demo 数值配置；
- [x] 创建本地静态服务器；
- [x] 创建 smoke test；
- [x] 实现玩家移动、金币 HUD、投金币交互；
- [x] 实现工人自动砍树、边界清理；
- [x] 实现固定节点建墙、建塔、修复地标；
- [x] 实现昼夜循环、夜晚袭击、基础防守；
- [x] 实现 Demo 胜负条件。

---

### 修改文件

- `Builds/web-demo/index.html`
- `Builds/web-demo/styles.css`
- `Builds/web-demo/game.js`
- `Data/config/web_demo_balance.json`
- `Tools/web-demo-server.mjs`
- `Tests/web-demo-smoke.mjs`
- `AI_TASKS/CURRENT_TASK.md`
- `AI_TASKS/CHANGELOG.md`
- `AI_TASKS/DEV_LOG.md`

---

### 验证方式

```text
node --check Builds/web-demo/game.js
node --check Tools/web-demo-server.mjs
node Tests/web-demo-smoke.mjs
node Tools/web-demo-server.mjs
```

打开：

```text
http://127.0.0.1:4173/Builds/web-demo/
```

---

### 未完成

- [ ] 未创建 Godot 项目文件；
- [ ] 未创建 Godot 主场景；
- [ ] 未导入正式美术资源；
- [ ] 未做完整移动端触控 UI；
- [ ] 未做完整数值平衡。

---

### 风险

- 当前 Web demo 是独立 H5 原型，不代表主项目已完成 Godot 工程；
- Web demo 使用 Canvas 占位图形，后续需要替换为正式资源或迁移到 Godot；
- 本轮为了响应用户网页端要求，暂未推进已确认的 Godot 主工程初始化。

## 2026-05-12 / v0.0.2

### 本轮目标

将人类制作人已确认的核心玩法、项目定位、经济系统、建筑系统、探索规则、目标体验和画面方向沉淀到项目文档中。

---

### 已完成

- [x] 阅读仓库现有可读文档；
- [x] 更新 README.md 项目一句话描述和当前设计边界；
- [x] 填写 DESIGN_HUB/01_PROJECT_BRIEF.md；
- [x] 填写 DESIGN_HUB/02_CORE_GAMEPLAY.md；
- [x] 填写 DESIGN_HUB/03_PLAYER_EXPERIENCE.md；
- [x] 填写 DESIGN_HUB/04_SYSTEM_OVERVIEW.md；
- [x] 填写 DESIGN_HUB/05_ECONOMY_AND_BALANCE.md；
- [x] 填写 DESIGN_HUB/06_CONTENT_PLAN.md；
- [x] 填写 DESIGN_HUB/07_ART_AND_AUDIO_DIRECTION.md；
- [x] 填写 DESIGN_HUB/08_UX_FLOW.md；
- [x] 更新 DESIGN_HUB/09_DECISIONS.md；
- [x] 更新 AI_TASKS/CURRENT_TASK.md；
- [x] 更新 AI_TASKS/DEV_LOG.md。

---

### 本轮确认的核心设计

- 项目定位为面向泛用户的轻策略探索建造游戏；
- 核心乐趣放在探索上，建造和扩张服务探索；
- 游戏只有一种资源：金币；
- 生产出的只有金币，消耗的也只有金币；
- 建筑只能在特定节点建造，不做自由摆放；
- 建筑可以通过继续投金币升级；
- 玩家可以进入未砍伐森林探索；
- 村民、建筑、防线和稳定经济只能存在于已清理区域或王国控制范围内；
- 砍树的作用是扩大王国控制范围，不是采集木材；
- 夜晚防守是扩张压力反馈，不是主玩法；
- 画面采用 45 度斜俯视角，必须优先保证游戏可读性。

---

### 修改文件

- README.md
- DESIGN_HUB/01_PROJECT_BRIEF.md
- DESIGN_HUB/02_CORE_GAMEPLAY.md
- DESIGN_HUB/03_PLAYER_EXPERIENCE.md
- DESIGN_HUB/04_SYSTEM_OVERVIEW.md
- DESIGN_HUB/05_ECONOMY_AND_BALANCE.md
- DESIGN_HUB/06_CONTENT_PLAN.md
- DESIGN_HUB/07_ART_AND_AUDIO_DIRECTION.md
- DESIGN_HUB/08_UX_FLOW.md
- DESIGN_HUB/09_DECISIONS.md
- AI_TASKS/CURRENT_TASK.md
- AI_TASKS/CHANGELOG.md
- AI_TASKS/DEV_LOG.md

---

### 未完成

- [ ] 创建 Godot 项目文件；
- [ ] 创建第一版主场景；
- [ ] 创建第一版玩家控制；
- [ ] 创建第一版金币 HUD；
- [ ] 创建第一版投金币交互；
- [ ] 创建第一版工人砍树与边界清理；
- [ ] 创建第一版昼夜循环占位。

---

### 风险

- 后续实现时容易把游戏做成传统 RTS / SLG，需要严格遵守单角色控制、金币单资源、节点式建造和探索优先原则；
- 美术表现容易过度插画化，需要优先保证可互动对象清晰；
- 砍树机制需要避免被误解为木材采集，应通过反馈强调“扩大控制范围”。

---

### 下一步建议

开始第一版 Godot 空项目初始化，并创建可运行主场景。第一版只验证：

```text
玩家移动 → 金币 HUD → 可互动树金币槽 → 投金币 → 工人砍树 → 清理边界 → 建筑节点出现 → 昼夜切换占位
```

---

## 2026-05-12 / v0.0.1

### 本轮目标

初始化 kingdom-like 项目的 AI 协作目录结构。

---

### 已完成

- [x] 创建 README.md；
- [x] 创建 DESIGN_HUB/ 策划维护区；
- [x] 创建 AI_RULES/ AI 规则区；
- [x] 创建 AI_TASKS/ AI 执行记录区；
- [x] 创建 Docs/、Data/、Assets/、Scenes/、Scripts/、Tools/、Tests/、Builds/、Temp/ 占位结构。

---

### 修改文件

- README.md
- DESIGN_HUB/*
- AI_RULES/*
- AI_TASKS/*
- Docs/.gitkeep
- Data/.gitkeep
- Assets/.gitkeep
- Scenes/.gitkeep
- Scripts/.gitkeep
- Tools/.gitkeep
- Tests/.gitkeep
- Builds/.gitkeep
- Temp/.gitkeep

---

### 未完成

- [ ] 创建 Godot 项目文件；
- [ ] 创建第一版主场景；
- [ ] 创建第一版玩家控制；
- [ ] 创建第一版核心玩法 Demo。

---

### 风险

暂无。

---

### 下一步建议

开始第一版 Godot 空项目初始化，并创建可运行主场景。
