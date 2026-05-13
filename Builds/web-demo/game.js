(() => {
  const CONFIG_URL = "../../Data/config/web_demo_balance.json";
  const DEFAULT_CONFIG = {
    version: "v0.7",
    dungeon: {
      maxFloors: 3,
      width: 36,
      height: 28,
      generation: {
        enabled: true,
        roomCount: [5, 8],
        roomWidth: [3, 10],
        roomHeight: [3, 10],
        floorRules: [
          {
            monsters: [5, 7],
            monsterTypes: [
              { type: "slime", weight: 80 },
              { type: "goblin_archer", weight: 20 }
            ],
            potion: [1, 1],
            food: [1, 1],
            strategyItems: [1, 2],
            equipment: [1, 2],
            equipmentTypes: [
              { type: "short_sword", weight: 45 },
              { type: "wooden_shield", weight: 40 },
              { type: "spear", weight: 10 },
              { type: "iron_shield", weight: 5 }
            ]
          },
          {
            monsters: [6, 8],
            monsterTypes: [
              { type: "slime", weight: 45 },
              { type: "goblin_archer", weight: 35 },
              { type: "sleep_mushroom", weight: 20 }
            ],
            potion: [1, 1],
            food: [1, 1],
            strategyItems: [2, 2],
            equipment: [2, 2],
            equipmentTypes: [
              { type: "short_sword", weight: 25 },
              { type: "wooden_shield", weight: 25 },
              { type: "spear", weight: 30 },
              { type: "iron_shield", weight: 20 }
            ]
          },
          {
            monsters: [7, 9],
            monsterTypes: [
              { type: "slime", weight: 30 },
              { type: "goblin_archer", weight: 30 },
              { type: "sleep_mushroom", weight: 20 },
              { type: "skeleton_spearman", weight: 20 }
            ],
            potion: [1, 1],
            food: [1, 2],
            strategyItems: [2, 3],
            equipment: [2, 3],
            equipmentTypes: [
              { type: "short_sword", weight: 15 },
              { type: "wooden_shield", weight: 15 },
              { type: "spear", weight: 35 },
              { type: "iron_shield", weight: 35 }
            ]
          }
        ],
        strategyItemTypes: ["teleport", "sleep", "fireball", "swap"]
      },
      floors: [
        {
          name: "Stone Moss Entrance",
          rows: [
            "###############",
            "#@fp..#...p...#",
            "#.###.#.#####.#",
            "#...#..t#...#.#",
            "###.#####.#.#.#",
            "#.z.m..r..#...#",
            "#.#####.###.###",
            "#.....#...#...#",
            "#.###.###.#.#.#",
            "#...#..p.x#m#s#",
            "#.............#",
            "###############"
          ]
        },
        {
          name: "Echo Shallows",
          rows: [
            "###############",
            "#@f.#..t..#...#",
            "###.#.###.#.#.#",
            "#...#.#z#...#.#",
            "#.###.#.#####.#",
            "#..m..#...m...#",
            "#.#######.###.#",
            "#.#.....#...#.#",
            "#.#.###.###.#.#",
            "#.r.m.#..p.x#s#",
            "#.....#.....#.#",
            "###############"
          ]
        },
        {
          name: "Trial Terminus",
          rows: [
            "###############",
            "#@f.t.#.......#",
            "#.###.#.#####.#",
            "#...#.#..zp.#.#",
            "###.#.###.#.#.#",
            "#...#...#.#...#",
            "#.#####.#.###.#",
            "#.r.m...#...#.#",
            "#.#########.#.#",
            "#...p..x.m..#s#",
            "#.............#",
            "###############"
          ]
        }
      ]
    },
    player: {
      maxHp: 20,
      attack: 4,
      defense: 0,
      maxSatiety: 100,
      startingSatiety: 100
    },
    monster: {
      name: "Slime",
      hp: 6,
      attack: 3
    },
    monsters: {
      slime: {
        id: "slime",
        name: "Slime",
        hp: 6,
        attack: 3,
        behavior: "melee",
        icon: "S",
        color: "#9b5ad7"
      },
      goblin_archer: {
        id: "goblin_archer",
        name: "Goblin Archer",
        hp: 5,
        attack: 2,
        behavior: "ranged",
        range: 4,
        icon: "A",
        color: "#d86f52"
      },
      sleep_mushroom: {
        id: "sleep_mushroom",
        name: "Sleep Mushroom",
        hp: 7,
        attack: 1,
        behavior: "sleep_spore",
        sporeRange: 2,
        sleepTurns: 2,
        cooldown: 4,
        icon: "M",
        color: "#8e73d6"
      },
      skeleton_spearman: {
        id: "skeleton_spearman",
        name: "Skeleton Spearman",
        hp: 8,
        attack: 3,
        behavior: "reach_attack",
        range: 2,
        icon: "P",
        color: "#7ec3c3"
      }
    },
    potion: {
      name: "恢复药",
      heal: 8
    },
    items: {
      potion: {
        name: "恢复药",
        key: "H",
        heal: 8
      },
      food: {
        name: "食物",
        key: "F",
        satiety: 50
      },
      teleport: {
        name: "传送卷轴",
        key: "T"
      },
      sleep: {
        name: "睡眠卷轴",
        key: "Z",
        range: 4,
        turns: 3
      },
      fireball: {
        name: "火球杖",
        key: "R",
        damage: 5
      },
      swap: {
        name: "换位杖",
        key: "X"
      }
    },
    equipment: {
      short_sword: {
        id: "short_sword",
        name: "短剑",
        slot: "weapon",
        attackBonus: 1,
        defenseBonus: 0,
        icon: "W",
        color: "#d8d1c3"
      },
      spear: {
        id: "spear",
        name: "长枪",
        slot: "weapon",
        attackBonus: 2,
        defenseBonus: 0,
        icon: "L",
        color: "#cdb292"
      },
      wooden_shield: {
        id: "wooden_shield",
        name: "木盾",
        slot: "shield",
        attackBonus: 0,
        defenseBonus: 1,
        icon: "D",
        color: "#8f6945"
      },
      iron_shield: {
        id: "iron_shield",
        name: "铁盾",
        slot: "shield",
        attackBonus: 0,
        defenseBonus: 2,
        icon: "I",
        color: "#96a7c4"
      }
    },
    hazards: {
      traps: {
        spike_trap: {
          id: "spike_trap",
          name: "地刺陷阱",
          type: "trap",
          damage: 4,
          visible: true,
          singleUse: true,
          icon: "^",
          color: "#d85f4f"
        },
        warp_trap: {
          id: "warp_trap",
          name: "传送陷阱",
          type: "trap",
          visible: true,
          singleUse: true,
          icon: "?",
          color: "#9c78da"
        },
        sleep_trap: {
          id: "sleep_trap",
          name: "睡眠陷阱",
          type: "trap",
          sleepTurns: 2,
          visible: true,
          singleUse: true,
          icon: "Z",
          color: "#7f7de2"
        }
      },
      terrain: {
        poison_pool: {
          id: "poison_pool",
          name: "毒沼",
          type: "terrain",
          damage: 1,
          icon: "~",
          color: "#5fae63"
        }
      },
      floorRules: [
        {
          traps: [1, 2],
          terrain: [1, 2],
          trapTypes: [
            { type: "spike_trap", weight: 70 },
            { type: "warp_trap", weight: 30 }
          ],
          terrainTypes: [
            { type: "poison_pool", weight: 100 }
          ]
        },
        {
          traps: [2, 3],
          terrain: [2, 3],
          trapTypes: [
            { type: "spike_trap", weight: 45 },
            { type: "warp_trap", weight: 30 },
            { type: "sleep_trap", weight: 25 }
          ],
          terrainTypes: [
            { type: "poison_pool", weight: 100 }
          ]
        },
        {
          traps: [3, 4],
          terrain: [3, 5],
          trapTypes: [
            { type: "spike_trap", weight: 40 },
            { type: "warp_trap", weight: 30 },
            { type: "sleep_trap", weight: 30 }
          ],
          terrainTypes: [
            { type: "poison_pool", weight: 100 }
          ]
        }
      ]
    },
    log: {
      maxEntries: 6
    },
    hunger: {
      enabled: true,
      satietyLossInterval: 5,
      satietyLoss: 1,
      lowThreshold: 25,
      starvationDamageInterval: 5,
      starvationDamage: 1
    },
    camera: {
      cameraMode: "traditional-tilt",
      tileW: 104,
      tileH: 104,
      yScale: 0.72,
      rowStep: 75,
      perspectiveOffset: 2,
      tileDepth: 22,
      cameraZoom: 1,
      cameraCenterOffsetX: 0,
      cameraCenterOffsetY: 0
    }
  };

  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const ui = {
    hp: document.getElementById("hp-value"),
    floor: document.getElementById("floor-value"),
    turn: document.getElementById("turn-value"),
    potion: document.getElementById("potion-value"),
    satiety: document.getElementById("satiety-value"),
    attack: document.getElementById("attack-value"),
    defense: document.getElementById("defense-value"),
    weapon: document.getElementById("weapon-value"),
    shield: document.getElementById("shield-value"),
    objective: document.getElementById("objective"),
    prompt: document.getElementById("prompt"),
    log: document.getElementById("event-log"),
    potionButton: document.getElementById("potion-button"),
    foodButton: document.getElementById("food-button"),
    teleportButton: document.getElementById("teleport-button"),
    sleepButton: document.getElementById("sleep-button"),
    fireballButton: document.getElementById("fireball-button"),
    swapButton: document.getElementById("swap-button"),
    equipButton: document.getElementById("equip-button"),
    waitButton: document.getElementById("wait-button"),
    stairsButton: document.getElementById("stairs-button"),
    startOverlay: document.getElementById("start-overlay"),
    start: document.getElementById("start-button"),
    resultOverlay: document.getElementById("result-overlay"),
    resultTitle: document.getElementById("result-title"),
    resultCopy: document.getElementById("result-copy"),
    resultFloor: document.getElementById("result-floor"),
    resultKills: document.getElementById("result-kills"),
    resultItems: document.getElementById("result-items"),
    restart: document.getElementById("restart-button"),
    pause: document.getElementById("pause-button"),
    consoleButton: document.getElementById("console-button"),
    consoleClose: document.getElementById("console-close-button"),
    consolePanel: document.getElementById("console-panel"),
    consolePause: document.getElementById("console-pause-button"),
    consoleReset: document.getElementById("console-reset-button"),
    cameraControls: document.getElementById("camera-controls"),
    cameraReset: document.getElementById("camera-reset-button"),
    cameraCopy: document.getElementById("camera-copy-button"),
    cameraJson: document.getElementById("camera-json-output"),
    musicToggle: document.getElementById("music-toggle"),
    sfxToggle: document.getElementById("sfx-toggle"),
    fpsToggle: document.getElementById("fps-toggle"),
    fpsReadout: document.getElementById("fps-readout"),
    minimap: document.getElementById("minimap-canvas"),
    enemyList: document.getElementById("enemy-list"),
    turnOrder: document.getElementById("turn-order")
  };
  const minimapCtx = ui.minimap ? ui.minimap.getContext("2d") : null;

  const DIRS = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };

  const ITEM_MARKS = {
    p: "potion",
    f: "food",
    t: "teleport",
    z: "sleep",
    r: "fireball",
    x: "swap"
  };

  const EQUIPMENT_MARKS = {
    w: "short_sword",
    l: "spear",
    d: "wooden_shield",
    i: "iron_shield"
  };

  const TRAP_MARKS = {
    "^": "spike_trap",
    "?": "warp_trap",
    Z: "sleep_trap"
  };

  const TERRAIN_MARKS = {
    "~": "poison_pool"
  };

  const ITEM_META = {
    potion: { label: "恢复药", icon: "+", color: "#6fc38b", button: "potionButton" },
    food: { label: "食物", icon: "F", color: "#f2c85b", button: "foodButton" },
    teleport: { label: "传送卷轴", icon: "T", color: "#7fb7d7", button: "teleportButton" },
    sleep: { label: "睡眠卷轴", icon: "Z", color: "#a88ee8", button: "sleepButton" },
    fireball: { label: "火球杖", icon: "R", color: "#df6657", button: "fireballButton" },
    swap: { label: "换位杖", icon: "X", color: "#f08a54", button: "swapButton" }
  };

  const ITEM_ORDER = ["potion", "food", "teleport", "sleep", "fireball", "swap"];
  const EQUIPMENT_SLOTS = ["weapon", "shield"];
  const HIGH_THREAT_MONSTER_TYPES = new Set(["sleep_mushroom", "skeleton_spearman"]);

  const CAMERA_FIELDS = [
    { key: "tileW", label: "tileW", min: 48, max: 160, step: 4, digits: 0 },
    { key: "tileH", label: "tileH", min: 48, max: 160, step: 4, digits: 0 },
    { key: "yScale", label: "yScale", min: 0.5, max: 1, step: 0.02, digits: 2 },
    { key: "rowStep", label: "rowStep", min: 32, max: 128, step: 2, digits: 0 },
    { key: "perspectiveOffset", label: "perspectiveOffset", min: 0, max: 8, step: 0.5, digits: 1 },
    { key: "tileDepth", label: "tileDepth", min: 0, max: 40, step: 2, digits: 0 },
    { key: "cameraZoom", label: "cameraZoom", min: 0.75, max: 2, step: 0.05, digits: 2 },
    { key: "cameraCenterOffsetX", label: "cameraCenterOffsetX", min: -300, max: 300, step: 10, digits: 0 },
    { key: "cameraCenterOffsetY", label: "cameraCenterOffsetY", min: -200, max: 200, step: 10, digits: 0 }
  ];

  let config = DEFAULT_CONFIG;
  let state = null;
  let lastFrame = 0;
  let fpsFrameCount = 0;
  let fpsElapsed = 0;
  let renderDirty = true;
  let cameraDefaults = null;
  let cameraSession = null;
  const view = {
    width: 0,
    height: 0,
    dpr: 1,
    cameraMode: "traditional-tilt",
    tileW: 60,
    tileH: 60,
    tileDepth: 20,
    rowStep: 43,
    yScale: 0.72,
    perspectiveOffset: 2,
    cameraZoom: 1,
    cameraCenterOffsetX: 0,
    cameraCenterOffsetY: 0,
    playLeft: 0,
    playTop: 0,
    playWidth: 0,
    playHeight: 0,
    originX: 0,
    originY: 0
  };
  const settings = {
    music: true,
    sfx: true,
    showFps: false,
    fps: 0
  };

  function markRenderDirty() {
    renderDirty = true;
  }

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
      rooms: [],
      tiles: [],
      traps: [],
      trapLookup: new Map(),
      terrainHazards: [],
      terrainLookup: new Map(),
      monsters: [],
      itemsOnGround: [],
      equipmentOnGround: [],
      stairs: { x: 1, y: 1 },
      player: {
        x: 1,
        y: 1,
        hp: config.player.maxHp,
        maxHp: config.player.maxHp,
        baseAttack: config.player.attack,
        baseDefense: config.player.defense || 0,
        satiety: config.player.startingSatiety,
        maxSatiety: config.player.maxSatiety,
        facing: "down",
        sleepTurns: 0,
        hitFlash: 0,
        equipment: {
          weapon: null,
          shield: null
        }
      },
      inventory: createEmptyInventory(),
      turn: 0,
      hungerCounter: 0,
      starvationCounter: 0,
      lowSatietyWarned: false,
      kills: 0,
      itemsUsed: 0,
      messages: [],
      floaters: [],
      deathReason: ""
    };
    state = nextState;
    loadFloor(0);
    addMessage("第 1 层开始。随机迷宫已生成，注意饱腹度。");
    return nextState;
  }

  function createEmptyInventory() {
    return ITEM_ORDER.reduce((inventory, type) => {
      inventory[type] = 0;
      return inventory;
    }, {});
  }

  function buildRenderTiles(width, height, tiles) {
    const cells = [];
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        cells.push({ x, y, tile: tiles[y * width + x] });
      }
    }
    return cells.sort((a, b) => a.y - b.y || a.x - b.x);
  }

  function getHazardConfig() {
    return config.hazards || DEFAULT_CONFIG.hazards || { traps: {}, terrain: {}, floorRules: [] };
  }

  function getTrapCatalog() {
    return getHazardConfig().traps || {};
  }

  function getTerrainCatalog() {
    return getHazardConfig().terrain || {};
  }

  function getTrapTemplate(type = "spike_trap") {
    const catalog = getTrapCatalog();
    return catalog[type] || DEFAULT_CONFIG.hazards.traps.spike_trap;
  }

  function getTerrainTemplate(type = "poison_pool") {
    const catalog = getTerrainCatalog();
    return catalog[type] || DEFAULT_CONFIG.hazards.terrain.poison_pool;
  }

  function getHazardFloorRules(floorIndex) {
    const rules = getHazardConfig().floorRules || DEFAULT_CONFIG.hazards.floorRules || [];
    return rules[Math.min(floorIndex, rules.length - 1)] || { traps: [0, 0], terrain: [0, 0], trapTypes: [], terrainTypes: [] };
  }

  function getEquipmentCatalog() {
    return config.equipment || DEFAULT_CONFIG.equipment || {};
  }

  function getEquipmentTemplate(type = "short_sword") {
    const catalog = getEquipmentCatalog();
    return catalog[type] || DEFAULT_CONFIG.equipment.short_sword;
  }

  function createEquipmentDrop(type, x, y, index) {
    const template = getEquipmentTemplate(type);
    return {
      id: `equipment_${index}_${Date.now()}`,
      type: template.id || type,
      name: template.name,
      slot: template.slot || "weapon",
      attackBonus: template.attackBonus || 0,
      defenseBonus: template.defenseBonus || 0,
      icon: template.icon || "W",
      color: template.color || "#d8d1c3",
      x,
      y
    };
  }

  function createTrap(x, y, index, type) {
    const template = getTrapTemplate(type);
    return {
      id: `trap_${index}_${Date.now()}`,
      type: template.id || type,
      name: template.name,
      x,
      y,
      damage: template.damage || 0,
      sleepTurns: template.sleepTurns || 0,
      visible: template.visible !== false,
      singleUse: template.singleUse !== false,
      icon: template.icon || "^",
      color: template.color || "#d85f4f"
    };
  }

  function createTerrainHazard(x, y, index, type) {
    const template = getTerrainTemplate(type);
    return {
      id: `terrain_${index}_${Date.now()}`,
      type: template.id || type,
      name: template.name,
      x,
      y,
      damage: template.damage || 0,
      icon: template.icon || "~",
      color: template.color || "#5fae63"
    };
  }

  function rebuildHazardLookups() {
    state.trapLookup = new Map(state.traps.map((trap) => [keyOf(trap.x, trap.y), trap]));
    state.terrainLookup = new Map(state.terrainHazards.map((terrain) => [keyOf(terrain.x, terrain.y), terrain]));
  }

  function loadFloor(floorIndex) {
    if (config.dungeon.generation && config.dungeon.generation.enabled) {
      const generatedFloor = generateDungeon(floorIndex);
      if (generatedFloor) {
        applyFloorState(generatedFloor, floorIndex);
        return;
      }
      addMessage("随机迷宫生成失败，使用固定备用地图。");
    }

    const floors = config.dungeon.floors && config.dungeon.floors.length ? config.dungeon.floors : DEFAULT_CONFIG.dungeon.floors;
    const floorData = floors[Math.min(floorIndex, floors.length - 1)];
    const parsedFloor = parseFixedFloor(floorData, floorIndex);
    applyFloorState(parsedFloor, floorIndex);
  }

  function parseFixedFloor(floorData, floorIndex) {
    const rows = floorData.rows;
    const height = rows.length;
    const width = rows[0].length;
    const tiles = [];
    const traps = [];
    const terrainHazards = [];
    const monsters = [];
    const itemsOnGround = [];
    const equipmentOnGround = [];
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
        if (TRAP_MARKS[mark]) {
          traps.push(createTrap(x, y, traps.length, TRAP_MARKS[mark]));
        }
        if (TERRAIN_MARKS[mark]) {
          terrainHazards.push(createTerrainHazard(x, y, terrainHazards.length, TERRAIN_MARKS[mark]));
        }
        if (ITEM_MARKS[mark]) {
          itemsOnGround.push({
            id: `item_${floorIndex}_${itemsOnGround.length}`,
            type: ITEM_MARKS[mark],
            x,
            y
          });
        }
        if (EQUIPMENT_MARKS[mark]) {
          equipmentOnGround.push(createEquipmentDrop(EQUIPMENT_MARKS[mark], x, y, `${floorIndex}_${equipmentOnGround.length}`));
        }
      }
    }

    return {
      name: floorData.name || `第 ${floorIndex + 1} 层`,
      width,
      height,
      rooms: [],
      tiles,
      traps,
      terrainHazards,
      monsters,
      itemsOnGround,
      equipmentOnGround,
      stairs: stairs || { x: width - 2, y: height - 2 },
      playerStart: playerStart || { x: 1, y: 1 }
    };
  }

  function applyFloorState(floorData, floorIndex) {
    state.floorIndex = floorIndex;
    state.floor = floorIndex + 1;
    state.floorName = floorData.name || `第 ${state.floor} 层`;
    state.width = floorData.width;
    state.height = floorData.height;
    state.rooms = floorData.rooms || [];
    state.tiles = floorData.tiles;
    state.renderTiles = buildRenderTiles(state.width, state.height, state.tiles);
    state.traps = floorData.traps || [];
    state.terrainHazards = floorData.terrainHazards || [];
    rebuildHazardLookups();
    state.monsters = floorData.monsters;
    state.itemsOnGround = floorData.itemsOnGround;
    state.equipmentOnGround = floorData.equipmentOnGround || [];
    state.stairs = floorData.stairs;
    state.player.x = floorData.playerStart.x;
    state.player.y = floorData.playerStart.y;
    state.player.facing = "down";
    resizeCanvas();
    markRenderDirty();
  }

  function generateDungeon(floorIndex) {
    const generation = config.dungeon.generation;
    const width = config.dungeon.width || DEFAULT_CONFIG.dungeon.width;
    const height = config.dungeon.height || DEFAULT_CONFIG.dungeon.height;
    const tiles = Array.from({ length: width * height }, () => "wall");
    const rooms = generateRooms(width, height, generation);

    if (rooms.length < 2) {
      return null;
    }

    rooms.forEach((room) => carveRoom(tiles, width, room));
    connectRooms(tiles, width, rooms);

    const playerStart = { x: rooms[0].centerX, y: rooms[0].centerY };
    const stairsRoom = findFarthestRoom(rooms, playerStart);
    const stairs = { x: stairsRoom.centerX, y: stairsRoom.centerY };
    rooms.forEach((room, index) => {
      room.isStartRoom = index === 0;
      room.isStairsRoom = room.id === stairsRoom.id;
    });
    const occupied = new Set([keyOf(playerStart.x, playerStart.y), keyOf(stairs.x, stairs.y)]);
    const rules = getFloorRules(floorIndex);
    const traps = [];
    const terrainHazards = [];
    const monsters = [];
    const itemsOnGround = [];
    const equipmentOnGround = [];

    placeMonstersByRoom(monsters, rooms, occupied, tiles, width, height, floorIndex, stairs);
    placeItems(itemsOnGround, occupied, tiles, width, height, "potion", randomFromRange(rules.potion), floorIndex);
    placeItems(itemsOnGround, occupied, tiles, width, height, "food", randomFromRange(rules.food), floorIndex);
    placeStrategyItems(itemsOnGround, occupied, tiles, width, height, randomFromRange(rules.strategyItems), floorIndex);
    placeEquipmentDrops(equipmentOnGround, rooms, occupied, tiles, width, height, floorIndex, playerStart, stairs);
    placeHazards(traps, terrainHazards, rooms, occupied, tiles, width, height, floorIndex, playerStart, stairs);

    return {
      name: `闅忔満杩峰 ${floorIndex + 1}F`,
      width,
      height,
      rooms,
      tiles,
      traps,
      terrainHazards,
      monsters,
      itemsOnGround,
      equipmentOnGround,
      stairs,
      playerStart
    };
  }

  function generateRooms(width, height, generation) {
    const targetCount = randomFromRange(generation.roomCount);
    const rooms = [];
    let attempts = 0;
    while (rooms.length < targetCount && attempts < 120) {
      attempts += 1;
      const roomWidth = randomFromRange(generation.roomWidth);
      const roomHeight = randomFromRange(generation.roomHeight);
      const x = randomInt(1, width - roomWidth - 1);
      const y = randomInt(1, height - roomHeight - 1);
      const room = createRoomMeta(rooms.length, x, y, roomWidth, roomHeight);
      if (rooms.every((other) => !roomsOverlap(room, other))) {
        rooms.push(room);
      }
    }
    if (rooms.length < 3) {
      return fallbackRooms(width, height, targetCount);
    }
    return rooms;
  }

  function roomsOverlap(a, b) {
    return !(
      a.x + a.width + 1 < b.x ||
      b.x + b.width + 1 < a.x ||
      a.y + a.height + 1 < b.y ||
      b.y + b.height + 1 < a.y
    );
  }

  function fallbackRooms(width, height, targetCount) {
    const candidates = [
      { x: 2, y: 2, width: 7, height: 6 },
      { x: width - 12, y: 2, width: 9, height: 6 },
      { x: 2, y: height - 10, width: 8, height: 7 },
      { x: width - 13, y: height - 10, width: 10, height: 7 },
      { x: Math.floor(width / 2) - 4, y: Math.floor(height / 2) - 3, width: 9, height: 7 },
      { x: Math.floor(width / 2) - 5, y: 3, width: 10, height: 5 }
    ].map((room, index) => createRoomMeta(
      index,
      clamp(room.x, 1, width - room.width - 1),
      clamp(room.y, 1, height - room.height - 1),
      room.width,
      room.height
    ));

    return shuffle(candidates).slice(0, Math.max(3, Math.min(targetCount, candidates.length)));
  }

  function shuffle(values) {
    const copy = [...values];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function carveRoom(tiles, width, room) {
    for (let y = room.y; y < room.y + room.height; y += 1) {
      for (let x = room.x; x < room.x + room.width; x += 1) {
        setGeneratedTile(tiles, width, x, y, "floor");
      }
    }
  }

  function connectRooms(tiles, width, rooms) {
    for (let index = 1; index < rooms.length; index += 1) {
      const a = roomCenter(rooms[index - 1]);
      const b = roomCenter(rooms[index]);
      if (Math.random() < 0.5) {
        carveHorizontal(tiles, width, a.x, b.x, a.y);
        carveVertical(tiles, width, a.y, b.y, b.x);
      } else {
        carveVertical(tiles, width, a.y, b.y, a.x);
        carveHorizontal(tiles, width, a.x, b.x, b.y);
      }
    }
  }

  function carveHorizontal(tiles, width, fromX, toX, y) {
    for (let x = Math.min(fromX, toX); x <= Math.max(fromX, toX); x += 1) {
      setGeneratedTile(tiles, width, x, y, "floor");
    }
  }

  function carveVertical(tiles, width, fromY, toY, x) {
    for (let y = Math.min(fromY, toY); y <= Math.max(fromY, toY); y += 1) {
      setGeneratedTile(tiles, width, x, y, "floor");
    }
  }

  function setGeneratedTile(tiles, width, x, y, value) {
    tiles[y * width + x] = value;
  }

  function roomCenter(room) {
    return {
      x: room.centerX,
      y: room.centerY
    };
  }

  function createRoomMeta(index, x, y, width, height) {
    return {
      id: `room_${index}`,
      x,
      y,
      width,
      height,
      centerX: Math.floor(x + width / 2),
      centerY: Math.floor(y + height / 2),
      isStartRoom: false,
      isStairsRoom: false
    };
  }

  function findFarthestRoom(rooms, point) {
    return rooms
      .slice(1)
      .sort((a, b) => {
        const centerA = roomCenter(a);
        const centerB = roomCenter(b);
        return manhattan(centerB.x, centerB.y, point.x, point.y) - manhattan(centerA.x, centerA.y, point.x, point.y);
      })[0] || rooms[rooms.length - 1];
  }

  function getFloorRules(floorIndex) {
    const rules = config.dungeon.generation.floorRules || DEFAULT_CONFIG.dungeon.generation.floorRules;
    return rules[Math.min(floorIndex, rules.length - 1)];
  }

  function randomFromRange(range) {
    if (!Array.isArray(range)) {
      return Number(range) || 0;
    }
    return randomInt(range[0], range[1]);
  }

  function randomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function keyOf(x, y) {
    return `${x},${y}`;
  }

  function getMonsterCatalog() {
    return config.monsters || DEFAULT_CONFIG.monsters || {};
  }

  function getMonsterTemplate(type = "slime") {
    const catalog = getMonsterCatalog();
    if (catalog[type]) {
      return catalog[type];
    }
    if (catalog.slime) {
      return catalog.slime;
    }
    return {
      id: "slime",
      name: config.monster?.name || "Slime",
      hp: config.monster?.hp || 6,
      attack: config.monster?.attack || 3,
      behavior: "melee",
      icon: "S",
      color: "#9b5ad7"
    };
  }

  function getMonsterTypeWeights(floorIndex) {
    const rules = getFloorRules(floorIndex);
    if (Array.isArray(rules.monsterTypes) && rules.monsterTypes.length > 0) {
      return rules.monsterTypes;
    }
    return [{ type: "slime", weight: 100 }];
  }

  function pickWeightedMonsterType(floorIndex, roomState = null) {
    const weights = getMonsterTypeWeights(floorIndex);
    let pool = weights.filter((entry) => Number(entry.weight) > 0);
    if (roomState && roomState.highThreatCount >= 1) {
      const saferPool = pool.filter((entry) => !HIGH_THREAT_MONSTER_TYPES.has(entry.type));
      if (saferPool.length > 0) {
        pool = saferPool;
      }
    }
    const total = pool.reduce((sum, entry) => sum + Number(entry.weight), 0);
    if (total <= 0) {
      return "slime";
    }
    let roll = Math.random() * total;
    for (const entry of pool) {
      roll -= Number(entry.weight);
      if (roll <= 0) {
        return entry.type;
      }
    }
    return pool[pool.length - 1].type;
  }

  function isRoomCell(room, x, y) {
    return (
      x >= room.x &&
      x < room.x + room.width &&
      y >= room.y &&
      y < room.y + room.height
    );
  }

  function isRoomInteriorCell(room, x, y) {
    if (!isRoomCell(room, x, y)) {
      return false;
    }
    if (room.width <= 3 || room.height <= 3) {
      return true;
    }
    return (
      x > room.x &&
      x < room.x + room.width - 1 &&
      y > room.y &&
      y < room.y + room.height - 1
    );
  }

  function collectRoomCells(room, tiles, width, occupied, predicate = null) {
    const candidates = [];
    for (let y = room.y; y < room.y + room.height; y += 1) {
      for (let x = room.x; x < room.x + room.width; x += 1) {
        if (tiles[y * width + x] !== "floor" || occupied.has(keyOf(x, y))) {
          continue;
        }
        const candidate = { x, y };
        if (!predicate || predicate(candidate)) {
          candidates.push(candidate);
        }
      }
    }
    return candidates;
  }

  function takeRandomRoomCell(room, tiles, width, occupied, predicate = null) {
    const preferred = collectRoomCells(room, tiles, width, occupied, (candidate) => (
      isRoomInteriorCell(room, candidate.x, candidate.y) &&
      (!predicate || predicate(candidate))
    ));
    const fallback = preferred.length > 0 ? preferred : collectRoomCells(room, tiles, width, occupied, predicate);
    if (fallback.length === 0) {
      return null;
    }
    return fallback[Math.floor(Math.random() * fallback.length)];
  }

  function isValidMonsterCell(candidate, room, stairs) {
    if (!isRoomCell(room, candidate.x, candidate.y)) {
      return false;
    }
    if (candidate.x === stairs.x && candidate.y === stairs.y) {
      return false;
    }
    if (manhattan(candidate.x, candidate.y, stairs.x, stairs.y) <= 1) {
      return false;
    }
    return true;
  }

  function placeMonsterInRoom(monsters, room, occupied, tiles, width, floorIndex, stairs, roomState = null) {
    const cell = takeRandomRoomCell(room, tiles, width, occupied, (candidate) => isValidMonsterCell(candidate, room, stairs));
    if (!cell) {
      return false;
    }
    const type = pickWeightedMonsterType(floorIndex, roomState);
    occupied.add(keyOf(cell.x, cell.y));
    monsters.push(createMonster(cell.x, cell.y, `${floorIndex}_${monsters.length}`, type));
    if (roomState) {
      roomState.count += 1;
      roomState.types[type] = (roomState.types[type] || 0) + 1;
      if (HIGH_THREAT_MONSTER_TYPES.has(type)) {
        roomState.highThreatCount += 1;
      }
    }
    return true;
  }

  function placeMonstersByRoom(monsters, rooms, occupied, tiles, width, height, floorIndex, stairs) {
    const rules = getFloorRules(floorIndex);
    const spawnRooms = rooms.filter((room) => !room.isStartRoom);
    const largeRoomBonus = spawnRooms.reduce((count, room) => count + (room.width * room.height > 50 ? 1 : 0), 0);
    const targetTotal = Math.max(randomFromRange(rules.monsters), spawnRooms.length + largeRoomBonus);
    const roomStates = new Map(spawnRooms.map((room) => [room.id, { count: 0, highThreatCount: 0, types: {} }]));

    spawnRooms.forEach((room) => {
      const roomState = roomStates.get(room.id);
      placeMonsterInRoom(monsters, room, occupied, tiles, width, floorIndex, stairs, roomState);
      if (room.width * room.height > 50) {
        placeMonsterInRoom(monsters, room, occupied, tiles, width, floorIndex, stairs, roomState);
      }
    });

    let attempts = 0;
    while (monsters.length < targetTotal && attempts < targetTotal * 4) {
      attempts += 1;
      const room = spawnRooms[Math.floor(Math.random() * spawnRooms.length)];
      if (!room) {
        break;
      }
      placeMonsterInRoom(monsters, room, occupied, tiles, width, floorIndex, stairs, roomStates.get(room.id));
    }
  }

  function placeMonsters(monsters, occupied, tiles, width, height, count, floorIndex, playerStart) {
    const minPlayerDistance = Math.max(3, 5 - floorIndex);
    for (let index = 0; index < count; index += 1) {
      const cell = takeRandomFloorCell(tiles, width, height, occupied, (candidate) => (
        manhattan(candidate.x, candidate.y, playerStart.x, playerStart.y) >= minPlayerDistance
      ));
      if (!cell) {
        return;
      }
      occupied.add(keyOf(cell.x, cell.y));
      monsters.push(createMonster(cell.x, cell.y, `${floorIndex}_${index}`));
    }
  }

  function placeItems(itemsOnGround, occupied, tiles, width, height, type, count, floorIndex) {
    for (let index = 0; index < count; index += 1) {
      const cell = takeRandomFloorCell(tiles, width, height, occupied);
      if (!cell) {
        return;
      }
      occupied.add(keyOf(cell.x, cell.y));
      itemsOnGround.push({
        id: `item_${floorIndex}_${type}_${index}_${Date.now()}`,
        type,
        x: cell.x,
        y: cell.y
      });
    }
  }

  function placeStrategyItems(itemsOnGround, occupied, tiles, width, height, count, floorIndex) {
    const types = config.dungeon.generation.strategyItemTypes || DEFAULT_CONFIG.dungeon.generation.strategyItemTypes;
    for (let index = 0; index < count; index += 1) {
      placeItems(itemsOnGround, occupied, tiles, width, height, types[index % types.length], 1, floorIndex);
    }
  }

  function isValidEquipmentCell(candidate, playerStart, stairs) {
    if (candidate.x === playerStart.x && candidate.y === playerStart.y) {
      return false;
    }
    if (candidate.x === stairs.x && candidate.y === stairs.y) {
      return false;
    }
    if (manhattan(candidate.x, candidate.y, stairs.x, stairs.y) <= 1) {
      return false;
    }
    return true;
  }

  function pickWeightedEquipmentType(entries, fallback = "short_sword") {
    return pickWeightedHazardType(entries, fallback);
  }

  function placeEquipmentDrops(equipmentOnGround, rooms, occupied, tiles, width, height, floorIndex, playerStart, stairs) {
    const rules = getFloorRules(floorIndex);
    const count = randomFromRange(rules.equipment || [0, 0]);
    const dropRooms = rooms.filter((room) => !room.isStartRoom);
    for (let index = 0; index < count; index += 1) {
      let cell = null;
      if (dropRooms.length > 0) {
        const room = dropRooms[Math.floor(Math.random() * dropRooms.length)];
        cell = takeRandomRoomCell(room, tiles, width, occupied, (candidate) => isValidEquipmentCell(candidate, playerStart, stairs));
      }
      if (!cell) {
        cell = takeRandomFloorCell(tiles, width, height, occupied, (candidate) => isValidEquipmentCell(candidate, playerStart, stairs));
      }
      if (!cell) {
        return;
      }
      const type = pickWeightedEquipmentType(rules.equipmentTypes, "short_sword");
      occupied.add(keyOf(cell.x, cell.y));
      equipmentOnGround.push(createEquipmentDrop(type, cell.x, cell.y, `${floorIndex}_${index}`));
    }
  }

  function pickWeightedHazardType(entries, fallback) {
    const pool = (entries || []).filter((entry) => Number(entry.weight) > 0);
    if (pool.length === 0) {
      return fallback;
    }
    const total = pool.reduce((sum, entry) => sum + Number(entry.weight), 0);
    let roll = Math.random() * total;
    for (const entry of pool) {
      roll -= Number(entry.weight);
      if (roll <= 0) {
        return entry.type;
      }
    }
    return pool[pool.length - 1].type;
  }

  function isValidHazardCell(candidate, playerStart, stairs) {
    if (candidate.x === playerStart.x && candidate.y === playerStart.y) {
      return false;
    }
    if (candidate.x === stairs.x && candidate.y === stairs.y) {
      return false;
    }
    if (manhattan(candidate.x, candidate.y, stairs.x, stairs.y) <= 1) {
      return false;
    }
    if (manhattan(candidate.x, candidate.y, playerStart.x, playerStart.y) <= 1) {
      return false;
    }
    return true;
  }

  function takeRandomHazardCell(rooms, tiles, width, height, occupied, playerStart, stairs) {
    const hazardRooms = rooms.filter((room) => !room.isStartRoom);
    if (hazardRooms.length > 0) {
      const shuffled = shuffle(hazardRooms);
      for (const room of shuffled) {
        const cell = takeRandomRoomCell(room, tiles, width, occupied, (candidate) => isValidHazardCell(candidate, playerStart, stairs));
        if (cell) {
          return cell;
        }
      }
    }
    return takeRandomFloorCell(tiles, width, height, occupied, (candidate) => isValidHazardCell(candidate, playerStart, stairs));
  }

  function placeHazards(traps, terrainHazards, rooms, occupied, tiles, width, height, floorIndex, playerStart, stairs) {
    placeTraps(traps, rooms, occupied, tiles, width, height, floorIndex, playerStart, stairs);
    placeTerrainHazards(terrainHazards, rooms, occupied, tiles, width, height, floorIndex, playerStart, stairs);
  }

  function placeTraps(traps, rooms, occupied, tiles, width, height, floorIndex, playerStart, stairs) {
    const rules = getHazardFloorRules(floorIndex);
    const count = randomFromRange(rules.traps);
    for (let index = 0; index < count; index += 1) {
      const cell = takeRandomHazardCell(rooms, tiles, width, height, occupied, playerStart, stairs);
      if (!cell) {
        return;
      }
      const type = pickWeightedHazardType(rules.trapTypes, "spike_trap");
      occupied.add(keyOf(cell.x, cell.y));
      traps.push(createTrap(cell.x, cell.y, `${floorIndex}_${index}`, type));
    }
  }

  function placeTerrainHazards(terrainHazards, rooms, occupied, tiles, width, height, floorIndex, playerStart, stairs) {
    const rules = getHazardFloorRules(floorIndex);
    const count = randomFromRange(rules.terrain);
    for (let index = 0; index < count; index += 1) {
      const cell = takeRandomHazardCell(rooms, tiles, width, height, occupied, playerStart, stairs);
      if (!cell) {
        return;
      }
      const type = pickWeightedHazardType(rules.terrainTypes, "poison_pool");
      occupied.add(keyOf(cell.x, cell.y));
      terrainHazards.push(createTerrainHazard(cell.x, cell.y, `${floorIndex}_${index}`, type));
    }
  }

  function takeRandomFloorCell(tiles, width, height, occupied, predicate = null) {
    const candidates = [];
    for (let y = 1; y < height - 1; y += 1) {
      for (let x = 1; x < width - 1; x += 1) {
        const candidate = { x, y };
        if (tiles[y * width + x] === "floor" && !occupied.has(keyOf(x, y)) && (!predicate || predicate(candidate))) {
          candidates.push(candidate);
        }
      }
    }

    if (candidates.length === 0) {
      if (predicate) {
        return takeRandomFloorCell(tiles, width, height, occupied, null);
      }
      return null;
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function createMonster(x, y, index, type = "slime") {
    const template = getMonsterTemplate(type);
    return {
      id: `monster_${index}_${Date.now()}`,
      type: template.id || type,
      name: template.name,
      x,
      y,
      hp: template.hp,
      maxHp: template.hp,
      attack: template.attack,
      behavior: template.behavior || "melee",
      range: template.range || 1,
      sporeRange: template.sporeRange || 0,
      sporeSleepTurns: template.sleepTurns || 0,
      cooldown: template.cooldown || 0,
      cooldownRemaining: 0,
      icon: template.icon || "S",
      color: template.color || "#9b5ad7",
      sleepTurns: 0,
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

  function itemAt(x, y) {
    return state.itemsOnGround.find((item) => item.x === x && item.y === y);
  }

  function equipmentAt(x, y) {
    return state.equipmentOnGround.find((item) => item.x === x && item.y === y);
  }

  function trapAt(x, y) {
    return state.trapLookup.get(keyOf(x, y)) || null;
  }

  function terrainAt(x, y) {
    return state.terrainLookup.get(keyOf(x, y)) || null;
  }

  function isOnStairs() {
    return state.player.x === state.stairs.x && state.player.y === state.stairs.y;
  }

  function isHazardTile(x, y) {
    return Boolean(trapAt(x, y) || terrainAt(x, y));
  }

  function getEquippedItem(slot) {
    return state.player.equipment[slot] || null;
  }

  function getPlayerAttack() {
    const weaponBonus = getEquippedItem("weapon")?.attackBonus || 0;
    return state.player.baseAttack + weaponBonus;
  }

  function getPlayerDefense() {
    const shieldBonus = getEquippedItem("shield")?.defenseBonus || 0;
    return state.player.baseDefense + shieldBonus;
  }

  function formatEquipmentStats(item) {
    if (!item) {
      return "";
    }
    const parts = [];
    if ((item.attackBonus || 0) > 0) {
      parts.push(`ATK+${item.attackBonus}`);
    }
    if ((item.defenseBonus || 0) > 0) {
      parts.push(`DEF+${item.defenseBonus}`);
    }
    return parts.join(" / ");
  }

  function getEquipmentLabel(item) {
    if (!item) {
      return "-";
    }
    const stats = formatEquipmentStats(item);
    return stats ? `${item.name} ${stats}` : item.name;
  }

  function getGroundEquipmentPrompt() {
    const groundItem = equipmentAt(state.player.x, state.player.y);
    if (!groundItem) {
      return "";
    }
    const current = getEquippedItem(groundItem.slot);
    if (!current) {
      return `脚下有 ${getEquipmentLabel(groundItem)}。按 C 装备。`;
    }
    return `脚下有 ${getEquipmentLabel(groundItem)}。按 C 替换当前 ${getEquipmentLabel(current)}。`;
  }

  function manhattan(ax, ay, bx, by) {
    return Math.abs(ax - bx) + Math.abs(ay - by);
  }

  function isStraightLine(ax, ay, bx, by) {
    return ax === bx || ay === by;
  }

  function hasLineOfSight(ax, ay, bx, by) {
    if (!isStraightLine(ax, ay, bx, by)) {
      return false;
    }
    const stepX = Math.sign(bx - ax);
    const stepY = Math.sign(by - ay);
    let x = ax + stepX;
    let y = ay + stepY;
    while (x !== bx || y !== by) {
      if (!isWalkable(x, y)) {
        return false;
      }
      x += stepX;
      y += stepY;
    }
    return true;
  }

  function removeTrap(trap) {
    state.traps = state.traps.filter((item) => item !== trap);
    state.trapLookup.delete(keyOf(trap.x, trap.y));
  }

  function triggerTrapAt(x, y) {
    const trap = trapAt(x, y);
    if (!trap) {
      return false;
    }
    switch (trap.type) {
      case "warp_trap": {
        const destination = findSafeTeleportDestination();
        if (!destination) {
          addMessage(`${trap.name} 触发了，但没有找到安全落点。`);
          break;
        }
        state.player.x = destination.x;
        state.player.y = destination.y;
        addFloater(destination.x, destination.y, "Warp", trap.color);
        addMessage("传送陷阱启动了，你被传送到了别处。");
        break;
      }
      case "sleep_trap":
        state.player.sleepTurns = Math.max(state.player.sleepTurns, trap.sleepTurns);
        addFloater(x, y, "Sleep", trap.color);
        addMessage("你踩中了睡眠陷阱，陷入沉睡。");
        break;
      default:
        state.player.hp = Math.max(0, state.player.hp - trap.damage);
        state.player.hitFlash = 0.25;
        addFloater(x, y, `-${trap.damage}`, trap.color);
        addMessage(`你踩中了地刺陷阱，受到 ${trap.damage} 点伤害。`);
        if (state.player.hp <= 0) {
          state.deathReason = "你被地刺陷阱击倒，HP 归零。";
          finishGame(false, state.deathReason);
        }
        break;
    }
    if (trap.singleUse) {
      removeTrap(trap);
      addMessage(`${trap.name} 已失效。`);
    }
    return true;
  }

  function applyTerrainAt(x, y) {
    const terrain = terrainAt(x, y);
    if (!terrain) {
      return false;
    }
    if (terrain.type === "poison_pool") {
      state.player.hp = Math.max(0, state.player.hp - terrain.damage);
      state.player.hitFlash = 0.25;
      addFloater(x, y, `-${terrain.damage}`, terrain.color);
      addMessage(`毒沼腐蚀了你，受到 ${terrain.damage} 点伤害。`);
      if (state.player.hp <= 0) {
        state.deathReason = "你被毒沼腐蚀倒下，HP 归零。";
        finishGame(false, state.deathReason);
      }
      return true;
    }
    return false;
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

  function maybeSkipPlayerTurnForSleep() {
    if (!state || state.player.sleepTurns <= 0) {
      return false;
    }
    addMessage(`你仍在睡眠中，还要 ${state.player.sleepTurns} 回合才能行动。`);
    advanceSleepingTurn();
    return true;
  }

  function tryMove(dx, dy) {
    if (!canAct()) {
      return;
    }
    if (maybeSkipPlayerTurnForSleep()) {
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
    triggerTrapAt(state.player.x, state.player.y);
    if (state.gameOver) {
      updateUi();
      return;
    }
    pickupItem();
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
    const damage = getPlayerAttack();
    monster.hp -= damage;
    monster.hitFlash = 0.25;
    addFloater(monster.x, monster.y, `-${damage}`, "#df6657");
    addMessage(`你攻击 ${monster.name}，造成 ${damage} 点伤害。`);
    if (monster.hp <= 0) {
      state.monsters = state.monsters.filter((item) => item !== monster);
      state.kills += 1;
      addMessage(`${monster.name} 被击败了。`);
    }
  }

  function getItemConfig(type) {
    return (config.items && config.items[type]) || DEFAULT_CONFIG.items[type];
  }

  function itemLabel(type) {
    return getItemConfig(type).name || ITEM_META[type].label;
  }

  function pickupItem() {
    const item = itemAt(state.player.x, state.player.y);
    if (!item) {
      return;
    }
    state.itemsOnGround = state.itemsOnGround.filter((groundItem) => groundItem !== item);
    state.inventory[item.type] += 1;
    addFloater(state.player.x, state.player.y, `+${ITEM_META[item.type].icon}`, ITEM_META[item.type].color);
    addMessage(`捡到 ${itemLabel(item.type)}。`);
  }

  function equipGroundItem() {
    if (!canAct()) {
      return;
    }
    if (maybeSkipPlayerTurnForSleep()) {
      return;
    }
    const groundItem = equipmentAt(state.player.x, state.player.y);
    if (!groundItem) {
      addMessage("脚下没有可装备的物品。");
      updateUi();
      return;
    }
    const current = getEquippedItem(groundItem.slot);
    state.player.equipment[groundItem.slot] = createEquipmentDrop(groundItem.type, 0, 0, `equipped_${groundItem.slot}`);
    delete state.player.equipment[groundItem.slot].x;
    delete state.player.equipment[groundItem.slot].y;
    if (current) {
      const dropped = createEquipmentDrop(current.type, state.player.x, state.player.y, `swap_${groundItem.slot}`);
      state.equipmentOnGround = state.equipmentOnGround.map((item) => (item === groundItem ? dropped : item));
      addMessage(`你换下 ${getEquipmentLabel(current)}，装备了 ${getEquipmentLabel(groundItem)}。`);
    } else {
      state.equipmentOnGround = state.equipmentOnGround.filter((item) => item !== groundItem);
      addMessage(`你装备了 ${getEquipmentLabel(groundItem)}。`);
    }
    addFloater(state.player.x, state.player.y, formatEquipmentStats(groundItem) || "装备", groundItem.color);
    advanceTurn();
  }

  function hasItem(type) {
    return state.inventory[type] > 0;
  }

  function consumeItem(type) {
    state.inventory[type] -= 1;
    state.itemsUsed += 1;
  }

  function usePotion() {
    if (!canAct()) {
      return;
    }
    if (maybeSkipPlayerTurnForSleep()) {
      return;
    }
    if (!hasItem("potion")) {
      addMessage("没有恢复药。");
      updateUi();
      return;
    }
    if (state.player.hp >= state.player.maxHp) {
      addMessage("HP 已满，先把恢复药留着。");
      updateUi();
      return;
    }
    const item = getItemConfig("potion");
    const before = state.player.hp;
    state.player.hp = Math.min(state.player.maxHp, state.player.hp + item.heal);
    consumeItem("potion");
    addFloater(state.player.x, state.player.y, `+${state.player.hp - before}`, "#6fc38b");
    addMessage(`使用 ${item.name}，恢复 ${state.player.hp - before} HP。`);
    advanceTurn();
  }

  function useFood() {
    if (!canAct()) {
      return;
    }
    if (maybeSkipPlayerTurnForSleep()) {
      return;
    }
    if (!hasItem("food")) {
      addMessage("没有食物。");
      updateUi();
      return;
    }
    if (state.player.satiety >= state.player.maxSatiety) {
      addMessage("饱腹度已满，食物先留着。");
      updateUi();
      return;
    }
    const item = getItemConfig("food");
    const before = state.player.satiety;
    state.player.satiety = Math.min(state.player.maxSatiety, state.player.satiety + item.satiety);
    consumeItem("food");
    addFloater(state.player.x, state.player.y, `+${state.player.satiety - before}`, "#f2c85b");
    if (state.player.satiety > getHungerConfig().lowThreshold) {
      state.lowSatietyWarned = false;
    }
    addMessage(`吃下食物，饱腹度恢复 ${state.player.satiety - before}。`);
    advanceTurn();
  }

  function useTeleport() {
    if (!canAct()) {
      return;
    }
    if (maybeSkipPlayerTurnForSleep()) {
      return;
    }
    if (!hasItem("teleport")) {
      addMessage("没有传送卷轴。");
      updateUi();
      return;
    }
    const destination = findTeleportDestination();
    if (!destination) {
      addMessage("没有可传送的安全地板。");
      updateUi();
      return;
    }
    consumeItem("teleport");
    state.player.x = destination.x;
    state.player.y = destination.y;
    pickupItem();
    addFloater(state.player.x, state.player.y, "传送", "#7fb7d7");
    addMessage("使用传送卷轴，脱离危险。");
    advanceTurn();
  }

  function findTeleportDestination() {
    const candidates = [];
    for (let y = 0; y < state.height; y += 1) {
      for (let x = 0; x < state.width; x += 1) {
        if (!isWalkable(x, y)) {
          continue;
        }
        if (state.player.x === x && state.player.y === y) {
          continue;
        }
        if (monsterAt(x, y)) {
          continue;
        }
        if (isHazardTile(x, y)) {
          continue;
        }
        candidates.push({ x, y });
      }
    }
    if (candidates.length === 0) {
      return null;
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function findSafeTeleportDestination() {
    const candidates = [];
    for (let y = 0; y < state.height; y += 1) {
      for (let x = 0; x < state.width; x += 1) {
        if (!isWalkable(x, y)) {
          continue;
        }
        if (state.player.x === x && state.player.y === y) {
          continue;
        }
        if (monsterAt(x, y)) {
          continue;
        }
        if (itemAt(x, y)) {
          continue;
        }
        if (state.stairs.x === x && state.stairs.y === y) {
          continue;
        }
        if (isHazardTile(x, y)) {
          continue;
        }
        if (manhattan(x, y, state.stairs.x, state.stairs.y) <= 1) {
          continue;
        }
        candidates.push({ x, y });
      }
    }
    if (candidates.length === 0) {
      return null;
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function useSleepScroll() {
    if (!canAct()) {
      return;
    }
    if (maybeSkipPlayerTurnForSleep()) {
      return;
    }
    if (!hasItem("sleep")) {
      addMessage("没有睡眠卷轴。");
      updateUi();
      return;
    }
    const item = getItemConfig("sleep");
    const targets = state.monsters.filter((monster) => manhattan(monster.x, monster.y, state.player.x, state.player.y) <= item.range);
    if (targets.length === 0) {
      addMessage("附近没有可催眠的怪物。");
      updateUi();
      return;
    }
    consumeItem("sleep");
    targets.forEach((monster) => {
      monster.sleepTurns = Math.max(monster.sleepTurns, item.turns);
    });
    addFloater(state.player.x, state.player.y, "Zzz", "#a88ee8");
    addMessage(`使用睡眠卷轴，${targets.length} 只怪物睡着了。`);
    advanceTurn();
  }

  function useFireball() {
    if (!canAct()) {
      return;
    }
    if (maybeSkipPlayerTurnForSleep()) {
      return;
    }
    if (!hasItem("fireball")) {
      addMessage("没有火球杖。");
      updateUi();
      return;
    }
    const target = findLineTarget();
    if (!target) {
      addMessage("火球杖前方没有目标，不消耗道具。");
      updateUi();
      return;
    }
    const item = getItemConfig("fireball");
    consumeItem("fireball");
    target.hp -= item.damage;
    target.hitFlash = 0.25;
    addFloater(target.x, target.y, `-${item.damage}`, "#df6657");
    addMessage(`火球命中 ${target.name}，造成 ${item.damage} 点伤害。`);
    if (target.hp <= 0) {
      state.monsters = state.monsters.filter((monster) => monster !== target);
      state.kills += 1;
      addMessage(`${target.name} 被火球击败。`);
    }
    advanceTurn();
  }

  function useSwapStaff() {
    if (!canAct()) {
      return;
    }
    if (maybeSkipPlayerTurnForSleep()) {
      return;
    }
    if (!hasItem("swap")) {
      addMessage("没有换位杖。");
      updateUi();
      return;
    }
    const target = findLineTarget();
    if (!target) {
      addMessage("换位杖前方没有目标，不消耗道具。");
      updateUi();
      return;
    }
    consumeItem("swap");
    const playerX = state.player.x;
    const playerY = state.player.y;
    state.player.x = target.x;
    state.player.y = target.y;
    target.x = playerX;
    target.y = playerY;
    pickupItem();
    addFloater(state.player.x, state.player.y, "鎹綅", "#f08a54");
    addMessage(`使用换位杖，与 ${target.name} 交换位置。`);
    advanceTurn();
  }

  function findLineTarget() {
    const dir = DIRS[state.player.facing] || DIRS.down;
    let x = state.player.x + dir.x;
    let y = state.player.y + dir.y;
    while (isWalkable(x, y)) {
      const target = monsterAt(x, y);
      if (target) {
        return target;
      }
      x += dir.x;
      y += dir.y;
    }
    return null;
  }

  function waitTurn() {
    if (!canAct()) {
      return;
    }
    if (maybeSkipPlayerTurnForSleep()) {
      return;
    }
    addMessage("你停下脚步，观察怪物动向。");
    advanceTurn();
  }

  function descendStairs() {
    if (!canAct()) {
      return;
    }
    if (maybeSkipPlayerTurnForSleep()) {
      return;
    }
    if (!isOnStairs()) {
      addMessage("脚下没有楼梯。");
      updateUi();
      return;
    }

    state.turn += 1;
    applyHunger();
    if (state.gameOver) {
      updateUi();
      return;
    }
    if (state.floor >= config.dungeon.maxFloors) {
      finishGame(true, "你穿过了第 3 层终点，完成了最小迷宫挑战。");
      return;
    }

    const nextFloor = state.floorIndex + 1;
    loadFloor(nextFloor);
    addMessage(`进入第 ${state.floor} 层：${state.floorName}。`);
    updateUi();
  }

  function advanceTurn() {
    state.turn += 1;
    applyHunger();
    if (state.gameOver) {
      updateUi();
      return;
    }
    applyTerrainAt(state.player.x, state.player.y);
    if (state.gameOver) {
      updateUi();
      return;
    }
    monstersAct();
    updateUi();
    if (!state.gameOver) {
      checkLowHp();
    }
  }

  function advanceSleepingTurn() {
    state.turn += 1;
    applyHunger();
    if (state.gameOver) {
      updateUi();
      return;
    }
    applyTerrainAt(state.player.x, state.player.y);
    if (state.gameOver) {
      updateUi();
      return;
    }
    monstersAct();
    if (!state.gameOver && state.player.sleepTurns > 0) {
      state.player.sleepTurns -= 1;
      if (state.player.sleepTurns === 0) {
        addMessage("你醒来了。");
      }
    }
    updateUi();
    if (!state.gameOver) {
      checkLowHp();
    }
  }

  function getHungerConfig() {
    return config.hunger || DEFAULT_CONFIG.hunger;
  }

  function getCameraConfig() {
    return config.camera || DEFAULT_CONFIG.camera;
  }

  function getCameraDefaults() {
    const camera = getCameraConfig();
    return {
      tileW: Number(camera.tileW) || 104,
      tileH: Number(camera.tileH) || 104,
      yScale: Number(camera.yScale) || 0.72,
      rowStep: Number(camera.rowStep) || 75,
      perspectiveOffset: Number(camera.perspectiveOffset) || 2,
      tileDepth: Number(camera.tileDepth) || 22,
      cameraZoom: Number(camera.cameraZoom) || 1,
      cameraCenterOffsetX: Number(camera.cameraCenterOffsetX) || 0,
      cameraCenterOffsetY: Number(camera.cameraCenterOffsetY) || 0
    };
  }

  function getCameraField(key) {
    return CAMERA_FIELDS.find((field) => field.key === key);
  }

  function roundCameraValue(field, value) {
    const factor = 10 ** field.digits;
    return Math.round(value * factor) / factor;
  }

  function sanitizeCameraValue(key, value) {
    const field = getCameraField(key);
    if (!field) {
      return value;
    }
    const numeric = Number(value);
    const safeValue = Number.isFinite(numeric) ? numeric : cameraDefaults[key];
    return roundCameraValue(field, clamp(safeValue, field.min, field.max));
  }

  function getCameraSession() {
    if (!cameraSession) {
      cameraDefaults = getCameraDefaults();
      cameraSession = clone(cameraDefaults);
    }
    return cameraSession;
  }

  function formatCameraValue(field, value) {
    return field.digits > 0 ? Number(value).toFixed(field.digits) : String(Math.round(value));
  }

  function getRoomAt(x, y) {
    if (!state || !state.rooms || state.rooms.length === 0) {
      return null;
    }
    return state.rooms.find((room) => isRoomCell(room, x, y)) || null;
  }

  function getCurrentRoom() {
    if (!state) {
      return null;
    }
    return getRoomAt(state.player.x, state.player.y);
  }

  function getCameraTarget() {
    return {
      x: state.player.x,
      y: state.player.y
    };
  }

  function applyHunger() {
    const hunger = getHungerConfig();
    if (!hunger || !hunger.enabled) {
      return;
    }

    if (state.player.satiety > 0) {
      state.hungerCounter += 1;
      if (state.hungerCounter >= hunger.satietyLossInterval) {
        state.hungerCounter = 0;
        state.player.satiety = Math.max(0, state.player.satiety - hunger.satietyLoss);
        if (state.player.satiety <= hunger.lowThreshold && !state.lowSatietyWarned) {
          state.lowSatietyWarned = true;
          addMessage("饱腹度很低，继续探索会有危险。");
        }
        if (state.player.satiety === 0) {
          addMessage("饱腹度归零，接下来饥饿会伤害 HP。");
        }
      }
      return;
    }

    state.starvationCounter += 1;
    if (state.starvationCounter >= hunger.starvationDamageInterval) {
      state.starvationCounter = 0;
      state.player.hp = Math.max(0, state.player.hp - hunger.starvationDamage);
      state.player.hitFlash = 0.25;
      addFloater(state.player.x, state.player.y, `-${hunger.starvationDamage}`, "#df6657");
      addMessage(`饥饿造成 ${hunger.starvationDamage} 点伤害。`);
      if (state.player.hp <= 0) {
        state.deathReason = "你因饥饿倒下，HP 归零。";
        finishGame(false, state.deathReason);
      }
    }
  }

  function monstersAct() {
    const actingMonsters = [...state.monsters];
    for (const monster of actingMonsters) {
      if (state.gameOver || !state.monsters.includes(monster)) {
        continue;
      }
      if (monster.sleepTurns > 0) {
        monster.sleepTurns -= 1;
        continue;
      }
      if (monster.cooldownRemaining > 0) {
        monster.cooldownRemaining -= 1;
      }
      actMonster(monster);
    }
  }

  function actMonster(monster) {
    switch (monster.behavior) {
      case "ranged":
        actRanged(monster);
        return;
      case "sleep_spore":
        actSleepMushroom(monster);
        return;
      case "reach_attack":
        actReachAttack(monster);
        return;
      default:
        actMelee(monster);
    }
  }

  function actMelee(monster) {
    if (manhattan(monster.x, monster.y, state.player.x, state.player.y) === 1) {
      monsterAttack(monster);
      return;
    }
    moveMonster(monster);
  }

  function actRanged(monster) {
    const distance = manhattan(monster.x, monster.y, state.player.x, state.player.y);
    if (distance === 1) {
      monsterAttack(monster);
      return;
    }
    if (
      isStraightLine(monster.x, monster.y, state.player.x, state.player.y) &&
      distance <= monster.range &&
      hasLineOfSight(monster.x, monster.y, state.player.x, state.player.y)
    ) {
      monsterAttack(monster, {
        message: (damage) => `${monster.name} 射中了你，造成 ${damage} 点伤害。`
      });
      return;
    }
    moveMonster(monster);
  }

  function actSleepMushroom(monster) {
    const distance = manhattan(monster.x, monster.y, state.player.x, state.player.y);
    if (monster.cooldownRemaining <= 0 && distance <= monster.sporeRange) {
      state.player.sleepTurns = Math.max(state.player.sleepTurns, monster.sporeSleepTurns);
      monster.cooldownRemaining = monster.cooldown;
      addFloater(state.player.x, state.player.y, "Sleep", "#a88ee8");
      addMessage(`${monster.name} 释放催眠孢子，你睡着了。`);
      return;
    }
    if (distance === 1) {
      monsterAttack(monster);
      return;
    }
    moveMonster(monster);
  }

  function actReachAttack(monster) {
    const distance = manhattan(monster.x, monster.y, state.player.x, state.player.y);
    if (
      isStraightLine(monster.x, monster.y, state.player.x, state.player.y) &&
      distance >= 1 &&
      distance <= monster.range &&
      hasLineOfSight(monster.x, monster.y, state.player.x, state.player.y)
    ) {
      monsterAttack(monster, {
        message: (damage) => `${monster.name} 用长枪刺中了你，造成 ${damage} 点伤害。`
      });
      return;
    }
    moveMonster(monster);
  }

  function monsterAttack(monster, options = {}) {
    const damage = Math.max(1, monster.attack - getPlayerDefense());
    state.player.hp = Math.max(0, state.player.hp - damage);
    state.player.hitFlash = 0.25;
    addFloater(state.player.x, state.player.y, `-${damage}`, "#df6657");
    const message = typeof options.message === "function"
      ? options.message(damage)
      : (options.message || `${monster.name} 攻击了你，造成 ${damage} 点伤害。`);
    addMessage(message);
    if (state.player.hp <= 0) {
      state.deathReason = `你被 ${monster.name} 击败，HP 归零。`;
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
    if (isHazardTile(x, y)) {
      return false;
    }
    if (state.player.x === x && state.player.y === y) {
      return false;
    }
    return !state.monsters.some((monster) => monster !== self && monster.x === x && monster.y === y);
  }

  function getMonsterThreatStyle(monster) {
    switch (monster.behavior) {
      case "ranged":
        return {
          fill: "rgba(216, 111, 82, 0.22)",
          stroke: "rgba(216, 111, 82, 0.5)"
        };
      case "sleep_spore":
        return {
          fill: "rgba(142, 115, 214, 0.22)",
          stroke: "rgba(168, 142, 232, 0.56)"
        };
      case "reach_attack":
        return {
          fill: "rgba(126, 195, 195, 0.2)",
          stroke: "rgba(126, 195, 195, 0.52)"
        };
      default:
        return {
          fill: "rgba(223, 102, 87, 0.24)",
          stroke: "rgba(223, 102, 87, 0.48)"
        };
    }
  }

  function getLinearThreatCells(monster, range) {
    const cells = [];
    Object.values(DIRS).forEach((dir) => {
      for (let step = 1; step <= range; step += 1) {
        const x = monster.x + dir.x * step;
        const y = monster.y + dir.y * step;
        if (!isWalkable(x, y)) {
          break;
        }
        cells.push({ x, y });
      }
    });
    return cells;
  }

  function getBurstThreatCells(monster, range) {
    const cells = [];
    for (let y = monster.y - range; y <= monster.y + range; y += 1) {
      for (let x = monster.x - range; x <= monster.x + range; x += 1) {
        if (manhattan(x, y, monster.x, monster.y) > range) {
          continue;
        }
        if (!isWalkable(x, y)) {
          continue;
        }
        cells.push({ x, y });
      }
    }
    return cells;
  }

  function getMonsterThreatCells(monster) {
    switch (monster.behavior) {
      case "ranged":
        return getLinearThreatCells(monster, monster.range);
      case "sleep_spore":
        return getBurstThreatCells(monster, monster.sporeRange);
      case "reach_attack":
        return getLinearThreatCells(monster, monster.range);
      default:
        return Object.values(DIRS)
          .map((dir) => ({ x: monster.x + dir.x, y: monster.y + dir.y }))
          .filter((cell) => isWalkable(cell.x, cell.y));
    }
  }

  function getMonsterStatusText(monster) {
    if (monster.sleepTurns > 0) {
      return `睡眠 ${monster.sleepTurns}`;
    }
    if (monster.behavior === "sleep_spore" && monster.cooldownRemaining > 0) {
      return `冷却 ${monster.cooldownRemaining}`;
    }
    const distance = manhattan(monster.x, monster.y, state.player.x, state.player.y);
    switch (monster.behavior) {
      case "ranged":
        return `${distance}格 / 射程${monster.range}`;
      case "sleep_spore":
        return `${distance}格 / 孢子${monster.sporeRange}`;
      case "reach_attack":
        return `${distance}格 / 枪距${monster.range}`;
      default:
        return `${distance}格 / 近战`;
    }
  }

  function getMonsterTurnLabel(monster) {
    if (monster.sleepTurns > 0) {
      return "Z";
    }
    return monster.icon || "敌";
  }
  function checkLowHp() {
    if (state.player.hp > 0 && state.player.hp <= 5) {
      addMessage("HP 很低，考虑使用恢复药或拉开距离。");
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
    ui.resultTitle.textContent = victory ? "鑳滃埄" : "姝讳骸";
    ui.resultCopy.textContent = copy;
    ui.resultFloor.textContent = `${state.floor}F`;
    ui.resultKills.textContent = String(state.kills);
    ui.resultItems.textContent = String(state.itemsUsed);
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
    if (state.player.sleepTurns > 0) {
      return `目标：你正在睡眠中，还要 ${state.player.sleepTurns} 回合才能行动。`;
    }
    if (equipmentAt(state.player.x, state.player.y)) {
      return "目标：脚下有装备。按 C 装备或替换，决定要不要换数值。";
    }
    if (isOnStairs()) {
      return state.floor >= config.dungeon.maxFloors ? "目标：按 E / Enter 进入终点并胜利。" : "目标：按 E / Enter 下楼，进入下一层。";
    }
    if (state.monsters.some((monster) => manhattan(monster.x, monster.y, state.player.x, state.player.y) === 1)) {
      return "目标：怪物贴身了。移动方向可以攻击，也可以用药或走位。";
    }
    if (state.player.satiety <= getHungerConfig().lowThreshold) {
      return "目标：饱腹度很低。吃食物、减少绕路，尽快决定搜刮还是下楼。";
    }
    return "目标：随机探索，搜刮道具，但别让饱腹度拖垮你。";
  }
  function updateUi() {
    if (!state) {
      return;
    }
    ui.hp.textContent = `${state.player.hp} / ${state.player.maxHp}`;
    ui.hp.style.color = state.player.hp <= 5 ? "#df6657" : "#6fc38b";
    ui.floor.textContent = `${state.floor}F`;
    ui.turn.textContent = `Turn ${state.turn}`;
    ui.potion.textContent = String(state.inventory.potion);
    ui.satiety.textContent = `${state.player.satiety} / ${state.player.maxSatiety}`;
    ui.attack.textContent = String(getPlayerAttack());
    ui.defense.textContent = String(getPlayerDefense());
    ui.weapon.textContent = getEquipmentLabel(getEquippedItem("weapon"));
    ui.shield.textContent = getEquipmentLabel(getEquippedItem("shield"));
    ui.satiety.style.color = state.player.satiety <= getHungerConfig().lowThreshold ? "#df6657" : "#7fb7d7";
    ui.objective.textContent = getObjective();
    ui.log.innerHTML = state.messages.map((message) => `<div>${escapeHtml(message)}</div>`).join("");

    const groundEquipmentPrompt = getGroundEquipmentPrompt();
    if (groundEquipmentPrompt && state.running && !state.paused) {
      ui.prompt.classList.remove("is-hidden");
      ui.prompt.textContent = groundEquipmentPrompt;
    } else if (isOnStairs() && state.running && !state.paused) {
      ui.prompt.classList.remove("is-hidden");
      ui.prompt.textContent = state.floor >= config.dungeon.maxFloors ? "楼梯通向终点。按 E / Enter 完成挑战。" : "站在楼梯上。按 E / Enter 进入下一层。";
    } else {
      ui.prompt.classList.add("is-hidden");
    }

    updateItemButtons();
    updateTacticalPanels();
    updateCameraConsole();
    ui.waitButton.disabled = !state.running || state.paused || state.gameOver;
    ui.stairsButton.disabled = !state.running || state.paused || state.gameOver || !isOnStairs();
    ui.equipButton.disabled = !state.running || state.paused || state.gameOver || !equipmentAt(state.player.x, state.player.y);
    ui.pause.setAttribute("aria-label", state.paused ? "resume" : "pause");
    markRenderDirty();
  }

  function buildCameraControls() {
    if (!ui.cameraControls) {
      return;
    }
    ui.cameraControls.innerHTML = CAMERA_FIELDS.map((field) => `
      <div class="camera-control">
        <div class="camera-control-head">
          <strong>${field.label}</strong>
          <span id="camera-${field.key}-value"></span>
        </div>
        <div class="camera-control-inputs">
          <input
            id="camera-${field.key}-range"
            class="camera-slider"
            type="range"
            min="${field.min}"
            max="${field.max}"
            step="${field.step}"
            data-camera-key="${field.key}"
            data-camera-input="range"
          >
          <input
            id="camera-${field.key}-number"
            class="camera-number"
            type="number"
            min="${field.min}"
            max="${field.max}"
            step="${field.step}"
            data-camera-key="${field.key}"
            data-camera-input="number"
          >
        </div>
      </div>
    `).join("");

    ui.cameraControls.querySelectorAll("[data-camera-key]").forEach((input) => {
      input.addEventListener("input", (event) => {
        const { cameraKey, cameraInput } = event.target.dataset;
        setCameraField(cameraKey, event.target.value, cameraInput);
      });
      input.addEventListener("change", (event) => {
        const { cameraKey, cameraInput } = event.target.dataset;
        setCameraField(cameraKey, event.target.value, cameraInput);
      });
    });
  }

  function updateCameraConsole() {
    const session = getCameraSession();
    CAMERA_FIELDS.forEach((field) => {
      const value = sanitizeCameraValue(field.key, session[field.key]);
      session[field.key] = value;
      const valueLabel = document.getElementById(`camera-${field.key}-value`);
      const range = document.getElementById(`camera-${field.key}-range`);
      const number = document.getElementById(`camera-${field.key}-number`);
      if (valueLabel) {
        valueLabel.textContent = formatCameraValue(field, value);
      }
      if (range) {
        range.value = String(value);
      }
      if (number) {
        number.value = String(value);
      }
    });
    if (ui.cameraJson) {
      ui.cameraJson.textContent = JSON.stringify(session, null, 2);
    }
  }

  function setCameraField(key, rawValue, source) {
    const session = getCameraSession();
    const nextValue = sanitizeCameraValue(key, rawValue);
    session[key] = nextValue;
    updateCameraConsole();
    if (source === "number") {
      const range = document.getElementById(`camera-${key}-range`);
      if (range) {
        range.value = String(nextValue);
      }
    }
    resizeCanvas();
  }

  function resetCameraSession() {
    cameraSession = clone(cameraDefaults || getCameraDefaults());
    updateCameraConsole();
    resizeCanvas();
    addMessage("镜头参数已重置为当前配置默认值。");
    updateUi();
  }

  async function copyCameraSession() {
    const payload = JSON.stringify(getCameraSession(), null, 2);
    let copied = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(payload);
        copied = true;
      } catch (error) {
        console.warn("Unable to copy camera parameters.", error);
      }
    }
    addMessage(copied ? "当前镜头参数已复制，可直接回传给 Codex。" : "无法直接访问剪贴板，请从 Console 复制当前镜头参数。");
    updateUi();
  }

  function updateItemButtons() {
    ITEM_ORDER.forEach((type) => {
      const meta = ITEM_META[type];
      const button = ui[meta.button];
      const item = getItemConfig(type);
      const count = state.inventory[type];
      button.innerHTML = `
        <span class="slot-key">${escapeHtml(item.key)}</span>
        <span class="slot-icon" style="color: ${meta.color}">${escapeHtml(meta.icon)}</span>
        <span class="slot-label">${escapeHtml(meta.label)}</span>
        <span class="slot-count">x${count}</span>
      `;
      button.disabled = !state.running || state.paused || state.gameOver || count <= 0 || itemBlocked(type);
      button.title = getItemTitle(type);
    });
  }

  function updateTacticalPanels() {
    drawMinimap();
    updateEnemyPanel();
  }

  function drawMinimap() {
    if (!minimapCtx || !ui.minimap || !state) {
      return;
    }
    const rect = ui.minimap.getBoundingClientRect();
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const width = Math.max(1, Math.floor(rect.width * dpr));
    const height = Math.max(1, Math.floor(rect.height * dpr));
    if (ui.minimap.width !== width || ui.minimap.height !== height) {
      ui.minimap.width = width;
      ui.minimap.height = height;
    }
    minimapCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    minimapCtx.clearRect(0, 0, rect.width, rect.height);
    minimapCtx.fillStyle = "rgba(5, 7, 8, 0.86)";
    minimapCtx.fillRect(0, 0, rect.width, rect.height);

    const pad = 8;
    const cell = Math.max(3, Math.floor(Math.min((rect.width - pad * 2) / state.width, (rect.height - pad * 2) / state.height)));
    const offsetX = Math.floor((rect.width - state.width * cell) / 2);
    const offsetY = Math.floor((rect.height - state.height * cell) / 2);

    for (let y = 0; y < state.height; y += 1) {
      for (let x = 0; x < state.width; x += 1) {
        minimapCtx.fillStyle = getTile(x, y) === "wall" ? "rgba(73, 63, 48, 0.72)" : "rgba(116, 139, 91, 0.9)";
        minimapCtx.fillRect(offsetX + x * cell, offsetY + y * cell, Math.max(1, cell - 1), Math.max(1, cell - 1));
      }
    }

    state.itemsOnGround.forEach((item) => {
      minimapCtx.fillStyle = ITEM_META[item.type].color;
      minimapCtx.fillRect(offsetX + item.x * cell, offsetY + item.y * cell, cell, cell);
    });
    state.equipmentOnGround.forEach((item) => {
      minimapCtx.fillStyle = item.color || "#d8d1c3";
      minimapCtx.fillRect(offsetX + item.x * cell, offsetY + item.y * cell, cell, cell);
    });
    state.terrainHazards.forEach((terrain) => {
      minimapCtx.fillStyle = terrain.color || "#5fae63";
      minimapCtx.fillRect(offsetX + terrain.x * cell, offsetY + terrain.y * cell, cell, cell);
    });
    minimapCtx.fillStyle = "#f0c85a";
    minimapCtx.fillRect(offsetX + state.stairs.x * cell, offsetY + state.stairs.y * cell, cell, cell);
    state.monsters.forEach((monster) => {
      minimapCtx.fillStyle = monster.sleepTurns > 0 ? "#a88ee8" : (monster.color || "#df6657");
      minimapCtx.fillRect(offsetX + monster.x * cell, offsetY + monster.y * cell, cell, cell);
    });
    minimapCtx.fillStyle = "#74b9df";
    minimapCtx.fillRect(offsetX + state.player.x * cell - 1, offsetY + state.player.y * cell - 1, cell + 2, cell + 2);
  }

  function updateEnemyPanel() {
    if (!ui.enemyList || !ui.turnOrder || !state) {
      return;
    }
    const sortedMonsters = [...state.monsters]
      .sort((a, b) => manhattan(a.x, a.y, state.player.x, state.player.y) - manhattan(b.x, b.y, state.player.x, state.player.y))
      .slice(0, 6);
    const nextActors = [
      {
        label: state.player.sleepTurns > 0 ? `Z${state.player.sleepTurns}` : "你",
        className: "player",
        style: ""
      },
      ...sortedMonsters.slice(0, 3).map((monster) => ({
        label: getMonsterTurnLabel(monster),
        className: "",
        style: `background:${monster.sleepTurns > 0 ? "#605772" : monster.color};color:#061115;`
      }))
    ];
    ui.turnOrder.innerHTML = nextActors.map((actor) => (
      `<span class="turn-chip ${actor.className}"${actor.style ? ` style="${actor.style}"` : ""}>${escapeHtml(actor.label)}</span>`
    )).join("");

    if (sortedMonsters.length === 0) {
      ui.enemyList.innerHTML = '<div class="enemy-row"><span class="enemy-icon">0</span><div><div class="enemy-name">暂无可见敌人</div><div class="enemy-hp"><span style="--hp: 0%"></span></div></div><span class="enemy-status">安全</span></div>';
      return;
    }

    ui.enemyList.innerHTML = sortedMonsters.map((monster) => {
      const hpPercent = Math.max(0, Math.min(100, Math.round((monster.hp / monster.maxHp) * 100)));
      const status = getMonsterStatusText(monster);
      const iconColor = monster.sleepTurns > 0 ? "#605772" : (monster.color || "#9b5ad7");
      return `
        <div class="enemy-row">
          <span class="enemy-icon" style="background:${iconColor};color:#061115;">${escapeHtml(monster.icon || "M")}</span>
          <div>
            <div class="enemy-name">${escapeHtml(monster.name)}</div>
            <div class="enemy-hp"><span style="--hp: ${hpPercent}%"></span></div>
          </div>
          <span class="enemy-status">${escapeHtml(status)}</span>
        </div>
      `;
    }).join("");
  }
  function itemBlocked(type) {
    if (type === "potion") {
      return state.player.hp >= state.player.maxHp;
    }
    if (type === "food") {
      return state.player.satiety >= state.player.maxSatiety;
    }
    return false;
  }

  function getItemTitle(type) {
    switch (type) {
      case "potion":
        return "H锛氭仮澶?HP锛屾垚鍔熶娇鐢ㄥ悗鎺ㄨ繘鍥炲悎";
      case "food":
        return "F：恢复饱腹度，延长探索时间";
      case "teleport":
        return "T：随机传送到当前层安全地板";
      case "sleep":
        return "Z锛氳 4 鏍煎唴鎬墿鐫＄湢 3 鍥炲悎";
      case "fireball":
        return "R：朝当前方向发射火球，未命中不消耗";
      case "swap":
        return "X：与当前方向第一个怪物换位，未命中不消耗";
      default:
        return "";
    }
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

    const compact = rect.width <= 760;
    const leftGap = compact ? 18 : 330;
    const rightGap = compact ? 18 : 304;
    const topGap = compact ? 190 : 116;
    const bottomGap = compact ? 210 : 118;
    const playLeft = leftGap;
    const playRight = Math.max(playLeft + 280, rect.width - rightGap);
    const playTop = topGap;
    const playBottom = Math.max(playTop + 220, rect.height - bottomGap);
    const availableW = Math.max(280, playRight - playLeft);
    const availableH = Math.max(220, playBottom - playTop);
    const camera = getCameraConfig();
    const cameraView = getCameraSession();
    view.cameraMode = camera.cameraMode || "traditional-tilt";
    view.cameraZoom = sanitizeCameraValue("cameraZoom", cameraView.cameraZoom);
    view.yScale = sanitizeCameraValue("yScale", cameraView.yScale);
    view.perspectiveOffset = sanitizeCameraValue("perspectiveOffset", cameraView.perspectiveOffset) * view.cameraZoom;
    view.cameraCenterOffsetX = sanitizeCameraValue("cameraCenterOffsetX", cameraView.cameraCenterOffsetX);
    view.cameraCenterOffsetY = sanitizeCameraValue("cameraCenterOffsetY", cameraView.cameraCenterOffsetY);
    view.playLeft = playLeft;
    view.playTop = playTop;
    view.playWidth = availableW;
    view.playHeight = availableH;
    view.tileW = Math.round(sanitizeCameraValue("tileW", cameraView.tileW) * view.cameraZoom);
    view.tileH = Math.round(sanitizeCameraValue("tileH", cameraView.tileH) * view.cameraZoom);
    view.rowStep = Math.round(sanitizeCameraValue("rowStep", cameraView.rowStep) * view.cameraZoom);
    view.tileDepth = Math.round(sanitizeCameraValue("tileDepth", cameraView.tileDepth) * view.cameraZoom);

    updateCameraOrigin();
    drawMinimap();
    markRenderDirty();
  }

  function updateCameraOrigin() {
    const canvasWidth = view.width || canvas.getBoundingClientRect().width;
    const canvasHeight = view.height || canvas.getBoundingClientRect().height;
    if (state && state.player) {
      const cameraTarget = getCameraTarget();
      const playerAnchor = getPlayerAnchorLocal();
      const targetProjectedX = cameraTarget.x * view.tileW + cameraTarget.y * view.perspectiveOffset + playerAnchor.x;
      const targetProjectedY = cameraTarget.y * view.rowStep + playerAnchor.y;
      const centeredOriginX = canvasWidth * 0.5 + view.cameraCenterOffsetX - targetProjectedX;
      const centeredOriginY = canvasHeight * 0.5 + view.cameraCenterOffsetY - targetProjectedY;
      view.originX = Math.floor(centeredOriginX);
      view.originY = Math.floor(centeredOriginY);
    } else {
      const playerAnchor = getPlayerAnchorLocal();
      view.originX = Math.floor(canvasWidth * 0.5 - playerAnchor.x);
      view.originY = Math.floor(canvasHeight * 0.5 - playerAnchor.y);
    }
  }

  function tileToScreen(x, y) {
    return {
      x: view.originX + x * view.tileW + y * view.perspectiveOffset,
      y: view.originY + y * view.rowStep
    };
  }

  function tileCenterScreen(x, y) {
    const p = tileToScreen(x, y);
    return {
      x: p.x + view.tileW / 2,
      y: p.y + view.rowStep * 0.8
    };
  }

  function getPlayerAnchorLocal() {
    const size = view.tileW;
    return {
      x: size * 0.5,
      y: view.rowStep * 0.8 - size * 0.34
    };
  }

  function screenToTile(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const sx = clientX - rect.left - view.originX;
    const sy = clientY - rect.top - view.originY;
    const y = Math.round(sy / view.rowStep);
    return {
      x: Math.round((sx - y * view.perspectiveOffset) / view.tileW),
      y
    };
  }

  function updateAnimations(dt) {
    if (!state) {
      return false;
    }
    let changed = false;
    state.floaters.forEach((floater) => {
      floater.life -= dt;
      floater.y -= dt * 0.8;
      changed = true;
    });
    const nextFloaters = state.floaters.filter((floater) => floater.life > 0);
    if (nextFloaters.length !== state.floaters.length) {
      changed = true;
    }
    state.floaters = nextFloaters;
    const nextPlayerHitFlash = Math.max(0, state.player.hitFlash - dt);
    if (nextPlayerHitFlash !== state.player.hitFlash) {
      changed = true;
    }
    state.player.hitFlash = nextPlayerHitFlash;
    state.monsters.forEach((monster) => {
      const nextHitFlash = Math.max(0, monster.hitFlash - dt);
      if (nextHitFlash !== monster.hitFlash) {
        changed = true;
      }
      monster.hitFlash = nextHitFlash;
    });
    return changed;
  }

  function render() {
    if (!renderDirty) {
      return;
    }
    updateCameraOrigin();
    ctx.clearRect(0, 0, view.width, view.height);
    drawBackground();
    if (!state) {
      renderDirty = false;
      return;
    }
    drawMap();
    drawFloaters();
    if (state.paused && state.running) {
      drawPaused();
    }
    renderDirty = false;
  }

  function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, view.height);
    gradient.addColorStop(0, "#151918");
    gradient.addColorStop(0.55, "#0e1110");
    gradient.addColorStop(1, "#070808");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, view.width, view.height);

    const vignette = ctx.createRadialGradient(view.width / 2, view.height * 0.52, view.height * 0.16, view.width / 2, view.height / 2, view.height * 0.76);
    vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
    vignette.addColorStop(1, "rgba(0, 0, 0, 0.56)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, view.width, view.height);
  }

  function drawMap() {
    drawTiles();
    drawMoveRange();
    drawThreatRange();
    drawEntities();
  }

  function drawTiles() {
    const cells = state.renderTiles || [];
    cells.forEach((cell) => drawTile(cell.x, cell.y, cell.tile));
  }

  function drawTile(x, y, tile) {
    const p = tileToScreen(x, y);
    if (tile === "wall") {
      drawWallBlock(p, x, y);
      return;
    }

    drawTiltTile(p, "#566449", "rgba(246, 240, 223, 0.18)");
    ctx.save();
    clipTiltTile(p, 4);
    ctx.strokeStyle = "rgba(28, 35, 27, 0.28)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(p.x + view.tileW * 0.14, p.y + view.rowStep * 0.38);
    ctx.lineTo(p.x + view.tileW * 0.62, p.y + view.rowStep * 0.24);
    ctx.moveTo(p.x + view.tileW * 0.26, p.y + view.rowStep * 0.68);
    ctx.lineTo(p.x + view.tileW * 0.76, p.y + view.rowStep * 0.54);
    ctx.stroke();
    ctx.restore();
    drawTerrainOverlayAt(x, y, p);
  }

  function drawWallBlock(p, x, y) {
    const top = tiltTilePoints({ x: p.x, y: p.y - view.tileDepth }, 0);
    const front = tiltTilePoints(p, 0);
    drawPolygon([top.bottomLeft, top.bottomRight, front.bottomRight, front.bottomLeft], "#26302c", null);
    drawPolygon([top.topLeft, top.bottomLeft, front.bottomLeft, front.topLeft], "#334039", null);
    drawPolygon([top.topLeft, top.topRight, top.bottomRight, top.bottomLeft], "#4c584d", "rgba(246, 240, 223, 0.15)");
    ctx.strokeStyle = "rgba(0, 0, 0, 0.26)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(top.bottomLeft.x, top.bottomLeft.y);
    ctx.lineTo(front.bottomLeft.x, front.bottomLeft.y);
    ctx.moveTo(top.bottomRight.x, top.bottomRight.y);
    ctx.lineTo(front.bottomRight.x, front.bottomRight.y);
    ctx.stroke();

    const southWall = getTile(x, y + 1) !== "wall";
    if (southWall) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(p.x + 4, p.y + view.rowStep * 0.82, view.tileW - 8, 3);
    }
  }

  function drawMoveRange() {
    if (!state.running || state.gameOver) {
      return;
    }
    const cells = [];
    for (let y = state.player.y - 1; y <= state.player.y + 1; y += 1) {
      for (let x = state.player.x - 1; x <= state.player.x + 1; x += 1) {
        if (manhattan(x, y, state.player.x, state.player.y) <= 1 && isWalkable(x, y)) {
          cells.push({ x, y });
        }
      }
    }
    cells.forEach((cell) => drawRangeOverlay(cell.x, cell.y, "rgba(116, 185, 223, 0.28)", "rgba(116, 185, 223, 0.54)"));
  }

  function drawThreatRange() {
    if (!state.running || state.gameOver) {
      return;
    }
    state.monsters.forEach((monster) => {
      if (monster.sleepTurns > 0) {
        return;
      }
      const style = getMonsterThreatStyle(monster);
      const seen = new Set();
      getMonsterThreatCells(monster).forEach((cell) => {
        const key = keyOf(cell.x, cell.y);
        if (seen.has(key)) {
          return;
        }
        seen.add(key);
        drawRangeOverlay(cell.x, cell.y, style.fill, style.stroke);
      });
    });
  }
  function drawRangeOverlay(x, y, fill, stroke) {
    const p = tileToScreen(x, y);
    drawTiltTile(p, fill, stroke, 5);
  }

  function drawEntities() {
    const entities = [
      ...state.traps.map((trap) => ({ kind: "trap", x: trap.x, y: trap.y, draw: () => drawTrap(trap), priority: 0 })),
      { kind: "stairs", x: state.stairs.x, y: state.stairs.y, draw: () => drawStairs(state.stairs.x, state.stairs.y), priority: 0 },
      ...state.itemsOnGround.map((item) => ({ kind: "item", x: item.x, y: item.y, draw: () => drawItem(item), priority: 1 })),
      ...state.equipmentOnGround.map((item) => ({ kind: "equipment", x: item.x, y: item.y, draw: () => drawEquipment(item), priority: 1 })),
      ...state.monsters.map((monster) => ({ kind: "monster", x: monster.x, y: monster.y, draw: () => drawMonster(monster), priority: 2 })),
      { kind: "player", x: state.player.x, y: state.player.y, draw: drawPlayer, priority: 3 }
    ];
    entities
      .sort((a, b) => a.y - b.y || a.x - b.x || a.priority - b.priority)
      .forEach((entity) => entity.draw());
  }

  function drawTerrainOverlayAt(x, y, p = tileToScreen(x, y)) {
    const terrain = terrainAt(x, y);
    if (!terrain) {
      return;
    }
    const fill = terrain.type === "poison_pool" ? "rgba(95, 174, 99, 0.34)" : "rgba(95, 174, 99, 0.22)";
    const stroke = terrain.type === "poison_pool" ? "rgba(122, 218, 128, 0.55)" : "rgba(122, 218, 128, 0.42)";
    drawTiltTile(p, fill, stroke, 8);
    ctx.fillStyle = "rgba(30, 72, 40, 0.4)";
    ctx.beginPath();
    ctx.ellipse(p.x + view.tileW * 0.48, p.y + view.rowStep * 0.58, view.tileW * 0.18, view.rowStep * 0.14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#d8f2da";
    ctx.font = `800 ${Math.max(11, view.tileW * 0.18)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(terrain.icon || "~", p.x + view.tileW * 0.5, p.y + view.rowStep * 0.56);
  }

  function drawTrap(trap) {
    const p = tileToScreen(trap.x, trap.y);
    const size = view.tileW;
    const cx = p.x + size * 0.5;
    const cy = p.y + view.rowStep * 0.5;
    drawTiltTile(p, `${trap.color}22`, `${trap.color}66`, 14);
    ctx.fillStyle = trap.color;
    if (trap.type === "spike_trap") {
      for (let index = 0; index < 3; index += 1) {
        const offset = (index - 1) * size * 0.1;
        ctx.beginPath();
        ctx.moveTo(cx + offset, cy - size * 0.12);
        ctx.lineTo(cx - size * 0.06 + offset, cy + size * 0.08);
        ctx.lineTo(cx + size * 0.06 + offset, cy + size * 0.08);
        ctx.closePath();
        ctx.fill();
      }
      return;
    }
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#081014";
    ctx.font = `800 ${Math.max(12, size * 0.2)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(trap.icon || "?", cx, cy + 1);
  }

  function drawStairs(x, y) {
    const p = tileToScreen(x, y);
    drawTiltTile(p, "rgba(240, 200, 90, 0.18)", "rgba(240, 200, 90, 0.72)", 4);
    const size = view.tileW;
    ctx.strokeStyle = "#f0c85a";
    ctx.lineWidth = 3;
    for (let index = 0; index < 4; index += 1) {
      const yLine = p.y + view.rowStep * 0.25 + index * view.rowStep * 0.12;
      ctx.beginPath();
      ctx.moveTo(p.x + size * 0.28 + index * 1.4, yLine);
      ctx.lineTo(p.x + size * 0.72 - index * 1.4, yLine);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(240, 200, 90, 0.18)";
    ctx.beginPath();
    ctx.ellipse(p.x + size * 0.5, p.y + view.rowStep * 0.72, size * 0.2, view.rowStep * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawItem(item) {
    const meta = ITEM_META[item.type];
    const p = tileToScreen(item.x, item.y);
    const size = view.tileW;
    const cx = p.x + size * 0.5;
    const cy = p.y + view.rowStep * 0.45;
    drawTiltTile(p, `${meta.color}24`, `${meta.color}7a`, 10);
    ctx.fillStyle = `${meta.color}33`;
    ctx.beginPath();
    ctx.ellipse(cx, p.y + view.rowStep * 0.78, size * 0.14, view.rowStep * 0.14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = meta.color;
    ctx.beginPath();
    ctx.roundRect(cx - size * 0.13, cy - size * 0.13, size * 0.26, size * 0.26, 5);
    ctx.fill();
    ctx.strokeStyle = "rgba(246, 240, 223, 0.8)";
    ctx.lineWidth = 2;
    ctx.strokeRect(cx - size * 0.13, cy - size * 0.13, size * 0.26, size * 0.26);
    ctx.fillStyle = "#0e1110";
    ctx.font = `800 ${Math.max(13, size * 0.22)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(meta.icon, cx, cy + 1);
  }

  function drawEquipment(item) {
    const p = tileToScreen(item.x, item.y);
    const size = view.tileW;
    const cx = p.x + size * 0.5;
    const cy = p.y + view.rowStep * 0.45;
    drawTiltTile(p, `${item.color}24`, `${item.color}88`, 10);
    ctx.fillStyle = `${item.color}2f`;
    ctx.beginPath();
    ctx.ellipse(cx, p.y + view.rowStep * 0.8, size * 0.16, view.rowStep * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = item.color;
    ctx.lineWidth = 3;
    if (item.slot === "weapon") {
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.12, cy + size * 0.12);
      ctx.lineTo(cx + size * 0.11, cy - size * 0.11);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.04, cy + size * 0.13);
      ctx.lineTo(cx - size * 0.14, cy + size * 0.23);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.roundRect(cx - size * 0.12, cy - size * 0.12, size * 0.24, size * 0.3, 8);
      ctx.stroke();
    }
    ctx.fillStyle = "#f6f0df";
    ctx.font = `800 ${Math.max(12, size * 0.18)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(item.icon || "E", cx, cy + 1);
  }

  function drawMonster(monster) {
    const p = tileToScreen(monster.x, monster.y);
    const size = view.tileW;
    const cx = p.x + size * 0.5;
    const footY = p.y + view.rowStep * 0.78;
    const bodyY = footY - size * 0.3;
    const baseColor = monster.hitFlash > 0 ? "#ffffff" : monster.sleepTurns > 0 ? "#605772" : (monster.color || "#9b5ad7");

    ctx.fillStyle = "rgba(0, 0, 0, 0.34)";
    ctx.beginPath();
    ctx.ellipse(cx, footY, size * 0.2, view.rowStep * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = baseColor;
    ctx.beginPath();
    ctx.ellipse(cx, bodyY, size * 0.22, size * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
    ctx.beginPath();
    ctx.ellipse(cx, bodyY - size * 0.03, size * 0.13, size * 0.09, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = monster.sleepTurns > 0 ? "#f3e6ff" : "#111514";
    ctx.font = `800 ${Math.max(13, size * 0.22)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(monster.icon || "M", cx, bodyY + 1);

    if (monster.sleepTurns > 0) {
      ctx.fillStyle = "#d8c7ff";
      ctx.font = `800 ${Math.max(13, size * 0.24)}px sans-serif`;
      ctx.fillText("Z", cx, bodyY - size * 0.28);
    }

    drawBar(cx, bodyY - size * 0.26, size * 0.5, monster.hp, monster.maxHp, "#df6657");
  }
  function drawPlayer() {
    const p = tileToScreen(state.player.x, state.player.y);
    const size = view.tileW;
    const anchor = getPlayerAnchorLocal();
    const cx = p.x + anchor.x;
    const bodyY = p.y + anchor.y;
    const footY = bodyY + size * 0.34;
    ctx.fillStyle = "rgba(0, 0, 0, 0.34)";
    ctx.beginPath();
    ctx.ellipse(cx, footY, size * 0.22, view.rowStep * 0.17, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = state.player.hitFlash > 0 ? "#ffffff" : "#4f86c8";
    ctx.beginPath();
    ctx.roundRect(cx - size * 0.15, bodyY - size * 0.04, size * 0.3, size * 0.28, 7);
    ctx.fill();
    ctx.fillStyle = "#e5bc82";
    ctx.beginPath();
    ctx.arc(cx, bodyY - size * 0.12, size * 0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#f6f0df";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - size * 0.18, bodyY + size * 0.2);
    ctx.lineTo(cx + size * 0.18, bodyY + size * 0.2);
    ctx.stroke();
    drawFacingCue(cx, bodyY, size);
    drawBar(cx, bodyY - size * 0.28, size * 0.58, state.player.hp, state.player.maxHp, "#75c884");
  }

  function drawFacingCue(cx, cy, size) {
    const dir = DIRS[state.player.facing] || DIRS.down;
    const target = tileCenterScreen(state.player.x + dir.x * 0.62, state.player.y + dir.y * 0.62);
    ctx.strokeStyle = "#f0c85a";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx, cy + size * 0.08);
    ctx.lineTo(target.x, target.y - size * 0.28);
    ctx.stroke();
  }

  function drawBar(cx, y, width, value, maxValue, color) {
    const ratio = Math.max(0, Math.min(1, value / maxValue));
    ctx.fillStyle = "rgba(0, 0, 0, 0.52)";
    ctx.fillRect(cx - width / 2, y, width, 5);
    ctx.fillStyle = color;
    ctx.fillRect(cx - width / 2, y, width * ratio, 5);
  }

  function tiltTilePoints(origin, inset = 0) {
    const x = origin.x + inset;
    const y = origin.y + inset;
    const width = Math.max(8, view.tileW - inset * 2);
    const topInset = Math.max(0, width * 0.05);
    const height = Math.max(10, view.rowStep + view.tileDepth * 0.18 - inset * 0.2);
    return {
      topLeft: { x: x + topInset, y },
      topRight: { x: x + width - topInset, y },
      bottomRight: { x: x + width, y: y + height },
      bottomLeft: { x, y: y + height }
    };
  }

  function drawTiltTile(origin, fill, stroke, inset = 0) {
    const points = tiltTilePoints(origin, inset);
    drawPolygon([points.topLeft, points.topRight, points.bottomRight, points.bottomLeft], fill, stroke);
  }

  function clipTiltTile(origin, inset = 0) {
    const points = tiltTilePoints(origin, inset);
    ctx.beginPath();
    ctx.moveTo(points.topLeft.x, points.topLeft.y);
    ctx.lineTo(points.topRight.x, points.topRight.y);
    ctx.lineTo(points.bottomRight.x, points.bottomRight.y);
    ctx.lineTo(points.bottomLeft.x, points.bottomLeft.y);
    ctx.closePath();
    ctx.clip();
  }

  function drawPolygon(points, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function drawFloaters() {
    state.floaters.forEach((floater) => {
      const p = tileToScreen(floater.x, floater.y);
      const ratio = Math.max(0, floater.life / floater.maxLife);
      ctx.globalAlpha = ratio;
      ctx.fillStyle = floater.color;
      ctx.font = "700 15px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(floater.text, p.x, p.y - view.tileH * 0.6 - (1 - ratio) * 18);
      ctx.globalAlpha = 1;
    });
  }

  function drawPaused() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.48)";
    ctx.fillRect(0, 0, view.width, view.height);
    ctx.fillStyle = "#f7f1e3";
    ctx.font = "700 26px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("鏆傚仠", view.width / 2, view.height / 2);
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
    ui.foodButton.addEventListener("click", useFood);
    ui.teleportButton.addEventListener("click", useTeleport);
    ui.sleepButton.addEventListener("click", useSleepScroll);
    ui.fireballButton.addEventListener("click", useFireball);
    ui.swapButton.addEventListener("click", useSwapStaff);
    ui.equipButton.addEventListener("click", equipGroundItem);
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
    if (ui.cameraReset) {
      ui.cameraReset.addEventListener("click", resetCameraSession);
    }
    if (ui.cameraCopy) {
      ui.cameraCopy.addEventListener("click", () => {
        copyCameraSession();
      });
    }
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
    if (code === "KeyF") {
      useFood();
      return true;
    }
    if (code === "KeyT") {
      useTeleport();
      return true;
    }
    if (code === "KeyZ") {
      useSleepScroll();
      return true;
    }
    if (code === "KeyR") {
      useFireball();
      return true;
    }
    if (code === "KeyX") {
      useSwapStaff();
      return true;
    }
    if (code === "KeyC") {
      equipGroundItem();
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
    if (updateAnimations(dt)) {
      markRenderDirty();
    }
    updateFps(dt);
    render();
    requestAnimationFrame(frame);
  }

  async function init() {
    config = await loadConfig();
    cameraDefaults = getCameraDefaults();
    cameraSession = clone(cameraDefaults);
    buildCameraControls();
    createState();
    resizeCanvas();
    bindEvents();
    updateUi();
    requestAnimationFrame(frame);
  }

  init();
})();








