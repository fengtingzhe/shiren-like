import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import assert from "node:assert/strict";

const root = resolve(import.meta.dirname, "..");
const paths = {
  html: resolve(root, "Builds/web-demo/index.html"),
  css: resolve(root, "Builds/web-demo/styles.css"),
  readme: resolve(root, "Builds/web-demo/README.md"),
  js: resolve(root, "Builds/web-demo/game.js"),
  config: resolve(root, "Data/config/web_demo_balance.json"),
  server: resolve(root, "Tools/web-demo-server.mjs")
};

for (const [name, path] of Object.entries(paths)) {
  assert.equal(existsSync(path), true, `${name} is missing: ${path}`);
}

const html = readFileSync(paths.html, "utf8");
assert.match(html, /game-canvas/, "HTML should include the canvas");
assert.match(html, /styles\.css/, "HTML should load styles.css");
assert.match(html, /game\.js/, "HTML should load game.js");
assert.match(html, /console-button/, "HTML should include the console button");
assert.match(html, /camera-zoom-slider/, "HTML should include the camera zoom slider");
assert.match(html, /min="0\.5"/, "camera zoom slider should start at 50%");
assert.match(html, /max="50"/, "camera zoom slider should allow 5000%");

const js = readFileSync(paths.js, "utf8");
assert.equal(
  js.includes('const CONFIG_URL = "/Data/config/web_demo_balance.json";'),
  false,
  "game.js should not use the old absolute config path"
);
assert.match(js, /DEFAULT_CONFIG/, "game.js should keep DEFAULT_CONFIG fallback");
assert.match(js, /cameraZoom/, "game.js should expose camera zoom setting");
assert.match(js, /updateCameraZoom/, "game.js should update camera zoom from the console slider");
assert.match(js, /0\.5, 50/, "game.js should clamp camera zoom to 50%-5000%");
assert.match(js, /drawWorld/, "game.js should render the world through a camera transform");
assert.match(js, /getCameraFocus/, "game.js should keep the camera centered on the player");
assert.match(js, /screenToWorld/, "game.js should convert pointer input through the camera transform");

const config = JSON.parse(readFileSync(paths.config, "utf8"));
assert.equal(config.economy.startingGold > 0, true, "starting gold must be positive");
for (const key of ["startingGold", "treeCost", "wallCost", "towerCost", "landmarkCost"]) {
  assert.equal(Object.hasOwn(config.economy, key), true, `economy.${key} is missing`);
}
const configText = readFileSync(paths.config, "utf8");
for (const forbidden of ["wood", "stone", "food", "iron"]) {
  assert.equal(configText.includes(forbidden), false, `config should not include ${forbidden}`);
}
assert.equal(config.level.features.some((feature) => feature.type === "landmark"), true, "level needs a landmark target");
assert.equal(config.level.features.some((feature) => feature.type === "wall"), true, "level needs a wall node");
assert.equal(config.level.features.some((feature) => feature.type === "tower"), true, "level needs a tower node");

console.log("web demo smoke test passed");
