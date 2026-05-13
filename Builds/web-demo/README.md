# shiren-like Web Demo

当前版本：v0.0 / 项目重定向版

## 当前状态

当前 Web Demo 正在从旧 `kingdom-like` 原型重定向为 `shiren-like`。

v0.0 只更新项目方向、设计文档、任务记录和下一轮开发提示词。

当前 `Builds/web-demo/game.js` 仍可能保留旧 kingdom-like 占位逻辑，不代表新项目玩法。

---

## 下一版目标

下一版为：

```text
Web Demo v0.1 / 最小可玩迷宫版
```

v0.1 将实现：

- 格子迷宫；
- 回合制移动；
- 1 种怪物；
- 普通攻击；
- 1 种回复药；
- 楼梯和下楼；
- HP、楼层、行动日志；
- 到达第 3 层胜利；
- HP 为 0 失败。

---

## 运行方式

在项目根目录运行：

```text
node Tools/web-demo-server.mjs
```

然后打开：

```text
http://127.0.0.1:4173/Builds/web-demo/
```

也可以双击：

```text
Tools/run-web-demo.bat
```

---

## v0.1 明确不做

- 不做饥饿；
- 不做完整背包；
- 不做未鉴定；
- 不做装备；
- 不做陷阱；
- 不做怪物屋；
- 不做壶；
- 不做商店；
- 不做据点；
- 不做 Godot 工程；
- 不继续开发旧 kingdom-like 的金币、砍树、建墙、建塔、夜晚防守玩法。