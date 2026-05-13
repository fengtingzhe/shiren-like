# shiren-like Web Demo

当前版本：`v0.7 / 装备与数值成长版`

这一轮的目标是把 Web Demo 从“只有消耗品”推进到“开始有装备取舍”。现在玩家可以在地牢里遇到武器和盾牌，站到装备格上后按 `C` 装备或替换，装备会直接影响攻击和防御。

## 当前系统

- 随机房间与走廊
- 玩家中心镜头
- `Console / Camera / View` 调参
- 饥饿与饱腹度
- 小地图、敌人面板、底部快捷栏
- 四种怪物
  - `Slime`
  - `Goblin Archer`
  - `Sleep Mushroom`
  - `Skeleton Spearman`
- 三种陷阱
  - `Spike Trap`
  - `Warp Trap`
  - `Sleep Trap`
- 一种危险地形
  - `Poison Pool`
- 六种消耗道具
  - 恢复药
  - 食物
  - 传送卷轴
  - 睡眠卷轴
  - 火球杖
  - 换位杖

## v0.7 新增内容

### 装备位

- `weapon`
- `shield`

### 装备列表

- `Short Sword`
  - `ATK +1`
- `Spear`
  - `ATK +2`
- `Wooden Shield`
  - `DEF +1`
- `Iron Shield`
  - `DEF +2`

### 交互规则

- 消耗品仍然是走上去自动拾取
- 装备不会自动拾取
- 站在装备上时，按 `C` 才会装备或替换
- 装备/替换会推进 1 回合
- 如果当前槽位已有装备，替换时旧装备会掉回脚下

### 数值规则

- 玩家攻击力 = 基础攻击 + 武器加成
- 玩家防御力 = 基础防御 + 盾牌加成
- 怪物攻击现在会先扣掉防御，再结算伤害
- 为了避免完全无伤，怪物命中后的最低伤害仍然是 `1`
- 陷阱和 `Poison Pool` 仍然走固定伤害，不吃防御减免

### 显示规则

- HUD 新增 `ATK / DEF`
- HUD 新增当前 `武器 / 盾牌`
- 站在装备上时，底部提示会明确告诉玩家按 `C`
- 装备也会显示在主画面和小地图上

## 运行

在项目根目录运行：

```text
node Tools/web-demo-server.mjs
```

然后打开：

```text
http://127.0.0.1:4173/Builds/web-demo/
```

也可以直接运行：

```text
Tools/run-web-demo-vite.bat
```

默认会打开：

```text
http://127.0.0.1:5173/Builds/web-demo/
```

## 本轮仍未加入

- 未鉴定
- 背包容量
- 投掷
- 怪物屋
- 壶
- 商店
- 据点
- Boss
- Godot 工程
