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
  server: resolve(root, "Tools/web-demo-server.mjs"),
  viteBat: resolve(root, "Tools/run-web-demo-vite.bat")
};

for (const [name, path] of Object.entries(paths)) {
  assert.equal(existsSync(path), true, `${name} is missing: ${path}`);
}

const html = readFileSync(paths.html, "utf8");
assert.match(html, /shiren-like Web Demo/, "HTML title should identify the demo");
assert.match(html, /game-canvas/, "HTML should include the main canvas");
assert.match(html, /console-button/, "HTML should keep the Console entry");
assert.match(html, /camera-controls/, "HTML should include camera controls");

const css = readFileSync(paths.css, "utf8");
assert.match(css, /enemy-row/, "CSS should style the enemy panel rows");
assert.match(css, /camera-controls/, "CSS should style the camera controls");

const webReadme = readFileSync(paths.webReadme, "utf8");
assert.match(webReadme, /v0\.6 \/ 陷阱与危险地形版/, "README should describe v0.6");
assert.match(webReadme, /Spike Trap/, "README should mention Spike Trap");
assert.match(webReadme, /Warp Trap/, "README should mention Warp Trap");
assert.match(webReadme, /Sleep Trap/, "README should mention Sleep Trap");
assert.match(webReadme, /Poison Pool/, "README should mention Poison Pool");
assert.match(webReadme, /小地图当前只显示持续危险地形/, "README should describe the minimap hazard strategy");

const js = readFileSync(paths.js, "utf8");
assert.match(js, /createTrap/, "JS should create trap instances");
assert.match(js, /createTerrainHazard/, "JS should create terrain hazard instances");
assert.match(js, /placeHazards/, "JS should place hazards");
assert.match(js, /placeTraps/, "JS should place traps");
assert.match(js, /placeTerrainHazards/, "JS should place terrain hazards");
assert.match(js, /triggerTrapAt/, "JS should trigger traps");
assert.match(js, /applyTerrainAt/, "JS should apply terrain effects");
assert.match(js, /findSafeTeleportDestination/, "JS should find safe warp destinations");
assert.match(js, /trapLookup/, "JS should keep trap lookups");
assert.match(js, /terrainLookup/, "JS should keep terrain lookups");
assert.match(js, /sleepTurns/, "JS should keep player sleep state");
assert.match(js, /getMonsterThreatCells/, "JS should keep monster threat logic");
assert.match(js, /generateDungeon/, "JS should keep random dungeon generation");
assert.match(js, /placeMonstersByRoom/, "JS should keep room-based monster placement");
assert.match(js, /CAMERA_FIELDS/, "JS should keep camera tuning support");

const config = JSON.parse(readFileSync(paths.config, "utf8"));
assert.equal(config.version, "v0.6", "config should be v0.6");
assert.equal(typeof config.hazards, "object", "config should include hazards");
assert.equal(config.hazards.traps.spike_trap.damage, 4, "spike trap damage should be configured");
assert.equal(config.hazards.traps.warp_trap.icon, "?", "warp trap should be configured");
assert.equal(config.hazards.traps.sleep_trap.sleepTurns, 2, "sleep trap should be configured");
assert.equal(config.hazards.terrain.poison_pool.damage, 1, "poison pool damage should be configured");
assert.equal(Array.isArray(config.hazards.floorRules), true, "hazard floor rules should exist");
assert.equal(Array.isArray(config.hazards.floorRules[0].trapTypes), true, "trapTypes should exist");
assert.equal(Array.isArray(config.hazards.floorRules[0].terrainTypes), true, "terrainTypes should exist");

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

console.log("v0.6 shiren-like hazard and terrain smoke test passed");
