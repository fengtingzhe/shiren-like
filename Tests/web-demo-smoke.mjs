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
assert.match(html, /shiren-like Web Demo/, "HTML title should identify the new demo");
assert.match(html, /game-canvas/, "HTML should include the canvas");
assert.match(html, /styles\.css/, "HTML should load styles.css");
assert.match(html, /game\.js/, "HTML should load game.js");
assert.match(html, /hp-value/, "HTML should expose HP HUD");
assert.match(html, /floor-value/, "HTML should expose floor HUD");
assert.match(html, /potion-button/, "HTML should expose potion action");
assert.match(html, /stairs-button/, "HTML should expose stairs action");
assert.match(html, /console-button/, "HTML should keep the Console entry");

const webReadme = readFileSync(paths.webReadme, "utf8");
assert.match(webReadme, /shiren-like Web Demo/, "web demo README should be named");
assert.match(webReadme, /v0\.1 \/ 最小可玩迷宫版/, "web demo README should describe v0.1 status");
assert.match(webReadme, /格子迷宫/, "web demo README should describe grid dungeon gameplay");
assert.match(webReadme, /回复药/, "web demo README should describe potion gameplay");
assert.match(webReadme, /楼梯/, "web demo README should describe stairs gameplay");

const js = readFileSync(paths.js, "utf8");
assert.match(js, /advanceTurn/, "JS should include turn advancement logic");
assert.match(js, /player[\s\S]*hp/i, "JS should include player HP logic");
assert.match(js, /monstersAct|monster/i, "JS should include monster logic");
assert.match(js, /potion/i, "JS should include potion logic");
assert.match(js, /stairs/i, "JS should include stairs logic");
assert.match(js, /finishGame/, "JS should include result handling");
assert.match(js, /Console|fps/i, "JS should include debug console support");

const config = JSON.parse(readFileSync(paths.config, "utf8"));
assert.equal(config.version, "v0.1", "config should be v0.1");
assert.equal(config.player.maxHp, 20, "config should include player max HP");
assert.equal(config.player.attack, 4, "config should include player attack");
assert.equal(config.monster.hp, 6, "config should include monster HP");
assert.equal(config.monster.attack, 3, "config should include monster attack");
assert.equal(config.potion.heal, 8, "config should include potion healing");
assert.equal(config.dungeon.maxFloors, 3, "config should include 3-floor goal");
assert.ok(config.dungeon.floors.length >= 3, "config should include playable floor layouts");

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

console.log("v0.1 shiren-like web demo smoke test passed");
