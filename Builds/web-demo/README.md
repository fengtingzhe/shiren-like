# shiren-like Web Demo

当前版本：`v0.4.3 / 玩家中心镜头 + Console 视野调参版`

这一版不新增玩法系统，只修正镜头策略并开放实时调参。主画面不再把房间中心当作主镜头目标，而是改成《风来的西林》式的玩家中心镜头：玩家在房间内和走廊内都会保持在主画面中心附近，只有接近地图边缘时才会被边界限制。右上角小地图继续承担整层结构总览。

## 运行方式

在项目根目录执行：

```text
node Tools/web-demo-server.mjs
```

然后打开：

```text
http://127.0.0.1:4173/Builds/web-demo/
```

也可以直接运行：

```text
Tools/run-web-demo.bat
```

## v0.4.3 本轮改动

- 主镜头改为玩家中心镜头
- 不再使用房间中心作为主镜头目标
- 主画面只负责玩家周围局部战术区域
- 小地图继续显示整层地图、玩家、楼梯、怪物和道具
- 在 Console 中新增 `Camera / View` 调参区
- 可实时调整：
  - `tileW`
  - `tileH`
  - `yScale`
  - `rowStep`
  - `perspectiveOffset`
  - `tileDepth`
  - `cameraZoom`
  - `cameraCenterOffsetX`
  - `cameraCenterOffsetY`
- 调参后画面立即刷新，不需要重开或重生楼层
- 支持重置镜头参数
- 支持复制当前镜头参数 JSON，方便回传给 Codex 固化

## 当前默认镜头参数

```json
{
  "tileW": 104,
  "tileH": 104,
  "yScale": 0.72,
  "rowStep": 75,
  "perspectiveOffset": 2,
  "tileDepth": 22,
  "cameraZoom": 1,
  "cameraCenterOffsetX": 0,
  "cameraCenterOffsetY": 0
}
```

## 当前操作

- `WASD` 或方向键：移动 / 邻接攻击
- `Space`：原地等待
- `E` 或 `Enter`：站在楼梯上时下楼
- `H`：使用回复药
- `F`：使用食物
- `T`：使用传送卷轴
- `Z`：使用睡眠卷轴
- `R`：使用火球杖
- `X`：使用换位杖
- `Console`：打开镜头与调试面板

## 保留中的系统

- 传统轻斜俯视镜头与矩形格方向映射
- 每层随机房间与走廊
- 房间尺寸 `3x3` 到 `10x10`
- 每个非出生房间至少 1 只怪物
- 每次下楼重新生成地图
- 饱腹度、饥饿伤害与食物恢复
- 回复药、传送卷轴、睡眠卷轴、火球杖、换位杖
- 怪物追击、邻接攻击、HP 归零失败、3 层通关
- 左上状态区、右上小地图、右侧敌人面板、底部快捷栏、Console

## 本轮仍未加入

- 新怪物机制
- 远程怪、爆弹怪、隔格攻击怪
- 未鉴定、装备、陷阱、怪物屋、壶、商店、据点、Boss
- Godot 工程
