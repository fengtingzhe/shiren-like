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
assert.match(html, /inventory-panel/, "HTML should include inventory panel");
assert.match(html, /inventory-list/, "HTML should include inventory list");
assert.match(html, /inventory-value/, "HTML should expose inventory capacity");

const css = readFileSync(paths.css, "utf8");
assert.match(css, /inventory-panel/, "CSS should style the inventory panel");
assert.match(css, /inventory-row/, "CSS should style inventory rows");

const webReadme = readFileSync(paths.webReadme, "utf8");
assert.match(webReadme, /v0\.8 \/ 背包与投掷版/, "README should describe v0.8");
assert.match(webReadme, /背包/, "README should mention inventory");
assert.match(webReadme, /容量/, "README should mention capacity");
assert.match(webReadme, /投掷/, "README should mention throwing");

const js = readFileSync(paths.js, "utf8");
assert.match(js, /getInventoryUsedSlots/, "JS should compute inventory slots");
assert.match(js, /hasInventorySpace/, "JS should check inventory capacity");
assert.match(js, /addItemToInventory/, "JS should add items into inventory");
assert.match(js, /removeItemFromInventory/, "JS should remove items from inventory");
assert.match(js, /toggleInventoryPanel/, "JS should toggle inventory panel");
assert.match(js, /renderInventoryPanel/, "JS should render inventory panel");
assert.match(js, /throwInventoryItem/, "JS should throw inventory items");
assert.match(js, /resolveThrowPath/, "JS should resolve throw path");
assert.match(js, /applyThrownItemEffect/, "JS should apply throw effects");
assert.match(js, /dropThrownItemAt/, "JS should drop thrown equipment");
assert.match(js, /createEquipmentDrop/, "JS should still create equipment drops");
assert.match(js, /equipmentOnGround/, "JS should still track ground equipment");
assert.match(js, /equipGroundItem/, "JS should still support ground equip");
assert.match(js, /getPlayerAttack/, "JS should keep derived ATK");
assert.match(js, /getPlayerDefense/, "JS should keep derived DEF");
assert.match(js, /placeHazards/, "JS should keep hazards");
assert.match(js, /triggerTrapAt/, "JS should keep trap triggers");
assert.match(js, /applyTerrainAt/, "JS should keep terrain damage");
assert.match(js, /actMonster/, "JS should keep monster AI");
assert.match(js, /generateDungeon/, "JS should keep dungeon generation");
assert.match(js, /CAMERA_FIELDS/, "JS should keep camera tuning");

const config = JSON.parse(readFileSync(paths.config, "utf8"));
assert.equal(config.version, "v0.8", "config should be v0.8");
assert.equal(typeof config.inventorySystem, "object", "config should include inventorySystem");
assert.equal(config.inventorySystem.capacity, 8, "inventory capacity should be 8");
assert.equal(config.inventorySystem.throwRange, 5, "inventory throw range should be configured");
assert.equal(config.throwing.maxRange, 5, "throwing max range should be configured");

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

console.log("v0.8 shiren-like inventory and throwing smoke test passed");
