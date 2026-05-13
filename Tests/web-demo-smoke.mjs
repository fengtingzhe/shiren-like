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
assert.match(html, /styles\.css/, "HTML should load styles.css");
assert.match(html, /game\.js/, "HTML should load game.js");
assert.match(html, /console-button/, "HTML should keep the Console entry");
assert.match(html, /camera-controls/, "HTML should include camera controls");

const css = readFileSync(paths.css, "utf8");
assert.match(css, /console-section/, "CSS should style the console section");
assert.match(css, /camera-controls/, "CSS should style the camera controls");
assert.match(css, /enemy-row/, "CSS should style the enemy panel rows");
assert.match(css, /enemy-icon/, "CSS should style the enemy icons");

const webReadme = readFileSync(paths.webReadme, "utf8");
assert.match(webReadme, /v0\.5 \/ 怪物机制版/, "README should describe v0.5");
assert.match(webReadme, /Goblin Archer/, "README should mention Goblin Archer");
assert.match(webReadme, /Sleep Mushroom/, "README should mention Sleep Mushroom");
assert.match(webReadme, /Skeleton Spearman/, "README should mention Skeleton Spearman");
assert.match(webReadme, /monsterTypes/, "README should mention weighted monster types");
assert.match(webReadme, /Camera \/ View/, "README should mention the camera tuning panel");

const js = readFileSync(paths.js, "utf8");
assert.match(js, /actMonster/, "JS should dispatch monster behaviors");
assert.match(js, /actRanged/, "JS should implement ranged monster behavior");
assert.match(js, /actSleepMushroom/, "JS should implement sleep mushroom behavior");
assert.match(js, /actReachAttack/, "JS should implement reach attack behavior");
assert.match(js, /hasLineOfSight/, "JS should check line of sight for ranged attacks");
assert.match(js, /getMonsterThreatCells/, "JS should compute behavior-specific threat cells");
assert.match(js, /getMonsterStatusText/, "JS should compute enemy panel status text");
assert.match(js, /player:\s*\{[\s\S]*sleepTurns/, "JS should keep player sleep state");
assert.match(js, /cooldownRemaining/, "JS should track monster cooldowns");
assert.match(js, /monsterTypes/, "JS should support weighted monster pools");
assert.match(js, /placeMonstersByRoom/, "JS should keep room-based monster placement");
assert.match(js, /generateDungeon/, "JS should keep random dungeon generation");
assert.match(js, /hunger/i, "JS should keep hunger logic");
assert.match(js, /satiety/i, "JS should keep satiety logic");
assert.match(js, /teleport/i, "JS should keep teleport logic");
assert.match(js, /sleep/i, "JS should keep sleep logic");
assert.match(js, /fireball/i, "JS should keep fireball logic");
assert.match(js, /swap/i, "JS should keep swap logic");
assert.match(js, /minimap/i, "JS should keep minimap logic");
assert.match(js, /enemyList/, "JS should keep the enemy panel logic");
assert.match(js, /CAMERA_FIELDS/, "JS should keep camera tuning support");

const config = JSON.parse(readFileSync(paths.config, "utf8"));
assert.equal(config.version, "v0.5", "config should be v0.5");
assert.equal(config.camera.cameraMode, "traditional-tilt", "camera mode should stay traditional tilt");
assert.equal(typeof config.monsters, "object", "config should include multi-monster data");
assert.equal(config.monsters.slime.behavior, "melee", "slime should be melee");
assert.equal(config.monsters.goblin_archer.behavior, "ranged", "goblin archer should be ranged");
assert.equal(config.monsters.sleep_mushroom.behavior, "sleep_spore", "sleep mushroom should use sleep spore");
assert.equal(config.monsters.skeleton_spearman.behavior, "reach_attack", "skeleton spearman should use reach attack");
assert.equal(Array.isArray(config.dungeon.generation.floorRules[0].monsterTypes), true, "floor rules should include monsterTypes");

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

console.log("v0.5 shiren-like monster mechanics smoke test passed");
