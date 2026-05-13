# shiren-like

本项目采用“游戏工程 + AI 协作规则 + 设计文档 + 数据配置”分离的结构。

当前阶段，本项目不以“让 AI 全自动开发完整复杂游戏”为目标，而是以“借助 AI 快速搭建可试玩、可展示、可验证的 Mystery Dungeon Roguelike Demo”为目标。

Demo 阶段的重点不是完整，而是充分展示核心体验。

---

# 1. 项目基本信息

## 项目名称

shiren-like

## 游戏一句话描述

一款现代化 Mystery Dungeon Roguelike Demo：玩家在随机迷宫中逐层探索，以回合制格子移动、道具组合、怪物机制、陷阱、饥饿压力和死亡复盘为核心，体验“每一步都是决策”的高密度迷宫冒险。

## 当前开发目标

当前阶段目标是完成第一版 Web Demo，验证：

- 核心玩法闭环：探索迷宫 → 回合制移动 → 遭遇怪物 → 使用道具解局 → 找到楼梯 → 进入下一层；
- 基础 UI 流程：HP、饥饿、楼层、背包、当前危险提示、行动日志；
- 基础数值配置：玩家 HP、怪物属性、道具效果、楼层生成参数、饥饿消耗；
- 可运行、可试玩、可展示版本。

## 当前版本不追求

- 最终美术品质；
- 完整商业化；
- 完整后端；
- 完整随机迷宫深度；
- 完整道具库；
- 完整装备强化；
- 完整商店；
- 完整剧情；
- 完整上线品质；
- 复杂 SDK 接入；
- 完整长期工程架构。

---

# 2. 项目目录结构

```text
shiren-like/
├── README.md
├── DESIGN_HUB/
├── AI_RULES/
├── AI_TASKS/
├── Docs/
├── Data/
├── Assets/
├── Scenes/
├── Scripts/
├── Tools/
├── Tests/
├── Builds/
└── Temp/
```

核心原则：

```text
DESIGN_HUB 管方向；
AI_RULES 管 AI；
AI_TASKS 管执行；
Docs 管资料；
Data 管配置；
Scripts / Scenes 管实现。
```

---

# 3. AI 开始工作前必须阅读

每次新会话、上下文重置或开始新任务前，AI 必须按顺序阅读：

```text
1. README.md
2. AI_RULES/00_MASTER_PROMPT.md
3. AI_RULES/01_AI_READ_ORDER.md
4. AI_RULES/02_AI_EDIT_PERMISSION.md
5. DESIGN_HUB/00_DESIGN_INDEX.md
6. DESIGN_HUB/01_PROJECT_BRIEF.md
7. DESIGN_HUB/02_CORE_GAMEPLAY.md
8. DESIGN_HUB/03_PLAYER_EXPERIENCE.md
9. DESIGN_HUB/09_DECISIONS.md
10. DESIGN_HUB/10_OPEN_QUESTIONS.md
11. AI_TASKS/CURRENT_TASK.md
12. AI_TASKS/NEXT_CODEX_PROMPT.md
13. AI_RULES/06_VALIDATION_CHECKLIST.md
```

阅读后，AI 必须先回复：

```text
我已理解当前项目目标、目录结构、设计边界、技术规则和本轮任务约束。
```

然后才能开始修改文件。

---

# 4. AI 工作基本原则

AI 可以：

```text
执行任务；
整理文档；
实现功能；
修复 Bug；
提出建议；
生成配置；
生成测试；
总结问题。
```

AI 不可以：

```text
擅自改变核心玩法；
擅自改变核心系统；
擅自改变核心数值方向；
擅自改变核心技术架构；
擅自重构项目目录结构；
擅自删除已确认设计；
擅自替换已经确认的方案。
```

如果 AI 不确定，应写入：

```text
DESIGN_HUB/10_OPEN_QUESTIONS.md
```

等待人类制作人决策。

---

# 5. 当前推荐主工作流

```text
ChatGPT：制作人 / 总策划 / 任务拆解 / 产品复审
Godot：游戏编辑器，Demo 阶段主引擎
Codex：主程 / 架构 / 代码审核 / Bug 修复
DeepSeek：模块开发 / 批量配置 / 重复性代码
Figma：UI 原型和界面表达
Image 2 / 即梦：图片和素材方向
Seedance / 即梦：动画和投放视频
Excel / Python：数值与数据分析
Notion：工作流、文档、知识库、任务沉淀
GitHub：代码版本管理
```

---

# 6. 引擎选择原则

当前工作流的目标是快速搭建可试玩、可展示、可验证的 Demo，而不是一开始完成复杂商业化游戏。

因此，默认推荐使用 Godot 作为 Demo 阶段的主引擎。

原因：

```text
1. Godot 更轻量，适合快速启动和快速迭代；
2. Godot 的 2D 能力适合移动端竖屏原型；
3. GDScript 简洁，便于 AI 生成、阅读和修改；
4. Godot 项目文本化程度较高，适合 Codex / DeepSeek 处理；
5. 策划更容易理解场景、脚本和数据之间的关系。
```

Unity 更适合进入商业化开发阶段后再评估。

---

# 7. Demo 阶段划分

本项目采用“先 Web Demo，后 Godot Demo”的开发策略。

## Web Demo 阶段

版本号：`v0.x`

目标：

- 快速验证核心玩法；
- 快速验证 UI 信息层级；
- 快速验证资源循环；
- 快速进行试玩反馈；
- 为 Godot Demo 提供明确方向。

默认目录：

```text
Builds/web-demo/
Data/config/
Tools/
Tests/
```

## Godot Demo 阶段

版本号：`v1.x`

目标：

- 将已经验证过的核心玩法迁移到 Godot；
- 加入正式场景结构；
- 加入 Godot UI；
- 加入角色、动画、反馈和资源管理；
- 为后续可展示垂直切片做准备。

---

# 8. NEXT_CODEX_PROMPT 使用规则

`AI_TASKS/NEXT_CODEX_PROMPT.md` 用于保存下一轮交给 Codex 执行的完整提示词。

当 ChatGPT 长对话过长、网页卡顿或上下文过重时，不应继续在聊天中堆积提示词，而应将最终确认的任务提示词写入该文件。

Codex 执行任务时，应优先读取：

- `AI_TASKS/NEXT_CODEX_PROMPT.md`
- `AI_TASKS/CURRENT_TASK.md`
- `AI_TASKS/CHANGELOG.md`
- `AI_TASKS/DEV_LOG.md`

执行完成后，Codex 应更新：

- `AI_TASKS/CURRENT_TASK.md`
- `AI_TASKS/CHANGELOG.md`
- `AI_TASKS/DEV_LOG.md`
- 必要时更新 `AI_TASKS/NEXT_CODEX_PROMPT.md`

---

# 9. 通用 Debug Console 规则

所有 Demo 默认应提供一个 `Console` / `Dev` 按钮，作为开发者工具入口。

Console 是 Demo 阶段的开发者工具面板，不代表最终玩家界面。

通用功能只包含跨游戏类型也常用的功能：

```text
音乐开关；
音效开关；
暂停 / 继续；
重置场景 / 重置 Demo；
显示 FPS。
```

特定游戏相关功能，例如加资源、跳层、生成怪物、清空敌人、显示地图等，不属于通用 Console 规则。如某个项目需要，应在该项目的任务卡或 `DESIGN_HUB/10_OPEN_QUESTIONS.md` 中单独确认。

---

# 10. 当前已确认的设计边界摘要

```text
目标用户：喜欢轻硬核策略、Roguelike、迷宫探索、道具解局的泛玩家。
核心乐趣：每一步都是决策，道具和局势判断比数值碾压更重要。
操作方式：玩家只控制一个角色，在格子迷宫中回合制移动和行动。
核心循环：探索迷宫、遭遇怪物、使用道具解局、管理 HP / 饥饿 / 背包、寻找楼梯、进入下一层。
地图系统：优先做小型固定或半随机迷宫，后续扩展随机房间与通道。
道具系统：道具是核心策略资源，早期先做少量高辨识度道具，后续加入未鉴定、杖、卷轴、壶等内容。
战斗定位：战斗是资源消耗和局势压力，不追求动作操作，不做刷数值碾压。
死亡定位：死亡有代价，但必须可复盘，让玩家理解失败原因并愿意再来一局。
画面原则：清晰格子、清晰主角、清晰怪物、清晰道具、清晰楼梯，画面必须像可操作游戏，不像纯插画。
```

---

# 11. 旧项目归档说明

本仓库曾用于 `kingdom-like` 轻策略探索建造 Demo。自 `2026-05-13 / v0.0` 起，项目方向已由人类制作人确认重定向为 `shiren-like`。旧方向不再继续开发，相关记录保留在 `Docs/Archive/kingdom-like/` 和历史提交中。