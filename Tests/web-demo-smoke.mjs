import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const root = resolve(import.meta.dirname, "..");
const paths = {
  html: resolve(root, "Builds/web-demo/index.html"),
  css: resolve(root, "Builds/web-demo/styles.css"),
  js: resolve(root, "Builds/web-demo/game.js"),
  webReadme: resolve(root, "Builds/web-demo/README.md"),
  config: resolve(root, "Data/config/web_demo_balance.json"),
  server: resolve(root, "Tools/web-demo-server.mjs")
};

for (const [name, path] of Object.entries(paths)) {
  assert.equal(existsSync(path), true, `${name} is missing: ${path}`);
}

const html = readFileSync(paths.html, "utf8");
assert.match(html, /shiren-like Web Demo/, "HTML title should identify the demo");
assert.match(html, /game-canvas/, "HTML should include the main canvas");
assert.match(html, /styles\.css/, "HTML should load styles.css");
assert.match(html, /game\.js/, "HTML should load game.js");
assert.match(html, /hp-value/, "HTML should expose HP HUD");
assert.match(html, /satiety-value/, "HTML should expose satiety HUD");
assert.match(html, /minimap-canvas/, "HTML should expose minimap canvas");
assert.match(html, /enemy-panel/, "HTML should expose enemy panel");
assert.match(html, /enemy-list/, "HTML should expose enemy list");
assert.match(html, /turn-order/, "HTML should expose turn order");
assert.match(html, /food-button/, "HTML should expose food action");
assert.match(html, /teleport-button/, "HTML should expose teleport action");
assert.match(html, /sleep-button/, "HTML should expose sleep action");
assert.match(html, /fireball-button/, "HTML should expose fireball action");
assert.match(html, /swap-button/, "HTML should expose swap action");
assert.match(html, /console-button/, "HTML should keep the Console entry");

const css = readFileSync(paths.css, "utf8");
assert.match(css, /minimap-panel/, "CSS should style the minimap panel");
assert.match(css, /enemy-panel/, "CSS should style the enemy panel");
assert.match(css, /quick-actions/, "CSS should style the quickbar");

const webReadme = readFileSync(paths.webReadme, "utf8");
assert.match(webReadme, /v0\.4\.2 \/ 房间视野与镜头居中版/, "web demo README should describe v0.4.2 status");
assert.match(webReadme, /3x3/, "web demo README should mention 3x3 room minimum");
assert.match(webReadme, /10x10/, "web demo README should mention 10x10 room maximum");
assert.match(webReadme, /每个非出生房间至少.*1.*怪物/, "web demo README should describe per-room monster pressure");
assert.match(webReadme, /当前房间为中心|房间中心|镜头.*跟随玩家/, "web demo README should describe room-centered camera");
assert.match(webReadme, /小地图.*整层/, "web demo README should keep whole-floor minimap overview");
assert.match(webReadme, /随机房间与走廊|随机地牢/, "web demo README should keep random dungeon language");
assert.match(webReadme, /饱腹度|饥饿/, "web demo README should keep hunger language");

const js = readFileSync(paths.js, "utf8");
assert.match(js, /rooms/, "JS should include rooms data");
assert.match(js, /centerX/, "JS should include room centerX");
assert.match(js, /centerY/, "JS should include room centerY");
assert.match(js, /isStartRoom/, "JS should tag the start room");
assert.match(js, /isStairsRoom/, "JS should tag the stairs room");
assert.match(js, /createRoomMeta/, "JS should create room metadata");
assert.match(js, /placeMonstersByRoom/, "JS should place monsters by room");
assert.match(js, /getRoomAt/, "JS should determine which room contains a tile");
assert.match(js, /getCurrentRoom/, "JS should determine the current room");
assert.match(js, /getCameraTarget/, "JS should compute a room-aware camera target");
assert.match(js, /originX = Math\.floor\(playLeft \+ availableW \* 0\.5 - targetProjectedX\)/, "JS should derive camera origin from camera target");
assert.match(js, /tileToScreen/, "JS should include camera projection logic");
assert.match(js, /screenToTile/, "JS should include projected pointer conversion");
assert.match(js, /traditional-tilt/, "JS should keep traditional tilt camera mode");
assert.match(js, /drawMoveRange/, "JS should draw player move range");
assert.match(js, /drawThreatRange/, "JS should draw monster threat range");
assert.match(js, /drawMinimap|minimap/i, "JS should include minimap logic");
assert.match(js, /updateEnemyPanel|enemyList|turnOrder/, "JS should include enemy panel logic");
assert.match(js, /generateDungeon/, "JS should include random dungeon generation");
assert.match(js, /generateRooms/, "JS should include room generation");
assert.match(js, /connectRooms/, "JS should include room corridor connection");
assert.match(js, /hunger/i, "JS should include hunger logic");
assert.match(js, /satiety/i, "JS should include satiety logic");
assert.match(js, /teleport/i, "JS should include teleport logic");
assert.match(js, /sleep/i, "JS should include sleep logic");
assert.match(js, /fireball/i, "JS should include fireball logic");
assert.match(js, /swap/i, "JS should include swap logic");

const config = JSON.parse(readFileSync(paths.config, "utf8"));
assert.equal(config.version, "v0.4.2", "config should be v0.4.2");
assert.equal(config.dungeon.maxFloors, 3, "config should include 3-floor goal");
assert.equal(config.dungeon.width, 36, "config should use a larger dungeon width");
assert.equal(config.dungeon.height, 28, "config should use a larger dungeon height");
assert.ok(config.dungeon.generation, "config should include random generation parameters");
assert.equal(config.dungeon.generation.enabled, true, "random generation should be enabled");
assert.deepEqual(config.dungeon.generation.roomCount, [5, 8], "config should include the room count range");
assert.deepEqual(config.dungeon.generation.roomWidth, [3, 10], "config should include the room width range");
assert.deepEqual(config.dungeon.generation.roomHeight, [3, 10], "config should include the room height range");
assert.ok(Array.isArray(config.dungeon.generation.floorRules), "config should include floor distribution rules");
assert.ok(config.hunger, "config should include hunger parameters");
assert.equal(config.hunger.enabled, true, "hunger should be enabled");
assert.equal(config.camera.cameraMode, "traditional-tilt", "camera mode should stay traditional tilt");

for (const type of ["potion", "food", "teleport", "sleep", "fireball", "swap"]) {
  assert.ok(config.items[type], `config should include ${type}`);
}

const forbiddenCoreTerms = [
  "treeCost",
  "wallCost",
  "towerCost",
  "landmarkCost",
  "workers",
  "archers"
];

for (const term of forbiddenCoreTerms) {
  assert.equal(js.includes(term), false, `JS should not keep old core term: ${term}`);
}

console.log("v0.4.2 shiren-like room camera smoke test passed");
