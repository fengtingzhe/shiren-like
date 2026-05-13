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
assert.match(html, /potion-button/, "HTML should expose potion action");
assert.match(html, /food-button/, "HTML should expose food action");
assert.match(html, /teleport-button/, "HTML should expose teleport action");
assert.match(html, /sleep-button/, "HTML should expose sleep action");
assert.match(html, /fireball-button/, "HTML should expose fireball action");
assert.match(html, /swap-button/, "HTML should expose swap action");
assert.match(html, /stairs-button/, "HTML should expose stairs action");
assert.match(html, /console-button/, "HTML should keep the Console entry");

const webReadme = readFileSync(paths.webReadme, "utf8");
assert.match(webReadme, /shiren-like Web Demo/, "web demo README should be named");
assert.match(webReadme, /v0\.2 \/ 道具策略版/, "web demo README should describe v0.2 status");
assert.match(webReadme, /道具可以改变战局/, "web demo README should describe the v0.2 goal");
assert.match(webReadme, /传送卷轴/, "web demo README should describe teleport scroll");
assert.match(webReadme, /睡眠卷轴/, "web demo README should describe sleep scroll");
assert.match(webReadme, /火球杖/, "web demo README should describe fireball staff");
assert.match(webReadme, /换位杖/, "web demo README should describe swap staff");

const js = readFileSync(paths.js, "utf8");
assert.match(js, /advanceTurn/, "JS should include turn advancement logic");
assert.match(js, /player[\s\S]*hp/i, "JS should include player HP logic");
assert.match(js, /satiety/i, "JS should include satiety placeholder logic");
assert.match(js, /monstersAct|monster/i, "JS should include monster logic");
assert.match(js, /potion/i, "JS should include potion logic");
assert.match(js, /food/i, "JS should include food logic");
assert.match(js, /teleport/i, "JS should include teleport logic");
assert.match(js, /sleep/i, "JS should include sleep logic");
assert.match(js, /fireball/i, "JS should include fireball logic");
assert.match(js, /swap/i, "JS should include swap logic");
assert.match(js, /stairs/i, "JS should include stairs logic");
assert.match(js, /finishGame/, "JS should include result handling");
assert.match(js, /Console|fps/i, "JS should include debug console support");

const config = JSON.parse(readFileSync(paths.config, "utf8"));
assert.equal(config.version, "v0.2", "config should be v0.2");
assert.equal(config.player.maxHp, 20, "config should include player max HP");
assert.equal(config.player.attack, 4, "config should include player attack");
assert.equal(config.player.maxSatiety, 100, "config should include max satiety");
assert.equal(config.monster.hp, 6, "config should include monster HP");
assert.equal(config.monster.attack, 3, "config should include monster attack");
assert.equal(config.dungeon.maxFloors, 3, "config should include 3-floor goal");
assert.ok(config.dungeon.floors.length >= 3, "config should include playable floor layouts");

for (const type of ["potion", "food", "teleport", "sleep", "fireball", "swap"]) {
  assert.ok(config.items[type], `config should include ${type}`);
}

const flatMap = config.dungeon.floors.map((floor) => floor.rows.join("")).join("");
for (const marker of ["p", "f", "t", "z", "r", "x"]) {
  assert.ok(flatMap.includes(marker), `floor layouts should include item marker ${marker}`);
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

console.log("v0.2 shiren-like item strategy smoke test passed");
