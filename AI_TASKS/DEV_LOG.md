# DEV_LOG：开发过程记录

## 2026-05-12 / v0.3.1 Playtest 修正版复核

### 本轮目标

读取 `AI_TASKS/NEXT_CODEX_PROMPT.md`，严格按其中 v0.3.1 / Playtest 修正版任务执行：修复部署路径、补充 README、强化可读性、降低首局压力、增强 smoke test，并保持核心设计不变。

---

### 执行过程

- 复核 README、DESIGN_HUB、AI_TASKS、Web Demo 代码、配置、服务脚本和 smoke test；
- 确认 `CONFIG_URL` 已改为 `../../Data/config/web_demo_balance.json`；
- 确认 `DEFAULT_CONFIG` fallback 仍保留；
- 确认 `Builds/web-demo/README.md` 已记录 v0.3.1 / Playtest 修正版运行方式和试玩重点；
- 将前期目标提示文案补齐为提示词指定表达；
- 确认首局压力配置已降低，仍只显示金币一种资源；
- 确认 smoke test 已覆盖本轮要求；
- 保留此前用户明确要求的 Console / 镜头调试入口，本轮没有继续扩展调试功能。

---

### 未新增内容

- 没有新增多资源；
- 没有新增自由建造；
- 没有新增复杂科技树；
- 没有新增大规模战争；
- 没有新增 RTS 框选；
- 没有引入 React、Phaser、Three.js 或 npm 依赖；
- 没有修改 `DESIGN_HUB/09_DECISIONS.md`；
- 没有修改 `AI_RULES/`；
- 没有把 Web Demo 宣称为最终游戏；
- 没有移除 Godot 作为 Demo 阶段主引擎的长期决策。

---

### 试玩地址

```text
http://127.0.0.1:4173/Builds/web-demo/
```

## 2026-05-12 / v0.3.4 整体镜头缩放

### 本轮目标

修正镜头缩放只影响地图的问题，改为整体世界缩放，并让镜头始终以主角为中心。

---

### 执行过程

- 保持基础地块尺寸独立于镜头缩放；
- 新增 `getCameraFocus()`，使用主角投影位置作为镜头中心；
- 新增 `drawWorld()`，用 Canvas transform 缩放和位移整个世界层；
- 新增 `screenToWorld()` / `worldToScreen()`，适配点击移动和夜晚光照；
- 更新 smoke test 检查世界镜头函数。

---

### 试玩地址

```text
http://127.0.0.1:4173/Builds/web-demo/
```

## 2026-05-12 / v0.3.3 镜头范围扩展

### 本轮目标

将 Console 中镜头缩放滑竿范围调整为 50%～5000%。

---

### 执行过程

- 修改 `camera-zoom-slider` 的 `min`、`max` 和 `step`；
- 同步修改 `updateCameraZoom` 中的 clamp 范围；
- 放宽缩放数值显示列宽；
- 增强 smoke test，检查滑竿范围和 JS clamp。

---

### 试玩地址

```text
http://127.0.0.1:4173/Builds/web-demo/
```

## 2026-05-12 / v0.3.2 镜头调试 Console

### 本轮目标

处理镜头过远反馈，并建立后续调试功能放置位置。

---

### 执行过程

- 在 HUD 增加 `Console` 按钮；
- 新增左侧滑入式 Console 面板；
- 将镜头缩放滑竿放入 Console 面板；
- 新增 `cameraZoom` 设置，默认值为 1.2；
- 将 `cameraZoom` 应用于 Canvas 等距地块尺寸；
- 更新 smoke test，检查 Console 和镜头调节能力。

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

浏览器验证：

- 开始游戏后可以看到 `Console` 按钮；
- 点击后左侧 Console 面板滑入；
- 镜头缩放默认值为 120%；
- 将滑竿调整到 140% 后显示值同步变化；
- 控制台无错误。

## 2026-05-12 / v0.3.1 Playtest 修正版

### 本轮目标

继续开发 kingdom-like 网页版 Demo，但只做 Playtest 修正：修复配置路径、补充 README、强化可读性、降低首局压力、增强 smoke test，保持核心设计不变。

---

### 执行过程

- 按用户指定清单读取 README、DESIGN_HUB、AI_TASKS、Web demo 代码、配置、服务器和测试文件；
- 将 `CONFIG_URL` 改为 `../../Data/config/web_demo_balance.json`；
- 同步调整外部配置和 `DEFAULT_CONFIG` 的首局压力参数；
- 新增 `Builds/web-demo/README.md`；
- 强化 Canvas 占位画面的可读性；
- 优化新手目标提示；
- 增强 smoke test 检查配置路径、README、fallback、金币经济字段和禁止多资源字段；
- 运行命令行验证和浏览器验证。

---

### 实现内容

- 配置路径兼容 GitHub Pages 子路径；
- 直接打开 HTML 时仍保留 `DEFAULT_CONFIG` fallback；
- 玩家角色更大，有浅色外轮廓；
- 可砍边界树带金色描边、斧头提示和近距离金币槽提示；
- 普通森林更暗，可砍边界树与普通背景森林更容易区分；
- 建筑节点增加石基、木桩、旗帜和底部光圈；
- 已清理区域更亮，砍树完成时有更明显闪光 / 扩散反馈；
- 首局白天延长到 75 秒，黄昏延长到 15 秒；
- 敌人生成间隔提高到 6 秒，敌人速度降到 0.8，营火生命值提高到 14，开局金币提高到 8；
- 第一次砍树完成后短暂显示“边界扩大了…”目标提示，避免过早被地标目标覆盖。

---

### 验证结果

已通过：

```text
node --check Builds/web-demo/game.js
node --check Tools/web-demo-server.mjs
node Tests/web-demo-smoke.mjs
```

本地服务检查：

```text
http://127.0.0.1:4173/Builds/web-demo/
http://127.0.0.1:4173/Data/config/web_demo_balance.json
```

浏览器检查：

- 页面标题正确；
- Canvas 存在；
- 开局金币为 8；
- 初始目标提示为“探索森林，找到可砍边界树。投金币清理边界。”；
- 首次砍树按钮显示“砍树 1”；
- 投金币后金币变为 7；
- 工人完成砍树后目标提示切换为“边界扩大了。寻找宝箱、流民或建筑节点，用金币做取舍。”；
- 控制台无错误。

---

### 未新增内容

- 没有新增大型系统；
- 没有新增多资源；
- 没有新增自由建造；
- 没有新增复杂科技树；
- 没有新增大规模战争；
- 没有新增 RTS 框选；
- 没有新增复杂菜单；
- 没有引入 npm 依赖。

---

### 后续注意

- 当前仍是 Web/H5 试玩原型，不是最终游戏，也不是 Godot 主工程；
- 下一轮应优先依据试玩反馈继续修正可读性、目标节奏和首局压力，而不是继续堆功能。

## 2026-05-12 / Web Demo 一键启动脚本

### 本轮目标

生成一个 `.bat` 文件，双击后自动启动网页 Demo 服务并打开游戏页面。

---

### 执行过程

- 在 `Tools/` 下新增 `run-web-demo.bat`；
- 脚本使用仓库根目录作为服务根路径；
- 脚本检查 Node.js 是否可用；
- 脚本从 4173 开始寻找可用端口；
- 脚本启动 `Tools/web-demo-server.mjs`；
- 脚本等待服务就绪后打开浏览器。

---

### 验证结果

已通过：

```text
cmd /c Tools\run-web-demo.bat
```

---

### 后续注意

- 如果多次双击，会启动多个服务进程，并自动使用下一个可用端口；
- 如需停止服务，可在任务管理器中结束对应的 `node.exe` 进程。

## 2026-05-12 / 网页端 Demo 原型

### 本轮目标

读取仓库内容，检查开发工具是否完备，并根据现有设计约束创建一个网页端可试玩 Demo。

---

### 执行过程

- 按要求读取 README、AI_RULES、DESIGN_HUB、AI_TASKS 等现有文档；
- 统计目录内容，确认当前只有文档和 `.gitkeep` 占位；
- 检查项目内工程文件，未发现 Godot、Web 或 npm 工程入口；
- 检查本机工具，确认 Node.js / npm / git / Python 可用，Godot 命令不可用；
- 创建 `Data/config/web_demo_balance.json`，保存核心金币、昼夜、工人、战斗和地图配置；
- 创建 `Builds/web-demo/index.html`、`styles.css`、`game.js`；
- 创建 `Tools/web-demo-server.mjs`，用于从仓库根目录启动静态服务；
- 创建 `Tests/web-demo-smoke.mjs`，用于基础文件和配置检查；
- 运行 JS 语法检查和 smoke test。

---

### 实现内容

- 玩家单角色移动；
- 点击地面移动和键盘移动；
- 金币 HUD、昼夜状态、目标提示、交互金币槽；
- 边界树投金币交互；
- 工人自动前往目标、砍树、清理边界；
- 固定节点建墙、建塔、修复地标；
- 宝箱奖励和流民招募；
- 昼夜循环、黄昏提示、夜晚敌人袭击；
- 木墙、营火生命值、哨塔 / 弓手自动防守；
- 修复地标并守住夜晚后的胜利；
- 营火被摧毁或天数耗尽后的失败。

---

### 验证结果

已通过：

```text
node --check Builds/web-demo/game.js
node --check Tools/web-demo-server.mjs
node Tests/web-demo-smoke.mjs
```

---

### 遇到的问题

- 项目内 `Tools/` 目录没有可用开发工具；
- 仓库未包含 `project.godot`，也未包含 Web 工程文件；
- 已确认决策中 Demo 阶段优先使用 Godot，但用户本轮明确要求网页端 Demo。

---

### 解决方式

- 不修改 Godot 主引擎决策；
- 不修改 `README.md`、`DESIGN_HUB/`、`AI_RULES/`；
- 将本轮产物作为独立 Web/H5 可试玩原型放入 `Builds/web-demo/`；
- 使用原生浏览器能力和 Node 静态服务器，避免新增第三方依赖。

---

### 后续注意

- 如果继续以 Godot 为主线，需要补 `project.godot` 和第一版主场景；
- 如果继续以网页 Demo 验证玩法，需要先确认 Web/H5 是否只是展示原型，还是会成为正式目标平台；
- 当前画面均为 Canvas 占位图形，不应视为最终美术资源。

## 2026-05-12 / 核心玩法设计沉淀

### 本轮目标

阅读仓库现有可读内容，并将人类制作人本轮确认的核心设计写入相关文档。

---

### 执行过程

- 读取 README.md；
- 读取 AI_RULES/00_MASTER_PROMPT.md；
- 读取 AI_RULES/01_AI_READ_ORDER.md；
- 读取 AI_RULES/02_AI_EDIT_PERMISSION.md；
- 读取 DESIGN_HUB/00_DESIGN_INDEX.md；
- 读取 DESIGN_HUB/01_PROJECT_BRIEF.md；
- 读取 DESIGN_HUB/02_CORE_GAMEPLAY.md；
- 读取 DESIGN_HUB/03_PLAYER_EXPERIENCE.md；
- 读取 DESIGN_HUB/04_SYSTEM_OVERVIEW.md；
- 读取 DESIGN_HUB/05_ECONOMY_AND_BALANCE.md；
- 读取 DESIGN_HUB/06_CONTENT_PLAN.md；
- 读取 DESIGN_HUB/07_ART_AND_AUDIO_DIRECTION.md；
- 读取 DESIGN_HUB/08_UX_FLOW.md；
- 读取 DESIGN_HUB/09_DECISIONS.md；
- 读取 DESIGN_HUB/10_OPEN_QUESTIONS.md；
- 读取 DESIGN_HUB/11_PLAYTEST_FEEDBACK.md；
- 读取 AI_TASKS/CURRENT_TASK.md；
- 读取 AI_TASKS/CHANGELOG.md；
- 读取 AI_TASKS/DEV_LOG.md；
- 读取 AI_TASKS/REVIEW_LOG.md；
- 将项目定位、核心玩法、经济系统、建筑系统、玩家 / 村民分工、画面要求、UX 流程写入 DESIGN_HUB 和 README；
- 将关键确认项写入 DESIGN_HUB/09_DECISIONS.md；
- 更新 CURRENT_TASK.md 和 CHANGELOG.md。

---

### 本轮沉淀的核心结论

- 本项目是面向泛用户的轻策略探索建造 Demo；
- 核心乐趣是探索，建造和扩张服务探索；
- 游戏对 SLG 和 RTS 做减法；
- 经济系统只有金币；
- 建筑只能在特定节点建造，并可以投金币升级；
- 玩家可以进入未砍伐森林探索；
- 村民、建筑、防线和稳定经济只能存在于已清理区域或王国控制范围内；
- 砍树作用是扩大王国控制范围，不是采集木材；
- 夜晚防守是扩张压力反馈；
- 画面必须优先保证玩法可读性。

---

### 遇到的问题

- 仓库中的 DESIGN_HUB 文件多数为模板状态，需要用本轮讨论内容补全。
- README、DESIGN_HUB 属于核心方向文件，按用户明确要求进行了更新。

---

### 解决方式

- 仅更新文档，不改代码、不改工程结构；
- 不新增未确认的大系统；
- 将已经明确确认的内容写入 DESIGN_HUB/09_DECISIONS.md；
- 未发现需要新增到 DESIGN_HUB/10_OPEN_QUESTIONS.md 的待决策问题。

---

### 后续注意

后续开发前，AI 必须先阅读 README.md 和 AI_RULES/01_AI_READ_ORDER.md。

下一轮建议只做最小 Godot 原型，不要一次性实现完整游戏。

建议最小原型闭环：

```text
玩家移动 → 金币 HUD → 可互动树金币槽 → 投金币 → 工人砍树 → 清理边界 → 建筑节点出现 → 昼夜切换占位
```

---

## 2026-05-12 / 初始化项目

### 本轮目标

初始化项目目录结构与 AI 协作规则。

---

### 执行过程

- 创建 README.md；
- 创建 DESIGN_HUB/；
- 创建 AI_RULES/；
- 创建 AI_TASKS/；
- 准备创建工程占位目录。

---

### 遇到的问题

暂无。

---

### 解决方式

暂无。

---

### 后续注意

后续开发前，AI 必须先阅读 README.md 和 AI_RULES/01_AI_READ_ORDER.md。
