# 01_AI_READ_ORDER：AI 阅读顺序

每次新会话、上下文重置或开始新任务前，AI 必须按以下顺序阅读。

---

## 必读顺序

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

---

## NEXT_CODEX_PROMPT 说明

`AI_TASKS/NEXT_CODEX_PROMPT.md` 用于保存下一轮交给 Codex 执行的完整提示词。

当 ChatGPT 长对话过长、网页卡顿或上下文过重时，应将最终确认的 Codex 提示词写入该文件，避免继续在聊天中堆积超长提示词。

Codex 执行任务时，必须读取该文件。

---

## 阅读后必须回复

阅读后，AI 必须先回复：

```text
我已理解当前项目目标、目录结构、设计边界、技术规则和本轮任务约束。
```

然后才能开始修改文件。

---

## 禁止行为

- 不阅读规则就直接改代码；
- 只看当前任务，不看设计边界；
- 忽略 `DESIGN_HUB/09_DECISIONS.md`；
- 忽略 `AI_TASKS/NEXT_CODEX_PROMPT.md`；
- 遇到不明确问题时擅自决定。