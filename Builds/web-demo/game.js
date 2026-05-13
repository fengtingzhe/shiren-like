(() => {
  const CONFIG_URL = "../../Data/config/web_demo_balance.json";
  const DEFAULT_CONFIG = {
    economy: {
      startingGold: 8,
      treeCost: 1,
      wallCost: 2,
      towerCost: 3,
      landmarkCost: 6,
      recruitCost: 1,
      chestMin: 3,
      chestMax: 5,
      dayIncomePerArcher: 1,
      landmarkDailyIncome: 2
    },
    timing: {
      daySeconds: 75,
      duskSeconds: 15,
      nightSeconds: 24
    },
    player: {
      speed: 2.65,
      forestSpeedMultiplier: 0.68,
      interactRadius: 0.92
    },
    workers: {
      initialWorkers: 1,
      initialArchers: 1,
      moveSpeed: 1.72,
      treeChopSeconds: 2.8,
      buildSeconds: 3.4
    },
    combat: {
      campHp: 14,
      wallHp: 8,
      enemyHp: 4,
      enemySpeed: 0.8,
      enemyDamage: 1,
      enemyAttackSeconds: 1.25,
      enemySpawnSeconds: 6,
      towerRange: 3.4,
      towerDamage: 2,
      towerFireSeconds: 1.35,
      archerRange: 2.7,
      archerDamage: 1,
      archerFireSeconds: 1.55
    },
    level: {
      width: 13,
      height: 9,
      camp: [5, 4],
      initialClearedRadius: 2,
      features: [
        { id: "west_chest", type: "chest", x: 2, y: 2 },
        { id: "lost_vagrant", type: "vagrant", x: 3, y: 6 },
        { id: "east_wall", type: "wall", x: 7, y: 4 },
        { id: "north_tower", type: "tower", x: 8, y: 3 },
        { id: "old_landmark", type: "landmark", x: 10, y: 4 },
        { id: "danger_trace", type: "danger", x: 11, y: 6 }
      ]
    }
  };

  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const ui = {
    gold: document.getElementById("gold-value"),
    day: document.getElementById("day-value"),
    phase: document.getElementById("phase-value"),
    phaseDot: document.getElementById("phase-dot"),
    objective: document.getElementById("objective"),
    prompt: document.getElementById("prompt"),
    action: document.getElementById("action-button"),
    actionLabel: document.getElementById("action-label"),
    log: document.getElementById("event-log"),
    startOverlay: document.getElementById("start-overlay"),
    start: document.getElementById("start-button"),
    resultOverlay: document.getElementById("result-overlay"),
    resultTitle: document.getElementById("result-title"),
    resultCopy: document.getElementById("result-copy"),
    restart: document.getElementById("restart-button"),
    pause: document.getElementById("pause-button"),
    consoleButton: document.getElementById("console-button"),
    consoleClose: document.getElementById("console-close-button"),
    consolePanel: document.getElementById("console-panel"),
    cameraZoomSlider: document.getElementById("camera-zoom-slider"),
    cameraZoomValue: document.getElementById("camera-zoom-value")
  };

  let config = DEFAULT_CONFIG;
  let state = null;
  let lastFrame = 0;
  const settings = {
    cameraZoom: 1.2
  };
  const keys = new Set();
  const view = {
    width: 0,
    height: 0,
    dpr: 1,
    tileW: 90,
    tileH: 46,
    originX: 0,
    originY: 0
  };

  const PHASE_COPY = {
    day: "白天",
    dusk: "黄昏",
    night: "夜晚"
  };

  const PHASE_COLOR = {
    day: "#7ec37a",
    dusk: "#e7a15d",
    night: "#88a7ff"
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
      console.warn("Using built-in config fallback.", error);
    }
    return clone(DEFAULT_CONFIG);
  }

  function keyOf(x, y) {
    return `${x},${y}`;
  }

  function createState() {
    const [campX, campY] = config.level.camp;
    const tiles = [];
    const featureMap = new Map();
    const featureList = config.level.features.map((feature) => ({
      ...feature,
      discovered: false,
      built: false,
      opened: false,
      recruited: false,
      hp: 0,
      level: 0
    }));

    featureList.forEach((feature) => {
      featureMap.set(keyOf(feature.x, feature.y), feature);
    });

    for (let y = 0; y < config.level.height; y += 1) {
      for (let x = 0; x < config.level.width; x += 1) {
        const dist = Math.abs(x - campX) + Math.abs(y - campY);
        tiles.push({
          x,
          y,
          state: dist <= config.level.initialClearedRadius ? "cleared" : "forest",
          flash: 0
        });
      }
    }

    const workers = [];
    for (let index = 0; index < config.workers.initialWorkers; index += 1) {
      workers.push({
        id: `worker_${index}`,
        x: campX + 0.35 + index * 0.18,
        y: campY + 0.72,
        state: "idle",
        isRecruit: false,
        order: null,
        progress: 0,
        targetX: campX + 0.5,
        targetY: campY + 0.5
      });
    }

    return {
      running: false,
      paused: false,
      gameOver: false,
      victory: false,
      tiles,
      featureMap,
      features: featureList,
      camp: { x: campX, y: campY, hp: config.combat.campHp, maxHp: config.combat.campHp },
      player: { x: campX + 0.5, y: campY + 0.5, destination: null, facing: 1 },
      workers,
      archers: config.workers.initialArchers,
      enemies: [],
      particles: [],
      messages: ["营火仍然安全，森林边界等待清理。"],
      gold: config.economy.startingGold,
      day: 1,
      phase: "day",
      phaseTime: 0,
      spawnTimer: 1.2,
      towerTimer: 0.5,
      archerTimer: 0.7,
      interaction: null,
      landmarkRepaired: false,
      finalNightArmed: false,
      firstTreeCleared: false,
      treeClearObjectiveTimer: 0,
      clearedCountAtStart: tiles.filter((tile) => tile.state === "cleared").length
    };
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    view.width = rect.width;
    view.height = rect.height;
    view.dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.floor(rect.width * view.dpr);
    canvas.height = Math.floor(rect.height * view.dpr);
    ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
    const baseTileW = Math.max(62, Math.min(96, rect.width / 11.8, rect.height / 6.4));
    view.tileW = baseTileW;
    view.tileH = view.tileW * 0.52;
    view.originX = rect.width * 0.5;
    view.originY = Math.max(92, rect.height * 0.13);
  }

  function project(x, y, z = 0) {
    return {
      x: (x - y) * (view.tileW / 2) + view.originX,
      y: (x + y) * (view.tileH / 2) + view.originY - z
    };
  }

  function screenToTile(clientX, clientY) {
    const world = screenToWorld(clientX, clientY);
    const dx = (world.x - view.originX) / (view.tileW / 2);
    const dy = (world.y - view.originY) / (view.tileH / 2);
    return {
      x: clamp((dy + dx) / 2, 0.05, config.level.width - 0.05),
      y: clamp((dy - dx) / 2, 0.05, config.level.height - 0.05)
    };
  }

  function getCameraFocus() {
    if (!state || !state.player) {
      return project(config.level.width * 0.5, config.level.height * 0.5);
    }
    return project(state.player.x, state.player.y, 0);
  }

  function screenToWorld(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const sx = clientX - rect.left;
    const sy = clientY - rect.top;
    const focus = getCameraFocus();
    return {
      x: (sx - view.width * 0.5) / settings.cameraZoom + focus.x,
      y: (sy - view.height * 0.5) / settings.cameraZoom + focus.y
    };
  }

  function worldToScreen(point) {
    const focus = getCameraFocus();
    return {
      x: (point.x - focus.x) * settings.cameraZoom + view.width * 0.5,
      y: (point.y - focus.y) * settings.cameraZoom + view.height * 0.5
    };
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function distance(ax, ay, bx, by) {
    return Math.hypot(ax - bx, ay - by);
  }

  function getTile(x, y) {
    if (!state || x < 0 || y < 0 || x >= config.level.width || y >= config.level.height) {
      return null;
    }
    return state.tiles[y * config.level.width + x];
  }

  function tileAtPosition(x, y) {
    return getTile(Math.floor(x), Math.floor(y));
  }

  function eachNeighbor(tile, callback) {
    const offsets = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ];
    offsets.forEach(([dx, dy]) => {
      const neighbor = getTile(tile.x + dx, tile.y + dy);
      if (neighbor) {
        callback(neighbor);
      }
    });
  }

  function isBorderForest(tile) {
    if (!tile || tile.state !== "forest") {
      return false;
    }
    let border = false;
    eachNeighbor(tile, (neighbor) => {
      if (neighbor.state === "cleared") {
        border = true;
      }
    });
    return border;
  }

  function isTileControlled(tile) {
    return Boolean(tile && tile.state === "cleared");
  }

  function featureVisible(feature) {
    const tile = getTile(feature.x, feature.y);
    if (!tile) {
      return false;
    }
    if (tile.state === "cleared" || feature.discovered || feature.built) {
      return true;
    }
    if (feature.type === "landmark" || feature.type === "danger") {
      return distance(state.player.x, state.player.y, feature.x + 0.5, feature.y + 0.5) < 3.2;
    }
    return distance(state.player.x, state.player.y, feature.x + 0.5, feature.y + 0.5) < 2;
  }

  function updateDiscovery() {
    state.features.forEach((feature) => {
      const tile = getTile(feature.x, feature.y);
      if (!tile) {
        return;
      }
      const nearPlayer = distance(state.player.x, state.player.y, feature.x + 0.5, feature.y + 0.5) < 2.25;
      if (nearPlayer || tile.state === "cleared") {
        if (!feature.discovered && feature.type !== "danger") {
          addMessage(getDiscoveryMessage(feature));
        }
        feature.discovered = true;
      }
    });
  }

  function getDiscoveryMessage(feature) {
    switch (feature.type) {
      case "chest":
        return "你在树影里发现了一个宝箱。";
      case "vagrant":
        return "远处有流民营火，可以用金币招募。";
      case "wall":
        return "清理后的空地露出木墙节点。";
      case "tower":
        return "你发现了可建哨塔的高地。";
      case "landmark":
        return "森林深处有旧地标，需要把边界推过去。";
      default:
        return "前方出现新的探索线索。";
    }
  }

  function getInteraction() {
    if (!state || state.gameOver) {
      return null;
    }
    const candidates = [];
    const radius = config.player.interactRadius;

    state.features.forEach((feature) => {
      const tile = getTile(feature.x, feature.y);
      if (!tile || !featureVisible(feature)) {
        return;
      }
      const dist = distance(state.player.x, state.player.y, feature.x + 0.5, feature.y + 0.5);
      if (dist > radius) {
        return;
      }

      if (feature.type === "chest" && !feature.opened) {
        candidates.push({
          kind: "chest",
          feature,
          x: feature.x + 0.5,
          y: feature.y + 0.5,
          cost: 0,
          label: "打开宝箱",
          prompt: "打开宝箱，获得一次性金币奖励。"
        });
      }

      if (feature.type === "vagrant" && !feature.recruited) {
        candidates.push({
          kind: "recruit",
          feature,
          x: feature.x + 0.5,
          y: feature.y + 0.5,
          cost: config.economy.recruitCost,
          label: `招募 ${config.economy.recruitCost}`,
          prompt: `投 ${config.economy.recruitCost} 金币，让流民返回营地。`
        });
      }

      if (feature.type === "wall" && isTileControlled(tile) && !feature.built) {
        candidates.push({
          kind: "build",
          buildType: "wall",
          feature,
          x: feature.x + 0.5,
          y: feature.y + 0.5,
          cost: config.economy.wallCost,
          label: `建墙 ${config.economy.wallCost}`,
          prompt: `投 ${config.economy.wallCost} 金币，命令工人建木墙。`
        });
      }

      if (feature.type === "tower" && isTileControlled(tile) && !feature.built) {
        candidates.push({
          kind: "build",
          buildType: "tower",
          feature,
          x: feature.x + 0.5,
          y: feature.y + 0.5,
          cost: config.economy.towerCost,
          label: `建塔 ${config.economy.towerCost}`,
          prompt: `投 ${config.economy.towerCost} 金币，在高地建哨塔。`
        });
      }

      if (feature.type === "landmark" && isTileControlled(tile) && !feature.built) {
        candidates.push({
          kind: "build",
          buildType: "landmark",
          feature,
          x: feature.x + 0.5,
          y: feature.y + 0.5,
          cost: config.economy.landmarkCost,
          label: `修复 ${config.economy.landmarkCost}`,
          prompt: `投 ${config.economy.landmarkCost} 金币，修复旧地标。`
        });
      }
    });

    state.tiles.forEach((tile) => {
      if (!isBorderForest(tile)) {
        return;
      }
      const dist = distance(state.player.x, state.player.y, tile.x + 0.5, tile.y + 0.5);
      if (dist <= radius) {
        candidates.push({
          kind: "tree",
          tile,
          x: tile.x + 0.5,
          y: tile.y + 0.5,
          cost: config.economy.treeCost,
          label: `砍树 ${config.economy.treeCost}`,
          prompt: `投 ${config.economy.treeCost} 金币，命令工人清理边界树。`
        });
      }
    });

    candidates.sort((a, b) => {
      const da = distance(state.player.x, state.player.y, a.x, a.y);
      const db = distance(state.player.x, state.player.y, b.x, b.y);
      return da - db;
    });

    return candidates[0] || null;
  }

  function tryInteract() {
    if (!state || !state.running || state.paused || state.gameOver) {
      return;
    }
    const interaction = state.interaction || getInteraction();
    if (!interaction) {
      addMessage("附近没有可投金币的目标。");
      return;
    }

    if (interaction.cost > state.gold) {
      addMessage("金币不足，先探索或等白天产出。");
      pulseGold();
      return;
    }

    if (interaction.kind === "chest") {
      openChest(interaction.feature);
      return;
    }

    if (interaction.kind === "recruit") {
      spendGold(interaction.cost);
      recruitVagrant(interaction.feature);
      return;
    }

    const worker = findIdleWorker();
    if (!worker) {
      addMessage("工人都在忙，等他们回营地后再下命令。");
      return;
    }

    spendGold(interaction.cost);
    if (interaction.kind === "tree") {
      assignOrder(worker, {
        type: "chop",
        tile: interaction.tile,
        duration: config.workers.treeChopSeconds,
        targetX: interaction.tile.x + 0.5,
        targetY: interaction.tile.y + 0.5
      });
      addMessage("工人接到砍树命令，边界即将外推。");
    }

    if (interaction.kind === "build") {
      assignOrder(worker, {
        type: interaction.buildType,
        feature: interaction.feature,
        duration: config.workers.buildSeconds,
        targetX: interaction.feature.x + 0.5,
        targetY: interaction.feature.y + 0.5
      });
      addMessage(getBuildStartMessage(interaction.buildType));
    }
  }

  function getBuildStartMessage(type) {
    if (type === "wall") {
      return "工人带着木桩前往墙点。";
    }
    if (type === "tower") {
      return "工人开始搭建哨塔地基。";
    }
    return "工人前往旧地标，准备修复。";
  }

  function openChest(feature) {
    feature.opened = true;
    feature.discovered = true;
    const min = config.economy.chestMin;
    const max = config.economy.chestMax;
    const amount = Math.floor(min + Math.random() * (max - min + 1));
    gainGold(amount, feature.x + 0.5, feature.y + 0.5);
    addMessage(`宝箱打开，获得 ${amount} 金币。`);
  }

  function recruitVagrant(feature) {
    feature.recruited = true;
    feature.discovered = true;
    const [campX, campY] = config.level.camp;
    state.workers.push({
      id: `worker_${Date.now()}`,
      x: feature.x + 0.5,
      y: feature.y + 0.5,
      state: "returning",
      isRecruit: true,
      order: null,
      progress: 0,
      targetX: campX + 0.5,
      targetY: campY + 0.5
    });
    addMessage("流民接受金币，正在返回营地成为工人。");
  }

  function findIdleWorker() {
    return state.workers.find((worker) => worker.state === "idle");
  }

  function assignOrder(worker, order) {
    worker.order = order;
    worker.targetX = order.targetX;
    worker.targetY = order.targetY;
    worker.progress = 0;
    worker.state = "moving";
  }

  function spendGold(amount) {
    state.gold = Math.max(0, state.gold - amount);
  }

  function gainGold(amount, x, y) {
    state.gold += amount;
    const origin = project(x, y, 36);
    for (let index = 0; index < amount; index += 1) {
      state.particles.push({
        type: "coin",
        x: origin.x + (Math.random() - 0.5) * 16,
        y: origin.y + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 28,
        vy: -36 - Math.random() * 24,
        life: 0.75,
        maxLife: 0.75
      });
    }
  }

  function pulseGold() {
    ui.gold.parentElement.animate(
      [
        { transform: "translateY(0)" },
        { transform: "translateY(-3px)" },
        { transform: "translateY(0)" }
      ],
      { duration: 220 }
    );
  }

  function update(dt) {
    if (!state || !state.running || state.paused || state.gameOver) {
      return;
    }
    updatePhase(dt);
    updatePlayer(dt);
    updateDiscovery();
    updateWorkers(dt);
    updateEnemies(dt);
    updateDefense(dt);
    updateParticles(dt);
    updateTileFlash(dt);
    updateObjectiveTimers(dt);
    state.interaction = getInteraction();
    updateUi();
  }

  function updateObjectiveTimers(dt) {
    if (state.treeClearObjectiveTimer > 0) {
      state.treeClearObjectiveTimer = Math.max(0, state.treeClearObjectiveTimer - dt);
    }
  }

  function updatePhase(dt) {
    state.phaseTime += dt;
    const duration = getPhaseDuration(state.phase);
    if (state.phaseTime < duration) {
      return;
    }
    state.phaseTime -= duration;

    if (state.phase === "day") {
      state.phase = "dusk";
      addMessage("黄昏到了，边界外开始变暗。");
      return;
    }

    if (state.phase === "dusk") {
      state.phase = "night";
      state.spawnTimer = config.combat.enemySpawnSeconds * 0.7;
      if (state.landmarkRepaired) {
        state.finalNightArmed = true;
      }
      addMessage("夜晚来袭，守住营火和新边界。");
      return;
    }

    state.phase = "day";
    state.day += 1;
    state.enemies = [];
    morningIncome();
    addMessage("天亮了，森林退回阴影里。");
    if (state.finalNightArmed && state.landmarkRepaired) {
      finishGame(true, "旧地标已经修复，王国守住了随后的夜晚。");
    } else if (state.day > 5) {
      finishGame(false, "限定天数结束，旧地标还没有被纳入王国范围。");
    }
  }

  function getPhaseDuration(phase) {
    if (phase === "day") {
      return config.timing.daySeconds;
    }
    if (phase === "dusk") {
      return config.timing.duskSeconds;
    }
    return config.timing.nightSeconds;
  }

  function morningIncome() {
    const archerIncome = state.archers * config.economy.dayIncomePerArcher;
    const landmarkIncome = state.landmarkRepaired ? config.economy.landmarkDailyIncome : 0;
    const total = archerIncome + landmarkIncome;
    if (total > 0) {
      gainGold(total, state.camp.x + 0.5, state.camp.y + 0.5);
      addMessage(`白天产出 ${total} 金币。`);
    }
  }

  function updatePlayer(dt) {
    let dx = 0;
    let dy = 0;
    if (keys.has("KeyW") || keys.has("ArrowUp")) {
      dy -= 1;
    }
    if (keys.has("KeyS") || keys.has("ArrowDown")) {
      dy += 1;
    }
    if (keys.has("KeyA") || keys.has("ArrowLeft")) {
      dx -= 1;
    }
    if (keys.has("KeyD") || keys.has("ArrowRight")) {
      dx += 1;
    }

    if (dx !== 0 || dy !== 0) {
      state.player.destination = null;
      movePlayerVector(dx, dy, dt);
      return;
    }

    const destination = state.player.destination;
    if (!destination) {
      return;
    }
    const dist = distance(state.player.x, state.player.y, destination.x, destination.y);
    if (dist < 0.04) {
      state.player.destination = null;
      return;
    }
    movePlayerVector((destination.x - state.player.x) / dist, (destination.y - state.player.y) / dist, dt);
  }

  function movePlayerVector(dx, dy, dt) {
    const len = Math.hypot(dx, dy) || 1;
    const tile = tileAtPosition(state.player.x, state.player.y);
    const inForest = tile && tile.state === "forest";
    const phasePenalty = state.phase === "night" && inForest ? 0.82 : 1;
    const speed = config.player.speed * (inForest ? config.player.forestSpeedMultiplier : 1) * phasePenalty;
    state.player.x = clamp(state.player.x + (dx / len) * speed * dt, 0.18, config.level.width - 0.18);
    state.player.y = clamp(state.player.y + (dy / len) * speed * dt, 0.18, config.level.height - 0.18);
    if (Math.abs(dx) > 0.05) {
      state.player.facing = dx > 0 ? 1 : -1;
    }
  }

  function updateWorkers(dt) {
    const [campX, campY] = config.level.camp;
    state.workers.forEach((worker) => {
      if (worker.state === "idle") {
        return;
      }

      if (worker.state === "returning") {
        moveWorkerToward(worker, campX + 0.5, campY + 0.5, dt);
        if (distance(worker.x, worker.y, campX + 0.5, campY + 0.5) < 0.12) {
          worker.state = "idle";
          addMessage(worker.isRecruit ? "新工人抵达营地。" : "工人回到营地。");
          worker.isRecruit = false;
        }
        return;
      }

      if (worker.state === "moving") {
        moveWorkerToward(worker, worker.targetX, worker.targetY, dt);
        if (distance(worker.x, worker.y, worker.targetX, worker.targetY) < 0.12) {
          worker.state = "working";
          worker.progress = 0;
        }
        return;
      }

      if (worker.state === "working") {
        worker.progress += dt;
        createWorkDust(worker);
        if (worker.progress >= worker.order.duration) {
          completeOrder(worker);
        }
      }
    });
  }

  function moveWorkerToward(worker, targetX, targetY, dt) {
    const dx = targetX - worker.x;
    const dy = targetY - worker.y;
    const dist = Math.hypot(dx, dy) || 1;
    worker.x += (dx / dist) * config.workers.moveSpeed * dt;
    worker.y += (dy / dist) * config.workers.moveSpeed * dt;
  }

  function createWorkDust(worker) {
    if (Math.random() > 0.32) {
      return;
    }
    const p = project(worker.x, worker.y, 18);
    state.particles.push({
      type: "dust",
      x: p.x + (Math.random() - 0.5) * 16,
      y: p.y + (Math.random() - 0.5) * 8,
      vx: (Math.random() - 0.5) * 18,
      vy: -10 - Math.random() * 12,
      life: 0.4,
      maxLife: 0.4
    });
  }

  function completeOrder(worker) {
    const order = worker.order;
    if (order.type === "chop") {
      order.tile.state = "cleared";
      order.tile.flash = 1;
      state.firstTreeCleared = true;
      state.treeClearObjectiveTimer = 12;
      addMessage("树倒下了，王国控制范围扩大。");
      const feature = state.featureMap.get(keyOf(order.tile.x, order.tile.y));
      if (feature && feature.type !== "danger") {
        feature.discovered = true;
        addMessage(getDiscoveryMessage(feature));
      }
    }

    if (order.type === "wall") {
      order.feature.built = true;
      order.feature.level = 1;
      order.feature.hp = config.combat.wallHp;
      addMessage("木墙建成，夜晚防线更稳了。");
    }

    if (order.type === "tower") {
      order.feature.built = true;
      order.feature.level = 1;
      state.archers += 1;
      addMessage("哨塔建成，一名弓手开始驻守。");
    }

    if (order.type === "landmark") {
      order.feature.built = true;
      order.feature.level = 1;
      state.landmarkRepaired = true;
      if (state.phase === "night") {
        state.finalNightArmed = true;
      }
      addMessage("旧地标被点亮，守住下一晚即可完成 Demo。");
    }

    const [campX, campY] = config.level.camp;
    worker.order = null;
    worker.progress = 0;
    worker.targetX = campX + 0.5;
    worker.targetY = campY + 0.5;
    worker.state = "returning";
  }

  function updateEnemies(dt) {
    if (state.phase === "night") {
      state.spawnTimer -= dt;
      if (state.spawnTimer <= 0) {
        spawnEnemy();
        state.spawnTimer = config.combat.enemySpawnSeconds * (0.8 + Math.random() * 0.45);
      }
    }

    state.enemies.forEach((enemy) => {
      const target = getEnemyTarget();
      enemy.target = target;
      const dist = distance(enemy.x, enemy.y, target.x, target.y);
      if (dist > 0.38) {
        enemy.x += ((target.x - enemy.x) / dist) * config.combat.enemySpeed * dt;
        enemy.y += ((target.y - enemy.y) / dist) * config.combat.enemySpeed * dt;
        return;
      }

      enemy.attackTimer -= dt;
      if (enemy.attackTimer <= 0) {
        enemy.attackTimer = config.combat.enemyAttackSeconds;
        applyEnemyDamage(target);
      }
    });

    state.enemies = state.enemies.filter((enemy) => enemy.hp > 0);
  }

  function spawnEnemy() {
    const y = 1.4 + Math.random() * (config.level.height - 2.6);
    state.enemies.push({
      id: `enemy_${Date.now()}_${Math.random()}`,
      x: config.level.width - 0.25,
      y,
      hp: config.combat.enemyHp,
      maxHp: config.combat.enemyHp,
      attackTimer: 0.4,
      target: null
    });
  }

  function getEnemyTarget() {
    const wall = state.features.find((feature) => feature.type === "wall" && feature.built && feature.hp > 0);
    if (wall) {
      return { type: "wall", feature: wall, x: wall.x + 0.5, y: wall.y + 0.5 };
    }
    return { type: "camp", x: state.camp.x + 0.5, y: state.camp.y + 0.5 };
  }

  function applyEnemyDamage(target) {
    if (target.type === "wall") {
      target.feature.hp = Math.max(0, target.feature.hp - config.combat.enemyDamage);
      addHitParticle(target.x, target.y);
      if (target.feature.hp <= 0) {
        addMessage("木墙被击破，营火暴露在夜色中。");
      }
      return;
    }
    state.camp.hp = Math.max(0, state.camp.hp - config.combat.enemyDamage);
    addHitParticle(target.x, target.y);
    if (state.camp.hp <= 0) {
      finishGame(false, "营火被摧毁，王国失去安全中心。");
    }
  }

  function updateDefense(dt) {
    if (state.enemies.length === 0) {
      return;
    }

    state.archerTimer -= dt;
    if (state.archerTimer <= 0 && state.archers > 0) {
      state.archerTimer = config.combat.archerFireSeconds;
      shootFrom(state.camp.x + 0.5, state.camp.y + 0.5, config.combat.archerRange, config.combat.archerDamage);
    }

    const tower = state.features.find((feature) => feature.type === "tower" && feature.built);
    if (!tower) {
      return;
    }
    state.towerTimer -= dt;
    if (state.towerTimer <= 0) {
      state.towerTimer = config.combat.towerFireSeconds;
      shootFrom(tower.x + 0.5, tower.y + 0.5, config.combat.towerRange, config.combat.towerDamage);
    }
  }

  function shootFrom(x, y, range, damage) {
    let nearest = null;
    let nearestDistance = Infinity;
    state.enemies.forEach((enemy) => {
      const dist = distance(x, y, enemy.x, enemy.y);
      if (dist < range && dist < nearestDistance) {
        nearest = enemy;
        nearestDistance = dist;
      }
    });
    if (!nearest) {
      return;
    }
    nearest.hp -= damage;
    state.particles.push({
      type: "shot",
      from: project(x, y, 42),
      to: project(nearest.x, nearest.y, 28),
      life: 0.18,
      maxLife: 0.18
    });
    if (nearest.hp <= 0 && Math.random() < 0.35) {
      addMessage("弓手击退了一个夜袭者。");
    }
  }

  function addHitParticle(x, y) {
    const p = project(x, y, 20);
    for (let index = 0; index < 6; index += 1) {
      state.particles.push({
        type: "spark",
        x: p.x,
        y: p.y,
        vx: (Math.random() - 0.5) * 52,
        vy: -20 - Math.random() * 28,
        life: 0.36,
        maxLife: 0.36
      });
    }
  }

  function updateParticles(dt) {
    state.particles.forEach((particle) => {
      particle.life -= dt;
      if (particle.type !== "shot") {
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.vy += 72 * dt;
      }
    });
    state.particles = state.particles.filter((particle) => particle.life > 0);
  }

  function updateTileFlash(dt) {
    state.tiles.forEach((tile) => {
      if (tile.flash > 0) {
        tile.flash = Math.max(0, tile.flash - dt * 1.4);
      }
    });
  }

  function addMessage(message) {
    if (!state) {
      return;
    }
    if (state.messages[0] !== message) {
      state.messages.unshift(message);
      state.messages = state.messages.slice(0, 4);
    }
  }

  function getObjective() {
    const landmark = state.features.find((feature) => feature.type === "landmark");

    if (state.landmarkRepaired && state.finalNightArmed) {
      return "目标：守住当前夜晚，保护已修复的旧地标。";
    }
    if (state.landmarkRepaired) {
      return "目标：等待夜晚来袭，守住修复后的旧地标。";
    }
    if (state.treeClearObjectiveTimer > 0) {
      return "目标：边界扩大了。寻找宝箱、流民或建筑节点，继续用金币做取舍。";
    }
    if (landmark && landmark.discovered) {
      return "目标：旧地标已发现。需要把王国边界清理到地标附近，才能修复它。";
    }
    if (state.firstTreeCleared) {
      return "目标：边界扩大了。寻找宝箱、流民或建筑节点，继续用金币做取舍。";
    }
    return "目标：探索森林，找到可砍边界树。投金币让工人清理边界，把发现纳入营地范围。";
  }

  function updateUi() {
    ui.gold.textContent = String(state.gold);
    ui.day.textContent = `第 ${state.day} 天`;
    ui.phase.textContent = PHASE_COPY[state.phase];
    ui.phaseDot.style.background = PHASE_COLOR[state.phase];
    ui.phaseDot.style.boxShadow = `0 0 14px ${PHASE_COLOR[state.phase]}`;
    ui.objective.textContent = getObjective();
    ui.log.innerHTML = state.messages.map((message) => `<div>${message}</div>`).join("");

    const interaction = state.interaction;
    if (interaction) {
      ui.prompt.classList.remove("is-hidden");
      ui.action.classList.remove("is-hidden");
      ui.prompt.textContent = interaction.prompt;
      ui.actionLabel.textContent = interaction.label;
      ui.action.disabled = interaction.cost > state.gold;
    } else {
      ui.prompt.classList.add("is-hidden");
      ui.action.classList.add("is-hidden");
    }
  }

  function finishGame(victory, copy) {
    if (!state || state.gameOver) {
      return;
    }
    state.gameOver = true;
    state.victory = victory;
    state.running = false;
    ui.resultTitle.textContent = victory ? "Demo 完成" : "Demo 失败";
    ui.resultCopy.textContent = copy;
    ui.resultOverlay.classList.remove("is-hidden");
    ui.action.classList.add("is-hidden");
    ui.prompt.classList.add("is-hidden");
  }

  function render() {
    ctx.clearRect(0, 0, view.width, view.height);
    drawSky();
    if (!state) {
      return;
    }
    drawWorld();
    drawPhaseOverlay();
    if (state.paused && state.running) {
      drawPaused();
    }
  }

  function drawWorld() {
    const focus = getCameraFocus();
    ctx.save();
    ctx.translate(view.width * 0.5, view.height * 0.5);
    ctx.scale(settings.cameraZoom, settings.cameraZoom);
    ctx.translate(-focus.x, -focus.y);
    drawTiles();
    drawFeaturesAndEntities();
    drawParticles();
    drawInteraction();
    ctx.restore();
  }

  function drawSky() {
    const gradient = ctx.createLinearGradient(0, 0, 0, view.height);
    gradient.addColorStop(0, "#293b36");
    gradient.addColorStop(0.5, "#1d2b22");
    gradient.addColorStop(1, "#111714");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, view.width, view.height);
  }

  function drawTiles() {
    const tiles = [...state.tiles].sort((a, b) => a.x + a.y - (b.x + b.y) || a.y - b.y);
    tiles.forEach((tile) => drawTile(tile));
  }

  function drawTile(tile) {
    const p = project(tile.x + 0.5, tile.y + 0.5);
    const border = isBorderForest(tile);
    if (tile.state === "cleared") {
      drawDiamond(p.x, p.y, view.tileW, view.tileH, "#7fa66b", "rgba(238, 230, 200, 0.32)");
      drawGrassLines(p.x, p.y, tile.x, tile.y);
      if (tile.flash > 0) {
        drawClearFlash(p.x, p.y, tile.flash);
      }
      return;
    }

    drawDiamond(p.x, p.y, view.tileW, view.tileH, border ? "#345f3f" : "#17291f", border ? "rgba(246, 198, 75, 0.82)" : "rgba(0, 0, 0, 0.38)");
    drawForestTile(tile, p.x, p.y, border);
    if (border) {
      drawBorderTreeCue(tile, p.x, p.y);
    }
  }

  function drawClearFlash(cx, cy, flash) {
    ctx.globalAlpha = flash * 0.42;
    drawDiamond(cx, cy, view.tileW * 1.04, view.tileH * 1.04, "#e8ce78", "transparent");
    ctx.globalAlpha = flash * 0.55;
    ctx.strokeStyle = "#ffe08a";
    ctx.lineWidth = 2;
    drawDiamond(cx, cy, view.tileW * (1.1 + (1 - flash) * 0.42), view.tileH * (1.1 + (1 - flash) * 0.42), "transparent", "#ffe08a");
    ctx.globalAlpha = 1;
  }

  function drawDiamond(cx, cy, width, height, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(cx, cy - height / 2);
    ctx.lineTo(cx + width / 2, cy);
    ctx.lineTo(cx, cy + height / 2);
    ctx.lineTo(cx - width / 2, cy);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke !== "transparent") {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function drawGrassLines(cx, cy, x, y) {
    ctx.strokeStyle = "rgba(43, 63, 36, 0.32)";
    ctx.lineWidth = 1;
    const seed = (x * 31 + y * 17) % 8;
    for (let index = 0; index < 3; index += 1) {
      const px = cx - view.tileW * 0.26 + ((seed + index * 3) % 7) * (view.tileW * 0.075);
      const py = cy - view.tileH * 0.08 + index * 6;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + 11, py - 4);
      ctx.stroke();
    }
  }

  function drawForestTile(tile, cx, cy, border) {
    const feature = state.featureMap.get(keyOf(tile.x, tile.y));
    if (feature && feature.type === "landmark" && featureVisible(feature)) {
      return;
    }
    const trunks = [
      [-16, 0, 34],
      [7, -6, 42],
      [18, 6, 30]
    ];
    trunks.forEach(([dx, dy, height], index) => {
      drawTree(cx + dx, cy + dy, height, border && index === 1);
    });
  }

  function drawTree(x, y, height, highlighted) {
    ctx.fillStyle = "#5b3b23";
    ctx.fillRect(x - 3, y - height * 0.25, 6, height * 0.35);
    ctx.beginPath();
    ctx.ellipse(x, y - height * 0.42, height * 0.28, height * 0.34, 0, 0, Math.PI * 2);
    ctx.fillStyle = highlighted ? "#4f8e50" : "#244d31";
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x - 7, y - height * 0.26, height * 0.22, height * 0.25, 0, 0, Math.PI * 2);
    ctx.ellipse(x + 8, y - height * 0.24, height * 0.2, height * 0.24, 0, 0, Math.PI * 2);
    ctx.fillStyle = highlighted ? "#6daa5b" : "#2f6541";
    ctx.fill();
    if (highlighted) {
      ctx.strokeStyle = "rgba(246, 198, 75, 0.85)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  function drawBorderTreeCue(tile, cx, cy) {
    const nearPlayer = distance(state.player.x, state.player.y, tile.x + 0.5, tile.y + 0.5) <= config.player.interactRadius + 0.25;
    ctx.save();
    ctx.globalAlpha = nearPlayer ? 0.95 : 0.58;
    ctx.strokeStyle = nearPlayer ? "#ffe08a" : "rgba(246, 198, 75, 0.72)";
    ctx.lineWidth = nearPlayer ? 3 : 2;
    drawDiamond(cx, cy + 1, view.tileW * 0.72, view.tileH * 0.72, "transparent", ctx.strokeStyle);

    const axeX = cx + view.tileW * 0.22;
    const axeY = cy - view.tileH * 0.7;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#f2d488";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(axeX - 7, axeY + 10);
    ctx.lineTo(axeX + 9, axeY - 10);
    ctx.stroke();
    ctx.fillStyle = "#d9dde0";
    ctx.beginPath();
    ctx.moveTo(axeX + 3, axeY - 13);
    ctx.lineTo(axeX + 16, axeY - 8);
    ctx.lineTo(axeX + 6, axeY - 1);
    ctx.closePath();
    ctx.fill();

    if (nearPlayer) {
      ctx.fillStyle = "rgba(18, 22, 19, 0.76)";
      roundRect(cx - 16, cy - view.tileH * 0.74, 32, 18, 7);
      ctx.fill();
      ctx.fillStyle = "#f6c64b";
      ctx.beginPath();
      ctx.arc(cx, cy - view.tileH * 0.48, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffe48c";
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawFeaturesAndEntities() {
    const drawables = [];
    drawables.push({ sort: state.camp.x + state.camp.y + 0.1, draw: () => drawCamp() });
    state.features.forEach((feature) => {
      if (featureVisible(feature)) {
        drawables.push({ sort: feature.x + feature.y + 0.2, draw: () => drawFeature(feature) });
      }
    });
    state.workers.forEach((worker) => {
      drawables.push({ sort: worker.x + worker.y + 0.45, draw: () => drawWorker(worker) });
    });
    state.enemies.forEach((enemy) => {
      drawables.push({ sort: enemy.x + enemy.y + 0.46, draw: () => drawEnemy(enemy) });
    });
    drawables.push({ sort: state.player.x + state.player.y + 0.5, draw: () => drawPlayer() });
    drawables.sort((a, b) => a.sort - b.sort).forEach((item) => item.draw());
  }

  function drawCamp() {
    const p = project(state.camp.x + 0.5, state.camp.y + 0.5);
    drawShadow(p.x, p.y + 10, 58, 20);
    ctx.fillStyle = "#7b5130";
    ctx.fillRect(p.x - 30, p.y - 16, 60, 18);
    ctx.fillStyle = "#b36a3d";
    ctx.beginPath();
    ctx.moveTo(p.x - 34, p.y - 16);
    ctx.lineTo(p.x, p.y - 44);
    ctx.lineTo(p.x + 34, p.y - 16);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 224, 144, 0.52)";
    ctx.stroke();
    ctx.fillStyle = "#4a2b1a";
    ctx.fillRect(p.x - 6, p.y - 16, 12, 18);
    drawFire(p.x + 36, p.y - 12, 1);
    drawHealthBar(p.x, p.y - 58, 62, state.camp.hp, state.camp.maxHp, "#f0b35e");
  }

  function drawFire(x, y, scale) {
    ctx.beginPath();
    ctx.moveTo(x, y - 22 * scale);
    ctx.quadraticCurveTo(x + 12 * scale, y - 6 * scale, x, y + 5 * scale);
    ctx.quadraticCurveTo(x - 12 * scale, y - 6 * scale, x, y - 22 * scale);
    ctx.fillStyle = "#ffb54a";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x, y - 14 * scale);
    ctx.quadraticCurveTo(x + 6 * scale, y - 3 * scale, x, y + 3 * scale);
    ctx.quadraticCurveTo(x - 6 * scale, y - 3 * scale, x, y - 14 * scale);
    ctx.fillStyle = "#fff0a4";
    ctx.fill();
  }

  function drawFeature(feature) {
    if (feature.type === "chest" && !feature.opened) {
      drawChest(feature);
    }
    if (feature.type === "vagrant" && !feature.recruited) {
      drawVagrant(feature);
    }
    if (feature.type === "wall") {
      drawWall(feature);
    }
    if (feature.type === "tower") {
      drawTower(feature);
    }
    if (feature.type === "landmark") {
      drawLandmark(feature);
    }
    if (feature.type === "danger") {
      drawDangerTrace(feature);
    }
  }

  function drawChest(feature) {
    const p = project(feature.x + 0.5, feature.y + 0.5, 10);
    drawShadow(p.x, p.y + 14, 34, 12);
    ctx.fillStyle = "#7d4a28";
    ctx.fillRect(p.x - 15, p.y - 14, 30, 20);
    ctx.fillStyle = "#b77938";
    ctx.fillRect(p.x - 15, p.y - 20, 30, 8);
    ctx.fillStyle = "#f4c85b";
    ctx.fillRect(p.x - 3, p.y - 20, 6, 26);
  }

  function drawVagrant(feature) {
    const p = project(feature.x + 0.5, feature.y + 0.5, 18);
    drawShadow(p.x, p.y + 22, 28, 10);
    ctx.fillStyle = "#b7ad8a";
    ctx.fillRect(p.x - 6, p.y - 15, 12, 22);
    ctx.fillStyle = "#d9b58a";
    ctx.beginPath();
    ctx.arc(p.x, p.y - 22, 7, 0, Math.PI * 2);
    ctx.fill();
    drawFire(p.x + 18, p.y + 8, 0.45);
  }

  function drawWall(feature) {
    const p = project(feature.x + 0.5, feature.y + 0.5);
    if (!feature.built) {
      drawBuildNode(p.x, p.y, "#9e7a52", "墙");
      return;
    }
    drawShadow(p.x, p.y + 8, 70, 16);
    ctx.fillStyle = "#6a4327";
    for (let index = -2; index <= 2; index += 1) {
      ctx.fillRect(p.x + index * 11 - 4, p.y - 34 - Math.abs(index) * 2, 8, 40);
    }
    ctx.strokeStyle = "#b98552";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(p.x - 35, p.y - 18);
    ctx.lineTo(p.x + 35, p.y - 18);
    ctx.stroke();
    drawHealthBar(p.x, p.y - 48, 54, feature.hp, config.combat.wallHp, "#d28450");
  }

  function drawTower(feature) {
    const p = project(feature.x + 0.5, feature.y + 0.5);
    if (!feature.built) {
      drawBuildNode(p.x, p.y, "#8b8669", "塔");
      return;
    }
    drawShadow(p.x, p.y + 12, 56, 16);
    ctx.fillStyle = "#6b4b30";
    ctx.fillRect(p.x - 18, p.y - 58, 36, 58);
    ctx.fillStyle = "#8f6742";
    ctx.fillRect(p.x - 23, p.y - 68, 46, 14);
    ctx.fillStyle = "#e3c98b";
    ctx.beginPath();
    ctx.arc(p.x, p.y - 76, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.beginPath();
    ctx.arc(p.x, p.y - 42, config.combat.towerRange * view.tileW * 0.3, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawLandmark(feature) {
    const tile = getTile(feature.x, feature.y);
    const p = project(feature.x + 0.5, feature.y + 0.5, tile && tile.state === "forest" ? 8 : 0);
    drawShadow(p.x, p.y + 12, 66, 18);
    ctx.fillStyle = feature.built ? "#d7c678" : "#777368";
    ctx.fillRect(p.x - 13, p.y - 56, 26, 56);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y - 78);
    ctx.lineTo(p.x + 22, p.y - 54);
    ctx.lineTo(p.x - 22, p.y - 54);
    ctx.closePath();
    ctx.fillStyle = feature.built ? "#f6d76d" : "#8a8170";
    ctx.fill();
    ctx.strokeStyle = feature.built ? "rgba(255, 230, 126, 0.95)" : "rgba(214, 199, 150, 0.45)";
    ctx.lineWidth = 2;
    ctx.stroke();
    if (feature.built) {
      ctx.globalAlpha = 0.24 + Math.sin(performance.now() / 260) * 0.08;
      ctx.fillStyle = "#ffe27a";
      ctx.beginPath();
      ctx.ellipse(p.x, p.y - 42, 44, 68, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function drawDangerTrace(feature) {
    if (!featureVisible(feature)) {
      return;
    }
    const p = project(feature.x + 0.5, feature.y + 0.5, 2);
    ctx.strokeStyle = "rgba(230, 111, 82, 0.72)";
    ctx.lineWidth = 3;
    for (let index = 0; index < 3; index += 1) {
      ctx.beginPath();
      ctx.moveTo(p.x - 18 + index * 14, p.y - 6);
      ctx.lineTo(p.x - 8 + index * 14, p.y + 8);
      ctx.stroke();
    }
  }

  function drawBuildNode(x, y, color, label) {
    drawShadow(x, y + 12, 58, 18);
    ctx.globalAlpha = 0.28;
    ctx.fillStyle = "#ffe08a";
    ctx.beginPath();
    ctx.ellipse(x, y + 1, 36, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = "#5e594d";
    ctx.beginPath();
    ctx.ellipse(x, y + 2, 30, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(246, 198, 75, 0.82)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#6a4327";
    ctx.fillRect(x - 23, y - 20, 5, 23);
    ctx.fillRect(x + 18, y - 20, 5, 23);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - 18, y - 20);
    ctx.lineTo(x + 5, y - 13);
    ctx.lineTo(x - 18, y - 7);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + 23, y - 20);
    ctx.lineTo(x + 5, y - 14);
    ctx.lineTo(x + 23, y - 8);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#efe2bc";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, x, y + 6);
  }

  function drawWorker(worker) {
    const p = project(worker.x, worker.y, 18);
    drawShadow(p.x, p.y + 22, 26, 10);
    ctx.fillStyle = worker.state === "idle" ? "#d6a45f" : "#c98f4d";
    ctx.fillRect(p.x - 6, p.y - 17, 12, 22);
    ctx.fillStyle = "#d9b58a";
    ctx.beginPath();
    ctx.arc(p.x, p.y - 24, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#d7d0ba";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(p.x + 5, p.y - 8);
    ctx.lineTo(p.x + 19, p.y - 20);
    ctx.stroke();

    if (worker.state === "working" && worker.order) {
      const ratio = clamp(worker.progress / worker.order.duration, 0, 1);
      drawProgressBar(p.x, p.y - 38, 34, ratio);
    }
  }

  function drawEnemy(enemy) {
    const p = project(enemy.x, enemy.y, 18);
    drawShadow(p.x, p.y + 20, 30, 12);
    ctx.fillStyle = "#222329";
    ctx.beginPath();
    ctx.ellipse(p.x, p.y - 12, 13, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#e66f52";
    ctx.fillRect(p.x - 6, p.y - 17, 4, 3);
    ctx.fillRect(p.x + 3, p.y - 17, 4, 3);
    drawHealthBar(p.x, p.y - 38, 32, enemy.hp, enemy.maxHp, "#e66f52");
  }

  function drawPlayer() {
    const p = project(state.player.x, state.player.y, 25);
    drawShadow(p.x, p.y + 26, 42, 14);
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.scale(state.player.facing, 1);
    ctx.lineJoin = "round";
    ctx.strokeStyle = "rgba(245, 237, 220, 0.92)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, -43);
    ctx.lineTo(16, 6);
    ctx.lineTo(-16, 6);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#3a5f87";
    ctx.beginPath();
    ctx.moveTo(0, -43);
    ctx.lineTo(16, 6);
    ctx.lineTo(-16, 6);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(42, 56, 66, 0.85)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#e0bc82";
    ctx.beginPath();
    ctx.arc(0, -50, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(60, 43, 30, 0.85)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#f6c64b";
    ctx.beginPath();
    ctx.moveTo(-12, -61);
    ctx.lineTo(-4, -72);
    ctx.lineTo(0, -61);
    ctx.lineTo(6, -72);
    ctx.lineTo(12, -61);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#d6e5d7";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(11, -25);
    ctx.lineTo(24, -36);
    ctx.stroke();
    ctx.restore();
  }

  function drawShadow(x, y, width, height) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
    ctx.beginPath();
    ctx.ellipse(x, y, width / 2, height / 2, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawHealthBar(x, y, width, value, maxValue, color) {
    const ratio = clamp(value / maxValue, 0, 1);
    ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
    ctx.fillRect(x - width / 2, y, width, 5);
    ctx.fillStyle = color;
    ctx.fillRect(x - width / 2, y, width * ratio, 5);
  }

  function drawProgressBar(x, y, width, ratio) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.48)";
    ctx.fillRect(x - width / 2, y, width, 5);
    ctx.fillStyle = "#f6c64b";
    ctx.fillRect(x - width / 2, y, width * ratio, 5);
  }

  function drawParticles() {
    state.particles.forEach((particle) => {
      const ratio = clamp(particle.life / particle.maxLife, 0, 1);
      ctx.globalAlpha = ratio;
      if (particle.type === "coin") {
        ctx.fillStyle = "#f6c64b";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      if (particle.type === "dust") {
        ctx.fillStyle = "#d2b07c";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      if (particle.type === "spark") {
        ctx.fillStyle = "#e66f52";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      if (particle.type === "shot") {
        ctx.strokeStyle = "#f2d488";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(particle.from.x, particle.from.y);
        ctx.lineTo(particle.to.x, particle.to.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    });
  }

  function drawInteraction() {
    const interaction = state.interaction;
    if (!interaction) {
      return;
    }
    const p = project(interaction.x, interaction.y, 66);
    const slots = Math.max(1, interaction.cost);
    const totalWidth = slots * 16 + (slots - 1) * 4;
    ctx.fillStyle = "rgba(18, 22, 19, 0.72)";
    roundRect(p.x - totalWidth / 2 - 9, p.y - 12, totalWidth + 18, 26, 8);
    ctx.fill();
    for (let index = 0; index < slots; index += 1) {
      const x = p.x - totalWidth / 2 + index * 20 + 8;
      ctx.beginPath();
      ctx.arc(x, p.y + 1, 7, 0, Math.PI * 2);
      ctx.fillStyle = interaction.cost <= state.gold ? "#f6c64b" : "#6d5d3d";
      ctx.fill();
      ctx.strokeStyle = "#ffe48c";
      ctx.stroke();
    }

    const ground = project(interaction.x, interaction.y, 2);
    ctx.globalAlpha = 0.62;
    ctx.strokeStyle = "#ffe08a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(ground.x, ground.y, 34, 13, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function roundRect(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  function drawPhaseOverlay() {
    if (!state) {
      return;
    }
    let alpha = 0;
    let color = "#1e2d54";
    if (state.phase === "dusk") {
      alpha = 0.16 + state.phaseTime / getPhaseDuration("dusk") * 0.14;
      color = "#7a4330";
    }
    if (state.phase === "night") {
      alpha = 0.42;
      color = "#122346";
    }
    if (alpha <= 0) {
      return;
    }
    ctx.fillStyle = hexToRgba(color, alpha);
    ctx.fillRect(0, 0, view.width, view.height);
    if (state.phase === "night") {
      const fire = worldToScreen(project(state.camp.x + 0.5, state.camp.y + 0.5, 18));
      const light = ctx.createRadialGradient(fire.x, fire.y, 12, fire.x, fire.y, 170);
      light.addColorStop(0, "rgba(255, 184, 74, 0.22)");
      light.addColorStop(1, "rgba(255, 184, 74, 0)");
      ctx.fillStyle = light;
      ctx.fillRect(0, 0, view.width, view.height);
    }
  }

  function drawPaused() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.42)";
    ctx.fillRect(0, 0, view.width, view.height);
    ctx.fillStyle = "#f5eddc";
    ctx.font = "700 26px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("暂停", view.width / 2, view.height / 2);
  }

  function hexToRgba(hex, alpha) {
    const value = hex.replace("#", "");
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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
    ui.resultOverlay.classList.add("is-hidden");
    updateUi();
  }

  function togglePause() {
    if (!state || state.gameOver) {
      return;
    }
    state.paused = !state.paused;
    ui.pause.setAttribute("aria-label", state.paused ? "resume" : "pause");
  }

  function setConsoleOpen(open) {
    ui.consolePanel.classList.toggle("is-open", open);
    ui.consolePanel.setAttribute("aria-hidden", open ? "false" : "true");
    ui.consoleButton.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function updateCameraZoom(value) {
    settings.cameraZoom = clamp(Number(value), 0.5, 50);
    ui.cameraZoomSlider.value = String(settings.cameraZoom);
    ui.cameraZoomValue.textContent = `${Math.round(settings.cameraZoom * 100)}%`;
    resizeCanvas();
  }

  function frame(now) {
    if (!lastFrame) {
      lastFrame = now;
    }
    const dt = Math.min(0.05, (now - lastFrame) / 1000);
    lastFrame = now;
    update(dt);
    render();
    requestAnimationFrame(frame);
  }

  function bindEvents() {
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("keydown", (event) => {
      if (["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
        keys.add(event.code);
        event.preventDefault();
      }
      if (event.code === "KeyE" || event.code === "Space") {
        event.preventDefault();
        tryInteract();
      }
      if (event.code === "Escape") {
        togglePause();
      }
    });
    window.addEventListener("keyup", (event) => {
      keys.delete(event.code);
    });
    canvas.addEventListener("pointerdown", (event) => {
      if (!state || !state.running || state.gameOver) {
        return;
      }
      state.player.destination = screenToTile(event.clientX, event.clientY);
    });
    ui.action.addEventListener("click", tryInteract);
    ui.start.addEventListener("click", startGame);
    ui.restart.addEventListener("click", restartGame);
    ui.pause.addEventListener("click", togglePause);
    ui.consoleButton.addEventListener("click", () => {
      setConsoleOpen(!ui.consolePanel.classList.contains("is-open"));
    });
    ui.consoleClose.addEventListener("click", () => {
      setConsoleOpen(false);
    });
    ui.cameraZoomSlider.addEventListener("input", (event) => {
      updateCameraZoom(event.target.value);
    });
  }

  async function init() {
    config = await loadConfig();
    state = createState();
    updateCameraZoom(ui.cameraZoomSlider.value);
    resizeCanvas();
    bindEvents();
    updateUi();
    requestAnimationFrame(frame);
  }

  init();
})();
