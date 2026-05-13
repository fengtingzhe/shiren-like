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
assert.match(html, /game-canvas/, "HTML should include the canvas");
assert.match(html, /styles\.css/, "HTML should load styles.css");
assert.match(html, /game\.js/, "HTML should load game.js");
assert.match(html, /hp-value/, "HTML should expose HP HUD");
assert.match(html, /satiety-value/, "HTML should expose satiety HUD");
assert.match(html, /food-button/, "HTML should expose food action");
assert.match(html, /teleport-button/, "HTML should expose teleport action");
assert.match(html, /sleep-button/, "HTML should expose sleep action");
assert.match(html, /fireball-button/, "HTML should expose fireball action");
assert.match(html, /swap-button/, "HTML should expose swap action");
assert.match(html, /console-button/, "HTML should keep the Console entry");

const webReadme = readFileSync(paths.webReadme, "utf8");
assert.match(webReadme, /shiren-like Web Demo/, "web demo README should be named");
assert.match(webReadme, /v0\.3 \/ 随机迷宫与饥饿压力版/, "web demo README should describe v0.3 status");
assert.match(webReadme, /随机迷宫/, "web demo README should describe random dungeons");
assert.match(webReadme, /满腹度/, "web demo README should describe satiety");
assert.match(webReadme, /饥饿/, "web demo README should describe hunger");
assert.match(webReadme, /食物/, "web demo README should describe food");

const js = readFileSync(paths.js, "utf8");
assert.match(js, /generateDungeon/, "JS should include random dungeon generation");
assert.match(js, /generateRooms/, "JS should include room generation");
assert.match(js, /connectRooms/, "JS should include room corridor connection");
assert.match(js, /roomCenter/, "JS should include room center helpers");
assert.match(js, /satiety/i, "JS should include satiety logic");
assert.match(js, /hunger/i, "JS should include hunger logic");
assert.match(js, /applyHunger/, "JS should include hunger consumption logic");
assert.match(js, /starvation/i, "JS should include starvation pressure logic");
assert.match(js, /advanceTurn/, "JS should include turn advancement logic");
assert.match(js, /potion/i, "JS should include potion logic");
assert.match(js, /food/i, "JS should include food logic");
assert.match(js, /teleport/i, "JS should include teleport logic");
assert.match(js, /sleep/i, "JS should include sleep logic");
assert.match(js, /fireball/i, "JS should include fireball logic");
assert.match(js, /swap/i, "JS should include swap logic");
assert.match(js, /finishGame/, "JS should include result handling");

const config = JSON.parse(readFileSync(paths.config, "utf8"));
assert.equal(config.version, "v0.3", "config should be v0.3");
assert.equal(config.dungeon.maxFloors, 3, "config should include 3-floor goal");
assert.ok(config.dungeon.generation, "config should include random generation parameters");
assert.ok(config.dungeon.generation.enabled, "random generation should be enabled");
assert.ok(Array.isArray(config.dungeon.generation.roomCount), "config should include room count range");
assert.ok(Array.isArray(config.dungeon.generation.floorRules), "config should include floor distribution rules");
assert.ok(config.hunger, "config should include hunger parameters");
assert.equal(config.hunger.enabled, true, "hunger should be enabled");
assert.equal(config.hunger.satietyLossInterval, 5, "hunger should consume satiety on interval");
assert.equal(config.hunger.starvationDamage, 1, "starvation damage should be lightweight");

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

console.log("v0.3 shiren-like random dungeon and hunger smoke test passed");
