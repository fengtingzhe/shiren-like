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
assert.match(html, /attack-value/, "HTML should expose ATK");
assert.match(html, /defense-value/, "HTML should expose DEF");
assert.match(html, /weapon-value/, "HTML should expose weapon slot");
assert.match(html, /shield-value/, "HTML should expose shield slot");
assert.match(html, /equip-button/, "HTML should expose equip action");

const css = readFileSync(paths.css, "utf8");
assert.match(css, /enemy-row/, "CSS should style the enemy panel rows");
assert.match(css, /camera-controls/, "CSS should style the camera controls");
assert.match(css, /combat-stats/, "CSS should style combat stat chips");
assert.match(css, /equipment-line/, "CSS should style equipment rows");

const webReadme = readFileSync(paths.webReadme, "utf8");
assert.match(webReadme, /v0\.7\.1 \/ 装备池补全与平衡版/, "README should describe v0.7.1");
assert.match(webReadme, /火焰剑|Flame Sword/, "README should mention Flame Sword");
assert.match(webReadme, /守护盾|Guard Shield/, "README should mention Guard Shield");
assert.match(webReadme, /相邻安全格/, "README should describe adjacent equipment drop behavior");

const js = readFileSync(paths.js, "utf8");
assert.match(js, /createEquipmentDrop/, "JS should create equipment drops");
assert.match(js, /equipmentOnGround/, "JS should track ground equipment");
assert.match(js, /placeEquipmentDrops/, "JS should place equipment in dungeon generation");
assert.match(js, /equipGroundItem/, "JS should allow equipping ground equipment");
assert.match(js, /getPlayerAttack/, "JS should compute derived player attack");
assert.match(js, /getPlayerDefense/, "JS should compute derived player defense");
assert.match(js, /KeyC/, "JS should bind equip hotkey");
assert.match(js, /weapon-value/, "JS should update weapon UI");
assert.match(js, /shield-value/, "JS should update shield UI");
assert.match(js, /placeHazards/, "JS should keep hazard generation");
assert.match(js, /triggerTrapAt/, "JS should keep trap triggering");
assert.match(js, /applyTerrainAt/, "JS should keep terrain damage");
assert.match(js, /actMonster/, "JS should keep monster AI");
assert.match(js, /generateDungeon/, "JS should keep random dungeon generation");
assert.match(js, /CAMERA_FIELDS/, "JS should keep camera tuning support");
assert.match(js, /findSafeEquipmentDropCell/, "JS should provide stable drop logic");

const config = JSON.parse(readFileSync(paths.config, "utf8"));
assert.equal(config.version, "v0.7.1", "config should be v0.7.1");
assert.equal(typeof config.equipment, "object", "config should include equipment");
assert.equal(Boolean(config.equipment.flame_sword), true, "config should include flame_sword");
assert.equal(Boolean(config.equipment.guard_shield), true, "config should include guard_shield");
assert.equal(config.equipment.flame_sword.attackBonus, 4, "flame sword should grant +4 ATK");
assert.equal(config.equipment.guard_shield.defenseBonus, 3, "guard shield should grant +3 DEF");
assert.equal(config.dungeon.generation.floorRules[2].equipmentTypes.some((entry) => entry.type === "flame_sword"), true, "3F should include flame_sword");
assert.equal(config.dungeon.generation.floorRules[2].equipmentTypes.some((entry) => entry.type === "guard_shield"), true, "3F should include guard_shield");
assert.equal(Array.isArray(config.hazards.floorRules), true, "hazard floor rules should still exist");

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

console.log("v0.7.1 shiren-like equipment pool smoke test passed");
