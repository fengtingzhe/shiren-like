(() => {
  const CONFIG_URL = "../../Data/config/web_demo_balance.json";
  const DEFAULT_CONFIG = {
    version: "v0.1",
    dungeon: {
      maxFloors: 3,
      width: 15,
      height: 12,
      floors: [
        {
          name: "石苔入口",
          rows: [
            "###############",
            "#@.p..#...p...#",
            "#.###.#.#####.#",
            "#...#...#...#.#",
            "###.#####.#.#.#",
            "#...m.....#...#",
            "#.#####.###.###",
            "#.....#...#...#",
            "#.###.###.#.#.#",
            "#...#..p..#m#s#",
            "#.............#",
            "###############"
          ]
        },
        {
          name: "回廊浅层",
          rows: [
            "###############",
            "#@p.#.....#...#",
            "###.#.###.#.#.#",
            "#...#.#p#...#.#",
            "#.###.#.#####.#",
            "#.....#...m...#",
            "#.#######.###.#",
            "#.#.....#...#.#",
            "#.#.###.###.#.#",
            "#...m.#..p..#s#",
            "#.....#.....#.#",
            "###############"
          ]
        },
        {
          name: "试炼终点",
          rows: [
            "###############",
            "#@.p..#.......#",
            "#.###.#.#####.#",
            "#...#.#...p.#.#",
            "###.#.###.#.#.#",
            "#...#...#.#...#",
            "#.#####.#.###.#",
            "#...m...#...#.#",
            "#.#########.#.#",
            "#...p....m..#s#",
            "#.............#",
            "###############"
          ]
        }
      ]
    },
    player: {
      maxHp: 20,
      attack: 4
    },
    monster: {
      name: "Slime",
      hp: 6,
      attack: 3
    },
    potion: {
      name: "回复药",
      heal: 8
    },
    log: {
      maxEntries: 6
    }
  };

  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const ui = {
    hp: document.getElementById("hp-value"),
    floor: document.getElementById("floor-value"),
    turn: document.getElementById("turn-value"),
    potion: document.getElementById("potion-value"),
    objective: document.getElementById("objective"),
    prompt: document.getElementById("prompt"),
    log: document.getElementById("event-log"),
    potionButton: document.getElementById("potion-button"),
    waitButton: document.getElementById("wait-button"),
    stairsButton: document.getElementById("stairs-button"),
    startOverlay: document.getElementById("start-overlay"),
    start: document.getElementById("start-button"),
    resultOverlay: document.getElementById("result-overlay"),
    resultTitle: document.getElementById("result-title"),
    resultCopy: document.getElementById("result-copy"),
    resultFloor: document.getElementById("result-floor"),
    resultKills: document.getElementById("result-kills"),
    resultPotions: document.getElementById("result-potions"),
    restart: document.getElementById("restart-button"),
    pause: document.getElementById("pause-button"),
    consoleButton: document.getElementById("console-button"),
    consoleClose: document.getElementById("console-close-button"),
    consolePanel: document.getElementById("console-panel"),
    consolePause: document.getElementById("console-pause-button"),
    consoleReset: document.getElementById("console-reset-button"),
    musicToggle: document.getElementById("music-toggle"),
    sfxToggle: document.getElementById("sfx-toggle"),
    fpsToggle: document.getElementById("fps-toggle"),
    fpsReadout: document.getElementById("fps-readout")
  };

  const DIRS = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };

  let config = DEFAULT_CONFIG;
  let state = null;
  let lastFrame = 0;
  let fpsFrameCount = 0;
  let fpsElapsed = 0;
  const view = {
    width: 0,
    height: 0,
    dpr: 1,
    tile: 44,
    originX: 0,
    originY: 0
  };
  const settings = {
    music: true,
    sfx: true,
    showFps: false,
    fps: 0
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  async function loadConfig() {
    try {
      const response = await fetch(CONFIG_URL, { cache: "no-store" });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn("Using built-in shiren-like config fallback.", error);
    }
    return clone(DEFAULT_CONFIG);
  }

  function createState() {
    const nextState = {
      running: false,
      paused: false,
      gameOver: false,
      victory: false,
      floorIndex: 0,
      floor: 1,
      floorName: "",
      width: 0,
      height: 0,
      tiles: [],
      monsters: [],
      potionsOnGround: [],
      stairs: { x: 1, y: 1 },
      player: {
        x: 1,
        y: 1,
        hp: config.player.maxHp,
        maxHp: config.player.maxHp,
        attack: config.player.attack,
        facing: "down",
        hitFlash: 0
      },
      potionCount: 0,
      turn: 0,
      kills: 0,
      potionsUsed: 0,
      messages: [],
      floaters: [],
      deathReason: ""
    };
    state = nextState;
    loadFloor(0);
    addMessage("第 1 层开始。寻找楼梯，别被怪物贴身拖死。");
    return nextState;
  }

  function loadFloor(floorIndex) {
    const floors = config.dungeon.floors && config.dungeon.floors.length ? config.dungeon.floors : DEFAULT_CONFIG.dungeon.floors;
    const floorData = floors[Math.min(floorIndex, floors.length - 1)];
    const rows = floorData.rows;
    const height = rows.length;
    const width = rows[0].length;
    const tiles = [];
    const monsters = [];
    const potionsOnGround = [];
    let playerStart = null;
    let stairs = null;

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const mark = rows[y][x];
        tiles.push(mark === "#" ? "wall" : "floor");
        if (mark === "@") {
          playerStart = { x, y };
        }
        if (mark === "s") {
          stairs = { x, y };
        }
        if (mark === "m") {
          monsters.push(createMonster(x, y, monsters.length));
        }
        if (mark === "p") {
          potionsOnGround.push({ id: `potion_${floorIndex}_${potionsOnGround.length}`, x, y });
        }
      }
    }

    state.floorIndex = floorIndex;
    state.floor = floorIndex + 1;
    state.floorName = floorData.name || `第 ${state.floor} 层`;
    state.width = width;
    state.height = height;
    state.tiles = tiles;
    state.monsters = monsters;
    state.potionsOnGround = potionsOnGround;
    state.stairs = stairs || { x: width - 2, y: height - 2 };
    state.player.x = playerStart ? playerStart.x : 1;
    state.player.y = playerStart ? playerStart.y : 1;
    state.player.facing = "down";
    resizeCanvas();
  }

  function createMonster(x, y, index) {
    return {
      id: `monster_${index}_${Date.now()}`,
      name: config.monster.name,
      x,
      y,
      hp: config.monster.hp,
      maxHp: config.monster.hp,
      attack: config.monster.attack,
      hitFlash: 0
    };
  }

  function getTile(x, y) {
    if (!state || x < 0 || y < 0 || x >= state.width || y >= state.height) {
      return "wall";
    }
    return state.tiles[y * state.width + x];
  }

  function isWalkable(x, y) {
    return getTile(x, y) === "floor";
  }

  function monsterAt(x, y) {
    return state.monsters.find((monster) => monster.x === x && monster.y === y);
  }

  function potionAt(x, y) {
    return state.potionsOnGround.find((potion) => potion.x === x && potion.y === y);
  }

  function isOnStairs() {
    return state.player.x === state.stairs.x && state.player.y === state.stairs.y;
  }

  function manhattan(ax, ay, bx, by) {
    return Math.abs(ax - bx) + Math.abs(ay - by);
  }

  function addMessage(message) {
    if (!state || !message) {
      return;
    }
    if (state.messages[0] !== message) {
      state.messages.unshift(message);
      state.messages = state.messages.slice(0, config.log.maxEntries || 6);
    }
  }

  function addFloater(x, y, text, color = "#f2c85b") {
    state.floaters.push({
      x,
      y,
      text,
      color,
      life: 0.75,
      maxLife: 0.75
    });
  }

  function tryMove(dx, dy) {
    if (!canAct()) {
      return;
    }
    const targetX = state.player.x + dx;
    const targetY = state.player.y + dy;
    state.player.facing = directionName(dx, dy);
    const monster = monsterAt(targetX, targetY);

    if (monster) {
      attackMonster(monster);
      advanceTurn();
      return;
    }

    if (!isWalkable(targetX, targetY)) {
      addMessage("墙挡住了路。");
      updateUi();
      return;
    }

    state.player.x = targetX;
    state.player.y = targetY;
    pickupPotion();
    advanceTurn();
  }

  function directionName(dx, dy) {
    if (dx > 0) {
      return "right";
    }
    if (dx < 0) {
      return "left";
    }
    if (dy < 0) {
      return "up";
    }
    return "down";
  }

  function attackMonster(monster) {
    monster.hp -= state.player.attack;
    monster.hitFlash = 0.25;
    addFloater(monster.x, monster.y, `-${state.player.attack}`, "#df6657");
    addMessage(`你攻击 ${monster.name}，造成 ${state.player.attack} 点伤害。`);
    if (monster.hp <= 0) {
      state.monsters = state.monsters.filter((item) => item !== monster);
      state.kills += 1;
      addMessage(`${monster.name} 被击败。`);
    }
  }

  function pickupPotion() {
    const potion = potionAt(state.player.x, state.player.y);
    if (!potion) {
      return;
    }
    state.potionsOnGround = state.potionsOnGround.filter((item) => item !== potion);
    state.potionCount += 1;
    addFloater(state.player.x, state.player.y, "+药", "#f2c85b");
    addMessage(`捡到 ${config.potion.name}。`);
  }

  function usePotion() {
    if (!canAct()) {
      return;
    }
    if (state.potionCount <= 0) {
      addMessage("没有回复药。");
      updateUi();
      return;
    }
    if (state.player.hp >= state.player.maxHp) {
      addMessage("HP 已满，先把回复药留着。");
      updateUi();
      return;
    }
    const before = state.player.hp;
    state.player.hp = Math.min(state.player.maxHp, state.player.hp + config.potion.heal);
    state.potionCount -= 1;
    state.potionsUsed += 1;
    addFloater(state.player.x, state.player.y, `+${state.player.hp - before}`, "#6fc38b");
    addMessage(`使用 ${config.potion.name}，恢复 ${state.player.hp - before} HP。`);
    advanceTurn();
  }

  function waitTurn() {
    if (!canAct()) {
      return;
    }
    addMessage("你停下脚步，观察怪物动向。");
    advanceTurn();
  }

  function descendStairs() {
    if (!canAct()) {
      return;
    }
    if (!isOnStairs()) {
      addMessage("脚下没有楼梯。");
      updateUi();
      return;
    }

    state.turn += 1;
    if (state.floor >= config.dungeon.maxFloors) {
      finishGame(true, "你穿过第 3 层终点，完成了最小迷宫挑战。");
      return;
    }

    const nextFloor = state.floorIndex + 1;
    loadFloor(nextFloor);
    addMessage(`进入第 ${state.floor} 层：${state.floorName}。`);
    updateUi();
  }

  function advanceTurn() {
    state.turn += 1;
    monstersAct();
    updateUi();
    if (!state.gameOver) {
      checkLowHp();
    }
  }

  function monstersAct() {
    const actingMonsters = [...state.monsters];
    for (const monster of actingMonsters) {
      if (state.gameOver || !state.monsters.includes(monster)) {
        continue;
      }
      if (manhattan(monster.x, monster.y, state.player.x, state.player.y) === 1) {
        monsterAttack(monster);
        continue;
      }
      moveMonster(monster);
    }
  }

  function monsterAttack(monster) {
    state.player.hp = Math.max(0, state.player.hp - monster.attack);
    state.player.hitFlash = 0.25;
    addFloater(state.player.x, state.player.y, `-${monster.attack}`, "#df6657");
    addMessage(`${monster.name} 攻击你，造成 ${monster.attack} 点伤害。`);
    if (state.player.hp <= 0) {
      state.deathReason = `被 ${monster.name} 击败，HP 归零。`;
      finishGame(false, state.deathReason);
    }
  }

  function moveMonster(monster) {
    const candidates = monsterStepCandidates(monster);
    const step = candidates.find((candidate) => canMonsterMoveTo(candidate.x, candidate.y, monster));
    if (!step) {
      return;
    }
    monster.x = step.x;
    monster.y = step.y;
  }

  function monsterStepCandidates(monster) {
    const dx = Math.sign(state.player.x - monster.x);
    const dy = Math.sign(state.player.y - monster.y);
    const primaryX = { x: monster.x + dx, y: monster.y };
    const primaryY = { x: monster.x, y: monster.y + dy };
    const candidates = [];

    if (Math.abs(state.player.x - monster.x) >= Math.abs(state.player.y - monster.y)) {
      if (dx !== 0) {
        candidates.push(primaryX);
      }
      if (dy !== 0) {
        candidates.push(primaryY);
      }
    } else {
      if (dy !== 0) {
        candidates.push(primaryY);
      }
      if (dx !== 0) {
        candidates.push(primaryX);
      }
    }

    candidates.push(
      { x: monster.x + 1, y: monster.y },
      { x: monster.x - 1, y: monster.y },
      { x: monster.x, y: monster.y + 1 },
      { x: monster.x, y: monster.y - 1 }
    );

    return candidates
      .filter((candidate, index, list) => list.findIndex((item) => item.x === candidate.x && item.y === candidate.y) === index)
      .sort((a, b) => manhattan(a.x, a.y, state.player.x, state.player.y) - manhattan(b.x, b.y, state.player.x, state.player.y));
  }

  function canMonsterMoveTo(x, y, self) {
    if (!isWalkable(x, y)) {
      return false;
    }
    if (state.player.x === x && state.player.y === y) {
      return false;
    }
    return !state.monsters.some((monster) => monster !== self && monster.x === x && monster.y === y);
  }

  function checkLowHp() {
    if (state.player.hp > 0 && state.player.hp <= 5) {
      addMessage("HP 很低，考虑使用回复药或拉开距离。");
      updateUi();
    }
  }

  function canAct() {
    return Boolean(state && state.running && !state.paused && !state.gameOver);
  }

  function finishGame(victory, copy) {
    if (!state || state.gameOver) {
      return;
    }
    state.gameOver = true;
    state.victory = victory;
    state.running = false;
    ui.resultTitle.textContent = victory ? "胜利" : "死亡";
    ui.resultCopy.textContent = copy;
    ui.resultFloor.textContent = `${state.floor}F`;
    ui.resultKills.textContent = String(state.kills);
    ui.resultPotions.textContent = String(state.potionsUsed);
    ui.resultOverlay.classList.remove("is-hidden");
    updateUi();
  }

  function getObjective() {
    if (!state.running && !state.gameOver) {
      return "目标：开始 Demo，进入 3 层最小迷宫挑战。";
    }
    if (state.gameOver) {
      return state.victory ? "目标完成：你抵达了第 3 层终点。" : "挑战失败：复盘原因，再来一局。";
    }
    if (isOnStairs()) {
      return state.floor >= config.dungeon.maxFloors ? "目标：按 E / Enter 进入终点并胜利。" : "目标：按 E / Enter 下楼，进入下一层。";
    }
    if (state.monsters.some((monster) => manhattan(monster.x, monster.y, state.player.x, state.player.y) === 1)) {
      return "目标：怪物贴身了。移动方向可以攻击，也可以用药或走位。";
    }
    return "目标：探索迷宫，找楼梯，必要时用回复药保命。";
  }

  function updateUi() {
    if (!state) {
      return;
    }
    ui.hp.textContent = `${state.player.hp} / ${state.player.maxHp}`;
    ui.hp.style.color = state.player.hp <= 5 ? "#df6657" : "#6fc38b";
    ui.floor.textContent = `${state.floor}F`;
    ui.turn.textContent = `Turn ${state.turn}`;
    ui.potion.textContent = String(state.potionCount);
    ui.objective.textContent = getObjective();
    ui.log.innerHTML = state.messages.map((message) => `<div>${escapeHtml(message)}</div>`).join("");

    if (isOnStairs() && state.running && !state.paused) {
      ui.prompt.classList.remove("is-hidden");
      ui.prompt.textContent = state.floor >= config.dungeon.maxFloors ? "楼梯通向终点。按 E / Enter 完成挑战。" : "站在楼梯上。按 E / Enter 进入下一层。";
    } else {
      ui.prompt.classList.add("is-hidden");
    }

    ui.potionButton.disabled = !state.running || state.paused || state.gameOver || state.potionCount <= 0 || state.player.hp >= state.player.maxHp;
    ui.waitButton.disabled = !state.running || state.paused || state.gameOver;
    ui.stairsButton.disabled = !state.running || state.paused || state.gameOver || !isOnStairs();
    ui.pause.setAttribute("aria-label", state.paused ? "resume" : "pause");
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    view.width = rect.width;
    view.height = rect.height;
    view.dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.floor(rect.width * view.dpr);
    canvas.height = Math.floor(rect.height * view.dpr);
    ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);

    const mapWidth = state ? state.width : config.dungeon.width;
    const mapHeight = state ? state.height : config.dungeon.height;
    const topGap = rect.width <= 760 ? 178 : 122;
    const bottomGap = rect.width <= 760 ? 170 : 124;
    const availableW = Math.max(320, rect.width - 48);
    const availableH = Math.max(260, rect.height - topGap - bottomGap);
    view.tile = Math.floor(Math.max(26, Math.min(54, availableW / mapWidth, availableH / mapHeight)));
    view.originX = Math.floor((rect.width - mapWidth * view.tile) / 2);
    view.originY = Math.floor(topGap + (availableH - mapHeight * view.tile) / 2);
  }

  function tileToScreen(x, y) {
    return {
      x: view.originX + x * view.tile,
      y: view.originY + y * view.tile
    };
  }

  function screenToTile(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor((clientX - rect.left - view.originX) / view.tile),
      y: Math.floor((clientY - rect.top - view.originY) / view.tile)
    };
  }

  function updateAnimations(dt) {
    if (!state) {
      return;
    }
    state.floaters.forEach((floater) => {
      floater.life -= dt;
      floater.y -= dt * 0.8;
    });
    state.floaters = state.floaters.filter((floater) => floater.life > 0);
    state.player.hitFlash = Math.max(0, state.player.hitFlash - dt);
    state.monsters.forEach((monster) => {
      monster.hitFlash = Math.max(0, monster.hitFlash - dt);
    });
  }

  function render() {
    ctx.clearRect(0, 0, view.width, view.height);
    drawBackground();
    if (!state) {
      return;
    }
    drawMap();
    drawFloaters();
    if (state.paused && state.running) {
      drawPaused();
    }
  }

  function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, view.height);
    gradient.addColorStop(0, "#18232a");
    gradient.addColorStop(0.52, "#11181c");
    gradient.addColorStop(1, "#0c0f12");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, view.width, view.height);
  }

  function drawMap() {
    drawTiles();
    drawStairs();
    drawPotions();
    drawMonsters();
    drawPlayer();
  }

  function drawTiles() {
    for (let y = 0; y < state.height; y += 1) {
      for (let x = 0; x < state.width; x += 1) {
        drawTile(x, y, getTile(x, y));
      }
    }
  }

  function drawTile(x, y, tile) {
    const p = tileToScreen(x, y);
    const size = view.tile;
    ctx.fillStyle = tile === "wall" ? "#2d3b46" : "#52634c";
    ctx.fillRect(p.x, p.y, size, size);
    ctx.strokeStyle = tile === "wall" ? "rgba(127, 183, 215, 0.18)" : "rgba(247, 241, 227, 0.12)";
    ctx.lineWidth = 1;
    ctx.strokeRect(p.x + 0.5, p.y + 0.5, size - 1, size - 1);

    if (tile === "wall") {
      ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
      ctx.fillRect(p.x + 4, p.y + size - 8, size - 8, 4);
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fillRect(p.x + 4, p.y + 4, size - 8, 3);
      return;
    }

    ctx.fillStyle = "rgba(11, 15, 14, 0.12)";
    ctx.fillRect(p.x + size * 0.18, p.y + size * 0.72, size * 0.28, 2);
    ctx.fillRect(p.x + size * 0.58, p.y + size * 0.28, size * 0.2, 2);
  }

  function drawStairs() {
    const p = tileToScreen(state.stairs.x, state.stairs.y);
    const size = view.tile;
    const cx = p.x + size / 2;
    const cy = p.y + size / 2;
    ctx.fillStyle = "rgba(242, 200, 91, 0.18)";
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.42, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#f2c85b";
    ctx.lineWidth = 3;
    for (let index = 0; index < 4; index += 1) {
      const y = cy - size * 0.2 + index * size * 0.12;
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.24 + index * 2, y);
      ctx.lineTo(cx + size * 0.24 - index * 2, y);
      ctx.stroke();
    }
  }

  function drawPotions() {
    state.potionsOnGround.forEach((potion) => {
      const p = tileToScreen(potion.x, potion.y);
      const size = view.tile;
      const cx = p.x + size / 2;
      const cy = p.y + size / 2;
      ctx.fillStyle = "rgba(111, 195, 139, 0.18)";
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.28, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#6fc38b";
      ctx.fillRect(cx - size * 0.12, cy - size * 0.08, size * 0.24, size * 0.24);
      ctx.fillStyle = "#c9f2d4";
      ctx.fillRect(cx - size * 0.08, cy - size * 0.2, size * 0.16, size * 0.12);
      ctx.strokeStyle = "#10231a";
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - size * 0.12, cy - size * 0.08, size * 0.24, size * 0.24);
    });
  }

  function drawMonsters() {
    state.monsters.forEach((monster) => {
      const p = tileToScreen(monster.x, monster.y);
      const size = view.tile;
      const cx = p.x + size / 2;
      const cy = p.y + size / 2;
      ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
      ctx.beginPath();
      ctx.ellipse(cx, cy + size * 0.18, size * 0.26, size * 0.11, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = monster.hitFlash > 0 ? "#ffffff" : "#9b5ad7";
      ctx.beginPath();
      ctx.ellipse(cx, cy + size * 0.03, size * 0.28, size * 0.24, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#21132d";
      ctx.beginPath();
      ctx.arc(cx - size * 0.09, cy - size * 0.02, size * 0.035, 0, Math.PI * 2);
      ctx.arc(cx + size * 0.09, cy - size * 0.02, size * 0.035, 0, Math.PI * 2);
      ctx.fill();
      drawBar(cx, p.y + size * 0.08, size * 0.58, monster.hp, monster.maxHp, "#df6657");
    });
  }

  function drawPlayer() {
    const p = tileToScreen(state.player.x, state.player.y);
    const size = view.tile;
    const cx = p.x + size / 2;
    const cy = p.y + size / 2;
    ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
    ctx.beginPath();
    ctx.ellipse(cx, cy + size * 0.24, size * 0.28, size * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = state.player.hitFlash > 0 ? "#ffffff" : "#4f86c8";
    ctx.beginPath();
    ctx.roundRect(cx - size * 0.18, cy - size * 0.08, size * 0.36, size * 0.32, 6);
    ctx.fill();
    ctx.fillStyle = "#e5bc82";
    ctx.beginPath();
    ctx.arc(cx, cy - size * 0.18, size * 0.14, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#f7f1e3";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - size * 0.22, cy + size * 0.22);
    ctx.lineTo(cx + size * 0.22, cy + size * 0.22);
    ctx.stroke();
    drawFacingCue(cx, cy, size);
    drawBar(cx, p.y + size * 0.05, size * 0.64, state.player.hp, state.player.maxHp, "#6fc38b");
  }

  function drawFacingCue(cx, cy, size) {
    const offsets = {
      up: [0, -1],
      down: [0, 1],
      left: [-1, 0],
      right: [1, 0]
    };
    const [dx, dy] = offsets[state.player.facing] || offsets.down;
    ctx.strokeStyle = "#f2c85b";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + dx * size * 0.24, cy + dy * size * 0.24);
    ctx.stroke();
  }

  function drawBar(cx, y, width, value, maxValue, color) {
    const ratio = Math.max(0, Math.min(1, value / maxValue));
    ctx.fillStyle = "rgba(0, 0, 0, 0.48)";
    ctx.fillRect(cx - width / 2, y, width, 5);
    ctx.fillStyle = color;
    ctx.fillRect(cx - width / 2, y, width * ratio, 5);
  }

  function drawFloaters() {
    state.floaters.forEach((floater) => {
      const p = tileToScreen(floater.x, floater.y);
      const ratio = Math.max(0, floater.life / floater.maxLife);
      ctx.globalAlpha = ratio;
      ctx.fillStyle = floater.color;
      ctx.font = "700 15px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(floater.text, p.x + view.tile / 2, p.y + view.tile * 0.18 - (1 - ratio) * 18);
      ctx.globalAlpha = 1;
    });
  }

  function drawPaused() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.48)";
    ctx.fillRect(0, 0, view.width, view.height);
    ctx.fillStyle = "#f7f1e3";
    ctx.font = "700 26px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("暂停", view.width / 2, view.height / 2);
  }

  function startGame() {
    state = createState();
    state.running = true;
    ui.startOverlay.classList.add("is-hidden");
    ui.resultOverlay.classList.add("is-hidden");
    updateUi();
  }

  function restartGame() {
    state = createState();
    state.running = true;
    ui.startOverlay.classList.add("is-hidden");
    ui.resultOverlay.classList.add("is-hidden");
    updateUi();
  }

  function togglePause() {
    if (!state || state.gameOver) {
      return;
    }
    state.paused = !state.paused;
    updateUi();
  }

  function setConsoleOpen(open) {
    ui.consolePanel.classList.toggle("is-open", open);
    ui.consolePanel.setAttribute("aria-hidden", open ? "false" : "true");
    ui.consoleButton.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function bindEvents() {
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("keydown", (event) => {
      if (event.repeat && event.code !== "Space") {
        return;
      }
      const handled = handleKey(event.code);
      if (handled) {
        event.preventDefault();
      }
    });
    canvas.addEventListener("pointerdown", (event) => {
      if (!canAct()) {
        return;
      }
      const tile = screenToTile(event.clientX, event.clientY);
      const dx = tile.x - state.player.x;
      const dy = tile.y - state.player.y;
      if (Math.abs(dx) + Math.abs(dy) === 1) {
        tryMove(dx, dy);
        return;
      }
      addMessage("点击相邻格移动或攻击。");
      updateUi();
    });
    document.querySelectorAll("[data-direction]").forEach((button) => {
      button.addEventListener("click", () => {
        const dir = DIRS[button.dataset.direction];
        tryMove(dir.x, dir.y);
      });
    });
    ui.potionButton.addEventListener("click", usePotion);
    ui.waitButton.addEventListener("click", waitTurn);
    ui.stairsButton.addEventListener("click", descendStairs);
    ui.start.addEventListener("click", startGame);
    ui.restart.addEventListener("click", restartGame);
    ui.pause.addEventListener("click", togglePause);
    ui.consolePause.addEventListener("click", togglePause);
    ui.consoleReset.addEventListener("click", restartGame);
    ui.consoleButton.addEventListener("click", () => {
      setConsoleOpen(!ui.consolePanel.classList.contains("is-open"));
    });
    ui.consoleClose.addEventListener("click", () => {
      setConsoleOpen(false);
    });
    ui.musicToggle.addEventListener("change", (event) => {
      settings.music = event.target.checked;
    });
    ui.sfxToggle.addEventListener("change", (event) => {
      settings.sfx = event.target.checked;
    });
    ui.fpsToggle.addEventListener("change", (event) => {
      settings.showFps = event.target.checked;
      ui.fpsReadout.classList.toggle("is-hidden", !settings.showFps);
    });
  }

  function handleKey(code) {
    if (code === "Escape") {
      togglePause();
      return true;
    }
    if (code === "KeyW" || code === "ArrowUp") {
      tryMove(0, -1);
      return true;
    }
    if (code === "KeyS" || code === "ArrowDown") {
      tryMove(0, 1);
      return true;
    }
    if (code === "KeyA" || code === "ArrowLeft") {
      tryMove(-1, 0);
      return true;
    }
    if (code === "KeyD" || code === "ArrowRight") {
      tryMove(1, 0);
      return true;
    }
    if (code === "KeyH") {
      usePotion();
      return true;
    }
    if (code === "Space" || code === "Period") {
      waitTurn();
      return true;
    }
    if (code === "KeyE" || code === "Enter") {
      descendStairs();
      return true;
    }
    return false;
  }

  function updateFps(dt) {
    fpsFrameCount += 1;
    fpsElapsed += dt;
    if (fpsElapsed >= 0.5) {
      settings.fps = Math.round(fpsFrameCount / fpsElapsed);
      fpsFrameCount = 0;
      fpsElapsed = 0;
      if (settings.showFps) {
        ui.fpsReadout.textContent = `FPS ${settings.fps}`;
      }
    }
  }

  function frame(now) {
    if (!lastFrame) {
      lastFrame = now;
    }
    const dt = Math.min(0.05, (now - lastFrame) / 1000);
    lastFrame = now;
    updateAnimations(dt);
    updateFps(dt);
    render();
    requestAnimationFrame(frame);
  }

  async function init() {
    config = await loadConfig();
    createState();
    resizeCanvas();
    bindEvents();
    updateUi();
    requestAnimationFrame(frame);
  }

  init();
})();
